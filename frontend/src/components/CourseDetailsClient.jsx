"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Shield, BookOpen, Clock, Calendar, CheckCircle2, ChevronDown, Download, Phone, Play, ShieldAlert, Award, FileText, Check, HelpCircle, GraduationCap, Users, Globe } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function CourseDetailsClient({ course }) {
  const [selectedFormat, setSelectedFormat] = useState("Live Online");
  const [activeModule, setActiveModule] = useState(0);

  const getAdjustedPrice = () => {
    if (selectedFormat === "Self-Learning") return course.price - 400;
    if (selectedFormat === "In-Person") return course.price + 300;
    return course.price;
  };

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      {/* ==========================================
          1. HERO SECTION & PRICING CONTAINER
          ========================================== */}
      <section className="bg-[#f4f7fa] border-b border-gray-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="text-[11px] text-gray-400 font-bold mb-6 flex gap-2">
            <span className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
            <span className="hover:text-brand-blue cursor-pointer">Certifications</span> &gt; 
            <span className="hover:text-brand-blue cursor-pointer">Agile & Project Management</span> &gt; 
            <span className="text-gray-600 font-black">PMP® Certification Training</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Hero */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-block bg-[#FFF4EC] text-brand-orange text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md border border-[#FFE2CD]">
                #1 Project Management Certification Worldwide
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-brand-navy leading-[1.15] tracking-tight">
                Become a PMP®<br />Certified Project Leader
              </h1>
              <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed max-w-2xl">
                Live instructor-led PMP® training with exam prep, mock tests, mentorship, and career support to help you succeed.
              </p>

              {/* Ratings and Stats */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-xs font-bold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400" fill="currentColor" />
                  <span>4.8/5 <span className="text-gray-400 font-medium">Student Rating</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-blue font-black uppercase tracking-wide">PM PMI®</span>
                  <span className="text-gray-400 font-medium">Authorized Partner</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>50,000+ <span className="text-gray-400 font-medium">Professionals Trained</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <span>100% <span className="text-gray-400 font-medium">Pass Support</span></span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openModal(`Enroll in ${course.title}`)}
                  className="rounded-xl bg-[#ff5c00] hover:bg-[#e05200] px-8 py-4 font-bold text-white text-xs shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Enroll Now →
                </button>
                <button
                  onClick={() => openModal("Download Syllabus")}
                  className="rounded-xl border border-brand-blue/20 bg-white text-brand-blue hover:bg-slate-50 px-6 py-4 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={14} /> Download Syllabus
                </button>
                <button
                  onClick={() => openModal("Talk to an Advisor")}
                  className="rounded-xl border border-brand-blue/20 bg-white text-brand-blue hover:bg-slate-50 px-6 py-4 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone size={14} /> Talk to an Advisor
                </button>
              </div>

              {/* Bottom features bar */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200/60 text-[11px] font-bold text-gray-500">
                <span className="flex items-center gap-1.5 text-brand-green">✔ 35 Contact Hours</span>
                <span className="flex items-center gap-1.5 text-brand-green">✔ PMI® Authorized Content</span>
                <span className="flex items-center gap-1.5 text-brand-green">✔ Lifetime LMS Access</span>
              </div>

              {/* Mockup Image */}
              <div className="hidden md:flex gap-6 items-center pt-6">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-4 border-white shadow-xl h-[180px] w-[320px] flex items-center justify-center shrink-0">
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span> Live
                  </div>
                  <div className="absolute top-2 right-2 bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded">PMP®</div>
                  <Play size={32} className="text-white opacity-80" />
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1 max-w-[200px]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      <span className="text-xs font-bold text-gray-800">Average Salary Increase</span>
                    </div>
                    <p className="text-lg font-black text-brand-navy">17%+</p>
                    <p className="text-[9px] text-gray-400 font-semibold">Globally for PMP® Professionals</p>
                  </div>
                  <p className="text-[10px] text-gray-400 font-semibold">⭐⭐⭐⭐⭐ 4.8 (1,500+ Reviews)</p>
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4" id="enroll-sidebar">
              <div className="rounded-3xl border border-gray-100 p-6 md:p-8 bg-white shadow-xl space-y-6 sticky top-24">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Course Fee</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-brand-navy">${getAdjustedPrice()}</span>
                    <span className="text-xs font-bold text-gray-400">USD</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed">
                    or 3 interest-free payments of ${(getAdjustedPrice() / 3).toFixed(0)} with Affirm
                  </p>
                </div>

                <div className="border-t border-b border-gray-50 py-4 space-y-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Next Batch (Live Online)</p>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-xs font-bold text-gray-700">
                      <p>May 27 – May 30, 2024</p>
                      <p className="text-[10px] text-gray-400 font-semibold">9:00 AM – 5:00 PM (EST)</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping"></span> Only 12 Seats Left!
                  </p>
                </div>

                <button
                  onClick={() => openModal(`Enroll in ${course.title}`)}
                  className="w-full block text-center rounded-xl bg-[#ff5c00] hover:bg-[#e05200] py-4 font-bold text-white text-xs transition-colors cursor-pointer"
                >
                  Enroll Now
                </button>

                <div className="space-y-2 pt-2 text-[10px] text-gray-400 font-bold border-t border-gray-50">
                  <p className="flex items-center gap-1.5">🛡 30-Day Money Back Guarantee</p>
                  <p className="flex items-center gap-1.5">🔒 Secure & Trusted Checkout</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          2. CHOOSE YOUR TRAINING FORMAT
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:px-6 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
            Choose Your Training Format
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold">
            Flexible learning options to fit your schedule and goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Self Learning */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-navy">Self Learning</h3>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  Learn at your own pace with lifetime access to video lessons, study materials & practice tests.
                </p>
              </div>
              <ul className="space-y-2 pt-2 text-[10px] text-gray-500 font-bold">
                <li className="flex items-center gap-1.5 text-brand-green">✔ Lifetime LMS Access</li>
                <li className="flex items-center gap-1.5 text-brand-green">✔ Study Anytime, Anywhere</li>
                <li className="flex items-center gap-1.5 text-brand-green">✔ Ideal for Self-Disciplined Learners</li>
              </ul>
            </div>
            <button
              onClick={() => setSelectedFormat("Self-Learning")}
              className="mt-6 w-full rounded-xl border border-emerald-200 py-3 text-[10px] font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Live Online Class */}
          <div className="rounded-3xl border-2 border-brand-blue bg-white p-6 shadow-md flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-[9px] uppercase tracking-wider text-white font-extrabold px-3 py-1 rounded-full">
              Most Popular
            </span>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-navy">Live Online Class</h3>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  Interactive live classes with expert instructors and real-time doubt solving.
                </p>
              </div>
              <ul className="space-y-2 pt-2 text-[10px] text-gray-500 font-bold">
                <li className="flex items-center gap-1.5 text-brand-blue">✔ Live Instructor-Led Training</li>
                <li className="flex items-center gap-1.5 text-brand-blue">✔ Real-Time Doubt Solving</li>
                <li className="flex items-center gap-1.5 text-brand-blue">✔ Engaging Class Discussions</li>
              </ul>
            </div>
            <button
              onClick={() => setSelectedFormat("Live Online")}
              className="mt-6 w-full rounded-xl bg-brand-blue py-3 text-[10px] font-bold text-white hover:bg-opacity-90 transition-all"
            >
              Learn More
            </button>
          </div>

          {/* In-Person Classroom */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                <Users size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-navy">In-Person Classroom</h3>
                <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                  Face-to-face training in a physical classroom with hands-on learning experience.
                </p>
              </div>
              <ul className="space-y-2 pt-2 text-[10px] text-gray-500 font-bold">
                <li className="flex items-center gap-1.5 text-brand-orange">✔ Interactive In-Person Sessions</li>
                <li className="flex items-center gap-1.5 text-brand-orange">✔ Networking Opportunities</li>
                <li className="flex items-center gap-1.5 text-brand-orange">✔ Ideal for Better Engagement</li>
              </ul>
            </div>
            <button
              onClick={() => setSelectedFormat("In-Person")}
              className="mt-6 w-full rounded-xl border border-orange-200 py-3 text-[10px] font-bold text-brand-orange hover:bg-orange-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Middle horizontal trust bar */}
      <section className="bg-white border-y border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-bold text-gray-500">
          <div className="flex items-center justify-center gap-2">👤 Same Expert Instructors</div>
          <div className="flex items-center justify-center gap-2">🛡 PMI® Authorized Content</div>
          <div className="flex items-center justify-center gap-2">📝 Mock Exams & Practice Tests</div>
          <div className="flex items-center justify-center gap-2">🏆 Pass Guarantee</div>
        </div>
      </section>

      {/* ==========================================
          3. COURSE CURRICULUM & DETAILS SPLIT (3-COLUMN LAYOUT MATCHING SCREENSHOT)
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Curriculum Accordion (Takes 6 of 12 cols, i.e., 50% width) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">Course Curriculum</h3>
                <p className="text-[10px] text-gray-400 font-bold">Topics & Sub Topics</p>
              </div>
              <button className="text-xs font-bold text-brand-blue hover:text-brand-navy transition-colors">
                Expand All
              </button>
            </div>

            <div className="space-y-3">
              {course.curriculum.map((module, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setActiveModule(activeModule === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-brand-navy hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs md:text-sm">{module.title}</span>
                    <span className="text-base text-gray-400 font-medium">{activeModule === idx ? "−" : "+"}</span>
                  </button>
                  
                  {activeModule === idx && (
                    <div className="bg-slate-50/30 p-5 border-t border-gray-50 text-xs md:text-sm text-gray-600 space-y-3">
                      {module.lessons.map((lesson, lidx) => (
                        <div key={lidx} className="flex items-start gap-2 pl-2">
                          <span className="text-brand-blue font-bold mr-2 text-xs">{idx + 1}.{lidx + 1}</span>
                          <span className="font-semibold text-gray-700 text-xs">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: This Course Includes (Takes 3 of 12 cols - White Card layout, Blue Vector Icons) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-6">
              <h3 className="text-sm font-extrabold text-brand-navy">This Course Includes</h3>
              
              <ul className="space-y-5 text-xs text-gray-600 font-bold">
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <GraduationCap size={14} />
                  </div>
                  <span className="leading-tight">35 Contact Hours Certificate</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <BookOpen size={14} />
                  </div>
                  <span className="leading-tight">PMI® Authorized Training Material</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Clock size={14} />
                  </div>
                  <span className="leading-tight">Mock Exams & Quizzes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Users size={14} />
                  </div>
                  <span className="leading-tight">PMP® Exam Application Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Award size={14} />
                  </div>
                  <span className="leading-tight">Resume & LinkedIn Profile Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Globe size={14} />
                  </div>
                  <span className="leading-tight">Lifetime Access to Learning Management System</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Shield size={14} />
                  </div>
                  <span className="leading-tight">30-Day Money Back Guarantee</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Quick Info / Metadata Table (Takes 3 of 12 cols - White Card Layout, Blue Icons next to Label+Value) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-6">
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <GraduationCap size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-bold">Level</p>
                    <p className="text-brand-navy font-black">Advanced</p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-bold">Duration</p>
                    <p className="text-brand-navy font-black">4 Days</p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Clock size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-bold">Contact Hours</p>
                    <p className="text-brand-navy font-black">35 Hours</p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <Shield size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-bold">PMI® PDUs</p>
                    <p className="text-brand-navy font-black">35 PDUs</p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-bold">Exam</p>
                    <p className="text-brand-navy font-black">PMP® Certification</p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-bold">Delivery</p>
                    <p className="text-brand-navy font-black">Self / Live Online / In-Person</p>
                  </div>
                </li>
              </ul>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          4. GROUP & CORPORATE TRAINING
          ========================================== */}
      <section className="bg-slate-50/50 py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-brand-navy">Group or Corporate Training</h3>
            <p className="text-xs text-gray-400 font-bold">Upskill your team with customized PMP® training solutions designed for organizations.</p>
            
            <ul className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-600 font-bold">
              <li className="flex items-center gap-2">✔ Customized Training Programs</li>
              <li className="flex items-center gap-2">✔ Onsite / Online / Blended Options</li>
              <li className="flex items-center gap-2">✔ Group Discounts & Flexible Scheduling</li>
              <li className="flex items-center gap-2">✔ Dedicated Account Manager</li>
              <li className="flex items-center gap-2">✔ Detailed Reports & Assessments</li>
            </ul>
          </div>
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 text-center space-y-4">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Trusted by Organizations Worldwide</p>
            <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-400 font-black">
              <div className="py-2 border border-gray-50 rounded-lg">Deloitte.</div>
              <div className="py-2 border border-gray-50 rounded-lg">IBM</div>
              <div className="py-2 border border-gray-50 rounded-lg">Citi</div>
              <div className="py-2 border border-gray-50 rounded-lg">Amazon</div>
            </div>
            <button
              onClick={() => openModal("Corporate Training Inquiry")}
              className="w-full rounded-xl bg-brand-blue py-3 font-bold text-white text-xs hover:bg-opacity-90 cursor-pointer"
            >
              Request Corporate Training
            </button>
          </div>
        </div>
      </section>

      {/* Trust Stats Footer Bar with Icons */}
      <section className="py-12 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs">
          <div className="space-y-1">
            <Users size={20} className="mx-auto text-brand-blue" />
            <p className="font-black text-brand-navy text-sm md:text-base">50,000+</p>
            <p className="text-[10px] text-gray-400 font-bold">Professionals Trained</p>
          </div>
          <div className="space-y-1">
            <Star size={20} className="mx-auto text-amber-400" fill="currentColor" />
            <p className="font-black text-brand-navy text-sm md:text-base">4.8/5</p>
            <p className="text-[10px] text-gray-400 font-bold">Based on 1,500+ Reviews</p>
          </div>
          <div className="space-y-1">
            <Globe size={20} className="mx-auto text-brand-blue" />
            <p className="font-black text-brand-navy text-sm md:text-base">100+</p>
            <p className="text-[10px] text-gray-400 font-bold">Countries Worldwide</p>
          </div>
          <div className="space-y-1">
            <Award size={20} className="mx-auto text-brand-blue" />
            <p className="font-black text-brand-navy text-sm md:text-base">20+ Years</p>
            <p className="text-[10px] text-gray-400 font-bold">Of Training Excellence</p>
          </div>
          <div className="space-y-1">
            <Shield size={20} className="mx-auto text-brand-blue" />
            <p className="font-black text-brand-navy text-sm md:text-base">100%</p>
            <p className="text-[10px] text-gray-400 font-bold">Pass Support</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. PRE-FOOTER CALL-TO-ACTION BANNER
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <div className="bg-brand-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-brand-blue/20 blur-2xl"></div>
          <div className="space-y-2">
            <h3 className="text-xl md:text-3xl font-extrabold">Ready to Advance Your Career?</h3>
            <p className="text-xs text-blue-200 font-semibold max-w-lg mx-auto">
              Join thousands of professionals who are achieving more with PMP® certification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => openModal(`Enroll in ${course.title}`)}
              className="w-full sm:w-auto text-center rounded-xl bg-[#ff5c00] px-8 py-3.5 font-bold text-white text-xs transition-colors hover:bg-[#e05200] cursor-pointer"
            >
              Enroll Now
            </button>
            <button
              onClick={() => openModal("Talk to an Advisor")}
              className="w-full sm:w-auto rounded-xl border border-white/20 hover:bg-white/5 px-8 py-3.5 font-bold text-white text-xs cursor-pointer"
            >
              Talk to an Advisor
            </button>
            <a
              href="https://wa.me/18887457575"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 px-8 py-3.5 font-bold text-white text-xs flex items-center justify-center gap-1.5"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5 text-[10px] text-blue-200/80 font-bold">
            <span>✔ 100% Pass Support</span>
            <span>✔ 30-Day Money Back</span>
            <span>✔ Secure Payment</span>
            <span>✔ Lifetime Access</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
