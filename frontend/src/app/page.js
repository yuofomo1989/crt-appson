"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CareerPaths from "@/components/CareerPaths";
import PopularCertificationsLogos from "@/components/PopularCertificationsLogos";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import CorporateBanner from "@/components/CorporateBanner";
import UpcomingLiveClasses from "@/components/UpcomingLiveClasses";
import FaqSection from "@/components/FaqSection";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";

import initialCourses from "@/data/courses_db.json";
import initialCategories from "@/data/categories_db.json";
import initialSchedules from "@/data/schedules_db.json";
import initialSiteSettings from "@/data/site_settings_db.json";

export default function Home() {
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});
  const [categories, setCategories] = useState(initialCategories || []);
  const [courses, setCourses] = useState(initialCourses || []);
  const [schedules, setSchedules] = useState(initialSchedules || []);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
    
    Promise.all([
      fetch(`${apiUrl}/settings/`).then(r => r.json()).catch(() => fetch(`${apiUrl}/admin/settings/`).then(r => r.json())).catch(() => ({})),
      fetch(`${apiUrl}/categories/`).then(r => r.json()).catch(() => ({})),
      fetch(`${apiUrl}/courses/`).then(r => r.json()).catch(() => ({})),
      fetch(`${apiUrl}/schedules/`).then(r => r.json()).catch(() => ({}))
    ]).then(([stData, catData, cData, sData]) => {
      if (stData && stData.status === "success" && stData.data) setSiteSettings(stData.data);
      if (catData && catData.status === "success" && catData.data && catData.data.length > 0) setCategories(catData.data);
      if (cData && cData.status === "success" && cData.data && cData.data.length > 0) setCourses(cData.data);
      if (sData && sData.status === "success" && sData.data && sData.data.length > 0) setSchedules(sData.data);
    }).catch(() => {
      // Keep initial local database state if network or mixed content blocks fetch
    });
  }, []);

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden bg-[#f8fbfe]">
      {/* ── Ambient Background Layer Inspired by Hero Banner Wave Palette ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10">
        {/* Soft Ice Blue Flow from Hero */}
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-[#eaf4ff] via-[#f1f7fd] to-transparent" />
        
        {/* Subtle Warm Amber Glow (Matching Hero Orange Waves) */}
        <div className="absolute top-[550px] -right-[160px] w-[560px] h-[560px] rounded-full bg-gradient-to-br from-orange-200/25 via-amber-100/20 to-transparent blur-[140px]" />
        
        {/* Soft Blue Arc (Matching Hero Blue Waves) */}
        <div className="absolute top-[1250px] -left-[160px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-sky-200/25 via-blue-100/20 to-transparent blur-[150px]" />
        
        {/* Gentle Mid-Page Warm Glow */}
        <div className="absolute top-[2050px] right-[2%] w-[650px] h-[550px] rounded-full bg-gradient-to-bl from-orange-100/20 via-sky-50/20 to-transparent blur-[150px]" />
        
        {/* Soft Sky Blue Glow towards Bottom */}
        <div className="absolute top-[2900px] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-100/25 via-sky-50/20 to-transparent blur-[150px]" />
      </div>

      <Navbar siteSettings={siteSettings} categories={categories} />
      <main className="relative z-10">
        {/* Section 1: Hero */}
        <Hero siteSettings={siteSettings} />
        
        {/* Stats Strip under Hero */}
        <TrustBadges siteSettings={siteSettings} />

        {/* Section 2: Choose Your Career Path */}
        <CareerPaths categories={categories} courses={courses} />

        {/* Section 3: Popular Certifications Vendor Strip */}
        <PopularCertificationsLogos siteSettings={siteSettings} />

        {/* Section 4: Real Stories. Real Success. */}
        <Testimonials siteSettings={siteSettings} />

        {/* Section 5: Why Choose Certification Planner? */}
        <WhyChooseUs siteSettings={siteSettings} />

        {/* Section 6: Corporate Training Solutions */}
        <CorporateBanner siteSettings={siteSettings} />

        {/* Section 7: Upcoming Live Classes */}
        <UpcomingLiveClasses schedules={schedules} courses={courses} />

        {/* Section 8: Frequently Asked Questions (FAQ) */}
        <FaqSection siteSettings={siteSettings} />

        {/* Section 9: Ready to Advance Your Career CTA */}
        <PreFooter siteSettings={siteSettings} />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
