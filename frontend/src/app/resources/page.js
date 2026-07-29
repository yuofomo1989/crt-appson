"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  ArrowRight,
  ChevronRight,
  Clock,
  Calendar,
  Mail,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    label: "Agile and Project\nManagement",
    count: 48,
    color: "text-brand-green",
    bg: "bg-green-50",
    border: "border-green-100",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-brand-green">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
  },
  {
    label: "DevOps and\nSalesforce",
    count: 42,
    color: "text-brand-blue",
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-brand-blue">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    label: "Information\nSecurity",
    count: 36,
    color: "text-brand-orange",
    bg: "bg-orange-50",
    border: "border-orange-100",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-brand-orange">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z"/>
      </svg>
    ),
  },
  {
    label: "IT Service and\nArchitecture",
    count: 38,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-purple-600">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    ),
  },
  {
    label: "Lean and\nSix Sigma",
    count: 30,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-teal-600">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
  },
];

const featuredArticles = [
  {
    category: "AGILE AND PROJECT MANAGEMENT",
    categoryColor: "text-brand-green bg-green-50",
    title: "10 Agile Best Practices for Successful Project Delivery",
    excerpt: "Explore proven Agile practices that help teams improve collaboration, efficiency, and project outcomes.",
    date: "May 10, 2024",
    readTime: "6 min read",
    image: "/article_agile.jpg",
  },
  {
    category: "DEVOPS AND SALESFORCE",
    categoryColor: "text-brand-blue bg-blue-50",
    title: "DevOps Automation with Jenkins: A Complete Guide",
    excerpt: "Learn how to build efficient CI/CD pipelines using Jenkins and best automation practices.",
    date: "May 8, 2024",
    readTime: "7 min read",
    image: "/article_devops.jpg",
  },
  {
    category: "INFORMATION SECURITY",
    categoryColor: "text-brand-orange bg-orange-50",
    title: "Top 7 Cybersecurity Trends to Watch in 2024",
    excerpt: "Stay ahead of emerging threats and discover the key cybersecurity trends shaping the future.",
    date: "May 6, 2024",
    readTime: "5 min read",
    image: "/article_security.jpg",
  },
  {
    category: "IT SERVICE AND ARCHITECTURE",
    categoryColor: "text-purple-600 bg-purple-50",
    title: "ITIL 4 Best Practices for Modern IT Organizations",
    excerpt: "Explore how ITIL 4 can help organizations enhance service delivery and drive business value.",
    date: "May 3, 2024",
    readTime: "6 min read",
    image: "/article_it.jpg",
  },
  {
    category: "LEAN AND SIX SIGMA",
    categoryColor: "text-teal-600 bg-teal-50",
    title: "Lean Six Sigma vs Six Sigma: What's the Difference?",
    excerpt: "Understand the key differences and choose the right methodology for your process improvement goals.",
    date: "Apr 30, 2024",
    readTime: "5 min read",
    image: "/article_lean.jpg",
  },
];

