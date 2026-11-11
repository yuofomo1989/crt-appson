"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import PageHeroBanner from "@/components/PageHeroBanner";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Award,
  ShieldCheck,
  Users,
  Calendar,
  TrendingUp,
  ChevronRight,
  Target,
  Briefcase,
  Layers,
  GraduationCap,
  ClipboardCheck,
  Rocket,
  BarChart3,
  Laptop,
  Headphones,
  Globe,
  Phone
} from "lucide-react";

import initialCategories from "@/data/categories_db.json";
import initialCourses from "@/data/courses_db.json";
import initialSchedules from "@/data/schedules_db.json";
import initialSiteSettings from "@/data/site_settings_db.json";

function findCategory(cats, slug) {
  if (!cats || cats.length === 0) return null;
  const s = (slug || "").toLowerCase().trim();

  let found = cats.find(c => c.slug && c.slug.toLowerCase() === s);
  if (found) return found;

  found = cats.find(c => c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === s);
  if (found) return found;

  if (s.includes("agile") || s.includes("project")) {
    found = cats.find(c => (c.name || "").toLowerCase().includes("project"));
    if (found) return found;
  }
  if (s.includes("security") || s.includes("cyber")) {
    found = cats.find(c => (c.name || "").toLowerCase().includes("security"));
    if (found) return found;
  }
  if (s.includes("lean") || s.includes("six-sigma") || s.includes("sigma")) {
    found = cats.find(c => (c.name || "").toLowerCase().includes("six sigma"));
    if (found) return found;
  }
  if (s.includes("devops") || s.includes("salesforce")) {
    found = cats.find(c => (c.name || "").toLowerCase().includes("devops"));
    if (found) return found;
  }
  if (s.includes("itil") || s.includes("architecture") || s.includes("cloud")) {
    found = cats.find(c => (c.name || "").toLowerCase().includes("service") || (c.name || "").toLowerCase().includes("architecture"));
    if (found) return found;
  }

  return cats[0] || { name: s.replace(/-/g, " ").toUpperCase() };
}

