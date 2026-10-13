"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Users, Video } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function Hero({ siteSettings = {} }) {
  const heroImage = siteSettings.hero_image_url || "/images/hero_professionals.png";

  return (
    <section className="relative w-full overflow-hidden bg-white pt-6 sm:pt-10 lg:pt-14 pb-0">
      {/* Background Soft Ambient Arc Gradient */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block">
        <div className="absolute -top-10 right-0 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-blue-100/50 via-sky-50/40 to-transparent blur-2xl"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          
          {/* =========================================
              LEFT COLUMN: Typography & Actions
             ========================================= */}
          <div className="lg:col-span-6 space-y-6 text-left pb-8 lg:pb-16 pt-2">
            
            {/* Main Headline (Exact Match to Reference) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-black text-[#0B1E33] tracking-tight leading-[1.12]">
              {siteSettings.hero_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteSettings.hero_title }} />
              ) : (
                <>
                  Get Certified.<br />
                  Get Promoted.<br />
                  <span className="text-brand-orange">
                    {siteSettings.hero_highlight_text || "Get Ahead."}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="max-w-lg text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
              {siteSettings.hero_subtitle || "Live instructor-led certification training trusted by professionals in the USA, Canada, UK, Australia & beyond."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl bg-brand-blue hover:bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                Explore Certifications
              </Link>

              <button
                onClick={() => openModal("Talk to an Advisor")}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-blue/30 bg-white hover:bg-blue-50/50 px-6 py-3.5 text-sm font-bold text-brand-blue transition-all cursor-pointer active:scale-[0.99]"
              >
                <Phone size={15} className="text-brand-blue" />
                <span>Talk to an Advisor</span>
              </button>
            </div>

            {/* Trustpilot Review Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-semibold text-gray-700">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="flex h-5 w-5 items-center justify-center rounded-xs bg-[#00B67A] text-white text-[11px] font-bold">
                    ★
                  </span>
                ))}
              </div>
              <span className="font-bold text-gray-800">4.8/5</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">1,500+ Reviews on</span>
              <span className="flex items-center gap-1 font-bold text-gray-900">
                <span className="text-[#00B67A]">★</span> Trustpilot
              </span>
            </div>

          </div>

          {/* =========================================
              RIGHT COLUMN: Full-Scale Background Image & Video Callouts
             ========================================= */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end self-end">
            
            <div className="relative w-full max-w-[500px] xl:max-w-[560px] flex items-end justify-center">
              
              {/* Soft Light-Blue Background Arch Behind People */}
              <div className="absolute -top-12 sm:-top-16 right-4 sm:right-8 w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-[#E5EEF9] -z-10 pointer-events-none"></div>

              {/* Main Full Image (Direct on background, no borders) */}
              <div className="relative w-full flex items-end justify-center">
                <Image
                  src={heroImage}
                  alt="Certification Planner Live Training"
                  width={620}
                  height={540}
                  className="w-full h-auto object-contain object-bottom select-none pointer-events-none drop-shadow-xs"
                  priority
                />
              </div>

              {/* FLOATING VIDEO CALL TILE 1: Top Right (Male Attendee with Headset) */}
              <div className="absolute top-2 sm:top-4 right-0 sm:right-2 bg-white p-1 rounded-2xl shadow-xl border border-gray-100/90 z-20 hover:scale-105 transition-transform duration-300">
                <div className="relative w-20 sm:w-24 h-16 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                  {/* Avatar graphic */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="h-9 w-9 rounded-full bg-slate-600 border border-white/20 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                      👨‍💼
                    </div>
                  </div>
                  {/* Active video indicator */}
                  <div className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white"></div>
                </div>
              </div>

              {/* FLOATING VIDEO CALL TILE 2: Middle Right (Female Attendee Waving) */}
              <div className="absolute top-24 sm:top-28 -right-2 sm:right-0 bg-white p-1 rounded-2xl shadow-xl border border-gray-100/90 z-20 hover:scale-105 transition-transform duration-300">
                <div className="relative w-20 sm:w-24 h-16 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-700 to-amber-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>
                  {/* Avatar graphic */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="h-9 w-9 rounded-full bg-amber-600 border border-white/20 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                      👩‍💻
                    </div>
                  </div>
                  {/* Active video indicator */}
                  <div className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white"></div>
                </div>
              </div>

              {/* FLOATING STATS BADGE: Bottom Right (Exact Match to Reference) */}
              <div className="absolute bottom-6 sm:bottom-8 right-0 sm:right-2 bg-brand-blue text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl shadow-blue-600/30 border border-white/20 flex items-center gap-3 z-20">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner">
                  <Users size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm sm:text-base font-black leading-tight">
                    {siteSettings.total_students_trained || "50,000+"}
                  </p>
                  <p className="text-[10px] text-blue-100 font-semibold leading-tight">
                    Professionals Trained Worldwide
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
