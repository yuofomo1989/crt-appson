"use client";

import React, { useState, useEffect } from "react";
import CourseDetailsClient from "@/components/CourseDetailsClient";

import initialCourses from "@/data/courses_db.json";
import initialSchedules from "@/data/schedules_db.json";

export default function CourseDetailsWrapper({ slug }) {
  // Find course from pre-exported database immediately
  const preloadedCourse = (initialCourses || []).find(
    c => (c.slug || c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug ||
         (slug === "pmp-certification" && (c.slug === "pmp-certification-training" || c.title.includes("PMP")))
  ) || initialCourses?.[0] || null;

  const [course, setCourse] = useState(preloadedCourse);
  const [schedules, setSchedules] = useState(initialSchedules || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourseData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const [cRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/courses`),
          fetch(`${apiUrl}/schedules`)
        ]);
        const cData = await cRes.json();
        const sData = await sRes.json();

        let allCourses = [];
        if (cData.status === "success" && cData.data && cData.data.length > 0) {
          allCourses = cData.data;
          const foundCourse = allCourses.find(
            c => (c.slug || c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug ||
                 (slug === "pmp-certification" && (c.slug === "pmp-certification-training" || c.title.includes("PMP")))
          ) || allCourses[0];
          setCourse(foundCourse);
        }

        if (sData.status === "success" && sData.data && sData.data.length > 0) {
          setSchedules(sData.data);
        }
      } catch (err) {
        // Safe fallback already pre-loaded from database JSON!
      }
    }
    fetchCourseData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Loading Course Details...</p>
        </div>
      </div>
    );
  }

  return <CourseDetailsClient course={course} schedules={schedules} />;
}
