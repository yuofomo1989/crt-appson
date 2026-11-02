"use client";

import React, { useState, useRef } from "react";
import { Image as ImageIcon, Upload, Check, RefreshCw, ExternalLink, Sliders, Eye, Trash2, Sparkles, Type } from "lucide-react";

export default function SiteLogoEditor({
  siteSettings,
  setSiteSettings,
  onSave,
  showToast
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const footerFileInputRef = useRef(null);

  const logoUrl = siteSettings.logo_url || "";
  const logoHeight = siteSettings.logo_height || 40;
  const logoAlt = siteSettings.logo_alt || "Certification Planner";
  const showLogoText = siteSettings.show_logo_text !== false;
  const siteTitlePrefix = siteSettings.site_title_prefix || "Certification";
  const siteTitleSuffix = siteSettings.site_title_suffix || "Planner";

  const useCustomFooterLogo = !!siteSettings.use_custom_footer_logo;
  const footerLogoUrl = siteSettings.footer_logo_url || "";
  const footerLogoHeight = siteSettings.footer_logo_height || 36;
  const showFooterLogoText = siteSettings.show_footer_logo_text !== false;

  const handleFileUpload = async (file, target = "header") => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("set_as_hero", "false");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      const res = await fetch(`${apiUrl}/admin/media`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.status === "success" && json.data?.url) {
        if (target === "footer") {
          setSiteSettings((prev) => ({
            ...prev,
            footer_logo_url: json.data.url,
            use_custom_footer_logo: true
          }));
          if (showToast) showToast("Footer Logo uploaded successfully! 🎉");
        } else {
          setSiteSettings((prev) => ({
            ...prev,
            logo_url: json.data.url,
          }));
          if (showToast) showToast("Header Logo uploaded successfully! 🎉");
        }
      } else {
        alert("Upload failed: " + (json.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e, target = "header") => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], target);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm("Reset logo to default Certification Planner badge?")) {
      setSiteSettings((prev) => ({
        ...prev,
        logo_url: "",
        logo_height: 40,
        show_logo_text: true,
        site_title_prefix: "Certification",
        site_title_suffix: "Planner",
        use_custom_footer_logo: false,
        footer_logo_url: "",
      }));
      if (showToast) showToast("Reset to default logo badge!");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-blue-500/10 text-brand-blue border border-blue-500/20">
              <ImageIcon size={20} />
            </span>
            <h2 className="text-2xl font-black text-white">Site Logo & Branding Manager</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Upload your company logo, customize dimensions, toggle text visibility, and view live previews on light & dark themes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={14} /> Reset Default
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Check size={14} /> Save Logo Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upload & Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Main Logo Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-blue flex items-center gap-2">
                  <Upload size={16} /> 1. Main Website Logo (Header)
                </h3>
                <p className="text-[11px] text-slate-400">Appears on the top navigation bar across all pages.</p>
              </div>
              {logoUrl && (
                <button
                  type="button"
                  onClick={() => setSiteSettings(prev => ({ ...prev, logo_url: "" }))}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                >
                  <Trash2 size={13} /> Remove Image
                </button>
              )}
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => handleDrop(e, "header")}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-brand-blue bg-blue-500/10"
                  : "border-slate-700 bg-slate-950/60 hover:border-slate-500 hover:bg-slate-950"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0], "header");
                  }
                }}
              />
              <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-brand-blue mb-3">
                <Upload size={22} className={uploading ? "animate-bounce" : ""} />
              </div>
              <p className="text-xs font-bold text-white">
                {uploading ? "Uploading logo..." : "Click to upload or drag & drop logo here"}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                Supports PNG, SVG, JPG, WebP (Transparent PNG or SVG recommended)
              </p>
            </div>

            {/* Direct URL Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Or Paste Image URL / File Path</label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setSiteSettings({ ...siteSettings, logo_url: e.target.value })}
                placeholder="e.g. /uploads/company_logo.png or https://example.com/logo.png"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-brand-blue"
              />
            </div>

            {/* Logo Sizing & Display Controls */}
            <div className="bg-slate-950/70 border border-slate-850 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Sliders size={14} className="text-brand-blue" />
                  Logo Display Height: <span className="text-brand-blue">{logoHeight}px</span>
                </label>
                <input
                  type="number"
                  min="20"
                  max="120"
                  value={logoHeight}
                  onChange={(e) => setSiteSettings({ ...siteSettings, logo_height: parseInt(e.target.value) || 40 })}
                  className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-center font-bold"
                />
              </div>
              <input
                type="range"
                min="20"
                max="90"
                value={logoHeight}
                onChange={(e) => setSiteSettings({ ...siteSettings, logo_height: parseInt(e.target.value) || 40 })}
                className="w-full accent-brand-blue cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Compact (24px)</span>
                <span>Standard (40px)</span>
                <span>Large (60px)</span>
                <span>Extra Large (90px)</span>
              </div>
            </div>

            {/* Text & Typography Options */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showLogoText}
                      onChange={(e) => setSiteSettings({ ...siteSettings, show_logo_text: e.target.checked })}
                      className="rounded accent-brand-blue h-4 w-4 cursor-pointer"
                    />
                    <span>Show Brand Text Next to Logo Image</span>
                  </label>
                  <p className="text-[10px] text-slate-400 pl-5.5 mt-0.5">
                    Uncheck this if your uploaded logo already has the company name written inside it.
                  </p>
                </div>
              </div>

              {showLogoText && (
                <div className="grid grid-cols-2 gap-3 pl-5.5 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase">Brand First Word</label>
                    <input
                      type="text"
                      value={siteTitlePrefix}
                      onChange={(e) => setSiteSettings({ ...siteSettings, site_title_prefix: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-blue"
                      placeholder="Certification"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase">Brand Highlight Word (Orange)</label>
                    <input
                      type="text"
                      value={siteTitleSuffix}
                      onChange={(e) => setSiteSettings({ ...siteSettings, site_title_suffix: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-blue"
                      placeholder="Planner"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Image Alt Text (SEO & Accessibility)</label>
                <input
                  type="text"
                  value={logoAlt}
                  onChange={(e) => setSiteSettings({ ...siteSettings, logo_alt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-brand-blue"
                  placeholder="Certification Planner Logo"
                />
              </div>
            </div>
          </div>

          {/* Footer Logo Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-orange" /> 2. Footer Logo (Dark Theme)
                </h3>
                <p className="text-[11px] text-slate-400">Optional: specify a white or light-monochrome logo for the dark footer.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="customFooterToggle"
                checked={useCustomFooterLogo}
                onChange={(e) => setSiteSettings({ ...siteSettings, use_custom_footer_logo: e.target.checked })}
                className="rounded accent-brand-blue h-4 w-4 cursor-pointer"
              />
              <label htmlFor="customFooterToggle" className="text-xs font-bold text-white cursor-pointer">
                Use a separate custom logo for the dark footer
              </label>
            </div>

            {useCustomFooterLogo ? (
              <div className="space-y-4 pt-2">
                <div
                  onClick={() => footerFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 bg-slate-950/60 hover:border-slate-500 rounded-2xl p-4 text-center cursor-pointer transition-all"
                >
                  <input
                    ref={footerFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], "footer");
                      }
                    }}
                  />
                  <p className="text-xs font-bold text-white">Click to upload Footer Logo (Light/White version)</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Footer Logo URL</label>
                  <input
                    type="text"
                    value={footerLogoUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, footer_logo_url: e.target.value })}
                    placeholder="e.g. /uploads/logo_white.png"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">
                    Footer Logo Height: <span className="text-brand-orange">{footerLogoHeight}px</span>
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="80"
                    value={footerLogoHeight}
                    onChange={(e) => setSiteSettings({ ...siteSettings, footer_logo_height: parseInt(e.target.value) || 36 })}
                    className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-center font-bold"
                  />
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 italic">
                Currently using the main logo (or CP badge) on the footer. Check the box above if you want an inverted white version.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Live Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Preview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye size={14} className="text-brand-blue" /> Live Navbar Preview (Light Theme)
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">
                Interactive
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                
                {/* Simulated Logo Area */}
                <div className="flex items-center gap-2.5">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={logoAlt}
                      style={{ height: `${logoHeight}px`, width: "auto" }}
                      className="object-contain max-w-[200px]"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-base shadow-sm">
                      CP
                    </div>
                  )}

                  {showLogoText && (
                    <span className="text-base font-bold tracking-tight text-brand-navy whitespace-nowrap">
                      {siteTitlePrefix}<span className="text-brand-orange">{siteTitleSuffix}</span>
                    </span>
                  )}
                </div>

                {/* Simulated Nav Links */}
                <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold text-gray-600">
                  <span>Courses ▾</span>
                  <span>Resources</span>
                </div>

                {/* Simulated Button */}
                <button
                  type="button"
                  className="bg-brand-blue text-white font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-xs"
                >
                  Explore
                </button>
              </div>

              <div className="pt-2 text-[10px] text-gray-400 text-center">
                This is how your logo appears to visitors on the website header.
              </div>
            </div>
          </div>

          {/* Footer Preview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye size={14} className="text-brand-orange" /> Live Footer Preview (Dark Theme #050E17)
              </span>
            </div>

            <div className="bg-[#050E17] rounded-2xl p-5 border border-white/10 shadow-sm text-gray-400 text-xs">
              <div className="flex items-center gap-2.5 mb-3">
                {(useCustomFooterLogo && footerLogoUrl) ? (
                  <img
                    src={footerLogoUrl}
                    alt={logoAlt}
                    style={{ height: `${footerLogoHeight}px`, width: "auto" }}
                    className="object-contain max-w-[180px]"
                  />
                ) : logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={logoAlt}
                    style={{ height: `${footerLogoHeight}px`, width: "auto" }}
                    className="object-contain max-w-[180px]"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-sm shadow-sm">
                    CP
                  </div>
                )}

                {showLogoText && (
                  <span className="text-sm font-bold tracking-tight text-white whitespace-nowrap">
                    {siteTitlePrefix}<span className="text-brand-orange">{siteTitleSuffix}</span>
                  </span>
                )}
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed">
                Certification Planner is a leading North American professional training provider offering guaranteed bootcamps.
              </p>
            </div>
          </div>

          {/* Quick Info / Tips Card */}
          <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-5 space-y-2 text-xs text-slate-400">
            <p className="font-bold text-white flex items-center gap-1.5">
              💡 Recommendations for best look:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Use a transparent PNG or SVG with clear edges.</li>
              <li>Recommended dimensions: <strong>200x50px</strong> up to <strong>400x100px</strong>.</li>
              <li>If your logo image has the brand name in it, uncheck <em>"Show Brand Text"</em> to avoid repetition.</li>
              <li>Changes reflect instantly on homepage, enroll page, and course detail pages upon saving.</li>
            </ul>
          </div>

          {/* Save Action Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              Open Live Site <ExternalLink size={12} />
            </a>
            <button
              type="button"
              onClick={onSave}
              className="py-2.5 px-6 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Check size={14} /> Save Changes
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
