"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, ShieldCheck, Droplets, CheckCircle2 } from "lucide-react";

interface SequenceScrollProps {
  onProgress?: (progress: number) => void;
  onLoaded?: () => void;
  onOpenCart?: () => void;
}

const TOTAL_FRAMES = 240;

export default function SequenceScroll({
  onProgress,
  onLoaded,
  onOpenCart,
}: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number>(0);
  const [imagesReady, setImagesReady] = useState(false);

  // Motion scroll progress mapping across the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Story Overlay Opacities and Transforms
  // 1. Hero Overlay (0%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);
  const heroScale = useTransform(scrollYProgress, [0, 0.16], [1, 0.96]);

  // 2. 30% Scroll (Low pH 5.5 Formula)
  const formulaOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.38, 0.46],
    [0, 1, 1, 0]
  );
  const formulaX = useTransform(scrollYProgress, [0.18, 0.26, 0.38, 0.46], [-40, 0, 0, -40]);

  // 3. 60% Scroll (15 Amino Acids & Succinic Acid Defence)
  const scienceOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.68, 0.76],
    [0, 1, 1, 0]
  );
  const scienceX = useTransform(scrollYProgress, [0.48, 0.56, 0.68, 0.76], [40, 0, 0, 40]);

  // 4. 90% Scroll (CTA Section)
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.86, 0.98, 1],
    [0, 1, 1, 0.8]
  );
  const ctaY = useTransform(scrollYProgress, [0.78, 0.86], [30, 0]);

  // Render a specific frame with object-cover rules and crisp DPR scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Fill exact background color first (#0B211F) for seamless blending
    ctx.fillStyle = "#0B211F";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedIndexRef.current = frameIndex;
  }, []);

  // Resize canvas for sharp Retina rendering
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      if (lastRenderedIndexRef.current >= 0) {
        drawFrame(lastRenderedIndexRef.current);
      }
    }
  }, [drawFrame]);

  // Preload all 240 frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Track initial frames for immediate rendering
    const onFrameLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      const currentPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      onProgress?.(currentPct);

      if (loadedCount === 1) {
        // Render first frame immediately
        handleResize();
        drawFrame(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        setImagesReady(true);
        onLoaded?.();
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = onFrameLoad;
      img.onerror = onFrameLoad; // continue even if single frame fails
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, handleResize, onLoaded, onProgress]);

  // Handle window resizing
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Continuous animation frame loop for smooth interpolation (LERP)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      const clamped = Math.max(0, Math.min(1, latest));
      targetFrameRef.current = clamped * (TOTAL_FRAMES - 1);
    });

    const loop = () => {
      // Lerp factor: 0.16 gives responsive yet buttery smooth kinetic deceleration
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.16;

      const roundedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));

      if (roundedFrame !== lastRenderedIndexRef.current) {
        drawFrame(roundedFrame);
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [drawFrame, scrollYProgress]);

  return (
    <div
      ref={containerRef}
      id="hero-sequence"
      className="relative h-[400vh] w-full bg-[#0B211F]"
    >
      {/* Sticky Canvas Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B211F]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover z-0"
        />

        {/* Ambient Top and Bottom Dark Gradient Masks for Seamless Integration */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B211F] via-[#0B211F]/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B211F] via-[#0B211F]/80 to-transparent pointer-events-none z-10" />

        {/* =========================================================================
            STORY TEXT OVERLAYS (Scroll Synchronized)
        ========================================================================= */}

        {/* Overlay 1: 0% Scroll — Brand & Product Title */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none select-none"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E2926]/80 border border-[#2DD4BF]/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(45,212,191,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping" />
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#2DD4BF]">
              BIOMIMETIC ADVANCED DERM-CARE
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            KAHF <span className="text-gradient-teal font-light">MAN</span>
          </h1>

          <p className="mt-2 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#E2E8F0] max-w-3xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            Acne Care AminoGel
          </p>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#8FAEA8] max-w-xl font-light tracking-wide leading-relaxed">
            The next-generation physiological cleanser engineered to eliminate acne-causing bacteria while fortifying natural skin barriers.
          </p>

          {/* Scroll prompt pill */}
          <div className="mt-10 inline-flex flex-col items-center gap-2 text-[#8FAEA8]">
            <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#2DD4BF]">
              Scroll to activate formula
            </span>
            <div className="w-5 h-9 rounded-full border border-[#2DD4BF]/40 flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"
              />
            </div>
          </div>
        </motion.div>

        {/* Overlay 2: 30% Scroll — Low pH 5.5 Formula (Left Aligned Layout) */}
        <motion.div
          style={{ opacity: formulaOpacity, x: formulaX }}
          className="absolute inset-y-0 left-6 sm:left-12 md:left-20 lg:left-28 flex flex-col justify-center max-w-xl z-20 pointer-events-none select-none"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-[#2DD4BF]/20 shadow-2xl relative overflow-hidden pointer-events-auto">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4A44]/50 border border-[#2DD4BF]/30 text-xs font-mono text-[#2DD4BF] mb-4">
              <Droplets className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>ACID MANTLE PRESERVATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Low pH 5.5 <br />
              <span className="text-gradient-teal">Formula</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#8FAEA8] leading-relaxed">
              Engineered to match the skin’s biological pH balance. Our proprietary micro-foam vortex gently lifts excess sebum and trapped grime without disturbing the crucial lipid matrix.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-[#0B211F]/80 border border-[#1E4A44] text-[#ECFDF5] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#2DD4BF]" /> ZERO STRIPPING
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0B211F]/80 border border-[#1E4A44] text-[#ECFDF5] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#2DD4BF]" /> MICRO-FOAM MATRIX
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0B211F]/80 border border-[#1E4A44] text-[#ECFDF5] flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#2DD4BF]" /> 5.5 EQUILIBRIUM
              </span>
            </div>
          </div>
        </motion.div>

        {/* Overlay 3: 60% Scroll — 15 Amino Acids & Succinic Acid Defence (Right Aligned Layout) */}
        <motion.div
          style={{ opacity: scienceOpacity, x: scienceX }}
          className="absolute inset-y-0 right-6 sm:right-12 md:right-20 lg:right-28 flex flex-col justify-center items-end max-w-xl z-20 pointer-events-none select-none text-right"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-[#2DD4BF]/20 shadow-2xl relative overflow-hidden pointer-events-auto text-left">
            {/* Ambient glow */}
            <div className="absolute top-0 left-0 w-44 h-44 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E4A44]/50 border border-[#2DD4BF]/30 text-xs font-mono text-[#2DD4BF] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>ACTIVE CLEAR SKIN SCIENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              15 Amino Acids & <br />
              <span className="text-gradient-teal">Succinic Acid Defence</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#8FAEA8] leading-relaxed">
              Succinic acid penetrates pores to inhibit acne pathogens twice as gently as traditional salicylic acid. Concurrently, 15 biomimetic amino acids reinforce intercellular lipids for 24-hour hydration.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#0B211F]/70 border border-[#1E4A44]">
                <div className="text-[#2DD4BF] font-bold text-lg">99.8%</div>
                <div className="text-[11px] text-[#8FAEA8] mt-0.5">Acne Bacteria Neutralized</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0B211F]/70 border border-[#1E4A44]">
                <div className="text-[#2DD4BF] font-bold text-lg">15 Complexes</div>
                <div className="text-[11px] text-[#8FAEA8] mt-0.5">Biomimetic Barrier Peptides</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overlay 4: 90% Scroll — Centered CTA Copywriting & Interactive Magnetic Button */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none select-none"
        >
          <div className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-[#2DD4BF]/30 shadow-2xl max-w-2xl pointer-events-auto backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#2DD4BF]/10 via-transparent to-transparent pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E4A44]/60 border border-[#2DD4BF]/30 text-xs font-mono text-[#2DD4BF] mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UPGRADE YOUR GROOMING ROUTINE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Clear Skin, <br />
              <span className="text-gradient-teal">Engineered for Men</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#8FAEA8] max-w-lg mx-auto leading-relaxed">
              Experience the non-stripping power of Kahf Acne Care AminoGel. Formulated for the daily grind, workout sweat, and urban climate.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Interactive Magnetic CTA Button */}
              <button
                onClick={onOpenCart}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#14B8A6] to-[#0D9488] text-[#0B211F] font-bold text-base tracking-wide hover:shadow-[0_0_35px_rgba(45,212,191,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>CLAIM YOUR AMINOGEL BATCH</span>
                <span className="w-2 h-2 rounded-full bg-[#0B211F]" />
              </button>

              <a
                href="#about"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#0E2926] border border-[#2DD4BF]/30 text-[#ECFDF5] hover:bg-[#1E4A44] hover:text-[#2DD4BF] transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center gap-2"
              >
                <span>Explore The Science</span>
                <ArrowDown className="w-4 h-4 text-[#2DD4BF]" />
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-[#8FAEA8] font-mono">
              <span>✓ HALAL CERTIFIED</span>
              <span>✓ DERMATOLOGY APPROVED</span>
              <span>✓ CRUELTY FREE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
