/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1600px',
    },
    extend: {
      fontFamily: {
        // CAIRO: Strictly for Headings (H1-H6) - Weights 700-900
        heading: ['Cairo', 'sans-serif'],
        // TAJAWAL: Strictly for Body text - Weights 400-500
        sans: ['Tajawal', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        // ═══════════════════════════════════════════════════
        // ERADICATED PURE BLACK (#000000) - LUXURY STANDARD
        // ═══════════════════════════════════════════════════
        luxury: {
          black: '#121212',      // Baseline depth (Material Design Dark)
          deep: '#0A0A0A',       // High-contrast sections
          rich: '#050505',       // Maximum contrast
          elevated: '#1A1A1A',   // Elevated surfaces
          surface: '#242424',    // Card backgrounds
        },
        // ═══════════════════════════════════════════════════
        // LUXURY GOLD PALETTE
        // ═══════════════════════════════════════════════════
        gold: {
          primary: '#D4AF37',    // Primary Gold - Main accent
          highlight: '#F9E488',  // Champagne Highlight - Bright accent
          bronze: '#B8860B',     // Dark Goldenrod - Deep accent
          aged: '#8B7D50',       // Aged Brass - Subtle tones
          deep: '#6B4E16',       // Deep Bronze Shadow
          metallic: '#D3AF37',   // Metallic Gold
          chinese: '#CD9900',    // Chinese Gold
          coin: '#A57D02',       // Bronze Coin
        },
        // MATTE BORDERS
        matte: {
          border: 'rgba(212, 175, 55, 0.3)',
          borderHover: 'rgba(212, 175, 55, 0.6)',
          glow: 'rgba(212, 175, 55, 0.15)',
          glowIntense: 'rgba(212, 175, 55, 0.3)',
        },
        // TEXT COLORS
        cream: {
          DEFAULT: '#F5F5DC',
          light: '#F2F2F2',
          muted: '#E0E0E0',
          faint: '#BFAFAF',
        },
        // COMPLEMENTARY LUXURY
        emerald: '#043927',
        burgundy: '#660033',
        navy: '#07203F',
      },
      backgroundImage: {
        // GOLD SHINE GRADIENT - For CTA buttons and main titles
        'gold-shine': 'linear-gradient(90deg, #D4AF37 0%, #F9E488 50%, #B8860B 100%)',
        'gold-shine-reverse': 'linear-gradient(270deg, #D4AF37 0%, #F9E488 50%, #B8860B 100%)',
        
        // MATTE GOLD CARD GRADIENT
        'matte-gold-card': 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 125, 80, 0.05) 100%)',
        'matte-gold-card-hover': 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(139, 125, 80, 0.08) 100%)',
        
        // BUTTON GRADIENTS
        'gold-button': 'linear-gradient(135deg, #D4AF37 0%, #F9E488 50%, #D4AF37 100%)',
        'gold-button-hover': 'linear-gradient(135deg, #F9E488 0%, #D4AF37 50%, #F9E488 100%)',
        
        // SECTION BACKGROUNDS
        'luxury-gradient': 'linear-gradient(135deg, #121212 0%, #0A0A0A 100%)',
        'luxury-radial': 'radial-gradient(ellipse at 50% 60%, rgba(212, 175, 55, 0.08) 0%, transparent 65%)',
        
        // GLASS OVERLAYS
        'glass-dark': 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
      },
      boxShadow: {
        // LUXURY CARD SHADOWS
        'luxury-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'luxury-card-hover': '0 12px 48px rgba(212, 175, 55, 0.2)',
        
        // GOLD GLOW EFFECTS
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.3)',
        'gold-glow-intense': '0 0 50px rgba(212, 175, 55, 0.5)',
        'gold-glow-subtle': '0 4px 20px rgba(212, 175, 55, 0.15)',
        
        // BUTTON SHADOWS
        'gold-button': '0 4px 15px rgba(212, 175, 55, 0.4)',
        'gold-button-hover': '0 8px 25px rgba(212, 175, 55, 0.6)',
        
        // PREMIUM CARD
        'premium-card': '0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)',
      },
      borderRadius: {
        'card': '16px',
        'button': '50px',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        'card': '10px',
        'xs': '2px',
        '3xl': '32px',
      },
      spacing: {
        // 65% Negative Space Rule - Large Padding Values
        'section': '80px',
        'section-lg': '120px',
        'card': '32px',
        'card-lg': '48px',
      },
      aspectRatio: {
        // STRICT METRIC: Card images MUST maintain 11:15 ratio
        'card-image': '11 / 15',
        // HERO RATIO: 18.5:1 for hero images
        'hero-wide': '18.5 / 1',
        'hero-standard': '16 / 9',
      },
      animation: {
        'gold-shine': 'goldShine 3s linear infinite',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        goldShine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
