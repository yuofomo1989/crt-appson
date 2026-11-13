import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Legal Disclaimer & Trademark Notices | Certification Planner",
  description: "Official trademark acknowledgments and non-affiliation disclaimers for AXELOS, PMI, Scrum Alliance, IIBA, and others.",
};

export default function DisclaimerPage() {
  return <PolicyDetailLayout policy={policyData.disclaimer} />;
}
