import React from "react";
import PolicyDetailLayout from "@/components/PolicyDetailLayout";
import policyData from "@/data/policy_pages_content.json";

export const metadata = {
  title: "Account & Profile Policy | Certification Planner",
  description: "Understand your responsibilities for account security, credential protection, and account deletion.",
};

export default function AccountPolicyPage() {
  return <PolicyDetailLayout policy={policyData["account-policy"]} />;
}
