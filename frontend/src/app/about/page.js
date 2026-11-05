"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Award,
  Users,
  Globe,
  Star,
  ArrowRight,
  TrendingUp,
  Target,
  Eye,
  GraduationCap,
  Calendar,
  BarChart3,
  Headphones,
  ChevronRight,
  ChevronLeft,
  Rocket,
  Cpu,
  Flag,
  Sun
} from "lucide-react";

const CORE_VALUES = [
  {
    title: "Quality Assurance",
    desc: "Industry-aligned content, expert instruction, and high standards.",
    icon: Award,
    iconBg: "bg-blue-50 text-[#0066cc] border-blue-100",
    barColor: "bg-[#0066cc]"
  },
  {
    title: "Student-First Approach",
    desc: "A supportive, flexible, and engaging learning experience focused on your success.",
    icon: Users,
    iconBg: "bg-orange-50 text-[#f97316] border-orange-100",
    barColor: "bg-[#f97316]"
  },
  {
    title: "Guaranteed Results",
    desc: "Proven training methods with a 98.23% average pass rate and ongoing support.",
    icon: BarChart3,
    iconBg: "bg-emerald-50 text-[#16a34a] border-emerald-100",
    barColor: "bg-[#16a34a]"
  },
  {
    title: "Global Reach",
    desc: "Training delivered in 120+ cities worldwide for individuals and enterprise teams.",
    icon: Globe,
    iconBg: "bg-purple-50 text-[#9333ea] border-purple-100",
    barColor: "bg-[#9333ea]"
  }
];

const JOURNEY_MILESTONES = [
  {
    year: "2009",
    title: "Founded",
    desc: "Certification Planner, was established with a mission to deliver high-quality training.",
    icon: Rocket,
    iconStyle: "bg-blue-50 text-[#0066cc] border-blue-200"
  },
  {
    year: "2013",
    title: "PMP® Authorized",
    desc: "Became a PMI® Authorized Training Partner (ATP) to deliver official PMP® training.",
    icon: Users,
    iconStyle: "bg-orange-50 text-[#f97316] border-orange-200"
  },
  {
    year: "2017",
    title: "Global Expansion",
    desc: "Expanded training across multiple industries and international markets with 120+ cities.",
    icon: Globe,
    iconStyle: "bg-emerald-50 text-[#16a34a] border-emerald-200"
  },
  {
    year: "2021",
    title: "50K Milestone",
    desc: "Trained 50,000+ professionals, achieving a 98.23% average pass rate.",
    icon: Users,
    iconStyle: "bg-amber-50 text-[#f97316] border-amber-200"
  },
  {
    year: "2024",
    title: "AI-Powered Learning",
    desc: "Introduced next-generation, AI-enabled learning tools and flexible training formats.",
    icon: Cpu,
    iconStyle: "bg-purple-50 text-[#9333ea] border-purple-200"
  }
];

const LEADERSHIP_TEAM = [
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "Chief Executive Officer",
    bio: "Drives the company’s vision, strategy, and commitment to learner success.",
    avatarStyle: "bg-[#e0ecff] text-[#0066cc]",
    barColor: "bg-[#0066cc]"
  },
  {
    initials: "DI",
    name: "Daniel Irwin",
    role: "Training Head",
    bio: "Leads our global training programs and ensures the highest quality learning experience.",
    avatarStyle: "bg-[#f97316] text-white",
    barColor: "bg-[#f97316]"
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "Director of Operations",
    bio: "Oversees training delivery, learner support, and operational excellence across regions.",
    avatarStyle: "bg-[#dcfce7] text-[#15803d]",
    barColor: "bg-[#16a34a]"
  },
  {
    initials: "DT",
    name: "David Torres",
    role: "Director – Corporate Training",
    bio: "Partners with organizations to design and deliver custom enterprise training solutions.",
    avatarStyle: "bg-[#e9d5ff] text-[#7e22ce]",
    barColor: "bg-[#9333ea]"
  }
];

