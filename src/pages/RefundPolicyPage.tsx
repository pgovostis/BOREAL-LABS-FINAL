import { motion } from 'motion/react';
import { RefreshCcw } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCcw className="text-emerald-500 w-8 h-8" />
            <h1 className="title-display text-4xl lg:text-5xl">Refund Policy</h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">Last Updated: May 2026</p>
          
          <div className="prose prose-slate prose-emerald max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. All Sales Are Final</h2>
            <p>Due to the sensitive nature of our research materials and our strict quality control protocols, <strong>all sales are final</strong>. We cannot accept returns or exchanges for any products once they have left our facility.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Quality Assurance</h2>
            <p>We guarantee that all products meet the purity standards stated on their respective Certificates of Analysis (COAs) at the time of shipment. We are not responsible for degradation of materials due to improper storage or handling after delivery.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Damaged or Missing Items</h2>
            <p>If you receive a damaged product or if your order is missing items, please contact our support team at info@boreallabs.ca within <strong>48 hours of delivery</strong>. You must include your order number and photographic evidence of the damaged items and packaging. We will evaluate these claims on a case-by-case basis and, at our discretion, provide a replacement.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Order Cancellations</h2>
            <p>Orders may be cancelled only if they have not yet been processed for shipping. Once an order has been fulfilled and a tracking number generated, it cannot be cancelled or modified.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Chargebacks and Disputes</h2>
            <p>Initiating a chargeback or payment dispute without first contacting our support team may result in a permanent ban from purchasing from Boreal Labs in the future. We encourage you to reach out to us directly so we can resolve any issues amiably.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
