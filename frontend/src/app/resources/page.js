"use client";

import React, { useState, useEffect } from "react";
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

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const [dbArticles, setDbArticles] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResourceData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [aRes, cRes] = await Promise.all([
          fetch(`${apiUrl}/articles`),
          fetch(`${apiUrl}/article-categories`)
        ]);
        const aData = await aRes.json();
        const cData = await cRes.json();
        if (aData.status === "success" && aData.data) setDbArticles(aData.data);
        if (cData.status === "success" && cData.data) setDbCategories(cData.data);
      } catch (err) {
        console.error("Error fetching resources data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResourceData();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const filteredArticles = dbArticles.filter(art => {
    const matchCat = activeCategory === null || (art.category_name || "").toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = !search || (art.title || "").toLowerCase().includes(search.toLowerCase()) || (art.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const popularArticles = [...dbArticles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-left">
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
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">RESOURCES</p>
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
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-slate-900">
                <img
                  src="/resources_hero_laptop.jpg"
                  alt="Resources page on a laptop"
                  className="w-full h-auto object-cover"
                  onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
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
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
            >
              View All Categories <ArrowRight size={13} />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources"
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left hover:shadow-sm transition-all ${
                activeCategory === null ? "ring-2 ring-brand-blue bg-blue-50/80 border-blue-200" : "bg-gray-50 border-gray-100"
              }`}
            >
              <div>
                <p className="text-xs font-bold text-gray-800 leading-snug">All Resources</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Articles <span className="font-bold text-gray-600">{dbArticles.length}</span></p>
              </div>
            </Link>
            {dbCategories.map((cat, i) => (
              <Link
                key={i}
                href={`/resources/category/${cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left hover:shadow-sm transition-all ${
                  activeCategory === cat.name ? "ring-2 ring-brand-blue bg-blue-50/80 border-blue-200" : "bg-gray-50 border-gray-100"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-snug">{cat.name}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                    Articles <span className="font-bold text-gray-600">{dbArticles.filter(a => (a.category_name || '').toLowerCase() === cat.name.toLowerCase()).length}</span>
                  </p>
                </div>
              </Link>
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
              <button onClick={() => { setActiveCategory(null); setSearch(""); }} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline">
                View All Articles <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {filteredArticles.map((art, i) => (
                <Link
                  key={i}
                  href={`/blog/${art.slug}`}
                  className="group rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden bg-slate-900">
                    <img
                      src={art.image || "/article_green_project_hero.jpg"}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm bg-white/90 text-brand-blue">
                        {art.category_name || "INSIGHT"}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-xs font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="mt-2 text-[11px] text-gray-500 leading-relaxed flex-1 line-clamp-2">{art.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={10} />{new Date(art.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{art.views || 120} views</span>
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
                  href={`/blog/${art.slug}`}
                  className="group flex items-start gap-3 cursor-pointer hover:bg-white rounded-xl p-2 -mx-2 transition-all"
                >
                  {/* Number */}
                  <span className="flex-shrink-0 w-6 text-xs font-extrabold text-gray-300 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Real thumbnail */}
                  <div className="relative flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden shadow-sm bg-slate-900">
                    <img
                      src={art.image || "/article_green_project_hero.jpg"}
                      alt={art.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      {art.title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={9} />{new Date(art.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={9} />{art.views || 120} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button onClick={() => { setActiveCategory(null); setSearch(""); }} className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline">
              View All Popular Articles <ArrowRight size={13} />
            </button>

            {/* Ad / Promo sidebar card */}
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-navy to-[#003f70] p-5 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-2">Free Resource</p>
              <h3 className="text-sm font-bold leading-snug">2026 Certification Salary Guide</h3>
              <p className="mt-2 text-[11px] text-white/60 leading-relaxed">
                See how much certified professionals earn across 20+ specializations.
              </p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title: "Download Free Salary Guide" } }));
                  }
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2 text-[11px] font-bold text-white hover:bg-opacity-90 transition-all cursor-pointer"
              >
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
