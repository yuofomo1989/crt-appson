"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

const popularCerts = [
  { name: "Agile & Project Management", href: "/category/agile-project-management" },
  { name: "PMP® Certification", href: "/courses/pmp-certification" },
  { name: "CAPM® Certification", href: "/courses/capm-certification" },
  { name: "CISSP® Exam Prep", href: "/courses/cissp-certification" },
  { name: "AWS Solutions Architect", href: "/courses/aws-solutions-architect" },
];

const trainingOptions = [
  { name: "Live Online Classroom", href: "/enroll" },
  { name: "In-Person Classroom", href: "/enroll" },
  { name: "Self-Paced Learning", href: "/enroll" },
  { name: "Corporate Group Training", href: "/corporate-training" },
];

const resources = [
  { name: "Our Policies", href: "/policies" },
  { name: "About Us", href: "/about" },
  { name: "Contact Support", href: "/contact" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Refund Policy", href: "/refunds" },
];

export default function Footer({ siteSettings: propSettings } = {}) {
  const [siteSettings, setSiteSettings] = useState({
    footer_text: 'Certification Planner is a leading North American professional training provider offering guaranteed bootcamps.',
    footer_copyright: '© 2026 Certification Planner LLC. All rights reserved.',
    ...(propSettings || {})
  });

  useEffect(() => {
    if (propSettings && Object.keys(propSettings).length > 0) {
      setSiteSettings(prev => ({ ...prev, ...propSettings }));
    }
  }, [propSettings]);

  useEffect(() => {
    if (!propSettings || Object.keys(propSettings).length === 0) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      fetch(`${apiUrl}/settings/`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) setSiteSettings(data.data);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <footer className="bg-[#050E17] text-gray-400 text-xs md:text-sm border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          
          {/* Brand Info (2 Cols) */}
          <div className="col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              {(siteSettings?.use_custom_footer_logo && siteSettings?.footer_logo_url) ? (
                <img
                  src={siteSettings.footer_logo_url}
                  alt={siteSettings.logo_alt || "Certification Planner"}
                  style={{ height: `${siteSettings.footer_logo_height || 36}px`, width: "auto" }}
                  className="object-contain max-w-[200px]"
                />
              ) : siteSettings?.logo_url ? (
                <img
                  src={siteSettings.logo_url}
                  alt={siteSettings.logo_alt || "Certification Planner"}
                  style={{ height: `${siteSettings.footer_logo_height || siteSettings.logo_height || 36}px`, width: "auto" }}
                  className="object-contain max-w-[200px]"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-base shadow-md">
                  CP
                </div>
              )}
              {(siteSettings?.show_logo_text !== false && (!siteSettings?.logo_url && !siteSettings?.footer_logo_url || siteSettings?.show_logo_text === true)) && (
                <span className="text-lg font-bold tracking-tight text-white">
                  {siteSettings?.site_title_prefix || "Certification"}<span className="text-brand-orange">{siteSettings?.site_title_suffix || "Planner"}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] leading-relaxed max-w-xs">
              {siteSettings.footer_text || 'Certification Planner is a leading North American professional training provider offering guaranteed bootcamps.'}
            </p>

            {/* Phone & Email (Matches Reference Footer) */}
            <div className="space-y-1.5 pt-1 text-[11px] font-semibold text-gray-300">
              <p className="flex items-center gap-2">
                <span className="text-brand-orange">📞</span>
                <a href={`tel:${(siteSettings.support_phone || '(888) 745-7575').replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {siteSettings.support_phone || "(888) 745-7575"}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-orange">✉️</span>
                <a href={`mailto:${siteSettings.support_email || 'support@certificationplanner.com'}`} className="hover:text-white transition-colors">
                  {siteSettings.support_email || "support@certificationplanner.com"}
                </a>
              </p>
            </div>

            {/* Login & Admin Links */}
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange/10 border border-brand-orange/30 px-3.5 py-2 text-[11px] font-black text-brand-orange hover:bg-brand-orange hover:text-white transition-all"
              >
                <LogIn size={13} />
                Student Login
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/30 px-3.5 py-2 text-[11px] font-black text-brand-blue hover:bg-brand-blue hover:text-white transition-all"
              >
                🔐 Admin Portal
              </Link>
            </div>
          </div>

          {/* Dynamic Footer Link Columns (3 Cols) */}
          {(siteSettings.footer_columns && siteSettings.footer_columns.length > 0) ? (
            siteSettings.footer_columns.slice(0, 3).map((col, idx) => (
              <div key={idx} className="space-y-4 text-left">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2 text-[11px] font-medium">
                  {(col.links || []).map((l, lIdx) => (
                    <li key={lIdx}>
                      <Link href={l.href || '#'} className="hover:text-white transition-colors">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>
              <div className="space-y-4 text-left">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Certifications</h4>
                <ul className="space-y-2 text-[11px] font-medium">
                  {popularCerts.map((c, idx) => (
                    <li key={idx}>
                      <Link href={c.href} className="hover:text-white transition-colors">{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-left">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Training Options</h4>
                <ul className="space-y-2 text-[11px] font-medium">
                  {trainingOptions.map((t, idx) => (
                    <li key={idx}>
                      <Link href={t.href} className="hover:text-white transition-colors">{t.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 col-span-2 md:col-span-1 text-left">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Support &amp; Legal</h4>
                <ul className="space-y-2 text-[11px] font-medium">
                  {resources.map((r, idx) => (
                    <li key={idx}>
                      <Link href={r.href} className="hover:text-white transition-colors">{r.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Right Column: Trustpilot Widget Card (Matches Reference Image 1) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-start">
            <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2.5 text-left">
              <div className="flex items-center gap-1.5 font-extrabold text-white text-xs">
                <span className="text-[#00B67A] text-sm">★</span>
                <span>Trustpilot</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="flex h-4.5 w-4.5 items-center justify-center rounded-xs bg-[#00B67A] text-white text-[10px] font-bold">
                    ★
                  </span>
                ))}
              </div>
              <div>
                <p className="text-white font-black text-xs">4.8 out of 5</p>
                <p className="text-[10px] text-gray-400 font-medium">Based on 1,500+ reviews</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Legal Fine Print & Copyright */}
        <div className="mt-7 pt-5 border-t border-white/5 space-y-3 text-[10px] text-gray-500 font-medium">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>{siteSettings.footer_copyright || `© ${new Date().getFullYear()} Certification Planner LLC. All rights reserved.`}</p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>
          <p className="max-w-5xl leading-relaxed text-left">
            PMI®, PMP®, CAPM®, and PMI-ACP® are registered marks of the Project Management Institute, Inc. ITIL® is a registered trademark of AXELOS Limited. CISSP® is a registered mark of (ISC)². CISA® is a registered trademark of ISACA. Salesforce is a trademark of salesforce.com, inc. All other trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
