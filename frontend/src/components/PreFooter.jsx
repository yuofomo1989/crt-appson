"use client";

import React from "react";
import { Phone, Calendar } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function PreFooter() {

  return (
    <section className="relative overflow-hidden bg-brand-navy py-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          {/* Copy */}
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Ready to Advance Your Career?
            </h3>
            <p className="text-xs md:text-sm text-blue-100/80 font-medium">
              Talk to our training experts and find the right certification path for your objectives.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => openModal("Get a Free Consultation")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-xs font-bold text-white transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Calendar size={16} />
              Get a Free Consultation
            </button>
            <a
              href="tel:8887457575"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition-all"
            >
              <Phone size={16} className="text-brand-orange" />
              Call Us: (888) 745-7575
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