const popularArticles = [
  {
    title: "What is Agile Methodology?",
    date: "Apr 25, 2024",
    readTime: "5 min read",
    image: "/article_agile.jpg",
  },
  {
    title: "Introduction to DevOps",
    date: "Apr 22, 2024",
    readTime: "4 min read",
    image: "/article_devops.jpg",
  },
  {
    title: "Information Security Certifications Worth Your Investment",
    date: "Apr 18, 2024",
    readTime: "6 min read",
    image: "/article_security.jpg",
  },
  {
    title: "ITIL 4 Certification: A Complete Overview",
    date: "Apr 15, 2024",
    readTime: "5 min read",
    image: "/article_it.jpg",
  },
  {
    title: "Six Sigma DMAIC Process Explained",
    date: "Apr 12, 2024",
    readTime: "5 min read",
    image: "/article_lean.jpg",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-800 font-medium">Resources</span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-12 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          {/* Text + Search */}
          <div className="lg:flex-1 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Resources</p>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy md:text-5xl">
              Insights. Guidance.<br />Career Growth.
            </h1>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Explore expert articles, tips, and industry insights to help you
              advance your skills, prepare for certifications, and stay ahead in your career.
            </p>
            {/* Search bar */}
            <div className="mt-7 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics, or keywords..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white hover:bg-opacity-90 transition-colors">
                <Search size={15} />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12 lg:mt-0 lg:flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Dot pattern */}
              <div className="absolute top-4 right-0 grid grid-cols-8 gap-1.5 opacity-20 z-0">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                ))}
              </div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                <Image
                  src="/resources_hero_laptop.jpg"
                  alt="Resources page on a laptop"
                  width={640}
                  height={480}
                  className="w-full object-cover"
                  priority
                />
              </div>
              {/* CP badge */}
              <div className="absolute -bottom-3 -left-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue text-white font-extrabold text-lg shadow-xl">
                CP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Category ────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-brand-navy">Browse by Category</h2>
            <button className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline">
              View All Categories <ArrowRight size={13} />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                className={`flex items-center gap-3 rounded-xl border ${cat.border} ${activeCategory === i ? "ring-2 ring-brand-blue" : ""} ${cat.bg} px-4 py-3 text-left hover:shadow-sm transition-all`}
              >
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${cat.bg} border ${cat.border}`}>
                  {cat.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 whitespace-pre-line leading-snug">{cat.label}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">Articles <span className="font-bold text-gray-600">{cat.count}</span></p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured + Popular ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-3">

          {/* Featured Articles — 2/3 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-brand-navy">Featured Articles</h2>
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline">
                View All Articles <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {featuredArticles.map((art, i) => (
                <Link
                  key={i}
                  href={i === 0 ? "/resources/agile-project-management" : "/resources"}
                  className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                  {/* Real image */}
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm bg-white/90 ${art.categoryColor}`}>
                        {art.category}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-xs font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                      {art.title}
                    </h3>
                    <p className="mt-2 text-[11px] text-gray-500 leading-relaxed flex-1">{art.excerpt}</p>
                    <div className="mt-3 flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={10} />{art.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{art.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Newsletter CTA card */}
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center text-center p-6 gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/8 text-brand-blue">
                  <Mail size={22} />
                </div>
                <h3 className="text-xs font-bold text-brand-navy leading-snug">Never Miss an Update</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Get the latest articles, tips, and resources delivered to your inbox.
                </p>
                <button
                  onClick={() => document.getElementById("newsletter-input")?.focus()}
                  className="mt-1 rounded-xl bg-brand-blue px-5 py-2 text-xs font-bold text-white hover:bg-opacity-90 transition-all shadow-sm"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Most Popular — 1/3 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={16} className="text-brand-orange" />
              <h2 className="text-base font-bold text-brand-navy">Most Popular</h2>
            </div>

            <div className="space-y-4">
              {popularArticles.map((art, i) => (
                <Link
                  key={i}
                  href={i === 0 ? "/resources/agile-project-management" : "/resources"}
                  className="group flex items-start gap-3 cursor-pointer hover:bg-white rounded-xl p-2 -mx-2 transition-all"
                >
                  {/* Number */}
                  <span className="flex-shrink-0 w-6 text-xs font-extrabold text-gray-300 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Real thumbnail */}
                  <div className="relative flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      {art.title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={9} />{art.date}</span>
                      <span className="flex items-center gap-1"><Clock size={9} />{art.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline">
              View All Popular Articles <ArrowRight size={13} />
            </button>

            {/* Ad / Promo sidebar card */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-navy to-[#003f70] p-5 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-2">Free Resource</p>
              <h3 className="text-sm font-bold leading-snug">2024 Certification Salary Guide</h3>
              <p className="mt-2 text-[11px] text-white/60 leading-relaxed">
                See how much certified professionals earn across 20+ specializations.
              </p>
              <button className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2 text-[11px] font-bold text-white hover:bg-opacity-90 transition-all">
                Download Free <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter Strip ──────────────────────────────────────────────── */}
      <section className="bg-brand-navy py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
              <Mail size={26} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Stay Informed. Stay Ahead.</h2>
              <p className="text-xs text-white/55 mt-1">
                Subscribe to our newsletter and get expert insights, career tips, and exclusive resources.
              </p>
            </div>
          </div>

          {/* Right — email form */}
          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-brand-green font-semibold text-sm">
                <CheckCircle size={18} /> Subscribed! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  id="newsletter-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-64 md:w-72 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-opacity-90 transition-all shadow-lg whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-2 text-[10px] text-white/35 text-center md:text-left">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
