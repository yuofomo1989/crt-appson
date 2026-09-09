"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import Link from "next/link";
import { useParams } from "next/navigation";
import { User, Calendar, Eye, ArrowLeft, Share2, BookOpen, CheckCircle2 } from "lucide-react";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug;

  const [article, setArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticleDetails() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const res = await fetch(`${apiUrl}/articles`);
        const data = await res.json();
        if (data.status === "success" && data.data) {
          const targetSlug = (slug || "").toLowerCase();
          const found = data.data.find(a => (a.slug || "").toLowerCase() === targetSlug);
          setArticle(found || data.data[0]);
          setRecentArticles(data.data.filter(a => (a.slug || "").toLowerCase() !== targetSlug).slice(0, 3));
        }
      } catch (err) {
        console.error("Error loading article:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticleDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 px-4 space-y-6 animate-pulse">
          <div className="h-10 bg-slate-200 rounded-xl w-3/4"></div>
          <div className="h-64 bg-slate-200 rounded-3xl w-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between text-left">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors">
            <ArrowLeft size={14} /> Back to All Articles
          </Link>

          <span className="px-3.5 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold font-mono border border-brand-blue/30 inline-block">
            {article.category_name || "Insights"}
          </span>

          <h1 className="text-2xl md:text-4xl font-black leading-snug">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold border-t border-slate-800 pt-4">
            <span className="flex items-center gap-2 text-slate-200">
              <User size={14} className="text-brand-blue" /> By {article.author || "Certification Planner Editorial"}
            </span>
            <span className="flex items-center gap-2">
              <Eye size={14} className="text-emerald-400" /> {article.views || 120} Views
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10 w-full">
        {/* Banner Image */}
        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md bg-slate-900">
          <img
            src={article.image || "/article_green_project_hero.jpg"}
            alt={article.title}
            className="w-full h-80 md:h-[420px] object-cover"
            onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
          />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-xs space-y-6 text-gray-700 leading-relaxed text-sm font-medium">
          <div 
            className="prose max-w-none text-gray-800 space-y-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />

          <h2 className="text-lg md:text-xl font-bold text-brand-navy pt-4">Key Takeaways & Certification Overview</h2>
          <p>
            Earning an industry-recognized certification demonstrates your expertise, commitment to professional development, and practical knowledge. Whether you are aiming for PMP®, CISSP®, or AWS Solutions Architect, staying structured and disciplined during your preparation is critical.
          </p>

          <ul className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-gray-100 text-xs font-bold text-brand-navy">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Focus on core domain weights and exam outline specifications.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Practice with realistic timed mock exams and full-length practice tests.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Join authorized live instructor bootcamps for interactive learning.
            </li>
          </ul>

          <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-bold">Share this article:</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Share2 size={14} /> Copy Link
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {recentArticles.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold text-brand-navy">Related Insights & Articles</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {recentArticles.map((art, idx) => (
                <Link
                  key={idx}
                  href={`/blog/${art.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2 hover:shadow-lg transition-all"
                >
                  <p className="text-[10px] font-bold text-brand-orange uppercase">{art.category_name}</p>
                  <h4 className="text-xs font-bold text-brand-navy line-clamp-2">{art.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <PreFooter />
      <Footer />
    </div>
  );
}
