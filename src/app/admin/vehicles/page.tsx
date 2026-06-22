'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, Edit3, Trash2, CheckCircle, XCircle, Eye, EyeOff, 
  ArrowUpDown, Image as ImageIcon, Sparkles, AlertCircle, Save, X,
  ArrowUp, ArrowDown, Star, Upload, FileText, CheckSquare, ListPlus
} from 'lucide-react';
import db from '@/lib/db';
import { uploadImage } from '@/lib/db/upload';
import { Vehicle, Brand, Category, VehicleImage } from '@/lib/db/types';

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Filters
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState<'all' | 'new' | 'old'>('all');
  const [soldFilter, setSoldFilter] = useState<'all' | 'sold' | 'selling'>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Partial<Vehicle> | null>(null);
  const [vehicleImages, setVehicleImages] = useState<{ id?: string; image_url: string; sort_order: number; is_cover: boolean }[]>([]);
  const [specItems, setSpecItems] = useState<{ key: string; value: string }[]>([]);
  const [checklistItems, setChecklistItems] = useState<{ key: string; value: string }[]>([]);
  
  // New spec/checklist row temp inputs
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');
  const [newCheckKey, setNewCheckKey] = useState('');
  const [newCheckVal, setNewCheckVal] = useState('');

  // Upload image state
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiltersAndData = async () => {
    try {
      const [b, c] = await Promise.all([db.getBrands(), db.getCategories()]);
      setBrands(b);
      setCategories(c);
    } catch (err) {
      console.error('Error fetching brands/categories:', err);
    }
  };

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const res = await db.getVehicles({
        search: search || undefined,
        brandSlug: brandFilter || undefined,
        categorySlug: categoryFilter || undefined,
        condition: conditionFilter,
        isSold: soldFilter === 'sold' ? true : soldFilter === 'selling' ? false : undefined,
        page,
        limit,
        sort: 'latest'
      });
      setVehicles(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error('Error loading vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiltersAndData();
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [search, brandFilter, categoryFilter, conditionFilter, soldFilter, page]);

  // Open Modal for New Vehicle
  const handleCreateNew = () => {
    setSelectedVehicle({
      name: '',
      brand_id: brands[0]?.id || '',
      category_id: categories[0]?.id || '',
      sku: '',
      price: 0,
      promo_price: null,
      is_new: true,
      registration_year: new Date().getFullYear(),
      odometer: 0,
      engine_capacity: '',
      color: '',
      brake_type: '',
      fuel_consumption: '',
      warranty: '2 năm hoặc 20.000 km',
      short_desc: '',
      detail_desc: '',
      specs_json: {},
      used_checklist_json: {},
      is_featured: false,
      is_new_arrival: true,
      is_sold: false,
      is_visible: true,
    });
    setVehicleImages([]);
    setSpecItems([]);
    setChecklistItems([]);
    setIsModalOpen(true);
  };

  // Open Modal for Edit Vehicle
  const handleEditVehicle = async (slug: string) => {
    try {
      setActionLoading(true);
      const res = await db.getVehicleBySlug(slug);
      if (res) {
        const { vehicle, images } = res;
        setSelectedVehicle(vehicle);
        setVehicleImages(images.map(img => ({
          id: img.id,
          image_url: img.image_url,
          sort_order: img.sort_order,
          is_cover: img.is_cover
        })));
        
        // Parse specs_json key-value pairs
        const specs = Object.entries(vehicle.specs_json || {}).map(([key, value]) => ({ key, value }));
        setSpecItems(specs);

        // Parse used_checklist_json key-value pairs
        const checklist = Object.entries(vehicle.used_checklist_json || {}).map(([key, value]) => ({ key, value }));
        setChecklistItems(checklist);

        setIsModalOpen(true);
      }
    } catch (err) {
      alert('Không tìm thấy thông tin xe máy.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá dòng xe "${name}"? Thao tác này không thể hoàn tác.`)) {
      return;
    }

    try {
      setActionLoading(true);
      await db.deleteVehicle(id);
      alert('Đã xóa xe máy thành công.');
      loadVehicles();
    } catch (err) {
      alert('Lỗi khi xóa dữ liệu.');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Visibility directly from table
  const handleToggleVisible = async (v: Vehicle) => {
    try {
      const res = await db.getVehicleBySlug(v.slug);
      if (res) {
        const { vehicle, images } = res;
        const updatedVehicle = { ...vehicle, is_visible: !vehicle.is_visible };
        await db.saveVehicle(updatedVehicle, images);
        loadVehicles();
      }
    } catch (err) {
      alert('Lỗi thay đổi trạng thái hiển thị.');
    }
  };

  // Toggle Sold directly from table
  const handleToggleSold = async (v: Vehicle) => {
    try {
      const res = await db.getVehicleBySlug(v.slug);
      if (res) {
        const { vehicle, images } = res;
        const updatedVehicle = { ...vehicle, is_sold: !vehicle.is_sold };
        await db.saveVehicle(updatedVehicle, images);
        loadVehicles();
      }
    } catch (err) {
      alert('Lỗi thay đổi trạng thái bán xe.');
    }
  };

  // Spec items helpers
  const addSpecItem = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setSpecItems([...specItems, { key: newSpecKey.trim(), value: newSpecVal.trim() }]);
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const removeSpecItem = (idx: number) => {
    setSpecItems(specItems.filter((_, i) => i !== idx));
  };

  // Checklist items helpers
  const addChecklistItem = () => {
    if (!newCheckKey.trim() || !newCheckVal.trim()) return;
    setChecklistItems([...checklistItems, { key: newCheckKey.trim(), value: newCheckVal.trim() }]);
    setNewCheckKey('');
    setNewCheckVal('');
  };

  const removeChecklistItem = (idx: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== idx));
  };

  // File Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploads = Array.from(files).map(async (file, idx) => {
        const url = await uploadImage(file, 'vehicles');
        return {
          image_url: url,
          sort_order: vehicleImages.length + idx,
          is_cover: vehicleImages.length === 0 && idx === 0
        };
      });

      const uploaded = await Promise.all(uploads);
      setVehicleImages([...vehicleImages, ...uploaded]);
    } catch (err) {
      alert('Lỗi tải ảnh lên hệ thống.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const addImageUrl = () => {
    const url = prompt('Nhập đường dẫn URL ảnh liên kết:');
    if (!url || !url.trim()) return;
    setVehicleImages([...vehicleImages, {
      image_url: url.trim(),
      sort_order: vehicleImages.length,
      is_cover: vehicleImages.length === 0
    }]);
  };

  // Cover Image helper
  const setAsCover = (idx: number) => {
    const updated = vehicleImages.map((img, i) => ({
      ...img,
      is_cover: i === idx
    }));
    setVehicleImages(updated);
  };

  // Sorting Images helper
  const moveImage = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === vehicleImages.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const newImages = [...vehicleImages];
    const temp = newImages[idx];
    newImages[idx] = newImages[targetIdx];
    newImages[targetIdx] = temp;

    // Reset sort_order index
    const sorted = newImages.map((img, i) => ({ ...img, sort_order: i }));
    setVehicleImages(sorted);
  };

  const removeImage = (idx: number) => {
    const filtered = vehicleImages.filter((_, i) => i !== idx);
    // If we removed cover image, reassign cover to first element if available
    const hasCover = filtered.some(img => img.is_cover);
    if (!hasCover && filtered.length > 0) {
      filtered[0].is_cover = true;
    }
    setVehicleImages(filtered);
  };

  // Save full vehicle form
  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    if (!selectedVehicle.name?.trim()) {
      alert('Vui lòng nhập tên xe máy.');
      return;
    }

    if (!selectedVehicle.brand_id) {
      alert('Vui lòng chọn Hãng sản xuất.');
      return;
    }

    setActionLoading(true);

    try {
      // Map arrays back into spec objects
      const specs_json: Record<string, string> = {};
      specItems.forEach(item => {
        specs_json[item.key] = item.value;
      });

      const used_checklist_json: Record<string, string> = {};
      checklistItems.forEach(item => {
        used_checklist_json[item.key] = item.value;
      });

      // Generate slug automatically if empty
      const slug = selectedVehicle.slug || selectedVehicle.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

      const vehicleData = {
        ...selectedVehicle,
        slug,
        specs_json,
        used_checklist_json
      } as Omit<Vehicle, 'id'> & { id?: string };

      await db.saveVehicle(vehicleData, vehicleImages);
      alert('Lưu thông tin xe máy thành công.');
      setIsModalOpen(false);
      loadVehicles();
    } catch (err: any) {
      alert('Lỗi lưu thông tin: ' + (err.message || err));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
            Quản Lý Xe Máy
          </h1>
          <p className="text-brand-gray text-xs mt-1">
            Thêm mới, sửa đổi thông tin chi tiết, chỉnh sửa thông số kỹ thuật xe máy và cấu hình ảnh.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 bg-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-brand-red/90 transition-all cursor-pointer shadow-md shadow-brand-red/10"
          style={{ minHeight: '44px' }}
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Thêm dòng xe mới</span>
        </button>
      </div>

      {/* Filter Options */}
      <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm tên, SKU..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs text-brand-dark"
            style={{ minHeight: '40px' }}
          />
        </div>

        {/* Brand */}
        <select
          value={brandFilter}
          onChange={(e) => { setBrandFilter(e.target.value); setPage(1); }}
          className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer"
          style={{ minHeight: '40px' }}
        >
          <option value="">Tất cả hãng xe</option>
          {brands.map(b => (
            <option key={b.id} value={b.slug}>{b.name}</option>
          ))}
        </select>

        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer"
          style={{ minHeight: '40px' }}
        >
          <option value="">Tất cả phân loại dòng</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* Condition */}
        <select
          value={conditionFilter}
          onChange={(e) => { setConditionFilter(e.target.value as any); setPage(1); }}
          className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer"
          style={{ minHeight: '40px' }}
        >
          <option value="all">Mới & Cũ tuyển chọn</option>
          <option value="new">Xe máy mới</option>
          <option value="old">Xe máy đã qua sử dụng</option>
        </select>

        {/* Status Sold */}
        <select
          value={soldFilter}
          onChange={(e) => { setSoldFilter(e.target.value as any); setPage(1); }}
          className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer"
          style={{ minHeight: '40px' }}
        >
          <option value="all">Tất cả tình trạng bán</option>
          <option value="selling">Đang bán lẻ</option>
          <option value="sold">Đã bán xong</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
            <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách xe máy...</span>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="py-20 text-center text-brand-gray text-xs">
            Không tìm thấy dòng xe nào khớp với điều kiện lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-extrabold uppercase text-brand-gray tracking-wider">
                  <th className="p-4 w-16">Cover</th>
                  <th className="p-4">Tên xe / SKU</th>
                  <th className="p-4">Hãng & Dòng</th>
                  <th className="p-4">Giá bán</th>
                  <th className="p-4">Tình trạng</th>
                  <th className="p-4 text-center">Nổi bật / Mới về</th>
                  <th className="p-4 text-center">Hiển thị</th>
                  <th className="p-4 text-center">Trạng thái bán</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {vehicles.map((v) => {
                  const brand = brands.find(b => b.id === v.brand_id);
                  const cat = categories.find(c => c.id === v.category_id);
                  
                  return (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-9 rounded-md overflow-hidden bg-brand-light relative border border-gray-200">
                          {v.og_image ? (
                            <img
                              src={v.og_image}
                              alt={v.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-brand-dark block text-sm">{v.name}</span>
                          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">{v.sku || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-4 text-brand-dark">
                        <div className="space-y-0.5">
                          <span className="block font-bold">{brand?.name || 'N/A'}</span>
                          <span className="block text-brand-gray text-[10px] uppercase font-bold">{cat?.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-brand-dark">
                        <div className="space-y-0.5">
                          {v.promo_price ? (
                            <>
                              <span className="text-brand-red block">{v.promo_price.toLocaleString('vi-VN')} đ</span>
                              <span className="text-gray-400 line-through block text-[10px]">{v.price.toLocaleString('vi-VN')} đ</span>
                            </>
                          ) : (
                            <span className="block">{v.price.toLocaleString('vi-VN')} đ</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {v.is_new ? (
                          <span className="px-2 py-0.5 bg-blue-600/10 text-blue-500 font-extrabold uppercase rounded text-[9px] border border-blue-500/20">Xe mới 100%</span>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 font-extrabold uppercase rounded text-[9px] border border-amber-500/20 block w-max">Xe cũ tuyển chọn</span>
                            <span className="text-[10px] text-gray-500 block font-mono">ĐK: {v.registration_year || 'N/A'} | {v.odometer?.toLocaleString('vi-VN')} km</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {v.is_featured && <span className="px-1.5 py-0.5 bg-amber-500 text-white font-extrabold text-[8px] uppercase tracking-wider rounded">Hot</span>}
                          {v.is_new_arrival && <span className="px-1.5 py-0.5 bg-emerald-600 text-white font-extrabold text-[8px] uppercase tracking-wider rounded">New</span>}
                          {!v.is_featured && !v.is_new_arrival && <span className="text-gray-400 text-[10px]">-</span>}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleVisible(v)}
                          className={`p-1.5 rounded transition-all cursor-pointer ${
                            v.is_visible 
                              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                              : 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                          }`}
                        >
                          {v.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleSold(v)}
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full cursor-pointer transition-all border ${
                            v.is_sold
                              ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                          }`}
                        >
                          {v.is_sold ? 'Đã bán' : 'Đang bán'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditVehicle(v.slug)}
                            className="p-2 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVehicle(v.id, v.name)}
                            className="p-2 hover:bg-rose-100 text-rose-600 rounded transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="p-4 border-t border-gray-150 flex justify-between items-center bg-gray-50 text-xs">
            <span className="text-brand-gray font-bold uppercase tracking-wider text-[10px]">
              Hiển thị {(page - 1) * limit + 1} - {Math.min(page * limit, total)} trên tổng số {total} xe
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3.5 py-2 border border-gray-250 bg-white text-brand-dark font-bold uppercase rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all cursor-pointer"
                style={{ minHeight: '36px' }}
              >
                Trước
              </button>
              <span className="font-bold px-2">{page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page * limit >= total}
                className="px-3.5 py-2 border border-gray-250 bg-white text-brand-dark font-bold uppercase rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all cursor-pointer"
                style={{ minHeight: '36px' }}
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CRUD Add/Edit Modal */}
      {isModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-lg uppercase tracking-wider">
                  {selectedVehicle.id ? 'Cập Nhật Thông Tin Xe Máy' : 'Đăng Bán Xe Máy Mới'}
                </h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  {selectedVehicle.id ? `ID: ${selectedVehicle.id}` : 'Điền đầy đủ các thông số chi tiết'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <form onSubmit={handleSaveVehicle} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
              
              {/* SECTION 1: General Info */}
              <div className="space-y-4">
                <h3 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Thông tin cơ bản</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Tên dòng xe *</label>
                    <input
                      type="text"
                      value={selectedVehicle.name || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, name: e.target.value })}
                      placeholder="Ví dụ: Honda SH 150i ABS Thể Thao 2024"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                      required
                    />
                  </div>

                  {/* SKU */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">SKU / Mã định danh</label>
                    <input
                      type="text"
                      value={selectedVehicle.sku || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, sku: e.target.value })}
                      placeholder="Mã SKU (để trống tự tạo)"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* Brand Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Hãng sản xuất *</label>
                    <select
                      value={selectedVehicle.brand_id || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, brand_id: e.target.value })}
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-3 text-xs text-brand-dark cursor-pointer"
                      style={{ minHeight: '44px' }}
                      required
                    >
                      {brands.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Phân loại dòng xe *</label>
                    <select
                      value={selectedVehicle.category_id || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, category_id: e.target.value })}
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-3 text-xs text-brand-dark cursor-pointer"
                      style={{ minHeight: '44px' }}
                      required
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Condition Switcher */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Tình trạng xe</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedVehicle({ ...selectedVehicle, is_new: true })}
                        className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all uppercase cursor-pointer ${
                          selectedVehicle.is_new 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                            : 'bg-brand-light border-gray-200 text-brand-gray'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        Xe mới 100%
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedVehicle({ ...selectedVehicle, is_new: false })}
                        className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all uppercase cursor-pointer ${
                          !selectedVehicle.is_new 
                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm' 
                            : 'bg-brand-light border-gray-200 text-brand-gray'
                        }`}
                        style={{ minHeight: '44px' }}
                      >
                        Xe cũ tuyển chọn
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Giá niêm yết (VNĐ) *</label>
                    <input
                      type="number"
                      value={selectedVehicle.price || 0}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, price: Number(e.target.value) })}
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs font-mono font-bold text-brand-dark"
                      style={{ minHeight: '44px' }}
                      required
                    />
                  </div>

                  {/* Promo Price */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Giá ưu đãi / Khuyến mại (để trống nếu không giảm)</label>
                    <input
                      type="number"
                      value={selectedVehicle.promo_price || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, promo_price: e.target.value ? Number(e.target.value) : null })}
                      placeholder="Mức giá bán ưu đãi khách"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs font-mono font-bold text-brand-red"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* Engine capacity */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Dung tích động cơ (ví dụ: 125 cc, 150 cc)</label>
                    <input
                      type="text"
                      value={selectedVehicle.engine_capacity || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, engine_capacity: e.target.value })}
                      placeholder="Dung tích xy lanh"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* Registration Year (Used Bike only) */}
                  {!selectedVehicle.is_new && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold text-amber-600">Năm đăng ký lần đầu (Xe cũ)</label>
                      <input
                        type="number"
                        value={selectedVehicle.registration_year || ''}
                        onChange={(e) => setSelectedVehicle({ ...selectedVehicle, registration_year: e.target.value ? Number(e.target.value) : null })}
                        className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs font-mono text-brand-dark"
                        style={{ minHeight: '44px' }}
                      />
                    </div>
                  )}

                  {/* Odometer (Used Bike only) */}
                  {!selectedVehicle.is_new && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold text-amber-600">Số km đã đi (Odometer)</label>
                      <input
                        type="number"
                        value={selectedVehicle.odometer || 0}
                        onChange={(e) => setSelectedVehicle({ ...selectedVehicle, odometer: Number(e.target.value) })}
                        className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs font-mono text-brand-dark"
                        style={{ minHeight: '44px' }}
                      />
                    </div>
                  )}

                  {/* Color */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Màu sắc sơn</label>
                    <input
                      type="text"
                      value={selectedVehicle.color || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, color: e.target.value })}
                      placeholder="Ví dụ: Đỏ Đen, Trắng Ngọc Trai"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* Brake type */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Loại phanh xe</label>
                    <input
                      type="text"
                      value={selectedVehicle.brake_type || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, brake_type: e.target.value })}
                      placeholder="Ví dụ: Phanh đĩa ABS, Phanh CBS"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* Fuel consumption */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Mức tiêu thụ nhiên liệu (lít / 100km)</label>
                    <input
                      type="text"
                      value={selectedVehicle.fuel_consumption || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, fuel_consumption: e.target.value })}
                      placeholder="Ví dụ: 1.85 L/100km"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* Warranty */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Chính sách bảo hành</label>
                    <input
                      type="text"
                      value={selectedVehicle.warranty || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, warranty: e.target.value })}
                      placeholder="Ví dụ: 2 năm hoặc 20.000 km"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>
                </div>

                {/* Short desc */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Mô tả ngắn gọn (hiển thị danh mục)</label>
                  <textarea
                    value={selectedVehicle.short_desc || ''}
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, short_desc: e.target.value })}
                    rows={2}
                    placeholder="Tóm tắt ngắn gọn các điểm đặc sắc của dòng xe..."
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark resize-y"
                  ></textarea>
                </div>

                {/* Detail desc */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Mô tả chi tiết bài viết sản phẩm</label>
                  <textarea
                    value={selectedVehicle.detail_desc || ''}
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, detail_desc: e.target.value })}
                    rows={6}
                    placeholder="Mô tả các tính năng công nghệ, cảm giác lái, khả năng vận hành... (Hỗ trợ viết văn bản tự do)"
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark resize-y"
                  ></textarea>
                </div>
              </div>

              {/* SECTION 2: Image Gallery Manager */}
              <div className="space-y-4">
                <h3 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>Thư viện ảnh sản phẩm</span>
                </h3>

                {/* Drop/Select zone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-brand-red rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-red/5 transition-all text-center space-y-2.5"
                  >
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-brand-red" />
                    <div className="text-xs font-bold text-brand-dark uppercase tracking-wider">Tải tệp ảnh từ máy tính</div>
                    <p className="text-[10px] text-brand-gray leading-tight">Hỗ trợ JPG, PNG, WEBP. Chọn nhiều tệp để tải lên một lượt.</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <div 
                    onClick={addImageUrl}
                    className="border-2 border-dashed border-gray-300 hover:border-brand-red rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-red/5 transition-all text-center space-y-2.5"
                  >
                    <Star className="w-8 h-8 text-gray-400 group-hover:text-brand-red" />
                    <div className="text-xs font-bold text-brand-dark uppercase tracking-wider">Chèn ảnh từ link URL</div>
                    <p className="text-[10px] text-brand-gray leading-tight">Dán địa chỉ link ảnh có sẵn (Ví dụ từ CDN hoặc website của hãng).</p>
                  </div>
                </div>

                {uploadingImage && (
                  <div className="flex items-center space-x-2 justify-center bg-gray-55 text-brand-gray font-bold text-[10px] py-2 rounded-lg uppercase tracking-wider">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-brand-red"></div>
                    <span>Đang xử lý tải ảnh lên hệ thống...</span>
                  </div>
                )}

                {/* Images list */}
                {vehicleImages.length === 0 ? (
                  <div className="bg-brand-light p-8 text-center rounded-xl border border-gray-150 text-xs text-brand-gray">
                    Chưa có ảnh nào được liên kết với dòng xe này. Vui lòng tải ảnh lên.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                    {vehicleImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`bg-white rounded-xl border p-2 relative flex flex-col justify-between space-y-2 group shadow-sm transition-all ${
                          img.is_cover ? 'border-brand-red shadow shadow-brand-red/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-brand-light relative border border-gray-100">
                          <img 
                            src={img.image_url} 
                            alt={`Preview ${idx}`}
                            className="w-full h-full object-cover"
                          />
                          {img.is_cover && (
                            <span className="absolute top-1.5 left-1.5 bg-brand-red text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                              Cover
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-gray-400">
                          <button
                            type="button"
                            onClick={() => setAsCover(idx)}
                            disabled={img.is_cover}
                            className={`p-1 rounded text-[10px] font-bold uppercase transition-colors flex items-center space-x-0.5 cursor-pointer ${
                              img.is_cover 
                                ? 'text-brand-red' 
                                : 'hover:text-brand-dark'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5" fill={img.is_cover ? 'currentColor' : 'none'} />
                            <span>Cover</span>
                          </button>

                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={() => moveImage(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 hover:text-brand-dark rounded disabled:opacity-30 cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveImage(idx, 'down')}
                              disabled={idx === vehicleImages.length - 1}
                              className="p-1 hover:text-brand-dark rounded disabled:opacity-30 cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="p-1 hover:text-brand-red hover:bg-rose-50 rounded text-rose-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 3: Key-Value Specifications Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Technical Specs Editor */}
                <div className="space-y-4">
                  <h3 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                    <ListPlus className="w-4 h-4" />
                    <span>Thông số kỹ thuật kỹ thuật (Specs)</span>
                  </h3>

                  {/* Add Row */}
                  <div className="grid grid-cols-2 gap-2 bg-brand-light p-3 rounded-lg border border-gray-200">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-brand-gray uppercase tracking-widest block">Tên thông số</span>
                      <input 
                        type="text" 
                        placeholder="Ví dụ: Công suất tối đa"
                        value={newSpecKey}
                        onChange={e => setNewSpecKey(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-red focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <span className="text-[9px] font-bold text-brand-gray uppercase tracking-widest block">Giá trị</span>
                      <div className="flex items-center space-x-1">
                        <input 
                          type="text" 
                          placeholder="Ví dụ: 11.2 kW / 8500 rpm"
                          value={newSpecVal}
                          onChange={e => setNewSpecVal(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-red focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addSpecItem}
                          className="bg-brand-dark text-white p-2 rounded hover:bg-brand-red transition-all cursor-pointer shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Specs List */}
                  {specItems.length === 0 ? (
                    <p className="text-xs text-brand-gray italic p-3 bg-brand-light rounded-lg border border-gray-150 text-center">Chưa có thông số nào được tạo. Hãy nhập mẫu phía trên.</p>
                  ) : (
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 max-h-64 overflow-y-auto">
                      {specItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-55 text-xs">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <span className="font-bold text-brand-dark block pr-2 truncate">{item.key}</span>
                            <span className="text-brand-gray truncate">{item.value}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSpecItem(idx)}
                            className="p-1 hover:bg-rose-50 text-rose-500 rounded ml-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Used Checklist Config Editor */}
                <div className="space-y-4">
                  <h3 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                    <CheckSquare className="w-4 h-4" />
                    <span>Cam kết chất lượng (Chỉ áp dụng với Xe cũ)</span>
                  </h3>

                  {/* Warning if bike is marked as new */}
                  {selectedVehicle.is_new && (
                    <div className="bg-blue-600/5 text-blue-500 text-[10px] p-3 rounded-lg border border-blue-600/10 flex items-start space-x-2">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">Dòng xe đang được đánh dấu là <strong>Xe mới 100%</strong>. Dữ liệu cam kết chất lượng checklist sẽ không hiển thị công khai ở trang chi tiết sản phẩm.</p>
                    </div>
                  )}

                  {/* Add Row */}
                  <div className="grid grid-cols-2 gap-2 bg-brand-light p-3 rounded-lg border border-gray-200">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-brand-gray uppercase tracking-widest block">Bộ phận kiểm định</span>
                      <input 
                        type="text" 
                        placeholder="Ví dụ: Động cơ & Hộp số"
                        value={newCheckKey}
                        onChange={e => setNewCheckKey(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-red focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <span className="text-[9px] font-bold text-brand-gray uppercase tracking-widest block">Hiện trạng / Đánh giá</span>
                      <div className="flex items-center space-x-1">
                        <input 
                          type="text" 
                          placeholder="Ví dụ: Ổn định, không tiếng động lạ"
                          value={newCheckVal}
                          onChange={e => setNewCheckVal(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs text-brand-dark focus:border-brand-red focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addChecklistItem}
                          className="bg-brand-dark text-white p-2 rounded hover:bg-brand-red transition-all cursor-pointer shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Checklist List */}
                  {checklistItems.length === 0 ? (
                    <p className="text-xs text-brand-gray italic p-3 bg-brand-light rounded-lg border border-gray-150 text-center">Chưa cấu hình kiểm định. Hãy thêm danh mục phía trên.</p>
                  ) : (
                    <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 max-h-64 overflow-y-auto">
                      {checklistItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 hover:bg-gray-55 text-xs">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <span className="font-bold text-brand-dark block pr-2 truncate">{item.key}</span>
                            <span className="text-brand-gray truncate">{item.value}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeChecklistItem(idx)}
                            className="p-1 hover:bg-rose-50 text-rose-500 rounded ml-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 4: Badges & Display Options */}
              <div className="space-y-4">
                <h3 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Trạng thái hiển thị & Nhãn SEO</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* is_featured */}
                  <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={Boolean(selectedVehicle.is_featured)}
                      onChange={e => setSelectedVehicle({ ...selectedVehicle, is_featured: e.target.checked })}
                      className="rounded border-gray-300 focus:ring-brand-red text-brand-red w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-brand-dark block uppercase tracking-wider text-[10px]">Xe nổi bật (HOT)</span>
                      <span className="text-brand-gray text-[9px] block">Ghim hiển thị trang chủ</span>
                    </div>
                  </label>

                  {/* is_new_arrival */}
                  <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={Boolean(selectedVehicle.is_new_arrival)}
                      onChange={e => setSelectedVehicle({ ...selectedVehicle, is_new_arrival: e.target.checked })}
                      className="rounded border-gray-300 focus:ring-brand-red text-brand-red w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-brand-dark block uppercase tracking-wider text-[10px]">Dòng xe mới về</span>
                      <span className="text-brand-gray text-[9px] block">Ghim nhãn 'Xe Mới Về'</span>
                    </div>
                  </label>

                  {/* is_sold */}
                  <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={Boolean(selectedVehicle.is_sold)}
                      onChange={e => setSelectedVehicle({ ...selectedVehicle, is_sold: e.target.checked })}
                      className="rounded border-gray-300 focus:ring-brand-red text-brand-red w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-brand-dark block uppercase tracking-wider text-[10px]">Đã bán (Sold Out)</span>
                      <span className="text-brand-gray text-[9px] block">Hiện tag đã bán công khai</span>
                    </div>
                  </label>

                  {/* is_visible */}
                  <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50/50 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={Boolean(selectedVehicle.is_visible !== false)}
                      onChange={e => setSelectedVehicle({ ...selectedVehicle, is_visible: e.target.checked })}
                      className="rounded border-gray-300 focus:ring-brand-red text-brand-red w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-brand-dark block uppercase tracking-wider text-[10px]">Bật hiển thị</span>
                      <span className="text-brand-gray text-[9px] block">Cho phép truy cập công khai</span>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* SEO Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">SEO Meta Title (Để trống tự sinh)</label>
                    <input
                      type="text"
                      value={selectedVehicle.seo_title || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, seo_title: e.target.value })}
                      placeholder="Ken Motor | Tên Xe uy tín giá tốt"
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>

                  {/* SEO Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">SEO Meta Description</label>
                    <input
                      type="text"
                      value={selectedVehicle.seo_description || ''}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, seo_description: e.target.value })}
                      placeholder="Mô tả xe thu hút khách hàng tìm kiếm trên Google..."
                      className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark"
                      style={{ minHeight: '44px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons inside Form */}
              <div className="pt-6 border-t border-gray-150 flex justify-end space-x-3 bg-white sticky bottom-0 z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 border border-gray-200 text-brand-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                  style={{ minHeight: '44px' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex items-center space-x-2 bg-brand-red text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-brand-red/90 transition-all cursor-pointer shadow-md shadow-brand-red/10 disabled:opacity-50"
                  style={{ minHeight: '44px' }}
                >
                  <Save className="w-4 h-4" />
                  <span>{actionLoading ? 'Đang lưu trữ...' : 'Lưu thông tin'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
