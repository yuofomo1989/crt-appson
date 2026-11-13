import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Refund Policy | Certification Planner",
  description: "Understand our refund eligibility, request process, and timelines for courses and certification products.",
};

export default function RefundsPage() {
  return <PolicyDetailLayout policy={policyData.refund} />;
}
