import React from 'react';

const Logo = ({ size = 48, color = 'var(--accent)' }) => {
    return (
        <svg
            height={size}
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: 'auto',
                flexShrink: 0,
                display: 'block',
                maxWidth: '100%'
            }}
        >
            {/* Motion Lines - Left side, rounded and bubbly */}
            <rect x="5" y="24" width="12" height="4.5" rx="2.25" fill={color} />
            <rect x="0" y="32" width="18" height="4.5" rx="2.25" fill={color} />
            <rect x="5" y="40" width="12" height="4.5" rx="2.25" fill={color} />

            {/* Letter 'b' */}
            <path
                d="M38 10V50M38 34.5C38 34.5 39 24 50 24C61 24 62 34 62 36.5C62 39 61 50 50 50C39 50 38 45.5 38 45.5"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Coffee Bean inside 'b' */}
            <g transform="translate(50, 36.5)">
                <ellipse cx="0" cy="0" rx="4" ry="7" fill={color} />
                <path d="M-0.8 -4C0 -1 0 1 0.8 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Letter 'r' */}
            <path
                d="M78 30V50M78 36C78 36 79 24 88 24"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Letter 'i' */}
            <path d="M106 30V50" stroke={color} strokeWidth="10" strokeLinecap="round" />
            <circle cx="106" cy="14" r="6" fill={color} />

            {/* Letter 's' */}
            <path
                d="M122 45C122 45 125 50 134 50C143 50 143 45 143 43C143 41 140 39 135 37C130 35 124 33.5 124 28C124 22.5 130 20 135 20C140 20 144 23 144 23"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Letter 'k' */}
            <path
                d="M162 10V50M162 37L178 24M162 38L180 50"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Logo;