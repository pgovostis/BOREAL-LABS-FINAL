/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './lib/CartContext';
import CartDrawer from './components/CartDrawer';
import AgeDisclaimer from './components/AgeDisclaimer';

// Lazy-load all pages — only the page you visit gets downloaded
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const LabResultsPage = lazy(() => import('./pages/LabResultsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AffiliatePage = lazy(() => import('./pages/AffiliatePage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));

// Minimal loading fallback — just enough to prevent layout shift
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AgeDisclaimer />
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <main className="flex-1 pt-8">
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/lab-results" element={<LabResultsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
    <Analytics />
    </CartProvider>
  );
}
