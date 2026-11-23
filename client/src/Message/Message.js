import React, { useContext, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import url from "../url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiSearch, HiChatAlt2, HiChevronRight } from "react-icons/hi";

const Message = () => {
  const toastoptions = {
    position: "top-center",
    autoClose: 5000,
    theme: "light",
  };

  const {
    state: { onLine, message, user, provider },
    dispatch,
  } = useContext(userContext);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const isClient = Number(onLine) === 1 || Number(localStorage.getItem("onLine")) === 1;

  const create = async (targetProvider) => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.post(
        `${url}/api/client/create`,
        {
          user: user?._id || user?.id,
          provider: targetProvider?._id,
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
        },
      });
    } catch (error) {
      toast.error(error.message || "Failed to create conversation", toastoptions);
    }
  };

  const goChatting = async (item) => {
    if (isClient) {
      dispatch({ type: "provider", payload: item.provider });
    } else {
      dispatch({ type: "user", payload: item.user });
    }

    let present = false;
    if (message && message.length) {
      present = message.some((obj) => {
        if (!obj.provider) return false;
        if (obj.provider._id === item.provider?._id) {
          dispatch({ type: "chat", payload: obj });
          return true;
        }
        return false;
      });
    }

    if (!present && isClient && item.provider) {
      await create(item.provider);
    } else {
      dispatch({ type: "chat", payload: item });
    }

    if (isClient) {
      navigate("/chatting");
    } else {
      navigate("/dashboard/chatting");
    }
  };

  const conversationList = Array.isArray(message) ? message : [];
  const filteredList = conversationList.filter((item) => {
    const partner = isClient ? item.provider : item.user;
    const name = `${partner?.fname || ""} ${partner?.lname || ""}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Messages
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your conversations with {isClient ? "service professionals" : "clients"}
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 self-start sm:self-auto">
            {filteredList.length} Active {filteredList.length === 1 ? "Chat" : "Chats"}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <HiSearch className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-white border border-slate-200/80 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 shadow-xs transition-all"
          />
        </div>

        {/* Conversations Card List */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredList.length > 0 ? (
            filteredList.map((item, idx) => {
              const partner = isClient ? item.provider : item.user;
              const partnerName =
                `${partner?.fname || ""} ${partner?.lname || ""}`.trim() ||
                (isClient ? "Service Pro" : "Customer");

              const initials = partnerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div
                  key={item._id || idx}
                  onClick={() => goChatting(item)}
                  className="p-4 sm:p-5 flex items-center gap-4 hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/10">
                      {initials || "SP"}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {partnerName}
                      </h3>
                      {partner?.profession && (
                        <span className="text-[11px] font-semibold text-blue-600 px-2 py-0.5 rounded-full bg-blue-50 shrink-0">
                          {partner.profession}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-1">
                      {item.latest || "Click to open conversation..."}
                    </p>
                  </div>

                  <HiChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })
          ) : (
            <div className="py-16 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <HiChatAlt2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No conversations yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {isClient
                  ? "Browse our home service categories and connect with a verified professional to start chatting."
                  : "When customers in your area request your services, their inquiries will appear here."}
              </p>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Message;
