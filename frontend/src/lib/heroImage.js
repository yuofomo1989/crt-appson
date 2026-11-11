// Shared multi-layer Hero configuration & helpers used by Homepage <Hero />,
// inner pages <PageHeroBanner />, and the Admin "1:1 Multi-Page Hero Visual Studio".

export const DEFAULT_FLOATING_CARDS = [
  {
    id: "tile-1",
    label: "Floating Image 1 (Top)",
    enabled: true,
    url: "/uploads/hero_tile_1.png",
    x: 77.6, // % from left of full banner
    y: 4.5,  // % from top of full banner
    width: 140,
    height: 94,
    radius: 14,
    border: 3,
    shadow: true,
    liveDot: false,
    zIndex: 20,
  },
  {
    id: "tile-2",
    label: "Floating Image 2 (Bottom)",
    enabled: true,
    url: "/uploads/hero_tile_2.png",
    x: 79.2, // % from left of full banner
    y: 31.2, // % from top of full banner
    width: 138,
    height: 88,
    radius: 14,
    border: 3,
    shadow: true,
    liveDot: false,
    zIndex: 20,
  },
];

export const HERO_DEFAULTS = {
  // Layout & Section Height
  hero_layout: "overlay", // "overlay" (Full-width banner + draggable layers) | "split" (2 columns)
  hero_banner_height: 410, // px height on desktop (220..750)

  // Layer 1: Background Banner
  hero_bg_url: "/uploads/hero_banner_clean_base.png",
  hero_bg_fit: "fill", // "cover" | "fill" | "contain"
  hero_bg_zoom: 100, // 70..180 %
  hero_bg_offset_x: 0, // -400..400 px
  hero_bg_offset_y: 0, // -250..250 px
  hero_bg_color: "#eaf4ff",

  // Layer 2: Foreground Character / Right Image (optional separate layer)
  hero_main_enabled: false,
  hero_image_url: "/images/hero_professionals.png",
  hero_image_fit: "contain",
  hero_image_fade: 0,
  hero_image_width: 520,
  hero_image_height: "auto",
  hero_image_offset_x: 0,
  hero_image_offset_y: 0,
  hero_image_align: "right",
  hero_image_z: 10,
  hero_show_circle: false,

  // Layer 3: Floating Mini-Images (Video Call Tiles)
  hero_floating_cards: DEFAULT_FLOATING_CARDS,

  // Layer 4: Text & Buttons Block
  hero_pill_text: "",
  hero_text_offset_x: 0, // -250..650 px
  hero_text_offset_y: 0, // -200..200 px
  hero_text_max_width: 580, // 320..960 px
  hero_title_size: "46px",
  hero_text_align: "left", // "left" | "center" | "right"
  hero_text_z: 30, // 30 = above images, 5 = behind foreground images
  hero_text_backdrop: "none", // "none" | "soft_glass" | "white_card"
  hero_show_trustpilot: true,

  // Layer 5: Floating Stats Badge (50,000+ Trained)
  hero_show_badge: false,
  hero_badge_x: 75,
  hero_badge_y: 74,
  hero_badge_count: "50,000+",
  hero_badge_subtitle: "Professionals Trained Worldwide",
};

