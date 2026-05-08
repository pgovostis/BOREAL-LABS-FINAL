import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ProductData } from '../data/products';

const CATEGORY_COLORS: Record<string, string> = {
  'anti-aging': 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  'tissue repair': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  'muscle growth': 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  'fat loss': 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  'nootropics': 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  'tanning': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
};

export function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat.toLowerCase()] || 'text-slate-400 border-slate-500/30 bg-slate-500/10';
}

export default function ProductCard({ product }: { product: ProductData }) {
  const primaryCategory = product.categories[0];
  const startingPrice = product.variants[0].price;
  const hasMultipleVariants = product.variants.length > 1;
  const dosageLabel = hasMultipleVariants
    ? product.variants.map(v => v.dosage).join(' / ')
    : product.variants[0].dosage;

  return (
    <Link to={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col h-full overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

        <div className="relative aspect-[6/5] bg-slate-50 overflow-hidden flex items-end justify-center group-hover:bg-white transition-all p-4">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain relative scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700 mix-blend-multiply"
            />
          ) : (
            <div className="w-20 h-[75%] bg-gradient-to-b from-slate-50 via-emerald-50 to-emerald-100 rounded-md shadow-2xl relative group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700 border border-white/80 flex flex-col">
              <div className="w-[70%] h-4 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-sm mx-auto -mt-1 shadow-sm" />
              <div className="w-full h-3 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-sm shadow-inner" />
              <div className="flex-1 flex flex-col items-center justify-center px-2 py-3 space-y-1">
                <div className="w-10 h-0.5 bg-emerald-600/20" />
                <div className="text-[9px] font-bold text-emerald-800 leading-none tracking-tight">{product.id}</div>
                <div className="w-8 h-0.5 bg-emerald-600/10" />
              </div>
              <div className="w-full h-2 bg-gradient-to-t from-slate-200 to-transparent rounded-b-md" />
            </div>
          )}
          <button className="absolute top-3 right-3 text-slate-400 hover:text-emerald-600 transition-colors z-10" onClick={(e) => e.preventDefault()}>
            <ShoppingCart size={16} />
          </button>
          <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-colors duration-500" />
        </div>

        <div className="flex flex-col flex-1 relative z-10 p-3 pt-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.categories.map(cat => (
              <div key={cat} className={cn("inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.1em] border w-fit", getCategoryColor(cat))}>
                {cat}
              </div>
            ))}
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors tracking-tight">
            {product.name}
          </h3>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-auto">
            {dosageLabel}
          </div>
          <div className="mt-auto pt-6 flex items-end justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                {hasMultipleVariants ? 'Starting at' : 'Research Grade'}
              </div>
              <div className="text-xl font-bold text-slate-900 tracking-tighter">
                {startingPrice}
                <span className="text-[10px] text-slate-400 ml-1 uppercase font-medium">CAD</span>
              </div>
            </div>
            <div className="size-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-xl">
              <ShoppingCart size={18} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
