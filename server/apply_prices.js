/**
 * apply_prices.js
 * ---------------
 * Applies the correct prices for ALL products directly into database.sqlite.
 * Run: node server/apply_prices.js  (from project root)
 *  OR: node apply_prices.js         (from /server folder)
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
console.log('Opening database at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) { console.error('Cannot open DB:', err.message); process.exit(1); }
    console.log('Connected.\n');
});

const run = (sql, params = []) =>
    new Promise((res, rej) =>
        db.run(sql, params, function (err) { err ? rej(err) : res(this); })
    );

const all = (sql, params = []) =>
    new Promise((res, rej) =>
        db.all(sql, params, (err, rows) => { err ? rej(err) : res(rows); })
    );

// ─── SIZE MAP ───────────────────────────────────────────────────────────────
// Sizes: 1=S, 2=M, 3=L, 4=Single, 5=Double
// ─────────────────────────────────────────────────────────────────────────────

// price entries: [ product_id, size_id, price ]
const PRICES = [
    // ── HOT COFFEE ──────────────────────────────────────────────────────────
    // Espresso (1): Single:65 | Double:75
    [1, 4, 65], [1, 5, 75],
    // Macchiato (2): Double:89
    [2, 5, 89],
    // Hot Mocha (3): M:109 | L:119
    [3, 2, 109], [3, 3, 119],
    // Hot White Mocha (4): M:109 | L:119
    [4, 2, 109], [4, 3, 119],
    // Cappuccino (7): M:79 | L:89
    [7, 2, 79], [7, 3, 89],
    // Hot Latte (8): M:79 | L:89
    [8, 2, 79], [8, 3, 89],
    // Turkish Coffee (9): Double:75
    [9, 5, 75],
    // Nutella Coffee (11): M:109 | L:119
    [11, 2, 109], [11, 3, 119],
    // Spanish Latte (12): M:119 | L:129
    [12, 2, 119], [12, 3, 129],
    // Flat White (13): M:79 | L:89
    [13, 2, 79], [13, 3, 89],
    // Cortado (14): M:79 | L:89
    [14, 2, 79], [14, 3, 89],
    // Hot Americano (161): M:75 | L:85
    [161, 2, 75], [161, 3, 85],
    // Latte Lotus (167): M:129 | L:139
    [167, 2, 129], [167, 3, 139],

    // ── ICE COFFEE ──────────────────────────────────────────────────────────
    // Ice Latte (67): M:119 | L:129
    [67, 2, 119], [67, 3, 129],
    // Ice Mocha (68): M:129 | L:149
    [68, 2, 129], [68, 3, 149],
    // Ice White Mocha (69): M:139 | L:149
    [69, 2, 139], [69, 3, 149],
    // Ice Chiken/Shaken White Mocha (70): M:139 | L:149
    [70, 2, 139], [70, 3, 149],
    // Ice Americano (71): M:110 | L:120
    [71, 2, 110], [71, 3, 120],
    // Ice Caramel Macchiato (73): M:129 | L:139
    [73, 2, 129], [73, 3, 139],
    // Ice Spanish Latte (74): M:129 | L:139
    [74, 2, 129], [74, 3, 139],
    // Ice Coffee (168): M:119 | L:129
    [168, 2, 119], [168, 3, 129],

    // ── BOBA SMOOTHIE (cat 18) ───────────────────────────────────────────────
    // M:129 | L:139 → ids 155-160
    [155, 2, 129], [155, 3, 139],
    [156, 2, 129], [156, 3, 139],
    [157, 2, 129], [157, 3, 139],
    [158, 2, 129], [158, 3, 139],
    [159, 2, 129], [159, 3, 139],
    [160, 2, 129], [160, 3, 139],

    // ── BOBA MILKSHAKE (cat 17) ──────────────────────────────────────────────
    // M:139 | L:149 → ids 150-154
    [150, 2, 139], [150, 3, 149],
    [151, 2, 139], [151, 3, 149],
    [152, 2, 139], [152, 3, 149],
    [153, 2, 139], [153, 3, 149],
    [154, 2, 139], [154, 3, 149],

    // ── BOBA SOFT (cat 6) ────────────────────────────────────────────────────
    // M:129 | L:139 → ids 145-149
    [145, 2, 129], [145, 3, 139],
    [146, 2, 129], [146, 3, 139],
    [147, 2, 129], [147, 3, 139],
    [148, 2, 129], [148, 3, 139],
    [149, 2, 129], [149, 3, 139],

    // Boba Tapioca Sized (169): M:149 | L:159
    [169, 2, 149], [169, 3, 159],
    // Boba Tapioca Fixed (170): 139
    [170, 2, 139],

    // ── SMOOTHIES (cat 11) ───────────────────────────────────────────────────
    [75, 2, 119], [75, 3, 129],   // Peach
    [76, 2, 114], [76, 3, 124],   // Strawberry
    [77, 2, 114], [77, 3, 124],   // Mango
    [78, 2, 114], [78, 3, 124],   // Watermelon
    [79, 2, 124], [79, 3, 134],   // Kiwi
    [80, 2, 114], [80, 3, 124],   // Apple
    [81, 2, 119], [81, 3, 129],   // Pineapple
    [82, 2, 124], [82, 3, 134],   // Passion Fruit
    [83, 2, 114], [83, 3, 124],   // Lemon
    [84, 2, 114], [84, 3, 124],   // Lemon Mint
    [85, 2, 124], [85, 3, 134],   // Mix Berries
    [171, 2, 114], [171, 3, 124], // Blueberry Smoothie

    // ── MOJITO & SODA (cat 16) ───────────────────────────────────────────────
    [131, 2, 109], [131, 3, 120], // Strawberry Mojito
    [132, 2, 109], [132, 3, 120], // Blueberry Mojito
    [133, 2, 109], [133, 3, 120], // Pineapple Mojito
    [134, 2, 109], [134, 3, 120], // Mango Mojito
    [135, 2, 109], [135, 3, 120], // Peach Mojito
    [136, 2, 119], [136, 3, 140], // Mix Berry Mojito
    [137, 2, 109], [137, 3, 120], // Kiwi Mojito
    [138, 2, 114], [138, 3, 135], // Passion Fruit Mojito
    [139, 2, 109], [139, 3, 120], // Apple Mojito
    [140, 2, 109], [140, 3, 120], // Raspberry Mojito
    [141, 2, 119], [141, 3, 140], // Pink Lemon Mojito
    [142, 2, 119], [142, 3, 140], // Blue Passion Mojito
    [143, 2, 124], [143, 3, 145], // Pineapple Lemon Mint
    [172, 2, 119], [172, 3, 129], // Dark Soda
    [173, 2, 119], [173, 3, 129], // Blue Pina Colada
    [174, 2, 119], [174, 3, 129], // Strawberry Cloud
    [175, 2, 124], [175, 3, 145], // Blue Mars

    // ── MATCHA CLOUD (cat 5) ─────────────────────────────────────────────────
    [176, 2, 139], [176, 3, 149], // Matcha Cloud Mango
    [177, 2, 139], [177, 3, 149], // Matcha Cloud Strawberry
    [178, 2, 139], [178, 3, 149], // Matcha Cloud Coconut
    [179, 2, 139], [179, 3, 149], // Matcha Cloud White Chocolate

    // ── MATCHA (cat 5) ───────────────────────────────────────────────────────
    [37, 2, 119],                  // Ice Matcha (fixed)
    [38, 2, 139],                  // Ice Matcha Strawberry
    [39, 2, 139],                  // Ice Matcha Coconut
    [40, 2, 139],                  // Ice Matcha Caramel
    [41, 2, 109],                  // Hot Matcha
    [42, 2, 119],                  // Hot Honey Matcha
    [144, 2, 139],                 // Ice Matcha Mango
    [180, 2, 139], [180, 3, 149], // Blue Matcha

    // ── FRAPPE (cat 4) ───────────────────────────────────────────────────────
    [34, 2, 129],                  // Caramel Frappe
    [35, 2, 139],                  // Lotus Frappe
    [36, 2, 139],                  // White Mocha Frappe
    [126, 2, 139],                 // Frappe Mixed Berry
    [181, 2, 139],                 // Salted Caramel Frappe

    // ── SHAKES (cat 3) ───────────────────────────────────────────────────────
    [20, 2, 129], [20, 3, 139],   // Oreo
    [21, 2, 139], [21, 3, 149],   // Nutella
    [22, 2, 149], [22, 3, 159],   // Pistachio
    [23, 2, 139], [23, 3, 149],   // Lotus
    [24, 2, 129], [24, 3, 139],   // Caramel
    [26, 2, 129], [26, 3, 139],   // Blueberry
    [27, 2, 149], [27, 3, 159],   // Kinder
    [28, 2, 149], [28, 3, 159],   // KitKat
    [29, 2, 149], [29, 3, 159],   // Twix
    [30, 2, 149], [30, 3, 159],   // Snickers
    [31, 2, 149], [31, 3, 159],   // Galaxy
    [32, 2, 149], [32, 3, 159],   // M&M
    [127, 2, 120], [127, 3, 130], // Vanilla Shake
    [128, 2, 120], [128, 3, 130], // Strawberry Shake
    [130, 2, 120], [130, 3, 130], // Chocolate Shake
    [182, 2, 129], [182, 3, 139], // Beach Shake
    [183, 2, 149], [183, 3, 159], // Neurs Shake
    [184, 2, 149], [184, 3, 159], // Salted Caramel Shake

    // ── FRESH JUICES (cat 9) ─────────────────────────────────────────────────
    [57, 2, 95], [57, 3, 110],    // Cantaloupe
    [58, 2, 95], [58, 3, 110],    // Strawberry
    [59, 2, 95], [59, 3, 110],    // Mango
    [60, 2, 120], [60, 3, 130],   // Kiwi
    [61, 2, 110], [61, 3, 120],   // Banana
    [62, 2, 95], [62, 3, 110],    // Watermelon
    [63, 2, 109], [63, 3, 119],   // Peach
    [64, 2, 124], [64, 3, 134],   // Blueberry
    [65, 2, 104], [65, 3, 114],   // Lemon
    [66, 2, 110], [66, 3, 120],   // Lemon Mint
    [185, 2, 110], [185, 3, 120], // Orange

    // ── WARM DRINKS (cat 2) ──────────────────────────────────────────────────
    [17, 2, 140], [17, 3, 170],   // Hot Chocolate
    [18, 2, 99], [18, 3, 114],    // Hot Cider

    // ── COLD DRINKS (cat 12) ─────────────────────────────────────────────────
    [89, 2, 15],                   // Water
    [91, 2, 99],                   // Red Bull
    [92, 2, 120],                  // Red Bull Flavor

    // ── SPECIALTY (cat 7) ────────────────────────────────────────────────────
    [43, 2, 190], [43, 3, 220],   // V60 Ice
    [44, 2, 190], [44, 3, 220],   // V60 Hot
];

async function applyPrices() {
    try {
        await run('BEGIN EXCLUSIVE TRANSACTION');

        let updated = 0;
        let inserted = 0;

        for (const [pid, sid, price] of PRICES) {
            // Check if entry exists
            const existing = await all(
                'SELECT price_id FROM product_prices WHERE product_id = ? AND size_id = ?',
                [pid, sid]
            );

            if (existing.length > 0) {
                await run(
                    'UPDATE product_prices SET price = ? WHERE product_id = ? AND size_id = ?',
                    [price, pid, sid]
                );
                updated++;
            } else {
                await run(
                    'INSERT INTO product_prices (product_id, size_id, price) VALUES (?, ?, ?)',
                    [pid, sid, price]
                );
                inserted++;
            }
        }

        await run('COMMIT');
        console.log(`✅ Done! Updated: ${updated} prices | Inserted: ${inserted} new prices`);

        // Quick verification
        console.log('\n--- Verification Sample ---');
        const sample = await all(`
            SELECT p.product_name, s.size_name, pp.price
            FROM product_prices pp
            JOIN products p ON pp.product_id = p.product_id
            JOIN sizes s ON pp.size_id = s.size_id
            WHERE pp.product_id IN (1,3,7,67,68,161,167,168)
            ORDER BY pp.product_id, s.size_id
        `);
        sample.forEach(r => console.log(`  ${r.product_name} | ${r.size_name}: ${r.price}`));

    } catch (err) {
        await run('ROLLBACK').catch(() => {});
        console.error('❌ Error:', err.message);
        process.exit(1);
    } finally {
        db.close();
    }
}

applyPrices();
