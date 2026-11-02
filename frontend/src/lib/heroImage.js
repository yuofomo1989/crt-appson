// Shared hero-image settings logic used by the homepage Hero and the Admin "Hero Image Studio" preview,
// so that what the admin sees in the preview is exactly what the website renders.

export const HERO_DEFAULTS = {
  hero_image_fit: "contain", // "contain" = show the whole image, "cover" = fill the whole panel (may crop)
  hero_image_fade: 14, // edge softness in % (0 = hard edges)
  hero_image_width: "full", // "full" or px
  hero_image_height: "auto", // "auto" (fill column height) or px
  hero_image_offset_x: 0,
  hero_image_offset_y: 0,
  hero_image_align: "right",
  hero_show_circle: false,
  hero_show_badge: true,
};

export const HERO_PRESETS = {
  // Normal rectangular photo / banner -> fills the right panel with soft blended edges
  photo: { ...HERO_DEFAULTS },
  // Transparent PNG cut-out of people -> sits on the floor of the hero with the soft circle behind
  cutout: {
    ...HERO_DEFAULTS,
    hero_image_fit: "contain",
    hero_image_fade: 0,
    hero_image_width: 560,
    hero_show_circle: true,
  },
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export function getHeroImageConfig(s = {}) {
  const pick = (k) => (s[k] === undefined || s[k] === null || s[k] === "" ? HERO_DEFAULTS[k] : s[k]);
  const w = pick("hero_image_width");
  const h = pick("hero_image_height");
  const wNum = parseInt(w);
  const hNum = parseInt(h);
  return {
    fit: pick("hero_image_fit") === "contain" ? "contain" : "cover",
    fade: clamp(parseInt(pick("hero_image_fade")) || 0, 0, 40),
    width: w === "full" || !wNum ? null : clamp(wNum, 300, 1000),
    height: h === "auto" || !hNum ? null : clamp(hNum, 300, 800),
    offX: clamp(parseInt(pick("hero_image_offset_x")) || 0, -300, 300),
    offY: clamp(parseInt(pick("hero_image_offset_y")) || 0, -300, 300),
    align: ["left", "center", "right"].includes(pick("hero_image_align")) ? pick("hero_image_align") : "right",
    showCircle: s.hero_show_circle === true || s.hero_show_circle === "true",
    showBadge: !(s.hero_show_badge === false || s.hero_show_badge === "false"),
  };
}

// Feathers the image edges so a rectangular photo blends into the white page.
export function buildEdgeMask(fade) {
  if (!fade) return {};
  const x = `linear-gradient(to right, transparent 0%, #000 ${fade}%, #000 ${100 - fade}%, transparent 100%)`;
  const y = `linear-gradient(to bottom, transparent 0%, #000 ${Math.round(fade * 0.8)}%, #000 ${100 - Math.round(fade * 0.8)}%, transparent 100%)`;
  const mask = `${x}, ${y}`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
  };
}
