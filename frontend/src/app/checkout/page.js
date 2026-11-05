"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CreditCard,
  ShieldCheck,
  User,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  Lock,
  Calendar,
  Clock,
  Monitor,
  Layers,
  Check,
  Headphones,
  Trash2,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Landmark,
  Gift,
  Info,
  GraduationCap
} from "lucide-react";

import initialCourses from "@/data/courses_db.json";

const DEFAULT_CHECKOUT_ITEM = {
  course: "PMP® Certification Exam Preparation Training",
  format: "Live Online Class",
  price: 999,
  date: "Nov 03 – Nov 06, 2026 (Tue – Fri)",
  time: "9:00 AM – 5:00 PM (EST)",
  location: "Live Online Classroom",
  duration: "4 Days | 35 Contact Hours"
};

export default function Checkout() {
  const router = useRouter();

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [howHear, setHowHear] = useState("");
  const [marketingOpt, setMarketingOpt] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  // Cart state
  const [cartItem, setCartItem] = useState(DEFAULT_CHECKOUT_ITEM);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [isTestModeEnabled, setIsTestModeEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cp_cart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.course || parsed.title)) {
            setCartItem({
              course: parsed.course || parsed.title || DEFAULT_CHECKOUT_ITEM.course,
              format: parsed.format || DEFAULT_CHECKOUT_ITEM.format,
              price: parseFloat(parsed.price) || DEFAULT_CHECKOUT_ITEM.price,
              date: parsed.date || parsed.batch_date || DEFAULT_CHECKOUT_ITEM.date,
              time: parsed.time || DEFAULT_CHECKOUT_ITEM.time,
              location: parsed.location || parsed.city || DEFAULT_CHECKOUT_ITEM.location,
              duration: parsed.duration || DEFAULT_CHECKOUT_ITEM.duration
            });
          }
        } catch (e) {
          console.error("Error parsing cart item", e);
        }
      }
      setIsCartLoaded(true);

      const enabled = localStorage.getItem("cp_test_gateway_enabled") === "true";
      setIsTestModeEnabled(enabled);
      if (enabled) {
        setPaymentMethod("test_gateway");
      }
    }
  }, []);

  const handleRemoveCartItem = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cp_cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
    setCartItem(null);
  };

  const handleRestoreDefaultItem = () => {
    setCartItem(DEFAULT_CHECKOUT_ITEM);
  };

  const rewardPoints = cartItem ? Math.floor(cartItem.price / 10) : 99;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cartItem) return;

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const orderId = `CP-ENR-2026-${randomId}`;

    const finalPhone = phone.trim() ? `${countryCode} ${phone.trim()}` : "";
    const orderPayload = {
      order_number: orderId,
      customer_name: fullName.trim() || "Student",
      customer_email: email.trim() || "student@example.com",
      customer_phone: finalPhone,
      total_amount: cartItem.price,
      subtotal: cartItem.price,
      discount_amount: 0,
      payment_status: "completed",
      payment_method:
        paymentMethod === "test_gateway"
          ? "🧪 Sandbox Test Gateway"
          : paymentMethod === "card"
          ? "Credit / Debit Card"
          : paymentMethod === "paypal"
          ? "PayPal"
          : "Wire Transfer",
      items: [
        {
          course: cartItem.course,
          course_name: cartItem.course,
          format: cartItem.format,
          date: cartItem.date,
          price: cartItem.price
        }
      ]
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("cp_latest_order", JSON.stringify(orderPayload));
      localStorage.removeItem("cp_cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
    try {
      await Promise.all([
        fetch(`${apiUrl}/orders/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(orderPayload)
        }),
        fetch(`${apiUrl}/admin/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(orderPayload)
        })
      ]);
    } catch (err) {
      console.error("Order API sync error:", err);
    }

    router.push(`/confirmation?orderId=${orderId}&amount=${cartItem.price}`);
  };

  const popularCourses = (initialCourses || []).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans antialiased text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5 space-y-4">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#0066cc] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-700 font-semibold">Cart & Checkout</span>
        </div>

        {/* Top Header + 4-Step Progress Stepper Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
          {/* Left: Orange Lock + Secure Checkout Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-14 rounded-2xl bg-gradient-to-b from-[#ff7a18] to-[#ea580c] text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
              <Lock size={26} strokeWidth={2.3} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight text-[#0f172a] leading-none">
                Secure <span className="text-[#f97316]">Checkout</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
                Complete your registration in a few simple steps.
              </p>
            </div>
          </div>

          {/* Right: 4-Step Horizontal Stepper */}
          <div className="w-full lg:w-auto lg:min-w-[520px] flex items-center justify-between">
            {/* Step 1: Your Cart */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-bold shadow-sm">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-[11px] font-semibold text-slate-700">Your Cart</span>
            </div>

            <div className="h-[2px] bg-[#16a34a] flex-1 mx-2 sm:mx-3 -mt-5" />

            {/* Step 2: Your Details (Active) */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-[#0066cc] text-white flex items-center justify-center text-xs font-extrabold shadow-md shadow-blue-500/25">
                2
              </div>
              <span className="text-[11px] font-extrabold text-[#0066cc]">Your Details</span>
            </div>

            <div className="h-[2px] bg-blue-200 flex-1 mx-2 sm:mx-3 -mt-5" />

            {/* Step 3: Payment */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-extrabold">
                3
              </div>
              <span className="text-[11px] font-semibold text-slate-600">Payment</span>
            </div>

            <div className="h-[2px] bg-slate-200 flex-1 mx-2 sm:mx-3 -mt-5" />

            {/* Step 4: Confirmation */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-extrabold">
                4
              </div>
              <span className="text-[11px] font-semibold text-slate-600">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Empty Cart State (only if user clicks Remove) */}
        {isCartLoaded && !cartItem && (
          <div className="max-w-3xl mx-auto space-y-10 py-6 text-center">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-10 md:p-14 shadow-sm space-y-6">
              <div className="h-20 w-20 rounded-full bg-blue-50 border border-blue-100 text-[#0066cc] flex items-center justify-center mx-auto">
                <ShoppingCart size={36} strokeWidth={1.75} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-[#0f172a]">Your Cart is Empty</h2>
                <p className="text-xs md:text-sm text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                  You removed the training program from your cart. Browse our upcoming live classes or restore your selected course below.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/enroll"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0066cc] px-7 py-3.5 text-xs font-bold text-white hover:bg-[#0052a3] shadow-md transition-all"
                >
                  <BookOpen size={16} />
                  <span>Browse Schedule & Enroll</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  type="button"
                  onClick={handleRestoreDefaultItem}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Restore PMP® Training ($999)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Checkout 12-Column Split Grid */}
        {cartItem && (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN (7 Cols): Information + Payment Method */}
            <div className="lg:col-span-7 space-y-4">
              {/* Outer Card 1: Enter Your Information */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-5">
                {/* Section Header */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#0f172a] leading-tight">
                      Enter Your Information
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Please provide your details to continue to payment.
                    </p>
                  </div>
                </div>

                {/* Inner Card: Personal Information */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a] flex items-center gap-2">
                      <User size={17} className="text-[#0066cc]" />
                      Personal Information
                    </h3>
                    <span className="text-[11px] font-bold text-red-500">* Required fields</span>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2.5">
                      <div className="relative shrink-0">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-full rounded-xl border border-slate-200 bg-white pl-3 pr-7 py-3 text-xs sm:text-sm font-bold text-slate-700 outline-none cursor-pointer focus:border-[#0066cc]"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+1-CA">🇨🇦 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="(201) 555-0123"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Safe Info Note */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                    <ShieldCheck size={15} className="text-[#0066cc] shrink-0" />
                    <span>Your information is safe with us. We will never share your details with third parties.</span>
                  </div>
                </div>

                {/* Collapsible Accordion: Additional Information (Optional) */}
                <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 size={17} className="text-[#0066cc]" />
                      <span className="text-sm font-extrabold text-[#0f172a]">
                        Additional Information <span className="font-normal text-slate-500">(Optional)</span>
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-slate-500 transition-transform duration-200 ${
                        showAdditionalInfo ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showAdditionalInfo && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">Company / Organization Name</label>
                        <input
                          type="text"
                          placeholder="Enter your company name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-[#0066cc]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">How did you hear about us?</label>
                        <select
                          value={howHear}
                          onChange={(e) => setHowHear(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none bg-white"
                        >
                          <option value="">Select an option</option>
                          <option>Google Search</option>
                          <option>LinkedIn / Social Media</option>
                          <option>Employer Recommendation</option>
                          <option>Colleague / Referral</option>
                        </select>
                      </div>

                      <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={marketingOpt}
                          onChange={(e) => setMarketingOpt(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc]"
                        />
                        <span className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          I would like to receive updates about upcoming cohorts, exam guides, and special offers.
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Outer Card 2: Choose a Payment Method */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#0f172a] leading-tight">
                      Choose a Payment Method
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      All transactions are secure and encrypted.
                    </p>
                  </div>
                </div>

                {/* 3 Horizontal Payment Selector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Option 1: Credit / Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`relative rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "card"
                        ? "border-2 border-[#0066cc] bg-[#f5f9ff] shadow-xs"
                        : "border border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center absolute top-3 left-3 ${
                        paymentMethod === "card" ? "border-[#0066cc] bg-[#0066cc]" : "border-slate-300 bg-white"
                      }`}
                    >
                      {paymentMethod === "card" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <CreditCard size={22} className="text-[#0066cc] mt-1" />
                    <p className="text-xs sm:text-[13px] font-extrabold text-[#0f172a]">Credit / Debit Card</p>
                    <p className="text-[10px] text-slate-500 font-medium">Visa, Mastercard, AMEX, Discover</p>
                  </button>

                  {/* Option 2: PayPal */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`relative rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "paypal"
                        ? "border-2 border-[#0066cc] bg-[#f5f9ff] shadow-xs"
                        : "border border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center absolute top-3 left-3 ${
                        paymentMethod === "paypal" ? "border-[#0066cc] bg-[#0066cc]" : "border-slate-300 bg-white"
                      }`}
                    >
                      {paymentMethod === "paypal" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="h-[22px] flex items-center justify-center mt-1 font-black italic text-lg text-[#003087] leading-none">
                      P<span className="text-[#0079c1]">P</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-extrabold text-[#0f172a]">PayPal</p>
                    <p className="text-[10px] text-slate-500 font-medium">Pay securely with PayPal</p>
                  </button>

                  {/* Option 3: Wire Transfer */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("wire")}
                    className={`relative rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "wire"
                        ? "border-2 border-[#0066cc] bg-[#f5f9ff] shadow-xs"
                        : "border border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center absolute top-3 left-3 ${
                        paymentMethod === "wire" ? "border-[#0066cc] bg-[#0066cc]" : "border-slate-300 bg-white"
                      }`}
                    >
                      {paymentMethod === "wire" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <Landmark size={22} className="text-[#0066cc] mt-1" />
                    <p className="text-xs sm:text-[13px] font-extrabold text-[#0f172a]">Wire Transfer</p>
                    <p className="text-[10px] text-slate-500 font-medium">Bank transfer / ACH</p>
                  </button>
                </div>

                {/* Inner Card: Payment Details */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-4">
                  {paymentMethod === "card" && (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a] flex items-center gap-2">
                          <CreditCard size={17} className="text-[#0066cc]" />
                          Card Information
                        </h3>
                        {/* Payment Brand Logos */}
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-black italic text-[#1a1f71]">
                            VISA
                          </span>
                          <span className="px-2 py-0.5 rounded border border-slate-200 bg-white flex items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] inline-block -ml-1" />
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#006fcf] text-white text-[9px] font-black tracking-tight">
                            AMEX
                          </span>
                          <span className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[9px] font-black text-[#f68121]">
                            DISCOVER
                          </span>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <CreditCard
                            size={15}
                            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                          />
                          <input
                            type="text"
                            required
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                      </div>

                      {/* Expiry Date & CVV */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Calendar
                              size={15}
                              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                            />
                            <input
                              type="text"
                              required
                              placeholder="MM / YY"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock
                              size={15}
                              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                            />
                            <input
                              type="text"
                              required
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-9 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                            <Info
                              size={15}
                              className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Name on Card */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Name on Card <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User
                            size={15}
                            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Enter name as it appears on card"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/10 transition-all"
                          />
                        </div>
                      </div>

                      {/* Save card checkbox */}
                      <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc]"
                        />
                        <span className="text-xs font-medium text-slate-600">Save card for faster checkout</span>
                      </label>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="py-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003087] font-black italic text-xl flex items-center justify-center mx-auto">
                        PP
                      </div>
                      <h4 className="text-sm font-extrabold text-[#0f172a]">Pay with PayPal</h4>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Click &ldquo;Complete Secure Payment&rdquo; below to securely complete your registration via PayPal.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "wire" && (
                    <div className="py-5 space-y-2 text-xs text-slate-600 font-medium">
                      <h4 className="text-sm font-extrabold text-[#0f172a]">Wire Transfer / ACH Instructions</h4>
                      <p>
                        Upon clicking &ldquo;Complete Secure Payment&rdquo;, an official corporate invoice with ACH / Wire Transfer routing details will be sent to your email address.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Action Row: Back to Cart + Complete Secure Payment */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href="/enroll"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0066cc] hover:underline"
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Cart</span>
                  </Link>

                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all"
                  >
                    <Lock size={16} />
                    <span>Complete Secure Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (5 Cols): Order Summary + Need Help + Secure & Trusted Checkout */}
            <div className="lg:col-span-5 space-y-4">
              {/* Card 1: Order Summary */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart size={20} className="text-[#f97316]" />
                  <h3 className="text-lg font-black text-[#0f172a]">Order Summary</h3>
                </div>

                {/* Selected Course Item */}
                <div className="flex items-start gap-3.5 pt-1">
                  <div className="w-14 h-14 rounded-2xl bg-[#eef5ff] border border-blue-100 text-[#0f172a] flex items-center justify-center shrink-0">
                    <GraduationCap size={26} className="text-[#1e3a8a]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-[#0f172a] leading-snug">
                        {cartItem.course}
                      </h4>
                      <button
                        type="button"
                        onClick={handleRemoveCartItem}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-700 shrink-0 cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    </div>

                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#eef5ff] border border-blue-200 text-[#0066cc] text-[11px] font-bold">
                      {cartItem.format}
                    </span>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 font-medium">
                      <p className="flex items-center gap-2">
                        <Calendar size={13} className="text-slate-400 shrink-0" />
                        <span>{cartItem.date}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={13} className="text-slate-400 shrink-0" />
                        <span>{cartItem.time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Monitor size={13} className="text-slate-400 shrink-0" />
                        <span>{cartItem.location}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Layers size={13} className="text-slate-400 shrink-0" />
                        <span>{cartItem.duration}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-slate-200/80 pt-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-slate-700 font-semibold">
                    <span>Course Fee</span>
                    <span className="font-extrabold text-[#0f172a]">${cartItem.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 font-semibold">
                    <span>Discount (Enrollment Promo)</span>
                    <span className="font-extrabold text-[#16a34a]">– $0.00</span>
                  </div>
                </div>

                {/* Total Box */}
                <div className="rounded-2xl bg-[#eef5ff] px-5 py-3.5 flex items-center justify-between">
                  <span className="text-base font-black text-[#0f172a]">Total (USD)</span>
                  <span className="text-2xl font-black text-[#0f172a]">${cartItem.price.toFixed(2)}</span>
                </div>

                {/* CP Rewards Banner */}
                <div className="rounded-xl bg-[#f8fafc] border border-slate-200/80 px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
                  <Gift size={16} className="text-[#f97316] shrink-0" />
                  <span>
                    Earn <strong className="text-[#0066cc] font-extrabold">{rewardPoints} CP</strong> Rewards Points on this purchase
                  </span>
                </div>

                {/* 3 Green Guarantee Checkmarks */}
                <div className="space-y-2 pt-1 text-xs font-semibold text-slate-700">
                  <p className="flex items-center gap-2.5">
                    <Check size={15} strokeWidth={3} className="text-[#16a34a] shrink-0" />
                    <span>100% Pass Support</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Check size={15} strokeWidth={3} className="text-[#16a34a] shrink-0" />
                    <span>30-Day Money Back Guarantee</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Check size={15} strokeWidth={3} className="text-[#16a34a] shrink-0" />
                    <span>Secure & Encrypted Checkout</span>
                  </p>
                </div>
              </div>

              {/* Card 2: Need Help? */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eef5ff] text-[#0066cc] flex items-center justify-center shrink-0">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#0f172a] leading-tight">Need Help?</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Our training advisors are here to help you.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-[13px] font-bold text-[#0f172a] pl-1">
                  <a
                    href="tel:+18887457575"
                    className="flex items-center gap-2.5 hover:text-[#0066cc] transition-colors"
                  >
                    <Phone size={15} className="text-[#0066cc] shrink-0" />
                    <span>+1 (888) 745-7575</span>
                  </a>
                  <a
                    href="mailto:support@certificationplanner.com"
                    className="flex items-center gap-2.5 hover:text-[#0066cc] transition-colors"
                  >
                    <Mail size={15} className="text-[#0066cc] shrink-0" />
                    <span>support@certificationplanner.com</span>
                  </a>
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={15} className="text-[#0066cc] shrink-0" />
                    <span>Live Chat Available</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Secure & Trusted Checkout */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={20} className="text-[#0066cc]" />
                  <h4 className="text-base font-black text-[#0f172a]">Secure & Trusted Checkout</h4>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {/* SSL Encrypted */}
                  <div className="rounded-xl border border-slate-200/90 bg-[#f8fafc] px-3 py-2.5 flex items-center justify-center gap-2">
                    <Lock size={18} className="text-[#16a34a] shrink-0" />
                    <div className="text-left leading-tight">
                      <p className="text-xs font-black text-[#0f172a]">SSL</p>
                      <p className="text-[9px] font-semibold text-slate-500">Encrypted</p>
                    </div>
                  </div>

                  {/* Stripe Secure Payment */}
                  <div className="rounded-xl border border-slate-200/90 bg-[#f8fafc] px-3 py-2.5 flex flex-col items-center justify-center text-center leading-tight">
                    <span className="px-2 py-0.5 rounded bg-[#635bff] text-white text-[10px] font-black tracking-tight">
                      stripe
                    </span>
                    <p className="text-[9px] font-semibold text-slate-500 mt-1">Secure Payment</p>
                  </div>

                  {/* PCI Compliant */}
                  <div className="rounded-xl border border-slate-200/90 bg-[#f8fafc] px-3 py-2.5 flex items-center justify-center gap-2">
                    <Lock size={18} className="text-[#16a34a] shrink-0" />
                    <div className="text-left leading-tight">
                      <p className="text-xs font-black text-[#0f172a]">PCI</p>
                      <p className="text-[9px] font-semibold text-slate-500">Compliant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* Sleek Single-Bar Dark Checkout Footer (Exact Match to Client Reference) */}
      <footer className="bg-[#0b192c] text-white border-t border-slate-800 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Left: Brand Logo + Secure Checkout */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 font-black text-base tracking-tight">
              <span className="text-[#0066cc]">CP</span>
              <span className="text-white">Certification</span>
              <span className="text-[#f97316]">Planner</span>
            </Link>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
              <Lock size={14} className="text-slate-300" />
              Secure Checkout
            </span>
          </div>

          {/* Center: Legal Links */}
          <div className="flex items-center gap-3 text-slate-300 font-medium">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>

          {/* Right: Support Phone */}
          <a
            href="tel:+18887457575"
            className="inline-flex items-center gap-2 font-bold text-slate-200 hover:text-white transition-colors"
          >
            <Headphones size={15} className="text-[#38bdf8]" />
            <span>Need Help? (888) 745-7575</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
