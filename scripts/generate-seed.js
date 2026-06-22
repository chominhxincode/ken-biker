const fs = require('fs');
const path = require('path');

// Helper to generate UUIDs deterministically for seed consistency
function generateUUID(namespace, index) {
  const hash = require('crypto').createHash('sha256').update(`${namespace}-${index}`).digest('hex');
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    '4' + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 17), 16) & 0x3) | 0x8).toString(16) + hash.substring(17, 20),
    hash.substring(20, 32)
  ].join('-');
}

// 1. Categories
const categories = [
  { id: generateUUID('category', 1), name: 'Xe tay ga', slug: 'xe-tay-ga', image_url: '/demo/categories/xe-tay-ga.svg', sort_order: 1, seo_title: 'Xe Tay Ga Cao Cấp & Tiết Kiệm Xăng | Ken Motor', seo_description: 'Mua bán các dòng xe tay ga mới nhất từ Honda, Yamaha, Piaggio. Hỗ trợ trả góp nhanh, ưu đãi hấp dẫn.' },
  { id: generateUUID('category', 2), name: 'Xe số', slug: 'xe-so', image_url: '/demo/categories/xe-so.svg', sort_order: 2, seo_title: 'Xe Số Bền Bỉ, Giá Rẻ | Ken Motor', seo_description: 'Tổng hợp các dòng xe số Wave Alpha, Sirius, Future chính hãng giá tốt nhất thị trường.' },
  { id: generateUUID('category', 3), name: 'Xe côn tay', slug: 'xe-con-tay', image_url: '/demo/categories/xe-con-tay.svg', sort_order: 3, seo_title: 'Xe Côn Tay Thể Thao, Đầy Phấn Khích | Ken Motor', seo_description: 'Danh sách xe côn tay Winner X, Exciter, Raider chính hãng. Đủ màu sắc, hỗ trợ trả góp lãi suất thấp.' },
  { id: generateUUID('category', 4), name: 'Xe điện', slug: 'xe-dien', image_url: '/demo/categories/xe-dien.svg', sort_order: 4, seo_title: 'Xe Máy Điện Thông Minh, Tiết Kiệm | Ken Motor', seo_description: 'Khám phá xe máy điện VinFast Evo200, Feliz, Klara hiện đại, thân thiện môi trường.' },
  { id: generateUUID('category', 5), name: 'Xe phân khối lớn', slug: 'xe-phan-khoi-lon', image_url: '/demo/categories/xe-phan-khoi-lon.svg', sort_order: 5, seo_title: 'Xe Phân Khối Lớn (PKL) Ducati, Kawasaki, KTM | Ken Motor', seo_description: 'Showroom xe phân khối lớn cao cấp tại Đồng Tháp. Trải nghiệm Ducati, Kawasaki, KTM chính hãng.' },
  { id: generateUUID('category', 6), name: 'Xe cũ tuyển chọn', slug: 'xe-cu-tuyen-chon', image_url: '/demo/categories/xe-cu-tuyen-chon.svg', sort_order: 6, seo_title: 'Xe Máy Cũ Chất Lượng, Giá Tốt | Ken Motor', seo_description: 'Các dòng xe máy cũ đã qua sử dụng được kiểm định nghiêm ngặt, giấy tờ minh bạch, bảo hành dài hạn.' },
  { id: generateUUID('category', 7), name: 'Phụ kiện xe máy', slug: 'phu-kien-xe-may', image_url: '/demo/categories/phu-kien-xe-may.svg', sort_order: 7, seo_title: 'Phụ Kiện, Đồ Chơi Xe Máy Chính Hãng | Ken Motor', seo_description: 'Mũ bảo hiểm, dầu nhớt Motul, khóa chống trộm, đồ chơi xe kiểng chính hãng giá tốt.' }
];

// 2. Brands
const brands = [
  { id: generateUUID('brand', 1), name: 'Honda', slug: 'honda', logo_url: '/demo/brands/honda.svg', seo_title: 'Xe Máy Honda Chính Hãng | Ken Motor', seo_description: 'Mua bán các dòng xe máy Honda: Vision, Air Blade, SH, Wave Alpha chính hãng.' },
  { id: generateUUID('brand', 2), name: 'Yamaha', slug: 'yamaha', logo_url: '/demo/brands/yamaha.svg', seo_title: 'Xe Máy Yamaha Thời Trang, Thể Thao | Ken Motor', seo_description: 'Báo giá xe máy Yamaha Exciter, Grande, Janus, Sirius chính hãng mới nhất.' },
  { id: generateUUID('brand', 3), name: 'Suzuki', slug: 'suzuki', logo_url: '/demo/brands/suzuki.svg', seo_title: 'Xe Máy Suzuki Mạnh Mẽ, Độc Chất | Ken Motor', seo_description: 'Suzuki Raider, Satria, Burgman Street chính hãng tại Ken Motor.' },
  { id: generateUUID('brand', 4), name: 'SYM', slug: 'sym', logo_url: '/demo/brands/sym.svg', seo_title: 'Xe Máy SYM Tiện Lợi, Tiết Kiệm | Ken Motor', seo_description: 'Mua bán xe máy SYM Attila, Elegant, Galaxy chính hãng giá rẻ.' },
  { id: generateUUID('brand', 5), name: 'Piaggio', slug: 'piaggio', logo_url: '/demo/brands/piaggio.svg', seo_title: 'Xe Piaggio Liberty, Medley Cao Cấp | Ken Motor', seo_description: 'Showroom xe Piaggio sang trọng phong cách Ý.' },
  { id: generateUUID('brand', 6), name: 'Vespa', slug: 'vespa', logo_url: '/demo/brands/vespa.svg', seo_title: 'Xe Vespa Ý Đẳng Cấp Thời Thượng | Ken Motor', seo_description: 'Vespa Sprint, Primavera, GTS chính hãng đầy quyến rũ.' },
  { id: generateUUID('brand', 7), name: 'VinFast', slug: 'vinfast', logo_url: '/demo/brands/vinfast.svg', seo_title: 'Xe Máy Điện VinFast Thông Minh | Ken Motor', seo_description: 'Báo giá xe máy điện VinFast thông minh chính hãng mới nhất.' },
  { id: generateUUID('brand', 8), name: 'Kawasaki', slug: 'kawasaki', logo_url: '/demo/brands/kawasaki.svg', seo_title: 'Xe PKL Kawasaki Thể Thao | Ken Motor', seo_description: 'Các mẫu xe Kawasaki Ninja 400, Z650, Ninja ZX chính hãng.' },
  { id: generateUUID('brand', 9), name: 'KTM', slug: 'ktm', logo_url: '/demo/brands/ktm.svg', seo_title: 'KTM Duke, RC, Adventure Bụi Bặm | Ken Motor', seo_description: 'Xe cào cào và naked bike KTM cá tính mạnh mẽ.' },
  { id: generateUUID('brand', 10), name: 'Ducati', slug: 'ducati', logo_url: '/demo/brands/ducati.svg', seo_title: 'Ducati Siêu Xe PKL Cao Cấp | Ken Motor', seo_description: 'Độc quyền trải nghiệm các dòng siêu mô tô Ducati tại Đồng Tháp.' }
];

const bikeTemplates = [];

function addBike(brandName, catName, name, price, promoPrice, isNew, regYear, odometer, engine, color, brake, fuel, warranty, specs, checklist = {}) {
  const brand = brands.find(b => b.name === brandName);
  const category = categories.find(c => c.name === catName);
  if (!brand || !category) {
    console.error(`Missing brand ${brandName} or category ${catName}`);
    return;
  }
  bikeTemplates.push({
    brandId: brand.id,
    brandSlug: brand.slug,
    brandName: brand.name,
    categoryId: category.id,
    categorySlug: category.slug,
    categoryName: category.name,
    name,
    price,
    promoPrice,
    isNew,
    regYear,
    odometer,
    engine,
    color,
    brake,
    fuel,
    warranty,
    specs,
    checklist
  });
}

// Populate templates (105 items)
// --- HONDA ---
addBike('Honda', 'Xe tay ga', 'Honda Vision 110cc Tiêu Chuẩn', 31500000, 31000000, true, 2026, 0, '110cc', 'Trắng Đen', 'CBS', '1.85 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP, 4 kỳ, 1 xy-lanh, làm mát bằng không khí', 'Công suất': '6.59 kW / 7500 vòng/phút', 'Độ cao yên': '761 mm', 'Trọng lượng': '95 kg', 'Dung tích cốp': '18 lít' });
addBike('Honda', 'Xe tay ga', 'Honda Vision 110cc Thể Thao', 36500000, null, true, 2026, 0, '110cc', 'Xám Xi Măng', 'CBS', '1.85 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP, eSP+ thế hệ mới', 'Công suất': '6.59 kW / 7500 vòng/phút', 'Độ cao yên': '785 mm', 'Trọng lượng': '98 kg', 'Dung tích cốp': '18 lít' });
addBike('Honda', 'Xe tay ga', 'Honda Lead 125cc Cao Cấp', 41500000, 40900000, true, 2026, 0, '125cc', 'Đỏ Đô', 'CBS', '2.16 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP+ 4 van', 'Công suất': '8.22 kW / 8500 vòng/phút', 'Độ cao yên': '760 mm', 'Trọng lượng': '113 kg', 'Dung tích cốp': '37 lít' });
addBike('Honda', 'Xe tay ga', 'Honda Air Blade 125cc Đặc Biệt', 43000000, 42500000, true, 2026, 0, '125cc', 'Đen Vàng', 'CBS', '2.26 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP+ 4 van, 124.8cc', 'Công suất': '8.75 kW / 8500 vòng/phút', 'Độ cao yên': '775 mm', 'Trọng lượng': '113 kg', 'Dung tích cốp': '23.2 lít' });
addBike('Honda', 'Xe tay ga', 'Honda Air Blade 160cc Đặc Biệt ABS', 57000000, 56000000, true, 2026, 0, '160cc', 'Xanh Xám', 'ABS', '2.3 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP+, 156.9cc', 'Công suất': '11.2 kW / 8000 vòng/phút', 'Độ cao yên': '775 mm', 'Trọng lượng': '114 kg', 'Dung tích cốp': '23.2 lít' });
addBike('Honda', 'Xe tay ga', 'Honda SH Mode 125cc Thể Thao', 64500000, null, true, 2026, 0, '125cc', 'Xám Đen', 'ABS', '2.16 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP+ 4 van, 124.8cc', 'Công suất': '8.2 kW / 8500 vòng/phút', 'Độ cao yên': '765 mm', 'Trọng lượng': '116 kg', 'Dung tích cốp': '18.5 lít' });
addBike('Honda', 'Xe tay ga', 'Honda SH 125i Cao Cấp ABS', 83000000, 82000000, true, 2026, 0, '125cc', 'Trắng', 'ABS', '2.46 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP+ 124.8cc', 'Công suất': '9.6 kW / 8250 vòng/phút', 'Độ cao yên': '799 mm', 'Trọng lượng': '133 kg', 'Dung tích cốp': '28 lít' });
addBike('Honda', 'Xe tay ga', 'Honda SH 160i Thể Thao ABS', 104000000, 102500000, true, 2026, 0, '160cc', 'Xám xi măng', 'ABS', '2.24 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'eSP+ 156.9cc', 'Công suất': '12.4 kW / 8500 vòng/phút', 'Độ cao yên': '799 mm', 'Trọng lượng': '134 kg', 'Dung tích cốp': '28 lít' });
addBike('Honda', 'Xe tay ga', 'Honda SH 350i Thể Thao Lắp Ráp Việt Nam', 152000000, 149000000, true, 2026, 0, '350cc', 'Xám Đen', 'ABS', '3.54 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, xy-lanh đơn, 329.6cc', 'Công suất': '21.5 kW / 7500 vòng/phút', 'Độ cao yên': '805 mm', 'Trọng lượng': '172 kg', 'Dung tích cốp': '28 lít' });

addBike('Honda', 'Xe số', 'Honda Wave Alpha 110cc', 18900000, 18500000, true, 2026, 0, '110cc', 'Xanh Dương', 'Đùm', '1.72 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Xy-lanh đơn, 109.1cc', 'Công suất': '6.12 kW / 7500 vòng/phút', 'Độ cao yên': '769 mm', 'Trọng lượng': '97 kg', 'Hộp số': 'Tròn 4 số' });
addBike('Honda', 'Xe số', 'Honda Wave RSX FI 110 Phanh Đĩa', 22500000, null, true, 2026, 0, '110cc', 'Đỏ Đen', 'Đĩa', '1.56 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Phun xăng điện tử FI, 109.1cc', 'Công suất': '6.46 kW / 7500 vòng/phút', 'Độ cao yên': '760 mm', 'Trọng lượng': '99 kg', 'Hộp số': 'Tròn 4 số' });
addBike('Honda', 'Xe số', 'Honda Future 125 Fi Cao Cấp Vành Đúc', 32500000, 32000000, true, 2026, 0, '125cc', 'Xanh Đen', 'Đĩa', '1.54 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, 124.9cc', 'Công suất': '6.83 kW / 7500 vòng/phút', 'Độ cao yên': '773 mm', 'Trọng lượng': '105 kg', 'Hộp số': 'Tròn 4 số' });
addBike('Honda', 'Xe số', 'Honda Blade 110 Vành Nan Hoa Phanh Cơ', 19500000, 19200000, true, 2026, 0, '110cc', 'Đen Đỏ', 'Đùm', '1.85 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '109.1cc, 4 kỳ', 'Công suất': '6.18 kW / 7500 vòng/phút', 'Độ cao yên': '769 mm', 'Trọng lượng': '98 kg' });

addBike('Honda', 'Xe côn tay', 'Honda Winner X V3 Đặc Biệt ABS', 46500000, 43900000, true, 2026, 0, '150cc', 'Đỏ Đen Bạc', 'ABS', '1.98 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, 149.1cc, làm mát bằng dung dịch', 'Công suất': '11.5 kW / 9000 vòng/phút', 'Độ cao yên': '795 mm', 'Trọng lượng': '122 kg', 'Hộp số': '6 cấp' });
addBike('Honda', 'Xe côn tay', 'Honda CB150R Exmotion', 105000000, 99000000, true, 2026, 0, '150cc', 'Đỏ Đen', 'ABS', '2.5 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, xy-lanh đơn, 149.2cc', 'Công suất': '11.8 kW / 9000 vòng/phút', 'Độ cao yên': '795 mm', 'Trọng lượng': '125 kg' });
addBike('Honda', 'Xe côn tay', 'Honda CBR150R Thể Thao ABS', 72000000, 69900000, true, 2026, 0, '150cc', 'Đỏ HRC', 'ABS', '2.25 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, 149.2cc, 4 van', 'Công suất': '12.6 kW / 9000 vòng/phút', 'Độ cao yên': '782 mm', 'Trọng lượng': '139 kg' });

