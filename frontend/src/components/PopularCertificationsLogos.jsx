"use client";

import React from "react";
import Link from "next/link";

const defaultLogos = [
  { name: "PMP®", code: "PMP®", color: "bg-orange-50/70 text-brand-orange border-orange-200" },
  { name: "CAPM®", code: "CAPM®", color: "bg-blue-50/70 text-brand-blue border-blue-200" },
  { name: "PMI-ACP®", code: "PMI-ACP®", color: "bg-amber-50/70 text-amber-700 border-amber-200" },
  { name: "Lean Six Sigma", code: "Lean Six Sigma", color: "bg-emerald-50/70 text-emerald-700 border-emerald-200" },
  { name: "CISSP®", code: "CISSP®", color: "bg-red-50/70 text-red-700 border-red-200" },
  { name: "CISA®", code: "CISA®", color: "bg-purple-50/70 text-purple-700 border-purple-200" },
  { name: "ITIL® 4", code: "ITIL® 4", color: "bg-indigo-50/70 text-indigo-700 border-indigo-200" },
  { name: "Salesforce", code: "Salesforce", color: "bg-sky-50/70 text-sky-700 border-sky-200" }
];

export default function PopularCertificationsLogos({ siteSettings = {} }) {
  const colors = [
    "bg-orange-50/70 text-brand-orange border-orange-200",
    "bg-blue-50/70 text-brand-blue border-blue-200",
    "bg-amber-50/70 text-amber-700 border-amber-200",
    "bg-emerald-50/70 text-emerald-700 border-emerald-200",
    "bg-red-50/70 text-red-700 border-red-200",
    "bg-purple-50/70 text-purple-700 border-purple-200",
    "bg-indigo-50/70 text-indigo-700 border-indigo-200",
    "bg-sky-50/70 text-sky-700 border-sky-200"
  ];

  const displayLogos = siteSettings.popular_certs && siteSettings.popular_certs.length > 0
    ? siteSettings.popular_certs.map((item, idx) => ({
        code: item.code || item.name,
        image_url: item.image_url || "",
        color: colors[idx % colors.length]
      }))
    : defaultLogos;

  return (
    <section className="py-4 bg-white/60 backdrop-blur-xs border-y border-blue-100/40">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3.5">
          <h3 className="text-xl md:text-2xl font-black text-brand-navy">
            {siteSettings.popular_certs_title ? (
              <span dangerouslySetInnerHTML={{ __html: siteSettings.popular_certs_title }} />
            ) : (
              <>Popular <span className="text-brand-blue">Certifications</span></>
            )}
          </h3>
          <Link href="/certifications" className="text-xs font-bold text-brand-blue hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {displayLogos.map((cert, idx) => (
            <Link
              key={idx}
              href="/certifications"
              className={`flex h-14 items-center justify-center rounded-2xl border font-black text-sm shadow-xs hover:shadow-md transition-all hover:scale-105 overflow-hidden p-2 bg-white ${cert.color}`}
            >
              <span>{cert.code}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
