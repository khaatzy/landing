"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldAlert, Droplets, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.3, 1]);
  const highlightWords = useTransform(scrollYProgress, [0.2, 0.45], [0.4, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 sm:py-36 md:py-44 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto text-[#ECFDF5]"
    >
      {/* Top Section Tag */}
      <div className="flex items-center gap-3 font-mono text-xs text-[#2DD4BF] uppercase tracking-[0.3em] mb-8">
        <span className="w-8 h-[1px] bg-[#2DD4BF]" />
        <span>01 // THE BIOMIMETIC REVOLUTION</span>
      </div>

      {/* Main Editorial Text Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Big Statement */}
        <div className="lg:col-span-7">
          <motion.h2
            style={{ opacity: headlineOpacity }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]"
          >
            Traditional cleansers strip your skin. <br />
            <span className="text-gradient-teal">
              AminoGel fortifies your natural acid mantle.
            </span>
          </motion.h2>

          <motion.div
            style={{ opacity: highlightWords }}
            className="mt-8 space-y-6 text-base sm:text-xl text-[#8FAEA8] font-light leading-relaxed"
          >
            <p>
              Most conventional facial cleansers rely on alkaline sulfates with high pH levels (8.0 - 10.0). They deliver an aggressive squeaky-clean sensation by demolishing the skin’s protective lipid barrier — triggering rebound oil production and chronic acne inflammation.
            </p>
            <p>
              <strong className="text-white font-medium">Kahf Acne Care AminoGel</strong> fundamentally re-engineers daily facial hygiene. Formulated at the human skin’s physiological sweet spot of <span className="text-[#2DD4BF] font-mono font-medium">pH 5.5</span>, it employs <strong className="text-white font-medium">15 biomimetic amino acids</strong> and clinical <strong className="text-white font-medium">Succinic Acid</strong> to neutralize acne pathogens without a trace of tightness.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Comparison Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#2DD4BF]/20 relative overflow-hidden">
            <div className="text-xs uppercase font-mono tracking-widest text-[#2DD4BF] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
              <span>THE BARRIER MECHANISM</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#081816]/70 border border-[#1E4A44]/60">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Standard Harsh Cleansers</span>
                </div>
                <p className="text-xs text-[#8FAEA8] leading-relaxed">
                  pH 8.5+ alkaline shock strips ceramides. Pores enlarge, bacteria spreads, and face overproduces grease within 2 hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0E2926] border border-[#2DD4BF]/40 shadow-[0_0_25px_rgba(45,212,191,0.1)]">
                <div className="flex items-center gap-2 text-[#2DD4BF] font-mono text-xs uppercase mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Kahf Acne Care AminoGel</span>
                </div>
                <p className="text-xs text-[#ECFDF5] leading-relaxed">
                  Exact pH 5.5 micro-foam cushion preserves acid mantle, eliminates 99.8% of acne bacteria, and leaves skin supple for 24h.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E4A44]/60 flex items-center justify-between text-[11px] font-mono text-[#8FAEA8]">
              <span>HALAL CERTIFIED</span>
              <span>100% SOAP-FREE</span>
              <span>NON-COMEDOGENIC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
