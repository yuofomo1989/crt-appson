"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import Link from "next/link";
import { Star, ArrowRight, Check, X, Award, ShieldCheck, Users, Clock, HelpCircle, ChevronDown } from "lucide-react";

import initialCategories from "@/data/categories_db.json";
import initialCourses from "@/data/courses_db.json";

export default function CategoryClientPage({ slug }) {
  const preloadedCat = (initialCategories || []).find(c => (c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug) || { name: slug.replace(/-/g, " ").toUpperCase() };
  const [category, setCategory] = useState(preloadedCat);
  const [categoriesList, setCategoriesList] = useState(initialCategories || []);
  const [courses, setCourses] = useState(initialCourses || []);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Filters State
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedProvider, setSelectedProvider] = useState("All Providers");

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [catRes, cRes] = await Promise.all([
          fetch(`${apiUrl}/categories`),
          fetch(`${apiUrl}/courses`)
        ]);
        const catData = await catRes.json();
        const cData = await cRes.json();
        if (catData && catData.status === "success" && catData.data && catData.data.length > 0) {
          const list = catData.data || [];
          setCategoriesList(list);
          const found = list.find(c => (c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug);
          if (found) setCategory(found);
        }
        if (cData && cData.status === "success" && cData.data && cData.data.length > 0) {
          setCourses(cData.data);
        }
      } catch (err) {
        // Preloaded state works cleanly
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const categoryName = category?.name || slug.replace(/-/g, " ");

  // Initial Filter by Category
  const baseCategoryCourses = courses.filter(c => 
    (c.category_name || c.category || "").toLowerCase().includes(slug.replace(/-/g, " ").toLowerCase()) ||
    slug.replace(/-/g, " ").toLowerCase().includes((c.category_name || c.category || "").toLowerCase())
  );

  // Extract unique providers and levels from category courses
  const providers = ["All Providers", ...Array.from(new Set(baseCategoryCourses.map(c => c.provider || "PMI®")))];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  // Apply Secondary Filters (Level & Provider)
  const filtered = baseCategoryCourses.filter(c => {
    const matchLevel = selectedLevel === "All Levels" || (c.level || "").toLowerCase() === selectedLevel.toLowerCase();
    const matchProvider = selectedProvider === "All Providers" || (c.provider || "PMI®").toLowerCase() === selectedProvider.toLowerCase();
    return matchLevel && matchProvider;
  });

  const categoryFaqs = [
    { q: `What are the benefits of ${categoryName} certifications?`, a: `${categoryName} certifications validate your expertise, increase job opportunities, and significantly boost your earning potential across global enterprises.` },
    { q: `Are these ${categoryName} bootcamps guaranteed to run?`, a: "Yes! All scheduled bootcamp dates are 100% Guaranteed to Run with live 1-on-1 instructor support and exam pass assistance." },
    { q: "What format are the training classes conducted in?", a: "We offer Live Online Interactive Classrooms, On-site Corporate Bootcamps, and Self-Paced Learning options." }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <Navbar />
      
      {/* Dynamic Category Hero Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-brand-navy to-slate-900 text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-bold font-mono">
              <Award size={14} /> Official Certification Track
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight capitalize leading-tight">
              {categoryName} <span className="text-brand-blue">Bootcamps</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              {category?.description || `Master industry-leading ${categoryName} certifications with instructor-led live bootcamps, official exam prep study guides, and 100% pass guarantee.`}
            </p>

            {/* Quick Category Stats */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold justify-center md:justify-start">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Pass Guarantee</span>
              <span className="flex items-center gap-1.5"><Users size={16} className="text-brand-orange" /> 45,000+ Alumni</span>
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-purple-400" /> Live Weekend & Weekday Batches</span>
            </div>
          </div>

          {/* Average Salary & Badge Highlight Box */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 md:p-8 space-y-3 min-w-[260px] text-center shadow-xl backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Earning Potential</span>
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {category?.avg_salary || "$115,000"}
              <span className="text-xs text-slate-400 font-normal"> /yr</span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-brand-orange text-[10px] font-bold uppercase border border-orange-500/30">
              🔥 {category?.badge_text || "High Demand Specialty"}
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 flex-1 space-y-12 w-full">

        {/* Content Split Layout: Left Filter Sidebar + Right Courses Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6 sticky top-24">
            
            {/* Category Navigation List */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
              <h3 className="text-xs uppercase tracking-wider text-brand-navy font-black flex items-center gap-2">
                <Award size={14} className="text-brand-orange" />
                All Categories
              </h3>
              <div className="space-y-1.5">
                {categoriesList.map((cat, idx) => {
                  const catSlug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  const isActive = catSlug === slug;
                  return (
                    <Link
                      key={idx}
                      href={`/category/${catSlug}`}
                      className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                          : "text-gray-600 hover:bg-slate-50 hover:text-gray-900"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {isActive && <Check size={14} />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Provider Filter */}
            {providers.length > 2 && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
                <h3 className="text-xs uppercase tracking-wider text-brand-navy font-black">Exam Provider</h3>
                <div className="space-y-1.5">
                  {providers.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvider(prov)}
                      className={`w-full text-left py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                        selectedProvider === prov
                          ? "bg-blue-50 text-brand-blue"
                          : "text-gray-500 hover:bg-slate-50 hover:text-gray-800"
                      }`}
                    >
                      <span>{prov}</span>
                      {selectedProvider === prov && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty Level Filter */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
              <h3 className="text-xs uppercase tracking-wider text-brand-navy font-black">Difficulty Level</h3>
              <div className="space-y-1.5">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                      selectedLevel === lvl
                        ? "bg-blue-50 text-brand-blue"
                        : "text-gray-500 hover:bg-slate-50 hover:text-gray-800"
                    }`}
                  >
                    <span>{lvl}</span>
                    {selectedLevel === lvl && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Main Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Active Filter Chips & Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-600">
                {selectedProvider !== "All Providers" && (
                  <span className="bg-blue-50 text-brand-blue border border-blue-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                    Provider: {selectedProvider}
                    <X size={10} className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedProvider("All Providers")} />
                  </span>
                )}
                {selectedLevel !== "All Levels" && (
                  <span className="bg-blue-50 text-brand-blue border border-blue-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                    Level: {selectedLevel}
                    <X size={10} className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedLevel("All Levels")} />
                  </span>
                )}
                <span className="text-[11px] text-gray-500 py-1 font-bold">
                  Showing {filtered.length} courses under {categoryName}
                </span>
              </div>

              {(selectedLevel !== "All Levels" || selectedProvider !== "All Providers") && (
                <button
                  onClick={() => { setSelectedLevel("All Levels"); setSelectedProvider("All Providers"); }}
                  className="text-xs font-bold text-brand-orange hover:underline cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Skeleton Loader Cards
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 animate-pulse">
                    <div className="h-5 w-24 bg-slate-100 rounded-md"></div>
                    <div className="h-6 w-3/4 bg-slate-100 rounded-lg"></div>
                    <div className="h-4 w-full bg-slate-100 rounded"></div>
                    <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="h-6 w-16 bg-slate-100 rounded-md"></div>
                      <div className="h-9 w-28 bg-slate-100 rounded-xl"></div>
                    </div>
                  </div>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((course, idx) => (
                  <div key={idx} className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-md bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-brand-orange border border-orange-100">
                          {course.badge || "Best Seller"}
                        </span>
                        <span className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">
                          {course.provider || "PMI®"}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-brand-navy">{course.title}</h3>
                      <p className="text-[11px] text-gray-500 font-semibold line-clamp-2">{course.description || course.desc || "Official certification bootcamp."}</p>
                      
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-400" fill="currentColor" />
                          <span className="font-bold text-gray-800">{course.rating || "4.9"}</span>
                          <span className="text-gray-400">({course.reviews_count || 120})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-600">
                          {course.level || "Intermediate"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <span className="text-base font-black text-brand-navy">${course.price}</span>
                        {course.original_price && (
                          <span className="text-[10px] text-gray-400 line-through ml-1.5 font-bold">${course.original_price}</span>
                        )}
                      </div>
                      <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-brand-blue px-3.5 text-[10px] font-bold text-white hover:bg-opacity-90 transition-all shadow-md shadow-blue-500/10">
                        View Details <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-gray-400 font-medium">
                  No courses match your selected filters under this category.
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Category FAQ Accordion Section */}
        <section className="pt-12 border-t border-gray-100 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-brand-navy flex items-center justify-center gap-2">
              <HelpCircle className="text-brand-blue" size={20} /> Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500 font-semibold">Everything you need to know about {categoryName} training & certification.</p>
          </div>

          <div className="space-y-3">
            {categoryFaqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs md:text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openFaq === fIdx ? "rotate-180 text-brand-blue" : "text-gray-400"}`} />
                </button>
                {openFaq === fIdx && (
                  <div className="p-4 pt-0 text-xs text-gray-600 font-medium leading-relaxed border-t border-gray-50 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
