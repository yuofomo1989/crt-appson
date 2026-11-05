"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Eye,
  Share2,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Rocket,
  Layers,
  Settings,
  BarChart3,
  Flag,
  Trophy,
  FileText,
  Mail,
  Send,
  Link2,
  Headphones,
  Award,
  ClipboardCheck,
  Users,
  MessageCircle
} from "lucide-react";

import initialArticles from "@/data/articles_summary.json";

const LIFECYCLE_PHASES = [
  {
    name: "Initiate",
    desc: "Receive a mission, define objectives, identify stakeholders, and determine the project’s purpose.",
    icon: Rocket,
    tintBg: "bg-[#eef5ff]",
    iconColor: "text-[#0066cc]"
  },
  {
    name: "Plan",
    desc: "Analyze requirements, create a detailed plan, allocate resources, and build a collaborative team.",
    icon: Layers,
    tintBg: "bg-[#ecfdf5]",
    iconColor: "text-[#16a34a]"
  },
  {
    name: "Execute",
    desc: "Put the plan into action, coordinate resources, and lead the team to deliver results.",
    icon: Settings,
    tintBg: "bg-[#fff7ed]",
    iconColor: "text-[#f97316]"
  },
  {
    name: "Monitor & Control",
    desc: "Track progress, manage risks and issues, and make timely adjustments to stay on course.",
    icon: BarChart3,
    tintBg: "bg-[#f5f3ff]",
    iconColor: "text-[#7c3aed]"
  },
  {
    name: "Close",
    desc: "Complete the mission, evaluate outcomes, document lessons learned, and formally close the project.",
    icon: Flag,
    tintBg: "bg-[#fef2f2]",
    iconColor: "text-[#dc2626]"
  }
];

const SIDEBAR_RELATED = [
  {
    title: "Top 7 Reasons to Take PMP® Certification",
    date: "Sep 27, 2022",
    readTime: "6 min read",
    slug: "top-certifications-in-project-management"
  },
  {
    title: "PMBOK® Guide 8th Edition: What’s New for PMP® Aspirants?",
    date: "Sep 25, 2026",
    readTime: "6 min read",
    slug: "what-has-changed-in-the-new-pmp-exam-content-outline"
  },
  {
    title: "Agile Project Management: A Practical Guide for Professionals",
    date: "Sep 15, 2026",
    readTime: "8 min read",
    slug: "veteran-a-perfect-project-manager"
  }
];

