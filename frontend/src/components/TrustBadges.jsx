"use client";

import React from "react";
import { Award, Globe, Users, ShieldCheck, Briefcase } from "lucide-react";

export default function TrustBadges({ siteSettings = {} }) {
  const dynamicBadges = [
    {
      icon: <Award className="text-brand-blue" size={26} />,
      title: `${siteSettings.pass_rate || "98%"}`,
      subtitle: "Success Rate",
    },
    {
      icon: <Globe className="text-brand-blue" size={26} />,
      title: "100+",
      subtitle: "Countries",
    },
    {
      icon: <Users className="text-brand-blue" size={26} />,
      title: "Expert Instructors",
      subtitle: "Industry Practitioners",
    },
    {
      icon: <ShieldCheck className="text-brand-blue" size={26} />,
      title: "Pass Assurance",
      subtitle: "We've Got Your Back",
    },
    {
      icon: <Briefcase className="text-brand-blue" size={26} />,
      title: `${siteSettings.total_students_trained || "50,000+"}`,
      subtitle: "Professionals Trained",
    },
  ];

  return (
    <section className="relative z-20 -mt-2 pb-12 pt-2 bg-transparent">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-100/90 rounded-2xl shadow-md py-6 px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
            {dynamicBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 group hover:translate-y-[-2px] transition-transform duration-200"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50/70 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                  {badge.icon}
                </div>
                <div className="text-left space-y-0.5">
                  <h4 className="font-extrabold text-[#0B1E33] text-sm sm:text-base leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold leading-tight">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
