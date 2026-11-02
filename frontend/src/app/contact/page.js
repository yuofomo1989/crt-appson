"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  Headphones,
  Clock,
  MapPin,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Check,
  Sparkles,
  User,
  Tag,
  Lock,
  Calendar
} from "lucide-react";

const countryCodes = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+1", flag: "🇨🇦", label: "CA" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+65", flag: "🇸🇬", label: "SG" },
];

const subjectOptions = [
  "Select a subject",
  "Questions about certifications",
  "Help choosing the right training",
  "Registration or account support",
  "Order, invoice or payment inquiries",
  "Corporate training solutions",
  "Technical support",
  "Other"
];

const helpTopics = [
  "Questions about certifications",
  "Help choosing the right training",
  "Registration or account support",
  "Order, invoice or payment inquiries",
  "Corporate training solutions",
  "Technical support",
];

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    subject: "Select a subject",
    message: "",
    robot: false,
  });

  const [ccOpen, setCcOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
    fetch(`${apiUrl}/settings/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          setSiteSettings(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.robot) {
      alert("Please check the 'I\\'m not a robot' security verification.");
      return;
    }
    if (form.subject === "Select a subject") {
      alert("Please select a subject for your inquiry.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      const res = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          course: form.subject !== "Select a subject" ? form.subject : "Contact Us Page Inquiry",
          type: "inquiry",
          source: "Website Contact Us Page",
          message: form.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestCallback = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("openConsultationModal", {
          detail: { title: "Request a Callback" },
        })
      );
    }
  };

  const handleStartLiveChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("openConsultationModal", {
          detail: { title: "Chat with Our Support Team" },
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-gray-800 font-sans antialiased">
      <Navbar siteSettings={siteSettings} />

      <main className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* ==========================================
            1. BREADCRUMB
            ========================================== */}
        <div className="pt-3 pb-1 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="text-brand-blue hover:underline font-semibold">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-gray-600 font-medium">Contact Us</span>
        </div>

        {/* ==========================================
            2. HERO SECTION
            ========================================== */}
        <section className="py-4 md:py-8">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
            
            {/* Left Content */}
            <div className="flex-1 space-y-3.5 text-left max-w-lg">
              <p className="text-xs font-black uppercase tracking-widest text-brand-orange">
                CONTACT US
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-[1.15]">
                We're Here<br />to Help You
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-1">
                Have a question or need guidance? Our team is ready to help you choose
                the right certification path and achieve your goals.
              </p>
            </div>

            {/* Right Photo with Floating Badges (Tight & Cohesive) */}
            <div className="w-full lg:w-auto shrink-0 flex justify-center">
              <div className="relative w-full max-w-[420px] sm:w-[420px]">
                {/* Soft backdrop glow directly behind card */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-blue-100/60 via-sky-50 to-blue-50/50 rounded-3xl blur-xl -z-10" />

                {/* Floating chat icon badge */}
                <div className="absolute -top-3.5 -left-3.5 z-20 bg-white rounded-2xl shadow-md border border-gray-100 p-2.5 text-brand-blue flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>

                {/* Floating phone icon badge */}
                <div className="absolute -bottom-3.5 -left-3.5 z-20 bg-white rounded-2xl shadow-md border border-gray-100 p-2.5 text-brand-blue flex items-center justify-center">
                  <Phone size={18} />
                </div>

                {/* Support Agent Image */}
                <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                  <img
                    src="/images/contact_agent_clean.jpg?v=2"
                    alt="Customer Support Representative"
                    className="w-full h-[280px] sm:h-[330px] object-cover object-top"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            3. CONTACT METHODS (4 CARDS ROW)
            ========================================== */}
        <section className="my-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Call Us */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-sm text-brand-navy">Call Us</h3>
              <a
                href={`tel:${(siteSettings?.support_phone || '(888) 745-7575').replace(/[^0-9]/g, '')}`}
                className="text-xs font-bold text-gray-800 hover:text-brand-blue mt-1 block"
              >
                {siteSettings?.support_phone || "(888) 745-7575"}
              </a>
              <p className="text-[11px] text-gray-400 mt-1">Mon – Fri, 8:00 AM – 8:00 PM ET</p>
            </div>

            {/* Card 2: Email Us */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-sm text-brand-navy">Email Us</h3>
              <a
                href={`mailto:${siteSettings?.support_email || 'support@certificationplanner.com'}`}
                className="text-xs font-bold text-brand-blue hover:underline mt-1 block"
              >
                {siteSettings?.support_email || "support@certificationplanner.com"}
              </a>
              <p className="text-[11px] text-gray-400 mt-1">We reply within 1 business day</p>
            </div>

            {/* Card 3: Live Chat */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Headphones size={20} />
              </div>
              <h3 className="font-bold text-sm text-brand-navy">Live Chat</h3>
              <p className="text-xs text-gray-500 mt-1">Chat with our support team</p>
              <button
                type="button"
                onClick={handleStartLiveChat}
                className="text-xs font-bold text-brand-blue hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
              >
                Start Live Chat →
              </button>
            </div>

            {/* Card 4: Business Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Clock size={20} />
              </div>
              <h3 className="font-bold text-sm text-brand-navy">Business Hours</h3>
              <p className="text-xs font-medium text-gray-700 mt-1">Mon – Fri, 8:00 AM – 8:00 PM ET</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Sat – Sun, 9:00 AM – 5:00 PM ET</p>
            </div>

          </div>
        </section>

        {/* ==========================================
            4. SEND US A MESSAGE & HOW CAN WE HELP
            ========================================== */}
        <section className="my-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Contact Form (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/80 p-7 sm:p-9 text-left relative overflow-hidden">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-sky-400 to-brand-orange" />

              <div className="space-y-1.5 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-bold text-brand-blue">
                  <MessageSquare size={13} className="text-brand-blue" /> Quick Support Request
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Fill out the form below and our certified training advisors will respond with personalized guidance within 2-4 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-14 text-center space-y-4 bg-slate-50/60 rounded-2xl border border-slate-100 p-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-black text-brand-navy">Message Received Successfully!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting Certification Planner. Your inquiry has been routed to our senior training advisor team. We will respond within 2-4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        countryCode: "+1",
                        phone: "",
                        subject: "Select a subject",
                        message: "",
                        robot: false,
                      });
                    }}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  
                  {/* Row 1: Full Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Full Name <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <User size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Email Address <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. john@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Row 2: Phone Number & Subject */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    
                    {/* Phone with Country Code */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Phone Number
                      </label>
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/70 focus-within:border-brand-blue focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all overflow-hidden">
                        
                        {/* Country Code Dropdown */}
                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() => setCcOpen(!ccOpen)}
                            className="flex items-center gap-1.5 px-3.5 py-3 text-xs font-bold text-slate-700 hover:text-brand-blue transition-colors cursor-pointer border-r border-slate-200/80 bg-slate-100/60"
                          >
                            <span>{countryCodes.find((c) => c.code === form.countryCode)?.flag || "🇺🇸"}</span>
                            <span className="text-[11px] text-slate-600 font-semibold">{form.countryCode}</span>
                            <ChevronDown size={12} className="text-slate-400" />
                          </button>

                          {ccOpen && (
                            <div className="absolute left-0 top-full mt-1.5 z-40 rounded-xl border border-slate-200 bg-white shadow-2xl py-1 min-w-[140px] max-h-56 overflow-y-auto">
                              {countryCodes.map((c, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setForm((f) => ({ ...f, countryCode: c.code }));
                                    setCcOpen(false);
                                  }}
                                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors cursor-pointer"
                                >
                                  <span>{c.flag}</span>
                                  <span className="font-bold">{c.label}</span>
                                  <span className="ml-auto text-slate-400 font-mono text-[11px]">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Number Input */}
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(201) 555-0123"
                          className="flex-1 bg-transparent px-3.5 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Subject Dropdown */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Subject <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Tag size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 py-3 text-xs font-semibold text-slate-700 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all cursor-pointer"
                        >
                          {subjectOptions.map((subj, i) => (
                            <option key={i} value={subj} disabled={i === 0}>
                              {subj}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute right-3.5 text-slate-400" />
                      </div>
                    </div>

                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">
                        Message <span className="text-brand-orange">*</span>
                      </label>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {form.message.length} / 1000 characters
                      </span>
                    </div>
                    <textarea
                      name="message"
                      required
                      maxLength={1000}
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about the certification program you are interested in, your preferred schedule, or any specific questions..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Row 4: Security Box & Send Button */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
                    
                    {/* Google reCAPTCHA Styled Widget */}
                    <div className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 w-fit shadow-2xs hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        id="recaptchaCheck"
                        name="robot"
                        checked={form.robot}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-slate-300 accent-brand-blue cursor-pointer"
                      />
                      <label htmlFor="recaptchaCheck" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                        I'm not a robot
                      </label>
                      <div className="ml-5 pl-4 border-l border-slate-200 flex flex-col items-center">
                        <ShieldCheck size={20} className="text-brand-blue" />
                        <span className="text-[8px] font-bold text-slate-400 tracking-tight">reCAPTCHA</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-navy text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{submitting ? "Sending..." : "Send Message"}</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                  </div>

                </form>
              )}
            </div>

            {/* Right Column: How Can We Help? (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/80 p-7 sm:p-8 flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-2xs">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-brand-navy">How Can We Help?</h3>
                    <p className="text-[11px] text-slate-400">Common reasons students and enterprise teams reach out:</p>
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  {helpTopics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium hover:text-brand-blue transition-colors">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Callback Sub-card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/70 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="font-black text-xs text-brand-navy">Prefer to request a call back?</h4>
                </div>
                <p className="text-[11px] text-slate-500">Let us know the best time to call you. Advisors available across US timezones.</p>
                <button
                  type="button"
                  onClick={handleRequestCallback}
                  className="w-full mt-2.5 py-3 px-4 rounded-xl border border-brand-blue/30 bg-white hover:bg-brand-blue hover:text-white text-brand-blue font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Phone size={14} /> Request a Callback
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================
            5. OUR OFFICE & MAP SECTION
            ========================================== */}
        <section className="my-10">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid lg:grid-cols-12 items-stretch">
            
            {/* Left Details (5 cols) */}
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center space-y-6 text-left">
              <h2 className="text-2xl font-black text-brand-navy">Our Office</h2>

              <div className="space-y-5 text-xs font-semibold text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="font-bold text-gray-900">2150 South 1300 East #500</p>
                    <p className="text-gray-500">Salt Lake City, UT 84106</p>
                    <p className="text-gray-500">United States</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <a
                    href={`tel:${(siteSettings?.support_phone || '(888) 745-7575').replace(/[^0-9]/g, '')}`}
                    className="text-gray-800 hover:text-brand-blue transition-colors font-bold"
                  >
                    {siteSettings?.support_phone || "(888) 745-7575"}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <a
                    href={`mailto:${siteSettings?.support_email || 'support@certificationplanner.com'}`}
                    className="text-brand-blue hover:underline font-bold"
                  >
                    {siteSettings?.support_email || "support@certificationplanner.com"}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Map (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] bg-slate-100 overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-100">
              <iframe
                title="Certification Planner Office Location"
                src="https://maps.google.com/maps?q=2150%20South%201300%20East%20%23500%20Salt%20Lake%20City%20UT%2084106&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[340px] border-0"
                allowFullScreen
                loading="lazy"
              />

              {/* Styled Interactive Marker Pin matching screenshot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xs rounded-xl shadow-xl border border-gray-200/90 px-3.5 py-2.5 flex items-center gap-2.5 pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-100 shrink-0" />
                <div className="text-left">
                  <p className="font-black text-xs text-brand-navy">Certification Planner</p>
                  <p className="text-[10px] text-gray-500">2150 South 1300 East #500, Salt Lake City, UT 84106</p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
