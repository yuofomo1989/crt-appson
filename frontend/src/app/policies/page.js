"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-800 font-medium">Policies</span>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12">
          {/* Text */}
          <div className="lg:flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
              Policies
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-navy md:text-5xl">
              Our Policies.<br />Your Trust.
            </h1>
            <p className="mt-5 max-w-md text-sm text-gray-500 leading-relaxed">
              We are committed to transparency, security, and delivering the
              best experience for our learners and customers. Please review
              our policies below to understand how we operate.
            </p>
          </div>

          {/* Illustration */}
          <div className="mt-10 lg:mt-0 lg:flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Dot pattern */}
              <div className="absolute top-0 right-0 grid grid-cols-8 gap-2 opacity-15 pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                ))}
              </div>
              <div className="relative z-10 rounded-3xl overflow-hidden">
                <Image
                  src="/policies_illustration.jpg"
                  alt="Our Policies illustration"
                  width={480}
                  height={420}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Policy Cards + Sidebar ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-3">

          {/* Policy Grid — 2/3 */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {policies.map((policy, i) => {
                const Icon = policy.icon;
                return (
                  <Link
                    key={i}
                    href={policy.href}
                    className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-200"
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/20 bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-200">
                        <Icon size={20} />
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-gray-300 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                    {/* Title */}
                    <h2 className="text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {policy.title}
                    </h2>
                    {/* Description */}
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed flex-1">
                      {policy.desc}
                    </p>
                    {/* View Policy link */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-blue">
                      View Policy <ArrowRight size={12} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar — 1/3 */}
          <div className="space-y-4">
            {/* Need Help card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {/* Headset icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-brand-blue">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>

              <h3 className="text-base font-bold text-brand-navy">Need Help?</h3>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                If you have any questions about our policies or need further assistance,
                our support team is here to help.
              </p>

              {/* Divider */}
              <div className="my-5 border-t border-gray-100" />

              {/* Contact options */}
              <div className="space-y-5">
                {/* Call Us */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Call Us</p>
                    <a href="tel:8887457575" className="text-xs font-semibold text-brand-blue hover:underline">
                      (888) 745-7575
                    </a>
                    <p className="text-[11px] text-gray-400 mt-0.5">Mon – Fri, 8:00 AM – 8:00 PM ET</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Email Us</p>
                    <a href="mailto:support@certificationplanner.com" className="text-xs font-semibold text-brand-blue hover:underline break-all">
                      support@certificationplanner.com
                    </a>
                    <p className="text-[11px] text-gray-400 mt-0.5">We reply within 1 business day</p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">Live Chat</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Chat with our support team</p>
                    <a href="#chat" className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline">
                      Start Live Chat <ArrowRight size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitment Banner ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-gray-50 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-brand-blue/20 bg-blue-50 text-brand-blue">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy">Our Commitment to You</h3>
                <p className="mt-1 text-xs text-gray-500 max-w-xl leading-relaxed">
                  We continuously review and update our policies to ensure clarity, fairness,
                  and compliance with industry standards and regulations.
                </p>
              </div>
            </div>
            {/* Right */}
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl border border-brand-blue px-5 py-2.5 text-sm font-bold text-brand-blue hover:bg-brand-blue hover:text-white transition-all whitespace-nowrap"
            >
              Contact Support <ArrowRight size={14} />
            </Link>
          </div>

          {/* Last updated */}
          <p className="mt-4 text-[11px] text-gray-400 font-medium">
            Last Updated: May 10, 2024
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
