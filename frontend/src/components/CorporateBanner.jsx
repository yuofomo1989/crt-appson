"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function CorporateBanner() {

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl"></div>

        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Corporate Training Solutions
            </h2>

            <p className="text-xs md:text-sm text-gray-300 font-semibold leading-relaxed max-w-md">
              Upskill your teams. Improve performance. Drive results.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Customized Training Programs",
                "On-site / Virtual / Blended Options",
                "Group Discounts & Dedicated Support"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-white shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-200">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => openModal("Corporate Training Inquiry")}
                className="rounded-2xl bg-brand-orange px-7 py-3.5 text-xs font-black text-white hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
              >
                Get a Free Consultation
              </button>
              <Link
                href="/contact"
                className="inline-block rounded-2xl border-2 border-white/30 bg-white/10 px-7 py-3.5 text-xs font-black text-white hover:bg-white hover:text-brand-navy transition-all shadow-md"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <Image
                src="./images/about_us_professionals.jpg"
                alt="Corporate Team Upskilling Meeting"
                width={600}
                height={350}
                className="w-full h-64 md:h-72 object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