const ALUMNI_STORIES = [
  {
    initials: "MS",
    name: "Michael S.",
    role: "PMP® Certified",
    quote:
      "Certification Planner’s boot camp was the single best investment I made in my career. Passed PMP® on my first attempt after just 5 days."
  },
  {
    initials: "AK",
    name: "Ayesha K.",
    role: "Lean Six Sigma Black Belt",
    quote:
      "The live online classroom was interactive and practical. The instructor shared real enterprise case studies that helped me pass with confidence."
  },
  {
    initials: "CM",
    name: "Carlos M.",
    role: "CISSP® Certified",
    quote:
      "Outstanding study materials, mock exams, and post-class mentor support. I highly recommend Certification Planner to any working professional."
  }
];

export default function AboutPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? ALUMNI_STORIES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === ALUMNI_STORIES.length - 1 ? 0 : prev + 1));
  };

  const currentStory = ALUMNI_STORIES[activeSlide];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800 text-left flex flex-col justify-between">
      <Navbar />

      {/* ── 1. LIGHT CORPORATE HERO + 5-ITEM STATS STRIP ───────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#f6f9ff] to-[#dbeafe] border-b border-blue-100/80 pt-3 pb-5">
        <div className="pointer-events-none absolute -right-20 -bottom-20 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#0052cc]/20 via-[#f97316]/20 to-transparent blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0066cc] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-700 font-semibold">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#0f172a] text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
                ABOUT CERTIFICATION PLANNER
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0f172a] leading-[1.1]">
                Empowering Careers
                <br />
                <span className="text-[#f97316]">One Certification</span>
                <br />
                at a Time
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                A trusted global training partner since 2009, helping professionals and organizations build in-demand skills, achieve recognized certifications, and advance their careers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all"
                >
                  <span>Explore Certifications</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#0066cc] bg-white hover:bg-blue-50 px-6 py-3 text-xs sm:text-sm font-extrabold text-[#0066cc] transition-all"
                >
                  <Headphones size={15} />
                  <span>Talk to an Advisor</span>
                </Link>
              </div>

              {/* Trustpilot Strip */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-xs bg-[#00b67a] text-white flex items-center justify-center text-[10px]"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-black text-[#0f172a]">4.6/5</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">
                  1,500+ Reviews on <strong className="text-[#0f172a]">★ Trustpilot</strong>
                </span>
              </div>
            </div>

            {/* Right Column (6 Cols): Team Photo + 50,000+ Professionals Trained Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/80 shadow-xl bg-white h-[290px] sm:h-[330px]">
                <img
                  src="/about_us_professionals.jpg"
                  alt="About Certification Planner"
                  className="w-full h-full object-cover object-center"
                />

                {/* Top-Right Blue Pill Badge: 50,000+ Professionals Trained Worldwide */}
                <div className="absolute top-4 right-4 z-20 rounded-full bg-gradient-to-r from-[#0052cc] to-[#003d99] text-white px-5 py-2.5 shadow-xl border border-blue-300/30 flex items-center gap-3">
                  <Users size={26} className="text-blue-100 shrink-0" />
                  <div className="leading-tight">
                    <p className="text-xl sm:text-2xl font-black">50,000+</p>
                    <p className="text-[10px] font-semibold text-blue-100">
                      Professionals Trained
                      <br />
                      Worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Item Stats Strip Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70 overflow-hidden">
            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">98.23%</p>
                <p className="text-[11px] font-medium text-slate-500">Average Pass Rate</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">120+</p>
                <p className="text-[11px] font-medium text-slate-500">Cities Worldwide</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">50,000+</p>
                <p className="text-[11px] font-medium text-slate-500">Professionals Trained</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">15+</p>
                <p className="text-[11px] font-medium text-slate-500">Years of Excellence</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">200+</p>
                <p className="text-[11px] font-medium text-slate-500">Corporate Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OUR MISSION & OUR VISION SPLIT CARDS ────────────────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Card: Our Mission */}
          <div className="relative rounded-3xl border border-blue-200/80 bg-gradient-to-r from-white via-[#f4f9ff] to-[#dceaff] p-6 sm:p-8 shadow-xs overflow-hidden flex items-center justify-between gap-4">
            <div className="space-y-3 max-w-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-200 text-[#f97316] flex items-center justify-center shrink-0 shadow-2xs">
                  <Target size={22} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">Our Mission</h2>
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-700 font-medium leading-relaxed">
                To democratize access to world-class professional training by delivering high-quality, practical, and results-driven certification programs for individuals and organizations across the globe.
              </p>
            </div>

            {/* Mountain + Blue Flag Illustration */}
            <div className="hidden sm:flex flex-col items-center justify-end w-32 h-32 shrink-0 relative">
              <Flag size={24} className="text-[#0066cc] fill-[#0066cc] mb-0.5 ml-3" />
              <div className="w-0 h-0 border-l-[55px] border-l-transparent border-r-[55px] border-r-transparent border-b-[75px] border-b-[#93c5fd]/70" />
            </div>
          </div>

          {/* Right Card: Our Vision */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#071936] via-[#0c2d61] to-[#123d7a] p-6 sm:p-8 shadow-md overflow-hidden flex items-center justify-between gap-4 text-white">
            <div className="space-y-3 max-w-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#0066cc] border border-blue-400/40 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Eye size={22} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Our Vision</h2>
              </div>
              <p className="text-xs sm:text-[13.5px] text-blue-100/90 font-medium leading-relaxed">
                To be a globally recognized leader in professional certification training, empowering a skilled, confident, and future-ready workforce.
              </p>
            </div>

            {/* Sunrise + Mountain Flag Illustration */}
            <div className="hidden sm:flex flex-col items-center justify-end w-32 h-32 shrink-0 relative">
              <div className="relative flex items-center justify-center">
                <Sun size={32} className="text-amber-300 animate-pulse" />
                <Flag size={20} className="text-[#ef4444] fill-[#ef4444] absolute -top-2 right-0" />
              </div>
              <div className="w-0 h-0 border-l-[55px] border-l-transparent border-r-[55px] border-r-transparent border-b-[65px] border-b-blue-400/30 mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR CORE VALUES (4 CARDS IN A ROW) ──────────────────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#dbeafe] text-[#0066cc] text-[10px] font-extrabold uppercase tracking-wider">
            WHAT DRIVES US
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">Our Core Values</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            The principles that guide our training, our people and the learning experience we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_VALUES.map((val) => {
            const IconComp = val.icon;
            return (
              <div
                key={val.title}
                className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="flex items-start gap-3.5 pb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl border ${val.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <IconComp size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-[15px] font-black text-[#0f172a] leading-snug">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{val.desc}</p>
                  </div>
                </div>

                {/* Bottom Colored Accent Bar */}
                <div className={`h-1 w-24 mx-auto rounded-full ${val.barColor} mt-2`} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. 15+ YEARS OF GROWTH (5-STEP HORIZONTAL CARD TIMELINE) ───────── */}
      <section className="bg-gradient-to-b from-[#eef5ff] to-[#f8fafc] border-y border-blue-100/70 py-6">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#dbeafe] text-[#0066cc] text-[10px] font-extrabold uppercase tracking-wider">
              OUR JOURNEY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">15+ Years of Growth</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              A journey of continuous innovation, expanding reach, and creating career opportunities worldwide.
            </p>
          </div>

          {/* Horizontal Timeline Track + 5 Cards */}
          <div className="relative pt-4">
            {/* Horizontal Blue Line with Arrowhead on Desktop */}
            <div className="hidden lg:flex items-center absolute top-9 left-8 right-8 z-0">
              <div className="h-[2.5px] bg-[#0066cc] flex-1" />
              <ArrowRight size={20} className="text-[#0066cc] -ml-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
              {JOURNEY_MILESTONES.map((ms) => {
                const IconComp = ms.icon;
                return (
                  <div key={ms.year} className="flex flex-col items-center">
                    {/* Top Circular Icon Node */}
                    <div
                      className={`w-11 h-11 rounded-full border-2 ${ms.iconStyle} bg-white flex items-center justify-center shadow-sm mb-3`}
                    >
                      <IconComp size={19} />
                    </div>

                    {/* Milestone Card */}
                    <div className="w-full flex-1 rounded-2xl bg-white border border-slate-200/80 p-5 text-center shadow-xs space-y-1.5">
                      <p className="text-lg font-black text-[#0f172a]">{ms.year}</p>
                      <h3 className="text-xs sm:text-[13px] font-extrabold text-[#0f172a]">
                        {ms.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed pt-0.5">
                        {ms.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MEET OUR LEADERSHIP (4 CARDS) ───────────────────────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">Meet Our Leadership</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            A team of experienced professionals committed to your success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERSHIP_TEAM.map((leader) => (
            <div
              key={leader.name}
              className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${leader.avatarStyle} font-black text-sm flex items-center justify-center shrink-0`}
                  >
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0f172a] leading-tight">{leader.name}</h3>
                    <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{leader.role}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">{leader.bio}</p>
              </div>

              <div className={`h-1 w-full rounded-full ${leader.barColor}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. WORDS FROM OUR ALUMNI (DARK BLUE SLIDER BANNER) ─────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="rounded-3xl bg-gradient-to-r from-[#06234d] via-[#0b3570] to-[#06234d] px-6 py-6 sm:px-10 sm:py-7 text-white text-center space-y-4 shadow-lg relative">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Words from Our Alumni</h2>
            <p className="text-xs sm:text-sm text-blue-100/85 font-medium">
              Hear from professionals who advanced their careers with Certification Planner.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex items-center gap-4">
            {/* Left Slider Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="hidden sm:flex w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white items-center justify-center shrink-0 cursor-pointer transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Inner Frosted Quote Box */}
            <div className="flex-1 rounded-2xl bg-white/10 border border-white/20 px-6 py-6 sm:px-10 space-y-4 backdrop-blur-xs">
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                <span className="text-xl font-black text-blue-200 mr-1">“</span>
                “{currentStory.quote}”
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-[#f97316] text-white text-xs font-black flex items-center justify-center">
                  {currentStory.initials}
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-black text-white">{currentStory.name}</p>
                  <p className="text-[10px] text-blue-200 font-semibold">{currentStory.role}</p>
                </div>
                <div className="flex items-center gap-0.5 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#fbbf24] text-[#fbbf24]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Slider Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="hidden sm:flex w-9 h-9 rounded-full bg-white text-[#0f172a] hover:bg-blue-50 items-center justify-center shrink-0 cursor-pointer transition-colors shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Slider Indicator Dots */}
          <div className="flex items-center justify-center gap-2">
            {ALUMNI_STORIES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx ? "w-6 bg-[#f97316]" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. AUTHORIZED & PARTNERED WITH (7 PARTNER LOGOS) ───────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3 text-center">
        <h3 className="text-sm sm:text-base font-black text-[#0f172a]">
          Authorized &amp; Partnered With
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-xs font-black text-[#0066cc]">PMI®</span>
            <span className="text-[9px] font-bold text-slate-500">Authorized Training Partner</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex items-center justify-center gap-1.5 shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-[#6d28d9] text-white text-[9px] font-black flex items-center justify-center">
              Q
            </span>
            <span className="text-xs font-black text-slate-700">AXELOS®</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex items-center justify-center shadow-2xs">
            <span className="text-xs font-black text-[#15803d]">(ISC)²®</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex flex-col items-center justify-center shadow-2xs">
            <span className="text-xs font-black text-[#0f172a]">aws</span>
            <span className="text-[9px] font-bold text-[#f97316]">Training Partner</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex items-center justify-center shadow-2xs">
            <span className="text-xs font-black text-[#dc2626]">CompTIA®</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex items-center justify-center shadow-2xs">
            <span className="text-xs font-black text-[#0284c7]">ScrumAlliance®</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 flex items-center justify-center shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-xs font-black text-[#0f172a]">IASSC®</span>
          </div>
        </div>
      </section>

      {/* ── 8. BOTTOM DARK NAVY CTA BANNER ────────────────────────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#071936] via-[#0c2d66] to-[#071936] px-6 py-7 sm:px-10 sm:py-8 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-[#fbbf24] flex items-center justify-center shrink-0">
              <TrendingUp size={30} strokeWidth={2.4} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Ready to Level Up Your Career?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium max-w-xl leading-relaxed">
                Explore our certification programs or speak with a training advisor to find the right path for your goals.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all"
            >
              <span>Explore Certifications</span>
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

      <Footer />
    </div>
  );
}
