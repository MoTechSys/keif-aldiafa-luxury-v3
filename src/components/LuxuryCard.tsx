'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// LUXURY CARD COMPONENT WITH SPRING PHYSICS
// Hyper-realistic material physics for digital luxury UI
// ═══════════════════════════════════════════════════════════════════════════

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'premium';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  metallicGlare?: boolean;
  index?: number;
}

// Spring Physics Configuration - Feel like physical, weighty objects
const SPRING_CONFIG = {
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

const paddingMap = {
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-10',
  xl: 'p-12',
};

export function LuxuryCard({
  children,
  className = '',
  variant = 'default',
  padding = 'lg',
  metallicGlare = true,
  index = 0,
}: LuxuryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth, natural movement
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  // Transform values for 3D rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Mouse move handler for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Card variants
  const variants = {
    default: {
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 125, 80, 0.05) 100%)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
    },
    elevated: {
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(139, 125, 80, 0.08) 100%)',
      border: '1px solid rgba(212, 175, 55, 0.4)',
    },
    premium: {
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(249, 228, 136, 0.08) 50%, rgba(139, 125, 80, 0.06) 100%)',
      border: '2px solid rgba(212, 175, 55, 0.5)',
    },
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${paddingMap[padding]} ${className}`}
      style={{
        ...variants[variant],
        borderRadius: 16,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX,
        rotateY,
      }}
    >
      {/* Top Gold Line Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)'
        }}
      />

      {/* Metallic Glare Effect */}
      {metallicGlare && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(249, 228, 136, 0.12) 0%, rgba(212, 175, 55, 0.06) 25%, transparent 50%)',
            opacity: useTransform(springX, [-0.5, 0, 0.5], [0.3, 0, 0.3]),
          }}
        />
      )}

      {/* Hover Overlay with Spring */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(139, 125, 80, 0.04) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LUXURY IMAGE CARD - Strict aspect-[11/15] ratio
// ═══════════════════════════════════════════════════════════════════════════

interface LuxuryImageCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  index?: number;
}

export function LuxuryImageCard({
  src,
  alt,
  title,
  description,
  index = 0,
}: LuxuryImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden"
      style={{
        borderRadius: 16,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX,
        rotateY,
      }}
    >
      {/* Image Container - STRICT 11:15 Aspect Ratio */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '11 / 15',
          borderRadius: 16,
          border: '1px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.4) 50%, transparent 100%)',
          }}
        />

        {/* Gold Border Glow on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            borderRadius: 16,
            boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.15)',
          }}
        />

        {/* Content Overlay */}
        {(title || description) && (
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {title && (
              <h3
                className="font-cairo text-[#F2F2F2] mb-2"
                style={{ fontSize: '1.25rem', fontWeight: 700 }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                className="text-[#BFAFAF] text-sm leading-relaxed"
                style={{ fontFamily: 'Tajawal, sans-serif' }}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LUXURY BUTTON WITH SPRING PHYSICS
// ═══════════════════════════════════════════════════════════════════════════

interface LuxuryButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function LuxuryButton({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
}: LuxuryButtonProps) {
  const buttonStyles = {
    primary: {
      background: 'linear-gradient(90deg, #D4AF37 0%, #F9E488 50%, #B8860B 100%)',
      backgroundSize: '200% auto',
      color: '#0A0A0A',
      boxShadow: '0 6px 25px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    outline: {
      background: 'rgba(212, 175, 55, 0.08)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1.5px solid rgba(212, 175, 55, 0.5)',
      color: '#F9E488',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
  };

  const content = (
    <motion.span
      className="relative z-10 font-cairo inline-block"
      style={{ fontWeight: variant === 'primary' ? 800 : 700 }}
    >
      {children}
    </motion.span>
  );

  const baseStyle = {
    ...buttonStyles[variant],
    fontSize: '0.95rem' as const,
    padding: '14px 36px',
    borderRadius: 50,
    cursor: 'pointer' as const,
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    transition: 'all 0.3s ease',
  };

  if (href) {
    return (
      <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={className}
        style={baseStyle}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      onClick={onClick} 
      className={className}
      style={baseStyle}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
    >
      {content}
    </motion.button>
  );
}

export default LuxuryCard;
