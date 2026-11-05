"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  Users,
  Award,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Send,
  ChevronRight,
  Layers,
  FileText,
  Star,
  Globe,
  GraduationCap,
  BarChart3,
  Headphones,
  ArrowRight,
  CheckSquare,
  Cloud,
  User,
  Briefcase,
  MessageSquare,
  Lock,
  Monitor,
  Plus,
  Minus,
  Target
} from "lucide-react";

import initialSiteSettings from "@/data/site_settings_db.json";

const POPULAR_CORP_CERTS = [
  { name: "PMP®", slug: "pmp-certification", icon: "cap", active: true },
  { name: "CAPM®", slug: "capm-certification", icon: "check" },
  { name: "Lean Six Sigma", slug: "lean-six-sigma-green-belt", icon: "sigma" },
  { name: "Agile (PMI-ACP®)", slug: "pmi-acp-certification", icon: "agile" },
  { name: "ITIL® 4", slug: "itil-4-foundation", icon: "itil" },
  { name: "CISSP®", slug: "cissp-certification", icon: "cissp" },
  { name: "Salesforce", slug: "pmp-certification", icon: "cloud" }
];

const REQUESTED_PROGRAMS = [
  {
    badge: "PROJECT MANAGEMENT",
    badgeStyle: "bg-blue-50 text-[#0066cc] border-blue-200",
    rating: "4.9",
    title: "PMP® Certification Training",
    desc: "Build advanced project management skills and lead high-impact projects.",
    duration: "4 Days",
    modes: "Live / Onsite / Virtual",
    slug: "pmp-certification"
  },
  {
    badge: "AGILE",
    badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    rating: "4.8",
    title: "PMI-ACP® Agile Certification",
    desc: "Develop Agile skills to drive faster, more flexible project delivery.",
    duration: "4 Days",
    modes: "Live / Onsite / Virtual",
    slug: "pmi-acp-certification"
  },
  {
    badge: "LEAN SIX SIGMA",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rating: "4.9",
    title: "Lean Six Sigma Green & Black Belt",
    desc: "Drive process improvement, reduce costs and increase operational efficiency.",
    duration: "4 Days",
    modes: "Live / Onsite / Virtual",
    slug: "lean-six-sigma-green-belt"
  },
  {
    badge: "IT SERVICE MANAGEMENT",
    badgeStyle: "bg-sky-50 text-sky-700 border-sky-200",
    rating: "4.8",
    title: "ITIL® 4 Foundation Training",
    desc: "Build IT service management skills aligned with industry best practices.",
    duration: "2 Days",
    modes: "Live / Onsite / Virtual",
    slug: "itil-4-foundation"
  }
];

const CORPORATE_FAQS = [
  {
    q: "How do you customize training for our organization?",
    a: "Before the training begins, our senior instructor conducts a discovery call with your L&D or department leads to tailor case studies, exercises, and module pacing around your internal workflows, industry terminology, and business objectives."
  },
  {
    q: "Can you deliver training at our office location?",
    a: "Yes! Our certified instructors can travel directly to your corporate office or conference facility across 120+ cities worldwide, or deliver private live virtual cohorts for distributed and hybrid teams."
  },
  {
    q: "Do you provide group discounts for corporate teams?",
    a: "Absolutely. We offer tiered volume discounts starting at 5+ participants, saving organizations up to 40% compared to individual public enrollment, along with flexible enterprise invoicing and PO support."
  },
  {
    q: "How do you measure training effectiveness and ROI?",
    a: "We provide full attendance tracking, pre- and post-training skill assessments, mock exam readiness scores, and dedicated account reporting so HR and leadership can track completion and certification pass rates."
  }
];

