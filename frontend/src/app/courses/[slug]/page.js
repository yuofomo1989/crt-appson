import React from "react";
import CourseDetailsWrapper from "./CourseDetailsWrapper";

export const dynamicParams = true;

export default async function CourseDetails({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "pmp-certification";
  
  return <CourseDetailsWrapper slug={slug} />;
}
