import React from 'react';
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
    label: 'Facebook'
  },
  {
    id: 'tiktok',
    icon: TikTokIcon,
    url: 'https://www.tiktok.com/@brisk_coffee?_t=ZS-8zHiBUwROn2&_r=1&fbclid=PAT01DUARlwL1leHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadFKomea4ZeMZ_U_hoHOddEjHdr_q8lMNsQq7GONHsT5eD-QwWRePR2BPH_oA_aem_YdeZPBQpmITKTNLv5nQdwg',
    label: 'TikTok'
  },
  {
    id: 'instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/brisk_coffee?igsh=ZXBzaTlheDJkODY=',
    label: 'Instagram'
  },
  {
    id: 'maps',
    icon: MapPin,
    url: 'https://maps.app.goo.gl/N6GRgtkSssmHs5kf7',
    label: 'Google Maps'
  }
];

const FloatingSocialBar = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring' } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        position: 'fixed',
        zIndex: 9999,
        right: '15px', // slightly off the exact edge
        top: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.2rem',
        padding: '1rem 0.6rem',
        borderRadius: '30px',
        // Glassmorphism effect
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px) saturate(150%)',
        WebkitBackdropFilter: 'blur(10px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        // We handle centering manually with marginTop if transform conflicts with Framer Motion,
        // but Framer Motion handles x/y transforms independently of CSS transform: translateY.
        // So we can use y: "-50%" in Framer Motion instead of CSS transform.
        y: '-50%'
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
            whileHover={{ scale: 1.15, x: -4, filter: 'brightness(0.8)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)', // Uses Brisk brand color monochromatic
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
          >
            <Icon size={26} strokeWidth={2} />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default FloatingSocialBar;
