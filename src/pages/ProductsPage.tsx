import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { ALL_PRODUCTS, CATEGORIES } from '../data/products';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = ALL_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.categories.includes(activeCategory);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="pill-badge mb-6 border-emerald-200 bg-emerald-50 text-emerald-700">Research Catalog</div>
          <h1 className="title-display text-4xl lg:text-6xl mb-4">All <span className="text-emerald-600">Products</span></h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search peptides..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all bg-slate-50 focus:bg-white" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn("px-5 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all border whitespace-nowrap",
                  activeCategory === cat ? "bg-slate-900 text-white border-slate-900" : "border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                )}>{cat}</button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-6">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(product => (
            <motion.div key={product.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No products match your search</p>
          </div>
        )}
      </div>
    </section>
  );
}
