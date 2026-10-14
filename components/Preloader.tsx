"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

export default function Preloader({ progress, isLoading }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly increment the visible counter towards progress
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          return Math.min(prev + 1, progress);
        }
        return prev;
      });
    }, 15);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#0B211F] text-[#ECFDF5] select-none overflow-hidden"
        >
          {/* Subtle ambient glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#14B8A6]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Top telemetry bar */}
          <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#8FAEA8] uppercase font-mono border-b border-[#1E4A44]/60 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>KAHF BIOMIMETIC RESEARCH LABS</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>TARGET pH: 5.50</span>
              <span>15 AMINO PEPTIDES</span>
              <span>SYS_OK</span>
            </div>
          </div>

          {/* Center Brand & Title State */}
          <div className="my-auto max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#2DD4BF] text-xs sm:text-sm tracking-[0.35em] uppercase font-mono mb-4 flex items-center gap-2"
            >
              <span className="inline-block w-4 h-[1px] bg-[#2DD4BF]" />
              Formula Activation Sequence
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]"
            >
              STABILIZING <br />
              <span className="text-gradient-teal">AMINO GEL MATRIX...</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-sm sm:text-base text-[#8FAEA8] max-w-lg font-light leading-relaxed"
            >
              Calibrating high-resolution scrollytelling frames, succinic acid actives, and 15 biomimetic amino acids for optimal barrier recovery.
            </motion.p>
          </div>

          {/* Bottom Progress Counter & Laser Bar */}
          <div className="space-y-4">
            <div className="flex items-end justify-between font-mono">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs text-[#8FAEA8] uppercase tracking-widest block">
                  Frame Buffer Status
                </span>
                <span className="text-xs text-[#2DD4BF] tracking-wider">
                  {displayProgress === 100
                    ? "RESTORING ACID MANTLE — READY"
                    : `CACHING HIGH-PERFORMANCE ASSETS (${Math.min(240, Math.round((displayProgress / 100) * 240))}/240)`}
                </span>
              </div>

              {/* Huge Monospace Percentage Counter */}
              <div className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tighter">
                {String(displayProgress).padStart(3, "0")}
                <span className="text-lg sm:text-2xl text-[#2DD4BF] ml-1">%</span>
              </div>
            </div>

            {/* Glowing Laser Progress Line */}
            <div className="relative w-full h-[3px] bg-[#1E4A44] rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#10B981] via-[#2DD4BF] to-[#38BDF8]"
                style={{ width: `${displayProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Glowing leading tip */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#2DD4BF] rounded-full blur-[4px] pointer-events-none"
                style={{ left: `calc(${displayProgress}% - 8px)` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
