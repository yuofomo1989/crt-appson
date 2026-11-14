"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, ShieldCheck, Cloud, Award, Layers, Star } from "lucide-react";

const defaultPaths = [
  {
    icon: <UserCheck size={28} className="text-brand-blue" />,
    iconBg: "bg-blue-50 text-brand-blue border-blue-100",
    title: "Agile & Project Management",
    courses: "PMP®, CAPM®, PMI-ACP® and more",
    salary: "$115,000",
    badge: "Top Choice",
    btnColor: "bg-brand-blue text-white hover:bg-blue-700 border-brand-blue",
    href: "/category/agile-project-management"
  },
  {
    icon: <Cloud size={28} className="text-emerald-600" />,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    title: "DevOps & Salesforce",
    courses: "Salesforce Administrator, DevOps and more",
    salary: "$115,000",
    badge: "Top Choice",
    btnColor: "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600",
    href: "/category/devops-and-sf-certification"
  },
  {
    icon: <ShieldCheck size={28} className="text-brand-orange" />,
    iconBg: "bg-orange-50 text-brand-orange border-orange-100",
    title: "Information Security",
    courses: "CISSP®, CISA®, CISM® and more",
    salary: "$115,000",
    badge: "Top Choice",
    btnColor: "bg-brand-orange text-white hover:bg-orange-600 border-brand-orange",
    href: "/category/information-security-certification"
  },
  {
    icon: <Award size={28} className="text-purple-600" />,
    iconBg: "bg-purple-50 text-purple-600 border-purple-100",
    title: "IT Service and Architecture",
    courses: "ITIL® 4 Foundation, TOGAF® and more",
    salary: "$115,000",
    badge: "Top Choice",
    btnColor: "bg-purple-600 text-white hover:bg-purple-700 border-purple-600",
    href: "/category/itil-certification"
  },
  {
    icon: <Layers size={28} className="text-teal-600" />,
    iconBg: "bg-teal-50 text-teal-600 border-teal-100",
    title: "Lean and Six Sigma",
    courses: "Green Belt, Black Belt, Yellow Belt and more",
    salary: "$115,000",
    badge: "Top Choice",
    btnColor: "bg-teal-600 text-white hover:bg-teal-700 border-teal-600",
    href: "/category/lean-six-sigma-certification"
  }
];

export default function CareerPaths({ categories = [], courses = [] }) {
  // Filter active featured categories and sort by display_order rank
  const featuredCategories = categories && categories.length > 0
    ? categories
        .filter(c => c.is_featured !== false && c.is_featured !== 0)
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    : [];

  const displayPaths = featuredCategories.length > 0
    ? featuredCategories.map((cat, idx) => {
        const catCourses = courses.filter(c => c.category_name === cat.name).map(c => c.title);
        const coursesString = catCourses.length > 0 
          ? (catCourses.slice(0, 3).join(", ") + (catCourses.length > 3 ? " and more" : ""))
          : "Professional certification bootcamps";

        const iconBgs = [
          "bg-blue-50 text-brand-blue border-blue-100",
          "bg-emerald-50 text-emerald-600 border-emerald-100",
          "bg-orange-50 text-brand-orange border-orange-100",
          "bg-purple-50 text-purple-600 border-purple-100",
          "bg-teal-50 text-teal-600 border-teal-100"
        ];

        const btnColors = [
          "bg-brand-blue text-white hover:bg-blue-700 border-brand-blue",
          "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600",
          "bg-brand-orange text-white hover:bg-orange-600 border-brand-orange",
          "bg-purple-600 text-white hover:bg-purple-700 border-purple-600",
          "bg-teal-600 text-white hover:bg-teal-700 border-teal-600"
        ];

        const icons = [
          <UserCheck key={1} size={28} className="text-brand-blue" />,
          <Cloud key={2} size={28} className="text-emerald-600" />,
          <ShieldCheck key={3} size={28} className="text-brand-orange" />,
          <Award key={4} size={28} className="text-purple-600" />,
          <Layers key={5} size={28} className="text-teal-600" />
        ];

        return {
          icon: icons[idx % icons.length],
          iconBg: iconBgs[idx % iconBgs.length],
          title: cat.name,
          courses: coursesString,
          salary: cat.avg_salary || "$115,000",
          badge: cat.badge_text || "Top Choice",
          btnColor: btnColors[idx % btnColors.length],
          href: cat.slug ? `/category/${cat.slug}` : `/courses?category=${encodeURIComponent(cat.name)}`
        };
      })
    : defaultPaths;

  return (
    <section id="career-paths" className="py-6 md:py-8 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-1.5">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            Choose Your <span className="text-brand-blue">Career Path</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            High-demand skills. Industry-recognized certifications. Better career opportunities.
          </p>
        </div>

        {/* Dynamic 5-Column Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {displayPaths.map((path, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-200/80 p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] text-center space-y-4"
            >
              <div className="space-y-3">
                {/* Icon wrapper */}
                <div className={`mx-auto h-14 w-14 rounded-2xl flex items-center justify-center border shadow-xs ${path.iconBg}`}>
                  {path.icon}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-brand-navy leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed line-clamp-3">
                    {path.courses}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg. Salary</p>
                  <p className="text-xl font-black text-brand-navy">{path.salary}</p>
                </div>

                <div className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-600">
                  <Star size={12} className="fill-emerald-500 text-emerald-500" /> {path.badge}
                </div>

                <Link
                  href={path.href}
                  className={`block w-full py-2.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${path.btnColor}`}
                >
                  Explore Path →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA Link */}
        <div className="text-center mt-5">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-blue hover:underline"
          >
            View All Certifications →
          </Link>
        </div>

      </div>
    </section>
  );
}