const BOTTOM_RELATED_CARDS = [
  {
    category: "AGILE & PROJECT MANAGEMENT",
    title: "PMP® Certification Complete Guide for 2026: Exam, Eligibility & Preparation",
    date: "Oct 1, 2026",
    readTime: "10 min read",
    slug: "veteran-a-perfect-project-manager",
    icon: Flag
  },
  {
    category: "AGILE & PROJECT MANAGEMENT",
    title: "What has Changed in the New PMP® Exam Content Outline?",
    date: "Sep 25, 2026",
    readTime: "6 min read",
    slug: "what-has-changed-in-the-new-pmp-exam-content-outline",
    icon: ClipboardCheck
  },
  {
    category: "AGILE & PROJECT MANAGEMENT",
    title: "Lean Six Sigma vs. PMP®: Which Certification Is Right for You?",
    date: "Sep 20, 2026",
    readTime: "7 min read",
    slug: "top-certifications-in-project-management",
    icon: Users
  }
];

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug;

  const targetSlug = (slug || "").toLowerCase().trim();
  const preloaded =
    (initialArticles || []).find((a) => (a.slug || "").toLowerCase() === targetSlug) ||
    initialArticles?.[0] ||
    null;

  const [article, setArticle] = useState(preloaded);
  const [siteSettings, setSiteSettings] = useState(null);
  const [activeToc, setActiveToc] = useState("introduction");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchArticleDetails() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [aRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/articles`).then((r) => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then((r) => r.json()).catch(() => null)
        ]);

        if (aRes.status === "success" && Array.isArray(aRes.data)) {
          const found =
            aRes.data.find((a) => (a.slug || "").toLowerCase() === targetSlug) || aRes.data[0];
          if (found) setArticle(found);
        }

        if (sRes) {
          setSiteSettings(sRes);
        }
      } catch (err) {
        console.error("Error loading article:", err);
      }
    }
    fetchArticleDetails();
  }, [slug, targetSlug]);

  if (!article) return null;

  const isVeteranDefault =
    !slug ||
    targetSlug === "veteran-a-perfect-project-manager" ||
    (article.slug || "").toLowerCase() === "veteran-a-perfect-project-manager";

  const displayTitle = isVeteranDefault
    ? "Veteran – A Perfect Project Manager"
    : article.title;

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id) => {
    setActiveToc(id);
    if (typeof document !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800 flex flex-col justify-between text-left">
      <Navbar siteSettings={siteSettings} />

      {/* ── 1. LIGHT CORPORATE HERO BANNER ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#eef5ff] via-[#f5f9ff] to-[#dbeafe] border-b border-blue-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-5 lg:pb-0">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
            <Link href="/" className="hover:text-[#0066cc] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/resources" className="hover:text-[#0066cc] transition-colors">
              Resources &amp; Articles
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/resources" className="hover:text-[#0066cc] transition-colors">
              {article.category_name || "Agile & Project Management"}
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#0f172a] font-bold truncate max-w-xs">{displayTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-3 lg:pb-5">
              <span className="inline-block px-3.5 py-1 rounded-md bg-[#dbeafe] text-[#0066cc] text-[11px] font-extrabold uppercase tracking-wider">
                {(article.category_name || "AGILE & PROJECT MANAGEMENT").toUpperCase()}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0f172a] leading-[1.12]">
                {isVeteranDefault ? (
                  <>
                    Veteran – A Perfect
                    <br />
                    Project Manager
                  </>
                ) : (
                  displayTitle
                )}
              </h1>

              <p className="text-xs sm:text-sm text-[#0f172a] font-bold leading-relaxed max-w-xl">
                {isVeteranDefault
                  ? "How military experience builds the skills, discipline, and leadership needed to become a successful project manager."
                  : article.seo?.description || article.description}
              </p>

              {/* Author / Date / Read Time / Views Strip */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <User size={15} className="text-[#0066cc]" />
                  By Certification Planner
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-slate-500" />
                  Sep 27, 2022
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-slate-500" />
                  7 min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={15} className="text-slate-500" />
                  {(article.views || 12469).toLocaleString()} Views
                </span>
              </div>
            </div>

            {/* Right Column (5 Cols): Sunrise Veteran Photo */}
            <div className="lg:col-span-5 relative h-60 sm:h-72 lg:h-80 rounded-t-3xl lg:rounded-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80"
                alt={displayTitle}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src = article.image || "/article_green_project_hero.jpg";
                }}
              />
              {/* Soft left fade so photo blends into hero background */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f3f8ff] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN 12-COLUMN ARTICLE + STICKY SIDEBAR ────────────────────── */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (8 Cols): Main Article Content Card */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm space-y-5">
            {/* Section 1: Introduction */}
            <div id="introduction" className="space-y-4 text-xs sm:text-[14px] text-slate-700 font-medium leading-relaxed scroll-mt-24">
              <p>
                In the military, individuals stay busy with a wide range of responsibilities—from training and maintenance to mission planning and execution. The military decision-making process follows well-defined frameworks such as MCPP (The Marine Corps Planning Process), SMEAC (Situation, Mission, Execution, Administration, and Command), and more.
              </p>
              <p>
                The understanding of planning and managing projects is a must-have quality in all successful leaders irrespective of their fields. It’s a good project management skill that executes a business plan, a marketing campaign, a freeway or building the house. In both military and corporate organizations, there are numerous ways of planning and management, but all projects have a different lifecycle.
              </p>
            </div>

            {/* Blue Tinted Pull-Quote Box */}
            <div className="rounded-2xl bg-[#eef5ff] border border-blue-200/80 px-6 py-5 flex items-start gap-4">
              <span className="text-4xl font-black text-[#0066cc] leading-none select-none shrink-0 mt-0.5">
                “
              </span>
              <p className="text-xs sm:text-[14.5px] font-black italic text-[#0f172a] leading-relaxed">
                “Military training builds discipline, strategic thinking, risk management, and leadership — the same core skills that define a successful project manager.”
              </p>
            </div>

            {/* Section 2: The Project Management Lifecycle in Action */}
            <div id="lifecycle" className="space-y-4 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
                The Project Management Lifecycle in Action
              </h2>
              <p className="text-xs sm:text-[14px] text-slate-700 font-medium leading-relaxed">
                The PMI® framework breaks a project into five key process groups. Here’s how military experience naturally aligns with each phase:
              </p>

              {/* 5 Colored Process Group Rows */}
              <div className="space-y-2.5 pt-1">
                {LIFECYCLE_PHASES.map((phase) => {
                  const IconComp = phase.icon;
                  return (
                    <div
                      key={phase.name}
                      className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] overflow-hidden flex flex-col sm:flex-row items-stretch"
                    >
                      {/* Left Colored Label Column */}
                      <div
                        className={`sm:w-48 shrink-0 ${phase.tintBg} px-4 py-3.5 flex items-center gap-3 sm:border-r border-slate-200/70`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-white/90 shadow-2xs flex items-center justify-center shrink-0">
                          <IconComp size={18} className={phase.iconColor} />
                        </div>
                        <span className="text-sm font-black text-[#0f172a] leading-tight">
                          {phase.name}
                        </span>
                      </div>

                      {/* Right Description Column */}
                      <div className="flex-1 px-5 py-3.5 flex items-center text-xs sm:text-[13.5px] text-slate-700 font-medium leading-snug bg-white">
                        {phase.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Why Veterans Excel in Project Management */}
            <div id="why-veterans-excel" className="space-y-3 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
                Why Veterans Excel in Project Management
              </h2>
              <p className="text-xs sm:text-[14px] text-slate-700 font-medium leading-relaxed">
                As a military person, veterans may not have technical experience, but they have leadership experience. They know how to bring a team together, communicate clearly, solve problems, and deliver results under pressure — all of which are highly valued in project management.
              </p>
            </div>

            {/* If viewing another article from DB that isn't the Veteran article, also render its custom HTML below */}
            {!isVeteranDefault && article.content && (
              <div
                className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm space-y-3 pt-2 border-t border-slate-100"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            {/* Section 4: Key Takeaways Box */}
            <div
              id="key-takeaways"
              className="rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 scroll-mt-24"
            >
              {/* Left Trophy + Title */}
              <div className="sm:w-52 shrink-0 flex items-center gap-3.5 sm:border-r border-slate-200/80 sm:pr-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Trophy size={20} />
                </div>
                <span className="text-base font-black text-[#0f172a]">Key Takeaways</span>
              </div>

              {/* Right 4 Green Checkmarks */}
              <div className="flex-1 space-y-2 text-xs sm:text-[13px] text-slate-700 font-semibold">
                {[
                  "Military training and project management share a similar mindset.",
                  "Veterans bring discipline, leadership, and risk management skills.",
                  "The PMI® framework aligns well with military planning processes.",
                  "PMP® certification can help veterans transition to high-impact roles."
                ].map((pt) => (
                  <p key={pt} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#16a34a] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </p>
                ))}
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN (4 Cols): Sticky Sidebar (TOC + Related + Newsletter + Share) */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            {/* Widget 1: In This Article (TOC) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <BookOpen size={19} className="text-[#0066cc]" />
                <h3 className="text-base font-black text-[#0f172a]">In This Article</h3>
              </div>

              <div className="space-y-1.5 relative">
                {[
                  { id: "introduction", label: "Introduction" },
                  { id: "lifecycle", label: "The Project Management Lifecycle" },
                  { id: "why-veterans-excel", label: "Why Veterans Excel" },
                  { id: "key-takeaways", label: "Key Takeaways" }
                ].map((item) => {
                  const isActive = activeToc === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full px-3.5 py-2 rounded-xl text-left text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#dceaff] text-[#0066cc] font-extrabold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full border shrink-0 ${
                          isActive
                            ? "bg-[#0066cc] border-[#0066cc]"
                            : "bg-white border-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget 2: Related Articles */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <Layers size={19} className="text-[#0066cc]" />
                <h3 className="text-base font-black text-[#0f172a]">Related Articles</h3>
              </div>

              <div className="space-y-3">
                {SIDEBAR_RELATED.map((rel, idx) => (
                  <Link
                    key={idx}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-2xl border border-slate-200/70 bg-[#f8fafc] hover:bg-blue-50/40 hover:border-blue-200 p-3 flex items-center gap-3 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#e8eef7] text-slate-600 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="text-xs font-extrabold text-[#0f172a] group-hover:text-[#0066cc] leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {rel.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {rel.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 3: Get the Latest Insights Newsletter */}
            <div className="rounded-3xl bg-gradient-to-br from-[#eef5ff] via-[#f5f9ff] to-[#e0ecff] border border-blue-200/70 p-5 sm:p-6 shadow-sm space-y-3.5 relative overflow-hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-[#0066cc]" />
                    <h3 className="text-base font-black text-[#0f172a]">Get the Latest Insights</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Subscribe for exam tips, new articles, and industry updates.
                  </p>
                </div>
                <Send size={28} className="text-[#0066cc] -rotate-12 shrink-0 opacity-85" />
              </div>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                  🎉 Subscribed! Thank you.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubscribed(true);
                  }}
                  className="flex items-center gap-2 pt-1"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc]"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-4 py-2.5 text-xs font-extrabold text-white shadow-sm shrink-0 cursor-pointer transition-colors"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

            {/* Widget 4: Share This Article */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <Share2 size={18} className="text-[#0066cc]" />
                <h3 className="text-base font-black text-[#0f172a]">Share This Article</h3>
              </div>

              <div className="flex items-center gap-2.5">
                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Share on LinkedIn"
                  className="w-10 h-10 rounded-xl bg-[#0a66c2] hover:opacity-90 text-white font-black text-sm flex items-center justify-center shadow-xs cursor-pointer"
                >
                  in
                </button>
                {/* X */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Share on X"
                  className="w-10 h-10 rounded-xl bg-[#0f172a] hover:opacity-90 text-white font-black text-sm flex items-center justify-center shadow-xs cursor-pointer"
                >
                  𝕏
                </button>
                {/* Facebook */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Share on Facebook"
                  className="w-10 h-10 rounded-xl bg-[#1877f2] hover:opacity-90 text-white font-black text-base flex items-center justify-center shadow-xs cursor-pointer"
                >
                  f
                </button>
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Share on WhatsApp"
                  className="w-10 h-10 rounded-xl bg-[#22c55e] hover:opacity-90 text-white flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <MessageCircle size={18} />
                </button>
                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy Link"
                  className="w-10 h-10 rounded-xl bg-[#64748b] hover:opacity-90 text-white flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Link2 size={18} />
                </button>
              </div>
              {copied && (
                <p className="text-[11px] font-bold text-[#16a34a]">✓ Link copied to clipboard!</p>
              )}
            </div>
          </aside>
        </div>

        {/* ── 3. BOTTOM RELATED INSIGHTS & ARTICLES (3 CARDS) ─────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
              Related Insights &amp; Articles
            </h2>
            <Link
              href="/resources"
              className="text-xs font-extrabold text-[#0066cc] hover:underline flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOTTOM_RELATED_CARDS.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <Link
                  key={idx}
                  href={`/blog/${card.slug}`}
                  className="group rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Light Blue Graphic Area */}
                    <div className="relative h-28 bg-gradient-to-b from-[#e8f1ff] to-[#f5f9ff] border-b border-blue-100/60 flex items-center justify-center">
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-white border border-blue-100 text-[#0066cc] text-[9px] font-extrabold uppercase tracking-wider">
                        {card.category}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/90 border border-blue-200/70 text-[#0066cc] flex items-center justify-center shadow-xs mt-3 group-hover:scale-105 transition-transform">
                        <IconComp size={24} />
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-sm sm:text-[15px] font-black text-[#0f172a] group-hover:text-[#0066cc] leading-snug line-clamp-2">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-400" />
                        {card.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        {card.readTime}
                      </span>
                    </div>
                    <span className="text-[#0066cc] font-extrabold group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 4. BOTTOM DARK NAVY CTA BANNER (READY TO ADVANCE YOUR CAREER?) ── */}
        <section className="pb-2">
          <div className="rounded-3xl bg-gradient-to-r from-[#081d42] via-[#0c2d66] to-[#081d42] px-6 py-7 sm:px-10 sm:py-8 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
            {/* Left: Golden Badge + Heading */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#0f172a] flex items-center justify-center shadow-md shrink-0">
                <Award size={34} strokeWidth={2.2} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Ready to Advance Your Career?
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-xl leading-relaxed">
                  Get PMP®-aligned training, expert instruction, and the support you need to pass your exam and grow as a project management professional.
                </p>
              </div>
            </div>

            {/* Right: Find a Course + Talk to an Advisor */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/courses/pmp-certification"
                className="inline-flex items-center gap-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all"
              >
                <span>Find a Course</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-300/40 bg-white/10 hover:bg-white/15 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white transition-all"
              >
                <Headphones size={15} />
                <span>Talk to an Advisor</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
