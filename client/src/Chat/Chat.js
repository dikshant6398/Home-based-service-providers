import React, { useContext, useState } from "react";
import { userContext } from "../App";
import url from "../url";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  HiShieldCheck,
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiChatAlt2,
  HiStar,
  HiBriefcase,
  HiClock,
  HiCheckCircle,
  HiArrowLeft,
} from "react-icons/hi";

const Chat = () => {
  const navigate = useNavigate();
  const {
    state: { provider, message, user },
    dispatch,
  } = useContext(userContext);

  const [rated, setRated] = useState(5);
  const [isCreating, setIsCreating] = useState(false);

  // Fallback if user lands on /chat directly without selecting a provider
  if (!provider) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200/80 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <HiBriefcase className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            No Professional Selected
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Please browse our service categories and choose a specialist to view their full details.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Explore Services
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${provider.fname || ""} ${provider.lname || ""}`.trim() || "Service Professional";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const create = async () => {
    try {
      setIsCreating(true);
      const token = sessionStorage.getItem("token");
      const { data } = await axios.post(
        `${url}/api/client/create`,
        {
          user: user?._id || user?.id,
          provider: provider._id,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "create", payload: data._id });
      dispatch({
        type: "chat",
        payload: {
          chatId: data._id,
          message: [],
          puser: 0,
          latest: "Say Hi!",
          provider: provider,
        },
      });
    } catch (error) {
      console.log("Error creating chat session:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const goChatting = async () => {
    let activeChat = null;
    if (message && message.length) {
      activeChat = message.find(
        (obj) => obj.provider && obj.provider._id === provider._id
      );
    }

    if (activeChat) {
      dispatch({ type: "chat", payload: activeChat });
    } else {
      await create();
    }
    navigate("/chatting");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors">
            <HiArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Specialist Profile</span>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          
          {/* Top Banner Accent */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 relative">
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available Today</span>
            </div>
          </div>

          <div className="px-6 sm:px-10 pb-8 pt-0">
            {/* Avatar & Rating Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
              <div className="relative inline-block self-center sm:self-auto">
                <div className="w-28 h-28 rounded-3xl bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-inner">
                    {initials || "SP"}
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 p-1 bg-white rounded-full shadow-md">
                  <HiShieldCheck className="w-6 h-6 text-blue-600" title="Verified Professional" />
                </span>
              </div>

              {/* Star Rating Display */}
              <div className="flex flex-col items-center sm:items-end self-center sm:self-end">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, index) => (
                    <HiStar
                      key={index}
                      className={`w-5 h-5 cursor-pointer ${
                        index < rated ? "fill-current" : "text-slate-200"
                      }`}
                      onClick={() => setRated(index + 1)}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-500 mt-1">
                  {rated}.0 / 5.0 (48+ Customer Reviews)
                </span>
              </div>
            </div>

            {/* Name and Profession Heading (clearly situated below banner with clean spacing) */}
            <div className="text-center sm:text-left space-y-1 mb-6">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {fullName}
                </h1>
              </div>
              <p className="text-sm font-semibold text-blue-600 flex items-center justify-center sm:justify-start gap-1">
                <HiBriefcase className="w-4 h-4" />
                <span>{provider.profession || "Home Repair Expert"}</span>
              </p>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-8 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Background Verified & Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <HiClock className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Under 60 Mins Doorstep Arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <HiShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>30-Day Free Reservice Warranty</span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8 border-b border-slate-100">
              <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Service Location
                </span>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                  <HiLocationMarker className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {provider.city ? `${provider.city}, ${provider.state || ""}` : "Local Area"}
                    {provider.pincode ? ` (${provider.pincode})` : ""}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Direct Phone
                </span>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                  <HiPhone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{provider.mobile || "Available upon request"}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email Address
                </span>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                  <HiMail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{provider.email || "partner@servicely.com"}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Experience & Track Record
                </span>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                  <HiBriefcase className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>5+ Years Professional Experience</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
              {provider.mobile && (
                <a
                  href={`tel:${provider.mobile}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-2xs transition-colors"
                >
                  <HiPhone className="w-5 h-5 text-emerald-600" />
                  <span>Call Professional</span>
                </a>
              )}

              <button
                type="button"
                onClick={goChatting}
                disabled={isCreating}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-60"
              >
                <HiChatAlt2 className="w-5 h-5" />
                <span>{isCreating ? "Connecting..." : "Start Real-Time Chat"}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
