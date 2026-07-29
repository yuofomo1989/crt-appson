"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Phone, ShieldCheck, Users, Globe, Award } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function Hero() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-orange-100/20 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-tight">
              Get Certified.<br />
              Get Promoted.<br />
              <span className="text-brand-orange">Get Ahead.</span>
            </h1>

            <p className="max-w-xl text-sm md:text-base text-gray-600 font-semibold leading-relaxed">
              Live instructor-led certification training trusted by professionals in the USA, Canada, UK, Australia &amp; beyond.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-opacity-90 transition-all hover:scale-[1.02]"
              >
                Explore Certifications
              </Link>

              <button
                onClick={() => openModal("Talk to an Advisor")}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-blue/30 bg-white px-7 py-4 text-sm font-bold text-brand-blue hover:bg-blue-50 transition-all shadow-xs cursor-pointer"
              >
                <Phone size={16} className="text-brand-blue" />
                Talk to an Advisor
              </button>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="flex text-emerald-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-600">
                <span className="font-bold text-brand-navy">4.8/5</span> | 1,500+ Reviews on{" "}
                <span className="font-bold text-emerald-600">Trustpilot</span>
              </p>
            </div>

          </div>

          {/* Right Column: Hero Graphic with Photo & Floating Badges */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-blue/20 via-brand-orange/20 to-emerald-100 blur-2xl opacity-60"></div>

              {/* Main Photo Card */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
                <Image
                  src="/images/agile_hero_professional.jpg"
                  alt="Certified Professionals Training"
                  width={500}
                  height={420}
                  className="w-full h-80 md:h-96 object-cover object-top"
                  priority
                />
              </div>

              {/* Top-Right Floating Avatar Card */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-gray-100 shadow-lg flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">JD</div>
                  <div className="h-7 w-7 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">SK</div>
                </div>
                <span className="text-[10px] font-bold text-brand-navy pr-1">Live Online</span>
              </div>

              {/* Bottom-Right Floating Stats Badge */}
              <div className="absolute -bottom-5 -right-5 bg-brand-blue text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Users size={20} />
                </div>
                <div className="text-left">
                  <p className="text-base font-black leading-tight">50,000+</p>
                  <p className="text-[10px] text-blue-100 font-semibold">Professionals Trained Worldwide</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