addBike('Honda', 'Xe phân khối lớn', 'Honda CB300R', 140000000, 135000000, true, 2026, 0, '286cc', 'Đen Nhám', 'ABS', '3.1 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, xy-lanh đơn, 286cc', 'Công suất': '22.8 kW / 8500 vòng/phút', 'Độ cao yên': '799 mm', 'Trọng lượng': '143 kg' });
addBike('Honda', 'Xe phân khối lớn', 'Honda Rebel 300 Classic', 125000000, null, true, 2026, 0, '286cc', 'Đen bóng', 'ABS', '2.9 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, xy-lanh đơn, 286cc', 'Công suất': '20.3 kW / 8000 vòng/phút', 'Độ cao yên': '690 mm', 'Trọng lượng': '170 kg' });
addBike('Honda', 'Xe phân khối lớn', 'Honda Rebel 500 Cruiser', 180000000, 178000000, true, 2026, 0, '471cc', 'Xám Đen', 'ABS', '3.42 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '2 xy-lanh song song, DOHC, 471cc', 'Công suất': '33.5 kW / 8500 vòng/phút', 'Độ cao yên': '690 mm', 'Trọng lượng': '190 kg' });
addBike('Honda', 'Xe phân khối lớn', 'Honda CB500F Naked Bike', 184000000, null, true, 2026, 0, '471cc', 'Đỏ Đen', 'ABS', '3.5 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, 2 xy-lanh, 471cc', 'Công suất': '35 kW / 8600 vòng/phút', 'Độ cao yên': '789 mm', 'Trọng lượng': '189 kg' });
addBike('Honda', 'Xe phân khối lớn', 'Honda CB650R Neo Sports Cafe', 246000000, 240000000, true, 2026, 0, '649cc', 'Đỏ Candy', 'ABS Dual', '4.9 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '4 xy-lanh thẳng hàng, DOHC, 649cc', 'Công suất': '61 kW / 10000 vòng/phút', 'Độ cao yên': '810 mm', 'Trọng lượng': '202 kg' });

addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Wave Alpha 110cc Cũ Đẹp', 12500000, null, false, 2021, 15000, '110cc', 'Xanh Ngọc', 'Đùm', '1.75 L/100km', '6 tháng cửa hàng', { 'Tình trạng': 'Mới 85%, máy móc nguyên bản', 'Biển số': '66F1-345.67 (Đồng Tháp)' }, { 'Giấy tờ': 'Chính chủ, sang tên ngay', 'Động cơ': 'Nổ êm, không gõ', 'Dàn áo': 'Trầy xước nhẹ không đáng kể', 'Hệ thống phanh': 'Hoạt động tốt', 'Lốp xe': 'Độ mòn 30%', 'Khung sườn': 'Không rỉ sét, chưa đâm đụng' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Vision 110cc Cao Cấp Cũ', 23000000, 22500000, false, 2019, 22000, '110cc', 'Đỏ Mận', 'CBS', '1.9 L/100km', '6 tháng cửa hàng', { 'Tình trạng': 'Mới 80%, dán keo nguyên xe', 'Biển số': '66K1-888.88' }, { 'Giấy tờ': 'Chính chủ, bao công chứng', 'Động cơ': 'Êm ái, láp không hú', 'Dàn áo': 'Dán keo chống trầy mới lột', 'Hệ thống phanh': 'Nhạy, đã bảo dưỡng', 'Lốp xe': 'Đã thay cặp lốp Michelin mới', 'Khung sườn': 'Nguyên bản' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Winner X 150 Cũ Giá Rẻ', 24500000, null, false, 2020, 18000, '150cc', 'Đen Cam', 'CBS', '2.0 L/100km', '6 tháng cửa hàng', { 'Tình trạng': 'Mới 85%, lên pô kiểng nhẹ', 'Biển số': '66H1-223.34' }, { 'Giấy tờ': 'Chính chủ sang tên', 'Động cơ': 'DOHC bốc, không dộng dên', 'Dàn áo': 'Màu sắc thể thao, dán decal kiểng', 'Hệ thống phanh': 'Phanh CBS zin nhạy', 'Lốp xe': 'Nguyên bản theo xe', 'Khung sườn': 'Đạt chuẩn kiểm định' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Air Blade 125 Cũ Đời 2018', 27000000, null, false, 2018, 30000, '125cc', 'Đen Mờ', 'CBS', '2.2 L/100km', '6 tháng cửa hàng', { 'Biển số': '66P1-123.45', 'Odo thực tế': '30,000 km' }, { 'Giấy tờ': 'Đầy đủ, kèm chứng minh chủ cũ', 'Động cơ': 'Đã vệ sinh nồi, máy cực êm', 'Dàn áo': 'Trầy xước dăm nhẹ góc yếm', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Đã thay mới', 'Khung sườn': 'Kiểm tra kỹ không cong vênh' });

// --- YAMAHA ---
addBike('Yamaha', 'Xe tay ga', 'Yamaha Janus 125cc Tiêu Chuẩn', 28500000, 27900000, true, 2026, 0, '125cc', 'Đỏ Đen', 'CBS', '1.87 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Blue Core, 125cc', 'Công suất': '7.0 kW / 8000 vòng/phút', 'Độ cao yên': '770 mm', 'Trọng lượng': '97 kg' });
addBike('Yamaha', 'Xe tay ga', 'Yamaha Grande 125cc Blue Core Hybrid', 46000000, 45000000, true, 2026, 0, '125cc', 'Xanh Ngọc', 'ABS', '1.66 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Blue Core Hybrid, 124.9cc', 'Công suất': '6.1 kW / 6500 vòng/phút', 'Độ cao yên': '790 mm', 'Trọng lượng': '101 kg', 'Dung tích cốp': '27 lít' });
addBike('Yamaha', 'Xe tay ga', 'Yamaha Latte 125cc Thời Trang', 38500000, null, true, 2026, 0, '125cc', 'Trắng Sữa', 'CBS', '1.8 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Blue Core, 125cc', 'Độ cao yên': '790 mm', 'Trọng lượng': '100 kg', 'Dung tích cốp': '37 lít' });
addBike('Yamaha', 'Xe tay ga', 'Yamaha FreeGo 125cc Đặc Biệt ABS', 34500000, 33900000, true, 2026, 0, '125cc', 'Đen Nhám', 'ABS', '1.97 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Blue Core, xy-lanh đơn, 125cc', 'Độ cao yên': '778 mm', 'Trọng lượng': '102 kg' });
addBike('Yamaha', 'Xe tay ga', 'Yamaha NVX 155 V2 Thế Thế Hệ Mới ABS', 54500000, 53800000, true, 2026, 0, '155cc', 'Xanh GP', 'ABS', '2.19 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Blue Core, VVA, 155cc', 'Công suất': '11.3 kW / 8000 vòng/phút', 'Độ cao yên': '790 mm', 'Trọng lượng': '125 kg' });

addBike('Yamaha', 'Xe số', 'Yamaha Sirius 110cc Phanh Cơ', 19200000, 18900000, true, 2026, 0, '110cc', 'Đỏ Đen', 'Đùm', '1.99 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '110cc, làm mát bằng không khí', 'Công suất': '6.4 kW / 7000 vòng/phút', 'Trọng lượng': '96 kg' });
addBike('Yamaha', 'Xe số', 'Yamaha Sirius FI 115cc Phanh Đĩa Vành Đúc', 24200000, 23800000, true, 2026, 0, '115cc', 'Đen Bạc', 'Đĩa', '1.65 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'Phun xăng điện tử FI, 114cc', 'Công suất': '6.4 kW / 7000 vòng/phút', 'Trọng lượng': '99 kg' });
addBike('Yamaha', 'Xe số', 'Yamaha Jupiter Finn 115cc Phanh UBS', 28000000, null, true, 2026, 0, '115cc', 'Xám Nhám', 'UBS', '1.64 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, FI, 113.7cc', 'Công suất': '6.6 kW / 7000 vòng/phút', 'Phanh kết hợp': 'UBS' });

addBike('Yamaha', 'Xe côn tay', 'Yamaha Exciter 155 VVA Cao Cấp ABS', 52000000, 49900000, true, 2026, 0, '155cc', 'Xanh Monster Energy', 'ABS', '2.09 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, 4 van, VVA, 155.1cc', 'Công suất': '13.2 kW / 9500 vòng/phút', 'Hộp số': '6 cấp', 'Hệ thống ly hợp': 'A&S (Chống trượt)' });
addBike('Yamaha', 'Xe côn tay', 'Yamaha Exciter 150 RC Phiên Bản 2025', 44500000, 43500000, true, 2025, 0, '150cc', 'Đỏ Nhám', 'Đĩa', '2.00 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, 149.7cc', 'Công suất': '11.3 kW / 8500 vòng/phút', 'Độ cao yên': '795 mm' });
addBike('Yamaha', 'Xe côn tay', 'Yamaha YZF-R15 V4 Thể Thao', 78000000, 75000000, true, 2026, 0, '155cc', 'Xanh GP', 'ABS Dual', '2.3 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, 155cc, VVA', 'Công suất': '13.7 kW / 10000 vòng/phút', 'Trọng lượng': '137 kg' });
addBike('Yamaha', 'Xe côn tay', 'Yamaha MT-15 Naked Streetfighter', 69000000, null, true, 2026, 0, '155cc', 'Xám Mâm Xanh', 'Đĩa', '2.1 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, 155cc, VVA', 'Công suất': '14.2 kW / 10000 vòng/phút', 'Hệ thống phuộc': 'Upside Down KYB' });

