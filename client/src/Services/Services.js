import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import url from "../url";
import { userContext } from "../App";
import {
  HiLocationMarker,
  HiStar,
  HiShieldCheck,
  HiChatAlt2,
  HiPhone,
  HiOutlineEmojiSad,
  HiArrowLeft,
} from "react-icons/hi";

const Services = () => {
  const {
    state: { location, onLine },
    dispatch,
  } = useContext(userContext);

  const navigate = useNavigate();
  const loc = useLocation();

  // Extract service query: e.g. /Service?Plumber or /service/Home%20Repairs?Plumber
  const queryParam = loc.search ? decodeURIComponent(loc.search.slice(1)) : "";
  const pathParam = loc.pathname.startsWith("/service/")
    ? decodeURIComponent(loc.pathname.slice(9))
    : "";
  const serviceName = queryParam || pathParam || "Home Service";

  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.search, loc.pathname, location.city, location.postalCode]);

  const fetchProviders = async () => {
    setIsLoading(true);
    try {
      const city = location?.city && location.city !== "default" ? location.city : "";
      const pincode = location?.postalCode && location.postalCode !== 0 ? location.postalCode : "";
      const work = serviceName;

      const token = sessionStorage.getItem("token");
      const headers = token ? { Authorization: token } : {};

      const response = await axios.get(
        `${url}/api/client/service?city=${encodeURIComponent(city)}&pincode=${encodeURIComponent(pincode)}&work=${encodeURIComponent(work)}`,
        { headers }
      );

      setFilteredData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("Error fetching providers:", error);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = (item) => {
    const isLoggedIn = Number(onLine) > 0 || Number(localStorage.getItem("onLine")) > 0;
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    dispatch({ type: "provider", payload: item });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
            <HiArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{serviceName}</span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              <HiShieldCheck className="w-4 h-4" />
              <span>Verified Professionals</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {serviceName} Specialists
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Top-rated and background-verified technicians in your area ready for doorstep service.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100/80 border border-slate-200/60 text-xs sm:text-sm text-slate-700 font-medium">
            <HiLocationMarker className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              {location && location.city && location.city !== "default"
                ? `${location.city}${location.postalCode ? ` (${location.postalCode})` : ""}`
                : "All Service Areas"}
            </span>
          </div>
        </div>

        {/* Providers Listing */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Spinner />
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => {
              const fullName = `${item.fname || ""} ${item.lname || ""}`.trim() || "Service Professional";
              const initials = fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={item._id || index}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header: Avatar, Name, Rating */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                        {initials || "SP"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-lg font-bold text-slate-900 truncate">
                            {fullName}
                          </h3>
                          <HiShieldCheck className="w-5 h-5 text-blue-600 shrink-0" title="Verified Pro" />
                        </div>
                        <p className="text-xs font-semibold text-blue-600 mt-0.5">
                          {item.proname || serviceName}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-semibold">
                          <HiStar className="w-4 h-4 fill-current" />
                          <span>4.9</span>
                          <span className="text-slate-400 font-normal">(40+ jobs)</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Details & Address */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <HiLocationMarker className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {item.city ? `${item.city}, ${item.state || ""}` : "Local Area"}
                          {item.pincode ? ` (${item.pincode})` : ""}
                        </span>
                      </div>
                      {item.mobile && (
                        <div className="flex items-center gap-2">
                          <HiPhone className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{item.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
                    {item.mobile ? (
                      <a
                        href={`tel:${item.mobile}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <HiPhone className="w-4 h-4 text-slate-500" />
                        <span>Call</span>
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => handleConnect(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-blue-600/20 transition-all"
                    >
                      <HiChatAlt2 className="w-4 h-4" />
                      <span>Chat & Book</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200/80 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <HiOutlineEmojiSad className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No Providers Listed Yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              We couldn&apos;t find any {serviceName} experts registered in this location right now. New partners join every week!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
              >
                Browse All Services
              </Link>
              <Link
                to="/register"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                Join as a Professional
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
