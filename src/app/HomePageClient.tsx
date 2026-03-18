'use client';

import { useRef, lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { HERO_IMG, HERO_MOBILE_IMG } from "@/lib/images";

const PartnersMarquee = lazy(() =>
  import("@/components/PartnersMarquee").then((m) => ({ default: m.PartnersMarquee }))
);

const WA = "966508252134";

// ═══════════════════════════════════════════════════════════════════════════
// SEAMLESS VIDEO LOOP COMPONENT
// Ping-pong technique: plays forward then backward for infinite smooth loop
// ═══════════════════════════════════════════════════════════════════════════
function SeamlessVideoLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video starts playing
    video.play().catch(() => {
      // Auto-play was prevented, will try on user interaction
    });

    const handleTimeUpdate = () => {
      if (!video) return;
      
      // When video is near the end, start reversing
      if (!isReversing && video.currentTime >= video.duration - 0.1) {
        setIsReversing(true);
      }
      // When video is near the start while reversing, play forward
      else if (isReversing && video.currentTime <= 0.1) {
        setIsReversing(false);
      }
    };

    // Smooth reverse playback using requestAnimationFrame
    let animationId: number;
    let lastTime = 0;
    
    const reversePlayback = (timestamp: number) => {
      if (!video || !isReversing) return;
      
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      
      // Reverse at normal playback speed
      video.currentTime = Math.max(0, video.currentTime - delta);
      
      if (video.currentTime > 0.05) {
        animationId = requestAnimationFrame(reversePlayback);
      } else {
        setIsReversing(false);
      }
    };

    const handleReverse = () => {
      if (isReversing) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(reversePlayback);
      } else {
        cancelAnimationFrame(animationId);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      cancelAnimationFrame(animationId);
    };
  }, [isReversing]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover object-center seamless-video"
      style={{ filter: "brightness(0.65) contrast(1.15)" }}
    >
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DIGITAL LUXURY - WHY US CARDS DATA
// ═══════════════════════════════════════════════════════════════════════════
const whyCards = [
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ), 
    title: "خبرة متميزة", 
    desc: "أكثر من ٨ سنوات في تقديم خدمات الضيافة الفاخرة للمناسبات الكبرى والمحافل الرسمية" 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ), 
    title: "فريق احترافي", 
    desc: "كوادر مدربة على أعلى معايير الضيافة الدولية والأصالة العربية" 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ), 
    title: "تقديمات فاخرة", 
    desc: "أرقى المشروبات والتقديمات من قهوة سعودية وشاي وحلويات فاخرة" 
  },
  { 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ), 
    title: "تغطية المملكة", 
    desc: "نصل إلى جميع مناطق المملكة بأسطول من المعدات الفاخرة" 
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADER COMPONENT - CAIRO FONT FOR HEADINGS
// ═══════════════════════════════════════════════════════════════════════════
function SectionHeader({ label, title }: { label?: string; title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.6 }} 
      className="mb-16 text-center"
    >
      {label && (
        <p 
          className="mb-4 font-medium tracking-[0.35em] text-[#D4AF37]"
          style={{ fontSize: "0.75rem" }}
        >
          ✦ {label} ✦
        </p>
      )}
      {/* CAIRO: Strictly for Headings - Weight 900 */}
      <h2 
        className="font-cairo text-[#F2F2F2]"
        style={{ 
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)", 
          fontWeight: 900, 
          lineHeight: 1.2 
        }}
      >
        {title}
      </h2>
      {/* Gold Divider */}
      <div 
        className="mt-6 mx-auto rounded-full"
        style={{ 
          width: 120, 
          height: 3, 
          background: "linear-gradient(90deg, transparent 0%, #B8860B 15%, #D4AF37 35%, #F9E488 50%, #D4AF37 65%, #B8860B 85%, transparent 100%)",
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)"
        }} 
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GOLDEN PARTICLES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function GoldenParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div 
          key={i} 
          className="absolute w-1 h-1 rounded-full"
          style={{ 
            left: `${8 + i * 10}%`, 
            top: `${12 + (i % 4) * 22}%`,
            background: "radial-gradient(circle, #F9E488 0%, #D4AF37 100%)",
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.9)"
          }} 
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.3, 0.8, 0.3], 
            scale: [1, 1.3, 1] 
          }} 
          transition={{ 
            duration: 4 + i * 0.4, 
            repeat: Infinity, 
            delay: i * 0.5, 
            ease: "easeInOut" 
          }} 
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GOLDEN SPARKLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function GoldenSparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "radial-gradient(circle, #F9E488 0%, #D4AF37 100%)",
        boxShadow: "0 0 12px rgba(249, 228, 136, 0.9)",
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.3, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MATTE GOLD CARD COMPONENT WITH SPRING PHYSICS
// Hyper-realistic material physics - KINETIC PHYSICS
// STRICT METRIC: aspect-[11/15] for images
// ═══════════════════════════════════════════════════════════════════════════

