"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import { useModal } from "@/context/ModalContext";
import {
  Star,
  Shield,
  Video,
  CheckCircle2,
  Phone,
  ArrowRight,
  Download,
  Award,
  ChevronRight,
  Building2,
  Users,
  TrendingUp,
  Globe,
  Briefcase,
  Sparkles,
  Check
} from "lucide-react";

const careerPaths = [
  {
    icon: "💡",
    title: "Getting Started",
    level: "Beginner",
    cert: "CAPM®",
    salary: "$75,000",
    color: "border-blue-100 bg-blue-50/50 hover:border-brand-blue",
    btnColor: "border-blue-200 text-brand-blue hover:bg-brand-blue hover:text-white",
    slug: "capm-certification"
  },
  {
    icon: "👥",
    title: "Scrum Master",
    level: "Beginner – Mid Level",
    cert: "CSM®",
    salary: "$110,000",
    color: "border-emerald-100 bg-emerald-50/50 hover:border-emerald-500",
    btnColor: "border-emerald-200 text-emerald-600 hover:bg-emerald-600 hover:text-white",
    slug: "csm-certification"
  },
  {
    icon: "📈",
    title: "Project Manager",
    level: "Mid Level",
    cert: "PMP®",
    salary: "$120,000+",
    color: "border-amber-100 bg-amber-50/50 hover:border-amber-500",
    btnColor: "border-amber-200 text-amber-600 hover:bg-amber-500 hover:text-white",
    slug: "pmp-certification"
  },
  {
    icon: "🚀",
    title: "Agile Practitioner",
    level: "Mid – Advanced",
    cert: "PMI-ACP®",
    salary: "$130,000+",
    color: "border-purple-100 bg-purple-50/50 hover:border-purple-500",
    btnColor: "border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white",
    slug: "pmi-acp-certification"
  },
  {
    icon: "🏛️",
    title: "Enterprise Agile",
    level: "Advanced",
    cert: "SAFe® Agilist",
    salary: "$125,000+",
    color: "border-indigo-100 bg-indigo-50/50 hover:border-indigo-500",
    btnColor: "border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white",
    slug: "safe-agilist-certification"
  },
  {
    icon: "🎯",
    title: "Agile Leader",
    level: "Advanced",
    cert: "AgilePM®",
    salary: "$115,000+",
    color: "border-cyan-100 bg-cyan-50/50 hover:border-cyan-500",
    btnColor: "border-cyan-200 text-cyan-600 hover:bg-cyan-600 hover:text-white",
    slug: "agilepm-certification"
  }
];

const popularCourses = [
  {
    title: "PMP®",
    fullName: "PMP® Certification",
    badge: "PMI®",
    badgeColor: "bg-blue-100 text-brand-navy border-blue-200",
    desc: "Globally recognized certification for experienced project managers.",
    level: "Advanced",
    salary: "$120,000+",
    nextClass: "May 27, 2024",
    slug: "pmp-certification"
  },
  {
    title: "CAPM®",
    fullName: "CAPM® Certification",
    badge: "PMI®",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    desc: "Ideal for project management professionals who are just getting started.",
    level: "Beginner",
    salary: "$75,000+",
    nextClass: "May 30, 2024",
    slug: "capm-certification"
  },
  {
    title: "PMI-ACP®",
    fullName: "PMI-ACP® Certification",
    badge: "PMI®",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    desc: "Advance your agile career with this in-demand certification.",
    level: "Mid - Advanced",
    salary: "$130,000+",
    nextClass: "Jun 03, 2024",
    slug: "pmi-acp-certification"
  },
  {
    title: "CSM®",
    fullName: "Certified ScrumMaster®",
    badge: "CSM®",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    desc: "Master the Scrum framework and become a more effective leader.",
    level: "Beginner - Mid",
    salary: "$110,000+",
    nextClass: "May 28, 2024",
    slug: "csm-certification"
  },
  {
    title: "SAFe® Agilist",
    fullName: "SAFe® 6.0 Agilist",
    badge: "SAFe®",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    desc: "Lead enterprise agility transformations at scale.",
    level: "Advanced",
    salary: "$125,000+",
    nextClass: "Jun 05, 2024",
    slug: "safe-agilist-certification"
  }
];

