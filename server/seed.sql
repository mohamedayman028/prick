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
('Extras', 80),
('Fresh Juices', 90),
('Ice Coffee', 100),
('Smoothies', 110),
('Cold Drinks', 120),
('Dessert', 130),
('Bakery', 140),
('Coffee Packages', 150),
('Mojito and Soda', 160),
('Boba Milkshake', 61),
('Boba Smoothie', 62);



/* =========================
HOT COFFEE
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Espresso | إسبريسو', 1, 'إسبريسو مركز بنكهة غنية وكريمة ذهبية.', 'Espresso.png'),
('Macchiato | ماكياتو', 1, 'إسبريسو مع لمسة من رغوة الحليب المكثف.', 'Macchiato.png'),
('Hot Mocha | موكا ساخن', 1, 'مزيج رائع من الإسبريسو والشوكولاتة مع الحليب.', 'Hot Mocha.png'),
('Hot White Mocha | وايت موكا ساخن', 1, 'إسبريسو مع الشوكولاتة البيضاء والحليب المخملي.', 'Hot White Mocha.png'),
('Nescafe | نسكافيه', 1, 'قهوة نسكافيه كلاسيكية محضرة بالحليب الساخن.', 'Nescafe.png'),
('Nescafe Black | نسكافيه بلاك', 1, 'قهوة نسكافيه سوداء نقية لمحبي المذاق القوي.', 'Nescafe Black.png'),
('Cappuccino | كابتشينو', 1, 'إسبريسو مع حليب مبخر ورغوة كثيفة متوازنة.', 'Cappuccino.png'),
('Hot Latte | لاتيه ساخن', 1, 'إسبريسو ناعم مع كمية وافرة من الحليب المبخر.', 'Hot Latte.png'),
('Turkish Coffee | قهوة تركية', 1, 'قهوة تركية كلاسيكية محضرة بعناية ومذاق أصيل.', 'Turkish Coffee.png'),
('Turkish Coffee with Milk | قهوة فرنساوي', 1, 'قهوة تركية تقليدية مع الحليب لمذاق أكثر نعومة.', 'Turkish Coffee with Milk.png'),
('Nutella Coffee | قهوة نوتيلا', 1, 'إسبريسو غني ممزوج بلمسة من شوكولاتة نوتيلا.', 'Nutella Coffee.png'),
('Spanish Latte | سبانيش لاتيه', 1, 'لاتيه حلو مع الحليب المكثف المحلى لقوام كريمي.', 'Spanish Latte.png'),
('Flat White | فلات وايت', 1, 'إسبريسو مزدوج مع طبقة ناعمة من رغوة الحليب.', 'Flat White.png'),
('Cortado | كورتادو', 1, 'مزيج مثالي من الإسبريسو وكمية متساوية من الحليب.', 'Cortado.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(1, 4, 55), (1, 5, 65),
(2, 4, 65), (2, 5, 70),
(3, 1, 89), (3, 3, 94),
(4, 1, 89), (4, 3, 94),
(5, 1, 64), (5, 3, 69),
(6, 1, 60), (6, 3, 65),
(7, 1, 69), (7, 3, 74),
(8, 1, 69), (8, 3, 74),
(9, 1, 50), (9, 3, 60),
(10, 1, 55), (10, 3, 65),
(11, 1, 69), (11, 3, 74),
(13, 1, 94), (13, 3, 99),
(14, 1, 69), (14, 3, 74),
(15, 1, 69), (15, 3, 74);

/* =========================
WARM DRINKS
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Tea | شاي', 2, 'شاي أسود فاخر محضر طازجاً.', 'Tea.png'),
('Tea with Milk | شاي بالحليب', 2, 'شاي كلاسيكي ممزوج بالحليب الناعم.', 'Tea with Milk.png'),
('Hot Cider | هوت سيدر', 2, 'سيدر تفاح دافئ مع لمسة قرفة.', 'Hot Cider.png'),
('Hot Chocolate | هوت شوكلت', 2, 'شوكولاتة غنية وحليب مبخر دافئ.', 'Hot Chocolate.png'),
('Sahlab | سحلب', 2, 'مشروب السحلب التقليدي بالمكسرات.', 'Sahlab.png');


INSERT INTO product_prices (product_id, size_id, price) VALUES
(16, 2, 50), 
(17, 2, 60), 
(19, 2, 65), (19, 3, 70),
(20, 2, 85), (20, 3, 94),
(21, 2, 60), (21, 3, 65);

/* =========================
SHAKES
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Oreo Shake | أوريو شيك', 3, 'ميلك شيك كريمي مع قطع بسكويت أوريو.', 'Oreo Shake.png'),
('Nutella Shake | نوتيلا شيك', 3, 'ميلك شيك غني بشوكولاتة نوتيلا.', 'Nutella Shake.png'),
('Pistachio Shake | بستاشيو شيك', 3, 'ميلك شيك ناعم بنكهة الفستق الفاخرة.', 'Pistachio Shake.png'),
('Lotus Shake | لوتس شيك', 3, 'ميلك شيك بنكهة كريمة اللوتس المميزة.', 'Lotus Shake.png'),
('Caramel Shake | كراميل شيك', 3, 'ميلك شيك كريمي مع صوص الكراميل.', 'Caramel Shake.png'),
('Peach Shake | خوخ شيك', 3, 'ميلك شيك منعش بنكهة الخوخ الطبيعية.', 'Peach Shake.png'),
('Blueberry Shake | بلو بيري شيك', 3, 'ميلك شيك بنكهة التوت الأزرق المنعشة.', 'Blueberry Shake.png'),
('Kinder Shake | كيندر شيك', 3, 'ميلك شيك كريمي بطعم شوكولاتة كيندر.', 'Kinder Shake.png'),
('KitKat Shake | كيت كات شيك', 3, 'ميلك شيك مع قطع كيت كات المقرمشة.', 'KitKat Shake.png'),
('Twix Shake | تويكس شيك', 3, 'ميلك شيك بكراميل وبسكويت تويكس.', 'Twix Shake.png'),
('Snickers Shake | سنيكرز شيك', 3, 'ميلك شيك بكراميل وفول سوداني سنيكرز.', 'Snickers Shake.png'),
('Galaxy Shake | جلاكسي شيك', 3, 'ميلك شيك بشوكولاتة جالاكسي الناعمة.', 'Galaxy Shake.png'),
('M&M Shake | إم أند إم شيك', 3, 'ميلك شيك ممتع مع حبات إم آند إمز.', 'M&M Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(22, 1, 99), (22, 2, 104), (22, 3, 114),
(23, 1, 99), (23, 2, 104), (23, 3, 109),
(24, 1, 104), (24, 2, 109), (24, 3, 114),
(25, 1, 99), (25, 2, 104), (25, 3, 109),
(26, 1, 99), (26, 2, 104), (26, 3, 109),
(27, 1, 94), (27, 2, 99), (27, 3, 104),
(28, 1, 99), (28, 2, 104), 
(29, 2, 115), (29, 3, 120),
(30, 2, 115), (30, 3, 120),
(31, 2, 115), (31, 3, 120),
(32, 2, 115), (32, 3, 120),
(33, 2, 115), (33, 3, 120),
(34, 2, 120), (34, 3, 125);

/* =========================
FRAPPE
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Classic Frappe | فرابيه كلاسيك', 4, 'قهوة باردة ممزوجة بالثلج والحليب.', 'Classic Frappe.png'),
('Caramel Frappe | فرابيه كراميل', 4, 'فرابيه قهوة بصوص الكراميل الغني.', 'Caramel Frappe.png'),
('Lotus Frappe | فرابيه لوتس', 4, 'فرابيه قهوة بنكهة بسكويت اللوتس.', 'Lotus Frappe.png'),
('White Mocha Frappe | فرابيه وايت موكا', 4, 'فرابيه كريمي بنكهة الشوكولاتة البيضاء.', 'White Mocha Frappe.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(35, 1, 89),     (35, 2, 94),   (35, 3, 99),
(36, 1, 99),       (36, 2, 104),  (36, 3, 109),
(37, 1, 104),     (37, 2, 109),    (37, 3, 114),
(38, 1, 104),     (38, 2, 109),   (38, 3, 114);




/* =========================
MATCHA
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Ice Matcha | آيس ماتشا', 5, 'ماتشا ياباني أصيل مع الثلج المنعش.', 'Ice Matcha.png'),
('Ice Matcha Strawberry | آيس ماتشا فراولة', 5, 'ماتشا مثلج بنكهة الفراولة المنعشة.', 'Ice Matcha Strawberry.png'),
('Ice Matcha Coconut | آيس ماتشا جوز هند', 5, 'ماتشا مثلج مع حليب جوز الهند الكريمي.', 'Ice Matcha Coconut.png'),
('Ice Matcha Caramel | آيس ماتشا كراميل', 5, 'ماتشا مثلج مع لمسة من الكراميل الحلو.', 'Ice Matcha Caramel.png'),
('Hot Matcha | هوت ماتشا', 5, 'ماتشا ياباني دافئ وصحي.', 'Hot Matcha.png'),
('Hot Honey Matcha | هوت هوني ماتشا', 5, 'ماتشا ساخن محلى بالعسل الطبيعي.', 'Hot Honey Matcha.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(39, 1, 99), (39, 2, 104), (39, 3, 109),
(40, 1, 104), (40, 2, 109), (40, 3, 114),
(41, 1, 104), (41, 2, 109), (41, 3, 114),
(42, 1, 104), (42, 2, 109), (42, 3, 114),
(43, 1, 99), (43, 2, 104), (43, 3, 109),
(44, 1, 104), (44, 2, 109), (44, 3, 114);

/* BOBA CATEGORY REMOVED */

