"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Calendar, Clock, MapPin, Download, ShieldCheck, Mail, ArrowRight, Phone, MessageSquare, ExternalLink, Users } from "lucide-react";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId") || "CP-ENR-2026-56890";
  const queryAmount = searchParams.get("amount") || "1095";

  const [order, setOrder] = useState({
    orderId: queryOrderId,
    course: "PMP® Certification Training",
    format: "Live Online Class",
    price: queryAmount,
    date: "May 27 – May 30, 2024",
    customerName: "Student",
    time: "9:00 AM – 5:00 PM (EST)",
    location: "New York, NY (Online)",
    duration: "4 Days | 35 Contact Hours"
  });

  const [currentDate, setCurrentDate] = useState("May 16, 2024 | 10:24 AM (EST)");

  useEffect(() => {
    // Generate actual current time for order confirmation display
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) + " | " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });
    setCurrentDate(formatted);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cp_latest_order");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setOrder({
            orderId: parsed.orderId || queryOrderId,
            course: parsed.course || "PMP® Certification Training",
            format: parsed.format || "Live Online Class",
            price: parsed.price || queryAmount,
            date: parsed.date || "May 27 – May 30, 2024",
            customerName: parsed.customerName || "Student",
            time: "9:00 AM – 5:00 PM (EST)",
            location: parsed.location || "New York, NY (Online)",
            duration: "4 Days | 35 Contact Hours"
          });
        } catch (e) {
          console.error("Error parsing latest order details", e);
        }
      }
    }
  }, [queryOrderId, queryAmount]);

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-6 space-y-12">
        
        {/* ==========================================
            1. TOP CONGRATULATIONS BANNER CARD
            ========================================== */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-brand-navy tracking-tight">Congratulations!</h1>
              <p className="text-sm font-extrabold text-brand-navy">You're All Set.</p>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                Your enrollment is confirmed. We've sent a confirmation email with all the details to{" "}
                <span className="text-brand-blue font-bold">student@email.com</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center shrink-0 w-full lg:w-auto">
            {/* Order Detail Pill */}
            <div className="bg-[#f2faf5] border border-[#d3f2df] rounded-2xl p-4 space-y-1 text-left w-full sm:w-auto min-w-[200px]">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order Details</p>
              <p className="text-sm font-black text-brand-navy">
                Order Number: <span className="text-emerald-600 font-bold">{order.orderId}</span>
              </p>
              <p className="text-[10px] text-gray-400 font-semibold">{currentDate}</p>
            </div>

            {/* Email Notification Card */}
            <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-4 flex gap-3 text-[11px] text-gray-600 font-medium max-w-[280px]">
              <Mail size={20} className="text-brand-blue shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. WHAT'S NEXT (PROCESS STEPS)
            ========================================== */}
        <div className="space-y-6">
          <h2 className="text-base font-black text-brand-navy text-left uppercase tracking-wider">What's Next?</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {[
              { num: 1, title: "Access Your Account", desc: "Log in to your student dashboard to access course materials.", bg: "bg-blue-50/30 border-blue-100 text-brand-blue", icon: "💻" },
              { num: 2, title: "Check Your Email", desc: "You'll receive an email with login details and important information.", bg: "bg-orange-50/30 border-orange-100 text-brand-orange", icon: "✉" },
              { num: 3, title: "Mark Your Calendar", desc: "Add your class schedule to your calendar and get ready to learn.", bg: "bg-emerald-50/30 border-emerald-100 text-brand-green", icon: "📅" },
              { num: 4, title: "We're Here to Help", desc: "Our support team is here for any assistance you may need.", bg: "bg-purple-50/30 border-purple-100 text-purple-600", icon: "🎧" }
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{step.icon}</span>
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black border ${step.bg}`}>
                      {step.num}
                    </span>
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-xs font-extrabold text-brand-navy">{step.title}</h3>
                    <p className="text-[10px] text-gray-400 font-bold leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            3. SPLIT SUMMARY COLUMNS GRID
            ========================================== */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Your Course Details */}
          <div className="lg:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
            <h3 className="text-sm font-extrabold text-brand-navy border-b border-gray-50 pb-3">Your Course Details</h3>

            <div className="flex gap-4">
              <div className="h-14 w-14 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-black text-sm shrink-0 border border-blue-100">
                PMP®
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-brand-navy leading-tight">{order.course}</p>
                <span className="inline-block bg-blue-50 text-brand-blue text-[9px] font-bold px-2 py-0.5 rounded">
                  {order.format}
                </span>
                
                <div className="pt-2 space-y-1.5 text-[10px] text-gray-400 font-bold">
                  <p className="flex items-center gap-2"><Calendar size={12} className="text-gray-400" /> {order.date}</p>
                  <p className="flex items-center gap-2"><Clock size={12} className="text-gray-400" /> {order.time}</p>
                  <p className="flex items-center gap-2"><MapPin size={12} className="text-gray-400" /> {order.location}</p>
                  <p className="flex items-center gap-2">⏱ {order.duration}</p>
                </div>
              </div>
            </div>

            {/* Access Information Box */}
            <div className="bg-slate-50/50 rounded-2xl p-4 border border-gray-100 space-y-2 text-[10px] text-gray-500 font-bold">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-black">Access Information</p>
              <p className="flex items-center gap-2 text-brand-navy">🔓 You will receive your LMS access details via email within 1 business day.</p>
              <p className="flex items-center gap-2 text-brand-navy">🛡 Please check your spam/junk folder if you don't see the email.</p>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/profile"
                className="w-full sm:w-auto text-center rounded-xl border border-brand-blue bg-white text-brand-blue hover:bg-slate-50 px-6 py-3.5 text-xs font-bold transition-colors"
              >
                Go to My Dashboard
              </Link>
              <button className="w-full sm:w-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-600 px-6 py-3.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                <Download size={14} /> Download Receipt
              </button>
            </div>
          </div>

          {/* Right Column: Payment Summary */}
          <div className="lg:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
            <h3 className="text-sm font-extrabold text-brand-navy border-b border-gray-50 pb-3">Payment Summary</h3>

            <div className="space-y-3.5 text-xs font-semibold text-gray-500">
              <div className="flex items-center justify-between">
                <span>Course Fee</span>
                <span className="font-bold text-gray-700">${parseFloat(order.price).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="text-emerald-500 font-bold">- $0.00</span>
              </div>
              <div className="flex items-center justify-between text-brand-navy font-black text-sm border-t border-gray-50 pt-3">
                <span>Total Paid (USD)</span>
                <span className="text-lg">${parseFloat(order.price).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Successful Alert */}
            <div className="bg-[#f2faf5] border border-[#d3f2df] rounded-2xl p-4 flex gap-3 text-[11px] text-gray-600 font-medium">
              <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-brand-navy">Payment Successful</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Your payment has been processed successfully.</p>
              </div>
            </div>

            {/* Transaction specifications table list */}
            <div className="border-t border-gray-50 pt-4 space-y-3.5 text-xs font-semibold text-gray-500">
              <div className="flex items-center justify-between">
                <span>Payment Method</span>
                <span className="text-brand-navy font-bold">Visa ending in 4242</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Transaction ID</span>
                <span className="text-brand-navy font-bold font-mono">TXN-2026-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Date</span>
                <span className="text-brand-navy font-bold">{currentDate}</span>
              </div>
            </div>

          </div>

        </div>

        {/* ==========================================
            4. HELP CHANNELS (WE'RE JUST A CALL AWAY)
            ========================================== */}
        <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-gray-100 text-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-brand-navy">Need Help? We're Just a Call or Message Away!</h3>
            <p className="text-[11px] text-gray-400 font-bold">Our training advisors are here to support you at every step of your learning journey.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Phone", val: "(888) 745-7575", detail: "Call support" },
              { label: "Email", val: "info@certificationplanner.com", detail: "Write support" },
              { label: "Live Chat", val: "Chat with us online", detail: "Start discussion" },
              { label: "WhatsApp", val: "Message us on WhatsApp", detail: "Fast response" }
            ].map((box, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-50 p-4 shadow-sm space-y-1 text-left">
                <p className="text-[10px] text-gray-400 font-black uppercase">{box.label}</p>
                <p className="text-xs font-black text-brand-navy leading-tight">{box.val}</p>
                <p className="text-[9px] text-gray-400 font-bold mt-0.5">{box.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ==========================================
          5. BOTTOM START LEARNING CTAs
          ========================================== */}
      <section className="bg-brand-navy py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 items-center">
            {/* Visual Classroom image representation */}
            <div className="h-40 w-full md:w-60 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/95 to-transparent"></div>
              <Users size={32} className="text-gray-400" />
              <span className="absolute bottom-3 left-3 text-[10px] font-bold text-brand-orange">CP Learning Hub</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold">Start Learning. Grow Your Career.</h3>
              <p className="text-xs text-blue-200/80 font-bold max-w-lg">
                We're excited to have you on board. Get ready for an amazing learning experience with Certification Planner!
              </p>
              <Link
                href="/courses"
                className="inline-flex rounded-xl bg-[#ff5c00] hover:bg-[#e05200] px-8 py-3.5 font-bold text-white text-xs transition-colors"
              >
                Explore My Courses ➔
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 border-l border-white/10 pl-0 lg:pl-8 space-y-3.5 text-xs text-blue-100 font-bold">
            <p className="flex items-center gap-2">🎓 Expert Instructors</p>
            <p className="flex items-center gap-2">🛡 Industry-Recognized Certifications</p>
            <p className="flex items-center gap-2">📅 Flexible Learning Options</p>
            <p className="flex items-center gap-2">💼 Career Advancement Support</p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Confirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between items-center py-24">
        <div className="text-gray-400 font-bold animate-pulse text-sm">Loading Order Confirmation...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
