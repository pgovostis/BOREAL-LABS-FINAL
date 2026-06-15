import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Microscope, FlaskConical, Send, Loader2, FileSearch, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { ALL_PRODUCTS } from '../data/products';

const PEPTIDE_OPTIONS = ALL_PRODUCTS
  .filter(p => p.categories[0] !== 'Reconstitution')
  .map(p => p.name);

export default function LabResultsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedPeptides, setSelectedPeptides] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePeptide = (peptide: string) => {
    setSelectedPeptides(prev =>
      prev.includes(peptide) ? prev.filter(p => p !== peptide) : [...prev, peptide]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPeptides.length === 0) {
      setError('Please select at least one peptide.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '80860783-1f75-4789-a3a3-b961cc986e94',
          from_name: 'Boreal Labs Website',
          subject: `Lab Results Request: ${selectedPeptides.join(', ')}`,
          name: formData.name,
          email: formData.email,
          message: `Peptides Requested: ${selectedPeptides.join(', ')}\n\nAdditional Notes: ${formData.message || 'None'}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Network error. Please try again or email us directly at info@boreallabs.ca.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="pill-badge mb-6 border-emerald-200 bg-emerald-50 text-emerald-700">
            Transparency First
          </div>
          <h1 className="title-display text-4xl lg:text-6xl mb-4">
            Lab <span className="text-emerald-600">Results</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Every batch we produce is independently tested by accredited third-party laboratories
            to ensure the highest standards of purity and quality.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <ShieldCheck size={24} />, title: 'Third-Party Verified', desc: 'All testing performed by independent accredited labs' },
            { icon: <Microscope size={24} />, title: 'HPLC', desc: 'Industry gold-standard analytical methods' },
            { icon: <FlaskConical size={24} />, title: '99%+ Purity Guarantee', desc: 'Every batch meets our minimum purity threshold' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 transition-all group"
            >
              <div className="size-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                {badge.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight mb-1">{badge.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Explanation + Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          {/* Explanation Card */}
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-100 bg-slate-50/30 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="size-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <FileSearch size={22} className="text-amber-600" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900 tracking-tight mb-2">
                  Certificates of Analysis Available on Request
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Due to the nature of third-party laboratory testing, there can be processing delays between when a 
                  batch is produced and when the corresponding Certificate of Analysis (COA) becomes available. 
                  As a result, not all COAs may be immediately accessible on our website at any given time.
                </p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
              We are committed to full transparency and are happy to provide lab results for any of our peptides 
              directly upon request. If you would like to review the COA for a specific product or batch, 
              please reach out to us below and we will send it to you promptly.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-700 font-semibold">
                All of our peptides are verified at ≥99% purity through independent HPLC analysis.
              </p>
            </div>
          </div>

          {/* Contact Button / Form Area */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center"
                >
                  <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-2 tracking-tight">Request Sent!</h3>
                  <p className="text-slate-500 text-sm font-medium">
                    Thank you for your request. We'll send the relevant lab results to your email within 24 hours.
                  </p>
                </motion.div>
              ) : !showForm ? (
                <motion.button
                  key="cta"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-flex items-center gap-3 text-base"
                >
                  <Send size={18} />
                  Request Lab Results
                </motion.button>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl border border-slate-100 bg-slate-50/30 text-left space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight">
                      Request Lab Results
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="size-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Name</label>
                      <input
                        type="text" required
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Email</label>
                      <input
                        type="email" required
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white transition-all"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  {/* Peptide Multi-Select */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">
                      Select Peptides
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white text-left flex items-center justify-between focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      >
                        <span className={selectedPeptides.length > 0 ? 'text-slate-900' : 'text-slate-400'}>
                          {selectedPeptides.length > 0
                            ? `${selectedPeptides.length} peptide${selectedPeptides.length > 1 ? 's' : ''} selected`
                            : 'Choose peptides...'}
                        </span>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl shadow-slate-200/50 max-h-56 overflow-y-auto"
                          >
                            {PEPTIDE_OPTIONS.map(peptide => (
                              <button
                                key={peptide}
                                type="button"
                                onClick={() => togglePeptide(peptide)}
                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors hover:bg-emerald-50 ${
                                  selectedPeptides.includes(peptide) ? 'bg-emerald-50/60 text-emerald-700 font-semibold' : 'text-slate-600'
                                }`}
                              >
                                <div className={`size-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                  selectedPeptides.includes(peptide)
                                    ? 'bg-emerald-600 border-emerald-600'
                                    : 'border-slate-300'
                                }`}>
                                  {selectedPeptides.includes(peptide) && (
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                {peptide}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Selected Peptide Tags */}
                    {selectedPeptides.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedPeptides.map(peptide => (
                          <span
                            key={peptide}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700"
                          >
                            {peptide}
                            <button
                              type="button"
                              onClick={() => togglePeptide(peptide)}
                              className="hover:text-emerald-900 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">
                      Additional Notes <span className="text-slate-300 normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white transition-all resize-none"
                      placeholder="Specific batch numbers, dosage info, or any other details..."
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {loading ? 'Sending...' : 'Submit Request'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
