import Page from "./Page";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

const Card = (props) => {
  const categoryItems = Page.filter((item) => props.type === item.type);

  if (categoryItems.length === 0) return null;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <HiSparkles className="w-3.5 h-3.5" />
            <span>Category</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {props.type}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-0 font-medium">
          Verified specialists available on demand
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryItems.map((e, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Service Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={`/Images/${e.imgproname}.jpg`}
                alt={e.proname}
                onError={(err) => {
                  err.target.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm">
                Verified
              </div>
            </div>

            {/* Service Info & Action */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {props.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                  {e.proname}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Doorstep inspection, genuine spare parts, and guaranteed workmanship.
                </p>
              </div>

              <Link
                to={`/Service?${encodeURIComponent(e.proname)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-800 group-hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs"
              >
                <span>View Professionals</span>
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;
