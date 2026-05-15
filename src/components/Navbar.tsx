import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useCart } from '../lib/CartContext';

const NAV_LINKS = [
  { label: 'Products', path: '/products' },
  { label: 'Lab Results', path: '/lab-results' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[60] bg-emerald-600 text-white h-8 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex items-center w-max">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="mx-6 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-6">
              FREE SHIPPING ON ORDERS OVER $300
              <span className="opacity-50">•</span>
            </span>
          ))}
        </div>
      </div>
      <header 
        id="main-nav"
        className={cn(
          "fixed top-8 inset-x-0 z-50 transition-all duration-300 px-6 lg:px-12 h-20 border-b flex items-center",
          isScrolled ? "bg-white/90 backdrop-blur-lg border-slate-200 shadow-sm" : "bg-white border-slate-100"
        )}
      >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" id="logo">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900">
            BOREAL<span className="font-light opacity-40 ml-1 text-slate-600">LABS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-bold">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 rounded-sm transition-all duration-300",
                  isActive
                    ? "text-emerald-600 border border-emerald-500 bg-emerald-50/50"
                    : "text-slate-500 hover:text-emerald-600 border border-transparent"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-emerald-600 font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SHIPPING NATIONWIDE
          </div>
          <Link
            to="/affiliate"
            className={cn(
              "hidden sm:block px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all",
              location.pathname === '/affiliate'
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-white hover:bg-emerald-600"
            )}
          >
            Become an Affiliate
          </Link>

          {/* Cart Toggle */}
          <button 
            onClick={() => toggleCart()}
            className="relative p-2 text-slate-900 hover:text-emerald-600 transition-colors"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden size-10 flex items-center justify-center text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-white border-b border-gray-200 p-6 flex flex-col gap-2 lg:hidden shadow-xl"
          >
            {NAV_LINKS.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "font-bold text-base py-3 px-4 rounded-lg transition-all",
                    isActive
                      ? "text-emerald-600 bg-emerald-50 border border-emerald-200"
                      : "text-slate-900 hover:bg-slate-50 border border-transparent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/affiliate"
              className="mt-2 btn-primary text-center"
            >
              Become an Affiliate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
