"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle, ShieldCheck } from "lucide-react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Julian Vance, MD",
      role: "Board-Certified Dermatologist & Clinical Researcher",
      location: "London, UK",
      avatar: "JV",
      skinType: "Clinical Assessment",
      quote:
        "For male patients fighting chronic breakouts, traditional cleansers always cause more harm than good by triggering alkaline barrier collapse. Kahf’s 5.5 pH AminoGel with pure Succinic Acid provides the exact antimicrobial suppression needed without disrupting the acid mantle.",
      highlight: "The holy grail for male acne without stripping.",
      metric: "98% Clinical Efficacy",
    },
    {
      name: "Marcus Sterling",
      role: "Hybrid Athlete & Performance Coach",
      location: "Sydney, Australia",
      avatar: "MS",
      skinType: "Oily & Sweat-Prone",
      quote:
        "Training twice a day in humid heat used to mean stubborn chin and forehead cysts. AminoGel dissolves grime and gym sweat in 30 seconds without that tight, cracked feeling. My skin has never looked cleaner or calmer.",
      highlight: "Cleared stubborn gym breakouts in 10 days.",
      metric: "Zero Post-Wash Tightness",
    },
    {
      name: "Kenji Takahashi",
      role: "Architectural Designer",
      location: "Tokyo, Japan",
      avatar: "KT",
      skinType: "Sensitive Combination",
      quote:
        "The micro-foam cushion is extraordinary. It feels like a high-end luxury gel serum that effortlessly emulsifies into dense micro-bubbles. Redness around my nose and cheeks was gone within the first week.",
      highlight: "Micro-foam texture is unparalleled luxury.",
      metric: "100% Redness Relief",
    },
    {
      name: "David Chen",
      role: "Tech Founder & Daily Grooming Enthusiast",
      location: "San Francisco, USA",
      avatar: "DC",
      skinType: "Acne-Prone & Shave Irritation",
      quote:
        "I was skeptical of yet another cleanser, but the amino acid formulation is noticeably different. Zero stinging even right after a fresh razor shave. It has completely replaced every other face wash in my cabinet.",
      highlight: "Replaced my entire skincare cabinet.",
      metric: "14 Days to Complete Clarity",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-36 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#2DD4BF] uppercase tracking-[0.3em] mb-4">
            <span className="w-8 h-[1px] bg-[#2DD4BF]" />
            <span>04 // CLINICAL TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Endorsed by Dermatologists. <br />
            <span className="text-gradient-teal">Trusted by Demanding Men.</span>
          </h2>
        </div>

        {/* Carousel Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-12 h-12 rounded-full glass-panel hover:bg-[#1E4A44] border border-[#2DD4BF]/30 flex items-center justify-center text-white hover:text-[#2DD4BF] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next review"
            className="w-12 h-12 rounded-full glass-panel hover:bg-[#1E4A44] border border-[#2DD4BF]/30 flex items-center justify-center text-white hover:text-[#2DD4BF] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Fullscreen Slider Card */}
      <div className="relative glass-panel rounded-[2.5rem] p-8 sm:p-14 md:p-16 border border-[#2DD4BF]/30 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
        {/* Ambient background glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between h-full space-y-8"
          >
            {/* Top row: Star rating + Highlight Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1 text-[#2DD4BF]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#2DD4BF]" />
                ))}
                <span className="text-xs font-mono ml-2 text-[#8FAEA8]">
                  VERIFIED CLINICAL TRIAL
                </span>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-[#1E4A44]/60 border border-[#2DD4BF]/40 text-xs font-mono text-[#2DD4BF] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{current.metric}</span>
              </div>
            </div>

            {/* Big quote statement */}
            <div className="relative">
              <Quote className="w-12 h-12 text-[#2DD4BF]/15 absolute -top-6 -left-6 pointer-events-none" />
              <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed">
                “{current.quote}”
              </blockquote>
            </div>

            {/* Author info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1E4A44]/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] text-[#0B211F] font-bold text-sm flex items-center justify-center font-mono">
                  {current.avatar}
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{current.name}</span>
                    <CheckCircle className="w-4 h-4 text-[#2DD4BF]" />
                  </div>
                  <div className="text-xs text-[#8FAEA8] font-mono">
                    {current.role} • {current.location}
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0B211F] border border-[#1E4A44] text-[#8FAEA8]">
                SKIN PROFILE: <span className="text-white">{current.skinType}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "w-8 bg-[#2DD4BF]"
                  : "w-2 bg-[#1E4A44] hover:bg-[#8FAEA8]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
