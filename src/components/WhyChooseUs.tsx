import { FlaskConical, DollarSign, TreePine, Truck } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FlaskConical className="text-emerald-500 group-hover:text-white transition-colors duration-500" size={28} strokeWidth={1.5} />,
      title: "Third-Party Tested",
      description: "Every batch undergoes rigorous third-party HPLC testing to ensure ≥99% purity before release."
    },
    {
      icon: <DollarSign className="text-emerald-500 group-hover:text-white transition-colors duration-500" size={28} strokeWidth={1.5} />,
      title: "Most Competitive Pricing",
      description: "Premium research-grade peptides at the best prices in Canada — quality you can trust without breaking the bank."
    },
    {
      icon: <TreePine className="text-emerald-500 group-hover:text-white transition-colors duration-500" size={28} strokeWidth={1.5} />,
      title: "Proudly Canadian",
      description: "Canadian-owned and operated, delivering premium research peptides with pride from coast to coast."
    },
    {
      icon: <Truck className="text-emerald-500 group-hover:text-white transition-colors duration-500" size={28} strokeWidth={1.5} />,
      title: "Fast Shipping",
      description: "Same-day processing on orders before 2PM EST. Discreet, temperature-controlled packaging."
    }
  ];

  return (
    <section className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-20">
          <div className="pill-badge mb-6">
            Why Choose Us
          </div>
          <h2 className="title-display text-4xl lg:text-5xl">
            Uncompromising <span className="text-emerald-600">Quality</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 text-center">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="size-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:border-emerald-600 shadow-sm transition-all duration-500">
                {f.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-3 text-lg">
                {f.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
