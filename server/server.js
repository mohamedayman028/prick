const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors({
    origin: '*',
    imgSrc: ["'self'", "data:", "blob:"],
}));
app.use(express.json());

// Serve static images
// Assuming images are stored in a folder named 'images' in the root or server directory
// The user said: "Images will be provided in the project /images/products/ folder"
// matching the structure: project/images/products
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// API Routes

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories ORDER BY sort_order');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get menu data (hierarchical: Category -> Products -> Prices/Sizes)
app.get('/api/menu', async (req, res) => {
    try {
        // Fetch categories
        const [categories] = await db.query('SELECT * FROM categories ORDER BY sort_order');

        // Fetch products with their sizes and prices
        // Since there is no image_url column in the schema provided, 
        // we will assume the image follows a naming convention or is missing.
        // However, the prompt says "Use the image_url paths in the database".
        // If the column doesn't exist, this query will fail if we try to select it.
        // We will select what exists. 

        const query = `
            SELECT 
                p.product_id, 
                p.product_name, 
                p.category_id,
                p.description_ar,
                p.image_url,
                sz.size_name, 
                pp.price
            FROM products p
            JOIN product_prices pp ON p.product_id = pp.product_id
            JOIN sizes sz ON pp.size_id = sz.size_id
        `;

        const [productsData] = await db.query(query);

        // Group by category
        const menu = categories.map(cat => {
            const catProducts = productsData.filter(p => p.category_id === cat.category_id);

            // Group sizes/prices per product
            const productsMap = new Map();

            catProducts.forEach(row => {
                if (!productsMap.has(row.product_id)) {
                    productsMap.set(row.product_id, {
                        id: row.product_id,
                        name: row.product_name,
                        description_ar: row.description_ar, // Mapped from DB
                        imageUrl: row.image_url, // Mapped from DB
                        items: []
                    });
                }
                productsMap.get(row.product_id).items.push({
                    size: row.size_name,
                    price: row.price
                });
            });

            return {
                ...cat,
                products: Array.from(productsMap.values())
            };
        });

        res.json(menu);

    } catch (err) {
        console.error("Exact error fetching menu data:", err);
        console.error(err.stack);
        res.status(500).json({ 
            error: err.message, 
            stack: err.stack,
            dbPath: require('path').join(process.cwd(), 'server', 'database.sqlite')
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
