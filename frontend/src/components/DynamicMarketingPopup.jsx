"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Sparkles, ArrowRight, Tag, Copy, Check, ShieldCheck, Award, Zap } from "lucide-react";

export default function DynamicMarketingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [matchedPopup, setMatchedPopup] = useState(null);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 🚫 Never trigger popup on Admin Panel routes (/admin)
    if (pathname && pathname.startsWith("/admin")) {
      setIsOpen(false);
      return;
    }

    async function evaluatePopupCampaigns() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const res = await fetch(`${apiUrl}/popups`);
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          const activePopups = data.data.filter(p => p.status === 'active');
          if (activePopups.length === 0) return;

          const currentPath = pathname || "/";
          let activeCampaign = null;

          // 1. High priority check for Specific Course Pages or Categories
          for (const popup of activePopups) {
            if (popup.target_type === 'course' && currentPath.includes('/courses')) {
              activeCampaign = popup;
              break;
            } else if (popup.target_type === 'category' && (currentPath.includes('/resources') || currentPath.includes('/category/'))) {
              activeCampaign = popup;
              break;
            }
          }

          // 2. Fallback to newest created 'all' pages global campaign
          if (!activeCampaign) {
            const globalPopups = activePopups.filter(p => p.target_type === 'all');
            if (globalPopups.length > 0) {
              globalPopups.sort((a, b) => b.id - a.id);
              activeCampaign = globalPopups[0];
            }
          }

          if (activeCampaign) {
            setMatchedPopup(activeCampaign);
            
            const delayMs = (activeCampaign.delay_seconds || 4) * 1000;
            const timer = setTimeout(() => {
              // Don't show if user closed it in this session
              const dismissed = sessionStorage.getItem(`popup_dismissed_${activeCampaign.id}`);
              if (!dismissed) {
                setIsOpen(true);
              }
            }, delayMs);
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.error("Popup Evaluation error:", err);
      }
    }

    evaluatePopupCampaigns();
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    if (matchedPopup) {
      sessionStorage.setItem(`popup_dismissed_${matchedPopup.id}`, 'true');
    }
  };

  const handleCopyCode = (e) => {
    e.stopPropagation();
    if (!matchedPopup?.coupon_code) return;
    navigator.clipboard.writeText(matchedPopup.coupon_code);
    setCopied(true);
    localStorage.setItem("cp_coupon", matchedPopup.coupon_code);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCtaClick = () => {
    if (matchedPopup?.coupon_code) {
      localStorage.setItem("cp_coupon", matchedPopup.coupon_code);
    }
    handleClose();
    if (typeof window !== "undefined" && matchedPopup) {
      const popupSourceTag = `Popup Campaign: [${matchedPopup.name}] - ${matchedPopup.title}`;
      window.dispatchEvent(new CustomEvent("openConsultationModal", {
        detail: {
          title: matchedPopup.title || "Claim Exclusive Offer & Syllabus",
          source: popupSourceTag,
          coupon: matchedPopup.coupon_code || ""
        }
      }));
    }
  };

  if (!isOpen || !matchedPopup || matchedPopup.status !== 'active' || (pathname && pathname.startsWith("/admin"))) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300"
      onClick={handleClose}
    >
      {/* Modal Card - 100% Client Corporate Theme Match */}
      <div 
        className="relative w-full max-w-lg rounded-[32px] bg-white p-6 sm:p-8 md:p-9 shadow-2xl border border-slate-100 space-y-6 text-left transform transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-1.5 bg-gradient-to-r from-brand-blue via-brand-orange to-emerald-400 rounded-b-full"></div>

        {/* Soft Background Radial Glow Accents */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-100/60 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-100/60 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer z-10 shadow-xs"
          aria-label="Close offer"
        >
          <X size={16} />
        </button>

        {/* Header Tag / Badge */}
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-brand-orange text-[11px] font-black uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-brand-orange fill-brand-orange/20" />
            {matchedPopup.name || "Special Tuition Offer"}
          </span>
          <span className="text-[11px] font-bold text-slate-400">
            • Limited Time Only
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-[28px] font-black text-slate-900 leading-tight tracking-tight">
            {matchedPopup.title}
          </h3>
          {matchedPopup.subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {matchedPopup.subtitle}
            </p>
          )}
        </div>

        {/* Coupon Ticket Voucher Box (Client Theme with Dashed Borders & Cutouts) */}
        {matchedPopup.coupon_code && (
          <div className="relative bg-gradient-to-br from-orange-50/80 via-amber-50/50 to-orange-50/80 border-2 border-dashed border-orange-300 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-inner overflow-hidden">
            {/* Ticket Notches */}
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-r border-orange-200"></div>
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-l border-orange-200"></div>

            <div className="space-y-0.5 pl-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-orange-600 flex items-center gap-1">
                <Tag size={12} /> Special Promo Voucher
              </span>
              <p className="text-xs font-bold text-slate-700">Use this code at checkout to claim discount:</p>
            </div>

            <div className="flex items-center gap-2 pr-1">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-orange-200 text-brand-orange font-mono font-black text-sm tracking-wider shadow-xs">
                {matchedPopup.coupon_code}
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                  copied 
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                    : "bg-white hover:bg-orange-100/60 border-orange-200 text-slate-700 hover:text-brand-orange"
                }`}
                title="Copy Coupon Code"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="space-y-3 pt-1">
          <button
            onClick={handleCtaClick}
            className="w-full py-4 px-6 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
          >
            <span>{matchedPopup.cta_text || "Claim Exclusive Offer & Free Consultation"}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Strip Matching Course Details Theme */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-500" /> 100% Pass Support
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Award size={14} className="text-brand-blue" /> PMI® Authorized
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Zap size={14} className="text-amber-500" /> Instant LMS
          </span>
        </div>
      </div>
    </div>
  );
}
