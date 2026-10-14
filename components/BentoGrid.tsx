"use client";

import { motion } from "framer-motion";
import { Sparkles, Dna, ShieldCheck, Flame, Leaf, Wind } from "lucide-react";

export default function BentoGrid() {
  const cards = [
    {
      title: "15 Biomimetic Amino Complex",
      tag: "CORE MATRIX // 64% NMF RECOVERY",
      colSpan: "lg:col-span-8",
      description:
        "15 skin-identical amino acids (Arginine, Glycine, Serine, Lysine, Glutamic Acid, etc.) synthesize directly into the intercellular cement, repairing micro-tears from shaving and urban pollution.",
      icon: Dna,
      badge: "BIOLOGICAL EQUILIBRIUM",
      accent: "from-[#2DD4BF]/20 via-[#14B8A6]/10 to-transparent",
      stat: "15",
      statLabel: "Targeted Amino Chains",
    },
    {
      title: "Pure Succinic Acid",
      tag: "MICROBIAL SHIELD",
      colSpan: "lg:col-span-4",
      description:
        "Gentler than aggressive Salicylic acid. Selectively inhibits Cutibacterium acnes biofilm without peeling or redness.",
      icon: ShieldCheck,
      badge: "CLINICAL GRADE",
      accent: "from-[#10B981]/20 via-[#059669]/10 to-transparent",
      stat: "2.4x",
      statLabel: "Faster Blemish Recovery",
    },
    {
      title: "Zinc PCA & Tea Tree",
      tag: "SEBUM REGULATOR",
      colSpan: "lg:col-span-4",
      description:
        "Normalizes hyper-active sebaceous glands caused by testosterone and heat, maintaining a natural matte finish all day.",
      icon: Flame,
      badge: "MATTE COMFORT",
      accent: "from-[#06B6D4]/20 to-transparent",
      stat: "84%",
      statLabel: "Sebum Reduction in 4h",
    },
    {
      title: "Korean Centella Asiatica (Cica)",
      tag: "INSTANT ERYTHEMA RELIEF",
      colSpan: "lg:col-span-4",
      description:
        "High-purity Madecassoside accelerates epidermal restoration, cooling irritated post-workout skin and razor irritation.",
      icon: Leaf,
      badge: "SOOTHING SHIELD",
      accent: "from-[#2DD4BF]/20 to-transparent",
      stat: "< 10min",
      statLabel: "To Neutralize Redness",
    },
    {
      title: "Hydro-Balance Micro-Foam Cushion",
      tag: "FRICTIONLESS CLEANSING",
      colSpan: "lg:col-span-4",
      description:
        "Generates microscopic dense bubbles that absorb impurities through gentle capillary action, eliminating mechanical friction.",
      icon: Wind,
      badge: "ZERO FRICTION",
      accent: "from-[#38BDF8]/20 to-transparent",
      stat: "100%",
      statLabel: "Zero Harsh Sulfates",
    },
  ];

  return (
    <section id="ingredients" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#2DD4BF] uppercase tracking-[0.3em] mb-4">
            <span className="w-8 h-[1px] bg-[#2DD4BF]" />
            <span>02 // THE FORMULATION BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Molecular Precision. <br />
            <span className="text-gradient-teal">Clean Biological Performance.</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#8FAEA8] max-w-md font-light leading-relaxed">
          Every active ingredient in Kahf Acne Care AminoGel is dosed at clinical efficacy thresholds to repair, protect, and refine male skin.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between glass-panel-hover group ${card.colSpan}`}
            >
              {/* Card Radial Gradient Ambient Effect */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${card.accent} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B211F] border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-[#2DD4BF] uppercase px-3 py-1 rounded-full bg-[#1E4A44]/40 border border-[#2DD4BF]/20">
                    {card.badge}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#8FAEA8] uppercase tracking-wider mb-2">
                  {card.tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[#8FAEA8] leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {/* Bottom Stat Callout */}
              <div className="mt-8 pt-6 border-t border-[#1E4A44]/60 flex items-baseline justify-between">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#2DD4BF] transition-colors">
                    {card.stat}
                  </div>
                  <div className="text-xs font-mono text-[#8FAEA8] mt-1">
                    {card.statLabel}
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-[#2DD4BF]/40 group-hover:text-[#2DD4BF] transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
