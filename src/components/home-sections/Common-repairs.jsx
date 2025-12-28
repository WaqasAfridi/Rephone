import { services } from "../../constants";
import ServiceCard from "../shared/ServiceCard";

function CommonRepairs() {
  return (
    <section id="services" aria-labelledby="common-repairs-heading" className="bg-white py-16 sm:py-20">
      <div className="w-[98%] max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="common-repairs-heading" className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Common <span className="text-brand">Repairs</span>
          </h2>
          <p className="mt-3 text-lg text-brand-dark/70">
            We fix a wide range of mobile phone issues — fast, reliable, and locally.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              variant="display"
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="/booking"
            className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-lg font-semibold bg-brand text-white shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 hover:brightness-95 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
            aria-label="Start booking a repair"
          >
            Start Booking Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default CommonRepairs