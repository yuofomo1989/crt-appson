"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Shield, BookOpen, Clock, Calendar, CheckCircle2, ChevronDown, Download, Phone, Play, ShieldAlert, Award, FileText, Check, HelpCircle, GraduationCap, Users, Globe, Building2, TrendingUp, Sparkles } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

export default function CourseDetailsClient({ course, schedules = [] }) {
  const [selectedFormat, setSelectedFormat] = useState("Live Online");
  const [activeModule, setActiveModule] = useState(0);
  const [brochuresList, setBrochuresList] = useState([]);

  const [testimonialsList, setTestimonialsList] = useState([]);
  const [dbInstructors, setDbInstructors] = useState([]);

  React.useEffect(() => {
    async function fetchCourseData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const [bRes, tRes, iRes] = await Promise.all([
          fetch(`${apiUrl}/brochures`),
          fetch(`${apiUrl}/testimonials?page=${encodeURIComponent(course?.slug || 'pmp-certification')}`),
          fetch(`${apiUrl}/instructors?course_id=${encodeURIComponent(course?.id || 1)}`)
        ]);
        const bData = await bRes.json();
        const tData = await tRes.json();
        const iData = await iRes.json();

        if (bData.status === "success" && Array.isArray(bData.data)) {
          const matched = bData.data.filter(b => 
            (b.course_id && b.course_id === course?.id) || 
            (b.course_title && (course?.title || "").toLowerCase().includes(b.course_title.toLowerCase()))
          );
          setBrochuresList(matched.length > 0 ? matched : bData.data.slice(0, 2));
        }

        if (tData.status === "success" && Array.isArray(tData.data)) {
          setTestimonialsList(tData.data);
        }

        if (iData.status === "success" && Array.isArray(iData.data)) {
          setDbInstructors(iData.data);
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      }
    }
    fetchCourseData();
  }, [course]);

  // Fallback defaults if null
  const currentCourse = course || {
    title: "PMP® Certification Training",
    category_name: "Project Management",
    rating: 4.9,
    reviews_count: 1420,
    price: 1095,
    original_price: 1495,
    description: "Master the PMBOK® Guide 7th Edition and pass your PMP exam on the first attempt with 35 hours approved bootcamp.",
    brochure_pdf: "",
    learning_experience: {
      title: "Interactive Learning Experience",
      video_url: "https://www.youtube.com/embed/8fct8mFy2cc"
    },
    faqs: []
  };

  // Filter schedules matching this course or title
  const courseSchedules = schedules.filter(
    s => s.course_id === currentCourse.id || (s.course_title || "").toLowerCase().includes((currentCourse.title || "").toLowerCase())
  );

  const activePrice = currentCourse.price || 1095;

  const getAdjustedPrice = () => {
    if (selectedFormat === "Self-Learning") return Math.max(0, activePrice - 200);
    if (selectedFormat === "In-Person") return activePrice + 300;
    return activePrice;
  };

  const defaultCurriculum = [
    { title: "Module 1: People", lessons: ["Project team management", "Conflict resolution", "Leadership models", "Empowering team members"], hours: "3.5 Hours", count: "6 Lessons" },
    { title: "Module 2: Process", lessons: ["Risk management plans", "Scope & schedule baselines", "Quality standards", "Procurement & integration"], hours: "3.5 Hours", count: "6 Lessons" },
    { title: "Module 3: Business Environment", lessons: ["Organizational compliance", "Business value delivery", "Change management strategies", "Continuous improvement"], hours: "2.5 Hours", count: "4 Lessons" },
    { title: "Module 4: Practice Exams", lessons: ["Full-length mock test review", "Exam application guidance", "Tricky questions analysis"], hours: "5 Full Length Tests", count: "5 Tests" },
    { title: "Bonus: Agile & Hybrid Project Management", lessons: ["Agile manifesto principles", "Scrum ceremonies & sprints", "Kanban boards"], hours: "2 Hours", count: "3 Lessons" }
  ];

  const curriculumList = (currentCourse.curriculum && currentCourse.curriculum.length > 0) 
    ? currentCourse.curriculum 
    : defaultCurriculum;

  const courseFaqs = (currentCourse.faqs && Array.isArray(currentCourse.faqs) && currentCourse.faqs.length > 0)
    ? currentCourse.faqs
    : [
        { q: "What are the prerequisites for this bootcamp?", a: "There are no strict prerequisites. Basic domain understanding or project experience is recommended." },
        { q: "What is included in the course tuition fee?", a: "Tuition includes live instructor training, official study guides, mock exams, and lifetime LMS access." },
        { q: "What if I fail the PMP exam on my first attempt?", a: "We provide 100% Pass Guarantee with free exam retake assistance and dedicated instructor coaching until you pass!" }
      ];

  // Helper function to safely parse array/JSON fields
  const parseJsonField = (val, fallback = []) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val.length > 0 ? val : fallback;
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  const parseObjectField = (val, fallback = {}) => {
    if (!val) return fallback;
    if (typeof val === "object" && !Array.isArray(val)) return { ...fallback, ...val };
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        return typeof parsed === "object" ? { ...fallback, ...parsed } : fallback;
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  // Helper function to safely convert any YouTube/Vimeo/Shorts link to an embed URL
  const formatVideoEmbedUrl = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== "string") return "";
    let clean = rawUrl.trim();

    // 1. If full iframe tag was pasted, extract src
    if (clean.includes("<iframe") && clean.includes("src=")) {
      const match = clean.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) clean = match[1];
    }

    // 2. Already an embed URL
    if (clean.includes("youtube.com/embed/")) {
      return clean;
    }

    // 3. youtu.be/VIDEO_ID
    const youtuBeMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i);
    if (youtuBeMatch && youtuBeMatch[1]) {
      return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
    }

    // 4. youtube.com/watch?v=VIDEO_ID or youtube.com/v/VIDEO_ID
    const ytWatchMatch = clean.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|v\/))([a-zA-Z0-9_-]+)/i);
    if (ytWatchMatch && ytWatchMatch[1]) {
      return `https://www.youtube.com/embed/${ytWatchMatch[1]}`;
    }

    // 5. youtube.com/shorts/VIDEO_ID
    const ytShortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
    if (ytShortsMatch && ytShortsMatch[1]) {
      return `https://www.youtube.com/embed/${ytShortsMatch[1]}`;
    }

    // 6. Vimeo support: vimeo.com/VIDEO_ID
    const vimeoMatch = clean.match(/vimeo\.com\/([0-9]+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return clean;
  };

  // Section Visibility Defaults
  const secVis = parseObjectField(currentCourse.section_visibility, {
    who_should_take: true,
    impact_stats: true,
    curriculum: true,
    learning_experience: true,
    roadmap: true,
    success_stories: true,
    instructors: true,
    pre_footer: true,
    faqs: true
  });

  // Dynamic Data Lists with Safe Parsing & Fallback Defaults
  const whoShouldTakeList = parseJsonField(currentCourse.who_should_take, [
    { title: "Project Managers", desc: "Looking to validate their skills and advance" },
    { title: "Team Leads", desc: "Ready to step-up into leadership roles" },
    { title: "IT Professionals", desc: "Managing projects and cross-functional teams" },
    { title: "Scrum Masters", desc: "Wanting to expand their career opportunities" },
    { title: "Program Managers", desc: "Overseeing multiple projects and programs" },
    { title: "Consultants", desc: "Advising organizations on project success" }
  ]);

  const impactStatsList = parseJsonField(currentCourse.impact_stats, [
    { value: "17%", label: "Higher Salary Potential" },
    { value: "1.7M+", label: "PMP® Holders Worldwide" },
    { value: "Global", label: "Recognition Across 200+ Countries" },
    { value: "High", label: "Demand Skill Across Industries" }
  ]);

  const roadmapStepsList = parseJsonField(currentCourse.roadmap_steps, [
    { step: "1", title: "Enroll & Get Access", desc: "Access LMS, study materials & resources" },
    { step: "2", title: "Attend Live Classes", desc: "Learn from experts & participate actively" },
    { step: "3", title: "Practice & Assess", desc: "Take mock tests & quizzes regularly" },
    { step: "4", title: "Apply for PMP® Exam", desc: "Get support for your exam application" },
    { step: "5", title: "Pass PMP® Exam", desc: "Clear the exam with confidence" },
    { step: "6", title: "Get Certified & Grow", desc: "Advance your career to the next level!" }
  ]);

  const hiringCompaniesList = parseJsonField(currentCourse.hiring_companies, [
    { name: "amazon" }, { name: "Deloitte." }, { name: "citi" }, { name: "IBM" },
    { name: "accenture" }, { name: "Google" }, { name: "Microsoft" }
  ]);

  const fallbackInstructors = [
    { name: "Andrew Ramdayal", certs: "PMP, PMI-ACP", exp_years: "15+ Yrs Exp", rating: 4.9, students_count: 320, bio: "Top-rated PMP author and trainer who has guided over 100,000 students to exam success.", image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" },
    { name: "William R.", certs: "PMP, PgMP", exp_years: "18+ Yrs Exp", rating: 4.9, students_count: 280, bio: "Senior Program Manager and PMI chapter contributor specializing in Agile transformations.", image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
    { name: "Joseph Phillips", certs: "PMP, CSM", exp_years: "20+ Yrs Exp", rating: 4.8, students_count: 450, bio: "Best-selling PMP prep instructor with extensive expertise in PMBOK guide standards.", image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" },
    { name: "Swetha R.", certs: "PMP, PMI-RMP", exp_years: "12+ Yrs Exp", rating: 4.9, students_count: 210, bio: "Certified Risk Management Professional with passion for practical project management methodologies.", image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" }
  ];

  const instructorsList = (dbInstructors && dbInstructors.length > 0)
    ? dbInstructors
    : parseJsonField(currentCourse.instructors, fallbackInstructors);

  const ctaData = parseObjectField(currentCourse.pre_footer_cta, {
    title: "Ready to Advance Your Career?",
    subtitle: `Join thousands of professionals who are achieving more with ${currentCourse.title || "PMP® certification"}.`,
    btn1_text: "Enroll Now",
    btn1_action: "open_modal",
    btn1_url: "",
    btn2_text: "Talk to an Advisor",
    btn2_action: "open_consultation_modal",
    btn2_phone: "+18887457575",
    btn2_url: "",
    btn3_text: "Chat on WhatsApp",
    btn3_action: "whatsapp",
    btn3_whatsapp: "18887457575",
    trust_features: ["100% Pass Support", "30-Day Money Back", "Secure Payment", "Lifetime Access"]
  });

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      {/* ==========================================
          1. HERO SECTION & PRICING CONTAINER
          ========================================== */}
      <section className="bg-[#f4f7fa] border-b border-gray-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="text-[11px] text-gray-400 font-bold mb-6 flex gap-2">
            <span className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
            <span className="hover:text-brand-blue cursor-pointer">Certifications</span> &gt; 
            <span className="hover:text-brand-blue cursor-pointer">{currentCourse.category_name || currentCourse.category || "Agile & Project Management"}</span> &gt; 
            <span className="text-gray-600 font-black">{currentCourse.title}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Hero */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-block bg-[#FFF4EC] text-brand-orange text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md border border-[#FFE2CD]">
                #1 Project Management Certification Worldwide
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-brand-navy leading-[1.15] tracking-tight">
                Become a PMP® Certified Project Leader.
              </h1>
              <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed max-w-2xl">
                {currentCourse.description || "Master the PMBOK® Guide 7th Edition and pass your PMP exam on the first attempt with 35 hours approved bootcamp."}
              </p>

              {/* Ratings and Stats Bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs font-bold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400" fill="currentColor" />
                  <span>4.9/5 <span className="text-gray-400 font-medium">(1420 Reviews)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-blue font-black uppercase tracking-wide">PMI®</span>
                  <span className="text-gray-400 font-medium">Authorized Partner</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>50,000+ <span className="text-gray-400 font-medium">Professionals Trained</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <span>100% <span className="text-gray-400 font-medium">Pass Support</span></span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const isSubpath = typeof window !== "undefined" && window.location.pathname.includes('/crt-appson');
                    const basePath = isSubpath ? '/crt-appson' : '';
                    window.location.href = `${basePath}/enroll/?course=${encodeURIComponent(currentCourse.title)}`;
                  }}
                  className="rounded-xl bg-[#ff5c00] hover:bg-[#e05200] px-8 py-4 font-bold text-white text-xs shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Enroll Now →
                </button>

                {brochuresList.length > 0 ? (
                  <a
                    href={brochuresList[0].file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-brand-blue/20 bg-white text-brand-blue hover:bg-slate-50 px-6 py-4 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Download Syllabus
                  </a>
                ) : (
                  <button
                    onClick={() => openModal(`Download ${currentCourse.title} Syllabus PDF`)}
                    className="rounded-xl border border-brand-blue/20 bg-white text-brand-blue hover:bg-slate-50 px-6 py-4 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Download Syllabus
                  </button>
                )}

                <button
                  onClick={() => openModal("Talk to an Advisor")}
                  className="rounded-xl border border-brand-blue/20 bg-white text-brand-blue hover:bg-slate-50 px-6 py-4 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone size={14} /> Talk to an Advisor
                </button>
              </div>

              {/* Bottom features bar */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200/60 text-[11px] font-bold text-gray-500">
                <span className="flex items-center gap-1.5 text-brand-green">✔ 35 Contact Hours</span>
                <span className="flex items-center gap-1.5 text-brand-green">✔ PMI® Authorized Content</span>
                <span className="flex items-center gap-1.5 text-brand-green">✔ Lifetime LMS Access</span>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4" id="enroll-sidebar">
              <div className="rounded-3xl border border-gray-100 p-6 md:p-8 bg-white shadow-xl space-y-6 sticky top-24">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded font-black">Limited Seats</span>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-4xl font-black text-brand-navy">${getAdjustedPrice()}</span>
                      <span className="text-xs font-bold text-gray-400">USD</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1">or 3 interest-free payments of $365 with <strong className="text-slate-700">affirm</strong></p>
                  </div>
                </div>

                {/* Upcoming Live Schedules List */}
                <div className="border-t border-b border-gray-50 py-4 space-y-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Next Batch (Live Online)</p>
                  
                  {courseSchedules.length > 0 ? (
                    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-gray-100">
                      <Calendar size={18} className="text-brand-blue shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-xs font-bold text-gray-700">
                        <p>{courseSchedules[0].batch_date || courseSchedules[0].date_range || courseSchedules[0].start_date || "Aug 26 - Aug 29, 2026"}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{courseSchedules[0].time || "9:00 AM – 5:00 PM (EST)"}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-gray-100">
                      <Calendar size={18} className="text-brand-blue shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-xs font-bold text-gray-700">
                        <p>{currentCourse.next_date || "Upcoming Live Batch"}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">9:00 AM – 5:00 PM (EST)</p>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-orange-600 font-extrabold flex items-center gap-1.5 pt-1">
                    ⚡ Only {courseSchedules.length > 0 && courseSchedules[0].seats_left ? courseSchedules[0].seats_left : 8} Seats Left!
                  </p>
                </div>

                <button
                  onClick={() => {
                    const isSubpath = typeof window !== "undefined" && window.location.pathname.includes('/crt-appson');
                    const basePath = isSubpath ? '/crt-appson' : '';
                    window.location.href = `${basePath}/enroll/?course=${encodeURIComponent(currentCourse.title)}&format=${encodeURIComponent(selectedFormat)}`;
                  }}
                  className="w-full block text-center rounded-xl bg-[#ff5c00] hover:bg-[#e05200] py-4 font-bold text-white text-xs transition-colors cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  Enroll Now
                </button>

                <div className="space-y-2 pt-2 text-[10px] text-gray-400 font-bold border-t border-gray-50 text-center">
                  <p className="flex items-center justify-center gap-1.5">🛡 30-Day Money Back Guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          2. FEATURE ICONS ROW (35 Contact Hours, 4-Day Training, etc.)
          ========================================== */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
          {[
            { icon: <Clock size={20} />, label: "35", sub: "Contact Hours" },
            { icon: <Calendar size={20} />, label: "4-Day", sub: "Live Training" },
            { icon: <BookOpen size={20} />, label: "Lifetime", sub: "LMS Access" },
            { icon: <FileText size={20} />, label: "Mock Exams", sub: "& Quizzes" },
            { icon: <GraduationCap size={20} />, label: "Exam Application", sub: "Support" },
            { icon: <Shield size={20} />, label: "Pass Guarantee", sub: "We've Got Your Back" },
            { icon: <Award size={20} />, label: "Resume & LinkedIn", sub: "Profile Support" },
            { icon: <Globe size={20} />, label: "Mobile App", sub: "Access" }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1 p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="h-10 w-10 mx-auto rounded-full bg-blue-50 text-brand-blue flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-xs font-black text-brand-navy">{item.label}</p>
              <p className="text-[10px] text-gray-400 font-bold leading-tight">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          3. WHO SHOULD TAKE THIS COURSE?
          ========================================== */}
      {secVis.who_should_take !== false && (
        <section className="max-w-7xl mx-auto px-4 py-16 md:px-6 space-y-10 border-t border-gray-100">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">Who Should Take This Course?</h2>
            <p className="text-xs md:text-sm text-gray-500 font-semibold">This course is ideal for professionals who want to grow their career and lead projects successfully.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {whoShouldTakeList.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 text-center space-y-2 shadow-xs hover:shadow-md transition-shadow">
                <div className="h-10 w-10 mx-auto rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold">👤</div>
                <h4 className="text-xs font-black text-brand-navy">{item.title}</h4>
                <p className="text-[10px] text-gray-400 font-semibold leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==========================================
          4. THE PMP® IMPACT (DARK NAVY BANNER & HIRING PARTNERS)
          ========================================== */}
      {secVis.impact_stats !== false && (
        <section className="bg-[#0b172a] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">The {currentCourse.title} Impact</h2>
              <p className="text-xs text-slate-400 font-semibold">A globally recognized certification that transforms your career.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {impactStatsList.map((st, sidx) => (
                  <div key={sidx} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
                    <p className="text-2xl font-black text-brand-orange">{st.value}</p>
                    <p className="text-xs font-bold text-slate-200">{st.label}</p>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 space-y-4 text-center">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Top Hiring Companies</p>
                <div className="grid grid-cols-4 gap-3 text-xs font-extrabold text-slate-300">
                  {hiringCompaniesList.map((comp, cidx) => (
                    <span key={cidx} className="py-2 px-1 border border-slate-800 rounded-xl bg-slate-950 truncate" title={comp.name || comp}>
                      {comp.name || comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          5. COURSE CURRICULUM & LEARNING EXPERIENCE SPLIT
          ========================================== */}
      {(secVis.curriculum !== false || secVis.learning_experience !== false) && (
        <section className="max-w-7xl mx-auto px-4 py-16 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {secVis.curriculum !== false && (
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-brand-navy">Course Curriculum</h3>
                  <p className="text-xs text-gray-400 font-bold">Aligned with latest exam objectives</p>
                </div>
                <div className="space-y-3">
                  {curriculumList.map((module, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-xs">
                      <button
                        onClick={() => setActiveModule(activeModule === idx ? -1 : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-brand-navy hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs md:text-sm font-extrabold">{module.title}</span>
                        <span className="text-base text-gray-400 font-medium">{activeModule === idx ? "−" : "+"}</span>
                      </button>
                      {activeModule === idx && (
                        <div className="bg-slate-50/30 p-5 border-t border-gray-50 text-xs md:text-sm text-gray-600 space-y-3">
                          {(module.lessons || []).map((lesson, lidx) => (
                            <div key={lidx} className="flex items-start gap-2 pl-2">
                              <span className="text-brand-blue font-bold mr-2 text-xs">{idx + 1}.{lidx + 1}</span>
                              <span className="font-semibold text-gray-700 text-xs">{lesson}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {secVis.learning_experience !== false && (
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-brand-navy">{currentCourse.learning_experience?.title || "Learning Experience"}</h3>
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-64 flex items-center justify-center">
                    {formatVideoEmbedUrl(currentCourse.learning_experience?.video_url) ? (
                      <iframe
                        src={formatVideoEmbedUrl(currentCourse.learning_experience.video_url)}
                        className="w-full h-full rounded-2xl"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        title={currentCourse.learning_experience?.title || "Demo Video"}
                      ></iframe>
                    ) : (
                      <Play size={48} className="text-white opacity-90 cursor-pointer hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-[11px] font-bold text-gray-600">
                    <div className="p-3 bg-slate-50 rounded-xl">Interactive Live Classes</div>
                    <div className="p-3 bg-slate-50 rounded-xl">Real-Time Doubt Solving</div>
                    <div className="p-3 bg-slate-50 rounded-xl">Engaging Case Studies</div>
                    <div className="p-3 bg-slate-50 rounded-xl">Peer Learning &amp; Discussions</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ==========================================
          6. YOUR CERTIFICATION ROADMAP (6 STEPS)
          ========================================== */}
      {secVis.roadmap !== false && (
        <section className="bg-slate-50/60 py-16 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">Your Certification Roadmap</h2>
              <p className="text-xs md:text-sm text-gray-500 font-semibold">A simple path to get you certified and career-ready.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {roadmapStepsList.map((st, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 text-center space-y-2 shadow-xs relative">
                  <span className="h-7 w-7 mx-auto rounded-full bg-blue-50 text-brand-blue font-black text-xs flex items-center justify-center">{st.step || (idx + 1)}</span>
                  <h4 className="text-xs font-black text-brand-navy">{st.title}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold leading-tight">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {secVis.success_stories !== false && testimonialsList.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16 md:px-6 space-y-10">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-brand-navy">Success Stories</h2>
              <p className="text-xs text-gray-400 font-semibold">Real people. Real results.</p>
            </div>
            <button className="text-xs font-bold text-brand-blue hover:underline">View All Stories →</button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {testimonialsList.slice(0, 3).map((item, tidx) => (
              <div key={tidx} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-brand-blue text-xs">
                    {item.name ? item.name.charAt(0) : "S"}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">{item.cert || "Certified Professional"}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-medium">"{item.quote}"</p>
                <span className="inline-block bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.5 rounded">
                  {item.badge || "Career Growth"}
                </span>
              </div>
            ))}

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 text-center flex flex-col justify-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Trusted by</p>
              <p className="text-2xl font-black text-brand-orange">50,000+</p>
              <p className="text-xs font-bold text-slate-200">Professionals</p>
              <div className="flex items-center justify-center gap-1 text-amber-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold">4.8/5 Based on 1500+ reviews</p>
            </div>
          </div>
        </section>
      )}

      {secVis.instructors !== false && instructorsList.length > 0 && (
        <section className="bg-slate-50/70 py-16 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">Learn From Industry Experts</h2>
              <p className="text-xs md:text-sm text-gray-500 font-semibold">
                Our certified master instructors bring decades of real-world enterprise experience to help you pass on your first attempt.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructorsList.map((inst, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-brand-blue to-blue-700 text-white font-black text-lg flex items-center justify-center border-2 border-white shadow-xs shrink-0 overflow-hidden">
                      {inst.image_url ? (
                        <img src={inst.image_url} alt={inst.name} className="h-full w-full object-cover" />
                      ) : (
                        inst.name ? inst.name.split(' ').map(n => n[0]).join('') : 'EX'
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-brand-navy">{inst.name}</h3>
                      <p className="text-[11px] text-brand-blue font-bold">{inst.certs}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{inst.exp_years || inst.exp || "10+ Yrs Exp"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-slate-50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-brand-navy">{inst.rating || 4.9}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 text-[11px] font-medium">{inst.students_count || inst.reviews || 250}+ Students Taught</span>
                  </div>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    "{inst.bio || "Enterprise trainer with proven track record in leading high-impact certification bootcamps."}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {secVis.pre_footer !== false && (
        <section className="max-w-7xl mx-auto px-4 py-8 md:px-6">
          <div className="bg-brand-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl md:text-3xl font-extrabold">{ctaData.title || "Ready to Advance Your Career?"}</h3>
              <p className="text-xs text-blue-200 font-semibold max-w-lg mx-auto">
                {ctaData.subtitle || `Join thousands of professionals who are achieving more with ${currentCourse.title || "PMP® certification"}.`}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {/* Button 1 (Orange Enroll) */}
              <button
                onClick={() => {
                  if (ctaData.btn1_action === 'custom_url' && ctaData.btn1_url) {
                    window.location.href = ctaData.btn1_url;
                  } else {
                    openModal(`Enroll in ${currentCourse.title}`);
                  }
                }}
                className="w-full sm:w-auto text-center rounded-xl bg-[#ff5c00] px-8 py-3.5 font-bold text-white text-xs transition-colors hover:bg-[#e05200] cursor-pointer"
              >
                {ctaData.btn1_text || "Enroll Now"}
              </button>

              {/* Button 2 (Advisor / Call / Link) */}
              <button
                onClick={() => {
                  if (ctaData.btn2_action === 'phone_call' && (ctaData.btn2_phone || ctaData.btn2_url)) {
                    window.location.href = `tel:${(ctaData.btn2_phone || ctaData.btn2_url).replace(/[^0-9+]/g, '')}`;
                  } else if (ctaData.btn2_action === 'custom_url' && ctaData.btn2_url) {
                    window.location.href = ctaData.btn2_url;
                  } else {
                    openModal("Talk to an Advisor");
                  }
                }}
                className="w-full sm:w-auto rounded-xl border border-white/20 hover:bg-white/5 px-8 py-3.5 font-bold text-white text-xs cursor-pointer"
              >
                {ctaData.btn2_text || "Talk to an Advisor"}
              </button>

              {/* Button 3 (WhatsApp Chat) */}
              <a
                href={`https://wa.me/${(ctaData.btn3_whatsapp || "18887457575").replace(/[^0-9]/g, '')}?text=Hi!%20I%20want%20to%20learn%20more%20about%20${encodeURIComponent(currentCourse.title || "PMP Certification")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 px-8 py-3.5 font-bold text-white text-xs flex items-center justify-center gap-1.5"
              >
                <span>{ctaData.btn3_text || "Chat on WhatsApp"}</span>
              </a>
            </div>

            {/* Trust Features Bullets */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5 text-[10px] text-blue-200/80 font-bold">
              {(ctaData.trust_features || ["100% Pass Support", "30-Day Money Back", "Secure Payment", "Lifetime Access"]).map((feat, idx) => (
                <span key={idx}>✔ {feat}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
