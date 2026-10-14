"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight, Check } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBundle?: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  selectedBundle = "Tri-Active Protocol",
}: CartDrawerProps) {
  const isTriActive = selectedBundle.includes("Tri-Active");
  const price = isTriActive ? 58 : 24;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] z-50 bg-[#0E2926] border-l border-[#2DD4BF]/30 shadow-2xl flex flex-col justify-between p-6 sm:p-8 text-[#ECFDF5]"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1E4A44]/60">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#2DD4BF]" />
                  <span className="font-bold text-lg text-white">YOUR GROOMING BAG</span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close cart"
                  className="p-2 rounded-full hover:bg-[#1E4A44] text-[#8FAEA8] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="mt-4 p-3 rounded-xl bg-[#0B211F] border border-[#1E4A44] text-xs font-mono">
                <div className="flex items-center gap-2 text-[#2DD4BF]">
                  <Truck className="w-4 h-4" />
                  <span>FREE EXPEDITED WORLDWIDE SHIPPING UNLOCKED</span>
                </div>
              </div>

              {/* Cart Item Card */}
              <div className="mt-6 p-4 rounded-2xl bg-[#0B211F]/80 border border-[#2DD4BF]/20 flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl bg-[#123330] border border-[#1E4A44] flex items-center justify-center text-xs font-mono text-[#2DD4BF] text-center p-1 font-bold">
                  KAHF
                  <br />
                  5.5 pH
                </div>

                <div className="flex-1">
                  <div className="text-sm font-bold text-white">
                    {isTriActive ? "Tri-Active Defense Protocol" : "Acne Care AminoGel (100ml)"}
                  </div>
                  <div className="text-xs text-[#8FAEA8] font-mono mt-0.5">
                    {isTriActive ? "3x 100ml + Microfiber Towel" : "Standard Single Supply"}
                  </div>
                  <div className="text-sm font-extrabold text-[#2DD4BF] font-mono mt-1">
                    ${price}.00 USD
                  </div>
                </div>
              </div>

              {/* Clinical Perks */}
              <div className="mt-6 space-y-2 text-xs text-[#8FAEA8] font-light">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Batch #KHF-2026 Fresh Laboratory Dispense</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>30-Day Pure Skin Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Halal Certified & Cruelty-Free</span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout CTA */}
            <div className="pt-6 border-t border-[#1E4A44]/60 space-y-4">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-[#8FAEA8]">SUBTOTAL:</span>
                <span className="text-xl font-bold text-white">${price}.00 USD</span>
              </div>

              <button
                onClick={() => {
                  alert(`Thank you for choosing Kahf Man! Order confirmed for ${selectedBundle} ($${price} USD). Instant tracking will be dispatched to your email.`);
                  onClose();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2DD4BF] via-[#14B8A6] to-[#0D9488] text-[#0B211F] font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-[#8FAEA8]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#2DD4BF]" /> 256-BIT ENCRYPTION
                </span>
                <span>•</span>
                <span>APPLE PAY & GOOGLE PAY ACCEPTED</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
