"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShoppingCart,
  ArrowRight,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Shield,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Lock,
  Tag
} from "lucide-react";

import initialCourses from "@/data/courses_db.json";

export default function CartPage() {
  const router = useRouter();

  const [cartItem, setCartItem] = useState(null);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

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
              price: parseFloat(parsed.price) || 999,
              date: parsed.date || parsed.batch_date || "Upcoming Live Cohort",
              time: parsed.time || "9:00 AM – 5:00 PM (EST)",
              location: parsed.location || parsed.city || "Online Virtual Classroom",
              duration: parsed.duration || "4 Days | 35 Contact Hours"
            });
          } else {
            setCartItem(null);
          }
        } catch (e) {
          console.error("Error parsing cart:", e);
          setCartItem(null);
        }
      } else {
        setCartItem(null);
      }
      setIsCartLoaded(true);
    }
  }, []);

  const handleRemoveCartItem = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cp_cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
    setCartItem(null);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === "SAVE10" || clean === "CP10") {
      const discount = Math.round((cartItem?.price || 0) * 0.1);
      setAppliedDiscount(discount);
      setCouponMsg(`Coupon ${clean} applied! $${discount} discount added.`);
    } else if (clean === "SAVE50" || clean === "CP50") {
      setAppliedDiscount(50);
      setCouponMsg(`Coupon ${clean} applied! $50 discount added.`);
    } else {
      setAppliedDiscount(0);
      setCouponMsg("Invalid coupon code. Try 'SAVE10' or 'CP50'");
    }
  };

  const popularCourses = (initialCourses || []).slice(0, 3);
  const finalPrice = cartItem ? Math.max(0, cartItem.price - appliedDiscount) : 0;

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-6 space-y-10">
        
        {/* Breadcrumb path */}
        <div className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5 text-left">
          <Link href="/" className="hover:text-brand-blue cursor-pointer">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-black">Shopping Cart</span>
        </div>

        {/* Loading state before checking localStorage */}
        {!isCartLoaded && (
          <div className="py-20 text-center space-y-3">
            <div className="h-8 w-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-400 font-bold">Loading your cart...</p>
          </div>
        )}

        {/* 1. EMPTY CART STATE */}
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
                        ${c.price || 999}
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

        {/* 2. ACTIVE CART WITH ITEMS */}
        {isCartLoaded && cartItem && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-black text-brand-navy">
                    Cart Items (1)
                  </h2>
                  <button
                    onClick={handleRemoveCartItem}
                    className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {/* Course Card in Cart */}
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col sm:flex-row justify-between gap-5 items-start">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="inline-block bg-blue-50 text-brand-blue border border-blue-100 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        {cartItem.format}
                      </span>
                      <h3 className="text-base font-black text-brand-navy">
                        {cartItem.course}
                      </h3>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1.5 text-xs text-gray-500 font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-brand-blue shrink-0" />
                        <span>{cartItem.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-brand-blue shrink-0" />
                        <span>{cartItem.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-brand-blue shrink-0" />
                        <span>{cartItem.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-black text-brand-navy block">
                        ${cartItem.price}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">USD Tuition</span>
                    </div>

                    <button
                      onClick={handleRemoveCartItem}
                      className="text-xs font-bold text-gray-400 hover:text-red-600 flex items-center gap-1 p-1 cursor-pointer transition-colors"
                      title="Remove from Cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Promo Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center">
                  <div className="relative flex-1 w-full">
                    <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter promo coupon (e.g. SAVE10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 uppercase focus:border-brand-blue focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Apply Coupon
                  </button>
                </form>

                {couponMsg && (
                  <p className={`text-xs font-bold ${appliedDiscount > 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {couponMsg}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xs space-y-6 sticky top-24">
                <h3 className="text-base font-black text-brand-navy border-b border-gray-100 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs font-bold text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Course Tuition</span>
                    <span className="text-gray-900">${cartItem.price} USD</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600">
                      <span>Coupon Discount</span>
                      <span>-${appliedDiscount} USD</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Tax &amp; Service Charges</span>
                    <span className="text-emerald-600 font-black">Free / $0.00</span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-sm font-black text-brand-navy">Total Amount</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-brand-navy block">${finalPrice}</span>
                      <span className="text-[10px] text-gray-400 font-bold">USD</span>
                    </div>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <Link
                  href="/checkout/"
                  className="w-full rounded-xl bg-[#ff5c00] hover:bg-[#e05200] py-4 px-6 font-bold text-white text-xs shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer text-center block"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </Link>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] font-bold text-gray-500">
                  <p className="flex items-center gap-2">
                    <Shield size={14} className="text-emerald-500 shrink-0" />
                    <span>100% Pass Guarantee Support</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Lock size={14} className="text-brand-blue shrink-0" />
                    <span>256-Bit SSL Encrypted Checkout</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
