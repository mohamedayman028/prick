/**
 * cleanup_old_sizes.js
 * --------------------
 * Removes stale size entries that shouldn't exist per the new menu.
 * Run: node server/cleanup_old_sizes.js
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'));

const run = (sql, params = []) =>
    new Promise((res, rej) =>
        db.run(sql, params, function (err) { err ? rej(err) : res(this); })
    );

const all = (sql, p = []) =>
    new Promise((res, rej) =>
        db.all(sql, p, (err, rows) => err ? rej(err) : res(rows))
    );

// Products that should ONLY have these exact size_ids
// Any other size_id for these products should be removed.
// Format: product_id => [allowed size_ids]
const ALLOWED = {
    // Single/Double only
    1: [4, 5],   // Espresso
    2: [5],      // Macchiato
    9: [5],      // Turkish Coffee

    // M/L only (size 2,3)
    3: [2, 3], 4: [2, 3], 7: [2, 3], 8: [2, 3],
    11: [2, 3], 12: [2, 3], 13: [2, 3], 14: [2, 3],
    161: [2, 3], 167: [2, 3],
    // Ice Coffee
    67: [2, 3], 68: [2, 3], 69: [2, 3], 70: [2, 3],
    71: [2, 3], 73: [2, 3], 74: [2, 3], 168: [2, 3],
    // Smoothies
    75: [2, 3], 76: [2, 3], 77: [2, 3], 78: [2, 3],
    79: [2, 3], 80: [2, 3], 81: [2, 3], 82: [2, 3],
    83: [2, 3], 84: [2, 3], 85: [2, 3], 171: [2, 3],
    // Mojito
    131: [2, 3], 132: [2, 3], 133: [2, 3], 134: [2, 3],
    135: [2, 3], 136: [2, 3], 137: [2, 3], 138: [2, 3],
    139: [2, 3], 140: [2, 3], 141: [2, 3], 142: [2, 3],
    143: [2, 3], 172: [2, 3], 173: [2, 3], 174: [2, 3], 175: [2, 3],
    // Matcha Cloud
    176: [2, 3], 177: [2, 3], 178: [2, 3], 179: [2, 3],
    // Blue Matcha
    180: [2, 3],
    // Matcha (fixed = M only)
    37: [2], 38: [2], 39: [2], 40: [2], 41: [2], 42: [2], 144: [2],
    // Frappe (fixed = M only)
    34: [2], 35: [2], 36: [2], 126: [2], 181: [2],
    // Shakes
    20: [2, 3], 21: [2, 3], 22: [2, 3], 23: [2, 3], 24: [2, 3],
    26: [2, 3], 27: [2, 3], 28: [2, 3], 29: [2, 3], 30: [2, 3],
    31: [2, 3], 32: [2, 3], 127: [2, 3], 128: [2, 3], 130: [2, 3],
    182: [2, 3], 183: [2, 3], 184: [2, 3],
    // Juices
    57: [2, 3], 58: [2, 3], 59: [2, 3], 60: [2, 3], 61: [2, 3],
    62: [2, 3], 63: [2, 3], 64: [2, 3], 65: [2, 3], 66: [2, 3], 185: [2, 3],
    // Warm
    17: [2, 3], 18: [2, 3],
    // Cold (fixed)
    89: [2], 91: [2], 92: [2],
    // Specialty
    43: [2, 3], 44: [2, 3],
    // Boba Soft
    145: [2, 3], 146: [2, 3], 147: [2, 3], 148: [2, 3], 149: [2, 3],
    // Boba Milkshake
    150: [2, 3], 151: [2, 3], 152: [2, 3], 153: [2, 3], 154: [2, 3],
    // Boba Smoothie
    155: [2, 3], 156: [2, 3], 157: [2, 3], 158: [2, 3], 159: [2, 3], 160: [2, 3],
    // Boba Tapioca
    169: [2, 3], 170: [2],
};

async function cleanup() {
    await run('BEGIN EXCLUSIVE TRANSACTION');
    let deleted = 0;

    for (const [pid, allowed] of Object.entries(ALLOWED)) {
        const placeholders = allowed.map(() => '?').join(',');
        const res = await run(
            `DELETE FROM product_prices WHERE product_id = ? AND size_id NOT IN (${placeholders})`,
            [pid, ...allowed]
        );
        if (res.changes > 0) {
            console.log(`  Removed ${res.changes} stale size(s) from product_id=${pid}`);
            deleted += res.changes;
        }
    }

    await run('COMMIT');
    console.log(`\n✅ Cleanup done. Total stale entries removed: ${deleted}`);

    // Final verification
    console.log('\n--- Final Verification ---');
    const rows = await all(`
        SELECT p.product_name, s.size_name, pp.price
        FROM product_prices pp
        JOIN products p ON pp.product_id = p.product_id
        JOIN sizes s ON pp.size_id = s.size_id
        WHERE pp.product_id IN (1,2,3,7,9,12,67,68,71,161,167,168)
        ORDER BY pp.product_id, s.size_id
    `);
    rows.forEach(r => console.log(`  ${r.product_name} | ${r.size_name}: ${r.price}`));

    db.close();
}

cleanup().catch(e => {
    console.error('Error:', e.message);
    db.close();
});
