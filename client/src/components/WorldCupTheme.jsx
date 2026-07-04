import React, { useState, useEffect } from 'react';

/* ── Egyptian flag palette ── */
const EG_COLORS = ['#CE1126', '#FFFFFF', '#000000', '#C09300', '#CE1126', '#C09300'];

/* ── Confetti particle shapes (including soccer balls!) ── */
const SHAPES = ['rect', 'circle', 'ribbon', 'soccer'];

/* Generate a single confetti particle config */
function makeParticle(id, spawnedAt) {
    const color = EG_COLORS[Math.floor(Math.random() * EG_COLORS.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const left = Math.random() * 100;          // vw
    const delay = 0;                           // Instant spawn since generated on interval
    const duration = 2.2 + Math.random() * 1.6; // falling speed seconds
    const size = shape === 'soccer' ? 14 + Math.random() * 8 : 6 + Math.random() * 10; // size in px
    const drift = (Math.random() - 0.5) * 120; // horizontal drift px
    const rotation = Math.random() * 720 - 360; // deg

    return { id, color, shape, left, delay, duration, size, drift, rotation, spawnedAt };
}

/* ── CSS injected once via a <style> tag ── */
const INJECTED_STYLE = `
@keyframes wc-fall {
    0%   { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
}
@keyframes wc-badge-float {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-10px) rotate(2deg); }
}
@keyframes wc-badge-in {
    0%   { opacity: 0; transform: scale(0.5) translateY(30px); }
    70%  { transform: scale(1.1) translateY(-4px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes wc-pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(192,147,0,0.6); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 12px rgba(192,147,0,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(192,147,0,0); }
}
@keyframes wc-spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}
`;

/* ── Confetti / Soccer Particle Component ── */
function ConfettiParticle({ p }) {
    const isRect = p.shape === 'rect';
    const isRibbon = p.shape === 'ribbon';
    const isSoccer = p.shape === 'soccer';

    if (isSoccer) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: `${p.left}vw`,
                    fontSize: `${p.size}px`,
                    pointerEvents: 'none',
                    zIndex: 99999,
                    willChange: 'transform, opacity',
                    '--drift': `${p.drift}px`,
                    '--rot': `${p.rotation}deg`,
                    animation: `wc-fall ${p.duration}s ease-in forwards`,
                    lineHeight: 1
                }}
            >
                ⚽
            </div>
        );
    }

    const style = {
        position: 'fixed',
        top: 0,
        left: `${p.left}vw`,
        width: isRibbon ? `${p.size * 0.4}px` : `${p.size}px`,
        height: isRibbon ? `${p.size * 2.5}px` : `${p.size}px`,
        backgroundColor: p.color,
        borderRadius: p.shape === 'circle' ? '50%' : isRibbon ? '2px' : '2px',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform, opacity',
        '--drift': `${p.drift}px`,
        '--rot': `${p.rotation}deg`,
        animation: `wc-fall ${p.duration}s ease-in forwards`,
    };

    return <div style={style} />;
}

/* ── Main Component ── */
export default function WorldCupTheme() {
    const [particles, setParticles] = useState([]);
    const [showBadge, setBadge] = useState(false);
    const [active, setActive] = useState(true);

    useEffect(() => {
        // Show floating badge (with a slight delay so it doesn't compete)
        const badgeTimer = setTimeout(() => setBadge(true), 800);

        if (!active) return;

        // Start generation interval (spawns 4 particles every 350ms)
        const spawnInterval = setInterval(() => {
            setParticles(prev => {
                const now = Date.now();
                // Filter out particles older than 4.5 seconds to keep DOM light
                const fresh = prev.filter(p => now - p.spawnedAt < 4500);
                
                const newCount = 4;
                const newParticles = Array.from({ length: newCount }, (_, idx) => {
                    return makeParticle(now + '-' + idx, now);
                });
                return [...fresh, ...newParticles];
            });
        }, 350);

        // Stop generation after 75 seconds (1.25 minutes)
        const stopTimer = setTimeout(() => {
            clearInterval(spawnInterval);
            setActive(false);
            // Clear remaining particles after they finish falling (5 seconds later)
            setTimeout(() => {
                setParticles([]);
            }, 5000);
        }, 75000);

        return () => {
            clearInterval(spawnInterval);
            clearTimeout(badgeTimer);
            clearTimeout(stopTimer);
        };
    }, [active]);

    return (
        <>
            {/* Inject keyframes once */}
            <style>{INJECTED_STYLE}</style>

            {/* ── Confetti & Soccer Balls ── */}
            {particles.map(p => <ConfettiParticle key={p.id} p={p} />)}

            {/* ── Floating Supporter Badge ── */}
            {showBadge && (
                <div
                    id="wc-supporter-badge"
                    title="شجع الفراعنة 🇪🇬"
                    style={{
                        position: 'fixed',
                        bottom: '1.5rem',
                        left: '1.2rem',
                        zIndex: 9998,
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: 'linear-gradient(145deg, #0a0a0a 0%, #1B1B1B 100%)',
                        border: '2px solid rgba(192,147,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '1px',
                        cursor: 'default',
                        userSelect: 'none',
                        boxShadow: '0 6px 24px rgba(0,0,0,0.4), 0 0 0 0 rgba(192,147,0,0.5)',
                        animation: 'wc-badge-in 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards, wc-badge-float 3s 1s ease-in-out infinite, wc-pulse-ring 2.5s 1.5s ease-out infinite',
                    }}
                >
                    {/* Egyptian flag stripes inside badge */}
                    <div style={{
                        position: 'absolute', inset: 3, borderRadius: '50%', overflow: 'hidden',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ flex: 1, background: '#CE1126' }} />
                        <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Golden Eagle silhouette */}
                            <span style={{ fontSize: '10px', lineHeight: 1, filter: 'grayscale(0)', marginTop: '-1px' }}>🦅</span>
                        </div>
                        <div style={{ flex: 1, background: '#000000' }} />
                    </div>

                    {/* Overlaid small ball indicator */}
                    <div style={{
                        position: 'absolute', bottom: 0, right: 0,
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #fff 30%, #eee)',
                        border: '1.5px solid #C09300',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', lineHeight: 1
                    }}>
                        ⚽
                    </div>
                </div>
            )}
        </>
    );
}
