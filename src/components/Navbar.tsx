import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      id="main-nav"
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-12 h-20 border-b flex items-center",
        isScrolled ? "bg-white/90 backdrop-blur-lg border-slate-200 shadow-sm" : "bg-white border-slate-100"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group" id="logo">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900">
            BOREAL<span className="font-light opacity-40 ml-1 text-slate-600">LABS</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
          <a href="#" className="text-slate-900 hover:text-emerald-600 transition-colors">Shop Peptides</a>
          <a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Lab Reports</a>
          <a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">Research</a>
          <a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors">About Us</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-emerald-600 font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SHIPPING NATIONWIDE
          </div>
          <button id="auth-btn" className="px-5 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-emerald-600 transition-all">
            Account
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-white border-b border-gray-200 p-6 flex flex-col gap-4 lg:hidden shadow-xl"
          >
            <a href="#" className="font-medium text-lg py-2 border-b border-gray-50">Shop</a>
            <a href="#" className="font-medium text-lg py-2 border-b border-gray-50">Learn</a>
            <a href="#" className="font-medium text-lg py-2 border-b border-gray-50">Calculator</a>
            <a href="#" className="font-medium text-lg py-2">Support</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ label, hasDropdown }: { label: string; hasDropdown?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors group">
      {label}
      {hasDropdown && (
        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
      )}
    </a>
  );
}
