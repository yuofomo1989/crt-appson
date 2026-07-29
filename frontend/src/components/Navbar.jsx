"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, Phone } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-xs">
      {/* Top Announcement / Contact Bar (Visible on Desktop) */}
      <div className="hidden h-10 w-full bg-brand-navy px-6 text-xs text-white md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse"></span>
            Guaranteed-to-Run Classes
          </span>
          <span className="text-gray-400">|</span>
          <span>PMI Authorized Training Partner</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => openModal("Talk to an Advisor")}
            className="flex items-center gap-1 hover:text-brand-orange transition-colors cursor-pointer"
          >
            <Phone size={14} className="text-brand-orange" />
            (888) 745-7575
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
          <div className="group relative cursor-pointer py-2">
            <Link href="/courses" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              Certifications <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="invisible absolute top-full left-0 w-64 rounded-lg border border-gray-100 bg-white p-2 shadow-lg group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Link href="/courses/agile-project-management" className="block rounded-md p-2 font-semibold hover:bg-gray-50 hover:text-brand-blue">Agile &amp; Project Management</Link>
              <div className="border-t border-gray-50 my-1"></div>
              <Link href="/courses/pmp-certification" className="block rounded-md p-2 text-xs hover:bg-gray-50 hover:text-brand-blue">PMP® Certification</Link>
              <Link href="/courses/cissp-certification" className="block rounded-md p-2 text-xs hover:bg-gray-50 hover:text-brand-blue">CISSP® Security</Link>
              <Link href="/courses/aws-solutions-architect" className="block rounded-md p-2 text-xs hover:bg-gray-50 hover:text-brand-blue">AWS® Cloud</Link>
              <div className="border-t border-gray-50 my-1 pt-1"></div>
              <Link href="/courses" className="block rounded-md p-2 text-brand-blue font-bold text-xs hover:bg-gray-50">View All Certifications →</Link>
            </div>
          </div>

          <div className="group relative cursor-pointer py-2">
            <Link href="/training" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              Training Options <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="invisible absolute top-full left-0 w-52 rounded-lg border border-gray-100 bg-white p-2 shadow-lg group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Link href="/training#live" className="block rounded-md p-2 text-xs hover:bg-gray-50 hover:text-brand-blue">Live Online Classroom</Link>
              <Link href="/training#in-person" className="block rounded-md p-2 text-xs hover:bg-gray-50 hover:text-brand-blue">In-Person Classroom</Link>
              <Link href="/training#self-paced" className="block rounded-md p-2 text-xs hover:bg-gray-50 hover:text-brand-blue">Self-Paced E-Learning</Link>
              <Link href="/corporate-training" className="block rounded-md p-2 text-xs font-bold hover:bg-gray-50 text-brand-blue">Corporate Group Training</Link>
            </div>
          </div>

          <div className="group relative cursor-pointer py-2">
            <Link href="/resources" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              Resources <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="invisible absolute top-full left-0 w-56 rounded-lg border border-gray-100 bg-white p-2 shadow-lg group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Link href="/resources" className="block rounded-md p-2 hover:bg-gray-50 hover:text-brand-blue text-sm">All Articles</Link>
              <div className="border-t border-gray-50 my-1" />
              <Link href="/resources/agile-project-management" className="block rounded-md p-2 hover:bg-gray-50 hover:text-brand-blue text-sm">Agile &amp; Project Management</Link>
              <Link href="/resources" className="block rounded-md p-2 hover:bg-gray-50 hover:text-brand-blue text-sm">DevOps &amp; Salesforce</Link>
              <Link href="/resources" className="block rounded-md p-2 hover:bg-gray-50 hover:text-brand-blue text-sm">Information Security</Link>
              <Link href="/resources" className="block rounded-md p-2 hover:bg-gray-50 hover:text-brand-blue text-sm">IT Service &amp; Architecture</Link>
              <Link href="/resources" className="block rounded-md p-2 hover:bg-gray-50 hover:text-brand-blue text-sm">Lean &amp; Six Sigma</Link>
            </div>
          </div>

          <Link href="/corporate-training" className="hover:text-brand-blue transition-colors py-2">
            Corporate Training
          </Link>
          <div className="group relative cursor-pointer py-2">
            <Link href="/about" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              About Us <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="invisible absolute top-full left-0 w-48 rounded-lg border border-gray-100 bg-white p-2 shadow-lg group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Link href="/about" className="block rounded-md p-2 text-sm hover:bg-gray-50 hover:text-brand-blue">About Us</Link>
              <Link href="/contact" className="block rounded-md p-2 text-sm hover:bg-gray-50 hover:text-brand-blue">Contact Us</Link>
              <div className="border-t border-gray-50 my-1" />
              <Link href="/policies" className="block rounded-md p-2 text-sm hover:bg-gray-50 hover:text-brand-blue">Our Policies</Link>
            </div>
          </div>
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

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-6 shadow-lg">
          <div className="flex flex-col gap-4 text-base font-medium text-gray-800">
            <Link href="/courses" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">Certifications</Link>
            <Link href="/training" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">Training Options</Link>
            <Link href="/resources" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">Resources</Link>
            <Link href="/corporate-training" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">Corporate Training</Link>
            <Link href="/about" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">About Us</Link>
            <Link href="/contact" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">Contact Us</Link>
            <Link href="/policies" className="hover:text-brand-blue p-2 rounded-md hover:bg-gray-50">Our Policies</Link>
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
