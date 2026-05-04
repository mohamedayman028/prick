import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom SVG for TikTok to match the line-icon style of Lucide
const TikTokIcon = ({ size = 24, color = "currentColor", strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    id: 'facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/18R1JjWsQc/',
    color: '#1877F2',
    label: 'Facebook'
  },
  {
    id: 'tiktok',
    icon: TikTokIcon,
    url: 'https://www.tiktok.com/@brisk_coffee?_t=ZS-8zHiBUwROn2&_r=1&fbclid=PAT01DUARlwL1leHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadFKomea4ZeMZ_U_hoHOddEjHdr_q8lMNsQq7GONHsT5eD-QwWRePR2BPH_oA_aem_YdeZPBQpmITKTNLv5nQdwg',
    color: '#000000',
    label: 'TikTok'
  },
  {
    id: 'instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/brisk_coffee?igsh=ZXBzaTlheDJkODY=',
    color: '#E1306C',
    label: 'Instagram'
  },
  {
    id: 'maps',
    icon: MapPin,
    url: 'https://maps.app.goo.gl/N6GRgtkSssmHs5kf7',
    color: '#EA4335',
    label: 'Google Maps'
  }
];

const FloatingSocialBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring' } }
  };

  const barStyle = {
    position: 'fixed',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Glassmorphism styling
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
  };

  const mobileStyle = {
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    flexDirection: 'row',
    padding: '0.6rem 1.2rem',
    borderRadius: '50px',
    gap: '1.5rem',
    width: 'auto'
  };

  const desktopStyle = {
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    flexDirection: 'column',
    padding: '1.2rem 0.8rem',
    borderRadius: '30px',
    gap: '1.5rem',
    width: 'auto'
  };

  // On initial render during SSR or before effect, we use a default style
  // but framer motion handles the transform internally.
  // We'll apply the CSS inline to a motion.div
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        ...barStyle,
        ...(isMobile ? mobileStyle : desktopStyle),
        // Important: override Framer Motion's default transforms so our left/right/top/bottom positioning works
        // Framer motion uses x/y for translation, so we just use those instead of CSS transform
        transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)'
      }}
    >
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            variants={itemVariants}
            whileHover={{ scale: 1.15, filter: 'brightness(1.2)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              transition: 'color 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = social.color;
              e.currentTarget.style.filter = `drop-shadow(0 0 8px ${social.color}60)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.filter = 'none';
            }}
          >
            <Icon size={isMobile ? 24 : 28} strokeWidth={2} />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default FloatingSocialBar;