// Default configurations for every major page / template across the website
export const PAGE_HERO_DEFAULTS = {
  home: {
    ...HERO_DEFAULTS,
    hero_pill_text: "",
    hero_title: "Get Certified.<br />Get Promoted.",
    hero_highlight_text: "Get Ahead.",
    hero_subtitle:
      "Live instructor-led certification training trusted by professionals in the USA, Canada, UK, Australia & beyond.",
    hero_cta_primary_text: "Explore Certifications",
    hero_cta_primary_url: "/certifications",
    hero_cta_secondary_text: "Talk to an Advisor",
  },
  "corporate-training": {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 390,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_main_enabled: false,
    hero_image_url: "/about_us_professionals.jpg",
    hero_pill_text: "CORPORATE TRAINING & ENTERPRISE SOLUTIONS",
    hero_title: "Empower Your Teams with",
    hero_highlight_text: "Custom Corporate Training",
    hero_subtitle:
      "Build high-performing teams with flexible, role-based training programs in project management, Agile, Lean Six Sigma, IT, and more — tailored to your business goals.",
    hero_cta_primary_text: "Request a Training Proposal",
    hero_cta_primary_url: "#proposal-form",
    hero_cta_secondary_text: "Talk to a Training Advisor",
    hero_show_badge: true,
    hero_badge_x: 76,
    hero_badge_y: 72,
    hero_badge_count: "500+",
    hero_badge_subtitle: "Enterprise Clients Trained",
  },
  certifications: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 360,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "GLOBAL CERTIFICATION CATALOG",
    hero_title: "Explore All",
    hero_highlight_text: "Certifications",
    hero_subtitle:
      "Choose from 120+ industry-recognized certification bootcamps with guaranteed-to-run cohorts and 100% money-back pass assurance.",
    hero_cta_primary_text: "Browse Courses Below",
    hero_cta_primary_url: "#catalog-grid",
    hero_cta_secondary_text: "Talk to an Advisor",
  },
  about: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 390,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "ABOUT CERTIFICATION PLANNER",
    hero_title: "Empowering Careers",
    hero_highlight_text: "One Certification at a Time",
    hero_subtitle:
      "A trusted global training partner since 2009, helping professionals and organizations build in-demand skills, achieve recognized certifications, and advance their careers.",
    hero_cta_primary_text: "Explore Certifications",
    hero_cta_primary_url: "/certifications",
    hero_cta_secondary_text: "Talk to an Advisor",
  },
  contact: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 360,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "CONTACT US",
    hero_title: "We’re Here to",
    hero_highlight_text: "Help You",
    hero_subtitle:
      "Have a question, need guidance, or want to discuss training for your team? Our experts are ready to help you choose the right certification path and achieve your goals.",
    hero_cta_primary_text: "Get a Free Consultation",
    hero_cta_primary_url: "#contact-form",
    hero_cta_secondary_text: "Call (888) 745-7575",
  },
  resources: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 360,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "RESOURCE HUB",
    hero_title: "Insights. Guidance.",
    hero_highlight_text: "Career Growth.",
    hero_subtitle:
      "Expert articles, exam preparation tips, industry insights, and career resources to help you get certified and grow your career.",
    hero_cta_primary_text: "Explore Latest Articles",
    hero_cta_primary_url: "#articles-section",
    hero_cta_secondary_text: "Talk to an Advisor",
  },
  policies: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 330,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "TRANSPARENT LEARNER POLICIES",
    hero_title: "Our Training &",
    hero_highlight_text: "Exam Pass Policies",
    hero_subtitle:
      "Clear, student-first terms covering 100% pass guarantee, rescheduling, cancellations, and corporate billing.",
    hero_cta_primary_text: "Explore Certifications",
    hero_cta_primary_url: "/certifications",
    hero_cta_secondary_text: "Contact Support",
  },
  "category:default": {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 390,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "{category_name} CERTIFICATIONS",
    hero_title: "{category_name}",
    hero_highlight_text: "Certifications",
    hero_subtitle:
      "Gain the credentials, enterprise frameworks, and practical confidence to lead critical initiatives, empower high-performing teams, and accelerate your career.",
    hero_cta_primary_text: "Explore Certifications",
    hero_cta_primary_url: "#popular-certifications",
    hero_cta_secondary_text: "Talk to an Advisor",
    hero_show_badge: false,
  },
  "course:default": {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_banner_height: 395,
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_pill_text: "{category_name} CERTIFICATION",
    hero_title: "Become a {course_acronym} Certified",
    hero_highlight_text: "Project Leader",
    hero_subtitle: "{course_description}",
    hero_cta_primary_text: "Enroll Now",
    hero_cta_primary_url: "#training-formats",
    hero_cta_secondary_text: "Talk to an Advisor",
    hero_show_badge: false,
  },
};

