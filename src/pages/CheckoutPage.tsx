import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Lock, ChevronLeft, Package, CreditCard, MapPin, User, Plus, Minus, Trash2, Tag } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { ALL_PRODUCTS } from '../data/products';

const FREE_SHIPPING_THRESHOLD = 250;

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  orderNotes: string;
}

// Canadian provincial/territorial tax rates (GST + PST/HST combined)
const PROVINCE_TAX_RATES: Record<string, { rate: number; label: string }> = {
  'Alberta':                      { rate: 0.05, label: 'GST (5%)' },
  'British Columbia':             { rate: 0.12, label: 'GST + PST (12%)' },
  'Manitoba':                     { rate: 0.12, label: 'GST + PST (12%)' },
  'New Brunswick':                { rate: 0.15, label: 'HST (15%)' },
  'Newfoundland and Labrador':    { rate: 0.15, label: 'HST (15%)' },
  'Northwest Territories':        { rate: 0.05, label: 'GST (5%)' },
  'Nova Scotia':                  { rate: 0.15, label: 'HST (15%)' },
  'Nunavut':                      { rate: 0.05, label: 'GST (5%)' },
  'Ontario':                      { rate: 0.13, label: 'HST (13%)' },
  'Prince Edward Island':         { rate: 0.15, label: 'HST (15%)' },
  'Quebec':                       { rate: 0.14975, label: 'GST + QST (14.975%)' },
  'Saskatchewan':                 { rate: 0.11, label: 'GST + PST (11%)' },
  'Yukon':                        { rate: 0.05, label: 'GST (5%)' },
};

const PROVINCES = Object.keys(PROVINCE_TAX_RATES);

