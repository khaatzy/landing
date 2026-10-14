"use client";

import { useState } from "react";
import { ArrowUp, ArrowRight, ShieldCheck, Heart, Sparkles, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1E4A44]/60 bg-[#081816] text-[#ECFDF5] pt-20 pb-12 px-6 sm:px-12 md:px-20 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1E4A44]/50">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tighter text-white">
                KAHF
              </span>
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-[#1E4A44] text-[#2DD4BF] border border-[#2DD4BF]/30 font-semibold tracking-wider">
                MAN
              </span>
            </div>

            <p className="text-sm text-[#8FAEA8] max-w-sm leading-relaxed font-light">
              Engineered for the modern man who refuses to compromise between uncompromising biological performance and natural authenticity. Low pH 5.5 derm-care.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#8FAEA8]">
              <span className="flex items-center gap-1.5 text-[#2DD4BF]">
                <ShieldCheck className="w-4 h-4" /> Halal Certified
              </span>
              <span className="flex items-center gap-1.5 text-[#2DD4BF]">
                <Sparkles className="w-4 h-4" /> Cruelty-Free
              </span>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#2DD4BF]">
              THE PRODUCT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8FAEA8]">
              <li>
                <a href="#hero-sequence" className="hover:text-[#2DD4BF] transition-colors">
                  AminoGel Experience
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#2DD4BF] transition-colors">
                  The pH 5.5 Formula
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-[#2DD4BF] transition-colors">
                  15 Amino Complexes
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-[#2DD4BF] transition-colors">
                  Clinical Trial Data
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#2DD4BF] transition-colors">
                  Order Online
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#2DD4BF]">
              SCIENCE & ETHICS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8FAEA8]">
              <li>
                <span className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
                  Acid Mantle Research
                </span>
              </li>
              <li>
                <span className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
                  Succinic Acid vs BHA
                </span>
              </li>
              <li>
                <span className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
                  Dermatologist Seal
                </span>
              </li>
              <li>
                <span className="hover:text-[#2DD4BF] transition-colors cursor-pointer">
                  Sustainable Packaging
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#2DD4BF]">
              DERM-LAB DISPATCH
            </h4>
            <p className="text-xs text-[#8FAEA8] leading-relaxed">
              Receive clinical breakthroughs, seasonal skin adaptation guides, and priority access to limited batch releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0B211F] border border-[#1E4A44] text-xs text-white placeholder-[#8FAEA8]/60 focus:outline-none focus:border-[#2DD4BF] transition-colors pr-10 font-mono"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#1E4A44] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-[#0B211F] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isSubscribed && (
                <div className="text-[11px] font-mono text-[#2DD4BF] flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Derm-Lab Dispatch. Welcome.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8FAEA8]">
          <div>
            © {new Date().getFullYear()} KAHF MAN RESEARCH LABS. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[#2DD4BF] hover:text-white transition-colors cursor-pointer"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
