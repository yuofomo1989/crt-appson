"use client";

import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, Image as ImageIcon, RotateCcw, Move, Library, Link2, Check, Sparkles } from "lucide-react";
import { getHeroImageConfig, buildEdgeMask, HERO_DEFAULTS, HERO_PRESETS } from "@/lib/heroImage";

const REF_COL_W = 620; // approx. width of the hero image column on desktop
const REF_COL_H = 520; // approx. height of the hero image column on desktop
const SCALE = 0.62;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer select-none">
      <span
        onClick={() => onChange(!checked)}
        className={`relative inline-block h-5 w-9 rounded-full transition-colors ${checked ? "bg-brand-blue" : "bg-slate-700"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? "left-4.5" : "left-0.5"}`} style={{ left: checked ? 18 : 2 }} />
      </span>
      {label}
    </label>
  );
}

export default function HeroImageEditor({ siteSettings, setSiteSettings, onBrowseMedia, showToast }) {
  const [recent, setRecent] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);
  const dragStart = useRef(null);

  const url = siteSettings.hero_image_url || "/images/hero_professionals.png";
  const cfg = getHeroImageConfig(siteSettings);

  const update = (patch) => setSiteSettings((prev) => ({ ...prev, ...patch }));

  const loadRecent = async () => {
    try {
      const res = await fetch("/api/admin/media/");
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) setRecent(data.data.slice(0, 8));
    } catch (e) {}
  };

  useEffect(() => {
    loadRecent();
  }, []);

  const uploadFile = async (file) => {
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      alert("Please choose an image file (PNG, JPG, WEBP, SVG).");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("set_as_hero", "false");
      const res = await fetch("/api/admin/media/", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        update({ hero_image_url: data.data.url });
        showToast?.("Image uploaded & selected. Click 'Save Section 1' to publish. 🖼️");
        loadRecent();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Upload error: " + err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // Drag the image inside the preview to reposition it
  const onPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: cfg.offX, oy: cfg.offY };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragStart.current) return;
    const dx = (e.clientX - dragStart.current.x) / SCALE;
    const dy = (e.clientY - dragStart.current.y) / SCALE;
    update({
      hero_image_offset_x: clamp(Math.round((dragStart.current.ox + dx) / 5) * 5, -150, 150),
      hero_image_offset_y: clamp(Math.round((dragStart.current.oy + dy) / 5) * 5, -100, 100),
    });
  };
  const onPointerUp = () => {
    dragStart.current = null;
    setDragging(false);
  };

  const justify = cfg.align === "left" ? "flex-start" : cfg.align === "center" ? "center" : "flex-end";

  const SliderCard = ({ label, display, children, hint }) => (
    <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center text-xs">
        <label className="text-slate-300 font-bold">{label}</label>
        <span className="font-mono font-bold text-amber-400">{display}</span>
      </div>
      {children}
      {hint}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">🖼️ Hero Image Studio</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500 font-bold">Quick presets:</span>
          <button
            type="button"
            onClick={() => update(HERO_PRESETS.photo)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-blue/15 hover:bg-brand-blue/25 text-brand-blue text-[11px] font-bold cursor-pointer"
            title="Normal photo / banner: whole image visible, soft blended edges"
          >
            <Sparkles size={11} /> Photo (blend edges)
          </button>
          <button
            type="button"
            onClick={() => update(HERO_PRESETS.cutout)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold cursor-pointer"
            title="Transparent PNG of people: sits on the floor with soft circle behind"
          >
            <Sparkles size={11} /> Transparent cut-out
          </button>
          <button
            type="button"
            onClick={() => update({ ...HERO_PRESETS.photo, hero_image_fit: "cover" })}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold cursor-pointer"
            title="Fill the whole panel (edges may be cropped)"
          >
            <Sparkles size={11} /> Fill panel
          </button>
          <button
            type="button"
            onClick={() => update(HERO_DEFAULTS)}
            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* ===== LIVE PREVIEW (same logic as the website) ===== */}
        <div className="xl:col-span-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 font-bold text-slate-300">
              <Move size={12} /> Live Preview — drag the image to move it
            </span>
            <span className="font-mono">
              {cfg.width ? `${cfg.width}px` : "full"} × {cfg.height ? `${cfg.height}px` : "auto"} · X {cfg.offX} · Y {cfg.offY}
            </span>
          </div>

          <div
            className="relative rounded-2xl border border-slate-800 bg-white overflow-hidden select-none"
            style={{ height: REF_COL_H * SCALE + 8 }}
          >
            <div
              style={{
                width: REF_COL_W,
                height: REF_COL_H,
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: justify,
              }}
            >
              <div
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{
                  position: "relative",
                  width: cfg.width ? `min(100%, ${cfg.width}px)` : "100%",
                  height: cfg.height ? cfg.height : cfg.fit === "cover" ? "100%" : undefined,
                  minHeight: cfg.fit === "cover" ? 320 : undefined,
                  transform: `translate(${cfg.offX}px, ${cfg.offY}px)`,
                  cursor: dragging ? "grabbing" : "grab",
                  outline: dragging ? "2px dashed #3b82f6" : "1px dashed rgba(59,130,246,.4)",
                  outlineOffset: 2,
                  touchAction: "none",
                }}
              >
                {cfg.showCircle && (
                  <div
                    style={{
                      position: "absolute",
                      top: -24,
                      right: 32,
                      width: 384,
                      height: 384,
                      borderRadius: 9999,
                      background: "#E5EEF9",
                      zIndex: 0,
                    }}
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt="Hero preview"
                  draggable={false}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "block",
                    width: "100%",
                    height: cfg.fit === "cover" || cfg.height ? "100%" : "auto",
                    objectFit: cfg.fit,
                    objectPosition: cfg.fit === "contain" ? "center bottom" : "center center",
                    pointerEvents: "none",
                    ...buildEdgeMask(cfg.fade),
                  }}
                />
                {cfg.showBadge && (
                  <div
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 24,
                      zIndex: 2,
                      background: "#1d6fe8",
                      color: "#fff",
                      padding: "12px 20px",
                      borderRadius: 16,
                      fontWeight: 800,
                      fontSize: 16,
                      lineHeight: 1.2,
                      boxShadow: "0 10px 25px rgba(37,99,235,.3)",
                      pointerEvents: "none",
                    }}
                  >
                    {siteSettings.hero_badge_count || siteSettings.total_students_trained || "50,000+"}
                    <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.85 }}>
                      {siteSettings.hero_badge_subtitle || "Professionals Trained Worldwide"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">
            Preview uses the same logic as the homepage (desktop view). Publish with <b>Save Section 1</b>.
          </p>
        </div>

        {/* ===== IMAGE SOURCE ===== */}
        <div className="xl:col-span-2 space-y-3">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              uploadFile(e.dataTransfer.files?.[0]);
            }}
            className="relative rounded-2xl border-2 border-dashed border-slate-700 hover:border-brand-blue/70 bg-slate-950/60 p-4 text-center transition-colors"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => uploadFile(e.target.files?.[0])}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <UploadCloud className="mx-auto text-brand-blue mb-1" size={26} />
            <p className="text-xs font-bold text-white">{uploading ? "Uploading..." : "Drop image here or click to upload"}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Best: 620×520 px (photo) or transparent PNG</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onBrowseMedia}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
            >
              <Library size={13} /> Open Media Library
            </button>
            <button
              type="button"
              onClick={() => setShowUrl((s) => !s)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
            >
              <Link2 size={13} /> URL
            </button>
          </div>

          {showUrl && (
            <input
              type="text"
              placeholder="/images/hero_professionals.png or https://..."
              value={siteSettings.hero_image_url || ""}
              onChange={(e) => update({ hero_image_url: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-blue"
            />
          )}

          <div>
            <p className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
              <ImageIcon size={12} /> Recent images (click to use)
            </p>
            <div className="grid grid-cols-4 gap-2">
              {recent.map((m) => {
                const active = m.url === url;
                return (
                  <button
                    key={m.id}
                    type="button"
                    title={m.name}
                    onClick={() => update({ hero_image_url: m.url })}
                    className={`relative h-14 rounded-lg overflow-hidden bg-slate-950 border cursor-pointer ${
                      active ? "border-amber-400 ring-1 ring-amber-400" : "border-slate-800 hover:border-slate-600"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.url} alt={m.name} className="w-full h-full object-contain" />
                    {active && (
                      <span className="absolute top-0.5 right-0.5 bg-amber-400 text-slate-900 rounded-full p-0.5">
                        <Check size={9} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== LOOK & FEEL ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SliderCard label="Image Fit" display={cfg.fit === "contain" ? "Whole image" : "Fill panel"}>
          <div className="inline-flex w-full rounded-lg bg-slate-950 p-0.5 border border-slate-800">
            {[
              ["contain", "Whole image"],
              ["cover", "Fill (crop)"],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => update({ hero_image_fit: val })}
                className={`flex-1 px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                  cfg.fit === val ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </SliderCard>

        <SliderCard
          label="Edge softness"
          display={cfg.fade ? `${cfg.fade}%` : "Off"}
          hint={<p className="text-[10px] text-slate-500">Blends photo edges into the white page</p>}
        >
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={cfg.fade}
            onChange={(e) => update({ hero_image_fade: parseInt(e.target.value) })}
            className="w-full cursor-pointer accent-amber-400"
          />
        </SliderCard>

        <div className="lg:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <Toggle checked={cfg.showBadge} onChange={(v) => update({ hero_show_badge: v })} label="Show 50,000+ badge" />
          <Toggle checked={cfg.showCircle} onChange={(v) => update({ hero_show_circle: v })} label="Soft circle behind image" />
        </div>
      </div>

      {/* ===== SIZE & POSITION ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <SliderCard label="Width" display={cfg.width ? `${cfg.width}px` : "Full column"}>
          <input
            type="range"
            min={300}
            max={900}
            step={10}
            value={cfg.width || 900}
            onChange={(e) => update({ hero_image_width: parseInt(e.target.value) })}
            className="w-full cursor-pointer accent-amber-400"
          />
          <button
            type="button"
            onClick={() => update({ hero_image_width: "full" })}
            className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${!cfg.width ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-400 hover:text-white"}`}
          >
            Full column (auto)
          </button>
        </SliderCard>

        <SliderCard label="Height" display={cfg.height ? `${cfg.height}px` : "Auto"}>
          <input
            type="range"
            min={300}
            max={750}
            step={10}
            value={cfg.height || 520}
            onChange={(e) => update({ hero_image_height: parseInt(e.target.value) })}
            className="w-full cursor-pointer accent-amber-400"
          />
          <button
            type="button"
            onClick={() => update({ hero_image_height: "auto" })}
            className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${!cfg.height ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-400 hover:text-white"}`}
          >
            Auto (natural ratio)
          </button>
        </SliderCard>

        <SliderCard
          label="Left ⟷ Right"
          display={cfg.offX === 0 ? "0px" : cfg.offX < 0 ? `${Math.abs(cfg.offX)}px ←` : `${cfg.offX}px →`}
          hint={<p className="text-[10px] text-slate-500 font-mono">-150 (left) … +150 (right)</p>}
        >
          <input
            type="range"
            min={-150}
            max={150}
            step={5}
            value={cfg.offX}
            onChange={(e) => update({ hero_image_offset_x: parseInt(e.target.value) })}
            className="w-full cursor-pointer accent-cyan-400"
          />
        </SliderCard>

        <SliderCard
          label="Up ⟷ Down"
          display={cfg.offY === 0 ? "0px" : cfg.offY < 0 ? `${Math.abs(cfg.offY)}px ↑` : `${cfg.offY}px ↓`}
          hint={<p className="text-[10px] text-slate-500 font-mono">-100 (up) … +100 (down)</p>}
        >
          <input
            type="range"
            min={-100}
            max={100}
            step={5}
            value={cfg.offY}
            onChange={(e) => update({ hero_image_offset_y: parseInt(e.target.value) })}
            className="w-full cursor-pointer accent-cyan-400"
          />
        </SliderCard>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-slate-400 font-bold">Alignment:</span>
        <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
          {["left", "center", "right"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => update({ hero_image_align: mode })}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize cursor-pointer transition-all ${
                cfg.align === mode ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
