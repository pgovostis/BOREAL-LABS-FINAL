import { ShieldCheck, Zap, Microscope, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

export default function LabStandards() {
  const features = [
    {
      icon: <ShieldCheck className="text-blue-500" size={24} />,
      title: "Third-Party HPLC Tested",
      description: "Analytical verification for purity and sequence integrity by independent laboratories."
    },
    {
      icon: <FlaskConical className="text-blue-500" size={24} />,
      title: "GMP Compliant Synthesis",
      description: "Peptides synthesized following strict ISO quality control protocols."
    },
    {
      icon: <Microscope className="text-blue-500" size={24} />,
      title: "99%+ Minimum Purity",
      description: "The industry gold standard requirement for all research compounds."
    },
    {
      icon: <Zap className="text-blue-500" size={24} />,
      title: "Cold-Chain Shipping",
      description: "Proprietary packaging ensures materials arrive in clinical condition."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100" id="about">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="pill-badge mb-8 border-emerald-500/30 bg-emerald-50 text-emerald-600">
               Scientific Integrity
            </div>
            <h2 className="title-display text-4xl lg:text-5xl mb-8">
              Excellence <br />
              <span className="text-emerald-600">is our Foundation</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium">
              At Boreal Labs, we understand that research outcomes depend on the precision of your reagents. 
              Our commitment to accuracy is reflected in every analytical verification.
            </p>
            <div className="grid sm:grid-cols-2 gap-y-12 gap-x-8">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <div className="size-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-tight text-sm">{f.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-wider font-bold">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-slate-100 relative shadow-2xl shadow-slate-200">
              <div className="absolute inset-0 bg-emerald-600/5 mix-blend-overlay z-10" />
              <img 
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2070" 
                alt="Laboratory" 
                className="size-full object-cover grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-white to-transparent">
                <div className="glass-card rounded-xl p-6 bg-white shadow-xl border-emerald-50">
                  <div className="font-display text-lg font-bold text-slate-900 mb-1 uppercase tracking-tighter">Boreal Quality Lock™</div>
                  <p className="text-emerald-600 text-[10px] uppercase font-bold tracking-[0.2em]">Sealed verification system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
