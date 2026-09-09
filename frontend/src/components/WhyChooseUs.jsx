"use client";

import React from "react";
import { Calendar, ShieldCheck, Laptop, Users, Headset } from "lucide-react";

const defaultBenefits = [
  {
    icon: <Calendar size={22} className="text-brand-blue" />,
    iconBg: "bg-blue-50 text-brand-blue",
    title: "Guaranteed-to-Run Classes",
    desc: "We never cancel a class. Your schedule is our commitment."
  },
  {
    icon: <ShieldCheck size={22} className="text-emerald-600" />,
    iconBg: "bg-emerald-50 text-emerald-600",
    title: "Pass Assurance",
    desc: "We provide extra support and resources until you succeed."
  },
  {
    icon: <Laptop size={22} className="text-brand-orange" />,
    iconBg: "bg-orange-50 text-brand-orange",
    title: "Flexible Learning Options",
    desc: "Live online, in-person or self-paced training options."
  },
  {
    icon: <Users size={22} className="text-purple-600" />,
    iconBg: "bg-purple-50 text-purple-600",
    title: "Expert Instructors",
    desc: "Learn from industry practitioners with real-world experience."
  },
  {
    icon: <Headset size={22} className="text-cyan-600" />,
    iconBg: "bg-cyan-50 text-cyan-600",
    title: "24/7 Learner Support",
    desc: "Our support team is here to help you at every step."
  }
];

export default function WhyChooseUs({ siteSettings = {} }) {
  const icons = [
    <Calendar key={1} size={22} className="text-brand-blue" />,
    <ShieldCheck key={2} size={22} className="text-emerald-600" />,
    <Laptop key={3} size={22} className="text-brand-orange" />,
    <Users key={4} size={22} className="text-purple-600" />,
    <Headset key={5} size={22} className="text-cyan-600" />
  ];

  const iconBgs = [
    "bg-blue-50 text-brand-blue",
    "bg-emerald-50 text-emerald-600",
    "bg-orange-50 text-brand-orange",
    "bg-purple-50 text-purple-600",
    "bg-cyan-50 text-cyan-600"
  ];

  const displayBenefits = siteSettings.why_choose_us && siteSettings.why_choose_us.length > 0
    ? siteSettings.why_choose_us.map((item, idx) => ({
        icon: icons[idx % icons.length],
        iconBg: iconBgs[idx % iconBgs.length],
        title: item.title,
        desc: item.desc
      }))
    : defaultBenefits;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            {siteSettings.why_choose_title ? (
              <span dangerouslySetInnerHTML={{ __html: siteSettings.why_choose_title }} />
            ) : (
              <>Why Choose <span className="text-brand-blue">Certification Planner?</span></>
            )}
          </h2>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayBenefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-200/80 p-6 flex flex-col items-center text-center space-y-4 shadow-xs hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${item.iconBg}`}>
                {item.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-xs md:text-sm font-black text-brand-navy leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
