import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-emerald-500 w-8 h-8" />
            <h1 className="title-display text-4xl lg:text-5xl">Terms of Service</h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">Last Updated: May 2026</p>
          
          <div className="prose prose-slate prose-emerald max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Boreal Labs website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or purchase our products.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Intended Use (Research Only)</h2>
            <p className="font-bold text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">ALL PRODUCTS SOLD BY BOREAL LABS ARE INTENDED EXCLUSIVELY FOR LABORATORY AND IN-VITRO RESEARCH PURPOSES. THEY ARE NOT FOR HUMAN OR ANIMAL CONSUMPTION. Products are not approved by Health Canada or the FDA for diagnostic, therapeutic, or clinical use.</p>
            <p>By purchasing from Boreal Labs, you confirm that you are a qualified researcher or representing a research institution, and that you understand the risks associated with the handling of these materials.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Age Restriction</h2>
            <p>You must be at least 21 years of age to access this website and purchase products from Boreal Labs. We reserve the right to verify age and cancel orders if we suspect a violation of this policy.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Liability</h2>
            <p>Boreal Labs shall not be held liable for any damages, incidental or consequential, arising from the use, misuse, or inability to use our products. The purchaser assumes all responsibility for the safe handling and legal compliance of the materials purchased.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and images, is the property of Boreal Labs and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the modified terms.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
