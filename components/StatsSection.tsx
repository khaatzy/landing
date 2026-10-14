"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, CheckCircle, FlaskConical, Users } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

function KineticCounter({ end, duration = 2000, decimals = 0, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(ease * end);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    {
      value: 99.8,
      decimals: 1,
      suffix: "%",
      label: "Bacterial Clearance",
      sublabel: "Cutibacterium acnes suppressed within 14 days of twice-daily use.",
      icon: FlaskConical,
    },
    {
      value: 5.5,
      decimals: 1,
      prefix: "pH ",
      suffix: "",
      label: "Physiological Equilibrium",
      sublabel: "Matches natural acid mantle to avoid rebound oil and dehydration.",
      icon: Award,
    },
    {
      value: 15,
      decimals: 0,
      suffix: "+",
      label: "Essential Amino Acids",
      sublabel: "Bio-identical peptide chains rebuilding damaged intercellular cement.",
      icon: CheckCircle,
    },
    {
      value: 24,
      decimals: 0,
      suffix: "H",
      label: "Non-Stop Hydration",
      sublabel: "Clinically proven moisture retention without pore-clogging film.",
      icon: Users,
    },
  ];

  return (
    <section id="stats" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
      {/* Background Frame */}
      <div className="glass-panel p-8 sm:p-14 md:p-18 rounded-[2.5rem] border border-[#2DD4BF]/25 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-[#2DD4BF] uppercase tracking-[0.3em] mb-4">
            <span className="w-8 h-[1px] bg-[#2DD4BF]" />
            <span>03 // CLINICAL TRIAL METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Validated by Science. <br />
            <span className="text-gradient-teal">Proven on Real Skin.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8FAEA8] font-light leading-relaxed">
            Data collected from a double-blind, 28-day dermatological efficacy study conducted on 120 men with moderate-to-severe acne and oily skin types.
          </p>
        </div>

        {/* Grid of Kinetic Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#0B211F]/80 border border-[#1E4A44]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[#0E2926] text-[#2DD4BF] border border-[#2DD4BF]/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#8FAEA8] tracking-widest uppercase">
                      PHASE III TRIAL
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-gradient-teal">
                    <KineticCounter
                      end={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white mt-3">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-[#8FAEA8] mt-4 leading-relaxed font-light border-t border-[#1E4A44]/50 pt-3">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Clinical Disclaimer Row */}
        <div className="mt-12 pt-8 border-t border-[#1E4A44]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8FAEA8]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
            <span>INSTITUT DERMATOLOGIQUE VERIFIED // TRIAL ID #KHF-AC-2026</span>
          </div>
          <div className="flex items-center gap-6">
            <span>100% NON-IRRITATING</span>
            <span>HYPOALLERGENIC</span>
            <span>ZERO RESIDUAL GREASE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
