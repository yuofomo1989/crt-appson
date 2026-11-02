"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import PopularCertificationsLogos from "@/components/PopularCertificationsLogos";
import {
  Building2,
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Send,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  FileText,
  Star,
  Check,
  Globe2
} from "lucide-react";

import testimonialsDb from "@/data/testimonials_db.json";
import initialCourses from "@/data/courses_db.json";
import initialSiteSettings from "@/data/site_settings_db.json";

const countryCodes = [
  { code: "+1", label: "US / CA" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "AU" },
  { code: "+971", label: "UAE" },
  { code: "+65", label: "SG" },
  { code: "+91", label: "IN" }
];

const teamSizes = [
  "5 – 10 Attendees (Small Team)",
  "11 – 25 Attendees (Department)",
  "26 – 50 Attendees (Multi-Team)",
  "51 – 100 Attendees (Enterprise)",
  "100+ Attendees (Global Organization)"
];

const deliveryModes = [
  "Onsite at our Office (Instructor-Led)",
  "Private Live Virtual Classroom",
  "Hybrid / Blended Learning",
  "Self-Paced with Mentor Office Hours"
];

const trainingDomains = [
  "Agile & Project Management (PMP®, CAPM®, PMI-ACP®)",
  "Lean and Six Sigma (Green Belt, Black Belt, Dual)",
  "Information Security & Cyber (CISSP®, CISA, CISM, CEH)",
  "IT Service & Architecture (ITIL® 4, TOGAF®, COBIT®)",
  "DevOps & Salesforce (Admin, App Builder, Leader)",
  "Custom / Multi-Domain Enterprise Solution"
];