export default function CorporateTrainingPage() {
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    teamSize: "",
    domain: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    fetch("/api/settings/")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          setSiteSettings(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        city: formData.jobTitle,
        course: `Corporate: ${formData.domain || "Enterprise Training"} (${formData.teamSize || "Group"})`,
        training_format: "Corporate Enterprise",
        notes: `Company: ${formData.company} | Role: ${formData.jobTitle} | Team Size: ${formData.teamSize} | Needs: ${formData.domain} | Details: ${formData.message}`,
        source: "corporate-training-page"
      };

      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        setStatus({
          type: "success",
          message:
            "Thank you! Your enterprise proposal request has been received. Our corporate training team will contact you shortly."
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          jobTitle: "",
          phone: "",
          teamSize: "",
          domain: "",
          message: ""
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to submit inquiry. Please call us directly or try again."
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please contact us via phone or email directly."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased text-left">
      <Navbar siteSettings={siteSettings} />

      {/* ── 1. LIGHT CORPORATE HERO + 5-ITEM STATS STRIP ───────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#f6f9ff] to-[#dbeafe] border-b border-blue-100/80 pt-3 pb-5">
        {/* Decorative diagonal blue/orange swooshes on right */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#0052cc]/20 via-[#f97316]/20 to-transparent blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0066cc] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-700 font-semibold">Corporate Training</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#dbeafe] border border-blue-200 text-[#0066cc] text-[11px] font-extrabold uppercase tracking-wider">
                CORPORATE TRAINING &amp; ENTERPRISE SOLUTIONS
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0f172a] leading-[1.12]">
                Empower Your Teams with
                <br />
                <span className="text-[#f97316]">Custom Corporate Training</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                Build high-performing teams with flexible, role-based training programs in project management, Agile, Lean Six Sigma, IT, and more — tailored to your business goals.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#proposal-form"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all"
                >
                  <span>Request a Training Proposal</span>
                  <ArrowRight size={15} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#0066cc] bg-white hover:bg-blue-50 px-6 py-3 text-xs sm:text-sm font-extrabold text-[#0066cc] transition-all"
                >
                  <Headphones size={15} />
                  <span>Talk to a Training Advisor</span>
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

            {/* Right Column (6 Cols): Corporate Team Photo + 500+ Enterprise Clients Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/80 shadow-xl bg-white h-[290px] sm:h-[330px]">
                <img
                  src="/about_us_professionals.jpg"
                  alt="Corporate Training Enterprise Solutions"
                  className="w-full h-full object-cover object-center"
                />

                {/* Top-Right Blue Pill Badge: 500+ Enterprise Clients Trained */}
                <div className="absolute top-4 right-4 z-20 rounded-full bg-gradient-to-r from-[#0052cc] to-[#003d99] text-white px-5 py-2.5 shadow-xl border border-blue-300/30 flex items-center gap-3">
                  <Users size={26} className="text-blue-100 shrink-0" />
                  <div className="leading-tight">
                    <p className="text-xl sm:text-2xl font-black">500+</p>
                    <p className="text-[10px] font-semibold text-blue-100">
                      Enterprise Clients
                      <br />
                      Trained
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
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">500+</p>
                <p className="text-[11px] font-medium text-slate-500">Enterprise Clients</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">15+</p>
                <p className="text-[11px] font-medium text-slate-500">Years of Training Excellence</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">50,000+</p>
                <p className="text-[11px] font-medium text-slate-500">Professionals Trained</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. POPULAR CERTIFICATIONS FOR CORPORATE TRAINING (7 PILLS) ─────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-[#0f172a]">
            Popular Certifications for Corporate Training
          </h2>
          <Link
            href="/courses"
            className="text-xs font-extrabold text-[#0066cc] hover:underline flex items-center gap-1"
          >
            <span>View All Certifications</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {POPULAR_CORP_CERTS.map((cert) => (
            <Link
              key={cert.name}
              href={`/courses/${cert.slug}`}
              className={`rounded-xl px-3.5 py-3 flex items-center justify-center gap-2 text-xs font-extrabold transition-all ${
                cert.active
                  ? "border-2 border-[#0066cc] bg-[#f5f9ff] text-[#0f172a] shadow-2xs"
                  : "border border-slate-200/90 bg-white text-[#0f172a] hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              {cert.icon === "cap" && <GraduationCap size={17} className="text-[#0066cc] shrink-0" />}
              {cert.icon === "check" && <CheckSquare size={16} className="text-[#16a34a] shrink-0" />}
              {cert.icon === "sigma" && (
                <span className="text-base font-black text-[#f97316] leading-none">Σ</span>
              )}
              {cert.icon === "agile" && <Users size={16} className="text-[#9333ea] shrink-0" />}
              {cert.icon === "itil" && (
                <span className="w-4 h-4 rounded-full bg-[#6d28d9] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                  Q
                </span>
              )}
              {cert.icon === "cissp" && <ShieldCheck size={16} className="text-[#16a34a] shrink-0" />}
              {cert.icon === "cloud" && <Cloud size={16} className="text-[#0284c7] shrink-0" />}
              <span className="truncate">{cert.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. WHY CHOOSE CERTIFICATION PLANNER FOR YOUR ORGANIZATION? ──────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <div className="text-center max-w-3xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
            Why Choose Certification Planner for{" "}
            <span className="text-[#0066cc]">Your Organization?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            A trusted training partner for companies of all sizes — from growing teams to global enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Customized Training Programs */}
          <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-b from-[#eef6ff] to-[#f8fbff] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-blue-100 text-[#0066cc] flex items-center justify-center shadow-2xs shrink-0">
                <Users size={22} />
              </div>
              <h3 className="text-base font-black text-[#0f172a] leading-snug">
                Customized Training Programs
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Role- and skill-based learning paths</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Industry and organization-specific content</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Flexible scheduling and delivery</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Certified & Experienced Instructors */}
          <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-b from-[#fff7ed] to-[#fffbf7] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-orange-100 text-[#f97316] flex items-center justify-center shadow-2xs shrink-0">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-base font-black text-[#0f172a] leading-snug">
                Certified &amp; Experienced Instructors
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Real-world industry experience</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>PMI®, ASQ®, IASSC®, ISACA® and more</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Interactive and practical, not just theory</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Proven Business Impact */}
          <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-[#ecfdf5] to-[#f7fee7]/40 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-emerald-100 text-[#16a34a] flex items-center justify-center shadow-2xs shrink-0">
                <Award size={22} />
              </div>
              <h3 className="text-base font-black text-[#0f172a] leading-snug">
                Proven Business Impact
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 font-semibold">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Improve team performance and productivity</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>Build project, process and leadership capabilities</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#16a34a] shrink-0 mt-0.5" />
                <span>High certification success rate (98.23%)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. DARK NAVY SPLIT SECTION: WORKFORCE + ENTERPRISE PROPOSAL FORM ── */}
      <section id="proposal-form" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 scroll-mt-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#071733] via-[#0b224a] to-[#071733] p-6 sm:p-8 shadow-xl text-white grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#f97316]">
                ENTERPRISE TRAINING SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white leading-tight">
                Expert Training for Your Workforce
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/85 font-medium leading-relaxed max-w-xl">
                Partner with Certification Planner to design and deliver a high-impact training program for your organization.
              </p>
            </div>

            {/* 2x2 Grid of 4 Value Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 text-[#f97316] flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">Scalable for Any Team Size</h4>
                  <p className="text-[11px] text-blue-100/75 font-medium mt-1 leading-snug">
                    From small groups to enterprise-wide rollouts
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 text-[#f97316] flex items-center justify-center shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">Flexible Delivery Options</h4>
                  <p className="text-[11px] text-blue-100/75 font-medium mt-1 leading-snug">
                    Onsite, virtual live, hybrid or blended learning
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 text-[#f97316] flex items-center justify-center shrink-0">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">Measurable Results</h4>
                  <p className="text-[11px] text-blue-100/75 font-medium mt-1 leading-snug">
                    Track progress, completion and certification success
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 text-[#f97316] flex items-center justify-center shrink-0">
                  <Headphones size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">Dedicated Account Support</h4>
                  <p className="text-[11px] text-blue-100/75 font-medium mt-1 leading-snug">
                    A single point of contact for planning, coordination and reporting
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Contact Bar */}
            <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f97316]/20 text-[#f97316] flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div className="space-y-0.5 text-xs">
                <p className="font-extrabold text-white">Speak with Our Corporate Training Team</p>
                <p className="text-blue-100/90 font-semibold">
                  (800) 207-1897 <span className="mx-2 text-slate-500">|</span> corporate@certificationplanner.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): White Request an Enterprise Proposal Card */}
          <div className="lg:col-span-6 bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] flex items-center gap-2">
                <FileText size={20} className="text-[#0066cc]" />
                <span>Request an Enterprise Proposal</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Tell us about your training needs, and we’ll get back with a customized proposal.
              </p>
            </div>

            {status.message && (
              <div
                className={`p-3.5 rounded-xl text-xs font-bold ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Row 1: Full Name + Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-500 outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div className="relative">
                  <Mail size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Work Email *"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-500 outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>

              {/* Row 2: Company Name + Job Title / Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Building2 size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name *"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-500 outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div className="relative">
                  <Briefcase size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title / Department"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-500 outline-none focus:border-[#0066cc]"
                  />
                </div>
              </div>

              {/* Row 3: Phone Number + Team Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Phone size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-500 outline-none focus:border-[#0066cc]"
                  />
                </div>
                <div className="relative">
                  <Users size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-700 outline-none focus:border-[#0066cc]"
                  >
                    <option value="">Team Size (Approx.)</option>
                    <option value="5 - 10 Learners">5 – 10 Learners</option>
                    <option value="11 - 25 Learners">11 – 25 Learners</option>
                    <option value="26 - 50 Learners">26 – 50 Learners</option>
                    <option value="50+ Learners">50+ Learners</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Training Needs / Certifications of Interest */}
              <div className="relative">
                <Layers size={14} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  name="domain"
                  required
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-700 outline-none focus:border-[#0066cc]"
                >
                  <option value="">Training Needs / Certifications of Interest *</option>
                  <option value="PMP / Project Management">PMP® &amp; Project Management</option>
                  <option value="Agile & Scrum (PMI-ACP)">Agile &amp; Scrum (PMI-ACP®)</option>
                  <option value="Lean Six Sigma">Lean Six Sigma (Green / Black Belt)</option>
                  <option value="ITIL 4 & Service Management">ITIL® 4 &amp; IT Service Management</option>
                  <option value="Cybersecurity (CISSP / CISA)">Cybersecurity (CISSP® / CISA®)</option>
                  <option value="Custom Multi-Track Program">Custom Multi-Track Program</option>
                </select>
              </div>

              {/* Row 5: Additional Details */}
              <div className="relative">
                <MessageSquare size={14} className="text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Additional Details or Requirements"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-500 outline-none focus:border-[#0066cc] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <Send size={15} />
                <span>{loading ? "Submitting..." : "Submit Request for Proposal"}</span>
              </button>

              <p className="text-[11px] text-slate-500 font-medium text-center flex items-center justify-center gap-1.5 pt-0.5">
                <Lock size={12} className="text-slate-400" />
                <span>Your information is secure and will only be used for training-related communication.</span>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── 5. TRAIN ANYWHERE, ANYTIME, ON YOUR TERMS (3 CARDS WITH PHOTOS) ── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <div className="text-center max-w-3xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
            Train Anywhere, Anytime, on Your Terms
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Flexible learning formats designed for today’s global and hybrid workplaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Format 1: Onsite Classroom Training */}
          <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-[#eef6ff] to-[#f8fbff] p-5 flex items-center justify-between gap-4 overflow-hidden shadow-xs">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                  <Building2 size={18} />
                </div>
                <h3 className="text-sm sm:text-[15px] font-black text-[#0f172a] leading-snug">
                  Onsite Classroom Training
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Instructor-led training at your location with hands-on, team-focused learning.
              </p>
            </div>
            <div className="w-28 h-24 rounded-2xl overflow-hidden border border-white shadow-sm shrink-0">
              <img
                src="/about_us_professionals.jpg"
                alt="Onsite Classroom Training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Format 2: Private Virtual Live Classroom */}
          <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-br from-[#fff7ed] to-[#fffbf7] p-5 flex items-center justify-between gap-4 overflow-hidden shadow-xs">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-orange-100 text-[#f97316] flex items-center justify-center shrink-0">
                  <Monitor size={18} />
                </div>
                <h3 className="text-sm sm:text-[15px] font-black text-[#0f172a] leading-snug">
                  Private Virtual Live Classroom
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Live, interactive training for your team from anywhere in the world.
              </p>
            </div>
            <div className="w-28 h-24 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-sm shrink-0 p-1.5 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-1 flex-1">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="rounded-xs bg-slate-700 flex items-center justify-center">
                    <User size={10} className="text-blue-200" />
                  </div>
                ))}
              </div>
              <div className="h-1.5 bg-slate-600 rounded-full mt-1" />
            </div>
          </div>

          {/* Format 3: Blended LMS + Executive Coaching */}
          <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-[#ecfdf5] to-[#f7fee7]/40 p-5 flex items-center justify-between gap-4 overflow-hidden shadow-xs">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-emerald-100 text-[#16a34a] flex items-center justify-center shrink-0">
                  <Layers size={18} />
                </div>
                <h3 className="text-sm sm:text-[15px] font-black text-[#0f172a] leading-snug">
                  Blended LMS + Executive Coaching
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                A flexible mix of live training, on-demand learning, and expert coaching for long-term impact.
              </p>
            </div>
            <div className="w-28 h-24 rounded-2xl overflow-hidden border border-white shadow-sm shrink-0">
              <img
                src="/resources_hero_laptop.jpg"
                alt="Blended LMS Executive Coaching"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MOST REQUESTED CORPORATE PROGRAMS (4 CARDS IN 1 ROW) ────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
            Most Requested Corporate Programs
          </h2>
          <Link
            href="/courses"
            className="text-xs font-extrabold text-[#0066cc] hover:underline flex items-center gap-1"
          >
            <span>View All Programs</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REQUESTED_PROGRAMS.map((prog) => (
            <div
              key={prog.title}
              className="rounded-3xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md border text-[9px] font-extrabold uppercase tracking-wider ${prog.badgeStyle}`}
                  >
                    {prog.badge}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-black text-[#0f172a]">
                    <Star size={13} className="fill-[#f59e0b] text-[#f59e0b]" />
                    {prog.rating}
                  </span>
                </div>

                <h3 className="text-sm sm:text-[15px] font-black text-[#0f172a] leading-snug">
                  {prog.title}
                </h3>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">{prog.desc}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                  <Calendar size={13} className="text-slate-400 shrink-0" />
                  <span>{prog.duration}</span>
                  <span className="text-slate-300">|</span>
                  <span>{prog.modes}</span>
                </div>

                <Link
                  href={`/courses/${prog.slug}`}
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] py-2.5 text-xs font-extrabold text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>View Program</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. TRUSTED BY LEARNING & HR EXECUTIVES (2 TESTIMONIALS) ───────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a]">
            Trusted by Learning &amp; HR Executives
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Hear from organizations that have upskilled their teams with Certification Planner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Testimonial 1 */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold">
                Team of 150+ Trained
              </span>
            </div>

            <p className="text-xs sm:text-[13.5px] text-slate-700 font-medium italic leading-relaxed">
              “Certification Planner made it easy to upskill our project management team. The training was practical, engaging and highly relevant to our industry.”
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                <User size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0f172a]">HR Director</h4>
                <p className="text-[11px] font-medium text-slate-500">Global Technology Company</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold">
                Multiple Batches Completed
              </span>
            </div>

            <p className="text-xs sm:text-[13.5px] text-slate-700 font-medium italic leading-relaxed">
              “The customized Lean Six Sigma program helped our team identify real improvement opportunities and deliver measurable business results.”
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                <User size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#0f172a]">Learning &amp; Development Manager</h4>
                <p className="text-[11px] font-medium text-slate-500">Manufacturing Organization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FREQUENTLY ASKED CORPORATE QUESTIONS (2-COLUMN SPLIT) ───────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-3xl bg-[#eef5ff] border border-blue-100 p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-blue-200 text-[#0066cc] flex items-center justify-center shrink-0 shadow-2xs">
                <MessageSquare size={22} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0f172a] leading-snug">
                  Frequently Asked
                  <br />
                  Corporate Questions
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-1.5 leading-relaxed">
                  Quick answers to common corporate training queries.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (8 Cols): 4 Accordions */}
          <div className="lg:col-span-8 space-y-2.5">
            {CORPORATE_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-[13.5px] font-extrabold text-[#0f172a]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <Minus size={16} className="text-[#0066cc] shrink-0" />
                    ) : (
                      <Plus size={16} className="text-[#0066cc] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. BOTTOM DARK NAVY CTA BANNER ────────────────────────────────── */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#081d42] via-[#0c2d66] to-[#081d42] px-6 py-7 sm:px-10 sm:py-8 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#0f172a] flex items-center justify-center shadow-md shrink-0">
              <Target size={30} strokeWidth={2.2} />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Ready to Build a High-Performing Team?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
                Get a customized corporate training solution for your organization.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="#proposal-form"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all"
            >
              <span>Request a Training Proposal</span>
              <ArrowRight size={15} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-300/40 bg-white/10 hover:bg-white/15 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white transition-all"
            >
              <Headphones size={15} />
              <span>Talk to a Training Advisor</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
