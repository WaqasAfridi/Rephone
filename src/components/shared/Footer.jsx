import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToServicesImmediate = useCallback(() => {
    const el = document.getElementById("services");
    if (!el) return false;
    const navOffset = 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - navOffset - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  }, []);

  const handleServicesClick = useCallback((e) => {
    // always prevent default because we'll handle scrolling/navigation here
    if (e && e.preventDefault) e.preventDefault();

    // If already on home path, just scroll
    if (location.pathname === "/") {
      scrollToServicesImmediate();
      return;
    }

    // Not on home: navigate to /#services and poll for the element to appear.
    // We include the hash in the URL so the address bar is correct.
    navigate("/#services");

    // Poll for the element for up to 3 seconds
    const start = Date.now();
    const tryScroll = () => {
      if (scrollToServicesImmediate()) {
        clearInterval(interval);
        return;
      }
      if (Date.now() - start > 3000) {
        clearInterval(interval);
      }
    };
    const interval = setInterval(tryScroll, 100);

    // Also attempt one final try after a short timeout in case interval cleared too early
    setTimeout(tryScroll, 350);
  }, [location.pathname, navigate, scrollToServicesImmediate]);

  return (
    <footer className="bg-linear-to-br from-brand-dark via-brand-dark to-[#2a2628] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative w-[98%] max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white rounded-xl p-2.5 shadow-lg">
                  <img
                    src="/Rephone-logo.png"
                    alt="Rephone logo"
                    className="w-24 h-auto object-contain"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Rephone</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Your trusted partner for fast, reliable mobile repair services. Expert technicians, genuine parts, and guaranteed satisfaction.
              </p>

              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-red-700 text-white px-6 py-3 font-semibold shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all active:scale-95"
              >
                Book Repair Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-brand rounded-full" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/booking" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Book Appointment
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-brand rounded-full" />
                  Our Services
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/#services"
                      onClick={handleServicesClick}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Screen Replacement
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#services"
                      onClick={handleServicesClick}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Battery Replacement
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#services"
                      onClick={handleServicesClick}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Water Damage Repair
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#services"
                      onClick={handleServicesClick}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Charging Port Repair
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-brand rounded-full" />
                  Contact Info
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+1234567890" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-3 group">
                      <Phone className="w-4 h-4 text-brand shrink-0" />
                      <span>+92 (306) 8182401</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:mail@rephone.com" className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-3 group">
                      <Mail className="w-4 h-4 text-brand shrink-0" />
                      <span>mail@rephone.com</span>
                    </a>
                  </li>
                  <li>
                    <div className="text-white/70 text-sm flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span>Malak Nadir khan Kalay,<br />Landi Kotal, Dist Khyber</span>
                    </div>
                  </li>
                  <li>
                    <div className="text-white/70 text-sm flex items-center gap-3">
                      <Clock className="w-4 h-4 text-brand shrink-0" />
                      <span>Mon–Sat: 9AM – 6PM</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <span className="text-white/30">•</span>
                  <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <span className="text-white/30">•</span>
                  <Link to="/cookies" className="text-white/60 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Rephone. All rights reserved. Built with ❤️ for DevBAZM.
            </p>

            <p className="text-white/40 text-xs">
              Designed & Developed by <span className="text-white/60 font-semibold">Waqas Afridi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer