import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BotlaneLogo } from './BotlaneLogo';

interface MinimalNavbarProps {
  onOpenBooking: () => void;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onSystems = pathname.startsWith('/systems');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Section links live on the landing page. If we are already there, scroll.
   * If not, route home with the hash so ScrollManager handles it on arrival.
   */
  const handleSection = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (pathname === '/') {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/${hash}`);
    }
  };

  const sectionClass = (active: boolean) =>
    `text-sm font-medium transition-colors hover:text-[#0d0d0d] ${
      active ? 'text-[#6b6b68]' : 'text-[#9a9a96]'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 border-b ${
        scrolled
          ? 'border-[#e3e3e0] bg-[#f2f2f0]/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-8">
          {/* Brand Logo */}
          <Link
            aria-label="Botlane home"
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="inline-flex items-center gap-1.5 text-[#2c2c2a]">
              <BotlaneLogo size={20} theme="light" showSquircle={false} />
              <span className="text-sm font-bold tracking-tight leading-none">
                Botlane
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <a
                className={sectionClass(pathname === '/')}
                href="/#features"
                onClick={(e) => handleSection(e, '#features')}
              >
                Features
              </a>
            </li>
            <li>
              <a
                className={sectionClass(pathname === '/')}
                href="/#how-it-works"
                onClick={(e) => handleSection(e, '#how-it-works')}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                className={sectionClass(pathname === '/')}
                href="/#pricing"
                onClick={(e) => handleSection(e, '#pricing')}
              >
                Pricing
              </a>
            </li>
            <li>
              <Link
                className={`text-sm font-medium transition-colors hover:text-[#0d0d0d] ${
                  onSystems ? 'text-[#0d0d0d]' : 'text-[#6b6b68]'
                }`}
                to="/systems"
                aria-current={onSystems ? 'page' : undefined}
              >
                Our Systems
              </Link>
            </li>
          </ul>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="hidden h-9 items-center rounded-[var(--radius-control)] bg-[#0a0a0a] px-4 text-[0.8125rem] font-medium text-[#fafafa] transition-colors hover:bg-[#242424] sm:inline-flex"
            >
              Get the list
            </button>
            
            {/* Mobile Nav Trigger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid size-9 place-items-center rounded-[var(--radius-control)] border border-[#e3e3e0] text-[#0d0d0d] md:hidden"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#e3e3e0] bg-[#f2f2f0] md:hidden">
          <div className="max-w-[1180px] mx-auto px-5 flex flex-col py-2">
            <a
              className="text-sm font-medium border-b border-[#e3e3e0] py-4 text-[#6b6b68] hover:text-[#0d0d0d] transition-colors"
              href="/#features"
              onClick={(e) => handleSection(e, '#features')}
            >
              Features
            </a>
            <a
              className="text-sm font-medium border-b border-[#e3e3e0] py-4 text-[#6b6b68] hover:text-[#0d0d0d] transition-colors"
              href="/#how-it-works"
              onClick={(e) => handleSection(e, '#how-it-works')}
            >
              How It Works
            </a>
            <a
              className="text-sm font-medium border-b border-[#e3e3e0] py-4 text-[#6b6b68] hover:text-[#0d0d0d] transition-colors"
              href="/#pricing"
              onClick={(e) => handleSection(e, '#pricing')}
            >
              Pricing
            </a>
            <Link
              className={`text-sm font-medium border-b border-[#e3e3e0] py-4 hover:text-[#0d0d0d] transition-colors ${
                onSystems ? 'text-[#0d0d0d]' : 'text-[#6b6b68]'
              }`}
              to="/systems"
              onClick={() => setMobileOpen(false)}
            >
              Our Systems
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="mt-3 mb-2 inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-[#0a0a0a] text-sm font-medium text-[#fafafa]"
            >
              Get the list
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
