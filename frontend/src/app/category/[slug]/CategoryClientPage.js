"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import ConsultationModal from "@/components/ConsultationModal";
import Link from "next/link";
import { 
  Star, 
  ArrowRight, 
  Check, 
  Award, 
  ShieldCheck, 
  Users, 
  Clock, 
  Calendar, 
  Download, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Target, 
  Briefcase
} from "lucide-react";

import initialCategories from "@/data/categories_db.json";
import initialCourses from "@/data/courses_db.json";
import initialSchedules from "@/data/schedules_db.json";

function findCategory(cats, slug) {
  if (!cats || cats.length === 0) return null;
  const s = (slug || "").toLowerCase().trim();

  // Exact slug match
  let found = cats.find(c => c.slug && c.slug.toLowerCase() === s);
  if (found) return found;

  // Normalized name match
  found = cats.find(c => c.name && c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === s);
  if (found) return found;

  // Keyword aliases
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
  const [siteSettings, setSiteSettings] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTitle, setConsultationTitle] = useState("Book a Free Consultation");

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
        if (setRes) {
          setSiteSettings(setRes);
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
    // 1. By ID match
    if (category?.id && c.category_id === category.id) return true;
    
    // 2. By category_slug match
    if (category?.slug && c.category_slug === category.slug) return true;

    // 3. By Category Name substring
    const cCat = (c.category_name || (c.category && c.category.name) || "").toLowerCase();
    const catNameLower = (categoryName || "").toLowerCase();
    if (cCat && catNameLower && (cCat.includes(catNameLower) || catNameLower.includes(cCat))) return true;

    // 4. Keyword matching
    if (catNameLower.includes("six sigma") && cCat.includes("six sigma")) return true;
    if (catNameLower.includes("security") && cCat.includes("security")) return true;
    if (catNameLower.includes("devops") && (cCat.includes("devops") || cCat.includes("salesforce"))) return true;
    if (catNameLower.includes("project") && (cCat.includes("project") || cCat.includes("agile"))) return true;
    if (catNameLower.includes("service") && (cCat.includes("service") || cCat.includes("itil"))) return true;

    return false;
  });

  // Display courses: if matched, show them; otherwise fallback to top courses
  const displayCourses = categoryCourses.length > 0 ? categoryCourses : courses.slice(0, 8);

  // Helper: find upcoming schedule for a course
  const getNextClassDate = (courseId, courseTitle) => {
    const match = schedules.find(s => 
      (s.course_id && s.course_id === courseId) || 
      (s.course_title && s.course_title.toLowerCase().includes(courseTitle.toLowerCase()))
    );
    if (match && match.start_date) {
      const d = new Date(match.start_date);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    return "Next Cohort Starting Soon";
  };

  const openModalWithTitle = (title) => {
    setConsultationTitle(title);
    setIsConsultationOpen(true);
  };

  // Dynamic Content & Fallbacks
  const heroTitle = meta.hero_title || `${categoryName} Certifications`;
  const heroSubtitle = meta.hero_subtitle || category?.description || 
    "Gain the credentials, enterprise frameworks, and practical confidence to lead critical initiatives, empower high-performing teams, and accelerate your career.";
  const avgSalaryLabel = meta.avg_salary_label || (category?.avg_salary ? `${category.avg_salary} Average Salary` : "$120,000+ Average Salary");
  const jobGrowth = meta.job_growth || "30%+ Industry Growth";

  // Career Path Milestones
  const careerPath = Array.isArray(meta.career_path) && meta.career_path.length > 0 
    ? meta.career_path 
    : displayCourses.slice(0, 5).map((c, i) => ({
        role: i === 0 ? "Entry Level" : (i === 1 ? "Practitioner" : (i === 2 ? "Professional" : "Leadership")),
        level: i === 0 ? "Beginner" : (i < 3 ? "Intermediate" : "Advanced"),
        course_name: c.title.split(' ')[0],
        avg_salary: `$${90 + i * 15},000+`,
        url: `/courses/${c.slug}`,
        is_highlight: i === 1 || i === 2
      }));

  // Why Learn points
  const whyLearnPoints = Array.isArray(meta.why_learn_points) && meta.why_learn_points.length > 0
    ? meta.why_learn_points
    : [
        `High global demand for certified ${categoryName} professionals across Fortune 500s`,
        "Deliver projects and transformation programs with proven enterprise methodologies",
        "Significant salary boost and immediate qualification for senior leadership roles",
        "Build deep hands-on expertise with accredited courseware and real case simulations",
        "100% Exam Pass Support with live coaching until you clear your certification"
      ];

  // Testimonials
  const testimonials = Array.isArray(meta.testimonials) && meta.testimonials.length > 0
    ? meta.testimonials
    : [
        {
          name: "Michael R.",
          badge: "Certified Leader",
          role: "Senior Lead",
          location: "Dallas, TX",
          tag: "Promoted",
          quote: "The boot camp training gave me exactly what I needed to pass on my first try. High ROI for my career!"
        },
        {
          name: "Sarah K.",
          badge: "Accredited Specialist",
          role: "Enterprise Consultant",
          location: "Chicago, IL",
          tag: "Salary Hike 35%",
          quote: "Incredible instructors with real enterprise case studies. Highly recommended training!"
        }
      ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      <Navbar siteSettings={siteSettings} />

      {/* Top Breadcrumb Strip */}
      <div className="bg-white border-b border-slate-100 py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/courses" className="hover:text-brand-blue transition-colors">Certifications</Link>
          <ChevronRight size={14} />
          <span className="text-slate-700 font-bold capitalize">{categoryName}</span>
        </div>
      </div>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative bg-gradient-to-b from-white via-blue-50/30 to-white pt-10 pb-16 px-4 md:px-6 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#0066FF]">{heroTitle.split(" ").slice(-1)}</span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              {heroSubtitle}
            </p>

            {/* 3 Core Value Badges */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pass Rate</div>
                  <div className="text-xs font-black text-slate-900">99.2% First Attempt</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="p-2 rounded-lg bg-blue-50 text-[#0066FF] shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg. Salary</div>
                  <div className="text-xs font-black text-slate-900">{avgSalaryLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accredited</div>
                  <div className="text-xs font-black text-slate-900">Official Partner</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#popular-certifications"
                className="px-7 py-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 font-bold text-white text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                Explore {displayCourses.length} Certifications <ArrowRight size={14} />
              </a>

              <button
                onClick={() => openModalWithTitle(`Talk to ${categoryName} Learning Advisor`)}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 font-bold text-slate-700 text-xs border border-slate-200 shadow-xs transition-colors"
              >
                Talk to an Advisor
              </button>
            </div>
          </div>

          {/* Right Column: Statistics & Highlights Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl bg-slate-900 p-8 text-white shadow-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">Industry Outlook</span>
                  <h3 className="text-xl font-black">{categoryName}</h3>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  High Demand
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                  <div className="text-2xl font-black text-brand-orange">{jobGrowth}</div>
                  <div className="text-xs text-slate-300 font-medium">Job Growth Rate</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                  <div className="text-2xl font-black text-white">{displayCourses.length}+</div>
                  <div className="text-xs text-slate-300 font-medium">Active Programs</div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Guaranteed-to-run live online boot camps</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Official courseware, mock questions &amp; LMS access</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>100% Exam Pass Support with dedicated mentors</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: CAREER ROADMAP PATH */}
      <section className="py-16 px-4 md:px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Step-By-Step Progression</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {categoryName} Career Roadmap
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              A structured credential pathway designed to take you from foundational basics to enterprise executive leadership.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {careerPath.map((step, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border transition-all text-center space-y-3 relative ${
                  step.is_highlight 
                    ? "bg-blue-50/50 border-[#0066FF] shadow-sm" 
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-black text-xs mx-auto flex items-center justify-center">
                  {idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{step.level}</span>
                  <h4 className="text-sm font-black text-slate-900">{step.course_name}</h4>
                </div>
                <div className="text-xs font-extrabold text-[#0066FF]">{step.avg_salary}</div>
                <Link
                  href={step.url || "/courses"}
                  className="block text-[11px] font-bold text-slate-600 hover:text-[#0066FF] transition-colors pt-1"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CERTIFICATION CARDS GRID */}
      <section id="popular-certifications" className="py-16 px-4 md:px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">All Programs</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Available {categoryName} Certifications ({displayCourses.length})
              </h2>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              Showing accredited certification courses
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses.map((c, idx) => {
              const nextDate = getNextClassDate(c.id, c.title);
              return (
                <div 
                  key={c.id || idx}
                  className="group rounded-3xl bg-white border border-slate-200/80 hover:border-[#0066FF] shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Top: Category & Rating */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF]">
                        {c.badge || "Accredited"}
                      </span>
                      <div className="flex items-center gap-1 font-bold text-slate-700">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span>{c.rating || "4.9"}</span>
                        <span className="text-slate-400 font-medium">({c.reviews_count || "850"})</span>
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    {/* Format & Pricing */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Live Online</div>
                        <div className="text-lg font-black text-slate-900">${c.price || 1295} <span className="text-[10px] text-slate-400 font-normal">USD</span></div>
                      </div>
                      {c.original_price && c.original_price > c.price && (
                        <div className="text-xs text-slate-400 line-through">
                          ${c.original_price} USD
                        </div>
                      )}
                    </div>

                    {/* Next Class Schedule Pill */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <Calendar size={14} className="text-[#0066FF]" />
                      <span className="font-semibold">Cohort: <strong className="text-slate-900 font-bold">{nextDate}</strong></span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-6">
                    <Link
                      href={`/courses/${c.slug || c.id}`}
                      className="w-full py-3 px-4 rounded-xl bg-white group-hover:bg-[#0066FF] text-[#0066FF] group-hover:text-white font-bold text-xs border border-[#0066FF] transition-all flex items-center justify-center gap-2"
                    >
                      View Details &amp; Syllabus <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY LEARN THIS CATEGORY? */}
      <section className="py-16 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">Value Proposition</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Why Get Certified in {categoryName}?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyLearnPoints.map((point, pidx) => (
              <div key={pidx} className="flex items-start gap-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PreFooter & Footer */}
      <PreFooter />
      <Footer siteSettings={siteSettings} />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultSubject={consultationTitle}
      />
    </div>
  );
}
