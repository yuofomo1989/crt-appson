"use client";

import React from "react";
import Link from "next/link";
import { Clock, Video, ChevronLeft, ChevronRight } from "lucide-react";

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
    const distinct = [];
    const seenFamilies = new Set();
    for (const s of list) {
      const cObj = (courses || []).find(c => c.id === s.course_id || c.slug === s.course_slug);
      const title = s.course_title || (cObj ? cObj.title : "");
      if (!title) continue;
      const family = getCourseFamily(title);
      if (!seenFamilies.has(family)) {
        seenFamilies.add(family);
        distinct.push(s);
        if (distinct.length >= 8) break;
      }
    }
    // If fewer than 8 distinct found, fill remainder with other available schedules
    if (distinct.length < 8) {
      for (const s of list) {
        if (!distinct.some(d => d.id === s.id)) {
          distinct.push(s);
          if (distinct.length >= 8) break;
        }
      }
    }
    return distinct.length > 0 ? distinct : list.slice(0, 8);
  };

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
          location: sch.city || sch.format || "Live Online Classroom",
          badgeColor: badgeColors[idx % badgeColors.length],
          btnColor: btnColors[idx % btnColors.length],
          slug: sch.course_slug || (courseObj ? courseObj.slug : "courses")
        };
      })
    : defaultClasses;

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy">
            Upcoming <span className="text-brand-blue">Live Classes</span>
          </h2>
          <Link href="/courses" className="text-xs font-bold text-brand-blue hover:underline">
            View Full Batch Calendar →
          </Link>
        </div>

        {/* Classes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayClasses.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-200/80 p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] text-left space-y-4"
            >
              <div className="flex items-start gap-3">
                {/* Date Badge */}
                <div className={`h-14 w-12 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-xs ${item.badgeColor}`}>
                  <span className="text-[9px] font-bold uppercase tracking-wider">{item.month}</span>
                  <span className="text-base font-black leading-none">{item.day}</span>
                </div>

                {/* Title & Format */}
                <div className="space-y-1">
                  <h3 className="text-xs font-black text-brand-navy leading-snug line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-brand-blue font-bold">
                    <Video size={10} /> {item.location}
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-1 pt-3 border-t border-gray-100 text-[10px] text-gray-500 font-semibold">
                <div className="flex items-center gap-1.5 font-bold text-gray-700">
                  <Clock size={12} className="text-brand-blue" />
                  <span>{item.dates}</span>
                </div>
                <div className="pl-4 text-gray-400">
                  {item.time}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href={item.slug && item.slug !== "courses" ? `/courses/${item.slug}` : "/courses"}
                  className={`block w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs text-center cursor-pointer ${item.btnColor}`}
                >
                  Enroll in Batch
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
