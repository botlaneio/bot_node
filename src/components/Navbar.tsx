import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BotlaneLogo } from './BotlaneLogo';

interface NavbarProps {
  onOpenBooking: () => void;
  availableSlots?: number;
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, availableSlots = 1, logoUrl }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E5E5E0] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Brand (Left) */}
        <div className="flex-1 flex justify-start">
          <a href="#" className="inline-flex items-center gap-1.5 text-zinc-900 group">
            {logoUrl ? (
              <img src={logoUrl} alt="Botlane" className="h-7 w-auto object-contain" />
            ) : (
              <>
                <BotlaneLogo size={20} theme="light" showSquircle={false} className="group-hover:scale-105 transition-transform duration-200" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold tracking-tight text-zinc-950 leading-none">
                  Botlane
                </span>
              </>
            )}
          </a>
        </div>

        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">
            How it works
          </a>
          <a href="#signals" className="hover:text-zinc-950 transition-colors">
            The Signals
          </a>
          <a href="#pricing" className="hover:text-zinc-950 transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-zinc-950 transition-colors">
            FAQ
          </a>
        </nav>

        {/* CTA (Right) */}
        <div className="flex-1 hidden md:flex justify-end items-center">
          <button
            onClick={onOpenBooking}
            className="rounded-lg bg-zinc-950 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 transition-all shadow-xs"
          >
            Check availability
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-700 hover:text-zinc-950 rounded-lg"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBFBFA] border-b border-[#E5E5E0] px-6 py-5 space-y-4">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            How it works
          </a>
          <a
            href="#signals"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            The Signals
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            FAQ
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 rounded-lg bg-zinc-950 text-white font-medium text-xs"
            >
              Check availability
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
