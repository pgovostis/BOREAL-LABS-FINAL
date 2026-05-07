/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ProductGrid from './components/ProductGrid';
import LabStandards from './components/LabStandards';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="-mt-16 relative z-20">
          <Stats />
        </div>
        <ProductGrid />
        <LabStandards />
        
        {/* Ticker / Trust Bar */}
        <section className="bg-slate-50 py-10 overflow-hidden border-y border-slate-100">
          <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap gap-24">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-24 text-slate-400 font-display font-bold text-[10px] tracking-[0.4em] uppercase">
                <span>Analytical Precision</span>
                <span className="size-1 rounded-full bg-emerald-500" />
                <span>Ontario Laboratory</span>
                <span className="size-1 rounded-full bg-emerald-500" />
                <span>Third Party Verified</span>
                <span className="size-1 rounded-full bg-emerald-500" />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
