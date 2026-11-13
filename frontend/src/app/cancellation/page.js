import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Cancellation & Reschedule Policy | Certification Planner",
  description: "Review our cancellation and rescheduling terms for training sessions, bootcamps, and certification exams.",
};

export default function CancellationPage() {
  return <PolicyDetailLayout policy={policyData.cancellation} />;
}
