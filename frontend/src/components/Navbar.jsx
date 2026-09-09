"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, Phone } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState({
    support_phone: '(888) 745-7575',
    top_bar_badge: 'Guaranteed-to-Run Classes',
    top_bar_text: 'PMI Authorized Training Partner'
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    fetch(`${apiUrl}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data) setCategories(data.data);
      })
      .catch(err => console.error(err));

    fetch(`${apiUrl}/settings`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data) setSiteSettings(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-xs">
      {/* Top Announcement / Contact Bar (Visible on Desktop) */}
      <div className="hidden h-10 w-full bg-brand-navy px-6 text-xs text-white md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse"></span>
            {siteSettings.top_bar_badge || 'Guaranteed-to-Run Classes'}
          </span>
          <span className="text-gray-400">|</span>
          <span>{siteSettings.top_bar_text || 'PMI Authorized Training Partner'}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => openModal("Talk to an Advisor")}
            className="flex items-center gap-1 hover:text-brand-orange transition-colors cursor-pointer"
          >
            <Phone size={14} className="text-brand-orange" />
            {siteSettings.support_phone || '(888) 745-7575'}
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-xl shadow-md">
            CP
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-navy">
            Certification<span className="text-brand-orange">Planner</span>
          </span>
        </Link>

        {/* Desktop Navigation Links (WordPress-Style Dynamic Tree) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
          {(siteSettings.header_menu_items || [
            { title: "Certifications", url: "/courses" },
            { title: "Training Options", url: "/training" },
            { title: "Resources", url: "/resources" },
            { title: "Corporate Training", url: "/corporate-training" },
            { title: "About Us", url: "/about" }
          ]).map((item, idx) => (
            item.children && item.children.length > 0 ? (
              <div key={idx} className="group relative cursor-pointer py-2">
                <Link href={item.url || '#'} className="flex items-center gap-1 hover:text-brand-blue transition-colors font-bold">
                  {item.title} <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform" />
                </Link>
                <div className="invisible absolute top-full left-0 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 space-y-1">
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={cIdx}
                      href={child.url || '#'}
                      className="block rounded-lg p-2 text-xs font-bold text-gray-700 hover:bg-blue-50/70 hover:text-brand-blue transition-colors"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={idx} href={item.url || '#'} className="hover:text-brand-blue transition-colors py-2 font-bold">
                {item.title}
              </Link>
            )
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/courses" className="text-gray-500 hover:text-brand-blue p-2 rounded-full hover:bg-gray-50 transition-colors">
            <Search size={20} />
          </Link>
          <button
            onClick={() => openModal("Get a Free Consultation")}
            className="rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-opacity-90 shadow-sm transition-all hover:shadow-md cursor-pointer"
          >
            Get a Free Consultation
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button className="text-gray-500 p-2 hover:bg-gray-50 rounded-lg">
            <Search size={20} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Dynamic Tree) */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-6 shadow-lg">
          <div className="flex flex-col gap-3 text-base font-medium text-gray-800">
            {(siteSettings.header_menu_items || []).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <Link href={item.url || '#'} onClick={() => setIsOpen(false)} className="block hover:text-brand-blue p-2 font-bold rounded-md hover:bg-gray-50">
                  {item.title}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="pl-4 space-y-1 border-l-2 border-gray-100">
                    {item.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.url || '#'}
                        onClick={() => setIsOpen(false)}
                        className="block text-xs text-gray-600 hover:text-brand-blue p-1.5 rounded-md hover:bg-gray-50 font-medium"
                      >
                        ↳ {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openModal("Get a Free Consultation");
              }}
              className="mt-4 w-full text-center rounded-lg bg-brand-blue py-3 font-semibold text-white hover:bg-opacity-90 transition-colors cursor-pointer"
            >
              Get a Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