addBike('Yamaha', 'Xe phân khối lớn', 'Yamaha XS155R Neo-Retro', 77000000, 74900000, true, 2026, 0, '155cc', 'Bạc Mâm Vàng', 'Đĩa', '2.2 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '4 thì, SOHC, 4 van, VVA, 155cc', 'Công suất': '14.2 kW / 10000 vòng/phút', 'Dung tích bình xăng': '10 lít' });
addBike('Yamaha', 'Xe phân khối lớn', 'Yamaha YZF-R3 Sportbike', 132000000, 129000000, true, 2026, 0, '321cc', 'Đen Bóng', 'ABS Dual', '3.62 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '2 xy-lanh song song, DOHC, 321cc', 'Công suất': '30.9 kW / 10750 vòng/phút' });
addBike('Yamaha', 'Xe phân khối lớn', 'Yamaha MT-03 Naked Bike', 124000000, null, true, 2026, 0, '321cc', 'Xám Đen', 'ABS Dual', '3.7 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '321cc, DOHC, 2 xy-lanh', 'Công suất': '42 HP' });
addBike('Yamaha', 'Xe phân khối lớn', 'Yamaha MT-07 Beast', 259000000, 252000000, true, 2026, 0, '689cc', 'Cyan Storm', 'ABS Dual', '4.3 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'CP2, 2 xy-lanh, DOHC, 689cc', 'Công suất': '73.4 PS / 8750 vòng/phút' });
addBike('Yamaha', 'Xe phân khối lớn', 'Yamaha YZF-R7 Racing', 269000000, 260000000, true, 2026, 0, '689cc', 'Xanh Yamaha', 'ABS Dual', '4.2 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'CP2, 689cc', 'Công suất': '73.4 PS' });

addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha Exciter 150 Cũ Đời 2018', 21500000, null, false, 2018, 25000, '150cc', 'Trắng Đỏ', 'Đĩa', '2.1 L/100km', '6 tháng cửa hàng', { 'Tình trạng': 'Mới 80%, dàn chân zin ốc đẹp', 'Biển số': '66F1-999.01' }, { 'Giấy tờ': 'Chính chủ ký giấy rút gốc', 'Động cơ': 'Zin chưa rớt đầu', 'Dàn áo': 'Dán decal lột ra sơn đẹp bóng', 'Hệ thống phanh': 'Bình thường', 'Lốp xe': 'Thay mới vỏIRC', 'Khung sườn': 'Nguyên bản không cong lệch' });
addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha Sirius 110 Cũ Học Sinh', 9800000, null, false, 2016, 45000, '110cc', 'Đen Xám', 'Cơ', '2.0 L/100km', '3 tháng cửa hàng', { 'Biển số': '66L1-6789' }, { 'Giấy tờ': 'Bao tranh chấp', 'Động cơ': 'Khô ráo, đề nhạy', 'Dàn áo': 'Trầy xước vừa phải do năm tháng', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Độ mòn 50%', 'Khung sườn': 'Vững chãi' });
addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha NVX 155 V1 ABS Cũ Cao Cấp', 28500000, 27500000, false, 2019, 21000, '155cc', 'Xanh Rêu Nhám', 'ABS', '2.3 L/100km', '6 tháng cửa hàng', { 'Tình trạng': 'Mới 85%, khóa Smartkey zin', 'Biển số': '66K1-098.76' }, { 'Giấy tờ': 'Chính chủ sang tên ngay', 'Động cơ': 'Máy 155 VVA êm bốc, láp không hú', 'Dàn áo': 'Đẹp keng không bể vỡ', 'Hệ thống phanh': 'Phanh ABS tốt', 'Lốp xe': 'Vỏ Michelin dày cui', 'Khung sườn': 'Chưa đụng chạm' });

// --- SUZUKI ---
addBike('Suzuki', 'Xe tay ga', 'Suzuki Burgman Street 125', 48600000, 45000000, true, 2026, 0, '125cc', 'Vàng Đồng', 'CBS', '1.96 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SEP, đơn, 4 kỳ, 124.3cc', 'Công suất': '6.4 kW / 6750 vòng/phút', 'Độ cao yên': '780 mm', 'Trọng lượng': '110 kg' });
addBike('Suzuki', 'Xe côn tay', 'Suzuki Raider R150 Fi Phiên Bản Mới', 50990000, 48990000, true, 2026, 0, '150cc', 'Xanh Đen GP', 'Đĩa Dual', '2.4 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, 4 van, 147.3cc', 'Công suất': '13.6 kW / 10000 vòng/phút', 'Trọng lượng': '109 kg' });
addBike('Suzuki', 'Xe côn tay', 'Suzuki Satria F150 Nhập Khẩu Indonesia', 53490000, null, true, 2026, 0, '150cc', 'Đen Nhám', 'Đĩa Dual', '2.5 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, 147.3cc, FI', 'Công suất': '13.6 kW', 'Trọng lượng': '109 kg' });
addBike('Suzuki', 'Xe côn tay', 'Suzuki GSX-R150 Sportbike', 71990000, 68000000, true, 2025, 0, '150cc', 'Đen Đỏ', 'Đĩa Dual', '2.6 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'DOHC, xy-lanh đơn, 147.3cc', 'Công suất': '14.1 kW / 10500 vòng/phút' });
addBike('Suzuki', 'Xe côn tay', 'Suzuki GSX-S150 Naked Bike', 63900000, null, true, 2025, 0, '150cc', 'Xanh Đen', 'Đĩa Dual', '2.6 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '147.3cc DOHC', 'Công suất': '14.1 kW' });
addBike('Suzuki', 'Xe phân khối lớn', 'Suzuki V-Strom 250SX Adventure', 125000000, 119000000, true, 2026, 0, '249cc', 'Vàng Đen', 'ABS Dual', '2.8 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, xy-lanh đơn, 249cc', 'Công suất': '19.5 kW / 9300 vòng/phút' });
addBike('Suzuki', 'Xe phân khối lớn', 'Suzuki Gixxer SF250 Sport', 115900000, null, true, 2025, 0, '249cc', 'Xanh GP', 'ABS Dual', '2.7 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': 'SOHC, xy-lanh đơn, 249cc, làm mát bằng dầu', 'Công suất': '26.5 HP' });
addBike('Suzuki', 'Xe phân khối lớn', 'Suzuki Hayabusa Thần Gió Thế Hệ 3', 810000000, 790000000, true, 2026, 0, '1340cc', 'Đen Vàng', 'Brembo Stylema ABS', '6.2 L/100km', '3 năm hoặc 30,000km', { 'Động cơ': '4 xy-lanh thẳng hàng, 1340cc', 'Công suất': '190 HP / 9700 vòng/phút', 'Mô-men xoắn': '150 Nm' });
addBike('Suzuki', 'Xe cũ tuyển chọn', 'Suzuki Raider R150 Cũ Máy Dữ', 26500000, null, false, 2019, 12000, '150cc', 'Đen Mâm Đỏ', 'Đĩa Dual', '2.5 L/100km', '6 tháng cửa hàng', { 'Biển số': '66G1-332.11', 'Tình trạng': 'Zin nguyên con odo chuẩn' }, { 'Giấy tờ': 'Chính chủ, bao rút hồ sơ gốc', 'Động cơ': 'Máy bốc, chưa đụng chạm 1 con ốc', 'Dàn áo': 'Đẹp dán keo trong bảo vệ', 'Hệ thống phanh': 'Bình thường nhạy', 'Lốp xe': 'Vỏ Dunlop mới', 'Khung sườn': 'Nguyên bản cực chắc chắn' });
addBike('Suzuki', 'Xe cũ tuyển chọn', 'Suzuki Satria F150 Cũ Nhập Indo', 32000000, 31000000, false, 2020, 9500, '150cc', 'Xanh xi măng', 'Đĩa Dual', '2.6 L/100km', '6 tháng cửa hàng', { 'Biển số': '66H1-667.89' }, { 'Giấy tờ': 'Nhập khẩu hải quan chính ngạch', 'Động cơ': 'Trơn tru, thay nhớt định kỳ', 'Dàn áo': 'Khít, không gãy bát nhựa nào', 'Hệ thống phanh': 'Đĩa hoạt động xuất sắc', 'Lốp xe': 'Độ mòn 15%', 'Khung sườn': 'Hoàn mỹ' });

// --- SYM ---
addBike('SYM', 'Xe tay ga', 'SYM Attila 125 New', 33700000, null, true, 2026, 0, '125cc', 'Đỏ Cherry', 'CBS', '2.2 L/100km', '2 năm hoặc 20,000km', { 'Động cơ': '124.6cc', 'Độ cao yên': '750 mm', 'Trọng lượng': '112 kg' });
addBike('SYM', 'Xe tay ga', 'SYM Passing 50cc Cho Học Sinh', 24200000, 23700000, true, 2026, 0, '50cc', 'Đen Nhám', 'Cơ', '1.6 L/100km', '2 năm hoặc 20,000km', { 'Động cơ': '49.5cc', 'Không cần bằng lái': 'Có' });
addBike('SYM', 'Xe số', 'SYM Elegant 50cc Thể Thao', 17000000, 16700000, true, 2026, 0, '50cc', 'Xanh Nhám', 'Cơ', '1.44 L/100km', '2 năm hoặc 20,000km', { 'Động cơ': '49.5cc, xi-lanh đơn', 'Mức tiêu thụ': 'Tiết kiệm nhiên liệu hàng đầu' });
addBike('SYM', 'Xe số', 'SYM Galaxy 50 Vành Đúc Thể Thao', 18500000, null, true, 2026, 0, '50cc', 'Đen Xanh', 'Cơ', '1.55 L/100km', '2 năm hoặc 20,000km', { 'Động cơ': '49.5cc SOHC', 'Phù hợp học sinh': 'Có' });
addBike('SYM', 'Xe số', 'SYM Angela 50cc Dành Cho Nữ', 17500000, 17200000, true, 2026, 0, '50cc', 'Hồng Trắng', 'Cơ', '1.26 L/100km', '2 năm hoặc 20,000km', { 'Động cơ': '49.5cc bền bỉ', 'Tiết kiệm xăng': '1.26 lít/100km' });
addBike('SYM', 'Xe côn tay', 'SYM Star SR 125 côn tay', 28700000, null, true, 2025, 0, '125cc', 'Đỏ Đen Thể Thao', 'Đĩa', '2.0 L/100km', '2 năm', { 'Động cơ': 'Ecotech, 123cc', 'Công suất': '8.5 HP' });

// --- PIAGGIO ---
addBike('Piaggio', 'Xe tay ga', 'Piaggio Liberty 125cc S One ABS', 58900000, 57900000, true, 2026, 0, '125cc', 'Trắng Bạc', 'ABS', '2.4 L/100km', '3 năm', { 'Động cơ': 'i-get, 4 kỳ, 3 van, 124.5cc', 'Độ cao yên': '780 mm', 'Trọng lượng': '120 kg' });
addBike('Piaggio', 'Xe tay ga', 'Piaggio Medley S 150cc Phanh ABS Dual', 98900000, 96000000, true, 2026, 0, '150cc', 'Xám Đen', 'ABS Dual', '2.28 L/100km', '3 năm', { 'Động cơ': 'i-get, xy-lanh đơn, 4 van, 155.2cc', 'Dung tích cốp': '36 lít', 'Hệ thống dừng tạm thời': 'Start-Stop' });
addBike('Piaggio', 'Xe cũ tuyển chọn', 'Piaggio Liberty 125 i-get Cũ Đẹp', 29000000, null, false, 2018, 19000, '125cc', 'Đen Bóng', 'ABS', '2.5 L/100km', '6 tháng', { 'Biển số': '66K1-234.56' }, { 'Giấy tờ': 'Chính chủ', 'Động cơ': 'i-get êm hơn dòng cũ', 'Dàn áo': 'Dàn áo xi mạ sáng bóng', 'Hệ thống phanh': 'Phanh ABS hoạt động tốt', 'Lốp xe': 'Vỏ mới thay', 'Khung sườn': 'Chuẩn zin' });

// --- VESPA ---
addBike('Vespa', 'Xe tay ga', 'Vespa Primavera 125cc i-get ABS', 79200000, 78000000, true, 2026, 0, '125cc', 'Vàng Sunglow', 'ABS', '2.7 L/100km', '3 năm', { 'Động cơ': 'i-get, xi-lanh đơn, 3 van, 124.5cc', 'Khung xe': 'Thép liền khối', 'Độ cao yên': '790 mm' });
addBike('Vespa', 'Xe tay ga', 'Vespa Sprint S 125cc Thể Thao ABS', 84800000, 83500000, true, 2026, 0, '125cc', 'Xám Xi Măng', 'ABS', '2.62 L/100km', '3 năm', { 'Động cơ': 'i-get, 124.5cc, phun xăng điện tử', 'Khung vỏ': 'Thép liền khối dập nổi' });
addBike('Vespa', 'Xe tay ga', 'Vespa GTS Super 150cc Cực Sang', 116200000, 113000000, true, 2026, 0, '150cc', 'Xanh Lá Nhám', 'ABS Dual', '2.6 L/100km', '3 năm', { 'Động cơ': 'i-get, 4 van, 155.1cc', 'Hệ thống làm mát': 'Dung dịch' });
addBike('Vespa', 'Xe tay ga', 'Vespa GTS 300 Super Tech', 158600000, null, true, 2026, 0, '278cc', 'Xám Bạc', 'ABS Dual & ASR', '3.24 L/100km', '3 năm', { 'Động cơ': 'HPE, 278.3cc, 4 van', 'Công suất': '23.8 HP / 8250 vòng/phút', 'Bảng đồng hồ': 'TFT màu kết nối điện thoại' });
addBike('Vespa', 'Xe cũ tuyển chọn', 'Vespa Sprint 125 i-get Cũ Đẹp Keng', 48500000, null, false, 2020, 8000, '125cc', 'Trắng Tuyết', 'ABS', '2.7 L/100km', '6 tháng', { 'Biển số': '66F1-686.86', 'Tình trạng': 'Mới 90% nước sơn zin' }, { 'Giấy tờ': 'Chính chủ bao sang tên toàn quốc', 'Động cơ': 'Êm thút thít, láp không một tiếng hú', 'Dàn áo': 'Nước sơn trắng zin không dặm tút', 'Hệ thống phanh': 'Phanh ABS tốt', 'Lốp xe': 'Vỏ Michelin dày cộm', 'Khung sườn': 'Khung sườn thép dày, đầm chắc' });

// --- VINFAST ---
addBike('VinFast', 'Xe điện', 'VinFast Evo200 Lite Học Sinh', 18000000, 17500000, true, 2026, 0, 'Điện', 'Vàng Chanh', 'Đĩa/Cơ', 'Học sinh đi học', '3 năm xe, pin thuê', { 'Quãng đường tối đa': '205 km/lần sạc (điều kiện tiêu chuẩn)', 'Vận tốc tối đa': '49 km/h (Evo200 Lite)', 'Động cơ': 'In-hub 1500W', 'Pin': 'LFP 3.5 KWh' });
addBike('VinFast', 'Xe điện', 'VinFast Evo200 Thường (Mới)', 18000000, null, true, 2026, 0, 'Điện', 'Trắng Pearl', 'Đĩa/Cơ', 'Vận tốc 70km/h', '3 năm xe', { 'Quãng đường': '203 km/lần sạc', 'Vận tốc tối đa': '70 km/h', 'Động cơ': 'In-hub 1500W' });
addBike('VinFast', 'Xe điện', 'VinFast Feliz S Pin LFP', 27000000, 26000000, true, 2026, 0, 'Điện', 'Xanh Rêu', 'Đĩa/Cơ', 'Vận tốc 78km/h', '3 năm', { 'Quãng đường': '198 km/lần sạc', 'Vận tốc tối đa': '78 km/h', 'Dung tích cốp': '25 lít', 'Động cơ': '3000W' });
addBike('VinFast', 'Xe điện', 'VinFast Klara S 2024 Pin LFP', 35000000, 34000000, true, 2026, 0, 'Điện', 'Xanh Lục Bảo', 'Đĩa Dual', 'Vận tốc 78km/h', '3 năm', { 'Quãng đường': '194 km/lần sạc', 'Thiết kế phong cách Ý': 'Có', 'Động cơ': 'Bosch 3000W' });
addBike('VinFast', 'Xe điện', 'VinFast Vento S Cao Cấp', 50000000, 48500000, true, 2026, 0, 'Điện', 'Đỏ Đậm', 'ABS Dual', 'Vận tốc 89km/h', '3 năm', { 'Quãng đường': '160 km/lần sạc', 'Động cơ': 'Side-motor 5200W', 'Công nghệ PAAK': 'Có (Khóa điện thoại)' });
addBike('VinFast', 'Xe điện', 'VinFast Theon S Siêu Xe Điện', 63000000, 61000000, true, 2026, 0, 'Điện', 'Đen Nhám', 'ABS Dual Brembo', 'Vận tốc 99km/h', '3 năm', { 'Quãng đường': '150 km/lần sạc', 'Động cơ': 'Mid-motor 7100W', 'Vận tốc cực đại': '99 km/h', 'Pin': 'LFP 3.5 KWh kép' });
addBike('VinFast', 'Xe cũ tuyển chọn', 'VinFast Klara A2 Đời Đầu Cũ Rẻ', 11000000, null, false, 2019, 18000, 'Điện', 'Xám', 'Đĩa', 'Xe đi lại gần', '3 tháng', { 'Biển số': '66MD1-123.44', 'Ắc quy': 'Đã thay bộ ắc quy mới đi 45km' }, { 'Giấy tờ': 'Chính chủ', 'Động cơ': 'Bosch chạy êm ru', 'Dàn áo': 'Bạc màu nhẹ theo thời gian', 'Hệ thống phanh': 'Đĩa trước sau ổn định', 'Lốp xe': 'Bình thường', 'Khung sườn': 'Rất chắc chắn' });

