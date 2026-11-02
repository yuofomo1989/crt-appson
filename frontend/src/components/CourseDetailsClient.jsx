"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Star, Shield, BookOpen, Clock, Calendar, CheckCircle2, 
  ChevronDown, ChevronUp, Download, Phone, Play, Award, FileText, 
  GraduationCap, Globe, HelpCircle, Check, Users, Sparkles,
  Laptop, Video, MapPin, Building2, MessageCircle, Mail,
  ArrowRight, CheckCircle, ChevronRight, Layers, FileCheck
} from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function CourseDetailsClient({ course, schedules = [] }) {
  const router = useRouter();

  // Active Tab state
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "exam" | "agenda"

  // Accordion states
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [allModulesExpanded, setAllModulesExpanded] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState({ 0: true, 1: true });
  const [allFaqsExpanded, setAllFaqsExpanded] = useState(false);

  // Dynamic API state
  const [brochuresList, setBrochuresList] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  const currentCourse = course || {};

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
        const [bRes, sRes] = await Promise.all([
          fetch(`${apiUrl}/brochures`).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).catch(() => ({}))
        ]);

        if (bRes.json) {
          const bData = await bRes.json().catch(() => ({}));
          if (bData.status === "success" && Array.isArray(bData.data)) {
            const matched = bData.data.filter(b => 
              (b.course_id && b.course_id === currentCourse?.id) || 
              (b.course_title && (currentCourse?.title || "").toLowerCase().includes(b.course_title.toLowerCase()))
            );
            setBrochuresList(matched.length > 0 ? matched : bData.data.slice(0, 2));
          }
        }

        if (sRes.json) {
          const sData = await sRes.json().catch(() => null);
          if (sData) setSiteSettings(sData);
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    }
    fetchCourseData();
  }, [currentCourse?.slug, currentCourse?.id]);

  // Schedules matching this course
  const courseSchedules = schedules.filter(
    s => s.course_id === currentCourse.id || (s.course_title || "").toLowerCase().includes((currentCourse.title || "").toLowerCase())
  );

  // Dynamic Pricing Tiers
  const selfPrice = currentCourse.self_price || currentCourse.pricing_tiers?.self_paced?.price || 699;
  const livePrice = currentCourse.price || currentCourse.pricing_tiers?.live_online?.price || 1095;
  const inPersonPrice = currentCourse.in_person_price || currentCourse.pricing_tiers?.in_person?.price || 1799;

  // Next Cohort Date & Time
  const nextCohortDate = courseSchedules.length > 0
    ? (courseSchedules[0].batch_date || courseSchedules[0].date_range || courseSchedules[0].start_date || "Upcoming Live Cohort")
    : (currentCourse.next_date || "May 27 – May 30, 2026");

  const nextCohortTime = courseSchedules.length > 0 && courseSchedules[0].time
    ? courseSchedules[0].time
    : "9:00 AM – 5:00 PM (EST)";

  // Handle direct format enrollment (Option A):
  // 1. Self Learning: No live schedule needed -> goes directly to /checkout/
  // 2. Live Online & In-Person: User selects their batch date/city on /enroll/ before checkout
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
        // Navigate to Schedule and Enroll page with pre-selected course & format
        const targetUrl = `/enroll/?course=${encodeURIComponent(currentCourse.title || '')}&format=${encodeURIComponent(formatName)}`;
        router.push(targetUrl);
      }
    }
  };

  // When user clicks "Enroll Batch →" from the Agenda/Cohorts table, they already selected the date
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

  // Curriculum Data
  const defaultCurriculum = [
    { 
      title: "Introduction to Project Management", 
      hours: "4 Hours", 
      count: "4 Lessons",
      lessons: [
        "What is a Project?",
        "Project Management vs. Operations",
        "Project Management Framework",
        "Project Manager's Role and Responsibilities"
      ] 
    },
    { 
      title: "Project Performance Domains", 
      hours: "6 Hours", 
      count: "4 Lessons",
      lessons: [
        "Stakeholder & Team Performance Domains",
        "Development Approach & Life Cycle",
        "Planning & Project Work",
        "Delivery, Measurement & Uncertainty"
      ] 
    },
    { 
      title: "People Domain", 
      hours: "5 Hours", 
      count: "4 Lessons",
      lessons: [
        "Build a High-Performing Team",
        "Define Team Ground Rules & Agreements",
        "Empower Team Members & Stakeholders",
        "Manage Conflict & Collaboration"
      ] 
    },
    { 
      title: "Process Domain", 
      hours: "5 Hours", 
      count: "4 Lessons",
      lessons: [
        "Execute Project with the Urgency Required to Deliver Business Value",
        "Manage Communications & Risks",
        "Engage Stakeholders & Plan Scope",
        "Manage Budget, Resources & Quality"
      ] 
    },
    { 
      title: "Business Environment Domain", 
      hours: "5 Hours", 
      count: "4 Lessons",
      lessons: [
        "Plan & Manage Project Compliance",
        "Evaluate & Deliver Project Benefits and Value",
        "Evaluate & Address External Business Environment Changes",
        "Support Organizational Change"
      ] 
    },
    { 
      title: "Practice Exams & Exam Mastery", 
      hours: "5 Hours", 
      count: "4 Lessons",
      lessons: [
        "Diagnostic Full-Length Mock Exam",
        "Question-by-Question Strategic Review",
        "Exam-Day Strategy, Tips & Pitfalls to Avoid",
        "Final Pass Guarantee Readiness Plan"
      ] 
    }
  ];

  const curriculumList = (currentCourse.curriculum && Array.isArray(currentCourse.curriculum) && currentCourse.curriculum.length > 0) 
    ? currentCourse.curriculum 
    : defaultCurriculum;

  // Toggle curriculum expand/collapse
  const toggleModule = (idx) => {
    setExpandedModules(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleAllModules = () => {
    if (allModulesExpanded) {
      setExpandedModules({});
      setAllModulesExpanded(false);
    } else {
      const allOpen = {};
      curriculumList.forEach((_, idx) => { allOpen[idx] = true; });
      setExpandedModules(allOpen);
      setAllModulesExpanded(true);
    }
  };

  // Helper to remove duplicated numbers like "1)", "1.", "1 -", etc. from module titles
  const cleanModuleTitle = (rawTitle) => {
    if (!rawTitle) return "Overview & Fundamentals";
    return rawTitle.replace(/^\s*\d+[\.\)\-:]\s*/, '').trim();
  };

  // FAQs Data
  const defaultFaqs = [
    { 
      q: `Who should take the ${currentCourse.title || "certification"}?`, 
      a: "This program is designed for project leaders, team managers, engineers, analysts, and ambitious professionals aiming to validate their enterprise competence, step into high-impact roles, and lead complex organizational initiatives." 
    },
    { 
      q: `What are the eligibility requirements for the exam?`, 
      a: "Eligibility varies by credential body (e.g. PMI, Axelos, Scrum.org). Typically, candidates need 3–5 years of professional domain experience along with accredited contact hours/PDUs, which are 100% fulfilled by attending our certified bootcamp." 
    },
    { 
      q: `Is the official exam fee included in the course price?`, 
      a: "Tuition covers accredited master instructor training, official curriculum materials, chapter tests, full mock exams, and application verification assistance. Depending on the tier and location, official exam vouchers can also be bundled." 
    },
    { 
      q: `Will I receive an official certificate upon course completion?`, 
      a: `Yes! Upon completing the bootcamp, you will be awarded an official Certificate of Completion with 35 Contact Hours / PDUs, fully authorized for submission to the certification governing body.` 
    },
    { 
      q: `How many PDUs / Contact Hours will I earn from this course?`, 
      a: `You will earn 35 Pre-Approved Contact Hours (PDUs), fulfilling 100% of the mandatory education requirements needed to sit for your exam.` 
    },
    { 
      q: `Do you provide an Exam Pass Guarantee?`, 
      a: "Yes! Certification Planner offers a 100% Pass Guarantee. If you don't pass on your first attempt after completing our recommended study plan, we provide free coaching sessions and let you attend upcoming live batches at zero extra charge." 
    },
    { 
      q: `Are the live classes recorded for later review?`, 
      a: "Yes, all live virtual classroom sessions are recorded in high-definition and uploaded directly to your Student LMS Portal for 24/7 on-demand access and lifetime review." 
    },
    { 
      q: `What if I miss a live class?`, 
      a: "No problem at all! You can easily catch up by watching the session recording on your LMS dashboard, or you can reschedule and attend that specific module in the very next upcoming batch." 
    }
  ];

  const courseFaqs = (currentCourse.faqs && Array.isArray(currentCourse.faqs) && currentCourse.faqs.length > 0)
    ? currentCourse.faqs
    : defaultFaqs;

  const toggleFaq = (fidx) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [fidx]: !prev[fidx]
    }));
  };

  const toggleAllFaqs = () => {
    if (allFaqsExpanded) {
      setExpandedFaqs({});
      setAllFaqsExpanded(false);
    } else {
      const allOpen = {};
      courseFaqs.forEach((_, idx) => { allOpen[idx] = true; });
      setExpandedFaqs(allOpen);
      setAllFaqsExpanded(true);
    }
  };

  // Extract clean acronym / short credential name (PMP®, CISSP®, etc.) - Never internal SKU CP002
  const getAcronym = () => {
    const t = (currentCourse.title || "").toLowerCase();
    if (t.includes("pmp")) return "PMP®";
    if (t.includes("cissp")) return "CISSP®";
    if (t.includes("six sigma") && t.includes("black")) return "LSSBB®";
    if (t.includes("six sigma") && t.includes("green")) return "LSSGB®";
    if (t.includes("six sigma") && t.includes("yellow")) return "LSSYB®";
    if (t.includes("itil")) return "ITIL® 4";
    if (t.includes("scrum master") || t.includes("csm")) return "CSM®";
    if (t.includes("pmi-acp")) return "PMI-ACP®";
    if (t.includes("capm")) return "CAPM®";
    if (t.includes("prince2")) return "PRINCE2®";
    if (t.includes("cisa")) return "CISA®";
    if (t.includes("cism")) return "CISM®";
    if (t.includes("aws")) return "AWS®";
    if (currentCourse.course_code && !currentCourse.course_code.toUpperCase().startsWith("CP")) {
      return currentCourse.course_code;
    }
    return (currentCourse.title || "Certification").split(" ")[0];
  };

  const courseAcronym = getAcronym();

  // Partner badge text
  const partnerBadge = currentCourse.category_name?.includes("Agile") || currentCourse.title?.includes("PMP") 
    ? "PMI® Authorized Training Partner" 
    : "Accredited Global Training Partner";

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar siteSettings={siteSettings} />

      {/* ========================================================
          1. HERO SECTION (Figma / Mockup 100% Match)
          ======================================================== */}
      <section className="bg-white border-b border-gray-100 pt-6 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-[11px] text-gray-400 font-bold flex flex-wrap gap-1.5 items-center">
            <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link href="/courses" className="hover:text-brand-blue transition-colors">Certifications</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link 
              href={`/category/${currentCourse.category_slug || 'agile-project-management'}`} 
              className="hover:text-brand-blue transition-colors"
            >
              {currentCourse.category_name || "Agile & Project Management"}
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-700 font-black truncate max-w-[260px] md:max-w-md">{currentCourse.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Details */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Category Worldwide Pill Badge */}
              <div className="inline-block bg-[#FFF4EC] text-brand-orange text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md border border-[#FFE2CD]">
                #1 {currentCourse.category_name || "Project Management"} Certification Worldwide
              </div>

              {/* H1 Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy leading-[1.15] tracking-tight">
                {currentCourse.title.toLowerCase().includes("pmp") ? (
                  <>Become a <span className="text-brand-navy">PMP®</span> Certified Project Leader</>
                ) : (
                  <>Master <span className="text-brand-blue">{currentCourse.title}</span> &amp; Lead</>
                )}
              </h1>

              {/* Subtitle / Overview */}
              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-2xl">
                {currentCourse.description || `Live instructor-led ${currentCourse.title} training with comprehensive exam prep, mock tests, mentorship, and career support to help you succeed.`}
              </p>

              {/* Ratings and Stats Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span>
                    <strong className="text-gray-900">{currentCourse.rating || "4.8"}/5</strong>
                    <span className="text-gray-400 font-medium ml-1">Student Rating</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-brand-blue font-black uppercase tracking-wide">PMI®</span>
                  <span className="text-gray-500 font-medium">Authorized Training Partner</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-brand-blue" />
                  <span>
                    <strong className="text-gray-900">50,000+</strong>
                    <span className="text-gray-400 font-medium ml-1">Professionals Trained</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Shield size={15} className="text-emerald-500" />
                  <span>
                    <strong className="text-emerald-600">100%</strong>
                    <span className="text-gray-400 font-medium ml-1">Pass Support</span>
                  </span>
                </div>
              </div>

              {/* Quick Brochure / Syllabus Download Link */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {brochuresList.length > 0 ? (
                  <a
                    href={brochuresList[0].file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors"
                  >
                    <Download size={14} /> Download {courseAcronym} Detailed Syllabus (PDF)
                  </a>
                ) : (
                  <button
                    onClick={() => openModal(`Download ${currentCourse.title} Syllabus PDF`)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Download {courseAcronym} Detailed Syllabus (PDF)
                  </button>
                )}
              </div>

            </div>

            {/* Right Hero Video / Image Mockup with Live Class Banner */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-slate-900 group">
                
                {/* Main Instructor / Virtual Classroom Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                    alt={`${currentCourse.title} Live Class`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top-Left Inset: Live Student Thumbnails */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md w-fit">
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>

                    {/* Miniature video participant grid */}
                    <div className="grid grid-cols-2 gap-1 bg-black/40 backdrop-blur-md p-1 rounded-lg border border-white/10 w-fit">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="student" className="w-8 h-6 object-cover rounded" />
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="student" className="w-8 h-6 object-cover rounded" />
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&auto=format&fit=crop&q=80" alt="student" className="w-8 h-6 object-cover rounded" />
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80" alt="student" className="w-8 h-6 object-cover rounded" />
                    </div>
                  </div>

                  {/* Top-Right Badge: Official Acronym Circle */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="h-14 w-14 rounded-full bg-white shadow-xl flex items-center justify-center p-2 border-2 border-brand-blue/30 text-center">
                      <span className="text-brand-navy font-black text-xs leading-none tracking-tight">
                        {courseAcronym}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Overlay Card: Upcoming Class Cohort */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center gap-3.5">
                      <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center shrink-0">
                        <Calendar size={22} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-black">
                          Upcoming Class (Live Online)
                        </p>
                        <p className="text-sm font-black text-brand-navy">
                          {nextCohortDate}
                        </p>
                        <p className="text-[11px] text-gray-500 font-semibold">
                          {nextCohortTime}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. "CHOOSE YOUR TRAINING FORMAT" (3 CARDS SIDE-BY-SIDE)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20 md:px-6 space-y-10" id="training-formats">
        
        {/* Section Heading */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
            Choose Your Training Format
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            Flexible learning options to fit your schedule, career goals, and learning preference.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
          
          {/* ---------------- CARD 1: SELF LEARNING ---------------- */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group">
            <div className="space-y-6">
              
              {/* Header Icon + Title */}
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                  <Laptop size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-navy">Self Learning</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                    Learn at your own pace with lifetime access to video lessons, study materials &amp; practice tests.
                  </p>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 text-xs font-semibold text-gray-700 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Lifetime LMS Access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Comprehensive Study Materials</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Practice Tests &amp; Quizzes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Study Anytime, Anywhere</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>Ideal for Self-Disciplined Learners</span>
                </li>
              </ul>

            </div>

            {/* Pricing & CTA Button */}
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black block">Course Fee</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-brand-navy">${selfPrice}</span>
                  <span className="text-xs font-bold text-gray-400">USD</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  or 3 interest-free payments of ${(selfPrice / 3).toFixed(0)} with <strong className="text-slate-800">affirm</strong>
                </p>
              </div>

              <button
                onClick={() => handleEnrollFormat("Self-Learning", selfPrice)}
                className="w-full rounded-xl bg-[#ff5c00] hover:bg-[#e05200] py-4 px-6 font-bold text-white text-xs shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ---------------- CARD 2: LIVE ONLINE CLASS (MOST POPULAR) ---------------- */}
          <div className="bg-white rounded-3xl border-2 border-brand-blue p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 bg-gradient-to-b from-blue-50/20 via-white to-white md:-translate-y-2">
            
            {/* "Most Popular" Ribbon Badge */}
            <div className="absolute -top-3.5 right-6 z-10">
              <span className="bg-brand-blue text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            </div>

            <div className="space-y-6">
              
              {/* Header Icon + Title */}
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center shadow-inner">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-navy">Live Online Class</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                    Interactive live classes with expert instructors and real-time doubt solving.
                  </p>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 text-xs font-semibold text-gray-700 pt-2 border-t border-blue-100/60">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                  <span>Live Instructor-Led Training</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                  <span>Real-Time Doubt Solving</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                  <span>Group Discussions &amp; Activities</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                  <span>Access to Class Recordings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                  <span>Ideal for Working Professionals</span>
                </li>
              </ul>

            </div>

            {/* Pricing & CTA Button */}
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black block">Course Fee</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-brand-navy">${livePrice}</span>
                  <span className="text-xs font-bold text-gray-400">USD</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  or 3 interest-free payments of ${(livePrice / 3).toFixed(0)} with <strong className="text-slate-800">affirm</strong>
                </p>
              </div>

              <button
                onClick={() => handleEnrollFormat("Live Online Class", livePrice)}
                className="w-full rounded-xl bg-brand-blue hover:bg-blue-700 py-4 px-6 font-bold text-white text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* ---------------- CARD 3: IN-PERSON CLASSROOM ---------------- */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group">
            <div className="space-y-6">
              
              {/* Header Icon + Title */}
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-100 text-brand-orange flex items-center justify-center shadow-inner">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-navy">In-Person Classroom</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                    Face-to-face training in a physical classroom with hands-on learning experience.
                  </p>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 text-xs font-semibold text-gray-700 pt-2 border-t border-gray-100">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Interactive In-Person Sessions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Networking Opportunities</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Collaboration with Peers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Real-World Case Studies</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                  <span>Ideal for Better Engagement</span>
                </li>
              </ul>

            </div>

            {/* Pricing & CTA Button */}
            <div className="pt-8 border-t border-gray-100 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black block">Course Fee</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-brand-navy">${inPersonPrice}</span>
                  <span className="text-xs font-bold text-gray-400">USD</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  or 3 interest-free payments of ${(inPersonPrice / 3).toFixed(0)} with <strong className="text-slate-800">affirm</strong>
                </p>
              </div>

              <button
                onClick={() => handleEnrollFormat("In-Person Classroom", inPersonPrice)}
                className="w-full rounded-xl bg-[#ff5c00] hover:bg-[#e05200] py-4 px-6 font-bold text-white text-xs shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Feature Trust Strip directly below the 3 cards */}
        <div className="rounded-2xl border border-gray-100 bg-white py-4 px-6 shadow-xs flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-extrabold text-sm">🌿</span>
            <span>35 Contact Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-blue font-extrabold text-sm">🎓</span>
            <span>{partnerBadge.includes("PMI") ? "PMI® Authorized Content" : "Authorized Content"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-extrabold text-sm">🔄</span>
            <span>Lifetime LMS Access</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-blue font-extrabold text-sm">👨‍🏫</span>
            <span>Same Expert Instructors</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-orange font-extrabold text-sm">🛡️</span>
            <span>Pass Guarantee</span>
          </div>
        </div>

      </section>

      {/* ========================================================
          3. TABBED SECTION (Course Overview | Exam & Cert | Agenda)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-6 space-y-8" id="course-details-tabs">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-3 border-b border-gray-200/80 pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                : "bg-white text-gray-600 hover:text-brand-blue hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <BookOpen size={16} />
            <span>Course Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("exam")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
              activeTab === "exam"
                ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                : "bg-white text-gray-600 hover:text-brand-blue hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Award size={16} />
            <span>Exam &amp; Certification</span>
          </button>

          <button
            onClick={() => setActiveTab("agenda")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
              activeTab === "agenda"
                ? "bg-brand-blue text-white shadow-md shadow-blue-500/20"
                : "bg-white text-gray-600 hover:text-brand-blue hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <Calendar size={16} />
            <span>Course Agenda &amp; Cohorts</span>
          </button>
        </div>

        {/* ---------------- TAB 1: COURSE OVERVIEW (3-COLUMN BALANCED LAYOUT) ---------------- */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (5 of 12 = 41.6%): Course Curriculum Accordion */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-brand-navy">Course Curriculum</h3>
                  <p className="text-xs text-gray-400 font-bold">Topics &amp; Sub Topics</p>
                </div>

                <button
                  onClick={toggleAllModules}
                  className="text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors cursor-pointer"
                >
                  {allModulesExpanded ? "Collapse All" : "Expand All"}
                </button>
              </div>

              {/* Curriculum Modules List */}
              <div className="space-y-3 pt-2">
                {curriculumList.map((mod, midx) => {
                  const isOpen = !!expandedModules[midx];
                  return (
                    <div
                      key={midx}
                      className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-xs hover:border-blue-200 transition-colors"
                    >
                      <button
                        onClick={() => toggleModule(midx)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-brand-navy hover:bg-slate-50/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5 pr-2">
                          <span className="text-xs font-black text-brand-blue mt-0.5 shrink-0">{midx + 1}.</span>
                          <span className="text-xs font-black text-slate-800 leading-snug">{cleanModuleTitle(mod.title)}</span>
                        </div>
                        <span className="text-base text-gray-400 font-bold shrink-0 ml-2">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {isOpen && mod.lessons && mod.lessons.length > 0 && (
                        <div className="bg-slate-50/60 p-4 border-t border-gray-100 space-y-2">
                          {mod.lessons.map((les, lidx) => (
                            <div key={lidx} className="flex items-start gap-2 text-xs text-gray-600 font-medium pl-2">
                              <span className="text-brand-orange font-bold text-[11px] shrink-0 mt-0.5">{midx + 1}.{lidx + 1}</span>
                              <span className="leading-snug">{les}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle Column (4 of 12 = 33.3%): "This Course Includes" Box */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-5">
                <h4 className="text-base font-black text-brand-navy">This Course Includes</h4>

                <ul className="space-y-4 text-xs font-semibold text-gray-700">
                  <li className="flex items-start gap-3">
                    <GraduationCap size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-snug">35 Contact Hours Certificate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-snug">{partnerBadge.includes("PMI") ? "PMI® Authorized Training Material" : "Official Authorized Training Material"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileCheck size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-snug">Mock Exams &amp; Quizzes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-snug">{courseAcronym} Exam Application Support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-snug">Resume &amp; LinkedIn Profile Support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <span className="leading-snug">Lifetime Access to Learning Management System</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">30-Day Money Back Guarantee</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column (3 of 12 = 25%): Course Details Box */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-5">
                <h4 className="text-base font-black text-brand-navy">Course Details</h4>

                <div className="space-y-4 text-xs font-bold text-gray-700">
                  <div className="flex items-start gap-3">
                    <Layers size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Level</p>
                      <p className="text-xs font-black text-slate-800">{currentCourse.level || "Intermediate"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Duration</p>
                      <p className="text-xs font-black text-slate-800">{currentCourse.duration || "4 Days (32-35 Hours)"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Contact Hours</p>
                      <p className="text-xs font-black text-slate-800">35 Hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">{courseAcronym} PDUs</p>
                      <p className="text-xs font-black text-slate-800">35 PDUs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText size={18} className="text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Exam</p>
                      <p className="text-xs font-black text-slate-800">{courseAcronym} Certification</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Delivery</p>
                      <p className="text-xs font-black text-slate-800">Self / Live Online / In-Person</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ---------------- TAB 2: EXAM & CERTIFICATION ---------------- */}
        {activeTab === "exam" && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-10 shadow-xs space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Official Examination Details</span>
              <h3 className="text-2xl font-black text-brand-navy">About the {courseAcronym} Certification Exam</h3>
              <p className="text-xs md:text-sm text-gray-600 font-medium max-w-3xl leading-relaxed">
                {currentCourse.exam_details || `${currentCourse.title} validates professional competence against global industry frameworks. Our bootcamp prepares you thoroughly for passing on your very first attempt.`}
              </p>
            </div>

            {/* Structured Exam Facts Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-black text-gray-400">Exam Format</span>
                <p className="text-xs font-black text-brand-navy">Computer-Based Test (CBT)</p>
                <p className="text-[11px] text-gray-500">Multiple choice &amp; scenario questions</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-black text-gray-400">Duration</span>
                <p className="text-xs font-black text-brand-navy">240 Minutes (4 Hours)</p>
                <p className="text-[11px] text-gray-500">Structured break periods included</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-black text-gray-400">Pass Guarantee</span>
                <p className="text-xs font-black text-emerald-600">100% Retake Support</p>
                <p className="text-[11px] text-gray-500">Free coaching until you pass</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-black text-gray-400">Certification Maintenance</span>
                <p className="text-xs font-black text-brand-navy">60 PDUs Every 3 Years</p>
                <p className="text-[11px] text-gray-500">Ongoing webinars &amp; course credits</p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: COURSE AGENDA & COHORTS ---------------- */}
        {activeTab === "agenda" && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-10 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Upcoming Live Cohorts</h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  Select your preferred dates to reserve your live seat with guaranteed-to-run schedules.
                </p>
              </div>

              <button
                onClick={() => openModal(`Custom Schedule Request - ${currentCourse.title}`)}
                className="text-xs font-bold text-brand-blue border border-brand-blue/30 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors w-fit cursor-pointer"
              >
                Request Custom Schedule
              </button>
            </div>

            {/* Schedules Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-black uppercase text-[10px] tracking-wider">
                    <th className="p-4">Batch Dates</th>
                    <th className="p-4">Timings</th>
                    <th className="p-4">Delivery Format</th>
                    <th className="p-4">Seats Left</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                  {courseSchedules.length > 0 ? (
                    courseSchedules.map((sch, sidx) => (
                      <tr key={sidx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 font-bold text-brand-navy">
                          {sch.batch_date || sch.date_range || sch.start_date || "Upcoming Live Cohort"}
                        </td>
                        <td className="p-4 text-gray-500">
                          {sch.time || "9:00 AM – 5:00 PM (EST)"}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-brand-blue">
                            <Video size={12} />
                            {sch.format || "Live Online Class"}
                          </span>
                        </td>
                        <td className="p-4 text-orange-600 font-bold">
                          {sch.seats_left || 4} Seats Available
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleEnrollSpecificBatch(sch)}
                            className="bg-brand-blue hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            Enroll Batch →
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-brand-navy">
                        {currentCourse.next_date || "May 27 – May 30, 2026"}
                      </td>
                      <td className="p-4 text-gray-500">9:00 AM – 5:00 PM (EST)</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-brand-blue">
                          <Video size={12} />
                          Live Online Class
                        </span>
                      </td>
                      <td className="p-4 text-orange-600 font-bold">4 Seats Left</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleEnrollSpecificBatch({
                            format: "Live Online Class",
                            batch_date: currentCourse.next_date || "May 27 – May 30, 2026",
                            time: "9:00 AM – 5:00 PM (EST)"
                          })}
                          className="bg-brand-blue hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Enroll Batch →
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </section>

      {/* ========================================================
          4. ADVISOR CONTACT BANNER ("Have Questions? Contact Us")
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 rounded-3xl border border-blue-100 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Agent Avatar + Headings */}
          <div className="flex items-center gap-4 text-left">
            <div className="relative shrink-0">
              <img
                src="/images/contact_support_agent.jpg"
                alt="Training Advisor"
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-blue shadow-md"
              />
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Online now" />
            </div>

            <div className="space-y-0.5">
              <p className="text-[11px] font-bold text-brand-blue uppercase tracking-wider">Have Questions?</p>
              <h3 className="text-xl font-black text-brand-navy">Contact Us</h3>
              <p className="text-xs text-gray-500 font-medium">
                Our training advisors are here to help you choose the right learning option.
              </p>
            </div>
          </div>

          {/* Contact Details & WhatsApp Button */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-end w-full lg:w-auto">
            
            {/* Phone */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-xs">
              <Phone size={18} className="text-brand-blue shrink-0" />
              <div className="text-left text-xs">
                <a href={`tel:${(siteSettings?.support_phone || "(888) 745-7575").replace(/[^0-9+]/g, '')}`} className="font-black text-brand-navy hover:text-brand-blue">
                  {siteSettings?.support_phone || "(888) 745-7575"}
                </a>
                <p className="text-[10px] text-gray-400 font-semibold">Mon – Fri, 9 AM – 6 PM (EST)</p>
              </div>
            </div>

            {/* Email */}
            <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-xs">
              <Mail size={18} className="text-brand-blue shrink-0" />
              <div className="text-left text-xs">
                <a href="mailto:sales@certificationplanner.com" className="font-black text-brand-navy hover:text-brand-blue">
                  sales@certificationplanner.com
                </a>
                <p className="text-[10px] text-gray-400 font-semibold">We typically reply within 1 hour</p>
              </div>
            </div>

            {/* WhatsApp CTA Button */}
            <a
              href={`https://wa.me/18887457575?text=Hi!%20I%20have%20questions%20about%20${encodeURIComponent(currentCourse.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>

          </div>

        </div>
      </section>

      {/* ========================================================
          5. FREQUENTLY ASKED QUESTIONS (2-COLUMN ACCORDION)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 md:px-6 space-y-8" id="faqs">
        
        {/* Header with Expand All Toggle */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Find quick answers to common questions about eligibility, format, pass guarantee, and PDUs.
            </p>
          </div>

          <button
            onClick={toggleAllFaqs}
            className="text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors cursor-pointer shrink-0"
          >
            {allFaqsExpanded ? "Collapse All <" : "Expand All >"}
          </button>
        </div>

        {/* 2-Column Accordion Layout */}
        <div className="grid md:grid-cols-2 gap-4 items-start">
          
          {/* Column 1 (Even FAQs) */}
          <div className="space-y-3">
            {courseFaqs.filter((_, idx) => idx % 2 === 0).map((faq, idx) => {
              const realIdx = idx * 2;
              const isOpen = !!expandedFaqs[realIdx];
              return (
                <div key={realIdx} className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(realIdx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-brand-navy hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-brand-navy pr-3 leading-snug">{faq.q}</span>
                    <span className="text-base text-gray-400 font-bold shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="bg-slate-50/50 p-4 sm:p-5 border-t border-gray-100 text-xs text-gray-600 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 (Odd FAQs) */}
          <div className="space-y-3">
            {courseFaqs.filter((_, idx) => idx % 2 !== 0).map((faq, idx) => {
              const realIdx = idx * 2 + 1;
              const isOpen = !!expandedFaqs[realIdx];
              return (
                <div key={realIdx} className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(realIdx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-brand-navy hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-brand-navy pr-3 leading-snug">{faq.q}</span>
                    <span className="text-base text-gray-400 font-bold shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="bg-slate-50/50 p-4 sm:p-5 border-t border-gray-100 text-xs text-gray-600 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* ========================================================
          6. GROUP OR CORPORATE TRAINING SECTION
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <div className="bg-white rounded-3xl border border-gray-200/90 p-8 md:p-12 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">Group or Corporate Training</h3>
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                Upskill your team with customized {currentCourse.title} training solutions designed for enterprise organizations.
              </p>
            </div>

            {/* Bullets with icons */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2 text-xs font-bold text-gray-700">
              <div className="flex items-center gap-2.5">
                <Users size={16} className="text-brand-blue shrink-0" />
                <span>Customized Training Programs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 size={16} className="text-brand-blue shrink-0" />
                <span>Onsite / Online / Blended Options</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-brand-orange shrink-0" />
                <span>Group Discounts &amp; Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award size={16} className="text-brand-blue shrink-0" />
                <span>Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCheck size={16} className="text-emerald-500 shrink-0" />
                <span>Detailed Reports &amp; Assessments</span>
              </div>
            </div>
          </div>

          {/* Right: Client Logos & Corporate CTA */}
          <div className="lg:col-span-5 bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-100 text-center space-y-6">
            <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              Trusted by Organizations Worldwide
            </p>

            {/* Enterprise Client Logos */}
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center opacity-80">
              <span className="font-black text-slate-800 text-sm tracking-tight">Deloitte.</span>
              <span className="font-black text-blue-700 text-base tracking-widest font-mono">IBM</span>
              <span className="font-black text-blue-600 text-base tracking-tight">citi</span>
              <span className="font-bold text-slate-700 text-xs">amazon</span>
              <span className="font-bold text-slate-700 text-xs">Microsoft</span>
              <span className="font-bold text-slate-800 text-xs">accenture</span>
            </div>

            <Link
              href="/corporate-training/"
              className="inline-block w-full rounded-xl bg-brand-blue hover:bg-blue-700 py-3.5 px-6 font-bold text-white text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
            >
              Request Corporate Training
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          7. GLOBAL STATS RIBBON
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:px-6">
        <div className="rounded-2xl border border-gray-100 bg-white py-6 px-6 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1.5 text-brand-navy font-black text-lg sm:text-xl">
              <Users size={18} className="text-brand-blue" />
              <span>50,000+</span>
            </div>
            <p className="text-[11px] text-gray-400 font-bold">Professionals Trained</p>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1.5 text-brand-navy font-black text-lg sm:text-xl">
              <Star size={18} className="text-amber-400 fill-amber-400" />
              <span>4.8/5</span>
            </div>
            <p className="text-[11px] text-gray-400 font-bold">Based on 1,500+ Reviews</p>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1.5 text-brand-navy font-black text-lg sm:text-xl">
              <Globe size={18} className="text-brand-blue" />
              <span>100+</span>
            </div>
            <p className="text-[11px] text-gray-400 font-bold">Countries Worldwide</p>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1.5 text-brand-navy font-black text-lg sm:text-xl">
              <Award size={18} className="text-brand-blue" />
              <span>20+ Years</span>
            </div>
            <p className="text-[11px] text-gray-400 font-bold">Of Training Excellence</p>
          </div>

          <div className="space-y-0.5 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-black text-lg sm:text-xl">
              <Shield size={18} className="text-emerald-500" />
              <span>100%</span>
            </div>
            <p className="text-[11px] text-gray-400 font-bold">Pass Support</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. PRE-FOOTER CTA ("Ready to Advance Your Career?")
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <div className="bg-brand-navy rounded-3xl p-8 md:p-14 text-white relative overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to Advance Your Career?
            </h3>
            <p className="text-xs md:text-sm text-blue-200 font-medium">
              Join thousands of professionals who are achieving more with {currentCourse.title}.
            </p>
          </div>

          {/* 3 Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center pt-2">
            <button
              onClick={() => handleEnrollFormat("Live Online Class", livePrice)}
              className="w-full sm:w-auto rounded-xl bg-[#ff5c00] hover:bg-[#e05200] px-8 py-3.5 font-bold text-white text-xs shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Enroll Now
            </button>

            <button
              onClick={() => openModal(`Talk to an Advisor - ${currentCourse.title}`)}
              className="w-full sm:w-auto rounded-xl border border-white/25 hover:bg-white/10 px-8 py-3.5 font-bold text-white text-xs transition-colors cursor-pointer"
            >
              Talk to an Advisor
            </button>

            <a
              href={`https://wa.me/18887457575?text=Hi!%20I%20want%20to%20learn%20more%20about%20${encodeURIComponent(currentCourse.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-xl border border-emerald-400/40 hover:bg-emerald-500/20 text-emerald-300 px-6 py-3.5 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle size={15} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Bottom Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10 text-[11px] text-blue-200/80 font-bold">
            <span className="flex items-center gap-1.5"><Shield size={13} className="text-emerald-400" /> 100% Pass Support</span>
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-emerald-400" /> 30-Day Money Back</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-400" /> Secure Payment</span>
            <span className="flex items-center gap-1.5"><Laptop size={13} className="text-emerald-400" /> Lifetime Access</span>
          </div>

        </div>
      </section>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
