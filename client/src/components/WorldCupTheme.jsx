import React, { useState, useEffect, useRef } from 'react';

/* ── Egyptian flag palette ── */
const EG_COLORS = ['#CE1126', '#FFFFFF', '#000000', '#C09300', '#CE1126', '#C09300'];

/* ── Confetti particle shapes ── */
const SHAPES = ['rect', 'circle', 'ribbon'];

/* Generate a single confetti particle config */
function makeParticle(id) {
    const color = EG_COLORS[Math.floor(Math.random() * EG_COLORS.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const left = Math.random() * 100;          // vw
    const delay = Math.random() * 1.4;         // seconds
    const duration = 1.8 + Math.random() * 1.4; // seconds
    const size = 6 + Math.random() * 10;       // px
    const drift = (Math.random() - 0.5) * 120; // horizontal drift px
    const rotation = Math.random() * 720 - 360; // deg

    return { id, color, shape, left, delay, duration, size, drift, rotation };
}

/* ── CSS injected once via a <style> tag ── */
const INJECTED_STYLE = `
@keyframes wc-fall {
    0%   { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
}
@keyframes wc-toast-in {
    0%   { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.9); }
    100% { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1); }
}
@keyframes wc-toast-out {
    0%   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.92); }
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

/* ── Confetti Particle Component ── */
function ConfettiParticle({ p }) {
    const isRect = p.shape === 'rect';
    const isRibbon = p.shape === 'ribbon';

    const style = {
        position: 'fixed',
        top: 0,
        left: `${p.left}vw`,
        width: isRibbon ? `${p.size * 0.4}px` : `${p.size}px`,
        height: isRibbon ? `${p.size * 2.5}px` : `${p.size}px`,
        backgroundColor: p.color,
        borderRadius: p.shape === 'circle' ? '50%' : isRibbon ? '2px' : '2px',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform, opacity',
        '--drift': `${p.drift}px`,
        '--rot': `${p.rotation}deg`,
        animation: `wc-fall ${p.duration}s ${p.delay}s ease-in forwards`,
    };

    return <div style={style} />;
}

/* ── Main Component ── */
export default function WorldCupTheme() {
    const [particles, setParticles] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastExiting, setToastExiting] = useState(false);
    const [showBadge, setBadge] = useState(false);
    const fired = useRef(false);

    useEffect(() => {
        /* Only run once per session */
        const seen = sessionStorage.getItem('wc2026_seen');
        if (seen) {
            setBadge(true);
            return;
        }

        if (fired.current) return;
        fired.current = true;

        /* Fire confetti + toast */
        const ps = Array.from({ length: 90 }, (_, i) => makeParticle(i));
        setParticles(ps);
        setShowToast(true);

        /* Toast exit animation */
        const exitTimer = setTimeout(() => setToastExiting(true), 3200);
        /* Remove toast from DOM */
        const removeToast = setTimeout(() => setShowToast(false), 3900);
        /* Remove particles from DOM after they've all fallen */
        const removeParticles = setTimeout(() => setParticles([]), 4200);
        /* Show floating badge (with a slight delay so it doesn't compete) */
        const badgeTimer = setTimeout(() => setBadge(true), 800);

        sessionStorage.setItem('wc2026_seen', '1');

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(removeToast);
            clearTimeout(removeParticles);
            clearTimeout(badgeTimer);
        };
    }, []);

    return (
        <>
            {/* Inject keyframes once */}
            <style>{INJECTED_STYLE}</style>

            {/* ── Confetti ── */}
            {particles.map(p => <ConfettiParticle key={p.id} p={p} />)}

            {/* ── Welcome Toast ── */}
            {showToast && (
                <div
                    role="alert"
                    aria-live="polite"
                    style={{
                        position: 'fixed',
                        top: '5.5rem',
                        left: '50%',
                        zIndex: 100000,
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #CE1126 100%)',
                        border: '1.5px solid rgba(192,147,0,0.6)',
                        borderRadius: '20px',
                        padding: '0.85rem 1.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        boxShadow: '0 12px 40px rgba(206,17,38,0.35), 0 0 0 1px rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        whiteSpace: 'nowrap',
                        animation: toastExiting
                            ? 'wc-toast-out 0.7s ease-in forwards'
                            : 'wc-toast-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    {/* Egyptian flag stripe accent */}
                    <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px',
                        borderRadius: '20px 0 0 20px',
                        background: 'linear-gradient(to bottom, #CE1126 33%, #ffffff 33%, #ffffff 66%, #000000 66%)'
                    }} />

                    {/* Trophy spin */}
                    <span style={{ fontSize: '1.5rem', display: 'inline-block', animation: 'wc-spin-slow 3s linear infinite' }}>🏆</span>

                    <div>
                        <p style={{
                            color: '#ffffff',
                            fontWeight: '800',
                            fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
                            letterSpacing: '0.01em',
                            direction: 'rtl',
                            margin: 0,
                            lineHeight: '1.3',
                            textShadow: '0 1px 6px rgba(0,0,0,0.4)'
                        }}>
                            شجع الفراعنة في المونديال! 🇪🇬🏆
                        </p>
                        <p style={{
                            color: 'rgba(192,147,0,0.9)',
                            fontSize: '0.72rem',
                            fontWeight: '600',
                            marginTop: '2px',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            margin: '2px 0 0',
                        }}>
                            FIFA World Cup 2026 • USA • Canada • Mexico
                        </p>
                    </div>

                    <span style={{ fontSize: '1.5rem' }}>⚽</span>
                </div>
            )}

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