export const HERO_PRESETS = {
  // Preset 1: Full Wave Banner + 2 Movable Video Call Cards (Default)
  wave_with_movable_tiles: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_bg_url: "/uploads/hero_banner_clean_base.png",
    hero_image_url: "/uploads/hero_banner_clean_base.png",
    hero_main_enabled: false,
    hero_floating_cards: DEFAULT_FLOATING_CARDS,
    hero_show_badge: false,
  },
  // Preset 2: Original Flat Wave Banner (tiles baked in, floating layers off)
  flat_wave_banner: {
    ...HERO_DEFAULTS,
    hero_layout: "overlay",
    hero_bg_url: "/uploads/hero_banner_wave_1794397659.png",
    hero_image_url: "/uploads/hero_banner_wave_1794397659.png",
    hero_main_enabled: false,
    hero_floating_cards: DEFAULT_FLOATING_CARDS.map((c) => ({ ...c, enabled: false })),
    hero_show_badge: false,
  },
  // Preset 3: Split Column with Separate Right Photo / Cutout
  split_cutout: {
    ...HERO_DEFAULTS,
    hero_layout: "split",
    hero_bg_url: "",
    hero_bg_color: "#f4f8ff",
    hero_main_enabled: true,
    hero_image_url: "/images/hero_professionals.png",
    hero_image_fit: "contain",
    hero_image_fade: 0,
    hero_image_width: 540,
    hero_show_circle: true,
    hero_floating_cards: DEFAULT_FLOATING_CARDS,
    hero_show_badge: true,
  },
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export function getHeroImageConfig(s = {}, fallbackDefaults = HERO_DEFAULTS) {
  const base = { ...HERO_DEFAULTS, ...fallbackDefaults };
  const pick = (k) =>
    s[k] === undefined || s[k] === null || s[k] === "" ? base[k] : s[k];

  const w = pick("hero_image_width");
  const h = pick("hero_image_height");
  const wNum = parseInt(w);
  const hNum = parseInt(h);

  // Parse floating cards safely
  let floatingCards = base.hero_floating_cards || DEFAULT_FLOATING_CARDS;
  if (Array.isArray(s.hero_floating_cards) && s.hero_floating_cards.length > 0) {
    floatingCards = s.hero_floating_cards.map((c, idx) => ({
      id: c.id || `tile-${idx + 1}`,
      label: c.label || `Floating Image ${idx + 1}`,
      enabled: c.enabled !== false,
      url: c.url || DEFAULT_FLOATING_CARDS[idx % DEFAULT_FLOATING_CARDS.length].url,
      x: clamp(Number(c.x ?? 77.6), 0, 96),
      y: clamp(Number(c.y ?? 4.5 + idx * 26.5), -5, 92),
      width: clamp(parseInt(c.width) || 140, 50, 420),
      height: clamp(parseInt(c.height) || 92, 40, 320),
      radius: clamp(parseInt(c.radius ?? 14), 0, 40),
      border: clamp(parseInt(c.border ?? 3), 0, 12),
      shadow: c.shadow !== false,
      liveDot: Boolean(c.liveDot),
      zIndex: parseInt(c.zIndex) || 20,
    }));
  }

  let bgUrl =
    s.hero_bg_url !== undefined
      ? s.hero_bg_url
      : s.hero_image_url || base.hero_bg_url;
  if (typeof bgUrl === "string" && bgUrl.startsWith("./")) bgUrl = bgUrl.substring(1);

  let mainUrl = s.hero_image_url || base.hero_image_url;
  if (typeof mainUrl === "string" && mainUrl.startsWith("./")) mainUrl = mainUrl.substring(1);

  const titleSizeRaw = parseInt(String(pick("hero_title_size")).replace(/[^0-9]/g, "")) || 46;

  return {
    // Layout & Height
    layout: pick("hero_layout") === "split" ? "split" : "overlay",
    bannerHeight: clamp(parseInt(pick("hero_banner_height")) || 410, 220, 750),

    // Layer 1: Background
    bgUrl,
    bgFit: ["cover", "fill", "contain"].includes(pick("hero_bg_fit")) ? pick("hero_bg_fit") : "fill",
    bgZoom: clamp(parseInt(pick("hero_bg_zoom")) || 100, 70, 180),
    bgOffX: clamp(parseInt(pick("hero_bg_offset_x")) || 0, -400, 400),
    bgOffY: clamp(parseInt(pick("hero_bg_offset_y")) || 0, -250, 250),
    bgColor: pick("hero_bg_color") || "#eaf4ff",

    // Layer 2: Main Foreground Image
    mainEnabled:
      s.hero_main_enabled === true ||
      s.hero_main_enabled === "true" ||
      pick("hero_layout") === "split",
    mainUrl,
    fit: pick("hero_image_fit") === "contain" ? "contain" : "cover",
    fade: clamp(parseInt(pick("hero_image_fade")) || 0, 0, 40),
    width: w === "full" || !wNum ? null : clamp(wNum, 200, 1000),
    height: h === "auto" || !hNum ? null : clamp(hNum, 200, 800),
    offX: clamp(parseInt(pick("hero_image_offset_x")) || 0, -400, 400),
    offY: clamp(parseInt(pick("hero_image_offset_y")) || 0, -250, 250),
    align: ["left", "center", "right"].includes(pick("hero_image_align"))
      ? pick("hero_image_align")
      : "right",
    mainZ: parseInt(pick("hero_image_z")) || 10,
    showCircle: s.hero_show_circle === true || s.hero_show_circle === "true",

    // Layer 3: Floating Cards
    floatingCards,

    // Layer 4: Text Block & CTAs
    pillText: s.hero_pill_text !== undefined ? s.hero_pill_text : base.hero_pill_text || "",
    title: s.hero_title !== undefined ? s.hero_title : base.hero_title || "",
    highlightText:
      s.hero_highlight_text !== undefined ? s.hero_highlight_text : base.hero_highlight_text || "",
    subtitle: s.hero_subtitle !== undefined ? s.hero_subtitle : base.hero_subtitle || "",
    ctaPrimaryText:
      s.hero_cta_primary_text !== undefined
        ? s.hero_cta_primary_text
        : base.hero_cta_primary_text || "Explore Certifications",
    ctaPrimaryUrl:
      s.hero_cta_primary_url !== undefined
        ? s.hero_cta_primary_url
        : base.hero_cta_primary_url || "/certifications",
    ctaSecondaryText:
      s.hero_cta_secondary_text !== undefined
        ? s.hero_cta_secondary_text
        : base.hero_cta_secondary_text || "Talk to an Advisor",
    textOffX: clamp(parseInt(pick("hero_text_offset_x")) || 0, -250, 650),
    textOffY: clamp(parseInt(pick("hero_text_offset_y")) || 0, -200, 200),
    textMaxW: clamp(parseInt(pick("hero_text_max_width")) || 580, 320, 960),
    titleSize: clamp(titleSizeRaw, 26, 68),
    textAlign: ["left", "center", "right"].includes(pick("hero_text_align"))
      ? pick("hero_text_align")
      : "left",
    textZ: parseInt(pick("hero_text_z")) || 30,
    textBackdrop: ["none", "soft_glass", "white_card"].includes(pick("hero_text_backdrop"))
      ? pick("hero_text_backdrop")
      : "none",
    showTrustpilot: !(s.hero_show_trustpilot === false || s.hero_show_trustpilot === "false"),

    // Layer 5: Floating Stats Badge
    showBadge:
      s.hero_show_badge !== undefined
        ? s.hero_show_badge === true || s.hero_show_badge === "true"
        : Boolean(base.hero_show_badge),
    badgeX: clamp(Number(pick("hero_badge_x") ?? 75), 0, 92),
    badgeY: clamp(Number(pick("hero_badge_y") ?? 74), 0, 90),
    badgeCount: pick("hero_badge_count") || "50,000+",
    badgeSubtitle: pick("hero_badge_subtitle") || "Professionals Trained Worldwide",
  };
}

