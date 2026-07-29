"use client";

import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

const popularCerts = [
  { name: "Agile & Project Management", href: "/courses/agile-project-management" },
  { name: "PMP® Certification", href: "/courses/pmp-certification" },
  { name: "CAPM® Certification", href: "/courses/capm-certification" },
  { name: "CISSP® Exam Prep", href: "/courses/cissp-certification" },
  { name: "AWS Solutions Architect", href: "/courses/aws-solutions-architect" },
];

const trainingOptions = [
  { name: "Live Online Classroom", href: "/training#live" },
  { name: "In-Person Classroom", href: "/training#in-person" },
  { name: "Self-Paced Learning", href: "/training#self-paced" },
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

export default function Footer() {
  return (
    <footer className="bg-[#050E17] text-gray-400 text-xs md:text-sm border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-base shadow-md">
                CP
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Certification<span className="text-brand-orange">Planner</span>
              </span>
            </div>
            <p className="text-[11px] leading-relaxed max-w-xs">
              Vetted training programs designed to help you pass your certifications on the first try. Voted #1 global training partner by enterprise groups.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Custom SVG Social Icons */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>

            {/* Student Login Button */}
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange/10 border border-brand-orange/30 px-4 py-2.5 text-[11px] font-black text-brand-orange hover:bg-brand-orange hover:text-white transition-all"
              >
                <LogIn size={13} />
                Student Login
              </Link>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Certifications</h4>
            <ul className="space-y-2 text-[11px] font-medium">
              {popularCerts.map((c, idx) => (
                <li key={idx}>
                  <Link href={c.href} className="hover:text-white transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Formats */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Training Options</h4>
            <ul className="space-y-2 text-[11px] font-medium">
              {trainingOptions.map((t, idx) => (
                <li key={idx}>
                  <Link href={t.href} className="hover:text-white transition-colors">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Support & Legal</h4>
            <ul className="space-y-2 text-[11px] font-medium">
              {resources.map((r, idx) => (
                <li key={idx}>
                  <Link href={r.href} className="hover:text-white transition-colors">{r.name}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Legal Fine Print & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center space-y-4 text-[10px] text-gray-500 font-medium">
          <p className="max-w-4xl mx-auto leading-relaxed">
            Disclaimer: PMI, PMP, CAPM, and PMI-ACP are registered marks of the Project Management Institute, Inc. ITIL is a registered trademark of AXELOS Limited. AWS is a trademark of Amazon.com, Inc. or its affiliates. All other trademarks are the property of their respective owners.
          </p>
          <p>© {new Date().getFullYear()} Certification Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
