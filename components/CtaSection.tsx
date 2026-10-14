"use client";

import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";

interface CtaSectionProps {
  onOpenCart?: () => void;
  onAddToCart?: (bundle: string) => void;
}

export default function CtaSection({ onOpenCart, onAddToCart }: CtaSectionProps) {
  const handleSelectBundle = (name: string) => {
    onAddToCart?.(name);
    onOpenCart?.();
  };

  return (
    <section id="shop" className="relative py-28 sm:py-36 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto overflow-hidden">
      {/* Animated Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#2DD4BF]/15 via-[#14B8A6]/10 to-[#10B981]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E4A44]/60 border border-[#2DD4BF]/30 text-xs font-mono text-[#2DD4BF] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
          <span>OFFICIAL PRODUCT BATCH RELEASE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Upgrade Your Grooming Routine. <br />
          <span className="text-gradient-teal">Claim Clear Skin Confidence.</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#8FAEA8] font-light leading-relaxed">
          Engineered for daily resilience against acne, sweat, and urban grit. Zero harsh sulfates, pure biomimetic amino gel.
        </p>
      </div>

      {/* Purchasing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
        {/* Package 1: Single Cleanser */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#1E4A44] flex flex-col justify-between glass-panel-hover">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-widest text-[#8FAEA8] uppercase">
                STANDARD SUPPLY
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1E4A44]/40 text-xs font-mono text-[#2DD4BF]">
                100ml PURE GEL
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">Acne Care AminoGel</h3>
            <p className="mt-2 text-sm text-[#8FAEA8]">
              Single bottle supply. Optimal 60-day morning and night routine.
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">$24</span>
              <span className="text-xs font-mono text-[#8FAEA8]">USD / Rp 48.000</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs sm:text-sm text-[#ECFDF5]/80 font-light">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> 1x Acne Care AminoGel (100ml)
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> Low pH 5.5 Acid Mantle Formula
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> 15 Biomimetic Amino Acids & Succinic Acid
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> 30-Day Pure Skin Money-Back Guarantee
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectBundle("Single Supply")}
            className="mt-8 w-full py-4 rounded-2xl bg-[#0E2926] border border-[#2DD4BF]/40 text-[#ECFDF5] hover:bg-[#1E4A44] hover:text-[#2DD4BF] transition-all text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#2DD4BF]" />
            <span>ADD TO BAG</span>
          </button>
        </div>

        {/* Package 2: Tri-Active Defense Bundle (Recommended) */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-[#2DD4BF] relative flex flex-col justify-between shadow-[0_0_50px_rgba(45,212,191,0.2)] bg-gradient-to-b from-[#123330] via-[#0E2926] to-[#0B211F]">
          {/* Top highlight ribbon */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] text-[#0B211F] text-[11px] font-mono font-bold tracking-widest uppercase shadow-md">
            MOST POPULAR • SAVE 20%
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="text-xs font-mono tracking-widest text-[#2DD4BF] uppercase">
                TRI-ACTIVE PROTOCOL
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2DD4BF]/20 text-xs font-mono text-[#2DD4BF] font-bold">
                3x 100ml BUNDLE
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">Full Defense Protocol</h3>
            <p className="mt-2 text-sm text-[#8FAEA8]">
              Comprehensive 6-month barrier transformation bundle + complimentary micro-fiber cloth.
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white text-gradient-teal">$58</span>
              <span className="text-xs font-mono text-[#8FAEA8] line-through">$72 USD</span>
              <span className="text-xs font-mono text-[#2DD4BF]">SAVE $14</span>
            </div>

            <ul className="mt-8 space-y-3 text-xs sm:text-sm text-white font-light">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> 3x Acne Care AminoGel (300ml total)
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> Free Kahf Microfiber Grooming Towel ($15 Value)
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> Priority Express Worldwide Delivery
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2DD4BF]" /> 100% Risk-Free 30-Day Refund Guarantee
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectBundle("Tri-Active Protocol")}
            className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[#2DD4BF] via-[#14B8A6] to-[#0D9488] text-[#0B211F] hover:shadow-[0_0_35px_rgba(45,212,191,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#0B211F]" />
            <span>CLAIM TRI-ACTIVE PROTOCOL</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center font-mono text-xs text-[#8FAEA8] relative z-10">
        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0B211F]/60 border border-[#1E4A44]">
          <Truck className="w-5 h-5 text-[#2DD4BF]" />
          <span className="text-white font-semibold">FREE EXPRESS DISPATCH</span>
          <span>Shipped in 24 hours in insulated protective packaging.</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0B211F]/60 border border-[#1E4A44]">
          <RotateCcw className="w-5 h-5 text-[#2DD4BF]" />
          <span className="text-white font-semibold">30-DAY SATISFACTION</span>
          <span>Love your skin transformation or receive a 100% full refund.</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0B211F]/60 border border-[#1E4A44]">
          <ShieldCheck className="w-5 h-5 text-[#2DD4BF]" />
          <span className="text-white font-semibold">HALAL & VEGAN</span>
          <span>Certified pure ethics with cruelty-free formulation.</span>
        </div>
      </div>
    </section>
  );
}
