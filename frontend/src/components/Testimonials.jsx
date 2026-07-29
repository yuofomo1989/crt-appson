"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

const testimonials = [
  {
    name: "Rahul S.",
    role: "Project Manager",
    location: "Texas, USA",
    cert: "PMP® Certified",
    quote: "Certification Planner's instructor-led training helped me clear PMP® on my first attempt.",
    badge: "Promotion",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    name: "Priya M.",
    role: "Security Manager",
    location: "Ontario, Canada",
    cert: "CISSP® Certified",
    quote: "The support and resources are unmatched. Highly recommend CP!",
    badge: "Salary Hike 30%",
    badgeColor: "bg-blue-50 text-brand-blue border-blue-200"
  },
  {
    name: "James T.",
    role: "Solutions Architect",
    location: "Sydney, Australia",
    cert: "AWS Solutions Architect",
    quote: "Great training, real-world examples and excellent instructor support.",
    badge: "New Career",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTA */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              Real Stories.<br />
              <span className="text-brand-orange">Real Success.</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
              Our students achieve their goals and transform their careers.
            </p>

            <div className="pt-2">
              <button
                onClick={() => openModal("Book a Free Consultation")}
                className="inline-flex items-center justify-center rounded-2xl bg-brand-blue px-7 py-4 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-opacity-90 transition-all hover:scale-[1.01] cursor-pointer"
              >
                View More Success Stories
              </button>
            </div>
          </div>

          {/* Right Column Cards */}
          <div className="lg:col-span-8 relative">
            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-200/80 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 text-left space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-brand-navy">{t.name}</span>
                      <svg className="h-3.5 w-3.5 fill-brand-blue" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>

                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-wider">{t.cert}</p>

                    <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div>
                      <p className="text-xs font-black text-brand-navy">{t.role}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{t.location}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className={`px-2.5 py-1 rounded-md border text-[9px] font-black ${t.badgeColor}`}>
                        {t.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="hidden lg:flex flex-col gap-2 absolute -right-6 top-1/2 -translate-y-1/2">
              <button className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 shadow-xs">
                <ChevronLeft size={16} />
              </button>
              <button className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 shadow-xs">
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
