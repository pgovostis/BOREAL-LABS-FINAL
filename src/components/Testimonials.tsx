import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marcus T.",
      role: "Powerlifter",
      quote: "Boreal Peps is the real deal. My recovery times have absolutely plummeted since I started researching with their BPC-157. Purity is clearly top-tier.",
      rating: 5
    },
    {
      name: "David R.",
      role: "Strength Coach",
      quote: "Been in the iron game for 10 years and finding a reliable Canadian source was always a headache. These guys ship fast and the quality is unmatched. The vials are always perfectly vacuum sealed.",
      rating: 5
    },
    {
      name: "Alex M.",
      role: "Bodybuilder",
      quote: "The HPLC reports gave me peace of mind, but the actual results in the lab speak for themselves. You don't get these kinds of outcomes with under-dosed gear. Boreal is my go-to now.",
      rating: 5
    }
  ];

  return (
    <section className="pt-16 pb-12 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-16">
          <div className="pill-badge mb-6">
            Community Feedback
          </div>
          <h2 className="title-display text-4xl lg:text-5xl">
            Real Results, <span className="text-emerald-600">Real Reviews</span>
          </h2>
        </div>
        
        <div className="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 -mx-6 px-6 sm:-mx-12 sm:px-12 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[80vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0 pr-4 sm:pr-0">
              <div className="bg-slate-50 border border-slate-200 shadow-sm p-8 rounded-2xl flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="text-emerald-500 fill-emerald-500" size={18} />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed font-medium mb-8 flex-grow">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 font-display">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{t.role}</p>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 mb-4 md:hidden">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium animate-pulse">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            <span>Swipe for more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
