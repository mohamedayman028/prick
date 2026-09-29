/* =========================
BASIC DATA
========================= */
INSERT INTO sizes (size_name) VALUES ('S'),('M'),('L'),('Single'),('Double');

INSERT INTO categories (category_name, sort_order) VALUES
('Hot Coffee', 10),
('Warm Drinks', 20),
('Shakes', 30),
('Frappe', 40),
('Matcha', 50),
('Boba Soft', 60),
('Specialty Coffee', 70),
('Extras', 160),
('Fresh Juices', 90),
('Ice Coffee', 100),
('Smoothies', 110),
('Cold Drinks', 120),
('Dessert', 130),
('Bakery', 140),
('Coffee Packages', 150),
('Mojito and Soda', 80),
('Boba Milkshake', 61),
('Boba Smoothie', 62),
('Sandwiches', 145);



/* =========================
HOT COFFEE
========================= */
/* Size IDs: 2=M, 3=L, 4=Single, 5=Double */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(1, 'Espresso | إسبريسو', 1, 'إسبريسو مركز بنكهة غنية وكريمة ذهبية.', 'Espresso.png'),
(2, 'Macchiato | ماكياتو', 1, 'إسبريسو مع لمسة من رغوة الحليب المكثف.', 'Macchiato.png'),
(3, 'Hot Mocha | موكا ساخن', 1, 'مزيج رائع من الإسبريسو والشوكولاتة مع الحليب.', 'Hot Mocha.png'),
(4, 'Hot White Mocha | وايت موكا ساخن', 1, 'إسبريسو مع الشوكولاتة البيضاء والحليب المخملي.', 'Hot White Mocha.png'),
(5, 'Nescafe | نسكافيه', 1, 'قهوة نسكافيه كلاسيكية محضرة بالحليب الساخن.', 'Nescafe.png'),
(6, 'Nescafe Black | نسكافيه بلاك', 1, 'قهوة نسكافيه سوداء نقية لمحبي المذاق القوي.', 'Nescafe Black.png'),
(7, 'Cappuccino | كابتشينو', 1, 'إسبريسو مع حليب مبخر ورغوة كثيفة متوازنة.', 'Cappuccino.png'),
(8, 'Hot Latte | لاتيه ساخن', 1, 'إسبريسو ناعم مع كمية وافرة من الحليب المبخر.', 'Hot Latte.png'),
(9, 'Turkish Coffee | قهوة تركية', 1, 'قهوة تركية كلاسيكية محضرة بعناية ومذاق أصيل.', 'Turkish Coffee.png'),
(10, 'Turkish Coffee with Milk | قهوة فرنساوي', 1, 'قهوة تركية تقليدية مع الحليب لمذاق أكثر نعومة.', 'Turkish Coffee with Milk.png'),
(11, 'Nutella Coffee | قهوة نوتيلا', 1, 'إسبريسو غني ممزوج بلمسة من شوكولاتة نوتيلا.', 'Nutella Coffee.png'),
(12, 'Spanish Latte | سبانيش لاتيه', 1, 'لاتيه حلو مع الحليب المكثف المحلى لقوام كريمي.', 'Spanish Latte.png'),
(13, 'Flat White | فلات وايت', 1, 'إسبريسو مزدوج مع طبقة ناعمة من رغوة الحليب.', 'Flat White.png'),
(14, 'Cortado | كورتادو', 1, 'مزيج مثالي من الإسبريسو وكمية متساوية من الحليب.', 'Cortado.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Espresso: Single:65 | Double:75
(1, 4, 65), (1, 5, 75),
-- Macchiato: Double:89
(2, 5, 89),
-- Mocha: M:109 | L:119
(3, 2, 109), (3, 3, 119),
-- White Mocha: M:109 | L:119
(4, 2, 109), (4, 3, 119),
-- Nescafe (legacy prices kept)
(5, 1, 64), (5, 2, 69),
-- Nescafe Black (legacy)
(6, 1, 60), (6, 2, 65),
-- Cappuccino: M:79 | L:89
(7, 2, 79), (7, 3, 89),
-- Latte: M:79 | L:89
(8, 2, 79), (8, 3, 89),
-- Turkish Coffee: Double:75
(9, 5, 75),
-- Turkish Coffee with Milk (legacy)
(10, 1, 55), (10, 2, 65),
-- Nutella Coffee: M:109 | L:119
(11, 2, 109), (11, 3, 119),
-- Spanish Latte: M:119 | L:129
(12, 2, 119), (12, 3, 129),
-- Flat White: M:79 | L:89
(13, 2, 79), (13, 3, 89),
-- Cortado: M:79 | L:89
(14, 2, 79), (14, 3, 89);

/* =========================
WARM DRINKS
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(15, 'Tea | شاي', 2, 'شاي أسود فاخر محضر طازجاً.', 'Tea.png'),
(16, 'Tea with Milk | شاي بالحليب', 2, 'شاي كلاسيكي ممزوج بالحليب الناعم.', 'Tea with Milk.png'),
(17, 'Hot Chocolate | هوت شوكلت', 2, 'شوكولاتة غنية وحليب مبخر دافئ.', 'Hot Chocolate.png'),
(18, 'Hot Cider | هوت سيدر', 2, 'سيدر تفاح دافئ مع لمسة قرفة.', 'Hot Cider.png'),
(19, 'Sahlab | سحلب', 2, 'مشروب السحلب التقليدي بالمكسرات.', 'Sahlab.png');


INSERT INTO product_prices (product_id, size_id, price) VALUES
(15, 2, 50),
(16, 2, 60),
-- Hot Chocolate: M:140 | L:170
(17, 2, 140), (17, 3, 170),
-- Hot Cider: M:99 | L:114
(18, 2, 99), (18, 3, 114),
(19, 2, 60), (19, 3, 65);

/* =========================
SHAKES
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(20, 'Oreo Shake | أوريو شيك', 3, 'ميلك شيك كريمي مع قطع بسكويت أوريو.', 'Oreo Shake.png'),
(21, 'Nutella Shake | نوتيلا شيك', 3, 'ميلك شيك غني بشوكولاتة نوتيلا.', 'Nutella Shake.png'),
(22, 'Pistachio Shake | بستاشيو شيك', 3, 'ميلك شيك ناعم بنكهة الفستق الفاخرة.', 'Pistachio Shake.png'),
(23, 'Lotus Shake | لوتس شيك', 3, 'ميلك شيك بنكهة كريمة اللوتس المميزة.', 'Lotus Shake.png'),
(24, 'Caramel Shake | كراميل شيك', 3, 'ميلك شيك كريمي مع صوص الكراميل.', 'Caramel Shake.png'),
(25, 'Peach Shake | خوخ شيك', 3, 'ميلك شيك منعش بنكهة الخوخ الطبيعية.', 'Peach Shake.png'),
(26, 'Blueberry Shake | بلو بيري شيك', 3, 'ميلك شيك بنكهة التوت الأزرق المنعشة.', 'Blueberry Shake.png'),
(27, 'Kinder Shake | كيندر شيك', 3, 'ميلك شيك كريمي بطعم شوكولاتة كيندر.', 'Kinder Shake.png'),
(28, 'KitKat Shake | كيت كات شيك', 3, 'ميلك شيك مع قطع كيت كات المقرمشة.', 'KitKat Shake.png'),
(29, 'Twix Shake | تويكس شيك', 3, 'ميلك شيك بكراميل وبسكويت تويكس.', 'Twix Shake.png'),
(30, 'Snickers Shake | سنيكرز شيك', 3, 'ميلك شيك بكراميل وفول سوداني سنيكرز.', 'Snickers Shake.png'),
(31, 'Galaxy Shake | جلاكسي شيك', 3, 'ميلك شيك بشوكولاتة جالاكسي الناعمة.', 'Galaxy Shake.png'),
(32, 'M&M Shake | إم أند إم شيك', 3, 'ميلك شيك ممتع مع حبات إم آند إمز.', 'M&M Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Oreo Shake: M:129 | L:139
(20, 2, 129), (20, 3, 139),
-- Nutella Shake: M:139 | L:149
(21, 2, 139), (21, 3, 149),
-- Pistachio Shake: M:149 | L:159
(22, 2, 149), (22, 3, 159),
-- Lotus Shake: M:139 | L:149
(23, 2, 139), (23, 3, 149),
-- Caramel Shake: M:129 | L:139
(24, 2, 129), (24, 3, 139),
-- Peach Shake (legacy, not in new menu)
(25, 2, 99), (25, 3, 104),
-- Blueberry Shake: M:129 | L:139
(26, 2, 129), (26, 3, 139),
-- Kinder Shake: M:149 | L:159
(27, 2, 149), (27, 3, 159),
-- KitKat Shake: M:149 | L:159
(28, 2, 149), (28, 3, 159),
-- Twix Shake: M:149 | L:159
(29, 2, 149), (29, 3, 159),
-- Snickers Shake: M:149 | L:159
(30, 2, 149), (30, 3, 159),
-- Galaxy Shake: M:149 | L:159
(31, 2, 149), (31, 3, 159),
-- M&M Shake: M:149 | L:159
(32, 2, 149), (32, 3, 159);

/* =========================
FRAPPE
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(33, 'Classic Frappe | فرابيه كلاسيك', 4, 'قهوة باردة ممزوجة بالثلج والحليب.', 'Classic Frappe.png'),
(34, 'Caramel Frappe | فرابيه كراميل', 4, 'فرابيه قهوة بصوص الكراميل الغني.', 'Caramel Frappe.png'),
(35, 'Lotus Frappe | فرابيه لوتس', 4, 'فرابيه قهوة بنكهة بسكويت اللوتس.', 'Lotus Frappe.png'),
(36, 'White Mocha Frappe | فرابيه وايت موكا', 4, 'فرابيه كريمي بنكهة الشوكولاتة البيضاء.', 'White Mocha Frappe.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Classic Frappe (legacy)
(33, 2, 94), (33, 3, 99),
-- Caramel Frappe: 129
(34, 2, 129),
-- Lotus Frappe: 139
(35, 2, 139),
-- White Mocha Frappe: 139
(36, 2, 139);




/* =========================
MATCHA
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(37, 'Ice Matcha | آيس ماتشا', 5, 'ماتشا ياباني أصيل مع الثلج المنعش.', 'Ice Matcha.png'),
(38, 'Ice Matcha Strawberry | آيس ماتشا فراولة', 5, 'ماتشا مثلج بنكهة الفراولة المنعشة.', 'Ice Matcha Strawberry.png'),
(39, 'Ice Matcha Coconut | آيس ماتشا جوز هند', 5, 'ماتشا مثلج مع حليب جوز الهند الكريمي.', 'Ice Matcha Coconut.png'),
(40, 'Ice Matcha Caramel | آيس ماتشا كراميل', 5, 'ماتشا مثلج مع لمسة من الكراميل الحلو.', 'Ice Matcha Caramel.png'),
(41, 'Hot Matcha | هوت ماتشا', 5, 'ماتشا ياباني دافئ وصحي.', 'Hot Matcha.png'),
(42, 'Hot Honey Matcha | هوت هوني ماتشا', 5, 'ماتشا ساخن محلى بالعسل الطبيعي.', 'Hot Honey Matcha.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Ice Matcha: 119 (fixed)
(37, 2, 119),
-- Ice Matcha Strawberry: 139 (fixed)
(38, 2, 139),
-- Ice Matcha Coconut: 139 (fixed)
(39, 2, 139),
-- Ice Matcha Caramel: 139 (fixed)
(40, 2, 139),
-- Hot Matcha: 109 (fixed)
(41, 2, 109),
-- Hot Honey Matcha: 119 (fixed)
(42, 2, 119);

/* BOBA CATEGORY REMOVED */

/* =========================
SPECIALTY COFFEE
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(43, 'V60 Ice | في 60 مثلج', 7, 'قهوة مختصة مثلجة محضرة بالتقطير.', 'default.jpg'),
(44, 'V60 Hot | في 60 ساخن', 7,'قهوة مختصة ساخنة محضرة بالتقطير.', NULL),
(45, 'Chemex | كيمكس', 7, 'قهوة نقية ومصفاة بمذاق متوازن.', 'default.jpg'),
(46, 'Aeropress | إيروبرس', 7, 'قهوة غنية وسلسة محضرة بضغط الهواء.', 'default.jpg'),
(47, 'Syphon | سايفون', 7, 'قهوة عطرية محضرة بتقنية السايفون.', 'Syphon.png'),
(48, 'Cold Brew | كولد برو', 7, 'قهوة مقطرة باردة لمدة 24 ساعة.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- V60: M:190 | L:220
(43, 2, 190), (43, 3, 220),
(44, 2, 190), (44, 3, 220),
(45, 2, 150),
(46, 2, 160),
(47, 2, 170),
(48, 2, 180);

/* =========================
EXTRAS
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(49, 'Nuts | مكسرات', 8, 'مكسرات مشكلة محمصة وطازجة.', 'default.jpg'),
(50, 'Flavor | نكهة', 8, 'إضافة نكهات متنوعة حسب اختيارك.', 'default.jpg'),
(51, 'Whipped Cream | كريمة مخفوقة', 8, 'كريمة مخفوقة طازجة وناعمة.', 'default.jpg'),
(52, 'Flavor + Whipped Cream | نكهة + كريمة', 8, 'مزيج من النكهة والكريمة المخفوقة.', 'default.jpg'),
(53, 'Boba | بوبا', 8, 'إضافة حبيبات التابيوكا (بوبا).', 'default.jpg'),
(54, 'Honey | عسل', 8, 'عسل نحل طبيعي ونقي.', 'default.jpg'),
(55, 'Ice Cream | آيس كريم', 8, 'آيس كريم فانيليا كريمي غني.', 'default.jpg'),
(56, 'Extra Shot | شوت إضافي', 8, 'إضافة جرعة إضافية من الإسبريسو.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(49, 1, 35), (49, 2, 40),
(50, 1, 35), (50, 2, 40),
(51, 1, 35), (51, 2, 40),
(52, 2, 45),
(53, 2, 45),
(54, 2, 35),
(55, 2, 45),
(56, 2, 45);

/* =========================
FRESH JUICES
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(57, 'Cantaloupe Juice |عصير كنتالوب', 9, 'عصير كنتالوب طازج ومنعش.', 'Cantaloupe Juice.png'),
(58, 'Strawberry Juice | عصير فراولة', 9, 'عصير فراولة طبيعي مبرد.', 'Strawberry Juice.png'),
(59, 'Mango Juice | عصير مانجو', 9, 'عصير مانجو استوائي غني الكثافة.', 'Mango Juice.png'),
(60, 'Kiwi Juice | عصير كيوي', 9, 'عصير كيوي طازج ومليء بالفيتامينات.', 'Kiwi Juice.png'),
(61, 'Banana Juice | عصير موز', 9, 'عصير موز طبيعي بقوام كريمي.', 'Banana Juice.png'),
(62, 'Watermelon Juice | عصير بطيخ', 9, 'عصير بطيخ منعش ومبرد.', 'Watermelon Juice.png'),
(63, 'Peach Juice | عصير خوخ', 9, 'عصير خوخ طبيعي بمذاق حلو.', 'Peach Juice.png'),
(64, 'Blueberry Juice | عصير توت', 9, 'عصير توت أزرق طازج ومنعش.', 'Berry Juice.png'),
(65, 'Lemon Juice | عصير ليمون', 9, 'عصير ليمون حامض ومنعش.', 'Lemon Juice.png'),
(66, 'Lemon Mint Juice | عصير ليمون نعناع', 9, 'مزيج الليمون المنعش مع النعناع الطازج.', 'Lemon Mint Juice.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Cantaloupe: M:95 | L:110
(57, 2, 95), (57, 3, 110),
-- Strawberry: M:95 | L:110
(58, 2, 95), (58, 3, 110),
-- Mango: M:95 | L:110
(59, 2, 95), (59, 3, 110),
-- Kiwi: M:120 | L:130
(60, 2, 120), (60, 3, 130),
-- Banana: M:110 | L:120
(61, 2, 110), (61, 3, 120),
-- Watermelon: M:95 | L:110
(62, 2, 95), (62, 3, 110),
-- Peach: M:109 | L:119
(63, 2, 109), (63, 3, 119),
-- Blueberry: M:124 | L:134
(64, 2, 124), (64, 3, 134),
-- Lemon: M:104 | L:114
(65, 2, 104), (65, 3, 114),
-- Lemon Mint: M:110 | L:120
(66, 2, 110), (66, 3, 120);

/* =========================
ICE COFFEE
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(67, 'Ice Latte | آيس لاتيه', 10, 'إسبريسو مثلج مع الحليب البارد.', 'Ice Latte.png'),
(68, 'Ice Mocha | آيس موكا', 10, 'موكا مثلجة بالشوكولاتة والحليب البارد.', 'Ice Mocha.png'),
(69, 'Ice White Mocha | آيس وايت موكا', 10, 'وايت موكا مثلجة بنكهة الفانيليا الحلوة.', 'Ice White Mocha.png'),
(70, 'Ice Shaken White Mocha | آيس وايت موكا شيكن', 10, 'وايت موكا شيكن كريمية ومنعشة.', 'Ice Shaken White Mocha.png'),
(71, 'Ice Americano | آيس أمريكانو', 10, 'قهوة سوداء مثلجة قوية ومنعشة.', 'Ice Americano.png'),
(72, 'Ice Biscoff Latte | آيس بسكوف لاتيه', 10, 'لاتيه مثلج مع كريمة بسكوف اللذيذة.', 'Ice Biscoff Latte.png'),
(73, 'Ice Caramel Macchiato | آيس كراميل ماكياتو', 10, 'قهوة باردة بطبقات الحليب وصوص الكراميل.', 'Ice Caramel Macchiato.png'),
(74, 'Ice Spanish Latte | آيس سبانيش لاتيه', 10, 'لاتيه إسباني مثلج مع الحليب المكثف.', 'Ice Spanish Latte.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Ice Latte: M:119 | L:129
(67, 2, 119), (67, 3, 129),
-- Ice Mocha: M:129 | L:149
(68, 2, 129), (68, 3, 149),
-- Ice White Mocha: M:139 | L:149
(69, 2, 139), (69, 3, 149),
-- Ice Chiken White Mocha: M:139 | L:149
(70, 2, 139), (70, 3, 149),
-- Ice Americano: M:110 | L:120
(71, 2, 110), (71, 3, 120),
-- Ice Biscoff Latte (legacy)
(72, 2, 99), (72, 3, 104),
-- Ice Caramel Macchiato: M:129 | L:139
(73, 2, 129), (73, 3, 139),
-- Ice Spanish Latte: M:129 | L:139
(74, 2, 129), (74, 3, 139);

/* =========================
SMOOTHIES
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(75, 'Peach Smoothie | سموزي خوخ', 11, 'سموزي خوخ طبيعي منعش ومبرد.', 'Peach Smoothie.png'),
(76, 'Strawberry Smoothie | سموزي فراولة', 11, 'سموزي فراولة طازجة وحلوة.', 'Strawberry Smoothie.png'),
(77, 'Mango Smoothie | سموزي مانجو', 11, 'سموزي مانجو استوائي غني المذاق.', 'Mango Smoothie.png'),
(78, 'Watermelon Smoothie | سموزي بطيخ', 11, 'سموزي بطيخ منعش ومرطب.', 'Watermelon Smoothie.png'),
(79, 'Kiwi Smoothie | سموزي كيوي', 11, 'سموزي كيوي أخضر وصحي.', 'Kiwi Smoothie.png'),
(80, 'Apple Smoothie | سموزي تفاح', 11, 'سموزي تفاح حلو مع لمسة قرفة.', 'Apple Smoothie.png'),
(81, 'Pineapple Smoothie | سموزي أناناس', 11, 'سموزي أناناس منعش بنكهة استوائية.', 'Pineapple Smoothie.png'),
(82, 'Passion Fruit Smoothie | سموزي باشن فروت', 11, 'سموزي باشن فروت بنكهة فريدة.', 'Passion Fruit Smoothie.png'),
(83, 'Lemon Smoothie | سموزي ليمون', 11, 'سموزي ليمون حامض ومنعش.', 'Lemon Smoothie.png'),
(84, 'Lemon Mint Smoothie | سموزي ليمون نعناع', 11, 'سموزي ليمون ونعناع بارد ومنعش.', 'Lemon Mint Smoothie.png'),
(85, 'Mixed Berry Smoothie |سموزي توت مشكل', 11, 'سموزي توت مشكل غني بمضادات الأكسدة.', 'Mixed Berry Smoothie.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Peach: M:119 | L:129
(75, 2, 119), (75, 3, 129),
-- Strawberry: M:114 | L:124
(76, 2, 114), (76, 3, 124),
-- Mango: M:114 | L:124
(77, 2, 114), (77, 3, 124),
-- Watermelon: M:114 | L:124
(78, 2, 114), (78, 3, 124),
-- Kiwi: M:124 | L:134
(79, 2, 124), (79, 3, 134),
-- Apple: M:114 | L:124
(80, 2, 114), (80, 3, 124),
-- Pineapple: M:119 | L:129
(81, 2, 119), (81, 3, 129),
-- Passion Fruit: M:124 | L:134
(82, 2, 124), (82, 3, 134),
-- Lemon: M:114 | L:124
(83, 2, 114), (83, 3, 124),
-- Lemon Mint: M:114 | L:124
(84, 2, 114), (84, 3, 124),
-- Mix Berries: M:124 | L:134
(85, 2, 124), (85, 3, 134);

/* =========================
COLD DRINKS
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(86, 'V Cola | في كولا', 12, 'مشروب كولا غازي بارد ومنعش.', 'V Cola.png'),
(87, 'V7 | في 7', 12, 'مشروب غازي بنكهات الليمون المنعشة.', 'V7.png'),
(88, 'Double Dare | دبل دير', 12, 'مشروب طاقة منعش بنكهة الفواكه.', 'Double Dare.png'),
(89, 'Water | مياه', 12, 'مياه معدنية طبيعية نقية مبردة.', 'Water.png'),
(90, 'C4 | سي 4', 12, 'مشروب طاقة قوي لمحبي النشاط.', 'C4.png'),
(91, 'Red Bull | ريد بول', 12, 'مشروب الطاقة ريد بول الأصلي.', 'Red Bull.png'),
(92, 'Red Bull Flavor | ريد بول نكهات', 12, 'ريد بول بنكهات فواكه متنوعة ومنعشة.', 'Red Bull Flavor.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(86, 2, 40),
(87, 2, 50),
(88, 2, 40),
-- Water: 15
(89, 2, 15),
(90, 2, 180),
-- Red Bull: 99
(91, 2, 99),
-- Red Bull Flavor: 120
(92, 2, 120);

/* =========================
DESSERT
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(93, 'Cheese cake | تشيز كيك', 13, 'تشيز كيك كلاسيكي ناعم وكريمي.', 'Cheesecake.png'),
(94, 'Cheese cake Caramel | تشيز كيك كراميل', 13, 'تشيز كيك غني مع صوص الكراميل السائل.', 'Cheese cake Caramel.png'),
(95, 'Cheese cake Blueberry | تشيز كيك توت', 13, 'تشيز كيك مع طبقة التوت الأزرق الطازج.', 'Cheese cake Blueberry.png'),
(96, 'Cheese cake Lotus | تشيز كيك لوتس', 13, 'تشيز كيك مع كريمة وبسكويت اللوتس.', 'Cheese cake Lotus.png'),
(97, 'Cheese cake Pistachio | تشيز كيك بستاشيو', 13, 'تشيز كيك مع كريمة الفستق الفاخرة.', 'Cheese cake Pistachio.png'),
(98, 'Cheese cake Nutella | تشيز كيك نوتيلا', 13, 'تشيز كيك مع طبقة غنية من نوتيلا.', 'Cheese cake Nutella.png'),
(99, 'Molten Cake | مولتن كيك', 13, 'كيك شوكولاتة دافئ بقلب سائل ذائب.', 'Molten Cake.png'),
(100, 'Molten Cake Nutella | مولتن كيك نوتيلا', 13, 'مولتن كيك مع حشوة نوتيلا الذائبة.', 'Molten Cake Nutella.png'),
(101, 'San Sebastian | سان سباستيان', 13, 'تشيز كيك سان سباستيان الكريمي الشهير.', 'default-coffee.png'),
(102, 'San Sebastian Lotus | سان سباستيان لوتس', 13, 'كيك سان سباستيان مع كريمة اللوتس.', 'San Sebastian Lotus.png'),
(103, 'San Sebastian Nutella | سان سباستيان نوتيلا', 13, 'كيك سان سباستيان مع نوتيلا غنية.', 'San Sebastian Nutella.png'),
(104, 'San Sebastian Blueberry | سان سباستيان توت', 13, 'كيك سان سباستيان مع صوص التوت الأزرق.', 'San Sebastian Blueberry.png'),
(105, 'San Sebastian Caramel | سان سباستيان كراميل', 13, 'كيك سان سباستيان مع صوص الكراميل.', 'San Sebastian Caramel.png'),
(106, 'San Sebastian Pistachio | سان سباستيان بستاشيو', 13, 'كيك سان سباستيان مع كريمة الفستق.', 'San Sebastian Pistachio.png'),
(107, 'Tiramisu | تيراميسو', 13, 'تيراميسو إيطالي تقليدي بنكهة القهوة.', 'Tiramisu.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(93, 2, 75),
(94, 2, 85),
(95, 2, 85),
(96, 2, 90),
(97, 2, 95),
(98, 2, 85),
(99, 2, 80),
(100, 2, 90),
(101, 2, 75),
(102, 2, 90),
(103, 2, 85),
(104, 2, 85),
(105, 2, 85),
(106, 2, 95),
(107, 2, 75),(107, 3, 90);

/* =========================
BAKERY
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(108, 'Plain Croissant | كرواسون سادة', 14, 'كرواسون فرنسي طازج وهش بالزبدة.', 'Plain Croissant.png'),
(109, 'Chocolate Croissant | كرواسون شوكولاتة', 14, 'كرواسون محشو بالشوكولاتة الغنية.', 'Chocolate Croissant.png'),
(110, 'Lotus Croissant | كرواسون لوتس', 14, 'كرواسون محشو بكريمة بسكويت اللوتس.', 'Lotus Croissant.png'),
(111, 'Pistachio Croissant | كرواسون بستاشيو', 14, 'كرواسون محشو بكريمة الفستق الفاخرة.', 'Pistachio Croissant.png'),
(112, 'Cheese Croissant | كرواسون جبنة', 14, 'كرواسون محشو بجبنة الشيدر الذائبة.', 'Cheese Croissant.png'),
(113, 'Smoked Turkey Croissant | كرواسون تركي مدخن', 14, 'كرواسون مع صدر رومي مدخن وجبنة.', 'Smoked Turkey Croissant.png'),
(114, 'Mixed Cheese Croissant | كرواسون جبن مشكل', 14, 'كرواسون محشو بتشكيلة من الأجبان الثلاثة.', 'Mixed Cheese Croissant.png'),
(115, 'Plain Patisserie | باتيه سادة', 14, 'باتيه فرنسي طازج وخفيف.', 'Plain Patisserie.png'),
(116, 'Cheese Patisserie | باتيه جبنة', 14, 'باتيه محشو بجبنة ذائبة.', 'Cheese Patisserie.png'),
(117, 'White Cheese Patisserie | باتيه جبنة بيضاء', 14, 'باتيه محشو بجبنة بيضاء كريمية.', 'White Cheese Patisserie.png'),
(118, 'Luncheon Patisserie | باتيه لانشون', 14, 'باتيه محشو باللانشون والجبنة.', 'Luncheon Patisserie.png'),
(119, 'Smoked Turkey Patisserie | باتيه تركي مدخن', 14, 'باتيه مع صدر رومي مدخن وجبنة.', 'Smoked Turkey Patisserie.png'),
(120, 'Mixed Cheese Patisserie | باتيه جبن مشكل', 14, 'باتيه محشو بتشكيلة من الأجبان.', 'Mixed Cheese Patisserie.png'),
(121, 'Cookies | كوكيز', 14, 'كوكيز متنوع ومحلى طازجاً.', 'Cookies.png'),
(122, 'Cookies Nuts | كوكيز مكسرات', 14, 'كوكيز مقرمش مع حبات المكسرات.', 'Cookies Nuts.png');
INSERT INTO product_prices (product_id, size_id, price) VALUES
(108, 2, 35),
(109, 2, 50),
(110, 2, 60),
(111, 2, 70),
(112, 2, 55),
(113, 2, 65),
(114, 2, 60),
(115, 2, 35),
(116, 2, 55),
(117, 2, 45),
(118, 2, 65),
(119, 2, 65),
(120, 2, 60),
(121, 2, 40),(121, 3, 45),
(122, 2, 50);

/* =========================
COFFEE PACKAGES
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(123, 'Turkish Special Blend (250g) | قهوة تركي اسبيشيال بلند', 15, 'قهوة تركي اسبيشيال بلند - ربع كيلو.', 'default-coffee.png'),
(124, 'Espresso Colombia Cali (250g) | اسبريسو كلومبي كالي', 15, 'اسبريسو كلومبي كالي - ربع كيلو.', 'default-coffee.png'),
(125, 'Ethiopian Hambela (250g) | اثيوبي هامبيلا', 15, 'اثيوبي هامبيلا - ربع كيلو.', 'default-coffee.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(123, 2, 300),
(124, 2, 400),
(125, 2, 400);

/* =========================
NEW FRAPPE ADDITIONS
========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(126, 'Frappe Mixed Berry | فرابيه ميكس بيري', 4, 'مزيج منعش من التوت المشكل والثلج.', 'Frappe Mixed Berry.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Frappe Mix Berry: 139
(126, 2, 139);

/* =========================
   NEW SHAKE ADDITIONS
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(127, 'Vanilla Shake | فانيليا شيك', 3, 'ميلك شيك فانيليا ناعم وكريمي بنكهة كلاسيكية.', 'Vanilla Shake.png'),
(128, 'Strawberry Shake | فراولة شيك', 3, 'ميلك شيك فراولة طازجة بنكهة حلوة ومنعشة.', 'Strawberry Shake.png'),
(129, 'Mango Shake | مانجو شيك', 3, 'ميلك شيك مانجو استوائي غني وكريمي.', 'Mango Shake .png'),
(130, 'Chocolate Shake | شوكولاتة شيك', 3, 'ميلك شيك شوكولاتة غني وقوام كثيف لا يقاوم.', 'Chocolate Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Milkshake (Vanilla/Strawberry/Chocolate): M:120 | L:130
(127, 2, 120), (127, 3, 130),
(128, 2, 120), (128, 3, 130),
-- Mango Shake (legacy)
(129, 2, 89), (129, 3, 94),
(130, 2, 120), (130, 3, 130);

/* =========================
   MOJITO AND SODA ADDITIONS
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(131, 'Strawberry Mojito | موهيتو فراولة', 16, 'موهيتو منعش بنكهة الفراولة.', 'Strawberry Mojito.png'),
(132, 'Blueberry Mojito | موهيتو توت', 16, 'موهيتو منعش بنكهة التوت.', 'Blueberry Mojito.png'),
(133, 'Pineapple Mojito | موهيتو أناناس', 16, 'موهيتو منعش بنكهة الأناناس.', 'Pineapple Mojito.png'),
(134, 'Mango Mojito | موهيتو مانجا', 16, 'موهيتو منعش بنكهة المانجو.', 'Mango Mojito.png'),
(135, 'Peach Mojito | موهيتو خوخ', 16, 'موهيتو منعش بنكهة الخوخ.', 'Peach Mojito.png'),
(136, 'Mix Berry Mojito | موهيتو ميكس بيري', 16, 'موهيتو منعش بنكهة ميكس بيري.', 'Mix Berry Mojito.png'),
(137, 'Kiwi Mojito | موهيتو كيوي', 16, 'موهيتو منعش بنكهة الكيوي.', 'Kiwi Mojito.png'),
(138, 'Passion Fruit Mojito | موهيتو باشون', 16, 'موهيتو منعش بنكهة الباشون فروت.', 'Passion Fruit Mojito.png'),
(139, 'Apple Mojito | موهيتو تفاح', 16, 'موهيتو منعش بنكهة التفاح.', 'Apple Mojito.png'),
(140, 'Raspberry Mojito | موهيتو راس بيري', 16, 'موهيتو منعش بنكهة الراس بيري.', 'Raspberry Mojito.png'),
(141, 'Pink Lemon Mojito | بينك ليمون', 16, 'مشروب بينك ليمون موهيتو منعش.', 'Pink Lemon.png'),
(142, 'Blue Passion Mojito | بلو باشون', 16, 'مشروب بلو باشون موهيتو منعش.', 'Blue Passion.png'),
(143, 'Pineapple Lemon Mint | بينابول ليمون مينت', 16, 'مشروب بينابول ليمون مينت منعش.', 'Pineapple Lemon Mint.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Apple Mojito: M:109 | L:120
(139, 2, 109), (139, 3, 120),
-- Raspberry Mojito: M:109 | L:120
(140, 2, 109), (140, 3, 120),
-- Pink Lemon Mojito: M:119 | L:140
(141, 2, 119), (141, 3, 140),
-- Blue Passion Mojito: M:119 | L:140
(142, 2, 119), (142, 3, 140),
-- Pineapple Lemon Mint: M:124 | L:145
(143, 2, 124), (143, 3, 145),
-- Mix Berry Mojito: M:119 | L:140
(136, 2, 119), (136, 3, 140),
-- Kiwi Mojito: M:109 | L:120
(137, 2, 109), (137, 3, 120),
-- Passion Fruit Mojito: M:114 | L:135
(138, 2, 114), (138, 3, 135),
-- Strawberry Mojito: M:109 | L:120
(131, 2, 109), (131, 3, 120),
-- Blueberry Mojito: M:109 | L:120
(132, 2, 109), (132, 3, 120),
-- Pineapple Mojito: M:109 | L:120
(133, 2, 109), (133, 3, 120),
-- Mango Mojito: M:109 | L:120
(134, 2, 109), (134, 3, 120),
-- Peach Mojito: M:109 | L:120
(135, 2, 109), (135, 3, 120);

/* =========================
   MATCHA ADDITIONS (SPLIT)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(144, 'Ice Matcha Mango | آيس ماتشا مانجو', 5, 'ماتشا مثلج بنكهة المانجو المنعشة.', 'Ice Matcha Mango.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Ice Matcha Mango: 139 (fixed)
(144, 2, 139);

/* =========================
   BOBA SOFT
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(145, 'Boba Soft Passion | بوبا سوفت باشون', 6, 'بوبا سوفت بنكهة الباشون فروت المنعشة.', 'Boba Soft Passion.png'),
(146, 'Boba Soft Strawberry | بوبا سوفت فراولة', 6, 'بوبا سوفت بنكهة الفراولة الحلوة.', 'Boba Soft Strawberry.png'),
(147, 'Boba Soft Blueberry | بوبا سوفت بلوبيري', 6, 'بوبا سوفت بنكهة التوت الأزرق.', 'Boba Soft Blueberry.png'),
(148, 'Boba Soft Mango | بوبا سوفت مانجا', 6, 'بوبا سوفت بنكهة المانجو الاستوائية.', 'Boba Soft Mango.png'),
(149, 'Boba Soft Green Apple | بوبا سوفت تفاح أخضر', 6, 'بوبا سوفت بنكهة التفاح الأخضر المنعشة.', 'Boba Soft Green Apple.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Boba Soft: M:129 | L:139
(145, 2, 129), (145, 3, 139),
(146, 2, 129), (146, 3, 139),
(147, 2, 129), (147, 3, 139),
(148, 2, 129), (148, 3, 139),
(149, 2, 129), (149, 3, 139);

/* =========================
   BOBA MILKSHAKE
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(150, 'Milk Strawberry Boba Strawberry | ميلك فراولة بوبا فراولة', 17, 'ميلك شيك فراولة مع بوبا فراولة.', 'Milk Strawberry Boba Strawberry.png'),
(151, 'Milk Mango Boba Mango | ميلك مانجا بوبا مانجا', 17, 'ميلك شيك مانجو مع بوبا مانجو.', 'Milk Mango Boba Mango.png'),
(152, 'Milk Peach Boba Peach | ميلك خوخ بوبا خوخ', 17, 'ميلك شيك خوخ مع بوبا خوخ.', 'Milk Peach Boba Peach.png'),
(153, 'Milk Passion Boba Passion | ميلك باشون بوبا باشون', 17, 'ميلك شيك باشون فروت مع بوبا باشون.', 'Milk Passion Boba Passion.png'),
(154, 'Milk Blueberry Boba Blueberry | ميلك بلوبيري بوبا بلوبيري', 17, 'ميلك شيك بلوبيري مع بوبا بلوبيري.', 'Milk Blueberry Boba Blueberry.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Boba Milkshake: M:139 | L:149
(150, 2, 139), (150, 3, 149),
(151, 2, 139), (151, 3, 149),
(152, 2, 139), (152, 3, 149),
(153, 2, 139), (153, 3, 149),
(154, 2, 139), (154, 3, 149);

/* =========================
   BOBA SMOOTHIE
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(155, 'Blueberry Smoothie Boba Blueberry | سموزي توت بوبا توت', 18, 'سموزي التوت الأزرق مع بوبا توت.', 'Blueberry Smoothie Boba Blueberry.png'),
(156, 'Strawberry Smoothie Boba Strawberry | سموزي فراولة بوبا فراولة', 18, 'سموزي الفراولة الطازجة مع بوبا فراولة.', 'Strawberry Smoothie Boba Strawberry.png'),
(157, 'Apple Smoothie Boba Apple | سموزي تفاح بوبا تفاح', 18, 'سموزي التفاح المنعش مع بوبا تفاح.', 'Apple Smoothie Boba Apple.png'),
(158, 'Passion Smoothie Boba Passion | سموزي باشون بوبا باشون', 18, 'سموزي الباشون فروت مع بوبا باشون.', 'Passion Smoothie Boba Passion.png'),
(159, 'Peach Smoothie Boba Peach | سموزي خوخ بوبا خوخ', 18, 'سموزي الخوخ الناعم مع بوبا خوخ.', 'Peach Smoothie Boba Peach.png'),
(160, 'Mango Smoothie Boba Mango | سموزي مانجا بوبا مانجا', 18, 'سموزي المانجو الاستوائي مع بوبا مانجو.', 'Mango Smoothie Boba Mango.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Boba Smoothie: M:129 | L:139
(155, 2, 129), (155, 3, 139),
(156, 2, 129), (156, 3, 139),
(157, 2, 129), (157, 3, 139),
(158, 2, 129), (158, 3, 139),
(159, 2, 129), (159, 3, 139),
(160, 2, 129), (160, 3, 139);

/* =========================
   HOT AMERICANO ADDITION
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(161, 'Hot Americano | هوت أمريكانو', 1, 'قهوة أمريكانو ساخنة كلاسيكية.', 'Hot Americano.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Hot American: M:75 | L:85
(161, 2, 75), (161, 3, 85);

/* =========================
   SANDWICHES CATEGORY
   ========================= */
/* Note: Sandwiches category is inserted at sort_order 145 in the categories table above */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(162, 'Sandwich 1 | ساندويتش 1', 19, 'ساندويتش لذيذ سيتم تحديث تفاصيله لاحقاً.', 'default.jpg'),
(163, 'Sandwich 2 | ساندويتش 2', 19, 'ساندويتش لذيذ سيتم تحديث تفاصيله لاحقاً.', 'default.jpg'),
(164, 'Sandwich 3 | ساندويتش 3', 19, 'ساندويتش لذيذ سيتم تحديث تفاصيله لاحقاً.', 'default.jpg'),
(165, 'Sandwich 4 | ساندويتش 4', 19, 'ساندويتش لذيذ سيتم تحديث تفاصيله لاحقاً.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(162, 2, 80),
(163, 2, 80),
(164, 2, 80),
(165, 2, 80);

/* =========================
   CINNAMON ROLL (DESSERT)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(166, 'Cinnamon Roll | سينامون', 13, 'رول قرفة طازج بعجينة ناعمة وصوص كريمي.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(166, 2, 90);

/* =========================
   LATTE LOTUS (NEW - Hot Coffee)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(167, 'Latte Lotus | لاتيه لوتس', 1, 'لاتيه ساخن مع صوص اللوتس الكريمي.', 'Latte Lotus.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Latte Lotus: M:129 | L:139
(167, 2, 129), (167, 3, 139);

/* =========================
   ICE COFFEE (NEW - Ice Coffee)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(168, 'Ice Coffee | آيس كوفي', 10, 'قهوة مثلجة منعشة بالحليب البارد.', 'Ice Coffee.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Ice Coffee: M:119 | L:129
(168, 2, 119), (168, 3, 129);

/* =========================
   BOBA TAPIOCA (NEW - Boba Soft)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(169, 'Boba Tapioca | بوبا تابيوكا', 6, 'بوبا تابيوكا مع نكهات متنوعة.', 'Boba Tapioca.png'),
(170, 'Boba Tapioca Fixed | بوبا تابيوكا فيكسد', 6, 'بوبا تابيوكا بسعر ثابت.', 'Boba Tapioca.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Boba Tapioca Sized: M:149 | L:159
(169, 2, 149), (169, 3, 159),
-- Boba Tapioca Fixed: 139
(170, 2, 139);

/* =========================
   BLUEBERRY SMOOTHIE (NEW)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(171, 'Blueberry Smoothie | سموزي توت أزرق', 11, 'سموزي التوت الأزرق المنعش والصحي.', 'Blueberry Smoothie.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Blueberry Smoothie: M:114 | L:124
(171, 2, 114), (171, 3, 124);

/* =========================
   MOJITO & SODA NEW ITEMS
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(172, 'Dark Soda | دارك سودا', 16, 'سودا داكنة غازية منعشة.', 'Dark Soda.png'),
(173, 'Blue Pina Colada | بلو بينا كولادا', 16, 'بينا كولادا زرقاء منعشة.', 'Blue Pina Colada.png'),
(174, 'Strawberry Cloud | سحابة الفراولة', 16, 'مشروب فراولة سحابي غازي منعش.', 'Strawberry Cloud.png'),
(175, 'Blue Mars | بلو مارس', 16, 'مشروب بلو مارس الغازي الفريد.', 'Blue Mars.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Dark Soda: M:119 | L:129
(172, 2, 119), (172, 3, 129),
-- Blue Pina Colada: M:119 | L:129
(173, 2, 119), (173, 3, 129),
-- Strawberry Cloud: M:119 | L:129
(174, 2, 119), (174, 3, 129),
-- Blue Mars: M:124 | L:145
(175, 2, 124), (175, 3, 145);

/* =========================
   MATCHA CLOUD (NEW - Matcha)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(176, 'Matcha Cloud Mango | ماتشا كلاود مانجو', 5, 'ماتشا كلاود بنكهة المانجو.', 'Matcha Cloud Mango.png'),
(177, 'Matcha Cloud Strawberry | ماتشا كلاود فراولة', 5, 'ماتشا كلاود بنكهة الفراولة.', 'Matcha Cloud Strawberry.png'),
(178, 'Matcha Cloud Coconut | ماتشا كلاود جوز هند', 5, 'ماتشا كلاود بنكهة جوز الهند.', 'Matcha Cloud Coconut.png'),
(179, 'Matcha Cloud White Chocolate | ماتشا كلاود وايت شوكولاتة', 5, 'ماتشا كلاود بنكهة الشوكولاتة البيضاء.', 'Matcha Cloud White Chocolate.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Matcha Cloud: M:139 | L:149
(176, 2, 139), (176, 3, 149),
(177, 2, 139), (177, 3, 149),
(178, 2, 139), (178, 3, 149),
(179, 2, 139), (179, 3, 149);

/* =========================
   BLUE MATCHA (NEW - Matcha)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(180, 'Blue Matcha | بلو ماتشا', 5, 'ماتشا أزرق منعش فريد.', 'Blue Matcha.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Blue Matcha: M:139 | L:149
(180, 2, 139), (180, 3, 149);

/* =========================
   SALTED CARAMEL FRAPPE (NEW - Frappe)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(181, 'Salted Caramel Frappe | فرابيه كراميل مملح', 4, 'فرابيه كراميل مملح غني ومميز.', 'Salted Caramel Frappe.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Salted Caramel Frappe: 139
(181, 2, 139);

/* =========================
   NEW SHAKE ADDITIONS
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(182, 'Beach Shake | بيتش شيك', 3, 'ميلك شيك منعش بنكهات الشاطئ الاستوائية.', 'Beach Shake.png'),
(183, 'Neurs Shake | نيرز شيك', 3, 'ميلك شيك نيرز الكريمي.', 'Neurs Shake.png'),
(184, 'Salted Caramel Shake | شيك كراميل مملح', 3, 'ميلك شيك كراميل مملح فاخر.', 'Salted Caramel Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Beach Shake: M:129 | L:139
(182, 2, 129), (182, 3, 139),
-- Neurs Shake: M:149 | L:159
(183, 2, 149), (183, 3, 159),
-- Salted Caramel Shake: M:149 | L:159
(184, 2, 149), (184, 3, 159);

/* =========================
   ORANGE JUICE (NEW - Fresh Juices)
   ========================= */
INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES
(185, 'Orange Juice | عصير برتقال', 9, 'عصير برتقال طازج ومنعش.', 'Orange Juice.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
-- Orange Juice: M:110 | L:120
(185, 2, 110), (185, 3, 120);