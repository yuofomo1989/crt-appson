"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import ConsultationModal from "@/components/ConsultationModal";
import Link from "next/link";
import Image from "next/image";
import { 
  Star, 
  ArrowRight, 
  Check, 
  Award, 
  ShieldCheck, 
  Users, 
  Clock, 
  Phone, 
  Calendar, 
  Download, 
  TrendingUp, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Lightbulb, 
  Target, 
  Rocket, 
  BookOpen, 
  Briefcase, 
  Layers 
} from "lucide-react";

import initialCategories from "@/data/categories_db.json";
import initialCourses from "@/data/courses_db.json";
import initialSchedules from "@/data/schedules_db.json";

export default function CategoryClientPage({ slug }) {
  const preloadedCat = (initialCategories || []).find(
    c => (c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug
  ) || { name: slug.replace(/-/g, " ").toUpperCase() };

  const [category, setCategory] = useState(preloadedCat);
  const [courses, setCourses] = useState(initialCourses || []);
  const [schedules, setSchedules] = useState(initialSchedules || []);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTitle, setConsultationTitle] = useState("Book a Free Consultation");

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [catRes, cRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/categories`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/courses`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/schedules`).then(r => r.json()).catch(() => ({}))
        ]);

        if (catRes && catRes.status === "success" && catRes.data) {
          const found = catRes.data.find(
            c => (c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug
          );
          if (found) setCategory(found);
        }
        if (cRes && cRes.status === "success" && Array.isArray(cRes.data)) {
          setCourses(cRes.data);
        }
        if (sRes && sRes.status === "success" && Array.isArray(sRes.data)) {
          setSchedules(sRes.data);
        }
      } catch (err) {
        // Safe fallback to preloaded state
      }
    }
    fetchData();
  }, [slug]);

  const categoryName = category?.name || slug.replace(/-/g, " ");
  const meta = category?.metadata || {};

  // Extract Category specific courses
  const categoryCourses = courses.filter(c => {
    const cCat = (c.category_name || c.category || "").toLowerCase();
    const target = slug.replace(/-/g, " ").toLowerCase();
    return cCat.includes(target) || target.includes(cCat);
  });

  // Display courses: if no direct category match, show top courses as fallback
  const displayCourses = categoryCourses.length > 0 ? categoryCourses : courses.slice(0, 6);

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
    return "May 27, 2026";
  };

  const openModalWithTitle = (title) => {
    setConsultationTitle(title);
    setIsConsultationOpen(true);
  };

  // Dynamic Content & Fallbacks
  const heroTitle = meta.hero_title || `${categoryName} Certifications`;
  const heroSubtitle = meta.hero_subtitle || category?.description || 
    "Gain the skills, tools, and confidence to lead projects, empower teams, and deliver results that matter.";
  const avgSalaryLabel = meta.avg_salary_label || (category?.avg_salary ? `${category.avg_salary} Average` : "$120,000+ Average Salary");
  const jobGrowth = meta.job_growth || "33% (2024-2030)";

  // Career Path Milestones
  const careerPath = Array.isArray(meta.career_path) && meta.career_path.length > 0 
    ? meta.career_path 
    : [
        { role: "Getting Started", level: "Beginner", course_name: "CAPM®", avg_salary: "$75,000", url: "/courses/capm-certification", is_highlight: false },
        { role: "Scrum Master", level: "Beginner – Mid Level", course_name: "CSM®", avg_salary: "$110,000", url: "/courses", is_highlight: false },
        { role: "Project Manager", level: "Mid Level", course_name: "PMP®", avg_salary: "$120,000+", url: "/courses/pmp-certification", is_highlight: true },
        { role: "Agile Practitioner", level: "Mid – Advanced", course_name: "PMI-ACP®", avg_salary: "$130,000+", url: "/courses/pmi-acp-certification", is_highlight: false },
        { role: "Enterprise Agile", level: "Advanced", course_name: "SAFe® Agilist", avg_salary: "$125,000+", url: "/courses", is_highlight: false },
        { role: "Agile Leader", level: "Advanced", course_name: "AgilePM®", avg_salary: "$115,000+", url: "/courses", is_highlight: false }
      ];

  // Why Learn points & spokes
  const whyLearnPoints = Array.isArray(meta.why_learn_points) && meta.why_learn_points.length > 0
    ? meta.why_learn_points
    : [
        `High demand for certified ${categoryName} professionals worldwide`,
        "Better project outcomes with proven enterprise frameworks and methodologies",
        "Significant salary boost and immediate promotion opportunities",
        "Build foundational leadership, communication & risk-management skills",
        "Applicable across all industries – IT, Healthcare, Finance, Telecom & Government"
      ];

  // Testimonials
  const testimonials = Array.isArray(meta.testimonials) && meta.testimonials.length > 0
    ? meta.testimonials
    : [
        {
          name: "Rahul S.",
          badge: "PMI® Certified",
          role: "Project Manager",
          location: "Texas, USA",
          tag: "Promoted",
          quote: "Certification Planner's training and study support helped me clear PMP® on my very first attempt."
        },
        {
          name: "Priya M.",
          badge: "PMI-ACP® Certified",
          role: "Agile Coach",
          location: "Ontario, Canada",
          tag: "Salary Hike 35%",
          quote: "The hands-on bootcamp approach and experienced industry instructors made all the difference."
        },
        {
          name: "James T.",
          badge: "CSM® Certified",
          role: "Scrum Master",
          location: "Sydney, Australia",
          tag: "New Role",
          quote: "Great training session, practical enterprise examples, and outstanding dedicated exam assistance."
        },
        {
          name: "Sneha K.",
          badge: "SAFe® Agilist Certified",
          role: "Program Manager",
          location: "Bangalore, India",
          tag: "Career Growth",
          quote: "I now lead cross-functional agile transformations in my enterprise organization with total confidence."
        }
      ];

  // Comparison Table
  const comparisonTable = Array.isArray(meta.comparison_table) && meta.comparison_table.length > 0
    ? meta.comparison_table
    : [
        { name: "PMP®", best_for: "Experienced Project Managers", level: "Advanced", benefits: "Industry recognition, career growth, higher salary", avg_salary: "$120,000+", slug: "pmp-certification" },
        { name: "CAPM®", best_for: "Aspiring Project Managers", level: "Beginner", benefits: "Validate your skills, kickstart management career", avg_salary: "$75,000+", slug: "capm-certification" },
        { name: "PMI-ACP®", best_for: "Agile Practitioners", level: "Mid – Advanced", benefits: "Prove your agile expertise, better leadership roles", avg_salary: "$130,000+", slug: "pmi-acp-certification" },
        { name: "CSM®", best_for: "Scrum Team Members & Leaders", level: "Beginner – Mid", benefits: "Master the Scrum framework, improve performance", avg_salary: "$110,000+", slug: "csm-certification" },
        { name: "SAFe® Agilist", best_for: "Agile Leaders & Directors", level: "Advanced", benefits: "Lead enterprise scaled agile transformations", avg_salary: "$125,000+", slug: "safe-agilist-certification" }
      ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      <Navbar />

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
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">Live Instructor-Led</div>
                  <div className="text-[10px] text-slate-500 font-medium">Interactive Training</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">Guaranteed-to-Run</div>
                  <div className="text-[10px] text-slate-500 font-medium">100% Confirmed Classes</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <div className="h-8 w-8 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">Pass Assurance</div>
                  <div className="text-[10px] text-slate-500 font-medium">We've Got Your Back</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#popular-certifications"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#E56000] text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                Explore Certifications <ArrowRight size={16} />
              </a>

              <button
                onClick={() => openModalWithTitle(`Talk to a ${categoryName} Advisor`)}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-all hover:border-slate-300 cursor-pointer"
              >
                <Phone size={16} className="text-[#0066FF]" /> Talk to an Advisor
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                  alt={`${categoryName} Training Classroom`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Live Class Badge overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Live Virtual Class In Session</span>
                </div>
              </div>

              {/* Floating Card: Average Salary & Job Growth */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-4 z-20">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-black">
                  <TrendingUp size={24} />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Average Salary</div>
                  <div className="text-lg font-black text-slate-900">{avgSalaryLabel}</div>
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <span>↗ Job Growth: {jobGrowth}</span>
                  </div>
                </div>
              </div>

              {/* Floating Card: Authorized Partner */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-20">
                <div className="h-9 w-9 rounded-xl bg-brand-navy text-white font-bold flex items-center justify-center text-xs">
                  PMI
                </div>
                <div className="text-left pr-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Authorized Partner</div>
                  <div className="text-xs font-black text-slate-900">Project Management Institute</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Hero Trust Strip Bar */}
        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <Star size={20} className="text-amber-400 fill-amber-400" />
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">{meta.rating || "4.8/5"}</div>
              <div className="text-[11px] text-slate-500 font-medium">Student Rating</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <div className="text-brand-blue font-bold">🌐</div>
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">{meta.countries_count || "100+"}</div>
              <div className="text-[11px] text-slate-500 font-medium">Countries Delivered</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <Users size={20} className="text-brand-orange" />
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">{meta.professionals_count || "50,000+"}</div>
              <div className="text-[11px] text-slate-500 font-medium">Professionals Trained</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <Award size={20} className="text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">{meta.experience_years || "20+ Years"}</div>
              <div className="text-[11px] text-slate-500 font-medium">Of Training Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPLORE YOUR CAREER PATH */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              Explore Your <span className="text-[#0066FF]">Career Path</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl mx-auto">
              From beginner to advanced, find the right certification for your career goals and income trajectory.
            </p>
          </div>

          {/* Career Path Horizontal Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
            {careerPath.map((step, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 transition-all flex flex-col justify-between relative ${
                  step.is_highlight
                    ? "bg-white border-2 border-[#FF6B00] shadow-xl shadow-orange-500/10 scale-[1.03]"
                    : "bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {step.is_highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-black uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div className="space-y-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    step.is_highlight ? "bg-orange-50 text-[#FF6B00]" : "bg-blue-50 text-[#0066FF]"
                  }`}>
                    {idx === 0 && <Lightbulb size={20} />}
                    {idx === 1 && <Users size={20} />}
                    {idx === 2 && <Briefcase size={20} />}
                    {idx === 3 && <Rocket size={20} />}
                    {idx === 4 && <Building2 size={20} />}
                    {idx >= 5 && <Target size={20} />}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-900">{step.role}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{step.level}</div>
                  </div>

                  <div className="pt-1">
                    <div className={`text-base font-black ${step.is_highlight ? "text-[#FF6B00]" : "text-slate-900"}`}>
                      {step.course_name}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      Avg. Salary: <span className="font-bold text-slate-700">{step.avg_salary}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-4">
                  <Link
                    href={step.url || "/courses"}
                    className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
                      step.is_highlight ? "text-[#FF6B00] hover:text-[#E56000]" : "text-[#0066FF] hover:underline"
                    }`}
                  >
                    View Path <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#popular-certifications"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:underline"
            >
              View All {categoryName} Certifications <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: POPULAR CERTIFICATIONS GRID */}
      <section id="popular-certifications" className="py-16 px-4 md:px-6 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 text-left">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Popular <span className="text-[#0066FF]">{categoryName}</span> Certifications
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                Live bootcamps with 100% pass assurance, authorized courseware, and dedicated mentorship.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:underline shrink-0"
            >
              View All Certifications <ArrowRight size={14} />
            </Link>
          </div>

          {/* Courses Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {displayCourses.map((c, idx) => {
              const nextDate = getNextClassDate(c.id, c.title || c.name);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header with Provider Logo & Level */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-[11px] font-bold border border-blue-100">
                        {c.provider || "PMI® Authorized"}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {c.level || "Beginner – Advanced"}
                      </span>
                    </div>

                    {/* Course Title */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug">
                        {c.title || c.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1.5">
                        {c.short_description || c.description || "Industry-recognized training designed for first-attempt exam pass guarantee."}
                      </p>
                    </div>

                    {/* Salary & Level Tags */}
                    <div className="flex items-center gap-4 py-2 border-y border-slate-100 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Level</div>
                        <div className="font-bold text-slate-800">{c.level || "Advanced"}</div>
                      </div>
                      <div className="border-l border-slate-100 pl-4">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Avg. Salary</div>
                        <div className="font-bold text-emerald-600">{c.avg_salary || "$120,000+"}</div>
                      </div>
                    </div>

                    {/* Next Class Schedule Pill */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <Calendar size={14} className="text-[#0066FF]" />
                      <span className="font-semibold">Next Class: <strong className="text-slate-900 font-bold">{nextDate}</strong></span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-6">
                    <Link
                      href={`/courses/${c.slug || c.id}`}
                      className="w-full py-3 px-4 rounded-xl bg-white group-hover:bg-[#0066FF] text-[#0066FF] group-hover:text-white font-bold text-xs border border-[#0066FF] transition-all flex items-center justify-center gap-2"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY LEARN THIS CATEGORY? */}
      <section className="py-20 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Circular Interactive Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-8">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border-2 border-dashed border-blue-200 flex items-center justify-center">
              
              {/* Central Circle */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#0066FF] to-blue-400 p-1 shadow-2xl z-10 flex flex-col items-center justify-center text-center text-white p-3">
                <Award size={28} className="text-white mb-1" />
                <span className="text-xs font-black uppercase tracking-tight">Certified Leader</span>
                <span className="text-[10px] text-blue-100 font-medium">Enterprise Proven</span>
              </div>

              {/* Orbiting Satellite Points */}
              <div className="absolute -top-4 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#0066FF]" /> In-Demand Skills
              </div>

              <div className="absolute -bottom-4 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-600" /> High Earning Potential
              </div>

              <div className="absolute -left-6 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Rocket size={14} className="text-[#FF6B00]" /> Fast Delivery
              </div>

              <div className="absolute -right-6 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-md text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-purple-600" /> Global Recognition
              </div>
            </div>
          </div>

          {/* Right Side: Benefits Bullets & Guide Download */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-black uppercase tracking-wider">
                Career Advantages
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Why Learn <span className="text-[#0066FF]">{categoryName}</span>?
              </h2>
            </div>

            {/* Bullets List */}
            <div className="space-y-3.5 pt-2">
              {whyLearnPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Download Guide Button */}
            <div className="pt-4">
              <button
                onClick={() => openModalWithTitle(`Download ${categoryName} Career Guide & Syllabus`)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Download size={16} /> Download {categoryName} Career Guide
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: REAL STORIES. REAL SUCCESS. (TESTIMONIALS) */}
      <section className="py-16 px-4 md:px-6 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div className="text-left space-y-1">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                Real Stories. <span className="text-[#FF6B00]">Real Success.</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                Hear directly from professionals who transformed their careers with our authorized bootcamps.
              </p>
            </div>
            <button
              onClick={() => openModalWithTitle("Speak with Student Advisors")}
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline"
            >
              View More Success Stories <ArrowRight size={14} />
            </button>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold flex items-center justify-center text-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-blue-600 font-semibold">{item.badge}</div>
                      </div>
                    </div>
                    <div className="text-[#0A66C2]">
                      <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.role}</div>
                    <div className="text-[10px] text-slate-400">{item.location}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPARE TOP CERTIFICATIONS */}
      <section className="py-16 px-4 md:px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-left space-y-2">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              Compare Top <span className="text-[#0066FF]">{categoryName}</span> Certifications
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Analyze credential requirements, salary outcomes, and career benefits side-by-side.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="p-4 pl-6">Certification</th>
                    <th className="p-4">Best For</th>
                    <th className="p-4">Experience Level</th>
                    <th className="p-4">Key Benefits</th>
                    <th className="p-4">Avg. Salary</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 pl-6 font-black text-slate-900 text-sm">
                        {row.name}
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{row.best_for}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {row.level}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium max-w-xs">{row.benefits}</td>
                      <td className="p-4 font-black text-emerald-600 text-sm">{row.avg_salary}</td>
                      <td className="p-4 pr-6 text-right">
                        <Link
                          href={`/courses/${row.slug || "pmp-certification"}`}
                          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CORPORATE TRAINING SOLUTIONS BANNER */}
      <section className="py-16 px-4 md:px-6 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#001E3D] via-slate-900 to-[#001E3D] p-8 md:p-12 text-white shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                Corporate Training Solutions
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                Empower your teams with customized {categoryName} training that drives measurable enterprise results.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#FF6B00]" /> On-site, Virtual & Blended</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#FF6B00]" /> Custom Learning Paths</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#FF6B00]" /> Enterprise Volume Discounts</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#FF6B00]" /> Dedicated Account Manager</span>
              </div>

              {/* Trusted Logos Strip */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                  Trusted by Global Enterprises
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm font-black text-slate-400 tracking-wider">
                  <span>DELOITTE</span>
                  <span>INTEL</span>
                  <span>IBM</span>
                  <span>CITI</span>
                  <span>AMAZON</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3 w-full max-w-xs">
                <div className="text-sm font-bold text-white">Train Your Entire Team</div>
                <p className="text-[11px] text-slate-300">Boost team productivity and meet compliance deadlines.</p>
                <button
                  onClick={() => openModalWithTitle(`Corporate ${categoryName} Training Quote`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E56000] text-white font-black text-xs transition-all shadow-lg shadow-orange-500/30 cursor-pointer"
                >
                  Get Corporate Training Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PreFooter Call-to-Action */}
      <PreFooter />

      {/* Site Footer */}
      <Footer />

      {/* Consultation & Guide Download Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        title={consultationTitle}
        leadSource={`Category Landing Page (${categoryName})`}
      />
    </div>
  );
}
