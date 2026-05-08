import { motion } from 'motion/react';
import { DollarSign, Users, TrendingUp, Gift, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';



export default function AffiliatePage() {
  const [formData, setFormData] = useState({ name: '', email: '', website: '', audience: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <div className="pill-badge mb-6 border-emerald-200 bg-emerald-50 text-emerald-700 mx-auto">Partner With Us</div>
          <h1 className="title-display text-4xl lg:text-6xl mb-4">
            Become an <span className="text-emerald-600">Affiliate</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Join the Boreal Labs affiliate program and earn commission by promoting 
            Canada's most trusted research peptides to your audience.
          </p>
        </motion.div>


        {/* How It Works */}
        <div className="mb-20">
          <h2 className="title-display text-3xl mb-10 text-center">How It <span className="text-emerald-600">Works</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Apply', desc: 'Fill out the form below. We review applications within 48 hours.' },
              { step: '02', title: 'Share', desc: 'Get your unique referral link and exclusive discount codes to share.' },
              { step: '03', title: 'Earn', desc: 'Earn commission on every sale. Payouts processed monthly via e-Transfer.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="text-5xl font-display font-bold text-emerald-100 mb-4">{s.step}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-2xl mx-auto">
          <h2 className="title-display text-3xl mb-8 text-center">Apply <span className="text-emerald-600">Now</span></h2>
          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-12 text-center">
              <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={28} className="text-emerald-600" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Application Received!</h3>
              <p className="text-slate-500">We'll review your application and get back to you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/30 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Website / Social Media</label>
                <input type="text" required value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white" placeholder="https://yoursite.com or @handle" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Tell us about your audience</label>
                <textarea rows={4} required value={formData.audience} onChange={e => setFormData({...formData, audience: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white resize-none" placeholder="Describe your audience, niche, and how you'd promote Boreal Labs..." />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <ArrowRight size={16} /> Submit Application
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
