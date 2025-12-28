import { CalendarCheck, Wrench, Smile } from "lucide-react";
import { useCallback } from "react";

const steps = [
  {
    step: "01",
    title: "Book Your Repair",
    desc: "Choose your device, select the issue, and book a repair appointment in seconds.",
    icon: CalendarCheck,
  },
  {
    step: "02",
    title: "We Fix Your Device",
    desc: "Our expert technicians diagnose and repair your phone using quality parts.",
    icon: Wrench,
  },
  {
    step: "03",
    title: "Get It Back Alive",
    desc: "Receive your fully repaired device — fast, safe, and hassle-free.",
    icon: Smile,
  },
];

function HowItWorks() {
  const scrollToServices = useCallback((e) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (!el) return;
    const navOffset = 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - navOffset - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white py-12 sm:py-14"
    >
      <div className="w-[98%] max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered heading + support copy (uses brand colors) */}
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark whitespace-nowrap"
          >
            How It <span className="text-brand">Works?</span>
          </h2>

          <p className="mt-3 text-lg text-brand-dark/70">
            Getting your phone repaired has never been this simple.
          </p>
        </div>

        {/* Illustration + Steps — center heading above them */}
        <div className="mt-8 md:mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          {/* Illustration (left on lg, top on small). Centered within its column. */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/how-it-works-illustration.png"
              alt="How Rephone repair service works"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Steps (right on lg, below & centered on small) */}
          <div className="flex-1 max-w-xl mx-auto lg:mx-0">
            <div className="relative lg:pl-12">
              {/* vertical connector line aligned with the center of icons */}
              <div
                aria-hidden="true"
                className="absolute left-6 top-2 bottom-2 w-px bg-gray-200"
              />

              {/* Each step */}
              <div className="space-y-8">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.step} className="relative flex items-start gap-6">
                      {/* Icon circle */}
                      <div className="relative z-10 -ml-1">
                        <div
                          className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center
                                     shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                          aria-hidden="true"
                        >
                          <Icon className="w-7 h-7 text-brand" />
                        </div>

                        {/* small numbered badge (positioned overlapping the icon) */}
                        <div className="absolute -right-2 top-0 transform translate-x-1 -translate-y-1">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white text-xs font-bold shadow-sm">
                            {s.step}
                          </span>
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-brand-dark">{s.title}</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA row — buttons horizontally centered */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold bg-brand text-white shadow-md hover:brightness-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
              >
                Book Now
              </a>

              <a
                href="#services"
                onClick={scrollToServices}
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-base font-medium border border-gray-200 bg-white text-brand-dark hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks