/**
 * update_prices.js
 * Updates all product prices in the live database according to the new menu structure.
 * Also inserts missing products (Latte Lotus, Matcha Cloud items, additional Boba items, etc.)
 *
 * Size IDs:
 *   1 = S   (used as "M" for older hot-coffee entries — see notes below)
 *   2 = M
 *   3 = L
 *   4 = Single
 *   5 = Double
 *
 * For Hot Coffee items: the legacy seed used size 1(S) and 2(M) to represent M and L.
 * We correct this: going forward all M/L items use size_id 2 and 3 respectively.
 * For Single/Double items we keep size_id 4 and 5.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) { console.error('Error opening DB:', err.message); process.exit(1); }
    // Graceful handling of file locking errors
    db.configure('busyTimeout', 5000);
    console.log('Opened database:', dbPath);
});

const run = (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
        if (err) reject(err); else resolve(this);
    });
});
const all = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err) reject(err); else resolve(rows);
    });
});

const beginTransaction = () => run('BEGIN EXCLUSIVE TRANSACTION;');
const commitTransaction = () => run('COMMIT;');
const rollbackTransaction = () => run('ROLLBACK;');

/**
 * Upsert a price: delete existing entry for (product_id, size_id) then insert new one.
 */
async function setPrice(productId, sizeId, price) {
    try {
        await beginTransaction();
        await run(`DELETE FROM product_prices WHERE product_id = ? AND size_id = ?`, [productId, sizeId]);
        await run(`INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)`, [productId, sizeId, price]);
        await commitTransaction();
    } catch (err) {
        await rollbackTransaction().catch(e => console.error("Rollback failed:", e.message));
        console.error(`Failed to setPrice for product ${productId}:`, err.message);
        throw err;
    }
}

/**
 * Remove ALL prices for a product then set the new ones.
 */
async function resetPrices(productId, priceMap) {
    try {
        await beginTransaction();
        await run(`DELETE FROM product_prices WHERE product_id = ?`, [productId]);
        for (const [sizeId, price] of Object.entries(priceMap)) {
            await run(`INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)`, [productId, parseInt(sizeId), price]);
        }
        await commitTransaction();
    } catch (err) {
        await rollbackTransaction().catch(e => console.error("Rollback failed:", e.message));
        console.error(`Failed to resetPrices for product ${productId}:`, err.message);
        throw err;
    }
}

/**
 * Insert a new product if it doesn't already exist (by product_id), then set prices.
 */
async function ensureProduct(productId, name, categoryId, descAr, imageUrl, priceMap) {
    try {
        await beginTransaction();
        const existing = await all(`SELECT product_id FROM products WHERE product_id = ?`, [productId]);
        if (existing.length === 0) {
            await run(
                `INSERT INTO products (product_id, product_name, category_id, description_ar, image_url) VALUES (?, ?, ?, ?, ?)`,
                [productId, name, categoryId, descAr, imageUrl]
            );
            console.log(`  + Inserted new product: [${productId}] ${name}`);
        } else {
            console.log(`  ~ Product already exists: [${productId}] ${name}`);
        }
        await commitTransaction();
        
        await resetPrices(productId, priceMap);
    } catch (err) {
        await rollbackTransaction().catch(e => console.error("Rollback failed:", e.message));
        console.error(`Failed to ensureProduct ${productId}:`, err.message);
        throw err;
    }
}

