'use client';

import React, { useState } from 'react';
import { Camera, Send, CheckCircle2, Upload, Trash2 } from 'lucide-react';
import db from '@/lib/db';

export default function SellOldVehicleForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [brandName, setBrandName] = useState('');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [odometer, setOdometer] = useState('');
  const [statusDesc, setStatusDesc] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');

  // Image Upload States
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setError(null);
    const limit = 4;
    if (images.length + files.length > limit) {
      setError(`Bạn chỉ có thể tải lên tối đa ${limit} hình ảnh của xe.`);
      return;
    }

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chỉ tải lên tệp tin định dạng hình ảnh.');
        return;
      }
      
      // Validate file size (max 2MB to fit local storage limit)
      if (file.size > 2 * 1024 * 1024) {
        setError('Dung lượng ảnh tối đa là 2MB để đảm bảo tải lên nhanh chóng.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !brandName.trim() || !modelName.trim()) {
      setError('Vui lòng nhập đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.submitSellRequest({
        name: name.trim(),
        phone: phone.trim(),
        brand_name: brandName.trim(),
        model_name: modelName.trim(),
        year: year ? Number(year) : null,
        license_plate: licensePlate.trim() || null,
        odometer: odometer ? Number(odometer) : null,
        status_description: statusDesc.trim() || null,
        image_urls: images,
        desired_price: desiredPrice ? Number(desiredPrice) : null
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting trade-in request:', err);
      setError('Đã có lỗi xảy ra khi gửi yêu cầu. Quý khách vui lòng gọi Hotline cửa hàng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <div className="flex justify-center text-emerald-600">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h2 className="font-bevietnam font-extrabold text-2xl text-emerald-950">Gửi thông tin bán xe thành công!</h2>
        <p className="text-sm text-emerald-800 leading-relaxed text-balance">
          Cảm ơn anh/chị <strong>{name}</strong>. Cửa hàng xe máy <strong>Ken Motor</strong> đã ghi nhận yêu cầu bán xe <strong>{brandName} {modelName}</strong>. Bộ phận thẩm định của showroom sẽ liên hệ qua điện thoại <strong>{phone}</strong> trong vòng 30 phút để báo giá thu mua dự kiến.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setImages([]);
            setBrandName('');
            setModelName('');
            setYear('');
            setLicensePlate('');
            setOdometer('');
            setStatusDesc('');
            setDesiredPrice('');
          }}
          className="bg-brand-dark hover:bg-brand-red text-white font-bold py-2.5 px-6 rounded text-xs uppercase transition-colors"
          style={{ minHeight: '44px' }}
        >
          Đăng ký bán thêm xe khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
      <h2 className="font-bevietnam font-bold text-lg lg:text-xl text-brand-dark border-b border-brand-border pb-3 flex items-center space-x-2">
        <Camera className="w-5.5 h-5.5 text-brand-red" />
        <span>Thông tin xe cũ đăng ký thu mua</span>
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-xs text-brand-red font-bold p-3 rounded">
          {error}
        </div>
      )}

      {/* Grid segments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Họ tên khách hàng *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

        {/* Customer Phone */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Số điện thoại *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 0987654321"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

        {/* Brand Name */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Hãng xe *</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Ví dụ: Honda, Yamaha, Vespa..."
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

        {/* Model Name */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Dòng xe *</label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="Ví dụ: Vision 2019, Exciter 150..."
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Đời xe / Năm đăng ký</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Ví dụ: 2019"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
          />
        </div>

        {/* License plate */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Biển số xe (Nếu muốn cung cấp)</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="Ví dụ: 66F1-123.45"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
          />
        </div>

        {/* Odometer */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Số Kilômét đã đi (km)</label>
          <input
            type="number"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            placeholder="Ví dụ: 15000"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
          />
        </div>

        {/* Desired Price */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Mức giá mong muốn bán (VNĐ)</label>
          <input
            type="number"
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(e.target.value)}
            placeholder="Ví dụ: 18000000"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
          />
        </div>

      </div>

      {/* Status Details */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Mô tả tình trạng xe</label>
        <textarea
          rows={3}
          value={statusDesc}
          onChange={(e) => setStatusDesc(e.target.value)}
          placeholder="Mô tả máy móc nguyên bản hay đã sửa chữa, xước xát dàn áo, vỏ xe lốp phanh thế nào..."
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
        ></textarea>
      </div>

      {/* Image Upload Area */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">Hình ảnh thực tế xe (Tối đa 4 ảnh)</label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Thumbnails of already selected files */}
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative h-24 w-full rounded-lg overflow-hidden border border-brand-border bg-gray-50 group">
              <img
                src={imgUrl}
                alt={`Selected bike photo ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-brand-red rounded-full text-white transition-colors"
                title="Xóa ảnh"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Upload placeholder file trigger */}
          {images.length < 4 && (
            <label className="border-2 border-dashed border-brand-border hover:border-brand-red rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-light/30 transition-all text-brand-gray hover:text-brand-red select-none">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Chọn ảnh xe</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md shadow-brand-red/10"
        style={{ minHeight: '44px' }}
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Đang gửi hồ sơ đăng bán...' : 'Gửi hồ sơ đăng ký'}</span>
      </button>

    </form>
  );
}