const testimonials = [
  {
    name: "Rahul S.",
    role: "Project Manager",
    location: "Texas, USA",
    cert: "PMP® Certified",
    quote: "Certification-Planner's training and support helped me clear PMP® on my first attempt.",
    badge: "Promoted",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    name: "Priya M.",
    role: "Agile Coach",
    location: "Ontario, Canada",
    cert: "PMI-ACP® Certified",
    quote: "The hands-on approach and experienced instructors made all the difference.",
    badge: "Salary Hike 35%",
    badgeBg: "bg-blue-50 text-brand-blue border-blue-200"
  },
  {
    name: "James T.",
    role: "Scrum Master",
    location: "Sydney, Australia",
    cert: "CSM® Certified",
    quote: "Great training, practical examples, and excellent instructor support.",
    badge: "New Role",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    name: "Sneha K.",
    role: "Program Manager",
    location: "Bangalore, India",
    cert: "SAFe® Agilist Certified",
    quote: "I now lead agile transformations in my organization with confidence.",
    badge: "Career Growth",
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200"
  }
];

const comparisonData = [
  {
    cert: "PMP®",
    bestFor: "Experienced Project Managers",
    level: "Advanced",
    benefits: "Industry-recognition, career growth, higher earning potential",
    salary: "$120,000+",
    slug: "pmp-certification"
  },
  {
    cert: "CAPM®",
    bestFor: "Aspiring Project Managers",
    level: "Beginner",
    benefits: "Validate your skills, start your project management career",
    salary: "$75,000+",
    slug: "capm-certification"
  },
  {
    cert: "PMI-ACP®",
    bestFor: "Agile Practitioners",
    level: "Mid - Advanced",
    benefits: "Prove your agile expertise, better opportunities",
    salary: "$130,000+",
    slug: "pmi-acp-certification"
  },
  {
    cert: "CSM®",
    bestFor: "Scrum Team Members & Leaders",
    level: "Beginner - Mid",
    benefits: "Deep understanding of Scrum, improve team performance",
    salary: "$110,000+",
    slug: "csm-certification"
  },
  {
    cert: "SAFe® Agilist",
    bestFor: "Agile Leaders & Managers",
    level: "Advanced",
    benefits: "Lead enterprise agile transformations at scale",
    salary: "$125,000+",
    slug: "safe-agilist-certification"
  }
];

