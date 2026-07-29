"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import { Star, Shield, BookOpen, Clock, Calendar, CheckCircle2, ChevronDown, Download, Phone, Play, ShieldAlert, Award, FileText, Check, HelpCircle, GraduationCap, Users, Globe, MapPin, RefreshCw, ShoppingCart, Lock, Headphones } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Enroll() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedCity, setSelectedCity] = useState("New York, NY");
  const [selectedCourse, setSelectedCourse] = useState("PMP® Certification Training");

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = (courseName, format, price, date) => {
    const cartItem = {
      course: courseName,
      format: format,
      price: price,
      date: date
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("cp_cart", JSON.stringify(cartItem));
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 md:px-6 space-y-12">
        
        {/* ==========================================
            1. HEADER & TOP RATINGS
            ========================================== */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-6 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
              Schedule & <span className="text-[#ff5c00]">Enroll</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-semibold max-w-xl">
              Choose your preferred training format, date and time and take the next step toward your certification.
            </p>
          </div>

          {/* Top trust badges row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-bold text-gray-600">
            <div className="space-y-1">
              <Shield size={22} className="mx-auto text-brand-blue" />
              <p className="font-black text-brand-navy">100%</p>
              <p className="text-[10px] text-gray-400 font-semibold">Pass Support</p>
            </div>
            <div className="space-y-1">
              <div className="mx-auto text-brand-blue text-sm font-black flex items-center justify-center h-[22px]">PM</div>
              <p className="font-black text-brand-navy">PMI®</p>
              <p className="text-[10px] text-gray-400 font-semibold">Authorized Training Partner</p>
            </div>
            <div className="space-y-1">
              <Users size={22} className="mx-auto text-brand-blue" />
              <p className="font-black text-brand-navy">50,000+</p>
              <p className="text-[10px] text-gray-400 font-semibold">Professionals Trained</p>
            </div>
            <div className="space-y-1">
              <Star size={22} className="mx-auto text-amber-400" fill="currentColor" />
              <p className="font-black text-brand-navy">4.8/5</p>
              <p className="text-[10px] text-gray-400 font-semibold">Based on 1,500+ Reviews</p>
            </div>
          </div>
        </div>

        {/* ==========================================
            2. FILTERS CONTAINER
            ========================================== */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-md grid sm:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Country</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🇺🇸</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-black">City</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
              >
                <option>New York, NY</option>
                <option>Houston, TX</option>
                <option>Toronto, ON</option>
                <option>Sydney, NSW</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Course</label>
            <div className="relative">
              <GraduationCap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue" />
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
              >
                <option>PMP® Certification Training</option>
                <option>CISSP® Certification Prep</option>
                <option>AWS Solutions Architect</option>
              </select>
            </div>
          </div>

          <button className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 py-3 text-xs font-bold text-gray-600 transition-colors w-full cursor-pointer h-[42px]">
            <RefreshCw size={14} />
            Reset Filters
          </button>
        </div>

        {/* ==========================================
            3. FORMAT TAB SELECTOR / ANCHOR NAV
            ========================================== */}
        <div className="flex border-b border-gray-200 text-xs font-bold text-gray-500 overflow-x-auto scrollbar-none gap-4">
          <button
            onClick={() => scrollToSection("live-online-section")}
            className="pb-4 px-6 flex items-center gap-2 border-b-2 border-brand-blue text-brand-blue hover:text-brand-blue transition-all cursor-pointer"
          >
            <Clock size={16} /> Live Online Class (12)
          </button>
          <button
            onClick={() => scrollToSection("in-person-section")}
            className="pb-4 px-6 flex items-center gap-2 border-b-2 border-transparent hover:text-gray-800 transition-all cursor-pointer"
          >
            <Users size={16} /> In-Person Classroom (6)
          </button>
          <button
            onClick={() => scrollToSection("self-learning-section")}
            className="pb-4 px-6 flex items-center gap-2 border-b-2 border-transparent hover:text-gray-800 transition-all cursor-pointer"
          >
            <BookOpen size={16} /> Self Learning (4)
          </button>
        </div>

        {/* ==========================================
            4. LIVE ONLINE CLASSES SECTION
            ========================================== */}
        <div className="space-y-6" id="live-online-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
                <Clock size={18} className="text-brand-blue" />
                Live Online Classes
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold">Interactive live training with expert instructors from anywhere.</p>
            </div>
            <a href="#all" className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1">
              View All Live Online Classes →
            </a>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-xs font-semibold text-gray-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-gray-500">
                    <th className="p-4 pl-6">Batch</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">Days</th>
                    <th className="p-4">Time (EST)</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Contact Hours</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Seats Left</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "May 27", day: "Mon", range: "May 27 – May 30, 2024", label: "Mon - Thu", days: ["M", "T", "W", "T"], time: "9:00 AM – 5:00 PM", duration: "4 Days", hours: "35", price: "$1,095 USD", seats: "8 Seats Left", status: "Open", alert: false, numericPrice: 1095 },
                    { date: "Jun 10", day: "Mon", range: "Jun 10 – Jun 13, 2024", label: "Mon - Thu", days: ["M", "T", "W", "T"], time: "9:00 AM – 5:00 PM", duration: "4 Days", hours: "35", price: "$1,095 USD", seats: "3 Seats Left", status: "Limited Seats", alert: true, numericPrice: 1095 },
                    { date: "Jun 24", day: "Mon", range: "Jun 24 – Jun 27, 2024", label: "Mon - Thu", days: ["M", "T", "W", "T"], time: "6:00 PM – 10:00 PM", duration: "4 Days", hours: "35", price: "$1,095 USD", seats: "5 Seats Left", status: "Open", alert: false, numericPrice: 1095 },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-black text-brand-navy">
                        <p className="text-sm font-black uppercase text-brand-navy">{row.date}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{row.day}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-800 font-bold">{row.range}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{row.label}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {["M", "T", "W", "T", "F", "S", "S"].map((d, didx) => (
                            <span
                              key={didx}
                              className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                                row.days.includes(d)
                                  ? "bg-blue-50 text-brand-blue border-blue-200"
                                  : "bg-gray-50 text-gray-400 border-gray-100"
                              }`}
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-800">{row.time}</td>
                      <td className="p-4 font-bold text-gray-600">{row.duration}</td>
                      <td className="p-4 font-bold text-gray-600">{row.hours}</td>
                      <td className="p-4 font-black text-brand-navy">{row.price}</td>
                      <td className={`p-4 font-bold ${row.alert ? "text-orange-500" : "text-emerald-500"}`}>
                        {row.seats}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold ${
                          row.alert ? "bg-orange-50 text-orange-500 border border-orange-100" : "bg-emerald-50 text-emerald-500 border border-emerald-100"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <button
                          onClick={() => handleAddToCart(selectedCourse, "Live Online", row.numericPrice, row.range)}
                          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue py-2 px-4 text-xs font-bold text-white hover:bg-opacity-90 w-full cursor-pointer"
                        >
                          <ShoppingCart size={12} /> Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center border-t border-gray-50">
              <button className="text-xs font-bold text-brand-blue hover:underline cursor-pointer">
                View More Live Online Classes ↓
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            5. IN-PERSON CLASSROOM SECTION
            ========================================== */}
        <div className="space-y-6" id="in-person-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
                <Users size={18} className="text-brand-orange" />
                In-Person Classroom
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold">Face-to-face training in a physical classroom with hands-on learning.</p>
            </div>
            <a href="#all" className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1">
              View All In-Person Classes →
            </a>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-xs font-semibold text-gray-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-gray-500">
                    <th className="p-4 pl-6">Batch</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">Days</th>
                    <th className="p-4">Time (EST)</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Contact Hours</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Seats Left</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "May 25", day: "Sat", range: "May 25 – May 28, 2024", label: "Sat - Tue", days: ["S", "M", "T", "W"], time: "9:00 AM – 5:00 PM", duration: "4 Days", hours: "35", location: "New York, NY Training Center", price: "$1,195 USD", seats: "6 Seats Left", status: "Open", alert: false, numericPrice: 1195 },
                    { date: "Jun 22", day: "Sat", range: "Jun 22 – Jun 25, 2024", label: "Sat - Tue", days: ["S", "M", "T", "W"], time: "9:00 AM – 5:00 PM", duration: "4 Days", hours: "35", location: "New York, NY Training Center", price: "$1,195 USD", seats: "2 Seats Left", status: "Limited Seats", alert: true, numericPrice: 1195 },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-black text-brand-navy">
                        <p className="text-sm font-black uppercase text-brand-navy">{row.date}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{row.day}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-800 font-bold">{row.range}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{row.label}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, didx) => (
                            <span
                              key={didx}
                              className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                                row.days.includes(d)
                                  ? "bg-orange-50 text-brand-orange border-orange-200"
                                  : "bg-gray-50 text-gray-400 border-gray-100"
                              }`}
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-800">{row.time}</td>
                      <td className="p-4 font-bold text-gray-600">{row.duration}</td>
                      <td className="p-4 font-bold text-gray-600">{row.hours}</td>
                      <td className="p-4 font-bold text-gray-700">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-brand-blue" />
                          <span>{row.location}</span>
                        </div>
                      </td>
                      <td className="p-4 font-black text-brand-navy">{row.price}</td>
                      <td className={`p-4 font-bold ${row.alert ? "text-orange-500" : "text-emerald-500"}`}>
                        {row.seats}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold ${
                          row.alert ? "bg-orange-50 text-orange-500 border border-orange-100" : "bg-emerald-50 text-emerald-500 border border-emerald-100"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <button
                          onClick={() => handleAddToCart(selectedCourse, `In-Person (${row.location})`, row.numericPrice, row.range)}
                          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue py-2 px-4 text-xs font-bold text-white hover:bg-opacity-90 w-full cursor-pointer"
                        >
                          <ShoppingCart size={12} /> Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center border-t border-gray-50">
              <button className="text-xs font-bold text-brand-blue hover:underline cursor-pointer">
                View More In-Person Classes ↓
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            6. SELF LEARNING SECTION
            ========================================== */}
        <div className="space-y-6" id="self-learning-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
                <BookOpen size={18} className="text-brand-green" />
                Self Learning
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold">Learn at your own pace with lifetime access to the course materials.</p>
            </div>
            <a href="#all" className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1">
              View All Self Learning Options →
            </a>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-xs font-semibold text-gray-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-gray-500">
                    <th className="p-4 pl-6">Mode</th>
                    <th className="p-4">Access Type</th>
                    <th className="p-4">Access Duration</th>
                    <th className="p-4">Includes</th>
                    <th className="p-4">Contact Hours</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { mode: "Self-Paced", access: "Online LMS Access", duration: "365 Days Access", hours: "35", price: "$795 USD", status: "Open", numericPrice: 795 },
                    { mode: "Self-Paced", access: "Online LMS Access", duration: "180 Days Access", hours: "35", price: "$595 USD", status: "Open", numericPrice: 595 },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-brand-navy flex items-center gap-2">
                        <BookOpen size={16} className="text-brand-blue" />
                        <span>{row.mode}</span>
                      </td>
                      <td className="p-4 text-gray-800">{row.access}</td>
                      <td className="p-4 font-bold text-gray-600">{row.duration}</td>
                      <td className="p-4 text-[10px] text-gray-500 font-semibold space-y-1">
                        <p className="text-brand-green font-bold">✔ 35 Contact Hours Certificate</p>
                        <p className="text-brand-green font-bold">✔ Mock Exams & Quizzes</p>
                        <p className="text-brand-green font-bold">✔ Downloadable Resources</p>
                      </td>
                      <td className="p-4 font-bold text-gray-600">{row.hours}</td>
                      <td className="p-4 font-black text-brand-navy">{row.price}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded text-[9px] font-bold bg-emerald-50 text-emerald-500 border border-emerald-100">
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <button
                          onClick={() => handleAddToCart(selectedCourse, `Self-Learning (${row.duration})`, row.numericPrice, "Lifetime Access")}
                          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue py-2 px-4 text-xs font-bold text-white hover:bg-opacity-90 w-full cursor-pointer"
                        >
                          <ShoppingCart size={12} /> Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center border-t border-gray-50">
              <button className="text-xs font-bold text-brand-blue hover:underline cursor-pointer">
                View More Self Learning Options ↓
              </button>
            </div>
          </div>
        </div>

        {/* ==========================================
            7. B2B BANNER (LOOKING FOR GROUP OR CORPORATE TRAINING?)
            ========================================== */}
        <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-gray-100 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 items-center">
            {/* Styled visual block to represent the meeting room photo */}
            <div className="h-40 w-full md:w-60 bg-slate-200 rounded-2xl flex items-center justify-center text-gray-400 relative overflow-hidden shrink-0 border border-gray-200">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/80 to-transparent"></div>
              <Users size={32} className="text-gray-500 z-10" />
              <span className="absolute bottom-3 left-3 text-[10px] text-white font-bold z-10">Custom Corporate Solutions</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-brand-navy">Looking for Group or Corporate Training?</h3>
              <p className="text-xs text-gray-400 font-bold">We offer customized training solutions for teams of any size.</p>
              
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-600 font-bold">
                <li className="flex items-center gap-2">✔ Customized Training Programs</li>
                <li className="flex items-center gap-2">✔ Onsite / Online / Blended Options</li>
                <li className="flex items-center gap-2">✔ Group Discounts & Flexible Scheduling</li>
                <li className="flex items-center gap-2">✔ Dedicated Account Manager</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 text-center space-y-3 shadow-sm">
            <h4 className="text-xs font-extrabold text-brand-navy">Request a Callback</h4>
            <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">Our training experts will contact you within 1 business hour.</p>
            <button className="w-full rounded-xl bg-brand-blue py-3 font-bold text-white text-xs hover:bg-opacity-90 cursor-pointer">
              Request Callback
            </button>
          </div>
        </div>

        {/* ==========================================
            8. BOTTOM TRUST LINE WITH BLUE OUTLINE ICONS
            ========================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-100 pt-8 text-center text-xs font-bold text-gray-600">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue mx-auto">
              <Shield size={16} />
            </div>
            <p className="text-brand-navy">30-Day Money Back</p>
            <p className="text-[10px] text-gray-400 font-semibold">100% Satisfaction Guarantee</p>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue mx-auto">
              <Lock size={16} />
            </div>
            <p className="text-brand-navy">Secure Payment</p>
            <p className="text-[10px] text-gray-400 font-semibold">Safe & Encrypted Checkout</p>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue mx-auto">
              <Calendar size={16} />
            </div>
            <p className="text-brand-navy">Lifetime Access</p>
            <p className="text-[10px] text-gray-400 font-semibold">For Self Learning Courses</p>
          </div>
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue mx-auto">
              <Headphones size={16} />
            </div>
            <p className="text-brand-navy">Need Help?</p>
            <p className="text-[10px] text-gray-400 font-semibold">Talk to Our Training Advisors</p>
          </div>
        </div>

      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
