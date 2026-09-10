"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import { Star, Clock, Calendar, Search, ArrowRight, ShieldCheck, Filter, X, Award, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

import initialCourses from "@/data/courses_db.json";
import initialCategories from "@/data/categories_db.json";

const allCourses = [];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Certifications() {
  const [coursesList, setCoursesList] = useState(initialCourses || []);
  const [categoriesList, setCategoriesList] = useState(initialCategories || []);
  const [loading, setLoading] = useState(false);

  const [selectedPath, setSelectedPath] = useState("All Paths");
  const [selectedProvider, setSelectedProvider] = useState("All Providers");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    async function fetchDynamicCourses() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [cRes, catRes] = await Promise.all([
          fetch(`${apiUrl}/courses`),
          fetch(`${apiUrl}/categories`)
        ]);
        const cData = await cRes.json();
        const catData = await catRes.json();

        if (cData.status === 'success' && cData.data && cData.data.length > 0) {
          setCoursesList(cData.data);
        }
        if (catData.status === 'success' && catData.data && catData.data.length > 0) {
          setCategoriesList(catData.data);
        }
      } catch (err) {
        console.error("Error fetching courses from API, fallback to preloaded db:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDynamicCourses();
  }, []);

  // Compute dynamic filter options from database
  const paths = ["All Paths", ...new Set(categoriesList.map(c => c.name || c.title))];
  const providers = ["All Providers", ...new Set(coursesList.map(c => c.provider || c.badge || "PMI®").filter(Boolean))];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = coursesList.filter((course) => {
    const matchesPath = selectedPath === "All Paths" || (course.category_name || course.category) === selectedPath;
    const matchesProvider = selectedProvider === "All Providers" || (course.provider || course.badge) === selectedProvider;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    const matchesSearch = (course.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (course.description || course.desc || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPath && matchesProvider && matchesLevel && matchesSearch;
  });

  const clearAllFilters = () => {
    setSelectedPath("All Paths");
    setSelectedProvider("All Providers");
    setSelectedLevel("All Levels");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 flex-1 space-y-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            Explore All <span className="text-brand-blue">Certifications</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            Find the right program to validate your skills, grow your career, and match your professional path.
          </p>
        </div>

        {/* Search Row */}
        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search certifications (e.g. PMP, AWS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-gray-600 bg-white cursor-pointer w-full sm:w-auto"
            >
              <Filter size={14} /> Filters
            </button>
            
            {(selectedPath !== "All Paths" || selectedProvider !== "All Providers" || selectedLevel !== "All Levels" || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-brand-orange hover:underline px-4 cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Content Split: Left Filters / Right Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters (Desktop View) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            
            {/* Filter Section 1: Career Paths */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
              <h3 className="text-xs uppercase tracking-wider text-brand-navy font-black flex items-center gap-2">
                <Award size={14} className="text-brand-orange" />
                Career Paths
              </h3>
              <div className="space-y-1.5">
                {paths.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPath(p)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                      selectedPath === p
                        ? "bg-blue-50 text-brand-blue"
                        : "text-gray-500 hover:bg-slate-50 hover:text-gray-800"
                    }`}
                  >
                    <span>{p}</span>
                    {selectedPath === p && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section 2: Exam Providers */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
              <h3 className="text-xs uppercase tracking-wider text-brand-navy font-black">Providers</h3>
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

            {/* Filter Section 3: Difficulty Levels */}
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

          {/* Right Grid: Certification Cards (Desktop View: 9 columns) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Active Filter Chips */}
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-600">
              {selectedPath !== "All Paths" && (
                <span className="bg-slate-100 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  Path: {selectedPath}
                  <X size={10} className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedPath("All Paths")} />
                </span>
              )}
              {selectedProvider !== "All Providers" && (
                <span className="bg-slate-100 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  Provider: {selectedProvider}
                  <X size={10} className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedProvider("All Providers")} />
                </span>
              )}
              {selectedLevel !== "All Levels" && (
                <span className="bg-slate-100 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  Level: {selectedLevel}
                  <X size={10} className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedLevel("All Levels")} />
                </span>
              )}
              <span className="text-[10px] text-gray-400 py-1 font-semibold">
                Showing {filteredCourses.length} results
              </span>
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] text-left"
                  >
                    <div className="space-y-4">
                      {/* Badge & Provider */}
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-md bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-brand-orange border border-orange-100">
                          {course.badge || "Best Seller"}
                        </span>
                        <span className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">
                          {course.provider || "PMI®"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-black text-brand-navy leading-snug">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] text-gray-500 leading-relaxed font-semibold line-clamp-2">
                        {course.description || course.desc || "Official certification prep bootcamp with instructor-led classes and 100% pass guarantee."}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-[11px]">
                        <Star size={12} className="text-amber-400" fill="currentColor" />
                        <span className="font-bold text-gray-800">{course.rating || "4.9"}</span>
                        <span className="text-gray-400">({course.reviews || "1,240"} reviews)</span>
                      </div>

                      {/* Timing & Level info */}
                      <div className="space-y-2 pt-2 border-t border-gray-50 text-[10px] text-gray-500 font-bold">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 uppercase">Path:</span>
                          <span className="text-brand-navy">{course.category_name || course.category || "Project Management"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 uppercase">Level:</span>
                          <span className="text-brand-navy">{course.level || "Intermediate"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 uppercase">Hours:</span>
                          <span className="text-brand-navy">{course.duration || "4 Days (35 Contact Hours)"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        {course.original_price && (
                          <span className="text-[9px] text-gray-400 font-bold line-through block">${course.original_price}</span>
                        )}
                        <span className="text-base font-black text-brand-navy">${course.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/courses/${course.slug || course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          className="flex h-9 items-center justify-center rounded-xl border border-gray-200 px-3.5 text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => {
                            const cartItem = {
                              course: course.title,
                              format: "Live Online Class",
                              price: typeof course.price === 'number' ? course.price : parseFloat(String(course.price).replace("$", "").replace(",", "")),
                              date: course.nextDate || "Aug 26 - Aug 29, 2026"
                            };
                            if (typeof window !== "undefined") {
                              localStorage.setItem("cp_cart", JSON.stringify(cartItem));
                              window.location.href = `/enroll`;
                            }
                          }}
                          className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-brand-blue px-3.5 text-[10px] font-bold text-white hover:bg-opacity-90 shadow-md transition-all cursor-pointer"
                        >
                          Enroll
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-gray-500 font-semibold">
                  No certifications matched your filters. Please try another term.
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Mobile Drawer Slide-in filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-80 bg-white h-full p-6 space-y-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <h3 className="text-sm font-black text-brand-navy">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-gray-800">
                  <X size={20} />
                </button>
              </div>

              {/* Path filters mobile */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-brand-navy font-black">Career Paths</h4>
                <div className="grid grid-cols-1 gap-1">
                  {paths.map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPath(p)}
                      className={`text-left py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        selectedPath === p ? "bg-blue-50 text-brand-blue" : "text-gray-500"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider filters mobile */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-brand-navy font-black">Providers</h4>
                <div className="grid grid-cols-1 gap-1">
                  {providers.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvider(prov)}
                      className={`text-left py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        selectedProvider === prov ? "bg-blue-50 text-brand-blue" : "text-gray-500"
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level filters mobile */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-brand-navy font-black">Difficulty Level</h4>
                <div className="grid grid-cols-1 gap-1">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`text-left py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        selectedLevel === lvl ? "bg-blue-50 text-brand-blue" : "text-gray-500"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full rounded-xl bg-brand-blue py-3 font-bold text-white text-xs"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <PreFooter />
      <Footer />
    </div>
  );
}
