"use client";

import React from "react";
import Link from "next/link";

const defaultLogos = [
  { name: "PMP®", code: "PMP®", color: "bg-orange-50 text-brand-orange border-orange-200" },
  { name: "CISSP®", code: "CISSP®", color: "bg-blue-50 text-brand-navy border-blue-200" },
  { name: "AWS", code: "aws", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Microsoft Azure", code: "Azure", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { name: "CompTIA Security+", code: "Security+", color: "bg-red-50 text-red-700 border-red-200" },
  { name: "ITIL®", code: "ITIL®", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Salesforce", code: "salesforce", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { name: "CCNA®", code: "CCNA", color: "bg-slate-100 text-slate-800 border-slate-300" }
];

export default function PopularCertificationsLogos({ siteSettings = {} }) {
  const colors = [
    "bg-orange-50 text-brand-orange border-orange-200",
    "bg-blue-50 text-brand-navy border-blue-200",
    "bg-amber-50 text-amber-700 border-amber-200",
    "bg-cyan-50 text-cyan-700 border-cyan-200",
    "bg-red-50 text-red-700 border-red-200",
    "bg-purple-50 text-purple-700 border-purple-200",
    "bg-sky-50 text-sky-700 border-sky-200",
    "bg-slate-100 text-slate-800 border-slate-300"
  ];

  const displayLogos = siteSettings.popular_certs && siteSettings.popular_certs.length > 0
    ? siteSettings.popular_certs.map((item, idx) => ({
        code: item.code || item.name,
        image_url: item.image_url || "",
        color: colors[idx % colors.length]
      }))
    : defaultLogos;

  return (
    <section className="py-10 bg-slate-50/60 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-black text-brand-navy">
            {siteSettings.popular_certs_title ? (
              <span dangerouslySetInnerHTML={{ __html: siteSettings.popular_certs_title }} />
            ) : (
              <>Popular <span className="text-brand-blue">Certifications</span></>
            )}
          </h3>
          <Link href="/courses" className="text-xs font-bold text-brand-blue hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {displayLogos.map((cert, idx) => (
            <Link
              key={idx}
              href="/courses"
              className={`flex h-14 items-center justify-center rounded-2xl border font-black text-sm shadow-xs hover:shadow-md transition-all hover:scale-105 overflow-hidden p-2 bg-white ${cert.image_url ? 'border-gray-200' : cert.color}`}
            >
              {cert.image_url ? (
                <img
                  src={cert.image_url}
                  alt={cert.code || "Cert Logo"}
                  className="max-h-8 max-w-full object-contain"
                />
              ) : (
                <span>{cert.code}</span>
              )}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
