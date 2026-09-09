"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import Link from "next/link";
import { BookOpen, User, Calendar, ArrowRight, Eye, Search } from "lucide-react";

export default function BlogListingPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [aRes, cRes] = await Promise.all([
          fetch(`${apiUrl}/articles`),
          fetch(`${apiUrl}/article-categories`)
        ]);
        const aData = await aRes.json();
        const cData = await cRes.json();
        if (aData.status === "success" && aData.data) setArticles(aData.data);
        if (cData.status === "success" && cData.data) setCategories(cData.data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogData();
  }, []);

  const filteredArticles = articles.filter(art => {
    const matchCategory = selectedCategory === "All" || (art.category_name || "").toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = !searchQuery || (art.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || (art.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-brand-navy to-slate-900 text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold font-mono border border-brand-blue/30 inline-block">
            📰 Career Insights & Tech Articles
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Latest Industry Insights & Certification Guides
          </h1>
          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Expert articles, exam study strategies, career growth tips, and technology trends to keep you ahead in your professional career.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 flex-1 space-y-8 w-full">
        {/* Category Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
          {/* Categories Horizontal Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.name
                    ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-gray-800 outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 animate-pulse">
                <div className="h-44 bg-slate-100 rounded-2xl w-full"></div>
                <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
              </div>
            ))
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((art, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div>
                  {/* Article Thumbnail */}
                  <div className="h-48 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={art.image || "/article_green_project_hero.jpg"}
                      alt={art.title}
                      className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-navy/80 backdrop-blur-md text-brand-orange text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      {art.category_name || "Insight"}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 space-y-3 text-left">
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold">
                      <span className="flex items-center gap-1"><User size={12} className="text-brand-blue" /> {art.author || "Editorial Team"}</span>
                      <span className="flex items-center gap-1"><Eye size={12} className="text-emerald-500" /> {art.views || 120} views</span>
                    </div>

                    <h3 className="text-base font-black text-brand-navy leading-snug line-clamp-2 hover:text-brand-blue transition-colors">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-xs text-gray-500 font-medium line-clamp-3 leading-relaxed">
                      {art.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-left">
                  <Link
                    href={`/blog/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors"
                  >
                    Read Full Article <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400 font-medium">
              No articles found matching your selected filters.
            </div>
          )}
        </div>
      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
