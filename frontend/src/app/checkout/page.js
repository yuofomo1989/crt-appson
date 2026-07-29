"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, Shield, User, Landmark, ShoppingBag, ArrowRight, Lock, Calendar, Clock, MapPin, Check, Headphones, Globe, Heart } from "lucide-react";

export default function Checkout() {
  const router = useRouter();

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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

  // Dynamic Cart state
  const [cartItem, setCartItem] = useState({
    course: "PMP® Certification Training",
    format: "Live Online Class",
    price: 1095,
    date: "May 27 – May 30, 2024",
    time: "9:00 AM – 5:00 PM (EST)",
    location: "New York, NY",
    duration: "4 Days | 35 Contact Hours"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cp_cart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCartItem({
            course: parsed.course || "PMP® Certification Training",
            format: parsed.format || "Live Online Class",
            price: parsed.price || 1095,
            date: parsed.date || "May 27 – May 30, 2024",
            time: parsed.time || "9:00 AM – 5:00 PM (EST)",
            location: parsed.location || "New York, NY",
            duration: parsed.duration || "4 Days | 35 Contact Hours"
          });
        } catch (e) {
          console.error("Error parsing cart item", e);
        }
      }
    }
  }, []);

  const rewardPoints = Math.floor(cartItem.price / 10);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const orderId = `CP-ENR-2026-${randomId}`;
    
    if (typeof window !== "undefined") {
      const orderDetails = {
        orderId,
        course: cartItem.course,
        format: cartItem.format,
        price: cartItem.price,
        date: cartItem.date,
        customerName: fullName || "Valued Client"
      };
      localStorage.setItem("cp_latest_order", JSON.stringify(orderDetails));
    }
    
    router.push(`/confirmation?orderId=${orderId}&amount=${cartItem.price}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-6 space-y-10">
        
        {/* Breadcrumb path */}
        <div className="text-[11px] text-gray-400 font-bold flex gap-2">
          <span className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
          <span className="text-gray-600 font-black">Cart & Checkout</span>
        </div>

        {/* 1. PROGRESS BAR PATH */}
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

        {/* 2. SPLIT FORM AND SIDEBAR GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side Forms */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step Header */}
            <div>
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
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🇺🇸</span>
                    <select className="rounded-xl border border-gray-200 pl-8 pr-3 py-3.5 text-xs font-bold text-gray-700 outline-none bg-white">
                      <option>+1</option>
                      <option>+91</option>
                      <option>+44</option>
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
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black text-brand-navy">Choose a Payment Method</h3>
                <p className="text-xs text-gray-400 font-bold mt-1">All transactions are secure and encrypted.</p>
              </div>

              <div className="grid md:grid-cols-12 gap-6 items-start">
                
                {/* Method selector options */}
                <div className="md:col-span-4 space-y-3">
                  {[
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
                onClick={handlePlaceOrder}
                className="w-full md:w-auto rounded-xl bg-[#ff5c00] hover:bg-[#e05200] px-12 py-4 font-bold text-white text-xs shadow-lg shadow-orange-500/15 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Complete Payment ➔
              </button>
            </div>

          </div>

          {/* Right Side Sidebar Summary */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Order Summary */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <h3 className="text-sm font-extrabold text-brand-navy">Order Summary</h3>
                <span className="text-[10px] text-brand-blue font-bold cursor-pointer hover:underline">Edit Cart</span>
              </div>

              {/* Course Detail card row */}
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-black text-sm shrink-0 border border-blue-100">
                  PMP®
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
                <p className="flex items-center gap-2">✔ 100% Pass Support</p>
                <p className="flex items-center gap-2">✔ 30-Day Money Back Guarantee</p>
                <p className="flex items-center gap-2">✔ Secure & Encrypted Checkout</p>
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
                <p className="flex items-center gap-2">📞 (888) 745-7575</p>
                <p className="flex items-center gap-2">✉ info@certificationplanner.com</p>
                <p className="flex items-center gap-2">💬 Live Chat</p>
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

        {/* 3. BOTTOM TRUST SEAL BAR */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center text-amber-600 font-black text-xs shrink-0">
              30 DAY
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-navy">30-Day Money Back Guarantee</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5">Not satisfied with the course? Get a full refund within 30 days of your purchase.</p>
            </div>
          </div>
          <div className="flex gap-8 shrink-0">
            <div className="text-xs text-left">
              <p className="text-[10px] text-gray-400 font-black uppercase">Google</p>
              <p className="font-black text-brand-navy">⭐⭐⭐⭐⭐ 4.8/5</p>
            </div>
            <div className="text-xs text-left">
              <p className="text-[10px] text-gray-400 font-black uppercase">Trustpilot</p>
              <p className="font-black text-brand-navy">⭐⭐⭐⭐⭐ 4.7/5</p>
            </div>
          </div>
        </div>

        {/* 4. FOOTER POLICY INFO BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 pt-8 text-center text-xs font-bold text-gray-600">
          <div className="space-y-1">
            <p className="text-brand-navy">Secure Checkout</p>
            <p className="text-[10px] text-gray-400 font-semibold">256-bit SSL encrypted payment</p>
          </div>
          <div className="space-y-1">
            <p className="text-brand-navy">Privacy Protection</p>
            <p className="text-[10px] text-gray-400 font-semibold">We never share your information</p>
          </div>
          <div className="space-y-1">
            <p className="text-brand-navy">Trusted by Professionals</p>
            <p className="text-[10px] text-gray-400 font-semibold">50,000+ certified students</p>
          </div>
          <div className="space-y-1">
            <p className="text-brand-navy">Lifetime Access</p>
            <p className="text-[10px] text-gray-400 font-semibold">Learn at your own pace</p>
          </div>
        </div>

      </main>

      {/* 5. BOTTOM QUESTIONS CALLBACK BAR */}
      <section className="bg-brand-navy py-6 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-extrabold">Have Questions? We're Here to Help! <span className="text-blue-300 font-semibold text-xs ml-2">Talk to our training experts for personalized guidance.</span></p>
          <button className="rounded-xl border border-white/20 hover:bg-white/5 px-6 py-2.5 font-bold text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
            📞 Request a Callback
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
