"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

const defaultFaqs = [
  {
    q: "What is your pass assurance policy?",
    a: "We provide comprehensive training, official courseware, and mock practice exams. If you do not pass on your first attempt, we offer free course retakes and dedicated instructor support until you earn your certification."
  },
  {
    q: "Are your courses accredited?",
    a: "Yes! Certification Planner is a PMI Authorized Training Partner (ATP #4653) and an official partner for Lean Six Sigma, Salesforce, Scrum, ITIL®, and Cybersecurity training standards."
  },
  {
    q: "What if I need to reschedule my class?",
    a: "We understand schedules change. You can easily transfer to another upcoming live batch with advance notice through our 24/7 learner support team."
  },
  {
    q: "Do you offer corporate or group discounts?",
    a: "Yes! For teams of 3 or more professionals, we provide custom enterprise pricing, dedicated account managers, and private virtual or on-site classroom sessions."
  }
];

export default function FaqSection({ siteSettings = {} }) {
  const [openIdx, setOpenIdx] = useState(-1);

  const displayFaqs = siteSettings.homepage_faqs && siteSettings.homepage_faqs.length > 0
    ? siteSettings.homepage_faqs
    : defaultFaqs;

  return (
    <section className="py-10 md:py-16 bg-slate-50/60 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column (5 Cols): Scaled-Up Prominent Title, Subtitle & Contact Link */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-[46px] font-black text-brand-navy tracking-tight leading-[1.12]">
              {siteSettings.faq_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteSettings.faq_title }} />
              ) : (
                <>
                  Frequently Asked<br />
                  <span className="text-brand-blue">Questions</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-md">
              Have more questions? Our team is happy to help.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-base sm:text-lg font-black text-brand-blue hover:text-blue-700 hover:gap-3 transition-all duration-200"
              >
                <span>Contact Us</span>
                <ArrowRight size={18} className="transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column (7 Cols): Accordion FAQ Items */}
          <div className="lg:col-span-7 space-y-3 text-left">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-brand-blue/30 shadow-md ring-1 ring-brand-blue/10" : "border-gray-200/80 shadow-xs hover:border-gray-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-black text-xs sm:text-sm text-brand-navy hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`shrink-0 transition-transform duration-200 ${isOpen ? "text-brand-blue rotate-180" : "text-gray-400"}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100/70 bg-slate-50/40">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
