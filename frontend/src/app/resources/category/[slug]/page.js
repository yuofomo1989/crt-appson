"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowRight, Calendar, Clock, Eye, User, BookOpen } from "lucide-react";

export default function ResourceCategoryPage() {
  const params = useParams();
  const catSlug = params?.slug;

  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [cRes, aRes] = await Promise.all([
          fetch(`${apiUrl}/article-categories`),
          fetch(`${apiUrl}/articles`)
        ]);
        const cData = await cRes.json();
        const aData = await aRes.json();

        if (cData.status === "success" && cData.data) {
          setAllCategories(cData.data);
          const found = cData.data.find(c => (c.slug || "").toLowerCase() === (catSlug || "").toLowerCase());
          setCategory(found || { name: catSlug ? catSlug.replace(/-/g, ' ').toUpperCase() : "Category" });
        }
        if (aData.status === "success" && aData.data) {
          setArticles(aData.data);
        }
      } catch (err) {
        console.error("Error loading resource category page:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryData();
  }, [catSlug]);

  const catArticles = articles.filter(art => 
    (art.category_name || "").toLowerCase() === (category?.name || "").toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between text-left">
      <Navbar />

      {/* Breadcrumb Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link href="/resources" className="hover:text-brand-blue">Resources</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-900 font-bold capitalize">{category?.name}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-brand-navy to-slate-900 text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold font-mono border border-brand-blue/30 inline-block uppercase">
            📁 Category Archive
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight capitalize">
            {category?.name} Resources & Articles
          </h1>
          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Explore curated guides, exam strategies, and industry insights under <span className="text-brand-orange font-bold">{category?.name}</span>.
          </p>
        </div>
      </section>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 flex-1 space-y-10 w-full">
        {/* Category Pills Strip */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-4 rounded-3xl border border-gray-100 shadow-xs">
          <Link
            href="/resources"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-gray-600 hover:bg-slate-200 transition-all"
          >
            All Resources
          </Link>
          {allCategories.map((c, idx) => {
            const isActive = (c.slug || "").toLowerCase() === (catSlug || "").toLowerCase();
            return (
              <Link
                key={idx}
                href={`/resources/category/${c.slug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 animate-pulse">
                <div className="h-44 bg-slate-100 rounded-2xl w-full"></div>
                <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
              </div>
            ))
          ) : catArticles.length > 0 ? (
            catArticles.map((art, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div>
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
            <div className="col-span-full py-16 text-center space-y-3 bg-white rounded-3xl border border-gray-100">
              <BookOpen size={36} className="mx-auto text-gray-400" />
              <h3 className="text-base font-bold text-gray-800">No articles found in this category yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">Check back soon as our editorial team publishes new articles and guides!</p>
              <Link href="/resources" className="inline-block mt-2 px-5 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs">
                Browse All Resources
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
