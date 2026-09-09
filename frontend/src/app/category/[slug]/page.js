import React from "react";
import CategoryClientPage from "./CategoryClientPage";

export const dynamicParams = true;

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "project-management";
  return <CategoryClientPage slug={slug} />;
}
