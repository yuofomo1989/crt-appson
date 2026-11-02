"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { 
  MessageSquare, X, Send, Phone, Mail, HelpCircle, 
  ChevronRight, Volume2, VolumeX, RotateCcw, 
  CheckCircle2, Sparkles, User, ShieldCheck, Clock, ExternalLink
} from "lucide-react";

export default function FloatingChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'faq' | 'contact'
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // User details & Session state
  const [ticketId, setTicketId] = useState(null);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isIdentified, setIsIdentified] = useState(false);
  const [showIdentifyForm, setShowIdentifyForm] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isAdvisorTyping, setIsAdvisorTyping] = useState(false);

  // Accordion state for FAQs
  const [expandedFaq, setExpandedFaq] = useState(0);

  const messagesEndRef = useRef(null);

  // Play a soft high-quality notification chime using Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {}
  };

  // Determine current page topic
  const getPageTopic = () => {
    if (!pathname) return "General Training";
    if (pathname.includes("pmp")) return "PMP® Certification Training";
    if (pathname.includes("agile")) return "Agile & Scrum Programs";
    if (pathname.includes("cissp") || pathname.includes("security")) return "Cybersecurity & CISSP";
    if (pathname.includes("courses")) return "Certification Programs";
    if (pathname.includes("corporate")) return "Corporate Workforce Training";
    return "Certification Planner";
  };

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("cp_chat_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed.ticketId) setTicketId(parsed.ticketId);
        if (parsed.ticketNumber) setTicketNumber(parsed.ticketNumber);
        if (parsed.userName) {
          setUserName(parsed.userName);
          setIsIdentified(true);
        }
        if (parsed.userEmail) setUserEmail(parsed.userEmail);
        if (parsed.userPhone) setUserPhone(parsed.userPhone);
      }

      // Check if user previously closed the floating speech bubble in this session
      const bubbleDismissed = sessionStorage.getItem("cp_chat_bubble_dismissed");
      if (bubbleDismissed) {
        setShowSpeechBubble(false);
      }
    } catch (e) {}
  }, []);

  // Fetch ticket messages if ticketId exists
  const fetchTicketMessages = async (tId) => {
    if (!tId) return;
    try {
      const res = await fetch(`/api/chat?ticket_id=${tId}`);
      const data = await res.json();
      if (data.success && data.ticket && Array.isArray(data.ticket.messages)) {
        setMessages(data.ticket.messages);
        setTicketNumber(data.ticket.ticket_number);
      }
    } catch (e) {}
  };

  // Initial greeting if no messages yet
  useEffect(() => {
    if (ticketId) {
      fetchTicketMessages(ticketId);
    } else {
      const topic = getPageTopic();
      setMessages([
        {
          id: "welcome-1",
          sender: "support",
          sender_name: "Sarah Mitchell (Senior Advisor)",
          message: `Hello! 👋 Welcome to Certification Planner. I am Sarah, your dedicated learning specialist. How can I assist you with your ${topic} goals today?`,
          created_at: new Date().toISOString()
        }
      ]);
    }
  }, [ticketId]);

  // Periodic polling for live advisor replies when widget is open and ticket exists
  useEffect(() => {
    if (!isOpen || !ticketId) return;
    const interval = setInterval(() => {
      fetchTicketMessages(ticketId);
    }, 7000);
    return () => clearInterval(interval);
  }, [isOpen, ticketId]);

  // Scroll to bottom on message updates
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isAdvisorTyping]);

  // Handle sending a message
  const handleSendMessage = async (textToSend, overrideName, overrideEmail, overridePhone) => {
    const msg = (textToSend || inputText).trim();
    if (!msg || isSending) return;

    const activeName = overrideName || userName;
    const activeEmail = overrideEmail || userEmail;
    const activePhone = overridePhone || userPhone;

    // If user is not identified yet and sends a custom query, ask them for their details
    if (!isIdentified && !activeEmail && !overrideEmail) {
      setShowIdentifyForm(true);
      return;
    }

    setInputText("");
    setIsSending(true);

    // Optimistic local add
    const tempId = "temp-" + Date.now();
    const optimisticMsg = {
      id: tempId,
      sender: "student",
      sender_name: activeName || "You",
      message: msg,
      created_at: new Date().toISOString()
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId,
          name: activeName || "Website Visitor",
          email: activeEmail || "",
          phone: activePhone || "",
          message: msg,
          course_title: getPageTopic(),
          page_url: typeof window !== "undefined" ? window.location.pathname : "/",
          sender: "student",
          sender_name: activeName || "Visitor"
        })
      });

      const data = await res.json();
      if (data.success && data.ticket) {
        setTicketId(data.ticket.id);
        setTicketNumber(data.ticket.ticket_number);
        setMessages(data.ticket.messages || []);

        // Save session locally
        localStorage.setItem("cp_chat_session", JSON.stringify({
          ticketId: data.ticket.id,
          ticketNumber: data.ticket.ticket_number,
          userName: activeName,
          userEmail: activeEmail,
          userPhone: activePhone
        }));

        playChime();
      }
    } catch (err) {
      console.error("Chat send error:", err);
    } finally {
      setIsSending(false);
      setShowIdentifyForm(false);
    }
  };

  // Submit Lead details form
  const handleIdentifySubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;
    setIsIdentified(true);
    setShowIdentifyForm(false);

    localStorage.setItem("cp_chat_session", JSON.stringify({
      ticketId,
      ticketNumber,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      userPhone: userPhone.trim()
    }));

    // Send the pending input text
    handleSendMessage(inputText || "Hello, I would like to speak to an advisor about upcoming course options.", userName.trim(), userEmail.trim(), userPhone.trim());
  };

  // Reset chat session to start fresh
  const handleResetChat = () => {
    if (confirm("Start a new chat conversation?")) {
      localStorage.removeItem("cp_chat_session");
      setTicketId(null);
      setTicketNumber(null);
      setUserName("");
      setUserEmail("");
      setUserPhone("");
      setIsIdentified(false);
      setShowIdentifyForm(false);
      const topic = getPageTopic();
      setMessages([
        {
          id: "welcome-reset",
          sender: "support",
          sender_name: "Sarah Mitchell (Senior Advisor)",
          message: `Hello! 👋 How can I help you today with ${topic}?`,
          created_at: new Date().toISOString()
        }
      ]);
    }
  };

  // Quick Action Chips
  const quickChips = [
    { label: "📅 Upcoming Schedules", text: "What are the upcoming batch dates and weekend timings?" },
    { label: "💰 Discount Offers", text: "Are there any active corporate or holiday discount promo codes?" },
    { label: "🎓 100% Pass Guarantee", text: "Could you explain how your 100% Exam Pass Guarantee works?" },
    { label: "📞 Request Callback", text: "I would like to speak to an advisor directly. Please call me." }
  ];

  // FAQs data
  const faqs = [
    {
      q: "What is the 100% Pass Protection Guarantee?",
      a: "Our programs include comprehensive 100% pass protection. If you don't pass your certification exam on your first attempt after completing our bootcamp and practice tests, we pay for your exam retake fees or offer free unlimited repeat classes."
    },
    {
      q: "Can I transfer or reschedule my batch dates?",
      a: "Yes! We offer 100% flexible rescheduling. You can switch between weekday, weekend, or evening batches at zero penalty fee by notifying us before the batch commencement."
    },
    {
      q: "Are 35 PDUs / Contact Hours provided?",
      a: "Yes, all our courses provide official accredited PDUs / Contact Hours required by PMI®, AXELOS, and Scrum Alliance for your exam applications."
    },
    {
      q: "Do you offer corporate or group discounts?",
      a: "Yes! For teams of 3 or more professionals, we provide dedicated corporate discounts ranging from 15% to 30%, along with customized company billing."
    }
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. FLOATING TRIGGER BUTTON & INVITATION SPEECH BUBBLE
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 select-none">
        {/* Invitation Speech Bubble */}
        {!isOpen && showSpeechBubble && (
          <div 
            onClick={() => { setIsOpen(true); setShowSpeechBubble(false); }}
            className="group relative cursor-pointer bg-white border border-slate-200/90 shadow-xl rounded-2xl py-2.5 px-4 max-w-[270px] hover:border-blue-400 hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            {/* Dismiss cross on speech bubble */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeechBubble(false);
                sessionStorage.setItem("cp_chat_bubble_dismissed", "true");
              }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] transition shadow"
              title="Dismiss prompt"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Need help? Speak to us here
              </p>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 pl-4">
              Sarah · <span className="text-emerald-600 font-semibold">Active now</span> for instant answers
            </p>

            {/* Bubble Tail Pointing Right */}
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-200/90 rotate-45"></div>
          </div>
        )}

        {/* Floating Avatar Circle Trigger */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setShowSpeechBubble(false);
              setUnreadCount(0);
            }
          }}
          aria-label="Open Live Chat Support"
          className="relative group w-14 h-14 rounded-full bg-slate-900 border-2 border-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        >
          {isOpen ? (
            <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center">
              <X size={24} className="transition group-hover:rotate-90 duration-200" />
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src="/images/contact_support_agent.jpg"
                alt="Sarah Mitchell - Learning Advisor"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = '<div class="w-full h-full bg-blue-700 text-white flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>';
                }}
              />
              {/* Online pulse dot */}
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
          )}

          {/* Unread badge */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. EXPANDED LIVE CHAT & SUPPORT MODAL
      ───────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans"
        >
          {/* Top Gradient Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-500"></div>

          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-inner flex-shrink-0">
                <img
                  src="/images/contact_support_agent.jpg"
                  alt="Advisor"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight text-white leading-none">
                    Sarah Mitchell
                  </h3>
                  <span className="inline-flex items-center text-[10px] font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-400/30">
                    <ShieldCheck size={10} className="mr-0.5 text-blue-400" /> ATP
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1">
                  Senior Learning Advisor · <span className="text-emerald-400 font-medium">Online</span>
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Mute notification sounds" : "Enable notification sounds"}
                className="p-1.5 hover:bg-slate-800 rounded-lg transition"
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-slate-500" />}
              </button>
              <button
                onClick={handleResetChat}
                title="Restart chat"
                className="p-1.5 hover:bg-slate-800 rounded-lg transition"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 hover:bg-slate-800 rounded-lg transition text-white hover:text-rose-400"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Live Chat / FAQs / Call) */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 px-2 pt-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === "chat"
                  ? "border-blue-600 text-blue-600 font-bold bg-white rounded-t-lg"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <MessageSquare size={14} /> Live Advisor
              {ticketNumber && (
                <span className="text-[9px] bg-slate-200 text-slate-700 px-1 rounded font-mono">
                  #{ticketNumber.slice(-4)}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex-1 py-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === "faq"
                  ? "border-blue-600 text-blue-600 font-bold bg-white rounded-t-lg"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <HelpCircle size={14} /> Instant FAQs
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-2 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeTab === "contact"
                  ? "border-blue-600 text-blue-600 font-bold bg-white rounded-t-lg"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Phone size={14} /> Call & Connect
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              TAB 1: LIVE CHAT CONVERSATION
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
              {/* Context Banner */}
              <div className="bg-amber-50/80 border-b border-amber-200/60 px-3 py-1.5 flex items-center justify-between text-[11px] text-amber-900">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles size={12} className="text-amber-600" />
                  Subject: <strong className="font-bold">{getPageTopic()}</strong>
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded font-semibold">
                  100% Pass Support
                </span>
              </div>

              {/* Message History Container */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                {messages.map((m, idx) => {
                  const isUser = m.sender === "student" || m.sender === "user";
                  return (
                    <div
                      key={m.id || idx}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1 animate-in fade-in duration-200`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                        <span>{isUser ? (m.sender_name || "You") : "Sarah Mitchell"}</span>
                        <span>•</span>
                        <span>
                          {m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Just now"}
                        </span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-blue-600 text-white rounded-tr-xs"
                            : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                        }`}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })}

                {/* Advisor typing simulator */}
                {isAdvisorTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-2xl w-fit shadow-sm">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-600">Sarah is typing...</span>
                  </div>
                )}

                {/* Identification / Lead Capture Card if prompted */}
                {showIdentifyForm && !isIdentified && (
                  <div className="bg-white border-2 border-blue-500/30 rounded-xl p-3.5 shadow-md my-2 animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs mb-1">
                      <User size={14} className="text-blue-600" />
                      Where should our advisor send your reply?
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2.5">
                      Please enter your contact details so our specialist can deliver your syllabus, schedule & quote:
                    </p>
                    <form onSubmit={handleIdentifySubmit} className="space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Work / Personal Email *"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp (Optional for instant SMS)"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-1.5 rounded-lg transition shadow"
                        >
                          Continue & Send Query
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowIdentifyForm(false)}
                          className="text-xs text-slate-500 hover:text-slate-700 px-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Action Suggestion Chips (when 2 or fewer messages) */}
              {messages.length <= 2 && (
                <div className="p-2 border-t border-slate-200/80 bg-white">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                    Quick Suggestions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip.text)}
                        className="text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200/90 transition text-left"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input Footer */}
              <div className="p-2.5 bg-white border-t border-slate-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white text-slate-800 transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isSending}
                    className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition shadow flex-shrink-0"
                    title="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
                  <span>🔒 256-bit Secure Channel</span>
                  <span className="font-semibold text-slate-500">Avg reply: &lt; 2 mins</span>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: INSTANT FAQS ACCORDION
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "faq" && (
            <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-slate-50/50">
              <div className="mb-2">
                <h4 className="text-xs font-bold text-slate-900">Frequently Asked Questions</h4>
                <p className="text-[11px] text-slate-500">Instant answers to key inquiries</p>
              </div>

              {faqs.map((faq, i) => {
                const isExpanded = expandedFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-200/90 rounded-xl overflow-hidden transition shadow-sm"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? -1 : i)}
                      className="w-full text-left p-3 flex items-center justify-between gap-2 hover:bg-slate-50/80 transition"
                    >
                      <span className="text-xs font-semibold text-slate-800">{faq.q}</span>
                      <ChevronRight
                        size={14}
                        className={`text-slate-400 transition-transform ${isExpanded ? "rotate-90 text-blue-600" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-3 pb-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/30">
                        {faq.a}
                        <button
                          onClick={() => {
                            setActiveTab("chat");
                            handleSendMessage(`I would like more information regarding: "${faq.q}"`);
                          }}
                          className="mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Ask advisor more about this <ChevronRight size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: DIRECT CONTACT & CALL
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "contact" && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Connect With An Advisor Directly</h4>
                <p className="text-[11px] text-slate-500">We are ready to guide you 24/7</p>
              </div>

              {/* Call Card */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium">Toll-Free USA / Canada</p>
                    <p className="text-xs font-bold text-slate-900">+1-855-322-1201</p>
                  </div>
                </div>
                <a
                  href="tel:+18553221201"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition shadow"
                >
                  Call Now
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium">Official Support Email</p>
                    <p className="text-xs font-bold text-slate-900">support@certificationplanner.com</p>
                  </div>
                </div>
                <a
                  href="mailto:support@certificationplanner.com?subject=Inquiry from Website Chat"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-lg transition"
                >
                  Email Us
                </a>
              </div>

              {/* Office Hours Card */}
              <div className="bg-blue-50/70 border border-blue-200/60 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
                  <Clock size={14} className="text-blue-600" /> Operational Advisory Hours
                </div>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Monday – Friday: 24/7 Live Advisor Support<br />
                  Saturday – Sunday: 8:00 AM – 8:00 PM EST
                </p>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-around text-slate-400">
                <div className="text-center">
                  <ShieldCheck size={20} className="mx-auto text-emerald-500 mb-0.5" />
                  <p className="text-[10px] font-semibold text-slate-600">100% Pass Protection</p>
                </div>
                <div className="text-center">
                  <CheckCircle2 size={20} className="mx-auto text-blue-500 mb-0.5" />
                  <p className="text-[10px] font-semibold text-slate-600">PMI® Authorized ATP</p>
                </div>
                <div className="text-center">
                  <Sparkles size={20} className="mx-auto text-amber-500 mb-0.5" />
                  <p className="text-[10px] font-semibold text-slate-600">4.9/5 Student Rating</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