/* =========================
SPECIALTY COFFEE
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('V60 Ice | في 60 مثلج', 7, 'قهوة مختصة مثلجة محضرة بالتقطير.', 'default.jpg'),
('V60 Hot | في 60 ساخن', 7,'قهوة مختصة ساخنة محضرة بالتقطير.', NULL),
('Chemex | كيمكس', 7, 'قهوة نقية ومصفاة بمذاق متوازن.', 'default.jpg'),
('Aeropress | إيروبرس', 7, 'قهوة غنية وسلسة محضرة بضغط الهواء.', 'default.jpg'),
('Syphon | سايفون', 7, 'قهوة عطرية محضرة بتقنية السايفون.', 'Syphon.png'),
('Cold Brew | كولد برو', 7, 'قهوة مقطرة باردة لمدة 24 ساعة.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(45, 2, 160),
(46, 2, 150),
(47, 2, 150),
(48, 2, 160),
(45, 2, 170),
(46, 2, 180);

/* =========================
EXTRAS
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Nuts | مكسرات', 8, 'مكسرات مشكلة محمصة وطازجة.', 'default.jpg'),
('Flavor | نكهة', 8, 'إضافة نكهات متنوعة حسب اختيارك.', 'default.jpg'),
('Whipped Cream | كريمة مخفوقة', 8, 'كريمة مخفوقة طازجة وناعمة.', 'default.jpg'),
('Flavor + Whipped Cream | نكهة + كريمة', 8, 'مزيج من النكهة والكريمة المخفوقة.', 'default.jpg'),
('Boba | بوبا', 8, 'إضافة حبيبات التابيوكا (بوبا).', 'default.jpg'),
('Honey | عسل', 8, 'عسل نحل طبيعي ونقي.', 'default.jpg'),
('Ice Cream | آيس كريم', 8, 'آيس كريم فانيليا كريمي غني.', 'default.jpg'),
('Extra Shot | شوت إضافي', 8, 'إضافة جرعة إضافية من الإسبريسو.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(45, 1, 35),   (45, 2, 40),
(46, 1, 35), (46, 2, 40),
(47, 1, 35),   (47, 2, 40),
(48, 2, 45),
(45, 2, 45),
(46, 2, 35),
(47, 2, 45),
(48, 2, 45);

/* =========================
FRESH JUICES
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Cantaloupe Juice |عصير كنتالوب', 9, 'عصير كنتالوب طازج ومنعش.', 'Cantaloupe Juice.png'),
('Strawberry Juice | عصير فراولة', 9, 'عصير فراولة طبيعي مبرد.', 'Strawberry Juice.png'),
('Mango Juice | عصير مانجو', 9, 'عصير مانجو استوائي غني الكثافة.', 'Mango Juice.png'),
('Kiwi Juice | عصير كيوي', 9, 'عصير كيوي طازج ومليء بالفيتامينات.', 'Kiwi Juice.png'),
('Banana Juice | عصير موز', 9, 'عصير موز طبيعي بقوام كريمي.', 'Banana Juice.png'),
('Watermelon Juice | عصير بطيخ', 9, 'عصير بطيخ منعش ومبرد.', 'Watermelon Juice.png'),
('Peach Juice | عصير خوخ', 9, 'عصير خوخ طبيعي بمذاق حلو.', 'Peach Juice.png'),
('Berry Juice | عصير توت', 9, 'عصير توت مشكل طازج ومنعش.', 'Berry Juice.png'),
('Lemon Juice | عصير ليمون', 9, 'عصير ليمون حامض ومنعش.', 'Lemon Juice.png'),
('Lemon Mint Juice | عصير ليمون نعناع', 9, 'مزيج الليمون المنعش مع النعناع الطازج.', 'Lemon Mint Juice.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(49, 1, 69), (49, 2, 74), (49, 3, 79),
(50, 1, 68), (50, 2, 70), (50, 3, 74),
(51, 1, 70), (51, 2, 74), (51, 3, 79),
(52, 1, 89), (52, 2, 94), (52, 3, 99),
(53, 1, 68), (53, 2, 70), (53, 3, 74),
(54, 1, 69), (54, 2, 74), (54, 3, 79),
(55, 1, 79), (55, 2, 84), (55, 3, 89),
(56, 1, 79), (56, 2, 84), (56, 3, 89),
(57, 1, 68), (57, 2, 70), (57, 3, 74),
(58, 1, 69), (58, 2, 74), (58, 3, 79);

/* =========================
ICE COFFEE
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Ice Latte | آيس لاتيه', 10, 'إسبريسو مثلج مع الحليب البارد.', 'Ice Latte.png'),
('Ice Mocha | آيس موكا', 10, 'موكا مثلجة بالشوكولاتة والحليب البارد.', 'Ice Mocha.png'),
('Ice White Mocha | آيس وايت موكا', 10, 'وايت موكا مثلجة بنكهة الفانيليا الحلوة.', 'Ice White Mocha.png'),
('Ice Shaken White Mocha | آيس وايت موكا شيكن', 10, 'وايت موكا شيكن كريمية ومنعشة.', 'Ice Shaken White Mocha.png'),
('Ice Americano | آيس أمريكانو', 10, 'قهوة سوداء مثلجة قوية ومنعشة.', 'Ice Americano.png'),
('Ice Biscoff Latte | آيس بسكوف لاتيه', 10, 'لاتيه مثلج مع كريمة بسكوف اللذيذة.', 'Ice Biscoff Latte.png'),
('Ice Caramel Macchiato | آيس كراميل ماكياتو', 10, 'قهوة باردة بطبقات الحليب وصوص الكراميل.', 'Ice Caramel Macchiato.png'),
('Ice Spanish Latte | آيس سبانيش لاتيه', 10, 'لاتيه إسباني مثلج مع الحليب المكثف.', 'Ice Spanish Latte.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(59, 1, 84), (59, 2, 89), (59, 3, 94),
(60, 1, 89), (60, 2, 94), (60, 3, 99),
(61, 1, 89), (61, 2, 94), (61, 3, 99),
(62, 1, 89), (62, 2, 94), (62, 3, 99),
(63, 1, 74), (63, 2, 79), (63, 3, 84),
(64, 1, 94), (64, 2, 99), (64, 3, 104),
(65, 1, 89), (65, 2, 94), (65, 3, 99),
(66, 1, 94), (66, 2, 99), (66, 3, 104);

/* =========================
SMOOTHIES
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Peach Smoothie | سموزي خوخ', 11, 'سموزي خوخ طبيعي منعش ومبرد.', 'Peach Smoothie.png'),
('Strawberry Smoothie | سموزي فراولة', 11, 'سموزي فراولة طازجة وحلوة.', 'Strawberry Smoothie.png'),
('Mango Smoothie | سموزي مانجو', 11, 'سموزي مانجو استوائي غني المذاق.', 'Mango Smoothie.png'),
('Watermelon Smoothie | سموزي بطيخ', 11, 'سموزي بطيخ منعش ومرطب.', 'Watermelon Smoothie.png'),
('Kiwi Smoothie | سموزي كيوي', 11, 'سموزي كيوي أخضر وصحي.', 'Kiwi Smoothie.png'),
('Apple Smoothie | سموزي تفاح', 11, 'سموزي تفاح حلو مع لمسة قرفة.', 'Apple Smoothie.png'),
('Pineapple Smoothie | سموزي أناناس', 11, 'سموزي أناناس منعش بنكهة استوائية.', 'Pineapple Smoothie.png'),
('Passion Fruit Smoothie | سموزي باشن فروت', 11, 'سموزي باشن فروت بنكهة فريدة.', 'Passion Fruit Smoothie.png'),
('Lemon Smoothie | سموزي ليمون', 11, 'سموزي ليمون حامض ومنعش.', 'Lemon Smoothie.png'),
('Lemon Mint Smoothie | سموزي ليمون نعناع', 11, 'سموزي ليمون ونعناع بارد ومنعش.', 'Lemon Mint Smoothie.png'),
('Mixed Berry Smoothie |سموزي توت مشكل', 11, 'سموزي توت مشكل غني بمضادات الأكسدة.', 'Mixed Berry Smoothie.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(67, 1, 79), (67, 2, 84), (67, 3, 89),
(68, 1, 79), (68, 2, 84), (68, 3, 89),
(69, 1, 79), (69, 2, 84), (69, 3, 89),
(70, 1, 79), (70, 2, 84), (70, 3, 89),
(71, 1, 89), (71, 2, 99), (71, 3, 109),
(72, 1, 79), (72, 2, 84), (72, 3, 89),
(73, 1, 84), (73, 2, 89), (73, 3, 94),
(74, 1, 84), (74, 2, 89), (74, 3, 94),
(75, 1, 79), (75, 2, 84), (75, 3, 89),
(76, 1, 84), (76, 2, 89), (76, 3, 94),
(77, 1, 89), (77, 2, 99), (77, 3, 109);

/* =========================
COLD DRINKS
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('V Cola | في كولا', 12, 'مشروب كولا غازي بارد ومنعش.', 'V Cola.png'),
('V7 | في 7', 12, 'مشروب غازي بنكهات الليمون المنعشة.', 'V7.png'),
('Double Dare | دبل دير', 12, 'مشروب طاقة منعش بنكهة الفواكه.', 'Double Dare.png'),
('Water | مياه', 12, 'مياه معدنية طبيعية نقية مبردة.', 'Water.png'),
('C4 | سي 4', 12, 'مشروب طاقة قوي لمحبي النشاط.', 'C4.png'),
('Red Bull | ريد بول', 12, 'مشروب الطاقة ريد بول الأصلي.', 'Red Bull.png'),
('Red Bull Flavor | ريد بول نكهات', 12, 'ريد بول بنكهات فواكه متنوعة ومنعشة.', 'Red Bull Flavor.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(78, 2, 40),
(79, 2, 50),
(80, 2, 40),
(81, 2, 15),
(82, 2, 180),
(83, 2, 90),
(84, 2, 110);

/* =========================
DESSERT
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Cheese cake | تشيز كيك', 13, 'تشيز كيك كلاسيكي ناعم وكريمي.', 'default.jpg'),
('Cheese cake Caramel | تشيز كيك كراميل', 13, 'تشيز كيك غني مع صوص الكراميل السائل.', 'default.jpg'),
('Cheese cake Blueberry | تشيز كيك توت', 13, 'تشيز كيك مع طبقة التوت الأزرق الطازج.', 'Cheese cake Blueberry.png'),
('Cheese cake Lotus | تشيز كيك لوتس', 13, 'تشيز كيك مع كريمة وبسكويت اللوتس.', 'default.jpg'),
('Cheese cake Pistachio | تشيز كيك بستاشيو', 13, 'تشيز كيك مع كريمة الفستق الفاخرة.', 'default.jpg'),
('Cheese cake Nutella | تشيز كيك نوتيلا', 13, 'تشيز كيك مع طبقة غنية من نوتيلا.', 'Cheese cake Nutella.png'),
('Molten Cake | مولتن كيك', 13, 'كيك شوكولاتة دافئ بقلب سائل ذائب.', 'Molten Cake.png'),
('Molten Cake Nutella | مولتن كيك نوتيلا', 13, 'مولتن كيك مع حشوة نوتيلا الذائبة.', 'Molten Cake Nutella.png'),
('San Sebastian | سان سباستيان', 13, 'تشيز كيك سان سباستيان الكريمي الشهير.', 'San Sebastian.png'),
('San Sebastian Lotus | سان سباستيان لوتس', 13, 'كيك سان سباستيان مع كريمة اللوتس.', 'San Sebastian Lotus.png'),
('San Sebastian Nutella | سان سباستيان نوتيلا', 13, 'كيك سان سباستيان مع نوتيلا غنية.', 'San Sebastian Nutella.png'),
('San Sebastian Blueberry | سان سباستيان توت', 13, 'كيك سان سباستيان مع صوص التوت الأزرق.', 'San Sebastian.png'),
('San Sebastian Caramel | سان سباستيان كراميل', 13, 'كيك سان سباستيان مع صوص الكراميل.', 'San Sebastian.png'),
('San Sebastian Pistachio | سان سباستيان بستاشيو', 13, 'كيك سان سباستيان مع كريمة الفستق.', 'San Sebastian.png'),
('Tiramisu | تيراميسو', 13, 'تيراميسو إيطالي تقليدي بنكهة القهوة.', 'Tiramisu.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(85, 2, 75),
(86, 2, 85),
(87, 2, 85),
(88, 2, 90),
(89, 2, 95),
(90, 2, 85),
(91, 2, 80),
(92, 2, 90),
(93, 2, 75),
(94, 2, 90),
(95, 2, 85),
(96, 2, 85),
(97, 2, 85),
(98, 2, 95),
(99, 2, 75),(99, 3, 90);

/* =========================
BAKERY
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Plain Croissant | كرواسون سادة', 14, 'كرواسون فرنسي طازج وهش بالزبدة.', 'Plain Croissant.png'),
('Chocolate Croissant | كرواسون شوكولاتة', 14, 'كرواسون محشو بالشوكولاتة الغنية.', 'Chocolate Croissant.png'),
('Lotus Croissant | كرواسون لوتس', 14, 'كرواسون محشو بكريمة بسكويت اللوتس.', 'Lotus Croissant.png'),
('Pistachio Croissant | كرواسون بستاشيو', 14, 'كرواسون محشو بكريمة الفستق الفاخرة.', 'Pistachio Croissant.png'),
('Cheese Croissant | كرواسون جبنة', 14, 'كرواسون محشو بجبنة الشيدر الذائبة.', 'Cheese Croissant.png'),
('Smoked Turkey Croissant | كرواسون تركي مدخن', 14, 'كرواسون مع صدر رومي مدخن وجبنة.', 'Turkey Croissant.png'),
('Mixed Cheese Croissant | كرواسون جبن مشكل', 14, 'كرواسون محشو بتشكيلة من الأجبان الثلاثة.', 'Mixed Cheese Croissant.png'),
('Plain Patisserie | باتيه سادة', 14, 'باتيه فرنسي طازج وخفيف.', 'default.jpg'),
('Cheese Patisserie | باتيه جبنة', 14, 'باتيه محشو بجبنة ذائبة.', 'default.jpg'),
('White Cheese Patisserie | باتيه جبنة بيضاء', 14, 'باتيه محشو بجبنة بيضاء كريمية.', 'default.jpg'),
('Luncheon Patisserie | باتيه لانشون', 14, 'باتيه محشو باللانشون والجبنة.', 'default.jpg'),
('Smoked Turkey Patisserie | باتيه تركي مدخن', 14, 'باتيه مع صدر رومي مدخن وجبنة.', 'default.jpg'),
('Mixed Cheese Patisserie | باتيه جبن مشكل', 14, 'باتيه محشو بتشكيلة من الأجبان.', 'default.jpg'),
('Cookies | كوكيز', 14, 'كوكيز متنوع ومحلى طازجاً.', 'default.jpg'),
('Cookies Nuts | كوكيز مكسرات', 14, 'كوكيز مقرمش مع حبات المكسرات.', 'default.jpg');
INSERT INTO product_prices (product_id, size_id, price) VALUES
(100, 2, 35),
(101, 2, 50),
(102, 2, 60),
(103, 2, 70),
(104, 2, 55),
(105, 2, 65),
(106, 2, 60),
(107, 2, 35),
(108, 2, 55),
(109, 2, 45),
(110, 2, 65),
(111, 2, 65),
(112, 2, 60),
(113, 2, 40),(113, 3, 45),
(114, 2, 50);

/* =========================
COFFEE PACKAGES
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Brisk House Blend (250g) | خلطة بريسك هاوس (250 جرام)', 15, 'خلطة قهوة بريسك هاوس المميزة والمحمصة بعناية.', 'default.jpg'),
('Ethiopian Single Origin (250g) | قهوة إثيوبية (250 جرام)', 15, 'قهوة مختصة بنكهات فاكهية غنية.', 'default.jpg'),
('Colombian Roast (250g) | قهوة كولومبية (250 جرام)', 15, 'قهوة كولومبية كلاسيكية بمذاق متوازن.', 'default.jpg');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(115, 2, 250),
(116, 2, 300),
(117, 2, 280);

/* =========================
NEW FRAPPE ADDITIONS
========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Frappe Mixed Berry | فرابيه ميكس بيري', 4, 'مزيج منعش من التوت المشكل والثلج.', 'Frappe Mixed Berry.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(118, 1, 89),
(118, 2, 94),
(118, 3, 99);

/* =========================
   NEW SHAKE ADDITIONS
   ========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Vanilla Shake | فانيليا شيك', 3, 'ميلك شيك فانيليا ناعم وكريمي بنكهة كلاسيكية.', 'Vanilla Shake.png'),
('Strawberry Shake | فراولة شيك', 3, 'ميلك شيك فراولة طازجة بنكهة حلوة ومنعشة.', 'Strawberry Shake.png'),
('Mango Shake | مانجو شيك', 3, 'ميلك شيك مانجو استوائي غني وكريمي.', 'Mango Shake .png'),
('Chocolate Shake | شوكولاتة شيك', 3, 'ميلك شيك شوكولاتة غني وقوام كثيف لا يقاوم.', 'Chocolate Shake.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(119, 1, 84), (119, 2, 89), (119, 3, 94),
(120, 1, 84), (120, 2, 89), (120, 3, 94),
(121, 1, 84), (121, 2, 89), (121, 3, 94),
(122, 1, 84), (122, 2, 89), (122, 3, 94);

/* =========================
   MOJITO AND SODA ADDITIONS
   ========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Strawberry Mojito | موهيتو فراولة', 16, 'موهيتو منعش بنكهة الفراولة.', 'Strawberry Mojito.png'),
('Blueberry Mojito | موهيتو توت', 16, 'موهيتو منعش بنكهة التوت.', 'Blueberry Mojito.png'),
('Pineapple Mojito | موهيتو أناناس', 16, 'موهيتو منعش بنكهة الأناناس.', 'Pineapple Mojito.png'),
('Mango Mojito | موهيتو مانجا', 16, 'موهيتو منعش بنكهة المانجو.', 'Mango Mojito.png'),
('Peach Mojito | موهيتو خوخ', 16, 'موهيتو منعش بنكهة الخوخ.', 'Peach Mojito.png'),
('Mix Berry Mojito | موهيتو ميكس بيري', 16, 'موهيتو منعش بنكهة ميكس بيري.', 'Mix Berry Mojito.png'),
('Kiwi Mojito | موهيتو كيوي', 16, 'موهيتو منعش بنكهة الكيوي.', 'Kiwi Mojito.png'),
('Passion Fruit Mojito | موهيتو باشون', 16, 'موهيتو منعش بنكهة الباشون فروت.', 'Passion Fruit Mojito.png'),
('Apple Mojito | موهيتو تفاح', 16, 'موهيتو منعش بنكهة التفاح.', 'Apple Mojito.png'),
('Raspberry Mojito | موهيتو راس بيري', 16, 'موهيتو منعش بنكهة الراس بيري.', 'Raspberry Mojito.png'),
('Pink Lemon | بينك ليمون', 16, 'مشروب بينك ليمون منعش.', 'Pink Lemon.png'),
('Blue Passion | بلو باشون', 16, 'مشروب بلو باشون منعش.', 'Blue Passion.png'),
('Pineapple Lemon Mint | بينابول ليمون مينت', 16, 'مشروب بينابول ليمون مينت منعش.', 'Pineapple Lemon Mint.png');

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
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Ice Matcha Mango | آيس ماتشا مانجو', 5, 'ماتشا مثلج بنكهة المانجو المنعشة.', 'Ice Matcha Mango.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(144, 1, 104), (144, 2, 109), (144, 3, 114);

/* =========================
   BOBA SOFT
   ========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Boba Soft Passion | بوبا سوفت باشون', 6, 'بوبا سوفت بنكهة الباشون فروت المنعشة.', 'Boba Soft Passion.png'),
('Boba Soft Strawberry | بوبا سوفت فراولة', 6, 'بوبا سوفت بنكهة الفراولة الحلوة.', 'Boba Soft Strawberry.png'),
('Boba Soft Blueberry | بوبا سوفت بلوبيري', 6, 'بوبا سوفت بنكهة التوت الأزرق.', 'Boba Soft Blueberry.png'),
('Boba Soft Mango | بوبا سوفت مانجا', 6, 'بوبا سوفت بنكهة المانجو الاستوائية.', 'Boba Soft Mango.png'),
('Boba Soft Green Apple | بوبا سوفت تفاح أخضر', 6, 'بوبا سوفت بنكهة التفاح الأخضر المنعشة.', 'Boba Soft Green Apple.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(145, 1, 86), (145, 2, 90), (145, 3, 95),
(146, 1, 80), (146, 2, 90), (146, 3, 95),
(147, 1, 85), (147, 2, 90), (147, 3, 95),
(148, 1, 85), (148, 2, 90), (148, 3, 95),
(149, 1, 85), (149, 2, 90), (149, 3, 95);

/* =========================
   BOBA MILKSHAKE
   ========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Milk Strawberry Boba Strawberry | ميلك فراولة بوبا فراولة', 17, 'ميلك شيك فراولة مع بوبا فراولة.', 'Milk Strawberry Boba Strawberry.png'),
('Milk Mango Boba Mango | ميلك مانجا بوبا مانجا', 17, 'ميلك شيك مانجو مع بوبا مانجو.', 'Milk Mango Boba Mango.png'),
('Milk Peach Boba Peach | ميلك خوخ بوبا خوخ', 17, 'ميلك شيك خوخ مع بوبا خوخ.', 'Milk Peach Boba Peach.png'),
('Milk Passion Boba Passion | ميلك باشون بوبا باشون', 17, 'ميلك شيك باشون فروت مع بوبا باشون.', 'Milk Passion Boba Passion.png'),
('Milk Blueberry Boba Blueberry | ميلك بلوبيري بوبا بلوبيري', 17, 'ميلك شيك بلوبيري مع بوبا بلوبيري.', 'Milk Blueberry Boba Blueberry.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(150, 1, 95), (150, 2, 100), (150, 3, 105),
(151, 1, 95), (151, 2, 100), (151, 3, 105),
(152, 1, 95), (152, 2, 100), (152, 3, 105),
(153, 1, 95), (153, 2, 100), (153, 3, 105),
(154, 1, 95), (154, 2, 100), (154, 3, 105);

/* =========================
   BOBA SMOOTHIE
   ========================= */
