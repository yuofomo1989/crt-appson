"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Video, ChevronLeft, ChevronRight } from "lucide-react";

const defaultClasses = [
  {
    month: "NOV",
    day: "10",
    title: "PMP® Certification Exam Preparation Training",
    dates: "Nov 10 – Nov 13, 2026",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-brand-blue text-white",
    btnColor: "bg-brand-blue hover:bg-opacity-90",
    slug: "pmp-certification-training"
  },
  {
    month: "NOV",
    day: "17",
    title: "CISSP® Certification Bootcamp",
    dates: "Nov 17 – Nov 20, 2026",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-brand-orange text-white",
    btnColor: "bg-brand-orange hover:bg-opacity-90",
    slug: "cissp-certification-bootcamp"
  },
  {
    month: "NOV",
    day: "24",
    title: "Lean Six Sigma Green Belt Certification",
    dates: "Nov 24 – Nov 27, 2026",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-emerald-600 text-white",
    btnColor: "bg-emerald-600 hover:bg-opacity-90",
    slug: "lean-sigma-green-belt-certification"
  },
  {
    month: "DEC",
    day: "01",
    title: "PMI-ACP® Agile Certified Practitioner",
    dates: "Dec 01 – Dec 04, 2026",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-purple-600 text-white",
    btnColor: "bg-purple-600 hover:bg-opacity-90",
    slug: "pmi-acp-certification-training"
  }
];

