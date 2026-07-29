import React from "react";
import CourseDetailsClient from "@/components/CourseDetailsClient";

const coursesData = {
  "pmp-certification": {
    title: "Become a PMP® Certified Project Leader",
    tagline: "Live instructor-led PMP® training with exam prep, mock tests, and career support.",
    category: "Agile & Project Management",
    rating: 4.8,
    reviews: "1,500+",
    hours: "35 Contact Hours",
    price: 1095,
    originalPrice: 1495,
    seatsLeft: 12,
    curriculum: [
      { title: "Module 1: People", lessons: ["Project team management", "Conflict resolution", "Leadership models", "Empowering team members"], hours: "3.5 Hours" },
      { title: "Module 2: Process", lessons: ["Risk management plans", "Scope & schedule baselines", "Quality standards", "Procurement & integration"], hours: "3.5 Hours" },
      { title: "Module 3: Business Environment", lessons: ["Organizational compliance", "Business value delivery", "Change management strategies", "Continuous improvement"], hours: "2.5 Hours" },
      { title: "Module 4: Practice Exams & Reviews", lessons: ["Full-length mock test review", "Exam application guidance", "Tricky questions analysis"], hours: "5 Hours" },
    ],
  },
  "cissp-certification": {
    title: "Master Cybersecurity with CISSP® Prep",
    tagline: "Vetted training covering all 8 CBK domains of cybersecurity leadership.",
    category: "Cybersecurity",
    rating: 4.9,
    reviews: "980+",
    hours: "40 Hours",
    price: 1895,
    originalPrice: 2295,
    seatsLeft: 8,
    curriculum: [
      { title: "Module 1: Security & Risk Management", lessons: ["Security governance principles", "Compliance requirements", "Risk management concepts"], hours: "4 Hours" },
      { title: "Module 2: Asset Security", lessons: ["Information and asset classification", "Privacy protection", "Data lifecycles"], hours: "3 Hours" },
      { title: "Module 3: Security Architecture & Engineering", lessons: ["Secure engineering processes", "Cryptographic systems", "Physical security guards"], hours: "5 Hours" },
      { title: "Module 4: Communication & Network Security", lessons: ["Secure network channels", "Network architectures", "Transmission media protection"], hours: "4 Hours" },
    ],
  },
  "aws-solutions-architect": {
    title: "AWS Certified Solutions Architect Associate",
    tagline: "Master cloud computing architectures, VPCs, EC2, S3, and serverless options.",
    category: "Cloud & IT",
    rating: 4.9,
    reviews: "1,150+",
    hours: "24 Hours",
    price: 995,
    originalPrice: 1295,
    seatsLeft: 15,
    curriculum: [
      { title: "Module 1: Design Resilient Architectures", lessons: ["Multi-tier cloud systems", "High availability AWS structures", "Disaster recovery plans"], hours: "3 Hours" },
      { title: "Module 2: Design High-Performing Architectures", lessons: ["AWS storage solutions", "Auto-scaling compute instances", "Database caching"], hours: "3 Hours" },
      { title: "Module 3: Design Secure Applications & Architectures", lessons: ["IAM user policies", "VPC security groups & NACLs", "Data encryption keys"], hours: "2.5 Hours" },
    ],
  },
  "capm-certification": {
    title: "CAPM® Certification Exam Prep",
    tagline: "Start your project management career with official PMI CAPM® certification prep.",
    category: "Agile & Project Management",
    rating: 4.7,
    reviews: "340+",
    hours: "23 Contact Hours",
    price: 795,
    originalPrice: 995,
    seatsLeft: 10,
    curriculum: [
      { title: "Module 1: Project Management Fundamentals", lessons: ["Project lifecycles", "Project manager role", "Core concepts"], hours: "3 Hours" },
      { title: "Module 2: Predictive Methodologies", lessons: ["Scope, schedule, cost baselines", "Quality & risk management"], hours: "4 Hours" },
      { title: "Module 3: Agile & Adaptive Frameworks", lessons: ["Scrum basics", "Kanban boards", "Iterative planning"], hours: "4 Hours" },
      { title: "Module 4: Business Analysis Frameworks", lessons: ["Needs assessment", "Requirements management", "Stakeholder analysis"], hours: "3 Hours" },
    ],
  },
  "pmi-acp-certification": {
    title: "PMI-ACP® Agile Certified Practitioner",
    tagline: "Validate your hands-on expertise across Scrum, Kanban, Lean, and Extreme Programming.",
    category: "Agile & Project Management",
    rating: 4.8,
    reviews: "620+",
    hours: "21 Contact Hours",
    price: 1195,
    originalPrice: 1395,
    seatsLeft: 7,
    curriculum: [
      { title: "Module 1: Agile Principles & Mindset", lessons: ["Agile Manifesto values", "Empirical process control", "Team empowerment"], hours: "3 Hours" },
      { title: "Module 2: Value-Driven Delivery", lessons: ["Prioritization techniques", "MVP delivery", "Feedback loops"], hours: "4 Hours" },
      { title: "Module 3: Stakeholder Engagement", lessons: ["Collaborative games", "User stories & personas", "Transparency"], hours: "3.5 Hours" },
      { title: "Module 4: Adaptive Planning & Estimation", lessons: ["Story points", "Velocity tracking", "Release planning"], hours: "3.5 Hours" },
    ],
  },
  "csm-certification": {
    title: "Certified ScrumMaster® (CSM®)",
    tagline: "Master the Scrum framework and lead high-performing agile delivery teams.",
    category: "Agile & Project Management",
    rating: 4.9,
    reviews: "2,100+",
    hours: "16 Hours",
    price: 895,
    originalPrice: 1095,
    seatsLeft: 5,
    curriculum: [
      { title: "Module 1: Scrum Theory & Values", lessons: ["Empiricism", "Scrum pillars", "Scrum values & culture"], hours: "3 Hours" },
      { title: "Module 2: Scrum Roles & Responsibilities", lessons: ["Scrum Master", "Product Owner", "Developers"], hours: "3 Hours" },
      { title: "Module 3: Scrum Events", lessons: ["Sprint Planning", "Daily Scrum", "Sprint Review", "Retrospective"], hours: "4 Hours" },
      { title: "Module 4: Scrum Artifacts", lessons: ["Product Backlog", "Sprint Backlog", "Increment & Definition of Done"], hours: "3 Hours" },
    ],
  },
  "safe-agilist-certification": {
    title: "SAFe® 6.0 Agilist Certification (Leading SAFe)",
    tagline: "Lead Enterprise Agile Transformations with the Scaled Agile Framework.",
    category: "Agile & Project Management",
    rating: 4.8,
    reviews: "890+",
    hours: "16 Hours",
    price: 1250,
    originalPrice: 1450,
    seatsLeft: 9,
    curriculum: [
      { title: "Module 1: Thriving in the Digital Age", lessons: ["Business Agility", "SAFe Core Values", "Lean-Agile Mindset"], hours: "3 Hours" },
      { title: "Module 2: Establishing Team & Technical Agility", lessons: ["Cross-functional Agile Teams", "Built-in Quality"], hours: "3.5 Hours" },
      { title: "Module 3: Building Solutions with Agile Product Delivery", lessons: ["Agile Release Trains (ARTs)", "PI Planning"], hours: "4.5 Hours" },
      { title: "Module 4: Empowering a Lean Portfolio", lessons: ["Strategic themes", "Lean budgets", "Portfolio Kanban"], hours: "3 Hours" },
    ],
  }
};

export function generateStaticParams() {
  return [
    { slug: "pmp-certification" },
    { slug: "cissp-certification" },
    { slug: "aws-solutions-architect" },
    { slug: "capm-certification" },
    { slug: "pmi-acp-certification" },
    { slug: "csm-certification" },
    { slug: "safe-agilist-certification" }
  ];
}

export default async function CourseDetails({ params }) {
  const { slug } = await params;
  const course = coursesData[slug] || coursesData["pmp-certification"];
  
  return <CourseDetailsClient course={course} />;
}