export default function CheckoutPage() {
  const { items, cartTotal, cartCount, updateQuantity, removeItem, addItem } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    email: '', firstName: '', lastName: '', address: '', apartment: '',
    city: '', province: '', postalCode: '', phone: '', orderNotes: '',
  });

  const bacWater = ALL_PRODUCTS.find(p => p.id === 'BAC-H2O');
  const bacWaterInCart = items.some(i => i.productId === 'BAC-H2O');

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  // Coupon logic (placeholder — wire to real validation later)
  const discount = appliedCoupon ? 0 : 0;

  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const freeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = freeShipping ? 0 : 20;

  const taxInfo = form.province ? PROVINCE_TAX_RATES[form.province] : null;
  const taxRate = taxInfo ? taxInfo.rate : 0;
  const taxLabel = taxInfo ? taxInfo.label : 'Select province';
  const taxableAmount = cartTotal - discount;
  const tax = taxableAmount * taxRate;
  const orderTotal = taxableAmount + shippingCost + tax;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    // Placeholder: no valid coupons yet — extend this with real codes
    setCouponError('Invalid coupon code');
    setAppliedCoupon(null);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const steps = [
    { label: 'Contact', icon: User },
    { label: 'Shipping', icon: MapPin },
    { label: 'Payment', icon: CreditCard },
  ];

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const inputCls =
    'w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all';

  const labelCls = 'block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5';

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6">
        <Package size={64} className="text-slate-200 mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">Add some products before checking out.</p>
        <Link to="/products" className="btn-primary rounded-xl">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Continue Shopping
        </Link>

        {/* Free Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl border border-slate-200 bg-white"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Truck size={16} className={freeShipping ? 'text-emerald-600' : 'text-slate-400'} />
              <span className="text-sm font-bold text-slate-700">
                {freeShipping
                  ? '🎉 You unlocked FREE shipping!'
                  : `Add $${(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free shipping`}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-600">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${shippingProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${freeShipping ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-400 to-emerald-500'}`}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── LEFT: Customer Info ─── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Steps */}
              <div className="flex border-b border-slate-100">
                {steps.map((step, i) => (
                  <button
                    key={step.label}
                    onClick={() => setActiveStep(i)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider transition-all relative
                      ${activeStep === i ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <step.icon size={14} />
                    {step.label}
                    {activeStep === i && (
                      <motion.div layoutId="step-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                {/* Step 0: Contact */}
                {activeStep === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Contact Information</h2>
                    <p className="text-sm text-slate-500 mb-4">We'll use this to send your order confirmation.</p>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => update('email', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <input type="tel" placeholder="(555) 123-4567" value={form.phone}
                        onChange={e => update('phone', e.target.value)} className={inputCls} />
                    </div>

                    <button onClick={() => setActiveStep(1)}
                      className="w-full btn-primary rounded-xl mt-2">
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {/* Step 1: Shipping */}
                {activeStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Shipping Address</h2>
                    <p className="text-sm text-slate-500 mb-4">Where should we send your order?</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>First Name *</label>
                        <input placeholder="John" value={form.firstName}
                          onChange={e => update('firstName', e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name *</label>
                        <input placeholder="Doe" value={form.lastName}
                          onChange={e => update('lastName', e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Street Address *</label>
                      <input placeholder="123 Main Street" value={form.address}
                        onChange={e => update('address', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Apt / Suite / Unit</label>
                      <input placeholder="Apt 4B" value={form.apartment}
                        onChange={e => update('apartment', e.target.value)} className={inputCls} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>City *</label>
                        <input placeholder="Toronto" value={form.city}
                          onChange={e => update('city', e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Province *</label>
                        <select value={form.province}
                          onChange={e => update('province', e.target.value)}
                          className={inputCls + ' appearance-none'}>
                          <option value="">Select…</option>
                          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Postal Code *</label>
                        <input placeholder="M5V 2T6" value={form.postalCode}
                          onChange={e => update('postalCode', e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Country</label>
                        <input value="Canada" disabled
                          className={inputCls + ' bg-slate-50 text-slate-400 cursor-not-allowed'} />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <button onClick={() => setActiveStep(0)}
                        className="flex-1 btn-secondary rounded-xl">Back</button>
                      <button onClick={() => setActiveStep(2)}
                        className="flex-1 btn-primary rounded-xl">Continue to Payment</button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {activeStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-slate-900 mb-1">Payment Method</h2>
                    <p className="text-sm text-slate-500 mb-4">You'll be securely redirected to PayPal to complete your purchase.</p>

                    <div className="flex items-center gap-4 p-5 rounded-xl border-2 border-emerald-500 bg-emerald-50/50">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ShieldCheck size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-sm text-slate-900">Secure PayPal Checkout</span>
                        <p className="text-xs text-slate-500 mt-0.5">Your payment information is encrypted and processed securely through PayPal. We never store your financial data.</p>
                      </div>
                      <span className="text-xl font-bold text-[#003087] tracking-tight">Pay<span className="text-[#009cde]">Pal</span></span>
                    </div>

                    <div>
                      <label className={labelCls}>Order Notes (optional)</label>
                      <textarea rows={3} placeholder="Any special instructions…"
                        value={form.orderNotes}
                        onChange={e => update('orderNotes', e.target.value)}
                        className={inputCls + ' resize-none'} />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                      <button onClick={() => setActiveStep(1)}
                        className="flex-1 btn-secondary rounded-xl">Back</button>
                      <button className="flex-1 btn-primary rounded-xl flex items-center justify-center gap-2">
                        <Lock size={14} />
                        Place Order — ${orderTotal.toFixed(2)} CAD
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: ShieldCheck, label: 'Secure Checkout', sub: '256-bit SSL' },
                { icon: Truck, label: 'Fast Shipping', sub: 'Canada-wide' },
                { icon: Lock, label: 'Privacy Protected', sub: 'Data encrypted' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center text-center p-4 bg-white border border-slate-100 rounded-xl">
                  <b.icon size={20} className="text-emerald-600 mb-2" />
                  <span className="text-xs font-bold text-slate-900">{b.label}</span>
                  <span className="text-[10px] text-slate-400">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Order Summary ─── */}
          <div className="lg:col-span-5">
            <div className="sticky top-36">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Package size={18} className="text-emerald-600" />
                  Order Summary
                  <span className="ml-auto text-xs font-medium text-slate-400">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
                </h2>
              </div>

              {/* Items */}
              <div className="p-6 sm:p-8 space-y-5 max-h-[400px] overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="relative w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center p-1.5 border border-slate-100 shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      ) : (
                        <div className="w-6 h-10 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded shadow-sm border border-white/80 flex items-center justify-center">
                          <span className="text-[5px] font-bold text-emerald-800">{item.name.substring(0,3)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">{item.dosage}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-slate-100 rounded-l-lg transition-colors text-slate-500 hover:text-slate-700">
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-slate-100 rounded-r-lg transition-colors text-slate-500 hover:text-slate-700">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div className="px-6 sm:px-8 py-4 border-t border-slate-100">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  {appliedCoupon ? (
                    <button onClick={handleRemoveCoupon}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      Remove
                    </button>
                  ) : (
                    <button onClick={handleApplyCoupon}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                      Apply
                    </button>
                  )}
                </div>
                {couponError && <p className="text-xs text-red-500 mt-1.5 font-medium">{couponError}</p>}
                {appliedCoupon && <p className="text-xs text-emerald-600 mt-1.5 font-medium">Coupon "{appliedCoupon}" applied!</p>}
              </div>

              {/* Totals */}
              <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping <span className="text-slate-400">(Canada Post XpressPost)</span></span>
                  <span className={`font-semibold ${freeShipping ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {freeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Estimated Tax {taxInfo ? <span className="text-slate-400">({taxLabel})</span> : <span className="text-amber-500 text-xs">(select province)</span>}</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-slate-900">${orderTotal.toFixed(2)} CAD</span>
                </div>
              </div>
            </motion.div>

            {/* Suggested Add-on: Bacteriostatic Water */}
            {bacWater && !bacWaterInCart && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 bg-white rounded-2xl border border-dashed border-emerald-300 p-5 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-emerald-100">
                  <div className="w-5 h-9 bg-gradient-to-b from-emerald-100 to-emerald-200 rounded shadow-sm border border-white/80 flex items-center justify-center">
                    <span className="text-[5px] font-bold text-emerald-800">BAC</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-0.5">Recommended Add-on</p>
                  <h4 className="text-sm font-bold text-slate-900">{bacWater.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Essential for safe reconstitution of your peptides.</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-sm font-bold text-slate-900">{bacWater.variants[0].price}</span>
                  <button
                    onClick={() => addItem({
                      id: `${bacWater.slug}-${bacWater.variants[0].dosage}`,
                      productId: bacWater.id,
                      name: bacWater.name,
                      dosage: bacWater.variants[0].dosage,
                      price: parseFloat(bacWater.variants[0].price.replace('$', '')),
                      image: bacWater.image,
                    }, false)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </motion.div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
