import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marcus T.",
      role: "Powerlifter",
      quote: "Tried a few Canadian sources before finding Boreal. Prices are unmatched, I haven't found better value anywhere. Quality is exactly what you'd expect at twice the cost. Can't go wrong honestly.",
      rating: 5
    },
    {
      name: "David R.",
      role: "Strength Coach",
      quote: "Been researching peptides for years and Boreal is up there with the best. Consistent quality, fair prices, and they actually respond when you reach out. Won't be going anywhere else.",
      rating: 5
    },
    {
      name: "Alex M.",
      role: "Bodybuilder",
      quote: "Been ordering from Boreal for about 6 months now. Quality is consistent every time and results speak for themselves. Communication is quick and shipping is always faster than expected. Highly recommend.",
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
        
        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 -mx-6 px-6 sm:-mx-12 sm:px-12 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center">
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
