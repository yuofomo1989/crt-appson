import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Intellectual Property Policy | Certification Planner",
  description: "Learn how we protect our course materials, content, trademarks, and how you may use our educational resources.",
};

export default function IpPolicyPage() {
  return <PolicyDetailLayout policy={policyData["ip-policy"]} />;
}
