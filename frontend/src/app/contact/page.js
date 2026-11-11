"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import {
  Phone,
  Mail,
  Headphones,
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Send,
  Check,
  User,
  Tag,
  Building2,
  Calendar,
  Award,
  RefreshCw,
  Navigation
} from "lucide-react";

const countryCodes = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+1-CA", flag: "🇨🇦", label: "CA" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+65", flag: "🇸🇬", label: "SG" }
];

const subjectOptions = [
  "Select a topic",
  "Questions about certifications (PMP, CAPM, LSS, CISSP, etc.)",
  "Help choosing the right training or certification path",
  "Course registration, scheduling, or rescheduling",
  "Corporate / enterprise training for your team",
  "Payment, invoice, or account support",
  "Technical assistance (access, login, certificates)"
];

const helpTopics = [
  "Questions about certifications (PMP, CAPM, LSS, CISSP, etc.)",
  "Help choosing the right training or certification path",
  "Course registration, scheduling, or rescheduling",
  "Corporate / enterprise training for your team",
  "Payment, invoice, or account support",
  "Technical assistance (access, login, certificates)"
];

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    subject: "Select a topic",
    message: "",
    robot: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.robot) {
      alert("Please check the 'I'm not a robot' security verification.");
      return;
    }
    if (form.subject === "Select a topic") {
      alert("Please select a topic for your inquiry.");
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          course: form.subject !== "Select a topic" ? form.subject : "Contact Us Page Inquiry",
          type: "inquiry",
          source: "Website Contact Us Page",
          message: form.message
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = (title) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("openConsultationModal", {
          detail: { title }
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased text-left flex flex-col justify-between">
      <Navbar siteSettings={siteSettings} />

      {/* ── 1. DYNAMIC CANVAS HERO + 4-CARD CONTACT STRIP ────────────────── */}
      <PageHeroBanner
        pageKey="contact"
        siteSettings={siteSettings}
        onSecondaryClick={() => openModal("Talk to a Training Advisor")}
        breadcrumb={
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="text-[#0066cc] hover:underline font-semibold">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-slate-700 font-semibold">Contact Us</span>
          </div>
        }
        bottomSlot={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* Card 1: Call Us */}
            <a
              href="tel:+18002071897"
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#eef5ff] border border-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#0f172a]">Call Us</p>
                  <p className="text-sm font-black text-[#0066cc] truncate">(800) 207-1897</p>
                  <p className="text-[10px] font-medium text-slate-500">Mon – Fri, 8:00 AM – 8:00 PM CT</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#0066cc] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Card 2: Email Us */}
            <a
              href="mailto:support@certificationplanner.com"
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#eef5ff] border border-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#0f172a]">Email Us</p>
                  <p className="text-[11px] font-black text-[#0f172a] truncate">
                    support@certificationplanner.com
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">We reply within 1 business day</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#0066cc] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Card 3: Live Chat */}
            <button
              type="button"
              onClick={() => openModal("Chat with Our Support Team")}
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#eef5ff] border border-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#0f172a]">Live Chat</p>
                  <p className="text-[11px] font-medium text-slate-600">Chat with our support team</p>
                  <p className="text-[11px] font-extrabold text-[#16a34a] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a] inline-block" />
                    Online Now
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#0066cc] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Card 4: Business Hours */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#eef5ff] border border-blue-100 text-[#0066cc] flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#0f172a]">Business Hours</p>
                  <p className="text-[10px] font-semibold text-slate-600">Mon – Fri: 8:00 AM – 8:00 PM CT</p>
                  <p className="text-[10px] font-medium text-slate-500">Sat – Sun: 9:00 AM – 5:00 PM CT</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#0066cc] shrink-0" />
            </div>
          </div>
        }
      />

      {/* ── 2. MAIN CONTENT: SEND US A MESSAGE + HOW CAN WE HELP ──────────── */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT COLUMN (7 Cols): Send Us a Message Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
            {/* Top Blue-to-Orange Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066cc] via-[#38bdf8] to-[#f97316]" />

            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-10 h-10 rounded-full bg-[#eef5ff] text-[#0066cc] flex items-center justify-center shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] leading-tight">
                    Send Us a Message
                  </h2>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                    Fill out the form below and our certified training advisors will respond with personalized guidance within 2–4 business hours.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 bg-slate-50 rounded-2xl border border-slate-200/80 p-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#16a34a] border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-black text-[#0f172a]">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting Certification Planner. Our training advisor team will get back to you within 2–4 business hours.
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
                        subject: "Select a topic",
                        message: "",
                        robot: false
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#0066cc] text-white font-bold text-xs cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-[#0f172a]">
                        Full Name <span className="text-[#f97316]">*</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. John Doe"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-[#0f172a]">
                        Email Address <span className="text-[#f97316]">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={15} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. john@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-[#0f172a]">Phone Number</label>
                      <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-[#0066cc]">
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleChange}
                          className="bg-slate-50 border-r border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code.replace("-CA", "")}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(201) 555-0123"
                          className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold text-[#0f172a]">
                        Subject <span className="text-[#f97316]">*</span>
                      </label>
                      <div className="relative">
                        <Tag size={15} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 outline-none focus:border-[#0066cc] cursor-pointer"
                        >
                          {subjectOptions.map((subj, idx) => (
                            <option key={idx} value={subj} disabled={idx === 0}>
                              {subj}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={15} className="text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-extrabold text-[#0f172a]">
                        Message <span className="text-[#f97316]">*</span>
                      </label>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-500">
                        {form.message.length} / 1,000 characters
                      </span>
                    </div>
                    <textarea
                      name="message"
                      required
                      maxLength={1000}
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about the certification program you are interested in, your preferred schedule, or any specific questions..."
                      className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0066cc] resize-none leading-relaxed"
                    />
                  </div>

                  {/* Row 4: reCAPTCHA + Orange Send Message Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <label className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 cursor-pointer select-none w-fit">
                      <input
                        type="checkbox"
                        name="robot"
                        checked={form.robot}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc]"
                      />
                      <span className="text-xs font-bold text-slate-700">I’m not a robot</span>
                      <div className="pl-3 ml-2 border-l border-slate-200 flex flex-col items-center">
                        <RefreshCw size={16} className="text-[#0066cc]" />
                        <span className="text-[8px] font-bold text-slate-400 mt-0.5">reCAPTCHA</span>
                      </div>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ea580c] hover:from-[#ea580c] hover:to-[#d9460f] px-8 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <span>{submitting ? "Sending..." : "Send Message"}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (5 Cols): How Can We Help? Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eef5ff] text-[#0066cc] flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0f172a]">How Can We Help?</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Common reasons our students and enterprise teams reach out:
                  </p>
                </div>
              </div>

              <ul className="space-y-3 pt-1">
                {helpTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-semibold text-slate-700">
                    <Check size={15} strokeWidth={3} className="text-[#0066cc] shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inner Sub-card: Prefer to speak with an advisor? */}
            <div className="rounded-2xl bg-[#f2f7ff] border border-blue-100 p-5 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-[#0066cc] flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone size={17} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-[#0f172a]">
                    Prefer to speak with an advisor?
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                    Let us know the best time to call you. Advisors available across US time zones.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openModal("Request a Callback")}
                className="w-full rounded-full border-2 border-[#0066cc] bg-white hover:bg-blue-50 py-2.5 px-4 text-xs font-extrabold text-[#0066cc] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar size={14} />
                <span>Request a Callback</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. OUR OFFICE & INTERACTIVE MAP CARD ─────────────────────────── */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eef5ff] text-[#0066cc] flex items-center justify-center shrink-0">
                <Building2 size={20} />
              </div>
              <h2 className="text-xl font-black text-[#0f172a]">Our Office</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1 text-xs">
              {/* Address Column */}
              <div className="flex items-start gap-3 sm:border-r border-slate-200/80 sm:pr-4">
                <MapPin size={17} className="text-[#0066cc] shrink-0 mt-0.5" />
                <div className="space-y-1 font-medium text-slate-600">
                  <p className="font-extrabold text-[#0f172a]">2150 South 1300 East #500</p>
                  <p>Salt Lake City, UT 84106</p>
                  <p>United States</p>
                </div>
              </div>

              {/* Phone, Email & Get Directions Column */}
              <div className="space-y-2.5 font-bold text-[#0f172a]">
                <a
                  href="tel:+18002071897"
                  className="flex items-center gap-2.5 hover:text-[#0066cc] transition-colors"
                >
                  <Phone size={15} className="text-[#0066cc] shrink-0" />
                  <span>(800) 207-1897</span>
                </a>
                <a
                  href="mailto:support@certificationplanner.com"
                  className="flex items-center gap-2.5 hover:text-[#0066cc] transition-colors"
                >
                  <Mail size={15} className="text-[#0066cc] shrink-0" />
                  <span className="truncate">support@certificationplanner.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=2150+South+1300+East+%23500+Salt+Lake+City+UT+84106"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#0066cc] hover:underline font-extrabold pt-0.5"
                >
                  <Navigation size={14} className="text-[#0066cc]" />
                  <span>Get Directions →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Map Container with Pin Card */}
          <div className="lg:col-span-6 relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <iframe
              title="Certification Planner Office Location"
              src="https://maps.google.com/maps?q=2150%20South%201300%20East%20%23500%20Salt%20Lake%20City%20UT%2084106&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />

            {/* Floating Pin Info Card matching Reference */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
                <MapPin size={18} />
              </div>
              <div className="bg-white/95 backdrop-blur-xs rounded-xl shadow-lg border border-slate-200 px-3.5 py-2 text-left">
                <p className="text-xs font-black text-[#0f172a]">Certification Planner</p>
                <p className="text-[10px] font-medium text-slate-600">2150 South 1300 East #500</p>
                <p className="text-[10px] font-medium text-slate-600">Salt Lake City, UT 84106</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. BOTTOM DARK NAVY CTA BANNER (READY TO ADVANCE YOUR CAREER?) ── */}
        <section className="pb-2">
          <div className="rounded-3xl bg-gradient-to-r from-[#081d42] via-[#0c2d66] to-[#081d42] px-6 py-7 sm:px-10 sm:py-8 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#0f172a] flex items-center justify-center shadow-md shrink-0">
                <Award size={32} strokeWidth={2.2} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Ready to Advance Your Career?
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
                  Explore our certification programs or get personalized guidance from our team.
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
              <button
                type="button"
                onClick={() => openModal("Talk to a Training Advisor")}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-300/40 bg-white/10 hover:bg-white/15 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white transition-all cursor-pointer"
              >
                <Headphones size={15} />
                <span>Talk to a Training Advisor</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