// Resolve the effective raw hero settings object for any pageKey ("home", "corporate-training",
// "category:agile-project-management", "course:pmp-certification", etc.)
export function getRawPageHeroSettings(siteSettings = {}, pageKey = "home") {
  if (!pageKey || pageKey === "home") {
    return { ...PAGE_HERO_DEFAULTS.home, ...siteSettings };
  }

  const pageHeroes =
    siteSettings && typeof siteSettings.page_heroes === "object" && siteSettings.page_heroes
      ? siteSettings.page_heroes
      : {};

  if (pageKey.startsWith("category:")) {
    const baseDef = PAGE_HERO_DEFAULTS["category:default"];
    const catDefault = pageHeroes["category:default"] || {};
    const catSpecific = pageKey !== "category:default" ? pageHeroes[pageKey] || {} : {};
    return { ...baseDef, ...catDefault, ...catSpecific };
  }

  if (pageKey.startsWith("course:")) {
    const baseDef = PAGE_HERO_DEFAULTS["course:default"];
    const courseDefault = pageHeroes["course:default"] || {};
    const courseSpecific = pageKey !== "course:default" ? pageHeroes[pageKey] || {} : {};
    return { ...baseDef, ...courseDefault, ...courseSpecific };
  }

  const baseDef = PAGE_HERO_DEFAULTS[pageKey] || PAGE_HERO_DEFAULTS.home;
  const saved = pageHeroes[pageKey] || {};
  return { ...baseDef, ...saved };
}

// Replace template tokens like {category_name}, {course_acronym}, {course_title}
export function interpolateHeroText(str = "", vars = {}) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/\{category_name\}/gi, vars.category_name || "Project Management")
    .replace(/\{course_acronym\}/gi, vars.course_acronym || "PMP®")
    .replace(/\{course_title\}/gi, vars.course_title || "PMP® Certification Training")
    .replace(
      /\{course_description\}/gi,
      vars.course_description ||
        "Live instructor-led certification training designed to help you pass on your first attempt."
    );
}

// Feathers the image edges so a rectangular photo blends into the background
export function buildEdgeMask(fade) {
  if (!fade) return {};
  const x = `linear-gradient(to right, transparent 0%, #000 ${fade}%, #000 ${100 - fade}%, transparent 100%)`;
  const y = `linear-gradient(to bottom, transparent 0%, #000 ${Math.round(fade * 0.8)}%, #000 ${
    100 - Math.round(fade * 0.8)
  }%, transparent 100%)`;
  const mask = `${x}, ${y}`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
  };
}
