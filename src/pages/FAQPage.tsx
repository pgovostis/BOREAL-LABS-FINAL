import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQ_SECTIONS = [
  {
    title: 'Ordering & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Orders placed before 2:00 PM EST typically ship the same day. While standard delivery generally takes 1–2 business days across Canada, please note that these timeframes are estimates and cannot be strictly guaranteed.' },
      { q: 'Do you ship internationally?', a: 'Currently, we exclusively ship within Canada.' },
      { q: 'What payment methods do you accept?', a: 'We securely accept Interac e-Transfer, PayPal, and a variety of cryptocurrencies including Bitcoin (BTC) and Ethereum (ETH).' },
    ],
  },
  {
    title: 'Quality, Products & Research',
    items: [
      { q: 'Are your peptides third-party tested?', a: 'Absolutely. Every batch undergoes rigorous independent testing via HPLC to ensure peak purity. We are committed to providing the highest quality research materials available, and our Certificates of Analysis (COAs) are publicly accessible on our Lab Results page.' },
      { q: 'What purity level are your peptides?', a: 'All peptides meet a minimum of 99% purity. Most batches exceed 99.5%.' },
      { q: 'Are these for human consumption?', a: 'No. All of our products are strictly intended for in-vitro research and laboratory applications only. They are explicitly not for human or animal consumption, nor are they approved for diagnostic or therapeutic use.' },
      { q: 'Do you offer bulk pricing?', a: 'Yes, contact us at info@boreallabs.ca for volume discounts.' },
      { q: 'How should I store peptides?', a: 'Lyophilized (freeze-dried) peptides should be stored in a cool, dry environment, preferably refrigerated at 2–8°C for optimal longevity. Once reconstituted, the solution must be kept refrigerated and protected from direct light to prevent degradation.' },
    ],
  },
  {
    title: 'Returns & Support',
    items: [
      { q: 'What is your return policy?', a: 'Due to the sensitive nature and strict quality controls of our research products, all sales are final and we cannot accept returns. However, customer satisfaction is a priority for us—if you experience any issues with your order, please contact our support team and we will do our best to assist you.' },
      { q: 'How can I contact support?', a: 'You can email us directly at info@boreallabs.ca or submit an inquiry through our Contact page. Our team typically responds within 24 hours. Whether you have questions about our products or need guidance navigating our catalog, please don\'t hesitate to reach out—we are always happy to help.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
          <div className="pill-badge mb-6 border-emerald-200 bg-emerald-50 text-emerald-700 mx-auto">Got Questions?</div>
          <h1 className="title-display text-4xl lg:text-6xl mb-4">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
            Everything you need to know about our peptides, shipping, and quality.
          </p>
        </motion.div>

        <div className="space-y-12">
          {FAQ_SECTIONS.map((section, si) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}>
              <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-6 flex items-center gap-2">
                <HelpCircle size={14} className="text-emerald-500" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.items.map((item, qi) => (
                  <FAQItem key={qi} question={item.q} answer={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center p-10 rounded-2xl border border-slate-100 bg-slate-50/50">
          <h3 className="font-display font-bold text-xl text-slate-900 mb-2 tracking-tight">Still have questions?</h3>
          <p className="text-sm text-slate-500 mb-6">Our team is happy to help.</p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("border rounded-xl overflow-hidden transition-all duration-300", open ? "border-emerald-200 bg-emerald-50/30" : "border-slate-100 hover:border-slate-200")}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-bold text-sm text-slate-900 pr-4">{question}</span>
        <ChevronDown size={18} className={cn("text-slate-400 transition-transform duration-300 shrink-0", open && "rotate-180 text-emerald-600")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
