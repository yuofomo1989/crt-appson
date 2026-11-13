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
  Phone,
  Mail,
  ChevronRight,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const policies = [
  {
    icon: Shield,
    title: "Privacy Policy",
    desc: "Learn how we collect, use, protect, and share your personal information when you use our website and services.",
    href: "/privacy",
  },
  {
    icon: FileText,
    title: "Terms and Conditions",
    desc: "Read the terms that govern your access to and use of our website, services, and content.",
    href: "/terms",
  },
  {
    icon: ShoppingCart,
    title: "Refund Policy",
    desc: "Understand our refund eligibility, request process, and timelines for courses and certification products.",
    href: "/refunds",
  },
  {
    icon: Calendar,
    title: "Cancellation Policy",
    desc: "Review our cancellation terms for training sessions, exams, and other services.",
    href: "/cancellation",
  },
  {
    icon: BookOpen,
    title: "Intellectual Property Policy",
    desc: "Learn how we protect our content, trademarks, and intellectual property and how you may use our materials.",
    href: "/ip-policy",
  },
  {
    icon: CreditCard,
    title: "Payment Policy",
    desc: "Learn about accepted payment methods, billing, pricing, and related transaction information.",
    href: "/payment-policy",
  },
  {
    icon: User,
    title: "Account Policy",
    desc: "Understand your responsibilities for account security, activity, and ensuring accurate information.",
    href: "/account-policy",
  },
  {
    icon: MessageSquare,
    title: "Communication Policy",
    desc: "Learn how we communicate with you about your orders, updates, and important notifications.",
    href: "/communication-policy",
  },
  {
    icon: Shield,
    title: "Legal Disclaimer & Trademarks",
    desc: "Official trademark acknowledgments, accrediting partner attributions, and non-affiliation disclaimers.",
    href: "/disclaimer",
  },
];

// ─── Clipboard / Shield SVG Illustration ─────────────────────────────────────

function PolicyIllustration() {
  return (
    <div className="relative w-full max-w-[260px] h-[240px]">
      <div className="absolute top-2 right-0 w-24 h-24 rounded-full bg-blue-50 opacity-60" />
      <div className="absolute bottom-4 left-2 w-14 h-14 rounded-full bg-orange-50 opacity-60" />
      <div className="absolute top-0 right-0 grid grid-cols-6 gap-1 opacity-20 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-brand-blue" />
        ))}
      </div>
      <svg viewBox="0 0 280 300" fill="none" className="relative z-10 w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="40" width="160" height="220" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="100" y="28" width="80" height="28" rx="8" fill="#1e3a5f" />
        <rect x="120" y="22" width="40" height="14" rx="7" fill="#2563EB" />
        <text x="140" y="48" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="1">POLICIES</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0, ${i * 38})`}>
            <rect x="84" y="76" width="16" height="16" rx="4" fill={i < 3 ? "#2563EB" : "#E5E7EB"} />
            {i < 3 && <polyline points="88,84 91,88 97,80" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="110" y="79" width={i === 3 ? "70" : "90"} height="8" rx="4" fill={i < 3 ? "#DBEAFE" : "#F3F4F6"} />
          </g>
        ))}
        <g transform="translate(185, 200)">
          <circle cx="28" cy="28" r="32" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
          <path d="M28 8 C28 8 44 14 44 28 C44 42 28 50 28 50 C28 50 12 42 12 28 C12 14 28 8 28 8Z" fill="#2563EB" opacity="0.9" />
          <polyline points="20,28 26,34 36,22" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g transform="translate(40, 225)">
          <rect x="8" y="30" width="20" height="22" rx="4" fill="#1e3a5f" />
          <ellipse cx="18" cy="30" rx="14" ry="16" fill="#22C55E" opacity="0.8" />
          <ellipse cx="12" cy="24" rx="8" ry="12" fill="#16A34A" opacity="0.6" />
          <line x1="18" y1="42" x2="18" y2="20" stroke="#15803D" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PoliciesPage() {
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar siteSettings={siteSettings} />

      <PageHeroBanner
        pageKey="policies"
        siteSettings={siteSettings}
        breadcrumb={
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-800 font-medium">Policies</span>
          </div>
        }
      />

      {/* ── Policy Cards + Sidebar ── */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 grid gap-5 lg:grid-cols-3">

          {/* Policy Grid — 2/3 */}
          <div className="lg:col-span-2">
            <div className="grid gap-3 sm:grid-cols-2">
              {policies.map((policy, i) => {
                const Icon = policy.icon;
                return (
                  <Link
                    key={i}
                    href={policy.href}
                    className="group flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-blue/20 bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-200">
                        <Icon size={18} />
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h2 className="text-[13px] font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {policy.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-gray-500 leading-relaxed flex-1">
                      {policy.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-brand-blue">
                      View Policy <ArrowRight size={11} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar — 1/3 */}
          <div>
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sticky top-24">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>

              <h3 className="text-sm font-bold text-brand-navy">Need Help?</h3>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                If you have any questions about our policies or need further assistance, our support team is here to help.
              </p>

              <div className="my-4 border-t border-gray-100" />

              <div className="space-y-4">
                {/* Call Us */}
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Call Us</p>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-xs font-semibold text-brand-blue hover:underline">{phone}</a>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mon – Fri, 8:00 AM – 8:00 PM ET</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Email Us</p>
                    <a href={`mailto:${email}`} className="text-xs font-semibold text-brand-blue hover:underline break-all">{email}</a>
                    <p className="text-[10px] text-gray-400 mt-0.5">We reply within 1 business day</p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                    <MessageCircle size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Live Chat</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Chat with our support team</p>
                    <a href="#chat" className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline">
                      Start Live Chat <ArrowRight size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitment Banner ── */}
      <section className="bg-white border-t border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-brand-blue/20 bg-blue-50 text-brand-blue">
                <Shield size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy">Our Commitment to You</h3>
                <p className="mt-0.5 text-xs text-gray-500 max-w-xl leading-relaxed">
                  We continuously review and update our policies to ensure clarity, fairness, and compliance with industry standards and regulations.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg border border-brand-blue px-4 py-2 text-sm font-bold text-brand-blue hover:bg-brand-blue hover:text-white transition-all whitespace-nowrap"
            >
              Contact Support <ArrowRight size={14} />
            </Link>
          </div>
          <p className="mt-3 text-[11px] text-gray-400 font-medium">Last Updated: May 10, 2024</p>
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
