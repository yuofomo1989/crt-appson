"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

const openModal = (title = "Talk to an Advisor") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function PreFooter({ siteSettings = {} }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0B2545] via-[#133B6E] to-[#0B2545] py-8 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10 text-center space-y-4">
        
        {/* Copy */}
        <div className="space-y-2.5">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {siteSettings.prefooter_title || "Ready to Advance Your Career?"}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/85 font-medium max-w-xl mx-auto">
            {siteSettings.prefooter_subtitle || "Join thousands of professionals who have accelerated their careers with Certification Planner."}
          </p>
        </div>

        {/* Action CTAs (Matches Reference Image 1) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
          <Link
            href="/certifications"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-orange-600 px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
          >
            <span>Explore Certifications</span>
            <span>→</span>
          </Link>
          <button
            onClick={() => openModal("Talk to an Advisor")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-3.5 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer backdrop-blur-xs"
          >
            <Phone size={15} className="text-white" />
            <span>Talk to an Advisor</span>
          </button>
        </div>

      </div>
    </section>
  );
}
