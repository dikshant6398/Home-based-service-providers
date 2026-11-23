import React, { useContext, useState, useRef, useEffect } from "react";
import { userContext } from "../App";
import { HiPaperAirplane, HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();
  const {
    state: { chat, user },
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
        id: chat.user?._id || user?._id,
        chatId: chat._id,
        sender: 2, // 2 = Provider
        content: content.trim(),
      },
    });
    setContent("");
  };

  const customerName =
    (chat?.user && `${chat.user.fname || ""} ${chat.user.lname || ""}`.trim()) ||
    (user && `${user.fname || ""} ${user.lname || ""}`.trim()) ||
    "Customer";

  const initials = customerName
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

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              {initials || "C"}
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {customerName}
              </h3>
              <p className="text-xs text-slate-500">Service Customer</p>
            </div>
          </div>

          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            Client Inquiry
          </div>
        </div>

        {/* Messages Body */}
        <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-slate-50/60">
          {chat && chat.message && chat.message.length > 0 ? (
            chat.message.map((item, idx) => {
              const isProvider = item.sender === 2;
              return (
                <div
                  key={idx}
                  className={`flex ${isProvider ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] sm:max-w-md px-4 py-2.5 text-sm shadow-xs ${
                      isProvider
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
              <p className="text-sm font-semibold text-slate-600">No messages yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Your conversation with this customer will appear here.
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
            placeholder="Reply to customer..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-sm shadow-blue-500/20 active:scale-95 transition-all"
            aria-label="Send reply"
          >
            <HiPaperAirplane className="w-5 h-5 rotate-90" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default Chats;
