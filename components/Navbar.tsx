"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Volume2, VolumeX, Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenCart?: () => void;
  cartCount?: number;
}

export default function Navbar({ onOpenCart, cartCount = 1 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillatorNodes, setOscillatorNodes] = useState<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ambient sound synthesizer using native Web Audio API (no external sound files required)
  const toggleAmbientAudio = () => {
    try {
      if (!isPlayingSound) {
        const ctx = audioCtx || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        if (ctx.state === "suspended") {
          ctx.resume();
        }
        setAudioCtx(ctx);

        // Gentle sub-bass ocean breeze drone
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm resonance
        gain1.gain.setValueAtTime(0.04, ctx.currentTime);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();

        // High shimmer chord
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(440, ctx.currentTime);
        gain2.gain.setValueAtTime(0.015, ctx.currentTime);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();

        setOscillatorNodes([
          { osc: osc1, gain: gain1 },
          { osc: osc2, gain: gain2 },
        ]);
        setIsPlayingSound(true);
      } else {
        oscillatorNodes.forEach(({ osc, gain }) => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.0001, (audioCtx?.currentTime || 0) + 0.5);
            setTimeout(() => osc.stop(), 500);
          } catch {
            osc.stop();
          }
        });
        setOscillatorNodes([]);
        setIsPlayingSound(false);
      }
    } catch (e) {
      console.log("Audio toggle error:", e);
      setIsPlayingSound(!isPlayingSound);
    }
  };

  const navLinks = [
    { name: "Experience", href: "#hero-sequence" },
    { name: "The Formula", href: "#about" },
    { name: "Bio-Actives", href: "#ingredients" },
    { name: "Clinical Data", href: "#stats" },
    { name: "Reviews", href: "#testimonials" },
  ];

  return (
    <>
      <header
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-panel py-3 px-5 sm:px-8 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-[#2DD4BF]/30"
            : "bg-transparent py-4 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-1.5 group select-none"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tighter text-white group-hover:text-[#2DD4BF] transition-colors">
              KAHF
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1E4A44] text-[#2DD4BF] border border-[#2DD4BF]/30 font-semibold tracking-wider">
              MAN
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.2em] uppercase text-[#8FAEA8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#2DD4BF] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2DD4BF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Equalizer Toggle */}
            <button
              onClick={toggleAmbientAudio}
              title={isPlayingSound ? "Mute Ambient Synth" : "Enable Ambient Atmosphere"}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#0E2926]/80 hover:bg-[#1E4A44] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center gap-2 text-xs font-mono transition-all"
            >
              {isPlayingSound ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#2DD4BF]" />
                  <span className="hidden sm:inline text-[11px] uppercase tracking-wider">SOUND ON</span>
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-[#2DD4BF] animate-bounce" />
                    <span className="w-0.5 h-3 bg-[#2DD4BF] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-0.5 h-1.5 bg-[#2DD4BF] animate-bounce [animation-delay:0.3s]" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#8FAEA8]" />
                  <span className="hidden sm:inline text-[11px] text-[#8FAEA8] uppercase tracking-wider">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Shopping Bag Pill Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] text-[#0B211F] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#0B211F]" />
              <span>BAG ({cartCount})</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-[#0E2926] border border-[#1E4A44] text-white hover:text-[#2DD4BF] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Responsive Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#0B211F]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            {/* Nav links */}
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#2DD4BF]">
                NAVIGATION DIRECTORY
              </span>

              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="text-3xl font-bold tracking-tight text-white hover:text-[#2DD4BF] transition-colors flex items-center justify-between border-b border-[#1E4A44]/40 pb-3"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-5 h-5 text-[#2DD4BF]" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Menu Info */}
            <div className="pt-6 border-t border-[#1E4A44]/60 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8FAEA8]">
                <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
                <span>CLINICALLY PROVEN 5.5 pH ACID MANTLE CARE</span>
              </div>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenCart?.();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] text-[#0B211F] font-bold text-center tracking-wide uppercase shadow-lg"
              >
                ORDER ACNE CARE AMINOGEL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
