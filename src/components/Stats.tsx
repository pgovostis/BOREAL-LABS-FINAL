export default function Stats() {
  const stats = [
    { value: '99.9%', label: 'Purity Standard' },
    { value: '2k+', label: 'Researchers' },
    { value: '24h', label: 'Priority Shipping' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-12" id="stats-section">
      <div className="glass-card rounded-2xl p-8 lg:p-12 flex flex-wrap justify-around items-center gap-12 bg-white shadow-xl shadow-emerald-500/5 border-emerald-50">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="font-display text-4xl lg:text-6xl font-bold text-slate-900 mb-2 tracking-tighter">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
