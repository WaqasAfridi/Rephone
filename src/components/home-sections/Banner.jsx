import { Link } from "react-router-dom";
import { useCallback } from "react";

function Banner() {
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
      aria-label="Hero — Book a mobile repair appointment"
      className="mt-22 mb-2"
    >
      <div className="w-[98vw] mx-auto rounded-2xl overflow-hidden shadow-lg">
        <div className="relative bg-[linear-gradient(180deg,#151315_0%,#343136_100%)]">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 flex items-center justify-center relative py-6 md:py-12">
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-visible">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] 
                                  bg-[radial-gradient(ellipse_at_center,rgba(237,27,36,0.4)_0%,rgba(237,27,36,0.25)_25%,rgba(237,27,36,0.12)_50%,transparent_75%)]
                                  blur-3xl opacity-90 animate-pulse"
                    style={{ animationDuration: '4s' }} />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] 
                                  bg-[radial-gradient(ellipse_at_center,rgba(237,27,36,0.25)_0%,rgba(237,27,36,0.15)_30%,transparent_60%)]
                                  blur-3xl opacity-80" />

                  <div className="absolute left-[20%] top-[20%] w-16 h-16 rounded-full blur-3xl bg-[rgba(237,27,36,0.3)] opacity-90 animate-pulse"
                    style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

                  <div className="absolute left-[55%] top-[30%] w-12 h-12 rounded-full blur-2xl bg-[rgba(237,27,36,0.35)] opacity-85 animate-pulse"
                    style={{ animationDuration: '3.5s', animationDelay: '1s' }} />

                  <div className="absolute left-[30%] top-[55%] w-20 h-20 rounded-full blur-3xl bg-[rgba(237,27,36,0.28)] opacity-80 animate-pulse"
                    style={{ animationDuration: '4s', animationDelay: '1.5s' }} />

                  <div className="absolute left-[70%] top-[65%] w-14 h-14 rounded-full blur-3xl bg-[rgba(237,27,36,0.32)] opacity-90 animate-pulse"
                    style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />

                  <div className="absolute left-[38%] top-[80%] w-16 h-16 rounded-full blur-2xl bg-[rgba(237,27,36,0.3)] opacity-85 animate-pulse"
                    style={{ animationDuration: '3.8s', animationDelay: '2s' }} />

                  <div className="absolute left-[88%] top-[42%] w-10 h-10 rounded-full blur-2xl bg-[rgba(237,27,36,0.38)] opacity-80 animate-pulse"
                    style={{ animationDuration: '3.3s', animationDelay: '1.2s' }} />

                  <div className="absolute left-[45%] top-[25%] w-6 h-6 rounded-full blur-xl bg-[rgba(237,27,36,0.4)] opacity-90 animate-pulse"
                    style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />

                  <div className="absolute left-[62%] top-[70%] w-8 h-8 rounded-full blur-xl bg-[rgba(237,27,36,0.35)] opacity-85 animate-pulse"
                    style={{ animationDuration: '2.8s', animationDelay: '1.8s' }} />

                  <div className="absolute left-[25%] top-[90%] w-7 h-7 rounded-full blur-xl bg-[rgba(237,27,36,0.32)] opacity-80 animate-pulse"
                    style={{ animationDuration: '3s', animationDelay: '2.2s' }} />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[130%] 
                                  bg-[linear-gradient(45deg,transparent_0%,rgba(237,27,36,0.1)_50%,transparent_100%)]
                                  blur-2xl opacity-60 rotate-12" />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] 
                                  bg-[linear-gradient(-45deg,transparent_0%,rgba(237,27,36,0.08)_50%,transparent_100%)]
                                  blur-2xl opacity-50 -rotate-12" />
                </div>

                <img
                  src="/repairing-expert-image.png"
                  alt="Repairing expert holding a smartphone"
                  loading="lazy"
                  className="relative z-10 max-w-full h-auto max-h-80 sm:max-h-90 md:max-h-105 lg:max-h-120 object-contain drop-shadow-2xl"
                  width="752"
                  height="620"
                />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-start p-6 sm:p-8 md:p-10 lg:p-12 z-10 relative">
              <div className="w-full max-w-lg text-center md:text-left">
                <h1 className="font-extrabold leading-tight">
                  <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl">Book a</span>
                  <span className="block text-brand text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="whitespace-nowrap">Mobile Repair</span>{" "}
                    <span className="block md:inline">Appointment</span>
                  </span>
                </h1>

                <p className="mt-5 text-2xl sm:text-3xl md:text-3xl leading-snug text-gray-200 max-w-[38ch]">
                  Fast &amp; reliable mobile repair services at your convenience
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                  <Link
                    to="/booking"
                    aria-label="Book now"
                    className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold text-white bg-brand
                               min-w-42.5 shadow-[0_18px_40px_rgba(0,0,0,0.55)] hover:brightness-95 active:translate-y-px transition-transform
                               focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 focus-visible:ring-offset-2"
                  >
                    BOOK NOW
                  </Link>

                  <a
                    href="#services"
                    onClick={scrollToServices}
                    aria-label="View services"
                    className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold border border-white/10 bg-white/5 text-gray-100 min-w-4.5
                               hover:bg-white/10 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:ring-offset-2"
                  >
                    View Services
                  </a>
                </div>

                <div className="mt-6 text-sm text-gray-400">
                  <Link to="/admin" className="hover:text-gray-200 transition">Admin Dashboard</Link>
                  <span className="mx-3 opacity-30">|</span>
                  <span>Rephone — make it alive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner