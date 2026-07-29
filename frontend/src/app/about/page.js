"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Award,
  Users,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  BookOpen,
  Target,
  Quote,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { value: "50,000+", label: "Professionals Trained", icon: Users },
  { value: "200+", label: "Certification Programs", icon: BookOpen },
  { value: "95%", label: "First-Attempt Pass Rate", icon: Target },
  { value: "15+", label: "Years of Excellence", icon: Award },
];

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Every course is designed by certified industry veterans and updated regularly to reflect the latest exam changes and best practices.",
    color: "from-blue-500 to-brand-blue",
  },
  {
    icon: Heart,
    title: "Student-First Approach",
    description:
      "We don't just teach — we mentor. Our instructors are invested in your success and available long after class ends.",
    color: "from-orange-400 to-brand-orange",
  },
  {
    icon: Zap,
    title: "Guaranteed Results",
    description:
      "Our Exam Pass Guarantee means if you don't pass on your first try, you retrain for free. Zero risk for you.",
    color: "from-emerald-400 to-brand-green",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Training professionals across 40+ countries with live online classes, flexible schedules, and regional instructors.",
    color: "from-purple-400 to-purple-600",
  },
];

const milestones = [
  {
    year: "2009",
    title: "Founded",
    desc: "Started with a single PMP® boot camp in Chicago with 12 students.",
  },
  {
    year: "2013",
    title: "PMI ATP Authorized",
    desc: "Became an official PMI Authorized Training Partner, one of the first in the US.",
  },
  {
    year: "2017",
    title: "Global Expansion",
    desc: "Launched live online training, reaching professionals across 6 continents.",
  },
  {
    year: "2021",
    title: "50K Milestone",
    desc: "Surpassed 50,000 certified professionals across 200+ training programs.",
  },
  {
    year: "2024",
    title: "AI-Powered Learning",
    desc: "Launched adaptive practice exams powered by AI for personalized preparation.",
  },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    credentials: "PMP, CISSP, MBA",
    bio: "20+ years in enterprise training. Former PMI board advisor.",
    avatar: "SM",
    color: "from-brand-blue to-blue-700",
  },
  {
    name: "James Okonkwo",
    role: "Chief Learning Officer",
    credentials: "PMP, ACP, CSM",
    bio: "Led curriculum development for Fortune 500 training programs.",
    avatar: "JO",
    color: "from-brand-orange to-orange-600",
  },
  {
    name: "Priya Nair",
    role: "Head of Partnerships",
    credentials: "CISSP, CISM",
    bio: "Built relationships with PMI, (ISC)², AWS and 30+ certification bodies.",
    avatar: "PN",
    color: "from-emerald-500 to-brand-green",
  },
  {
    name: "Daniel Torres",
    role: "Lead Instructor",
    credentials: "PMP, Lean Six Sigma BB",
    bio: "Trained 8,000+ professionals. 98% student satisfaction rate.",
    avatar: "DT",
    color: "from-purple-500 to-purple-700",
  },
];

const testimonials = [
  {
    name: "Michael R.",
    role: "Senior PM, Deloitte",
    text: "Certification Planner's boot camp was the single best investment I made in my career. Passed PMP on my first attempt after just 5 days.",
    rating: 5,
  },
  {
    name: "Ayesha K.",
    role: "Cloud Architect, Microsoft",
    text: "The AWS prep course was incredibly thorough. The instructors actually worked at AWS and brought real-world scenarios I hadn't seen anywhere else.",
    rating: 5,
  },
  {
    name: "Carlos M.",
    role: "CISO, FinTech Startup",
    text: "I was skeptical about online training. But the live format felt more engaging than in-person classes I've attended. Genuinely impressed.",
    rating: 5,
  },
];

const partners = [
  "PMI", "AXELOS", "(ISC)²", "AWS", "CompTIA", "Scrum Alliance", "ISACA",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#003a63] to-[#004f80] text-white">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-blue opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-orange opacity-10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:flex lg:items-center lg:gap-16">
          {/* Text */}
          <div className="lg:flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-orange backdrop-blur-sm">
              <Award size={12} /> Our Story
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Empowering Careers<br />
              <span className="text-brand-orange">One Certification</span><br />
              at a Time
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 leading-relaxed">
              Since 2009, Certification Planner has helped over 50,000 professionals
              earn the credentials they need to advance, lead, and thrive. We exist
              because we believe the right training changes lives.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-opacity-90 transition-all hover:shadow-xl"
              >
                Explore Courses <ArrowRight size={16} />
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Free Consultation
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12 lg:mt-0 lg:flex-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/about_us_professionals.jpg"
                alt="Certification Planner team of professionals"
                width={640}
                height={420}
                className="w-full object-cover"
                priority
              />
              {/* overlay badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green text-white">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">95% Pass Rate</p>
                  <p className="text-[10px] text-gray-500">First-attempt success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/8 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 mb-3">
                    <Icon size={22} />
                  </div>
                  <p className="text-3xl font-extrabold text-brand-navy">{s.value}</p>
                  <p className="mt-1 text-xs font-medium text-gray-500">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-gray-100">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white mb-6">
                <Target size={22} />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">Our Mission</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                To democratize access to world-class professional training — removing
                the barriers of cost, geography, and complexity so that every
                motivated professional can earn the credentials they deserve.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Vetted, expert-led instruction",
                  "Transparent, competitive pricing",
                  "Flexible schedules for working professionals",
                  "Ongoing support after course completion",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="rounded-3xl bg-brand-navy p-10 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white mb-6">
                <Globe size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                A world where professional growth is limited only by ambition — not
                by access. We envision becoming the world's most trusted certification
                training platform, known for outcomes, not just programs.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Countries Reached", val: "40+" },
                  { label: "Instructor Rating", val: "4.9★" },
                  { label: "Programs Offered", val: "200+" },
                  { label: "Exam Pass Guarantee", val: "✓" },
                ].map((kv, i) => (
                  <div key={i} className="rounded-xl bg-white/8 p-4">
                    <p className="text-xl font-extrabold text-brand-orange">{kv.val}</p>
                    <p className="mt-1 text-xs text-white/60">{kv.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-brand-blue/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              What Drives Us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-brand-navy md:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              These aren't posters on a wall — they're the principles that shape every
              decision we make from curriculum design to student support.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-white mb-5`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy">{v.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
              Our Journey
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-brand-navy md:text-4xl">
              15+ Years of Growth
            </h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-orange to-brand-green md:left-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"} pl-14 md:pl-0`}>
                    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 ${i % 2 === 0 ? "" : ""}`}>
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">{m.year}</span>
                      <h3 className="mt-1 text-base font-bold text-brand-navy">{m.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  {/* dot */}
                  <div className="absolute left-3.5 top-5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue ring-4 ring-white md:relative md:left-auto md:top-auto md:self-start md:mt-5 z-10">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  {/* spacer for alternating layout */}
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-brand-navy/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-navy">
              The People
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-brand-navy md:text-4xl">
              Meet Our Leadership
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Industry practitioners who've been in your shoes — and came back to help you succeed.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-xl font-extrabold text-white shadow-lg`}>
                  {member.avatar}
                </div>
                <h3 className="mt-5 text-base font-bold text-brand-navy">{member.name}</h3>
                <p className="text-xs font-semibold text-brand-blue">{member.role}</p>
                <p className="mt-1 text-[11px] text-brand-orange font-medium">{member.credentials}</p>
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-navy to-[#004080] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-orange backdrop-blur-sm">
            Student Stories
          </span>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Words from Our Alumni
          </h2>
          <p className="mt-3 text-white/60 text-sm">
            50,000+ success stories and counting.
          </p>

          {/* Testimonial Card */}
          <div className="mt-12 relative">
            <div className="rounded-3xl bg-white/10 p-8 md:p-12 backdrop-blur-sm border border-white/10">
              <Quote className="mx-auto mb-6 text-brand-orange" size={32} />
              <p className="text-lg font-medium text-white/90 leading-relaxed md:text-xl">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white font-bold text-sm">
                  {testimonials[activeTestimonial].name[0]}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{testimonials[activeTestimonial].name}</p>
                  <p className="text-xs text-white/50">{testimonials[activeTestimonial].role}</p>
                </div>
                <div className="ml-2 flex gap-0.5">
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />
                  ))}
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? "w-8 bg-brand-orange"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
            Authorized by & partnered with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((p, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-500 shadow-xs hover:text-brand-blue hover:border-brand-blue hover:shadow-sm transition-all duration-200"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-navy p-12 shadow-2xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white mb-6">
              <Zap size={26} />
            </div>
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              Ready to Level Up Your Career?
            </h2>
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
              Join tens of thousands of professionals who have accelerated their careers
              with Certification Planner. Your next certification is closer than you think.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-opacity-90 transition-all"
              >
                Browse Certifications <ArrowRight size={16} />
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
