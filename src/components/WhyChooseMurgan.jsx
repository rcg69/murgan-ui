export default function WhyChooseMurgan() {
  const benefits = [
    {
      title: "Premium Quality",
      description: "Crafted with the finest materials and meticulous attention to detail"
    },
    {
      title: "Fast Shipping",
      description: "Delivered to your door within 3-7 business days"
    },
    {
      title: "Easy Returns",
      description: "30-day return policy for your peace of mind"
    },
    {
      title: "Expert Support",
      description: "Dedicated team ready to assist you anytime"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-light">Why Choose MURGAN</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="space-y-3">
              <div className="text-2xl font-light text-black">✓</div>
              <h3 className="text-base md:text-lg font-light">{benefit.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
