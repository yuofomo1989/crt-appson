"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

const defaultFaqs = [
  {
    q: "What is the 100% Pass Guarantee policy?",
    a: "We provide comprehensive training, official courseware, and mock practice exams. If you do not pass on your first attempt, we offer free course retakes and dedicated instructor support until you earn your certification."
  },
  {
    q: "What formats of training are available?",
    a: "We offer Live Online Classroom (virtual instructor-led), In-Person Classroom bootcamps in 100+ major cities across the USA and Canada, and Self-Paced E-Learning modules."
  },
  {
    q: "Are your bootcamps aligned with official certification bodies?",
    a: "Yes! Certification Planner is a PMI Authorized Training Partner (ATP #4653) and an official partner for Lean Six Sigma, Salesforce, Scrum, and Cybersecurity training standards."
  },
  {
    q: "How do I claim group or corporate training discounts?",
    a: "For teams of 3 or more professionals, we provide custom enterprise pricing, dedicated account managers, and private virtual or on-site classroom sessions. Contact our corporate training advisors for a quote."
  },
  {
    q: "What is included in the course tuition fee?",
    a: "Tuition includes live instructor-led bootcamp sessions, official exam prep study guides, practice question banks, 35+ contact hours certificate, and 24/7 post-training support."
  }
];

export default function FaqSection({ siteSettings = {} }) {
  const [openIdx, setOpenIdx] = useState(0);

  const displayFaqs = siteSettings.homepage_faqs && siteSettings.homepage_faqs.length > 0
    ? siteSettings.homepage_faqs
    : defaultFaqs;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-gray-100">
      <div className="mx-auto max-w-4xl px-4 md:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-xs font-bold">
            <HelpCircle size={14} /> Got Questions? We Have Answers
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            {siteSettings.faq_title ? (
              <span dangerouslySetInnerHTML={{ __html: siteSettings.faq_title }} />
            ) : (
              <>Frequently Asked <span className="text-brand-blue">Questions</span></>
            )}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold max-w-xl mx-auto">
            Everything you need to know about our bootcamps, exam pass guarantee, and enrollment options.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4 text-left">
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
                  className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left font-extrabold text-sm md:text-base text-brand-navy hover:text-brand-blue transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-xl bg-blue-50 text-brand-blue font-mono text-xs flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  <div className={`h-8 w-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-brand-blue' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-gray-600 font-semibold leading-relaxed border-t border-gray-100/60 bg-slate-50/30">
                    <p className="pl-10">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support CTA */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-brand-navy flex items-center justify-center sm:justify-start gap-2">
              <MessageSquare size={16} className="text-brand-orange" /> Still have questions?
            </h4>
            <p className="text-xs text-gray-500 font-semibold">Can't find the answer you're looking for? Speak with our training team.</p>
          </div>
          <a
            href={`tel:${siteSettings.support_phone || '(888) 745-7575'}`}
            className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-opacity-90 text-white font-bold text-xs shrink-0 shadow-md transition-all"
          >
            Call {siteSettings.support_phone || '(888) 745-7575'}
          </a>
        </div>

      </div>
    </section>
  );
}
