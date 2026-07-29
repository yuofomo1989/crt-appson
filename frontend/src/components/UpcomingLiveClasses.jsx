"use client";

import React from "react";
import Link from "next/link";
import { Clock, Video, ChevronLeft, ChevronRight } from "lucide-react";

const classesData = [
  {
    month: "MAY",
    day: "27",
    title: "PMP® Certification Training",
    dates: "May 27 – May 31, 2024",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-brand-blue text-white",
    btnColor: "bg-brand-blue hover:bg-opacity-90",
    slug: "pmp-certification"
  },
  {
    month: "JUN",
    day: "03",
    title: "CISSP® Certification Training",
    dates: "Jun 3 – Jun 7, 2024",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-brand-orange text-white",
    btnColor: "bg-brand-orange hover:bg-opacity-90",
    slug: "cissp-certification"
  },
  {
    month: "JUN",
    day: "10",
    title: "AWS Solutions Architect Training",
    dates: "Jun 10 – Jun 14, 2024",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-emerald-600 text-white",
    btnColor: "bg-emerald-600 hover:bg-opacity-90",
    slug: "aws-solutions-architect"
  },
  {
    month: "JUN",
    day: "17",
    title: "AgilePM® Practitioner Training",
    dates: "Jun 17 – Jun 21, 2024",
    time: "9:00 AM – 5:00 PM (EST)",
    badgeColor: "bg-purple-600 text-white",
    btnColor: "bg-purple-600 hover:bg-opacity-90",
    slug: "agilepm-certification"
  }
];

export default function UpcomingLiveClasses() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <h2 className="text-2xl md:text-4xl font-black text-brand-navy">
            Upcoming <span className="text-brand-blue">Live Classes</span>
          </h2>
          <Link href="/courses" className="text-xs font-bold text-brand-blue hover:underline">
            View All Schedules →
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classesData.map((item, idx) => (
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
                    <h3 className="text-xs font-black text-brand-navy leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-brand-blue font-bold">
                      <Video size={10} /> Live Online
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="space-y-1 pt-3 border-t border-gray-100 text-[10px] text-gray-500 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-gray-400" />
                    <span>{item.dates}</span>
                  </div>
                  <div className="pl-4 text-gray-400">
                    {item.time}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const cartItem = {
                        course: item.title,
                        format: "Live Online Class",
                        price: 1095,
                        date: item.dates
                      };
                      if (typeof window !== "undefined") {
                        localStorage.setItem("cp_cart", JSON.stringify(cartItem));
                        const isSubpath = window.location.pathname.includes('/crt-appson');
                        const basePath = isSubpath ? '/crt-appson' : '';
                        window.location.href = `${basePath}/checkout/`;
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs text-center cursor-pointer ${item.btnColor}`}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Arrows */}
          <div className="hidden lg:flex items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 -mx-5 pointer-events-none">
            <button className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 shadow-md pointer-events-auto hover:bg-gray-50">
              <ChevronLeft size={16} />
            </button>
            <button className="h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 shadow-md pointer-events-auto hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
