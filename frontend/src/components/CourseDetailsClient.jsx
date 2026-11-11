"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/PageHeroBanner";
import {
  Star,
  Shield,
  ShieldCheck,
  BookOpen,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  Award,
  FileText,
  GraduationCap,
  Globe,
  Users,
  Laptop,
  Video,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Layers,
  Headphones,
  Gift,
  BarChart3,
  Crown
} from "lucide-react";

import initialArticles from "@/data/articles_summary.json";
import initialSiteSettings from "@/data/site_settings_db.json";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function CourseDetailsClient({ course, schedules = [] }) {
  const router = useRouter();

  // 4 Tabs matching Reference Image 3: "overview" | "exam" | "agenda" | "what-you-get"
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [allFaqsExpanded, setAllFaqsExpanded] = useState(false);

  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});
  const [articles, setArticles] = useState(initialArticles || []);

  const currentCourse = course || {};

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
        const [aRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/articles`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then(r => r.json()).catch(() => null)
        ]);

        if (aRes && aRes.status === "success" && Array.isArray(aRes.data) && aRes.data.length > 0) {
          setArticles(aRes.data);
        }
        if (sRes && sRes.status === "success" && sRes.data) {
          setSiteSettings(sRes.data);
        }
      } catch (err) {
        // Fallback to preloaded data
      }
    }
    fetchCourseData();
  }, [currentCourse?.slug, currentCourse?.id]);

  // Schedules matching this course
  const courseSchedules = schedules.filter(
    s => s.course_id === currentCourse.id || (s.course_title || "").toLowerCase().includes((currentCourse.title || "").toLowerCase())
  );

  // Dynamic Pricing Tiers (Matches Reference Image 3: $699, $999, $1,799)
  const selfPrice = Number(currentCourse.self_price || currentCourse.pricing_tiers?.self_paced?.price) || 699;
  const livePrice = Number(currentCourse.price || currentCourse.pricing_tiers?.live_online?.price) || 999;
  const inPersonPrice = Number(currentCourse.in_person_price || currentCourse.pricing_tiers?.in_person?.price) || 1799;

  const nextCohortDate = courseSchedules.length > 0
    ? (courseSchedules[0].batch_date || courseSchedules[0].date_range || courseSchedules[0].start_date || "Upcoming Live Cohort")
    : (currentCourse.next_date || "Nov 10 – Nov 13, 2026");

  // Handle format enrollment
  const handleEnrollFormat = (formatName, price) => {
    if (typeof window !== "undefined") {
      const isSelfLearning = formatName.toLowerCase().includes("self");
      if (isSelfLearning) {
        const cartItem = {
          course: currentCourse.title || "Certification Training",
          title: currentCourse.title || "Certification Training",
          format: "Self-Learning",
          price: price,
          date: "Lifetime On-Demand Access",
          time: "Self-Paced Learning",
          location: "Online LMS Portal",
          duration: currentCourse.duration || "Self-Paced | Lifetime Access"
        };
        localStorage.setItem("cp_cart", JSON.stringify(cartItem));
        window.dispatchEvent(new Event("cartUpdated"));
        router.push("/checkout/");
      } else {
        const targetUrl = `/enroll/?course=${encodeURIComponent(currentCourse.title || "")}&format=${encodeURIComponent(formatName)}`;
        router.push(targetUrl);
      }
    }
  };

  const handleEnrollSpecificBatch = (sch) => {
    if (typeof window !== "undefined") {
      const cartItem = {
        course: currentCourse.title || "Certification Training",
        title: currentCourse.title || "Certification Training",
        format: sch?.format || "Live Online Class",
        price: livePrice,
        date: sch?.batch_date || sch?.date_range || sch?.start_date || nextCohortDate,
        time: sch?.time || "9:00 AM – 5:00 PM (EST)",
        location: sch?.city || sch?.location || "Online Virtual Classroom",
        duration: currentCourse.duration || "4 Days | 35 Contact Hours"
      };
      localStorage.setItem("cp_cart", JSON.stringify(cartItem));
      window.dispatchEvent(new Event("cartUpdated"));
      router.push("/checkout/");
    }
  };

  // Extract clean acronym (PMP®, CISSP®, CAPM®, etc.)
  const getAcronym = () => {
    const t = (currentCourse.title || "").toLowerCase();
    if (t.includes("pmp")) return "PMP®";
    if (t.includes("cissp")) return "CISSP®";
    if (t.includes("six sigma") && t.includes("black")) return "LSSBB®";
    if (t.includes("six sigma") && t.includes("green")) return "LSSGB®";
    if (t.includes("six sigma") && t.includes("yellow")) return "LSSYB®";
    if (t.includes("itil")) return "ITIL® 4";
    if (t.includes("scrum master") || t.includes("csm")) return "CSM®";
    if (t.includes("pmi-acp") || t.includes("pmi acp")) return "PMI-ACP®";
    if (t.includes("capm")) return "CAPM®";
    if (t.includes("pgmp")) return "PgMP®";
    if (t.includes("pmi-rmp") || t.includes("pmi rmp")) return "PMI-RMP®";
    if (t.includes("cbap")) return "CBAP®";
    if (t.includes("project+")) return "Project+";
    if (t.includes("cisa")) return "CISA®";
    if (t.includes("cism")) return "CISM®";
    if (t.includes("ceh")) return "CEH®";
    if (t.includes("security+")) return "Security+";
    if (t.includes("devops")) return "DevOps";
    if (t.includes("salesforce")) return "Salesforce";
    if (currentCourse.course_code && !currentCourse.course_code.toUpperCase().startsWith("CP")) {
      return currentCourse.course_code;
    }
    return (currentCourse.title || "PMP®").split(" ")[0];
  };

  const courseAcronym = getAcronym();

  let heroImage = siteSettings?.hero_image_url || "/uploads/Modern_Remote_Team_Collaboration_1793281267382.png";
  if (typeof heroImage === "string" && heroImage.startsWith("./")) {
    heroImage = heroImage.substring(1);
  }

  // What You'll Learn bullets (Matches Reference Image 3)
  const whatYouWillLearn = Array.isArray(currentCourse.learning_outcomes) && currentCourse.learning_outcomes.length >= 5
    ? currentCourse.learning_outcomes.slice(0, 5)
    : [
        `PMBOK® Guide – 8th Edition Key Concepts`,
        `${courseAcronym} Exam Content Outline (ECO)`,
        `Agile, Hybrid and Predictive Approaches`,
        `Real-World Case Studies & Scenario Practice`,
        `Exam Strategies, Tips and Practice Questions`
      ];

  // Related Blogs for the Right-Column Blank Space ("Latest Insights & Blogs")
  const relatedBlogs = (() => {
    const keyword = courseAcronym.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const matched = (articles || []).filter(a =>
      (a.title || "").toLowerCase().includes(keyword) ||
      (a.category_name || "").toLowerCase().includes((currentCourse.category_name || "project").split(" ")[0].toLowerCase())
    );
    const list = matched.length >= 3 ? matched.slice(0, 3) : (articles || []).slice(0, 3);
    const fallbackImages = [
      "/article_green_project_hero.jpg",
      "/about_us_professionals.jpg",
      "/article_green_project_hero.jpg"
    ];
    return list.map((art, i) => ({
      title: art.title,
      description: art.description || "Comprehensive guide, key strategies, and expert insights to accelerate your certification journey.",
      slug: art.slug,
      image: art.image || fallbackImages[i % fallbackImages.length],
      date: art.created_at
        ? new Date(art.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : (i === 0 ? "Oct 1, 2026" : i === 1 ? "Sep 25, 2026" : "Sep 18, 2026"),
      readTime: `${8 - i} min read`
    }));
  })();

  // Curriculum Modules
  const defaultCurriculum = [
    {
      title: "Introduction & Framework Fundamentals",
      lessons: [
        "Core Framework & Global Standards",
        "Key Roles, Responsibilities & Governance",
        "Lifecycle Models & Enterprise Tailoring"
      ]
    },
    {
      title: "People & Leadership Domain",
      lessons: [
        "Building & Leading High-Performing Teams",
        "Stakeholder Engagement & Communication",
        "Conflict Resolution & Servant Leadership"
      ]
    },
    {
      title: "Process & Execution Domain",
      lessons: [
        "Scope, Schedule & Budget Management",
        "Risk, Quality & Procurement Governance",
        "Agile, Hybrid & Predictive Delivery"
      ]
    },
    {
      title: "Business Environment & Exam Mastery",
      lessons: [
        "Compliance, Benefits Realization & ROI",
        "Full-Length Simulated Mock Exams",
        "First-Attempt Exam Strategy & Time Management"
      ]
    }
  ];

  const curriculumList = Array.isArray(currentCourse.curriculum) && currentCourse.curriculum.length > 0
    ? currentCourse.curriculum
    : defaultCurriculum;

  // 6 FAQs matching Reference Image 3
  const defaultFaqs = [
    {
      q: `What is the ${courseAcronym} certification?`,
      a: `The ${courseAcronym} certification is the globally recognized gold-standard credential validating your competence to lead projects, manage teams, and deliver organizational results using proven frameworks.`
    },
    {
      q: `How is the training delivered?`,
      a: `You can choose from Live Online Instructor-Led Classes, Self-Paced E-Learning with lifetime LMS access, or In-Person Classroom bootcamps in 120+ cities worldwide.`
    },
    {
      q: `Are there any eligibility requirements for the ${courseAcronym} exam?`,
      a: `Candidates typically require a secondary or four-year degree along with relevant domain experience and 35 hours of formal training—which is 100% fulfilled by completing this bootcamp.`
    },
    {
      q: `Does the course come with a pass guarantee?`,
      a: `Yes! Our 100% Pass Assurance means if you do not pass on your first attempt, you receive free live batch retakes and 1-on-1 mentor coaching until you get certified.`
    },
    {
      q: `What does the training fee include?`,
      a: `Your tuition covers live instructor-led sessions, official authorized study guides, 35 Contact Hours/PDUs certificate, full-length mock exams, and lifetime LMS access.`
    },
    {
      q: `How do I enroll and select a class date?`,
      a: `Simply click the "Enroll Now" button on your preferred training format above to pick your batch date and complete secure registration in under 2 minutes.`
    }
  ];

  const courseFaqs = (Array.isArray(currentCourse.faqs) && currentCourse.faqs.length >= 6)
    ? currentCourse.faqs.slice(0, 6)
    : defaultFaqs;

  const toggleFaq = (idx) => {
    setExpandedFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAllFaqs = () => {
    if (allFaqsExpanded) {
      setExpandedFaqs({});
      setAllFaqsExpanded(false);
    } else {
      const next = {};
      courseFaqs.forEach((_, i) => { next[i] = true; });
      setExpandedFaqs(next);
      setAllFaqsExpanded(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      <Navbar siteSettings={siteSettings} />

      {/* ====================================================================
          1. BREADCRUMB + DYNAMIC CANVAS HERO + 5-ITEM STATS STRIP
          ==================================================================== */}
      <PageHeroBanner
        pageKey={`course:${currentCourse.slug || slug}`}
        siteSettings={siteSettings}
        templateVars={{
          category_name: currentCourse.category_name || "Project Management",
          course_acronym: courseAcronym,
          course_title: currentCourse.title || "PMP® Certification Training",
          course_description:
            currentCourse.description ||
            `A comprehensive, instructor-led ${courseAcronym} exam preparation course designed to help you pass with confidence and advance your project management career.`,
        }}
        fallbackPill={`${(currentCourse.category_name || "Project Management").toUpperCase()} CERTIFICATION`}
        fallbackTitle={`Become a ${courseAcronym} Certified`}
        fallbackHighlight="Project Leader"
        fallbackSubtitle={
          currentCourse.description ||
          `A comprehensive, instructor-led ${courseAcronym} exam preparation course designed to help you pass with confidence and advance your project management career.`
        }
        fallbackPrimaryText="Enroll Now"
        fallbackPrimaryUrl="#training-formats"
        fallbackSecondaryText="Talk to an Advisor"
        onSecondaryClick={() => openModal(`Talk to an Advisor - ${currentCourse.title}`)}
        breadcrumb={
          <nav className="text-[11px] text-slate-500 font-semibold flex flex-wrap gap-1.5 items-center">
            <Link href="/" className="hover:text-[#0066FF] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-300" />
            <Link href="/certifications" className="hover:text-[#0066FF] transition-colors">
              Certifications
            </Link>
            <ChevronRight size={12} className="text-slate-300" />
            <Link
              href={`/category/${currentCourse.category_slug || "agile-project-management"}`}
              className="hover:text-[#0066FF] transition-colors"
            >
              {currentCourse.category_name || "Agile & Project Management"}
            </Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-[#0B1E33] font-extrabold truncate max-w-[260px] md:max-w-md">
              {currentCourse.title || "PMP® Certification Exam Preparation Training"}
            </span>
          </nav>
        }
        bottomSlot={
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm py-5 px-4 sm:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center lg:divide-x lg:divide-slate-100">
              <div className="flex items-center gap-3.5 lg:pr-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <GraduationCap size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">98%</h4>
                  <p className="text-xs text-slate-500 font-semibold">Success Rate</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Globe size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">120+</h4>
                  <p className="text-xs text-slate-500 font-semibold">Countries</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Users size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm leading-tight">Expert Instructors</h4>
                  <p className="text-xs text-slate-500 font-semibold">Industry Practitioners</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <ShieldCheck size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm leading-tight">Pass Assurance</h4>
                  <p className="text-xs text-slate-500 font-semibold">We&apos;ve Got Your Back</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 lg:pl-4 col-span-2 sm:col-span-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <BarChart3 size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">50,000+</h4>
                  <p className="text-xs text-slate-500 font-semibold">Professionals Trained</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ====================================================================
          2. CHOOSE YOUR TRAINING FORMAT (3 Tinted Cards + 5-Item Strip Below)
          ==================================================================== */}
      <section id="training-formats" className="py-5 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-5">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1E33] tracking-tight">
              Choose Your <span className="text-[#0066FF]">Training Format</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Flexible learning options to fit your schedule, career goals, and learning preference.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 items-stretch">
            
            {/* Card 1: Self Learning (Green Tint) */}
            <div className="rounded-3xl bg-gradient-to-b from-[#EFFBF5] via-[#F7FDF9] to-white border border-[#B8EAD0] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all text-left space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#B8EAD0] text-[#16A34A] flex items-center justify-center shadow-2xs shrink-0">
                    <Laptop size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1E33]">Self Learning</h3>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Learn at your own pace with lifetime access to video lessons, study materials, and practice exams.
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-emerald-200/60 text-xs font-bold text-slate-700">
                  {[
                    "Lifetime LMS Access",
                    "Comprehensive Study Materials",
                    "Practice Tests & Quizzes",
                    "Study Anytime, Anywhere",
                    "Ideal for Self-Directed Learners"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-emerald-200/60 space-y-4">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">COURSE FEE</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#0B1E33]">${selfPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnrollFormat("Self Learning", selfPrice)}
                  className="w-full py-3 rounded-xl bg-white hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white border-2 border-[#FF6B00] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Card 2: Live Online Class (Blue Tint + MOST POPULAR Badge) */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#EBF4FF] via-[#F5F9FF] to-white border-2 border-[#0066FF] p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-blue-500/10 text-left space-y-6">
              {/* Top Floating Badge */}
              <div className="absolute -top-3.5 right-6 bg-[#0066FF] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Crown size={12} className="fill-white" />
                <span>MOST POPULAR</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 text-[#0066FF] flex items-center justify-center shadow-2xs shrink-0">
                    <Video size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1E33]">Live Online Class</h3>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Interact with a live instructor, ask questions, and get real-time guidance in a virtual classroom.
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-blue-200/60 text-xs font-bold text-slate-700">
                  {[
                    "Live, Instructor-Led Training",
                    "Real-Time Doubt Solving",
                    "Group Discussions & Activities",
                    "Access to Class Recordings",
                    "Ideal for Working Professionals"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-[#0066FF] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-blue-200/60 space-y-4">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">COURSE FEE</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#0B1E33]">${livePrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnrollFormat("Live Online Class", livePrice)}
                  className="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/25"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Card 3: In-Person Classroom (Orange/Peach Tint) */}
            <div className="rounded-3xl bg-gradient-to-b from-[#FFF6ED] via-[#FFFBF7] to-white border border-[#FED7AA] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all text-left space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#FED7AA] text-[#FF6B00] flex items-center justify-center shadow-2xs shrink-0">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1E33]">In-Person Classroom</h3>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Face-to-face training in a professional classroom with hands-on learning and networking.
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-orange-200/60 text-xs font-bold text-slate-700">
                  {[
                    "Interactive In-Person Instruction",
                    "Networking Opportunities",
                    "Collaboration with Peers",
                    "Real-World Case Studies",
                    "Ideal for Best Engagement"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-[#FF6B00] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-orange-200/60 space-y-4">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">COURSE FEE</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-[#0B1E33]">${inPersonPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnrollFormat("In-Person Classroom", inPersonPrice)}
                  className="w-full py-3 rounded-xl bg-white hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white border-2 border-[#FF6B00] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>

          {/* 5-Item Feature Strip Below Format Cards */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-4 px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center lg:divide-x lg:divide-slate-100 text-xs font-bold text-[#0B1E33]">
            <div className="flex items-center justify-center gap-2.5">
              <Calendar size={17} className="text-[#0066FF] shrink-0" />
              <span>35 Contact Hours</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Award size={17} className="text-[#0066FF] shrink-0" />
              <span>PMI® Authorized Content</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Layers size={17} className="text-[#0066FF] shrink-0" />
              <span>Lifetime LMS Access</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <Users size={17} className="text-[#FF6B00] shrink-0" />
              <span>Same Expert Instruction</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 col-span-2 sm:col-span-1">
              <ShieldCheck size={17} className="text-[#FF6B00] shrink-0" />
              <span>Pass Guarantee</span>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          3. 4 PILL TABS + 2-COLUMN CONTENT & LATEST INSIGHTS BLOGS SIDEBAR
          ==================================================================== */}
      <section className="py-5 px-4 md:px-6 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* 4 Pill Tabs Row */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: "overview", label: "Course Overview", icon: <BookOpen size={15} /> },
              { id: "exam", label: "Exam & Certification", icon: <Award size={15} /> },
              { id: "agenda", label: "Course Agenda & Cohorts", icon: <Calendar size={15} /> },
              { id: "what-you-get", label: "What You'll Get", icon: <Gift size={15} /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0066FF] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 border border-slate-200/90 hover:border-[#0066FF]"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0066FF] rotate-45" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 12-Column Grid: Left 7 Cols (Active Tab Card) + Right 5 Cols (Latest Insights & Blogs) — Equal Height Columns */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT COLUMN (7 Cols) */}
            <div className="lg:col-span-7 flex">
              
              {/* TAB 1: COURSE OVERVIEW (Matches Reference Image 3) */}
              {activeTab === "overview" && (
                <div className="w-full h-full bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B1E33]">Course Overview</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Build the skills, knowledge, and confidence to pass the {courseAcronym} exam and lead successful projects in today&apos;s dynamic business environment.
                    </p>
                  </div>

                  {/* Middle Sub-Grid: Laptop Mockup on Left + What You'll Learn on Right */}
                  <div className="grid sm:grid-cols-12 gap-4 items-center bg-[#F8FAFC] p-3.5 rounded-2xl border border-slate-100">
                    
                    {/* Laptop Visual Mockup */}
                    <div className="sm:col-span-5">
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-800 to-slate-900 p-3 shadow-md">
                        <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-[#0A2540] via-[#004E98] to-[#0A2540] border border-blue-400/30 flex flex-col items-center justify-center text-center p-3 relative overflow-hidden">
                          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400/20 blur-xl" />
                          <span className="text-xl sm:text-2xl font-black text-white tracking-tight">{courseAcronym}</span>
                          <span className="text-[11px] font-bold text-blue-100 mt-0.5">Exam Preparation</span>
                        </div>
                        <div className="h-2 bg-slate-300 rounded-b-lg mt-1.5 mx-auto w-3/4" />
                      </div>
                    </div>

                    {/* What You'll Learn Checklist */}
                    <div className="sm:col-span-7 space-y-2.5">
                      <h4 className="text-sm font-black text-[#0B1E33]">What You&apos;ll Learn</h4>
                      <ul className="space-y-2 text-xs font-bold text-slate-700">
                        {whatYouWillLearn.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={15} className="text-[#16A34A] shrink-0 mt-0.5" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Bottom 4-Item Highlight Strip Inside Overview Card */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                        <BookOpen size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0B1E33] leading-tight">4 Days</p>
                        <p className="text-[10px] text-slate-500 font-semibold">Live Online Training</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                        <Clock size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0B1E33] leading-tight">35</p>
                        <p className="text-[10px] text-slate-500 font-semibold">Contact Hours</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                        <Layers size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0B1E33] leading-tight">PMBOK®</p>
                        <p className="text-[10px] text-slate-500 font-semibold">8th Edition</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                        <Calendar size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0B1E33] leading-tight">100%</p>
                        <p className="text-[10px] text-slate-500 font-semibold">Pass Guarantee*</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EXAM & CERTIFICATION */}
              {activeTab === "exam" && (
                <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between text-left space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00]">Official Examination Details</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B1E33]">About the {courseAcronym} Certification Exam</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {currentCourse.exam_details || `${currentCourse.title} validates professional competence against global industry frameworks. Our bootcamp prepares you thoroughly to pass on your very first attempt.`}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">Exam Format</span>
                      <p className="text-sm font-black text-[#0B1E33]">180 Questions (CBT)</p>
                      <p className="text-xs text-slate-500 font-medium">Multiple-choice &amp; real-world scenario questions</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">Exam Duration</span>
                      <p className="text-sm font-black text-[#0B1E33]">230 Minutes</p>
                      <p className="text-xs text-slate-500 font-medium">Includes two 10-minute scheduled breaks</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">Pass Assurance</span>
                      <p className="text-sm font-black text-[#16A34A]">100% Retake Support</p>
                      <p className="text-xs text-slate-500 font-medium">Free live retakes &amp; mentor coaching until you pass</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">Credential Maintenance</span>
                      <p className="text-sm font-black text-[#0B1E33]">60 PDUs Every 3 Years</p>
                      <p className="text-xs text-slate-500 font-medium">Full PDU renewal guidance included</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COURSE AGENDA & COHORTS */}
              {activeTab === "agenda" && (
                <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between text-left space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-black text-[#0B1E33]">Course Curriculum &amp; Live Cohorts</h3>
                      <p className="text-xs text-slate-500 font-medium">Key modules covered in your 4-day bootcamp and upcoming dates.</p>
                    </div>
                    <Link href={`/enroll?course=${encodeURIComponent(currentCourse.title || "")}`} className="text-xs font-bold text-[#0066FF] hover:underline">
                      View All Dates →
                    </Link>
                  </div>

                  <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                    {curriculumList.slice(0, 4).map((mod, midx) => {
                      const isOpen = !!expandedModules[midx];
                      return (
                        <div key={midx} className="rounded-xl border border-slate-200/80 bg-[#F8FAFC] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setExpandedModules(p => ({ ...p, [midx]: !p[midx] }))}
                            className="w-full flex items-center justify-between p-3.5 text-left font-bold text-xs text-[#0B1E33] cursor-pointer"
                          >
                            <span>Module {midx + 1}: {mod.title}</span>
                            {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>
                          {isOpen && mod.lessons && (
                            <div className="px-4 pb-3 pt-1 text-[11px] text-slate-600 space-y-1 border-t border-slate-100 bg-white">
                              {mod.lessons.map((les, lidx) => (
                                <div key={lidx} className="flex items-center gap-2">
                                  <CheckCircle2 size={12} className="text-[#0066FF] shrink-0" />
                                  <span>{les}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between gap-4">
                    <div className="text-xs">
                      <span className="text-slate-500 font-semibold">Next Guaranteed Cohort: </span>
                      <strong className="text-[#0B1E33] font-black">{nextCohortDate}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEnrollSpecificBatch(courseSchedules[0])}
                      className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shrink-0"
                    >
                      Enroll Batch →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: WHAT YOU'LL GET */}
              {activeTab === "what-you-get" && (
                <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between text-left space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B1E33]">What You&apos;ll Get With Enrollment</h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Everything included in your {courseAcronym} certification package at no extra cost.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5 text-xs font-bold text-slate-700">
                    {[
                      "35 Contact Hours / PDUs Official Certificate",
                      "PMI® Authorized Training Materials & Digital Kit",
                      "5 Full-Length Simulated Practice Exams (1,000+ Qs)",
                      "Step-by-Step Exam Application & Audit Support",
                      "Lifetime Access to Recorded Live Sessions & LMS",
                      "Post-Training 1-on-1 Mentor Doubt Clearing",
                      "Resume & LinkedIn Certification Badge Guidance",
                      "100% First-Attempt Pass Assurance Support"
                    ].map((benefit, bidx) => (
                      <div key={bidx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100">
                        <CheckCircle2 size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN (5 Cols — Equal Height with Left Column & Filled Naturally) */}
            <div className="lg:col-span-5 flex">
              <div className="w-full h-full bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between text-left gap-3.5">
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0B1E33]">Latest Insights &amp; Blogs</h3>
                  </div>
                  <Link href="/resources" className="text-xs sm:text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1">
                    <span>View All Blogs</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* 3 Related Blog Items (Larger Thumbnails & Larger Fonts, Zero Gap) */}
                <div className="flex-1 flex flex-col justify-between gap-3">
                  {relatedBlogs.map((blog, bidx) => (
                    <Link
                      key={bidx}
                      href={`/blog/${blog.slug}`}
                      className="group p-3 rounded-2xl bg-[#F8FAFC] hover:bg-blue-50/40 border border-slate-200/70 hover:border-[#0066FF]/40 flex items-center gap-4 transition-all"
                    >
                      <div className="w-36 sm:w-44 h-24 sm:h-[98px] rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200/80 shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { e.target.src = "/article_green_project_hero.jpg"; }}
                        />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <h4 className="text-sm sm:text-[15px] font-black text-[#0B1E33] group-hover:text-[#0066FF] transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                          {blog.description.replace(/&reg;/g, "®").replace(/&amp;/g, "&")}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold pt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-[#0066FF]" />
                            {blog.date}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-[#0066FF]" />
                            {blog.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          4. PROVEN RESULTS / 98.23% SUCCESS RATE DARK NAVY BANNER
          ==================================================================== */}
      <section className="py-4 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#07192F] via-[#0D2E59] to-[#092140] px-6 py-6 md:px-10 md:py-7 text-white shadow-xl relative overflow-hidden">
            {/* Decorative Subtle Slashes */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#FF6B00]/20 rotate-12 rounded-3xl blur-xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
              
              {/* Left & Middle: Gold Seal + 98.23% Success Rate */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left lg:border-r lg:border-white/15 lg:pr-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <Award size={36} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                    Proven Results. Higher Success Rate.
                  </p>
                  <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-2.5 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">98.23%</span>
                    <span className="text-xs sm:text-sm font-bold text-blue-100">{courseAcronym} Exam Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Right 3 Stats with Dividers */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-4 text-center divide-x divide-white/15">
                <div className="px-2 space-y-1">
                  <Users size={20} className="text-amber-400 mx-auto" />
                  <p className="text-lg sm:text-2xl font-black text-white leading-none">50,000+</p>
                  <p className="text-[10px] sm:text-xs text-blue-100/80 font-medium">Professionals Trained</p>
                </div>

                <div className="px-2 space-y-1">
                  <Calendar size={20} className="text-amber-400 mx-auto" />
                  <p className="text-lg sm:text-2xl font-black text-white leading-none">15+</p>
                  <p className="text-[10px] sm:text-xs text-blue-100/80 font-medium">Years of Excellence</p>
                </div>

                <div className="px-2 space-y-1">
                  <BarChart3 size={20} className="text-amber-400 mx-auto" />
                  <p className="text-lg sm:text-2xl font-black text-white leading-none">120+</p>
                  <p className="text-[10px] sm:text-xs text-blue-100/80 font-medium">Cities Worldwide</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. FREQUENTLY ASKED QUESTIONS (2-COLUMN 6 COMPACT ACCORDIONS)
          ==================================================================== */}
      <section className="py-5 px-4 md:px-6 bg-white" id="faqs">
        <div className="max-w-7xl mx-auto space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1E33] tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <button
              type="button"
              onClick={toggleAllFaqs}
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{allFaqsExpanded ? "Collapse All FAQs" : "View All FAQs"}</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3.5 items-start">
            {courseFaqs.map((faq, idx) => {
              const isOpen = !!expandedFaqs[idx];
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/90 bg-[#F8FAFC] hover:bg-white overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left font-extrabold text-xs sm:text-sm text-[#0B1E33] cursor-pointer"
                  >
                    <span className="pr-3">{faq.q}</span>
                    <span className="text-[#0066FF] font-black text-base shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-2 border-t border-slate-100 bg-white text-xs text-slate-600 font-medium leading-relaxed text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ====================================================================
          6. BOTTOM DARK NAVY CTA BANNER (3 Action Buttons: Orange, Outline, Green WhatsApp)
          ==================================================================== */}
      <section className="py-5 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#07192F] via-[#0D2E59] to-[#07192F] p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                Ready to Become a {courseAcronym} Certified Professional?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 font-medium leading-relaxed">
                Join thousands of professionals who have advanced their careers with our {courseAcronym} training. Enroll today or speak with our training advisor.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => handleEnrollFormat("Live Online Class", livePrice)}
                className="px-7 py-3.5 rounded-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => openModal(`Talk to an Advisor - ${currentCourse.title}`)}
                className="px-7 py-3.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Headphones size={14} />
                <span>Talk to an Advisor</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
