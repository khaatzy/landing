"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import BentoGrid from "@/components/BentoGrid";
import StatsSection from "@/components/StatsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState("Tri-Active Protocol");

  const handleSequenceLoaded = () => {
    // Keep 100% visible for a moment then unveil smoothly
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const handleOpenCart = (bundleName?: string) => {
    if (bundleName) {
      setSelectedBundle(bundleName);
    }
    setIsCartOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#0B211F] text-[#ECFDF5] overflow-x-clip">
      {/* Awwwards-level Preloader */}
      <Preloader progress={preloadProgress} isLoading={isLoading} />

      {/* Floating Glassmorphic Navigation */}
      <Navbar onOpenCart={() => handleOpenCart()} cartCount={1} />

      {/* Hero Sticky Canvas Scrollytelling Section (400vh) */}
      <SequenceScroll
        onProgress={setPreloadProgress}
        onLoaded={handleSequenceLoaded}
        onOpenCart={() => handleOpenCart("Tri-Active Protocol")}
      />

      {/* Smoothly closing the hero section with -mt-[100vh] relative z-10 */}
      <div className="-mt-[100vh] relative z-10 bg-[#0B211F] shadow-[0_-30px_60px_rgba(11,33,31,0.95)]">
        {/* Subtle decorative top transition gradient line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent" />

        {/* 01. About Section (Scroll text reveal) */}
        <AboutSection />

        {/* 02. Bento Grid (Ingredients & Technology) */}
        <BentoGrid />

        {/* 03. Stats Section (Kinetic Count-up) */}
        <StatsSection />

        {/* 04. Testimonial Section (Fullscreen Slider) */}
        <TestimonialSection />

        {/* 05. CTA Section (Animated background & packages) */}
        <CtaSection
          onOpenCart={() => handleOpenCart()}
          onAddToCart={(bundle) => setSelectedBundle(bundle)}
        />

        {/* 06. Luxury Editorial Brand Footer */}
        <Footer />
      </div>

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedBundle={selectedBundle}
      />
    </main>
  );
}
