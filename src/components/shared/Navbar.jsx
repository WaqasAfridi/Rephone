import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to='/' className="flex items-center gap-3">
            <img
              src="/Rephone-logo.png"
              alt="Rephone logo"
              className="w-28 sm:w-32 md:w-40 lg:w-44 object-contain"
            />
            <span className="sr-only">Rephone — make it alive</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem to="/" end>
              HOME
            </NavItem>

            <NavItem to="/admin">
              ADMIN DASHBOARD
            </NavItem>

            <NavLink to="/booking" className="inline-block" aria-label="Start booking now">
              <button className="px-4 py-2 rounded-lg font-semibold text-white shadow-md bg-brand hover:opacity-95 active:scale-95 transition">
                START BOOKING NOW
              </button>
            </NavLink>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center md:hidden">
            <NavLink to="/booking" className="mr-2">
              <button className="px-3 py-2 rounded-md text-sm font-semibold text-white bg-brand">
                BOOK
              </button>
            </NavLink>

            <button
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <svg
                className="w-6 h-6 text-brand-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden transition-max-h duration-300 overflow-hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-4 pb-6 pt-2 space-y-2">
          <MobileNavItem to="/" onNavigate={() => setOpen(false)}>HOME</MobileNavItem>
          <MobileNavItem to="/admin" onNavigate={() => setOpen(false)}>ADMIN DASHBOARD</MobileNavItem>
          <div className="px-2">
            <NavLink to="/booking" onClick={() => setOpen(false)}>
              <button className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-brand">START BOOKING NOW</button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Desktop NavLink item — purely class-based (no inline style) */
function NavItem({ to, end = false, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "text-sm font-semibold tracking-wider transition-all",
          isActive
            ? "text-brand underline decoration-4 underline-offset-4"
            : "text-brand-dark no-underline",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

/* Mobile NavItem — purely class-based */
function MobileNavItem({ to, children, onNavigate = () => { } }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "block px-3 py-3 rounded-md text-base font-semibold",
          isActive ? "text-brand underline decoration-4 underline-offset-4" : "text-brand-dark no-underline",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default Navbar