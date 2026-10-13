"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Phone, ShieldCheck, Users, CheckCircle2, Award, Sparkles, Calendar, TrendingUp } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function Hero({ siteSettings = {} }) {
  const heroImage = siteSettings.hero_image_url || "/images/hero_professionals.png";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Decorative Ambient Background Elements */}
      <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-[-100px] -z-10 h-[450px] w-[450px] rounded-full bg-orange-100/25 blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* =========================================
              LEFT COLUMN: Headings, Value & Actions
             ========================================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Verified Partner Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-blue-200/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                <Award size={14} className="text-brand-orange" />
                {siteSettings.top_bar_text || "PMI Authorized Training Partner"} • 100% First-Attempt Pass Guarantee
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-brand-navy tracking-tight leading-[1.08]">
              {siteSettings.hero_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteSettings.hero_title }} />
              ) : (
                <>
                  Get Certified.<br />
                  Get Promoted.<br />
                  <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-orange bg-clip-text text-transparent">
                    {siteSettings.hero_highlight_text || "Get Ahead."}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              {siteSettings.hero_subtitle || "Accelerate your career with live instructor-led bootcamps trusted by 50,000+ professionals worldwide. Comprehensive study guides, practice exams, and 100% pass guarantee."}
            </p>

            {/* Value Highlights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-xl px-3 py-2 shadow-xs">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>100% Pass Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-xl px-3 py-2 shadow-xs">
                <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                <span>Guaranteed to Run Classes</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-xl px-3 py-2 shadow-xs">
                <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                <span>Official Exam Vouchers</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>Explore Certifications</span>
                <ArrowRight size={18} />
              </Link>

              <button
                onClick={() => openModal("Talk to a Learning Advisor")}
                className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-slate-200 bg-white hover:border-brand-blue hover:bg-blue-50/50 px-7 py-4 text-sm font-black text-brand-navy transition-all shadow-xs cursor-pointer active:scale-[0.99]"
              >
                <Phone size={17} className="text-brand-blue" />
                <span>Talk to an Advisor</span>
              </button>
            </div>

            {/* Rating Stars & Trust Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200/70">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <span className="font-extrabold text-brand-navy">4.9/5</span> on{" "}
                  <span className="font-extrabold text-emerald-600">Trustpilot</span>
                </p>
              </div>

              <div className="hidden sm:block h-3.5 w-px bg-slate-300"></div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Users size={15} className="text-brand-blue" />
                <span><strong className="text-brand-navy">50,000+</strong> Professionals Trained</span>
              </div>

              <div className="hidden sm:block h-3.5 w-px bg-slate-300"></div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <TrendingUp size={15} className="text-emerald-600" />
                <span><strong className="text-brand-navy">99.2%</strong> First-Attempt Pass Rate</span>
              </div>
            </div>

          </div>

          {/* =========================================
              RIGHT COLUMN: Full-Scale Corporate Showcase
             ========================================= */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[480px]">
              
              {/* Backing Circular Modern Graphic Accent */}
              <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-300/30 to-indigo-200/40 blur-xl pointer-events-none"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-gradient-to-br from-orange-200/30 to-amber-100/40 blur-xl pointer-events-none"></div>

              {/* Main Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 shadow-2xl p-2 sm:p-2.5">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.6] bg-slate-100">
                  <Image
                    src={heroImage}
                    alt="Authorized Professional Certification Training"
                    width={700}
                    height={800}
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Subtle bottom gradient overlay for card blend */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* FLOATING BADGE 1: Top Right - Pass Guarantee */}
              <div className="absolute -top-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 animate-fade-in">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-brand-navy leading-tight">100% Pass Guarantee</p>
                  <p className="text-[9px] font-bold text-slate-500">First Attempt Guaranteed</p>
                </div>
              </div>

              {/* FLOATING BADGE 2: Bottom Left - Salary Growth & Alumni */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-blue to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-brand-navy">50,000+ Alumni</p>
                  <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp size={12} />
                    <span>Avg. $125k+ Salary</span>
                  </p>
                </div>
              </div>

              {/* FLOATING BADGE 3: Floating Live Cohort Chip */}
              <div className="absolute top-1/2 -right-4 hidden sm:flex items-center gap-2 bg-brand-navy/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full shadow-lg border border-white/10">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-wider">Batches Live Now</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
