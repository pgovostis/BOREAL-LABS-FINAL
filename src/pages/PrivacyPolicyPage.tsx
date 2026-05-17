import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-emerald-500 w-8 h-8" />
            <h1 className="title-display text-4xl lg:text-5xl">Privacy Policy</h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">Last Updated: May 2026</p>
          
          <div className="prose prose-slate prose-emerald max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>At Boreal Labs, we collect information that you provide directly to us when you create an account, place an order, or communicate with us. This may include your name, email address, shipping address, and payment information.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to process your orders, send order confirmations, provide customer support, and improve our services. We do not sell your personal data to third parties.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Cookies and Tracking</h2>
            <p>We use cookies to enhance your browsing experience, analyze site traffic, and understand where our audience comes from. You can control cookie preferences through your browser settings.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Third-Party Services</h2>
            <p>We may share your information with trusted third-party service providers (such as shipping partners) strictly for the purpose of fulfilling your orders and improving our services.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Contact Us</h2>
            <p>If you have any questions or concerns about our Privacy Policy or your data, please contact us at info@boreallabs.ca.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
