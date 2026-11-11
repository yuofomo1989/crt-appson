"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import initialSiteSettings from "@/data/site_settings_db.json";
import {
  Search,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  Calendar,
  Mail,
  CheckCircle2,
  BookOpen,
  LayoutGrid,
  Award,
  ShieldCheck,
  BarChart3,
  Layers,
  Briefcase,
  Monitor,
  Code2,
  Star,
  Lock
} from "lucide-react";

import initialArticles from "@/data/articles_summary.json";

const SHOWCASE_ARTICLES = [
  {
    id: "sc-1",
    slug: "veteran-a-perfect-project-manager",
    category_name: "AGILE & PROJECT MANAGEMENT",
    category_color: "text-[#0066cc]",
    title: "Top 7 Reasons to Take PMP® Certification",
    description:
      "Why the PMP® remains the most in-demand project management certification for career growth.",
    date: "Sep 27, 2026",
    readTime: "6 min read",
    image: "/article_agile.jpg",
    visualType: "pmp_blocks"
  },
  {
    id: "sc-2",
    slug: "what-has-changed-in-the-new-pmp-exam-content-outline",
    category_name: "AGILE & PROJECT MANAGEMENT",
    category_color: "text-[#0066cc]",
    title: "PMBOK® Guide 8th Edition: What’s New for PMP® Aspirants?",
    description:
      "A detailed look at the PMBOK® Guide 8th Edition and how it impacts your PMP® exam preparation.",
    date: "Sep 25, 2026",
    readTime: "6 min read",
    image: "/article_green_project_hero.jpg",
    visualType: "pmbok_book"
  },
  {
    id: "sc-3",
    slug: "top-certifications-in-project-management",
    category_name: "LEAN AND SIX SIGMA",
    category_color: "text-[#15803d]",
    title: "Lean Six Sigma vs. PMP®: Which Certification Is Right for You?",
    description:
      "Compare Lean Six Sigma and PMP® to choose the best certification for your career goals.",
    date: "Sep 20, 2026",
    readTime: "7 min read",
    image: "/article_lean.jpg",
    visualType: "lss_blocks"
  },
  {
    id: "sc-4",
    slug: "veteran-a-perfect-project-manager",
    category_name: "IT SERVICE & ARCHITECTURE",
    category_color: "text-[#1d4ed8]",
    title: "ITIL® 4: Key Benefits and Career Opportunities",
    description:
      "Discover how ITIL® 4 can enhance your IT service management skills and open new career opportunities.",
    date: "Sep 18, 2026",
    readTime: "6 min read",
    image: "/article_it.jpg",
    visualType: "itil_cloud"
  },
  {
    id: "sc-5",
    slug: "top-certifications-in-project-management",
    category_name: "AGILE & PROJECT MANAGEMENT",
    category_color: "text-[#0066cc]",
    title: "Agile Project Management: A Practical Guide for Professionals",
    description:
      "Learn how Agile principles, frameworks, and best practices can help you deliver projects faster and more effectively.",
    date: "Sep 15, 2026",
    readTime: "8 min read",
    image: "/about_us_professionals.jpg",
    visualType: "agile_team"
  },
  {
    id: "sc-6",
    slug: "veteran-a-perfect-project-manager",
    category_name: "INFORMATION SECURITY",
    category_color: "text-[#6d28d9]",
    title: "CISSP® Certification: Career, Exam & Preparation Tips",
    description:
      "A complete guide to the CISSP® certification, including exam structure, study plan, and career opportunities.",
    date: "Sep 12, 2026",
    readTime: "7 min read",
    image: "/article_security.jpg",
    visualType: "cissp_lock"
  }
];