// --- KAWASAKI ---
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki W175 SE Classic', 77500000, 75000000, true, 2026, 0, '177cc', 'Xanh Rêu Cổ Điển', 'Cơ', '2.5 L/100km', '2 năm', { 'Động cơ': 'SOHC, xy-lanh đơn, 177cc', 'Công suất': '13 PS / 7500 vòng/phút', 'Độ cao yên': '775 mm' });
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki Ninja ZX-25R 4 Xy Lanh', 195000000, 189000000, true, 2026, 0, '250cc', 'KRT Xanh Đen', 'ABS Dual & KTRC', '4.2 L/100km', '2 năm', { 'Động cơ': '4 xy-lanh thẳng hàng, DOHC, 16 van, 249.8cc', 'Công suất': '47 HP / 15500 vòng/phút', 'Hộp số': '6 cấp, có Quickshifter' });
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki Ninja 400 ABS KRT', 165000000, 159000000, true, 2025, 0, '399cc', 'Xanh Lá Lime', 'ABS Dual', '3.5 L/100km', '2 năm', { 'Động cơ': '2 xy-lanh song song, DOHC, 399cc', 'Công suất': '45 HP / 10000 vòng/phút', 'Độ cao yên': '785 mm' });
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki Z400 Naked Bike', 149000000, null, true, 2025, 0, '399cc', 'Đen Bạc', 'ABS Dual', '3.5 L/100km', '2 năm', { 'Động cơ': '2 xy-lanh song song, 399cc', 'Công suất': '45 HP' });
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki Z650 Thần Sấm', 187000000, 182000000, true, 2026, 0, '649cc', 'Đen Nhám Mâm Đỏ', 'ABS Dual', '4.3 L/100km', '2 năm', { 'Động cơ': '2 xy-lanh song song, 649cc', 'Công suất': '68 HP / 8000 vòng/phút' });
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki Vulcan S 650 Cruiser', 241000000, 237000000, true, 2026, 0, '649cc', 'Xám Cam', 'ABS Dual', '4.5 L/100km', '2 năm', { 'Động cơ': '2 xy-lanh song song, 649cc', 'Chiều cao yên điều chỉnh': '3 mức (Ergo-Fit)' });
addBike('Kawasaki', 'Xe phân khối lớn', 'Kawasaki Z900 ABS Thần Sấm', 320900000, 310000000, true, 2026, 0, '948cc', 'Đen Xanh Lá', 'ABS Dual & KTRC', '5.5 L/100km', '2 năm', { 'Động cơ': '4 xy-lanh thẳng hàng, DOHC, 948cc', 'Công suất': '125 HP / 9500 vòng/phút' });
addBike('Kawasaki', 'Xe cũ tuyển chọn', 'Kawasaki Ninja 400 Cũ Đẹp Keng', 105000000, null, false, 2020, 14000, '399cc', 'Xanh KRT', 'ABS', '3.6 L/100km', '6 tháng', { 'Biển số': '66A1-002.34' }, { 'Giấy tờ': 'Chính chủ bao sang tên', 'Động cơ': 'Cực êm, chưa mở cổ pô', 'Dàn áo': 'Dán decal sườn cực ngầu', 'Hệ thống phanh': 'Phanh ABS cực nhạy', 'Lốp xe': 'Vỏ sau mới lên Michelin Pilot Street 150', 'Khung sườn': 'Kiểm tra kỹ đạt 100%' });

// --- KTM ---
addBike('KTM', 'Xe phân khối lớn', 'KTM Duke 200 Naked Bike', 119000000, 112000000, true, 2025, 0, '200cc', 'Cam Đen', 'ABS Dual WP', '2.8 L/100km', '2 năm', { 'Động cơ': 'DOHC, xy-lanh đơn, 199.5cc', 'Phuộc trước': 'WP Apex 43mm' });
addBike('KTM', 'Xe phân khối lớn', 'KTM Duke 390 Thế Hệ Mới', 199000000, 189000000, true, 2026, 0, '373cc', 'Cam Trắng', 'ABS Bosch Dual Supermoto', '3.4 L/100km', '2 năm', { 'Động cơ': 'DOHC, xy-lanh đơn, 373cc', 'Công suất': '44 HP / 9000 vòng/phút', 'Đèn chiếu sáng': 'Full LED cực ngầu' });
addBike('KTM', 'Xe phân khối lớn', 'KTM RC 390 Sportbike', 205000000, null, true, 2025, 0, '373cc', 'Cam Xanh Dương', 'ABS Dual MTC', '3.5 L/100km', '2 năm', { 'Động cơ': 'DOHC, xy-lanh đơn, 373cc', 'Công suất': '44 HP' });
addBike('KTM', 'Xe phân khối lớn', 'KTM Adventure 390 Phượt Thủ', 236000000, 228000000, true, 2026, 0, '373cc', 'Cam Nhám', 'Cornering ABS & MTC', '3.6 L/100km', '2 năm', { 'Động cơ': '373cc, làm mát chất lỏng', 'Hỗ trợ phượt bụi': 'Kính chắn gió, bảo vệ tay lái' });
addBike('KTM', 'Xe phân khối lớn', 'KTM Duke 790 "The Scalpel"', 399000000, 385000000, true, 2026, 0, '799cc', 'Cam Đen Bạc', 'ABS Bosch Cornering', '4.8 L/100km', '2 năm', { 'Động cơ': '2 xy-lanh song song LC8c, 799cc', 'Công suất': '105 HP / 9000 vòng/phút' });

// --- DUCATI ---
addBike('Ducati', 'Xe phân khối lớn', 'Ducati Scrambler Icon Độc Chất', 365000000, 350000000, true, 2026, 0, '803cc', 'Vàng Scrambler', 'Cornering ABS', '5.2 L/100km', '2 năm không giới hạn km', { 'Động cơ': 'L-Twin, 2 van Desmodromic, 803cc', 'Công suất': '73 HP / 8250 vòng/phút', 'Chiều cao yên': '798 mm' });
addBike('Ducati', 'Xe phân khối lớn', 'Ducati Monster 937 Monster', 439000000, 420000000, true, 2026, 0, '937cc', 'Đỏ Ducati', 'ABS Cornering, DTC, DWC', '5.2 L/100km', '2 năm', { 'Động cơ': 'Testastretta 11° L-Twin, 937cc', 'Công suất': '111 HP / 9250 vòng/phút', 'Khung xe': 'Khung nhôm Front Frame siêu nhẹ' });
addBike('Ducati', 'Xe phân khối lớn', 'Ducati Multistrada V2 S Tourer', 520000000, null, true, 2026, 0, '937cc', 'Đỏ', 'Brembo ABS Cornering, Skyhook', '5.5 L/100km', '2 năm', { 'Động cơ': 'Testastretta 11°, 937cc', 'Công suất': '113 HP', 'Trang bị tourer': 'Thùng sau, kính chắn gió chỉnh điện' });
addBike('Ducati', 'Xe phân khối lớn', 'Ducati Streetfighter V2 Siêu Trần', 570000000, 550000000, true, 2026, 0, '955cc', 'Đen Nhám Matte Black', 'ABS Cornering, EVO 2 Control', '6.0 L/100km', '2 năm', { 'Động cơ': 'Superquadro L-Twin, 955cc', 'Công suất': '153 HP / 10750 vòng/phút', 'Mâm xe': 'Mâm hợp kim 5 chấu chữ Y' });
addBike('Ducati', 'Xe phân khối lớn', 'Ducati Panigale V2 Superbike', 615000000, 599000000, true, 2026, 0, '955cc', 'Đỏ Sporty', 'ABS Cornering Brembo EVO', '6.1 L/100km', '2 năm', { 'Động cơ': 'Superquadro L-Twin, 955cc', 'Công suất': '155 HP / 10750 vòng/phút', 'Hộp số': '6 cấp có DQS (Quickshifter up/down)' });
addBike('Ducati', 'Xe phân khối lớn', 'Ducati Diavel V4 Quái Thú Showroom', 980000000, 960000000, true, 2026, 0, '1158cc', 'Đỏ Racing', 'Ducati Safety Pack', '6.4 L/100km', '2 năm', { 'Động cơ': 'V4 Granturismo, 1158cc', 'Công suất': '168 HP / 10750 vòng/phút', 'Mô-men xoắn': '126 Nm / 7500 vòng/phút' });

