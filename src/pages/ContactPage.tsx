import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '80860783-1f75-4789-a3a3-b961cc986e94',
          from_name: 'Boreal Labs Website',
          subject: `Contact Form: ${formData.subject}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="pill-badge mb-6 border-emerald-200 bg-emerald-50 text-emerald-700">Get In Touch</div>
          <h1 className="title-display text-4xl lg:text-6xl mb-4">
            Contact <span className="text-emerald-600">Us</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
            Have a question about our products or need help with an order? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              { icon: <Mail size={20} />, title: 'Email', detail: 'info@boreallabs.ca', sub: 'We reply within 24 hours' },
              { icon: <MapPin size={20} />, title: 'Location', detail: 'Ontario, Canada', sub: 'Shipped locally' },
              { icon: <Clock size={20} />, title: 'Hours', detail: 'Mon – Fri, 9am – 5pm EST', sub: 'Excluding holidays' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 transition-all group"
              >
                <div className="size-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight mb-1">{item.title}</h3>
                <p className="text-sm text-slate-700 font-medium">{item.detail}</p>
                <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50/50 p-12 text-center">
                <div>
                  <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-2 tracking-tight">Message Sent!</h3>
                  <p className="text-slate-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="scroll-mt-48 p-8 rounded-2xl border border-slate-100 bg-slate-50/30 space-y-6">
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
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Subject</label>
                  <input
                    type="text" required
                    value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white transition-all"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mb-2">Message</label>
                  <textarea
                    rows={6} required
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                    {error}
                  </div>
                )}
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
