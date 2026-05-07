import React from 'react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 pt-24 pb-12 border-t border-slate-100" id="footer">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-900">
                BOREAL<span className="font-light opacity-60 ml-1 text-slate-600">LABS</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              Scientific excellence through analytical precision. Serving the Canadian research community with integrity.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:col-span-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-8">Navigation</h4>
              <ul className="space-y-4 text-slate-900 text-[13px] font-bold">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Lab Reports</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-8">Contact</h4>
              <ul className="space-y-4 text-slate-900 text-[13px] font-bold">
                <li className="flex items-center gap-2 underline decoration-emerald-500/30">info@boreallabs.ca</li>
                <li>Ontario, Canada</li>
                <li>COA Available</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-8">Newsletter</h4>
            <form className="relative overflow-hidden border-b border-slate-200 pb-2 flex items-center">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none focus:ring-0 text-[11px] uppercase tracking-widest flex-1 outline-none placeholder:text-slate-300 font-bold"
              />
              <button className="text-slate-900 hover:text-emerald-600 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="h-32 bg-white/5 border border-white/10 rounded-2xl px-12 flex items-center justify-between mt-12">
          <div className="flex gap-16">
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">Testing Authority</p>
              <p className="text-white font-bold text-sm tracking-tight">JANO/MZ BIOLABS</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">Production</p>
              <p className="text-white font-bold text-sm tracking-tight">ONTARIO, CA</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-xs text-white font-bold">Trusted by Research Institutions</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Across North America</p>
            </div>
            <div className="w-10 h-6 bg-red-600 rounded-sm flex items-center justify-center">
               <div className="text-[10px]">🍁</div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-700 uppercase tracking-[0.3em] font-bold">
            © 2026 Boreal Labs — For Research Use Only
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all">
      {icon}
    </a>
  );
}
