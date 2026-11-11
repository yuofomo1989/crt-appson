"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  RotateCcw,
  Move,
  Library,
  Sparkles,
  Layers,
  Type,
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowUpDown,
  Eye,
  EyeOff,
  Award,
  Phone,
  Users,
  Globe,
  FolderOpen,
  BookOpen,
  Copy,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  getHeroImageConfig,
  getRawPageHeroSettings,
  interpolateHeroText,
  buildEdgeMask,
  HERO_DEFAULTS,
  PAGE_HERO_DEFAULTS,
  HERO_PRESETS,
  DEFAULT_FLOATING_CARDS,
} from "@/lib/heroImage";

import initialCategories from "@/data/categories_db.json";
import initialCourses from "@/data/courses_db.json";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const MAIN_PAGES = [
  { key: "home", label: "🏡 Home Page", url: "/" },
  { key: "corporate-training", label: "🏢 Corporate Training", url: "/corporate-training" },
  { key: "certifications", label: "🎓 All Certifications Catalog", url: "/certifications" },
  { key: "about", label: "ℹ️ About Us", url: "/about" },
  { key: "contact", label: "📞 Contact Us", url: "/contact" },
  { key: "resources", label: "📚 Resources & Blog Hub", url: "/resources" },
  { key: "policies", label: "📜 Our Policies", url: "/policies" },
];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer select-none">
      <span
        onClick={() => onChange(!checked)}
        className={`relative inline-block h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-emerald-500" : "bg-slate-700"
        }`}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
          style={{ left: checked ? 18 : 2 }}
        />
      </span>
      {label}
    </label>
  );
}

function SliderCard({ label, display, children, hint }) {
  return (
    <div className="space-y-1.5 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center text-xs">
        <label className="text-slate-300 font-bold">{label}</label>
        <span className="font-mono font-bold text-amber-400">{display}</span>
      </div>
      {children}
      {hint}
    </div>
  );
}

