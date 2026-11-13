import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Privacy Policy | Certification Planner",
  description: "Learn how Certification Planner collects, protects, uses, and manages your personal data and privacy rights.",
};

export default function PrivacyPage() {
  return <PolicyDetailLayout policy={policyData.privacy} />;
}
