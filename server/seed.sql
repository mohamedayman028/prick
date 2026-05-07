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
('Boba Smoothie', 62);



/* =========================
HOT COFFEE
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(1, 1, 'Espresso | إسبريسو', 1, 'إسبريسو مركز بنكهة غنية وكريمة ذهبية.', 'Espresso.png'),
(2, 2, 'Macchiato | ماكياتو', 1, 'إسبريسو مع لمسة من رغوة الحليب المكثف.', 'Macchiato.png'),
(3, 3, 'Hot Mocha | موكا ساخن', 1, 'مزيج رائع من الإسبريسو والشوكولاتة مع الحليب.', 'Hot Mocha.png'),
(4, 4, 'Hot White Mocha | وايت موكا ساخن', 1, 'إسبريسو مع الشوكولاتة البيضاء والحليب المخملي.', 'Hot White Mocha.png'),
(5, 5, 'Nescafe | نسكافيه', 1, 'قهوة نسكافيه كلاسيكية محضرة بالحليب الساخن.', 'Nescafe.png'),
(6, 6, 'Nescafe Black | نسكافيه بلاك', 1, 'قهوة نسكافيه سوداء نقية لمحبي المذاق القوي.', 'Nescafe Black.png'),
(7, 7, 'Cappuccino | كابتشينو', 1, 'إسبريسو مع حليب مبخر ورغوة كثيفة متوازنة.', 'Cappuccino.png'),
(8, 8, 'Hot Latte | لاتيه ساخن', 1, 'إسبريسو ناعم مع كمية وافرة من الحليب المبخر.', 'Hot Latte.png'),
(9, 9, 'Turkish Coffee | قهوة تركية', 1, 'قهوة تركية كلاسيكية محضرة بعناية ومذاق أصيل.', 'Turkish Coffee.png'),
(10, 10, 'Turkish Coffee with Milk | قهوة فرنساوي', 1, 'قهوة تركية تقليدية مع الحليب لمذاق أكثر نعومة.', 'Turkish Coffee with Milk.png'),
(11, 11, 'Nutella Coffee | قهوة نوتيلا', 1, 'إسبريسو غني ممزوج بلمسة من شوكولاتة نوتيلا.', 'Nutella Coffee.png'),
(12, 12, 'Spanish Latte | سبانيش لاتيه', 1, 'لاتيه حلو مع الحليب المكثف المحلى لقوام كريمي.', 'Spanish Latte.png'),
(13, 13, 'Flat White | فلات وايت', 1, 'إسبريسو مزدوج مع طبقة ناعمة من رغوة الحليب.', 'Flat White.png'),
(14, 14, 'Cortado | كورتادو', 1, 'مزيج مثالي من الإسبريسو وكمية متساوية من الحليب.', 'Cortado.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(1, 4, 55), (1, 5, 65),
(2, 4, 65), (2, 5, 70),
(3, 1, 89), (3, 2, 94),
(4, 1, 89), (4, 2, 94),
(5, 1, 64), (5, 2, 69),
(6, 1, 60), (6, 2, 65),
(7, 1, 69), (7, 2, 74),
(8, 1, 69), (8, 2, 74),
(9, 1, 50), (9, 2, 60),
(10, 1, 55), (10, 2, 65),
(11, 1, 69), (11, 2, 74),
(12, 1, 94), (12, 2, 99),
(13, 1, 69), (13, 2, 74),
(14, 1, 69), (14, 2, 74);

/* =========================
WARM DRINKS
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(15, 15, 'Tea | شاي', 2, 'شاي أسود فاخر محضر طازجاً.', 'Tea.png'),
(16, 16, 'Tea with Milk | شاي بالحليب', 2, 'شاي كلاسيكي ممزوج بالحليب الناعم.', 'Tea with Milk.png'),
(17, 17, 'Hot Chocolate | هوت شوكلت', 2, 'شوكولاتة غنية وحليب مبخر دافئ.', 'Hot Chocolate.png'),
(18, 18, 'Hot Cider | هوت سيدر', 2, 'سيدر تفاح دافئ مع لمسة قرفة.', 'Hot Cider.png'),
(19, 19, 'Sahlab | سحلب', 2, 'مشروب السحلب التقليدي بالمكسرات.', 'Sahlab.png');


INSERT INTO product_prices (product_id, size_id, price) VALUES
(15, 2, 50),
(16, 2, 60),
(17, 1, 85), (17, 2, 94),
(18, 2, 65), (18, 3, 70),
(19, 2, 60), (19, 3, 65);

/* =========================
SHAKES
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(20, 20, 'Oreo Shake | أوريو شيك', 3, 'ميلك شيك كريمي مع قطع بسكويت أوريو.', 'Oreo Shake.png'),
(21, 21, 'Nutella Shake | نوتيلا شيك', 3, 'ميلك شيك غني بشوكولاتة نوتيلا.', 'Nutella Shake.png'),
(22, 22, 'Pistachio Shake | بستاشيو شيك', 3, 'ميلك شيك ناعم بنكهة الفستق الفاخرة.', 'Pistachio Shake.png'),
(23, 23, 'Lotus Shake | لوتس شيك', 3, 'ميلك شيك بنكهة كريمة اللوتس المميزة.', 'Lotus Shake.png'),
(24, 24, 'Caramel Shake | كراميل شيك', 3, 'ميلك شيك كريمي مع صوص الكراميل.', 'Caramel Shake.png'),
(25, 25, 'Peach Shake | خوخ شيك', 3, 'ميلك شيك منعش بنكهة الخوخ الطبيعية.', 'Peach Shake.png'),
(26, 26, 'Blueberry Shake | بلو بيري شيك', 3, 'ميلك شيك بنكهة التوت الأزرق المنعشة.', 'Blueberry Shake.png'),
(27, 27, 'Kinder Shake | كيندر شيك', 3, 'ميلك شيك كريمي بطعم شوكولاتة كيندر.', 'Kinder Shake.png'),
(28, 28, 'KitKat Shake | كيت كات شيك', 3, 'ميلك شيك مع قطع كيت كات المقرمشة.', 'KitKat Shake.png'),
(29, 29, 'Twix Shake | تويكس شيك', 3, 'ميلك شيك بكراميل وبسكويت تويكس.', 'Twix Shake.png'),
(30, 30, 'Snickers Shake | سنيكرز شيك', 3, 'ميلك شيك بكراميل وفول سوداني سنيكرز.', 'Snickers Shake.png'),
(31, 31, 'Galaxy Shake | جلاكسي شيك', 3, 'ميلك شيك بشوكولاتة جالاكسي الناعمة.', 'Galaxy Shake.png'),
(32, 32, 'M&M Shake | إم أند إم شيك', 3, 'ميلك شيك ممتع مع حبات إم آند إمز.', 'M&M Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(20, 1, 99), (20, 2, 104), (20, 3, 114),
(21, 1, 99), (21, 2, 104), (21, 3, 109),
(22, 1, 104), (22, 2, 109), (22, 3, 114),
(23, 1, 99), (23, 2, 104), (23, 3, 109),
(24, 1, 99), (24, 2, 104), (24, 3, 109),
(25, 1, 94), (25, 2, 99), (25, 3, 104),
(26, 1, 99), (26, 2, 104),
(27, 1, 115), (27, 2, 120),
(28, 1, 115), (28, 2, 120),
(29, 1, 115), (29, 2, 120),
(30, 1, 115), (30, 2, 120),
(31, 1, 115), (31, 2, 120),
(32, 1, 120), (32, 2, 125);

/* =========================
FRAPPE
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(33, 33, 'Classic Frappe | فرابيه كلاسيك', 4, 'قهوة باردة ممزوجة بالثلج والحليب.', 'Classic Frappe.png'),
(34, 34, 'Caramel Frappe | فرابيه كراميل', 4, 'فرابيه قهوة بصوص الكراميل الغني.', 'Caramel Frappe.png'),
(35, 35, 'Lotus Frappe | فرابيه لوتس', 4, 'فرابيه قهوة بنكهة بسكويت اللوتس.', 'Lotus Frappe.png'),
(36, 36, 'White Mocha Frappe | فرابيه وايت موكا', 4, 'فرابيه كريمي بنكهة الشوكولاتة البيضاء.', 'White Mocha Frappe.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(33, 1, 89),     (33, 2, 94),   (33, 3, 99),
(34, 1, 99),       (34, 2, 104),  (34, 3, 109),
(35, 1, 104),     (35, 2, 109),    (35, 3, 114),
(36, 1, 104),     (36, 2, 109),   (36, 3, 114);




/* =========================
MATCHA
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(37, 37, 'Ice Matcha | آيس ماتشا', 5, 'ماتشا ياباني أصيل مع الثلج المنعش.', 'Ice Matcha.png'),
(38, 38, 'Ice Matcha Strawberry | آيس ماتشا فراولة', 5, 'ماتشا مثلج بنكهة الفراولة المنعشة.', 'Ice Matcha Strawberry.png'),
(39, 39, 'Ice Matcha Coconut | آيس ماتشا جوز هند', 5, 'ماتشا مثلج مع حليب جوز الهند الكريمي.', 'Ice Matcha Coconut.png'),
(40, 40, 'Ice Matcha Caramel | آيس ماتشا كراميل', 5, 'ماتشا مثلج مع لمسة من الكراميل الحلو.', 'Ice Matcha Caramel.png'),
(41, 41, 'Hot Matcha | هوت ماتشا', 5, 'ماتشا ياباني دافئ وصحي.', 'Hot Matcha.png'),
(42, 42, 'Hot Honey Matcha | هوت هوني ماتشا', 5, 'ماتشا ساخن محلى بالعسل الطبيعي.', 'Hot Honey Matcha.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(37, 1, 99), (37, 2, 104), (37, 3, 109),
(38, 1, 104), (38, 2, 109), (38, 3, 114),
(39, 1, 104), (39, 2, 109), (39, 3, 114),
(40, 1, 104), (40, 2, 109), (40, 3, 114),
(41, 1, 99), (41, 2, 104), (41, 3, 109),
(42, 1, 104), (42, 2, 109), (42, 3, 114);

/* BOBA CATEGORY REMOVED */

