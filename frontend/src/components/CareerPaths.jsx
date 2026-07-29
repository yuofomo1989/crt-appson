"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, ShieldCheck, Cloud, Award, ArrowUpRight, TrendingUp } from "lucide-react";

const paths = [
  {
    icon: <UserCheck size={28} className="text-brand-blue" />,
    iconBg: "bg-blue-50 text-brand-blue border-blue-100",
    title: "Agile & Project Management",
    courses: "PMP®, CAPM®, PMI-ACP® and more",
    salary: "$115,000",
    btnColor: "border-brand-blue/30 text-brand-blue hover:bg-brand-blue hover:text-white",
    href: "/courses/agile-project-management"
  },
  {
    icon: <ShieldCheck size={28} className="text-emerald-600" />,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    title: "Cybersecurity",
    courses: "CISSP®, CEH®, Security+ and more",
    salary: "$120,000",
    btnColor: "border-emerald-500/30 text-emerald-600 hover:bg-emerald-600 hover:text-white",
    href: "/courses?path=Cybersecurity"
  },
  {
    icon: <Cloud size={28} className="text-brand-orange" />,
    iconBg: "bg-orange-50 text-brand-orange border-orange-100",
    title: "Salesforce & Cloud",
    courses: "Admin, App Builder, Business Analyst and more",
    salary: "$110,000",
    btnColor: "border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-white",
    href: "/courses?path=Cloud"
  },
  {
    icon: <span className="text-2xl font-black text-purple-600 font-serif">Σ</span>,
    iconBg: "bg-purple-50 text-purple-600 border-purple-100",
    title: "Lean Six Sigma",
    courses: "Green Belt, Black Belt and more",
    salary: "$95,000",
    btnColor: "border-purple-500/30 text-purple-600 hover:bg-purple-600 hover:text-white",
    href: "/courses?path=Quality"
  }
];

export default function CareerPaths() {
  return (
    <section id="career-paths" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            Choose Your <span className="text-brand-blue">Career Path</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            High-demand skills. Industry-recognized certifications. Better career opportunities.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((path, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-200/80 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] text-center space-y-6"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className={`mx-auto h-16 w-16 rounded-2xl flex items-center justify-center border shadow-xs ${path.iconBg}`}>
                  {path.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-brand-navy leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    {path.courses}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg. Salary</p>
                  <p className="text-xl font-black text-brand-navy">{path.salary}</p>
                </div>

                <div className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-600">
                  High Demand <TrendingUp size={12} />
                </div>

                <Link
                  href={path.href}
                  className={`block w-full py-3 rounded-xl border text-xs font-bold transition-all shadow-xs ${path.btnColor}`}
                >
                  Explore Path
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA Link */}
        <div className="text-center mt-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-blue hover:underline"
          >
            View All Certifications →
          </Link>
        </div>

      </div>
    </section>
  );
}
