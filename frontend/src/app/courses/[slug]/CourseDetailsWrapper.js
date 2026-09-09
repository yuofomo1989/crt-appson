"use client";

import React, { useState, useEffect } from "react";
import CourseDetailsClient from "@/components/CourseDetailsClient";

export default function CourseDetailsWrapper({ slug }) {
  const [course, setCourse] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (cData.status === "success" && cData.data) {
          allCourses = cData.data;
        }

        const foundCourse = allCourses.find(
          c => (c.slug || c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) === slug
        ) || allCourses[0];

        if (sData.status === "success" && sData.data) {
          setSchedules(sData.data);
        }

        setCourse(foundCourse);
      } catch (err) {
        console.error("Error fetching dynamic course:", err);
      } finally {
        setLoading(false);
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
