"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  Clock,
  Calendar,
  Link2,
  CheckCircle,
  Search,
  ArrowRight,
  ArrowLeft,
  Mail,
  TrendingUp,
} from "lucide-react";

// ─── Sidebar Data ─────────────────────────────────────────────────────────────

const sidebarCategories = [
  { label: "Agile and Project Management", count: 48, color: "text-brand-green", bg: "bg-green-50", border: "border-green-100", dot: "bg-brand-green" },
  { label: "DevOps and Salesforce",        count: 42, color: "text-brand-blue",  bg: "bg-blue-50",  border: "border-blue-100",  dot: "bg-brand-blue" },
  { label: "Information Security",         count: 36, color: "text-brand-orange",bg: "bg-orange-50",border: "border-orange-100",dot: "bg-brand-orange" },
  { label: "IT Service and Architecture",  count: 38, color: "text-purple-600",  bg: "bg-purple-50",border: "border-purple-100",dot: "bg-purple-600" },
  { label: "Lean And Six Sigma",           count: 30, color: "text-teal-600",    bg: "bg-teal-50",  border: "border-teal-100",  dot: "bg-teal-600" },
];

const popularArticles = [
  { title: "What is Agile Methodology?",                              date: "Apr 25, 2024", readTime: "5 min read", image: "/article_agile.jpg" },
  { title: "Introduction to DevOps",                                 date: "Apr 22, 2024", readTime: "4 min read", image: "/article_devops.jpg" },
  { title: "Information Security Certifications Worth Your Investment", date: "Apr 18, 2024", readTime: "6 min read", image: "/article_security.jpg" },
  { title: "ITIL 4 Certification: A Complete Overview",              date: "Apr 15, 2024", readTime: "5 min read", image: "/article_it.jpg" },
  { title: "Six Sigma DMAIC Process Explained",                      date: "Apr 12, 2024", readTime: "5 min read", image: "/article_lean.jpg" },
];

