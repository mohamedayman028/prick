import React, { useState } from 'react';
import Menu from './components/Menu';
import QRCodePage from './pages/QRCodePage';
import Hero from './components/Hero';
import FloatingSocialBar from './components/FloatingSocialBar';
import WorldCupTheme from './components/WorldCupTheme';

function App() {
  const [view, setView] = useState('menu'); // 'menu' or 'qr'

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Persistent World Cup Top Ribbon */}
      <div className="wc-top-ribbon" />
      <WorldCupTheme />
      <FloatingSocialBar />
      
      {/* Persistent Glassmorphic Sticky Header */}
      <nav style={{
        padding: '0.6rem clamp(1rem, 5vw, 2rem)', // Sleeker padding when fixed
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: '4px', // Position below the ribbon
        left: 0,
        right: 0,
        zIndex: 1000,
        maxWidth: '100%',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.02)',
        margin: '0 auto',
        gap: '0.8rem'
      }}>
        {/* Brand Area with Logo and Permanent World Cup Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Logo container */}
          <div style={{
            background: '#ffffff',
            padding: '0.2rem 0.6rem',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          }}>
            <img 
              src="/logo-new.png" 
              alt="Brisk Logo" 
              style={{ 
                height: '42px', 
                width: 'auto', 
                objectFit: 'contain' 
              }} 
            />
          </div>

          {/* Persistent Egyptian flag brand badge */}
          <div className="wc-header-badge" title="Egypt in World Cup 2026">
            <div className="wc-flag-pulse-small">
              <div style={{ flex: 1, backgroundColor: '#CE1126' }} />
              <div style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
              <div style={{ flex: 1, backgroundColor: '#000000' }} />
            </div>
            <span className="wc-header-text">
              Egypt in World Cup 2026 🇪🇬⚽
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => setView('menu')}
            className="btn"
            style={{
              background: view === 'menu' ? 'var(--accent)' : 'rgba(255,255,255,0.9)',
              color: view === 'menu' ? '#ffffff' : 'var(--accent)',
              border: 'none',
              fontWeight: '700',
              padding: '0.55rem clamp(0.8rem, 3vw, 1.4rem)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderRadius: '50px',
              fontSize: '0.85rem'
            }}
          >
            Menu
          </button>
          <button
            onClick={() => setView('qr')}
            className="btn"
            style={{
              background: view === 'qr' ? 'var(--accent)' : 'rgba(255,255,255,0.9)',
              color: view === 'qr' ? '#ffffff' : 'var(--accent)',
              border: 'none',
              fontWeight: '700',
              padding: '0.55rem clamp(0.8rem, 3vw, 1.4rem)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderRadius: '50px',
              fontSize: '0.85rem'
            }}
          >
            QR
          </button>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {view === 'menu' && <Hero />}
        <div className="container" style={{ marginTop: view === 'menu' ? '0' : '8rem' }}>
          {view === 'menu' ? <Menu /> : <QRCodePage />}
        </div>
      </main>

      <footer style={{
        marginTop: '4rem',
        padding: '4rem 0',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--gray-divider)',
        background: 'var(--bg-secondary)'
      }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <img src="/logo-new.png" alt="Brisk Logo" style={{ height: '90px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <p>© {new Date().getFullYear()} Brisk Cafe. All rights reserved.</p>
        <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: '500' }}>Premium Coffee & Sustainable Quality</p>
        <p style={{ fontSize: '12px', marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', whiteSpace: 'nowrap', opacity: 0.8 }}>
          <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '12px', color: 'var(--accent)', letterSpacing: '-0.5px' }}>&lt;/&gt;</span>
          Engineering: Mohamed Ayman | Phone: 01017397552
        </p>
      </footer>
    </div>
  );
}

export default App;
