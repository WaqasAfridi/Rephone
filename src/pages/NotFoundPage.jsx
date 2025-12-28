import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Home, ArrowLeft, Wrench, AlertCircle } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="flex-1 mt-22 bg-linear-to-br from-gray-50 to-white">
        <div className="min-h-[calc(100svh-88px)] flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* LEFT — TEXT + ACTIONS */}
              <div className="order-2 lg:order-1 text-center lg:text-left">
                {/* Error Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
                  <AlertCircle className="w-4 h-4 text-brand" />
                  <span className="text-sm font-semibold text-brand">Error 404</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-brand-dark tracking-tight">
                  404
                </h1>

                {/* Subheading */}
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark">
                  Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The page you're looking for doesn't exist or may have been moved.
                  Don't worry — your repair journey doesn't end here.
                </p>

                {/* Quick Links Box */}
                <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 max-w-xl mx-auto lg:mx-0">
                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">Need a repair?</p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Book your phone repair appointment in just a few clicks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Fully Responsive */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 max-w-xl mx-auto lg:mx-0">
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Go Back</span>
                  </button>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-white font-bold shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 hover:bg-red-700 transition-all duration-200 active:scale-95"
                  >
                    <Home className="w-4 h-4" />
                    <span>Back to Home</span>
                  </Link>

                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-brand text-brand font-bold hover:bg-brand/5 hover:border-red-700 transition-all duration-200 active:scale-95"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Book Repair</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT — VISUAL */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  {/* Decorative background circles */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand/10 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-brand/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                  <img
                    src={import.meta.env.BASE_URL + "/repairing-expert-image-404Page.png"}
                    alt="Repair expert illustration"
                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl select-none"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NotFoundPage