import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Shield,
  Snowflake,
  FlaskConical,
  CheckCircle2,
  ChevronRight,
  ShoppingCart,
  Beaker,
  FileText,
  Package,
} from 'lucide-react';
import { getProductBySlug, ALL_PRODUCTS, ProductData } from '../data/products';
import { cn } from '../lib/utils';
import { getCategoryColor } from '../components/ProductCard';
import { useCart } from '../lib/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'storage'>('description');
  const { addItem } = useCart();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <section className="pt-28 pb-24 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="title-display text-4xl mb-4">Product Not Found</h1>
          <p className="text-slate-500 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const primaryCategory = product.categories[0];

  // Get related products (shared category, excluding current)
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.categories.some(c => product.categories.includes(c))
  ).slice(0, 4);

  const handleAddToCart = () => {
    const variant = product.variants[selectedVariant];
    const numericPrice = parseFloat(variant.price.replace('$', ''));
    addItem({
      id: `${product.slug}-${variant.dosage}`,
      productId: product.id,
      name: product.name,
      dosage: variant.dosage,
      price: numericPrice,
      image: product.image
    });
  };

  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-8"
        >
          <Link to="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-emerald-600 transition-colors">
            Products
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-bold">{product.name}</span>
        </motion.nav>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-emerald-600 font-bold uppercase tracking-widest mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </motion.button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 rounded-3xl border border-slate-100 flex items-center justify-center overflow-hidden group">
              {/* Background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-8 left-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-12 right-12 w-40 h-40 bg-emerald-500/8 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/3 rounded-full blur-3xl group-hover:bg-emerald-500/6 transition-colors duration-1000" />
              </div>

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Large Vial Illustration */}
              <motion.div
                className={cn(
                  "relative z-10 w-full h-full flex items-center justify-center",
                  product.image && "mix-blend-multiply"
                )}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full max-w-[350px] lg:max-w-[450px] object-contain relative group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-32 h-56 bg-gradient-to-b from-white via-emerald-50/50 to-emerald-100/60 rounded-xl shadow-2xl relative border border-white/80 flex flex-col group-hover:scale-105 transition-transform duration-700">
                    {/* Cap */}
                    <div className="w-[65%] h-5 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-sm mx-auto -mt-1 shadow-md" />
                    <div className="w-full h-4 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-md shadow-inner" />

                    {/* Label area */}
                    <div className="flex-1 flex flex-col items-center justify-center px-3 py-4 space-y-2">
                      <div className="w-16 h-[1px] bg-emerald-600/20" />
                      <div className="text-center">
                        <div className="text-[8px] font-bold text-emerald-600/40 tracking-[0.2em] uppercase">
                          Boreal Labs
                        </div>
                        <div className="text-sm font-bold text-emerald-800 leading-none tracking-tight mt-1">
                          {product.id}
                        </div>
                        <div className="text-[10px] text-emerald-600/60 font-medium mt-1">
                          {product.variants[selectedVariant].dosage}
                        </div>
                      </div>
                      <div className="w-12 h-[1px] bg-emerald-600/10" />
                      <div className="text-[7px] text-emerald-600/30 font-bold tracking-wider">
                        RESEARCH USE
                      </div>
                    </div>

                    {/* Base */}
                    <div className="w-full h-3 bg-gradient-to-t from-slate-200/50 to-transparent rounded-b-xl" />

                    {/* Reflection */}
                    <div className="absolute inset-y-0 left-2 w-4 bg-gradient-to-r from-white/40 to-transparent rounded-xl" />
                  </div>
                )}
              </motion.div>

              {/* Purity badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm border border-emerald-200 rounded-lg px-3 py-2 shadow-lg">
                <div className="text-[8px] font-bold text-emerald-600 tracking-widest uppercase mb-0.5">
                  Purity
                </div>
                <div className="text-lg font-bold text-slate-900 tracking-tight">
                  {product.purity}
                </div>
              </div>


            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories.map(cat => (
                <div
                  key={cat}
                  className={cn(
                    'inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.15em] border w-fit',
                    getCategoryColor(cat)
                  )}
                >
                  {cat}
                </div>
              ))}
            </div>

            {/* Product Name */}
            <h1 className="title-display text-4xl lg:text-5xl xl:text-6xl mb-4">{product.name}</h1>

            {/* Quick specs row */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield size={13} className="text-emerald-500" />
                <span className="font-bold">Third-Party Verified</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <FlaskConical size={13} className="text-emerald-500" />
                <span className="font-bold">{product.purity} Purity</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <Package size={13} className="text-emerald-500" />
                <span className="font-bold">{product.form}</span>
              </span>
            </div>

            {/* Short description */}
            <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm lg:text-base">
              {product.description}
            </p>

            {/* Dosage Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 block">
                  Select Concentration
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={cn(
                        'px-5 py-3 rounded-lg border-2 font-bold text-sm transition-all duration-300',
                        selectedVariant === idx
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-500/10'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                      )}
                    >
                      {variant.dosage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                Research Grade
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                  {product.variants[selectedVariant].price}
                </span>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  CAD
                </span>
              </div>
              {product.variants.length > 1 && (
                <div className="text-xs text-slate-400 mt-1">
                  for {product.variants[selectedVariant].dosage} variant
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-10">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2 rounded-lg"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <button className="btn-secondary rounded-lg px-6">
                <FileText size={16} />
              </button>
            </div>

            {/* Benefits */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <Beaker size={14} className="text-emerald-500" />
                Research Applications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-600 font-medium"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 mt-0.5 flex-shrink-0"
                    />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-20"
        >
          <div className="flex border-b border-slate-100 mb-8 overflow-x-auto scrollbar-hide">
            {(
              [
                { key: 'description', label: 'Description' },
                { key: 'specs', label: 'Specifications' },
                { key: 'storage', label: 'Storage' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex-1 whitespace-nowrap px-3 sm:px-6 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border-b-2 -mb-[1px] text-center',
                  activeTab === tab.key
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <motion.div
                key="desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-slate prose-sm"
              >
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                  <strong className="uppercase tracking-wider">Research Use Only</strong> — This product is
                  intended for laboratory research purposes only. Not for human consumption. No
                  therapeutic claims are made or implied.
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Product Name', value: product.name },
                    { label: 'Product ID', value: product.id },
                    { label: 'Category', value: product.categories.join(', ') },
                    { label: 'Purity', value: product.purity },
                    { label: 'Form', value: product.form },
                    {
                      label: 'Available Quantities',
                      value: product.variants.map((v) => v.dosage).join(', '),
                    },
                    { label: 'Verification', value: 'Third-Party HPLC/MS' },
                    { label: 'Origin', value: 'Ontario, Canada' },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-slate-50 rounded-xl px-5 py-4 border border-slate-100"
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {spec.label}
                      </div>
                      <div className="text-sm font-bold text-slate-900">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'storage' && (
              <motion.div
                key="storage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start gap-4 p-6 bg-sky-50/50 rounded-2xl border border-sky-100">
                  <Snowflake size={24} className="text-sky-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Storage Instructions</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{product.storage}</p>
                    <div className="mt-4 space-y-2 text-xs text-slate-500">
                      <p>
                        • Once reconstituted, keep refrigerated and use within 30 days.
                      </p>
                      <p>
                        • Keep the vial sealed when not in use to maintain freshness.
                      </p>
                      <p>
                        • All orders are shipped with cold packs to keep your product safe in transit.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="title-display text-3xl mb-10">
              Related <span className="text-emerald-600">Products</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <RelatedProductCard key={rp.slug} product={rp} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-20 py-8 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold max-w-2xl mx-auto leading-relaxed">
            All products are sold strictly for laboratory research use only. Not for human
            consumption, veterinary use, or any therapeutic application. Buyer assumes all
            responsibility for use in compliance with local laws and regulations.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Mini product card for the "Related Products" section.
 */
function RelatedProductCard({ product }: { product: ProductData }) {
  const startingPrice = product.variants[0].price;
  const hasMultiple = product.variants.length > 1;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[6/5] bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors p-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain relative scale-[1.15] group-hover:scale-[1.25] transition-transform duration-700 mix-blend-multiply"
          />
        ) : (
          <div className="w-16 h-[65%] bg-gradient-to-b from-slate-50 via-emerald-50 to-emerald-100 rounded-md shadow-xl relative border border-white/80 flex flex-col group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700">
            <div className="w-[70%] h-3 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-sm mx-auto -mt-1 shadow-sm" />
            <div className="w-full h-2.5 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-sm shadow-inner" />
            <div className="flex-1 flex flex-col items-center justify-center px-1.5 py-2 space-y-0.5">
              <div className="text-[7px] font-bold text-emerald-800 leading-none tracking-tight">
                {product.id}
              </div>
            </div>
            <div className="w-full h-1.5 bg-gradient-to-t from-slate-200 to-transparent rounded-b-md" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1 mt-2">
          {hasMultiple && (
            <span className="text-[10px] text-slate-400 font-medium">from</span>
          )}
          <span className="text-lg font-bold text-slate-900 tracking-tighter">
            {startingPrice}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-medium">CAD</span>
        </div>
      </div>
    </Link>
  );
}
