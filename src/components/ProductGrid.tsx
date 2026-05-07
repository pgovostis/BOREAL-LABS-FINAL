import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { cn } from '../lib/utils';

const PRODUCTS: Product[] = [
  { id: 'GHK-CU', name: 'GHK-Cu', category: 'Anti Aging', price: '$49.99', dosage: '50mg', image: '', link: '#' },
  { id: 'CJC', name: 'CJC-1295 + Ipamorelin', category: 'Muscle Growth', price: '$94.99', dosage: '10mg', image: '', link: '#' },
  { id: 'BPC', name: 'BPC-157', category: 'Recovery', price: '$92.99', dosage: '10mg', image: '', link: '#' },
  { id: 'MOTS-C', name: 'MOTS-c', category: 'Anti Aging', price: '$64.99', dosage: '10mg', image: '', link: '#' },
  { id: 'AOD', name: 'AOD-9604', category: 'Weight Loss', price: '$59.99', dosage: '5mg', image: '', link: '#' },
  { id: 'NAD+', name: 'NAD+', category: 'Anti Aging', price: '$129.99', dosage: '500mg', image: '', link: '#' },
  { id: 'MT-2', name: 'Melanotan II', category: 'Tanning', price: '$59.99', dosage: '10mg', image: '', link: '#' },
  { id: 'SEMAX', name: 'Semax', category: 'Cognitive', price: '$79.99', dosage: '30mg', image: '', link: '#' },
];

export default function ProductGrid() {
  return (
    <section className="py-24 bg-white" id="catalog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="title-display text-4xl lg:text-5xl mb-6">
              Shop Research <span className="text-emerald-600">Peptides</span>
            </h2>
            <p className="text-slate-500 italic font-medium">
              Analytical laboratory standards. Verified by third-party HPLC analysis.
            </p>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            <FilterPill label="All" active />
            <FilterPill label="Muscle" />
            <FilterPill label="Recovery" />
            <FilterPill label="Anti-Aging" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-4 border border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all duration-500">
            View All Research Products
          </button>
        </div>
      </div>
    </section>
  );
}

function FilterPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button className={cn(
      "px-6 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all border",
      active ? "bg-slate-900 text-white border-slate-900" : "border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
    )}>
      {label}
    </button>
  );
}
