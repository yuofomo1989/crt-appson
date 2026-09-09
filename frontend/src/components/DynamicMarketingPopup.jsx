"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Sparkles, ArrowRight, Tag } from "lucide-react";

export default function DynamicMarketingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [matchedPopup, setMatchedPopup] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // 🚫 Never trigger popup on Admin Panel routes (/admin)
    if (pathname && pathname.startsWith("/admin")) {
      setIsOpen(false);
      return;
    }

    async function evaluatePopupCampaigns() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
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
            
            const delayMs = (activeCampaign.delay_seconds || 3) * 1000;
            const timer = setTimeout(() => {
              setIsOpen(true);
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
  };

  const handleCtaClick = () => {
    handleClose();
    if (typeof window !== "undefined" && matchedPopup) {
      const popupSourceTag = `Popup Campaign: [${matchedPopup.name}] - ${matchedPopup.title}`;
      window.dispatchEvent(new CustomEvent("openConsultationModal", {
        detail: {
          title: matchedPopup.title || "Claim Exclusive Offer & Syllabus",
          source: popupSourceTag
        }
      }));
    }
  };

  if (!isOpen || !matchedPopup || matchedPopup.status !== 'active' || (pathname && pathname.startsWith("/admin"))) return null;

  // Visual Theme Palette Class Mapping
  const themeClasses = {
    navy: "from-slate-900 via-brand-navy to-slate-900 border-slate-700 text-white",
    emerald: "from-slate-950 via-emerald-950 to-slate-900 border-emerald-700 text-white",
    orange: "from-slate-950 via-orange-950 to-slate-900 border-brand-orange/60 text-white",
    purple: "from-slate-950 via-purple-950 to-slate-900 border-purple-700 text-white",
    dark: "from-slate-950 via-slate-900 to-black border-slate-800 text-white"
  }[matchedPopup.theme_color || 'navy'] || "from-slate-900 via-brand-navy to-slate-900 border-slate-700 text-white";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className={`bg-gradient-to-b ${themeClasses} border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-left shadow-2xl relative overflow-hidden`}>
        
        {/* Optional Banner Image */}
        {matchedPopup.banner_image && (
          <div className="w-full h-36 rounded-2xl overflow-hidden mb-3 border border-slate-700/50 shadow-md">
            <img src={matchedPopup.banner_image} alt="Promo Banner" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer z-10"
        >
          <X size={18} />
        </button>

        {/* Top Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold font-mono border border-brand-orange/30 inline-flex items-center gap-1.5 uppercase">
            <Sparkles size={13} />
            {matchedPopup.name}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black leading-tight">
            {matchedPopup.title}
          </h3>
          {matchedPopup.subtitle && (
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {matchedPopup.subtitle}
            </p>
          )}
        </div>

        {/* Coupon Code Display Box */}
        {matchedPopup.coupon_code && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <Tag size={16} />
              <span className="text-xs font-bold uppercase">Discount Code:</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-black text-sm border border-amber-500/30">
              {matchedPopup.coupon_code}
            </span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleCtaClick}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            {matchedPopup.cta_text || "Claim Offer & Free Syllabus"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
