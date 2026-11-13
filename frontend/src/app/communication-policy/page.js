import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Communication & Notification Policy | Certification Planner",
  description: "Learn how Certification Planner communicates with candidates and corporate partners regarding course updates and notices.",
};

export default function CommunicationPolicyPage() {
  return <PolicyDetailLayout policy={policyData["communication-policy"]} />;
}
