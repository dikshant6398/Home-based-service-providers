import React, { useContext, useState, useRef, useEffect } from "react";
import { userContext } from "../App";
import { HiPaperAirplane, HiShieldCheck, HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Chatting = () => {
  const navigate = useNavigate();
  const {
    state: { provider, chat },
    dispatch,
  } = useContext(userContext);

  const [content, setContent] = useState("");
  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.message]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!content.trim() || !chat) return;

    dispatch({
      type: "send",
      payload: {
        id: chat.provider?._id || provider?._id,
        chatId: chat._id,
        sender: 1,
        content: content.trim(),
      },
    });
    setContent("");
  };

  const providerName =
    (provider && `${provider.fname || ""} ${provider.lname || ""}`.trim()) ||
    (chat?.provider && `${chat.provider.fname || ""} ${chat.provider.lname || ""}`.trim()) ||
    "Service Professional";

  const initials = providerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col h-[75vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Go back"
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {initials || "SP"}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {providerName}
                </h3>
                <HiShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-slate-500">
                {provider?.profession || "Home Specialist"} • {provider?.city || "Local"}
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
            Online
          </div>
        </div>

        {/* Messages Body */}
        <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-slate-50/60">
          {chat && chat.message && chat.message.length > 0 ? (
            chat.message.map((item, idx) => {
              const isUser = item.sender === 1;
              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] sm:max-w-md px-4 py-2.5 text-sm shadow-xs ${
                      isUser
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-xs"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-2xl rounded-tl-xs"
                    }`}
                  >
                    <p className="leading-relaxed break-words">{item.content}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <HiPaperAirplane className="w-6 h-6 rotate-45" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Say hello!</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Describe your repair requirement, share your address, or ask for a price quote.
              </p>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={handleSend}
          className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-sm shadow-blue-500/20 active:scale-95 transition-all"
            aria-label="Send message"
          >
            <HiPaperAirplane className="w-5 h-5 rotate-90" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default Chatting;
