import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import { API_BASE_URL } from '../config';
import { FALLBACK_CATEGORIES } from '../constants/menuData';
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
    CakeSlice,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const SCROLL_AMOUNT = 220;

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef(null);

    // Check scroll position and update arrow visibility
    const updateScrollIndicators = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const tolerance = 2;
        setCanScrollLeft(el.scrollLeft > tolerance);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tolerance);
    }, []);

    // Scroll handler for arrow clicks
    const handleScroll = useCallback((direction) => {
        const el = scrollContainerRef.current;
        if (!el) return;
        el.scrollBy({
            left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
            behavior: 'smooth'
        });
    }, []);

    // Attach scroll listener
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        updateScrollIndicators();
        el.addEventListener('scroll', updateScrollIndicators, { passive: true });
        window.addEventListener('resize', updateScrollIndicators);
        return () => {
            el.removeEventListener('scroll', updateScrollIndicators);
            window.removeEventListener('resize', updateScrollIndicators);
        };
    }, [categories, updateScrollIndicators]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/menu`)
            .then(res => res.json())
            .then(data => {
                // Merge fallback categories to ensure new additions are visible 
                // even if the live database hasn't been updated yet.
                let mergedData = Array.isArray(data) ? [...data] : [];
                
                FALLBACK_CATEGORIES.forEach(fbCat => {
                    if (!mergedData.find(c => c.category_id === fbCat.category_id)) {
                        mergedData.push(fbCat);
                    }
                });

                // Sort by sort_order
                mergedData.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

                setCategories(mergedData);
                if (mergedData.length > 0) setActiveCategory(mergedData[0].category_id);
                setLoading(false);
                
                // Background Preload (Next Categories)
                setTimeout(() => {
                    const imageUrls = [];
                    mergedData.forEach(category => {
                        if (category.products) {
                            category.products.forEach(product => {
                                if (product.imageUrl) {
                                    imageUrls.push(`/images/products/${product.imageUrl}`);
                                }
                            });
                        }
                    });
                    
                    [...new Set(imageUrls)].forEach(url => {
                        const img = new Image();
                        img.src = url;
                    });
                }, 1000);
            })
            .catch(err => {
                console.error("Failed to fetch menu, using fallback:", err);
                setCategories(FALLBACK_CATEGORIES);
                if (FALLBACK_CATEGORIES.length > 0) setActiveCategory(FALLBACK_CATEGORIES[0].category_id);
                setLoading(false);
            });
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
        if (lowerName.includes('sandwich')) return { Icon: UtensilsCrossed, color: brandGreen };
        if (lowerName.includes('mojito')) return { Icon: CupSoda, color: '#00BCD4' };
        if (lowerName.includes('sun shine')) return { Icon: Sparkles, color: '#FFD54F' };
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

    /* ── shared arrow button style ── */
    const arrowBtnBase = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        minWidth: 36,
        borderRadius: '50%',
        border: '1px solid var(--gray-divider)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(6px)',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.25s ease',
        flexShrink: 0,
        zIndex: 3
    };

    return (
        <div className="menu-container fade-in">
            {/* Category Navigation Wrapper */}
            <div style={{
                position: 'sticky',
                top: '64px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--gray-divider)',
                padding: '1.2rem 0 2.5rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    position: 'relative'
                }}>
                    {/* Left Arrow */}
                    <button
                        id="category-scroll-left"
                        aria-label="Scroll categories left"
                        onClick={() => handleScroll('left')}
                        style={{
                            ...arrowBtnBase,
                            opacity: canScrollLeft ? 1 : 0,
                            pointerEvents: canScrollLeft ? 'auto' : 'none',
                            transform: canScrollLeft ? 'scale(1)' : 'scale(0.7)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.boxShadow = '0 4px 14px var(--accent-glow)';
                            e.currentTarget.querySelector('svg').style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                            e.currentTarget.style.borderColor = 'var(--gray-divider)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                            e.currentTarget.querySelector('svg').style.color = 'var(--text-primary)';
                        }}
                    >
                        <ChevronLeft size={18} color="var(--text-primary)" style={{ transition: 'color 0.25s' }} />
                    </button>

                    {/* Scrollable Container with Gradient Fades */}
                    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                        {/* Left gradient fade */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: 40,
                            background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
                            zIndex: 2,
                            pointerEvents: 'none',
                            opacity: canScrollLeft ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                        }} />

                        {/* Right gradient fade */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 40,
                            background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
                            zIndex: 2,
                            pointerEvents: 'none',
                            opacity: canScrollRight ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                        }} />

                        {/* Category Pills */}
                        <div
                            ref={scrollContainerRef}
                            className="category-nav"
                            style={{
                                display: 'flex',
                                overflowX: 'auto',
                                gap: '0.8rem',
                                padding: '0.3rem 0.5rem',
                                scrollBehavior: 'smooth',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            {safeCategories.map(cat => {
                                const { Icon, color } = getCategoryConfig(cat.category_name);
                                const isActive = activeCategory === cat.category_id;

                                return (
                                    <button
                                        key={cat.category_id}
                                        onClick={() => {
                                            setActiveCategory(cat.category_id);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
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
                    </div>

                    {/* Right Arrow */}
                    <button
                        id="category-scroll-right"
                        aria-label="Scroll categories right"
                        onClick={() => handleScroll('right')}
                        style={{
                            ...arrowBtnBase,
                            opacity: canScrollRight ? 1 : 0,
                            pointerEvents: canScrollRight ? 'auto' : 'none',
                            transform: canScrollRight ? 'scale(1)' : 'scale(0.7)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.boxShadow = '0 4px 14px var(--accent-glow)';
                            e.currentTarget.querySelector('svg').style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                            e.currentTarget.style.borderColor = 'var(--gray-divider)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                            e.currentTarget.querySelector('svg').style.color = 'var(--text-primary)';
                        }}
                    >
                        <ChevronRight size={18} color="var(--text-primary)" style={{ transition: 'color 0.25s' }} />
                    </button>
                </div>
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
                    {activeCategoryData?.products.map((product, index) => (
                        <ProductCard key={product.id} item={product} priority={index < 8} />
                    ))}
                </div>

                {activeCategoryData?.products.length === 0 && (
                    <p style={{ color: 'var(--text-secondary)' }}>No items in this category yet.</p>
                )}
            </div>

            {/* Hide scrollbar for category-nav via injected style */}
            <style>{`
                .category-nav::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default Menu;