export default function CategoryClientPage({ slug }) {
  const preloadedCat = findCategory(initialCategories, slug);

  const [category, setCategory] = useState(preloadedCat);
  const [courses, setCourses] = useState(initialCourses || []);
  const [schedules, setSchedules] = useState(initialSchedules || []);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTitle, setConsultationTitle] = useState("Book a Free Consultation");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("popularity");

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [catRes, cRes, sRes, setRes] = await Promise.all([
          fetch(`${apiUrl}/categories`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/courses`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/schedules`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then(r => r.json()).catch(() => null)
        ]);

        if (catRes && catRes.status === "success" && Array.isArray(catRes.data)) {
          const found = findCategory(catRes.data, slug);
          if (found) setCategory(found);
        }
        if (cRes && cRes.status === "success" && Array.isArray(cRes.data)) {
          setCourses(cRes.data);
        }
        if (sRes && sRes.status === "success" && Array.isArray(sRes.data)) {
          setSchedules(sRes.data);
        }
        if (setRes && setRes.status === "success" && setRes.data) {
          setSiteSettings(setRes.data);
        }
      } catch (err) {
        // Safe fallback
      }
    }
    fetchData();
  }, [slug]);

  const categoryName = category?.name || slug.replace(/-/g, " ");
  const meta = category?.metadata || {};

  // Extract Category specific courses with intelligent matching
  const categoryCourses = courses.filter(c => {
    if (category?.id && c.category_id === category.id) return true;
    if (category?.slug && c.category_slug === category.slug) return true;

    const cCat = (c.category_name || (c.category && c.category.name) || "").toLowerCase();
    const catNameLower = (categoryName || "").toLowerCase();
    if (cCat && catNameLower && (cCat.includes(catNameLower) || catNameLower.includes(cCat))) return true;

    if (catNameLower.includes("six sigma") && cCat.includes("six sigma")) return true;
    if (catNameLower.includes("security") && cCat.includes("security")) return true;
    if (catNameLower.includes("devops") && (cCat.includes("devops") || cCat.includes("salesforce"))) return true;
    if (catNameLower.includes("project") && (cCat.includes("project") || cCat.includes("agile"))) return true;
    if (catNameLower.includes("service") && (cCat.includes("service") || cCat.includes("itil"))) return true;

    return false;
  });

  const allCategoryCourses = categoryCourses.length > 0 ? categoryCourses : courses.slice(0, 10);

  // Extract filter tag for each course (e.g. PMP®, CAPM®, PMI-ACP®, PgMP®, PMI-RMP®, CBAP®, CompTIA®)
  const getCourseTag = (title = "") => {
    const t = title.toUpperCase();
    if (t.includes("PMP")) return "PMP®";
    if (t.includes("CAPM")) return "CAPM®";
    if (t.includes("PMI-ACP") || t.includes("PMI ACP")) return "PMI-ACP®";
    if (t.includes("PGMP")) return "PgMP®";
    if (t.includes("PMI-RMP") || t.includes("PMI RMP")) return "PMI-RMP®";
    if (t.includes("CBAP")) return "CBAP®";
    if (t.includes("COMPTIA")) return "CompTIA®";
    if (t.includes("CISSP")) return "CISSP®";
    if (t.includes("CISA")) return "CISA®";
    if (t.includes("CISM")) return "CISM®";
    if (t.includes("CEH")) return "CEH®";
    if (t.includes("GREEN BELT")) return "Green Belt";
    if (t.includes("BLACK BELT")) return "Black Belt";
    if (t.includes("LEAN")) return "Lean";
    if (t.includes("DEVOPS")) return "DevOps";
    if (t.includes("SALESFORCE")) return "Salesforce";
    if (t.includes("ITIL")) return "ITIL® 4";
    if (t.includes("TOGAF")) return "TOGAF®";
    if (t.includes("COBIT")) return "COBIT®";
    return title.split(" ")[0];
  };

  // Build Filter Pills with counts
  const tagCounts = {};
  allCategoryCourses.forEach(c => {
    const tag = getCourseTag(c.title);
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  const filterTags = Object.keys(tagCounts);

  // Apply filter and sort
  const filteredCourses = allCategoryCourses
    .filter(c => selectedFilter === "ALL" || getCourseTag(c.title) === selectedFilter)
    .sort((a, b) => {
      if (sortBy === "price-low") return (Number(a.price) || 999) - (Number(b.price) || 999);
      if (sortBy === "price-high") return (Number(b.price) || 999) - (Number(a.price) || 999);
      return 0; // Default popularity order
    });

  const getNextClassDate = (courseId, courseTitle) => {
    const match = schedules.find(s =>
      (s.course_id && s.course_id === courseId) ||
      (s.course_title && s.course_title.toLowerCase().includes((courseTitle || "").toLowerCase()))
    );
    if (match && match.start_date) {
      const d = new Date(match.start_date);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
    }
    return "Next Cohort Starting Soon";
  };

  const openModalWithTitle = (title) => {
    setConsultationTitle(title);
    setIsConsultationOpen(true);
  };

  const heroTitle = meta.hero_title || `${categoryName} Certifications`;
  const heroSubtitle = meta.hero_subtitle || category?.description ||
    "Gain the credentials, enterprise frameworks, and practical confidence to lead critical initiatives, empower high-performing teams, and accelerate your career.";

  let heroImage = siteSettings?.hero_image_url || "/uploads/Modern_Remote_Team_Collaboration_1793281267382.png";
  if (typeof heroImage === "string" && heroImage.startsWith("./")) {
    heroImage = heroImage.substring(1);
  }

  // 5-Step Career Roadmap matching Reference Image 2
  const roadmapStyles = [
    {
      bg: "bg-[#EFFBF5] border-[#B8EAD0]",
      circle: "bg-[#22A06B] text-white",
      level: "BEGINNER",
      defaultCourse: "PMP®",
      salary: "$90,000+",
      icon: <ClipboardCheck size={24} className="text-[#22A06B]" />,
      recommended: false
    },
    {
      bg: "bg-[#F0F7FF] border-[#BFDBFE]",
      circle: "bg-[#0066FF] text-white",
      level: "INTERMEDIATE",
      defaultCourse: "PgMP®",
      salary: "$105,000+",
      icon: <Layers size={24} className="text-[#0066FF]" />,
      recommended: false
    },
    {
      bg: "bg-[#EBF4FF] border-2 border-[#0066FF] shadow-md",
      circle: "bg-[#0066FF] text-white",
      level: "INTERMEDIATE",
      defaultCourse: "Certified",
      salary: "$120,000+",
      icon: <Award size={26} className="text-[#0066FF]" />,
      recommended: true
    },
    {
      bg: "bg-[#F5F2FF] border-[#DDD6FE]",
      circle: "bg-[#6D28D9] text-white",
      level: "ADVANCED",
      defaultCourse: "CAPM®",
      salary: "$135,000+",
      icon: <GraduationCap size={24} className="text-[#6D28D9]" />,
      recommended: false
    },
    {
      bg: "bg-[#FFF8EB] border-[#FDE68A]",
      circle: "bg-[#F97316] text-white",
      level: "ADVANCED",
      defaultCourse: "PMI®",
      salary: "$150,000+",
      icon: <BarChart3 size={24} className="text-[#F97316]" />,
      recommended: false
    }
  ];

  const careerPath = roadmapStyles.map((style, i) => {
    const customStep = Array.isArray(meta.career_path) && meta.career_path[i];
    const fallbackCourse = allCategoryCourses[i];
    const shortTitle = customStep?.course_name || (fallbackCourse ? getCourseTag(fallbackCourse.title) : style.defaultCourse);
    return {
      ...style,
      level: customStep?.level ? customStep.level.toUpperCase() : style.level,
      course_name: shortTitle,
      avg_salary: customStep?.avg_salary || style.salary,
      url: customStep?.url || (fallbackCourse ? `/courses/${fallbackCourse.slug}` : "#popular-certifications")
    };
  });

  // Card ribbon & icon themes cycling across the 3-column grid (Matches Reference Image 2)
  const cardThemes = [
    {
      ribbon: "BEST SELLER",
      ribbonBg: "bg-[#FF6B00] text-white",
      icon: <Award size={28} className="text-[#FF6B00]" />,
      iconBox: "bg-orange-50 border-orange-100"
    },
    {
      ribbon: "TOP CHOICE",
      ribbonBg: "bg-[#0066FF] text-white",
      icon: <Layers size={28} className="text-[#0066FF]" />,
      iconBox: "bg-blue-50 border-blue-100"
    },
    {
      ribbon: "HIGH DEMAND",
      ribbonBg: "bg-[#7C3AED] text-white",
      icon: <GraduationCap size={28} className="text-[#7C3AED]" />,
      iconBox: "bg-purple-50 border-purple-100"
    },
    {
      ribbon: "BEST SELLER",
      ribbonBg: "bg-[#FF6B00] text-white",
      icon: <GraduationCap size={28} className="text-[#FF6B00]" />,
      iconBox: "bg-orange-50 border-orange-100"
    },
    {
      ribbon: "TOP CHOICE",
      ribbonBg: "bg-[#0066FF] text-white",
      icon: <Target size={28} className="text-[#0066FF]" />,
      iconBox: "bg-blue-50 border-blue-100"
    },
    {
      ribbon: "HIGH DEMAND",
      ribbonBg: "bg-[#7C3AED] text-white",
      icon: <Rocket size={28} className="text-[#7C3AED]" />,
      iconBox: "bg-purple-50 border-purple-100"
    },
    {
      ribbon: "BEST SELLER",
      ribbonBg: "bg-[#FF6B00] text-white",
      icon: <Layers size={28} className="text-[#FF6B00]" />,
      iconBox: "bg-orange-50 border-orange-100"
    },
    {
      ribbon: "TOP CHOICE",
      ribbonBg: "bg-[#0066FF] text-white",
      icon: <ShieldCheck size={28} className="text-[#0066FF]" />,
      iconBox: "bg-blue-50 border-blue-100"
    },
    {
      ribbon: "HIGH DEMAND",
      ribbonBg: "bg-[#7C3AED] text-white",
      icon: <BarChart3 size={28} className="text-[#7C3AED]" />,
      iconBox: "bg-purple-50 border-purple-100"
    },
    {
      ribbon: "BEST SELLER",
      ribbonBg: "bg-[#FF6B00] text-white",
      icon: <ClipboardCheck size={28} className="text-[#FF6B00]" />,
      iconBox: "bg-orange-50 border-orange-100"
    }
  ];

  // 5 Value Proposition Cards matching Reference Image 2
  const whyGetCertifiedCards = [
    {
      icon: <BarChart3 size={26} className="text-[#FF6B00]" />,
      iconBg: "bg-orange-50 text-[#FF6B00]",
      title: "High Global Demand",
      desc: "Strong career opportunities with growing project needs across industries."
    },
    {
      icon: <Layers size={26} className="text-[#0066FF]" />,
      iconBg: "bg-blue-50 text-[#0066FF]",
      title: "Enterprise Methodologies",
      desc: "Learn proven, industry-recognized frameworks used by top organizations."
    },
    {
      icon: <Laptop size={26} className="text-[#10B981]" />,
      iconBg: "bg-emerald-50 text-[#10B981]",
      title: "Hands-on, Practical Training",
      desc: "Real-world scenarios, case studies and expert-led guidance."
    },
    {
      icon: <Award size={26} className="text-[#7C3AED]" />,
      iconBg: "bg-purple-50 text-[#7C3AED]",
      title: "100% Exam Pass Support",
      desc: "Live coaching, exam tips and dedicated mentor support."
    },
    {
      icon: <Users size={26} className="text-[#0066FF]" />,
      iconBg: "bg-blue-50 text-[#0066FF]",
      title: "Career Advancement",
      desc: `Higher salaries and faster leadership opportunities in ${categoryName.toLowerCase()}.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      <Navbar siteSettings={siteSettings} />

      {/* ====================================================================
          SECTION 1: DYNAMIC CANVAS HERO + 5-ITEM STATS STRIP
          ==================================================================== */}
      <PageHeroBanner
        pageKey={`category:${category?.slug || slug}`}
        siteSettings={siteSettings}
        templateVars={{ category_name: categoryName }}
        fallbackTitle={categoryName}
        fallbackHighlight="Certifications"
        fallbackSubtitle={heroSubtitle}
        fallbackPrimaryText="Explore Certifications"
        fallbackPrimaryUrl="#popular-certifications"
        fallbackSecondaryText="Talk to an Advisor"
        onSecondaryClick={() => openModalWithTitle(`Talk to ${categoryName} Learning Advisor`)}
        bottomSlot={
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm py-5 px-4 sm:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center lg:divide-x lg:divide-slate-100">
              <div className="flex items-center gap-3.5 lg:pr-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <GraduationCap size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">98%</h4>
                  <p className="text-xs text-slate-500 font-semibold">Success Rate</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Globe size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">120+</h4>
                  <p className="text-xs text-slate-500 font-semibold">Countries</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Users size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm leading-tight">Expert Instructors</h4>
                  <p className="text-xs text-slate-500 font-semibold">Industry Practitioners</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <ShieldCheck size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm leading-tight">Pass Assurance</h4>
                  <p className="text-xs text-slate-500 font-semibold">We&apos;ve Got Your Back</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:pl-4 col-span-2 sm:col-span-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <BarChart3 size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">50,000+</h4>
                  <p className="text-xs text-slate-500 font-semibold">Professionals Trained</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ====================================================================
          SECTION 2: CAREER ROADMAP PATH (5 Tinted Cards + Arrows + Recommended)
          ==================================================================== */}
      <section className="py-6 px-4 md:px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-wider text-[#0066FF]">
              STEP-BY-STEP PROGRESSION
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0B1E33] tracking-tight">
              {categoryName} <span className="text-[#0066FF]">Career Roadmap</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              A structured credential pathway designed to take you from foundational basics to enterprise executive leadership.
            </p>
          </div>

          {/* 5 Step Cards with Connecting Arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-3">
            {careerPath.map((step, idx) => (
              <div key={idx} className="relative flex items-center">
                <Link
                  href={step.url}
                  className={`w-full p-5 rounded-2xl border transition-all hover:shadow-md relative flex flex-col items-center justify-center text-center space-y-2.5 ${step.bg}`}
                >
                  {/* Top Recommended Ribbon on Step 3 */}
                  {step.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FF6B00] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap">
                      ★ RECOMMENDED
                    </span>
                  )}

                  {/* Step Number Circle */}
                  <div className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shadow-2xs ${step.circle}`}>
                    {idx + 1}
                  </div>

                  {/* Icon + Details */}
                  <div className="flex items-center justify-center gap-3 w-full pt-0.5">
                    <div className="shrink-0">
                      {step.icon}
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                        {step.level}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-[#0B1E33] leading-tight">
                        {step.course_name}
                      </h4>
                      <div className="text-xs sm:text-sm font-black text-[#0066FF] mt-0.5">
                        {step.avg_salary}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Arrow Between Cards on Desktop */}
                {idx < careerPath.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-2xs items-center justify-center text-slate-500 text-xs font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: AVAILABLE CERTIFICATIONS GRID + FILTER PILLS + BLANK FIX
          ==================================================================== */}
      <section id="popular-certifications" className="py-6 px-4 md:px-6 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Header Row: Title on Left, Sort By Dropdown on Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100/80 text-[10px] font-black uppercase tracking-wider text-[#0066FF]">
                ALL PROGRAMS
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0B1E33] tracking-tight">
                Available {categoryName} Certifications ({allCategoryCourses.length})
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-2xs self-start sm:self-auto">
              <span className="text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-bold text-[#0B1E33] bg-transparent focus:outline-none cursor-pointer pr-1"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filter Pills Bar (Only All Certifications tab kept as requested) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSelectedFilter("ALL")}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer bg-[#0066FF] text-white shadow-sm shadow-blue-500/20"
            >
              All Certifications ({allCategoryCourses.length})
            </button>
          </div>

          {/* 3-Column Certifications Grid (with Horizontal Wide Card for single leftover item!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredCourses.map((c, idx) => {
              const theme = cardThemes[idx % cardThemes.length];
              const nextDate = getNextClassDate(c.id, c.title);
              const priceVal = Number(c.price) || 999;
              const origPriceVal = Number(c.original_price) || priceVal + 500;
              const reviewsCount = c.reviews_count || (840 + idx * 45);
              const isLastSingleRemainder =
                filteredCourses.length > 3 &&
                filteredCourses.length % 3 === 1 &&
                idx === filteredCourses.length - 1;

              // Render Horizontal Wide Centered Card for the 10th / leftover card (Matches Reference Image 2!)
              if (isLastSingleRemainder) {
                return (
                  <div
                    key={c.id || idx}
                    className="lg:col-span-3 max-w-4xl mx-auto w-full rounded-2xl bg-white border border-slate-200/90 hover:border-[#0066FF] shadow-xs hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 mt-1 ${theme.iconBox}`}>
                        {theme.icon}
                      </div>
                      <div className="space-y-1.5">
                        <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.ribbonBg}`}>
                          {theme.ribbon}
                        </span>
                        <h3 className="text-base font-black text-[#0B1E33]">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">
                          {c.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-[#0B1E33]">${priceVal.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 line-through font-semibold">${origPriceVal.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                            <Calendar size={13} className="text-[#0066FF]" />
                            <span>Cohort: <strong className="text-[#0B1E33]">{nextDate}</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-between gap-4 w-full sm:w-auto shrink-0">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span>{c.rating || "4.9"}</span>
                        <span className="text-slate-400 font-medium">({reviewsCount.toLocaleString()})</span>
                      </div>
                      <Link
                        href={`/courses/${c.slug || c.id}`}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20"
                      >
                        <span>View Details &amp; Syllabus</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              }

              // Standard 3-Column Card (Matches Reference Image 2)
              return (
                <div
                  key={c.id || idx}
                  className="group rounded-2xl bg-white border border-slate-200/90 hover:border-[#0066FF] shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between text-left"
                >
                  <div className="space-y-3">
                    {/* Top Row: Ribbon Badge & Star Rating */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.ribbonBg}`}>
                        {theme.ribbon}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span>{c.rating || "4.9"}</span>
                        <span className="text-slate-400 font-medium">({reviewsCount.toLocaleString()})</span>
                      </div>
                    </div>

                    {/* Icon + Title + Description */}
                    <div className="flex items-start gap-3.5 pt-1">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${theme.iconBox}`}>
                        {theme.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm sm:text-[15px] font-black text-[#0B1E33] group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-2">
                          {c.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    {/* Price Row + Cohort */}
                    <div className="pl-14 space-y-1.5 pt-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-[#0B1E33]">${priceVal.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 line-through font-semibold">${origPriceVal.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                        <Calendar size={12} className="text-[#0066FF] shrink-0" />
                        <span>Cohort: <strong className="text-[#0B1E33]">{nextDate}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Solid Blue Pill Button */}
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <Link
                      href={`/courses/${c.slug || c.id}`}
                      className="w-full py-2.5 px-4 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs shadow-blue-500/20"
                    >
                      <span>View Details &amp; Syllabus</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 4: WHY GET CERTIFIED IN [CATEGORY]? (5 Icon Cards Row)
          ==================================================================== */}
      <section className="py-6 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-[#0B1E33] tracking-tight">
              Why Get Certified in {categoryName}?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyGetCertifiedCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col items-center text-center space-y-3 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#0B1E33] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: BOTTOM CTA BAR (Matches Reference Image 2)
          ==================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0B2545] via-[#133B6E] to-[#0B2545] py-6 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-1.5">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Ready to Advance Your Career?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 font-medium">
                Talk to our training experts and find the right certification path for your goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openModalWithTitle("Get a Free Consultation")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                <Calendar size={15} />
                <span>Get a Free Consultation</span>
              </button>
              <a
                href={`tel:${(siteSettings?.support_phone || "8887457575").replace(/[^0-9]/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 px-6 py-3.5 text-xs font-bold text-white transition-all"
              >
                <Phone size={15} />
                <span>Call Us: {siteSettings?.support_phone || "(888) 745-7575"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer siteSettings={siteSettings} />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultSubject={consultationTitle}
      />
    </div>
  );
}
