"use client";

import React from "react";
import { Award, Globe, Users, ShieldCheck, CheckCircle } from "lucide-react";

const badges = [
  {
    icon: <Award className="text-brand-blue" size={24} />,
    title: "98% Success Rate",
    description: "Exam passing ratio",
  },
  {
    icon: <Globe className="text-brand-blue" size={24} />,
    title: "100+ Countries",
    description: "Global delivery presence",
  },
  {
    icon: <Users className="text-brand-blue" size={24} />,
    title: "Expert Instructors",
    description: "Industry practitioners",
  },
  {
    icon: <ShieldCheck className="text-brand-blue" size={24} />,
    title: "Pass Assurance",
    description: "We've got your back",
  },
  {
    icon: <CheckCircle className="text-brand-blue" size={24} />,
    title: "50,000+ Trained",
    description: "Professionals graduated",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-slate-50/60 border-y border-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 items-center text-center lg:text-left">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-4 p-3 hover:translate-y-[-2px] transition-transform duration-200"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs border border-gray-100">
                {badge.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-brand-navy text-sm md:text-base leading-tight">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