const CATEGORY_CARDS = [
  {
    id: null,
    name: "All Resources",
    count: "146 Articles",
    icon: Layers,
    iconColor: "text-[#0066cc]",
    iconBg: "bg-blue-50"
  },
  {
    id: "Agile & Project Management",
    name: "Agile & Project Management",
    count: "84 Articles",
    icon: Briefcase,
    iconColor: "text-[#f97316]",
    iconBg: "bg-orange-50"
  },
  {
    id: "Lean and Six Sigma",
    name: "Lean and Six Sigma",
    count: "32 Articles",
    icon: BarChart3,
    iconColor: "text-[#16a34a]",
    iconBg: "bg-emerald-50"
  },
  {
    id: "IT Service & Architecture",
    name: "IT Service & Architecture",
    count: "10 Articles",
    icon: Monitor,
    iconColor: "text-[#9333ea]",
    iconBg: "bg-purple-50"
  },
  {
    id: "DevOps & Salesforce",
    name: "DevOps & Salesforce",
    count: "12 Articles",
    icon: Code2,
    iconColor: "text-[#0284c7]",
    iconBg: "bg-sky-50"
  },
  {
    id: "Information Security",
    name: "Information Security",
    count: "6 Articles",
    icon: ShieldCheck,
    iconColor: "text-[#dc2626]",
    iconBg: "bg-red-50"
  }
];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFilterTab, setActiveFilterTab] = useState("All Articles");
  const [sortBy, setSortBy] = useState("Latest");
  const [extraCount, setExtraCount] = useState(0);

  const [dbArticles, setDbArticles] = useState(initialArticles || []);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});

  useEffect(() => {
    async function fetchResourceData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [aRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/articles`).then((r) => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then((r) => r.json()).catch(() => null)
        ]);

        if (aRes.status === "success" && Array.isArray(aRes.data) && aRes.data.length > 0) {
          setDbArticles(aRes.data);
        }
        if (sRes) {
          setSiteSettings(sRes.data || sRes);
        }
      } catch (err) {
        console.error("Error fetching resources data:", err);
      }
    }
    fetchResourceData();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  // Combine showcase articles + dbArticles for filtering/searching
  const isFiltering = Boolean(search.trim() || activeCategory);

  const filteredDbArticles = dbArticles.filter((art) => {
    const matchCat =
      activeCategory === null ||
      (art.category_name || "").toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]);
    const matchSearch =
      !search.trim() ||
      (art.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (art.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayedArticles = isFiltering
    ? filteredDbArticles.slice(0, 6 + extraCount)
    : [
        ...SHOWCASE_ARTICLES,
        ...dbArticles.slice(0, extraCount).map((a) => ({
          id: a.id,
          slug: a.slug,
          category_name: (a.category_name || "AGILE & PROJECT MANAGEMENT").toUpperCase(),
          category_color: "text-[#0066cc]",
          title: a.title,
          description: a.description,
          date: new Date(a.created_at || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }),
          readTime: "7 min read",
          image: a.image || "/article_green_project_hero.jpg"
        }))
      ];

  const remainingCount = Math.max(0, 140 - displayedArticles.length);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800 text-left">
      <Navbar siteSettings={siteSettings} />

      {/* ── 1. DYNAMIC CANVAS HERO SECTION + 5-ITEM STATS STRIP ────────────────── */}
      <PageHeroBanner
        pageKey="resources"
        siteSettings={siteSettings}
        breadcrumb={
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0066cc] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-700 font-semibold">Resources &amp; Articles</span>
          </div>
        }
        customActions={
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics, or certifications..."
                className="w-full rounded-2xl border border-slate-200/90 bg-white py-3.5 pl-5 pr-14 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-sm outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-blue-500/15 transition-all"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
              >
                <Search size={17} />
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="text-xs font-extrabold text-[#0f172a] mr-1">Popular:</span>
              {["PMP Exam Guide", "Lean Six Sigma", "CAPM", "Agile", "CISSP"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearch(tag === search ? "" : tag)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                    search === tag
                      ? "bg-[#0066cc] text-white border-[#0066cc]"
                      : "bg-white text-slate-700 border-slate-200/90 hover:border-[#0066cc] hover:text-[#0066cc]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        }
        bottomSlot={
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70 overflow-hidden">
            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">146+</p>
                <p className="text-[11px] font-medium text-slate-500">Expert Articles</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <LayoutGrid size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">5</p>
                <p className="text-[11px] font-medium text-slate-500">Key Categories</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-[#0f172a] leading-tight">Industry Experts</p>
                <p className="text-[11px] font-medium text-slate-500">Verified Content</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">100%</p>
                <p className="text-[11px] font-medium text-slate-500">Free Access</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-[#0f172a] leading-tight">Career Growth</p>
                <p className="text-[11px] font-medium text-slate-500">Practical Insights</p>
              </div>
            </div>
          </div>
        }
      />

      {/* ── 2. BROWSE BY CATEGORY + FEATURED ARTICLE ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 space-y-5">
        {/* Browse by Category */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-[#0f172a]">Browse by Category</h2>
            <button
              type="button"
              onClick={() => {
                setActiveCategory(null);
                setSearch("");
              }}
              className="text-xs font-extrabold text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Categories</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {CATEGORY_CARDS.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-2xl p-4 text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? "border-2 border-[#0066cc] bg-[#f5f9ff] shadow-xs"
                      : "border border-slate-200/80 bg-white hover:border-blue-300 hover:bg-slate-50/60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <IconComp size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[#0f172a] leading-snug line-clamp-2">
                      {cat.name}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">{cat.count}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Width Featured Article Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-3.5 sm:p-5 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Featured Image (6 Cols) */}
          <Link
            href="/blog/veteran-a-perfect-project-manager"
            className="lg:col-span-6 relative h-60 sm:h-68 rounded-2xl overflow-hidden bg-slate-900 group block"
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
              alt="PMP Certification Complete Guide for 2026"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "/article_green_project_hero.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Top-Left Orange Pill: FEATURED ARTICLE */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f97316] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                <Star size={12} className="fill-white" />
                FEATURED ARTICLE
              </span>
            </div>

            {/* Bottom-Left Overlay Title */}
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                PMP® Certification
                <br />
                Complete Guide for 2026
              </h3>
            </div>
          </Link>

          {/* Right Featured Details (6 Cols) */}
          <div className="lg:col-span-6 lg:pr-4 space-y-4">
            <span className="inline-block px-3 py-1 rounded-md bg-[#eef5ff] text-[#0066cc] text-[10px] font-extrabold uppercase tracking-wider">
              AGILE &amp; PROJECT MANAGEMENT
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] leading-snug">
              PMP® Certification Complete Guide for 2026: Exam, Eligibility &amp; Preparation
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              A comprehensive, up-to-date guide to the PMP® certification, including eligibility, exam changes, preparation strategy, and tips to pass with confidence.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  Oct 1, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  10 min read
                </span>
              </div>

              <Link
                href="/blog/veteran-a-perfect-project-manager"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-6 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all"
              >
                <span>Read Full Article</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ALL ARTICLES & GUIDES GRID ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Header + Filter Pills + Sort Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">All Articles &amp; Guides</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Explore practical insights, exam tips, and career resources from our experts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Filter Pill Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["All Articles", "Latest", "Most Popular", "Exam Preparation"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilterTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeFilterTab === tab
                      ? "bg-[#0066cc] text-white shadow-xs"
                      : "bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 ml-auto lg:ml-2">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-extrabold text-[#0f172a] outline-none cursor-pointer"
              >
                <option value="Latest">Latest</option>
                <option value="Popular">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3x2 Showcase Cards Grid */}
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((art, i) => (
              <Link
                key={art.id || i}
                href={`/blog/${art.slug}`}
                className="group rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Thumbnail with Custom Visual Overlay matching Reference */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={art.image || "/article_green_project_hero.jpg"}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/article_green_project_hero.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />

                    {/* Custom Wooden Blocks / Book / Lock Overlays for Showcase Cards */}
                    {art.visualType === "pmp_blocks" && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                        {["P", "M", "P"].map((ch, idx) => (
                          <span
                            key={idx}
                            className="w-10 h-10 rounded-md bg-[#e6c280] border-b-4 border-[#b89047] text-[#1e293b] font-black text-xl flex items-center justify-center shadow-md"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    )}

                    {art.visualType === "pmbok_book" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-50/90 via-white/95 to-slate-100/95 flex items-center justify-center p-4">
                        <div className="text-center -rotate-6">
                          <p className="text-2xl font-black text-[#0f172a] tracking-tight">PMBOK®</p>
                          <p className="text-lg font-bold text-slate-700">8th Edition</p>
                        </div>
                      </div>
                    )}

                    {art.visualType === "lss_blocks" && (
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
                        <div className="flex gap-1">
                          {["L", "E", "A", "N"].map((ch, idx) => (
                            <span
                              key={idx}
                              className="w-7 h-7 rounded bg-[#ebd09a] border-b-2 border-[#bfa065] text-[#0f172a] font-black text-sm flex items-center justify-center shadow"
                            >
                              {ch}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          {["S", "I", "X", " ", "S", "I", "G", "M", "A"].map((ch, idx) =>
                            ch === " " ? (
                              <span key={idx} className="w-1.5" />
                            ) : (
                              <span
                                key={idx}
                                className="w-6 h-6 rounded bg-[#e2c285] border-b-2 border-[#b59352] text-[#0f172a] font-black text-xs flex items-center justify-center shadow"
                              >
                                {ch}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {art.visualType === "cissp_lock" && (
                      <div className="absolute inset-0 bg-[#071936]/70 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                          <Lock size={34} />
                        </div>
                      </div>
                    )}

                    {/* Top-Left Category Pill */}
                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className={`inline-block rounded-md px-2.5 py-1 text-[9px] font-black uppercase tracking-wider bg-white/95 shadow-xs ${
                          art.category_color || "text-[#0066cc]"
                        }`}
                      >
                        {art.category_name || "ARTICLE"}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-[15px] font-black text-[#0f172a] leading-snug group-hover:text-[#0066cc] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-medium">
                      {art.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <div className="flex items-center gap-3.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      {art.readTime}
                    </span>
                  </div>
                  <span className="text-[#0066cc] font-extrabold group-hover:underline flex items-center gap-1">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-14 text-center space-y-4">
            <p className="text-base font-bold text-slate-700">No articles matched your search filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0066cc] text-white text-xs font-bold cursor-pointer"
            >
              Clear Filter &amp; Show All
            </button>
          </div>
        )}

        {/* Load More Articles Button */}
        {remainingCount > 0 && (
          <div className="text-center pt-3">
            <button
              type="button"
              onClick={() => setExtraCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white border border-[#0066cc]/40 text-[#0066cc] hover:bg-blue-50 font-extrabold text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>Load More Articles ({remainingCount} Remaining)</span>
              <ChevronDown size={15} />
            </button>
          </div>
        )}
      </section>

      {/* ── 4. NEWSLETTER BANNER (NEVER MISS AN INDUSTRY UPDATE) ──────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a2558] via-[#0e3378] to-[#0a2558] px-6 py-7 sm:px-10 sm:py-8 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
          {/* Left: Golden Envelope Illustration + Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
            {/* Golden Envelope Graphic */}
            <div className="relative w-20 h-16 shrink-0 flex items-center justify-center">
              <div className="w-16 h-12 rounded-xl bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] shadow-md flex flex-col items-center justify-start pt-1 border border-amber-300">
                <div className="bg-white text-[#0f172a] px-2 py-0.5 rounded text-[9px] font-black shadow-xs -mt-3 border border-slate-200">
                  Newsletter
                </div>
                <Mail size={20} className="text-white mt-1" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Never Miss an Industry Update
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-xl">
                Get the latest certification updates, exam prep tips, new articles, and career insights delivered straight to your inbox.
              </p>
            </div>
          </div>

          {/* Right: Email Input + Orange Subscribe Free Button */}
          {subscribed ? (
            <div className="px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-xs font-extrabold">
              🎉 Thank you for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0"
            >
              <div className="relative w-full sm:w-72">
                <Mail
                  size={15}
                  className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full rounded-xl bg-white pl-10 pr-4 py-3.5 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer shrink-0"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
