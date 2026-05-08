import React from 'react';
import ProductCard from './ProductCard';
import { ALL_PRODUCTS } from '../data/products';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

// Show a curated subset on the home page (8 featured products)
const FEATURED_SLUGS = [
  'bpc-157',
  'semaglutide',
  'ghk-cu',
  'cjc-1295-ipamorelin-blend',
  'tb-500',
  'mots-c',
  'nad-plus',
  'tirzepatide',
];

const FEATURED_PRODUCTS = FEATURED_SLUGS
  .map(slug => ALL_PRODUCTS.find(p => p.slug === slug)!)
  .filter(Boolean);

export default function ProductGrid() {
  return (
    <section className="py-16 sm:py-24 bg-white" id="catalog">
      <div className="max-w-[1400px] mx-auto px-4">
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
            <FilterPill label="Featured" active />
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
          {FEATURED_PRODUCTS.map(product => (
            <div key={product.slug} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-20 text-center">
          <Link 
            to="/products"
            className="px-12 py-4 bg-emerald-600 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all duration-500 inline-block rounded-sm shadow-sm"
          >
            View All Products
          </Link>
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