// Add extra used bikes to reach 100+ vehicles
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda SH 150i ABS Cũ Đời 2021', 78000000, 76500000, false, 2021, 11000, '150cc', 'Trắng Đen', 'ABS', '2.3 L/100km', '6 tháng', { 'Biển số': '66B1-999.99' }, { 'Giấy tờ': 'Chính chủ', 'Động cơ': 'Cực êm', 'Dàn áo': '95% mộc mạc', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Dunlop', 'Khung sườn': 'Nguyên bản' });
addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha Exciter 135 Cũ Đời 2012 Côn Tự Động', 15000000, null, false, 2012, 60000, '135cc', 'Đỏ Đen', 'Đĩa', '2.2 L/100km', '3 tháng', { 'Động cơ': '4 số tròn, côn tự động' }, { 'Giấy tờ': 'Hợp lệ chính chủ', 'Động cơ': 'Máy êm chưa chẻ', 'Dàn áo': 'Trầy xước sơn nhẹ', 'Hệ thống phanh': 'Bình thường', 'Lốp xe': 'Mòn 40%', 'Khung sườn': 'Vẫn cứng cáp' });
addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha Sirius 110 RC Cũ Vành Đúc', 11500000, null, false, 2017, 32000, '110cc', 'Đen Đỏ', 'Đĩa', '1.9 L/100km', '6 tháng', {}, { 'Giấy tờ': 'Đầy đủ', 'Động cơ': 'Máy bốc lợi xăng', 'Dàn áo': 'Dán decal lột ra mới cứng', 'Hệ thống phanh': 'Nhạy', 'Lốp xe': 'Tốt', 'Khung sườn': 'Zin' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Wave RSX 110 Cũ Học Sinh', 11200000, null, false, 2016, 38000, '110cc', 'Xám Đỏ', 'Cơ', '1.8 L/100km', '3 tháng', {}, { 'Giấy tờ': 'Đầy đủ chính chủ', 'Động cơ': 'Dễ nổ máy êm', 'Dàn áo': 'Trầy xước yếm trái', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Mòn 30%', 'Khung sườn': 'Tốt' });
addBike('Vespa', 'Xe cũ tuyển chọn', 'Vespa Primavera 125 Cũ Màu Độc', 38000000, 36500000, false, 2017, 24000, '125cc', 'Xanh Mint', 'ABS', '2.8 L/100km', '6 tháng', {}, { 'Giấy tờ': 'Đầy đủ', 'Động cơ': 'Máy 3v i-get cực êm', 'Dàn áo': 'Nước sơn xanh ngọc nguyên bản', 'Hệ thống phanh': 'ABS trước nhạy', 'Lốp xe': 'Độ mòn 20%', 'Khung sườn': 'Chắc chắn đầm xe' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda SH Mode 125 Cũ Nữ Đi', 42000000, null, false, 2016, 28000, '125cc', 'Vàng Đồng', 'CBS', '2.2 L/100km', '6 tháng', {}, { 'Giấy tờ': 'Ký giấy ngay', 'Động cơ': 'Máy êm ru không tiếng hú', 'Dàn áo': 'Màu vàng đồng sang trọng trầy nhẹ', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Mới thay', 'Khung sườn': 'Chuẩn chỉ' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Future Neo GT Cũ Cọp Sưu Tầm', 35000000, null, false, 2008, 50000, '125cc', 'Đỏ Đen', 'Đĩa', '1.6 L/100km', '6 tháng', { 'Odo thực tế': '50,000 km máy zin đầu nồi chưa chạm' }, { 'Giấy tờ': 'Chính chủ rút gốc 1 nốt nhạc', 'Động cơ': 'Đầu nồi chưa rớt cực kỳ êm ái bốc', 'Dàn áo': 'Tem zin nước sơn mọc mạc', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Mới', 'Khung sườn': 'Sơn sườn cực đẹp' });
addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha Exciter 150 Cũ Đời 2015 Đen Nhám', 18500000, null, false, 2015, 35000, '150cc', 'Đen Nhám', 'Đĩa', '2.1 L/100km', '6 tháng', {}, { 'Giấy tờ': 'Hợp lệ công chứng', 'Động cơ': 'Êm nhẹ bốc', 'Dàn áo': 'Đen nhám cực mạnh mẽ', 'Hệ thống phanh': 'Hoạt động tốt', 'Lốp xe': 'Tốt', 'Khung sườn': 'Tốt' });
addBike('Suzuki', 'Xe cũ tuyển chọn', 'Suzuki Axelo 125 Côn Tay Cũ Hiếm', 10500000, null, false, 2014, 48000, '125cc', 'Xanh Trắng', 'Đĩa Dual', '2.2 L/100km', '3 tháng', {}, { 'Giấy tờ': 'Chính chủ', 'Động cơ': 'Hơi kêu cam nhẹ đặc trưng, máy bốc', 'Dàn áo': 'Bình thường xước xát', 'Hệ thống phanh': 'Đĩa trước sau hoạt động tốt', 'Lốp xe': 'Tốt', 'Khung sườn': 'Tốt' });
addBike('SYM', 'Xe cũ tuyển chọn', 'SYM Elegant 50 Cũ Giá Học Sinh', 7500000, null, false, 2019, 15000, '50cc', 'Đỏ Đen', 'Cơ', '1.5 L/100km', '3 tháng', {}, { 'Giấy tờ': 'Hợp lệ', 'Động cơ': 'Khô ráo êm đề nổ tốt', 'Dàn áo': 'Bình thường trầy xước nhẹ', 'Hệ thống phanh': 'An toàn', 'Lốp xe': 'Bình thường', 'Khung sườn': 'Chắc chắn' });
addBike('Ducati', 'Xe cũ tuyển chọn', 'Ducati Monster 797 Cũ Chính Chủ', 185000000, 180000000, false, 2019, 9000, '803cc', 'Đỏ', 'ABS Dual', '5.2 L/100km', '6 tháng', { 'Tình trạng': 'Mới 90% dán nilon chống trầy' }, { 'Giấy tờ': 'HQCN sang tên toàn quốc', 'Động cơ': 'Nổ uy lực, máy L-Twin đặc trưng êm ái', 'Dàn áo': 'Nước sơn đỏ zin rất đẹp', 'Hệ thống phanh': 'Brembo phanh ABS tốt', 'Lốp xe': 'Lốp Pirelli Rosso III mới', 'Khung sườn': 'Mắt cáo nguyên bản sơn đỏ' });
addBike('Kawasaki', 'Xe cũ tuyển chọn', 'Kawasaki Z300 Cũ Đời 2018 Giá Tốt', 72000000, null, false, 2018, 16000, '296cc', 'Xanh Lá Đen', 'ABS Dual', '3.6 L/100km', '6 tháng', {}, { 'Giấy tờ': 'Chính chủ sang tên', 'Động cơ': 'Đã bảo dưỡng toàn bộ máy móc bốc', 'Dàn áo': 'Trầy góc xi nhan nhẹ', 'Hệ thống phanh': 'ABS ổn định', 'Lốp xe': 'Dunlop', 'Khung sườn': 'Đạt chuẩn' });
addBike('Honda', 'Xe cũ tuyển chọn', 'Honda Cub 50cc Cũ Kiểng Cực Đẹp', 9500000, null, false, 2015, 20000, '50cc', 'Xanh Da Trời', 'Cơ', '1.3 L/100km', '3 tháng', {}, { 'Giấy tờ': 'Đầy đủ', 'Động cơ': 'Máy 50cc nổ thút thít tiết kiệm xăng', 'Dàn áo': 'Sơn lại màu xanh mint kiểng đẹp', 'Hệ thống phanh': 'CBS nhẹ nhàng', 'Lốp xe': 'Bình thường', 'Khung sườn': 'Không rỉ sét' });
addBike('Yamaha', 'Xe cũ tuyển chọn', 'Yamaha Luvias 125 Cũ Máy Bốc', 8500000, null, false, 2013, 55000, '125cc', 'Đỏ Trắng', 'Cơ', '2.5 L/100km', '3 tháng', {}, { 'Giấy tờ': 'Hợp lệ', 'Động cơ': 'Máy bốc láp hơi hú nhẹ', 'Dàn áo': 'Bình thường xước dăm', 'Hệ thống phanh': 'Đĩa trước CBS sau bình thường', 'Lốp xe': 'Mòn 50%', 'Khung sườn': 'Bình thường' });
addBike('SYM', 'Xe cũ tuyển chọn', 'SYM Attila Elizabeth Cũ Giá Rẻ', 6500000, null, false, 2014, 40000, '110cc', 'Trắng Kem', 'Cơ', '2.8 L/100km', '3 tháng', {}, { 'Giấy tờ': 'Đầy đủ', 'Động cơ': 'Khô ráo chạy đầm', 'Dàn áo': 'Bình thường xước xát', 'Hệ thống phanh': 'Tốt', 'Lốp xe': 'Bình thường', 'Khung sườn': 'Ổn định' });

// Add accessories
addBike('Honda', 'Phụ kiện xe máy', 'Mũ bảo hiểm Honda Fullface Cao Cấp', 1200000, 1100000, true, null, 0, 'Phụ kiện', 'Đỏ Đen', 'N/A', 'N/A', '12 tháng', { 'Hãng': 'Honda', 'Chất liệu': 'Nhựa ABS nguyên sinh', 'Kính chắn gió': 'Chống tia UV', 'Trọng lượng': '1450g' });
addBike('Yamaha', 'Phụ kiện xe máy', 'Dầu nhớt Motul 300V Factory Line 10W40 1L', 450000, 420000, true, null, 0, 'Phụ kiện', 'Đỏ', 'N/A', 'N/A', 'N/A', { 'Thương hiệu': 'Motul Pháp', 'Dung tích': '1 Lít', 'Độ nhớt': '10W40', 'Loại động cơ': '4 thì côn tay, PKL' });
addBike('Suzuki', 'Phụ kiện xe máy', 'Khóa chống trộm xe máy Smartkey FOX thông minh', 1850000, 1750000, true, null, 0, 'Phụ kiện', 'Đen', 'N/A', 'N/A', '12 tháng', { 'Thương hiệu': 'FOX Pitech', 'Tính năng': 'Chống trộm, chống cướp tự động, định vị', 'Khoảng cách': 'Tự nhận diện trong bán kính 2m' });
addBike('Kawasaki', 'Phụ kiện xe máy', 'Nhông sên dĩa D.I.D Gold Vàng 9ly', 850000, null, true, null, 0, 'Phụ kiện', 'Vàng', 'N/A', 'N/A', '6 tháng', { 'Thương hiệu': 'D.I.D Nhật Bản', 'Độ dày sên': '428HD (9 ly)', 'Màu sắc': 'Vàng Gold xi mạ' });
addBike('Ducati', 'Phụ kiện xe máy', 'Đèn trợ sáng L4X Cree XML2 Siêu Sáng', 1450000, 1350000, true, null, 0, 'Phụ kiện', 'Đen nhôm', 'N/A', 'N/A', '12 tháng', { 'Thương hiệu': 'Cree Mỹ', 'Công suất': '40W', 'Độ sáng': '4000 Lumens', 'Chống nước': 'IP68' });

// 3. Blog Posts (30)
const posts = [];
const blogTitles = [
  'Kinh nghiệm mua xe máy cũ Đồng Tháp tránh bị lừa',
  'Có nên mua xe máy trả góp lãi suất 0%?',
  'Top 5 xe tay ga tiết kiệm xăng nhất 2026',
  'Hướng dẫn tự bảo dưỡng xe tay ga tại nhà đơn giản',
  'So sánh Honda Winner X và Yamaha Exciter 155 VVA',
  'Xe máy điện VinFast có đi được trời mưa ngập nước?',
  'Các dòng xe phân khối lớn cho người mới bắt đầu',
  'Cách phân biệt phanh ABS và CBS trên xe máy',
  'Kinh nghiệm chạy xe côn tay cho người mới từ A-Z',
  'Nên chọn mua nhớt xe ga hay nhớt xe số?',
  'Mua xe máy mới cần đóng các khoản thuế phí gì?',
  'Tại sao xe máy bị hao xăng và cách khắc phục?',
  'Quy trình thủ tục thu mua xe cũ nhanh gọn tại Ken Motor',
  'Đánh giá chi tiết Vespa Sprint S 125i i-get ABS',
  'Lốp xe máy đi bao nhiêu km thì nên thay mới?',
  'So sánh Honda Wave Alpha và Yamaha Sirius',
  'Những lỗi thường gặp trên ổ khóa Smartkey xe máy',
  'Cách vệ sinh nhông sên dĩa xe côn tay đúng chuẩn',
  'Kinh nghiệm đi phượt bằng xe ga an toàn',
  'Đánh giá nhanh xe máy điện VinFast Evo200 Lite',
  'Dung tích cốp xe máy nào lớn nhất hiện nay?',
  'Nên mua xe máy mới hay xe cũ đã qua sử dụng?',
  'Các kiểm tra số khung số máy khi mua xe cũ',
  'Hướng dẫn chạy rô-đai xe máy mới mua chuẩn nhất',
  'Khi nào cần thay nước làm mát cho xe máy?',
  'Nguyên nhân xe máy bị giật giật khi tăng ga',
  'Bảo hiểm xe máy bắt buộc mua ở đâu uy tín?',
  'Có nên tự sơn lại dàn áo xe máy tại nhà?',
  'Độ đèn trợ sáng xe máy thế nào để không bị phạt?',
  'Tìm hiểu hệ thống van biến thiên VVA trên xe Yamaha'
];

blogTitles.forEach((title, idx) => {
  const slug = title.toLowerCase()
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
    .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
    
  posts.push({
    id: generateUUID('blog', idx + 1),
    title,
    slug,
    excerpt: `Bài viết chia sẻ chi tiết về chủ đề ${title}. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.`,
    content: `## Nội dung chi tiết về ${title}\n\nĐây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.\n\n### 1. Phân tích chi tiết\n\nNhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.\n\n### 2. Các điểm cần lưu ý\n- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.\n- Cân đối tài chính cá nhân trước khi tham gia trả góp.\n- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.\n- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.\n\nHy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.`,
    image_url: `/demo/posts/post-${idx + 1}.svg`,
    seo_title: `${title} | Ken Motor`,
    seo_description: `Bài viết tư vấn chuyên sâu về ${title}. Đọc ngay để cập nhật kiến thức hữu ích nhất.`
  });
});

// 4. Hero Banners (8)
const sliders = [];
const bannerDetails = [
  { t: 'ĐẲNG CẤP SHOWROOM KEN MOTOR', st: 'Địa điểm mua bán xe máy mới & cũ uy tín hàng đầu tại Đồng Tháp. Trả góp linh hoạt, duyệt hồ sơ 15 phút.', btn: 'Khám Phá Ngay', l: '/vehicles' },
  { t: 'TƯ VẤN CHỌN XE THÔNG MINH', st: 'Bạn phân vân giữa xe số, xe ga hay côn tay? Trả lời vài câu hỏi để tìm chiếc xe phù hợp nhất với bạn.', btn: 'Tư Vấn Chọn Xe', l: '/tu-van-chon-xe' },
  { t: 'SO SÁNH XE DỄ DÀNG', st: 'So sánh chi tiết thông số kỹ thuật, giá bán và mức tiêu hao xăng giữa 2-3 chiếc xe cùng lúc.', btn: 'So Sánh Ngay', l: '/so-sanh' },
  { t: 'TRẢ GÓP DỄ DÀNG - LÃI SUẤT THẤP', st: 'Công cụ tính toán số tiền trả trước, kỳ hạn góp và số tiền đóng mỗi tháng trực quan, chính xác.', btn: 'Tính Trả Góp', l: '/tra-gop' },
  { t: 'THU MUA XE CŨ GIÁ CAO', st: 'Bạn muốn lên đời xe mới? Đăng ký định giá xe cũ online nhanh chóng. Định giá đúng giá trị, giao dịch trong ngày.', btn: 'Đăng Bán Xe Cũ', l: '/ban-xe-cu' },
  { t: 'ĐĂNG KÝ LÁI THỬ XE MIỄN PHÍ', st: 'Trải nghiệm thực tế các dòng xe mới nhất: SH, Air Blade, Winner X, Exciter trước khi đưa ra quyết định.', btn: 'Đặt Lịch Lái Thử', l: '/lai-thu' },
  { t: 'XE CŨ KIỂM ĐỊNH MINH BẠCH', st: 'Cam kết xe máy cũ nguyên bản, có bảng đánh giá chi tiết tình trạng máy móc, dàn áo và giấy tờ chính chủ.', btn: 'Xem Xe Cũ', l: '/vehicles?condition=old' },
  { t: 'SIÊU XE PKL CỰC CHẤT', st: 'Trải nghiệm cảm giác phấn khích tột độ cùng các dòng xe PKL chính hãng tại showroom.', btn: 'Xem Xe PKL', l: '/vehicles?category=xe-phan-khoi-lon' }
];

bannerDetails.forEach((b, idx) => {
  sliders.push({
    id: generateUUID('slider', idx + 1),
    title: b.t,
    subtitle: b.st,
    image_desktop_url: `/demo/sliders/slider-${idx + 1}-desktop.svg`,
    image_mobile_url: `/demo/sliders/slider-${idx + 1}-mobile.svg`,
    cta_link: b.l,
    cta_text: b.btn,
    sort_order: idx + 1
  });
});

// 5. FAQs (30)
const faqs = [];
const faqList = [
  { q: 'Cửa hàng Ken Motor có địa chỉ ở đâu?', a: 'Ken Motor tọa lạc tại Long Hưng, Đồng Tháp. Quý khách có thể xem bản đồ chi tiết trong trang liên hệ.' },
  { q: 'Số điện thoại hotline tư vấn nhanh là số nào?', a: 'Hotline chính thức của chúng tôi là 0787990047 (hỗ trợ cuộc gọi và Zalo 24/7).' },
  { q: 'Cửa hàng có hỗ trợ mua xe trả góp không?', a: 'Có, chúng tôi liên kết với nhiều ngân hàng và công ty tài chính (HD Saison, FE Credit, MCredit) hỗ trợ trả góp nhanh chóng.' },
  { q: 'Thủ tục mua xe máy trả góp cần những giấy tờ gì?', a: 'Quý khách chỉ cần chuẩn bị Căn cước công dân gắn chíp là có thể làm hồ sơ trả góp.' },
  { q: 'Độ tuổi tối thiểu để được duyệt hồ sơ trả góp xe máy?', a: 'Khách hàng từ đủ 18 tuổi trở lên là có thể đăng ký mua xe trả góp.' },
  { q: 'Cần trả trước bao nhiêu tiền khi mua xe trả góp?', a: 'Quý khách chỉ cần trả trước tối thiểu từ 10% đến 30% giá trị xe tùy dòng xe và gói vay.' },
  { q: 'Thời gian xét duyệt hồ sơ trả góp mất bao lâu?', a: 'Thời gian xét duyệt hồ sơ cực nhanh, chỉ khoảng 15 đến 30 phút là có kết quả nhận xe.' },
  { q: 'Xe máy cũ tại Ken Motor có được bảo hành không?', a: 'Có, tất cả xe máy cũ bán ra đều được bảo hành động cơ từ 3 đến 6 tháng tùy đời xe.' },
  { q: 'Cửa hàng có hỗ trợ sang tên rút gốc giấy tờ xe cũ không?', a: 'Chúng tôi cam kết pháp lý rõ ràng, hỗ trợ toàn bộ thủ tục rút hồ sơ gốc và sang tên đổi chủ nhanh chóng.' },
  { q: 'Mua xe cũ tại Ken Motor có đảm bảo xe không bị đâm đụng, ngập nước?', a: 'Mỗi xe cũ đều có bảng đánh giá tình trạng minh bạch, cam kết khung sườn nguyên bản, không đâm đụng ngập nước.' },
  { q: 'Làm thế nào để đăng ký lái thử xe?', a: 'Quý khách có thể vào trang Lái Thử trên website, điền thông tin xe mong muốn và thời gian lái thử.' },
  { q: 'Đăng ký lái thử xe có mất phí không?', a: 'Chương trình đăng ký lái thử tại Ken Motor hoàn toàn miễn phí.' },
  { q: 'Cửa hàng có thu mua lại xe cũ của khách hàng không?', a: 'Có, chúng tôi nhận thu mua xe cũ giá tốt, hoặc đổi xe cũ lấy xe mới (thu cũ đổi mới) cực kỳ ưu đãi.' },
  { q: 'Tôi muốn bán xe máy cũ online cần cung cấp thông tin gì?', a: 'Quý khách vào trang Bán Xe Cũ, gửi ảnh xe, đời xe, biển số, số km đi được và mức giá mong muốn.' },
  { q: 'Cửa hàng có giao xe tận nhà không?', a: 'Chúng tôi hỗ trợ giao xe tận nhà tại tỉnh Đồng Tháp và các tỉnh lân cận.' },
  { q: 'Xe điện VinFast bảo hành bao lâu?', a: 'Xe máy điện VinFast được bảo hành chính hãng 3 năm theo chính sách của VinFast Việt Nam.' },
  { q: 'Phí thuê pin xe máy điện VinFast tính như thế nào?', a: 'Chính sách thuê pin áp dụng theo bảng giá niêm yết của VinFast, có các gói cố định và linh hoạt tùy nhu cầu.' },
  { q: 'Tôi mua phụ kiện xe máy tại cửa hàng có hỗ trợ lắp đặt không?', a: 'Có, thợ kỹ thuật tại cửa hàng sẽ hỗ trợ lắp đặt trực tiếp miễn phí cho quý khách.' },
  { q: 'Thời gian làm việc của cửa hàng Ken Motor?', a: 'Cửa hàng làm việc từ 7:30 đến 18:30 tất cả các ngày trong tuần, kể cả ngày lễ.' },
  { q: 'Có cần bằng lái xe khi chạy xe máy điện không?', a: 'Với xe điện công suất nhỏ như Evo200 Lite (tối đa 49km/h) thì học sinh không cần bằng lái xe.' },
  { q: 'Mua xe máy tại Ken Motor có được tặng quà gì không?', a: 'Quý khách sẽ được tặng nón bảo hiểm chính hãng, áo mưa cao cấp, thay nhớt miễn phí lần đầu và nhiều quà tặng đi kèm.' },
  { q: 'Lại suất trả góp dự tính khoảng bao nhiêu?', a: 'Lãi suất dao động từ 0.99% đến 1.89% mỗi tháng tùy gói hồ sơ và điểm tín dụng của khách hàng.' },
  { q: 'Nếu hộ khẩu ở tỉnh khác có mua xe trả góp tại Đồng Tháp được không?', a: 'Được, chỉ cần có CCCD gắn chip là hỗ trợ làm hồ sơ toàn quốc.' },
  { q: 'Cửa hàng có những dòng xe phân khối lớn nào?', a: 'Chúng tôi phân phối các dòng xe PKL nhập khẩu từ Kawasaki, KTM, Ducati và Honda.' },
  { q: 'Xe số Honda Wave Alpha đi bao nhiêu km thì thay nhớt?', a: 'Nên thay nhớt động cơ sau mỗi 1500km đến 2000km để giữ xe bền bỉ.' },
  { q: 'Phanh ABS khác phanh CBS như thế nào?', a: 'ABS chống bó cứng phanh khi phanh gấp tránh trượt bánh, còn CBS là phanh kết hợp phân bổ lực phanh đồng thời hai bánh.' },
  { q: 'Tôi có thể thanh toán tiền mua xe bằng hình thức nào?', a: 'Cửa hàng hỗ trợ thanh toán tiền mặt, chuyển khoản ngân hàng hoặc quẹt thẻ POS.' },
  { q: 'Quy trình định giá xe cũ tại tiệm mất bao lâu?', a: 'Kiểm tra thực tế xe và báo giá thu mua ngay trong vòng 10 đến 15 phút.' },
  { q: 'Có được chọn màu xe theo phong thủy tại Ken Motor không?', a: 'Đội ngũ tư vấn sẽ tư vấn kỹ màu xe phù hợp phong thủy tuổi mệnh của khách hàng.' },
  { q: 'Làm sao để biết xe máy cũ có giấy tờ hợp lệ?', a: 'Cửa hàng kiểm tra gốc xe trên hệ thống đăng ký, cam kết 100% giấy tờ hợp lệ, không tranh chấp.' }
];

faqList.forEach((f, idx) => {
  faqs.push({
    id: generateUUID('faq', idx + 1),
    question: f.q,
    answer: f.a,
    sort_order: idx + 1
  });
});

// 6. Testimonials (20)
const testimonials = [];
const customerNames = [
  'Nguyễn Văn Hùng', 'Trần Thị Mai', 'Lê Hoàng Nam', 'Phạm Minh Tuấn', 'Vũ Thị Hồng',
  'Đặng Anh Tú', 'Bùi Minh Trí', 'Ngô Thanh Sơn', 'Đỗ Thùy Linh', 'Hoàng Văn Hải',
  'Lý Quốc Bảo', 'Trịnh Khánh An', 'Phan Văn Đức', 'Lâm Minh Thư', 'Võ Hoàng Huy',
  'Huỳnh Ngọc Hà', 'Mai Tiến Đạt', 'Cao Phương Thảo', 'Đinh Công Minh', 'Quách Thành Danh'
];
const feedbackComments = [
  'Mua chiếc Winner X ở đây máy móc chạy cực bốc, dịch vụ tư vấn trả góp rất nhiệt tình.',
  'Xe cũ ở cửa hàng chất lượng rất ổn định, tôi đi được hơn 1 năm rồi mà máy vẫn êm ru.',
  'Nhân viên làm hồ sơ trả góp cực nhanh, 15 phút là đã được dắt xe ra về rồi.',
  'Showroom sang trọng, nhiều mẫu xe hot. Giá cả rất cạnh tranh tại Cao Lãnh Đồng Tháp.',
  'Rất hài lòng với chính sách hỗ trợ rút hồ sơ và sang tên chính chủ cho xe cũ của tiệm.',
  'Mua xe máy điện Evo200 cho con đi học rất tiết kiệm xăng và an toàn, cám ơn Ken Motor.',
  'Đã giới thiệu 2 người bạn qua đây mua xe cũ, ai cũng khen xe chạy ngon lành cành đào.',
  'Tư vấn chọn xe online rất chính xác, đề xuất xe ga phù hợp chiều cao của mình.',
  'Thợ sửa xe và lắp phụ kiện tay nghề cao, làm việc cẩn thận tỉ mỉ.',
  'Xe côn tay Ducati Monster mua ở đây chuẩn chỉ, chế độ hậu mãi chu đáo.',
  'Địa chỉ mua xe máy tin cậy nhất Đồng Tháp, ông chủ vui tính, nhân viên chu đáo.',
  'Trang so sánh xe của web rất tiện lợi, giúp mình cân nhắc được giữa Air Blade và NVX.',
  'Mức giá bán xe cũ rất tốt, định giá xe cũ đổi xe mới nhanh gọn lẹ.',
  'Dịch vụ giao xe tận nhà rất chu đáo, xe giao tới còn bóng loáng nguyên đai nguyên kiện.',
  'Checklist xe cũ làm rất chi tiết, nhìn vào là biết tình trạng vỏ phanh máy thế nào.',
  'Bảo hành uy tín, xe gặp lỗi mang ra tiệm là thợ xử lý nhanh không kì kèo.',
  'Mua trả trước chỉ 20% mà lãi suất khá ưu đãi, mỗi tháng đóng tiền rất nhẹ nhàng.',
  'Quà tặng kèm theo nón bảo hiểm chất lượng tốt, không phải loại nón mỏng rẻ tiền.',
  'Tôi bán lại chiếc Vision cũ ở đây được giá cao hơn các chỗ khác khảo sát.',
  'Trải nghiệm tuyệt vời từ lúc tư vấn lái thử đến khi giao xe. Sẽ tiếp tục ủng hộ!'
];

customerNames.forEach((name, idx) => {
  testimonials.push({
    id: generateUUID('testimonial', idx + 1),
    name,
    avatar_url: `/demo/testimonials/avatar-${idx + 1}.svg`,
    role: idx % 2 === 0 ? 'Khách hàng mua xe mới' : 'Khách hàng mua xe cũ',
    comment: feedbackComments[idx],
    rating: idx % 5 === 0 ? 4 : 5,
    sort_order: idx + 1
  });
});

// Setup Unique slug & SKU tracking
const seenSlugs = new Set();
const seenSkus = new Set();

function makeSlug(name) {
  return name.toLowerCase()
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
    .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const dbVehicles = [];
const dbVehicleImages = [];

bikeTemplates.forEach((t, idx) => {
  const vId = generateUUID('vehicle', idx + 1);
  
  let slug = makeSlug(t.name);
  if (seenSlugs.has(slug)) {
    let counter = 1;
    while (seenSlugs.has(`${slug}-${counter}`)) {
      counter++;
    }
    slug = `${slug}-${counter}`;
  }
  seenSlugs.add(slug);

  let sku = `${t.brandSlug.toUpperCase()}-${vId.substring(0, 5).toUpperCase()}-${idx}`;
  if (seenSkus.has(sku)) {
    let counter = 1;
    while (seenSkus.has(`${sku}-${counter}`)) {
      counter++;
    }
    sku = `${sku}-${counter}`;
  }
  seenSkus.add(sku);
  
  const imagesCount = 3 + (idx % 3); // 3, 4, or 5 images
  const vehicleImages = [];
  
  for (let imgIdx = 0; imgIdx < imagesCount; imgIdx++) {
    const isCover = imgIdx === 0;
    const imgId = generateUUID(`vehicle_image_${idx}`, imgIdx + 1);
    const imgUrl = isCover 
      ? `/demo/vehicles/${slug}-cover.svg` 
      : `/demo/vehicles/${slug}-gallery-${imgIdx + 1}.svg`;
    
    vehicleImages.push({
      id: imgId,
      vehicle_id: vId,
      image_url: imgUrl,
      sort_order: imgIdx + 1,
      is_cover: isCover
    });
    
    dbVehicleImages.push(vehicleImages[imgIdx]);
  }

  const isFeatured = idx % 8 === 0;
  const isNewArrival = idx % 10 === 1;
  const isSold = idx % 20 === 2;

  const shortDesc = `Dòng xe ${t.name} phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.`;
  const detailDesc = `<p><strong>${t.name}</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>${t.brandName}</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ ${t.engine} mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ ${t.fuel}.</li><li>Hệ thống phanh ${t.brake} cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến ${t.warranty}.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>`;

  const defaultChecklist = {
    "Giấy tờ": "Chính chủ đầy đủ",
    "Động cơ": "Mượt mà, chưa mở máy",
    "Dàn áo": "Đẹp như mới, ít xước",
    "Phanh": "ABS/CBS hoạt động tốt",
    "Lốp xe": "Bình thường không nứt",
    "Khung sườn": "Chắc chắn nguyên bản",
    "Bảo dưỡng": "Mới thay nhớt vệ sinh nồi",
    "Điểm đánh giá": "9/10"
  };

  const checklistObj = t.isNew ? {} : { ...defaultChecklist, ...t.checklist };

  dbVehicles.push({
    id: vId,
    brand_id: t.brandId,
    category_id: t.categoryId,
    name: t.name,
    slug,
    sku,
    price: t.price,
    promo_price: t.promoPrice,
    is_new: t.isNew,
    registration_year: t.regYear,
    odometer: t.odometer,
    engine_capacity: t.engine,
    color: t.color,
    brake_type: t.brake,
    fuel_consumption: t.fuel,
    warranty: t.warranty,
    short_desc: shortDesc,
    detail_desc: detailDesc,
    specs_json: t.specs,
    used_checklist_json: checklistObj,
    is_featured: isFeatured,
    is_new_arrival: isNewArrival,
    is_sold: isSold,
    seo_title: `${t.name} Chính Hãng Giá Tốt | Ken Motor`,
    seo_description: `Mua bán xe máy ${t.name} tại Đồng Tháp. Giá bán cực rẻ: ${t.price.toLocaleString('vi-VN')}đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.`,
    og_image: vehicleImages[0].image_url,
    is_visible: true
  });
});

// Build SQL
let sql = `-- Ken Motor Seed Data (ON CONFLICT Safe)
-- Run this script to populate database with realistic Vietnamese content

-- 1. Insert Categories
INSERT INTO categories (id, name, slug, image_url, sort_order, seo_title, seo_description) VALUES
${categories.map(c => `('${c.id}', '${c.name.replace(/'/g, "''")}', '${c.slug}', '${c.image_url}', ${c.sort_order}, '${c.seo_title.replace(/'/g, "''")}', '${c.seo_description.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  image_url = CASE 
    WHEN categories.image_url IS NOT NULL AND categories.image_url NOT LIKE '%unsplash.com%' AND categories.image_url NOT LIKE '/demo/%'
    THEN categories.image_url
    ELSE EXCLUDED.image_url
  END,
  sort_order = EXCLUDED.sort_order,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;

-- 2. Insert Brands
INSERT INTO brands (id, name, slug, logo_url, seo_title, seo_description) VALUES
${brands.map(b => `('${b.id}', '${b.name.replace(/'/g, "''")}', '${b.slug}', '${b.logo_url}', '${b.seo_title.replace(/'/g, "''")}', '${b.seo_description.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  logo_url = CASE 
    WHEN brands.logo_url IS NOT NULL AND brands.logo_url NOT LIKE '%unsplash.com%' AND brands.logo_url NOT LIKE '/demo/%'
    THEN brands.logo_url
    ELSE EXCLUDED.logo_url
  END,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;

-- 3. Insert Vehicles
INSERT INTO vehicles (
  id, brand_id, category_id, name, slug, sku, price, promo_price, is_new,
  registration_year, odometer, engine_capacity, color, brake_type, fuel_consumption,
  warranty, short_desc, detail_desc, specs_json, used_checklist_json, is_featured,
  is_new_arrival, is_sold, seo_title, seo_description, og_image, is_visible
) VALUES
${dbVehicles.map(v => `(
  '${v.id}', '${v.brand_id}', '${v.category_id}', '${v.name.replace(/'/g, "''")}', '${v.slug}', '${v.sku}', ${v.price}, ${v.promo_price || 'NULL'}, ${v.is_new},
  ${v.registration_year || 'NULL'}, ${v.odometer}, '${v.engine_capacity}', '${v.color}', '${v.brake_type}', '${v.fuel_consumption}',
  '${v.warranty}', '${v.short_desc.replace(/'/g, "''")}', '${v.detail_desc.replace(/'/g, "''")}', '${JSON.stringify(v.specs_json).replace(/'/g, "''")}'::jsonb, '${JSON.stringify(v.used_checklist_json).replace(/'/g, "''")}'::jsonb, ${v.is_featured},
  ${v.is_new_arrival}, ${v.is_sold}, '${v.seo_title.replace(/'/g, "''")}', '${v.seo_description.replace(/'/g, "''")}', '${v.og_image}', ${v.is_visible}
)`).join(',\n')}
ON CONFLICT (slug) DO UPDATE SET
  brand_id = EXCLUDED.brand_id,
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  sku = EXCLUDED.sku,
  price = EXCLUDED.price,
  promo_price = EXCLUDED.promo_price,
  is_new = EXCLUDED.is_new,
  registration_year = EXCLUDED.registration_year,
  odometer = EXCLUDED.odometer,
  engine_capacity = EXCLUDED.engine_capacity,
  color = EXCLUDED.color,
  brake_type = EXCLUDED.brake_type,
  fuel_consumption = EXCLUDED.fuel_consumption,
  warranty = EXCLUDED.warranty,
  short_desc = EXCLUDED.short_desc,
  detail_desc = EXCLUDED.detail_desc,
  specs_json = EXCLUDED.specs_json,
  used_checklist_json = EXCLUDED.used_checklist_json,
  is_featured = EXCLUDED.is_featured,
  is_new_arrival = EXCLUDED.is_new_arrival,
  is_sold = EXCLUDED.is_sold,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_image = CASE 
    WHEN vehicles.og_image IS NOT NULL AND vehicles.og_image NOT LIKE '%unsplash.com%' AND vehicles.og_image NOT LIKE '/demo/%'
    THEN vehicles.og_image
    ELSE EXCLUDED.og_image
  END,
  is_visible = EXCLUDED.is_visible;

-- 4. Insert Vehicle Images
INSERT INTO vehicle_images (id, vehicle_id, image_url, sort_order, is_cover) VALUES
${dbVehicleImages.map(img => `('${img.id}', '${img.vehicle_id}', '${img.image_url}', ${img.sort_order}, ${img.is_cover})`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  image_url = CASE 
    WHEN vehicle_images.image_url IS NOT NULL AND vehicle_images.image_url NOT LIKE '%unsplash.com%' AND vehicle_images.image_url NOT LIKE '/demo/%'
    THEN vehicle_images.image_url
    ELSE EXCLUDED.image_url
  END,
  sort_order = EXCLUDED.sort_order,
  is_cover = EXCLUDED.is_cover;

-- 5. Insert Blog Posts
INSERT INTO posts (id, title, slug, excerpt, content, image_url, seo_title, seo_description) VALUES
${posts.map(p => `('${p.id}', '${p.title.replace(/'/g, "''")}', '${p.slug}', '${p.excerpt.replace(/'/g, "''")}', '${p.content.replace(/'/g, "''")}', '${p.image_url}', '${p.seo_title.replace(/'/g, "''")}', '${p.seo_description.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  image_url = CASE 
    WHEN posts.image_url IS NOT NULL AND posts.image_url NOT LIKE '%unsplash.com%' AND posts.image_url NOT LIKE '/demo/%'
    THEN posts.image_url
    ELSE EXCLUDED.image_url
  END,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description;

-- 6. Insert Sliders (Banners)
INSERT INTO sliders (id, title, subtitle, image_desktop_url, image_mobile_url, cta_link, cta_text, sort_order) VALUES
${sliders.map(s => `('${s.id}', '${s.title.replace(/'/g, "''")}', '${s.subtitle.replace(/'/g, "''")}', '${s.image_desktop_url}', '${s.image_mobile_url}', '${s.cta_link}', '${s.cta_text}', ${s.sort_order})`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  image_desktop_url = CASE 
    WHEN sliders.image_desktop_url IS NOT NULL AND sliders.image_desktop_url NOT LIKE '%unsplash.com%' AND sliders.image_desktop_url NOT LIKE '/demo/%'
    THEN sliders.image_desktop_url
    ELSE EXCLUDED.image_desktop_url
  END,
  image_mobile_url = CASE 
    WHEN sliders.image_mobile_url IS NOT NULL AND sliders.image_mobile_url NOT LIKE '%unsplash.com%' AND sliders.image_mobile_url NOT LIKE '/demo/%'
    THEN sliders.image_mobile_url
    ELSE EXCLUDED.image_mobile_url
  END,
  cta_link = EXCLUDED.cta_link,
  cta_text = EXCLUDED.cta_text,
  sort_order = EXCLUDED.sort_order;

-- 7. Insert FAQs
INSERT INTO faqs (id, question, answer, sort_order) VALUES
${faqs.map(f => `('${f.id}', '${f.question.replace(/'/g, "''")}', '${f.answer.replace(/'/g, "''")}', ${f.sort_order})`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order;

-- 8. Insert Testimonials
INSERT INTO testimonials (id, name, avatar_url, role, comment, rating, sort_order) VALUES
${testimonials.map(t => `('${t.id}', '${t.name.replace(/'/g, "''")}', '${t.avatar_url}', '${t.role.replace(/'/g, "''")}', '${t.comment.replace(/'/g, "''")}', ${t.rating}, ${t.sort_order})`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar_url = CASE 
    WHEN testimonials.avatar_url IS NOT NULL AND testimonials.avatar_url NOT LIKE '%unsplash.com%' AND testimonials.avatar_url NOT LIKE '/demo/%'
    THEN testimonials.avatar_url
    ELSE EXCLUDED.avatar_url
  END,
  role = EXCLUDED.role,
  comment = EXCLUDED.comment,
  rating = EXCLUDED.rating,
  sort_order = EXCLUDED.sort_order;

-- 9. Settings (Initial Configuration)
INSERT INTO settings (key, value) VALUES
('general_settings', '{
  "site_name": "Ken Motor",
  "hotline": "0787990047",
  "zalo_link": "https://zalo.me/0787990047",
  "email": "mk.d.kaka@gmail.com",
  "address": "Long Hưng, Đồng Tháp",
  "facebook_link": "https://facebook.com/kenmotor",
  "tiktok_link": "https://tiktok.com/@kenmotor",
  "youtube_link": "https://youtube.com/kenmotor",
  "google_maps_iframe": "<iframe src=\\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.960249764724!2d105.74836697479836!3d10.344933989779357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a6568bbffffff%3A0xe543bd105e4ebcf6!2zTG9uZyBIxrBuZywgTOG6pXAgVsOyLCDEkOG7k25nIFRow6FwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1718873000000!5m2!1svi!2s\\" width=\\"100%\\" height=\\"450\\" style=\\"border:0;\\" allowfullscreen=\\"\\" loading=\\"lazy\\" referrerpolicy=\\"no-referrer-when-downgrade\\"></iframe>",
  "seo_default_title": "Ken Motor | Cửa Hàng Xe Máy Uy Tín Tại Đồng Tháp",
  "seo_default_description": "Ken Motor chuyên mua bán xe máy mới, xe máy đã qua sử dụng, xe tay ga, xe số, xe côn tay và xe điện. Hỗ trợ tư vấn chọn xe, báo giá nhanh, trả góp linh hoạt và giao xe tận nơi.",
  "logo_url": "/logo.png",
  "favicon_url": "/favicon.ico"
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
`;

// Build quote requests
const quotes = [];
for (let i = 1; i <= 20; i++) {
  const qId = generateUUID('quote', i);
  const v1 = dbVehicles[(i * 3) % dbVehicles.length];
  const v2 = dbVehicles[(i * 7) % dbVehicles.length];
  const items = i % 3 === 0 ? [v1.id, v2.id] : [v1.id];
  const total = i % 3 === 0 ? (Number(v1.price) + Number(v2.price)) : Number(v1.price);
  const status = ['Pending', 'Contacted', 'Consulting', 'Closed', 'Cancelled'][i % 5];
  
  quotes.push({
    id: qId,
    name: `Khách Báo Giá ${i}`,
    phone: `090311223${i % 10}`,
    email: `khachhang${i}@gmail.com`,
    notes: `Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.`,
    vehicle_ids: items,
    total_price: total,
    status,
    internal_notes: i % 2 === 0 ? 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.' : ''
  });
}

sql += `\n-- 10. Insert Quote Requests
INSERT INTO quote_requests (id, name, phone, email, notes, vehicle_ids, total_price, status, internal_notes) VALUES
${quotes.map(q => `('${q.id}', '${q.name}', '${q.phone}', '${q.email}', '${q.notes.replace(/'/g, "''")}', '${JSON.stringify(q.vehicle_ids)}'::jsonb, ${q.total_price}, '${q.status}', '${q.internal_notes.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  notes = EXCLUDED.notes,
  vehicle_ids = EXCLUDED.vehicle_ids,
  total_price = EXCLUDED.total_price,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;
`;

// Build installments
const installments = [];
for (let i = 1; i <= 15; i++) {
  const instId = generateUUID('installment', i);
  const v = dbVehicles[(i * 5) % dbVehicles.length];
  const price = Number(v.price);
  const downpayment = Math.round(price * 0.3);
  const term = [6, 12, 18, 24][i % 4];
  const rate = 1.39;
  const status = ['Pending', 'Contacted', 'Consulting', 'Closed'][i % 4];
  
  installments.push({
    id: instId,
    name: `Khách Trả Góp ${i}`,
    phone: `098765432${i % 10}`,
    vehicle_id: v.id,
    price,
    downpayment,
    term_months: term,
    interest_rate: rate,
    status,
    internal_notes: `Khách muốn trả góp qua HD Saison trong ${term} tháng.`
  });
}

sql += `\n-- 11. Insert Installment Requests
INSERT INTO installment_requests (id, name, phone, vehicle_id, price, downpayment, term_months, interest_rate, status, internal_notes) VALUES
${installments.map(ins => `('${ins.id}', '${ins.name}', '${ins.phone}', '${ins.vehicle_id}', ${ins.price}, ${ins.downpayment}, ${ins.term_months}, ${ins.interest_rate}, '${ins.status}', '${ins.internal_notes.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  vehicle_id = EXCLUDED.vehicle_id,
  price = EXCLUDED.price,
  downpayment = EXCLUDED.downpayment,
  term_months = EXCLUDED.term_months,
  interest_rate = EXCLUDED.interest_rate,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;
`;

// Build sells
const sells = [];
for (let i = 1; i <= 10; i++) {
  const sellId = generateUUID('sell', i);
  const status = ['Pending', 'Contacted', 'Closed', 'Cancelled'][i % 4];
  
  sells.push({
    id: sellId,
    name: `Khách Bán Xe ${i}`,
    phone: `091234567${i % 10}`,
    brand_name: ['Honda', 'Yamaha', 'Suzuki'][i % 3],
    model_name: ['Vision 2018', 'Exciter 150 2017', 'Raider 2019'][i % 3],
    year: 2015 + (i % 5),
    license_plate: `66F1-${i}23.45`,
    odometer: 15000 + i * 2000,
    status_description: 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.',
    image_urls: [
      '/demo/placeholder-vehicle.svg'
    ],
    desired_price: 15000000 + i * 1500000,
    status,
    internal_notes: 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'
  });
}

sql += `\n-- 12. Insert Sell Requests
INSERT INTO sell_vehicle_requests (id, name, phone, brand_name, model_name, year, license_plate, odometer, status_description, image_urls, desired_price, status, internal_notes) VALUES
${sells.map(sl => `('${sl.id}', '${sl.name}', '${sl.phone}', '${sl.brand_name}', '${sl.model_name}', ${sl.year}, '${sl.license_plate}', ${sl.odometer}, '${sl.status_description.replace(/'/g, "''")}', '${JSON.stringify(sl.image_urls)}'::jsonb, ${sl.desired_price}, '${sl.status}', '${sl.internal_notes.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  brand_name = EXCLUDED.brand_name,
  model_name = EXCLUDED.model_name,
  year = EXCLUDED.year,
  license_plate = EXCLUDED.license_plate,
  odometer = EXCLUDED.odometer,
  status_description = EXCLUDED.status_description,
  image_urls = EXCLUDED.image_urls,
  desired_price = EXCLUDED.desired_price,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;
`;

// Build test drives
const testDrives = [];
for (let i = 1; i <= 10; i++) {
  const tdId = generateUUID('testdrive', i);
  const v = dbVehicles[(i * 8) % dbVehicles.length];
  const status = ['Pending', 'Contacted', 'Closed'][i % 3];
  
  testDrives.push({
    id: tdId,
    name: `Khách Lái Thử ${i}`,
    phone: `093456789${i % 10}`,
    vehicle_id: v.id,
    desired_date: `2026-06-${20 + (i % 7)}`,
    notes: 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.',
    status,
    internal_notes: 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'
  });
}

sql += `\n-- 13. Insert Test Drive Requests
INSERT INTO test_drive_requests (id, name, phone, vehicle_id, desired_date, notes, status, internal_notes) VALUES
${testDrives.map(td => `('${td.id}', '${td.name}', '${td.phone}', '${td.vehicle_id}', '${td.desired_date}', '${td.notes.replace(/'/g, "''")}', '${td.status}', '${td.internal_notes.replace(/'/g, "''")}')`).join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  vehicle_id = EXCLUDED.vehicle_id,
  desired_date = EXCLUDED.desired_date,
  notes = EXCLUDED.notes,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;
`;

// Helper to write SVG files
function writeSvg(filePath, width, height, bgGradient, text, subtitle = '') {
  const content = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${Math.random().toString(36).substring(7)}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgGradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bgGradient[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad-${Math.random().toString(36).substring(7)})" />
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="extrabold" fill="#ffffff" font-size="${Math.floor(height * 0.08)}px">${text}</text>
  ${subtitle ? `<text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="medium" fill="#94a3b8" font-size="${Math.floor(height * 0.04)}px">${subtitle}</text>` : ''}
</svg>`;
  fs.writeFileSync(filePath, content, 'utf8');
}

// Generate the physical SVGs
const demoDir = path.join(__dirname, '../public/demo');
if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir);
['vehicles', 'brands', 'sliders', 'posts', 'categories', 'testimonials'].forEach(sd => {
  const dir = path.join(demoDir, sd);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Category SVGs
const catGradients = [
  ['#ec4899', '#be185d'],
  ['#3b82f6', '#1d4ed8'],
  ['#f59e0b', '#d97706'],
  ['#10b981', '#047857'],
  ['#8b5cf6', '#6d28d9'],
  ['#6b7280', '#374151'],
  ['#14b8a6', '#0f766e']
];
categories.forEach((c, idx) => {
  writeSvg(path.join(demoDir, 'categories', `${c.slug}.svg`), 300, 300, catGradients[idx % catGradients.length], c.name);
});

// Brand SVGs
const brandGradients = [
  ['#ef4444', '#991b1b'],
  ['#3b82f6', '#1e3a8a'],
  ['#2563eb', '#1d4ed8'],
  ['#60a5fa', '#2563eb'],
  ['#0d9488', '#115e59'],
  ['#059669', '#065f46'],
  ['#2563eb', '#1d4ed8'],
  ['#16a34a', '#14532d'],
  ['#ea580c', '#c2410c'],
  ['#dc2626', '#991b1b']
];
brands.forEach((b, idx) => {
  writeSvg(path.join(demoDir, 'brands', `${b.slug}.svg`), 200, 200, brandGradients[idx % brandGradients.length], b.name);
});

// Slider SVGs
sliders.forEach((s, idx) => {
  writeSvg(path.join(demoDir, 'sliders', `slider-${idx + 1}-desktop.svg`), 1600, 600, ['#111827', '#030712'], s.title, s.subtitle);
  writeSvg(path.join(demoDir, 'sliders', `slider-${idx + 1}-mobile.svg`), 600, 800, ['#111827', '#030712'], s.title, s.subtitle);
});

// Post SVGs
posts.forEach((p, idx) => {
  writeSvg(path.join(demoDir, 'posts', `post-${idx + 1}.svg`), 800, 450, ['#312e81', '#1e1b4b'], 'KEN MOTOR BLOG', p.title);
});

// Testimonial Avatar SVGs
testimonials.forEach((t, idx) => {
  const content = `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
  <circle cx="75" cy="75" r="75" fill="#f3f4f6" />
  <circle cx="75" cy="55" r="28" fill="#9ca3af" />
  <path d="M75,90 C45,90 35,115 35,130 L115,130 C115,115 105,90 75,90 Z" fill="#9ca3af" />
  <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="bold" fill="#4b5563" font-size="10px">${t.name.split(' ').pop()}</text>
</svg>`;
  fs.writeFileSync(path.join(demoDir, 'testimonials', `avatar-${idx + 1}.svg`), content, 'utf8');
});

// Vehicle SVGs
dbVehicles.forEach((v, idx) => {
  // Generate Cover SVG
  const coverPath = path.join(demoDir, 'vehicles', `${v.slug}-cover.svg`);
  const colors = [
    ['#1e293b', '#0f172a'],
    ['#0f172a', '#1e293b'],
    ['#1f2937', '#111827'],
    ['#312e81', '#1e1b4b'],
    ['#111827', '#030712']
  ];
  const bg = colors[idx % colors.length];
  const coverContent = `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${v.slug}-cover" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bg[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad-${v.slug}-cover)" />
  <circle cx="200" cy="240" r="45" stroke="#ef4444" stroke-width="4" fill="none" opacity="0.6"/>
  <circle cx="400" cy="240" r="45" stroke="#ef4444" stroke-width="4" fill="none" opacity="0.6"/>
  <line x1="200" y1="240" x2="280" y2="180" stroke="#ef4444" stroke-width="5" opacity="0.6"/>
  <line x1="280" y1="180" x2="380" y2="180" stroke="#ef4444" stroke-width="5" opacity="0.6"/>
  <line x1="380" y1="180" x2="400" y2="240" stroke="#ef4444" stroke-width="5" opacity="0.6"/>
  <text x="50%" y="38%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="extrabold" fill="#ffffff" font-size="24px">${v.name.toUpperCase()}</text>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="medium" fill="#94a3b8" font-size="14px">Màu sắc: ${v.color || ''} | Giá: ${v.price.toLocaleString('vi-VN')}đ</text>
  <text x="50%" y="82%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="bold" fill="#ef4444" font-size="12px">KEN MOTOR SHOWROOM</text>
</svg>`;
  fs.writeFileSync(coverPath, coverContent, 'utf8');

  // Generate Gallery SVGs for this vehicle
  const vImages = dbVehicleImages.filter(img => img.vehicle_id === v.id && !img.is_cover);
  vImages.forEach((img, imgIdx) => {
    const galleryPath = path.join(demoDir, 'vehicles', `${v.slug}-gallery-${imgIdx + 2}.svg`);
    const galleryContent = `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${v.slug}-gallery-${imgIdx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bg[1]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad-${v.slug}-gallery-${imgIdx})" />
  <circle cx="200" cy="240" r="45" stroke="#3b82f6" stroke-width="4" fill="none" opacity="0.6"/>
  <circle cx="400" cy="240" r="45" stroke="#3b82f6" stroke-width="4" fill="none" opacity="0.6"/>
  <line x1="200" y1="240" x2="280" y2="180" stroke="#3b82f6" stroke-width="5" opacity="0.6"/>
  <line x1="280" y1="180" x2="380" y2="180" stroke="#3b82f6" stroke-width="5" opacity="0.6"/>
  <line x1="380" y1="180" x2="400" y2="240" stroke="#3b82f6" stroke-width="5" opacity="0.6"/>
  <text x="50%" y="38%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="extrabold" fill="#ffffff" font-size="22px">${v.name.toUpperCase()}</text>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="medium" fill="#94a3b8" font-size="14px">Chi tiết hình ảnh #${imgIdx + 2}</text>
  <text x="50%" y="82%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="bold" fill="#3b82f6" font-size="12px">KEN MOTOR DETAIL VIEW</text>
</svg>`;
    fs.writeFileSync(galleryPath, galleryContent, 'utf8');
  });
});

// Ensure target folders exist for DB seed outputs
if (!fs.existsSync(path.join(__dirname, '../supabase'))) {
  fs.mkdirSync(path.join(__dirname, '../supabase'));
}
if (!fs.existsSync(path.join(__dirname, '../src/lib/db'))) {
  fs.mkdirSync(path.join(__dirname, '../src/lib/db'), { recursive: true });
}

// Write supabase/seed-data.sql
fs.writeFileSync(path.join(__dirname, '../supabase/seed-data.sql'), sql, 'utf8');
console.log('Successfully wrote supabase/seed-data.sql');

// Generate TypeScript seed defaults content for localStorage fallback
const tsContent = `// Automatically generated by scripts/generate-seed.js
// Seed defaults for Demo Mode (LocalStorage fallback)
import { Brand, Category, Vehicle, VehicleImage, Post, Slider, FAQ, Testimonial, QuoteRequest, InstallmentRequest, SellVehicleRequest, TestDriveRequest } from './types';

export const DEFAULT_BRANDS: Brand[] = ${JSON.stringify(brands, null, 2)};

export const DEFAULT_CATEGORIES: Category[] = ${JSON.stringify(categories, null, 2)};

export const DEFAULT_VEHICLES: Vehicle[] = ${JSON.stringify(dbVehicles, null, 2)};

export const DEFAULT_VEHICLE_IMAGES: VehicleImage[] = ${JSON.stringify(dbVehicleImages, null, 2)};

export const DEFAULT_POSTS: Post[] = ${JSON.stringify(posts, null, 2)};

export const DEFAULT_SLIDERS: Slider[] = ${JSON.stringify(sliders, null, 2)};

export const DEFAULT_FAQS: FAQ[] = ${JSON.stringify(faqs, null, 2)};

export const DEFAULT_TESTIMONIALS: Testimonial[] = ${JSON.stringify(testimonials, null, 2)};

export const DEFAULT_QUOTE_REQUESTS: QuoteRequest[] = ${JSON.stringify(quotes, null, 2)};

export const DEFAULT_INSTALLMENT_REQUESTS: InstallmentRequest[] = ${JSON.stringify(installments, null, 2)};

export const DEFAULT_SELL_VEHICLE_REQUESTS: SellVehicleRequest[] = ${JSON.stringify(sells, null, 2)};

export const DEFAULT_TEST_DRIVE_REQUESTS: TestDriveRequest[] = ${JSON.stringify(testDrives, null, 2)};

export const DEFAULT_SETTINGS = {
  site_name: "Ken Motor",
  hotline: "0787990047",
  zalo_link: "https://zalo.me/0787990047",
  email: "mk.d.kaka@gmail.com",
  address: "Long Hưng, Đồng Tháp",
  facebook_link: "https://facebook.com/kenmotor",
  tiktok_link: "https://tiktok.com/@kenmotor",
  youtube_link: "https://youtube.com/kenmotor",
  google_maps_iframe: "<iframe src=\\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.960249764724!2d105.74836697479836!3d10.344933989779357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a6568bbffffff%3A0xe543bd105e4ebcf6!2zTG9uZyBIxrBuZywgTOG6pXAgVsOyLCDEkOG7k25nIFRow6FwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1718873000000!5m2!1svi!2s\\" width=\\"100%\\" height=\\"450\\" style=\\"border:0;\\" allowfullscreen=\\"\\" loading=\\"lazy\\" referrerpolicy=\\"no-referrer-when-downgrade\\"></iframe>",
  seo_default_title: "Ken Motor | Cửa Hàng Xe Máy Uy Tín Tại Đồng Tháp",
  seo_default_description: "Ken Motor chuyên mua bán xe máy mới, xe máy đã qua sử dụng, xe tay ga, xe số, xe côn tay và xe điện. Hỗ trợ tư vấn chọn xe, báo giá nhanh, trả góp linh hoạt và giao xe tận nơi.",
  logo_url: "/logo.png",
  favicon_url: "/favicon.ico"
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/db/seed-defaults.ts'), tsContent, 'utf8');
console.log('Successfully wrote src/lib/db/seed-defaults.ts');