// Spring Physics Configuration - Feel like physical, weighty objects
const SPRING_CONFIG = {
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

function MatteGoldCard({ 
  icon, 
  title, 
  desc, 
  index 
}: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt effect
  const x = useRef({ value: 0 });
  const y = useRef({ value: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1 
      }}
      whileHover={{ 
        y: -5, 
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 } 
      }}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 125, 80, 0.05) 100%)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        borderRadius: 16,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        // 65% NEGATIVE SPACE RULE
        padding: 40,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Top Gold Line Accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)"
        }}
      />
      
      {/* METALLIC GLARE EFFECT */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(249, 228, 136, 0.12) 0%, rgba(212, 175, 55, 0.06) 25%, transparent 50%)",
        }}
      />
      
      {/* Hover Overlay with Spring */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(139, 125, 80, 0.04) 100%)",
        }}
      />
      
      {/* GOLD BORDER GLOW ON HOVER */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: 16,
          boxShadow: "inset 0 0 30px rgba(212, 175, 55, 0.15), 0 0 20px rgba(212, 175, 55, 0.1)",
        }}
      />
      
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {/* Icon with Gold Gradient - Spring Animation */}
        <motion.div 
          className="mb-6"
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          style={{ 
            color: "#D4AF37",
            filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))"
          }}
        >
          {icon}
        </motion.div>
        
        {/* Title - CAIRO font */}
        <h3 
          className="font-cairo text-[#F2F2F2] mb-4"
          style={{ fontSize: "1.25rem", fontWeight: 700 }}
        >
          {title}
        </h3>
        
        {/* Description - TAJAWAL font */}
        <p 
          className="text-[#BFAFAF] leading-relaxed"
          style={{ fontSize: "0.95rem", fontFamily: "Tajawal, sans-serif" }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN HOME PAGE CLIENT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div className="bg-[#121212]">
      {/* ═══════════════════════════════════════════════════════════════════════════
          HERO SECTION - LUXURY GLASSMORPHISM
          65% NEGATIVE SPACE RULE ENFORCED
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section 
        ref={heroRef} 
        className="relative h-screen min-h-[650px] max-h-[950px] overflow-hidden" 
        aria-label="الشاشة الرئيسية"
      >
        {/* Background Video with Seamless Loop - Luxury Hospitality */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <SeamlessVideoLoop />
        </motion.div>
        
        {/* Multi-layer Overlays - NO PURE BLACK */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 via-[#121212]/40 to-[#121212]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/60 via-transparent to-[#121212]/40" />
        
        {/* Gold Radial Glow */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "radial-gradient(ellipse at 50% 55%, rgba(212, 175, 55, 0.1) 0%, rgba(249, 228, 136, 0.05) 30%, transparent 70%)" 
          }} 
        />
        
        <GoldenParticles />
        
        {/* ══ HERO CONTENT CONTAINER ══ */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-start sm:justify-center text-center px-4 sm:px-6 pt-20 sm:pt-0" 
          style={{ opacity: heroOpacity }}
        >
          {/* ══ GLASSMORPHISM CARD ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl px-8 sm:px-12 py-12 sm:py-16 rounded-[16px] mt-8 sm:mt-0"
            style={{
              background: "rgba(18, 18, 18, 0.8)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              boxShadow: `
                0 20px 50px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(212, 175, 55, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.08)
              `,
            }}
          >
            {/* Sparkles */}
            {[...Array(12)].map((_, i) => (
              <GoldenSparkle key={i} delay={i * 0.2} x={5 + (i % 3) * 45} y={8 + Math.floor(i / 3) * 28} />
            ))}

            {/* ══ SINCE 2016 BADGE ══ */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-l from-[#D4AF37] to-transparent" />
              <span
                className="text-[#D4AF37] font-semibold tracking-[0.3em]"
                style={{ fontSize: "0.7rem" }}
              >
                SINCE 2016
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </motion.div>

            {/* ══ MAIN TITLE - GOLD SHINE GRADIENT ══ */}
            {/* CAIRO: Strictly for Headings - Weight 900 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-cairo mb-6"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                background: "linear-gradient(90deg, #D4AF37 0%, #F9E488 30%, #B8860B 60%, #F9E488 80%, #D4AF37 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))",
              }}
            >
              كيف الضيافة
            </motion.h1>

            {/* ══ DIVIDER LINE WITH GLOW ══ */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8 mx-auto"
              style={{
                width: 100,
                height: 3,
                background: "linear-gradient(90deg, transparent 0%, #B8860B 15%, #D4AF37 35%, #F9E488 50%, #D4AF37 65%, #B8860B 85%, transparent 100%)",
                boxShadow: "0 0 25px rgba(212, 175, 55, 0.6)",
              }}
            />

            {/* ══ SUBTITLE BADGE ══ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col items-center gap-3 mb-8"
            >
              <p
                className="text-[#F9E488] font-semibold tracking-[0.25em]"
                style={{ fontSize: "clamp(0.8rem, 2vw, 0.95rem)" }}
              >
                KEIF AL-DIAFA
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gradient-to-l from-[#D4AF37] to-transparent" />
                <span
                  className="text-[#B8860B] font-medium tracking-[0.2em]"
                  style={{ fontSize: "0.65rem" }}
                >
                  LUXURY HOSPITALITY
                </span>
                <div className="h-px w-8 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              </div>
            </motion.div>

            {/* ══ DESCRIPTION ══ */}
            {/* TAJAWAL: Strictly for Body text - Weight 400 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="max-w-xl mx-auto"
            >
              <p
                className="text-[#E0E0E0]/90 mb-8 leading-[1.85] font-light"
                style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", fontFamily: "Tajawal, sans-serif" }}
              >
                نبتكر تجارب ضيافة استثنائية تلبي تطلعات النخبة، ونرتقي بمعايير الفخامة لفعاليات الشركات والمحافل الحكومية والخاصة.
              </p>
              
              {/* Events List */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-medium"
                style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", fontFamily: "Tajawal, sans-serif" }}
              >
                {['المعارض', 'المؤتمرات', 'الاجتماعات', 'الفعاليات الوطنية', 'المناسبات الخاصة'].map((item, i, arr) => (
                  <span key={item} className="flex items-center gap-3">
                    <span className="text-[#F9E488] tracking-wide">{item}</span>
                    {i < arr.length - 1 && (
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          background: "radial-gradient(circle, #F9E488 0%, #D4AF37 100%)",
                          boxShadow: "0 0 10px rgba(249, 228, 136, 0.8)"
                        }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ══ CTA BUTTONS ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="flex gap-4 flex-wrap justify-center mt-12 sm:mt-16 relative z-20"
          >
            {/* PRIMARY GOLD BUTTON - Gold Shine Gradient */}
            <Link
              href="/services"
              className="group relative overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #D4AF37 0%, #F9E488 50%, #B8860B 100%)",
                backgroundSize: "200% auto",
                color: "#0A0A0A",
                fontWeight: 800,
                fontSize: "0.95rem",
                padding: "14px 36px",
                borderRadius: 50,
                boxShadow: "0 6px 25px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <span className="relative z-10 font-cairo">اكتشف خدماتنا</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  transform: "translateX(-100%)",
                }}
              />
            </Link>
            
            {/* OUTLINE GOLD BUTTON */}
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(212, 175, 55, 0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1.5px solid rgba(212, 175, 55, 0.5)",
                color: "#F9E488",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "14px 36px",
                borderRadius: 50,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <span className="font-cairo">تواصل معنا</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ══ SCROLL INDICATOR ══ */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-3" style={{ opacity: 0.7 }}>
            <span className="text-[#F9E488] text-xs tracking-[0.2em] font-medium">اكتشف</span>
            <div 
              className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
              style={{ 
                border: "1.5px solid rgba(212, 175, 55, 0.4)",
                background: "rgba(18, 18, 18, 0.5)",
                backdropFilter: "blur(4px)"
              }}
            >
              <motion.div
                className="w-1.5 h-3 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #F9E488, #D4AF37)",
                  boxShadow: "0 0 10px rgba(212, 175, 55, 0.6)"
                }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          PARTNERS SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#121212]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(212, 175, 55, 0.08) 0%, transparent 65%)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <Suspense fallback={<div className="h-32 bg-[#1A1A1A] rounded-lg animate-pulse" />}>
            <PartnersMarquee />
          </Suspense>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          WHY US SECTION - MATTE GOLD CARDS
          65% NEGATIVE SPACE RULE ENFORCED
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-[#121212]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(212, 175, 55, 0.08) 0%, transparent 65%)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader label="لماذا نحن" title="لماذا تختار كيف الضيافة؟" />
          
          {/* Grid with Matte Gold Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCards.map((card, i) => (
              <MatteGoldCard 
                key={i}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-[#121212] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)" }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(249, 228, 136, 0.15) 0%, transparent 70%)" }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Title - CAIRO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-cairo text-[#F2F2F2] mb-8"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900 }}
          >
            هل أنت مستعد لتجربة الفخامة الحقيقية؟
          </motion.h2>
          
          {/* Description - TAJAWAL */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#BFAFAF] max-w-2xl mx-auto mb-12 leading-[1.8]"
            style={{ fontSize: "1.05rem", fontFamily: "Tajawal, sans-serif" }}
          >
            دع فريقنا المتخصص يحول مناسبتك إلى حدث لا يُنسى بخدمات ضيافة فاخرة وراقية
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            {/* Primary Gold Button */}
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #D4AF37 0%, #F9E488 50%, #B8860B 100%)",
                backgroundSize: "200% auto",
                color: "#0A0A0A",
                fontWeight: 800,
                fontSize: "1rem",
                padding: "16px 40px",
                borderRadius: 50,
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <span className="relative z-10 font-cairo">تواصل معنا الآن</span>
            </a>
            
            {/* Outline Gold Button */}
            <Link
              href="/portfolio"
              style={{
                background: "rgba(212, 175, 55, 0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1.5px solid rgba(212, 175, 55, 0.5)",
                color: "#F9E488",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "16px 40px",
                borderRadius: 50,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <span className="font-cairo">شاهد أعمالنا</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
