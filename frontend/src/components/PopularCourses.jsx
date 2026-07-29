"use client";

import React, { useState } from "react";
import { Star, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

const categories = ["All", "Project Management", "Cybersecurity", "Cloud & IT"];

const courses = [
  {
    title: "PMP® Certification Training",
    category: "Project Management",
    level: "Intermediate",
    rating: 4.9,
    reviews: 1420,
    duration: "4 Days (35 Contact Hours)",
    nextDate: "Aug 15 - Aug 18, 2026",
    price: "$1,095",
    originalPrice: "$1,495",
    badge: "Best Seller",
    slug: "pmp-certification",
  },
  {
    title: "CISSP® Certification Prep",
    category: "Cybersecurity",
    level: "Advanced",
    rating: 4.8,
    reviews: 980,
    duration: "5 Days (40 Hours)",
    nextDate: "Aug 22 - Aug 26, 2026",
    price: "$1,895",
    originalPrice: "$2,295",
    badge: "High Pass Rate",
    slug: "cissp-certification",
  },
  {
    title: "AWS Certified Solutions Architect",
    category: "Cloud & IT",
    level: "Beginner",
    rating: 4.9,
    reviews: 1150,
    duration: "3 Days (24 Hours)",
    nextDate: "Aug 29 - Aug 31, 2026",
    price: "$995",
    originalPrice: "$1,295",
    badge: "Trending",
    slug: "aws-solutions-architect",
  },
  {
    title: "CAPM® Exam Bootcamp",
    category: "Project Management",
    level: "Beginner",
    rating: 4.7,
    reviews: 340,
    duration: "4 Days (23 Hours)",
    nextDate: "Sep 05 - Sep 08, 2026",
    price: "$795",
    originalPrice: "$995",
    badge: "New",
    slug: "capm-certification",
  },
  {
    title: "CompTIA Security+ Training",
    category: "Cybersecurity",
    level: "Beginner",
    rating: 4.8,
    reviews: 760,
    duration: "5 Days (40 Hours)",
    nextDate: "Sep 12 - Sep 16, 2026",
    price: "$895",
    originalPrice: "$1,195",
    badge: "Entry Level",
    slug: "comptia-security",
  },
  {
    title: "ITIL® 4 Foundation Course",
    category: "Cloud & IT",
    level: "Beginner",
    rating: 4.7,
    reviews: 580,
    duration: "2 Days (16 Hours)",
    nextDate: "Sep 19 - Sep 20, 2026",
    price: "$695",
    originalPrice: "$895",
    badge: "Popular",
    slug: "itil-foundation",
  },
];

export default function PopularCourses() {
  const [activeTab, setActiveTab] = useState("All");
  const { openConsultationModal } = useModal();

  const filteredCourses = activeTab === "All"
    ? courses
    : courses.filter((course) => course.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
            Popular <span className="text-brand-blue">Certifications</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Explore industry-recognized training options with top-rated passing rates.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center overflow-x-auto gap-2 md:gap-4 pb-6 scrollbar-none">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shrink-0 ${
                activeTab === tab
                  ? "bg-brand-navy text-white shadow-md shadow-brand-navy/10"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {filteredCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-100/80 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="space-y-4">
                {/* Header Tag and Level */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-orange-50 px-2.5 py-1 text-xs font-semibold text-brand-orange border border-orange-100">
                    {course.badge}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-brand-navy leading-snug">
                  {course.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="flex items-center text-amber-400">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="font-bold text-gray-800">{course.rating}</span>
                  <span className="text-gray-400">({course.reviews} reviews)</span>
                </div>

                {/* Course Metadata Details */}
                <div className="space-y-2.5 pt-2 text-sm text-gray-600 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-orange" />
                    <span className="font-semibold text-gray-700">Next Class: {course.nextDate}</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Footer Actions */}
              <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold line-through block">
                    {course.originalPrice}
                  </span>
                  <span className="text-2xl font-black text-brand-navy">
                    {course.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex h-11 items-center justify-center rounded-xl border border-gray-200 px-4 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => openConsultationModal(`Enroll in ${course.title}`)}
                    className="flex h-11 items-center justify-center gap-1 rounded-xl bg-brand-blue px-4 text-xs font-bold text-white hover:bg-opacity-90 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    Enroll Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
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
