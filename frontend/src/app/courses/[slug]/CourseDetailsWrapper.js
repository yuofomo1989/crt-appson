"use client";

import React, { useState, useEffect } from "react";
import CourseDetailsClient from "@/components/CourseDetailsClient";

import initialCourses from "@/data/courses_db.json";
import initialSchedules from "@/data/schedules_db.json";

function findCourseBySlug(list, targetSlug) {
  if (!list || list.length === 0) return null;
  if (!targetSlug) return list[0];
  const s = targetSlug.toLowerCase().trim();

  // 1. Exact match on slug
  let found = list.find(c => c.slug && c.slug.toLowerCase() === s);
  if (found) return found;

  // 2. Exact match on normalized title
  found = list.find(c => c.title && c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === s);
  if (found) return found;

  // 3. Normalized alias matching (e.g. "pmp-certification" -> "pmp-certification-training")
  const cleanWord = s.replace(/(-certification|-training|-prep|-exam)/gi, "").replace(/[^a-z0-9]/g, "");
  if (cleanWord.length >= 3) {
    found = list.find(c => {
      const cSlug = (c.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      const cTitle = (c.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return cSlug.includes(cleanWord) || cTitle.includes(cleanWord);
    });
    if (found) return found;
  }

  return list[0];
}

export default function CourseDetailsWrapper({ slug }) {
  const preloadedCourse = findCourseBySlug(initialCourses, slug);

  const [course, setCourse] = useState(preloadedCourse);
  const [schedules, setSchedules] = useState(initialSchedules || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourseData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [cRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/courses`),
          fetch(`${apiUrl}/schedules`)
        ]);
        const cData = await cRes.json();
        const sData = await sRes.json();

        if (cData.status === "success" && Array.isArray(cData.data) && cData.data.length > 0) {
          const matched = findCourseBySlug(cData.data, slug);
          if (matched) setCourse(matched);
        }

        if (sData.status === "success" && Array.isArray(sData.data)) {
          setSchedules(sData.data);
        }
      } catch (err) {
        // Safe fallback already preloaded
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
