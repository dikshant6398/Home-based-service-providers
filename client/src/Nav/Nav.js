import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../App";
import { HiMenu, HiX, HiLocationMarker, HiChatAlt2, HiUserCircle, HiLogout } from "react-icons/hi";

export default function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const {
    state: { onLine, location, user, provider },
  } = useContext(userContext);

  const displayName =
    (user && (user.fname || user.name)) ||
    (provider && (provider.fname || provider.name)) ||
    localStorage.getItem("name") ||
    "Account";

  const isProvider = Number(onLine) === 2 || Number(localStorage.getItem("onLine")) === 2;
  const isClient = Number(onLine) === 1 || Number(localStorage.getItem("onLine")) === 1;
  const isLoggedIn = isProvider || isClient;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Brand Logo & Location Pill */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to={isProvider ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Servicely
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 -mt-1">
                  Home Services
                </span>
              </div>
            </Link>

            {/* Location Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 text-xs font-medium border border-slate-200/60 hover:bg-slate-200/60 transition-colors">
              <HiLocationMarker className="w-4 h-4 text-blue-600" />
              <span>
                {location && location.city && location.city !== "default"
                  ? `${location.city}${location.postalCode ? ` (${location.postalCode})` : ""}`
                  : "India"}
              </span>
            </div>
          </div>

          {/* Center / Right: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to={isProvider ? "/dashboard" : "/"}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/message"
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <HiChatAlt2 className="w-4 h-4 text-slate-500" />
                  <span>Messages</span>
                </Link>

                <Link
                  to="/edituser"
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <HiUserCircle className="w-4 h-4 text-slate-500" />
                  <span>{displayName}</span>
                </Link>

                <Link
                  to={isProvider ? "/out" : "/logout"}
                  className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <HiLogout className="w-4 h-4" />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Partner Login
                </Link>

                <div className="h-4 w-px bg-slate-200" />

                <Link
                  to="/register"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Register as Pro
                </Link>

                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 active:scale-95 transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle navigation"
            >
              {navbarOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {navbarOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-xs text-slate-600">
            <HiLocationMarker className="w-4 h-4 text-blue-600" />
            <span>
              {location && location.city && location.city !== "default"
                ? `${location.city}${location.postalCode ? ` - ${location.postalCode}` : ""}`
                : "India"}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <Link
              to={isProvider ? "/dashboard" : "/"}
              onClick={() => setNavbarOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/message"
                  onClick={() => setNavbarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <HiChatAlt2 className="w-5 h-5 text-slate-500" />
                  <span>Messages</span>
                </Link>
                <Link
                  to="/edituser"
                  onClick={() => setNavbarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <HiUserCircle className="w-5 h-5 text-slate-500" />
                  <span>Profile ({displayName})</span>
                </Link>
                <Link
                  to={isProvider ? "/out" : "/logout"}
                  onClick={() => setNavbarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <HiLogout className="w-5 h-5" />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <Link
                  to="/signin"
                  onClick={() => setNavbarOpen(false)}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                >
                  Sign In
                </Link>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setNavbarOpen(false)}
                    className="text-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50"
                  >
                    Partner Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setNavbarOpen(false)}
                    className="text-center px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50"
                  >
                    Join as Pro
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
