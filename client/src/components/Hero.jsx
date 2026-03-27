import React from 'react';

const Hero = () => {
    // Add a simple hook or check for mobile to adjust framing
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div style={{
            position: 'relative',
            height: isMobile ? '65vh' : '75vh', // Slightly shorter on mobile to see more menu
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            color: '#ffffff',
            marginBottom: '3rem',
            marginTop: '0'
        }} className="fade-in">

            {/* Preload hero background image */}
            <link rel="preload" as="image" href="/images/main-bg.jpeg" fetchpriority="high" />

            {/* Hero Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/main-bg.jpeg)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0
            }}></div>

            {/* Subtle Gradient Overlay local to Hero to ensure white text legibility */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1
            }}></div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '0 1.5rem', width: '100%' }}>
                <h1 style={{
                    fontSize: 'clamp(3rem, 12vw, 5rem)', // Responsive font size
                    fontWeight: '900',
                    marginBottom: '1rem',
                    color: '#ffffff',
                    letterSpacing: '-2px',
                    textTransform: 'uppercase',
                    lineHeight: '1.1',
                    textShadow: '0 4px 30px rgba(0,0,0,0.4)',
                    fontFamily: 'var(--font-heading)'
                }}>
                    Welcome to <span style={{ color: 'var(--accent)' }}>BRISK</span>
                </h1>
                <p style={{
                    fontSize: 'clamp(1.1rem, 4vw, 1.6rem)', // Responsive font size
                    color: 'rgba(255,255,255,0.95)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: '500',
                    textShadow: '0 2px 15px rgba(0,0,0,0.4)',
                    padding: '0 1rem'
                }}>
                    Step into a fresh, organic experience. Premium coffee and exquisite vibes.
                </p>

                {/* Decorative element */}
                <div style={{
                    marginTop: '2rem',
                    width: 'min(120px, 20vw)',
                    height: '5px',
                    background: 'var(--accent)',
                    margin: '2rem auto',
                    borderRadius: '10px'
                }}></div>
            </div>
        </div>
    );
};

export default Hero;
