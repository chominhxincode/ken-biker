-- Ken Motor Seed Data (ON CONFLICT Safe)
-- Run this script to populate database with realistic Vietnamese content

-- 1. Insert Categories
INSERT INTO categories (id, name, slug, image_url, sort_order, seo_title, seo_description) VALUES
('bbea6ce8-290a-4d75-9034-95dd50bba683', 'Xe tay ga', 'xe-tay-ga', '/demo/categories/xe-tay-ga.svg', 1, 'Xe Tay Ga Cao Cấp & Tiết Kiệm Xăng | Ken Motor', 'Mua bán các dòng xe tay ga mới nhất từ Honda, Yamaha, Piaggio. Hỗ trợ trả góp nhanh, ưu đãi hấp dẫn.'),
('f319489f-cd87-441e-b31f-9e960301526f', 'Xe số', 'xe-so', '/demo/categories/xe-so.svg', 2, 'Xe Số Bền Bỉ, Giá Rẻ | Ken Motor', 'Tổng hợp các dòng xe số Wave Alpha, Sirius, Future chính hãng giá tốt nhất thị trường.'),
('b652b28c-9625-4a87-9d11-1af86644badc', 'Xe côn tay', 'xe-con-tay', '/demo/categories/xe-con-tay.svg', 3, 'Xe Côn Tay Thể Thao, Đầy Phấn Khích | Ken Motor', 'Danh sách xe côn tay Winner X, Exciter, Raider chính hãng. Đủ màu sắc, hỗ trợ trả góp lãi suất thấp.'),
('59fa91ac-8678-4e7f-b428-a57973f630d8', 'Xe điện', 'xe-dien', '/demo/categories/xe-dien.svg', 4, 'Xe Máy Điện Thông Minh, Tiết Kiệm | Ken Motor', 'Khám phá xe máy điện VinFast Evo200, Feliz, Klara hiện đại, thân thiện môi trường.'),
('1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Xe phân khối lớn', 'xe-phan-khoi-lon', '/demo/categories/xe-phan-khoi-lon.svg', 5, 'Xe Phân Khối Lớn (PKL) Ducati, Kawasaki, KTM | Ken Motor', 'Showroom xe phân khối lớn cao cấp tại Đồng Tháp. Trải nghiệm Ducati, Kawasaki, KTM chính hãng.'),
('9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Xe cũ tuyển chọn', 'xe-cu-tuyen-chon', '/demo/categories/xe-cu-tuyen-chon.svg', 6, 'Xe Máy Cũ Chất Lượng, Giá Tốt | Ken Motor', 'Các dòng xe máy cũ đã qua sử dụng được kiểm định nghiêm ngặt, giấy tờ minh bạch, bảo hành dài hạn.'),
('88437967-eddc-4ad3-a174-63feb5316b5c', 'Phụ kiện xe máy', 'phu-kien-xe-may', '/demo/categories/phu-kien-xe-may.svg', 7, 'Phụ Kiện, Đồ Chơi Xe Máy Chính Hãng | Ken Motor', 'Mũ bảo hiểm, dầu nhớt Motul, khóa chống trộm, đồ chơi xe kiểng chính hãng giá tốt.')
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
('69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'Honda', 'honda', '/demo/brands/honda.svg', 'Xe Máy Honda Chính Hãng | Ken Motor', 'Mua bán các dòng xe máy Honda: Vision, Air Blade, SH, Wave Alpha chính hãng.'),
('a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'Yamaha', 'yamaha', '/demo/brands/yamaha.svg', 'Xe Máy Yamaha Thời Trang, Thể Thao | Ken Motor', 'Báo giá xe máy Yamaha Exciter, Grande, Janus, Sirius chính hãng mới nhất.'),
('9bf15c59-3d79-4e25-aec6-d61b772d15b1', 'Suzuki', 'suzuki', '/demo/brands/suzuki.svg', 'Xe Máy Suzuki Mạnh Mẽ, Độc Chất | Ken Motor', 'Suzuki Raider, Satria, Burgman Street chính hãng tại Ken Motor.'),
('470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'SYM', 'sym', '/demo/brands/sym.svg', 'Xe Máy SYM Tiện Lợi, Tiết Kiệm | Ken Motor', 'Mua bán xe máy SYM Attila, Elegant, Galaxy chính hãng giá rẻ.'),
('c31f31e1-6102-4f90-a037-e51706d3a1a7', 'Piaggio', 'piaggio', '/demo/brands/piaggio.svg', 'Xe Piaggio Liberty, Medley Cao Cấp | Ken Motor', 'Showroom xe Piaggio sang trọng phong cách Ý.'),
('b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', 'Vespa', 'vespa', '/demo/brands/vespa.svg', 'Xe Vespa Ý Đẳng Cấp Thời Thượng | Ken Motor', 'Vespa Sprint, Primavera, GTS chính hãng đầy quyến rũ.'),
('963bae54-30c8-4c48-923d-817cb50c9e3b', 'VinFast', 'vinfast', '/demo/brands/vinfast.svg', 'Xe Máy Điện VinFast Thông Minh | Ken Motor', 'Báo giá xe máy điện VinFast thông minh chính hãng mới nhất.'),
('fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', 'Kawasaki', 'kawasaki', '/demo/brands/kawasaki.svg', 'Xe PKL Kawasaki Thể Thao | Ken Motor', 'Các mẫu xe Kawasaki Ninja 400, Z650, Ninja ZX chính hãng.'),
('0d7e803a-ec56-451c-bebe-cb15d33df337', 'KTM', 'ktm', '/demo/brands/ktm.svg', 'KTM Duke, RC, Adventure Bụi Bặm | Ken Motor', 'Xe cào cào và naked bike KTM cá tính mạnh mẽ.'),
('5f8e1926-6bba-4221-ac0b-27bfb114c6e6', 'Ducati', 'ducati', '/demo/brands/ducati.svg', 'Ducati Siêu Xe PKL Cao Cấp | Ken Motor', 'Độc quyền trải nghiệm các dòng siêu mô tô Ducati tại Đồng Tháp.')
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
(
  '01692a3d-5386-4781-a2d6-21f8f578c8cb', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda Vision 110cc Tiêu Chuẩn', 'honda-vision-110cc-tieu-chuan', 'HONDA-01692-0', 31500000, 31000000, true,
  2026, 0, '110cc', 'Trắng Đen', 'CBS', '1.85 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Vision 110cc Tiêu Chuẩn phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Vision 110cc Tiêu Chuẩn</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.85 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP, 4 kỳ, 1 xy-lanh, làm mát bằng không khí","Công suất":"6.59 kW / 7500 vòng/phút","Độ cao yên":"761 mm","Trọng lượng":"95 kg","Dung tích cốp":"18 lít"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Honda Vision 110cc Tiêu Chuẩn Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Vision 110cc Tiêu Chuẩn tại Đồng Tháp. Giá bán cực rẻ: 31.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-vision-110cc-tieu-chuan-cover.svg', true
),
(
  '8b983eac-5d99-4025-a7e2-8f346346d893', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda Vision 110cc Thể Thao', 'honda-vision-110cc-the-thao', 'HONDA-8B983-1', 36500000, NULL, true,
  2026, 0, '110cc', 'Xám Xi Măng', 'CBS', '1.85 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Vision 110cc Thể Thao phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Vision 110cc Thể Thao</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.85 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP, eSP+ thế hệ mới","Công suất":"6.59 kW / 7500 vòng/phút","Độ cao yên":"785 mm","Trọng lượng":"98 kg","Dung tích cốp":"18 lít"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Honda Vision 110cc Thể Thao Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Vision 110cc Thể Thao tại Đồng Tháp. Giá bán cực rẻ: 36.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-vision-110cc-the-thao-cover.svg', true
),
(
  'bbc5b327-75c3-4422-af8b-649b567f6aa7', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda Lead 125cc Cao Cấp', 'honda-lead-125cc-cao-cap', 'HONDA-BBC5B-2', 41500000, 40900000, true,
  2026, 0, '125cc', 'Đỏ Đô', 'CBS', '2.16 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Lead 125cc Cao Cấp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Lead 125cc Cao Cấp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.16 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP+ 4 van","Công suất":"8.22 kW / 8500 vòng/phút","Độ cao yên":"760 mm","Trọng lượng":"113 kg","Dung tích cốp":"37 lít"}'::jsonb, '{}'::jsonb, false,
  false, true, 'Honda Lead 125cc Cao Cấp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Lead 125cc Cao Cấp tại Đồng Tháp. Giá bán cực rẻ: 41.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-lead-125cc-cao-cap-cover.svg', true
),
(
  'afca39b2-3af1-4679-9285-1b0f2c114656', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda Air Blade 125cc Đặc Biệt', 'honda-air-blade-125cc-dac-biet', 'HONDA-AFCA3-3', 43000000, 42500000, true,
  2026, 0, '125cc', 'Đen Vàng', 'CBS', '2.26 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Air Blade 125cc Đặc Biệt phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Air Blade 125cc Đặc Biệt</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.26 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP+ 4 van, 124.8cc","Công suất":"8.75 kW / 8500 vòng/phút","Độ cao yên":"775 mm","Trọng lượng":"113 kg","Dung tích cốp":"23.2 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Air Blade 125cc Đặc Biệt Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Air Blade 125cc Đặc Biệt tại Đồng Tháp. Giá bán cực rẻ: 43.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-air-blade-125cc-dac-biet-cover.svg', true
),
(
  'fe6b7b31-8326-4333-92c7-dff3772b7f02', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda Air Blade 160cc Đặc Biệt ABS', 'honda-air-blade-160cc-dac-biet-abs', 'HONDA-FE6B7-4', 57000000, 56000000, true,
  2026, 0, '160cc', 'Xanh Xám', 'ABS', '2.3 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Air Blade 160cc Đặc Biệt ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Air Blade 160cc Đặc Biệt ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 160cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.3 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP+, 156.9cc","Công suất":"11.2 kW / 8000 vòng/phút","Độ cao yên":"775 mm","Trọng lượng":"114 kg","Dung tích cốp":"23.2 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Air Blade 160cc Đặc Biệt ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Air Blade 160cc Đặc Biệt ABS tại Đồng Tháp. Giá bán cực rẻ: 57.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-air-blade-160cc-dac-biet-abs-cover.svg', true
),
(
  '02880cf2-e54e-4ef7-a732-48b03055f720', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda SH Mode 125cc Thể Thao', 'honda-sh-mode-125cc-the-thao', 'HONDA-02880-5', 64500000, NULL, true,
  2026, 0, '125cc', 'Xám Đen', 'ABS', '2.16 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda SH Mode 125cc Thể Thao phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda SH Mode 125cc Thể Thao</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.16 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP+ 4 van, 124.8cc","Công suất":"8.2 kW / 8500 vòng/phút","Độ cao yên":"765 mm","Trọng lượng":"116 kg","Dung tích cốp":"18.5 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda SH Mode 125cc Thể Thao Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda SH Mode 125cc Thể Thao tại Đồng Tháp. Giá bán cực rẻ: 64.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-sh-mode-125cc-the-thao-cover.svg', true
),
(
  'e567bcd5-534c-454e-9d3c-5466cc79f95d', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda SH 125i Cao Cấp ABS', 'honda-sh-125i-cao-cap-abs', 'HONDA-E567B-6', 83000000, 82000000, true,
  2026, 0, '125cc', 'Trắng', 'ABS', '2.46 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda SH 125i Cao Cấp ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda SH 125i Cao Cấp ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.46 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP+ 124.8cc","Công suất":"9.6 kW / 8250 vòng/phút","Độ cao yên":"799 mm","Trọng lượng":"133 kg","Dung tích cốp":"28 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda SH 125i Cao Cấp ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda SH 125i Cao Cấp ABS tại Đồng Tháp. Giá bán cực rẻ: 83.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-sh-125i-cao-cap-abs-cover.svg', true
),
(
  '4832303e-cf03-43ab-a10e-36c2084cbccd', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda SH 160i Thể Thao ABS', 'honda-sh-160i-the-thao-abs', 'HONDA-48323-7', 104000000, 102500000, true,
  2026, 0, '160cc', 'Xám xi măng', 'ABS', '2.24 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda SH 160i Thể Thao ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda SH 160i Thể Thao ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 160cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.24 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"eSP+ 156.9cc","Công suất":"12.4 kW / 8500 vòng/phút","Độ cao yên":"799 mm","Trọng lượng":"134 kg","Dung tích cốp":"28 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda SH 160i Thể Thao ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda SH 160i Thể Thao ABS tại Đồng Tháp. Giá bán cực rẻ: 104.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-sh-160i-the-thao-abs-cover.svg', true
),
(
  'ed1f02b9-55eb-460f-bc24-f02896eed838', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Honda SH 350i Thể Thao Lắp Ráp Việt Nam', 'honda-sh-350i-the-thao-lap-rap-viet-nam', 'HONDA-ED1F0-8', 152000000, 149000000, true,
  2026, 0, '350cc', 'Xám Đen', 'ABS', '3.54 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda SH 350i Thể Thao Lắp Ráp Việt Nam phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda SH 350i Thể Thao Lắp Ráp Việt Nam</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 350cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.54 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, xy-lanh đơn, 329.6cc","Công suất":"21.5 kW / 7500 vòng/phút","Độ cao yên":"805 mm","Trọng lượng":"172 kg","Dung tích cốp":"28 lít"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Honda SH 350i Thể Thao Lắp Ráp Việt Nam Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda SH 350i Thể Thao Lắp Ráp Việt Nam tại Đồng Tháp. Giá bán cực rẻ: 152.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-sh-350i-the-thao-lap-rap-viet-nam-cover.svg', true
),
(
  '449aa7ea-5574-44d4-a819-33ddc14a968b', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'f319489f-cd87-441e-b31f-9e960301526f', 'Honda Wave Alpha 110cc', 'honda-wave-alpha-110cc', 'HONDA-449AA-9', 18900000, 18500000, true,
  2026, 0, '110cc', 'Xanh Dương', 'Đùm', '1.72 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Wave Alpha 110cc phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Wave Alpha 110cc</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.72 L/100km.</li><li>Hệ thống phanh Đùm cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Xy-lanh đơn, 109.1cc","Công suất":"6.12 kW / 7500 vòng/phút","Độ cao yên":"769 mm","Trọng lượng":"97 kg","Hộp số":"Tròn 4 số"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Wave Alpha 110cc Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Wave Alpha 110cc tại Đồng Tháp. Giá bán cực rẻ: 18.900.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-wave-alpha-110cc-cover.svg', true
),
(
  '45330799-3862-4532-9028-fe3639a32296', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'f319489f-cd87-441e-b31f-9e960301526f', 'Honda Wave RSX FI 110 Phanh Đĩa', 'honda-wave-rsx-fi-110-phanh-dia', 'HONDA-45330-10', 22500000, NULL, true,
  2026, 0, '110cc', 'Đỏ Đen', 'Đĩa', '1.56 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Wave RSX FI 110 Phanh Đĩa phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Wave RSX FI 110 Phanh Đĩa</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.56 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Phun xăng điện tử FI, 109.1cc","Công suất":"6.46 kW / 7500 vòng/phút","Độ cao yên":"760 mm","Trọng lượng":"99 kg","Hộp số":"Tròn 4 số"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Wave RSX FI 110 Phanh Đĩa Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Wave RSX FI 110 Phanh Đĩa tại Đồng Tháp. Giá bán cực rẻ: 22.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-wave-rsx-fi-110-phanh-dia-cover.svg', true
),
(
  '30949cea-3937-4f30-bc2c-d637f2fcc5c1', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'f319489f-cd87-441e-b31f-9e960301526f', 'Honda Future 125 Fi Cao Cấp Vành Đúc', 'honda-future-125-fi-cao-cap-vanh-duc', 'HONDA-30949-11', 32500000, 32000000, true,
  2026, 0, '125cc', 'Xanh Đen', 'Đĩa', '1.54 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Future 125 Fi Cao Cấp Vành Đúc phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Future 125 Fi Cao Cấp Vành Đúc</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.54 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, 124.9cc","Công suất":"6.83 kW / 7500 vòng/phút","Độ cao yên":"773 mm","Trọng lượng":"105 kg","Hộp số":"Tròn 4 số"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Honda Future 125 Fi Cao Cấp Vành Đúc Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Future 125 Fi Cao Cấp Vành Đúc tại Đồng Tháp. Giá bán cực rẻ: 32.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-future-125-fi-cao-cap-vanh-duc-cover.svg', true
),
(
  '56710c1c-53d1-4fe8-9242-a83381390f00', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'f319489f-cd87-441e-b31f-9e960301526f', 'Honda Blade 110 Vành Nan Hoa Phanh Cơ', 'honda-blade-110-vanh-nan-hoa-phanh-co', 'HONDA-56710-12', 19500000, 19200000, true,
  2026, 0, '110cc', 'Đen Đỏ', 'Đùm', '1.85 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Blade 110 Vành Nan Hoa Phanh Cơ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Blade 110 Vành Nan Hoa Phanh Cơ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.85 L/100km.</li><li>Hệ thống phanh Đùm cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"109.1cc, 4 kỳ","Công suất":"6.18 kW / 7500 vòng/phút","Độ cao yên":"769 mm","Trọng lượng":"98 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Blade 110 Vành Nan Hoa Phanh Cơ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Blade 110 Vành Nan Hoa Phanh Cơ tại Đồng Tháp. Giá bán cực rẻ: 19.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-blade-110-vanh-nan-hoa-phanh-co-cover.svg', true
),
(
  'ae748aa3-b0d9-4920-afb0-a81fc6a72b6d', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Honda Winner X V3 Đặc Biệt ABS', 'honda-winner-x-v3-dac-biet-abs', 'HONDA-AE748-13', 46500000, 43900000, true,
  2026, 0, '150cc', 'Đỏ Đen Bạc', 'ABS', '1.98 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Winner X V3 Đặc Biệt ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Winner X V3 Đặc Biệt ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.98 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, 149.1cc, làm mát bằng dung dịch","Công suất":"11.5 kW / 9000 vòng/phút","Độ cao yên":"795 mm","Trọng lượng":"122 kg","Hộp số":"6 cấp"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Winner X V3 Đặc Biệt ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Winner X V3 Đặc Biệt ABS tại Đồng Tháp. Giá bán cực rẻ: 46.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-winner-x-v3-dac-biet-abs-cover.svg', true
),
(
  'bddd8244-fd2b-4e25-96a5-e017ad24b8ec', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Honda CB150R Exmotion', 'honda-cb150r-exmotion', 'HONDA-BDDD8-14', 105000000, 99000000, true,
  2026, 0, '150cc', 'Đỏ Đen', 'ABS', '2.5 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda CB150R Exmotion phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda CB150R Exmotion</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.5 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 149.2cc","Công suất":"11.8 kW / 9000 vòng/phút","Độ cao yên":"795 mm","Trọng lượng":"125 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda CB150R Exmotion Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda CB150R Exmotion tại Đồng Tháp. Giá bán cực rẻ: 105.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-cb150r-exmotion-cover.svg', true
),
(
  '386827fc-3fe4-4aab-b6f4-3c6d09730d7d', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Honda CBR150R Thể Thao ABS', 'honda-cbr150r-the-thao-abs', 'HONDA-38682-15', 72000000, 69900000, true,
  2026, 0, '150cc', 'Đỏ HRC', 'ABS', '2.25 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda CBR150R Thể Thao ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda CBR150R Thể Thao ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.25 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, 149.2cc, 4 van","Công suất":"12.6 kW / 9000 vòng/phút","Độ cao yên":"782 mm","Trọng lượng":"139 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda CBR150R Thể Thao ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda CBR150R Thể Thao ABS tại Đồng Tháp. Giá bán cực rẻ: 72.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-cbr150r-the-thao-abs-cover.svg', true
),
(
  '0ed95862-0197-4cf8-9dac-ea7d449b514d', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Honda CB300R', 'honda-cb300r', 'HONDA-0ED95-16', 140000000, 135000000, true,
  2026, 0, '286cc', 'Đen Nhám', 'ABS', '3.1 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda CB300R phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda CB300R</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 286cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.1 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 286cc","Công suất":"22.8 kW / 8500 vòng/phút","Độ cao yên":"799 mm","Trọng lượng":"143 kg"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Honda CB300R Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda CB300R tại Đồng Tháp. Giá bán cực rẻ: 140.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-cb300r-cover.svg', true
),
(
  '8b415dfb-9141-460c-ae25-b60569431ab9', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Honda Rebel 300 Classic', 'honda-rebel-300-classic', 'HONDA-8B415-17', 125000000, NULL, true,
  2026, 0, '286cc', 'Đen bóng', 'ABS', '2.9 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Rebel 300 Classic phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Rebel 300 Classic</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 286cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.9 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 286cc","Công suất":"20.3 kW / 8000 vòng/phút","Độ cao yên":"690 mm","Trọng lượng":"170 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Rebel 300 Classic Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Rebel 300 Classic tại Đồng Tháp. Giá bán cực rẻ: 125.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-rebel-300-classic-cover.svg', true
),
(
  '6a822785-05dd-4606-8aed-40d70e45f32c', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Honda Rebel 500 Cruiser', 'honda-rebel-500-cruiser', 'HONDA-6A822-18', 180000000, 178000000, true,
  2026, 0, '471cc', 'Xám Đen', 'ABS', '3.42 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda Rebel 500 Cruiser phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Rebel 500 Cruiser</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 471cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.42 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song, DOHC, 471cc","Công suất":"33.5 kW / 8500 vòng/phút","Độ cao yên":"690 mm","Trọng lượng":"190 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda Rebel 500 Cruiser Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Rebel 500 Cruiser tại Đồng Tháp. Giá bán cực rẻ: 180.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-rebel-500-cruiser-cover.svg', true
),
(
  '276625a0-a4ae-4b86-91a9-23eaab5ce9a3', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Honda CB500F Naked Bike', 'honda-cb500f-naked-bike', 'HONDA-27662-19', 184000000, NULL, true,
  2026, 0, '471cc', 'Đỏ Đen', 'ABS', '3.5 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda CB500F Naked Bike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda CB500F Naked Bike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 471cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.5 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, 2 xy-lanh, 471cc","Công suất":"35 kW / 8600 vòng/phút","Độ cao yên":"789 mm","Trọng lượng":"189 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda CB500F Naked Bike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda CB500F Naked Bike tại Đồng Tháp. Giá bán cực rẻ: 184.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-cb500f-naked-bike-cover.svg', true
),
(
  '623d6583-cfc8-4e34-8492-2217e3feb41b', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Honda CB650R Neo Sports Cafe', 'honda-cb650r-neo-sports-cafe', 'HONDA-623D6-20', 246000000, 240000000, true,
  2026, 0, '649cc', 'Đỏ Candy', 'ABS Dual', '4.9 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Honda CB650R Neo Sports Cafe phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda CB650R Neo Sports Cafe</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 649cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.9 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"4 xy-lanh thẳng hàng, DOHC, 649cc","Công suất":"61 kW / 10000 vòng/phút","Độ cao yên":"810 mm","Trọng lượng":"202 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Honda CB650R Neo Sports Cafe Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda CB650R Neo Sports Cafe tại Đồng Tháp. Giá bán cực rẻ: 246.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-cb650r-neo-sports-cafe-cover.svg', true
),
(
  '0b45d680-21ec-4c2a-bdad-4deaa803e03d', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Wave Alpha 110cc Cũ Đẹp', 'honda-wave-alpha-110cc-cu-dep', 'HONDA-0B45D-21', 12500000, NULL, false,
  2021, 15000, '110cc', 'Xanh Ngọc', 'Đùm', '1.75 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Honda Wave Alpha 110cc Cũ Đẹp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Wave Alpha 110cc Cũ Đẹp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.75 L/100km.</li><li>Hệ thống phanh Đùm cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Tình trạng":"Mới 85%, máy móc nguyên bản","Biển số":"66F1-345.67 (Đồng Tháp)"}'::jsonb, '{"Giấy tờ":"Chính chủ, sang tên ngay","Động cơ":"Nổ êm, không gõ","Dàn áo":"Trầy xước nhẹ không đáng kể","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Độ mòn 30%","Khung sườn":"Không rỉ sét, chưa đâm đụng","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Hoạt động tốt"}'::jsonb, false,
  true, false, 'Honda Wave Alpha 110cc Cũ Đẹp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Wave Alpha 110cc Cũ Đẹp tại Đồng Tháp. Giá bán cực rẻ: 12.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-wave-alpha-110cc-cu-dep-cover.svg', true
),
(
  '343c6dec-e831-449d-a347-d98b60dffedc', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Vision 110cc Cao Cấp Cũ', 'honda-vision-110cc-cao-cap-cu', 'HONDA-343C6-22', 23000000, 22500000, false,
  2019, 22000, '110cc', 'Đỏ Mận', 'CBS', '1.9 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Honda Vision 110cc Cao Cấp Cũ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Vision 110cc Cao Cấp Cũ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.9 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Tình trạng":"Mới 80%, dán keo nguyên xe","Biển số":"66K1-888.88"}'::jsonb, '{"Giấy tờ":"Chính chủ, bao công chứng","Động cơ":"Êm ái, láp không hú","Dàn áo":"Dán keo chống trầy mới lột","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Đã thay cặp lốp Michelin mới","Khung sườn":"Nguyên bản","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Nhạy, đã bảo dưỡng"}'::jsonb, false,
  false, true, 'Honda Vision 110cc Cao Cấp Cũ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Vision 110cc Cao Cấp Cũ tại Đồng Tháp. Giá bán cực rẻ: 23.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-vision-110cc-cao-cap-cu-cover.svg', true
),
(
  'b46458b8-7deb-4a58-8895-715990621e89', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Winner X 150 Cũ Giá Rẻ', 'honda-winner-x-150-cu-gia-re', 'HONDA-B4645-23', 24500000, NULL, false,
  2020, 18000, '150cc', 'Đen Cam', 'CBS', '2.0 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Honda Winner X 150 Cũ Giá Rẻ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Winner X 150 Cũ Giá Rẻ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.0 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Tình trạng":"Mới 85%, lên pô kiểng nhẹ","Biển số":"66H1-223.34"}'::jsonb, '{"Giấy tờ":"Chính chủ sang tên","Động cơ":"DOHC bốc, không dộng dên","Dàn áo":"Màu sắc thể thao, dán decal kiểng","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Nguyên bản theo xe","Khung sườn":"Đạt chuẩn kiểm định","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Phanh CBS zin nhạy"}'::jsonb, false,
  false, false, 'Honda Winner X 150 Cũ Giá Rẻ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Winner X 150 Cũ Giá Rẻ tại Đồng Tháp. Giá bán cực rẻ: 24.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-winner-x-150-cu-gia-re-cover.svg', true
),
(
  '6a91223d-4c73-4fd9-9edc-69725b4507c9', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Air Blade 125 Cũ Đời 2018', 'honda-air-blade-125-cu-doi-2018', 'HONDA-6A912-24', 27000000, NULL, false,
  2018, 30000, '125cc', 'Đen Mờ', 'CBS', '2.2 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Honda Air Blade 125 Cũ Đời 2018 phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Air Blade 125 Cũ Đời 2018</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.2 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66P1-123.45","Odo thực tế":"30,000 km"}'::jsonb, '{"Giấy tờ":"Đầy đủ, kèm chứng minh chủ cũ","Động cơ":"Đã vệ sinh nồi, máy cực êm","Dàn áo":"Trầy xước dăm nhẹ góc yếm","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Đã thay mới","Khung sườn":"Kiểm tra kỹ không cong vênh","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, true,
  false, false, 'Honda Air Blade 125 Cũ Đời 2018 Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Air Blade 125 Cũ Đời 2018 tại Đồng Tháp. Giá bán cực rẻ: 27.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-air-blade-125-cu-doi-2018-cover.svg', true
),
(
  'a09f1370-0201-4a40-93c4-2c1a2130b6ec', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Yamaha Janus 125cc Tiêu Chuẩn', 'yamaha-janus-125cc-tieu-chuan', 'YAMAHA-A09F1-25', 28500000, 27900000, true,
  2026, 0, '125cc', 'Đỏ Đen', 'CBS', '1.87 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Janus 125cc Tiêu Chuẩn phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Janus 125cc Tiêu Chuẩn</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.87 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Blue Core, 125cc","Công suất":"7.0 kW / 8000 vòng/phút","Độ cao yên":"770 mm","Trọng lượng":"97 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha Janus 125cc Tiêu Chuẩn Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Janus 125cc Tiêu Chuẩn tại Đồng Tháp. Giá bán cực rẻ: 28.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-janus-125cc-tieu-chuan-cover.svg', true
),
(
  '2db000a8-04e5-4e30-aed9-81d4c8c40625', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Yamaha Grande 125cc Blue Core Hybrid', 'yamaha-grande-125cc-blue-core-hybrid', 'YAMAHA-2DB00-26', 46000000, 45000000, true,
  2026, 0, '125cc', 'Xanh Ngọc', 'ABS', '1.66 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Grande 125cc Blue Core Hybrid phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Grande 125cc Blue Core Hybrid</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.66 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Blue Core Hybrid, 124.9cc","Công suất":"6.1 kW / 6500 vòng/phút","Độ cao yên":"790 mm","Trọng lượng":"101 kg","Dung tích cốp":"27 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha Grande 125cc Blue Core Hybrid Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Grande 125cc Blue Core Hybrid tại Đồng Tháp. Giá bán cực rẻ: 46.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-grande-125cc-blue-core-hybrid-cover.svg', true
),
(
  '8d0b4d65-1e44-4c9d-b763-26a63c0155be', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Yamaha Latte 125cc Thời Trang', 'yamaha-latte-125cc-thoi-trang', 'YAMAHA-8D0B4-27', 38500000, NULL, true,
  2026, 0, '125cc', 'Trắng Sữa', 'CBS', '1.8 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Latte 125cc Thời Trang phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Latte 125cc Thời Trang</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.8 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Blue Core, 125cc","Độ cao yên":"790 mm","Trọng lượng":"100 kg","Dung tích cốp":"37 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha Latte 125cc Thời Trang Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Latte 125cc Thời Trang tại Đồng Tháp. Giá bán cực rẻ: 38.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-latte-125cc-thoi-trang-cover.svg', true
),
(
  '4f43621d-ce88-4737-8371-e6f570ceaa27', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Yamaha FreeGo 125cc Đặc Biệt ABS', 'yamaha-freego-125cc-dac-biet-abs', 'YAMAHA-4F436-28', 34500000, 33900000, true,
  2026, 0, '125cc', 'Đen Nhám', 'ABS', '1.97 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha FreeGo 125cc Đặc Biệt ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha FreeGo 125cc Đặc Biệt ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.97 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Blue Core, xy-lanh đơn, 125cc","Độ cao yên":"778 mm","Trọng lượng":"102 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha FreeGo 125cc Đặc Biệt ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha FreeGo 125cc Đặc Biệt ABS tại Đồng Tháp. Giá bán cực rẻ: 34.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-freego-125cc-dac-biet-abs-cover.svg', true
),
(
  'ab01c1e8-87ed-4da4-83b8-e00df6d28b46', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Yamaha NVX 155 V2 Thế Thế Hệ Mới ABS', 'yamaha-nvx-155-v2-the-the-he-moi-abs', 'YAMAHA-AB01C-29', 54500000, 53800000, true,
  2026, 0, '155cc', 'Xanh GP', 'ABS', '2.19 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha NVX 155 V2 Thế Thế Hệ Mới ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha NVX 155 V2 Thế Thế Hệ Mới ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 155cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.19 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Blue Core, VVA, 155cc","Công suất":"11.3 kW / 8000 vòng/phút","Độ cao yên":"790 mm","Trọng lượng":"125 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha NVX 155 V2 Thế Thế Hệ Mới ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha NVX 155 V2 Thế Thế Hệ Mới ABS tại Đồng Tháp. Giá bán cực rẻ: 54.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-nvx-155-v2-the-the-he-moi-abs-cover.svg', true
),
(
  '7a35c1d5-cf59-42ce-bd1f-0b08d25b8f40', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'f319489f-cd87-441e-b31f-9e960301526f', 'Yamaha Sirius 110cc Phanh Cơ', 'yamaha-sirius-110cc-phanh-co', 'YAMAHA-7A35C-30', 19200000, 18900000, true,
  2026, 0, '110cc', 'Đỏ Đen', 'Đùm', '1.99 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Sirius 110cc Phanh Cơ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Sirius 110cc Phanh Cơ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.99 L/100km.</li><li>Hệ thống phanh Đùm cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"110cc, làm mát bằng không khí","Công suất":"6.4 kW / 7000 vòng/phút","Trọng lượng":"96 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha Sirius 110cc Phanh Cơ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Sirius 110cc Phanh Cơ tại Đồng Tháp. Giá bán cực rẻ: 19.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-sirius-110cc-phanh-co-cover.svg', true
),
(
  'd0308b8f-6524-461a-922f-58c11cc8ed9b', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'f319489f-cd87-441e-b31f-9e960301526f', 'Yamaha Sirius FI 115cc Phanh Đĩa Vành Đúc', 'yamaha-sirius-fi-115cc-phanh-dia-vanh-duc', 'YAMAHA-D0308-31', 24200000, 23800000, true,
  2026, 0, '115cc', 'Đen Bạc', 'Đĩa', '1.65 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Sirius FI 115cc Phanh Đĩa Vành Đúc phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Sirius FI 115cc Phanh Đĩa Vành Đúc</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 115cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.65 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Phun xăng điện tử FI, 114cc","Công suất":"6.4 kW / 7000 vòng/phút","Trọng lượng":"99 kg"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Yamaha Sirius FI 115cc Phanh Đĩa Vành Đúc Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Sirius FI 115cc Phanh Đĩa Vành Đúc tại Đồng Tháp. Giá bán cực rẻ: 24.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-sirius-fi-115cc-phanh-dia-vanh-duc-cover.svg', true
),
(
  '32d6b456-4958-46c0-b786-1817da554c61', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'f319489f-cd87-441e-b31f-9e960301526f', 'Yamaha Jupiter Finn 115cc Phanh UBS', 'yamaha-jupiter-finn-115cc-phanh-ubs', 'YAMAHA-32D6B-32', 28000000, NULL, true,
  2026, 0, '115cc', 'Xám Nhám', 'UBS', '1.64 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Jupiter Finn 115cc Phanh UBS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Jupiter Finn 115cc Phanh UBS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 115cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.64 L/100km.</li><li>Hệ thống phanh UBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, FI, 113.7cc","Công suất":"6.6 kW / 7000 vòng/phút","Phanh kết hợp":"UBS"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Yamaha Jupiter Finn 115cc Phanh UBS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Jupiter Finn 115cc Phanh UBS tại Đồng Tháp. Giá bán cực rẻ: 28.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-jupiter-finn-115cc-phanh-ubs-cover.svg', true
),
(
  'ba90eab9-0ed3-4e94-8e9c-4a196c09f17d', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Yamaha Exciter 155 VVA Cao Cấp ABS', 'yamaha-exciter-155-vva-cao-cap-abs', 'YAMAHA-BA90E-33', 52000000, 49900000, true,
  2026, 0, '155cc', 'Xanh Monster Energy', 'ABS', '2.09 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Exciter 155 VVA Cao Cấp ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Exciter 155 VVA Cao Cấp ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 155cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.09 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, 4 van, VVA, 155.1cc","Công suất":"13.2 kW / 9500 vòng/phút","Hộp số":"6 cấp","Hệ thống ly hợp":"A&S (Chống trượt)"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha Exciter 155 VVA Cao Cấp ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Exciter 155 VVA Cao Cấp ABS tại Đồng Tháp. Giá bán cực rẻ: 52.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-exciter-155-vva-cao-cap-abs-cover.svg', true
),
(
  '789c9888-0186-4026-a126-a1dc5ac68c7f', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Yamaha Exciter 150 RC Phiên Bản 2025', 'yamaha-exciter-150-rc-phien-ban-2025', 'YAMAHA-789C9-34', 44500000, 43500000, true,
  2025, 0, '150cc', 'Đỏ Nhám', 'Đĩa', '2.00 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha Exciter 150 RC Phiên Bản 2025 phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Exciter 150 RC Phiên Bản 2025</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.00 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, 149.7cc","Công suất":"11.3 kW / 8500 vòng/phút","Độ cao yên":"795 mm"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha Exciter 150 RC Phiên Bản 2025 Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Exciter 150 RC Phiên Bản 2025 tại Đồng Tháp. Giá bán cực rẻ: 44.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-exciter-150-rc-phien-ban-2025-cover.svg', true
),
(
  'fcadae64-3e50-4f83-b2d8-478c5ee1f635', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Yamaha YZF-R15 V4 Thể Thao', 'yamaha-yzf-r15-v4-the-thao', 'YAMAHA-FCADA-35', 78000000, 75000000, true,
  2026, 0, '155cc', 'Xanh GP', 'ABS Dual', '2.3 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha YZF-R15 V4 Thể Thao phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha YZF-R15 V4 Thể Thao</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 155cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.3 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, 155cc, VVA","Công suất":"13.7 kW / 10000 vòng/phút","Trọng lượng":"137 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha YZF-R15 V4 Thể Thao Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha YZF-R15 V4 Thể Thao tại Đồng Tháp. Giá bán cực rẻ: 78.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-yzf-r15-v4-the-thao-cover.svg', true
),
(
  '33681256-1331-4d2c-9a0d-a543f8061e78', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Yamaha MT-15 Naked Streetfighter', 'yamaha-mt-15-naked-streetfighter', 'YAMAHA-33681-36', 69000000, NULL, true,
  2026, 0, '155cc', 'Xám Mâm Xanh', 'Đĩa', '2.1 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha MT-15 Naked Streetfighter phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha MT-15 Naked Streetfighter</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 155cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.1 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, 155cc, VVA","Công suất":"14.2 kW / 10000 vòng/phút","Hệ thống phuộc":"Upside Down KYB"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha MT-15 Naked Streetfighter Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha MT-15 Naked Streetfighter tại Đồng Tháp. Giá bán cực rẻ: 69.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-mt-15-naked-streetfighter-cover.svg', true
),
(
  '52b5ad0c-b6bf-43ef-9d8d-c24eae07d320', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Yamaha XS155R Neo-Retro', 'yamaha-xs155r-neo-retro', 'YAMAHA-52B5A-37', 77000000, 74900000, true,
  2026, 0, '155cc', 'Bạc Mâm Vàng', 'Đĩa', '2.2 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha XS155R Neo-Retro phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha XS155R Neo-Retro</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 155cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.2 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"4 thì, SOHC, 4 van, VVA, 155cc","Công suất":"14.2 kW / 10000 vòng/phút","Dung tích bình xăng":"10 lít"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha XS155R Neo-Retro Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha XS155R Neo-Retro tại Đồng Tháp. Giá bán cực rẻ: 77.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-xs155r-neo-retro-cover.svg', true
),
(
  '213e71bc-02ac-4499-b377-9145a8d0f9f5', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Yamaha YZF-R3 Sportbike', 'yamaha-yzf-r3-sportbike', 'YAMAHA-213E7-38', 132000000, 129000000, true,
  2026, 0, '321cc', 'Đen Bóng', 'ABS Dual', '3.62 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha YZF-R3 Sportbike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha YZF-R3 Sportbike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 321cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.62 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song, DOHC, 321cc","Công suất":"30.9 kW / 10750 vòng/phút"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha YZF-R3 Sportbike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha YZF-R3 Sportbike tại Đồng Tháp. Giá bán cực rẻ: 132.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-yzf-r3-sportbike-cover.svg', true
),
(
  'b0b3d30d-34f4-484f-b5d9-f829dac2fa73', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Yamaha MT-03 Naked Bike', 'yamaha-mt-03-naked-bike', 'YAMAHA-B0B3D-39', 124000000, NULL, true,
  2026, 0, '321cc', 'Xám Đen', 'ABS Dual', '3.7 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha MT-03 Naked Bike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha MT-03 Naked Bike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 321cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.7 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"321cc, DOHC, 2 xy-lanh","Công suất":"42 HP"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Yamaha MT-03 Naked Bike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha MT-03 Naked Bike tại Đồng Tháp. Giá bán cực rẻ: 124.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-mt-03-naked-bike-cover.svg', true
),
(
  '16a05ba9-f2af-4e74-9e32-440c4a38befc', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Yamaha MT-07 Beast', 'yamaha-mt-07-beast', 'YAMAHA-16A05-40', 259000000, 252000000, true,
  2026, 0, '689cc', 'Cyan Storm', 'ABS Dual', '4.3 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha MT-07 Beast phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha MT-07 Beast</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 689cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.3 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"CP2, 2 xy-lanh, DOHC, 689cc","Công suất":"73.4 PS / 8750 vòng/phút"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Yamaha MT-07 Beast Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha MT-07 Beast tại Đồng Tháp. Giá bán cực rẻ: 259.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-mt-07-beast-cover.svg', true
),
(
  '979fe41c-b9f8-4379-9715-eaab629215c3', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Yamaha YZF-R7 Racing', 'yamaha-yzf-r7-racing', 'YAMAHA-979FE-41', 269000000, 260000000, true,
  2026, 0, '689cc', 'Xanh Yamaha', 'ABS Dual', '4.2 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Yamaha YZF-R7 Racing phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha YZF-R7 Racing</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 689cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.2 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"CP2, 689cc","Công suất":"73.4 PS"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Yamaha YZF-R7 Racing Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha YZF-R7 Racing tại Đồng Tháp. Giá bán cực rẻ: 269.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-yzf-r7-racing-cover.svg', true
),
(
  'f44213ea-be36-4c01-aa2a-4bff3c8f816a', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha Exciter 150 Cũ Đời 2018', 'yamaha-exciter-150-cu-doi-2018', 'YAMAHA-F4421-42', 21500000, NULL, false,
  2018, 25000, '150cc', 'Trắng Đỏ', 'Đĩa', '2.1 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Yamaha Exciter 150 Cũ Đời 2018 phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Exciter 150 Cũ Đời 2018</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.1 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Tình trạng":"Mới 80%, dàn chân zin ốc đẹp","Biển số":"66F1-999.01"}'::jsonb, '{"Giấy tờ":"Chính chủ ký giấy rút gốc","Động cơ":"Zin chưa rớt đầu","Dàn áo":"Dán decal lột ra sơn đẹp bóng","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Thay mới vỏIRC","Khung sườn":"Nguyên bản không cong lệch","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Bình thường"}'::jsonb, false,
  false, true, 'Yamaha Exciter 150 Cũ Đời 2018 Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Exciter 150 Cũ Đời 2018 tại Đồng Tháp. Giá bán cực rẻ: 21.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-exciter-150-cu-doi-2018-cover.svg', true
),
(
  'ff9af8c2-7540-4977-b473-c58a1b1bfcc4', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha Sirius 110 Cũ Học Sinh', 'yamaha-sirius-110-cu-hoc-sinh', 'YAMAHA-FF9AF-43', 9800000, NULL, false,
  2016, 45000, '110cc', 'Đen Xám', 'Cơ', '2.0 L/100km',
  '3 tháng cửa hàng', 'Dòng xe Yamaha Sirius 110 Cũ Học Sinh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Sirius 110 Cũ Học Sinh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.0 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66L1-6789"}'::jsonb, '{"Giấy tờ":"Bao tranh chấp","Động cơ":"Khô ráo, đề nhạy","Dàn áo":"Trầy xước vừa phải do năm tháng","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Độ mòn 50%","Khung sườn":"Vững chãi","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, false,
  false, false, 'Yamaha Sirius 110 Cũ Học Sinh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Sirius 110 Cũ Học Sinh tại Đồng Tháp. Giá bán cực rẻ: 9.800.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-sirius-110-cu-hoc-sinh-cover.svg', true
),
(
  '67dab0bc-357c-4d72-a613-55e992de8f38', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha NVX 155 V1 ABS Cũ Cao Cấp', 'yamaha-nvx-155-v1-abs-cu-cao-cap', 'YAMAHA-67DAB-44', 28500000, 27500000, false,
  2019, 21000, '155cc', 'Xanh Rêu Nhám', 'ABS', '2.3 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Yamaha NVX 155 V1 ABS Cũ Cao Cấp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha NVX 155 V1 ABS Cũ Cao Cấp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 155cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.3 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Tình trạng":"Mới 85%, khóa Smartkey zin","Biển số":"66K1-098.76"}'::jsonb, '{"Giấy tờ":"Chính chủ sang tên ngay","Động cơ":"Máy 155 VVA êm bốc, láp không hú","Dàn áo":"Đẹp keng không bể vỡ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Vỏ Michelin dày cui","Khung sườn":"Chưa đụng chạm","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Phanh ABS tốt"}'::jsonb, false,
  false, false, 'Yamaha NVX 155 V1 ABS Cũ Cao Cấp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha NVX 155 V1 ABS Cũ Cao Cấp tại Đồng Tháp. Giá bán cực rẻ: 28.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-nvx-155-v1-abs-cu-cao-cap-cover.svg', true
),
(
  '263179dc-4646-426d-8809-53e483ebb147', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Suzuki Burgman Street 125', 'suzuki-burgman-street-125', 'SUZUKI-26317-45', 48600000, 45000000, true,
  2026, 0, '125cc', 'Vàng Đồng', 'CBS', '1.96 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki Burgman Street 125 phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Burgman Street 125</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.96 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SEP, đơn, 4 kỳ, 124.3cc","Công suất":"6.4 kW / 6750 vòng/phút","Độ cao yên":"780 mm","Trọng lượng":"110 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Suzuki Burgman Street 125 Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Burgman Street 125 tại Đồng Tháp. Giá bán cực rẻ: 48.600.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-burgman-street-125-cover.svg', true
),
(
  'aac690c6-c418-43c3-a9ae-76f4cbc0d7ad', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Suzuki Raider R150 Fi Phiên Bản Mới', 'suzuki-raider-r150-fi-phien-ban-moi', 'SUZUKI-AAC69-46', 50990000, 48990000, true,
  2026, 0, '150cc', 'Xanh Đen GP', 'Đĩa Dual', '2.4 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki Raider R150 Fi Phiên Bản Mới phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Raider R150 Fi Phiên Bản Mới</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.4 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, 4 van, 147.3cc","Công suất":"13.6 kW / 10000 vòng/phút","Trọng lượng":"109 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Suzuki Raider R150 Fi Phiên Bản Mới Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Raider R150 Fi Phiên Bản Mới tại Đồng Tháp. Giá bán cực rẻ: 50.990.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-raider-r150-fi-phien-ban-moi-cover.svg', true
),
(
  '409ed3d4-b5ba-4ed3-8264-df4041cec347', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Suzuki Satria F150 Nhập Khẩu Indonesia', 'suzuki-satria-f150-nhap-khau-indonesia', 'SUZUKI-409ED-47', 53490000, NULL, true,
  2026, 0, '150cc', 'Đen Nhám', 'Đĩa Dual', '2.5 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki Satria F150 Nhập Khẩu Indonesia phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Satria F150 Nhập Khẩu Indonesia</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.5 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, 147.3cc, FI","Công suất":"13.6 kW","Trọng lượng":"109 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Suzuki Satria F150 Nhập Khẩu Indonesia Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Satria F150 Nhập Khẩu Indonesia tại Đồng Tháp. Giá bán cực rẻ: 53.490.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-satria-f150-nhap-khau-indonesia-cover.svg', true
),
(
  '96368194-f31d-4622-aae1-a6b277b30861', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Suzuki GSX-R150 Sportbike', 'suzuki-gsx-r150-sportbike', 'SUZUKI-96368-48', 71990000, 68000000, true,
  2025, 0, '150cc', 'Đen Đỏ', 'Đĩa Dual', '2.6 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki GSX-R150 Sportbike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki GSX-R150 Sportbike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.6 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 147.3cc","Công suất":"14.1 kW / 10500 vòng/phút"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Suzuki GSX-R150 Sportbike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki GSX-R150 Sportbike tại Đồng Tháp. Giá bán cực rẻ: 71.990.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-gsx-r150-sportbike-cover.svg', true
),
(
  '69fda3bc-a543-43fa-af61-5c3a97db067b', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', 'b652b28c-9625-4a87-9d11-1af86644badc', 'Suzuki GSX-S150 Naked Bike', 'suzuki-gsx-s150-naked-bike', 'SUZUKI-69FDA-49', 63900000, NULL, true,
  2025, 0, '150cc', 'Xanh Đen', 'Đĩa Dual', '2.6 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki GSX-S150 Naked Bike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki GSX-S150 Naked Bike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.6 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"147.3cc DOHC","Công suất":"14.1 kW"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Suzuki GSX-S150 Naked Bike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki GSX-S150 Naked Bike tại Đồng Tháp. Giá bán cực rẻ: 63.900.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-gsx-s150-naked-bike-cover.svg', true
),
(
  'a7b32ca6-562d-4f0e-9c71-2179502d085c', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Suzuki V-Strom 250SX Adventure', 'suzuki-v-strom-250sx-adventure', 'SUZUKI-A7B32-50', 125000000, 119000000, true,
  2026, 0, '249cc', 'Vàng Đen', 'ABS Dual', '2.8 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki V-Strom 250SX Adventure phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki V-Strom 250SX Adventure</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 249cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.8 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, xy-lanh đơn, 249cc","Công suất":"19.5 kW / 9300 vòng/phút"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Suzuki V-Strom 250SX Adventure Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki V-Strom 250SX Adventure tại Đồng Tháp. Giá bán cực rẻ: 125.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-v-strom-250sx-adventure-cover.svg', true
),
(
  'e13ba4f1-02f2-45ec-ba28-f809e3588147', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Suzuki Gixxer SF250 Sport', 'suzuki-gixxer-sf250-sport', 'SUZUKI-E13BA-51', 115900000, NULL, true,
  2025, 0, '249cc', 'Xanh GP', 'ABS Dual', '2.7 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki Gixxer SF250 Sport phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Gixxer SF250 Sport</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 249cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.7 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, xy-lanh đơn, 249cc, làm mát bằng dầu","Công suất":"26.5 HP"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Suzuki Gixxer SF250 Sport Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Gixxer SF250 Sport tại Đồng Tháp. Giá bán cực rẻ: 115.900.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-gixxer-sf250-sport-cover.svg', true
),
(
  '6b39aa7e-6af8-4fa1-9147-99f111fe9453', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Suzuki Hayabusa Thần Gió Thế Hệ 3', 'suzuki-hayabusa-than-gio-the-he-3', 'SUZUKI-6B39A-52', 810000000, 790000000, true,
  2026, 0, '1340cc', 'Đen Vàng', 'Brembo Stylema ABS', '6.2 L/100km',
  '3 năm hoặc 30,000km', 'Dòng xe Suzuki Hayabusa Thần Gió Thế Hệ 3 phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Hayabusa Thần Gió Thế Hệ 3</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 1340cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 6.2 L/100km.</li><li>Hệ thống phanh Brembo Stylema ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm hoặc 30,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"4 xy-lanh thẳng hàng, 1340cc","Công suất":"190 HP / 9700 vòng/phút","Mô-men xoắn":"150 Nm"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Suzuki Hayabusa Thần Gió Thế Hệ 3 Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Hayabusa Thần Gió Thế Hệ 3 tại Đồng Tháp. Giá bán cực rẻ: 810.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-hayabusa-than-gio-the-he-3-cover.svg', true
),
(
  'f57536dc-8b6d-4d70-bf6e-141fe2ca9f2b', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Suzuki Raider R150 Cũ Máy Dữ', 'suzuki-raider-r150-cu-may-du', 'SUZUKI-F5753-53', 26500000, NULL, false,
  2019, 12000, '150cc', 'Đen Mâm Đỏ', 'Đĩa Dual', '2.5 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Suzuki Raider R150 Cũ Máy Dữ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Raider R150 Cũ Máy Dữ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.5 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66G1-332.11","Tình trạng":"Zin nguyên con odo chuẩn"}'::jsonb, '{"Giấy tờ":"Chính chủ, bao rút hồ sơ gốc","Động cơ":"Máy bốc, chưa đụng chạm 1 con ốc","Dàn áo":"Đẹp dán keo trong bảo vệ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Vỏ Dunlop mới","Khung sườn":"Nguyên bản cực chắc chắn","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Bình thường nhạy"}'::jsonb, false,
  false, false, 'Suzuki Raider R150 Cũ Máy Dữ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Raider R150 Cũ Máy Dữ tại Đồng Tháp. Giá bán cực rẻ: 26.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-raider-r150-cu-may-du-cover.svg', true
),
(
  '3ca8bdff-7a87-4f34-9a3d-044c129c02dc', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Suzuki Satria F150 Cũ Nhập Indo', 'suzuki-satria-f150-cu-nhap-indo', 'SUZUKI-3CA8B-54', 32000000, 31000000, false,
  2020, 9500, '150cc', 'Xanh xi măng', 'Đĩa Dual', '2.6 L/100km',
  '6 tháng cửa hàng', 'Dòng xe Suzuki Satria F150 Cũ Nhập Indo phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Satria F150 Cũ Nhập Indo</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.6 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng cửa hàng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66H1-667.89"}'::jsonb, '{"Giấy tờ":"Nhập khẩu hải quan chính ngạch","Động cơ":"Trơn tru, thay nhớt định kỳ","Dàn áo":"Khít, không gãy bát nhựa nào","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Độ mòn 15%","Khung sườn":"Hoàn mỹ","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Đĩa hoạt động xuất sắc"}'::jsonb, false,
  false, false, 'Suzuki Satria F150 Cũ Nhập Indo Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Satria F150 Cũ Nhập Indo tại Đồng Tháp. Giá bán cực rẻ: 32.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-satria-f150-cu-nhap-indo-cover.svg', true
),
(
  'a16ebddf-b817-4cd1-8152-11c03f7c7a70', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'SYM Attila 125 New', 'sym-attila-125-new', 'SYM-A16EB-55', 33700000, NULL, true,
  2026, 0, '125cc', 'Đỏ Cherry', 'CBS', '2.2 L/100km',
  '2 năm hoặc 20,000km', 'Dòng xe SYM Attila 125 New phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Attila 125 New</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.2 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm hoặc 20,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"124.6cc","Độ cao yên":"750 mm","Trọng lượng":"112 kg"}'::jsonb, '{}'::jsonb, false,
  false, false, 'SYM Attila 125 New Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Attila 125 New tại Đồng Tháp. Giá bán cực rẻ: 33.700.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-attila-125-new-cover.svg', true
),
(
  '8f0727e5-bf78-456d-a021-026318df6b4b', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'SYM Passing 50cc Cho Học Sinh', 'sym-passing-50cc-cho-hoc-sinh', 'SYM-8F072-56', 24200000, 23700000, true,
  2026, 0, '50cc', 'Đen Nhám', 'Cơ', '1.6 L/100km',
  '2 năm hoặc 20,000km', 'Dòng xe SYM Passing 50cc Cho Học Sinh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Passing 50cc Cho Học Sinh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 50cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.6 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm hoặc 20,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"49.5cc","Không cần bằng lái":"Có"}'::jsonb, '{}'::jsonb, true,
  false, false, 'SYM Passing 50cc Cho Học Sinh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Passing 50cc Cho Học Sinh tại Đồng Tháp. Giá bán cực rẻ: 24.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-passing-50cc-cho-hoc-sinh-cover.svg', true
),
(
  '159ac648-a929-4c72-be08-50f0603e6c80', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'f319489f-cd87-441e-b31f-9e960301526f', 'SYM Elegant 50cc Thể Thao', 'sym-elegant-50cc-the-thao', 'SYM-159AC-57', 17000000, 16700000, true,
  2026, 0, '50cc', 'Xanh Nhám', 'Cơ', '1.44 L/100km',
  '2 năm hoặc 20,000km', 'Dòng xe SYM Elegant 50cc Thể Thao phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Elegant 50cc Thể Thao</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 50cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.44 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm hoặc 20,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"49.5cc, xi-lanh đơn","Mức tiêu thụ":"Tiết kiệm nhiên liệu hàng đầu"}'::jsonb, '{}'::jsonb, false,
  false, false, 'SYM Elegant 50cc Thể Thao Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Elegant 50cc Thể Thao tại Đồng Tháp. Giá bán cực rẻ: 17.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-elegant-50cc-the-thao-cover.svg', true
),
(
  'fbab03ff-24ac-464a-a8c1-8665ab84f03e', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'f319489f-cd87-441e-b31f-9e960301526f', 'SYM Galaxy 50 Vành Đúc Thể Thao', 'sym-galaxy-50-vanh-duc-the-thao', 'SYM-FBAB0-58', 18500000, NULL, true,
  2026, 0, '50cc', 'Đen Xanh', 'Cơ', '1.55 L/100km',
  '2 năm hoặc 20,000km', 'Dòng xe SYM Galaxy 50 Vành Đúc Thể Thao phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Galaxy 50 Vành Đúc Thể Thao</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 50cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.55 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm hoặc 20,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"49.5cc SOHC","Phù hợp học sinh":"Có"}'::jsonb, '{}'::jsonb, false,
  false, false, 'SYM Galaxy 50 Vành Đúc Thể Thao Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Galaxy 50 Vành Đúc Thể Thao tại Đồng Tháp. Giá bán cực rẻ: 18.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-galaxy-50-vanh-duc-the-thao-cover.svg', true
),
(
  '99c8020c-204a-420e-80ff-5984fd538b10', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'f319489f-cd87-441e-b31f-9e960301526f', 'SYM Angela 50cc Dành Cho Nữ', 'sym-angela-50cc-danh-cho-nu', 'SYM-99C80-59', 17500000, 17200000, true,
  2026, 0, '50cc', 'Hồng Trắng', 'Cơ', '1.26 L/100km',
  '2 năm hoặc 20,000km', 'Dòng xe SYM Angela 50cc Dành Cho Nữ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Angela 50cc Dành Cho Nữ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 50cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.26 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm hoặc 20,000km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"49.5cc bền bỉ","Tiết kiệm xăng":"1.26 lít/100km"}'::jsonb, '{}'::jsonb, false,
  false, false, 'SYM Angela 50cc Dành Cho Nữ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Angela 50cc Dành Cho Nữ tại Đồng Tháp. Giá bán cực rẻ: 17.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-angela-50cc-danh-cho-nu-cover.svg', true
),
(
  '25aceaca-90b2-4427-8b02-2f330713bda7', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', 'b652b28c-9625-4a87-9d11-1af86644badc', 'SYM Star SR 125 côn tay', 'sym-star-sr-125-con-tay', 'SYM-25ACE-60', 28700000, NULL, true,
  2025, 0, '125cc', 'Đỏ Đen Thể Thao', 'Đĩa', '2.0 L/100km',
  '2 năm', 'Dòng xe SYM Star SR 125 côn tay phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Star SR 125 côn tay</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.0 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Ecotech, 123cc","Công suất":"8.5 HP"}'::jsonb, '{}'::jsonb, false,
  false, false, 'SYM Star SR 125 côn tay Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Star SR 125 côn tay tại Đồng Tháp. Giá bán cực rẻ: 28.700.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-star-sr-125-con-tay-cover.svg', true
),
(
  '63aadb8b-a934-436a-b710-58e0358030d7', 'c31f31e1-6102-4f90-a037-e51706d3a1a7', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Piaggio Liberty 125cc S One ABS', 'piaggio-liberty-125cc-s-one-abs', 'PIAGGIO-63AAD-61', 58900000, 57900000, true,
  2026, 0, '125cc', 'Trắng Bạc', 'ABS', '2.4 L/100km',
  '3 năm', 'Dòng xe Piaggio Liberty 125cc S One ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Piaggio Liberty 125cc S One ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Piaggio</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.4 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"i-get, 4 kỳ, 3 van, 124.5cc","Độ cao yên":"780 mm","Trọng lượng":"120 kg"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Piaggio Liberty 125cc S One ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Piaggio Liberty 125cc S One ABS tại Đồng Tháp. Giá bán cực rẻ: 58.900.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/piaggio-liberty-125cc-s-one-abs-cover.svg', true
),
(
  '19d1fcef-466e-4261-8c7f-085732a40e0a', 'c31f31e1-6102-4f90-a037-e51706d3a1a7', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Piaggio Medley S 150cc Phanh ABS Dual', 'piaggio-medley-s-150cc-phanh-abs-dual', 'PIAGGIO-19D1F-62', 98900000, 96000000, true,
  2026, 0, '150cc', 'Xám Đen', 'ABS Dual', '2.28 L/100km',
  '3 năm', 'Dòng xe Piaggio Medley S 150cc Phanh ABS Dual phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Piaggio Medley S 150cc Phanh ABS Dual</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Piaggio</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.28 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"i-get, xy-lanh đơn, 4 van, 155.2cc","Dung tích cốp":"36 lít","Hệ thống dừng tạm thời":"Start-Stop"}'::jsonb, '{}'::jsonb, false,
  false, true, 'Piaggio Medley S 150cc Phanh ABS Dual Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Piaggio Medley S 150cc Phanh ABS Dual tại Đồng Tháp. Giá bán cực rẻ: 98.900.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/piaggio-medley-s-150cc-phanh-abs-dual-cover.svg', true
),
(
  '41a59baf-df14-46e6-8880-e392a719b9cf', 'c31f31e1-6102-4f90-a037-e51706d3a1a7', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Piaggio Liberty 125 i-get Cũ Đẹp', 'piaggio-liberty-125-i-get-cu-dep', 'PIAGGIO-41A59-63', 29000000, NULL, false,
  2018, 19000, '125cc', 'Đen Bóng', 'ABS', '2.5 L/100km',
  '6 tháng', 'Dòng xe Piaggio Liberty 125 i-get Cũ Đẹp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Piaggio Liberty 125 i-get Cũ Đẹp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Piaggio</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.5 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66K1-234.56"}'::jsonb, '{"Giấy tờ":"Chính chủ","Động cơ":"i-get êm hơn dòng cũ","Dàn áo":"Dàn áo xi mạ sáng bóng","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Vỏ mới thay","Khung sườn":"Chuẩn zin","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Phanh ABS hoạt động tốt"}'::jsonb, false,
  false, false, 'Piaggio Liberty 125 i-get Cũ Đẹp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Piaggio Liberty 125 i-get Cũ Đẹp tại Đồng Tháp. Giá bán cực rẻ: 29.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/piaggio-liberty-125-i-get-cu-dep-cover.svg', true
),
(
  '009fcc31-6356-4cd1-95aa-f89f4f728969', 'b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Vespa Primavera 125cc i-get ABS', 'vespa-primavera-125cc-i-get-abs', 'VESPA-009FC-64', 79200000, 78000000, true,
  2026, 0, '125cc', 'Vàng Sunglow', 'ABS', '2.7 L/100km',
  '3 năm', 'Dòng xe Vespa Primavera 125cc i-get ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Vespa Primavera 125cc i-get ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Vespa</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.7 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"i-get, xi-lanh đơn, 3 van, 124.5cc","Khung xe":"Thép liền khối","Độ cao yên":"790 mm"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Vespa Primavera 125cc i-get ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Vespa Primavera 125cc i-get ABS tại Đồng Tháp. Giá bán cực rẻ: 79.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vespa-primavera-125cc-i-get-abs-cover.svg', true
),
(
  'a95fda59-28dc-4866-b52e-80e84730c664', 'b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Vespa Sprint S 125cc Thể Thao ABS', 'vespa-sprint-s-125cc-the-thao-abs', 'VESPA-A95FD-65', 84800000, 83500000, true,
  2026, 0, '125cc', 'Xám Xi Măng', 'ABS', '2.62 L/100km',
  '3 năm', 'Dòng xe Vespa Sprint S 125cc Thể Thao ABS phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Vespa Sprint S 125cc Thể Thao ABS</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Vespa</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.62 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"i-get, 124.5cc, phun xăng điện tử","Khung vỏ":"Thép liền khối dập nổi"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Vespa Sprint S 125cc Thể Thao ABS Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Vespa Sprint S 125cc Thể Thao ABS tại Đồng Tháp. Giá bán cực rẻ: 84.800.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vespa-sprint-s-125cc-the-thao-abs-cover.svg', true
),
(
  'ae485dc9-8c2e-48ef-bdd1-0d31447b6596', 'b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Vespa GTS Super 150cc Cực Sang', 'vespa-gts-super-150cc-cuc-sang', 'VESPA-AE485-66', 116200000, 113000000, true,
  2026, 0, '150cc', 'Xanh Lá Nhám', 'ABS Dual', '2.6 L/100km',
  '3 năm', 'Dòng xe Vespa GTS Super 150cc Cực Sang phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Vespa GTS Super 150cc Cực Sang</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Vespa</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.6 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"i-get, 4 van, 155.1cc","Hệ thống làm mát":"Dung dịch"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Vespa GTS Super 150cc Cực Sang Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Vespa GTS Super 150cc Cực Sang tại Đồng Tháp. Giá bán cực rẻ: 116.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vespa-gts-super-150cc-cuc-sang-cover.svg', true
),
(
  'f894851e-9124-4b24-9b18-77745f9b7858', 'b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', 'bbea6ce8-290a-4d75-9034-95dd50bba683', 'Vespa GTS 300 Super Tech', 'vespa-gts-300-super-tech', 'VESPA-F8948-67', 158600000, NULL, true,
  2026, 0, '278cc', 'Xám Bạc', 'ABS Dual & ASR', '3.24 L/100km',
  '3 năm', 'Dòng xe Vespa GTS 300 Super Tech phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Vespa GTS 300 Super Tech</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Vespa</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 278cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.24 L/100km.</li><li>Hệ thống phanh ABS Dual & ASR cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"HPE, 278.3cc, 4 van","Công suất":"23.8 HP / 8250 vòng/phút","Bảng đồng hồ":"TFT màu kết nối điện thoại"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Vespa GTS 300 Super Tech Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Vespa GTS 300 Super Tech tại Đồng Tháp. Giá bán cực rẻ: 158.600.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vespa-gts-300-super-tech-cover.svg', true
),
(
  '56ae47ff-9b00-4662-b26e-96d936dd0987', 'b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Vespa Sprint 125 i-get Cũ Đẹp Keng', 'vespa-sprint-125-i-get-cu-dep-keng', 'VESPA-56AE4-68', 48500000, NULL, false,
  2020, 8000, '125cc', 'Trắng Tuyết', 'ABS', '2.7 L/100km',
  '6 tháng', 'Dòng xe Vespa Sprint 125 i-get Cũ Đẹp Keng phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Vespa Sprint 125 i-get Cũ Đẹp Keng</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Vespa</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.7 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66F1-686.86","Tình trạng":"Mới 90% nước sơn zin"}'::jsonb, '{"Giấy tờ":"Chính chủ bao sang tên toàn quốc","Động cơ":"Êm thút thít, láp không một tiếng hú","Dàn áo":"Nước sơn trắng zin không dặm tút","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Vỏ Michelin dày cộm","Khung sườn":"Khung sườn thép dày, đầm chắc","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Phanh ABS tốt"}'::jsonb, false,
  false, false, 'Vespa Sprint 125 i-get Cũ Đẹp Keng Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Vespa Sprint 125 i-get Cũ Đẹp Keng tại Đồng Tháp. Giá bán cực rẻ: 48.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vespa-sprint-125-i-get-cu-dep-keng-cover.svg', true
),
(
  '6d72b54b-1a66-4e04-ad8b-a4431d426e31', '963bae54-30c8-4c48-923d-817cb50c9e3b', '59fa91ac-8678-4e7f-b428-a57973f630d8', 'VinFast Evo200 Lite Học Sinh', 'vinfast-evo200-lite-hoc-sinh', 'VINFAST-6D72B-69', 18000000, 17500000, true,
  2026, 0, 'Điện', 'Vàng Chanh', 'Đĩa/Cơ', 'Học sinh đi học',
  '3 năm xe, pin thuê', 'Dòng xe VinFast Evo200 Lite Học Sinh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Evo200 Lite Học Sinh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Học sinh đi học.</li><li>Hệ thống phanh Đĩa/Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm xe, pin thuê.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Quãng đường tối đa":"205 km/lần sạc (điều kiện tiêu chuẩn)","Vận tốc tối đa":"49 km/h (Evo200 Lite)","Động cơ":"In-hub 1500W","Pin":"LFP 3.5 KWh"}'::jsonb, '{}'::jsonb, false,
  false, false, 'VinFast Evo200 Lite Học Sinh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Evo200 Lite Học Sinh tại Đồng Tháp. Giá bán cực rẻ: 18.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-evo200-lite-hoc-sinh-cover.svg', true
),
(
  'ddb67567-3967-4e1c-adf8-3fc1ea2e433b', '963bae54-30c8-4c48-923d-817cb50c9e3b', '59fa91ac-8678-4e7f-b428-a57973f630d8', 'VinFast Evo200 Thường (Mới)', 'vinfast-evo200-thuong-moi', 'VINFAST-DDB67-70', 18000000, NULL, true,
  2026, 0, 'Điện', 'Trắng Pearl', 'Đĩa/Cơ', 'Vận tốc 70km/h',
  '3 năm xe', 'Dòng xe VinFast Evo200 Thường (Mới) phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Evo200 Thường (Mới)</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Vận tốc 70km/h.</li><li>Hệ thống phanh Đĩa/Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm xe.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Quãng đường":"203 km/lần sạc","Vận tốc tối đa":"70 km/h","Động cơ":"In-hub 1500W"}'::jsonb, '{}'::jsonb, false,
  false, false, 'VinFast Evo200 Thường (Mới) Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Evo200 Thường (Mới) tại Đồng Tháp. Giá bán cực rẻ: 18.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-evo200-thuong-moi-cover.svg', true
),
(
  'f39cb277-83b7-4271-ade7-4536b8d17802', '963bae54-30c8-4c48-923d-817cb50c9e3b', '59fa91ac-8678-4e7f-b428-a57973f630d8', 'VinFast Feliz S Pin LFP', 'vinfast-feliz-s-pin-lfp', 'VINFAST-F39CB-71', 27000000, 26000000, true,
  2026, 0, 'Điện', 'Xanh Rêu', 'Đĩa/Cơ', 'Vận tốc 78km/h',
  '3 năm', 'Dòng xe VinFast Feliz S Pin LFP phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Feliz S Pin LFP</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Vận tốc 78km/h.</li><li>Hệ thống phanh Đĩa/Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Quãng đường":"198 km/lần sạc","Vận tốc tối đa":"78 km/h","Dung tích cốp":"25 lít","Động cơ":"3000W"}'::jsonb, '{}'::jsonb, false,
  true, false, 'VinFast Feliz S Pin LFP Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Feliz S Pin LFP tại Đồng Tháp. Giá bán cực rẻ: 27.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-feliz-s-pin-lfp-cover.svg', true
),
(
  '740263a8-abce-4c18-9ed0-70ba45f8fde8', '963bae54-30c8-4c48-923d-817cb50c9e3b', '59fa91ac-8678-4e7f-b428-a57973f630d8', 'VinFast Klara S 2024 Pin LFP', 'vinfast-klara-s-2024-pin-lfp', 'VINFAST-74026-72', 35000000, 34000000, true,
  2026, 0, 'Điện', 'Xanh Lục Bảo', 'Đĩa Dual', 'Vận tốc 78km/h',
  '3 năm', 'Dòng xe VinFast Klara S 2024 Pin LFP phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Klara S 2024 Pin LFP</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Vận tốc 78km/h.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Quãng đường":"194 km/lần sạc","Thiết kế phong cách Ý":"Có","Động cơ":"Bosch 3000W"}'::jsonb, '{}'::jsonb, true,
  false, false, 'VinFast Klara S 2024 Pin LFP Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Klara S 2024 Pin LFP tại Đồng Tháp. Giá bán cực rẻ: 35.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-klara-s-2024-pin-lfp-cover.svg', true
),
(
  '4bf95aa7-05a6-441e-9430-5d1b1ced7c55', '963bae54-30c8-4c48-923d-817cb50c9e3b', '59fa91ac-8678-4e7f-b428-a57973f630d8', 'VinFast Vento S Cao Cấp', 'vinfast-vento-s-cao-cap', 'VINFAST-4BF95-73', 50000000, 48500000, true,
  2026, 0, 'Điện', 'Đỏ Đậm', 'ABS Dual', 'Vận tốc 89km/h',
  '3 năm', 'Dòng xe VinFast Vento S Cao Cấp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Vento S Cao Cấp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Vận tốc 89km/h.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Quãng đường":"160 km/lần sạc","Động cơ":"Side-motor 5200W","Công nghệ PAAK":"Có (Khóa điện thoại)"}'::jsonb, '{}'::jsonb, false,
  false, false, 'VinFast Vento S Cao Cấp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Vento S Cao Cấp tại Đồng Tháp. Giá bán cực rẻ: 50.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-vento-s-cao-cap-cover.svg', true
),
(
  '8499adc4-ac2a-474b-9e62-0057ba87b635', '963bae54-30c8-4c48-923d-817cb50c9e3b', '59fa91ac-8678-4e7f-b428-a57973f630d8', 'VinFast Theon S Siêu Xe Điện', 'vinfast-theon-s-sieu-xe-dien', 'VINFAST-8499A-74', 63000000, 61000000, true,
  2026, 0, 'Điện', 'Đen Nhám', 'ABS Dual Brembo', 'Vận tốc 99km/h',
  '3 năm', 'Dòng xe VinFast Theon S Siêu Xe Điện phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Theon S Siêu Xe Điện</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Vận tốc 99km/h.</li><li>Hệ thống phanh ABS Dual Brembo cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Quãng đường":"150 km/lần sạc","Động cơ":"Mid-motor 7100W","Vận tốc cực đại":"99 km/h","Pin":"LFP 3.5 KWh kép"}'::jsonb, '{}'::jsonb, false,
  false, false, 'VinFast Theon S Siêu Xe Điện Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Theon S Siêu Xe Điện tại Đồng Tháp. Giá bán cực rẻ: 63.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-theon-s-sieu-xe-dien-cover.svg', true
),
(
  '2a846738-068d-4988-b0ed-c1db12cfd3e8', '963bae54-30c8-4c48-923d-817cb50c9e3b', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'VinFast Klara A2 Đời Đầu Cũ Rẻ', 'vinfast-klara-a2-doi-dau-cu-re', 'VINFAST-2A846-75', 11000000, NULL, false,
  2019, 18000, 'Điện', 'Xám', 'Đĩa', 'Xe đi lại gần',
  '3 tháng', 'Dòng xe VinFast Klara A2 Đời Đầu Cũ Rẻ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>VinFast Klara A2 Đời Đầu Cũ Rẻ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>VinFast</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Điện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ Xe đi lại gần.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66MD1-123.44","Ắc quy":"Đã thay bộ ắc quy mới đi 45km"}'::jsonb, '{"Giấy tờ":"Chính chủ","Động cơ":"Bosch chạy êm ru","Dàn áo":"Bạc màu nhẹ theo thời gian","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Bình thường","Khung sườn":"Rất chắc chắn","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Đĩa trước sau ổn định"}'::jsonb, false,
  false, false, 'VinFast Klara A2 Đời Đầu Cũ Rẻ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy VinFast Klara A2 Đời Đầu Cũ Rẻ tại Đồng Tháp. Giá bán cực rẻ: 11.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vinfast-klara-a2-doi-dau-cu-re-cover.svg', true
),
(
  '4f98da8a-403f-473a-bb91-a71c95db366c', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki W175 SE Classic', 'kawasaki-w175-se-classic', 'KAWASAKI-4F98D-76', 77500000, 75000000, true,
  2026, 0, '177cc', 'Xanh Rêu Cổ Điển', 'Cơ', '2.5 L/100km',
  '2 năm', 'Dòng xe Kawasaki W175 SE Classic phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki W175 SE Classic</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 177cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.5 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"SOHC, xy-lanh đơn, 177cc","Công suất":"13 PS / 7500 vòng/phút","Độ cao yên":"775 mm"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Kawasaki W175 SE Classic Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki W175 SE Classic tại Đồng Tháp. Giá bán cực rẻ: 77.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-w175-se-classic-cover.svg', true
),
(
  'fed037ec-d7c2-48c7-848d-60383018a590', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki Ninja ZX-25R 4 Xy Lanh', 'kawasaki-ninja-zx-25r-4-xy-lanh', 'KAWASAKI-FED03-77', 195000000, 189000000, true,
  2026, 0, '250cc', 'KRT Xanh Đen', 'ABS Dual & KTRC', '4.2 L/100km',
  '2 năm', 'Dòng xe Kawasaki Ninja ZX-25R 4 Xy Lanh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Ninja ZX-25R 4 Xy Lanh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 250cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.2 L/100km.</li><li>Hệ thống phanh ABS Dual & KTRC cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"4 xy-lanh thẳng hàng, DOHC, 16 van, 249.8cc","Công suất":"47 HP / 15500 vòng/phút","Hộp số":"6 cấp, có Quickshifter"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Kawasaki Ninja ZX-25R 4 Xy Lanh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Ninja ZX-25R 4 Xy Lanh tại Đồng Tháp. Giá bán cực rẻ: 195.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-ninja-zx-25r-4-xy-lanh-cover.svg', true
),
(
  'be2201a8-462b-4226-b1e5-1b1e34d07535', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki Ninja 400 ABS KRT', 'kawasaki-ninja-400-abs-krt', 'KAWASAKI-BE220-78', 165000000, 159000000, true,
  2025, 0, '399cc', 'Xanh Lá Lime', 'ABS Dual', '3.5 L/100km',
  '2 năm', 'Dòng xe Kawasaki Ninja 400 ABS KRT phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Ninja 400 ABS KRT</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 399cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.5 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song, DOHC, 399cc","Công suất":"45 HP / 10000 vòng/phút","Độ cao yên":"785 mm"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Kawasaki Ninja 400 ABS KRT Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Ninja 400 ABS KRT tại Đồng Tháp. Giá bán cực rẻ: 165.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-ninja-400-abs-krt-cover.svg', true
),
(
  'afbec2f0-3c63-4bf9-924c-6c6022fddd38', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki Z400 Naked Bike', 'kawasaki-z400-naked-bike', 'KAWASAKI-AFBEC-79', 149000000, NULL, true,
  2025, 0, '399cc', 'Đen Bạc', 'ABS Dual', '3.5 L/100km',
  '2 năm', 'Dòng xe Kawasaki Z400 Naked Bike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Z400 Naked Bike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 399cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.5 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song, 399cc","Công suất":"45 HP"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Kawasaki Z400 Naked Bike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Z400 Naked Bike tại Đồng Tháp. Giá bán cực rẻ: 149.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-z400-naked-bike-cover.svg', true
),
(
  '0844dae1-9817-4d45-b38b-04a52f92f37e', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki Z650 Thần Sấm', 'kawasaki-z650-than-sam', 'KAWASAKI-0844D-80', 187000000, 182000000, true,
  2026, 0, '649cc', 'Đen Nhám Mâm Đỏ', 'ABS Dual', '4.3 L/100km',
  '2 năm', 'Dòng xe Kawasaki Z650 Thần Sấm phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Z650 Thần Sấm</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 649cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.3 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song, 649cc","Công suất":"68 HP / 8000 vòng/phút"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Kawasaki Z650 Thần Sấm Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Z650 Thần Sấm tại Đồng Tháp. Giá bán cực rẻ: 187.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-z650-than-sam-cover.svg', true
),
(
  'd80cac16-5684-4930-975e-d71709a5dee8', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki Vulcan S 650 Cruiser', 'kawasaki-vulcan-s-650-cruiser', 'KAWASAKI-D80CA-81', 241000000, 237000000, true,
  2026, 0, '649cc', 'Xám Cam', 'ABS Dual', '4.5 L/100km',
  '2 năm', 'Dòng xe Kawasaki Vulcan S 650 Cruiser phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Vulcan S 650 Cruiser</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 649cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.5 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song, 649cc","Chiều cao yên điều chỉnh":"3 mức (Ergo-Fit)"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Kawasaki Vulcan S 650 Cruiser Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Vulcan S 650 Cruiser tại Đồng Tháp. Giá bán cực rẻ: 241.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-vulcan-s-650-cruiser-cover.svg', true
),
(
  'b453fd9f-5b29-41b3-96d8-a97612b0935d', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Kawasaki Z900 ABS Thần Sấm', 'kawasaki-z900-abs-than-sam', 'KAWASAKI-B453F-82', 320900000, 310000000, true,
  2026, 0, '948cc', 'Đen Xanh Lá', 'ABS Dual & KTRC', '5.5 L/100km',
  '2 năm', 'Dòng xe Kawasaki Z900 ABS Thần Sấm phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Z900 ABS Thần Sấm</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 948cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 5.5 L/100km.</li><li>Hệ thống phanh ABS Dual & KTRC cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"4 xy-lanh thẳng hàng, DOHC, 948cc","Công suất":"125 HP / 9500 vòng/phút"}'::jsonb, '{}'::jsonb, false,
  false, true, 'Kawasaki Z900 ABS Thần Sấm Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Z900 ABS Thần Sấm tại Đồng Tháp. Giá bán cực rẻ: 320.900.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-z900-abs-than-sam-cover.svg', true
),
(
  '5f34e5eb-3327-40e0-8279-a7d34aa3596a', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Kawasaki Ninja 400 Cũ Đẹp Keng', 'kawasaki-ninja-400-cu-dep-keng', 'KAWASAKI-5F34E-83', 105000000, NULL, false,
  2020, 14000, '399cc', 'Xanh KRT', 'ABS', '3.6 L/100km',
  '6 tháng', 'Dòng xe Kawasaki Ninja 400 Cũ Đẹp Keng phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Ninja 400 Cũ Đẹp Keng</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 399cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.6 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66A1-002.34"}'::jsonb, '{"Giấy tờ":"Chính chủ bao sang tên","Động cơ":"Cực êm, chưa mở cổ pô","Dàn áo":"Dán decal sườn cực ngầu","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Vỏ sau mới lên Michelin Pilot Street 150","Khung sườn":"Kiểm tra kỹ đạt 100%","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Phanh ABS cực nhạy"}'::jsonb, false,
  false, false, 'Kawasaki Ninja 400 Cũ Đẹp Keng Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Ninja 400 Cũ Đẹp Keng tại Đồng Tháp. Giá bán cực rẻ: 105.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-ninja-400-cu-dep-keng-cover.svg', true
),
(
  'd78edb3a-2061-4b73-aa69-6dc6cb6e94d1', '0d7e803a-ec56-451c-bebe-cb15d33df337', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'KTM Duke 200 Naked Bike', 'ktm-duke-200-naked-bike', 'KTM-D78ED-84', 119000000, 112000000, true,
  2025, 0, '200cc', 'Cam Đen', 'ABS Dual WP', '2.8 L/100km',
  '2 năm', 'Dòng xe KTM Duke 200 Naked Bike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>KTM Duke 200 Naked Bike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>KTM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 200cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.8 L/100km.</li><li>Hệ thống phanh ABS Dual WP cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 199.5cc","Phuộc trước":"WP Apex 43mm"}'::jsonb, '{}'::jsonb, false,
  false, false, 'KTM Duke 200 Naked Bike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy KTM Duke 200 Naked Bike tại Đồng Tháp. Giá bán cực rẻ: 119.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ktm-duke-200-naked-bike-cover.svg', true
),
(
  '4076bd7e-c8bb-4663-af90-a99840930695', '0d7e803a-ec56-451c-bebe-cb15d33df337', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'KTM Duke 390 Thế Hệ Mới', 'ktm-duke-390-the-he-moi', 'KTM-4076B-85', 199000000, 189000000, true,
  2026, 0, '373cc', 'Cam Trắng', 'ABS Bosch Dual Supermoto', '3.4 L/100km',
  '2 năm', 'Dòng xe KTM Duke 390 Thế Hệ Mới phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>KTM Duke 390 Thế Hệ Mới</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>KTM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 373cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.4 L/100km.</li><li>Hệ thống phanh ABS Bosch Dual Supermoto cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 373cc","Công suất":"44 HP / 9000 vòng/phút","Đèn chiếu sáng":"Full LED cực ngầu"}'::jsonb, '{}'::jsonb, false,
  false, false, 'KTM Duke 390 Thế Hệ Mới Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy KTM Duke 390 Thế Hệ Mới tại Đồng Tháp. Giá bán cực rẻ: 199.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ktm-duke-390-the-he-moi-cover.svg', true
),
(
  'c5ce3cba-5fcf-4e18-be26-1b5ddd1c2311', '0d7e803a-ec56-451c-bebe-cb15d33df337', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'KTM RC 390 Sportbike', 'ktm-rc-390-sportbike', 'KTM-C5CE3-86', 205000000, NULL, true,
  2025, 0, '373cc', 'Cam Xanh Dương', 'ABS Dual MTC', '3.5 L/100km',
  '2 năm', 'Dòng xe KTM RC 390 Sportbike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>KTM RC 390 Sportbike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>KTM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 373cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.5 L/100km.</li><li>Hệ thống phanh ABS Dual MTC cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"DOHC, xy-lanh đơn, 373cc","Công suất":"44 HP"}'::jsonb, '{}'::jsonb, false,
  false, false, 'KTM RC 390 Sportbike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy KTM RC 390 Sportbike tại Đồng Tháp. Giá bán cực rẻ: 205.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ktm-rc-390-sportbike-cover.svg', true
),
(
  '96c6be82-9ee3-4efa-b6af-df86fcb432d7', '0d7e803a-ec56-451c-bebe-cb15d33df337', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'KTM Adventure 390 Phượt Thủ', 'ktm-adventure-390-phuot-thu', 'KTM-96C6B-87', 236000000, 228000000, true,
  2026, 0, '373cc', 'Cam Nhám', 'Cornering ABS & MTC', '3.6 L/100km',
  '2 năm', 'Dòng xe KTM Adventure 390 Phượt Thủ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>KTM Adventure 390 Phượt Thủ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>KTM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 373cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.6 L/100km.</li><li>Hệ thống phanh Cornering ABS & MTC cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"373cc, làm mát chất lỏng","Hỗ trợ phượt bụi":"Kính chắn gió, bảo vệ tay lái"}'::jsonb, '{}'::jsonb, false,
  false, false, 'KTM Adventure 390 Phượt Thủ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy KTM Adventure 390 Phượt Thủ tại Đồng Tháp. Giá bán cực rẻ: 236.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ktm-adventure-390-phuot-thu-cover.svg', true
),
(
  'df3ac58b-0b76-4c9e-b167-035112770b8c', '0d7e803a-ec56-451c-bebe-cb15d33df337', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'KTM Duke 790 "The Scalpel"', 'ktm-duke-790-the-scalpel', 'KTM-DF3AC-88', 399000000, 385000000, true,
  2026, 0, '799cc', 'Cam Đen Bạc', 'ABS Bosch Cornering', '4.8 L/100km',
  '2 năm', 'Dòng xe KTM Duke 790 "The Scalpel" phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>KTM Duke 790 "The Scalpel"</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>KTM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 799cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 4.8 L/100km.</li><li>Hệ thống phanh ABS Bosch Cornering cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"2 xy-lanh song song LC8c, 799cc","Công suất":"105 HP / 9000 vòng/phút"}'::jsonb, '{}'::jsonb, true,
  false, false, 'KTM Duke 790 "The Scalpel" Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy KTM Duke 790 "The Scalpel" tại Đồng Tháp. Giá bán cực rẻ: 399.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ktm-duke-790-the-scalpel-cover.svg', true
),
(
  'c8bce9dd-bf92-4670-880b-4d3296fbc3a4', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Ducati Scrambler Icon Độc Chất', 'ducati-scrambler-icon-doc-chat', 'DUCATI-C8BCE-89', 365000000, 350000000, true,
  2026, 0, '803cc', 'Vàng Scrambler', 'Cornering ABS', '5.2 L/100km',
  '2 năm không giới hạn km', 'Dòng xe Ducati Scrambler Icon Độc Chất phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Scrambler Icon Độc Chất</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 803cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 5.2 L/100km.</li><li>Hệ thống phanh Cornering ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm không giới hạn km.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"L-Twin, 2 van Desmodromic, 803cc","Công suất":"73 HP / 8250 vòng/phút","Chiều cao yên":"798 mm"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Ducati Scrambler Icon Độc Chất Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Scrambler Icon Độc Chất tại Đồng Tháp. Giá bán cực rẻ: 365.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-scrambler-icon-doc-chat-cover.svg', true
),
(
  '146c7d5b-89b9-41f3-bfb8-4004060c13ba', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Ducati Monster 937 Monster', 'ducati-monster-937-monster', 'DUCATI-146C7-90', 439000000, 420000000, true,
  2026, 0, '937cc', 'Đỏ Ducati', 'ABS Cornering, DTC, DWC', '5.2 L/100km',
  '2 năm', 'Dòng xe Ducati Monster 937 Monster phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Monster 937 Monster</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 937cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 5.2 L/100km.</li><li>Hệ thống phanh ABS Cornering, DTC, DWC cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Testastretta 11° L-Twin, 937cc","Công suất":"111 HP / 9250 vòng/phút","Khung xe":"Khung nhôm Front Frame siêu nhẹ"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Ducati Monster 937 Monster Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Monster 937 Monster tại Đồng Tháp. Giá bán cực rẻ: 439.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-monster-937-monster-cover.svg', true
),
(
  'fa68e392-80db-40e6-b725-d4c68d29ccd1', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Ducati Multistrada V2 S Tourer', 'ducati-multistrada-v2-s-tourer', 'DUCATI-FA68E-91', 520000000, NULL, true,
  2026, 0, '937cc', 'Đỏ', 'Brembo ABS Cornering, Skyhook', '5.5 L/100km',
  '2 năm', 'Dòng xe Ducati Multistrada V2 S Tourer phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Multistrada V2 S Tourer</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 937cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 5.5 L/100km.</li><li>Hệ thống phanh Brembo ABS Cornering, Skyhook cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Testastretta 11°, 937cc","Công suất":"113 HP","Trang bị tourer":"Thùng sau, kính chắn gió chỉnh điện"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Ducati Multistrada V2 S Tourer Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Multistrada V2 S Tourer tại Đồng Tháp. Giá bán cực rẻ: 520.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-multistrada-v2-s-tourer-cover.svg', true
),
(
  '410e8f66-573d-4408-8cf8-4cf790367265', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Ducati Streetfighter V2 Siêu Trần', 'ducati-streetfighter-v2-sieu-tran', 'DUCATI-410E8-92', 570000000, 550000000, true,
  2026, 0, '955cc', 'Đen Nhám Matte Black', 'ABS Cornering, EVO 2 Control', '6.0 L/100km',
  '2 năm', 'Dòng xe Ducati Streetfighter V2 Siêu Trần phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Streetfighter V2 Siêu Trần</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 955cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 6.0 L/100km.</li><li>Hệ thống phanh ABS Cornering, EVO 2 Control cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Superquadro L-Twin, 955cc","Công suất":"153 HP / 10750 vòng/phút","Mâm xe":"Mâm hợp kim 5 chấu chữ Y"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Ducati Streetfighter V2 Siêu Trần Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Streetfighter V2 Siêu Trần tại Đồng Tháp. Giá bán cực rẻ: 570.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-streetfighter-v2-sieu-tran-cover.svg', true
),
(
  '58fe91cf-5c97-471b-a4c0-eb5b21c6e6ae', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Ducati Panigale V2 Superbike', 'ducati-panigale-v2-superbike', 'DUCATI-58FE9-93', 615000000, 599000000, true,
  2026, 0, '955cc', 'Đỏ Sporty', 'ABS Cornering Brembo EVO', '6.1 L/100km',
  '2 năm', 'Dòng xe Ducati Panigale V2 Superbike phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Panigale V2 Superbike</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 955cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 6.1 L/100km.</li><li>Hệ thống phanh ABS Cornering Brembo EVO cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"Superquadro L-Twin, 955cc","Công suất":"155 HP / 10750 vòng/phút","Hộp số":"6 cấp có DQS (Quickshifter up/down)"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Ducati Panigale V2 Superbike Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Panigale V2 Superbike tại Đồng Tháp. Giá bán cực rẻ: 615.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-panigale-v2-superbike-cover.svg', true
),
(
  'f3758b68-593e-4c6d-8b4c-b70cb5e687c2', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '1628ecb9-2f02-4d93-81e1-2ed06468fe46', 'Ducati Diavel V4 Quái Thú Showroom', 'ducati-diavel-v4-quai-thu-showroom', 'DUCATI-F3758-94', 980000000, 960000000, true,
  2026, 0, '1158cc', 'Đỏ Racing', 'Ducati Safety Pack', '6.4 L/100km',
  '2 năm', 'Dòng xe Ducati Diavel V4 Quái Thú Showroom phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Diavel V4 Quái Thú Showroom</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 1158cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 6.4 L/100km.</li><li>Hệ thống phanh Ducati Safety Pack cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 2 năm.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"V4 Granturismo, 1158cc","Công suất":"168 HP / 10750 vòng/phút","Mô-men xoắn":"126 Nm / 7500 vòng/phút"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Ducati Diavel V4 Quái Thú Showroom Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Diavel V4 Quái Thú Showroom tại Đồng Tháp. Giá bán cực rẻ: 980.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-diavel-v4-quai-thu-showroom-cover.svg', true
),
(
  'fcd09865-0576-4afb-828a-13751d761e42', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda SH 150i ABS Cũ Đời 2021', 'honda-sh-150i-abs-cu-doi-2021', 'HONDA-FCD09-95', 78000000, 76500000, false,
  2021, 11000, '150cc', 'Trắng Đen', 'ABS', '2.3 L/100km',
  '6 tháng', 'Dòng xe Honda SH 150i ABS Cũ Đời 2021 phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda SH 150i ABS Cũ Đời 2021</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.3 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Biển số":"66B1-999.99"}'::jsonb, '{"Giấy tờ":"Chính chủ","Động cơ":"Cực êm","Dàn áo":"95% mộc mạc","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Dunlop","Khung sườn":"Nguyên bản","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, false,
  false, false, 'Honda SH 150i ABS Cũ Đời 2021 Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda SH 150i ABS Cũ Đời 2021 tại Đồng Tháp. Giá bán cực rẻ: 78.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-sh-150i-abs-cu-doi-2021-cover.svg', true
),
(
  '8d3a5bff-6f3f-4ae5-bea3-4d67ea660549', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha Exciter 135 Cũ Đời 2012 Côn Tự Động', 'yamaha-exciter-135-cu-doi-2012-con-tu-dong', 'YAMAHA-8D3A5-96', 15000000, NULL, false,
  2012, 60000, '135cc', 'Đỏ Đen', 'Đĩa', '2.2 L/100km',
  '3 tháng', 'Dòng xe Yamaha Exciter 135 Cũ Đời 2012 Côn Tự Động phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Exciter 135 Cũ Đời 2012 Côn Tự Động</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 135cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.2 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Động cơ":"4 số tròn, côn tự động"}'::jsonb, '{"Giấy tờ":"Hợp lệ chính chủ","Động cơ":"Máy êm chưa chẻ","Dàn áo":"Trầy xước sơn nhẹ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Mòn 40%","Khung sườn":"Vẫn cứng cáp","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Bình thường"}'::jsonb, true,
  false, false, 'Yamaha Exciter 135 Cũ Đời 2012 Côn Tự Động Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Exciter 135 Cũ Đời 2012 Côn Tự Động tại Đồng Tháp. Giá bán cực rẻ: 15.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-exciter-135-cu-doi-2012-con-tu-dong-cover.svg', true
),
(
  '6eb5a6e3-cf4c-4eb8-af21-c7b5f11d274a', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha Sirius 110 RC Cũ Vành Đúc', 'yamaha-sirius-110-rc-cu-vanh-duc', 'YAMAHA-6EB5A-97', 11500000, NULL, false,
  2017, 32000, '110cc', 'Đen Đỏ', 'Đĩa', '1.9 L/100km',
  '6 tháng', 'Dòng xe Yamaha Sirius 110 RC Cũ Vành Đúc phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Sirius 110 RC Cũ Vành Đúc</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.9 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Đầy đủ","Động cơ":"Máy bốc lợi xăng","Dàn áo":"Dán decal lột ra mới cứng","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Tốt","Khung sườn":"Zin","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Nhạy"}'::jsonb, false,
  false, false, 'Yamaha Sirius 110 RC Cũ Vành Đúc Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Sirius 110 RC Cũ Vành Đúc tại Đồng Tháp. Giá bán cực rẻ: 11.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-sirius-110-rc-cu-vanh-duc-cover.svg', true
),
(
  'a132631b-4051-46dc-aa73-907e9a6f4306', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Wave RSX 110 Cũ Học Sinh', 'honda-wave-rsx-110-cu-hoc-sinh', 'HONDA-A1326-98', 11200000, NULL, false,
  2016, 38000, '110cc', 'Xám Đỏ', 'Cơ', '1.8 L/100km',
  '3 tháng', 'Dòng xe Honda Wave RSX 110 Cũ Học Sinh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Wave RSX 110 Cũ Học Sinh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.8 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Đầy đủ chính chủ","Động cơ":"Dễ nổ máy êm","Dàn áo":"Trầy xước yếm trái","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Mòn 30%","Khung sườn":"Tốt","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, false,
  false, false, 'Honda Wave RSX 110 Cũ Học Sinh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Wave RSX 110 Cũ Học Sinh tại Đồng Tháp. Giá bán cực rẻ: 11.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-wave-rsx-110-cu-hoc-sinh-cover.svg', true
),
(
  'ea1881d9-3abc-4a11-9eac-b4d8da58336e', 'b6b8ef7d-a91e-4a9c-a703-4cefbca0f1bb', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Vespa Primavera 125 Cũ Màu Độc', 'vespa-primavera-125-cu-mau-doc', 'VESPA-EA188-99', 38000000, 36500000, false,
  2017, 24000, '125cc', 'Xanh Mint', 'ABS', '2.8 L/100km',
  '6 tháng', 'Dòng xe Vespa Primavera 125 Cũ Màu Độc phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Vespa Primavera 125 Cũ Màu Độc</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Vespa</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.8 L/100km.</li><li>Hệ thống phanh ABS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Đầy đủ","Động cơ":"Máy 3v i-get cực êm","Dàn áo":"Nước sơn xanh ngọc nguyên bản","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Độ mòn 20%","Khung sườn":"Chắc chắn đầm xe","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"ABS trước nhạy"}'::jsonb, false,
  false, false, 'Vespa Primavera 125 Cũ Màu Độc Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Vespa Primavera 125 Cũ Màu Độc tại Đồng Tháp. Giá bán cực rẻ: 38.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/vespa-primavera-125-cu-mau-doc-cover.svg', true
),
(
  '5a5d29d7-d37b-4541-ae95-07934f0bbf4f', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda SH Mode 125 Cũ Nữ Đi', 'honda-sh-mode-125-cu-nu-di', 'HONDA-5A5D2-100', 42000000, NULL, false,
  2016, 28000, '125cc', 'Vàng Đồng', 'CBS', '2.2 L/100km',
  '6 tháng', 'Dòng xe Honda SH Mode 125 Cũ Nữ Đi phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda SH Mode 125 Cũ Nữ Đi</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.2 L/100km.</li><li>Hệ thống phanh CBS cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Ký giấy ngay","Động cơ":"Máy êm ru không tiếng hú","Dàn áo":"Màu vàng đồng sang trọng trầy nhẹ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Mới thay","Khung sườn":"Chuẩn chỉ","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, false,
  false, false, 'Honda SH Mode 125 Cũ Nữ Đi Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda SH Mode 125 Cũ Nữ Đi tại Đồng Tháp. Giá bán cực rẻ: 42.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-sh-mode-125-cu-nu-di-cover.svg', true
),
(
  '8bce38a6-f0ee-4c6c-aa1d-b616dc1d7452', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Future Neo GT Cũ Cọp Sưu Tầm', 'honda-future-neo-gt-cu-cop-suu-tam', 'HONDA-8BCE3-101', 35000000, NULL, false,
  2008, 50000, '125cc', 'Đỏ Đen', 'Đĩa', '1.6 L/100km',
  '6 tháng', 'Dòng xe Honda Future Neo GT Cũ Cọp Sưu Tầm phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Future Neo GT Cũ Cọp Sưu Tầm</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.6 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Odo thực tế":"50,000 km máy zin đầu nồi chưa chạm"}'::jsonb, '{"Giấy tờ":"Chính chủ rút gốc 1 nốt nhạc","Động cơ":"Đầu nồi chưa rớt cực kỳ êm ái bốc","Dàn áo":"Tem zin nước sơn mọc mạc","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Mới","Khung sườn":"Sơn sườn cực đẹp","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, false,
  true, false, 'Honda Future Neo GT Cũ Cọp Sưu Tầm Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Future Neo GT Cũ Cọp Sưu Tầm tại Đồng Tháp. Giá bán cực rẻ: 35.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-future-neo-gt-cu-cop-suu-tam-cover.svg', true
),
(
  'eb7f0a1d-d8fe-4814-a4de-0723815e1be5', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha Exciter 150 Cũ Đời 2015 Đen Nhám', 'yamaha-exciter-150-cu-doi-2015-den-nham', 'YAMAHA-EB7F0-102', 18500000, NULL, false,
  2015, 35000, '150cc', 'Đen Nhám', 'Đĩa', '2.1 L/100km',
  '6 tháng', 'Dòng xe Yamaha Exciter 150 Cũ Đời 2015 Đen Nhám phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Exciter 150 Cũ Đời 2015 Đen Nhám</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 150cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.1 L/100km.</li><li>Hệ thống phanh Đĩa cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Hợp lệ công chứng","Động cơ":"Êm nhẹ bốc","Dàn áo":"Đen nhám cực mạnh mẽ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Tốt","Khung sườn":"Tốt","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Hoạt động tốt"}'::jsonb, false,
  false, true, 'Yamaha Exciter 150 Cũ Đời 2015 Đen Nhám Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Exciter 150 Cũ Đời 2015 Đen Nhám tại Đồng Tháp. Giá bán cực rẻ: 18.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-exciter-150-cu-doi-2015-den-nham-cover.svg', true
),
(
  'd59d0244-839b-4d10-8cc6-ecb73eab2081', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Suzuki Axelo 125 Côn Tay Cũ Hiếm', 'suzuki-axelo-125-con-tay-cu-hiem', 'SUZUKI-D59D0-103', 10500000, NULL, false,
  2014, 48000, '125cc', 'Xanh Trắng', 'Đĩa Dual', '2.2 L/100km',
  '3 tháng', 'Dòng xe Suzuki Axelo 125 Côn Tay Cũ Hiếm phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Suzuki Axelo 125 Côn Tay Cũ Hiếm</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.2 L/100km.</li><li>Hệ thống phanh Đĩa Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Chính chủ","Động cơ":"Hơi kêu cam nhẹ đặc trưng, máy bốc","Dàn áo":"Bình thường xước xát","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Tốt","Khung sườn":"Tốt","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Đĩa trước sau hoạt động tốt"}'::jsonb, false,
  false, false, 'Suzuki Axelo 125 Côn Tay Cũ Hiếm Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Suzuki Axelo 125 Côn Tay Cũ Hiếm tại Đồng Tháp. Giá bán cực rẻ: 10.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/suzuki-axelo-125-con-tay-cu-hiem-cover.svg', true
),
(
  '7e5c9818-6486-4c9b-9db3-12f6c6a4e366', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'SYM Elegant 50 Cũ Giá Học Sinh', 'sym-elegant-50-cu-gia-hoc-sinh', 'SYM-7E5C9-104', 7500000, NULL, false,
  2019, 15000, '50cc', 'Đỏ Đen', 'Cơ', '1.5 L/100km',
  '3 tháng', 'Dòng xe SYM Elegant 50 Cũ Giá Học Sinh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Elegant 50 Cũ Giá Học Sinh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 50cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.5 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Hợp lệ","Động cơ":"Khô ráo êm đề nổ tốt","Dàn áo":"Bình thường trầy xước nhẹ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Bình thường","Khung sườn":"Chắc chắn","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"An toàn"}'::jsonb, true,
  false, false, 'SYM Elegant 50 Cũ Giá Học Sinh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Elegant 50 Cũ Giá Học Sinh tại Đồng Tháp. Giá bán cực rẻ: 7.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-elegant-50-cu-gia-hoc-sinh-cover.svg', true
),
(
  '199e2205-16f4-41a1-8fde-d1d12fd34ef5', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Ducati Monster 797 Cũ Chính Chủ', 'ducati-monster-797-cu-chinh-chu', 'DUCATI-199E2-105', 185000000, 180000000, false,
  2019, 9000, '803cc', 'Đỏ', 'ABS Dual', '5.2 L/100km',
  '6 tháng', 'Dòng xe Ducati Monster 797 Cũ Chính Chủ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Ducati Monster 797 Cũ Chính Chủ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 803cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 5.2 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Tình trạng":"Mới 90% dán nilon chống trầy"}'::jsonb, '{"Giấy tờ":"HQCN sang tên toàn quốc","Động cơ":"Nổ uy lực, máy L-Twin đặc trưng êm ái","Dàn áo":"Nước sơn đỏ zin rất đẹp","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Lốp Pirelli Rosso III mới","Khung sườn":"Mắt cáo nguyên bản sơn đỏ","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Brembo phanh ABS tốt"}'::jsonb, false,
  false, false, 'Ducati Monster 797 Cũ Chính Chủ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Ducati Monster 797 Cũ Chính Chủ tại Đồng Tháp. Giá bán cực rẻ: 185.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/ducati-monster-797-cu-chinh-chu-cover.svg', true
),
(
  '175497cf-6f1c-47df-8bbf-4d07f1322c1c', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Kawasaki Z300 Cũ Đời 2018 Giá Tốt', 'kawasaki-z300-cu-doi-2018-gia-tot', 'KAWASAKI-17549-106', 72000000, NULL, false,
  2018, 16000, '296cc', 'Xanh Lá Đen', 'ABS Dual', '3.6 L/100km',
  '6 tháng', 'Dòng xe Kawasaki Z300 Cũ Đời 2018 Giá Tốt phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Kawasaki Z300 Cũ Đời 2018 Giá Tốt</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 296cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 3.6 L/100km.</li><li>Hệ thống phanh ABS Dual cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Chính chủ sang tên","Động cơ":"Đã bảo dưỡng toàn bộ máy móc bốc","Dàn áo":"Trầy góc xi nhan nhẹ","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Dunlop","Khung sườn":"Đạt chuẩn","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"ABS ổn định"}'::jsonb, false,
  false, false, 'Kawasaki Z300 Cũ Đời 2018 Giá Tốt Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Kawasaki Z300 Cũ Đời 2018 Giá Tốt tại Đồng Tháp. Giá bán cực rẻ: 72.000.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/kawasaki-z300-cu-doi-2018-gia-tot-cover.svg', true
),
(
  '07aa6773-756c-49bb-9e30-31fc470a16a3', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Honda Cub 50cc Cũ Kiểng Cực Đẹp', 'honda-cub-50cc-cu-kieng-cuc-dep', 'HONDA-07AA6-107', 9500000, NULL, false,
  2015, 20000, '50cc', 'Xanh Da Trời', 'Cơ', '1.3 L/100km',
  '3 tháng', 'Dòng xe Honda Cub 50cc Cũ Kiểng Cực Đẹp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Honda Cub 50cc Cũ Kiểng Cực Đẹp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 50cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 1.3 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Đầy đủ","Động cơ":"Máy 50cc nổ thút thít tiết kiệm xăng","Dàn áo":"Sơn lại màu xanh mint kiểng đẹp","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Bình thường","Khung sườn":"Không rỉ sét","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"CBS nhẹ nhàng"}'::jsonb, false,
  false, false, 'Honda Cub 50cc Cũ Kiểng Cực Đẹp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Honda Cub 50cc Cũ Kiểng Cực Đẹp tại Đồng Tháp. Giá bán cực rẻ: 9.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/honda-cub-50cc-cu-kieng-cuc-dep-cover.svg', true
),
(
  '3a41f7b7-4317-49f6-96ce-383704876dfc', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'Yamaha Luvias 125 Cũ Máy Bốc', 'yamaha-luvias-125-cu-may-boc', 'YAMAHA-3A41F-108', 8500000, NULL, false,
  2013, 55000, '125cc', 'Đỏ Trắng', 'Cơ', '2.5 L/100km',
  '3 tháng', 'Dòng xe Yamaha Luvias 125 Cũ Máy Bốc phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Yamaha Luvias 125 Cũ Máy Bốc</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 125cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.5 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Hợp lệ","Động cơ":"Máy bốc láp hơi hú nhẹ","Dàn áo":"Bình thường xước dăm","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Mòn 50%","Khung sườn":"Bình thường","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Đĩa trước CBS sau bình thường"}'::jsonb, false,
  false, false, 'Yamaha Luvias 125 Cũ Máy Bốc Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Yamaha Luvias 125 Cũ Máy Bốc tại Đồng Tháp. Giá bán cực rẻ: 8.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/yamaha-luvias-125-cu-may-boc-cover.svg', true
),
(
  '8ac1cdd1-7051-41cb-aede-d14ab88d8cbe', '470fef6d-3a84-4e69-91f4-86cbe2df83d1', '9fd9f92b-13e6-4feb-b2bc-94bda866d346', 'SYM Attila Elizabeth Cũ Giá Rẻ', 'sym-attila-elizabeth-cu-gia-re', 'SYM-8AC1C-109', 6500000, NULL, false,
  2014, 40000, '110cc', 'Trắng Kem', 'Cơ', '2.8 L/100km',
  '3 tháng', 'Dòng xe SYM Attila Elizabeth Cũ Giá Rẻ phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>SYM Attila Elizabeth Cũ Giá Rẻ</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>SYM</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ 110cc mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ 2.8 L/100km.</li><li>Hệ thống phanh Cơ cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 3 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{}'::jsonb, '{"Giấy tờ":"Đầy đủ","Động cơ":"Khô ráo chạy đầm","Dàn áo":"Bình thường xước xát","Phanh":"ABS/CBS hoạt động tốt","Lốp xe":"Bình thường","Khung sườn":"Ổn định","Bảo dưỡng":"Mới thay nhớt vệ sinh nồi","Điểm đánh giá":"9/10","Hệ thống phanh":"Tốt"}'::jsonb, false,
  false, false, 'SYM Attila Elizabeth Cũ Giá Rẻ Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy SYM Attila Elizabeth Cũ Giá Rẻ tại Đồng Tháp. Giá bán cực rẻ: 6.500.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/sym-attila-elizabeth-cu-gia-re-cover.svg', true
),
(
  '31cc1af0-ff60-4dbd-a919-2f39287e8b47', '69f41be7-0619-4d20-8db0-a2bc7b5b0045', '88437967-eddc-4ad3-a174-63feb5316b5c', 'Mũ bảo hiểm Honda Fullface Cao Cấp', 'mu-bao-hiem-honda-fullface-cao-cap', 'HONDA-31CC1-110', 1200000, 1100000, true,
  NULL, 0, 'Phụ kiện', 'Đỏ Đen', 'N/A', 'N/A',
  '12 tháng', 'Dòng xe Mũ bảo hiểm Honda Fullface Cao Cấp phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Mũ bảo hiểm Honda Fullface Cao Cấp</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Honda</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Phụ kiện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ N/A.</li><li>Hệ thống phanh N/A cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 12 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Hãng":"Honda","Chất liệu":"Nhựa ABS nguyên sinh","Kính chắn gió":"Chống tia UV","Trọng lượng":"1450g"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Mũ bảo hiểm Honda Fullface Cao Cấp Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Mũ bảo hiểm Honda Fullface Cao Cấp tại Đồng Tháp. Giá bán cực rẻ: 1.200.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/mu-bao-hiem-honda-fullface-cao-cap-cover.svg', true
),
(
  '4cedb9a0-f280-474c-9401-7d6bb9fb431c', 'a0bfb3f9-785c-454f-87c3-fee5f23b1c1f', '88437967-eddc-4ad3-a174-63feb5316b5c', 'Dầu nhớt Motul 300V Factory Line 10W40 1L', 'dau-nhot-motul-300v-factory-line-10w40-1l', 'YAMAHA-4CEDB-111', 450000, 420000, true,
  NULL, 0, 'Phụ kiện', 'Đỏ', 'N/A', 'N/A',
  'N/A', 'Dòng xe Dầu nhớt Motul 300V Factory Line 10W40 1L phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Dầu nhớt Motul 300V Factory Line 10W40 1L</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Yamaha</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Phụ kiện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ N/A.</li><li>Hệ thống phanh N/A cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến N/A.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Thương hiệu":"Motul Pháp","Dung tích":"1 Lít","Độ nhớt":"10W40","Loại động cơ":"4 thì côn tay, PKL"}'::jsonb, '{}'::jsonb, false,
  true, false, 'Dầu nhớt Motul 300V Factory Line 10W40 1L Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Dầu nhớt Motul 300V Factory Line 10W40 1L tại Đồng Tháp. Giá bán cực rẻ: 450.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/dau-nhot-motul-300v-factory-line-10w40-1l-cover.svg', true
),
(
  'aa9a2638-739e-43f5-b28e-fbdfb90115fc', '9bf15c59-3d79-4e25-aec6-d61b772d15b1', '88437967-eddc-4ad3-a174-63feb5316b5c', 'Khóa chống trộm xe máy Smartkey FOX thông minh', 'khoa-chong-trom-xe-may-smartkey-fox-thong-minh', 'SUZUKI-AA9A2-112', 1850000, 1750000, true,
  NULL, 0, 'Phụ kiện', 'Đen', 'N/A', 'N/A',
  '12 tháng', 'Dòng xe Khóa chống trộm xe máy Smartkey FOX thông minh phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Khóa chống trộm xe máy Smartkey FOX thông minh</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Suzuki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Phụ kiện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ N/A.</li><li>Hệ thống phanh N/A cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 12 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Thương hiệu":"FOX Pitech","Tính năng":"Chống trộm, chống cướp tự động, định vị","Khoảng cách":"Tự nhận diện trong bán kính 2m"}'::jsonb, '{}'::jsonb, true,
  false, false, 'Khóa chống trộm xe máy Smartkey FOX thông minh Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Khóa chống trộm xe máy Smartkey FOX thông minh tại Đồng Tháp. Giá bán cực rẻ: 1.850.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/khoa-chong-trom-xe-may-smartkey-fox-thong-minh-cover.svg', true
),
(
  '81c83a66-ddd3-4e9e-a9ea-09678dbf1522', 'fe2a11b6-cc4b-4d8f-9ee0-8c439fdd1865', '88437967-eddc-4ad3-a174-63feb5316b5c', 'Nhông sên dĩa D.I.D Gold Vàng 9ly', 'nhong-sen-dia-did-gold-vang-9ly', 'KAWASAKI-81C83-113', 850000, NULL, true,
  NULL, 0, 'Phụ kiện', 'Vàng', 'N/A', 'N/A',
  '6 tháng', 'Dòng xe Nhông sên dĩa D.I.D Gold Vàng 9ly phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Nhông sên dĩa D.I.D Gold Vàng 9ly</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Kawasaki</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Phụ kiện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ N/A.</li><li>Hệ thống phanh N/A cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 6 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Thương hiệu":"D.I.D Nhật Bản","Độ dày sên":"428HD (9 ly)","Màu sắc":"Vàng Gold xi mạ"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Nhông sên dĩa D.I.D Gold Vàng 9ly Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Nhông sên dĩa D.I.D Gold Vàng 9ly tại Đồng Tháp. Giá bán cực rẻ: 850.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/nhong-sen-dia-did-gold-vang-9ly-cover.svg', true
),
(
  '27903827-1e2a-42f5-bc03-d51ea7f6e485', '5f8e1926-6bba-4221-ac0b-27bfb114c6e6', '88437967-eddc-4ad3-a174-63feb5316b5c', 'Đèn trợ sáng L4X Cree XML2 Siêu Sáng', 'den-tro-sang-l4x-cree-xml2-sieu-sang', 'DUCATI-27903-114', 1450000, 1350000, true,
  NULL, 0, 'Phụ kiện', 'Đen nhôm', 'N/A', 'N/A',
  '12 tháng', 'Dòng xe Đèn trợ sáng L4X Cree XML2 Siêu Sáng phân phối chính hãng tại Ken Motor. Thiết kế thể thao hiện đại, mức giá tốt nhất khu vực Đồng Tháp.', '<p><strong>Đèn trợ sáng L4X Cree XML2 Siêu Sáng</strong> đại diện cho sự đột phá công nghệ và thiết kế của thương hiệu <strong>Ducati</strong>. Mẫu xe này mang lại trải nghiệm lái thoải mái, an toàn tối đa cho mọi cung đường.</p><h3>Các Ưu Điểm Nổi Bật</h3><ul><li>Động cơ Phụ kiện mạnh mẽ, vận hành êm ái.</li><li>Mức tiêu hao nhiên liệu ấn tượng chỉ N/A.</li><li>Hệ thống phanh N/A cực kỳ an toàn.</li><li>Chế độ bảo hành dài hạn lên đến 12 tháng.</li></ul><p>Ken Motor cam kết hỗ trợ tối đa về giá bán, tư vấn gói trả góp với thủ tục nhanh chóng lấy xe sau 15 phút. Liên hệ ngay hotline <strong>0787990047</strong> để nhận báo giá lăn bánh mới nhất.</p>', '{"Thương hiệu":"Cree Mỹ","Công suất":"40W","Độ sáng":"4000 Lumens","Chống nước":"IP68"}'::jsonb, '{}'::jsonb, false,
  false, false, 'Đèn trợ sáng L4X Cree XML2 Siêu Sáng Chính Hãng Giá Tốt | Ken Motor', 'Mua bán xe máy Đèn trợ sáng L4X Cree XML2 Siêu Sáng tại Đồng Tháp. Giá bán cực rẻ: 1.450.000đ, hỗ trợ trả góp lãi suất cực thấp, giao xe tận nơi.', '/demo/vehicles/den-tro-sang-l4x-cree-xml2-sieu-sang-cover.svg', true
)
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
('598318fa-f37a-4b7d-9ec0-12a87de1c82a', '01692a3d-5386-4781-a2d6-21f8f578c8cb', '/demo/vehicles/honda-vision-110cc-tieu-chuan-cover.svg', 1, true),
('1fe351a9-136b-4c29-93da-935653947075', '01692a3d-5386-4781-a2d6-21f8f578c8cb', '/demo/vehicles/honda-vision-110cc-tieu-chuan-gallery-2.svg', 2, false),
('ac795665-bde6-4be7-a715-c920b0bff5f6', '01692a3d-5386-4781-a2d6-21f8f578c8cb', '/demo/vehicles/honda-vision-110cc-tieu-chuan-gallery-3.svg', 3, false),
('723b3088-da4b-442e-a1c0-64710dda7de7', '8b983eac-5d99-4025-a7e2-8f346346d893', '/demo/vehicles/honda-vision-110cc-the-thao-cover.svg', 1, true),
('a0be3a3e-d362-4f1e-a757-9105062dfdda', '8b983eac-5d99-4025-a7e2-8f346346d893', '/demo/vehicles/honda-vision-110cc-the-thao-gallery-2.svg', 2, false),
('24c1e422-f701-46fd-8b71-009057944fca', '8b983eac-5d99-4025-a7e2-8f346346d893', '/demo/vehicles/honda-vision-110cc-the-thao-gallery-3.svg', 3, false),
('2a1aed05-d551-451b-8a9b-641655ef2b03', '8b983eac-5d99-4025-a7e2-8f346346d893', '/demo/vehicles/honda-vision-110cc-the-thao-gallery-4.svg', 4, false),
('417ca254-110d-4cbf-b82d-61fa687aebbf', 'bbc5b327-75c3-4422-af8b-649b567f6aa7', '/demo/vehicles/honda-lead-125cc-cao-cap-cover.svg', 1, true),
('0c7e3e3a-8129-4d36-a8b5-6a05a75834b2', 'bbc5b327-75c3-4422-af8b-649b567f6aa7', '/demo/vehicles/honda-lead-125cc-cao-cap-gallery-2.svg', 2, false),
('2f46a041-0a66-4662-a2ff-f8522c0efe3a', 'bbc5b327-75c3-4422-af8b-649b567f6aa7', '/demo/vehicles/honda-lead-125cc-cao-cap-gallery-3.svg', 3, false),
('0be98f12-cce0-4960-9fcd-9e9f381dd4d4', 'bbc5b327-75c3-4422-af8b-649b567f6aa7', '/demo/vehicles/honda-lead-125cc-cao-cap-gallery-4.svg', 4, false),
('e6df778b-e4a6-4457-b010-69f2302d8f83', 'bbc5b327-75c3-4422-af8b-649b567f6aa7', '/demo/vehicles/honda-lead-125cc-cao-cap-gallery-5.svg', 5, false),
('2b231d08-596a-4fb7-8b4d-4cf00821083e', 'afca39b2-3af1-4679-9285-1b0f2c114656', '/demo/vehicles/honda-air-blade-125cc-dac-biet-cover.svg', 1, true),
('141da170-3ae8-49b7-ba2c-013f6998a721', 'afca39b2-3af1-4679-9285-1b0f2c114656', '/demo/vehicles/honda-air-blade-125cc-dac-biet-gallery-2.svg', 2, false),
('fe1e8241-ad6c-4adb-9b19-b1a46d5bc8b5', 'afca39b2-3af1-4679-9285-1b0f2c114656', '/demo/vehicles/honda-air-blade-125cc-dac-biet-gallery-3.svg', 3, false),
('16ebeca0-fad4-4cd1-ab91-40ffe3c6d88e', 'fe6b7b31-8326-4333-92c7-dff3772b7f02', '/demo/vehicles/honda-air-blade-160cc-dac-biet-abs-cover.svg', 1, true),
('d5fe4096-542b-4fb2-8431-2d831ca8e789', 'fe6b7b31-8326-4333-92c7-dff3772b7f02', '/demo/vehicles/honda-air-blade-160cc-dac-biet-abs-gallery-2.svg', 2, false),
('591d9f30-f382-4e90-9c2b-9a1a460e19f7', 'fe6b7b31-8326-4333-92c7-dff3772b7f02', '/demo/vehicles/honda-air-blade-160cc-dac-biet-abs-gallery-3.svg', 3, false),
('599ecb9e-ec5e-4dc3-af49-8cd49be6607c', 'fe6b7b31-8326-4333-92c7-dff3772b7f02', '/demo/vehicles/honda-air-blade-160cc-dac-biet-abs-gallery-4.svg', 4, false),
('9d52e652-7fac-4488-a54f-c896dab28273', '02880cf2-e54e-4ef7-a732-48b03055f720', '/demo/vehicles/honda-sh-mode-125cc-the-thao-cover.svg', 1, true),
('9b099b8e-8942-4c09-8449-36aee16d7b2f', '02880cf2-e54e-4ef7-a732-48b03055f720', '/demo/vehicles/honda-sh-mode-125cc-the-thao-gallery-2.svg', 2, false),
('ccb448ec-b3e5-43ef-a992-731ed45c551d', '02880cf2-e54e-4ef7-a732-48b03055f720', '/demo/vehicles/honda-sh-mode-125cc-the-thao-gallery-3.svg', 3, false),
('ff7e2590-6254-4a33-a5ee-57bdb0302ea5', '02880cf2-e54e-4ef7-a732-48b03055f720', '/demo/vehicles/honda-sh-mode-125cc-the-thao-gallery-4.svg', 4, false),
('987f10e4-d126-4186-b621-6932435106a5', '02880cf2-e54e-4ef7-a732-48b03055f720', '/demo/vehicles/honda-sh-mode-125cc-the-thao-gallery-5.svg', 5, false),
('8e0a39dc-9429-4f87-a6e3-38d8b2e66a14', 'e567bcd5-534c-454e-9d3c-5466cc79f95d', '/demo/vehicles/honda-sh-125i-cao-cap-abs-cover.svg', 1, true),
('c11f4c32-901a-4931-9418-06e9f830a098', 'e567bcd5-534c-454e-9d3c-5466cc79f95d', '/demo/vehicles/honda-sh-125i-cao-cap-abs-gallery-2.svg', 2, false),
('2407f847-d064-4694-9036-2f3193df275a', 'e567bcd5-534c-454e-9d3c-5466cc79f95d', '/demo/vehicles/honda-sh-125i-cao-cap-abs-gallery-3.svg', 3, false),
('02f2e1e6-f77d-4196-bbf4-6e2399debd40', '4832303e-cf03-43ab-a10e-36c2084cbccd', '/demo/vehicles/honda-sh-160i-the-thao-abs-cover.svg', 1, true),
('6db99d8e-c9c1-4a61-bfca-d8450bd0c326', '4832303e-cf03-43ab-a10e-36c2084cbccd', '/demo/vehicles/honda-sh-160i-the-thao-abs-gallery-2.svg', 2, false),
('ba244277-96e6-446f-b61e-56446ce993bf', '4832303e-cf03-43ab-a10e-36c2084cbccd', '/demo/vehicles/honda-sh-160i-the-thao-abs-gallery-3.svg', 3, false),
('eef03f2b-b138-42f2-a247-bb62b442dae8', '4832303e-cf03-43ab-a10e-36c2084cbccd', '/demo/vehicles/honda-sh-160i-the-thao-abs-gallery-4.svg', 4, false),
('7dfbc985-5bdf-4c57-8b8d-17620c09cfbd', 'ed1f02b9-55eb-460f-bc24-f02896eed838', '/demo/vehicles/honda-sh-350i-the-thao-lap-rap-viet-nam-cover.svg', 1, true),
('92d38b6a-da45-4140-bbae-c69c3677780e', 'ed1f02b9-55eb-460f-bc24-f02896eed838', '/demo/vehicles/honda-sh-350i-the-thao-lap-rap-viet-nam-gallery-2.svg', 2, false),
('d1825e8e-600a-4288-b4fd-ef3a8e1b474e', 'ed1f02b9-55eb-460f-bc24-f02896eed838', '/demo/vehicles/honda-sh-350i-the-thao-lap-rap-viet-nam-gallery-3.svg', 3, false),
('9e7a892d-7490-4293-843d-0ec09db31f02', 'ed1f02b9-55eb-460f-bc24-f02896eed838', '/demo/vehicles/honda-sh-350i-the-thao-lap-rap-viet-nam-gallery-4.svg', 4, false),
('0ba35e46-2099-4ce0-aa6d-f612c5425e48', 'ed1f02b9-55eb-460f-bc24-f02896eed838', '/demo/vehicles/honda-sh-350i-the-thao-lap-rap-viet-nam-gallery-5.svg', 5, false),
('c5b5f3b7-abf5-401c-b055-5529fd1308df', '449aa7ea-5574-44d4-a819-33ddc14a968b', '/demo/vehicles/honda-wave-alpha-110cc-cover.svg', 1, true),
('4eb624c8-76eb-4a69-a469-aef0812d554b', '449aa7ea-5574-44d4-a819-33ddc14a968b', '/demo/vehicles/honda-wave-alpha-110cc-gallery-2.svg', 2, false),
('7c3ce19b-53c6-4677-8e95-415fa775ddab', '449aa7ea-5574-44d4-a819-33ddc14a968b', '/demo/vehicles/honda-wave-alpha-110cc-gallery-3.svg', 3, false),
('f10c5125-76df-4934-ade3-2cd82aaee2c9', '45330799-3862-4532-9028-fe3639a32296', '/demo/vehicles/honda-wave-rsx-fi-110-phanh-dia-cover.svg', 1, true),
('38d5c42b-8e29-4579-9b5f-dffc43be5515', '45330799-3862-4532-9028-fe3639a32296', '/demo/vehicles/honda-wave-rsx-fi-110-phanh-dia-gallery-2.svg', 2, false),
('b2359f7d-fc36-4d87-b6ce-7caa192b8e95', '45330799-3862-4532-9028-fe3639a32296', '/demo/vehicles/honda-wave-rsx-fi-110-phanh-dia-gallery-3.svg', 3, false),
('b4fe2964-fe17-4b23-973a-92774e6f933f', '45330799-3862-4532-9028-fe3639a32296', '/demo/vehicles/honda-wave-rsx-fi-110-phanh-dia-gallery-4.svg', 4, false),
('2c59db1a-11d7-4f9a-804c-21cea0481c08', '30949cea-3937-4f30-bc2c-d637f2fcc5c1', '/demo/vehicles/honda-future-125-fi-cao-cap-vanh-duc-cover.svg', 1, true),
('1de372b2-d7c8-4cfd-9695-d77af93024ed', '30949cea-3937-4f30-bc2c-d637f2fcc5c1', '/demo/vehicles/honda-future-125-fi-cao-cap-vanh-duc-gallery-2.svg', 2, false),
('10ddc02e-0eae-4ac2-9ae4-483e7dffb048', '30949cea-3937-4f30-bc2c-d637f2fcc5c1', '/demo/vehicles/honda-future-125-fi-cao-cap-vanh-duc-gallery-3.svg', 3, false),
('584c8249-5e23-4fd9-aac2-ba391a432a92', '30949cea-3937-4f30-bc2c-d637f2fcc5c1', '/demo/vehicles/honda-future-125-fi-cao-cap-vanh-duc-gallery-4.svg', 4, false),
('b1bb42d7-6864-4585-9e68-0eb554fd9d02', '30949cea-3937-4f30-bc2c-d637f2fcc5c1', '/demo/vehicles/honda-future-125-fi-cao-cap-vanh-duc-gallery-5.svg', 5, false),
('13d2f098-2877-487c-a15c-9abe57f63e78', '56710c1c-53d1-4fe8-9242-a83381390f00', '/demo/vehicles/honda-blade-110-vanh-nan-hoa-phanh-co-cover.svg', 1, true),
('631020c2-4064-4e2e-8c07-fcdde3094651', '56710c1c-53d1-4fe8-9242-a83381390f00', '/demo/vehicles/honda-blade-110-vanh-nan-hoa-phanh-co-gallery-2.svg', 2, false),
('59e82db9-b675-4856-9ff7-42e1eaf60ac6', '56710c1c-53d1-4fe8-9242-a83381390f00', '/demo/vehicles/honda-blade-110-vanh-nan-hoa-phanh-co-gallery-3.svg', 3, false),
('7a25e001-ca4c-445b-bd6a-9a28a6aece08', 'ae748aa3-b0d9-4920-afb0-a81fc6a72b6d', '/demo/vehicles/honda-winner-x-v3-dac-biet-abs-cover.svg', 1, true),
('2a0e9084-4965-429d-a572-a1f3972c82e2', 'ae748aa3-b0d9-4920-afb0-a81fc6a72b6d', '/demo/vehicles/honda-winner-x-v3-dac-biet-abs-gallery-2.svg', 2, false),
('85ef200b-0109-4b63-8303-1bf19c114acd', 'ae748aa3-b0d9-4920-afb0-a81fc6a72b6d', '/demo/vehicles/honda-winner-x-v3-dac-biet-abs-gallery-3.svg', 3, false),
('2d232293-09b0-4328-9423-ab1a8b5fce92', 'ae748aa3-b0d9-4920-afb0-a81fc6a72b6d', '/demo/vehicles/honda-winner-x-v3-dac-biet-abs-gallery-4.svg', 4, false),
('35f8b544-2fe4-4afd-ad7d-8d0733fb2d7b', 'bddd8244-fd2b-4e25-96a5-e017ad24b8ec', '/demo/vehicles/honda-cb150r-exmotion-cover.svg', 1, true),
('bc456500-fe36-4ab5-813a-0bfa13170f68', 'bddd8244-fd2b-4e25-96a5-e017ad24b8ec', '/demo/vehicles/honda-cb150r-exmotion-gallery-2.svg', 2, false),
('53c21f10-be08-4d97-a82c-c8224ddb5701', 'bddd8244-fd2b-4e25-96a5-e017ad24b8ec', '/demo/vehicles/honda-cb150r-exmotion-gallery-3.svg', 3, false),
('6cd43458-bc7c-4d32-9a94-31756a695ce9', 'bddd8244-fd2b-4e25-96a5-e017ad24b8ec', '/demo/vehicles/honda-cb150r-exmotion-gallery-4.svg', 4, false),
('be6e8a97-bb85-45be-a9c6-dec155c0bc68', 'bddd8244-fd2b-4e25-96a5-e017ad24b8ec', '/demo/vehicles/honda-cb150r-exmotion-gallery-5.svg', 5, false),
('d8d0214a-caf5-43b9-b688-1dd72f412426', '386827fc-3fe4-4aab-b6f4-3c6d09730d7d', '/demo/vehicles/honda-cbr150r-the-thao-abs-cover.svg', 1, true),
('48fcedf1-9fd4-4c3f-bf6c-e723db8725a6', '386827fc-3fe4-4aab-b6f4-3c6d09730d7d', '/demo/vehicles/honda-cbr150r-the-thao-abs-gallery-2.svg', 2, false),
('76e199b0-d98a-4320-bf82-537d896f2a5a', '386827fc-3fe4-4aab-b6f4-3c6d09730d7d', '/demo/vehicles/honda-cbr150r-the-thao-abs-gallery-3.svg', 3, false),
('30ed2998-c359-48b1-9ed9-7ab3900adc3b', '0ed95862-0197-4cf8-9dac-ea7d449b514d', '/demo/vehicles/honda-cb300r-cover.svg', 1, true),
('bef5d7fc-b508-493f-ba4f-2a768d3b7a63', '0ed95862-0197-4cf8-9dac-ea7d449b514d', '/demo/vehicles/honda-cb300r-gallery-2.svg', 2, false),
('e0adc7b5-c7cd-4414-9b96-b4291a09b984', '0ed95862-0197-4cf8-9dac-ea7d449b514d', '/demo/vehicles/honda-cb300r-gallery-3.svg', 3, false),
('5463db05-037a-46ec-a172-739ad07ad19c', '0ed95862-0197-4cf8-9dac-ea7d449b514d', '/demo/vehicles/honda-cb300r-gallery-4.svg', 4, false),
('a65a1447-ef4d-471f-a03c-29b6b98a1487', '8b415dfb-9141-460c-ae25-b60569431ab9', '/demo/vehicles/honda-rebel-300-classic-cover.svg', 1, true),
('5cd0b0e8-6642-43ba-97c2-597faf4549d6', '8b415dfb-9141-460c-ae25-b60569431ab9', '/demo/vehicles/honda-rebel-300-classic-gallery-2.svg', 2, false),
('232acc12-f879-49ff-971a-b3c12e7f503a', '8b415dfb-9141-460c-ae25-b60569431ab9', '/demo/vehicles/honda-rebel-300-classic-gallery-3.svg', 3, false),
('2526c446-6504-43b5-8eba-d5e6b7978464', '8b415dfb-9141-460c-ae25-b60569431ab9', '/demo/vehicles/honda-rebel-300-classic-gallery-4.svg', 4, false),
('761be389-5322-4b88-b12d-2e3400263be0', '8b415dfb-9141-460c-ae25-b60569431ab9', '/demo/vehicles/honda-rebel-300-classic-gallery-5.svg', 5, false),
('34e9895c-8e45-46c9-af0d-2baf29aeed9b', '6a822785-05dd-4606-8aed-40d70e45f32c', '/demo/vehicles/honda-rebel-500-cruiser-cover.svg', 1, true),
('221356c3-f116-470a-be10-7ebeb1205253', '6a822785-05dd-4606-8aed-40d70e45f32c', '/demo/vehicles/honda-rebel-500-cruiser-gallery-2.svg', 2, false),
('0d4a045c-3f13-4574-b52e-c8474186fe75', '6a822785-05dd-4606-8aed-40d70e45f32c', '/demo/vehicles/honda-rebel-500-cruiser-gallery-3.svg', 3, false),
('0403fe7c-4ffe-4dbb-8aea-eb97625458c9', '276625a0-a4ae-4b86-91a9-23eaab5ce9a3', '/demo/vehicles/honda-cb500f-naked-bike-cover.svg', 1, true),
('9d38dfeb-364e-408d-bfa2-12a1173f750c', '276625a0-a4ae-4b86-91a9-23eaab5ce9a3', '/demo/vehicles/honda-cb500f-naked-bike-gallery-2.svg', 2, false),
('de369d10-50ce-4344-9f3b-1ca0adb77d3e', '276625a0-a4ae-4b86-91a9-23eaab5ce9a3', '/demo/vehicles/honda-cb500f-naked-bike-gallery-3.svg', 3, false),
('a6ce5bbc-e3bc-4b2b-a120-efff06f18950', '276625a0-a4ae-4b86-91a9-23eaab5ce9a3', '/demo/vehicles/honda-cb500f-naked-bike-gallery-4.svg', 4, false),
('61935ee5-87ca-4758-a858-d34a0e5a23cf', '623d6583-cfc8-4e34-8492-2217e3feb41b', '/demo/vehicles/honda-cb650r-neo-sports-cafe-cover.svg', 1, true),
('2f5dfe6c-a910-4ede-a47c-f37d33ecb5b7', '623d6583-cfc8-4e34-8492-2217e3feb41b', '/demo/vehicles/honda-cb650r-neo-sports-cafe-gallery-2.svg', 2, false),
('27bc1d87-e557-4698-bbe0-e931ab7b1b67', '623d6583-cfc8-4e34-8492-2217e3feb41b', '/demo/vehicles/honda-cb650r-neo-sports-cafe-gallery-3.svg', 3, false),
('be1c08ef-3197-49c5-a296-800f39229ee0', '623d6583-cfc8-4e34-8492-2217e3feb41b', '/demo/vehicles/honda-cb650r-neo-sports-cafe-gallery-4.svg', 4, false),
('c2fe9d4c-5304-47e1-bbb3-e5ae5d8be05d', '623d6583-cfc8-4e34-8492-2217e3feb41b', '/demo/vehicles/honda-cb650r-neo-sports-cafe-gallery-5.svg', 5, false),
('d27e0ba5-d745-4103-a810-3a17fa7bc88e', '0b45d680-21ec-4c2a-bdad-4deaa803e03d', '/demo/vehicles/honda-wave-alpha-110cc-cu-dep-cover.svg', 1, true),
('9e1a1a3e-47a9-4a15-9e12-f82d3b382b13', '0b45d680-21ec-4c2a-bdad-4deaa803e03d', '/demo/vehicles/honda-wave-alpha-110cc-cu-dep-gallery-2.svg', 2, false),
('7a2dd692-3ebe-44f7-a304-45e9ff999e37', '0b45d680-21ec-4c2a-bdad-4deaa803e03d', '/demo/vehicles/honda-wave-alpha-110cc-cu-dep-gallery-3.svg', 3, false),
('be941f7c-8b09-40e1-922e-b9c79430cf8a', '343c6dec-e831-449d-a347-d98b60dffedc', '/demo/vehicles/honda-vision-110cc-cao-cap-cu-cover.svg', 1, true),
('723ad68e-8580-4572-adc9-72ed4c436275', '343c6dec-e831-449d-a347-d98b60dffedc', '/demo/vehicles/honda-vision-110cc-cao-cap-cu-gallery-2.svg', 2, false),
('5ada60d7-ac0f-4d88-899a-b553153cd2ae', '343c6dec-e831-449d-a347-d98b60dffedc', '/demo/vehicles/honda-vision-110cc-cao-cap-cu-gallery-3.svg', 3, false),
('5383d48d-bd46-4300-b169-d7ea4ea2cd87', '343c6dec-e831-449d-a347-d98b60dffedc', '/demo/vehicles/honda-vision-110cc-cao-cap-cu-gallery-4.svg', 4, false),
('f246711e-d893-489f-b7d0-5d3cc03835b2', 'b46458b8-7deb-4a58-8895-715990621e89', '/demo/vehicles/honda-winner-x-150-cu-gia-re-cover.svg', 1, true),
('8f704ede-7827-431d-a801-7a2feaa334e6', 'b46458b8-7deb-4a58-8895-715990621e89', '/demo/vehicles/honda-winner-x-150-cu-gia-re-gallery-2.svg', 2, false),
('c6d482a6-63fa-4486-9e30-be3bf89a26aa', 'b46458b8-7deb-4a58-8895-715990621e89', '/demo/vehicles/honda-winner-x-150-cu-gia-re-gallery-3.svg', 3, false),
('58af0a41-8704-435b-9137-6fb913144c60', 'b46458b8-7deb-4a58-8895-715990621e89', '/demo/vehicles/honda-winner-x-150-cu-gia-re-gallery-4.svg', 4, false),
('b589844f-05db-48f3-b7fe-d47147bf0b03', 'b46458b8-7deb-4a58-8895-715990621e89', '/demo/vehicles/honda-winner-x-150-cu-gia-re-gallery-5.svg', 5, false),
('40923c79-40d3-468e-8561-8b480cf97648', '6a91223d-4c73-4fd9-9edc-69725b4507c9', '/demo/vehicles/honda-air-blade-125-cu-doi-2018-cover.svg', 1, true),
('95e3f436-b417-422a-bd65-42146b0beaf2', '6a91223d-4c73-4fd9-9edc-69725b4507c9', '/demo/vehicles/honda-air-blade-125-cu-doi-2018-gallery-2.svg', 2, false),
('651cc672-4ec9-463a-a2cc-9a27115641f8', '6a91223d-4c73-4fd9-9edc-69725b4507c9', '/demo/vehicles/honda-air-blade-125-cu-doi-2018-gallery-3.svg', 3, false),
('4252e958-bee0-48b3-8ead-10c5754a5d4a', 'a09f1370-0201-4a40-93c4-2c1a2130b6ec', '/demo/vehicles/yamaha-janus-125cc-tieu-chuan-cover.svg', 1, true),
('47a53ee6-b7e4-4946-8849-85184f1157d4', 'a09f1370-0201-4a40-93c4-2c1a2130b6ec', '/demo/vehicles/yamaha-janus-125cc-tieu-chuan-gallery-2.svg', 2, false),
('8d505ef9-bbd0-422d-988d-c5d3919de264', 'a09f1370-0201-4a40-93c4-2c1a2130b6ec', '/demo/vehicles/yamaha-janus-125cc-tieu-chuan-gallery-3.svg', 3, false),
('31f092e5-e5ae-4bc0-8f38-4a209b64a2e5', 'a09f1370-0201-4a40-93c4-2c1a2130b6ec', '/demo/vehicles/yamaha-janus-125cc-tieu-chuan-gallery-4.svg', 4, false),
('7d848807-1f41-4ce8-bd0e-dcbf37e9202a', '2db000a8-04e5-4e30-aed9-81d4c8c40625', '/demo/vehicles/yamaha-grande-125cc-blue-core-hybrid-cover.svg', 1, true),
('d4e5ab72-0734-4495-a07b-53be8fb2b14a', '2db000a8-04e5-4e30-aed9-81d4c8c40625', '/demo/vehicles/yamaha-grande-125cc-blue-core-hybrid-gallery-2.svg', 2, false),
('077061a9-5ea5-4da8-9b05-d1ccccf7f6b0', '2db000a8-04e5-4e30-aed9-81d4c8c40625', '/demo/vehicles/yamaha-grande-125cc-blue-core-hybrid-gallery-3.svg', 3, false),
('315a4d8b-e160-48fe-8d6a-c75951159c8c', '2db000a8-04e5-4e30-aed9-81d4c8c40625', '/demo/vehicles/yamaha-grande-125cc-blue-core-hybrid-gallery-4.svg', 4, false),
('fd37d2e2-ff9f-4256-8efb-eb3283e11a27', '2db000a8-04e5-4e30-aed9-81d4c8c40625', '/demo/vehicles/yamaha-grande-125cc-blue-core-hybrid-gallery-5.svg', 5, false),
('c1d6ad39-8539-4901-b6db-ff6dddab2358', '8d0b4d65-1e44-4c9d-b763-26a63c0155be', '/demo/vehicles/yamaha-latte-125cc-thoi-trang-cover.svg', 1, true),
('afad9265-797b-4cf6-8525-196cfe59dcce', '8d0b4d65-1e44-4c9d-b763-26a63c0155be', '/demo/vehicles/yamaha-latte-125cc-thoi-trang-gallery-2.svg', 2, false),
('a65795a3-5b83-4594-a542-d7c1cf50acfb', '8d0b4d65-1e44-4c9d-b763-26a63c0155be', '/demo/vehicles/yamaha-latte-125cc-thoi-trang-gallery-3.svg', 3, false),
('685604cf-797e-4ad7-afe1-8a16fc5538d0', '4f43621d-ce88-4737-8371-e6f570ceaa27', '/demo/vehicles/yamaha-freego-125cc-dac-biet-abs-cover.svg', 1, true),
('af944353-6ec4-4212-8ba3-65d3d2cf8bde', '4f43621d-ce88-4737-8371-e6f570ceaa27', '/demo/vehicles/yamaha-freego-125cc-dac-biet-abs-gallery-2.svg', 2, false),
('2a79924f-98e1-46e1-8dcd-84f4a909b6df', '4f43621d-ce88-4737-8371-e6f570ceaa27', '/demo/vehicles/yamaha-freego-125cc-dac-biet-abs-gallery-3.svg', 3, false),
('ccc1b0fa-a7d6-4c0b-b7dc-82e59842e984', '4f43621d-ce88-4737-8371-e6f570ceaa27', '/demo/vehicles/yamaha-freego-125cc-dac-biet-abs-gallery-4.svg', 4, false),
('ced1baf5-242e-4bb8-aab4-257a2a7387ea', 'ab01c1e8-87ed-4da4-83b8-e00df6d28b46', '/demo/vehicles/yamaha-nvx-155-v2-the-the-he-moi-abs-cover.svg', 1, true),
('9b0a35f3-e577-4583-b500-e7a72b22f8da', 'ab01c1e8-87ed-4da4-83b8-e00df6d28b46', '/demo/vehicles/yamaha-nvx-155-v2-the-the-he-moi-abs-gallery-2.svg', 2, false),
('5609685b-45ed-4860-ad7e-eebc2f99e3d7', 'ab01c1e8-87ed-4da4-83b8-e00df6d28b46', '/demo/vehicles/yamaha-nvx-155-v2-the-the-he-moi-abs-gallery-3.svg', 3, false),
('85773f5c-ae9b-4bee-954d-1e9f13fa2fe9', 'ab01c1e8-87ed-4da4-83b8-e00df6d28b46', '/demo/vehicles/yamaha-nvx-155-v2-the-the-he-moi-abs-gallery-4.svg', 4, false),
('6c5c6759-932d-48e2-b7bb-b809510bf038', 'ab01c1e8-87ed-4da4-83b8-e00df6d28b46', '/demo/vehicles/yamaha-nvx-155-v2-the-the-he-moi-abs-gallery-5.svg', 5, false),
('5aa9ae33-84b4-4c83-ba71-b88b45f6692f', '7a35c1d5-cf59-42ce-bd1f-0b08d25b8f40', '/demo/vehicles/yamaha-sirius-110cc-phanh-co-cover.svg', 1, true),
('09fa7b89-fab8-4e22-bce0-79ca3f8ec5b7', '7a35c1d5-cf59-42ce-bd1f-0b08d25b8f40', '/demo/vehicles/yamaha-sirius-110cc-phanh-co-gallery-2.svg', 2, false),
('0b3c968f-6d11-413d-b19d-18c05e52878d', '7a35c1d5-cf59-42ce-bd1f-0b08d25b8f40', '/demo/vehicles/yamaha-sirius-110cc-phanh-co-gallery-3.svg', 3, false),
('215f434d-8ba5-40fe-8f72-799ccc75b093', 'd0308b8f-6524-461a-922f-58c11cc8ed9b', '/demo/vehicles/yamaha-sirius-fi-115cc-phanh-dia-vanh-duc-cover.svg', 1, true),
('4e9d9a23-2033-4fc1-9fc5-36802bd93976', 'd0308b8f-6524-461a-922f-58c11cc8ed9b', '/demo/vehicles/yamaha-sirius-fi-115cc-phanh-dia-vanh-duc-gallery-2.svg', 2, false),
('25696b42-8dcf-40d7-8e19-807270d74124', 'd0308b8f-6524-461a-922f-58c11cc8ed9b', '/demo/vehicles/yamaha-sirius-fi-115cc-phanh-dia-vanh-duc-gallery-3.svg', 3, false),
('c43ffc93-c0a2-4220-8c64-44bc87e6a9a0', 'd0308b8f-6524-461a-922f-58c11cc8ed9b', '/demo/vehicles/yamaha-sirius-fi-115cc-phanh-dia-vanh-duc-gallery-4.svg', 4, false),
('2fb7b0af-0fef-4cc7-9076-033985a9bded', '32d6b456-4958-46c0-b786-1817da554c61', '/demo/vehicles/yamaha-jupiter-finn-115cc-phanh-ubs-cover.svg', 1, true),
('26b70b3b-d085-45c3-a9ee-53fa9fe550b2', '32d6b456-4958-46c0-b786-1817da554c61', '/demo/vehicles/yamaha-jupiter-finn-115cc-phanh-ubs-gallery-2.svg', 2, false),
('b048ca1f-0d6d-41ff-bdf2-2ea1cc741426', '32d6b456-4958-46c0-b786-1817da554c61', '/demo/vehicles/yamaha-jupiter-finn-115cc-phanh-ubs-gallery-3.svg', 3, false),
('bbded546-35b9-41f8-9f9f-57b30e2c8396', '32d6b456-4958-46c0-b786-1817da554c61', '/demo/vehicles/yamaha-jupiter-finn-115cc-phanh-ubs-gallery-4.svg', 4, false),
('26b0845d-ba7c-46a8-9723-f7d9ab48d43c', '32d6b456-4958-46c0-b786-1817da554c61', '/demo/vehicles/yamaha-jupiter-finn-115cc-phanh-ubs-gallery-5.svg', 5, false),
('f646b63d-fe33-4cef-bfdf-e065e9bc7bc1', 'ba90eab9-0ed3-4e94-8e9c-4a196c09f17d', '/demo/vehicles/yamaha-exciter-155-vva-cao-cap-abs-cover.svg', 1, true),
('c6442673-8166-4c3f-9154-ba2f62aeb79c', 'ba90eab9-0ed3-4e94-8e9c-4a196c09f17d', '/demo/vehicles/yamaha-exciter-155-vva-cao-cap-abs-gallery-2.svg', 2, false),
('b61e8f09-028a-4d9b-9c36-79935582018d', 'ba90eab9-0ed3-4e94-8e9c-4a196c09f17d', '/demo/vehicles/yamaha-exciter-155-vva-cao-cap-abs-gallery-3.svg', 3, false),
('560b909f-c6e4-453c-b000-2934176e8c7a', '789c9888-0186-4026-a126-a1dc5ac68c7f', '/demo/vehicles/yamaha-exciter-150-rc-phien-ban-2025-cover.svg', 1, true),
('9bccb9b0-92f7-496e-a74b-0f7368a3e60d', '789c9888-0186-4026-a126-a1dc5ac68c7f', '/demo/vehicles/yamaha-exciter-150-rc-phien-ban-2025-gallery-2.svg', 2, false),
('596b2673-dfee-4479-87af-b174f78843db', '789c9888-0186-4026-a126-a1dc5ac68c7f', '/demo/vehicles/yamaha-exciter-150-rc-phien-ban-2025-gallery-3.svg', 3, false),
('eac4b508-924f-48ed-be21-41244fef1387', '789c9888-0186-4026-a126-a1dc5ac68c7f', '/demo/vehicles/yamaha-exciter-150-rc-phien-ban-2025-gallery-4.svg', 4, false),
('ac533057-6408-413a-b395-c26f6a0d4eb1', 'fcadae64-3e50-4f83-b2d8-478c5ee1f635', '/demo/vehicles/yamaha-yzf-r15-v4-the-thao-cover.svg', 1, true),
('437a734b-4570-4763-9f16-de74159f0f3c', 'fcadae64-3e50-4f83-b2d8-478c5ee1f635', '/demo/vehicles/yamaha-yzf-r15-v4-the-thao-gallery-2.svg', 2, false),
('9c8dde9d-cc5d-4df5-9520-f44ecfa546ae', 'fcadae64-3e50-4f83-b2d8-478c5ee1f635', '/demo/vehicles/yamaha-yzf-r15-v4-the-thao-gallery-3.svg', 3, false),
('f21a9c1f-b9e4-48d9-93db-170ad1e1396f', 'fcadae64-3e50-4f83-b2d8-478c5ee1f635', '/demo/vehicles/yamaha-yzf-r15-v4-the-thao-gallery-4.svg', 4, false),
('6db057d5-2a5d-4be6-ac96-0e6bfa45d597', 'fcadae64-3e50-4f83-b2d8-478c5ee1f635', '/demo/vehicles/yamaha-yzf-r15-v4-the-thao-gallery-5.svg', 5, false),
('36bb4c17-471d-43b6-b48c-3458b5dc3676', '33681256-1331-4d2c-9a0d-a543f8061e78', '/demo/vehicles/yamaha-mt-15-naked-streetfighter-cover.svg', 1, true),
('2e4074d9-0e7d-449e-8607-7a345243940a', '33681256-1331-4d2c-9a0d-a543f8061e78', '/demo/vehicles/yamaha-mt-15-naked-streetfighter-gallery-2.svg', 2, false),
('e80fffd5-0971-49ee-aac9-8188ef8c0563', '33681256-1331-4d2c-9a0d-a543f8061e78', '/demo/vehicles/yamaha-mt-15-naked-streetfighter-gallery-3.svg', 3, false),
('32235ce0-3400-41c5-90b9-b3523450189d', '52b5ad0c-b6bf-43ef-9d8d-c24eae07d320', '/demo/vehicles/yamaha-xs155r-neo-retro-cover.svg', 1, true),
('ffea8078-7bd4-4b87-a2d3-48218e169060', '52b5ad0c-b6bf-43ef-9d8d-c24eae07d320', '/demo/vehicles/yamaha-xs155r-neo-retro-gallery-2.svg', 2, false),
('bdb5188a-9fd5-454e-8ab0-267b8a4154bb', '52b5ad0c-b6bf-43ef-9d8d-c24eae07d320', '/demo/vehicles/yamaha-xs155r-neo-retro-gallery-3.svg', 3, false),
('6b998297-ba6a-4042-8cd1-c88e0e2909e0', '52b5ad0c-b6bf-43ef-9d8d-c24eae07d320', '/demo/vehicles/yamaha-xs155r-neo-retro-gallery-4.svg', 4, false),
('2c630c35-448d-470d-9d20-8accf1fb4b08', '213e71bc-02ac-4499-b377-9145a8d0f9f5', '/demo/vehicles/yamaha-yzf-r3-sportbike-cover.svg', 1, true),
('8f919a72-a55c-4729-bbc1-6b3c995a016b', '213e71bc-02ac-4499-b377-9145a8d0f9f5', '/demo/vehicles/yamaha-yzf-r3-sportbike-gallery-2.svg', 2, false),
('4c00d16d-755e-4254-8871-2d3854317633', '213e71bc-02ac-4499-b377-9145a8d0f9f5', '/demo/vehicles/yamaha-yzf-r3-sportbike-gallery-3.svg', 3, false),
('bad0ca8d-b04d-4167-9fec-3b8744150d61', '213e71bc-02ac-4499-b377-9145a8d0f9f5', '/demo/vehicles/yamaha-yzf-r3-sportbike-gallery-4.svg', 4, false),
('9e7ae348-cad9-4f36-81ca-be256f1f7b7f', '213e71bc-02ac-4499-b377-9145a8d0f9f5', '/demo/vehicles/yamaha-yzf-r3-sportbike-gallery-5.svg', 5, false),
('1dccffdd-4270-4c67-ba8b-fa161774998a', 'b0b3d30d-34f4-484f-b5d9-f829dac2fa73', '/demo/vehicles/yamaha-mt-03-naked-bike-cover.svg', 1, true),
('cb612fa5-2ac3-4c95-8538-80f95508565e', 'b0b3d30d-34f4-484f-b5d9-f829dac2fa73', '/demo/vehicles/yamaha-mt-03-naked-bike-gallery-2.svg', 2, false),
('7fbefa14-88cb-4f8c-a143-1c36e56561fc', 'b0b3d30d-34f4-484f-b5d9-f829dac2fa73', '/demo/vehicles/yamaha-mt-03-naked-bike-gallery-3.svg', 3, false),
('81b18531-3094-4705-baa0-612047792682', '16a05ba9-f2af-4e74-9e32-440c4a38befc', '/demo/vehicles/yamaha-mt-07-beast-cover.svg', 1, true),
('a848add0-04c9-437e-a3b7-8bbf4b72912d', '16a05ba9-f2af-4e74-9e32-440c4a38befc', '/demo/vehicles/yamaha-mt-07-beast-gallery-2.svg', 2, false),
('48cdfafe-aa2a-401e-b209-d2115384064f', '16a05ba9-f2af-4e74-9e32-440c4a38befc', '/demo/vehicles/yamaha-mt-07-beast-gallery-3.svg', 3, false),
('36ec968d-ccef-4f19-b881-ec9c1e6d6860', '16a05ba9-f2af-4e74-9e32-440c4a38befc', '/demo/vehicles/yamaha-mt-07-beast-gallery-4.svg', 4, false),
('15749630-e2b8-4245-9b04-321bd7982ec6', '979fe41c-b9f8-4379-9715-eaab629215c3', '/demo/vehicles/yamaha-yzf-r7-racing-cover.svg', 1, true),
('8ab22c7e-7d4d-4d4f-973f-3a32f75d8d45', '979fe41c-b9f8-4379-9715-eaab629215c3', '/demo/vehicles/yamaha-yzf-r7-racing-gallery-2.svg', 2, false),
('3757359b-e778-4dd2-959f-604ba9bc61bb', '979fe41c-b9f8-4379-9715-eaab629215c3', '/demo/vehicles/yamaha-yzf-r7-racing-gallery-3.svg', 3, false),
('df339d3c-7888-4957-a0c1-5aedb58b4ef4', '979fe41c-b9f8-4379-9715-eaab629215c3', '/demo/vehicles/yamaha-yzf-r7-racing-gallery-4.svg', 4, false),
('e928c314-b94a-4573-9337-5584bdf7263c', '979fe41c-b9f8-4379-9715-eaab629215c3', '/demo/vehicles/yamaha-yzf-r7-racing-gallery-5.svg', 5, false),
('de5489cd-e370-4dd0-a61f-eb9d033a57e8', 'f44213ea-be36-4c01-aa2a-4bff3c8f816a', '/demo/vehicles/yamaha-exciter-150-cu-doi-2018-cover.svg', 1, true),
('c6d12752-48a0-4b03-9c0e-cffba298400e', 'f44213ea-be36-4c01-aa2a-4bff3c8f816a', '/demo/vehicles/yamaha-exciter-150-cu-doi-2018-gallery-2.svg', 2, false),
('f7a71577-beac-4110-a732-7f290cb1d0c4', 'f44213ea-be36-4c01-aa2a-4bff3c8f816a', '/demo/vehicles/yamaha-exciter-150-cu-doi-2018-gallery-3.svg', 3, false),
('681f9290-1c84-49ec-9af5-78a5f1841dc0', 'ff9af8c2-7540-4977-b473-c58a1b1bfcc4', '/demo/vehicles/yamaha-sirius-110-cu-hoc-sinh-cover.svg', 1, true),
('0a9d739a-e4a9-4469-b294-e6f15d7b2230', 'ff9af8c2-7540-4977-b473-c58a1b1bfcc4', '/demo/vehicles/yamaha-sirius-110-cu-hoc-sinh-gallery-2.svg', 2, false),
('2b70a10c-19b3-4cdd-a4bc-24eb97d98863', 'ff9af8c2-7540-4977-b473-c58a1b1bfcc4', '/demo/vehicles/yamaha-sirius-110-cu-hoc-sinh-gallery-3.svg', 3, false),
('42ed059e-630e-4cac-a647-3124b8c5a451', 'ff9af8c2-7540-4977-b473-c58a1b1bfcc4', '/demo/vehicles/yamaha-sirius-110-cu-hoc-sinh-gallery-4.svg', 4, false),
('412695ce-6ecf-4077-b021-0038ff9503a9', '67dab0bc-357c-4d72-a613-55e992de8f38', '/demo/vehicles/yamaha-nvx-155-v1-abs-cu-cao-cap-cover.svg', 1, true),
('5b029df0-b794-4d8a-b020-767a7c85916d', '67dab0bc-357c-4d72-a613-55e992de8f38', '/demo/vehicles/yamaha-nvx-155-v1-abs-cu-cao-cap-gallery-2.svg', 2, false),
('3c52d42b-03eb-4dd8-9296-96870cab2ce5', '67dab0bc-357c-4d72-a613-55e992de8f38', '/demo/vehicles/yamaha-nvx-155-v1-abs-cu-cao-cap-gallery-3.svg', 3, false),
('571e13b7-b478-478e-b31a-fa31d291d866', '67dab0bc-357c-4d72-a613-55e992de8f38', '/demo/vehicles/yamaha-nvx-155-v1-abs-cu-cao-cap-gallery-4.svg', 4, false),
('13ba31dd-cfd4-4f7f-aaac-c82e43803a3b', '67dab0bc-357c-4d72-a613-55e992de8f38', '/demo/vehicles/yamaha-nvx-155-v1-abs-cu-cao-cap-gallery-5.svg', 5, false),
('e8af99de-c685-4286-91ab-79daa4fe4198', '263179dc-4646-426d-8809-53e483ebb147', '/demo/vehicles/suzuki-burgman-street-125-cover.svg', 1, true),
('804369b8-9c07-41fb-a166-c79e180ca314', '263179dc-4646-426d-8809-53e483ebb147', '/demo/vehicles/suzuki-burgman-street-125-gallery-2.svg', 2, false),
('ae04b634-9524-44bf-a6c6-da501df94808', '263179dc-4646-426d-8809-53e483ebb147', '/demo/vehicles/suzuki-burgman-street-125-gallery-3.svg', 3, false),
('91de963f-ee67-4406-8547-3a5af1712ce1', 'aac690c6-c418-43c3-a9ae-76f4cbc0d7ad', '/demo/vehicles/suzuki-raider-r150-fi-phien-ban-moi-cover.svg', 1, true),
('b508e162-c535-4983-906e-676ce3fe43ab', 'aac690c6-c418-43c3-a9ae-76f4cbc0d7ad', '/demo/vehicles/suzuki-raider-r150-fi-phien-ban-moi-gallery-2.svg', 2, false),
('b133b757-95df-4299-981e-2857368f2111', 'aac690c6-c418-43c3-a9ae-76f4cbc0d7ad', '/demo/vehicles/suzuki-raider-r150-fi-phien-ban-moi-gallery-3.svg', 3, false),
('9a048367-983f-4a6d-bada-df8d6c4adf86', 'aac690c6-c418-43c3-a9ae-76f4cbc0d7ad', '/demo/vehicles/suzuki-raider-r150-fi-phien-ban-moi-gallery-4.svg', 4, false),
('a1844e54-1fb3-4ebc-bb3c-86c14df776b3', '409ed3d4-b5ba-4ed3-8264-df4041cec347', '/demo/vehicles/suzuki-satria-f150-nhap-khau-indonesia-cover.svg', 1, true),
('e0157841-c3f0-44c4-b552-884090df1030', '409ed3d4-b5ba-4ed3-8264-df4041cec347', '/demo/vehicles/suzuki-satria-f150-nhap-khau-indonesia-gallery-2.svg', 2, false),
('6c176c57-33c1-44b1-8980-5914730bb981', '409ed3d4-b5ba-4ed3-8264-df4041cec347', '/demo/vehicles/suzuki-satria-f150-nhap-khau-indonesia-gallery-3.svg', 3, false),
('79106094-156c-46b4-bbb0-4ac4151c9252', '409ed3d4-b5ba-4ed3-8264-df4041cec347', '/demo/vehicles/suzuki-satria-f150-nhap-khau-indonesia-gallery-4.svg', 4, false),
('c9aad900-f546-4fa7-9d0d-41f43be39797', '409ed3d4-b5ba-4ed3-8264-df4041cec347', '/demo/vehicles/suzuki-satria-f150-nhap-khau-indonesia-gallery-5.svg', 5, false),
('99bd0e31-fb5a-4492-9be0-c3c721591f78', '96368194-f31d-4622-aae1-a6b277b30861', '/demo/vehicles/suzuki-gsx-r150-sportbike-cover.svg', 1, true),
('8e5b9a36-6ab9-436d-ad22-d202983fd208', '96368194-f31d-4622-aae1-a6b277b30861', '/demo/vehicles/suzuki-gsx-r150-sportbike-gallery-2.svg', 2, false),
('c26ccc01-d44e-44d5-a48c-1bfec5a979bf', '96368194-f31d-4622-aae1-a6b277b30861', '/demo/vehicles/suzuki-gsx-r150-sportbike-gallery-3.svg', 3, false),
('a62bcb62-f5c2-47b1-b72b-475f27466c65', '69fda3bc-a543-43fa-af61-5c3a97db067b', '/demo/vehicles/suzuki-gsx-s150-naked-bike-cover.svg', 1, true),
('17e6e911-d974-490f-9e53-a2cc771a5310', '69fda3bc-a543-43fa-af61-5c3a97db067b', '/demo/vehicles/suzuki-gsx-s150-naked-bike-gallery-2.svg', 2, false),
('55c1f3ba-4a4b-4b0a-b943-7d6459b1b595', '69fda3bc-a543-43fa-af61-5c3a97db067b', '/demo/vehicles/suzuki-gsx-s150-naked-bike-gallery-3.svg', 3, false),
('58771610-0b44-4a5d-adc7-a684cc93348f', '69fda3bc-a543-43fa-af61-5c3a97db067b', '/demo/vehicles/suzuki-gsx-s150-naked-bike-gallery-4.svg', 4, false),
('2db3b568-fca8-48b8-b757-d593538082f9', 'a7b32ca6-562d-4f0e-9c71-2179502d085c', '/demo/vehicles/suzuki-v-strom-250sx-adventure-cover.svg', 1, true),
('6481712d-7192-4663-8ce9-b26f31a3caee', 'a7b32ca6-562d-4f0e-9c71-2179502d085c', '/demo/vehicles/suzuki-v-strom-250sx-adventure-gallery-2.svg', 2, false),
('6671066f-4870-494a-8ec2-52aa2d8b5544', 'a7b32ca6-562d-4f0e-9c71-2179502d085c', '/demo/vehicles/suzuki-v-strom-250sx-adventure-gallery-3.svg', 3, false),
('b07806d8-a8cd-47e8-a3ba-6750ec8202a8', 'a7b32ca6-562d-4f0e-9c71-2179502d085c', '/demo/vehicles/suzuki-v-strom-250sx-adventure-gallery-4.svg', 4, false),
('2f1357d2-203b-4a8e-b268-b63093b51f43', 'a7b32ca6-562d-4f0e-9c71-2179502d085c', '/demo/vehicles/suzuki-v-strom-250sx-adventure-gallery-5.svg', 5, false),
('62bee4f6-3eea-4fdf-9834-2626841780b2', 'e13ba4f1-02f2-45ec-ba28-f809e3588147', '/demo/vehicles/suzuki-gixxer-sf250-sport-cover.svg', 1, true),
('9e3ed15b-aa09-4fdf-ae78-56b77b47eade', 'e13ba4f1-02f2-45ec-ba28-f809e3588147', '/demo/vehicles/suzuki-gixxer-sf250-sport-gallery-2.svg', 2, false),
('02b69e14-67f1-4ce6-a94c-a376fff89190', 'e13ba4f1-02f2-45ec-ba28-f809e3588147', '/demo/vehicles/suzuki-gixxer-sf250-sport-gallery-3.svg', 3, false),
('10290d1f-a2a1-47a7-85ec-366336b27078', '6b39aa7e-6af8-4fa1-9147-99f111fe9453', '/demo/vehicles/suzuki-hayabusa-than-gio-the-he-3-cover.svg', 1, true),
('e770014a-3459-4139-9d67-f8f9b794bf49', '6b39aa7e-6af8-4fa1-9147-99f111fe9453', '/demo/vehicles/suzuki-hayabusa-than-gio-the-he-3-gallery-2.svg', 2, false),
('564b12d7-f0d1-40b8-a9e1-4e442ddd5db1', '6b39aa7e-6af8-4fa1-9147-99f111fe9453', '/demo/vehicles/suzuki-hayabusa-than-gio-the-he-3-gallery-3.svg', 3, false),
('f4a11b73-26d9-4da6-b0c8-6111d4260345', '6b39aa7e-6af8-4fa1-9147-99f111fe9453', '/demo/vehicles/suzuki-hayabusa-than-gio-the-he-3-gallery-4.svg', 4, false),
('bc7888db-99a9-40d3-8bf6-a4672c0f3902', 'f57536dc-8b6d-4d70-bf6e-141fe2ca9f2b', '/demo/vehicles/suzuki-raider-r150-cu-may-du-cover.svg', 1, true),
('12c2d065-5ed1-4ea1-b662-6378c94ae653', 'f57536dc-8b6d-4d70-bf6e-141fe2ca9f2b', '/demo/vehicles/suzuki-raider-r150-cu-may-du-gallery-2.svg', 2, false),
('1d9f497d-88f6-4e43-beef-635a743a0c0b', 'f57536dc-8b6d-4d70-bf6e-141fe2ca9f2b', '/demo/vehicles/suzuki-raider-r150-cu-may-du-gallery-3.svg', 3, false),
('377e537e-3fd8-45a5-adfa-b9b53b751af5', 'f57536dc-8b6d-4d70-bf6e-141fe2ca9f2b', '/demo/vehicles/suzuki-raider-r150-cu-may-du-gallery-4.svg', 4, false),
('b81b2a5b-871c-4f18-b9ed-400c94bb8955', 'f57536dc-8b6d-4d70-bf6e-141fe2ca9f2b', '/demo/vehicles/suzuki-raider-r150-cu-may-du-gallery-5.svg', 5, false),
('f21f298c-4bba-412d-8c0e-080e46cbdca5', '3ca8bdff-7a87-4f34-9a3d-044c129c02dc', '/demo/vehicles/suzuki-satria-f150-cu-nhap-indo-cover.svg', 1, true),
('f64200e0-8aea-4953-b983-2f564d5708ac', '3ca8bdff-7a87-4f34-9a3d-044c129c02dc', '/demo/vehicles/suzuki-satria-f150-cu-nhap-indo-gallery-2.svg', 2, false),
('f65aba45-f14b-4603-9a39-afb2e5847c0c', '3ca8bdff-7a87-4f34-9a3d-044c129c02dc', '/demo/vehicles/suzuki-satria-f150-cu-nhap-indo-gallery-3.svg', 3, false),
('9d063fa4-2683-4fee-82f4-5ae3aeca39bd', 'a16ebddf-b817-4cd1-8152-11c03f7c7a70', '/demo/vehicles/sym-attila-125-new-cover.svg', 1, true),
('68391042-a0b2-4743-8135-79195b889644', 'a16ebddf-b817-4cd1-8152-11c03f7c7a70', '/demo/vehicles/sym-attila-125-new-gallery-2.svg', 2, false),
('1e6b424c-4e51-42e6-87e5-016c98d1c117', 'a16ebddf-b817-4cd1-8152-11c03f7c7a70', '/demo/vehicles/sym-attila-125-new-gallery-3.svg', 3, false),
('6af36815-b8b8-44b5-830f-778ed9e8fecd', 'a16ebddf-b817-4cd1-8152-11c03f7c7a70', '/demo/vehicles/sym-attila-125-new-gallery-4.svg', 4, false),
('0313852b-5e52-4e54-aa9d-376b654ce4cd', '8f0727e5-bf78-456d-a021-026318df6b4b', '/demo/vehicles/sym-passing-50cc-cho-hoc-sinh-cover.svg', 1, true),
('262891c6-c60c-4db3-a38f-2a34278fffd1', '8f0727e5-bf78-456d-a021-026318df6b4b', '/demo/vehicles/sym-passing-50cc-cho-hoc-sinh-gallery-2.svg', 2, false),
('8fecf0dd-f10a-432b-b387-6c058264b9f9', '8f0727e5-bf78-456d-a021-026318df6b4b', '/demo/vehicles/sym-passing-50cc-cho-hoc-sinh-gallery-3.svg', 3, false),
('8d3d1f5b-ae72-4298-9951-a7dddb68c752', '8f0727e5-bf78-456d-a021-026318df6b4b', '/demo/vehicles/sym-passing-50cc-cho-hoc-sinh-gallery-4.svg', 4, false),
('e2714ad1-bb91-4a6f-ace7-206e7fffdfb9', '8f0727e5-bf78-456d-a021-026318df6b4b', '/demo/vehicles/sym-passing-50cc-cho-hoc-sinh-gallery-5.svg', 5, false),
('74831048-17ff-43d8-9578-565a22673162', '159ac648-a929-4c72-be08-50f0603e6c80', '/demo/vehicles/sym-elegant-50cc-the-thao-cover.svg', 1, true),
('2d5c806e-734d-4c6b-b6eb-76b310684577', '159ac648-a929-4c72-be08-50f0603e6c80', '/demo/vehicles/sym-elegant-50cc-the-thao-gallery-2.svg', 2, false),
('4ece6ccb-7d2d-4176-a379-cc16eb34c90c', '159ac648-a929-4c72-be08-50f0603e6c80', '/demo/vehicles/sym-elegant-50cc-the-thao-gallery-3.svg', 3, false),
('609448bc-acd2-4b54-851c-7614ef3355fc', 'fbab03ff-24ac-464a-a8c1-8665ab84f03e', '/demo/vehicles/sym-galaxy-50-vanh-duc-the-thao-cover.svg', 1, true),
('6c6949bc-19cb-452b-94c8-d729405f76e7', 'fbab03ff-24ac-464a-a8c1-8665ab84f03e', '/demo/vehicles/sym-galaxy-50-vanh-duc-the-thao-gallery-2.svg', 2, false),
('8ea5ce72-3107-4afa-9aa9-6252a132a4f0', 'fbab03ff-24ac-464a-a8c1-8665ab84f03e', '/demo/vehicles/sym-galaxy-50-vanh-duc-the-thao-gallery-3.svg', 3, false),
('a88f481c-f17a-48e3-9793-de5890d4a50f', 'fbab03ff-24ac-464a-a8c1-8665ab84f03e', '/demo/vehicles/sym-galaxy-50-vanh-duc-the-thao-gallery-4.svg', 4, false),
('ba92ef29-1fac-4f12-99f8-776b6425f067', '99c8020c-204a-420e-80ff-5984fd538b10', '/demo/vehicles/sym-angela-50cc-danh-cho-nu-cover.svg', 1, true),
('5be0dc18-eec7-4218-8765-2c1a9f9a1f00', '99c8020c-204a-420e-80ff-5984fd538b10', '/demo/vehicles/sym-angela-50cc-danh-cho-nu-gallery-2.svg', 2, false),
('9402142c-924c-4561-b799-b2d313e87cdb', '99c8020c-204a-420e-80ff-5984fd538b10', '/demo/vehicles/sym-angela-50cc-danh-cho-nu-gallery-3.svg', 3, false),
('ae4f7c7e-ea8a-4a3d-b450-b455bd6e2fac', '99c8020c-204a-420e-80ff-5984fd538b10', '/demo/vehicles/sym-angela-50cc-danh-cho-nu-gallery-4.svg', 4, false),
('c118612e-aed1-4abe-9785-c83bd8dd1d3e', '99c8020c-204a-420e-80ff-5984fd538b10', '/demo/vehicles/sym-angela-50cc-danh-cho-nu-gallery-5.svg', 5, false),
('436a564a-656d-43f3-b30a-e731852f2eeb', '25aceaca-90b2-4427-8b02-2f330713bda7', '/demo/vehicles/sym-star-sr-125-con-tay-cover.svg', 1, true),
('ca54b769-2f23-4ae0-b873-b2669272bab8', '25aceaca-90b2-4427-8b02-2f330713bda7', '/demo/vehicles/sym-star-sr-125-con-tay-gallery-2.svg', 2, false),
('89916e4c-66fe-4429-9b0c-d7fdb5ecb47b', '25aceaca-90b2-4427-8b02-2f330713bda7', '/demo/vehicles/sym-star-sr-125-con-tay-gallery-3.svg', 3, false),
('2df6d121-509f-410f-b0e3-c64c5b1cf158', '63aadb8b-a934-436a-b710-58e0358030d7', '/demo/vehicles/piaggio-liberty-125cc-s-one-abs-cover.svg', 1, true),
('9cb69dfb-88ed-439e-b4bd-890c11b391b5', '63aadb8b-a934-436a-b710-58e0358030d7', '/demo/vehicles/piaggio-liberty-125cc-s-one-abs-gallery-2.svg', 2, false),
('c2ad2206-9e09-4514-a93f-bb2d4cb6d277', '63aadb8b-a934-436a-b710-58e0358030d7', '/demo/vehicles/piaggio-liberty-125cc-s-one-abs-gallery-3.svg', 3, false),
('81dfe06c-d775-4b2c-8bc2-e1fc985832e4', '63aadb8b-a934-436a-b710-58e0358030d7', '/demo/vehicles/piaggio-liberty-125cc-s-one-abs-gallery-4.svg', 4, false),
('d0c5029a-22f4-4262-be0e-06917767441e', '19d1fcef-466e-4261-8c7f-085732a40e0a', '/demo/vehicles/piaggio-medley-s-150cc-phanh-abs-dual-cover.svg', 1, true),
('5364f203-7a75-42ee-bfd8-a23da52b8834', '19d1fcef-466e-4261-8c7f-085732a40e0a', '/demo/vehicles/piaggio-medley-s-150cc-phanh-abs-dual-gallery-2.svg', 2, false),
('9bff9249-d865-45f3-9d9c-c7bba1ba988e', '19d1fcef-466e-4261-8c7f-085732a40e0a', '/demo/vehicles/piaggio-medley-s-150cc-phanh-abs-dual-gallery-3.svg', 3, false),
('c7ec99ce-706e-4bc8-8b06-b90e67e9535a', '19d1fcef-466e-4261-8c7f-085732a40e0a', '/demo/vehicles/piaggio-medley-s-150cc-phanh-abs-dual-gallery-4.svg', 4, false),
('9fae0742-e420-4a99-8044-812f9db1fa1d', '19d1fcef-466e-4261-8c7f-085732a40e0a', '/demo/vehicles/piaggio-medley-s-150cc-phanh-abs-dual-gallery-5.svg', 5, false),
('00dc78e6-049f-4e0f-8da0-814e3ac5c04b', '41a59baf-df14-46e6-8880-e392a719b9cf', '/demo/vehicles/piaggio-liberty-125-i-get-cu-dep-cover.svg', 1, true),
('bc008242-b719-48db-9ecb-9c29dc65cb22', '41a59baf-df14-46e6-8880-e392a719b9cf', '/demo/vehicles/piaggio-liberty-125-i-get-cu-dep-gallery-2.svg', 2, false),
('cc5e6a1b-e445-4c13-82f1-beda7385583e', '41a59baf-df14-46e6-8880-e392a719b9cf', '/demo/vehicles/piaggio-liberty-125-i-get-cu-dep-gallery-3.svg', 3, false),
('19323477-1f00-49c5-88c1-de561f59e6ba', '009fcc31-6356-4cd1-95aa-f89f4f728969', '/demo/vehicles/vespa-primavera-125cc-i-get-abs-cover.svg', 1, true),
('01ead24f-cd1e-42ce-b7c6-c29fc8d55e2a', '009fcc31-6356-4cd1-95aa-f89f4f728969', '/demo/vehicles/vespa-primavera-125cc-i-get-abs-gallery-2.svg', 2, false),
('e8e66fbe-1474-40e5-bca8-290107ed82e2', '009fcc31-6356-4cd1-95aa-f89f4f728969', '/demo/vehicles/vespa-primavera-125cc-i-get-abs-gallery-3.svg', 3, false),
('2ee20261-8f04-455a-af91-81271ef510f9', '009fcc31-6356-4cd1-95aa-f89f4f728969', '/demo/vehicles/vespa-primavera-125cc-i-get-abs-gallery-4.svg', 4, false),
('af6ca7fc-d049-4314-90ff-f3096dc98319', 'a95fda59-28dc-4866-b52e-80e84730c664', '/demo/vehicles/vespa-sprint-s-125cc-the-thao-abs-cover.svg', 1, true),
('8fe537f9-144b-4b6f-86bf-e67bf077b4c4', 'a95fda59-28dc-4866-b52e-80e84730c664', '/demo/vehicles/vespa-sprint-s-125cc-the-thao-abs-gallery-2.svg', 2, false),
('f5f32706-9f68-45ea-a7fa-55ac1065d73c', 'a95fda59-28dc-4866-b52e-80e84730c664', '/demo/vehicles/vespa-sprint-s-125cc-the-thao-abs-gallery-3.svg', 3, false),
('063a12db-6c14-439f-8226-7d8f60b2e500', 'a95fda59-28dc-4866-b52e-80e84730c664', '/demo/vehicles/vespa-sprint-s-125cc-the-thao-abs-gallery-4.svg', 4, false),
('5046d8f3-8fbd-44db-88e1-b794fcdcc6e2', 'a95fda59-28dc-4866-b52e-80e84730c664', '/demo/vehicles/vespa-sprint-s-125cc-the-thao-abs-gallery-5.svg', 5, false),
('4f11fdf2-5f07-4953-8333-f29b9bd0296b', 'ae485dc9-8c2e-48ef-bdd1-0d31447b6596', '/demo/vehicles/vespa-gts-super-150cc-cuc-sang-cover.svg', 1, true),
('e941e5bb-acf6-4e4f-952b-d16b22d2c871', 'ae485dc9-8c2e-48ef-bdd1-0d31447b6596', '/demo/vehicles/vespa-gts-super-150cc-cuc-sang-gallery-2.svg', 2, false),
('5faac4b0-ac70-41ce-b688-738e13a5cae4', 'ae485dc9-8c2e-48ef-bdd1-0d31447b6596', '/demo/vehicles/vespa-gts-super-150cc-cuc-sang-gallery-3.svg', 3, false),
('e563bcac-0e8a-4a4c-a330-65b4c06248ed', 'f894851e-9124-4b24-9b18-77745f9b7858', '/demo/vehicles/vespa-gts-300-super-tech-cover.svg', 1, true),
('ecd6a4d6-b4b1-46a6-b007-736d79fb2899', 'f894851e-9124-4b24-9b18-77745f9b7858', '/demo/vehicles/vespa-gts-300-super-tech-gallery-2.svg', 2, false),
('35ea040d-067d-4e63-b820-df94adb15e40', 'f894851e-9124-4b24-9b18-77745f9b7858', '/demo/vehicles/vespa-gts-300-super-tech-gallery-3.svg', 3, false),
('3b2c2bd5-d249-4e87-a0b2-bc586e14203e', 'f894851e-9124-4b24-9b18-77745f9b7858', '/demo/vehicles/vespa-gts-300-super-tech-gallery-4.svg', 4, false),
('9e523db1-3d33-4375-b97e-d0d4f7edf103', '56ae47ff-9b00-4662-b26e-96d936dd0987', '/demo/vehicles/vespa-sprint-125-i-get-cu-dep-keng-cover.svg', 1, true),
('ffb3ed75-b3b1-4fdb-adad-6cd1992eac41', '56ae47ff-9b00-4662-b26e-96d936dd0987', '/demo/vehicles/vespa-sprint-125-i-get-cu-dep-keng-gallery-2.svg', 2, false),
('7e179309-8263-44ef-b519-e6232154707d', '56ae47ff-9b00-4662-b26e-96d936dd0987', '/demo/vehicles/vespa-sprint-125-i-get-cu-dep-keng-gallery-3.svg', 3, false),
('e37e0b18-3730-41e8-8cbe-d09d8d70954c', '56ae47ff-9b00-4662-b26e-96d936dd0987', '/demo/vehicles/vespa-sprint-125-i-get-cu-dep-keng-gallery-4.svg', 4, false),
('2e828a6e-2f4d-4e87-8025-0bac45c8dff4', '56ae47ff-9b00-4662-b26e-96d936dd0987', '/demo/vehicles/vespa-sprint-125-i-get-cu-dep-keng-gallery-5.svg', 5, false),
('59b21c18-3c3d-42d2-9c61-5eed9e834f9c', '6d72b54b-1a66-4e04-ad8b-a4431d426e31', '/demo/vehicles/vinfast-evo200-lite-hoc-sinh-cover.svg', 1, true),
('50356285-7264-4965-8ca5-cfc476b233a5', '6d72b54b-1a66-4e04-ad8b-a4431d426e31', '/demo/vehicles/vinfast-evo200-lite-hoc-sinh-gallery-2.svg', 2, false),
('9bf238b9-9e53-48bf-b7dc-27b78f4b480c', '6d72b54b-1a66-4e04-ad8b-a4431d426e31', '/demo/vehicles/vinfast-evo200-lite-hoc-sinh-gallery-3.svg', 3, false),
('e0fc377c-1ba0-4b70-8e3a-daa445cfe3d3', 'ddb67567-3967-4e1c-adf8-3fc1ea2e433b', '/demo/vehicles/vinfast-evo200-thuong-moi-cover.svg', 1, true),
('cab38bbd-9eb8-47cd-b3d9-eac11c2dbd5c', 'ddb67567-3967-4e1c-adf8-3fc1ea2e433b', '/demo/vehicles/vinfast-evo200-thuong-moi-gallery-2.svg', 2, false),
('2e47e841-4207-41ab-be88-bb64246b54b5', 'ddb67567-3967-4e1c-adf8-3fc1ea2e433b', '/demo/vehicles/vinfast-evo200-thuong-moi-gallery-3.svg', 3, false),
('fd967749-1b43-4f0f-87b3-a5b0e47e98b0', 'ddb67567-3967-4e1c-adf8-3fc1ea2e433b', '/demo/vehicles/vinfast-evo200-thuong-moi-gallery-4.svg', 4, false),
('1fd03c11-5bb9-4311-8d09-6c224a55124c', 'f39cb277-83b7-4271-ade7-4536b8d17802', '/demo/vehicles/vinfast-feliz-s-pin-lfp-cover.svg', 1, true),
('e67a3e08-084e-4943-a9d4-b4409e2096fa', 'f39cb277-83b7-4271-ade7-4536b8d17802', '/demo/vehicles/vinfast-feliz-s-pin-lfp-gallery-2.svg', 2, false),
('ede07d1f-f387-45bf-bcb2-780291890363', 'f39cb277-83b7-4271-ade7-4536b8d17802', '/demo/vehicles/vinfast-feliz-s-pin-lfp-gallery-3.svg', 3, false),
('8c9de1cb-7130-44a0-9ada-97c3f0cb1b4c', 'f39cb277-83b7-4271-ade7-4536b8d17802', '/demo/vehicles/vinfast-feliz-s-pin-lfp-gallery-4.svg', 4, false),
('1dbf215d-9e5f-4744-9df2-5531b19ac571', 'f39cb277-83b7-4271-ade7-4536b8d17802', '/demo/vehicles/vinfast-feliz-s-pin-lfp-gallery-5.svg', 5, false),
('ee4689c5-0947-49c4-a4e6-69086a56d5ef', '740263a8-abce-4c18-9ed0-70ba45f8fde8', '/demo/vehicles/vinfast-klara-s-2024-pin-lfp-cover.svg', 1, true),
('694a1443-b0df-4e6b-84b9-d191492ee620', '740263a8-abce-4c18-9ed0-70ba45f8fde8', '/demo/vehicles/vinfast-klara-s-2024-pin-lfp-gallery-2.svg', 2, false),
('e65100cf-1fb9-4d75-8f01-9ac7cb42607f', '740263a8-abce-4c18-9ed0-70ba45f8fde8', '/demo/vehicles/vinfast-klara-s-2024-pin-lfp-gallery-3.svg', 3, false),
('2d67b795-9b66-4b90-a57a-37d6d479b60f', '4bf95aa7-05a6-441e-9430-5d1b1ced7c55', '/demo/vehicles/vinfast-vento-s-cao-cap-cover.svg', 1, true),
('42f93241-d82a-401d-9ede-8fc3b4ba50e3', '4bf95aa7-05a6-441e-9430-5d1b1ced7c55', '/demo/vehicles/vinfast-vento-s-cao-cap-gallery-2.svg', 2, false),
('5e58f43f-dd46-4031-a30e-8889e97e4935', '4bf95aa7-05a6-441e-9430-5d1b1ced7c55', '/demo/vehicles/vinfast-vento-s-cao-cap-gallery-3.svg', 3, false),
('81b8241b-3f0f-4352-9715-c99b991439a8', '4bf95aa7-05a6-441e-9430-5d1b1ced7c55', '/demo/vehicles/vinfast-vento-s-cao-cap-gallery-4.svg', 4, false),
('f7bc117a-9f45-44b8-9e46-bb5f6ce2efcd', '8499adc4-ac2a-474b-9e62-0057ba87b635', '/demo/vehicles/vinfast-theon-s-sieu-xe-dien-cover.svg', 1, true),
('c9bac9a3-006a-40c4-bdcd-2c8ee285e4ac', '8499adc4-ac2a-474b-9e62-0057ba87b635', '/demo/vehicles/vinfast-theon-s-sieu-xe-dien-gallery-2.svg', 2, false),
('9168d991-654d-4f4b-95a7-97284f33d8ab', '8499adc4-ac2a-474b-9e62-0057ba87b635', '/demo/vehicles/vinfast-theon-s-sieu-xe-dien-gallery-3.svg', 3, false),
('508c9a0b-627b-4211-92ef-33742c347d47', '8499adc4-ac2a-474b-9e62-0057ba87b635', '/demo/vehicles/vinfast-theon-s-sieu-xe-dien-gallery-4.svg', 4, false),
('e14d0678-fd5b-4aea-b16e-ee8e38899958', '8499adc4-ac2a-474b-9e62-0057ba87b635', '/demo/vehicles/vinfast-theon-s-sieu-xe-dien-gallery-5.svg', 5, false),
('b5d691b7-5879-4875-93cb-27d918a6419d', '2a846738-068d-4988-b0ed-c1db12cfd3e8', '/demo/vehicles/vinfast-klara-a2-doi-dau-cu-re-cover.svg', 1, true),
('94bdb793-b82a-4408-8032-eb4309ed9a38', '2a846738-068d-4988-b0ed-c1db12cfd3e8', '/demo/vehicles/vinfast-klara-a2-doi-dau-cu-re-gallery-2.svg', 2, false),
('9194d3e9-3165-4b4e-b2d4-97efc1fe6034', '2a846738-068d-4988-b0ed-c1db12cfd3e8', '/demo/vehicles/vinfast-klara-a2-doi-dau-cu-re-gallery-3.svg', 3, false),
('73e6dae3-4b4c-40ef-8b84-0bbdf6ee8d61', '4f98da8a-403f-473a-bb91-a71c95db366c', '/demo/vehicles/kawasaki-w175-se-classic-cover.svg', 1, true),
('f767a086-a8bd-46c3-8448-46b9bb2827bc', '4f98da8a-403f-473a-bb91-a71c95db366c', '/demo/vehicles/kawasaki-w175-se-classic-gallery-2.svg', 2, false),
('e521fbd1-c281-4da4-b8c1-0380435c983e', '4f98da8a-403f-473a-bb91-a71c95db366c', '/demo/vehicles/kawasaki-w175-se-classic-gallery-3.svg', 3, false),
('eb49e1f0-901c-4178-b7eb-12407a9bf892', '4f98da8a-403f-473a-bb91-a71c95db366c', '/demo/vehicles/kawasaki-w175-se-classic-gallery-4.svg', 4, false),
('138688f2-eb17-4469-8f99-d325698acc38', 'fed037ec-d7c2-48c7-848d-60383018a590', '/demo/vehicles/kawasaki-ninja-zx-25r-4-xy-lanh-cover.svg', 1, true),
('e586abc4-eb4e-461a-b1c7-39145dee45f8', 'fed037ec-d7c2-48c7-848d-60383018a590', '/demo/vehicles/kawasaki-ninja-zx-25r-4-xy-lanh-gallery-2.svg', 2, false),
('b443e26c-2087-4a7e-be61-c2fcf20f298c', 'fed037ec-d7c2-48c7-848d-60383018a590', '/demo/vehicles/kawasaki-ninja-zx-25r-4-xy-lanh-gallery-3.svg', 3, false),
('f52f65f3-4731-42a7-b974-69a9a6ab730b', 'fed037ec-d7c2-48c7-848d-60383018a590', '/demo/vehicles/kawasaki-ninja-zx-25r-4-xy-lanh-gallery-4.svg', 4, false),
('ad5c7662-4946-4008-8ad5-c462df786682', 'fed037ec-d7c2-48c7-848d-60383018a590', '/demo/vehicles/kawasaki-ninja-zx-25r-4-xy-lanh-gallery-5.svg', 5, false),
('52faa2bf-600a-477c-a69b-26b3b339b886', 'be2201a8-462b-4226-b1e5-1b1e34d07535', '/demo/vehicles/kawasaki-ninja-400-abs-krt-cover.svg', 1, true),
('f23def27-abea-414e-b616-4830f834b5b3', 'be2201a8-462b-4226-b1e5-1b1e34d07535', '/demo/vehicles/kawasaki-ninja-400-abs-krt-gallery-2.svg', 2, false),
('21d0db96-3d81-41b5-a1ab-837e76317a3b', 'be2201a8-462b-4226-b1e5-1b1e34d07535', '/demo/vehicles/kawasaki-ninja-400-abs-krt-gallery-3.svg', 3, false),
('956e39aa-c761-4254-b557-605f5cec399d', 'afbec2f0-3c63-4bf9-924c-6c6022fddd38', '/demo/vehicles/kawasaki-z400-naked-bike-cover.svg', 1, true),
('0a5f6bde-6c5c-4501-9056-cf86e0582f46', 'afbec2f0-3c63-4bf9-924c-6c6022fddd38', '/demo/vehicles/kawasaki-z400-naked-bike-gallery-2.svg', 2, false),
('e05ac13b-1074-4f78-9858-248bbd0c527a', 'afbec2f0-3c63-4bf9-924c-6c6022fddd38', '/demo/vehicles/kawasaki-z400-naked-bike-gallery-3.svg', 3, false),
('694297bf-06a0-4037-a6b3-45a60b02377f', 'afbec2f0-3c63-4bf9-924c-6c6022fddd38', '/demo/vehicles/kawasaki-z400-naked-bike-gallery-4.svg', 4, false),
('fbedb1d8-ba2a-41e1-a648-787153803ff6', '0844dae1-9817-4d45-b38b-04a52f92f37e', '/demo/vehicles/kawasaki-z650-than-sam-cover.svg', 1, true),
('c2e7caaa-31e9-45f2-8f3b-0842d658be85', '0844dae1-9817-4d45-b38b-04a52f92f37e', '/demo/vehicles/kawasaki-z650-than-sam-gallery-2.svg', 2, false),
('c49283b5-95e4-44df-9259-f8da25ab126d', '0844dae1-9817-4d45-b38b-04a52f92f37e', '/demo/vehicles/kawasaki-z650-than-sam-gallery-3.svg', 3, false),
('c27c5b7f-b64d-4ef2-ad99-04290a87b3a8', '0844dae1-9817-4d45-b38b-04a52f92f37e', '/demo/vehicles/kawasaki-z650-than-sam-gallery-4.svg', 4, false),
('96d9869e-a298-4f52-9939-2c96bcda2ac2', '0844dae1-9817-4d45-b38b-04a52f92f37e', '/demo/vehicles/kawasaki-z650-than-sam-gallery-5.svg', 5, false),
('9af42f88-a9d3-4b67-8a19-582ab9bd69a1', 'd80cac16-5684-4930-975e-d71709a5dee8', '/demo/vehicles/kawasaki-vulcan-s-650-cruiser-cover.svg', 1, true),
('4761c8c1-a773-407f-8f03-cceedf372622', 'd80cac16-5684-4930-975e-d71709a5dee8', '/demo/vehicles/kawasaki-vulcan-s-650-cruiser-gallery-2.svg', 2, false),
('12fa79b6-8b97-4d87-a95b-bf1337e64497', 'd80cac16-5684-4930-975e-d71709a5dee8', '/demo/vehicles/kawasaki-vulcan-s-650-cruiser-gallery-3.svg', 3, false),
('f104c16c-d277-4c1a-84d1-deb8ce93c8f9', 'b453fd9f-5b29-41b3-96d8-a97612b0935d', '/demo/vehicles/kawasaki-z900-abs-than-sam-cover.svg', 1, true),
('c8e3db41-7f07-4f8b-8089-71d3a9791cad', 'b453fd9f-5b29-41b3-96d8-a97612b0935d', '/demo/vehicles/kawasaki-z900-abs-than-sam-gallery-2.svg', 2, false),
('68e141a1-9518-41db-8f84-1c295635960f', 'b453fd9f-5b29-41b3-96d8-a97612b0935d', '/demo/vehicles/kawasaki-z900-abs-than-sam-gallery-3.svg', 3, false),
('06e7e6e7-b1b3-4259-966f-68e965b435be', 'b453fd9f-5b29-41b3-96d8-a97612b0935d', '/demo/vehicles/kawasaki-z900-abs-than-sam-gallery-4.svg', 4, false),
('91f716d3-75df-47b5-a0db-9ce6cd4efff6', '5f34e5eb-3327-40e0-8279-a7d34aa3596a', '/demo/vehicles/kawasaki-ninja-400-cu-dep-keng-cover.svg', 1, true),
('d865212b-c88d-46a7-a204-1b19dceee182', '5f34e5eb-3327-40e0-8279-a7d34aa3596a', '/demo/vehicles/kawasaki-ninja-400-cu-dep-keng-gallery-2.svg', 2, false),
('8c93cfe0-06c9-4397-ba45-ad2722c72d6d', '5f34e5eb-3327-40e0-8279-a7d34aa3596a', '/demo/vehicles/kawasaki-ninja-400-cu-dep-keng-gallery-3.svg', 3, false),
('3bf26bcc-29dc-46a4-9bd9-bb4bfacf9591', '5f34e5eb-3327-40e0-8279-a7d34aa3596a', '/demo/vehicles/kawasaki-ninja-400-cu-dep-keng-gallery-4.svg', 4, false),
('83d61208-a447-437b-8f93-ea4c2c888cca', '5f34e5eb-3327-40e0-8279-a7d34aa3596a', '/demo/vehicles/kawasaki-ninja-400-cu-dep-keng-gallery-5.svg', 5, false),
('4db0208a-6908-4a94-8051-c3e424b7e587', 'd78edb3a-2061-4b73-aa69-6dc6cb6e94d1', '/demo/vehicles/ktm-duke-200-naked-bike-cover.svg', 1, true),
('c5a4f7f2-3fcb-477e-b907-b3160326369b', 'd78edb3a-2061-4b73-aa69-6dc6cb6e94d1', '/demo/vehicles/ktm-duke-200-naked-bike-gallery-2.svg', 2, false),
('6e3966e5-ee87-4b17-8044-8b790a713f75', 'd78edb3a-2061-4b73-aa69-6dc6cb6e94d1', '/demo/vehicles/ktm-duke-200-naked-bike-gallery-3.svg', 3, false),
('07642d4a-3dcf-4b2b-921c-2feb6cefeabb', '4076bd7e-c8bb-4663-af90-a99840930695', '/demo/vehicles/ktm-duke-390-the-he-moi-cover.svg', 1, true),
('37fcf5c2-2c36-41d3-9521-d3e8bf8153af', '4076bd7e-c8bb-4663-af90-a99840930695', '/demo/vehicles/ktm-duke-390-the-he-moi-gallery-2.svg', 2, false),
('a2a15581-8019-4350-a22f-d56780d4f4f2', '4076bd7e-c8bb-4663-af90-a99840930695', '/demo/vehicles/ktm-duke-390-the-he-moi-gallery-3.svg', 3, false),
('c4fdedb5-0ee4-48bd-bf09-172d95570a63', '4076bd7e-c8bb-4663-af90-a99840930695', '/demo/vehicles/ktm-duke-390-the-he-moi-gallery-4.svg', 4, false),
('6295463e-fd00-4fa4-9115-0c00ffe5690b', 'c5ce3cba-5fcf-4e18-be26-1b5ddd1c2311', '/demo/vehicles/ktm-rc-390-sportbike-cover.svg', 1, true),
('a1dbb7fc-d3e7-4f3d-b2f8-a411c15df54b', 'c5ce3cba-5fcf-4e18-be26-1b5ddd1c2311', '/demo/vehicles/ktm-rc-390-sportbike-gallery-2.svg', 2, false),
('16dd9eb3-8bbf-4f9b-908b-3a522a5ff078', 'c5ce3cba-5fcf-4e18-be26-1b5ddd1c2311', '/demo/vehicles/ktm-rc-390-sportbike-gallery-3.svg', 3, false),
('47501de7-c3b8-466f-ba7a-25399b1d2d98', 'c5ce3cba-5fcf-4e18-be26-1b5ddd1c2311', '/demo/vehicles/ktm-rc-390-sportbike-gallery-4.svg', 4, false),
('1d80b654-a398-4c9b-bae7-7e0032bdc317', 'c5ce3cba-5fcf-4e18-be26-1b5ddd1c2311', '/demo/vehicles/ktm-rc-390-sportbike-gallery-5.svg', 5, false),
('98656181-d67e-423d-9506-2753ee637bbf', '96c6be82-9ee3-4efa-b6af-df86fcb432d7', '/demo/vehicles/ktm-adventure-390-phuot-thu-cover.svg', 1, true),
('5ffad3c7-7d6f-44b7-a818-a3082e20a370', '96c6be82-9ee3-4efa-b6af-df86fcb432d7', '/demo/vehicles/ktm-adventure-390-phuot-thu-gallery-2.svg', 2, false),
('b2eade91-725b-4c71-a6fe-8c0f6b65ab3d', '96c6be82-9ee3-4efa-b6af-df86fcb432d7', '/demo/vehicles/ktm-adventure-390-phuot-thu-gallery-3.svg', 3, false),
('c2c18cc8-5e88-4335-9d9b-75b124da0d1e', 'df3ac58b-0b76-4c9e-b167-035112770b8c', '/demo/vehicles/ktm-duke-790-the-scalpel-cover.svg', 1, true),
('fdcd74c4-a53b-4b2b-830e-ceed4ba7c86f', 'df3ac58b-0b76-4c9e-b167-035112770b8c', '/demo/vehicles/ktm-duke-790-the-scalpel-gallery-2.svg', 2, false),
('9cb8f99a-84a9-4e5e-89d7-a739f4ff14d8', 'df3ac58b-0b76-4c9e-b167-035112770b8c', '/demo/vehicles/ktm-duke-790-the-scalpel-gallery-3.svg', 3, false),
('580ab60c-b10b-4ddd-a840-77941b370491', 'df3ac58b-0b76-4c9e-b167-035112770b8c', '/demo/vehicles/ktm-duke-790-the-scalpel-gallery-4.svg', 4, false),
('0868d55d-0992-4568-83a0-8e699a6814b8', 'c8bce9dd-bf92-4670-880b-4d3296fbc3a4', '/demo/vehicles/ducati-scrambler-icon-doc-chat-cover.svg', 1, true),
('05f8a3bc-3fa1-4708-9ede-6bfeb7bffc98', 'c8bce9dd-bf92-4670-880b-4d3296fbc3a4', '/demo/vehicles/ducati-scrambler-icon-doc-chat-gallery-2.svg', 2, false),
('7bb9cfec-c99b-4e9a-868a-915f107552e9', 'c8bce9dd-bf92-4670-880b-4d3296fbc3a4', '/demo/vehicles/ducati-scrambler-icon-doc-chat-gallery-3.svg', 3, false),
('9dcc60cd-5cd7-4bb4-b44b-527c11acca13', 'c8bce9dd-bf92-4670-880b-4d3296fbc3a4', '/demo/vehicles/ducati-scrambler-icon-doc-chat-gallery-4.svg', 4, false),
('06189963-33fa-458d-a60f-a499f46c441c', 'c8bce9dd-bf92-4670-880b-4d3296fbc3a4', '/demo/vehicles/ducati-scrambler-icon-doc-chat-gallery-5.svg', 5, false),
('50e9d700-53e9-44a2-9cc8-18bd286a05ab', '146c7d5b-89b9-41f3-bfb8-4004060c13ba', '/demo/vehicles/ducati-monster-937-monster-cover.svg', 1, true),
('65d55aa2-2f20-4a1e-8076-0c511a022a72', '146c7d5b-89b9-41f3-bfb8-4004060c13ba', '/demo/vehicles/ducati-monster-937-monster-gallery-2.svg', 2, false),
('d0efbc22-c1b9-4cc9-8429-8ba272f00eb5', '146c7d5b-89b9-41f3-bfb8-4004060c13ba', '/demo/vehicles/ducati-monster-937-monster-gallery-3.svg', 3, false),
('dc5022ce-4b05-4c5e-87ef-e0f4fbd4ca95', 'fa68e392-80db-40e6-b725-d4c68d29ccd1', '/demo/vehicles/ducati-multistrada-v2-s-tourer-cover.svg', 1, true),
('cf0c5329-8fa5-4407-ad6b-2ee929998a0a', 'fa68e392-80db-40e6-b725-d4c68d29ccd1', '/demo/vehicles/ducati-multistrada-v2-s-tourer-gallery-2.svg', 2, false),
('8e4b100a-25bb-493e-a5dc-00f785514349', 'fa68e392-80db-40e6-b725-d4c68d29ccd1', '/demo/vehicles/ducati-multistrada-v2-s-tourer-gallery-3.svg', 3, false),
('e9dfa5b1-eb0e-4321-a033-98a8b9772931', 'fa68e392-80db-40e6-b725-d4c68d29ccd1', '/demo/vehicles/ducati-multistrada-v2-s-tourer-gallery-4.svg', 4, false),
('684ca865-387e-4ae5-893d-db87ebe9e769', '410e8f66-573d-4408-8cf8-4cf790367265', '/demo/vehicles/ducati-streetfighter-v2-sieu-tran-cover.svg', 1, true),
('71588cda-e9f2-48d7-b1fb-c5352d51da11', '410e8f66-573d-4408-8cf8-4cf790367265', '/demo/vehicles/ducati-streetfighter-v2-sieu-tran-gallery-2.svg', 2, false),
('4caad8fd-fa06-4527-861e-d95f327b4c99', '410e8f66-573d-4408-8cf8-4cf790367265', '/demo/vehicles/ducati-streetfighter-v2-sieu-tran-gallery-3.svg', 3, false),
('fef26281-518b-41b6-8a76-dd30517e96d8', '410e8f66-573d-4408-8cf8-4cf790367265', '/demo/vehicles/ducati-streetfighter-v2-sieu-tran-gallery-4.svg', 4, false),
('85277034-d4ca-431b-9df5-328bfca0fd20', '410e8f66-573d-4408-8cf8-4cf790367265', '/demo/vehicles/ducati-streetfighter-v2-sieu-tran-gallery-5.svg', 5, false),
('15fd85b6-02d5-4565-add3-a15d078f568b', '58fe91cf-5c97-471b-a4c0-eb5b21c6e6ae', '/demo/vehicles/ducati-panigale-v2-superbike-cover.svg', 1, true),
('2a1b7c69-c501-4223-9438-bbe71aa36ea2', '58fe91cf-5c97-471b-a4c0-eb5b21c6e6ae', '/demo/vehicles/ducati-panigale-v2-superbike-gallery-2.svg', 2, false),
('c59f0da0-c1b9-4713-b532-dd3167f26cb4', '58fe91cf-5c97-471b-a4c0-eb5b21c6e6ae', '/demo/vehicles/ducati-panigale-v2-superbike-gallery-3.svg', 3, false),
('72bffacc-834f-4e82-a9e2-ca15e070ec08', 'f3758b68-593e-4c6d-8b4c-b70cb5e687c2', '/demo/vehicles/ducati-diavel-v4-quai-thu-showroom-cover.svg', 1, true),
('2166b353-b53b-4929-828e-41b801192d5d', 'f3758b68-593e-4c6d-8b4c-b70cb5e687c2', '/demo/vehicles/ducati-diavel-v4-quai-thu-showroom-gallery-2.svg', 2, false),
('db309e08-a558-4510-9999-3bc801485747', 'f3758b68-593e-4c6d-8b4c-b70cb5e687c2', '/demo/vehicles/ducati-diavel-v4-quai-thu-showroom-gallery-3.svg', 3, false),
('6c9af097-183b-468d-a143-d191264ff40b', 'f3758b68-593e-4c6d-8b4c-b70cb5e687c2', '/demo/vehicles/ducati-diavel-v4-quai-thu-showroom-gallery-4.svg', 4, false),
('8063125e-0307-4bee-9382-4d4469bc85f3', 'fcd09865-0576-4afb-828a-13751d761e42', '/demo/vehicles/honda-sh-150i-abs-cu-doi-2021-cover.svg', 1, true),
('e494539b-b71c-4445-9a13-e899549fbd56', 'fcd09865-0576-4afb-828a-13751d761e42', '/demo/vehicles/honda-sh-150i-abs-cu-doi-2021-gallery-2.svg', 2, false),
('a8d15bb5-35cd-46be-b6ff-83516b8ade13', 'fcd09865-0576-4afb-828a-13751d761e42', '/demo/vehicles/honda-sh-150i-abs-cu-doi-2021-gallery-3.svg', 3, false),
('e8b38b47-ce99-41b6-ae84-fe12f787cf20', 'fcd09865-0576-4afb-828a-13751d761e42', '/demo/vehicles/honda-sh-150i-abs-cu-doi-2021-gallery-4.svg', 4, false),
('93e65065-2ead-4738-b1e7-2b1fe21fe6b6', 'fcd09865-0576-4afb-828a-13751d761e42', '/demo/vehicles/honda-sh-150i-abs-cu-doi-2021-gallery-5.svg', 5, false),
('463f3f51-2eb9-4aef-947a-9db7fb2d909c', '8d3a5bff-6f3f-4ae5-bea3-4d67ea660549', '/demo/vehicles/yamaha-exciter-135-cu-doi-2012-con-tu-dong-cover.svg', 1, true),
('8ed7b831-81da-4328-b355-842b460b186d', '8d3a5bff-6f3f-4ae5-bea3-4d67ea660549', '/demo/vehicles/yamaha-exciter-135-cu-doi-2012-con-tu-dong-gallery-2.svg', 2, false),
('661d9459-800a-4eb6-b644-93ccd391fa24', '8d3a5bff-6f3f-4ae5-bea3-4d67ea660549', '/demo/vehicles/yamaha-exciter-135-cu-doi-2012-con-tu-dong-gallery-3.svg', 3, false),
('3e01fbf8-a578-4474-b284-f01c76b0f60e', '6eb5a6e3-cf4c-4eb8-af21-c7b5f11d274a', '/demo/vehicles/yamaha-sirius-110-rc-cu-vanh-duc-cover.svg', 1, true),
('88626e86-b6ca-498a-9536-aaef3a24af6f', '6eb5a6e3-cf4c-4eb8-af21-c7b5f11d274a', '/demo/vehicles/yamaha-sirius-110-rc-cu-vanh-duc-gallery-2.svg', 2, false),
('151848e4-bd1d-4ae7-ae6d-879e76b3af85', '6eb5a6e3-cf4c-4eb8-af21-c7b5f11d274a', '/demo/vehicles/yamaha-sirius-110-rc-cu-vanh-duc-gallery-3.svg', 3, false),
('24b5dc64-7138-499e-9791-9daf0dbd90e4', '6eb5a6e3-cf4c-4eb8-af21-c7b5f11d274a', '/demo/vehicles/yamaha-sirius-110-rc-cu-vanh-duc-gallery-4.svg', 4, false),
('3c4d9e5f-8aeb-447f-9bf5-d8558427ad9e', 'a132631b-4051-46dc-aa73-907e9a6f4306', '/demo/vehicles/honda-wave-rsx-110-cu-hoc-sinh-cover.svg', 1, true),
('b80b4d40-8186-4c6e-8013-0fde10d80707', 'a132631b-4051-46dc-aa73-907e9a6f4306', '/demo/vehicles/honda-wave-rsx-110-cu-hoc-sinh-gallery-2.svg', 2, false),
('befd3403-e9cd-44d9-b9e1-ee3d032a5c0e', 'a132631b-4051-46dc-aa73-907e9a6f4306', '/demo/vehicles/honda-wave-rsx-110-cu-hoc-sinh-gallery-3.svg', 3, false),
('6418fec1-3255-4df1-8d95-222970fcf414', 'a132631b-4051-46dc-aa73-907e9a6f4306', '/demo/vehicles/honda-wave-rsx-110-cu-hoc-sinh-gallery-4.svg', 4, false),
('caa0e801-adb2-4f22-8df7-c60a6b64df4c', 'a132631b-4051-46dc-aa73-907e9a6f4306', '/demo/vehicles/honda-wave-rsx-110-cu-hoc-sinh-gallery-5.svg', 5, false),
('91156c14-fc8c-435f-82d3-bd85abf3c0db', 'ea1881d9-3abc-4a11-9eac-b4d8da58336e', '/demo/vehicles/vespa-primavera-125-cu-mau-doc-cover.svg', 1, true),
('5247f50f-1450-44d4-a5a9-e14404ae7faa', 'ea1881d9-3abc-4a11-9eac-b4d8da58336e', '/demo/vehicles/vespa-primavera-125-cu-mau-doc-gallery-2.svg', 2, false),
('bfe90b88-056c-48a6-bc06-aed93a9fdb3b', 'ea1881d9-3abc-4a11-9eac-b4d8da58336e', '/demo/vehicles/vespa-primavera-125-cu-mau-doc-gallery-3.svg', 3, false),
('51ce7756-b8c0-42c8-9f3d-6818473e9cbf', '5a5d29d7-d37b-4541-ae95-07934f0bbf4f', '/demo/vehicles/honda-sh-mode-125-cu-nu-di-cover.svg', 1, true),
('d7f8fecb-1d3f-4cde-9084-98707ffcb2cc', '5a5d29d7-d37b-4541-ae95-07934f0bbf4f', '/demo/vehicles/honda-sh-mode-125-cu-nu-di-gallery-2.svg', 2, false),
('c42b4de2-071f-4cc2-b44e-692ac7193bdf', '5a5d29d7-d37b-4541-ae95-07934f0bbf4f', '/demo/vehicles/honda-sh-mode-125-cu-nu-di-gallery-3.svg', 3, false),
('8c8e59fb-0375-40f1-b0a9-4a1be5a9aacb', '5a5d29d7-d37b-4541-ae95-07934f0bbf4f', '/demo/vehicles/honda-sh-mode-125-cu-nu-di-gallery-4.svg', 4, false),
('335a917d-65b6-4963-8354-326c5d8fe27f', '8bce38a6-f0ee-4c6c-aa1d-b616dc1d7452', '/demo/vehicles/honda-future-neo-gt-cu-cop-suu-tam-cover.svg', 1, true),
('fed46f9c-1d17-437f-b144-d4340738da17', '8bce38a6-f0ee-4c6c-aa1d-b616dc1d7452', '/demo/vehicles/honda-future-neo-gt-cu-cop-suu-tam-gallery-2.svg', 2, false),
('92bd4603-b048-4677-bad6-cca1b8055430', '8bce38a6-f0ee-4c6c-aa1d-b616dc1d7452', '/demo/vehicles/honda-future-neo-gt-cu-cop-suu-tam-gallery-3.svg', 3, false),
('bf445615-3540-49a9-bb77-f016f6b4cc6b', '8bce38a6-f0ee-4c6c-aa1d-b616dc1d7452', '/demo/vehicles/honda-future-neo-gt-cu-cop-suu-tam-gallery-4.svg', 4, false),
('89092f9d-5f77-447b-bba1-b4dc10f5005e', '8bce38a6-f0ee-4c6c-aa1d-b616dc1d7452', '/demo/vehicles/honda-future-neo-gt-cu-cop-suu-tam-gallery-5.svg', 5, false),
('e22694c2-3083-47ea-9cbb-2458be35ac20', 'eb7f0a1d-d8fe-4814-a4de-0723815e1be5', '/demo/vehicles/yamaha-exciter-150-cu-doi-2015-den-nham-cover.svg', 1, true),
('f7e283fd-91ad-4be9-b39c-5b9a4bde6eb5', 'eb7f0a1d-d8fe-4814-a4de-0723815e1be5', '/demo/vehicles/yamaha-exciter-150-cu-doi-2015-den-nham-gallery-2.svg', 2, false),
('dd311981-262f-4f47-a5a9-842883680971', 'eb7f0a1d-d8fe-4814-a4de-0723815e1be5', '/demo/vehicles/yamaha-exciter-150-cu-doi-2015-den-nham-gallery-3.svg', 3, false),
('1048e0f0-7e30-4c6c-b433-4a478a559080', 'd59d0244-839b-4d10-8cc6-ecb73eab2081', '/demo/vehicles/suzuki-axelo-125-con-tay-cu-hiem-cover.svg', 1, true),
('80bbbfb1-725c-428b-9587-d82f52412e63', 'd59d0244-839b-4d10-8cc6-ecb73eab2081', '/demo/vehicles/suzuki-axelo-125-con-tay-cu-hiem-gallery-2.svg', 2, false),
('dde90d1e-d281-4906-9b97-9947a351e62e', 'd59d0244-839b-4d10-8cc6-ecb73eab2081', '/demo/vehicles/suzuki-axelo-125-con-tay-cu-hiem-gallery-3.svg', 3, false),
('d948f3d9-2372-40c1-97c2-ea52f8a8c6ae', 'd59d0244-839b-4d10-8cc6-ecb73eab2081', '/demo/vehicles/suzuki-axelo-125-con-tay-cu-hiem-gallery-4.svg', 4, false),
('0227a76f-d0e4-40cd-ac2a-1d9678bd6ae4', '7e5c9818-6486-4c9b-9db3-12f6c6a4e366', '/demo/vehicles/sym-elegant-50-cu-gia-hoc-sinh-cover.svg', 1, true),
('cd493f1b-6653-4060-9df1-3c6a11581640', '7e5c9818-6486-4c9b-9db3-12f6c6a4e366', '/demo/vehicles/sym-elegant-50-cu-gia-hoc-sinh-gallery-2.svg', 2, false),
('7476372b-1f1d-4fc8-9f48-2f3b424064ac', '7e5c9818-6486-4c9b-9db3-12f6c6a4e366', '/demo/vehicles/sym-elegant-50-cu-gia-hoc-sinh-gallery-3.svg', 3, false),
('be23fc51-9f2d-4f2a-a2d7-938706d6f290', '7e5c9818-6486-4c9b-9db3-12f6c6a4e366', '/demo/vehicles/sym-elegant-50-cu-gia-hoc-sinh-gallery-4.svg', 4, false),
('9a88d714-e086-4929-917e-90a25f891a9d', '7e5c9818-6486-4c9b-9db3-12f6c6a4e366', '/demo/vehicles/sym-elegant-50-cu-gia-hoc-sinh-gallery-5.svg', 5, false),
('4cab4325-5b81-4a02-bcee-9b2bbf566cb1', '199e2205-16f4-41a1-8fde-d1d12fd34ef5', '/demo/vehicles/ducati-monster-797-cu-chinh-chu-cover.svg', 1, true),
('9aa48ecb-ed08-4ff2-b2df-b0577513acff', '199e2205-16f4-41a1-8fde-d1d12fd34ef5', '/demo/vehicles/ducati-monster-797-cu-chinh-chu-gallery-2.svg', 2, false),
('1df1d347-9384-4520-aabc-891a2df0b285', '199e2205-16f4-41a1-8fde-d1d12fd34ef5', '/demo/vehicles/ducati-monster-797-cu-chinh-chu-gallery-3.svg', 3, false),
('a189fe76-8ce5-493b-b487-0f2f06b34a24', '175497cf-6f1c-47df-8bbf-4d07f1322c1c', '/demo/vehicles/kawasaki-z300-cu-doi-2018-gia-tot-cover.svg', 1, true),
('feafd64d-029e-4629-83f5-110b85ec0175', '175497cf-6f1c-47df-8bbf-4d07f1322c1c', '/demo/vehicles/kawasaki-z300-cu-doi-2018-gia-tot-gallery-2.svg', 2, false),
('7ea59e63-e50b-463a-9963-a2488b9c2f38', '175497cf-6f1c-47df-8bbf-4d07f1322c1c', '/demo/vehicles/kawasaki-z300-cu-doi-2018-gia-tot-gallery-3.svg', 3, false),
('cb030b4f-4ffd-4e32-97b7-a846aaea00b5', '175497cf-6f1c-47df-8bbf-4d07f1322c1c', '/demo/vehicles/kawasaki-z300-cu-doi-2018-gia-tot-gallery-4.svg', 4, false),
('62d92435-a3f0-4ce8-806b-33be8b63fd64', '07aa6773-756c-49bb-9e30-31fc470a16a3', '/demo/vehicles/honda-cub-50cc-cu-kieng-cuc-dep-cover.svg', 1, true),
('5833953e-691f-4c8e-a5de-625a88a97dfe', '07aa6773-756c-49bb-9e30-31fc470a16a3', '/demo/vehicles/honda-cub-50cc-cu-kieng-cuc-dep-gallery-2.svg', 2, false),
('17487c9b-22ff-46d7-a451-d61b00c0aa35', '07aa6773-756c-49bb-9e30-31fc470a16a3', '/demo/vehicles/honda-cub-50cc-cu-kieng-cuc-dep-gallery-3.svg', 3, false),
('d01893bd-e26e-4949-a768-d99b451a5da3', '07aa6773-756c-49bb-9e30-31fc470a16a3', '/demo/vehicles/honda-cub-50cc-cu-kieng-cuc-dep-gallery-4.svg', 4, false),
('0bb8c3be-ee3d-43bd-bafc-d351e4ce3598', '07aa6773-756c-49bb-9e30-31fc470a16a3', '/demo/vehicles/honda-cub-50cc-cu-kieng-cuc-dep-gallery-5.svg', 5, false),
('da890e63-7154-4b51-ae23-9a816e5893a9', '3a41f7b7-4317-49f6-96ce-383704876dfc', '/demo/vehicles/yamaha-luvias-125-cu-may-boc-cover.svg', 1, true),
('48cc0376-be1c-4100-9fe3-2911a525551c', '3a41f7b7-4317-49f6-96ce-383704876dfc', '/demo/vehicles/yamaha-luvias-125-cu-may-boc-gallery-2.svg', 2, false),
('e6f717c0-45af-4044-9f13-2517c1303766', '3a41f7b7-4317-49f6-96ce-383704876dfc', '/demo/vehicles/yamaha-luvias-125-cu-may-boc-gallery-3.svg', 3, false),
('eb0d527e-5887-45da-8368-811f55283ac9', '8ac1cdd1-7051-41cb-aede-d14ab88d8cbe', '/demo/vehicles/sym-attila-elizabeth-cu-gia-re-cover.svg', 1, true),
('77758256-8921-4e3d-97b1-710fe96b5dfc', '8ac1cdd1-7051-41cb-aede-d14ab88d8cbe', '/demo/vehicles/sym-attila-elizabeth-cu-gia-re-gallery-2.svg', 2, false),
('4b5a3f41-9b5d-47ce-813a-45fc4571fb6b', '8ac1cdd1-7051-41cb-aede-d14ab88d8cbe', '/demo/vehicles/sym-attila-elizabeth-cu-gia-re-gallery-3.svg', 3, false),
('89e95b91-0048-47ca-8396-85a52d572f02', '8ac1cdd1-7051-41cb-aede-d14ab88d8cbe', '/demo/vehicles/sym-attila-elizabeth-cu-gia-re-gallery-4.svg', 4, false),
('8ba99a0d-9d97-4cee-8898-a11133afc41a', '31cc1af0-ff60-4dbd-a919-2f39287e8b47', '/demo/vehicles/mu-bao-hiem-honda-fullface-cao-cap-cover.svg', 1, true),
('8cf9644e-1e4d-44ad-a3c2-20d53356cbd2', '31cc1af0-ff60-4dbd-a919-2f39287e8b47', '/demo/vehicles/mu-bao-hiem-honda-fullface-cao-cap-gallery-2.svg', 2, false),
('2e852354-fb68-44fb-bd96-a3b8c0ca1718', '31cc1af0-ff60-4dbd-a919-2f39287e8b47', '/demo/vehicles/mu-bao-hiem-honda-fullface-cao-cap-gallery-3.svg', 3, false),
('538e9b46-3a05-455b-8271-3aa2e7062649', '31cc1af0-ff60-4dbd-a919-2f39287e8b47', '/demo/vehicles/mu-bao-hiem-honda-fullface-cao-cap-gallery-4.svg', 4, false),
('31550037-4c43-4c71-8449-eb1f41cf219b', '31cc1af0-ff60-4dbd-a919-2f39287e8b47', '/demo/vehicles/mu-bao-hiem-honda-fullface-cao-cap-gallery-5.svg', 5, false),
('5f8d170e-fcfa-440f-b040-7e8c8a6a241e', '4cedb9a0-f280-474c-9401-7d6bb9fb431c', '/demo/vehicles/dau-nhot-motul-300v-factory-line-10w40-1l-cover.svg', 1, true),
('36cd5cc5-a121-4272-8a7d-d1c1f5c35bb1', '4cedb9a0-f280-474c-9401-7d6bb9fb431c', '/demo/vehicles/dau-nhot-motul-300v-factory-line-10w40-1l-gallery-2.svg', 2, false),
('f0568596-2acf-4ed9-82c9-00955cbe6ab5', '4cedb9a0-f280-474c-9401-7d6bb9fb431c', '/demo/vehicles/dau-nhot-motul-300v-factory-line-10w40-1l-gallery-3.svg', 3, false),
('84c696ca-10a2-4008-bbbb-86d766b84ce6', 'aa9a2638-739e-43f5-b28e-fbdfb90115fc', '/demo/vehicles/khoa-chong-trom-xe-may-smartkey-fox-thong-minh-cover.svg', 1, true),
('cac76c02-312d-41b2-9cf5-f3235e958877', 'aa9a2638-739e-43f5-b28e-fbdfb90115fc', '/demo/vehicles/khoa-chong-trom-xe-may-smartkey-fox-thong-minh-gallery-2.svg', 2, false),
('bec2771d-2c49-4992-b337-033643daddd5', 'aa9a2638-739e-43f5-b28e-fbdfb90115fc', '/demo/vehicles/khoa-chong-trom-xe-may-smartkey-fox-thong-minh-gallery-3.svg', 3, false),
('64fb0849-48bc-4e03-a48e-798c304be50e', 'aa9a2638-739e-43f5-b28e-fbdfb90115fc', '/demo/vehicles/khoa-chong-trom-xe-may-smartkey-fox-thong-minh-gallery-4.svg', 4, false),
('a8ee6e66-a926-4be3-a417-fc249dff0023', '81c83a66-ddd3-4e9e-a9ea-09678dbf1522', '/demo/vehicles/nhong-sen-dia-did-gold-vang-9ly-cover.svg', 1, true),
('1647175b-d2c3-466b-8714-728d7843fa62', '81c83a66-ddd3-4e9e-a9ea-09678dbf1522', '/demo/vehicles/nhong-sen-dia-did-gold-vang-9ly-gallery-2.svg', 2, false),
('d365ed9f-de77-4bae-9937-d3f94ef1f218', '81c83a66-ddd3-4e9e-a9ea-09678dbf1522', '/demo/vehicles/nhong-sen-dia-did-gold-vang-9ly-gallery-3.svg', 3, false),
('87d3175c-ee42-4826-96a9-8d68836fbb8c', '81c83a66-ddd3-4e9e-a9ea-09678dbf1522', '/demo/vehicles/nhong-sen-dia-did-gold-vang-9ly-gallery-4.svg', 4, false),
('d34e75b2-c1ca-4902-ba0c-d3ea66fe0058', '81c83a66-ddd3-4e9e-a9ea-09678dbf1522', '/demo/vehicles/nhong-sen-dia-did-gold-vang-9ly-gallery-5.svg', 5, false),
('92009893-922e-4b79-80fc-87c42b94ba1f', '27903827-1e2a-42f5-bc03-d51ea7f6e485', '/demo/vehicles/den-tro-sang-l4x-cree-xml2-sieu-sang-cover.svg', 1, true),
('574e96c7-16da-4049-95a3-5f09f04f39fd', '27903827-1e2a-42f5-bc03-d51ea7f6e485', '/demo/vehicles/den-tro-sang-l4x-cree-xml2-sieu-sang-gallery-2.svg', 2, false),
('0fd95ea7-e279-48ea-bb00-5e1079b8b4c9', '27903827-1e2a-42f5-bc03-d51ea7f6e485', '/demo/vehicles/den-tro-sang-l4x-cree-xml2-sieu-sang-gallery-3.svg', 3, false)
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
('0abe98d1-6ad4-46cb-a592-4ee94a6853dc', 'Kinh nghiệm mua xe máy cũ Đồng Tháp tránh bị lừa', 'kinh-nghiem-mua-xe-may-cu-dong-thap-tranh-bi-lua', 'Bài viết chia sẻ chi tiết về chủ đề Kinh nghiệm mua xe máy cũ Đồng Tháp tránh bị lừa. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Kinh nghiệm mua xe máy cũ Đồng Tháp tránh bị lừa

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-1.svg', 'Kinh nghiệm mua xe máy cũ Đồng Tháp tránh bị lừa | Ken Motor', 'Bài viết tư vấn chuyên sâu về Kinh nghiệm mua xe máy cũ Đồng Tháp tránh bị lừa. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('ec91fb50-a19c-48a2-84a3-d1b131c5308d', 'Có nên mua xe máy trả góp lãi suất 0%?', 'co-nen-mua-xe-may-tra-gop-lai-suat-0', 'Bài viết chia sẻ chi tiết về chủ đề Có nên mua xe máy trả góp lãi suất 0%?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Có nên mua xe máy trả góp lãi suất 0%?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-2.svg', 'Có nên mua xe máy trả góp lãi suất 0%? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Có nên mua xe máy trả góp lãi suất 0%?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('80df941c-caa3-4f94-b1ca-b38924027c48', 'Top 5 xe tay ga tiết kiệm xăng nhất 2026', 'top-5-xe-tay-ga-tiet-kiem-xang-nhat-2026', 'Bài viết chia sẻ chi tiết về chủ đề Top 5 xe tay ga tiết kiệm xăng nhất 2026. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Top 5 xe tay ga tiết kiệm xăng nhất 2026

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-3.svg', 'Top 5 xe tay ga tiết kiệm xăng nhất 2026 | Ken Motor', 'Bài viết tư vấn chuyên sâu về Top 5 xe tay ga tiết kiệm xăng nhất 2026. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('4831d2f1-d2fb-418e-9bde-5cb46387370c', 'Hướng dẫn tự bảo dưỡng xe tay ga tại nhà đơn giản', 'huong-dan-tu-bao-duong-xe-tay-ga-tai-nha-don-gian', 'Bài viết chia sẻ chi tiết về chủ đề Hướng dẫn tự bảo dưỡng xe tay ga tại nhà đơn giản. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Hướng dẫn tự bảo dưỡng xe tay ga tại nhà đơn giản

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-4.svg', 'Hướng dẫn tự bảo dưỡng xe tay ga tại nhà đơn giản | Ken Motor', 'Bài viết tư vấn chuyên sâu về Hướng dẫn tự bảo dưỡng xe tay ga tại nhà đơn giản. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('72ad2ddd-af87-4715-ad7b-ca0391e049f3', 'So sánh Honda Winner X và Yamaha Exciter 155 VVA', 'so-sanh-honda-winner-x-va-yamaha-exciter-155-vva', 'Bài viết chia sẻ chi tiết về chủ đề So sánh Honda Winner X và Yamaha Exciter 155 VVA. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về So sánh Honda Winner X và Yamaha Exciter 155 VVA

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-5.svg', 'So sánh Honda Winner X và Yamaha Exciter 155 VVA | Ken Motor', 'Bài viết tư vấn chuyên sâu về So sánh Honda Winner X và Yamaha Exciter 155 VVA. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('ab1d7275-6ac4-4ff2-a98b-b6c28c57e4c3', 'Xe máy điện VinFast có đi được trời mưa ngập nước?', 'xe-may-dien-vinfast-co-di-duoc-troi-mua-ngap-nuoc', 'Bài viết chia sẻ chi tiết về chủ đề Xe máy điện VinFast có đi được trời mưa ngập nước?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Xe máy điện VinFast có đi được trời mưa ngập nước?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-6.svg', 'Xe máy điện VinFast có đi được trời mưa ngập nước? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Xe máy điện VinFast có đi được trời mưa ngập nước?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('d92edb0f-eabb-4b60-90a7-9443f54dfee7', 'Các dòng xe phân khối lớn cho người mới bắt đầu', 'cac-dong-xe-phan-khoi-lon-cho-nguoi-moi-bat-dau', 'Bài viết chia sẻ chi tiết về chủ đề Các dòng xe phân khối lớn cho người mới bắt đầu. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Các dòng xe phân khối lớn cho người mới bắt đầu

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-7.svg', 'Các dòng xe phân khối lớn cho người mới bắt đầu | Ken Motor', 'Bài viết tư vấn chuyên sâu về Các dòng xe phân khối lớn cho người mới bắt đầu. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('479bdb24-ed09-4539-952a-cc0bb556ce5e', 'Cách phân biệt phanh ABS và CBS trên xe máy', 'cach-phan-biet-phanh-abs-va-cbs-tren-xe-may', 'Bài viết chia sẻ chi tiết về chủ đề Cách phân biệt phanh ABS và CBS trên xe máy. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Cách phân biệt phanh ABS và CBS trên xe máy

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-8.svg', 'Cách phân biệt phanh ABS và CBS trên xe máy | Ken Motor', 'Bài viết tư vấn chuyên sâu về Cách phân biệt phanh ABS và CBS trên xe máy. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('e25ee135-cb42-43be-a91b-3ac360838804', 'Kinh nghiệm chạy xe côn tay cho người mới từ A-Z', 'kinh-nghiem-chay-xe-con-tay-cho-nguoi-moi-tu-a-z', 'Bài viết chia sẻ chi tiết về chủ đề Kinh nghiệm chạy xe côn tay cho người mới từ A-Z. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Kinh nghiệm chạy xe côn tay cho người mới từ A-Z

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-9.svg', 'Kinh nghiệm chạy xe côn tay cho người mới từ A-Z | Ken Motor', 'Bài viết tư vấn chuyên sâu về Kinh nghiệm chạy xe côn tay cho người mới từ A-Z. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('efed92fd-edae-4c09-809a-97b1a85f984f', 'Nên chọn mua nhớt xe ga hay nhớt xe số?', 'nen-chon-mua-nhot-xe-ga-hay-nhot-xe-so', 'Bài viết chia sẻ chi tiết về chủ đề Nên chọn mua nhớt xe ga hay nhớt xe số?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Nên chọn mua nhớt xe ga hay nhớt xe số?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-10.svg', 'Nên chọn mua nhớt xe ga hay nhớt xe số? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Nên chọn mua nhớt xe ga hay nhớt xe số?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('8c50ef82-b94c-49ac-a120-486c9ef392c3', 'Mua xe máy mới cần đóng các khoản thuế phí gì?', 'mua-xe-may-moi-can-dong-cac-khoan-thue-phi-gi', 'Bài viết chia sẻ chi tiết về chủ đề Mua xe máy mới cần đóng các khoản thuế phí gì?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Mua xe máy mới cần đóng các khoản thuế phí gì?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-11.svg', 'Mua xe máy mới cần đóng các khoản thuế phí gì? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Mua xe máy mới cần đóng các khoản thuế phí gì?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('20cfdc15-48dc-4c53-8973-16d5b04b3b43', 'Tại sao xe máy bị hao xăng và cách khắc phục?', 'tai-sao-xe-may-bi-hao-xang-va-cach-khac-phuc', 'Bài viết chia sẻ chi tiết về chủ đề Tại sao xe máy bị hao xăng và cách khắc phục?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Tại sao xe máy bị hao xăng và cách khắc phục?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-12.svg', 'Tại sao xe máy bị hao xăng và cách khắc phục? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Tại sao xe máy bị hao xăng và cách khắc phục?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('8ffc1716-b2ce-4047-930a-e771f54526ff', 'Quy trình thủ tục thu mua xe cũ nhanh gọn tại Ken Motor', 'quy-trinh-thu-tuc-thu-mua-xe-cu-nhanh-gon-tai-ken-motor', 'Bài viết chia sẻ chi tiết về chủ đề Quy trình thủ tục thu mua xe cũ nhanh gọn tại Ken Motor. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Quy trình thủ tục thu mua xe cũ nhanh gọn tại Ken Motor

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-13.svg', 'Quy trình thủ tục thu mua xe cũ nhanh gọn tại Ken Motor | Ken Motor', 'Bài viết tư vấn chuyên sâu về Quy trình thủ tục thu mua xe cũ nhanh gọn tại Ken Motor. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('3c892a19-54ab-42d5-a190-e24ffa4fadd4', 'Đánh giá chi tiết Vespa Sprint S 125i i-get ABS', 'danh-gia-chi-tiet-vespa-sprint-s-125i-i-get-abs', 'Bài viết chia sẻ chi tiết về chủ đề Đánh giá chi tiết Vespa Sprint S 125i i-get ABS. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Đánh giá chi tiết Vespa Sprint S 125i i-get ABS

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-14.svg', 'Đánh giá chi tiết Vespa Sprint S 125i i-get ABS | Ken Motor', 'Bài viết tư vấn chuyên sâu về Đánh giá chi tiết Vespa Sprint S 125i i-get ABS. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('8cb3e42e-a7a5-490b-9268-61bef519aa30', 'Lốp xe máy đi bao nhiêu km thì nên thay mới?', 'lop-xe-may-di-bao-nhieu-km-thi-nen-thay-moi', 'Bài viết chia sẻ chi tiết về chủ đề Lốp xe máy đi bao nhiêu km thì nên thay mới?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Lốp xe máy đi bao nhiêu km thì nên thay mới?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-15.svg', 'Lốp xe máy đi bao nhiêu km thì nên thay mới? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Lốp xe máy đi bao nhiêu km thì nên thay mới?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('f298f867-ab89-428d-95b4-a632ded8803a', 'So sánh Honda Wave Alpha và Yamaha Sirius', 'so-sanh-honda-wave-alpha-va-yamaha-sirius', 'Bài viết chia sẻ chi tiết về chủ đề So sánh Honda Wave Alpha và Yamaha Sirius. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về So sánh Honda Wave Alpha và Yamaha Sirius

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-16.svg', 'So sánh Honda Wave Alpha và Yamaha Sirius | Ken Motor', 'Bài viết tư vấn chuyên sâu về So sánh Honda Wave Alpha và Yamaha Sirius. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('ec06d89e-7a88-4153-a1fd-07cbbd3637bb', 'Những lỗi thường gặp trên ổ khóa Smartkey xe máy', 'nhung-loi-thuong-gap-tren-o-khoa-smartkey-xe-may', 'Bài viết chia sẻ chi tiết về chủ đề Những lỗi thường gặp trên ổ khóa Smartkey xe máy. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Những lỗi thường gặp trên ổ khóa Smartkey xe máy

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-17.svg', 'Những lỗi thường gặp trên ổ khóa Smartkey xe máy | Ken Motor', 'Bài viết tư vấn chuyên sâu về Những lỗi thường gặp trên ổ khóa Smartkey xe máy. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('f8b13ed6-18a2-4466-a997-7075083e05cc', 'Cách vệ sinh nhông sên dĩa xe côn tay đúng chuẩn', 'cach-ve-sinh-nhong-sen-dia-xe-con-tay-dung-chuan', 'Bài viết chia sẻ chi tiết về chủ đề Cách vệ sinh nhông sên dĩa xe côn tay đúng chuẩn. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Cách vệ sinh nhông sên dĩa xe côn tay đúng chuẩn

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-18.svg', 'Cách vệ sinh nhông sên dĩa xe côn tay đúng chuẩn | Ken Motor', 'Bài viết tư vấn chuyên sâu về Cách vệ sinh nhông sên dĩa xe côn tay đúng chuẩn. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('4ea977b2-69b4-4d1f-aeb0-2c85e59492d5', 'Kinh nghiệm đi phượt bằng xe ga an toàn', 'kinh-nghiem-di-phuot-bang-xe-ga-an-toan', 'Bài viết chia sẻ chi tiết về chủ đề Kinh nghiệm đi phượt bằng xe ga an toàn. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Kinh nghiệm đi phượt bằng xe ga an toàn

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-19.svg', 'Kinh nghiệm đi phượt bằng xe ga an toàn | Ken Motor', 'Bài viết tư vấn chuyên sâu về Kinh nghiệm đi phượt bằng xe ga an toàn. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('e2c09050-8cdc-4cd3-9493-304ee2aab9ad', 'Đánh giá nhanh xe máy điện VinFast Evo200 Lite', 'danh-gia-nhanh-xe-may-dien-vinfast-evo200-lite', 'Bài viết chia sẻ chi tiết về chủ đề Đánh giá nhanh xe máy điện VinFast Evo200 Lite. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Đánh giá nhanh xe máy điện VinFast Evo200 Lite

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-20.svg', 'Đánh giá nhanh xe máy điện VinFast Evo200 Lite | Ken Motor', 'Bài viết tư vấn chuyên sâu về Đánh giá nhanh xe máy điện VinFast Evo200 Lite. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('0deefa11-db8f-436f-b737-191bb066a4ca', 'Dung tích cốp xe máy nào lớn nhất hiện nay?', 'dung-tich-cop-xe-may-nao-lon-nhat-hien-nay', 'Bài viết chia sẻ chi tiết về chủ đề Dung tích cốp xe máy nào lớn nhất hiện nay?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Dung tích cốp xe máy nào lớn nhất hiện nay?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-21.svg', 'Dung tích cốp xe máy nào lớn nhất hiện nay? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Dung tích cốp xe máy nào lớn nhất hiện nay?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('aa785124-f0f3-43e4-8e96-c385f9eb711f', 'Nên mua xe máy mới hay xe cũ đã qua sử dụng?', 'nen-mua-xe-may-moi-hay-xe-cu-da-qua-su-dung', 'Bài viết chia sẻ chi tiết về chủ đề Nên mua xe máy mới hay xe cũ đã qua sử dụng?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Nên mua xe máy mới hay xe cũ đã qua sử dụng?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-22.svg', 'Nên mua xe máy mới hay xe cũ đã qua sử dụng? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Nên mua xe máy mới hay xe cũ đã qua sử dụng?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('5627ae63-c9ad-4ab6-8e44-43f0ec4d121f', 'Các kiểm tra số khung số máy khi mua xe cũ', 'cac-kiem-tra-so-khung-so-may-khi-mua-xe-cu', 'Bài viết chia sẻ chi tiết về chủ đề Các kiểm tra số khung số máy khi mua xe cũ. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Các kiểm tra số khung số máy khi mua xe cũ

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-23.svg', 'Các kiểm tra số khung số máy khi mua xe cũ | Ken Motor', 'Bài viết tư vấn chuyên sâu về Các kiểm tra số khung số máy khi mua xe cũ. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('601c960f-b128-43b3-bb5c-eac16a30e4b8', 'Hướng dẫn chạy rô-đai xe máy mới mua chuẩn nhất', 'huong-dan-chay-ro-dai-xe-may-moi-mua-chuan-nhat', 'Bài viết chia sẻ chi tiết về chủ đề Hướng dẫn chạy rô-đai xe máy mới mua chuẩn nhất. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Hướng dẫn chạy rô-đai xe máy mới mua chuẩn nhất

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-24.svg', 'Hướng dẫn chạy rô-đai xe máy mới mua chuẩn nhất | Ken Motor', 'Bài viết tư vấn chuyên sâu về Hướng dẫn chạy rô-đai xe máy mới mua chuẩn nhất. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('70d2642a-806c-4ae7-b0d3-c781dc09d846', 'Khi nào cần thay nước làm mát cho xe máy?', 'khi-nao-can-thay-nuoc-lam-mat-cho-xe-may', 'Bài viết chia sẻ chi tiết về chủ đề Khi nào cần thay nước làm mát cho xe máy?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Khi nào cần thay nước làm mát cho xe máy?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-25.svg', 'Khi nào cần thay nước làm mát cho xe máy? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Khi nào cần thay nước làm mát cho xe máy?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('9f6545db-56f4-4ba8-bb33-0ef63a3c41d5', 'Nguyên nhân xe máy bị giật giật khi tăng ga', 'nguyen-nhan-xe-may-bi-giat-giat-khi-tang-ga', 'Bài viết chia sẻ chi tiết về chủ đề Nguyên nhân xe máy bị giật giật khi tăng ga. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Nguyên nhân xe máy bị giật giật khi tăng ga

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-26.svg', 'Nguyên nhân xe máy bị giật giật khi tăng ga | Ken Motor', 'Bài viết tư vấn chuyên sâu về Nguyên nhân xe máy bị giật giật khi tăng ga. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('3159c66c-8ada-4cc5-b53d-d6be0b43b9ea', 'Bảo hiểm xe máy bắt buộc mua ở đâu uy tín?', 'bao-hiem-xe-may-bat-buoc-mua-o-dau-uy-tin', 'Bài viết chia sẻ chi tiết về chủ đề Bảo hiểm xe máy bắt buộc mua ở đâu uy tín?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Bảo hiểm xe máy bắt buộc mua ở đâu uy tín?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-27.svg', 'Bảo hiểm xe máy bắt buộc mua ở đâu uy tín? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Bảo hiểm xe máy bắt buộc mua ở đâu uy tín?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('66d28b9a-f738-41af-99c0-fd468ffd778e', 'Có nên tự sơn lại dàn áo xe máy tại nhà?', 'co-nen-tu-son-lai-dan-ao-xe-may-tai-nha', 'Bài viết chia sẻ chi tiết về chủ đề Có nên tự sơn lại dàn áo xe máy tại nhà?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Có nên tự sơn lại dàn áo xe máy tại nhà?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-28.svg', 'Có nên tự sơn lại dàn áo xe máy tại nhà? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Có nên tự sơn lại dàn áo xe máy tại nhà?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('d2b439a8-944f-45e4-9161-7d2ef027083f', 'Độ đèn trợ sáng xe máy thế nào để không bị phạt?', 'do-den-tro-sang-xe-may-the-nao-de-khong-bi-phat', 'Bài viết chia sẻ chi tiết về chủ đề Độ đèn trợ sáng xe máy thế nào để không bị phạt?. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Độ đèn trợ sáng xe máy thế nào để không bị phạt?

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-29.svg', 'Độ đèn trợ sáng xe máy thế nào để không bị phạt? | Ken Motor', 'Bài viết tư vấn chuyên sâu về Độ đèn trợ sáng xe máy thế nào để không bị phạt?. Đọc ngay để cập nhật kiến thức hữu ích nhất.'),
('ba8bdbec-ca1b-4404-904b-dd0b53373d29', 'Tìm hiểu hệ thống van biến thiên VVA trên xe Yamaha', 'tim-hieu-he-thong-van-bien-thien-vva-tren-xe-yamaha', 'Bài viết chia sẻ chi tiết về chủ đề Tìm hiểu hệ thống van biến thiên VVA trên xe Yamaha. Giúp quý khách hàng có thêm kiến thức bổ ích để sử dụng, bảo dưỡng xe máy hoặc lựa chọn sản phẩm phù hợp.', '## Nội dung chi tiết về Tìm hiểu hệ thống van biến thiên VVA trên xe Yamaha

Đây là bài viết đầy đủ chia sẻ về kinh nghiệm chọn xe, đánh giá xe máy cũng như kỹ năng bảo dưỡng vận hành phương tiện an toàn hiệu quả. Chuyên mục chia sẻ kinh nghiệm mua bán xe máy mới và xe máy cũ của cửa hàng xe máy **Ken Motor** Đồng Tháp.

### 1. Phân tích chi tiết

Nhu cầu đi lại bằng phương tiện xe hai bánh tại Việt Nam, đặc biệt ở các vùng như Đồng Tháp luôn ở mức cao. Do đó việc trang bị kiến thức mua sắm và vận hành là tối quan trọng giúp bảo vệ túi tiền và đảm bảo an toàn giao thông cho chính bạn.

### 2. Các điểm cần lưu ý
- Lựa chọn dòng xe phù hợp với vóc dáng chiều cao và mục đích đi làm, đi học.
- Cân đối tài chính cá nhân trước khi tham gia trả góp.
- Thường xuyên thay nhớt định kỳ từ 1500km đến 2000km.
- Kiểm tra hệ thống phanh an toàn trước các chuyến đi xa.

Hy vọng bài viết mang lại nhiều thông tin hữu ích cho bạn! Đừng ngần ngại liên hệ hotline 0787990047 để được tư vấn thêm.', '/demo/posts/post-30.svg', 'Tìm hiểu hệ thống van biến thiên VVA trên xe Yamaha | Ken Motor', 'Bài viết tư vấn chuyên sâu về Tìm hiểu hệ thống van biến thiên VVA trên xe Yamaha. Đọc ngay để cập nhật kiến thức hữu ích nhất.')
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
('71445c7b-0fe9-4fc6-a759-4508fafe7d30', 'ĐẲNG CẤP SHOWROOM KEN MOTOR', 'Địa điểm mua bán xe máy mới & cũ uy tín hàng đầu tại Đồng Tháp. Trả góp linh hoạt, duyệt hồ sơ 15 phút.', '/demo/sliders/slider-1-desktop.svg', '/demo/sliders/slider-1-mobile.svg', '/vehicles', 'Khám Phá Ngay', 1),
('389a7051-f1cd-4f98-aa76-d418c532b99f', 'TƯ VẤN CHỌN XE THÔNG MINH', 'Bạn phân vân giữa xe số, xe ga hay côn tay? Trả lời vài câu hỏi để tìm chiếc xe phù hợp nhất với bạn.', '/demo/sliders/slider-2-desktop.svg', '/demo/sliders/slider-2-mobile.svg', '/tu-van-chon-xe', 'Tư Vấn Chọn Xe', 2),
('f2763390-8df7-42bf-84aa-1814641472eb', 'SO SÁNH XE DỄ DÀNG', 'So sánh chi tiết thông số kỹ thuật, giá bán và mức tiêu hao xăng giữa 2-3 chiếc xe cùng lúc.', '/demo/sliders/slider-3-desktop.svg', '/demo/sliders/slider-3-mobile.svg', '/so-sanh', 'So Sánh Ngay', 3),
('87ff8fa0-3f31-4fcb-8fd6-06aa7c13fe33', 'TRẢ GÓP DỄ DÀNG - LÃI SUẤT THẤP', 'Công cụ tính toán số tiền trả trước, kỳ hạn góp và số tiền đóng mỗi tháng trực quan, chính xác.', '/demo/sliders/slider-4-desktop.svg', '/demo/sliders/slider-4-mobile.svg', '/tra-gop', 'Tính Trả Góp', 4),
('c882b00f-b253-4fe4-860d-c2b5ca57030f', 'THU MUA XE CŨ GIÁ CAO', 'Bạn muốn lên đời xe mới? Đăng ký định giá xe cũ online nhanh chóng. Định giá đúng giá trị, giao dịch trong ngày.', '/demo/sliders/slider-5-desktop.svg', '/demo/sliders/slider-5-mobile.svg', '/ban-xe-cu', 'Đăng Bán Xe Cũ', 5),
('b54896e7-af26-4671-a461-92d5f8109b73', 'ĐĂNG KÝ LÁI THỬ XE MIỄN PHÍ', 'Trải nghiệm thực tế các dòng xe mới nhất: SH, Air Blade, Winner X, Exciter trước khi đưa ra quyết định.', '/demo/sliders/slider-6-desktop.svg', '/demo/sliders/slider-6-mobile.svg', '/lai-thu', 'Đặt Lịch Lái Thử', 6),
('95987b8e-eddf-4cae-8d67-3e71a9c949a2', 'XE CŨ KIỂM ĐỊNH MINH BẠCH', 'Cam kết xe máy cũ nguyên bản, có bảng đánh giá chi tiết tình trạng máy móc, dàn áo và giấy tờ chính chủ.', '/demo/sliders/slider-7-desktop.svg', '/demo/sliders/slider-7-mobile.svg', '/vehicles?condition=old', 'Xem Xe Cũ', 7),
('21cab5dd-b22a-4edb-a8ac-62db246c45f8', 'SIÊU XE PKL CỰC CHẤT', 'Trải nghiệm cảm giác phấn khích tột độ cùng các dòng xe PKL chính hãng tại showroom.', '/demo/sliders/slider-8-desktop.svg', '/demo/sliders/slider-8-mobile.svg', '/vehicles?category=xe-phan-khoi-lon', 'Xem Xe PKL', 8)
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
('445c1960-1d70-402d-9022-1f433ab10dd2', 'Cửa hàng Ken Motor có địa chỉ ở đâu?', 'Ken Motor tọa lạc tại Long Hưng, Đồng Tháp. Quý khách có thể xem bản đồ chi tiết trong trang liên hệ.', 1),
('c6ad9d73-bdef-4d89-bb82-21d5c46a3ba9', 'Số điện thoại hotline tư vấn nhanh là số nào?', 'Hotline chính thức của chúng tôi là 0787990047 (hỗ trợ cuộc gọi và Zalo 24/7).', 2),
('06149b6c-0a08-471f-bef6-96b27f009aa5', 'Cửa hàng có hỗ trợ mua xe trả góp không?', 'Có, chúng tôi liên kết với nhiều ngân hàng và công ty tài chính (HD Saison, FE Credit, MCredit) hỗ trợ trả góp nhanh chóng.', 3),
('77dabc45-280c-4409-943b-124e41f4a169', 'Thủ tục mua xe máy trả góp cần những giấy tờ gì?', 'Quý khách chỉ cần chuẩn bị Căn cước công dân gắn chíp là có thể làm hồ sơ trả góp.', 4),
('4ad8362b-ed24-42f8-9e62-78370470da63', 'Độ tuổi tối thiểu để được duyệt hồ sơ trả góp xe máy?', 'Khách hàng từ đủ 18 tuổi trở lên là có thể đăng ký mua xe trả góp.', 5),
('ea42215a-d43e-4c75-84b4-008f4cb46740', 'Cần trả trước bao nhiêu tiền khi mua xe trả góp?', 'Quý khách chỉ cần trả trước tối thiểu từ 10% đến 30% giá trị xe tùy dòng xe và gói vay.', 6),
('e5ad3979-e210-4c6a-b7e0-8b79d094220d', 'Thời gian xét duyệt hồ sơ trả góp mất bao lâu?', 'Thời gian xét duyệt hồ sơ cực nhanh, chỉ khoảng 15 đến 30 phút là có kết quả nhận xe.', 7),
('0b408cb9-639c-438c-9826-0cbd6b66e79b', 'Xe máy cũ tại Ken Motor có được bảo hành không?', 'Có, tất cả xe máy cũ bán ra đều được bảo hành động cơ từ 3 đến 6 tháng tùy đời xe.', 8),
('40f6fc31-ca49-439a-95fb-605c86d6716e', 'Cửa hàng có hỗ trợ sang tên rút gốc giấy tờ xe cũ không?', 'Chúng tôi cam kết pháp lý rõ ràng, hỗ trợ toàn bộ thủ tục rút hồ sơ gốc và sang tên đổi chủ nhanh chóng.', 9),
('f115c354-fb9a-4e48-9bce-33cc5a92a485', 'Mua xe cũ tại Ken Motor có đảm bảo xe không bị đâm đụng, ngập nước?', 'Mỗi xe cũ đều có bảng đánh giá tình trạng minh bạch, cam kết khung sườn nguyên bản, không đâm đụng ngập nước.', 10),
('58214efb-abd5-4b6f-bb41-34888aabadf4', 'Làm thế nào để đăng ký lái thử xe?', 'Quý khách có thể vào trang Lái Thử trên website, điền thông tin xe mong muốn và thời gian lái thử.', 11),
('e701e565-c1af-4d34-940b-089732f8159b', 'Đăng ký lái thử xe có mất phí không?', 'Chương trình đăng ký lái thử tại Ken Motor hoàn toàn miễn phí.', 12),
('67379c07-ace5-4018-a91c-ca28c18fdaac', 'Cửa hàng có thu mua lại xe cũ của khách hàng không?', 'Có, chúng tôi nhận thu mua xe cũ giá tốt, hoặc đổi xe cũ lấy xe mới (thu cũ đổi mới) cực kỳ ưu đãi.', 13),
('e60d8d73-8457-404e-b995-28081d0f2c3e', 'Tôi muốn bán xe máy cũ online cần cung cấp thông tin gì?', 'Quý khách vào trang Bán Xe Cũ, gửi ảnh xe, đời xe, biển số, số km đi được và mức giá mong muốn.', 14),
('1a545289-1731-4204-8c65-8405247ab5e0', 'Cửa hàng có giao xe tận nhà không?', 'Chúng tôi hỗ trợ giao xe tận nhà tại tỉnh Đồng Tháp và các tỉnh lân cận.', 15),
('a30d8540-8bc8-42d4-a92c-815754e3f75a', 'Xe điện VinFast bảo hành bao lâu?', 'Xe máy điện VinFast được bảo hành chính hãng 3 năm theo chính sách của VinFast Việt Nam.', 16),
('6032af69-e838-4b27-a3bf-e55020583860', 'Phí thuê pin xe máy điện VinFast tính như thế nào?', 'Chính sách thuê pin áp dụng theo bảng giá niêm yết của VinFast, có các gói cố định và linh hoạt tùy nhu cầu.', 17),
('6014e65b-b147-47a6-9ab7-6be5f4f6e613', 'Tôi mua phụ kiện xe máy tại cửa hàng có hỗ trợ lắp đặt không?', 'Có, thợ kỹ thuật tại cửa hàng sẽ hỗ trợ lắp đặt trực tiếp miễn phí cho quý khách.', 18),
('3e6d84f2-e75d-443b-84df-48a4ed026316', 'Thời gian làm việc của cửa hàng Ken Motor?', 'Cửa hàng làm việc từ 7:30 đến 18:30 tất cả các ngày trong tuần, kể cả ngày lễ.', 19),
('1198f4b1-0f66-4006-a7e4-182ef16939c1', 'Có cần bằng lái xe khi chạy xe máy điện không?', 'Với xe điện công suất nhỏ như Evo200 Lite (tối đa 49km/h) thì học sinh không cần bằng lái xe.', 20),
('4cd0e25f-552b-4fce-a376-a277bb624db4', 'Mua xe máy tại Ken Motor có được tặng quà gì không?', 'Quý khách sẽ được tặng nón bảo hiểm chính hãng, áo mưa cao cấp, thay nhớt miễn phí lần đầu và nhiều quà tặng đi kèm.', 21),
('daece5f6-de12-45e9-84bc-75d8db8121bc', 'Lại suất trả góp dự tính khoảng bao nhiêu?', 'Lãi suất dao động từ 0.99% đến 1.89% mỗi tháng tùy gói hồ sơ và điểm tín dụng của khách hàng.', 22),
('71a4d0b0-1bc8-40d0-aa46-577d6b7863d0', 'Nếu hộ khẩu ở tỉnh khác có mua xe trả góp tại Đồng Tháp được không?', 'Được, chỉ cần có CCCD gắn chip là hỗ trợ làm hồ sơ toàn quốc.', 23),
('e7979598-96c9-4917-978a-7db8d2104754', 'Cửa hàng có những dòng xe phân khối lớn nào?', 'Chúng tôi phân phối các dòng xe PKL nhập khẩu từ Kawasaki, KTM, Ducati và Honda.', 24),
('ec2bd129-f721-4533-a3b2-c50864da84ca', 'Xe số Honda Wave Alpha đi bao nhiêu km thì thay nhớt?', 'Nên thay nhớt động cơ sau mỗi 1500km đến 2000km để giữ xe bền bỉ.', 25),
('07fed615-2882-4163-bf5a-6b4a257880b8', 'Phanh ABS khác phanh CBS như thế nào?', 'ABS chống bó cứng phanh khi phanh gấp tránh trượt bánh, còn CBS là phanh kết hợp phân bổ lực phanh đồng thời hai bánh.', 26),
('f5d19a52-604a-4288-938e-4db24ac0bc24', 'Tôi có thể thanh toán tiền mua xe bằng hình thức nào?', 'Cửa hàng hỗ trợ thanh toán tiền mặt, chuyển khoản ngân hàng hoặc quẹt thẻ POS.', 27),
('abe1c2a3-e086-4550-a0fe-06db0dd99379', 'Quy trình định giá xe cũ tại tiệm mất bao lâu?', 'Kiểm tra thực tế xe và báo giá thu mua ngay trong vòng 10 đến 15 phút.', 28),
('b1ddbb6e-8dbb-4bdd-b45a-da304a9bbb46', 'Có được chọn màu xe theo phong thủy tại Ken Motor không?', 'Đội ngũ tư vấn sẽ tư vấn kỹ màu xe phù hợp phong thủy tuổi mệnh của khách hàng.', 29),
('d8090a45-cc0e-4de2-8830-6b161c893040', 'Làm sao để biết xe máy cũ có giấy tờ hợp lệ?', 'Cửa hàng kiểm tra gốc xe trên hệ thống đăng ký, cam kết 100% giấy tờ hợp lệ, không tranh chấp.', 30)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order;

-- 8. Insert Testimonials
INSERT INTO testimonials (id, name, avatar_url, role, comment, rating, sort_order) VALUES
('72800d6a-7478-4590-b027-99c6d26f0bf4', 'Nguyễn Văn Hùng', '/demo/testimonials/avatar-1.svg', 'Khách hàng mua xe mới', 'Mua chiếc Winner X ở đây máy móc chạy cực bốc, dịch vụ tư vấn trả góp rất nhiệt tình.', 4, 1),
('7e44c287-aa4e-4677-a1b1-00c00ccb50f8', 'Trần Thị Mai', '/demo/testimonials/avatar-2.svg', 'Khách hàng mua xe cũ', 'Xe cũ ở cửa hàng chất lượng rất ổn định, tôi đi được hơn 1 năm rồi mà máy vẫn êm ru.', 5, 2),
('f95ca333-99ac-4fef-b8bc-8cb7bc290509', 'Lê Hoàng Nam', '/demo/testimonials/avatar-3.svg', 'Khách hàng mua xe mới', 'Nhân viên làm hồ sơ trả góp cực nhanh, 15 phút là đã được dắt xe ra về rồi.', 5, 3),
('1f3a3b77-8be7-4f29-86f4-b4e3acabd352', 'Phạm Minh Tuấn', '/demo/testimonials/avatar-4.svg', 'Khách hàng mua xe cũ', 'Showroom sang trọng, nhiều mẫu xe hot. Giá cả rất cạnh tranh tại Cao Lãnh Đồng Tháp.', 5, 4),
('94096186-f3dc-4f34-a4f3-68707bbb2cec', 'Vũ Thị Hồng', '/demo/testimonials/avatar-5.svg', 'Khách hàng mua xe mới', 'Rất hài lòng với chính sách hỗ trợ rút hồ sơ và sang tên chính chủ cho xe cũ của tiệm.', 5, 5),
('e5319056-4c6c-4a63-b55a-35cb123b2c06', 'Đặng Anh Tú', '/demo/testimonials/avatar-6.svg', 'Khách hàng mua xe cũ', 'Mua xe máy điện Evo200 cho con đi học rất tiết kiệm xăng và an toàn, cám ơn Ken Motor.', 4, 6),
('777a080f-81b6-48a2-84fb-13536662a998', 'Bùi Minh Trí', '/demo/testimonials/avatar-7.svg', 'Khách hàng mua xe mới', 'Đã giới thiệu 2 người bạn qua đây mua xe cũ, ai cũng khen xe chạy ngon lành cành đào.', 5, 7),
('9c8e3a8f-60d3-41d2-895e-766b2ca77745', 'Ngô Thanh Sơn', '/demo/testimonials/avatar-8.svg', 'Khách hàng mua xe cũ', 'Tư vấn chọn xe online rất chính xác, đề xuất xe ga phù hợp chiều cao của mình.', 5, 8),
('b163abf8-dc2f-407a-8253-6aa8b6a451bd', 'Đỗ Thùy Linh', '/demo/testimonials/avatar-9.svg', 'Khách hàng mua xe mới', 'Thợ sửa xe và lắp phụ kiện tay nghề cao, làm việc cẩn thận tỉ mỉ.', 5, 9),
('9a26e32e-984d-481d-a97c-d5cda6333f7a', 'Hoàng Văn Hải', '/demo/testimonials/avatar-10.svg', 'Khách hàng mua xe cũ', 'Xe côn tay Ducati Monster mua ở đây chuẩn chỉ, chế độ hậu mãi chu đáo.', 5, 10),
('f714a633-3e0e-4c4a-9970-1c9f6d0534c9', 'Lý Quốc Bảo', '/demo/testimonials/avatar-11.svg', 'Khách hàng mua xe mới', 'Địa chỉ mua xe máy tin cậy nhất Đồng Tháp, ông chủ vui tính, nhân viên chu đáo.', 4, 11),
('67279127-27d8-40af-b029-62d3af1697d4', 'Trịnh Khánh An', '/demo/testimonials/avatar-12.svg', 'Khách hàng mua xe cũ', 'Trang so sánh xe của web rất tiện lợi, giúp mình cân nhắc được giữa Air Blade và NVX.', 5, 12),
('623d0532-f6e9-4db2-83ca-815f8a3096c4', 'Phan Văn Đức', '/demo/testimonials/avatar-13.svg', 'Khách hàng mua xe mới', 'Mức giá bán xe cũ rất tốt, định giá xe cũ đổi xe mới nhanh gọn lẹ.', 5, 13),
('c699b9f0-e7d6-47db-9b9a-d4679b3e7ca6', 'Lâm Minh Thư', '/demo/testimonials/avatar-14.svg', 'Khách hàng mua xe cũ', 'Dịch vụ giao xe tận nhà rất chu đáo, xe giao tới còn bóng loáng nguyên đai nguyên kiện.', 5, 14),
('d00361c9-dca6-4019-b64c-c7f85f741c7b', 'Võ Hoàng Huy', '/demo/testimonials/avatar-15.svg', 'Khách hàng mua xe mới', 'Checklist xe cũ làm rất chi tiết, nhìn vào là biết tình trạng vỏ phanh máy thế nào.', 5, 15),
('63b8ce7d-6b8b-4d50-b051-984f565feb3f', 'Huỳnh Ngọc Hà', '/demo/testimonials/avatar-16.svg', 'Khách hàng mua xe cũ', 'Bảo hành uy tín, xe gặp lỗi mang ra tiệm là thợ xử lý nhanh không kì kèo.', 4, 16),
('2416ee5a-58f6-4074-9aa6-19fde4bf62c2', 'Mai Tiến Đạt', '/demo/testimonials/avatar-17.svg', 'Khách hàng mua xe mới', 'Mua trả trước chỉ 20% mà lãi suất khá ưu đãi, mỗi tháng đóng tiền rất nhẹ nhàng.', 5, 17),
('2157efc5-cc14-408e-84f2-043f64f0978f', 'Cao Phương Thảo', '/demo/testimonials/avatar-18.svg', 'Khách hàng mua xe cũ', 'Quà tặng kèm theo nón bảo hiểm chất lượng tốt, không phải loại nón mỏng rẻ tiền.', 5, 18),
('90d4c88c-47a9-4a4b-ac43-38d471e495d9', 'Đinh Công Minh', '/demo/testimonials/avatar-19.svg', 'Khách hàng mua xe mới', 'Tôi bán lại chiếc Vision cũ ở đây được giá cao hơn các chỗ khác khảo sát.', 5, 19),
('6f686089-e10d-4aa4-afe2-426cf49eda01', 'Quách Thành Danh', '/demo/testimonials/avatar-20.svg', 'Khách hàng mua xe cũ', 'Trải nghiệm tuyệt vời từ lúc tư vấn lái thử đến khi giao xe. Sẽ tiếp tục ủng hộ!', 5, 20)
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
  "google_maps_iframe": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.960249764724!2d105.74836697479836!3d10.344933989779357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a6568bbffffff%3A0xe543bd105e4ebcf6!2zTG9uZyBIxrBuZywgTOG6pXAgVsOyLCDEkOG7k25nIFRow6FwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1718873000000!5m2!1svi!2s\" width=\"100%\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
  "seo_default_title": "Ken Motor | Cửa Hàng Xe Máy Uy Tín Tại Đồng Tháp",
  "seo_default_description": "Ken Motor chuyên mua bán xe máy mới, xe máy đã qua sử dụng, xe tay ga, xe số, xe côn tay và xe điện. Hỗ trợ tư vấn chọn xe, báo giá nhanh, trả góp linh hoạt và giao xe tận nơi.",
  "logo_url": "/logo.png",
  "favicon_url": "/favicon.ico"
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 10. Insert Quote Requests
INSERT INTO quote_requests (id, name, phone, email, notes, vehicle_ids, total_price, status, internal_notes) VALUES
('d213c538-3d59-4c06-8266-adae2f78f8a5', 'Khách Báo Giá 1', '0903112231', 'khachhang1@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["afca39b2-3af1-4679-9285-1b0f2c114656"]'::jsonb, 43000000, 'Contacted', ''),
('b65d2550-67d5-4af6-a7dd-2220b3791ef0', 'Khách Báo Giá 2', '0903112232', 'khachhang2@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["e567bcd5-534c-454e-9d3c-5466cc79f95d"]'::jsonb, 83000000, 'Consulting', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('8b79beee-5efd-40a6-bcf1-a26891c55c9e', 'Khách Báo Giá 3', '0903112233', 'khachhang3@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["449aa7ea-5574-44d4-a819-33ddc14a968b","0b45d680-21ec-4c2a-bdad-4deaa803e03d"]'::jsonb, 31400000, 'Closed', ''),
('36431ce4-ea16-48d7-bb5f-b27bc0d3ae17', 'Khách Báo Giá 4', '0903112234', 'khachhang4@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["56710c1c-53d1-4fe8-9242-a83381390f00"]'::jsonb, 19500000, 'Cancelled', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('e4e87816-7253-47ae-8dc7-9c835e5056d4', 'Khách Báo Giá 5', '0903112235', 'khachhang5@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["386827fc-3fe4-4aab-b6f4-3c6d09730d7d"]'::jsonb, 72000000, 'Pending', ''),
('b2429475-0094-40b9-a6ca-df161329a0ea', 'Khách Báo Giá 6', '0903112236', 'khachhang6@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["6a822785-05dd-4606-8aed-40d70e45f32c","f44213ea-be36-4c01-aa2a-4bff3c8f816a"]'::jsonb, 201500000, 'Contacted', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('ca05ad96-d965-4575-92b6-38e6a5c5ea40', 'Khách Báo Giá 7', '0903112237', 'khachhang7@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["0b45d680-21ec-4c2a-bdad-4deaa803e03d"]'::jsonb, 12500000, 'Consulting', ''),
('f6254dd1-07c0-4429-b15e-98b89425845c', 'Khách Báo Giá 8', '0903112238', 'khachhang8@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["6a91223d-4c73-4fd9-9edc-69725b4507c9"]'::jsonb, 27000000, 'Closed', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('2bb38cef-3db9-4f0a-bfed-1fb0b0dbfe25', 'Khách Báo Giá 9', '0903112239', 'khachhang9@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["8d0b4d65-1e44-4c9d-b763-26a63c0155be","41a59baf-df14-46e6-8880-e392a719b9cf"]'::jsonb, 67500000, 'Cancelled', ''),
('f1bcf625-b565-4764-9996-dbcdb660e522', 'Khách Báo Giá 10', '0903112230', 'khachhang10@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["7a35c1d5-cf59-42ce-bd1f-0b08d25b8f40"]'::jsonb, 19200000, 'Pending', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('9a8f284e-4ec8-4264-a289-8b663e41c9b4', 'Khách Báo Giá 11', '0903112231', 'khachhang11@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["ba90eab9-0ed3-4e94-8e9c-4a196c09f17d"]'::jsonb, 52000000, 'Contacted', ''),
('0e9043cb-8afd-4401-8f83-1803bc1cc0e6', 'Khách Báo Giá 12', '0903112232', 'khachhang12@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["33681256-1331-4d2c-9a0d-a543f8061e78","d78edb3a-2061-4b73-aa69-6dc6cb6e94d1"]'::jsonb, 188000000, 'Consulting', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('9f78a373-3903-4e20-b942-ae2ca14eb6fb', 'Khách Báo Giá 13', '0903112233', 'khachhang13@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["b0b3d30d-34f4-484f-b5d9-f829dac2fa73"]'::jsonb, 124000000, 'Closed', ''),
('c83e0a63-3536-4b95-8d00-4c5538f6e86b', 'Khách Báo Giá 14', '0903112234', 'khachhang14@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["f44213ea-be36-4c01-aa2a-4bff3c8f816a"]'::jsonb, 21500000, 'Cancelled', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('e79dd931-0d84-4d6f-824a-7c95d4553a20', 'Khách Báo Giá 15', '0903112235', 'khachhang15@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["263179dc-4646-426d-8809-53e483ebb147","199e2205-16f4-41a1-8fde-d1d12fd34ef5"]'::jsonb, 233600000, 'Pending', ''),
('e2b00655-bea2-4dea-9a59-be405ad13590', 'Khách Báo Giá 16', '0903112236', 'khachhang16@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["96368194-f31d-4622-aae1-a6b277b30861"]'::jsonb, 71990000, 'Contacted', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('5e40c36a-1066-4798-be0e-b9ce21497732', 'Khách Báo Giá 17', '0903112237', 'khachhang17@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["e13ba4f1-02f2-45ec-ba28-f809e3588147"]'::jsonb, 115900000, 'Consulting', ''),
('ab913847-6544-4664-b421-d079c7284518', 'Khách Báo Giá 18', '0903112238', 'khachhang18@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["3ca8bdff-7a87-4f34-9a3d-044c129c02dc","30949cea-3937-4f30-bc2c-d637f2fcc5c1"]'::jsonb, 64500000, 'Closed', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.'),
('9d7d8cf5-e53a-4173-af28-ba2efe8e6a3d', 'Khách Báo Giá 19', '0903112239', 'khachhang19@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["159ac648-a929-4c72-be08-50f0603e6c80"]'::jsonb, 17000000, 'Cancelled', ''),
('f2768204-e952-4e78-9d73-74925b99799c', 'Khách Báo Giá 20', '0903112230', 'khachhang20@gmail.com', 'Tôi cần báo giá lăn bánh trọn gói cho xe này tại Cao Lãnh, Đồng Tháp.', '["25aceaca-90b2-4427-8b02-2f330713bda7"]'::jsonb, 28700000, 'Pending', 'Đã gọi điện trao đổi, khách hẹn tuần sau ghé cửa hàng.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  notes = EXCLUDED.notes,
  vehicle_ids = EXCLUDED.vehicle_ids,
  total_price = EXCLUDED.total_price,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

-- 11. Insert Installment Requests
INSERT INTO installment_requests (id, name, phone, vehicle_id, price, downpayment, term_months, interest_rate, status, internal_notes) VALUES
('fbbea940-0c6e-4d63-8933-513445e3d7f7', 'Khách Trả Góp 1', '0987654321', '02880cf2-e54e-4ef7-a732-48b03055f720', 64500000, 19350000, 12, 1.39, 'Contacted', 'Khách muốn trả góp qua HD Saison trong 12 tháng.'),
('6153bab4-c328-41ba-92cd-506825b7add0', 'Khách Trả Góp 2', '0987654322', '45330799-3862-4532-9028-fe3639a32296', 22500000, 6750000, 18, 1.39, 'Consulting', 'Khách muốn trả góp qua HD Saison trong 18 tháng.'),
('a6aeabd8-e6b0-4d2d-8948-21c20404f147', 'Khách Trả Góp 3', '0987654323', '386827fc-3fe4-4aab-b6f4-3c6d09730d7d', 72000000, 21600000, 24, 1.39, 'Closed', 'Khách muốn trả góp qua HD Saison trong 24 tháng.'),
('82af82e6-09d7-4cf3-a285-235ed52d1d1c', 'Khách Trả Góp 4', '0987654324', '623d6583-cfc8-4e34-8492-2217e3feb41b', 246000000, 73800000, 6, 1.39, 'Pending', 'Khách muốn trả góp qua HD Saison trong 6 tháng.'),
('8fe4f768-a77c-4cc1-a1b4-9f02cf9d8cf9', 'Khách Trả Góp 5', '0987654325', 'a09f1370-0201-4a40-93c4-2c1a2130b6ec', 28500000, 8550000, 12, 1.39, 'Contacted', 'Khách muốn trả góp qua HD Saison trong 12 tháng.'),
('6eec1214-9ed4-4e72-a24b-ce6081933873', 'Khách Trả Góp 6', '0987654326', '7a35c1d5-cf59-42ce-bd1f-0b08d25b8f40', 19200000, 5760000, 18, 1.39, 'Consulting', 'Khách muốn trả góp qua HD Saison trong 18 tháng.'),
('8934a86f-c16c-4f78-a722-dcb445c10903', 'Khách Trả Góp 7', '0987654327', 'fcadae64-3e50-4f83-b2d8-478c5ee1f635', 78000000, 23400000, 24, 1.39, 'Closed', 'Khách muốn trả góp qua HD Saison trong 24 tháng.'),
('2191cc04-8a68-4ae9-a4e5-04f4030c4929', 'Khách Trả Góp 8', '0987654328', '16a05ba9-f2af-4e74-9e32-440c4a38befc', 259000000, 77700000, 6, 1.39, 'Pending', 'Khách muốn trả góp qua HD Saison trong 6 tháng.'),
('712f9680-1245-4bae-9225-e57be4800c55', 'Khách Trả Góp 9', '0987654329', '263179dc-4646-426d-8809-53e483ebb147', 48600000, 14580000, 12, 1.39, 'Contacted', 'Khách muốn trả góp qua HD Saison trong 12 tháng.'),
('c2fb051c-c824-4ca0-ae53-ac50f0b851e3', 'Khách Trả Góp 10', '0987654320', 'a7b32ca6-562d-4f0e-9c71-2179502d085c', 125000000, 37500000, 18, 1.39, 'Consulting', 'Khách muốn trả góp qua HD Saison trong 18 tháng.'),
('23f14620-d30a-40b5-94b3-35da316969ec', 'Khách Trả Góp 11', '0987654321', 'a16ebddf-b817-4cd1-8152-11c03f7c7a70', 33700000, 10110000, 24, 1.39, 'Closed', 'Khách muốn trả góp qua HD Saison trong 24 tháng.'),
('9f704309-3009-46b7-8b06-cde3b408fd30', 'Khách Trả Góp 12', '0987654322', '25aceaca-90b2-4427-8b02-2f330713bda7', 28700000, 8610000, 6, 1.39, 'Pending', 'Khách muốn trả góp qua HD Saison trong 6 tháng.'),
('937309be-6d9e-4988-af82-180b62980c0a', 'Khách Trả Góp 13', '0987654323', 'a95fda59-28dc-4866-b52e-80e84730c664', 84800000, 25440000, 12, 1.39, 'Contacted', 'Khách muốn trả góp qua HD Saison trong 12 tháng.'),
('71124cb6-40e7-4014-bdd0-1540da6c4017', 'Khách Trả Góp 14', '0987654324', 'ddb67567-3967-4e1c-adf8-3fc1ea2e433b', 18000000, 5400000, 18, 1.39, 'Consulting', 'Khách muốn trả góp qua HD Saison trong 18 tháng.'),
('bc9e690a-d72e-4108-82d0-92be43104630', 'Khách Trả Góp 15', '0987654325', '2a846738-068d-4988-b0ed-c1db12cfd3e8', 11000000, 3300000, 24, 1.39, 'Closed', 'Khách muốn trả góp qua HD Saison trong 24 tháng.')
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

-- 12. Insert Sell Requests
INSERT INTO sell_vehicle_requests (id, name, phone, brand_name, model_name, year, license_plate, odometer, status_description, image_urls, desired_price, status, internal_notes) VALUES
('bf69ceb9-2ac5-4c06-982c-5eba8bce0514', 'Khách Bán Xe 1', '0912345671', 'Yamaha', 'Exciter 150 2017', 2016, '66F1-123.45', 17000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 16500000, 'Contacted', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('9f0133d7-08c2-48a1-9295-01167a2c73af', 'Khách Bán Xe 2', '0912345672', 'Suzuki', 'Raider 2019', 2017, '66F1-223.45', 19000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 18000000, 'Closed', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('bcc8a8c2-b613-46a5-b5f4-a1e832883eb7', 'Khách Bán Xe 3', '0912345673', 'Honda', 'Vision 2018', 2018, '66F1-323.45', 21000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 19500000, 'Cancelled', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('c86247ed-a14c-43d4-b786-5f4fc996aec6', 'Khách Bán Xe 4', '0912345674', 'Yamaha', 'Exciter 150 2017', 2019, '66F1-423.45', 23000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 21000000, 'Pending', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('ccd93500-9d0b-4214-9ba2-3566525b3470', 'Khách Bán Xe 5', '0912345675', 'Suzuki', 'Raider 2019', 2015, '66F1-523.45', 25000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 22500000, 'Contacted', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('9d77167c-9c6d-40b5-b495-8a597c418977', 'Khách Bán Xe 6', '0912345676', 'Honda', 'Vision 2018', 2016, '66F1-623.45', 27000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 24000000, 'Closed', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('26984fa1-bc0f-494d-938b-9e4295838168', 'Khách Bán Xe 7', '0912345677', 'Yamaha', 'Exciter 150 2017', 2017, '66F1-723.45', 29000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 25500000, 'Cancelled', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('1132bc96-fe56-4bf7-af47-42df7038efb2', 'Khách Bán Xe 8', '0912345678', 'Suzuki', 'Raider 2019', 2018, '66F1-823.45', 31000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 27000000, 'Pending', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('8569e708-231e-4413-936c-9cd6f35a5020', 'Khách Bán Xe 9', '0912345679', 'Honda', 'Vision 2018', 2019, '66F1-923.45', 33000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 28500000, 'Contacted', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.'),
('47c6ae76-d740-4be1-8821-1ab6c5abfc48', 'Khách Bán Xe 10', '0912345670', 'Yamaha', 'Exciter 150 2017', 2015, '66F1-1023.45', 35000, 'Xe dán keo nguyên con, trầy xước nhẹ, máy móc bao zin chưa bung đầu chẻ máy.', '["/demo/placeholder-vehicle.svg"]'::jsonb, 30000000, 'Closed', 'Đã hẹn khách đem xe trực tiếp qua showroom Long Hưng để định giá thẩm định chính xác.')
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

-- 13. Insert Test Drive Requests
INSERT INTO test_drive_requests (id, name, phone, vehicle_id, desired_date, notes, status, internal_notes) VALUES
('adf679b2-b3ed-4f64-87e6-6f13cbc47f9f', 'Khách Lái Thử 1', '0934567891', 'ed1f02b9-55eb-460f-bc24-f02896eed838', '2026-06-21', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Contacted', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('df573fbb-9afe-4527-8396-124b14a8fd38', 'Khách Lái Thử 2', '0934567892', '0ed95862-0197-4cf8-9dac-ea7d449b514d', '2026-06-22', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Closed', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('939c42c9-f7d7-4a38-9da3-e4358b69034f', 'Khách Lái Thử 3', '0934567893', '6a91223d-4c73-4fd9-9edc-69725b4507c9', '2026-06-23', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Pending', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('1ec877d5-1aa1-4842-b686-dcd2b2f07ffe', 'Khách Lái Thử 4', '0934567894', '32d6b456-4958-46c0-b786-1817da554c61', '2026-06-24', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Contacted', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('4e329749-98ac-4071-8f73-bf3b1cf731d9', 'Khách Lái Thử 5', '0934567895', '16a05ba9-f2af-4e74-9e32-440c4a38befc', '2026-06-25', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Closed', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('715c880b-3d47-4a7a-887f-9796db50f2a7', 'Khách Lái Thử 6', '0934567896', '96368194-f31d-4622-aae1-a6b277b30861', '2026-06-26', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Pending', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('1cc007c7-8294-4dac-a201-315722dcad63', 'Khách Lái Thử 7', '0934567897', '8f0727e5-bf78-456d-a021-026318df6b4b', '2026-06-20', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Contacted', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('abca6f4f-0e9d-424d-976a-bd7c7fc74748', 'Khách Lái Thử 8', '0934567898', '009fcc31-6356-4cd1-95aa-f89f4f728969', '2026-06-21', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Closed', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('ddaf7f54-0790-48f3-8cbd-16d50d620df0', 'Khách Lái Thử 9', '0934567899', '740263a8-abce-4c18-9ed0-70ba45f8fde8', '2026-06-22', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Pending', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.'),
('a55265ad-0307-42de-a608-3c71617e8c1b', 'Khách Lái Thử 10', '0934567890', '0844dae1-9817-4d45-b38b-04a52f92f37e', '2026-06-23', 'Tôi muốn chạy thử xe vào buổi sáng để kiểm tra độ êm ái của phuộc xe.', 'Contacted', 'Chuẩn bị sẵn xe và xăng cho khách lái thử.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  vehicle_id = EXCLUDED.vehicle_id,
  desired_date = EXCLUDED.desired_date,
  notes = EXCLUDED.notes,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;
