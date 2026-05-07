import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'weight loss': return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
      case 'recovery': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'muscle growth': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'anti aging': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col h-full overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
      
      <div className="relative aspect-square rounded-xl bg-slate-50 border border-slate-100 overflow-hidden mb-6 flex items-center justify-center group-hover:bg-white transition-all">
        {/* Placeholder Vial - Clinical Style */}
        <div className="w-12 h-28 bg-gradient-to-b from-emerald-50 to-emerald-200 rounded-md shadow-2xl relative group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 border border-white">
           <div className="w-full h-4 bg-slate-200/50 mb-auto rounded-t-sm" />
           <div className="p-2 flex flex-col items-center justify-center flex-1">
             <div className="w-8 h-0.5 bg-emerald-600/20 mb-1" />
             <div className="text-[8px] font-bold text-emerald-800 leading-none">{product.id}</div>
           </div>
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-colors duration-500" />
      </div>

      <div className="flex flex-col flex-1 relative z-10">
        <div className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.1em] border mb-4 w-fit",
          getCategoryColor(product.category)
        )}>
          {product.category}
        </div>
        
        <h3 className="font-display font-bold text-lg text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors tracking-tight">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-6 flex items-end justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">Research Grade</div>
            <div className="text-xl font-bold text-slate-900 tracking-tighter">
              {product.price}
              <span className="text-[10px] text-slate-400 ml-1 uppercase font-medium">CAD</span>
            </div>
          </div>
          <button className="size-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