export default function HeroImageEditor({
  siteSettings,
  setSiteSettings,
  onBrowseMedia,
  showToast,
}) {
  const [selectedPageKey, setSelectedPageKey] = useState("home");
  const [pageGroup, setPageGroup] = useState("main"); // "main" | "category" | "course"
  const [courseSearch, setCourseSearch] = useState("");
  const [recent, setRecent] = useState([]);
  const [uploadingTarget, setUploadingTarget] = useState(null);
  const [activeTab, setActiveTab] = useState("cards"); // "cards" | "text" | "bg" | "fg"
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [selectedLayerLabel, setSelectedLayerLabel] = useState("Floating Image 1 (Top)");
  const [stageW, setStageW] = useState(1440);
  const [canvasScale, setCanvasScale] = useState(0.55);
  const [showGuides, setShowGuides] = useState(true);

  const stageWrapRef = useRef(null);
  const fileRef = useRef(null);
  const uploadTargetRef = useRef("bg");
  const dragRef = useRef(null);

  const categoriesList = Array.isArray(initialCategories) ? initialCategories : [];
  const coursesList = Array.isArray(initialCourses) ? initialCourses : [];

  // Resolve the active page's raw settings & parsed config
  const rawPageSettings = getRawPageHeroSettings(siteSettings, selectedPageKey);
  const baseDefaults =
    PAGE_HERO_DEFAULTS[selectedPageKey] ||
    (selectedPageKey.startsWith("category:")
      ? PAGE_HERO_DEFAULTS["category:default"]
      : selectedPageKey.startsWith("course:")
      ? PAGE_HERO_DEFAULTS["course:default"]
      : PAGE_HERO_DEFAULTS.home);

  const cfg = getHeroImageConfig(rawPageSettings, baseDefaults);
  const cards = cfg.floatingCards || DEFAULT_FLOATING_CARDS;
  const activeCard = cards[selectedCardIdx] || cards[0] || DEFAULT_FLOATING_CARDS[0];

  // Build sample templateVars for Category / Course preview so the Canvas shows real names!
  let previewVars = {
    category_name: "Agile & Project Management",
    course_acronym: "PMP®",
    course_title: "PMP® Certification Training",
    course_description:
      "A comprehensive, instructor-led PMP® exam preparation course designed to help you pass with confidence and advance your project management career.",
  };

  if (selectedPageKey.startsWith("category:") && selectedPageKey !== "category:default") {
    const slug = selectedPageKey.replace("category:", "");
    const foundCat = categoriesList.find((c) => c.slug === slug);
    if (foundCat) {
      previewVars.category_name = foundCat.name || slug;
    }
  } else if (selectedPageKey.startsWith("course:") && selectedPageKey !== "course:default") {
    const slug = selectedPageKey.replace("course:", "");
    const foundCourse = coursesList.find((c) => c.slug === slug);
    if (foundCourse) {
      previewVars.course_title = foundCourse.title || slug;
      previewVars.course_acronym = (foundCourse.title || "PMP®").split(" ")[0];
      previewVars.category_name = foundCourse.category_name || "Project Management";
      previewVars.course_description =
        foundCourse.description || previewVars.course_description;
    }
  }

  const justify =
    cfg.align === "left" ? "flex-start" : cfg.align === "center" ? "center" : "flex-end";

  // Unified updater: writes to top-level siteSettings for "home", or siteSettings.page_heroes[selectedPageKey] for any other page
  const update = (patch) => {
    setSiteSettings((prev) => {
      if (!selectedPageKey || selectedPageKey === "home") {
        return { ...prev, ...patch };
      }
      const prevHeroes =
        prev.page_heroes && typeof prev.page_heroes === "object" ? prev.page_heroes : {};
      const currentEntry = getRawPageHeroSettings(prev, selectedPageKey);
      return {
        ...prev,
        page_heroes: {
          ...prevHeroes,
          [selectedPageKey]: {
            ...currentEntry,
            ...patch,
          },
        },
      };
    });
  };

  // Copy visual layout (banner, height, floating cards, offsets) from Home Page to current page
  const copyVisualDesignFromHome = () => {
    const homeCfg = getHeroImageConfig(siteSettings, PAGE_HERO_DEFAULTS.home);
    update({
      hero_layout: homeCfg.layout,
      hero_banner_height: homeCfg.bannerHeight,
      hero_bg_url: homeCfg.bgUrl,
      hero_bg_fit: homeCfg.bgFit,
      hero_bg_zoom: homeCfg.bgZoom,
      hero_bg_offset_x: homeCfg.bgOffX,
      hero_bg_offset_y: homeCfg.bgOffY,
      hero_bg_color: homeCfg.bgColor,
      hero_main_enabled: homeCfg.mainEnabled,
      hero_image_url: homeCfg.mainUrl,
      hero_image_fit: homeCfg.fit,
      hero_image_fade: homeCfg.fade,
      hero_image_width: homeCfg.width || "full",
      hero_image_height: homeCfg.height || "auto",
      hero_image_offset_x: homeCfg.offX,
      hero_image_offset_y: homeCfg.offY,
      hero_floating_cards: JSON.parse(JSON.stringify(homeCfg.floatingCards)),
      hero_text_offset_x: homeCfg.textOffX,
      hero_text_offset_y: homeCfg.textOffY,
      hero_text_max_width: homeCfg.textMaxW,
      hero_title_size: `${homeCfg.titleSize}px`,
      hero_text_align: homeCfg.textAlign,
      hero_text_z: homeCfg.textZ,
      hero_text_backdrop: homeCfg.textBackdrop,
    });
    showToast?.("Copied Home Page Hero visual layout to this page! 📋✨");
  };

  // Apply the current page's visual layout (Banner, Height, Floating Cards, Text Offsets) to ALL website pages at once
  const applyVisualLayoutToAllPages = () => {
    const visualPatch = {
      hero_layout: cfg.layout,
      hero_banner_height: cfg.bannerHeight,
      hero_bg_url: cfg.bgUrl,
      hero_bg_fit: cfg.bgFit,
      hero_bg_zoom: cfg.bgZoom,
      hero_bg_offset_x: cfg.bgOffX,
      hero_bg_offset_y: cfg.bgOffY,
      hero_bg_color: cfg.bgColor,
      hero_main_enabled: cfg.mainEnabled,
      hero_image_url: cfg.mainUrl,
      hero_image_fit: cfg.fit,
      hero_image_fade: cfg.fade,
      hero_image_width: cfg.width || "full",
      hero_image_height: cfg.height || "auto",
      hero_image_offset_x: cfg.offX,
      hero_image_offset_y: cfg.offY,
      hero_floating_cards: JSON.parse(JSON.stringify(cfg.floatingCards)),
      hero_text_offset_x: cfg.textOffX,
      hero_text_offset_y: cfg.textOffY,
      hero_text_max_width: cfg.textMaxW,
      hero_title_size: `${cfg.titleSize}px`,
      hero_text_align: cfg.textAlign,
      hero_text_z: cfg.textZ,
      hero_text_backdrop: cfg.textBackdrop,
    };

    setSiteSettings((prev) => {
      const prevHeroes =
        prev.page_heroes && typeof prev.page_heroes === "object" ? { ...prev.page_heroes } : {};
      const targetKeys = [
        "corporate-training",
        "certifications",
        "about",
        "contact",
        "resources",
        "policies",
        "category:default",
        "course:default",
        ...Object.keys(prevHeroes),
      ];
      targetKeys.forEach((k) => {
        const existing = getRawPageHeroSettings(prev, k);
        prevHeroes[k] = { ...existing, ...visualPatch };
      });
      return {
        ...prev,
        ...visualPatch,
        page_heroes: prevHeroes,
      };
    });
    showToast?.(
      "Applied this Hero Banner layout & height across ALL Pages (Home, Corporate, Categories, Courses)! 🌐✨"
    );
  };

  const updateCards = (nextCards) => {
    update({ hero_floating_cards: nextCards });
  };

  const updateOneCard = (idx, patch) => {
    const next = cards.map((c, i) => (i === idx ? { ...c, ...patch } : c));
    updateCards(next);
  };

  const swapFloatingCardsUpDown = () => {
    if (cards.length < 2) return;
    const next = [...cards];
    const c0 = { ...next[0] };
    const c1 = { ...next[1] };
    next[0] = { ...c0, x: c1.x, y: c1.y };
    next[1] = { ...c1, x: c0.x, y: c0.y };
    updateCards(next);
    showToast?.("Swapped Up/Down positions of Floating Image 1 & 2! ↕️");
  };

  const addFloatingCard = () => {
    const newIdx = cards.length + 1;
    const next = [
      ...cards,
      {
        id: `tile-${Date.now()}`,
        label: `Floating Image ${newIdx}`,
        enabled: true,
        url: "/uploads/hero_tile_1.png",
        x: clamp(72 + (newIdx % 3) * 4, 10, 90),
        y: clamp(18 + (newIdx % 3) * 20, 5, 80),
        width: 138,
        height: 90,
        radius: 14,
        border: 3,
        shadow: true,
        liveDot: false,
        zIndex: 20 + newIdx,
      },
    ];
    updateCards(next);
    setSelectedCardIdx(next.length - 1);
    setActiveTab("cards");
    showToast?.(`Added Floating Image ${newIdx}! Drag it anywhere on the canvas.`);
  };

  const removeFloatingCard = (idx) => {
    if (cards.length <= 1) {
      updateOneCard(idx, { enabled: false });
      return;
    }
    const next = cards.filter((_, i) => i !== idx);
    updateCards(next);
    setSelectedCardIdx(Math.max(0, idx - 1));
  };

  const loadRecent = async () => {
    try {
      const res = await fetch("/api/admin/media/");
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setRecent(data.data.slice(0, 10));
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadRecent();
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!stageWrapRef.current) return;
      const vw =
        typeof window !== "undefined"
          ? Math.max(1280, document.documentElement.clientWidth || window.innerWidth || 1440)
          : 1440;
      const wrapW = stageWrapRef.current.clientWidth;
      setStageW(vw);
      if (wrapW > 100) {
        setCanvasScale(clamp(wrapW / vw, 0.25, 0.95));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const triggerUploadFor = (targetKey) => {
    uploadTargetRef.current = targetKey;
    fileRef.current?.click();
  };

  const handleFileSelected = async (file) => {
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      alert("Please choose an image file (PNG, JPG, WEBP, SVG).");
      return;
    }
    const target = uploadTargetRef.current;
    setUploadingTarget(target);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("set_as_hero", "false");
      const res = await fetch("/api/admin/media/", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        const uploadedUrl = data.data.url;
        if (target === "bg") {
          update({ hero_bg_url: uploadedUrl, hero_image_url: uploadedUrl });
          showToast?.("Background Banner uploaded! Click 'Save Section 1' to publish. 🖼️");
        } else if (target === "main") {
          update({ hero_image_url: uploadedUrl, hero_main_enabled: true });
          showToast?.("Foreground Image uploaded! Click 'Save Section 1' to publish. 🖼️");
        } else if (target.startsWith("card-")) {
          const idx = parseInt(target.replace("card-", ""), 10) || 0;
          updateOneCard(idx, { url: uploadedUrl, enabled: true });
          showToast?.(
            `Floating Image ${idx + 1} updated! Click 'Save Section 1' to publish. 🖼️`
          );
        }
        loadRecent();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Upload error: " + err.message);
    } finally {
      setUploadingTarget(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const startDrag = (e, type, meta = {}) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);

    if (type === "card") {
      const idx = meta.index;
      const card = cards[idx];
      setSelectedCardIdx(idx);
      setActiveTab("cards");
      setSelectedLayerLabel(card.label || `Floating Image ${idx + 1}`);
      dragRef.current = {
        type: "card",
        index: idx,
        startX: e.clientX,
        startY: e.clientY,
        origX: card.x,
        origY: card.y,
      };
    } else if (type === "text") {
      setActiveTab("text");
      setSelectedLayerLabel("Text & Buttons Block");
      dragRef.current = {
        type: "text",
        startX: e.clientX,
        startY: e.clientY,
        origX: cfg.textOffX,
        origY: cfg.textOffY,
      };
    } else if (type === "fg") {
      setActiveTab("fg");
      setSelectedLayerLabel("Foreground Image");
      dragRef.current = {
        type: "fg",
        startX: e.clientX,
        startY: e.clientY,
        origX: cfg.offX,
        origY: cfg.offY,
      };
    } else if (type === "badge") {
      setActiveTab("fg");
      setSelectedLayerLabel("Stats Badge");
      dragRef.current = {
        type: "badge",
        startX: e.clientX,
        startY: e.clientY,
        origX: cfg.badgeX,
        origY: cfg.badgeY,
      };
    } else if (type === "bg") {
      setActiveTab("bg");
      setSelectedLayerLabel("Background Banner");
      dragRef.current = {
        type: "bg",
        startX: e.clientX,
        startY: e.clientY,
        origX: cfg.bgOffX,
        origY: cfg.bgOffY,
      };
    }
  };

  const moveDrag = (e) => {
    if (!dragRef.current) return;
    const d = dragRef.current;
    const dxPx = (e.clientX - d.startX) / canvasScale;
    const dyPx = (e.clientY - d.startY) / canvasScale;

    if (d.type === "card") {
      const dxPct = (dxPx / stageW) * 100;
      const dyPct = (dyPx / cfg.bannerHeight) * 100;
      updateOneCard(d.index, {
        x: Math.round(clamp(d.origX + dxPct, 0, 94) * 10) / 10,
        y: Math.round(clamp(d.origY + dyPct, -4, 90) * 10) / 10,
      });
    } else if (d.type === "text") {
      update({
        hero_text_offset_x: clamp(Math.round(d.origX + dxPx), -220, 620),
        hero_text_offset_y: clamp(Math.round(d.origY + dyPx), -180, 180),
      });
    } else if (d.type === "fg") {
      update({
        hero_image_offset_x: clamp(Math.round(d.origX + dxPx), -350, 350),
        hero_image_offset_y: clamp(Math.round(d.origY + dyPx), -220, 220),
      });
    } else if (d.type === "badge") {
      const dxPct = (dxPx / stageW) * 100;
      const dyPct = (dyPx / cfg.bannerHeight) * 100;
      update({
        hero_badge_x: Math.round(clamp(d.origX + dxPct, 0, 90) * 10) / 10,
        hero_badge_y: Math.round(clamp(d.origY + dyPct, 0, 88) * 10) / 10,
      });
    } else if (d.type === "bg") {
      update({
        hero_bg_offset_x: clamp(Math.round(d.origX + dxPx), -350, 350),
        hero_bg_offset_y: clamp(Math.round(d.origY + dyPx), -220, 220),
      });
    }
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const applyPreset = (presetKey, msg) => {
    const p = HERO_PRESETS[presetKey];
    if (!p) return;
    update(p);
    showToast?.(msg);
  };

  const scaledHeight = Math.round(cfg.bannerHeight * canvasScale);
  const isOverlayMode = cfg.layout === "overlay";

  const backdropClass =
    cfg.textBackdrop === "white_card"
      ? "bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100"
      : cfg.textBackdrop === "soft_glass"
      ? "bg-white/75 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/70"
      : "";

  const textAlignClass =
    cfg.textAlign === "center"
      ? "text-center items-center"
      : cfg.textAlign === "right"
      ? "text-right items-end"
      : "text-left items-start";

  const previewPill = interpolateHeroText(cfg.pillText || "", previewVars);
  const previewTitle = interpolateHeroText(cfg.title || "Get Certified.", previewVars);
  const previewHighlight = interpolateHeroText(cfg.highlightText || "", previewVars);
  const previewSubtitle = interpolateHeroText(cfg.subtitle || "", previewVars);

  // Determine live URL for the currently selected page
  let currentLiveUrl = "/";
  if (selectedPageKey === "home") currentLiveUrl = "/";
  else if (MAIN_PAGES.some((p) => p.key === selectedPageKey)) {
    currentLiveUrl = MAIN_PAGES.find((p) => p.key === selectedPageKey).url;
  } else if (selectedPageKey.startsWith("category:")) {
    const s = selectedPageKey.replace("category:", "");
    currentLiveUrl =
      s === "default"
        ? `/category/${categoriesList[0]?.slug || "agile-project-management"}`
        : `/category/${s}`;
  } else if (selectedPageKey.startsWith("course:")) {
    const s = selectedPageKey.replace("course:", "");
    currentLiveUrl =
      s === "default"
        ? `/courses/${coursesList[0]?.slug || "pmp-certification"}`
        : `/courses/${s}`;
  }

  const filteredCourses = coursesList.filter((c) =>
    !courseSearch.trim()
      ? true
      : (c.title || "").toLowerCase().includes(courseSearch.toLowerCase()) ||
        (c.slug || "").toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Hidden shared file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelected(e.target.files?.[0])}
      />

      {/* =========================================================
          UNIVERSAL MULTI-PAGE SELECTOR BAR (CHOOSE ANY WEBSITE PAGE)
         ========================================================= */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 p-4 rounded-2xl border border-blue-500/30 space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe size={17} className="text-amber-400" />
            <div>
              <p className="text-xs font-black text-white uppercase tracking-wider">
                🎯 Select Website Page to Design Hero Banner (All Pages Supported)
              </p>
              <p className="text-[11px] text-slate-300">
                Home, Corporate Training, Certifications, Category Pages, aur har Course Page ka Hero Banner yahan se 1:1 Canvas mein design karein!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedPageKey !== "home" && (
              <button
                type="button"
                onClick={copyVisualDesignFromHome}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                title="Home page ka banner, height aur floating cards is page par copy karein"
              >
                <Copy size={12} /> Copy Home Hero Layout Here
              </button>
            )}
            <button
              type="button"
              onClick={applyVisualLayoutToAllPages}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
              title="Is page ka visual banner & height sabhi pages par apply karein"
            >
              <CheckCircle2 size={12} /> Apply Visual Layout to ALL Pages
            </button>
            <a
              href={currentLiveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 text-[11px] font-bold inline-flex items-center gap-1"
            >
              <span>View Live Page</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* 3 Page Group Tabs: Main Pages | Category Pages | Course Pages */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          {[
            { id: "main", icon: Globe, label: "🌐 Main Website Pages (7)" },
            {
              id: "category",
              icon: FolderOpen,
              label: `📂 Category Pages (${categoriesList.length})`,
            },
            {
              id: "course",
              icon: BookOpen,
              label: `🎓 Individual Course Pages (${coursesList.length})`,
            },
          ].map((g) => {
            const Icon = g.icon;
            const active = pageGroup === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  setPageGroup(g.id);
                  if (g.id === "main" && !MAIN_PAGES.some((p) => p.key === selectedPageKey)) {
                    setSelectedPageKey("home");
                  } else if (g.id === "category" && !selectedPageKey.startsWith("category:")) {
                    setSelectedPageKey("category:default");
                  } else if (g.id === "course" && !selectedPageKey.startsWith("course:")) {
                    setSelectedPageKey("course:default");
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 border transition-all cursor-pointer ${
                  active
                    ? "bg-brand-blue text-white border-brand-blue shadow-md"
                    : "bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800"
                }`}
              >
                <Icon size={14} />
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-selector for Main Pages */}
        {pageGroup === "main" && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {MAIN_PAGES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPageKey(p.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedPageKey === p.key
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow"
                    : "bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Sub-selector for Category Pages */}
        {pageGroup === "category" && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSelectedPageKey("category:default")}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                selectedPageKey === "category:default"
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              ⭐ All Categories (Master Default Template)
            </button>
            {categoriesList.map((cat) => {
              const k = `category:${cat.slug}`;
              const hasCustom = Boolean(siteSettings?.page_heroes?.[k]);
              return (
                <button
                  key={cat.id || cat.slug}
                  type="button"
                  onClick={() => setSelectedPageKey(k)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                    selectedPageKey === k
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  {cat.name} {hasCustom ? "✨" : ""}
                </button>
              );
            })}
          </div>
        )}

        {/* Sub-selector for Individual Course Pages */}
        {pageGroup === "course" && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSelectedPageKey("course:default")}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                selectedPageKey === "course:default"
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              ⭐ All Courses (Master Default Template)
            </button>

            <input
              type="text"
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              placeholder="Search course (e.g. PMP, CISSP, ITIL)..."
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-amber-400 w-56"
            />

            <select
              value={selectedPageKey.startsWith("course:") ? selectedPageKey : "course:default"}
              onChange={(e) => setSelectedPageKey(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-400 outline-none focus:border-amber-400 max-w-md"
            >
              <option value="course:default">
                ⭐ All Courses (Master Default Template)
              </option>
              {filteredCourses.map((c) => {
                const k = `course:${c.slug}`;
                const hasCustom = Boolean(siteSettings?.page_heroes?.[k]);
                return (
                  <option key={c.id || c.slug} value={k}>
                    {hasCustom ? "✨ " : ""}
                    {c.title} ({c.slug})
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* Selected Page Text & CTA Editor (For Non-Home Pages, or quick inline edit for any page) */}
        {selectedPageKey !== "home" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/80">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Top Pill Badge Text
              </label>
              <input
                type="text"
                value={cfg.pillText || ""}
                onChange={(e) => update({ hero_pill_text: e.target.value })}
                placeholder="e.g. CORPORATE TRAINING"
                className="w-full mt-0.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-blue-300 font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Main Heading (Line 1)
              </label>
              <input
                type="text"
                value={cfg.title || ""}
                onChange={(e) => update({ hero_title: e.target.value })}
                className="w-full mt-0.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Orange Highlight Heading (Line 2)
              </label>
              <input
                type="text"
                value={cfg.highlightText || ""}
                onChange={(e) => update({ hero_highlight_text: e.target.value })}
                className="w-full mt-0.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Hero Subtitle Paragraph
              </label>
              <input
                type="text"
                value={cfg.subtitle || ""}
                onChange={(e) => update({ hero_subtitle: e.target.value })}
                className="w-full mt-0.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Primary Button
                </label>
                <input
                  type="text"
                  value={cfg.ctaPrimaryText || ""}
                  onChange={(e) => update({ hero_cta_primary_text: e.target.value })}
                  className="w-full mt-0.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Secondary Button
                </label>
                <input
                  type="text"
                  value={cfg.ctaSecondaryText || ""}
                  onChange={(e) => update({ hero_cta_secondary_text: e.target.value })}
                  className="w-full mt-0.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Bar: Studio Title + 1-Click Layout Presets */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <p className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
            Editing Page:{" "}
            <span className="text-white underline decoration-amber-400">
              {selectedPageKey}
            </span>
          </p>
          <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
            Active Layer: {selectedLayerLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-bold mr-1">Quick Templates:</span>
          <button
            type="button"
            onClick={() =>
              applyPreset(
                "wave_with_movable_tiles",
                "Applied: Clean Wave Banner + 2 Movable Floating Images! ✨"
              )
            }
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-brand-blue text-white hover:bg-blue-600 cursor-pointer"
          >
            ✨ Wave + 2 Movable Mini-Images
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset(
                "flat_wave_banner",
                "Applied: Original Flat Banner (Baked-in Tiles)"
              )
            }
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
          >
            Original Flat Banner
          </button>
          <button
            type="button"
            onClick={() =>
              applyPreset("split_cutout", "Applied: 2-Column Split Layout with Cutout Photo")
            }
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
          >
            Split Cutout Mode
          </button>
          <button
            type="button"
            onClick={() => {
              update(baseDefaults);
              showToast?.(`Reset ${selectedPageKey} Hero layout to default settings.`);
            }}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={11} /> Reset This Page
          </button>
        </div>
      </div>

      {/* =========================================================
          MAIN HERO BANNER HEIGHT BAR (BADHAYEIN / GHATAYEIN)
         ========================================================= */}
      <div className="bg-slate-900/95 p-3 sm:p-3.5 rounded-xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="text-amber-400" />
          <div>
            <p className="text-xs font-extrabold text-white">
              Main Hero Banner Height (Height Badhayein / Ghatayein)
            </p>
            <p className="text-[10px] text-slate-400">
              Is page ({selectedPageKey}) ke Hero banner ki lambai yahan se kam ya zyada karein (220px – 750px)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px] max-w-xl">
          <button
            type="button"
            onClick={() =>
              update({ hero_banner_height: clamp((cfg.bannerHeight || 410) - 20, 220, 750) })
            }
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-extrabold cursor-pointer"
            title="Height 20px kam karein"
          >
            − 20px
          </button>

          <input
            type="range"
            min="220"
            max="750"
            step="5"
            value={cfg.bannerHeight}
            onChange={(e) => update({ hero_banner_height: parseInt(e.target.value, 10) })}
            className="flex-1 accent-amber-400 cursor-pointer"
          />

          <button
            type="button"
            onClick={() =>
              update({ hero_banner_height: clamp((cfg.bannerHeight || 410) + 20, 220, 750) })
            }
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs font-extrabold cursor-pointer"
            title="Height 20px badhayein"
          >
            + 20px
          </button>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1">
            <input
              type="number"
              min="220"
              max="750"
              step="5"
              value={cfg.bannerHeight}
              onChange={(e) =>
                update({
                  hero_banner_height: clamp(parseInt(e.target.value, 10) || 410, 220, 750),
                })
              }
              className="w-14 bg-transparent text-amber-400 font-mono font-extrabold text-xs text-center focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 font-bold">px</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {[
            [280, "Compact (280px)"],
            [340, "Slim (340px)"],
            [390, "Page Std (390px)"],
            [410, "Home Std (410px)"],
            [480, "Large (480px)"],
            [560, "Tall (560px)"],
          ].map(([hVal, hLbl]) => (
            <button
              key={hVal}
              type="button"
              onClick={() => update({ hero_banner_height: hVal })}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                cfg.bannerHeight === hVal
                  ? "bg-amber-500 text-slate-950 border-amber-400"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {hLbl}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          1:1 REAL-WEBSITE WYSIWYG STAGE (EXACT MATCH WITH HERO & PAGEHEROBANNER)
         ========================================================= */}
      <div className="bg-slate-900/95 p-3 sm:p-4 rounded-2xl border border-slate-800 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <Move size={14} className="text-amber-400" />
            1:1 Real Website Live Preview ({stageW} × {cfg.bannerHeight}px) — Page:{" "}
            <strong className="text-white">{selectedPageKey}</strong>
          </span>
          <div className="flex items-center gap-2 text-[11px]">
            <Toggle
              checked={showGuides}
              onChange={setShowGuides}
              label="Show Layer Selection Borders"
            />
            <button
              type="button"
              onClick={swapFloatingCardsUpDown}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowUpDown size={12} /> Swap Top/Bottom Mini-Images
            </button>
          </div>
        </div>

        {/* Scaled Viewport Wrapper */}
        <div
          ref={stageWrapRef}
          className="relative w-full overflow-hidden rounded-xl border-2 border-slate-700 shadow-inner bg-slate-950"
          style={{ height: `${scaledHeight}px` }}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* Exact Full-Width Website <section> Replica */}
          <div
            className="relative select-none overflow-hidden flex items-center"
            style={{
              width: `${stageW}px`,
              height: `${cfg.bannerHeight}px`,
              transform: `scale(${canvasScale})`,
              transformOrigin: "top left",
              backgroundColor: cfg.bgColor || "#eaf4ff",
            }}
          >
            {/* LAYER 1: FULL-SECTION BACKGROUND BANNER */}
            {isOverlayMode && cfg.bgUrl ? (
              <div
                onPointerDown={(e) => startDrag(e, "bg")}
                title="Drag to pan Background Banner"
                className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing z-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cfg.bgUrl}
                  alt="Certification Planner Hero Banner"
                  draggable={false}
                  className="w-full h-full block select-none pointer-events-none"
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
              <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0">
                <div className="absolute -top-10 right-0 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-blue-100/50 via-sky-50/40 to-transparent blur-2xl"></div>
              </div>
            )}

            {/* LAYER 3: FLOATING MINI-IMAGES / VIDEO CALL CARDS */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 20 }}
            >
              {cards.map((card, idx) => {
                if (!card.enabled || !card.url) return null;
                const isSelected = activeTab === "cards" && selectedCardIdx === idx;
                return (
                  <div
                    key={card.id || idx}
                    onPointerDown={(e) => startDrag(e, "card", { index: idx })}
                    title={`Drag ${card.label} (X: ${card.x}%, Y: ${card.y}%)`}
                    className={`absolute overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing ${
                      showGuides
                        ? isSelected
                          ? "ring-4 ring-amber-400"
                          : "hover:ring-3 hover:ring-blue-400"
                        : ""
                    }`}
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
                      alt={card.label}
                      draggable={false}
                      className="w-full h-full object-cover block pointer-events-none"
                    />
                    {card.liveDot && (
                      <span className="absolute top-2 left-2 flex items-center gap-1 bg-slate-900/65 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full pointer-events-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </span>
                    )}
                    {showGuides && (
                      <span className="absolute bottom-1 right-1 bg-slate-900/85 text-amber-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded pointer-events-none">
                        #{idx + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* LAYER 5: FLOATING STATS BADGE */}
            {cfg.showBadge && (
              <div
                onPointerDown={(e) => startDrag(e, "badge")}
                title="Drag Stats Badge"
                className={`flex absolute bg-brand-blue text-white px-5 py-3 rounded-2xl shadow-xl shadow-blue-600/30 border border-white/20 items-center gap-3 cursor-grab active:cursor-grabbing ${
                  showGuides && activeTab === "fg" ? "ring-3 ring-amber-400" : ""
                }`}
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
                  <p className="text-base font-black leading-tight">{cfg.badgeCount}</p>
                  <p className="text-[10px] text-blue-100 font-semibold leading-tight">
                    {cfg.badgeSubtitle}
                  </p>
                </div>
              </div>
            )}

            {/* MAIN 1280px CONTENT CONTAINER */}
            <div
              className="relative w-full max-w-7xl mx-auto px-8 h-full flex items-center pointer-events-none"
              style={{ zIndex: Math.max(cfg.textZ || 30, cfg.mainZ || 10) }}
            >
              <div className="w-full grid grid-cols-12 gap-6 items-center py-2">
                {/* LAYER 4: TEXT, PILL, BUTTONS & TRUSTPILOT BLOCK */}
                <div
                  onPointerDown={(e) => startDrag(e, "text")}
                  title="Drag Text Block anywhere"
                  className={`col-span-7 flex flex-col justify-center space-y-3 relative pointer-events-auto cursor-grab active:cursor-grabbing ${textAlignClass} ${backdropClass} ${
                    showGuides
                      ? activeTab === "text"
                        ? "ring-2 ring-amber-400/90 rounded-2xl"
                        : "hover:ring-2 hover:ring-blue-400/70 rounded-2xl"
                      : ""
                  }`}
                  style={{
                    transform: `translate(${cfg.textOffX}px, ${cfg.textOffY}px)`,
                    maxWidth: `${cfg.textMaxW}px`,
                    zIndex: cfg.textZ || 30,
                  }}
                >
                  {showGuides && (
                    <div className="absolute -top-6 left-0 inline-flex items-center gap-1 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none shadow">
                      <Move size={10} /> Drag Text ({cfg.textOffX}px, {cfg.textOffY}px)
                    </div>
                  )}

                  {previewPill && (
                    <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100/90 border border-blue-200/80 text-[#0066cc] text-[11px] font-extrabold uppercase tracking-wider w-fit">
                      {previewPill}
                    </span>
                  )}

                  <h1
                    className="font-black text-[#0B1E33] tracking-tight leading-[1.12]"
                    style={{ fontSize: `${cfg.titleSize}px` }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: previewTitle }} />
                    {previewHighlight ? (
                      <>
                        <br />
                        <span className="text-brand-orange">{previewHighlight}</span>
                      </>
                    ) : null}
                  </h1>

                  <p className="max-w-xl text-base text-slate-700 font-medium leading-relaxed">
                    {previewSubtitle}
                  </p>

                  <div
                    className={`flex flex-wrap items-center gap-3.5 pt-1 ${
                      cfg.textAlign === "center"
                        ? "justify-center"
                        : cfg.textAlign === "right"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20">
                      <span>{cfg.ctaPrimaryText || "Explore Certifications"}</span>
                      <span>→</span>
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-xl border border-brand-blue/30 bg-white/95 px-5 py-3 text-sm font-bold text-brand-blue shadow-xs">
                      <Phone size={15} className="text-brand-blue" />
                      <span>{cfg.ctaSecondaryText || "Talk to an Advisor"}</span>
                    </span>
                  </div>

                  {cfg.showTrustpilot && (
                    <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-semibold text-slate-700">
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

                {/* LAYER 2: FOREGROUND IMAGE */}
                <div
                  className="col-span-5 relative flex items-center min-h-0"
                  style={{
                    justifyContent: justify,
                    zIndex: cfg.mainZ || 10,
                  }}
                >
                  {(cfg.mainEnabled || !isOverlayMode) && cfg.mainUrl && (
                    <div
                      onPointerDown={(e) => startDrag(e, "fg")}
                      title="Drag Foreground Image"
                      className={`relative pointer-events-auto cursor-grab active:cursor-grabbing ${
                        showGuides && activeTab === "fg"
                          ? "ring-2 ring-amber-400 rounded-xl"
                          : ""
                      }`}
                      style={{
                        width: cfg.width ? `min(100%, ${cfg.width}px)` : "100%",
                        height: cfg.height
                          ? `${cfg.height}px`
                          : cfg.fit === "cover"
                          ? "100%"
                          : undefined,
                        minHeight: cfg.fit === "cover" ? 280 : undefined,
                        transform: `translate(${cfg.offX}px, ${cfg.offY}px)`,
                      }}
                    >
                      {cfg.showCircle && (
                        <div className="absolute -top-6 right-8 w-96 h-96 rounded-full bg-[#E5EEF9] -z-10 pointer-events-none"></div>
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
          </div>
        </div>
      </div>

      {/* =========================================================
          4 LAYER CONTROL TABS
         ========================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          {
            id: "cards",
            icon: Layers,
            title: "1. Floating Mini-Images",
            sub: "Move 2 Video Cards Up/Down",
          },
          {
            id: "text",
            icon: Type,
            title: "2. Text & Overlay",
            sub: "Bring Text Over Image",
          },
          {
            id: "bg",
            icon: ImageIcon,
            title: "3. Background Banner",
            sub: "Change Banner & Height",
          },
          {
            id: "fg",
            icon: Award,
            title: "4. Extra Cutout & Badge",
            sub: "Foreground Photo & 50k+",
          },
        ].map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                active
                  ? "bg-brand-blue/20 border-brand-blue text-white shadow-md"
                  : "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/70"
              }`}
            >
              <div className="flex items-center gap-2 font-extrabold text-xs">
                <Icon size={15} className={active ? "text-amber-400" : "text-slate-400"} />
                <span>{t.title}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">{t.sub}</p>
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: FLOATING MINI-IMAGES (THE 2 VIDEO CALL CARDS)
         ========================================================= */}
      {activeTab === "cards" && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {cards.map((c, idx) => (
                <button
                  key={c.id || idx}
                  type="button"
                  onClick={() => {
                    setSelectedCardIdx(idx);
                    setSelectedLayerLabel(c.label || `Floating Image ${idx + 1}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border inline-flex items-center gap-2 cursor-pointer ${
                    selectedCardIdx === idx
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  <span>
                    #{idx + 1} {c.label || `Mini-Image ${idx + 1}`}
                  </span>
                  {c.enabled ? <Eye size={12} /> : <EyeOff size={12} className="opacity-50" />}
                </button>
              ))}

              <button
                type="button"
                onClick={addFloatingCard}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Mini-Image
              </button>
            </div>

            <button
              type="button"
              onClick={swapFloatingCardsUpDown}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpDown size={13} /> ↕ Swap Image 1 & Image 2 (Upar / Niche)
            </button>
          </div>

          {activeCard && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeCard.url}
                    alt={activeCard.label}
                    className="w-16 h-11 object-cover rounded-lg border border-slate-700"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-white">
                      Editing: {activeCard.label}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Position: X={activeCard.x}% · Y={activeCard.y}% · Size: {activeCard.width}×
                      {activeCard.height}px
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Toggle
                    checked={activeCard.enabled}
                    onChange={(v) => updateOneCard(selectedCardIdx, { enabled: v })}
                    label={activeCard.enabled ? "Visible" : "Hidden"}
                  />
                  <button
                    type="button"
                    onClick={() => triggerUploadFor(`card-${selectedCardIdx}`)}
                    className="px-3 py-1.5 rounded-lg bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <UploadCloud size={13} />
                    {uploadingTarget === `card-${selectedCardIdx}`
                      ? "Uploading..."
                      : "Change This Mini-Image"}
                  </button>
                  {cards.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeFloatingCard(selectedCardIdx)}
                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50 cursor-pointer"
                      title="Remove this floating card"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <SliderCard
                  label="Up / Down Position (Y %)"
                  display={`${activeCard.y}%`}
                  hint={
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>0% (Top Edge)</span>
                      <span>85% (Bottom Edge)</span>
                    </div>
                  }
                >
                  <input
                    type="range"
                    min="-4"
                    max="88"
                    step="0.5"
                    value={activeCard.y}
                    onChange={(e) =>
                      updateOneCard(selectedCardIdx, { y: parseFloat(e.target.value) })
                    }
                    className="w-full accent-amber-400"
                  />
                </SliderCard>

                <SliderCard
                  label="Left / Right Position (X %)"
                  display={`${activeCard.x}%`}
                  hint={
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>0% (Left)</span>
                      <span>92% (Right)</span>
                    </div>
                  }
                >
                  <input
                    type="range"
                    min="0"
                    max="92"
                    step="0.5"
                    value={activeCard.x}
                    onChange={(e) =>
                      updateOneCard(selectedCardIdx, { x: parseFloat(e.target.value) })
                    }
                    className="w-full accent-amber-400"
                  />
                </SliderCard>

                <SliderCard label="Card Width (px)" display={`${activeCard.width}px`}>
                  <input
                    type="range"
                    min="70"
                    max="320"
                    step="2"
                    value={activeCard.width}
                    onChange={(e) =>
                      updateOneCard(selectedCardIdx, { width: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-amber-400"
                  />
                </SliderCard>

                <SliderCard label="Card Height (px)" display={`${activeCard.height}px`}>
                  <input
                    type="range"
                    min="50"
                    max="240"
                    step="2"
                    value={activeCard.height}
                    onChange={(e) =>
                      updateOneCard(selectedCardIdx, { height: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-amber-400"
                  />
                </SliderCard>

                <SliderCard label="Corner Roundness" display={`${activeCard.radius}px`}>
                  <input
                    type="range"
                    min="0"
                    max="36"
                    step="1"
                    value={activeCard.radius}
                    onChange={(e) =>
                      updateOneCard(selectedCardIdx, { radius: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-amber-400"
                  />
                </SliderCard>

                <SliderCard label="White Border Thickness" display={`${activeCard.border}px`}>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={activeCard.border}
                    onChange={(e) =>
                      updateOneCard(selectedCardIdx, { border: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-amber-400"
                  />
                </SliderCard>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1">
                <Toggle
                  checked={activeCard.shadow}
                  onChange={(v) => updateOneCard(selectedCardIdx, { shadow: v })}
                  label="3D Drop Shadow"
                />
                <Toggle
                  checked={activeCard.liveDot}
                  onChange={(v) => updateOneCard(selectedCardIdx, { liveDot: v })}
                  label="Show Green 'LIVE' Badge on Card"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 2: TEXT & OVERLAY POSITION (BRING TEXT OVER IMAGE)
         ========================================================= */}
      {activeTab === "text" && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div>
              <p className="text-xs font-extrabold text-white">
                Text Block Position & Layer Order (Text ko Image ke Upar Layein)
              </p>
              <p className="text-[11px] text-slate-400">
                Move the entire Heading + Subtitle + Buttons block anywhere on the Hero banner.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  update({
                    hero_text_offset_x: 0,
                    hero_text_offset_y: 0,
                    hero_text_align: "left",
                    hero_text_backdrop: "none",
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
              >
                Left Default
              </button>
              <button
                type="button"
                onClick={() =>
                  update({
                    hero_text_offset_x: 260,
                    hero_text_offset_y: 0,
                    hero_text_align: "center",
                    hero_text_z: 35,
                    hero_text_backdrop: "soft_glass",
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer"
              >
                Center Over Banner (Glass)
              </button>
              <button
                type="button"
                onClick={() =>
                  update({
                    hero_text_offset_x: 460,
                    hero_text_offset_y: 0,
                    hero_text_align: "left",
                    hero_text_z: 35,
                    hero_text_backdrop: "white_card",
                  })
                }
                className="px-2.5 py-1 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 text-blue-300 border border-brand-blue/40 text-xs font-bold cursor-pointer"
              >
                Right Over Image (Card)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <SliderCard
              label="Move Text Left / Right (X px)"
              display={`${cfg.textOffX > 0 ? "+" : ""}${cfg.textOffX}px`}
            >
              <input
                type="range"
                min="-200"
                max="600"
                step="5"
                value={cfg.textOffX}
                onChange={(e) => update({ hero_text_offset_x: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard
              label="Move Text Up / Down (Y px)"
              display={`${cfg.textOffY > 0 ? "+" : ""}${cfg.textOffY}px`}
            >
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={cfg.textOffY}
                onChange={(e) => update({ hero_text_offset_y: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Heading Font Size" display={`${cfg.titleSize}px`}>
              <input
                type="range"
                min="28"
                max="64"
                step="1"
                value={cfg.titleSize}
                onChange={(e) => update({ hero_title_size: `${e.target.value}px` })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Text Block Max Width" display={`${cfg.textMaxW}px`}>
              <input
                type="range"
                min="360"
                max="880"
                step="10"
                value={cfg.textMaxW}
                onChange={(e) => update({ hero_text_max_width: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard
              label="Layer Order (Z-Index)"
              display={cfg.textZ >= 25 ? "In Front of Images" : "Behind Images"}
            >
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => update({ hero_text_z: 35 })}
                  className={`py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                    cfg.textZ >= 25
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  Bring to Front
                </button>
                <button
                  type="button"
                  onClick={() => update({ hero_text_z: 5 })}
                  className={`py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                    cfg.textZ < 25
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  Send Behind
                </button>
              </div>
            </SliderCard>

            <SliderCard label="Text Backdrop (Over Image)" display={cfg.textBackdrop}>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  ["none", "None"],
                  ["soft_glass", "Glass Blur"],
                  ["white_card", "White Card"],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => update({ hero_text_backdrop: val })}
                    className={`py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer ${
                      cfg.textBackdrop === val
                        ? "bg-brand-blue text-white border-brand-blue"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </SliderCard>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">Text Alignment:</span>
              {["left", "center", "right"].map((al) => (
                <button
                  key={al}
                  type="button"
                  onClick={() => update({ hero_text_align: al })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize border cursor-pointer ${
                    cfg.textAlign === al
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  {al}
                </button>
              ))}
            </div>
            <Toggle
              checked={cfg.showTrustpilot}
              onChange={(v) => update({ hero_show_trustpilot: v })}
              label="Show 4.8/5 Trustpilot Strip"
            />
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: BACKGROUND BANNER LAYER
         ========================================================= */}
      {activeTab === "bg" && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              {cfg.bgUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cfg.bgUrl}
                  alt="Current Background"
                  className="w-24 h-11 object-cover rounded-lg border border-slate-700"
                />
              )}
              <div>
                <p className="text-xs font-extrabold text-white">Full-Width Background Banner</p>
                <p className="text-[11px] text-slate-400 font-mono truncate max-w-md">
                  {cfg.bgUrl || "No background image selected"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => triggerUploadFor("bg")}
                className="px-3.5 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <UploadCloud size={14} />
                {uploadingTarget === "bg" ? "Uploading..." : "Upload New Banner"}
              </button>
              {onBrowseMedia && (
                <button
                  type="button"
                  onClick={onBrowseMedia}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Library size={14} /> Media Library
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <SliderCard label="Hero Banner Height (px)" display={`${cfg.bannerHeight}px`}>
              <input
                type="range"
                min="220"
                max="750"
                step="5"
                value={cfg.bannerHeight}
                onChange={(e) => update({ hero_banner_height: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Banner Zoom (%)" display={`${cfg.bgZoom}%`}>
              <input
                type="range"
                min="80"
                max="160"
                step="2"
                value={cfg.bgZoom}
                onChange={(e) => update({ hero_bg_zoom: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Banner Fit Mode" display={cfg.bgFit}>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  ["fill", "Fill Full"],
                  ["cover", "Cover"],
                  ["contain", "Contain"],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => update({ hero_bg_fit: val })}
                    className={`py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      cfg.bgFit === val
                        ? "bg-brand-blue text-white border-brand-blue"
                        : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </SliderCard>

            <SliderCard
              label="Pan Banner Left / Right (X)"
              display={`${cfg.bgOffX}px`}
            >
              <input
                type="range"
                min="-300"
                max="300"
                step="5"
                value={cfg.bgOffX}
                onChange={(e) => update({ hero_bg_offset_x: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Pan Banner Up / Down (Y)" display={`${cfg.bgOffY}px`}>
              <input
                type="range"
                min="-200"
                max="200"
                step="5"
                value={cfg.bgOffY}
                onChange={(e) => update({ hero_bg_offset_y: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Background Fill Color" display={cfg.bgColor}>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={cfg.bgColor || "#eaf4ff"}
                  onChange={(e) => update({ hero_bg_color: e.target.value })}
                  className="h-7 w-12 rounded cursor-pointer bg-transparent border border-slate-700"
                />
                <input
                  type="text"
                  value={cfg.bgColor || "#eaf4ff"}
                  onChange={(e) => update({ hero_bg_color: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs font-mono text-white"
                />
              </div>
            </SliderCard>
          </div>

          {recent.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <p className="text-[11px] font-bold text-slate-400">
                Click any uploaded banner below to set as Background for {selectedPageKey}:
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {recent.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => update({ hero_bg_url: m.url, hero_image_url: m.url })}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      cfg.bgUrl === m.url
                        ? "border-amber-400 ring-2 ring-amber-400/30"
                        : "border-slate-800 hover:border-slate-600"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 4: EXTRA FOREGROUND PHOTO & STATS BADGE
         ========================================================= */}
      {activeTab === "fg" && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-4">
              <Toggle
                checked={cfg.mainEnabled}
                onChange={(v) => update({ hero_main_enabled: v })}
                label="Enable Separate Foreground Photo Layer"
              />
              <Toggle
                checked={cfg.showBadge}
                onChange={(v) => update({ hero_show_badge: v })}
                label="Show Floating Stats Badge (50,000+ / 500+)"
              />
              <Toggle
                checked={cfg.showCircle}
                onChange={(v) => update({ hero_show_circle: v })}
                label="Soft Blue Circle Behind Foreground Photo"
              />
            </div>

            <button
              type="button"
              onClick={() => triggerUploadFor("main")}
              className="px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud size={13} />
              {uploadingTarget === "main" ? "Uploading..." : "Upload Foreground Photo"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <SliderCard
              label="Foreground Width (px)"
              display={cfg.width ? `${cfg.width}px` : "Auto"}
            >
              <input
                type="range"
                min="240"
                max="820"
                step="10"
                value={cfg.width || 520}
                onChange={(e) =>
                  update({
                    hero_image_width: parseInt(e.target.value, 10),
                    hero_main_enabled: true,
                  })
                }
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard label="Edge Softness Fade" display={`${cfg.fade}%`}>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={cfg.fade}
                onChange={(e) => update({ hero_image_fade: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </SliderCard>

            <SliderCard
              label="Foreground X / Y Offset"
              display={`${cfg.offX}px, ${cfg.offY}px`}
            >
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-250"
                  max="250"
                  step="5"
                  value={cfg.offX}
                  onChange={(e) => update({ hero_image_offset_x: parseInt(e.target.value, 10) })}
                  className="w-1/2 accent-amber-400"
                />
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="5"
                  value={cfg.offY}
                  onChange={(e) => update({ hero_image_offset_y: parseInt(e.target.value, 10) })}
                  className="w-1/2 accent-amber-400"
                />
              </div>
            </SliderCard>
          </div>
        </div>
      )}
    </div>
  );
}
