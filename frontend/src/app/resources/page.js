"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  BookOpen,
  Sparkles,
  Filter
} from "lucide-react";

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  
  const [dbArticles, setDbArticles] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResourceData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [aRes, cRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/articles`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/article-categories`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then(r => r.json()).catch(() => null)
        ]);

        if (aRes.status === "success" && Array.isArray(aRes.data)) {
          setDbArticles(aRes.data);
        }
        if (cRes.status === "success" && Array.isArray(cRes.data)) {
          setDbCategories(cRes.data);
        }
        if (sRes) {
          setSiteSettings(sRes);
        }
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
    const matchCat = activeCategory === null || 
      (art.category_name || "").toLowerCase() === activeCategory.toLowerCase() ||
      (art.category_slug || "").toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = !search || 
      (art.title || "").toLowerCase().includes(search.toLowerCase()) || 
      (art.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white text-left">
      <Navbar siteSettings={siteSettings} />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-800 font-medium">Resources &amp; Articles</span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-12 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          {/* Text + Search */}
          <div className="lg:flex-1 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">RESOURCE HUB</p>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy md:text-5xl">
              Insights. Guidance.<br />Career Growth.
            </h1>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Explore {dbArticles.length}+ expert articles, exam preparation tips, salary benchmarks, and industry insights to help you advance your career.
            </p>
            {/* Search bar */}
            <div className="mt-7 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search articles, topics, or keywords..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white hover:bg-opacity-90 transition-colors">
                <Search size={15} />
              </button>
            </div>
          </div>

          {/* Hero Stats Card */}
          <div className="mt-10 lg:mt-0 lg:flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-gradient-to-br from-slate-900 to-brand-navy rounded-3xl p-8 text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-brand-orange">Knowledge Base</span>
                <span className="text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20">
                  {dbArticles.length} Articles Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-3xl font-black text-brand-orange">{dbCategories.length}</div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">Categories</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">Free Access</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Written by accredited instructors and enterprise leaders covering PMP, CISSP, Lean Six Sigma, Salesforce, and modern tech frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Category ────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-brand-navy">Browse by Category</h2>
            {activeCategory && (
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setVisibleCount(12);
                }}
                className="text-xs font-bold text-brand-blue hover:underline"
              >
                Clear Filter (Show All)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => {
                setActiveCategory(null);
                setVisibleCount(12);
              }}
              className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                activeCategory === null
                  ? "ring-2 ring-brand-blue bg-blue-50/80 border-blue-200"
                  : "bg-gray-50 border-gray-100 hover:bg-slate-100"
              }`}
            >
              <p className="text-xs font-bold text-gray-800">All Resources</p>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{dbArticles.length} Articles</p>
            </button>

            {dbCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setVisibleCount(12);
                }}
                className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  activeCategory === cat.name
                    ? "ring-2 ring-brand-blue bg-blue-50/80 border-blue-200"
                    : "bg-gray-50 border-gray-100 hover:bg-slate-100"
                }`}
              >
                <p className="text-xs font-bold text-gray-800 truncate" title={cat.name}>{cat.name}</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{cat.count} Articles</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-brand-navy">
                {activeCategory ? `${activeCategory} Articles` : "All Articles & Guides"}
              </h2>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">
                Showing {displayedArticles.length} of {filteredArticles.length} resources
              </p>
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedArticles.map((art, i) => (
                <Link
                  key={art.id || i}
                  href={`/blog/${art.slug}`}
                  className="group rounded-2xl bg-white shadow-xs border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <img
                        src={art.image || "/article_green_project_hero.jpg"}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider backdrop-blur-md bg-white/95 text-brand-blue shadow-xs">
                          {art.category_name || "ARTICLE"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-sm font-black text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-medium">
                        {art.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(art.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-brand-blue font-bold group-hover:underline flex items-center gap-1">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center space-y-4">
              <p className="text-base font-bold text-gray-700">No articles matched your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory(null); }}
                className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
              >
                Clear Search &amp; Show All
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > visibleCount && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-brand-navy hover:bg-slate-50 font-bold text-xs shadow-xs transition-all hover:border-brand-blue"
              >
                Load More Articles ({filteredArticles.length - visibleCount} Remaining) ↓
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter Subscribe ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
            <Mail size={22} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-brand-navy">Never Miss an Industry Update</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Get the latest certification updates, free career roadmaps, and expert articles delivered directly to your inbox.
            </p>
          </div>
          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold">
              🎉 Thank you for subscribing! We'll keep you updated.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-brand-blue px-6 py-3 font-bold text-white text-xs hover:bg-opacity-90 shadow-sm"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