const tocItems = [
  "What is Green Project Management?",
  "Why Sustainability Matters in Projects",
  "Key Principles of Green Project Management",
  "Benefits for Organizations and Society",
  "Best Practices for Project Managers",
  "Tools and Frameworks",
  "Final Thoughts",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgileArticlePage() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={11} className="text-gray-300" />
          <Link href="/resources" className="hover:text-brand-blue transition-colors">Resources</Link>
          <ChevronRight size={11} className="text-gray-300" />
          <Link href="/resources" className="hover:text-brand-blue transition-colors">Agile and Project Management</Link>
          <ChevronRight size={11} className="text-gray-300" />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">Sustainability and Green Project Management</span>
        </div>
      </div>

      {/* ── Page Layout ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-10 lg:grid-cols-3">

        {/* ── Article Content — 2/3 ──────────────────────────────────────── */}
        <article className="lg:col-span-2 min-w-0">

          {/* Category badge */}
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-green mb-4">
            Agile and Project Management
          </span>

          {/* Title */}
          <h1 className="text-3xl font-extrabold leading-tight text-brand-navy md:text-4xl">
            Sustainability and Green<br />Project Management
          </h1>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-2xl">
            Learn how project managers can integrate sustainability principles into project
            planning and delivery to create lasting environmental and business value.
          </p>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-brand-blue text-white font-bold text-xs flex-shrink-0">
                CP
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">By Certification Planner Team</p>
                <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={10} /> May 12, 2024</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> 6 min read</span>
                </div>
              </div>
            </div>
            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-400 mr-1">Share:</span>
              {/* LinkedIn */}
              <a href="#" className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-sky-500 hover:text-sky-500 transition-colors">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-blue-700 hover:text-blue-700 transition-colors">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <button
                onClick={handleCopy}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-brand-blue hover:text-brand-blue transition-colors relative"
                title="Copy link"
              >
                <Link2 size={13} />
                {copied && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[10px] text-white">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-6 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/article_green_project_hero.jpg"
              alt="Sustainability and Green Project Management"
              width={800}
              height={450}
              className="w-full object-cover"
              priority
            />
          </div>

          {/* Table of Contents */}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="text-sm font-bold text-brand-navy mb-4">In This Article</h2>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {tocItems.map((item, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="flex items-start gap-2 text-xs text-brand-blue hover:underline"
                >
                  <span className="mt-0.5 flex-shrink-0 text-brand-blue">›</span>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* ── Article Body ────────────────────────────────────────────── */}
          <div className="mt-8 space-y-8 text-sm text-gray-700 leading-relaxed">

            {/* Section 1 */}
            <section id="section-0">
              <h2 className="text-xl font-bold text-brand-navy mb-3">What is Green Project Management?</h2>
              <p>
                Green Project Management (GPM) is the application of knowledge, skills, tools, and techniques to
                minimize the environmental impact of projects while maximizing sustainability benefits. It integrates
                environmental thinking into project management practices. By adopting GPM principles, organizations
                can align their project outcomes with long-term ecological responsibility and regulatory requirements
                while also driving efficiency and cost savings.
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-1">
              <h2 className="text-xl font-bold text-brand-navy mb-3">Why Sustainability Matters in Projects</h2>
              <p className="mb-4">
                Projects consume resources, generate waste, and can impact communities and ecosystems. By
                embedding sustainability into project goals and processes, organizations can:
              </p>
              <ul className="space-y-2.5">
                {[
                  "Reduce environmental footprint",
                  "Improve resource efficiency",
                  "Meet regulatory requirements",
                  "Enhance stakeholder satisfaction",
                  "Drive innovation and long-term cost savings",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="flex-shrink-0 mt-0.5 text-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section id="section-2">
              <h2 className="text-xl font-bold text-brand-navy mb-3">Key Principles of Green Project Management</h2>
              <p className="mb-4">
                Green projects are guided by core principles that help ensure environmental responsibility and
                sustainable outcomes.
              </p>
              <ol className="space-y-3">
                {[
                  { bold: "Minimize Environmental Impact", desc: "– Reduce waste, emissions, and resource consumption." },
                  { bold: "Optimize Resource Use", desc: "– Use renewable, recyclable, and efficient resources." },
                  { bold: "Engage Stakeholders", desc: "– Involve stakeholders in sustainability decisions." },
                  { bold: "Plan for the Long Term", desc: "– Consider the long-term environmental and social impacts." },
                  { bold: "Continuous Improvement", desc: "– Monitor, measure, and improve sustainability performance." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green/10 text-brand-green font-bold text-xs">
                      {i + 1}
                    </span>
                    <p><span className="font-bold text-brand-navy">{item.bold}</span> {item.desc}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Pull quote */}
            <div className="rounded-2xl border-l-4 border-brand-green bg-green-50 p-6 flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-navy italic">
                  "Sustainability is not a deliverable. It's a mindset."
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Great projects create value today and protect tomorrow.
                </p>
              </div>
            </div>

            {/* Closing para */}
            <section id="section-3">
              <p>
                In the next sections, we'll explore the benefits, best practices, and tools to help you lead
                sustainable projects that make a real difference. Whether you're managing infrastructure, software
                delivery, or organizational change — green thinking will elevate both the impact and reputation of
                your work.
              </p>
            </section>

            {/* Section 4 */}
            <section id="section-4">
              <h2 className="text-xl font-bold text-brand-navy mb-3">Benefits for Organizations and Society</h2>
              <p>
                Organizations that embrace green project management practices report significant improvements in
                brand reputation, stakeholder trust, and operational efficiency. From reduced energy costs to
                attracting sustainability-conscious clients and employees, GPM delivers tangible business value
                alongside its environmental benefits.
              </p>
            </section>

            {/* Section 5 */}
            <section id="section-5">
              <h2 className="text-xl font-bold text-brand-navy mb-3">Best Practices for Project Managers</h2>
              <p className="mb-4">
                Implementing green project management requires intentional planning and stakeholder alignment.
                Key best practices include conducting environmental impact assessments during initiation,
                setting measurable sustainability KPIs, and partnering with eco-certified vendors.
              </p>
            </section>

            {/* Section 6 */}
            <section id="section-6">
              <h2 className="text-xl font-bold text-brand-navy mb-3">Final Thoughts</h2>
              <p>
                Sustainability is rapidly becoming a core competency for project managers worldwide.
                Certifications like the GPM-b™ and PRiSM™ methodology are gaining traction as organizations
                prioritize environmentally responsible delivery. As a project manager, developing fluency in
                green principles will not only future-proof your career but also amplify the positive impact
                of every project you lead.
              </p>
            </section>
          </div>

          {/* Previous / Next navigation */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
            <Link
              href="/resources"
              className="group flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 p-4 hover:border-brand-blue hover:bg-blue-50 transition-all"
            >
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 group-hover:text-brand-blue">
                <ArrowLeft size={12} /> Previous Article
              </span>
              <p className="text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                Agile Methodologies: Choosing the Right Approach
              </p>
            </Link>
            <Link
              href="/resources"
              className="group flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 p-4 text-right hover:border-brand-blue hover:bg-blue-50 transition-all"
            >
              <span className="flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 group-hover:text-brand-blue">
                Next Article <ArrowRight size={12} />
              </span>
              <p className="text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                The Future of Project Management in a Digital World
              </p>
            </Link>
          </div>
        </article>

        {/* ── Right Sidebar — 1/3 ───────────────────────────────────────── */}
        <aside className="space-y-6">

          {/* Search */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-brand-navy mb-3">Search Resources</h3>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics, or keywords..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-xs text-gray-700 placeholder-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors">
                <Search size={15} />
              </button>
            </div>
          </div>

          {/* Browse by Category */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-brand-navy mb-4">Browse by Category</h3>
            <div className="space-y-2">
              {sidebarCategories.map((cat, i) => (
                <Link
                  key={i}
                  href="/resources"
                  className={`flex items-center justify-between rounded-xl ${cat.bg} border ${cat.border} px-3 py-2.5 hover:shadow-sm transition-all group`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
                    <span className={`text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600">{cat.count}</span>
                </Link>
              ))}
            </div>
            <button className="mt-3 flex items-center gap-1 text-[11px] font-bold text-brand-blue hover:underline">
              View All Categories <ArrowRight size={11} />
            </button>
          </div>

          {/* Most Popular Articles */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-brand-orange" />
              <h3 className="text-sm font-bold text-brand-navy">Most Popular Articles</h3>
            </div>
            <div className="space-y-3">
              {popularArticles.map((art, i) => (
                <Link
                  key={i}
                  href="/resources/agile-project-management"
                  className="group flex items-start gap-3 rounded-xl p-1.5 -mx-1.5 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <span className="flex-shrink-0 w-5 text-[11px] font-extrabold text-gray-300 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden shadow-sm">
                    <Image src={art.image} alt={art.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                      {art.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
                      <span>{art.date}</span>
                      <span>·</span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/resources"
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-brand-navy hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              View All Articles <ArrowRight size={12} />
            </Link>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue mb-3">
              <Mail size={20} />
            </div>
            <h3 className="text-sm font-bold text-brand-navy">Stay Informed</h3>
            <p className="mt-1 text-[11px] text-gray-500 leading-relaxed">
              Get the latest articles, tips, and resources delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 text-brand-green text-xs font-semibold">
                <CheckCircle size={15} /> Subscribed! Thank you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-blue py-2.5 text-xs font-bold text-white hover:bg-opacity-90 transition-all shadow-sm"
                >
                  Subscribe
                </button>
                <p className="text-center text-[10px] text-gray-400">We respect your privacy. Unsubscribe anytime.</p>
              </form>
            )}
          </div>

        </aside>
      </div>

      <Footer />
    </div>
  );
}
