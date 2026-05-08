import { motion } from 'motion/react';
import { ShieldCheck, FileText, Download, ExternalLink, Microscope, FlaskConical, CheckCircle } from 'lucide-react';

const LAB_REPORTS = [
  { peptide: 'BPC-157', batch: 'BL-2026-0412', purity: '99.4%', method: 'HPLC / MS', lab: 'MZ Biolabs', date: 'April 2026' },
  { peptide: 'GHK-Cu', batch: 'BL-2026-0389', purity: '99.7%', method: 'HPLC / MS', lab: 'Jano Sciences', date: 'April 2026' },
  { peptide: 'CJC-1295 + Ipamorelin', batch: 'BL-2026-0401', purity: '99.2%', method: 'HPLC', lab: 'MZ Biolabs', date: 'March 2026' },
  { peptide: 'MOTS-c', batch: 'BL-2026-0367', purity: '99.5%', method: 'HPLC / MS', lab: 'Jano Sciences', date: 'March 2026' },
  { peptide: 'AOD-9604', batch: 'BL-2026-0355', purity: '99.1%', method: 'HPLC', lab: 'MZ Biolabs', date: 'March 2026' },
  { peptide: 'NAD+', batch: 'BL-2026-0378', purity: '99.8%', method: 'HPLC / MS', lab: 'Jano Sciences', date: 'February 2026' },
  { peptide: 'TB-500', batch: 'BL-2026-0340', purity: '99.3%', method: 'HPLC', lab: 'MZ Biolabs', date: 'February 2026' },
  { peptide: 'Semax', batch: 'BL-2026-0322', purity: '99.6%', method: 'HPLC / MS', lab: 'Jano Sciences', date: 'January 2026' },
];

export default function LabResultsPage() {
  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="pill-badge mb-6 border-emerald-200 bg-emerald-50 text-emerald-700">
            Transparency First
          </div>
          <h1 className="title-display text-4xl lg:text-6xl mb-4">
            Lab <span className="text-emerald-600">Results</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Every batch we produce is independently tested by accredited third-party laboratories. 
            View certificates of analysis for all our peptides below.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <ShieldCheck size={24} />, title: 'Third-Party Verified', desc: 'All testing performed by independent accredited labs' },
            { icon: <Microscope size={24} />, title: 'HPLC & Mass Spec', desc: 'Industry gold-standard analytical methods' },
            { icon: <FlaskConical size={24} />, title: '99%+ Purity Guarantee', desc: 'Every batch meets our minimum purity threshold' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-emerald-200 transition-all group"
            >
              <div className="size-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                {badge.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight mb-1">{badge.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Lab Reports Table */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-50 px-6 py-4 grid grid-cols-12 gap-4 text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 border-b border-slate-100">
            <div className="col-span-3">Peptide</div>
            <div className="col-span-2">Batch</div>
            <div className="col-span-1">Purity</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-2">Laboratory</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1 text-right">COA</div>
          </div>

          {/* Table Rows */}
          {LAB_REPORTS.map((report, i) => (
            <motion.div
              key={report.batch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-5 grid grid-cols-12 gap-4 items-center border-b border-slate-50 hover:bg-emerald-50/30 transition-colors group"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="size-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle size={14} className="text-emerald-600" />
                </div>
                <span className="font-bold text-slate-900 text-sm tracking-tight">{report.peptide}</span>
              </div>
              <div className="col-span-2 text-xs text-slate-500 font-mono">{report.batch}</div>
              <div className="col-span-1">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">{report.purity}</span>
              </div>
              <div className="col-span-2 text-xs text-slate-500 font-medium">{report.method}</div>
              <div className="col-span-2 text-xs text-slate-500 font-medium">{report.lab}</div>
              <div className="col-span-1 text-xs text-slate-400 font-medium">{report.date}</div>
              <div className="col-span-1 text-right">
                <button className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                  <FileText size={14} />
                  <span className="hidden lg:inline">View</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">
            Can't find a specific COA? Contact us and we'll send it directly.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Request a Report
          </a>
        </div>
      </div>
    </section>
  );
}
