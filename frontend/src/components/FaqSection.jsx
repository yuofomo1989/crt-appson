"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <section className="py-6 md:py-8 bg-slate-50/60 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column (4 Cols): Title & Contact Us Link (Matches Reference Image 1) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h2 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight leading-tight">
              {siteSettings.faq_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteSettings.faq_title }} />
              ) : (
                <>
                  Frequently Asked<br />
                  <span className="text-brand-blue">Questions</span>
                </>
              )}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
              Have more questions? Our team is happy to help.
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-brand-blue hover:underline"
              >
                Contact Us →
              </Link>
            </div>
          </div>

          {/* Right Column (8 Cols): Accordion FAQ Items */}
          <div className="lg:col-span-8 space-y-2.5 text-left">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-extrabold text-xs sm:text-sm text-brand-navy hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-gray-400 shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs text-gray-600 font-semibold leading-relaxed border-t border-gray-100/60 bg-slate-50/30">
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
