import { supabase, hasSupabaseConfig } from './supabase-client';

/**
 * Transparent helper to upload image files.
 * In Supabase mode: uploads to Supabase Storage bucket 'website' inside folder/ and returns the publicUrl.
 * In Demo mode: reads the file as Base64 and returns the data URL.
 */
export async function uploadImage(file: File, folder: string = 'vehicles'): Promise<string> {
  if (hasSupabaseConfig() && supabase) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 9)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from('website')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image to Supabase storage:', error);
      throw new Error(`Tải ảnh lên Supabase Storage thất bại: ${error.message}`);
    }

    const { data } = supabase.storage
      .from('website')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } else {
    return readAsBase64(file);
  }
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => {
      console.error('FileReader error:', err);
      reject(new Error('Lỗi chuyển đổi tệp sang base64.'));
    };
    reader.readAsDataURL(file);
  });
}
