import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, FlaskConical } from 'lucide-react';

const STORAGE_KEY = 'boreal_age_verified';

export default function AgeDisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    if (!verified) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    document.body.style.overflow = '';
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[95dvh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1.5 shrink-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />

            <div className="p-6 sm:p-10 overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="hidden sm:flex w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl items-center justify-center mx-auto mb-5 border border-emerald-200/50 shadow-sm">
                  <ShieldCheck size={32} className="text-emerald-600 sm:w-10 sm:h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-1">
                  Age Verification Required
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                  You must be 21 or older to access this website
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 my-5" />

              {/* Disclaimer content */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <FlaskConical size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    All products sold on this website are intended <strong className="text-slate-900">strictly for in-vitro laboratory research and educational purposes only</strong>. They are not intended for human or animal consumption, nor for any diagnostic, therapeutic, or medicinal use.
                  </p>
                </div>

                <div className="flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200/60">
                  <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                    By entering this site, you confirm that you are <strong>at least 21 years of age</strong>, and that you understand and agree that all products are for research use only. You assume full responsibility for compliance with all applicable local, provincial, and federal regulations.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 py-3.5 sm:py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-[0.98]"
                >
                  I am 21+ — Enter Site
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 py-3.5 sm:py-4 px-6 bg-white border-2 border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-[0.98]"
                >
                  I am Under 21
                </button>
              </div>

              {/* Footer text */}
              <p className="text-center text-[10px] sm:text-[11px] text-slate-400 mt-5 leading-relaxed">
                Boreal Labs is committed to responsible distribution of research-grade materials.
                By proceeding, you acknowledge our terms of service and research-use-only policy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
