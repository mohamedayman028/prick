import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { API_BASE_URL } from '../config';
import {
    Coffee,
    Sparkles,
    CupSoda,
    Citrus,
    Plus,
    Leaf,
    UtensilsCrossed,
    IceCream,
    GlassWater,
    Milk,
    Croissant,
    Bean,
    Zap,
    CakeSlice
} from 'lucide-react';

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/menu`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                if (data.length > 0) setActiveCategory(data[0].category_id);
                setLoading(false);
            })
            .catch(err => console.error("Failed to fetch menu:", err));
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Menu...</div>;

    // Safety check: Ensure categories is an array
    const safeCategories = Array.isArray(categories) ? categories : [];

    const activeCategoryData = safeCategories.find(c => c.category_id === activeCategory);

    const getCategoryConfig = (name) => {
        const lowerName = name.toLowerCase();
        // Use Forest Green for coffee and general items
        const brandGreen = '#1B3C35';

        if (lowerName.includes('bakery')) return { Icon: Croissant, color: brandGreen };
        if (lowerName.includes('food')) return { Icon: Croissant, color: brandGreen };
        if (lowerName.includes('smoothie')) return { Icon: CupSoda, color: '#FF4081' };
        if (lowerName.includes('matcha')) return { Icon: Leaf, color: '#4CAF50' };
        if (lowerName.includes('dessert') || lowerName.includes('sweet') || lowerName.includes('cake')) {
            return { Icon: CakeSlice, color: '#FF80AB' };
        }
        if (lowerName === 'cold drinks' || lowerName === 'iced beverage') {
            return { Icon: GlassWater, color: '#03A9F4' };
        }
        if (lowerName.includes('juice')) return { Icon: CupSoda, color: '#FFA726' };
        if (lowerName.includes('specialty')) return { Icon: Coffee, color: brandGreen };
        if (lowerName.includes('boba')) return { Icon: CupSoda, color: '#B39DDB' };
        if (lowerName.includes('frappe')) return { Icon: IceCream, color: brandGreen };
        if (lowerName.includes('shake')) return { Icon: Milk, color: '#FDD835' };
        if (lowerName.includes('warm') || lowerName.includes('hot drink') || lowerName.includes('tea')) {
            return { Icon: Coffee, color: brandGreen };
        }
        if (lowerName.includes('hot coffee')) return { Icon: Coffee, color: brandGreen };
        if (lowerName.includes('espresso')) return { Icon: Zap, color: brandGreen };
        if (lowerName.includes('latte')) return { Icon: Milk, color: brandGreen };
        if (lowerName.includes('extra') || lowerName.includes('plus')) return { Icon: Plus, color: '#BDBDBD' };
        if (lowerName.includes('ice coffee')) return { Icon: GlassWater, color: brandGreen };

        return { Icon: Coffee, color: brandGreen };
    };

    return (
        <div className="menu-container fade-in">
            {/* Category Navigation */}
            <div className="category-nav" style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '0.8rem',
                padding: '1.2rem 0.5rem 2.5rem',
                position: 'sticky',
                top: 0,
                background: 'rgba(255, 255, 255, 0.9)',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--gray-divider)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
            }}>
                {safeCategories.map(cat => {
                    const { Icon, color } = getCategoryConfig(cat.category_name);
                    const isActive = activeCategory === cat.category_id;

                    return (
                        <button
                            key={cat.category_id}
                            onClick={() => setActiveCategory(cat.category_id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: isActive ? 'var(--accent)' : 'var(--bg-secondary)',
                                color: isActive ? '#ffffff' : 'var(--text-primary)',
                                border: isActive ? 'none' : '1px solid var(--gray-divider)',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                fontWeight: isActive ? '700' : '500',
                                fontSize: '0.95rem',
                                boxShadow: isActive ? `0 8px 20px var(--accent-glow)` : 'none',
                                flexShrink: 0
                            }}
                        >
                            <Icon
                                size={20}
                                color={isActive ? '#ffffff' : color}
                                style={{
                                    opacity: isActive ? 1 : 0.9
                                }}
                            />
                            {cat.category_name}
                        </button>
                    );
                })}
            </div>

            {/* Products Grid */}
            <div className="products-grid" style={{ paddingTop: '1rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                    {activeCategoryData?.category_name}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {activeCategoryData?.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {activeCategoryData?.products.length === 0 && (
                    <p style={{ color: 'var(--text-secondary)' }}>No items in this category yet.</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