export default function UpcomingLiveClasses({ schedules = [], courses = [] }) {
  const badgeColors = [
    "bg-brand-blue text-white",
    "bg-brand-orange text-white",
    "bg-emerald-600 text-white",
    "bg-purple-600 text-white"
  ];

  const btnColors = [
    "bg-brand-blue hover:bg-opacity-90",
    "bg-brand-orange hover:bg-opacity-90",
    "bg-emerald-600 hover:bg-opacity-90",
    "bg-purple-600 hover:bg-opacity-90"
  ];

  const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const parseBatchDate = (batch_date) => {
    if (!batch_date) return { month: "NOV", day: "10" };
    const str = batch_date.trim();

    // ISO format: "2026-11-10 to 2026-11-13" or "2026-11-10"
    const isoMatch = str.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      const monthIdx = parseInt(isoMatch[2], 10) - 1;
      return { month: monthNames[monthIdx] || "NOV", day: isoMatch[3] };
    }

    // Human format: "Nov 10 – Nov 13, 2026"
    const humanMatch = str.match(/([A-Za-z]{3,9})\s+(\d{1,2})/);
    if (humanMatch) {
      return {
        month: humanMatch[1].substring(0, 3).toUpperCase(),
        day: humanMatch[2].padStart(2, "0")
      };
    }

    return { month: "NOV", day: "10" };
  };

  // Format time from "09:00" or "09:00 AM" → "9:00 AM"
  const formatTime = (t) => {
    if (!t) return null;
    t = t.trim();
    if (/AM|PM/i.test(t)) return t;
    const [h, m] = t.split(":").map(Number);
    if (isNaN(h)) return t;
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${String(m || 0).padStart(2, "0")} ${period}`;
  };

  // Pick distinct certification courses so each card showcases a unique top program
  const getCourseFamily = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes("pmp plus") || t.includes("pmp ")) return "pmp";
    if (t.includes("capm")) return "capm";
    if (t.includes("pmi-acp") || t.includes("pmi acp")) return "pmi-acp";
    if (t.includes("cissp")) return "cissp";
    if (t.includes("green belt") && !t.includes("black")) return "lssgb";
    if (t.includes("green and black") || t.includes("black belt")) return "lssbb";
    if (t.includes("cbap")) return "cbap";
    if (t.includes("pgmp")) return "pgmp";
    if (t.includes("cism") || t.includes("cisa")) return "cism";
    if (t.includes("security+")) return "secplus";
    if (t.includes("devops")) return "devops";
    if (t.includes("salesforce")) return "salesforce";
    return t;
  };

  const getDistinctSchedules = (list = []) => {
    if (!list || list.length === 0) return [];
    // Priority order matching Reference Image 1: PMP, CAPM, Lean Six Sigma Green Belt, CISSP, then others
    const priorityFamilies = ["pmp", "capm", "lssgb", "cissp", "pmi-acp", "cism", "devops", "salesforce"];
    const distinct = [];
    const seenFamilies = new Set();

    for (const targetFam of priorityFamilies) {
      const match = list.find(s => {
        const cObj = (courses || []).find(c => c.id === s.course_id || c.slug === s.course_slug);
        const title = s.course_title || (cObj ? cObj.title : "");
        return title && !title.toLowerCase().includes("plus") && getCourseFamily(title) === targetFam;
      });
      if (match) {
        seenFamilies.add(targetFam);
        distinct.push(match);
      }
    }

    for (const s of list) {
      if (distinct.length >= 8) break;
      const cObj = (courses || []).find(c => c.id === s.course_id || c.slug === s.course_slug);
      const title = s.course_title || (cObj ? cObj.title : "");
      if (!title) continue;
      const family = getCourseFamily(title);
      if (!seenFamilies.has(family)) {
        seenFamilies.add(family);
        distinct.push(s);
      }
    }
    return distinct.length > 0 ? distinct : list.slice(0, 8);
  };

  const [startIndex, setStartIndex] = useState(0);

  const distinctList = (schedules && schedules.length > 0) ? getDistinctSchedules(schedules) : [];

  const displayClasses = (distinctList.length > 0)
    ? distinctList.map((sch, idx) => {
        const courseObj = (courses || []).find(c => c.id === sch.course_id || c.slug === sch.course_slug);
        const courseTitle = sch.course_title || (courseObj ? courseObj.title : "Professional Certification Bootcamp");
        
        const { month: monthStr, day: dayStr } = parseBatchDate(sch.batch_date || sch.date_range);
        const startFmt = formatTime(sch.start_time);
        const endFmt = formatTime(sch.end_time);
        const timeStr = startFmt && endFmt
          ? `${startFmt} – ${endFmt} (${sch.timezone || 'EST'})`
          : (startFmt ? `${startFmt} (${sch.timezone || 'EST'})` : "9:00 AM – 5:00 PM (EST)");

        return {
          month: monthStr,
          day: dayStr,
          title: courseTitle,
          dates: sch.date_range || sch.batch_date || "Upcoming Batch",
          time: timeStr,
          location: "Live Online Classroom",
          badgeColor: badgeColors[idx % badgeColors.length],
          btnColor: btnColors[idx % btnColors.length],
          slug: sch.course_slug || (courseObj ? courseObj.slug : "courses")
        };
      })
    : defaultClasses;

  const visibleClasses = [];
  for (let i = 0; i < Math.min(4, displayClasses.length); i++) {
    const item = displayClasses[(startIndex + i) % displayClasses.length];
    visibleClasses.push({
      ...item,
      badgeColor: badgeColors[i % badgeColors.length],
      btnColor: btnColors[i % btnColors.length]
    });
  }

  const handlePrev = () => {
    setStartIndex(prev => (prev - 1 + displayClasses.length) % displayClasses.length);
  };

  const handleNext = () => {
    setStartIndex(prev => (prev + 1) % displayClasses.length);
  };

  return (
    <section className="py-6 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <div className="text-left space-y-1">
            <h2 className="text-2xl md:text-4xl font-black text-brand-navy">
              Upcoming <span className="text-brand-blue">Live Classes</span>
            </h2>
            <p className="text-xs text-gray-500 font-semibold">
              Flexible schedules with guaranteed-to-run classes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="h-9 w-9 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-blue-50/50 text-gray-600 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Classes"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="h-9 w-9 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-blue-50/50 text-gray-600 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Classes"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <Link href="/enroll" className="text-xs font-bold text-brand-blue hover:underline">
              View Full Batch Calendar →
            </Link>
          </div>
        </div>

        {/* Classes Grid (4 Cards Row) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleClasses.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] text-left space-y-4"
            >
              {/* Top: Date Badge + Course Title ONLY (no subtitle under title) */}
              <div className="flex items-center gap-3.5">
                <div className={`h-14 w-12 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-xs ${item.badgeColor}`}>
                  <span className="text-[9px] font-bold uppercase tracking-wider">{item.month}</span>
                  <span className="text-base font-black leading-none">{item.day}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-black text-brand-navy leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Middle: 3 Points above Enroll Now (Date, Time, Live Online Classroom) */}
              <div className="space-y-2 pt-3 border-t border-gray-100 text-[11px] text-gray-600 font-semibold">
                <div className="flex items-center gap-2 font-bold text-gray-700">
                  <Calendar size={13} className="text-brand-blue shrink-0" />
                  <span>{item.dates}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={13} className="text-brand-blue shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 font-bold">
                  <Video size={13} className="text-brand-blue shrink-0" />
                  <span>Live Online Classroom</span>
                </div>
              </div>

              {/* Bottom: Action Button */}
              <div className="pt-2">
                <Link
                  href={item.slug && item.slug !== "courses" ? `/courses/${item.slug}` : "/enroll"}
                  className={`block w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs text-center cursor-pointer ${item.btnColor}`}
                >
                  Enroll Now →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
