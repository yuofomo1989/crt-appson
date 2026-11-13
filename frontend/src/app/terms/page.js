import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Terms of Use & Conditions | Certification Planner",
  description: "Read the terms that govern your access to and use of Certification Planner's website, training programs, and services.",
};

export default function TermsPage() {
  return <PolicyDetailLayout policy={policyData.terms} />;
}
