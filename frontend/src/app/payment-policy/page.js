import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Payment & Billing Policy | Certification Planner",
  description: "Learn about accepted payment methods, corporate billing, pricing, and transaction security.",
};

export default function PaymentPolicyPage() {
  return <PolicyDetailLayout policy={policyData["payment-policy"]} />;
}
