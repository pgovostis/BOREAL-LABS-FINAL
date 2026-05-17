import { motion } from 'motion/react';
import { Truck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="text-emerald-500 w-8 h-8" />
            <h1 className="title-display text-4xl lg:text-5xl">Shipping Policy</h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">Last Updated: May 2026</p>
          
          <div className="prose prose-slate prose-emerald max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Domestic Shipping Only</h2>
            <p>Currently, Boreal Labs exclusively ships to addresses within Canada. We do not offer international shipping at this time.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Processing Time</h2>
            <p>Orders placed before 2:00 PM EST on business days are typically processed and shipped the same day. Orders placed after 2:00 PM EST, on weekends, or on holidays will be processed the following business day.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Shipping Rates & Methods</h2>
            <p>We offer a flat-rate shipping fee of <strong>$20.00</strong> across Canada. All orders are shipped via Canada Post XpressPost, which generally takes 1-3 business days depending on your location.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Order Tracking</h2>
            <p>Once your order has been processed and shipped, you will receive an email containing your Canada Post tracking number. Please allow up to 24 hours for the tracking information to update on the carrier's website.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Lost or Delayed Packages</h2>
            <p>While we strive to ensure timely delivery, Boreal Labs is not responsible for delays caused by Canada Post, extreme weather, or other unforeseen circumstances. If your package is marked as "Delivered" but you have not received it, please contact Canada Post directly to initiate an investigation.</p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Incorrect Shipping Information</h2>
            <p>Customers are responsible for providing accurate shipping information at checkout. Boreal Labs is not liable for packages sent to incorrect or undeliverable addresses provided by the customer. If a package is returned to us due to an incorrect address, the customer will be responsible for additional shipping fees to resend the order.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
