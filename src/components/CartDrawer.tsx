import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../lib/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-slate-100">
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-emerald-600" />
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-700">
                    {cartTotal >= 300 
                      ? 'You unlocked free shipping! 🎉'
                      : `Add $${(300 - cartTotal).toFixed(2)} for free shipping!`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (cartTotal / 300) * 100)}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-emerald-600 font-bold hover:underline mt-2">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-100">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      ) : (
                        <div className="w-8 h-12 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded shadow-sm relative border border-white/80 flex flex-col items-center justify-center">
                          <div className="text-[6px] font-bold text-emerald-800 tracking-tighter">{item.name.substring(0,3)}</div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{item.dosage}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3 border border-slate-200 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-600">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-600">
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="font-bold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)} CAD
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 p-6 bg-slate-50/50">
                <div className="flex justify-between mb-4 text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${cartTotal.toFixed(2)} CAD</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full btn-primary py-4 rounded-xl text-lg flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
