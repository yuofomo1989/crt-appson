"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreFooter from "@/components/PreFooter";
import Link from "next/link";
import { useParams } from "next/navigation";
import { User, Calendar, Eye, ArrowLeft, Share2, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";

import initialArticles from "@/data/articles_db.json";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug;

  const targetSlug = (slug || "").toLowerCase().trim();
  const preloaded = (initialArticles || []).find(a => (a.slug || "").toLowerCase() === targetSlug) || initialArticles?.[0] || null;

  const [article, setArticle] = useState(preloaded);
  const [recentArticles, setRecentArticles] = useState(
    (initialArticles || []).filter(a => a.id !== preloaded?.id).slice(0, 3)
  );
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticleDetails() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [aRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/articles`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then(r => r.json()).catch(() => null)
        ]);

        if (aRes.status === "success" && Array.isArray(aRes.data)) {
          const found = aRes.data.find(a => (a.slug || "").toLowerCase() === targetSlug) || aRes.data[0];
          setArticle(found);
          setRecentArticles(aRes.data.filter(a => a.id !== found?.id).slice(0, 3));
        }

        if (sRes) {
          setSiteSettings(sRes);
        }
      } catch (err) {
        console.error("Error loading article:", err);
      }
    }
    fetchArticleDetails();
  }, [slug]);

  if (!article) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between text-left">
      <Navbar siteSettings={siteSettings} />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/resources" className="hover:text-brand-orange transition-colors">Resources</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300 font-bold truncate max-w-xs">{article.category_name}</span>
          </div>

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
              <Calendar size={14} className="text-slate-400" /> {new Date(article.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
        {article.image && (
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-md bg-slate-900 max-h-[420px]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[420px]"
              onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
            />
          </div>
        )}

        {/* Full Rich Article Content from Original Database */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xs space-y-6 text-gray-700 leading-relaxed text-sm font-medium">
          <div 
            className="prose prose-slate max-w-none text-gray-800 space-y-4 leading-relaxed font-medium [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-navy [&_h2]:pt-4 [&_h3]:text-xl [&_h3]:font-black [&_h3]:text-brand-navy [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1 [&_strong]:text-brand-navy"
            dangerouslySetInnerHTML={{ __html: article.content || article.description }}
          />

          <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-bold">Share this article:</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Share2 size={14} /> Copy Link
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {recentArticles.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold text-brand-navy">Related Insights &amp; Articles</h3>
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
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