/* =========================
SPECIALTY COFFEE
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(43, 43, 'V60 Ice | في 60 مثلج', 7, 'قهوة مختصة مثلجة محضرة بالتقطير.', 'default.jpg'),
(44, 44, 'V60 Hot | في 60 ساخن', 7,'قهوة مختصة ساخنة محضرة بالتقطير.', NULL),
(45, 45, 'Chemex | كيمكس', 7, 'قهوة نقية ومصفاة بمذاق متوازن.', 'default.jpg'),
(46, 46, 'Aeropress | إيروبرس', 7, 'قهوة غنية وسلسة محضرة بضغط الهواء.', 'default.jpg'),
(47, 47, 'Syphon | سايفون', 7, 'قهوة عطرية محضرة بتقنية السايفون.', 'Syphon.png'),
(48, 48, 'Cold Brew | كولد برو', 7, 'قهوة مقطرة باردة لمدة 24 ساعة.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(43, 2, 160),
(44, 2, 150),
(45, 2, 150),
(46, 2, 160),
(47, 2, 170),
(48, 2, 180);

/* =========================
EXTRAS
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(49, 49, 'Nuts | مكسرات', 8, 'مكسرات مشكلة محمصة وطازجة.', 'default.jpg'),
(50, 50, 'Flavor | نكهة', 8, 'إضافة نكهات متنوعة حسب اختيارك.', 'default.jpg'),
(51, 51, 'Whipped Cream | كريمة مخفوقة', 8, 'كريمة مخفوقة طازجة وناعمة.', 'default.jpg'),
(52, 52, 'Flavor + Whipped Cream | نكهة + كريمة', 8, 'مزيج من النكهة والكريمة المخفوقة.', 'default.jpg'),
(53, 53, 'Boba | بوبا', 8, 'إضافة حبيبات التابيوكا (بوبا).', 'default.jpg'),
(54, 54, 'Honey | عسل', 8, 'عسل نحل طبيعي ونقي.', 'default.jpg'),
(55, 55, 'Ice Cream | آيس كريم', 8, 'آيس كريم فانيليا كريمي غني.', 'default.jpg'),
(56, 56, 'Extra Shot | شوت إضافي', 8, 'إضافة جرعة إضافية من الإسبريسو.', 'default.jpg');

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
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(57, 57, 'Cantaloupe Juice |عصير كنتالوب', 9, 'عصير كنتالوب طازج ومنعش.', 'Cantaloupe Juice.png'),
(58, 58, 'Strawberry Juice | عصير فراولة', 9, 'عصير فراولة طبيعي مبرد.', 'Strawberry Juice.png'),
(59, 59, 'Mango Juice | عصير مانجو', 9, 'عصير مانجو استوائي غني الكثافة.', 'Mango Juice.png'),
(60, 60, 'Kiwi Juice | عصير كيوي', 9, 'عصير كيوي طازج ومليء بالفيتامينات.', 'Kiwi Juice.png'),
(61, 61, 'Banana Juice | عصير موز', 9, 'عصير موز طبيعي بقوام كريمي.', 'Banana Juice.png'),
(62, 62, 'Watermelon Juice | عصير بطيخ', 9, 'عصير بطيخ منعش ومبرد.', 'Watermelon Juice.png'),
(63, 63, 'Peach Juice | عصير خوخ', 9, 'عصير خوخ طبيعي بمذاق حلو.', 'Peach Juice.png'),
(64, 64, 'Berry Juice | عصير توت', 9, 'عصير توت مشكل طازج ومنعش.', 'Berry Juice.png'),
(65, 65, 'Lemon Juice | عصير ليمون', 9, 'عصير ليمون حامض ومنعش.', 'Lemon Juice.png'),
(66, 66, 'Lemon Mint Juice | عصير ليمون نعناع', 9, 'مزيج الليمون المنعش مع النعناع الطازج.', 'Lemon Mint Juice.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(57, 1, 69), (57, 2, 74), (57, 3, 79),
(58, 1, 68), (58, 2, 70), (58, 3, 74),
(59, 1, 70), (59, 2, 74), (59, 3, 79),
(60, 1, 89), (60, 2, 94), (60, 3, 99),
(61, 1, 68), (61, 2, 70), (61, 3, 74),
(62, 1, 69), (62, 2, 74), (62, 3, 79),
(63, 1, 79), (63, 2, 84), (63, 3, 89),
(64, 1, 79), (64, 2, 84), (64, 3, 89),
(65, 1, 68), (65, 2, 70), (65, 3, 74),
(66, 1, 69), (66, 2, 74), (66, 3, 79);

/* =========================
ICE COFFEE
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(67, 67, 'Ice Latte | آيس لاتيه', 10, 'إسبريسو مثلج مع الحليب البارد.', 'Ice Latte.png'),
(68, 68, 'Ice Mocha | آيس موكا', 10, 'موكا مثلجة بالشوكولاتة والحليب البارد.', 'Ice Mocha.png'),
(69, 69, 'Ice White Mocha | آيس وايت موكا', 10, 'وايت موكا مثلجة بنكهة الفانيليا الحلوة.', 'Ice White Mocha.png'),
(70, 70, 'Ice Shaken White Mocha | آيس وايت موكا شيكن', 10, 'وايت موكا شيكن كريمية ومنعشة.', 'Ice Shaken White Mocha.png'),
(71, 71, 'Ice Americano | آيس أمريكانو', 10, 'قهوة سوداء مثلجة قوية ومنعشة.', 'Ice Americano.png'),
(72, 72, 'Ice Biscoff Latte | آيس بسكوف لاتيه', 10, 'لاتيه مثلج مع كريمة بسكوف اللذيذة.', 'Ice Biscoff Latte.png'),
(73, 73, 'Ice Caramel Macchiato | آيس كراميل ماكياتو', 10, 'قهوة باردة بطبقات الحليب وصوص الكراميل.', 'Ice Caramel Macchiato.png'),
(74, 74, 'Ice Spanish Latte | آيس سبانيش لاتيه', 10, 'لاتيه إسباني مثلج مع الحليب المكثف.', 'Ice Spanish Latte.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(67, 1, 84), (67, 2, 89), (67, 3, 94),
(68, 1, 89), (68, 2, 94), (68, 3, 99),
(69, 1, 89), (69, 2, 94), (69, 3, 99),
(70, 1, 89), (70, 2, 94), (70, 3, 99),
(71, 1, 74), (71, 2, 79), (71, 3, 84),
(72, 1, 94), (72, 2, 99), (72, 3, 104),
(73, 1, 89), (73, 2, 94), (73, 3, 99),
(74, 1, 94), (74, 2, 99), (74, 3, 104);

/* =========================
SMOOTHIES
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(75, 75, 'Peach Smoothie | سموزي خوخ', 11, 'سموزي خوخ طبيعي منعش ومبرد.', 'Peach Smoothie.png'),
(76, 76, 'Strawberry Smoothie | سموزي فراولة', 11, 'سموزي فراولة طازجة وحلوة.', 'Strawberry Smoothie.png'),
(77, 77, 'Mango Smoothie | سموزي مانجو', 11, 'سموزي مانجو استوائي غني المذاق.', 'Mango Smoothie.png'),
(78, 78, 'Watermelon Smoothie | سموزي بطيخ', 11, 'سموزي بطيخ منعش ومرطب.', 'Watermelon Smoothie.png'),
(79, 79, 'Kiwi Smoothie | سموزي كيوي', 11, 'سموزي كيوي أخضر وصحي.', 'Kiwi Smoothie.png'),
(80, 80, 'Apple Smoothie | سموزي تفاح', 11, 'سموزي تفاح حلو مع لمسة قرفة.', 'Apple Smoothie.png'),
(81, 81, 'Pineapple Smoothie | سموزي أناناس', 11, 'سموزي أناناس منعش بنكهة استوائية.', 'Pineapple Smoothie.png'),
(82, 82, 'Passion Fruit Smoothie | سموزي باشن فروت', 11, 'سموزي باشن فروت بنكهة فريدة.', 'Passion Fruit Smoothie.png'),
(83, 83, 'Lemon Smoothie | سموزي ليمون', 11, 'سموزي ليمون حامض ومنعش.', 'Lemon Smoothie.png'),
(84, 84, 'Lemon Mint Smoothie | سموزي ليمون نعناع', 11, 'سموزي ليمون ونعناع بارد ومنعش.', 'Lemon Mint Smoothie.png'),
(85, 85, 'Mixed Berry Smoothie |سموزي توت مشكل', 11, 'سموزي توت مشكل غني بمضادات الأكسدة.', 'Mixed Berry Smoothie.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(75, 1, 79), (75, 2, 84), (75, 3, 89),
(76, 1, 79), (76, 2, 84), (76, 3, 89),
(77, 1, 79), (77, 2, 84), (77, 3, 89),
(78, 1, 79), (78, 2, 84), (78, 3, 89),
(79, 1, 89), (79, 2, 99), (79, 3, 109),
(80, 1, 79), (80, 2, 84), (80, 3, 89),
(81, 1, 84), (81, 2, 89), (81, 3, 94),
(82, 1, 84), (82, 2, 89), (82, 3, 94),
(83, 1, 79), (83, 2, 84), (83, 3, 89),
(84, 1, 84), (84, 2, 89), (84, 3, 94),
(85, 1, 89), (85, 2, 99), (85, 3, 109);

/* =========================
COLD DRINKS
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(86, 86, 'V Cola | في كولا', 12, 'مشروب كولا غازي بارد ومنعش.', 'V Cola.png'),
(87, 87, 'V7 | في 7', 12, 'مشروب غازي بنكهات الليمون المنعشة.', 'V7.png'),
(88, 88, 'Double Dare | دبل دير', 12, 'مشروب طاقة منعش بنكهة الفواكه.', 'Double Dare.png'),
(89, 89, 'Water | مياه', 12, 'مياه معدنية طبيعية نقية مبردة.', 'Water.png'),
(90, 90, 'C4 | سي 4', 12, 'مشروب طاقة قوي لمحبي النشاط.', 'C4.png'),
(91, 91, 'Red Bull | ريد بول', 12, 'مشروب الطاقة ريد بول الأصلي.', 'Red Bull.png'),
(92, 92, 'Red Bull Flavor | ريد بول نكهات', 12, 'ريد بول بنكهات فواكه متنوعة ومنعشة.', 'Red Bull Flavor.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(86, 2, 40),
(87, 2, 50),
(88, 2, 40),
(89, 2, 15),
(90, 2, 180),
(91, 2, 90),
(92, 2, 110);

/* =========================
DESSERT
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(93, 93, 'Cheese cake | تشيز كيك', 13, 'تشيز كيك كلاسيكي ناعم وكريمي.', 'Cheesecake.png'),
(94, 94, 'Cheese cake Caramel | تشيز كيك كراميل', 13, 'تشيز كيك غني مع صوص الكراميل السائل.', 'Cheese cake Caramel.png'),
(95, 95, 'Cheese cake Blueberry | تشيز كيك توت', 13, 'تشيز كيك مع طبقة التوت الأزرق الطازج.', 'Cheese cake Blueberry.png'),
(96, 96, 'Cheese cake Lotus | تشيز كيك لوتس', 13, 'تشيز كيك مع كريمة وبسكويت اللوتس.', 'Cheese cake Lotus.png'),
(97, 97, 'Cheese cake Pistachio | تشيز كيك بستاشيو', 13, 'تشيز كيك مع كريمة الفستق الفاخرة.', 'Cheese cake Pistachio.png'),
(98, 98, 'Cheese cake Nutella | تشيز كيك نوتيلا', 13, 'تشيز كيك مع طبقة غنية من نوتيلا.', 'Cheese cake Nutella.png'),
(99, 99, 'Molten Cake | مولتن كيك', 13, 'كيك شوكولاتة دافئ بقلب سائل ذائب.', 'Molten Cake.png'),
(100, 100, 'Molten Cake Nutella | مولتن كيك نوتيلا', 13, 'مولتن كيك مع حشوة نوتيلا الذائبة.', 'Molten Cake Nutella.png'),
(101, 101, 'San Sebastian | سان سباستيان', 13, 'تشيز كيك سان سباستيان الكريمي الشهير.', 'default-coffee.png'),
(102, 102, 'San Sebastian Lotus | سان سباستيان لوتس', 13, 'كيك سان سباستيان مع كريمة اللوتس.', 'San Sebastian Lotus.png'),
(103, 103, 'San Sebastian Nutella | سان سباستيان نوتيلا', 13, 'كيك سان سباستيان مع نوتيلا غنية.', 'San Sebastian Nutella.png'),
(104, 104, 'San Sebastian Blueberry | سان سباستيان توت', 13, 'كيك سان سباستيان مع صوص التوت الأزرق.', 'San Sebastian Blueberry.png'),
(105, 105, 'San Sebastian Caramel | سان سباستيان كراميل', 13, 'كيك سان سباستيان مع صوص الكراميل.', 'San Sebastian Caramel.png'),
(106, 106, 'San Sebastian Pistachio | سان سباستيان بستاشيو', 13, 'كيك سان سباستيان مع كريمة الفستق.', 'San Sebastian Pistachio.png'),
(107, 107, 'Tiramisu | تيراميسو', 13, 'تيراميسو إيطالي تقليدي بنكهة القهوة.', 'Tiramisu.png');

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
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(108, 108, 'Plain Croissant | كرواسون سادة', 14, 'كرواسون فرنسي طازج وهش بالزبدة.', 'Plain Croissant.png'),
(109, 109, 'Chocolate Croissant | كرواسون شوكولاتة', 14, 'كرواسون محشو بالشوكولاتة الغنية.', 'Chocolate Croissant.png'),
(110, 110, 'Lotus Croissant | كرواسون لوتس', 14, 'كرواسون محشو بكريمة بسكويت اللوتس.', 'Lotus Croissant.png'),
(111, 111, 'Pistachio Croissant | كرواسون بستاشيو', 14, 'كرواسون محشو بكريمة الفستق الفاخرة.', 'Pistachio Croissant.png'),
(112, 112, 'Cheese Croissant | كرواسون جبنة', 14, 'كرواسون محشو بجبنة الشيدر الذائبة.', 'Cheese Croissant.png'),
(113, 113, 'Smoked Turkey Croissant | كرواسون تركي مدخن', 14, 'كرواسون مع صدر رومي مدخن وجبنة.', 'Turkey Croissant.png'),
(114, 114, 'Mixed Cheese Croissant | كرواسون جبن مشكل', 14, 'كرواسون محشو بتشكيلة من الأجبان الثلاثة.', 'Mixed Cheese Croissant.png'),
(115, 115, 'Plain Patisserie | باتيه سادة', 14, 'باتيه فرنسي طازج وخفيف.', 'default.jpg'),
(116, 116, 'Cheese Patisserie | باتيه جبنة', 14, 'باتيه محشو بجبنة ذائبة.', 'default.jpg'),
(117, 117, 'White Cheese Patisserie | باتيه جبنة بيضاء', 14, 'باتيه محشو بجبنة بيضاء كريمية.', 'default.jpg'),
(118, 118, 'Luncheon Patisserie | باتيه لانشون', 14, 'باتيه محشو باللانشون والجبنة.', 'default.jpg'),
(119, 119, 'Smoked Turkey Patisserie | باتيه تركي مدخن', 14, 'باتيه مع صدر رومي مدخن وجبنة.', 'default.jpg'),
(120, 120, 'Mixed Cheese Patisserie | باتيه جبن مشكل', 14, 'باتيه محشو بتشكيلة من الأجبان.', 'default.jpg'),
(121, 121, 'Cookies | كوكيز', 14, 'كوكيز متنوع ومحلى طازجاً.', 'default.jpg'),
(122, 122, 'Cookies Nuts | كوكيز مكسرات', 14, 'كوكيز مقرمش مع حبات المكسرات.', 'default.jpg');
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
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(123, 123, 'Turkish Special Blend (250g) | قهوة تركي اسبيشيال بلند', 15, 'قهوة تركي اسبيشيال بلند - ربع كيلو.', 'default-coffee.png'),
(124, 124, 'Espresso Colombia Cali (250g) | اسبريسو كلومبي كالي', 15, 'اسبريسو كلومبي كالي - ربع كيلو.', 'default-coffee.png'),
(125, 125, 'Ethiopian Hambela (250g) | اثيوبي هامبيلا', 15, 'اثيوبي هامبيلا - ربع كيلو.', 'default-coffee.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(123, 2, 300),
(124, 2, 400),
(125, 2, 400);

/* =========================
NEW FRAPPE ADDITIONS
========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(126, 126, 'Frappe Mixed Berry | فرابيه ميكس بيري', 4, 'مزيج منعش من التوت المشكل والثلج.', 'Frappe Mixed Berry.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(126, 1, 89),
(126, 2, 94),
(126, 3, 99);

/* =========================
   NEW SHAKE ADDITIONS
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(127, 127, 'Vanilla Shake | فانيليا شيك', 3, 'ميلك شيك فانيليا ناعم وكريمي بنكهة كلاسيكية.', 'Vanilla Shake.png'),
(128, 128, 'Strawberry Shake | فراولة شيك', 3, 'ميلك شيك فراولة طازجة بنكهة حلوة ومنعشة.', 'Strawberry Shake.png'),
(129, 129, 'Mango Shake | مانجو شيك', 3, 'ميلك شيك مانجو استوائي غني وكريمي.', 'Mango Shake .png'),
(130, 130, 'Chocolate Shake | شوكولاتة شيك', 3, 'ميلك شيك شوكولاتة غني وقوام كثيف لا يقاوم.', 'Chocolate Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(127, 1, 84), (127, 2, 89), (127, 3, 94),
(128, 1, 84), (128, 2, 89), (128, 3, 94),
(129, 1, 84), (129, 2, 89), (129, 3, 94),
(130, 1, 84), (130, 2, 89), (130, 3, 94);

/* =========================
   MOJITO AND SODA ADDITIONS
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(131, 131, 'Strawberry Mojito | موهيتو فراولة', 16, 'موهيتو منعش بنكهة الفراولة.', 'Strawberry Mojito.png'),
(132, 132, 'Blueberry Mojito | موهيتو توت', 16, 'موهيتو منعش بنكهة التوت.', 'Blueberry Mojito.png'),
(133, 133, 'Pineapple Mojito | موهيتو أناناس', 16, 'موهيتو منعش بنكهة الأناناس.', 'Pineapple Mojito.png'),
(134, 134, 'Mango Mojito | موهيتو مانجا', 16, 'موهيتو منعش بنكهة المانجو.', 'Mango Mojito.png'),
(135, 135, 'Peach Mojito | موهيتو خوخ', 16, 'موهيتو منعش بنكهة الخوخ.', 'Peach Mojito.png'),
(136, 136, 'Mix Berry Mojito | موهيتو ميكس بيري', 16, 'موهيتو منعش بنكهة ميكس بيري.', 'Mix Berry Mojito.png'),
(137, 137, 'Kiwi Mojito | موهيتو كيوي', 16, 'موهيتو منعش بنكهة الكيوي.', 'Kiwi Mojito.png'),
(138, 138, 'Passion Fruit Mojito | موهيتو باشون', 16, 'موهيتو منعش بنكهة الباشون فروت.', 'Passion Fruit Mojito.png'),
(139, 139, 'Apple Mojito | موهيتو تفاح', 16, 'موهيتو منعش بنكهة التفاح.', 'Apple Mojito.png'),
(140, 140, 'Raspberry Mojito | موهيتو راس بيري', 16, 'موهيتو منعش بنكهة الراس بيري.', 'Raspberry Mojito.png'),
(141, 141, 'Pink Lemon | بينك ليمون', 16, 'مشروب بينك ليمون منعش.', 'Pink Lemon.png'),
(142, 142, 'Blue Passion | بلو باشون', 16, 'مشروب بلو باشون منعش.', 'Blue Passion.png'),
(143, 143, 'Pineapple Lemon Mint | بينابول ليمون مينت', 16, 'مشروب بينابول ليمون مينت منعش.', 'Pineapple Lemon Mint.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(139, 1, 79), (139, 2, 84), (139, 3, 89),
(140, 1, 79), (140, 2, 84), (140, 3, 89),
(141, 1, 79), (141, 2, 84), (141, 3, 89),
(142, 1, 79), (142, 2, 84), (142, 3, 89),
(143, 1, 79), (143, 2, 84), (143, 3, 89),
(136, 1, 79), (136, 2, 84), (136, 3, 89),
(137, 1, 79), (137, 2, 84), (137, 3, 89),
(138, 1, 79), (138, 2, 84), (138, 3, 89),
(131, 1, 79), (131, 2, 84), (131, 3, 89),
(132, 1, 79), (132, 2, 84), (132, 3, 89),
(133, 1, 79), (133, 2, 84), (133, 3, 89),
(134, 1, 79), (134, 2, 84), (134, 3, 89),
(135, 1, 79), (135, 2, 84), (135, 3, 89);

/* =========================
   MATCHA ADDITIONS (SPLIT)
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(144, 144, 'Ice Matcha Mango | آيس ماتشا مانجو', 5, 'ماتشا مثلج بنكهة المانجو المنعشة.', 'Ice Matcha Mango.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(144, 1, 104), (144, 2, 109), (144, 3, 114);

/* =========================
   BOBA SOFT
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(145, 145, 'Boba Soft Passion | بوبا سوفت باشون', 6, 'بوبا سوفت بنكهة الباشون فروت المنعشة.', 'Boba Soft Passion.png'),
(146, 146, 'Boba Soft Strawberry | بوبا سوفت فراولة', 6, 'بوبا سوفت بنكهة الفراولة الحلوة.', 'Boba Soft Strawberry.png'),
(147, 147, 'Boba Soft Blueberry | بوبا سوفت بلوبيري', 6, 'بوبا سوفت بنكهة التوت الأزرق.', 'Boba Soft Blueberry.png'),
(148, 148, 'Boba Soft Mango | بوبا سوفت مانجا', 6, 'بوبا سوفت بنكهة المانجو الاستوائية.', 'Boba Soft Mango.png'),
(149, 149, 'Boba Soft Green Apple | بوبا سوفت تفاح أخضر', 6, 'بوبا سوفت بنكهة التفاح الأخضر المنعشة.', 'Boba Soft Green Apple.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(145, 1, 84), (145, 2, 89), (145, 3, 94),
(146, 1, 84), (146, 2, 89), (146, 3, 94),
(147, 1, 84), (147, 2, 89), (147, 3, 94),
(148, 1, 84), (148, 2, 89), (148, 3, 94),
(149, 1, 84), (149, 2, 89), (149, 3, 94);

/* =========================
   BOBA MILKSHAKE
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(150, 150, 'Milk Strawberry Boba Strawberry | ميلك فراولة بوبا فراولة', 17, 'ميلك شيك فراولة مع بوبا فراولة.', 'Milk Strawberry Boba Strawberry.png'),
(151, 151, 'Milk Mango Boba Mango | ميلك مانجا بوبا مانجا', 17, 'ميلك شيك مانجو مع بوبا مانجو.', 'Milk Mango Boba Mango.png'),
(152, 152, 'Milk Peach Boba Peach | ميلك خوخ بوبا خوخ', 17, 'ميلك شيك خوخ مع بوبا خوخ.', 'Milk Peach Boba Peach.png'),
(153, 153, 'Milk Passion Boba Passion | ميلك باشون بوبا باشون', 17, 'ميلك شيك باشون فروت مع بوبا باشون.', 'Milk Passion Boba Passion.png'),
(154, 154, 'Milk Blueberry Boba Blueberry | ميلك بلوبيري بوبا بلوبيري', 17, 'ميلك شيك بلوبيري مع بوبا بلوبيري.', 'Milk Blueberry Boba Blueberry.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(150, 1, 99), (150, 2, 104), (150, 3, 114),
(151, 1, 99), (151, 2, 104), (151, 3, 114),
(152, 1, 99), (152, 2, 104), (152, 3, 114),
(153, 1, 99), (153, 2, 104), (153, 3, 114),
(154, 1, 99), (154, 2, 104), (154, 3, 114);

/* =========================
   BOBA SMOOTHIE
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(155, 155, 'Blueberry Smoothie Boba Blueberry | سموزي توت بوبا توت', 18, 'سموزي التوت الأزرق مع بوبا توت.', 'Blueberry Smoothie Boba Blueberry.png'),
(156, 156, 'Strawberry Smoothie Boba Strawberry | سموزي فراولة بوبا فراولة', 18, 'سموزي الفراولة الطازجة مع بوبا فراولة.', 'Strawberry Smoothie Boba Strawberry.png'),
(157, 157, 'Apple Smoothie Boba Apple | سموزي تفاح بوبا تفاح', 18, 'سموزي التفاح المنعش مع بوبا تفاح.', 'Apple Smoothie Boba Apple.png'),
(158, 158, 'Passion Smoothie Boba Passion | سموزي باشون بوبا باشون', 18, 'سموزي الباشون فروت مع بوبا باشون.', 'Passion Smoothie Boba Passion.png'),
(159, 159, 'Peach Smoothie Boba Peach | سموزي خوخ بوبا خوخ', 18, 'سموزي الخوخ الناعم مع بوبا خوخ.', 'Peach Smoothie Boba Peach.png'),
(160, 160, 'Mango Smoothie Boba Mango | سموزي مانجا بوبا مانجا', 18, 'سموزي المانجو الاستوائي مع بوبا مانجو.', 'Mango Smoothie Boba Mango.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(155, 1, 89), (155, 2, 94), (155, 3, 99),
(156, 1, 89), (156, 2, 94), (156, 3, 99),
(157, 1, 89), (157, 2, 94), (157, 3, 99),
(158, 1, 89), (158, 2, 94), (158, 3, 99),
(159, 1, 89), (159, 2, 94), (159, 3, 99),
(160, 1, 89), (160, 2, 94), (160, 3, 99);

/* =========================
   HOT AMERICANO ADDITION
   ========================= */
INSERT INTO products (product_id, product_id, product_name, category_id, description_ar, image_url) VALUES
(161, 161, 'Hot Americano | هوت أمريكانو', 1, 'قهوة أمريكانو ساخنة كلاسيكية.', 'Hot Americano.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(161, 1, 69), (161, 2, 74);