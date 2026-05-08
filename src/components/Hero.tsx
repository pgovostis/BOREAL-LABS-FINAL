import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50 pt-32 pb-32" id="hero-section">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-40 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-12 xl:gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="pill-badge mb-8 border-emerald-200 bg-emerald-50 text-emerald-700">
            Canada's Most Trusted Peptide Supplier
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] text-slate-900 tracking-tighter mb-8 uppercase font-display">
            ADVANCED<br/>RESEARCH<br/><span className="text-emerald-600 italic font-serif lowercase tracking-normal">peptides.</span>
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-10 font-medium">
            Explore our extensive range of research-grade peptides — backed by 
            independent third-party testing, fast Canada-wide shipping, and 
            competitive pricing you can count on.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/products" id="browse-catalog-btn" className="btn-primary text-center">
              Explore Catalog
            </Link>
            <button id="learn-more-btn" className="btn-secondary border shadow-sm text-center">
              Lab Verified
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end xl:justify-center p-8 lg:p-0 xl:p-12 w-full"
        >
          {/* Soft glow backdrop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border border-emerald-200/30 rounded-full" />
            <div className="absolute w-80 h-80 border border-emerald-100/20 rounded-full" />
          </div>

          <div className="relative z-20 animate-float mt-8 lg:mt-0">
             <img 
               src="/images/bpc-157-vial.png" 
               alt="Boreal Labs BPC-157 Peptide Vial" 
               className="w-64 lg:w-72 xl:w-80 drop-shadow-2xl mx-auto"
             />
             <div className="absolute -right-4 lg:-right-8 xl:-right-10 bottom-12 xl:bottom-16 w-24 lg:w-28 h-24 lg:h-28 border border-emerald-500/20 rounded-full flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl shadow-xl transform rotate-12">
               <span className="text-emerald-600 font-bold text-xs xl:text-sm tracking-tighter leading-none text-center">99%<br/>PURITY</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
