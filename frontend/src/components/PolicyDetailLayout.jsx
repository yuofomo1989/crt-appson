"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import initialSiteSettings from "@/data/site_settings_db.json";
import {
  Shield,
  FileText,
  ShoppingCart,
  Calendar,
  BookOpen,
  CreditCard,
  User,
  MessageSquare,
  AlertCircle,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  HelpCircle,
  ChevronDown
} from "lucide-react";

export const POLICY_NAV_ITEMS = [
  { slug: "privacy", title: "Privacy Policy", icon: Shield, href: "/privacy" },
  { slug: "terms", title: "Terms of Use", icon: FileText, href: "/terms" },
  { slug: "refunds", title: "Refund Policy", icon: ShoppingCart, href: "/refunds" },
  { slug: "cancellation", title: "Cancellation & Reschedule", icon: Calendar, href: "/cancellation" },
  { slug: "ip-policy", title: "Intellectual Property", icon: BookOpen, href: "/ip-policy" },
  { slug: "payment-policy", title: "Payment Policy", icon: CreditCard, href: "/payment-policy" },
  { slug: "account-policy", title: "Account Policy", icon: User, href: "/account-policy" },
  { slug: "communication-policy", title: "Communication Policy", icon: MessageSquare, href: "/communication-policy" },
  { slug: "disclaimer", title: "Legal Disclaimer", icon: AlertCircle, href: "/disclaimer" }
];

const POLICY_FAQS = [
  {
    q: "How long has Certification Planner, LLC been operating?",
    a: "CP was established to provide practical, real-world upskilling solutions for working professionals. Our leadership brings deep enterprise experience across top global training organizations, leading tech startups, and Fortune 500 corporations."
  },
  {
    q: "How large is Certification Planner's instructor network?",
    a: "We maintain a global network of over 5,000+ certified industry instructors across 120+ cities worldwide, each holding 10+ to 15+ years of active practitioner experience."
  },
  {
    q: "Do you offer corporate training options for enterprise groups?",
    a: "Yes. Certification Planner delivers tailored corporate bootcamps for teams ranging from 5 to 200+ attendees, available in in-person, dedicated on-site, and private virtual formats."
  },
  {
    q: "Where is Certification Planner headquartered?",
    a: "Our corporate headquarters is in Salt Lake City, Utah (2150 South 1300 East #500, Salt Lake City, UT 84106), with training operations across the USA, Canada, UK, Europe, Australia, and Asia-Pacific."
  }
];

export default function PolicyDetailLayout({ policy }) {
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    fetch("/api/settings/")
      .then((r) => r.json())
      .then((d) => {
        if (d) setSiteSettings(d.data || d);
      })
      .catch(() => {});
  }, []);

  const phone = siteSettings?.phone || "(888) 745-7575";
  const email = siteSettings?.email || "support@certificationplanner.com";
  const address = siteSettings?.office_address_full || "2150 South 1300 East #500, Salt Lake City, UT 84106";

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar siteSettings={siteSettings} />

      <PageHeroBanner
        pageKey="policies"
        siteSettings={siteSettings}
        fallbackTitle={policy.title}
        fallbackSubtitle={policy.shortDesc}
        breadcrumb={
          <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link href="/policies" className="hover:text-brand-blue transition-colors">
              Policies
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-800 font-semibold">{policy.title}</span>
          </div>
        }
      />

      {/* Main Content Area */}
      <section className="bg-gray-50/50 py-10 sm:py-12 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Left 8 Cols: Structured Policy Document */}
            <main className="lg:col-span-8">
              <article className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-10 shadow-sm">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5 mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-brand-blue border border-blue-100/80">
                    <Shield size={14} />
                    {policy.badge || "Official Policy Document"}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Clock size={14} className="text-gray-400" />
                    <span>Effective: {policy.effectiveDate || "Updated 2026"}</span>
                  </div>
                </div>

                {/* Lead Summary */}
                <div className="rounded-xl bg-slate-50 border-l-4 border-brand-blue p-4 sm:p-5 mb-8 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {policy.shortDesc}
                </div>

                {/* Sections */}
                <div className="space-y-8 text-gray-700">
                  {policy.sections?.map((sec, sIdx) => (
                    <section key={sIdx} className="space-y-3.5">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#1e3a5f] tracking-tight">
                        {sec.heading}
                      </h2>

                      {sec.content?.map((pText, pIdx) => (
                        <p key={pIdx} className="text-sm leading-relaxed text-gray-600 font-normal whitespace-pre-line">
                          {pText}
                        </p>
                      ))}

                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul className="space-y-2.5 pt-1 pl-2">
                          {sec.bullets.map((bText, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                              <CheckCircle2 size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
                              <span>{bText}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                {/* Formal Commitment Box */}
                <div className="mt-10 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-5 sm:p-6">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white shadow-sm">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1e3a5f]">Certification Planner, LLC Trust Commitment</h3>
                      <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                        We are committed to operating with complete transparency, regulatory compliance, and uncompromising student support. If you require specific contractual guarantees, corporate procurement amendments, or assistance with our policies, please contact our legal desk.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Still Need Assistance Bar */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Have questions regarding this policy?</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Our support and compliance desk is available to assist you.</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
                  >
                    Contact Support <ArrowRight size={13} />
                  </Link>
                </div>

              </article>
            </main>

            {/* Right 4 Cols: Quick Navigation & Help Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Policies Quick Nav */}
              <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-4 px-2">
                  All Policies & Terms
                </h3>
                <nav className="space-y-1">
                  {POLICY_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.slug === policy.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={item.href}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-blue-50 text-brand-blue font-bold shadow-xs border-l-4 border-brand-blue"
                            : "text-gray-600 hover:bg-gray-50 hover:text-brand-blue"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} className={isActive ? "text-brand-blue" : "text-gray-400"} />
                          <span>{item.title}</span>
                        </div>
                        <ChevronRight
                          size={14}
                          className={isActive ? "text-brand-blue translate-x-0.5" : "text-gray-300"}
                        />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Need Help Box */}
              <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2.5 text-brand-blue mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <HelpCircle size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#1e3a5f]">Need Direct Help?</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Our customer service and student advisement teams are standing by to answer your policy or course questions.
                </p>

                <div className="space-y-3.5 pt-1 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                      <Phone size={14} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">Toll Free Assistance</p>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-xs font-bold text-brand-blue hover:underline">
                        {phone}
                      </a>
                      <p className="text-[10px] text-gray-400 mt-0.5">Mon – Fri, 8:00 AM – 8:00 PM ET</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                      <Mail size={14} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">Email Inquiries</p>
                      <a href={`mailto:${email}`} className="text-xs font-bold text-brand-blue hover:underline break-all">
                        {email}
                      </a>
                      <p className="text-[10px] text-gray-400 mt-0.5">Response within 1 business day</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                      <MessageCircle size={14} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">Salt Lake City HQ</p>
                      <p className="text-xs text-gray-600 leading-snug">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy FAQs Accordion */}
              <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 px-1">
                  Common Questions
                </h3>
                <div className="space-y-2">
                  {POLICY_FAQS.map((faq, fIdx) => (
                    <div key={fIdx} className="rounded-xl border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full text-left p-3 flex items-center justify-between gap-2 bg-gray-50/50 hover:bg-gray-50 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={14}
                          className={`text-gray-400 transition-transform ${openFaqIndex === fIdx ? "rotate-180 text-brand-blue" : ""}`}
                        />
                      </button>
                      {openFaqIndex === fIdx && (
                        <div className="p-3 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
