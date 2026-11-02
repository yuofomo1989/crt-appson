"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CreditCard,
  Shield,
  User,
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
  Lock,
  Calendar,
  Clock,
  MapPin,
  Check,
  Headphones,
  Globe,
  Trash2,
  Sparkles,
  ChevronRight,
  Star,
  BookOpen
} from "lucide-react";

import initialCourses from "@/data/courses_db.json";

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

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  // Cart state: initialized as null (NOT hardcoded with default course)
  const [cartItem, setCartItem] = useState(null);
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
              course: parsed.course || parsed.title || "Certification Training",
              format: parsed.format || "Live Online Class",
              price: parseFloat(parsed.price) || 1095,
              date: parsed.date || parsed.batch_date || "Upcoming Live Cohort",
              time: parsed.time || "9:00 AM – 5:00 PM (EST)",
              location: parsed.location || parsed.city || "Online Virtual Classroom",
              duration: parsed.duration || "4 Days | 35 Contact Hours"
            });
          } else {
            setCartItem(null);
          }
        } catch (e) {
          console.error("Error parsing cart item", e);
          setCartItem(null);
        }
      } else {
        setCartItem(null);
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

  const rewardPoints = cartItem ? Math.floor(cartItem.price / 10) : 0;

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
      payment_method: paymentMethod === "test_gateway" ? "🧪 Sandbox Test Gateway" : (paymentMethod === "card" ? "Credit / Debit Card" : paymentMethod),
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

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    try {
      await Promise.all([
        fetch(`${apiUrl}/orders/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(orderPayload)
        }),
        fetch(`${apiUrl}/admin/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-6 space-y-10">
        
        {/* Breadcrumb path */}
        <div className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5 text-left">
          <Link href="/" className="hover:text-brand-blue cursor-pointer">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-black">Cart & Checkout</span>
        </div>

        {/* Loading state before checking localStorage */}
        {!isCartLoaded && (
          <div className="py-20 text-center space-y-3">
            <div className="h-8 w-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-400 font-bold">Loading your cart...</p>
          </div>
        )}

        {/* 1. EMPTY CART STATE (When user hasn't added any product) */}
        {isCartLoaded && !cartItem && (
          <div className="max-w-3xl mx-auto space-y-12 py-6 text-center">
            
            {/* Empty Cart Banner */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-10 md:p-14 shadow-sm space-y-6">
              <div className="h-20 w-20 rounded-full bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center mx-auto shadow-inner">
                <ShoppingCart size={36} strokeWidth={1.75} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-brand-navy">Your Cart is Empty</h2>
                <p className="text-xs md:text-sm text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                  You haven't added any certification program to your cart yet. Explore our top accredited bootcamps and choose the right program for your career.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-8 py-4 text-xs font-bold text-white hover:bg-opacity-95 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
                >
                  <BookOpen size={16} />
                  <span>Browse All Certifications</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Recommended Programs to add */}
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">
                  Popular Certifications You Can Enroll In
                </h3>
                <Link href="/courses" className="text-xs font-bold text-brand-blue hover:underline">
                  View All Courses →
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {popularCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-gray-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-brand-blue rounded-full">
                        {c.category_name || "Professional"}
                      </span>
                      <h4 className="text-xs font-black text-brand-navy line-clamp-2">{c.title}</h4>
                      <p className="text-[11px] text-gray-400 font-bold">{c.duration || "4 Days Bootcamp"}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-black text-brand-navy">
                        ${c.pricing?.live_online || 1095}
                      </span>
                      <Link
                        href={`/courses/${c.slug}`}
                        className="px-3.5 py-1.5 rounded-lg bg-brand-navy text-white text-[11px] font-bold hover:bg-brand-blue transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. ACTIVE CART & CHECKOUT FORM (When a product has been added) */}
        {isCartLoaded && cartItem && (
          <>
            {/* Progress Bar Path */}
            <div className="max-w-3xl mx-auto flex items-center justify-between pb-6 border-b border-gray-100 text-[10px] md:text-xs font-bold text-gray-400">
              <div className="flex flex-col items-center gap-1.5 opacity-60">
                <div className="h-7 w-7 rounded-full bg-slate-200 text-gray-600 flex items-center justify-center font-bold">✓</div>
                <span>Your Cart</span>
              </div>
              <div className="h-[2px] bg-slate-200 flex-1 mx-4 max-w-[100px]"></div>

              <div className="flex flex-col items-center gap-1.5 text-brand-blue">
                <div className="h-7 w-7 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold">2</div>
                <span>Your Details</span>
              </div>
              <div className="h-[2px] bg-slate-200 flex-1 mx-4 max-w-[100px]"></div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="h-7 w-7 rounded-full bg-slate-200 text-gray-500 flex items-center justify-center font-bold">3</div>
                <span>Payment</span>
              </div>
              <div className="h-[2px] bg-slate-200 flex-1 mx-4 max-w-[100px]"></div>

              <div className="flex flex-col items-center gap-1.5">
                <div className="h-7 w-7 rounded-full bg-slate-200 text-gray-500 flex items-center justify-center font-bold">4</div>
                <span>Confirmation</span>
              </div>
            </div>

            {/* Split Form & Sidebar Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-8">
                
                {/* Step Header */}
                <div className="text-left">
                  <h2 className="text-2xl font-black text-brand-navy">Enter Your Information</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">Please provide your details to continue to payment.</p>
                </div>

                {/* Block 1: Personal Information */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
                  <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Personal Information</h3>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold">Phone Number *</label>
                    <div className="flex gap-2">
                      <div className="relative shrink-0">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="rounded-xl border border-gray-200 pl-3 pr-8 py-3.5 text-xs font-bold text-gray-700 outline-none bg-white cursor-pointer focus:border-brand-blue"
                        >
                          <option value="+1">🇺🇸 United States (+1)</option>
                          <option value="+1-CA">🇨🇦 Canada (+1)</option>
                          <option value="+44">🇬🇧 United Kingdom (+44)</option>
                          <option value="+61">🇦🇺 Australia (+61)</option>
                          <option value="+49">🇩🇪 Germany (+49)</option>
                          <option value="+91">🇮🇳 India (+91)</option>
                          <option value="+65">🇸🇬 Singapore (+65)</option>
                          <option value="+971">🇦🇪 UAE (+971)</option>
                          <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                          <option value="+27">🇿🇦 South Africa (+27)</option>
                          <option value="+52">🇲🇽 Mexico (+52)</option>
                          <option value="+55">🇧🇷 Brazil (+55)</option>
                          <option value="+81">🇯🇵 Japan (+81)</option>
                          <option value="+33">🇫🇷 France (+33)</option>
                          <option value="+39">🇮🇹 Italy (+39)</option>
                          <option value="+34">🇪🇸 Spain (+34)</option>
                          <option value="+31">🇳🇱 Netherlands (+31)</option>
                          <option value="+41">🇨🇭 Switzerland (+41)</option>
                          <option value="+64">🇳🇿 New Zealand (+64)</option>
                          <option value="+353">🇮🇪 Ireland (+353)</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="(201) 555-0123"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                      />
                    </div>
                    <p className="text-[9px] text-gray-400 font-semibold mt-1">We will use this number to send you updates about your training.</p>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 text-[10px] text-gray-500 font-bold">
                    <Shield size={16} className="text-brand-blue shrink-0 mt-0.5" />
                    <span>Your information is safe with us. We will never share your details with third parties.</span>
                  </div>
                </div>

                {/* Block 2: Additional Information (Optional) */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
                  <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Additional Information (Optional)</h3>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold">Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-bold">How did you hear about us?</label>
                    <select
                      value={howHear}
                      onChange={(e) => setHowHear(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none bg-white"
                    >
                      <option value="">Select an option</option>
                      <option>Google Search</option>
                      <option>LinkedIn / Social Media</option>
                      <option>Employer Recommendation</option>
                      <option>Word of Mouth</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={marketingOpt}
                      onChange={(e) => setMarketingOpt(e.target.checked)}
                      className="mt-1 shrink-0"
                    />
                    <label htmlFor="marketing" className="text-[10px] text-gray-400 font-bold leading-relaxed cursor-pointer select-none">
                      I would like to receive updates about courses, promotions and special offers. You can unsubscribe at any time.
                    </label>
                  </div>
                </div>

                {/* Block 3: Choose a Payment Method */}
                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="text-lg font-black text-brand-navy">Choose a Payment Method</h3>
                    <p className="text-xs text-gray-400 font-bold mt-1">All transactions are secure and encrypted.</p>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    
                    {/* Method selector options */}
                    <div className="md:col-span-4 space-y-3">
                      {[
                        ...(isTestModeEnabled ? [{ id: "test_gateway", title: "🧪 Instant Test Gateway (Sandbox)", desc: "Admin Test Mode ON: 1-Click test payment & order sync" }] : []),
                        { id: "card", title: "Credit / Debit Card", desc: "Visa, MasterCard, AMEX, Discover" },
                        { id: "paypal", title: "PayPal", desc: "Pay securely with your PayPal account" },
                        { id: "wire", title: "Wire Transfer / Bank Transfer", desc: "Pay via wire transfer or bank transfer" }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                            paymentMethod === opt.id
                              ? "border-brand-blue bg-blue-50/20 ring-1 ring-brand-blue"
                              : "border-gray-100 hover:bg-slate-50 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment_select"
                            checked={paymentMethod === opt.id}
                            readOnly
                            className="mt-1 shrink-0 cursor-pointer"
                          />
                          <div className="space-y-1">
                            <p className="text-xs font-extrabold text-brand-navy leading-tight">{opt.title}</p>
                            <p className="text-[9px] text-gray-400 font-bold leading-relaxed">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Selected payment form card */}
                    <div className="md:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 text-left">
                      {paymentMethod === "test_gateway" && (
                        <div className="space-y-4 py-4 text-center">
                          <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-black text-lg">
                            🧪
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-black text-brand-navy">Simulated Test Mode Active</h4>
                            <p className="text-xs text-gray-500 font-semibold max-w-sm mx-auto">
                              Clicking "Complete Payment" will simulate a successful transaction and sync this order live to the Admin Panel in real time.
                            </p>
                          </div>
                          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold font-mono">
                            STATUS: READY TO TEST
                          </span>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-brand-navy">Pay with Credit / Debit Card</h4>
                            <div className="text-[10px] text-gray-400 font-black flex gap-1.5">
                              <span>VISA</span> | <span>MC</span> | <span>AMEX</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 font-bold">Card Number *</label>
                            <input
                              type="text"
                              required
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] text-gray-500 font-bold">Expiry Date *</label>
                              <input
                                type="text"
                                required
                                placeholder="MM / YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-gray-500 font-bold">CVV *</label>
                              <input
                                type="text"
                                required
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 font-bold">Name on Card *</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter name as it appears on card"
                              value={nameOnCard}
                              onChange={(e) => setNameOnCard(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <input
                              type="checkbox"
                              id="save_card"
                              checked={saveCard}
                              onChange={(e) => setSaveCard(e.target.checked)}
                              className="shrink-0"
                            />
                            <label htmlFor="save_card" className="text-[10px] text-gray-400 font-bold cursor-pointer select-none">
                              Save card for faster checkout
                            </label>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "paypal" && (
                        <div className="space-y-4 text-center py-6">
                          <p className="text-xs text-gray-500 font-semibold">After clicking place order, you will be redirected to PayPal to complete your purchase securely.</p>
                          <div className="inline-block bg-amber-500 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Pay with PayPal</div>
                        </div>
                      )}

                      {paymentMethod === "wire" && (
                        <div className="space-y-4 py-3 text-xs font-semibold text-gray-600">
                          <p>Corporate invoice details and bank instructions will be sent to your work email immediately upon clicking complete payment.</p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* Place Order Trigger */}
                <div className="pt-2 text-left">
                  <button
                    type="submit"
                    className="w-full md:w-auto rounded-xl bg-[#ff5c00] hover:bg-[#e05200] px-12 py-4 font-bold text-white text-xs shadow-lg shadow-orange-500/15 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                  >
                    Complete Payment →
                  </button>
                </div>

              </form>

              {/* Right Side Sidebar Summary */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Box 1: Order Summary */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="text-sm font-extrabold text-brand-navy">Order Summary</h3>
                    <button
                      type="button"
                      onClick={handleRemoveCartItem}
                      className="text-[10px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>

                  {/* Course Detail card row */}
                  <div className="flex gap-4">
                    <div className="h-14 w-14 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-black text-sm shrink-0 border border-blue-100">
                      🎓
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-brand-navy leading-tight">{cartItem.course}</p>
                      <span className="inline-block bg-blue-50 text-brand-blue text-[9px] font-bold px-2 py-0.5 rounded">
                        {cartItem.format}
                      </span>
                      
                      <div className="pt-1.5 space-y-1 text-[9px] text-gray-400 font-bold">
                        <p className="flex items-center gap-1"><Calendar size={10} /> {cartItem.date}</p>
                        <p className="flex items-center gap-1"><Clock size={10} /> {cartItem.time}</p>
                        <p className="flex items-center gap-1"><MapPin size={10} /> {cartItem.location}</p>
                        <p className="flex items-center gap-1">⏱ {cartItem.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal table split */}
                  <div className="border-t border-gray-50 pt-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-gray-500 font-bold">
                      <span>Course Fee</span>
                      <span>${cartItem.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-500 font-bold">
                      <span>Discount</span>
                      <span className="text-emerald-500">- $0.00</span>
                    </div>
                    <div className="flex items-center justify-between text-brand-navy font-black text-sm border-t border-gray-50 pt-3">
                      <span>Total (USD)</span>
                      <span>${cartItem.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CP Rewards */}
                  <div className="bg-blue-50/40 border border-blue-100/50 rounded-2xl p-4 text-[10px] text-gray-600 font-semibold text-center leading-relaxed">
                    Earn <strong className="text-brand-blue font-black">{rewardPoints} CP</strong> Rewards Points on this purchase
                  </div>

                  {/* Secure Checklines */}
                  <div className="space-y-2 pt-2 border-t border-gray-50 text-[10px] text-gray-400 font-bold">
                    <p className="flex items-center gap-2">✓ 100% Pass Support</p>
                    <p className="flex items-center gap-2">✓ 30-Day Money Back Guarantee</p>
                    <p className="flex items-center gap-2">✓ Secure & Encrypted Checkout</p>
                  </div>
                </div>

                {/* Box 2: Need Help? */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-3.5">
                  <h4 className="text-xs font-black text-brand-navy flex items-center gap-2">
                    <Headphones size={16} className="text-brand-blue" />
                    Need Help?
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold">Our training advisors are here to help you.</p>
                  <div className="space-y-1.5 text-xs text-gray-700 font-bold">
                    <p className="flex items-center gap-2">📞 +1 855-322-1201</p>
                    <p className="flex items-center gap-2">✉ support@certificationplanner.com</p>
                    <p className="flex items-center gap-2">💬 Live Chat Available</p>
                  </div>
                </div>

                {/* Box 3: We Accept */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-3">
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-black">We Accept</h4>
                  <div className="grid grid-cols-3 gap-2 text-[9px] text-gray-400 font-black text-center">
                    <div className="py-2 border border-gray-50 rounded-lg">VISA</div>
                    <div className="py-2 border border-gray-50 rounded-lg">MC</div>
                    <div className="py-2 border border-gray-50 rounded-lg">AMEX</div>
                    <div className="py-2 border border-gray-50 rounded-lg">PayPal</div>
                    <div className="py-2 border border-gray-50 rounded-lg">WIRE</div>
                  </div>
                </div>

              </div>

            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
