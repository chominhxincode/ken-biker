const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Helper to parse .env file
function loadEnv() {
  const envPath = path.join(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    console.error("Error: .env file not found.");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    env[key] = val;
  });
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY && env.SUPABASE_SERVICE_ROLE_KEY !== 'your-supabase-service-role-key'
  ? env.SUPABASE_SERVICE_ROLE_KEY
  : env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase URL or Key not found in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Parse seed-defaults.ts dynamically
const defaultsPath = path.join(__dirname, '../src/lib/db/seed-defaults.ts');
if (!fs.existsSync(defaultsPath)) {
  console.error(`Error: Seed defaults file not found at ${defaultsPath}`);
  process.exit(1);
}
const defaultsContent = fs.readFileSync(defaultsPath, 'utf8');

function extractArray(name) {
  const marker = new RegExp(`export const ${name}\\s*(:\\s*\\w+(\\[\\])?)?\\s*=\\s*\\[`);
  const match = defaultsContent.match(marker);
  if (!match) {
    throw new Error(`Could not find ${name} in seed-defaults.ts`);
  }
  const startIdx = match.index + match[0].length - 1; // index of '['
  let depth = 1;
  let endIdx = startIdx + 1;
  while (depth > 0 && endIdx < defaultsContent.length) {
    const char = defaultsContent[endIdx];
    if (char === '[') depth++;
    else if (char === ']') depth--;
    endIdx++;
  }
  const arrayText = defaultsContent.substring(startIdx, endIdx);
  return eval(arrayText);
}

let defaultVehicles, defaultVehicleImages;
try {
  defaultVehicles = extractArray('DEFAULT_VEHICLES');
  defaultVehicleImages = extractArray('DEFAULT_VEHICLE_IMAGES');
} catch (e) {
  console.error("Failed to parse seed-defaults.ts:", e.message);
  process.exit(1);
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  return 'application/octet-stream';
}

