import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50" id="hero-section">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-40 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="pill-badge mb-8 border-emerald-200 bg-emerald-50 text-emerald-700">
            Pure Canadian Synthesis
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-bold leading-[0.9] text-slate-900 tracking-tighter mb-8 uppercase font-display">
            ADVANCED<br/>RESEARCH<br/><span className="text-emerald-600 italic font-serif lowercase tracking-normal">peptides.</span>
          </h1>
          
          <p className="text-slate-600 text-lg leading-relaxed max-w-md mb-10 font-medium">
            Industry-leading purity standards for specialized research applications. 
            Synthesized in Ontario, verified by third-party HPLC/MS analysis.
          </p>
          
          <div className="flex gap-4">
            <button id="browse-catalog-btn" className="btn-primary">
              Explore Catalog
            </button>
            <button id="learn-more-btn" className="btn-secondary border shadow-sm">
              Lab Verified
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center p-12"
        >
          <div className="relative w-full aspect-square border border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden bg-white/50 backdrop-blur-3xl shadow-2xl shadow-slate-200">
            <div className="absolute inset-0 opacity-20">
               <div className="grid grid-cols-6 h-full w-full">
                 {[...Array(6)].map((_, i) => <div key={i} className="border-r border-emerald-200" />)}
               </div>
            </div>

            <div className="relative z-20">
               <div className="w-56 h-80 bg-gradient-to-b from-emerald-50 to-teal-100 rounded-lg shadow-2xl relative flex flex-col p-4 animate-float border border-white">
                  <div className="w-full h-full border border-emerald-200/30 rounded-md flex flex-col bg-white/40">
                    <div className="h-14 border-b border-emerald-200/30 flex items-center px-3 space-x-2">
                       <div className="w-8 h-2 bg-emerald-600 rounded-full" />
                       <div className="w-4 h-2 bg-emerald-400/20 rounded-full" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-end space-y-2">
                       <div className="h-1 w-12 bg-emerald-800/10" />
                       <div className="h-1 w-16 bg-emerald-800/10" />
                       <div className="h-4 w-24 bg-emerald-900/20 mt-4 rounded-sm" />
                    </div>
                  </div>
                  <div className="absolute -right-10 bottom-16 w-28 h-28 border border-emerald-500/20 rounded-full flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl shadow-xl transform rotate-12">
                    <span className="text-emerald-600 font-bold text-sm tracking-tighter leading-none text-center">99.8%<br/>PURITY</span>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
