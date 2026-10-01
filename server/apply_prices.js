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
// NOTE: All prices reduced by 10 EGP (except Desert & Sandwich)
const PRICES = [
    // ── HOT COFFEE ──────────────────────────────────────────────────────────
    // Espresso (1): Single:55 | Double:65
    [1, 4, 55], [1, 5, 65],
    // Macchiato (2): Double:79
    [2, 5, 79],
    // Hot Mocha (3): M:99 | L:109
    [3, 2, 99], [3, 3, 109],
    // Hot White Mocha (4): M:99 | L:109
    [4, 2, 99], [4, 3, 109],
    // Cappuccino (7): M:69 | L:79
    [7, 2, 69], [7, 3, 79],
    // Hot Latte (8): M:69 | L:79
    [8, 2, 69], [8, 3, 79],
    // Turkish Coffee (9): Double:65
    [9, 5, 65],
    // Nutella Coffee (11): M:99 | L:109
    [11, 2, 99], [11, 3, 109],
    // Spanish Latte (12): M:109 | L:119
    [12, 2, 109], [12, 3, 119],
    // Flat White (13): M:69 | L:79
    [13, 2, 69], [13, 3, 79],
    // Cortado (14): M:69 | L:79
    [14, 2, 69], [14, 3, 79],
    // Hot Americano (161): M:65 | L:75
    [161, 2, 65], [161, 3, 75],
    // Latte Lotus (167): M:119 | L:129
    [167, 2, 119], [167, 3, 129],

    // ── ICE COFFEE ──────────────────────────────────────────────────────────
    // Ice Latte (67): M:109 | L:119
    [67, 2, 109], [67, 3, 119],
    // Ice Mocha (68): M:119 | L:139
    [68, 2, 119], [68, 3, 139],
    // Ice White Mocha (69): M:129 | L:139
    [69, 2, 129], [69, 3, 139],
    // Ice Chiken/Shaken White Mocha (70): M:129 | L:139
    [70, 2, 129], [70, 3, 139],
    // Ice Americano (71): M:100 | L:110
    [71, 2, 100], [71, 3, 110],
    // Ice Caramel Macchiato (73): M:119 | L:129
    [73, 2, 119], [73, 3, 129],
    // Ice Spanish Latte (74): M:119 | L:129
    [74, 2, 119], [74, 3, 129],
    // Ice Coffee (168): M:109 | L:119
    [168, 2, 109], [168, 3, 119],

    // ── BOBA SMOOTHIE (cat 18) ───────────────────────────────────────────────
    // M:119 | L:129 → ids 155-160
    [155, 2, 119], [155, 3, 129],
    [156, 2, 119], [156, 3, 129],
    [157, 2, 119], [157, 3, 129],
    [158, 2, 119], [158, 3, 129],
    [159, 2, 119], [159, 3, 129],
    [160, 2, 119], [160, 3, 129],

    // ── BOBA MILKSHAKE (cat 17) ──────────────────────────────────────────────
    // M:129 | L:139 → ids 150-154
    [150, 2, 129], [150, 3, 139],
    [151, 2, 129], [151, 3, 139],
    [152, 2, 129], [152, 3, 139],
    [153, 2, 129], [153, 3, 139],
    [154, 2, 129], [154, 3, 139],

    // ── BOBA SOFT (cat 6) ────────────────────────────────────────────────────
    // M:119 | L:129 → ids 145-149
    [145, 2, 119], [145, 3, 129],
    [146, 2, 119], [146, 3, 129],
    [147, 2, 119], [147, 3, 129],
    [148, 2, 119], [148, 3, 129],
    [149, 2, 119], [149, 3, 129],

    // Boba Tapioca Sized (169): M:139 | L:149
    [169, 2, 139], [169, 3, 149],
    // Boba Tapioca Fixed (170): 129
    [170, 2, 129],

    // ── SMOOTHIES (cat 11) ───────────────────────────────────────────────────
    [75, 2, 109], [75, 3, 119],   // Peach
    [76, 2, 104], [76, 3, 114],   // Strawberry
    [77, 2, 104], [77, 3, 114],   // Mango
    [78, 2, 104], [78, 3, 114],   // Watermelon
    [79, 2, 114], [79, 3, 124],   // Kiwi
    [80, 2, 104], [80, 3, 114],   // Apple
    [81, 2, 109], [81, 3, 119],   // Pineapple
    [82, 2, 114], [82, 3, 124],   // Passion Fruit
    [83, 2, 104], [83, 3, 114],   // Lemon
    [84, 2, 104], [84, 3, 114],   // Lemon Mint
    [85, 2, 114], [85, 3, 124],   // Mix Berries
    [171, 2, 104], [171, 3, 114], // Blueberry Smoothie

    // ── MOJITO & SODA (cat 16) ───────────────────────────────────────────────
    [131, 2, 99], [131, 3, 110],  // Strawberry Mojito
    [132, 2, 99], [132, 3, 110],  // Blueberry Mojito
    [133, 2, 99], [133, 3, 110],  // Pineapple Mojito
    [134, 2, 99], [134, 3, 110],  // Mango Mojito
    [135, 2, 99], [135, 3, 110],  // Peach Mojito
    [136, 2, 109], [136, 3, 130], // Mix Berry Mojito
    [137, 2, 99], [137, 3, 110],  // Kiwi Mojito
    [138, 2, 104], [138, 3, 125], // Passion Fruit Mojito
    [139, 2, 99], [139, 3, 110],  // Apple Mojito
    [140, 2, 99], [140, 3, 110],  // Raspberry Mojito
    [141, 2, 109], [141, 3, 130], // Pink Lemon Mojito
    [142, 2, 109], [142, 3, 130], // Blue Passion Mojito
    [143, 2, 114], [143, 3, 135], // Pineapple Lemon Mint
    [172, 2, 109], [172, 3, 119], // Dark Soda
    [173, 2, 109], [173, 3, 119], // Blue Pina Colada
    [174, 2, 109], [174, 3, 119], // Strawberry Cloud
    [175, 2, 114], [175, 3, 135], // Blue Mars

    // ── MATCHA CLOUD (cat 5) ─────────────────────────────────────────────────
    [176, 2, 129], [176, 3, 139], // Matcha Cloud Mango
    [177, 2, 129], [177, 3, 139], // Matcha Cloud Strawberry
    [178, 2, 129], [178, 3, 139], // Matcha Cloud Coconut
    [179, 2, 129], [179, 3, 139], // Matcha Cloud White Chocolate

    // ── MATCHA (cat 5) ───────────────────────────────────────────────────────
    [37, 2, 109],                  // Ice Matcha (fixed)
    [38, 2, 129],                  // Ice Matcha Strawberry
    [39, 2, 129],                  // Ice Matcha Coconut
    [40, 2, 129],                  // Ice Matcha Caramel
    [41, 2, 99],                   // Hot Matcha
    [42, 2, 109],                  // Hot Honey Matcha
    [144, 2, 129],                 // Ice Matcha Mango
    [180, 2, 129], [180, 3, 139], // Blue Matcha

    // ── FRAPPE (cat 4) ───────────────────────────────────────────────────────
    [34, 2, 119],                  // Caramel Frappe
    [35, 2, 129],                  // Lotus Frappe
    [36, 2, 129],                  // White Mocha Frappe
    [126, 2, 129],                 // Frappe Mixed Berry
    [181, 2, 129],                 // Salted Caramel Frappe

    // ── SHAKES (cat 3) ───────────────────────────────────────────────────────
    [20, 2, 119], [20, 3, 129],   // Oreo
    [21, 2, 129], [21, 3, 139],   // Nutella
    [22, 2, 139], [22, 3, 149],   // Pistachio
    [23, 2, 129], [23, 3, 139],   // Lotus
    [24, 2, 119], [24, 3, 129],   // Caramel
    [26, 2, 119], [26, 3, 129],   // Blueberry
    [27, 2, 139], [27, 3, 149],   // Kinder
    [28, 2, 139], [28, 3, 149],   // KitKat
    [29, 2, 139], [29, 3, 149],   // Twix
    [30, 2, 139], [30, 3, 149],   // Snickers
    [31, 2, 139], [31, 3, 149],   // Galaxy
    [32, 2, 139], [32, 3, 149],   // M&M
    [127, 2, 110], [127, 3, 120], // Vanilla Shake
    [128, 2, 110], [128, 3, 120], // Strawberry Shake
    [130, 2, 110], [130, 3, 120], // Chocolate Shake
    [182, 2, 119], [182, 3, 129], // Beach Shake
    [183, 2, 139], [183, 3, 149], // Neurs Shake
    [184, 2, 139], [184, 3, 149], // Salted Caramel Shake

    // ── FRESH JUICES (cat 9) ─────────────────────────────────────────────────
    [57, 2, 85], [57, 3, 100],    // Cantaloupe
    [58, 2, 85], [58, 3, 100],    // Strawberry
    [59, 2, 85], [59, 3, 100],    // Mango
    [60, 2, 110], [60, 3, 120],   // Kiwi
    [61, 2, 100], [61, 3, 110],   // Banana
    [62, 2, 85], [62, 3, 100],    // Watermelon
    [63, 2, 99], [63, 3, 109],    // Peach
    [64, 2, 114], [64, 3, 124],   // Blueberry
    [65, 2, 94], [65, 3, 104],    // Lemon
    [66, 2, 100], [66, 3, 110],   // Lemon Mint
    [185, 2, 100], [185, 3, 110], // Orange

    // ── WARM DRINKS (cat 2) ──────────────────────────────────────────────────
    [17, 2, 130], [17, 3, 160],   // Hot Chocolate
    [18, 2, 89], [18, 3, 104],    // Hot Cider

    // ── COLD DRINKS (cat 12) ─────────────────────────────────────────────────
    [89, 2, 15],                   // Water
    [91, 2, 89],                   // Red Bull
    [92, 2, 110],                  // Red Bull Flavor

    // ── SPECIALTY (cat 7) ────────────────────────────────────────────────────
    [43, 2, 180], [43, 3, 210],   // V60 Ice
    [44, 2, 180], [44, 3, 210],   // V60 Hot
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
