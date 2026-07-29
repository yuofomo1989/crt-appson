"use client";

import React from "react";
import { Check, X, ShieldAlert } from "lucide-react";

const rows = [
  {
    feature: "Live Instructor-Led Sessions",
    us: true,
    self: false,
    others: "Sometimes",
  },
  {
    feature: "Vetted 15+ Yrs Industry Experts",
    us: true,
    self: false,
    others: false,
  },
  {
    feature: "Official Mock Exam Simulators",
    us: true,
    self: "Extra Cost",
    others: false,
  },
  {
    feature: "100% Pass Assurance Policy",
    us: true,
    self: false,
    others: false,
  },
  {
    feature: "24/7 Dedicated Support",
    us: true,
    self: false,
    others: "Email Only",
  },
  {
    feature: "Exam Application Review Assistance",
    us: true,
    self: false,
    others: false,
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-black uppercase tracking-wider">
            Side-by-side Matrix
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight">
            How We Compare <span className="text-brand-blue">To Others</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
            Side-by-side evaluation matrix showing why leading professionals choose our bootcamp formats.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200/80 bg-white shadow-xl">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50">
                <th className="p-6 text-sm font-black text-brand-navy w-[35%] pl-8">
                  Feature &amp; Benefits
                </th>

                {/* Certification Planner Column */}
                <th className="p-6 text-center bg-brand-navy text-white w-[25%] rounded-t-3xl">
                  <div className="mb-2">
                    <span className="inline-block bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs">
                      ★ Best Choice
                    </span>
                  </div>
                  <p className="text-base font-black tracking-tight">Certification Planner</p>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider mt-0.5">Live Bootcamp</p>
                </th>

                <th className="p-6 text-sm font-black text-center text-gray-600 w-[20%]">
                  Self-Paced Learning
                </th>

                <th className="p-6 text-sm font-black text-center text-gray-600 w-[20%] pr-8">
                  Traditional Bootcamps
                </th>
              </tr>
            </thead>
              <tbody className="divide-y divide-gray-100/80">
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    {/* Feature Title */}
                    <td className="p-5 md:p-6 text-xs md:text-sm font-bold text-brand-navy pl-6">
                      {row.feature}
                    </td>

                    {/* Certification Planner Value Column (Highlighted) */}
                    <td className="p-5 md:p-6 text-center bg-brand-navy/[0.04] border-x border-brand-navy/10 font-bold">
                      <div className="flex justify-center">
                        <div className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      </div>
                    </td>

                    {/* Self-Paced Column */}
                    <td className="p-5 md:p-6 text-center text-xs text-gray-500 font-semibold">
                      {row.self === true ? (
                        <div className="flex justify-center">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Check size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      ) : row.self === false ? (
                        <div className="flex justify-center">
                          <div className="h-6 w-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
                            <X size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-extrabold text-[10px] border border-amber-200/60">
                          {row.self}
                        </span>
                      )}
                    </td>

                    {/* Traditional Bootcamps Column */}
                    <td className="p-5 md:p-6 text-center text-xs text-gray-500 font-semibold pr-6">
                      {row.others === true ? (
                        <div className="flex justify-center">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Check size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      ) : row.others === false ? (
                        <div className="flex justify-center">
                          <div className="h-6 w-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
                            <X size={14} strokeWidth={2.5} />
                          </div>
                        </div>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 font-extrabold text-[10px] border border-gray-200">
                          {row.others}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        {/* Footer Helper */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-semibold">
          <ShieldAlert size={14} className="text-brand-orange" />
          <span>All competitor metrics are mapped from public course datasheets as of June 2026.</span>
        </div>

      </div>
    </section>
  );
}
