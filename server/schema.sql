DROP TABLE IF EXISTS product_prices;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS sizes;

CREATE TABLE IF NOT EXISTS sizes (
    size_id INTEGER PRIMARY KEY AUTOINCREMENT,
    size_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50),
    color_code VARCHAR(7),
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(255) NOT NULL,
    description_ar TEXT,
    image_url VARCHAR(500),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_prices (
    price_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INT,
    size_id INT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(size_id) ON DELETE CASCADE
);