async function run() {
  console.log("Checking Supabase Storage buckets...");
  const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
  if (bErr) {
    console.error("Error listing buckets:", bErr.message);
    console.error("\nPlease check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly.");
    process.exit(1);
  }

  const websiteBucket = buckets.find(b => b.name === 'website');
  if (!websiteBucket) {
    console.log("Bucket 'website' not found. Attempting to create it...");
    const { error: createErr } = await supabase.storage.createBucket('website', {
      public: true
    });
    if (createErr) {
      console.warn("==========================================================");
      console.warn("WARNING: Could not create bucket 'website' automatically.");
      console.warn("Reason:", createErr.message);
      console.warn("Please log into your Supabase Dashboard and manually:");
      console.warn("1. Go to Storage -> Create a new bucket named 'website'.");
      console.warn("2. Make the bucket PUBLIC.");
      console.warn("3. Add an RLS policy for 'website' bucket to allow Uploads/Inserts.");
      console.warn("==========================================================");
    } else {
      console.log("Successfully created public bucket 'website'!");
    }
  } else {
    console.log("Bucket 'website' is available.");
  }

  // --- Migrate Vehicles Cover Images ---
  console.log("\nFetching vehicles from database...");
  const { data: vehicles, error: vErr } = await supabase
    .from('vehicles')
    .select('id, name, og_image');

  if (vErr) {
    console.error("Error fetching vehicles:", vErr.message);
    process.exit(1);
  }

  console.log(`Found ${vehicles.length} vehicles in database. Checking cover images...`);
  let migratedCoverCount = 0;
  let fallbackCoverCount = 0;

  for (const vehicle of vehicles) {
    // Resolve matching local path from seed data
    const defVeh = defaultVehicles.find(dv => dv.id === vehicle.id);
    const imgUrl = defVeh ? defVeh.og_image : vehicle.og_image;

    if (imgUrl && (imgUrl.startsWith('/demo/vehicles/') || imgUrl.startsWith('public/demo/vehicles/'))) {
      const cleanImgPath = imgUrl.startsWith('public/') ? imgUrl.substring(6) : imgUrl;
      const filename = path.basename(cleanImgPath);
      const localPath = path.join(__dirname, '../public', cleanImgPath);

      if (fs.existsSync(localPath)) {
        console.log(`Uploading cover for "${vehicle.name}": ${filename}`);
        const fileBuffer = fs.readFileSync(localPath);
        const mimeType = getMimeType(localPath);

        const { error: uploadErr } = await supabase.storage
          .from('website')
          .upload(`vehicles/${filename}`, fileBuffer, {
            contentType: mimeType,
            upsert: true
          });

        if (uploadErr) {
          console.error(`Failed to upload ${filename}:`, uploadErr.message);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('website')
          .getPublicUrl(`vehicles/${filename}`);

        const publicUrl = urlData.publicUrl;
        const { error: updateErr } = await supabase
          .from('vehicles')
          .update({ og_image: publicUrl })
          .eq('id', vehicle.id);

        if (updateErr) {
          console.error(`Failed to update DB for ${vehicle.name}:`, updateErr.message);
        } else {
          migratedCoverCount++;
        }
      } else {
        console.warn(`Local file not found: ${localPath}. Setting fallback.`);
        const fallbackUrl = '/demo/placeholder-vehicle.webp';
        const { error: fallbackErr } = await supabase
          .from('vehicles')
          .update({ og_image: fallbackUrl })
          .eq('id', vehicle.id);
        if (fallbackErr) {
          console.error(`Failed to set fallback for ${vehicle.name}:`, fallbackErr.message);
        } else {
          fallbackCoverCount++;
        }
      }
    }
  }

  // --- Migrate Vehicle Gallery Images ---
  console.log("\nFetching vehicle gallery images...");
  const { data: galleryImages, error: giErr } = await supabase
    .from('vehicle_images')
    .select('id, vehicle_id, image_url');

  if (giErr) {
    console.error("Error fetching vehicle_images:", giErr.message);
    process.exit(1);
  }

  console.log(`Found ${galleryImages.length} gallery images in database. Checking...`);
  let migratedGalleryCount = 0;
  let fallbackGalleryCount = 0;

  for (const img of galleryImages) {
    const defImg = defaultVehicleImages.find(di => di.id === img.id);
    const imgUrl = defImg ? defImg.image_url : img.image_url;

    if (imgUrl && (imgUrl.startsWith('/demo/vehicles/') || imgUrl.startsWith('public/demo/vehicles/'))) {
      const cleanImgPath = imgUrl.startsWith('public/') ? imgUrl.substring(6) : imgUrl;
      const filename = path.basename(cleanImgPath);
      const localPath = path.join(__dirname, '../public', cleanImgPath);

      if (fs.existsSync(localPath)) {
        console.log(`Uploading gallery image: ${filename}`);
        const fileBuffer = fs.readFileSync(localPath);
        const mimeType = getMimeType(localPath);

        const { error: uploadErr } = await supabase.storage
          .from('website')
          .upload(`vehicles/${filename}`, fileBuffer, {
            contentType: mimeType,
            upsert: true
          });

        if (uploadErr) {
          console.error(`Failed to upload gallery image ${filename}:`, uploadErr.message);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('website')
          .getPublicUrl(`vehicles/${filename}`);

        const publicUrl = urlData.publicUrl;
        const { error: updateErr } = await supabase
          .from('vehicle_images')
          .update({ image_url: publicUrl })
          .eq('id', img.id);

        if (updateErr) {
          console.error(`Failed to update DB for image ID ${img.id}:`, updateErr.message);
        } else {
          migratedGalleryCount++;
        }
      } else {
        console.warn(`Local file not found: ${localPath}. Setting fallback.`);
        const fallbackUrl = '/demo/placeholder-vehicle.webp';
        const { error: fallbackErr } = await supabase
          .from('vehicle_images')
          .update({ image_url: fallbackUrl })
          .eq('id', img.id);
        if (fallbackErr) {
          console.error(`Failed to set fallback for image ID ${img.id}:`, fallbackErr.message);
        } else {
          fallbackGalleryCount++;
        }
      }
    }
  }

  console.log("\n==========================================");
  console.log("Migration Complete!");
  console.log(`Migrated Cover Images: ${migratedCoverCount}`);
  console.log(`Fallback Cover Images: ${fallbackCoverCount}`);
  console.log(`Migrated Gallery Images: ${migratedGalleryCount}`);
  console.log(`Fallback Gallery Images: ${fallbackGalleryCount}`);
  console.log("==========================================");
  process.exit(0);
}

run().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
