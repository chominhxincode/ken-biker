'use client';

import React, { useState, useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { uploadImage } from '@/lib/db/upload';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  placeholderIcon?: React.ReactNode;
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'vehicles',
  label,
  className = '',
  placeholderIcon
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await uploadImage(file, folder);
      console.log("Uploaded public URL:", publicUrl);
      onChange(publicUrl);
    } catch (err) {
      alert('Lỗi tải ảnh lên hệ thống: ' + (err instanceof Error ? err.message : err));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePasteUrl = () => {
    const url = prompt(`Nhập đường dẫn URL ảnh${label ? ` cho ${label}` : ''}:`);
    if (url !== null) {
      onChange(url.trim());
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-4">
        {/* Preview image */}
        <div className="w-16 h-16 bg-brand-light border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0 relative group">
          {value ? (
            <>
              <img src={value} alt={label || 'Preview'} className="max-w-full max-h-full object-contain" />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all text-white rounded-lg cursor-pointer"
                title="Xóa ảnh"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            placeholderIcon || <Upload className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex-grow space-y-1.5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-all disabled:opacity-50"
              style={{ minHeight: '36px' }}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Đang tải...' : 'Tải tệp'}</span>
            </button>
            <button
              type="button"
              onClick={handlePasteUrl}
              disabled={uploading}
              className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer transition-all"
              style={{ minHeight: '36px' }}
            >
              Nhập URL
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {uploading && (
            <p className="text-[9px] text-brand-red font-bold animate-pulse">
              Đang xử lý tải ảnh lên hệ thống...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