INSERT INTO products (product_name, category_id, description_ar, image_url) VALUES
('Blueberry Smoothie Boba Blueberry | سموزي توت بوبا توت', 18, 'سموزي التوت الأزرق مع بوبا توت.', 'Blueberry Smoothie Boba Blueberry.png'),
('Strawberry Smoothie Boba Strawberry | سموزي فراولة بوبا فراولة', 18, 'سموزي الفراولة الطازجة مع بوبا فراولة.', 'Strawberry Smoothie Boba Strawberry.png'),
('Apple Smoothie Boba Apple | سموزي تفاح بوبا تفاح', 18, 'سموزي التفاح المنعش مع بوبا تفاح.', 'Apple Smoothie Boba Apple.png'),
('Passion Smoothie Boba Passion | سموزي باشون بوبا باشون', 18, 'سموزي الباشون فروت مع بوبا باشون.', 'Passion Smoothie Boba Passion.png'),
('Peach Smoothie Boba Peach | سموزي خوخ بوبا خوخ', 18, 'سموزي الخوخ الناعم مع بوبا خوخ.', 'Peach Smoothie Boba Peach.png'),
('Mango Smoothie Boba Mango | سموزي مانجا بوبا مانجا', 18, 'سموزي المانجو الاستوائي مع بوبا مانجو.', 'Mango Smoothie Boba Mango.png');

INSERT INTO product_prices (product_id, size_id, price) VALUES
(155, 1, 90), (155, 2, 95), (155, 3, 100),
(156, 1, 90), (156, 2, 95), (156, 3, 100),
(157, 1, 90), (157, 2, 95), (157, 3, 100),
(158, 1, 90), (158, 2, 95), (158, 3, 100),
(159, 1, 90), (159, 2, 95), (159, 3, 100),
(160, 1, 90), (160, 2, 95), (160, 3, 100);

