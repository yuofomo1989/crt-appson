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
  const cfg = getHeroImageConfig(siteSettings);
  const justify =
    cfg.align === "left" ? "flex-start" : cfg.align === "center" ? "center" : "flex-end";

  const badgeCount =
    siteSettings.hero_badge_count || siteSettings.total_students_trained || "50,000+";
  const badgeText =
    siteSettings.hero_badge_subtitle || "Professionals Trained Worldwide";

  const isOverlayMode = cfg.layout === "overlay";
  const enabledCards = (cfg.floatingCards || []).filter((c) => c.enabled && c.url);

  const backdropClass =
    cfg.textBackdrop === "white_card"
      ? "bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-100"
      : cfg.textBackdrop === "soft_glass"
      ? "bg-white/75 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-md border border-white/70"
      : "";

  const textAlignClass =
    cfg.textAlign === "center"
      ? "text-center items-center"
      : cfg.textAlign === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <section
      className="relative w-full overflow-hidden pt-4 sm:pt-5 lg:pt-0 pb-4 lg:pb-0 flex items-center"
      style={{
        backgroundColor: cfg.bgColor || "#eaf4ff",
        "--hero-min-h": `${cfg.bannerHeight}px`,
      }}
    >
      {/* =========================================================
          LAYER 1: FULL-SECTION BACKGROUND BANNER (Desktop >= lg)
         ========================================================= */}
      {isOverlayMode && cfg.bgUrl ? (
        <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cfg.bgUrl}
            alt="Certification Planner Hero Banner"
            draggable={false}
            className="w-full h-full block select-none"
            style={{
              objectFit: cfg.bgFit || "fill",
              objectPosition: "right center",
              transform: `translate(${cfg.bgOffX}px, ${cfg.bgOffY}px) scale(${
                (cfg.bgZoom || 100) / 100
              })`,
              transformOrigin: "center center",
            }}
          />
        </div>
      ) : (
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block z-0">
          <div className="absolute -top-10 right-0 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-blue-100/50 via-sky-50/40 to-transparent blur-2xl"></div>
        </div>
      )}

      {/* =========================================================
          LAYER 3: FLOATING MINI-IMAGES / VIDEO CALL CARDS (Full-Banner Coords)
         ========================================================= */}
      {enabledCards.length > 0 && (
        <div
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ zIndex: 20 }}
        >
          {enabledCards.map((card) => (
            <div
              key={card.id}
              className="absolute overflow-hidden"
              style={{
                left: `${card.x}%`,
                top: `${card.y}%`,
                width: `${card.width}px`,
                height: `${card.height}px`,
                borderRadius: `${card.radius}px`,
                border:
                  card.border > 0
                    ? `${card.border}px solid rgba(255, 255, 255, 0.95)`
                    : "none",
                boxShadow: card.shadow
                  ? "0 14px 30px -6px rgba(9, 30, 66, 0.32), 0 4px 10px -2px rgba(9, 30, 66, 0.16)"
                  : "none",
                zIndex: card.zIndex || 20,
                backgroundColor: "#ffffff",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.url}
                alt={card.label || "Live participant"}
                draggable={false}
                className="w-full h-full object-cover block"
              />
              {card.liveDot && (
                <span className="absolute top-2 left-2 flex items-center gap-1 bg-slate-900/65 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* =========================================================
          LAYER 5: FLOATING STATS BADGE (50,000+ Trained)
         ========================================================= */}
      {cfg.showBadge && (
        <div
          className="hidden lg:flex absolute bg-brand-blue text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl shadow-blue-600/30 border border-white/20 items-center gap-3 pointer-events-none select-none"
          style={{
            left: `${cfg.badgeX}%`,
            top: `${cfg.badgeY}%`,
            zIndex: 35,
          }}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner">
            <Users size={18} />
          </div>
          <div className="text-left">
            <p className="text-sm sm:text-base font-black leading-tight">{badgeCount}</p>
            <p className="text-[10px] text-blue-100 font-semibold leading-tight">
              {badgeText}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN 1280px CONTENT CONTAINER (Holds Layers 2 & 4)
         ========================================================= */}
      <div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:h-[var(--hero-min-h)] lg:min-h-[var(--hero-min-h)] flex items-center pointer-events-none"
        style={{ zIndex: Math.max(cfg.textZ || 30, cfg.mainZ || 10) }}
      >
        <div className="w-full grid lg:grid-cols-12 gap-6 lg:gap-6 items-center py-2 lg:py-2">
          {/* =======================================================
              LAYER 4: TEXT, BUTTONS & TRUSTPILOT BLOCK
             ======================================================= */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center space-y-3.5 relative pointer-events-auto ${textAlignClass} ${backdropClass} lg:translate-x-[var(--tx)] lg:translate-y-[var(--ty)]`}
            style={{
              "--tx": `${cfg.textOffX}px`,
              "--ty": `${cfg.textOffY}px`,
              maxWidth: `${cfg.textMaxW}px`,
              zIndex: cfg.textZ || 30,
            }}
          >
            {/* Main Headline */}
            <h1
              className="font-black text-[#0B1E33] tracking-tight leading-[1.12] text-3xl sm:text-4xl lg:text-[length:var(--hero-title-sz)]"
              style={{
                "--hero-title-sz": `${cfg.titleSize}px`,
              }}
            >
              {siteSettings.hero_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteSettings.hero_title }} />
              ) : (
                <>
                  Get Certified.
                  <br />
                  Get Promoted.
                  <br />
                  <span className="text-brand-orange">
                    {siteSettings.hero_highlight_text || "Get Ahead."}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {siteSettings.hero_subtitle ||
                "Live instructor-led certification training trusted by professionals in the USA, Canada, UK, Australia & beyond."}
            </p>

            {/* Action Buttons */}
            <div
              className={`flex flex-wrap items-center gap-3.5 pt-1 ${
                cfg.textAlign === "center"
                  ? "justify-center"
                  : cfg.textAlign === "right"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <Link
                href="/certifications"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>
                  {siteSettings.hero_cta_primary_text || "Explore Certifications"}
                </span>
                <span>→</span>
              </Link>

              <button
                onClick={() =>
                  openModal(siteSettings.hero_cta_secondary_text || "Talk to an Advisor")
                }
                className="inline-flex items-center gap-2 rounded-xl border border-brand-blue/30 bg-white/95 hover:bg-blue-50/80 px-5 py-3 text-sm font-bold text-brand-blue shadow-xs transition-all cursor-pointer active:scale-[0.99]"
              >
                <Phone size={15} className="text-brand-blue" />
                <span>
                  {siteSettings.hero_cta_secondary_text || "Talk to an Advisor"}
                </span>
              </button>
            </div>

            {/* Trustpilot Review Strip */}
            {cfg.showTrustpilot && (
              <div className="flex flex-wrap items-center gap-2.5 pt-1.5 text-xs font-semibold text-slate-700">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="flex h-5 w-5 items-center justify-center rounded-xs bg-[#00B67A] text-white text-[11px] font-bold"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-bold text-slate-900">4.8/5</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">1,500+ Reviews on</span>
                <span className="flex items-center gap-1 font-bold text-slate-900">
                  <span className="text-[#00B67A]">★</span> Trustpilot
                </span>
              </div>
            )}
          </div>

          {/* =======================================================
              LAYER 2: FOREGROUND IMAGE / MOBILE PREVIEW
             ======================================================= */}
          <div
            className="lg:col-span-5 relative flex items-center min-h-[180px] lg:min-h-0 pointer-events-auto"
            style={{
              justifyContent: justify,
              zIndex: cfg.mainZ || 10,
            }}
          >
            {/* Mobile / Tablet visual when using full-width overlay banner */}
            {isOverlayMode && !cfg.mainEnabled && (
              <div className="lg:hidden relative w-full rounded-2xl overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/uploads/hero_banner_mobile_1794397659.png"
                  alt="Certification Planner Live Training"
                  draggable={false}
                  className="w-full h-auto block select-none pointer-events-none"
                />
              </div>
            )}

            {/* Explicit Foreground Image Layer (when enabled or in Split mode) */}
            {(cfg.mainEnabled || !isOverlayMode) && cfg.mainUrl && (
              <div
                className="relative"
                style={{
                  width: cfg.width ? `min(100%, ${cfg.width}px)` : "100%",
                  height: cfg.height
                    ? `${cfg.height}px`
                    : cfg.fit === "cover"
                    ? "100%"
                    : undefined,
                  minHeight: cfg.fit === "cover" ? 300 : undefined,
                  transform: `translate(${cfg.offX}px, ${cfg.offY}px)`,
                }}
              >
                {cfg.showCircle && (
                  <div className="absolute -top-6 right-4 sm:right-8 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#E5EEF9] -z-10 pointer-events-none"></div>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cfg.mainUrl}
                  alt="Certification Planner Live Training"
                  draggable={false}
                  className="select-none pointer-events-none block"
                  style={{
                    width: "100%",
                    height: cfg.fit === "cover" || cfg.height ? "100%" : "auto",
                    objectFit: cfg.fit,
                    objectPosition:
                      cfg.fit === "contain" ? "center bottom" : "center center",
                    ...buildEdgeMask(cfg.fade),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
