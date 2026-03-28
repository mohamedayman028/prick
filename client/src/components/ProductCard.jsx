import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';

const ProductCard = ({ item }) => {
    const [loaded, setLoaded] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Dynamic template literal as requested (imageUrl from DB is now just the filename)
    const imageUrl = `/images/products/${item.imageUrl}`;

    const handleProductClick = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        handleCardClick();
    };

    const handleImageError = (e) => {
        const currentSrc = e.target.src;
        // If .png failed, try .jpg
        if (currentSrc.endsWith('.png')) {
            e.target.src = currentSrc.replace('.png', '.jpg');
        } 
        // If everything failed, use local placeholder
        else if (!currentSrc.includes('default-coffee')) {
            e.target.src = '/images/items/default-coffee.png';
            e.target.style.opacity = '0.8';
        }
    };

    const handleCardClick = () => {
        setShowDetails(true);
    };

    const handleCloseModal = (e) => {
        if (e) e.stopPropagation();
        setShowDetails(false);
    };

    // Split bilingual name for better styling
    const nameParts = item.name.split('|');
    const englishName = nameParts[0]?.trim();
    const arabicName = nameParts[1]?.trim();

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="item-card"
                onClick={handleCardClick}
                style={{
                    position: 'relative',
                    height: '420px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--gray-divider)'
                }}
                whileHover={{ 
                    y: -10, 
                    boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                    borderColor: 'var(--accent)'
                }}
            >
                {/* Image Section */}
                <div style={{
                    width: '100%',
                    height: '240px',
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)',
                    position: 'relative'
                }}>
                    <motion.img
                        src={imageUrl}
                        alt={item.name}
                        onLoad={() => setLoaded(true)}
                        onError={handleImageError}
                        onClick={handleProductClick}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: loaded ? 1 : 0,
                            transition: 'opacity 0.5s ease',
                            cursor: 'pointer'
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="item-image"
                    />
                </div>

                {/* Content Section */}
                <div style={{
                    padding: '1.2rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h3 style={{
                            fontSize: '1.2rem',
                            marginBottom: '0.8rem',
                            color: 'var(--text-primary)',
                            fontWeight: '800',
                            lineHeight: '1.3'
                        }}>
                            {englishName}
                            {arabicName && (
                                <span style={{ 
                                    display: 'block', 
                                    fontSize: '1rem', 
                                    marginTop: '0.2rem',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500'
                                }}>
                                    {arabicName}
                                </span>
                            )}
                        </h3>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        {item.items.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                borderBottom: idx !== item.items.length - 1 ? '1px solid #f0f0f0' : 'none',
                                paddingBottom: idx !== item.items.length - 1 ? '0.4rem' : '0'
                            }}>
                                <span>{item.size === 'S' ? 'Small' : item.size === 'M' ? 'Medium' : 'Large'}</span>
                                <span style={{
                                    color: 'var(--accent)',
                                    fontWeight: '700',
                                }}>{item.price} <small style={{ fontSize: '0.75em' }}>EGP</small></span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Modal Portal */}
            {createPortal(
                <AnimatePresence>
                    {showDetails && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                zIndex: 9999,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px'
                            }}
                        >
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleCloseModal}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '32px',
                                    maxWidth: '550px',
                                    width: '100%',
                                    maxHeight: '90vh',
                                    overflowY: 'auto',
                                    position: 'relative',
                                    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.2)',
                                    zIndex: 10000,
                                    padding: '0' // We'll use sections for padding
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={handleCloseModal}
                                    style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        background: 'rgba(0,0,0,0.05)',
                                        border: 'none',
                                        color: '#000',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    &times;
                                </button>

                                {/* Header with Image SpotLight */}
                                <div style={{ 
                                    padding: '2rem', 
                                    paddingBottom: '1rem',
                                    textAlign: 'center' 
                                }}>
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            margin: '0 auto 1.5rem',
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                            background: '#fff'
                                        }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={item.name}
                                            onError={handleImageError}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </motion.div>

                                    <h2 style={{
                                        fontSize: '2rem',
                                        color: 'var(--text-primary)',
                                        fontWeight: '900',
                                        lineHeight: '1.2',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {item.name.split('|')[0]?.trim()}
                                    </h2>
                                    {item.name.split('|')[1] && (
                                        <h2 style={{
                                            fontSize: '2.2rem',
                                            color: 'var(--text-primary)',
                                            fontWeight: '800',
                                            direction: 'rtl',
                                            marginBottom: '1rem'
                                        }}>
                                            {item.name.split('|')[1]?.trim()}
                                        </h2>
                                    )}
                                </div>

                                <div style={{ padding: '0 2.5rem 2.5rem' }}>
                                    {/* Description Section */}
                                    <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                                        <span style={{
                                            color: 'var(--accent)',
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            fontWeight: '800',
                                            display: 'block',
                                            marginBottom: '1rem'
                                        }}>item Info</span>
                                        <p style={{
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.8',
                                            fontSize: '1.1rem',
                                            direction: 'rtl',
                                            fontWeight: '500',
                                            background: 'rgba(var(--accent-rgb), 0.03)',
                                            padding: '1.5rem',
                                            borderRadius: '20px',
                                            border: '1px dashed rgba(var(--accent-rgb), 0.2)'
                                        }}>
                                            {item.description_ar || ""}
                                        </p>
                                    </div>

                                    {/* Prices Section */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '12px',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap'
                                    }}>
                                        {item.items.map((item, idx) => (
                                            <motion.div 
                                                key={idx}
                                                whileHover={{ y: -5 }}
                                                style={{
                                                    background: 'white',
                                                    padding: '1rem 1.5rem',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    minWidth: '130px',
                                                    border: '1px solid #f0f0f0'
                                                }}
                                            >
                                                <span style={{ 
                                                    color: 'var(--text-secondary)', 
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    marginBottom: '4px'
                                                }}>
                                                    {item.size === 'S' ? 'Small' : item.size === 'M' ? 'Medium' : 'Large'}
                                                </span>
                                                <span style={{ 
                                                    color: 'var(--accent)', 
                                                    fontWeight: '900', 
                                                    fontSize: '1.3rem' 
                                                }}>
                                                    {item.price} <small style={{ fontSize: '0.7em' }}>EGP</small>
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ProductCard;