export default function CorporateTrainingPage() {
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
    company: "",
    city: "",
    teamSize: teamSizes[0],
    domain: trainingDomains[0],
    deliveryMode: deliveryModes[0],
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    fetch("/api/settings/")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success" && data.data) {
          setSiteSettings(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const fullPhone = `${formData.countryCode} ${formData.phone}`.trim();
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: fullPhone,
        company: formData.company,
        city: formData.city,
        course: `Corporate: ${formData.domain} (${formData.teamSize})`,
        training_format: formData.deliveryMode,
        notes: `Company: ${formData.company} | City: ${formData.city} | Attendees: ${formData.teamSize} | Mode: ${formData.deliveryMode} | Message: ${formData.message}`,
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
          message: "Thank you! Your enterprise training proposal request has been received. Our corporate learning director will contact you within 2-4 business hours with a customized quotation."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+1",
          company: "",
          city: "",
          teamSize: teamSizes[0],
          domain: trainingDomains[0],
          deliveryMode: deliveryModes[0],
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

  const corporateTestimonials = (testimonialsDb || []).filter(t => t.is_corporate).slice(0, 4);
  const featuredCourses = (initialCourses || []).slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <Navbar siteSettings={siteSettings} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 text-white py-16 md:py-24 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-brand-orange font-bold">Corporate Training</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-orange text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles size={14} className="text-brand-orange" />
                Enterprise Learning & Workforce Solutions
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Empower Your Teams with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">
                  Custom Corporate Training
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
                Upgrade organizational capabilities with tailored curriculum, accredited frameworks, and industry-leading master instructors. From teams of 5 to global rollouts of 500+, we deliver measurable ROI, enhanced productivity, and accelerated business results.
              </p>

              {/* Quick Bullet Highlights */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Customized courseware for your tech stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Onsite at your office or live virtual cohorts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>98.23% first-attempt certification passing rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Volume tier discounts saving up to 40%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#callback-form"
                  className="rounded-2xl bg-brand-orange px-7 py-4 text-xs font-black text-white hover:bg-opacity-90 transition-all shadow-lg shadow-orange-500/25 hover:scale-[1.02] cursor-pointer"
                >
                  Request Custom Proposal →
                </a>
                <a
                  href="#delivery-modes"
                  className="rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer backdrop-blur-sm"
                >
                  Explore Delivery Formats
                </a>
              </div>
            </div>

            {/* Right Card / Metric Highlights */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6 text-left">
                <h3 className="text-base font-black text-white border-b border-white/10 pb-4 flex items-center justify-between">
                  <span>Enterprise Impact at a Glance</span>
                  <ShieldCheck size={18} className="text-brand-orange" />
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-2xl md:text-3xl font-black text-white">500+</p>
                    <p className="text-[11px] font-bold text-slate-300 mt-1">Certified Master Instructors</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-2xl md:text-3xl font-black text-brand-orange">140+</p>
                    <p className="text-[11px] font-bold text-slate-300 mt-1">Global Cities in 10+ Countries</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-2xl md:text-3xl font-black text-brand-orange">50+</p>
                    <p className="text-[11px] font-bold text-slate-300 mt-1">Accredited Certifications</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-2xl md:text-3xl font-black text-emerald-400">98.2%</p>
                    <p className="text-[11px] font-bold text-slate-300 mt-1">Exam Pass Guarantee Rate</p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-300 font-semibold space-y-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white">
                    <Phone size={14} className="text-brand-orange shrink-0" />
                    <span>Direct Enterprise Line: <strong>+1 855-322-1201</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Mail size={14} className="text-brand-orange shrink-0" />
                    <span>Enterprise Desk: <strong>support@certificationplanner.com</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported By Global Leaders / Partner Badges */}
      <PopularCertificationsLogos siteSettings={siteSettings} />

      {/* Core 3 Value Pillars from Old Site */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-12 text-left">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Why Enterprise Leaders Choose CP</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              Built Exclusively for Organizational Excellence
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              We align our training with your corporate strategy, ensuring immediate real-world application, compliance, and team transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 border border-orange-200 text-brand-orange flex items-center justify-center font-bold">
                <Layers size={28} />
              </div>
              <h3 className="text-lg font-black text-brand-navy">Customize Courseware</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Customized courseware designed specifically for your team, industry, or organization. Instructors adapt case studies and practical labs around your existing business processes and tech stack.
              </p>
              <ul className="text-xs text-gray-500 font-semibold space-y-1.5 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">✓ Tailored slides & practice exams</li>
                <li className="flex items-center gap-2">✓ Internal case study integration</li>
                <li className="flex items-center gap-2">✓ Flexible module pacing</li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center font-bold">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-black text-brand-navy">Certified Master Instructors</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Over 500+ certified instructors in 140+ cities and 10+ countries. Every mentor brings 15+ years of hands-on industry leadership, delivering actionable insights rather than mere exam theory.
              </p>
              <ul className="text-xs text-gray-500 font-semibold space-y-1.5 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">✓ Vetted enterprise practitioners</li>
                <li className="flex items-center gap-2">✓ Local instructors across major hubs</li>
                <li className="flex items-center gap-2">✓ High-energy interactive coaching</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
                <Award size={28} />
              </div>
              <h3 className="text-lg font-black text-brand-navy">Global Accreditations</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Authorized partner of PMI, CompTIA, PeopleCert, Axelos, and IIBA. Over 50+ internationally recognized certifications guaranteeing compliance, audit readiness, and industry credibility.
              </p>
              <ul className="text-xs text-gray-500 font-semibold space-y-1.5 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2">✓ Official PMI PDU and contact hours</li>
                <li className="flex items-center gap-2">✓ Accredited course materials & kits</li>
                <li className="flex items-center gap-2">✓ Global certificate verification</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Benefits Row (The famous becomeATeacherForm equivalent) */}
      <section id="callback-form" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 text-white">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Enterprise Benefits */}
              <div className="lg:col-span-6 space-y-8 text-left">
                <div className="space-y-3">
                  <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Corporate Learning Partnership</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                    Expert Instructors and Mentors From Your Industry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Select any schedule, blend multiple curriculum tracks, or customize the delivery as per your company's operational requirements.
                  </p>
                </div>

                {/* 6 Key Benefits Checkmarks */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">Largest Instructor Panel</h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">Over 500 certified subject matter experts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">5 to 100+ Cohort Size</h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">Flexible batch sizes tailored to your team.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">Dedicated Account Director</h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">Single point of contact from RFP to completion.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">Tiered Group Pricing</h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">Save up to 40% with transparent corporate rates.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">Virtual or Onsite</h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">We come to your campus or host secure virtual rooms.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white">Post-Class Support</h4>
                      <p className="text-[11px] text-slate-300 font-medium mt-0.5">Exam simulation tests, retake support & office hours.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Need an Immediate Consultation?</p>
                      <p className="text-sm font-black text-white">+1 855-322-1201 / +1 408-418-5586</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold">Available 24/7</span>
                </div>
              </div>

              {/* Right Column: Callback & RFP Form */}
              <div className="lg:col-span-6 bg-white text-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-left">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-black text-brand-navy">Request an Enterprise Proposal</h3>
                  <p className="text-xs text-gray-500 font-semibold mt-1">
                    Fill out the form below to receive a custom syllabus, schedule options, and group discount breakdown.
                  </p>
                </div>

                {status.message && (
                  <div className={`p-4 rounded-2xl text-xs font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="sarah.jenkins@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Phone Number *</label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="w-24 px-2 py-3 rounded-xl border border-gray-200 text-xs font-bold bg-gray-50"
                        >
                          {countryCodes.map(c => (
                            <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Phone number"
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Company name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">City / Country</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. New York, USA"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Expected Team Size</label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        {teamSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Primary Certification Domain</label>
                      <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        {trainingDomains.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Preferred Delivery Format</label>
                      <select
                        name="deliveryMode"
                        value={formData.deliveryMode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      >
                        {deliveryModes.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">Specific Requirements / Target Timeline</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your team's objectives, preferred dates, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-brand-orange text-white text-xs font-black hover:bg-opacity-95 transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Corporate Inquiry & Get Proposal</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-medium">
                    🔒 We respect your enterprise privacy. Your contact details are confidential and never shared.
                  </p>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Delivery Formats Section */}
      <section id="delivery-modes" className="py-16 bg-slate-50 border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-12 text-left">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Flexible Delivery Formats</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy tracking-tight">
              Train Anywhere, Anytime, on Your Terms
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Choose the learning structure that minimizes downtime and matches your team's geographical distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                <Building2 size={24} />
              </div>
              <h3 className="text-base font-black text-brand-navy">Onsite Classroom Training</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Our certified instructor travels directly to your enterprise facility or rented executive conference center anywhere across 140+ cities.
              </p>
              <div className="pt-2 text-xs text-gray-500 space-y-1 font-semibold">
                <p>• Zero employee travel costs</p>
                <p>• Focused, team-building atmosphere</p>
                <p>• Flexible weekday or weekend blocks</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                <Globe2 size={24} />
              </div>
              <h3 className="text-base font-black text-brand-navy">Private Virtual Live Classroom</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Dedicated virtual cohorts hosted on enterprise Zoom/Teams with full audio, screen-sharing, collaborative whiteboards, and breakout labs.
              </p>
              <div className="pt-2 text-xs text-gray-500 space-y-1 font-semibold">
                <p>• Ideal for distributed / remote workforces</p>
                <p>• Recorded session archives for replay</p>
                <p>• Multi-timezone cohort coordination</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <BookOpen size={24} />
              </div>
              <h3 className="text-base font-black text-brand-navy">Blended LMS + Executive Coaching</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                On-demand digital learning modules with weekly live Q&A office hours, practice mock reviews, and executive milestone assessments.
              </p>
              <div className="pt-2 text-xs text-gray-500 space-y-1 font-semibold">
                <p>• Self-paced learning around active shifts</p>
                <p>• Enterprise LMS reporting dashboard</p>
                <p>• 1-on-1 instructor check-ins</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Enterprise Certification Tracks */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-10 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Accredited Enterprise Tracks</span>
              <h2 className="text-2xl md:text-3xl font-black text-brand-navy mt-1">
                Most Requested Corporate Programs
              </h2>
            </div>
            <Link href="/courses" className="text-xs font-bold text-brand-blue hover:underline">
              View All 27 Enterprise Certifications →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-200/90 p-6 flex flex-col justify-between hover:shadow-lg transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-brand-blue px-2.5 py-1 bg-blue-50 rounded-full">
                      {course.category_name || "Professional Certification"}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {course.rating || "4.9"}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-brand-navy line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{course.short_description || course.description}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">Delivery Duration</span>
                    <span className="text-xs font-bold text-gray-700">{course.duration || "4 Days Bootcamp"}</span>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-brand-blue transition-colors cursor-pointer"
                  >
                    View Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Reviews & Testimonials from Real DB */}
      <section className="py-16 bg-slate-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-10 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider">What Corporate Clients Say</span>
            <h2 className="text-2xl md:text-3xl font-black text-brand-navy">
              Trusted by Learning & HR Executives
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Real feedback from corporate program managers and enterprise team leads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {corporateTestimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                    Verified Corporate Cohort
                  </span>
                </div>

                <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
                  "{t.content}"
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-sm">
                    {t.name ? t.name.charAt(0) : "C"}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-brand-navy">{t.name}</h4>
                    <p className="text-[11px] text-gray-500 font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise FAQs */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-8 text-left">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider">Enterprise FAQ</span>
            <h2 className="text-2xl md:text-3xl font-black text-brand-navy">
              Frequently Asked Corporate Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200/80 space-y-2">
              <h3 className="text-xs md:text-sm font-black text-brand-navy">How does customized courseware work?</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Before the training kicks off, our senior instructor conducts a pre-training alignment call with your technical lead or training manager. We modify case studies, lab exercises, and agenda pacing to reflect your internal tools, processes, and business goals.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200/80 space-y-2">
              <h3 className="text-xs md:text-sm font-black text-brand-navy">What are the group discount tiers for corporate teams?</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                We offer tiered corporate rates: teams of 5-10 save 20-25%, teams of 11-25 save 30%, and enterprise groups of 25+ can save up to 40% off standard public tuition. Customized enterprise billing, net-30 invoicing, and purchase order (PO) support are provided.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200/80 space-y-2">
              <h3 className="text-xs md:text-sm font-black text-brand-navy">Can training be conducted across multiple geographic offices?</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Yes. We regularly deliver distributed corporate cohorts where employees across the US, Canada, UK, Europe, and APAC join unified virtual classrooms or simultaneous localized onsite bootcamps in 140+ global cities.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200/80 space-y-2">
              <h3 className="text-xs md:text-sm font-black text-brand-navy">Do you provide exam vouchers and 100% money-back pass guarantee?</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Yes, corporate packages can be bundled with official exam vouchers (PMI, CompTIA, PeopleCert) along with our 100% money-back pass guarantee and complimentary access to full-length exam simulators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PreFooter */}
      <PreFooter siteSettings={siteSettings} />

      {/* Footer */}
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