async function main() {
    await run('PRAGMA foreign_keys = OFF');

    console.log('\n=== 1. HOT COFFEE ===');
    // size_id 2=M, 3=L for M/L items; 4=Single, 5=Double for espresso-style items

    // Espresso (1): Single:65 | Double:75
    await resetPrices(1, { 4: 65, 5: 75 });
    console.log('  Updated: Espresso');

    // Macchiato (2): Double:89 only
    await resetPrices(2, { 5: 89 });
    console.log('  Updated: Macchiato');

    // Mocha (3): M:109 | L:119
    await resetPrices(3, { 2: 109, 3: 119 });
    console.log('  Updated: Mocha');

    // White Mocha (4): M:109 | L:119
    await resetPrices(4, { 2: 109, 3: 119 });
    console.log('  Updated: White Mocha');

    // Cappuccino (7): M:79 | L:89
    await resetPrices(7, { 2: 79, 3: 89 });
    console.log('  Updated: Cappuccino');

    // Hot Latte (8): M:79 | L:89
    await resetPrices(8, { 2: 79, 3: 89 });
    console.log('  Updated: Latte');

    // Turkish Coffee (9): Double:75 only
    await resetPrices(9, { 5: 75 });
    console.log('  Updated: Turkish Coffee');

    // Nutella Coffee (11): M:109 | L:119
    await resetPrices(11, { 2: 109, 3: 119 });
    console.log('  Updated: Nutella Coffee');

    // Spanish Latte (12): M:119 | L:129
    await resetPrices(12, { 2: 119, 3: 129 });
    console.log('  Updated: Hot Spanish Latte');

    // Flat White (13): M:79 | L:89
    await resetPrices(13, { 2: 79, 3: 89 });
    console.log('  Updated: Flat White');

    // Cortado (14): M:79 | L:89
    await resetPrices(14, { 2: 79, 3: 89 });
    console.log('  Updated: Cortado');

    // Hot Americano (161): M:75 | L:85
    await resetPrices(161, { 2: 75, 3: 85 });
    console.log('  Updated: Hot Americano');

    // Latte Lotus — NEW product (product_id 167)
    // category_id 1 = Hot Coffee
    await ensureProduct(167, 'Latte Lotus | لاتيه لوتس', 1,
        'لاتيه ساخن مع صوص اللوتس الكريمي.', 'Latte Lotus.png',
        { 2: 129, 3: 139 });
    console.log('  Added/Updated: Latte Lotus');

    // Remove Nescafe (5) and Nescafe Black (6) and Turkish Coffee with Milk (10) — not in new menu
    // (We leave them but won't update prices unless specified — keeping old prices)

    console.log('\n=== 2. ICE COFFEE ===');
    // Ice Mocha (68): M:129 | L:149
    await resetPrices(68, { 2: 129, 3: 149 });
    console.log('  Updated: Ice Mocha');

    // Ice Latte (67): M:119 | L:129
    await resetPrices(67, { 2: 119, 3: 129 });
    console.log('  Updated: Ice Latte');

    // Ice Coffee — NEW product (product_id 168), category_id 10 = Ice Coffee
    await ensureProduct(168, 'Ice Coffee | آيس كوفي', 10,
        'قهوة مثلجة منعشة بالحليب البارد.', 'Ice Coffee.png',
        { 2: 119, 3: 129 });
    console.log('  Added/Updated: Ice Coffee');

    // Ice Caramel Macchiato (73): M:129 | L:139
    await resetPrices(73, { 2: 129, 3: 139 });
    console.log('  Updated: Ice Caramel Macchiato');

    // Ice White Mocha (69): M:139 | L:149
    await resetPrices(69, { 2: 139, 3: 149 });
    console.log('  Updated: Ice White Mocha');

    // Ice Shaken White Mocha (70) = Ice Chiken White Mocha: M:139 | L:149
    await resetPrices(70, { 2: 139, 3: 149 });
    console.log('  Updated: Ice Chiken White Mocha (Ice Shaken White Mocha)');

    // Ice Spanish Latte (74): M:129 | L:139
    await resetPrices(74, { 2: 129, 3: 139 });
    console.log('  Updated: Ice Spanish Latte');

    // Ice Americano (71): M:110 | L:120
    await resetPrices(71, { 2: 110, 3: 120 });
    console.log('  Updated: Ice Americano');

    console.log('\n=== 3. BOBA ===');
    // Boba Smoothie (Boba Smoothie category 18): M:129 | L:139
    // Products 155-160 are Boba Smoothie — update all
    for (const pid of [155, 156, 157, 158, 159, 160]) {
        await resetPrices(pid, { 2: 129, 3: 139 });
    }
    console.log('  Updated: Boba Smoothie (155-160) M:129 | L:139');

    // Boba Milkshake (category 17): M:139 | L:149
    for (const pid of [150, 151, 152, 153, 154]) {
        await resetPrices(pid, { 2: 139, 3: 149 });
    }
    console.log('  Updated: Boba Milkshake (150-154) M:139 | L:149');

    // Boba Soft (category 6): M:129 | L:139
    for (const pid of [145, 146, 147, 148, 149]) {
        await resetPrices(pid, { 2: 129, 3: 139 });
    }
    console.log('  Updated: Boba Soft (145-149) M:129 | L:139');

    // Boba Tapioca Sized (NEW) — product_id 169
    await ensureProduct(169, 'Boba Tapioca | بوبا تابيوكا', 6,
        'بوبا تابيوكا مع نكهات متنوعة.', 'Boba Tapioca.png',
        { 2: 149, 3: 159 });
    console.log('  Added/Updated: Boba Tapioca (Sized) M:149 | L:159');

    // Boba Tapioca Fixed (NEW) — product_id 170, single fixed price use size_id 2 (M)
    await ensureProduct(170, 'Boba Tapioca Fixed | بوبا تابيوكا فيكسد', 6,
        'بوبا تابيوكا بسعر ثابت.', 'Boba Tapioca.png',
        { 2: 139 });
    console.log('  Added/Updated: Boba Tapioca (Fixed) 139');

    console.log('\n=== 4. SMOOTHIES ===');
    // Mango Smoothie (77): M:114 | L:124
    await resetPrices(77, { 2: 114, 3: 124 });
    console.log('  Updated: Mango Smoothie');

    // Strawberry Smoothie (76): M:114 | L:124
    await resetPrices(76, { 2: 114, 3: 124 });
    console.log('  Updated: Strawberry Smoothie');

    // Peach Smoothie (75): M:119 | L:129
    await resetPrices(75, { 2: 119, 3: 129 });
    console.log('  Updated: Peach Smoothie');

    // Pineapple Smoothie (81): M:119 | L:129
    await resetPrices(81, { 2: 119, 3: 129 });
    console.log('  Updated: Pineapple Smoothie');

    // Apple Smoothie (80): M:114 | L:124
    await resetPrices(80, { 2: 114, 3: 124 });
    console.log('  Updated: Apple Smoothie');

    // Kiwi Smoothie (79): M:124 | L:134
    await resetPrices(79, { 2: 124, 3: 134 });
    console.log('  Updated: Kiwi Smoothie');

    // Watermelon Smoothie (78): M:114 | L:124
    await resetPrices(78, { 2: 114, 3: 124 });
    console.log('  Updated: Watermelon Smoothie');

    // Mixed Berry Smoothie (85): M:124 | L:134
    await resetPrices(85, { 2: 124, 3: 134 });
    console.log('  Updated: Mix Berries Smoothie');

    // Lemon Mint Smoothie (84): M:114 | L:124
    await resetPrices(84, { 2: 114, 3: 124 });
    console.log('  Updated: Lemon Mint Smoothie');

    // Lemon Smoothie (83): M:114 | L:124
    await resetPrices(83, { 2: 114, 3: 124 });
    console.log('  Updated: Lemon Smoothie');

    // Passion Fruit Smoothie (82): M:124 | L:134
    await resetPrices(82, { 2: 124, 3: 134 });
    console.log('  Updated: Passion Fruit Smoothie');

    // Blueberry Smoothie — NEW product (product_id 171), category_id 11 = Smoothies
    await ensureProduct(171, 'Blueberry Smoothie | سموزي توت أزرق', 11,
        'سموزي التوت الأزرق المنعش والصحي.', 'Blueberry Smoothie.png',
        { 2: 114, 3: 124 });
    console.log('  Added/Updated: Blueberry Smoothie');

    console.log('\n=== 5. MOJITO ===');
    // Apple Mojito (139): M:109 | L:120
    await resetPrices(139, { 2: 109, 3: 120 });

    // Raspberry Mojito (140): M:109 | L:120
    await resetPrices(140, { 2: 109, 3: 120 });

    // Pink Lemon Mojito (141): M:119 | L:140
    await resetPrices(141, { 2: 119, 3: 140 });

    // Blue Passion Mojito (142): M:119 | L:140
    await resetPrices(142, { 2: 119, 3: 140 });

    // Pineapple Mojito (133): M:109 | L:120
    await resetPrices(133, { 2: 109, 3: 120 });

    // Mix Berry Mojito (136): M:119 | L:140
    await resetPrices(136, { 2: 119, 3: 140 });

    // Kiwi Mojito (137): M:109 | L:120
    await resetPrices(137, { 2: 109, 3: 120 });

    // Passion Fruit Mojito (138): M:114 | L:135
    await resetPrices(138, { 2: 114, 3: 135 });

    // Strawberry Mojito (131): M:109 | L:120
    await resetPrices(131, { 2: 109, 3: 120 });

    // Blueberry Mojito (132): M:109 | L:120
    await resetPrices(132, { 2: 109, 3: 120 });

    // Mango Mojito (134): M:109 | L:120
    await resetPrices(134, { 2: 109, 3: 120 });

    // Peach Mojito (135): M:109 | L:120
    await resetPrices(135, { 2: 109, 3: 120 });

    // Pineapple Lemon Mint (143): M:124 | L:145
    await resetPrices(143, { 2: 124, 3: 145 });

    console.log('  Updated: All Mojito items');

    // Dark Soda — NEW product (172)
    await ensureProduct(172, 'Dark Soda | دارك سودا', 16,
        'سودا داكنة غازية منعشة.', 'Dark Soda.png',
        { 2: 119, 3: 129 });
    console.log('  Added/Updated: Dark Soda');

    // Blue Pina Colada — NEW product (173)
    await ensureProduct(173, 'Blue Pina Colada | بلو بينا كولادا', 16,
        'بينا كولادا زرقاء منعشة.', 'Blue Pina Colada.png',
        { 2: 119, 3: 129 });
    console.log('  Added/Updated: Blue Pina Colada');

    // Strawberry Cloud — NEW product (174)
    await ensureProduct(174, 'Strawberry Cloud | سحابة الفراولة', 16,
        'مشروب فراولة سحابي غازي منعش.', 'Strawberry Cloud.png',
        { 2: 119, 3: 129 });
    console.log('  Added/Updated: Strawberry Cloud');

    // Blue Mars — NEW product (175)
    await ensureProduct(175, 'Blue Mars | بلو مارس', 16,
        'مشروب بلو مارس الغازي الفريد.', 'Blue Mars.png',
        { 2: 124, 3: 145 });
    console.log('  Added/Updated: Blue Mars');

    console.log('\n=== 6. MATCHA CLOUD ===');
    // Matcha Cloud needs a new category (or we add under Matcha cat 5)
    // We'll add under category_id 5 (Matcha) with specific names

    // Matcha Cloud Mango — NEW (176)
    await ensureProduct(176, 'Matcha Cloud Mango | ماتشا كلاود مانجو', 5,
        'ماتشا كلاود بنكهة المانجو.', 'Matcha Cloud Mango.png',
        { 2: 139, 3: 149 });

    // Matcha Cloud Strawberry — NEW (177)
    await ensureProduct(177, 'Matcha Cloud Strawberry | ماتشا كلاود فراولة', 5,
        'ماتشا كلاود بنكهة الفراولة.', 'Matcha Cloud Strawberry.png',
        { 2: 139, 3: 149 });

    // Matcha Cloud Coconut — NEW (178)
    await ensureProduct(178, 'Matcha Cloud Coconut | ماتشا كلاود جوز هند', 5,
        'ماتشا كلاود بنكهة جوز الهند.', 'Matcha Cloud Coconut.png',
        { 2: 139, 3: 149 });

    // Matcha Cloud White Chocolate — NEW (179)
    await ensureProduct(179, 'Matcha Cloud White Chocolate | ماتشا كلاود وايت شوكولاتة', 5,
        'ماتشا كلاود بنكهة الشوكولاتة البيضاء.', 'Matcha Cloud White Chocolate.png',
        { 2: 139, 3: 149 });

    console.log('  Added/Updated: All Matcha Cloud items');

    console.log('\n=== 7. MATCHA ===');
    // Ice Matcha Coconut (39): 139 — fixed price, use M
    await resetPrices(39, { 2: 139 });

    // Ice Matcha Strawberry (38): 139
    await resetPrices(38, { 2: 139 });

    // Ice Matcha (37): 119
    await resetPrices(37, { 2: 119 });

    // Hot Honey Matcha (42): 119
    await resetPrices(42, { 2: 119 });

    // Hot Matcha (41): 109
    await resetPrices(41, { 2: 109 });

    // Ice Matcha Caramel (40): 139
    await resetPrices(40, { 2: 139 });

    // Ice Matcha Mango (144): 139
    await resetPrices(144, { 2: 139 });

    // Blue Matcha — NEW (180): M:139 | L:149
    await ensureProduct(180, 'Blue Matcha | بلو ماتشا', 5,
        'ماتشا أزرق منعش فريد.', 'Blue Matcha.png',
        { 2: 139, 3: 149 });

    console.log('  Updated: All Matcha items');

    console.log('\n=== 8. FRAPPE ===');
    // Caramel Frappe (34): fixed 129
    await resetPrices(34, { 2: 129 });

    // Lotus Frappe (35): fixed 139
    await resetPrices(35, { 2: 139 });

    // White Mocha Frappe (36): fixed 139
    await resetPrices(36, { 2: 139 });

    // Frappe Mix Berry (126): fixed 139
    await resetPrices(126, { 2: 139 });

    // Salted Caramel Frappe — NEW (181)
    await ensureProduct(181, 'Salted Caramel Frappe | فرابيه كراميل مملح', 4,
        'فرابيه كراميل مملح غني ومميز.', 'Salted Caramel Frappe.png',
        { 2: 139 });

    console.log('  Updated: All Frappe items');

    console.log('\n=== 9. SHAKES ===');
    // Nutella Shake (21): M:139 | L:149
    await resetPrices(21, { 2: 139, 3: 149 });

    // Oreo Shake (20): M:129 | L:139
    await resetPrices(20, { 2: 129, 3: 139 });

    // Milkshake (Strawberry/Vanilla/Chocolate): M:120 | L:130
    // Vanilla (127), Strawberry (128), Chocolate (130)
    await resetPrices(127, { 2: 120, 3: 130 });
    await resetPrices(128, { 2: 120, 3: 130 });
    await resetPrices(130, { 2: 120, 3: 130 });

    // Beach Shake — NEW (182): M:129 | L:139
    await ensureProduct(182, 'Beach Shake | بيتش شيك', 3,
        'ميلك شيك منعش بنكهات الشاطئ الاستوائية.', 'Beach Shake.png',
        { 2: 129, 3: 139 });

    // Caramel Shake (24): M:129 | L:139
    await resetPrices(24, { 2: 129, 3: 139 });

    // Lotus Shake (23): M:139 | L:149
    await resetPrices(23, { 2: 139, 3: 149 });

    // Pistachio Shake (22): M:149 | L:159
    await resetPrices(22, { 2: 149, 3: 159 });

    // Twix Shake (29): M:149 | L:159
    await resetPrices(29, { 2: 149, 3: 159 });

    // Kit Kat Shake (28): M:149 | L:159
    await resetPrices(28, { 2: 149, 3: 159 });

    // Kinder Shake (27): M:149 | L:159
    await resetPrices(27, { 2: 149, 3: 159 });

    // Blueberry Shake (26): M:129 | L:139
    await resetPrices(26, { 2: 129, 3: 139 });

    // M&M Shake (32): M:149 | L:159
    await resetPrices(32, { 2: 149, 3: 159 });

    // Galaxy Shake (31): M:149 | L:159
    await resetPrices(31, { 2: 149, 3: 159 });

    // Snickers Shake (30): M:149 | L:159
    await resetPrices(30, { 2: 149, 3: 159 });

    // neurs Shake — NEW (183): M:149 | L:159
    await ensureProduct(183, 'Neurs Shake | نيرز شيك', 3,
        'ميلك شيك نيرز الكريمي.', 'Neurs Shake.png',
        { 2: 149, 3: 159 });

    // Salted Caramel Shake — NEW (184): M:149 | L:159
    await ensureProduct(184, 'Salted Caramel Shake | شيك كراميل مملح', 3,
        'ميلك شيك كراميل مملح فاخر.', 'Salted Caramel Shake.png',
        { 2: 149, 3: 159 });

    // Mango Shake (129): keep existing but add to Milkshake group? User didn't list it separately.
    // User's milkshake entry says "Strawberry/Vanilla/Chocolate" so Mango shake stays separate.
    // No new price specified for Mango Shake — skip.

    // Peach Shake (25): User didn't list it in new menu — skip (keep old price).

    console.log('  Updated: All Shake items');

    console.log('\n=== 10. JUICES ===');
    // Mango Juice (59): M:95 | L:110
    await resetPrices(59, { 2: 95, 3: 110 });

    // Strawberry Juice (58): M:95 | L:110
    await resetPrices(58, { 2: 95, 3: 110 });

    // Cantaloupe Juice (57): M:95 | L:110
    await resetPrices(57, { 2: 95, 3: 110 });

    // Peach Juice (63): M:109 | L:119
    await resetPrices(63, { 2: 109, 3: 119 });

    // Watermelon Juice (62): M:95 | L:110
    await resetPrices(62, { 2: 95, 3: 110 });

    // Banana Juice (61): M:110 | L:120
    await resetPrices(61, { 2: 110, 3: 120 });

    // Kiwi Juice (60): M:120 | L:130
    await resetPrices(60, { 2: 120, 3: 130 });

    // Orange Juice — NEW (185): M:110 | L:120
    await ensureProduct(185, 'Orange Juice | عصير برتقال', 9,
        'عصير برتقال طازج ومنعش.', 'Orange Juice.png',
        { 2: 110, 3: 120 });

    // Mint Lemon Juice (66): M:110 | L:120
    await resetPrices(66, { 2: 110, 3: 120 });

    // Lemon Juice (65): M:104 | L:114
    await resetPrices(65, { 2: 104, 3: 114 });

    // Blueberry Juice (64 = Berry Juice): M:124 | L:134
    await resetPrices(64, { 2: 124, 3: 134 });

    console.log('  Updated: All Juice items');

    console.log('\n=== 11. WARM DRINKS ===');
    // Hot Chocolate (17): M:140 | L:170
    await resetPrices(17, { 2: 140, 3: 170 });
    console.log('  Updated: Hot Chocolate M:140 | L:170');

    // Hot Cider (18): M:99 | L:114
    await resetPrices(18, { 2: 99, 3: 114 });
    console.log('  Updated: Hot Cider M:99 | L:114');

    console.log('\n=== 12. COLD DRINKS ===');
    // Water (89): 15
    await resetPrices(89, { 2: 15 });
    console.log('  Updated: Water 15');

    // Red Bull (91): 99
    await resetPrices(91, { 2: 99 });
    console.log('  Updated: Red Bull 99');

    // Red Bull Flavor (92): 120
    await resetPrices(92, { 2: 120 });
    console.log('  Updated: Red Bull Flavor 120');

    console.log('\n=== 13. SPECIALTY ===');
    // V60 — products 43 (Ice) and 44 (Hot): M:190 | L:220
    await resetPrices(43, { 2: 190, 3: 220 });
    await resetPrices(44, { 2: 190, 3: 220 });
    console.log('  Updated: V60 M:190 | L:220');

    await run('PRAGMA foreign_keys = ON');
    console.log('\n✅ All prices updated successfully!');

    db.close((err) => {
        if (err) console.error('Error closing DB:', err.message);
        else console.log('Database connection closed.');
    });
}

main().catch(err => {
    console.error('Fatal error:', err);
    db.close();
    process.exit(1);
});
