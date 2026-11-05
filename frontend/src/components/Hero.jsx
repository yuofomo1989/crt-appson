"use client";

import React from "react";
import Link from "next/link";
import { Phone, Users } from "lucide-react";
import { getHeroImageConfig, buildEdgeMask } from "@/lib/heroImage";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function Hero({ siteSettings = {} }) {
  let heroImage = siteSettings.hero_image_url || "/images/hero_professionals.png";
  if (typeof heroImage === "string" && heroImage.startsWith("./")) {
    heroImage = heroImage.substring(1);
  }

  // Image size / position / softness are controlled from Admin > Homepage Builder > Hero Image Studio
  const cfg = getHeroImageConfig(siteSettings);
  const justify = cfg.align === "left" ? "flex-start" : cfg.align === "center" ? "center" : "flex-end";
  const badgeCount = siteSettings.hero_badge_count || siteSettings.total_students_trained || "50,000+";
  const badgeText = siteSettings.hero_badge_subtitle || "Professionals Trained Worldwide";

  return (
    <section className="relative w-full overflow-hidden bg-white pt-4 sm:pt-6 lg:pt-8 pb-0">
      {/* Background Soft Ambient Arc Gradient */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block">
        <div className="absolute -top-10 right-0 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-blue-100/50 via-sky-50/40 to-transparent blur-2xl"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-6 items-stretch">
          
          {/* =========================================
              LEFT COLUMN: Typography & Actions
             ========================================= */}
          <div className="lg:col-span-6 space-y-4 text-left pb-3 lg:pb-5 pt-1 flex flex-col justify-center">
            
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
                href="/certifications"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>Explore Certifications</span>
                <span>→</span>
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
              RIGHT COLUMN: Hero Image (fully controlled from Admin)
             ========================================= */}
          <div
            className="lg:col-span-6 relative flex items-center min-h-[280px]"
            style={{ justifyContent: justify }}
          >
            <div
              className="relative"
              style={{
                width: cfg.width ? `min(100%, ${cfg.width}px)` : "100%",
                height: cfg.height ? `${cfg.height}px` : cfg.fit === "cover" ? "100%" : undefined,
                minHeight: cfg.fit === "cover" ? 320 : undefined,
                transform: `translate(${cfg.offX}px, ${cfg.offY}px)`,
              }}
            >
              {/* Optional soft circle behind transparent cut-out images */}
              {cfg.showCircle && (
                <div className="absolute -top-6 right-4 sm:right-8 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#E5EEF9] -z-10 pointer-events-none"></div>
              )}

              {/* Image with feathered edges so it blends into the page */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt="Certification Planner Live Training"
                draggable={false}
                className="select-none pointer-events-none block"
                style={{
                  width: "100%",
                  height: cfg.fit === "cover" || cfg.height ? "100%" : "auto",
                  objectFit: cfg.fit,
                  objectPosition: cfg.fit === "contain" ? "center bottom" : "center center",
                  ...buildEdgeMask(cfg.fade),
                }}
              />

              {/* Floating stats badge (always inside the image area) */}
              {cfg.showBadge && (
                <div className="absolute bottom-4 sm:bottom-6 right-2 sm:right-4 bg-brand-blue text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl shadow-blue-600/30 border border-white/20 flex items-center gap-3 z-20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner">
                    <Users size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-black leading-tight">{badgeCount}</p>
                    <p className="text-[10px] text-blue-100 font-semibold leading-tight">{badgeText}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
