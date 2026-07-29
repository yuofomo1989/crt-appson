"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  ChevronDown,
  Send,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    line1: "(888) 745-7575",
    line2: "Mon – Fri, 8:00 AM – 8:00 PM ET",
    href: "tel:8887457575",
    linkLabel: null,
  },
  {
    icon: Mail,
    title: "Email Us",
    line1: "support@certificationplanner.com",
    line2: "We reply within 1 business day",
    href: "mailto:support@certificationplanner.com",
    linkLabel: null,
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    line1: "Chat with our support team",
    line2: null,
    href: "#chat",
    linkLabel: "Start Live Chat",
  },
  {
    icon: Clock,
    title: "Business Hours",
    line1: "Mon – Fri, 8:00 AM – 8:00 PM ET",
    line2: "Sat – Sun, 9:00 AM – 5:00 PM ET",
    href: null,
    linkLabel: null,
  },
];

const helpTopics = [
  "Questions about certifications",
  "Help choosing the right training",
  "Registration or account support",
  "Order, invoice or payment inquiries",
  "Corporate training solutions",
  "Technical support",
];

const subjects = [
  "Select a subject",
  "Course Information",
  "Registration & Enrollment",
  "Billing & Payments",
  "Technical Support",
  "Corporate Training",
  "Exam Scheduling",
  "Other",
];

