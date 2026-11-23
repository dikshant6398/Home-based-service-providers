import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { HiShieldCheck, HiLightningBolt, HiStar } from "react-icons/hi";

const Banner = () => {
  const quickCategories = [
    { name: "Plumber", query: "Plumber" },
    { name: "Electrician", query: "Electrician" },
    { name: "AC Repair", query: "Air Conditioner" },
    { name: "Home Cleaning", query: "HomeWorker" },
    { name: "Salon at Home", query: "Salon For Women" },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Verified Experts in Your Neighborhood
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Expert Home Services, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Delivered on Demand.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From emergency pipe leaks to AC maintenance and salon visits, connect with certified professionals within minutes.
            </p>

            {/* Search Input Box */}
            <div className="pt-2">
              <SearchBar />
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Popular:</span>
              {quickCategories.map((cat, i) => (
                <Link
                  key={i}
                  to={`/Service?${encodeURIComponent(cat.query)}`}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all shadow-2xs"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <HiShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">100% Verified</div>
                  <div className="text-[11px] text-slate-500">Background Checked</div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <HiLightningBolt className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Quick Match</div>
                  <div className="text-[11px] text-slate-500">Under 60 mins</div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <HiStar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">4.8 / 5 Rating</div>
                  <div className="text-[11px] text-slate-500">Trusted Quality</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-3xl blur-2xl -z-10" />
              <img
                src="/Images/banner2.png"
                alt="Servicely Home Services"
                className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