export default function AgileCategoryPage() {
  const { openConsultationModal } = useModal();
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      <Navbar />

      <main className="flex-1 w-full space-y-16 lg:space-y-24 pb-16">
        
        {/* 1. HERO SECTION */}
        <section className="relative bg-gradient-to-b from-slate-50 via-blue-50/20 to-white pt-6 pb-12 md:pb-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8">
              <Link href="/" className="hover:text-brand-blue">Home</Link>
              <ChevronRight size={12} />
              <Link href="/courses" className="hover:text-brand-blue">Certifications</Link>
              <ChevronRight size={12} />
              <span className="text-brand-navy font-bold">Agile & Project Management</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
                  Agile &amp; Project Management <span className="text-brand-blue">Certifications</span>
                </h1>

                <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-2xl">
                  Gain the skills, tools, and confidence to lead projects, empower teams, and deliver results that matter.
                </p>

                {/* 3 Feature Badges */}
                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 bg-white border border-gray-200/80 rounded-2xl p-3 shadow-xs">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-brand-blue shrink-0">
                      <Video size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">Live Instructor-Led</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Training</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white border border-gray-200/80 rounded-2xl p-3 shadow-xs">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">Guaranteed-to-Run</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Classes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white border border-gray-200/80 rounded-2xl p-3 shadow-xs">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-brand-orange shrink-0">
                      <Shield size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">Pass Assurance</p>
                      <p className="text-[10px] text-gray-500 font-semibold">We've Got Your Back</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#popular-courses"
                    className="inline-flex items-center gap-2 rounded-2xl bg-brand-orange px-7 py-4 text-sm font-bold text-white shadow-lg hover:bg-opacity-90 transition-all hover:shadow-xl hover:translate-y-[-2px]"
                  >
                    Explore Certifications
                    <ArrowRight size={16} />
                  </a>

                  <button
                    onClick={() => openConsultationModal("Talk to an Advisor")}
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-blue/30 bg-white px-7 py-4 text-sm font-bold text-brand-blue hover:bg-blue-50 transition-all shadow-xs cursor-pointer"
                  >
                    <Phone size={16} className="text-brand-blue" />
                    Talk to an Advisor
                  </button>
                </div>

                {/* Sub Rating Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-200/60">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-amber-400 fill-amber-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">4.8/5</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Student Rating</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-brand-blue shrink-0" />
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">100+</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Countries</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-emerald-600 shrink-0" />
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">50,000+</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Professionals Trained</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-purple-600 shrink-0" />
                    <div className="text-left">
                      <p className="text-xs font-black text-brand-navy">20+ Years</p>
                      <p className="text-[10px] text-gray-500 font-semibold">Of Excellence</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column Hero Graphic / Photo with Floating Cards */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md">
                  
                  {/* Outer Glow Decor */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-blue/20 via-brand-orange/20 to-emerald-200/30 blur-2xl opacity-60"></div>

                  {/* Main Hero Card Image */}
                  <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
                    <Image
                      src="/images/agile_hero_professional.jpg"
                      alt="Agile & Project Management Leaders"
                      width={500}
                      height={400}
                      className="w-full h-80 object-cover object-center"
                      priority
                    />
                    
                    {/* Live Stream Overlay Tag */}
                    <div className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                      PMP® Live Class
                    </div>
                  </div>

                  {/* Top-Right Floating Badge (Salary & Growth) */}
                  <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-xl space-y-1 text-left hidden sm:block max-w-[180px]">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase">
                      <span>Average Salary</span>
                    </div>
                    <p className="text-base font-black text-brand-navy">$120,000+</p>
                    <p className="text-[10px] font-bold text-gray-500">Project Manager</p>
                    <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-gray-500">Job Growth</span>
                      <span className="font-black text-emerald-600 flex items-center gap-0.5">
                        33% <TrendingUp size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Bottom-Right Floating Badge (PMI Authorized Partner) */}
                  <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-xl flex items-center gap-3 text-left max-w-[220px]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white font-black text-xs shrink-0 shadow-md">
                      PMI®
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Authorized</p>
                      <p className="text-xs font-black text-brand-navy leading-tight">Training Partner</p>
                      <p className="text-[9px] text-brand-blue font-bold">Project Management Institute</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2. EXPLORE YOUR CAREER PATH */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 text-center space-y-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy">
              Explore Your <span className="text-brand-blue">Career Path</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-semibold">
              From beginner to advanced, find the right certification for your goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {careerPaths.map((path, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg text-center space-y-4 bg-white ${path.color}`}
              >
                <div className="space-y-2">
                  <div className="text-3xl">{path.icon}</div>
                  <h3 className="text-xs font-black text-brand-navy leading-tight">{path.title}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{path.level}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <p className="text-base font-black text-brand-blue">{path.cert}</p>
                  <p className="text-[10px] text-gray-400 font-bold">Avg. Salary</p>
                  <p className="text-xs font-black text-brand-navy">{path.salary}</p>
                </div>

                <Link
                  href={`/courses/${path.slug}`}
                  className={`block w-full py-2 rounded-xl border text-[11px] font-bold transition-colors ${path.btnColor}`}
                >
                  View Path
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a href="#popular-courses" className="text-xs font-extrabold text-brand-blue hover:underline inline-flex items-center gap-1">
              View All Agile &amp; Project Management Certifications <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* 3. POPULAR CERTIFICATIONS */}
        <section id="popular-courses" className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy">
              Popular <span className="text-brand-blue">Agile &amp; Project Management</span> Certifications
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-semibold">
              Industry-recognized programs designed to boost your leadership and delivery skills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularCourses.map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md border text-[10px] font-black uppercase ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Live Online</span>
                  </div>

                  <h3 className="text-base font-black text-brand-navy leading-snug">{c.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">{c.desc}</p>

                  <div className="space-y-1.5 pt-3 border-t border-gray-100 text-[10px] font-bold">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Level:</span>
                      <span className="text-brand-navy">{c.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg. Salary:</span>
                      <span className="text-brand-blue font-black">{c.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Class:</span>
                      <span className="text-emerald-600 font-extrabold">{c.nextClass}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100">
                  <Link
                    href={`/courses/${c.slug}`}
                    className="block w-full text-center py-2.5 rounded-xl border border-brand-blue/30 text-brand-blue hover:bg-brand-blue hover:text-white text-xs font-bold transition-all shadow-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/courses" className="text-xs font-extrabold text-brand-blue hover:underline inline-flex items-center gap-1">
              View All Certifications <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* 4. WHY LEARN AGILE SECTION (CIRCULAR GRAPHIC SPLIT) */}
        <section className="bg-slate-50/80 py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Graphic Element */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  
                  {/* Orbit Circles */}
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-brand-blue/20 animate-spin-slow"></div>
                  <div className="absolute inset-16 rounded-full border border-gray-200"></div>

                  {/* Center Avatar */}
                  <div className="relative z-10 w-44 h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                    <Image
                      src="/images/agile_why_learn.jpg"
                      alt="Agile Professional"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Orbit Node 1: Top Left */}
                  <div className="absolute top-4 left-0 bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center gap-2 max-w-[150px] text-left">
                    <span className="text-lg">💼</span>
                    <div>
                      <p className="text-[10px] font-black text-brand-navy">In-Demand</p>
                      <p className="text-[9px] text-gray-500 font-bold">Industry Skills</p>
                    </div>
                  </div>

                  {/* Orbit Node 2: Top Right */}
                  <div className="absolute top-4 right-0 bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center gap-2 max-w-[150px] text-left">
                    <span className="text-lg">⚡</span>
                    <div>
                      <p className="text-[10px] font-black text-brand-navy">Deliver Projects</p>
                      <p className="text-[9px] text-gray-500 font-bold">Faster</p>
                    </div>
                  </div>

                  {/* Orbit Node 3: Bottom Left */}
                  <div className="absolute bottom-4 left-0 bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center gap-2 max-w-[150px] text-left">
                    <span className="text-lg">🌐</span>
                    <div>
                      <p className="text-[10px] font-black text-brand-navy">Global Recognition</p>
                      <p className="text-[9px] text-gray-500 font-bold">&amp; Opportunities</p>
                    </div>
                  </div>

                  {/* Orbit Node 4: Bottom Right */}
                  <div className="absolute bottom-4 right-0 bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center gap-2 max-w-[150px] text-left">
                    <span className="text-lg">💲</span>
                    <div>
                      <p className="text-[10px] font-black text-brand-navy">Increase</p>
                      <p className="text-[9px] text-emerald-600 font-black">Earning Potential</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <h2 className="text-2xl md:text-4xl font-black text-brand-navy leading-tight">
                  Why Learn <span className="text-brand-blue">Agile &amp; Project Management?</span>
                </h2>

                <div className="space-y-4">
                  {[
                    "High demand for certified Agile & Project Management professionals across top tech and enterprise sectors",
                    "Better project outcomes with proven frameworks, risk management, and iterative methodologies",
                    "Increased salary and rapid career advancement opportunities worldwide",
                    "Build strong leadership, communication, stakeholder management & problem-solving skills",
                    "Work seamlessly in any industry — IT, Healthcare, Finance, Construction, Aviation & more"
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-white shrink-0 mt-0.5 shadow-xs">
                        <Check size={14} />
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-gray-700 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href="#download-guide"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Downloading Agile & Project Management Career Guide PDF...");
                    }}
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-blue bg-white px-6 py-3.5 text-xs font-black text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-md"
                  >
                    Download Agile Career Guide <Download size={14} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS (REAL STORIES, REAL SUCCESS) */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="text-left space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-brand-navy">
                Real Stories. <span className="text-brand-orange">Real Success.</span>
              </h2>
              <p className="text-xs text-gray-500 font-semibold">See how our alumni transformed their careers with our training.</p>
            </div>
            <Link href="/resources" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
              View More Success Stories <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200/80 p-6 flex flex-col justify-between shadow-xs space-y-4 text-left hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-brand-navy">{t.name}</span>
                    <svg className="h-3.5 w-3.5 fill-brand-blue cursor-pointer" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400">{t.role} · {t.location}</p>
                  <p className="text-[10px] font-black text-brand-blue uppercase tracking-wider">{t.cert}</p>
                  <p className="text-xs text-gray-600 font-medium italic leading-relaxed">"{t.quote}"</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md border text-[9px] font-black ${t.badgeBg}`}>
                    {t.badge}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. COMPARISON TABLE */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-brand-navy">
              Compare Top <span className="text-brand-blue">Agile &amp; Project Management</span> Certifications
            </h2>
            <p className="text-xs text-gray-500 font-semibold">Select the right path aligned with your experience and career aspirations.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 text-brand-navy font-black">
                <tr>
                  <th className="p-4">Certification</th>
                  <th className="p-4">Best For</th>
                  <th className="p-4">Experience Level</th>
                  <th className="p-4">Key Benefits</th>
                  <th className="p-4">Avg. Salary</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-black text-brand-blue text-sm">{row.cert}</td>
                    <td className="p-4 font-semibold text-gray-800">{row.bestFor}</td>
                    <td className="p-4 text-gray-500 font-bold">{row.level}</td>
                    <td className="p-4 text-gray-600 max-w-xs">{row.benefits}</td>
                    <td className="p-4 font-black text-brand-navy">{row.salary}</td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/courses/${row.slug}`}
                        className="inline-block px-4 py-2 rounded-xl bg-brand-blue text-white text-[11px] font-bold hover:bg-opacity-90 transition-all shadow-xs"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center pt-2">
            <Link href="/courses" className="text-xs font-extrabold text-brand-blue hover:underline inline-flex items-center gap-1">
              View Full Comparison →
            </Link>
          </div>
        </section>

        {/* 7. CORPORATE TRAINING BANNER */}
        <section className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy p-8 md:p-12 text-white shadow-2xl space-y-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-xl md:text-3xl font-black leading-snug">Corporate Training Solutions</h3>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  Empower your teams with customized training that drives real results.
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-300">
                  <span className="bg-white/10 px-2.5 py-1 rounded-full">On-site, Virtual &amp; Blended</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-full">Customized Learning</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-full">Group Discounts</span>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-3 text-center lg:text-left">
                <p className="text-[10px] font-extrabold tracking-widest text-brand-orange uppercase">Trusted By Top Organizations</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-black text-gray-400">
                  <span className="hover:text-white">Deloitte.</span>
                  <span className="hover:text-white">intel.</span>
                  <span className="hover:text-white">IBM</span>
                  <span className="hover:text-white">citi</span>
                  <span className="hover:text-white">amazon</span>
                </div>
              </div>

              <div className="lg:col-span-3 text-center lg:text-right">
                <p className="text-xs font-bold text-gray-300 mb-3">Train Your Team</p>
                <Link
                  href="/corporate-training"
                  className="inline-block rounded-2xl bg-brand-orange px-6 py-3.5 text-xs font-black text-white hover:bg-opacity-90 shadow-lg transition-all"
                >
                  Get Corporate Training
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