const countryCodes = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+1", flag: "🇨🇦", label: "CA" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
    subject: "Select a subject",
    message: "",
    robot: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [ccOpen, setCcOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-800 font-medium">Contact Us</span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          {/* Text */}
          <div className="lg:flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy md:text-5xl">
              We're Here<br />to Help You
            </h1>
            <p className="mt-5 max-w-md text-sm text-gray-500 leading-relaxed">
              Have a question or need guidance? Our team is ready to help you choose
              the right certification path and achieve your goals.
            </p>
          </div>

          {/* Illustration */}
          <div className="mt-10 lg:mt-0 lg:flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Background blob */}
              <div className="absolute inset-0 rounded-3xl bg-blue-50 -rotate-3 scale-105" />
              {/* Support agent illustration (SVG placeholder) */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center min-h-[240px]">
                {/* Agent avatar */}
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-navy shadow-xl">
                    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
                      <circle cx="40" cy="28" r="16" fill="white" fillOpacity="0.9"/>
                      <path d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30" fill="white" fillOpacity="0.9"/>
                      {/* headset */}
                      <path d="M24 26a16 16 0 0 1 32 0" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <rect x="20" y="24" width="6" height="10" rx="3" fill="#FF6B00"/>
                      <rect x="54" y="24" width="6" height="10" rx="3" fill="#FF6B00"/>
                    </svg>
                  </div>
                  <p className="mt-4 text-sm font-bold text-brand-navy">Support Team</p>
                  <p className="text-xs text-gray-500">Available Mon–Fri, 8AM–8PM ET</p>
                  {/* Chat bubbles */}
                  <div className="mt-4 flex items-start gap-2">
                    <div className="rounded-2xl rounded-tl-none bg-brand-blue px-3 py-2 text-[11px] font-medium text-white shadow">
                      How can I help you? 👋
                    </div>
                  </div>
                  <div className="mt-2 flex items-start gap-2 justify-end">
                    <div className="rounded-2xl rounded-tr-none bg-white border border-gray-200 px-3 py-2 text-[11px] font-medium text-gray-700 shadow-sm">
                      I need help with my exam prep
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Methods ───────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {contactMethods.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue mb-4">
                    <Icon size={22} />
                  </div>
                  <p className="text-sm font-bold text-brand-navy">{m.title}</p>
                  {m.href && !m.linkLabel ? (
                    <a href={m.href} className="mt-1 block text-xs font-semibold text-brand-blue hover:underline">
                      {m.line1}
                    </a>
                  ) : (
                    <p className="mt-1 text-xs font-semibold text-brand-blue">{m.line1}</p>
                  )}
                  {m.line2 && <p className="mt-0.5 text-[11px] text-gray-400">{m.line2}</p>}
                  {m.linkLabel && (
                    <a href={m.href} className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-blue hover:underline">
                      {m.linkLabel} <ArrowRight size={10} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Help Panel ─────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-3">

          {/* Form — 2/3 width */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-brand-navy">Send Us a Message</h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            {submitted ? (
              <div className="mt-10 flex flex-col items-center text-center py-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">Message Sent!</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                  Thank you for reaching out. Our team will respond within 1 business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", countryCode:"+1", subject:"Select a subject", message:"", robot:false }); }}
                  className="mt-6 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-opacity-90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Row 1: Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Full Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Email Address <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Subject */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Phone with country code */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      {/* Country code selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setCcOpen(!ccOpen)}
                          className="flex h-full items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-blue focus:outline-none transition-all"
                        >
                          <span>{countryCodes.find(c => c.code === form.countryCode)?.flag || "🇺🇸"}</span>
                          <span className="text-xs">{form.countryCode}</span>
                          <ChevronDown size={12} className="text-gray-400" />
                        </button>
                        {ccOpen && (
                          <div className="absolute left-0 top-full mt-1 z-30 rounded-xl border border-gray-100 bg-white shadow-xl py-1 min-w-[120px]">
                            {countryCodes.map((c, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => { setForm(f => ({ ...f, countryCode: c.code })); setCcOpen(false); }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                              >
                                <span>{c.flag}</span>
                                <span>{c.label}</span>
                                <span className="ml-auto text-gray-400">{c.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(201) 555-0123"
                        className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Subject <span className="text-brand-orange">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all pr-10"
                      >
                        {subjects.map((s, i) => (
                          <option key={i} value={s} disabled={i === 0}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                    Message <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    maxLength={1000}
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all resize-none"
                  />
                  <p className="mt-1 text-right text-[11px] text-gray-400">
                    {form.message.length}/1000 characters
                  </p>
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 w-fit">
                  <input
                    type="checkbox"
                    id="robot"
                    name="robot"
                    checked={form.robot}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 accent-brand-blue"
                  />
                  <label htmlFor="robot" className="text-sm text-gray-700 font-medium select-none">
                    I'm not a robot
                  </label>
                  <div className="ml-4 flex flex-col items-center opacity-60">
                    <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
                      <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9" opacity=".15"/>
                      <path d="M32 8c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8z" fill="#4A90D9" opacity=".3"/>
                      <path d="M44 28l-8-8-4 4-4-4-8 8 4 4-4 4 8 8 4-4 4 4 8-8-4-4 4-4z" fill="#4A90D9"/>
                    </svg>
                    <span className="text-[8px] text-gray-400 mt-0.5">reCAPTCHA</span>
                    <span className="text-[7px] text-gray-300">Privacy · Terms</span>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-opacity-90 hover:shadow-lg transition-all"
                  >
                    Send Message <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Help Panel — 1/3 width */}
          <div className="space-y-5">
            {/* How Can We Help */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">How Can We Help?</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Here are some common reasons people reach out to us.</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {helpTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-gray-600">
                    <CheckCircle size={14} className="flex-shrink-0 text-brand-blue" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Request Callback */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-brand-navy">Prefer to request a call back?</h3>
              <p className="mt-1 text-xs text-gray-400">Let us know the best time to call you.</p>
              <Link
                href="/profile"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-blue px-4 py-2.5 text-xs font-bold text-brand-blue hover:bg-brand-blue hover:text-white transition-all"
              >
                <Phone size={13} /> Request a Callback
              </Link>
            </div>

            {/* Quick response guarantee */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-[#003f70] p-6 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 mb-4">
                <Clock size={20} />
              </div>
              <h3 className="text-sm font-bold">Fast Response Guarantee</h3>
              <p className="mt-2 text-xs text-white/65 leading-relaxed">
                We respond to all inquiries within 1 business day. Urgent matters
                are escalated within 4 hours during business hours.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-xs text-white/70">Support team is online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office + Map ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-stretch">
            {/* Office Info */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-brand-navy mb-6">Our Office</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">123 Main Street, Suite 400</p>
                    <p className="text-sm text-gray-500">New York, NY 10001</p>
                    <p className="text-sm text-gray-500">United States</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                    <Phone size={18} />
                  </div>
                  <a href="tel:8887457575" className="text-sm font-semibold text-gray-800 hover:text-brand-blue transition-colors">
                    (888) 745-7575
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:support@certificationplanner.com" className="text-sm font-semibold text-gray-800 hover:text-brand-blue transition-colors break-all">
                    support@certificationplanner.com
                  </a>
                </div>
              </div>

              {/* Business hours table */}
              <div className="mt-8 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Business Hours</p>
                <div className="space-y-2 text-xs">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM ET" },
                    { day: "Saturday", hours: "9:00 AM – 5:00 PM ET" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-600 font-medium">{row.day}</span>
                      <span className={`font-semibold ${row.hours === "Closed" ? "text-red-400" : "text-brand-navy"}`}>
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-100 min-h-[360px]">
              <iframe
                title="Certification Planner Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617946!2d-73.9908823!3d40.7484404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca05ca48ab5b01f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "360px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-navy py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold text-white">Still have questions?</p>
            <p className="text-sm text-white/60 mt-1">
              Browse our FAQ or explore our full catalog of certification programs.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white hover:bg-opacity-90 transition-all"
            >
              Browse Certifications <ArrowRight size={15} />
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
