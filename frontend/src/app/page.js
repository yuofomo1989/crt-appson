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

export default function Home() {
  const [siteSettings, setSiteSettings] = useState({});
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    
    Promise.all([
      fetch(`${apiUrl}/admin/settings`).then(r => r.json()).catch(() => ({})),
      fetch(`${apiUrl}/categories`).then(r => r.json()).catch(() => ({})),
      fetch(`${apiUrl}/courses`).then(r => r.json()).catch(() => ({})),
      fetch(`${apiUrl}/schedules`).then(r => r.json()).catch(() => ({}))
    ]).then(([stData, catData, cData, sData]) => {
      if (stData.status === "success" && stData.data) setSiteSettings(stData.data);
      if (catData.status === "success" && catData.data) setCategories(catData.data);
      if (cData.status === "success" && cData.data) setCourses(cData.data);
      if (sData.status === "success" && sData.data) setSchedules(sData.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
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
      <Footer />
    </div>
  );
}
