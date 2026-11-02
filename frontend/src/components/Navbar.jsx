"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, Phone, User, ShoppingCart } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

const DEFAULT_HEADER_MENU_ITEMS = [
  {
    id: 1786637378095,
    title: "Certifications",
    url: "/certifications",
    children: [
      { title: "⚡ View All Certifications", url: "/certifications" },
      { title: "Agile & Project Management", url: "/category/agile-project-management" },
      { title: "Information Security", url: "/category/information-security-certification" },
      { title: "Lean and Six Sigma", url: "/category/lean-six-sigma-certification" },
      { title: "DevOps & Salesforce", url: "/category/devops-and-sf-certification" },
      { title: "IT Service & Architecture", url: "/category/itil-certification" }
    ]
  },
  {
    id: 1788363268461,
    title: "Resources",
    url: "/resources",
    children: []
  },
  {
    id: 1793288436473,
    title: "Corporate Training",
    url: "/corporate-training",
    children: []
  },
  {
    id: 1793288446144,
    title: "About Us",
    url: "/about",
    children: []
  },
  {
    id: 1793288453791,
    title: "Contact Us",
    url: "/contact",
    children: []
  }
];

export default function Navbar({ siteSettings: propSettings, categories: propCategories } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(propCategories || []);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const [siteSettings, setSiteSettings] = useState({
    support_phone: '(888) 745-7575',
    top_bar_badge: 'Guaranteed-to-Run Classes',
    top_bar_text: 'PMI Authorized Training Partner',
    header_menu_items: DEFAULT_HEADER_MENU_ITEMS,
    ...(propSettings || {})
  });

  // Check login & cart state
  useEffect(() => {
    const updateCartAndUser = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("cp_auth_token");
        const name = localStorage.getItem("cp_user_name");
        const role = localStorage.getItem("cp_user_role");
        if (token) {
          setLoggedInUser({
            name: name || "User",
            role: role || "student"
          });
        } else {
          setLoggedInUser(null);
        }

        try {
          const cart = JSON.parse(localStorage.getItem("cp_cart") || "null");
          if (cart && (cart.course || cart.title)) {
            setCartCount(1);
          } else if (Array.isArray(cart) && cart.length > 0) {
            setCartCount(cart.length);
          } else {
            setCartCount(0);
          }
        } catch (e) {
          setCartCount(0);
        }
      }
    };

    updateCartAndUser();
    window.addEventListener("cartUpdated", updateCartAndUser);
    window.addEventListener("storage", updateCartAndUser);
    return () => {
      window.removeEventListener("cartUpdated", updateCartAndUser);
      window.removeEventListener("storage", updateCartAndUser);
    };
  }, []);

  useEffect(() => {
    if (propSettings && Object.keys(propSettings).length > 0) {
      const items = Array.isArray(propSettings.header_menu_items) && propSettings.header_menu_items.length > 0
        ? propSettings.header_menu_items
        : DEFAULT_HEADER_MENU_ITEMS;
      setSiteSettings(prev => ({ ...prev, ...propSettings, header_menu_items: items }));
    }
  }, [propSettings]);

  useEffect(() => {
    if (Array.isArray(propCategories) && propCategories.length > 0) {
      setCategories(propCategories);
    }
  }, [propCategories]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    if (!propCategories || propCategories.length === 0) {
      fetch(`${apiUrl}/categories/`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) setCategories(data.data);
        })
        .catch(err => console.log('Categories load note:', err));
    }

    if (!propSettings || Object.keys(propSettings).length === 0) {
      fetch(`${apiUrl}/settings/`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            const serverItems = Array.isArray(data.data.header_menu_items) && data.data.header_menu_items.length > 0
              ? data.data.header_menu_items
              : DEFAULT_HEADER_MENU_ITEMS;

            setSiteSettings(prev => ({
              ...prev,
              ...data.data,
              header_menu_items: serverItems
            }));
          }
        })
        .catch(err => console.log('Settings load note:', err));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-xs">
      {/* Top Announcement / Contact Bar (Visible on Desktop) */}
      <div className="hidden h-10 w-full bg-brand-navy text-xs text-white md:flex items-center justify-between" style={{ paddingLeft: 'clamp(1rem, 3.5vw, 3.5rem)', paddingRight: 'clamp(1rem, 3.5vw, 3.5rem)' }}>
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
        <Link href="/" className="flex items-center gap-2.5">
          {siteSettings?.logo_url ? (
            <img
              src={siteSettings.logo_url}
              alt={siteSettings.logo_alt || "Certification Planner"}
              style={{ height: `${siteSettings.logo_height || 40}px`, width: "auto" }}
              className="object-contain max-w-[240px]"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-xl shadow-md">
              CP
            </div>
          )}
          {(siteSettings?.show_logo_text !== false && (!siteSettings?.logo_url || siteSettings?.show_logo_text === true)) && (
            <span className="text-xl font-bold tracking-tight text-brand-navy">
              {siteSettings?.site_title_prefix || "Certification"}<span className="text-brand-orange">{siteSettings?.site_title_suffix || "Planner"}</span>
            </span>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
          {(siteSettings.header_menu_items && siteSettings.header_menu_items.length > 0 ? siteSettings.header_menu_items : DEFAULT_HEADER_MENU_ITEMS).map((item, idx) => (
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

        {/* Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search */}
          <Link
            href="/courses"
            className="text-gray-500 hover:text-brand-blue p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Search Certifications"
          >
            <Search size={20} />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart/"
            className="relative text-gray-600 hover:text-brand-blue p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
            title="Cart & Enrollment"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Login / Account Button */}
          {loggedInUser ? (
            <Link
              href={loggedInUser.role === "admin" || loggedInUser.role === "super admin" ? "/admin" : "/profile"}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
              title={loggedInUser.role === "admin" || loggedInUser.role === "super admin" ? "Admin Console" : "My Account"}
            >
              <User size={16} className="text-brand-blue" />
              <span className="max-w-[85px] truncate font-bold">
                {loggedInUser.name.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-gray-700 hover:text-brand-blue px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-xs font-bold"
              title="Student & Enterprise Login"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
          )}

          {/* Consultation CTA */}
          <button
            onClick={() => openModal("Get a Free Consultation")}
            className="rounded-xl bg-brand-blue px-5 py-2.5 text-xs font-bold text-white hover:bg-opacity-90 shadow-sm transition-all hover:shadow-md cursor-pointer ml-1"
          >
            Get a Free Consultation
          </button>
        </div>

        {/* Mobile Action Icons + Drawer Toggle */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <Link
            href="/courses"
            className="text-gray-600 p-2 hover:bg-gray-50 rounded-lg"
            title="Search"
          >
            <Search size={20} />
          </Link>

          <Link
            href="/cart/"
            className="relative text-gray-600 p-2 hover:bg-gray-50 rounded-lg"
            title="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-brand-orange text-white text-[9px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href={loggedInUser ? (loggedInUser.role === "admin" ? "/admin" : "/profile") : "/login"}
            className="text-gray-600 p-2 hover:bg-gray-50 rounded-lg"
            title="Login"
          >
            <User size={20} />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 p-2 hover:bg-gray-50 rounded-lg ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Dynamic Tree) */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-6 shadow-lg">
          <div className="flex flex-col gap-3 text-base font-medium text-gray-800">
            {(siteSettings.header_menu_items && siteSettings.header_menu_items.length > 0 ? siteSettings.header_menu_items : DEFAULT_HEADER_MENU_ITEMS).map((item, idx) => (
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

            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-center text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
              >
                <User size={16} />
                <span>{loggedInUser ? "My Account" : "Login"}</span>
              </Link>
              <Link
                href="/cart/"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-center text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
              >
                <ShoppingCart size={16} />
                <span>Cart</span>
              </Link>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                openModal("Get a Free Consultation");
              }}
              className="mt-2 w-full text-center rounded-xl bg-brand-blue py-3 text-xs font-bold text-white hover:bg-opacity-90 transition-colors cursor-pointer shadow-md"
            >
              Get a Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
