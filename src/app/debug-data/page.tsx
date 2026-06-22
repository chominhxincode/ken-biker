'use client';

import React, { useEffect, useState } from 'react';
import db, { isSupabaseMode } from '@/lib/db';
import { Slider } from '@/lib/db/types';

interface VehicleDebugInfo {
  name: string;
  og_image: string | null;
  imagesCount: number;
}

export default function DebugDataPage() {
  const [loading, setLoading] = useState(true);
  const [dbMode, setDbMode] = useState<string>('');
  const [supabaseUrlExists, setSupabaseUrlExists] = useState<boolean>(false);
  const [slidersCount, setSlidersCount] = useState<number>(0);
  const [vehiclesCount, setVehiclesCount] = useState<number>(0);
  const [firstSliders, setFirstSliders] = useState<Slider[]>([]);
  const [firstVehicles, setFirstVehicles] = useState<VehicleDebugInfo[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDebugData() {
      try {
        setLoading(true);
        setErrorMsg(null);

        // 1. Env & Mode info
        const isSupabaseConfigured = isSupabaseMode;
        setDbMode(isSupabaseConfigured ? 'SUPABASE' : 'DEMO');
        setSupabaseUrlExists(!!process.env.NEXT_PUBLIC_SUPABASE_URL);

        // 2. Fetch sliders
        const slidersList = await db.getSliders();
        setSlidersCount(slidersList.length);
        setFirstSliders(slidersList.slice(0, 5));

        // 3. Fetch vehicles
        const vehiclesRes = await db.getVehicles({ page: 1, limit: 100 });
        const allVehicles = vehiclesRes.data || [];
        setVehiclesCount(vehiclesRes.total || allVehicles.length);

        // 4. Fetch details for first 5 vehicles to get vehicle_images count
        const first5 = allVehicles.slice(0, 5);
        const detailed5: VehicleDebugInfo[] = await Promise.all(
          first5.map(async (v) => {
            try {
              const details = await db.getVehicleBySlug(v.slug);
              return {
                name: v.name,
                og_image: v.og_image || null,
                imagesCount: details ? details.images.length : 0
              };
            } catch (err) {
              return {
                name: v.name,
                og_image: v.og_image || null,
                imagesCount: 0
              };
            }
          })
        );
        setFirstVehicles(detailed5);

      } catch (err: any) {
        console.error('Debug page error:', err);
        setErrorMsg(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchDebugData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase border-b border-gray-800 pb-4">
            System Data Diagnostics
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Temporary debug route to check environment setup and database synchronization.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/30 border border-red-500/50 p-4 rounded-xl text-red-200 text-xs">
            <p className="font-bold uppercase tracking-wider mb-1">Diagnostic Query Failed</p>
            <p className="font-mono">{errorMsg}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Configuration */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-wider border-b border-gray-800 pb-2">
              Configuration Mode
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Database Mode:</span>
                <span className={`px-2.5 py-0.5 rounded font-extrabold uppercase text-xs border ${
                  dbMode === 'SUPABASE'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {dbMode || 'Checking...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Supabase URL Exists:</span>
                <span className={`font-mono text-xs font-bold ${
                  supabaseUrlExists ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {supabaseUrlExists ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            </div>
          </div>

          {/* Card: Table Counts */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-wider border-b border-gray-800 pb-2">
              Database Table Counts
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sliders Count:</span>
                <span className="font-mono font-bold text-white text-base">
                  {loading ? '...' : slidersCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Vehicles Count:</span>
                <span className="font-mono font-bold text-white text-base">
                  {loading ? '...' : vehiclesCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Sliders Detail */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-wider border-b border-gray-800 pb-2">
            Sliders List (Top 5)
          </h2>
          {loading ? (
            <div className="text-xs text-gray-500 animate-pulse">Loading sliders...</div>
          ) : firstSliders.length === 0 ? (
            <div className="text-xs text-amber-400 font-bold">Chưa có slider trong database</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-850 text-gray-400 uppercase text-[9px] font-bold">
                    <th className="py-2 pr-4">Title</th>
                    <th className="py-2">Desktop Image URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 font-mono text-[10px] text-gray-300">
                  {firstSliders.map((s, idx) => (
                    <tr key={s.id || idx}>
                      <td className="py-2.5 pr-4 font-sans font-bold text-white">{s.title || '(No Title)'}</td>
                      <td className="py-2.5 truncate max-w-xs md:max-w-md text-gray-450" title={s.image_desktop_url}>{s.image_desktop_url || s.image_url || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section: Vehicles Detail */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-wider border-b border-gray-800 pb-2">
            Vehicles List (Top 5)
          </h2>
          {loading ? (
            <div className="text-xs text-gray-500 animate-pulse">Loading vehicles...</div>
          ) : firstVehicles.length === 0 ? (
            <div className="text-xs text-amber-400 font-bold">Chưa có xe trong database</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-850 text-gray-400 uppercase text-[9px] font-bold">
                    <th className="py-2 pr-4">Vehicle Name</th>
                    <th className="py-2 pr-4">Cover Image (og_image)</th>
                    <th className="py-2 text-center w-24">Gallery Images</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850 font-mono text-[10px] text-gray-300">
                  {firstVehicles.map((v, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 pr-4 font-sans font-bold text-white">{v.name}</td>
                      <td className="py-2.5 pr-4 truncate max-w-xs text-gray-455" title={v.og_image || ''}>{v.og_image || 'N/A'}</td>
                      <td className="py-2.5 text-center font-bold text-emerald-400">{v.imagesCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
