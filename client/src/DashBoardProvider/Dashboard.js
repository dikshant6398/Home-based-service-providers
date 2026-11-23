import React, { useContext } from "react";
import { userContext } from "../App";
import { Link } from "react-router-dom";
import {
  HiShieldCheck,
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiChatAlt2,
  HiUserCircle,
  HiStar,
  HiBriefcase,
} from "react-icons/hi";

const Dashboard = () => {
  const {
    state: { provider, message },
  } = useContext(userContext);

  const fullName =
    (provider && `${provider.fname || ""} ${provider.lname || ""}`.trim()) ||
    localStorage.getItem("name") ||
    "Service Partner";

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalInquiries = Array.isArray(message) ? message.length : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                {initials || "SP"}
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm">
                <HiShieldCheck className="w-6 h-6 text-blue-600" title="Verified Partner" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {fullName}
                  </h1>
                  <p className="text-sm font-semibold text-blue-600 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                    <HiBriefcase className="w-4 h-4" />
                    <span>{provider?.profession || "Home Service Professional"}</span>
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-center sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Work</span>
                </div>
              </div>

              {/* Location & Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <HiLocationMarker className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {provider?.city ? `${provider.city}, ${provider.state || ""}` : "All Areas"}
                    {provider?.pincode ? ` (${provider.pincode})` : ""}
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <HiMail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{provider?.email || "Not specified"}</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <HiPhone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{provider?.mobile || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
              <HiChatAlt2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Active Chats
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {totalInquiries}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl shrink-0">
              <HiStar className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Customer Rating
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                4.9 / 5.0
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              <HiShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Partner Status
              </p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-0.5">
                Verified Pro
              </h3>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/message"
              className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HiChatAlt2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Open Customer Inquiries
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reply to real-time messages and book service appointments
                </p>
              </div>
            </Link>

            <Link
              to="/edituser"
              className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <HiUserCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Edit Profile & Rates
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your service location, profession, or phone number
                </p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
