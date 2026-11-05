"use client";

import React, { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  Phone,
  Play,
  Award,
  GraduationCap,
  Users,
  Globe,
  MapPin,
  RefreshCw,
  ShoppingCart,
  Headphones,
  Search,
  Laptop,
  Building2,
  ArrowRight,
  ChevronRight,
  BarChart3,
  CreditCard,
  Infinity as InfinityIcon
} from "lucide-react";

import initialCourses from "@/data/courses_db.json";
import initialSchedules from "@/data/schedules_db.json";
import initialSiteSettings from "@/data/site_settings_db.json";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

function EnrollContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [selectedDateRange, setSelectedDateRange] = useState("All Dates");
  const [activeTab, setActiveTab] = useState("live"); // "live" | "self" | "inperson"
  const [showAllLive, setShowAllLive] = useState(false);
  const [showAllInPerson, setShowAllInPerson] = useState(false);

  const [coursesList, setCoursesList] = useState(initialCourses || []);
  const [dbSchedules, setDbSchedules] = useState(initialSchedules || []);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings || {});

  useEffect(() => {
    const urlCourse = searchParams.get("course");
    if (urlCourse) {
      setSelectedCourse(urlCourse);
    }
    const urlFormat = searchParams.get("format");
    if (urlFormat) {
      const fmt = urlFormat.toLowerCase();
      if (fmt.includes("self") || fmt.includes("paced")) {
        setActiveTab("self");
        setTimeout(() => scrollToSection("self-learning-section"), 400);
      } else if (fmt.includes("person") || fmt.includes("classroom")) {
        setActiveTab("inperson");
        setTimeout(() => scrollToSection("in-person-section"), 400);
      } else if (fmt.includes("online") || fmt.includes("virtual")) {
        setActiveTab("live");
        setTimeout(() => scrollToSection("live-online-section"), 400);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      try {
        const [sRes, cRes, setRes] = await Promise.all([
          fetch(`${apiUrl}/schedules`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/courses`).then(r => r.json()).catch(() => ({})),
          fetch(`${apiUrl}/settings/`).then(r => r.json()).catch(() => null)
        ]);

        if (sRes && sRes.status === "success" && Array.isArray(sRes.data) && sRes.data.length > 0) {
          setDbSchedules(sRes.data);
        }
        if (cRes && cRes.status === "success" && Array.isArray(cRes.data) && cRes.data.length > 0) {
          setCoursesList(cRes.data);
        }
        if (setRes && setRes.status === "success" && setRes.data) {
          setSiteSettings(setRes.data);
        }
      } catch (err) {
        // Fallback to preloaded data
      }
    };
    fetchData();
  }, []);

  const getAcronym = (title = "") => {
    const t = title.toUpperCase();
    if (t.includes("PMP")) return "PMP®";
    if (t.includes("CAPM")) return "CAPM®";
    if (t.includes("GREEN BELT")) return "LSSGB®";
    if (t.includes("BLACK BELT")) return "LSSBB®";
    if (t.includes("PMI-ACP") || t.includes("PMI ACP")) return "PMI-ACP®";
    if (t.includes("CISSP")) return "CISSP®";
    if (t.includes("CISA")) return "CISA®";
    if (t.includes("CISM")) return "CISM®";
    if (t.includes("ITIL")) return "ITIL® 4";
    if (t.includes("PGMP")) return "PgMP®";
    if (t.includes("CBAP")) return "CBAP®";
    if (t.includes("DEVOPS")) return "DevOps";
    if (t.includes("SALESFORCE")) return "SFDC";
    return title.split(" ")[0] || "CERT";
  };

  // Dynamic schedule filtering
  const filteredSchedules = React.useMemo(() => {
    return dbSchedules.filter((s) => {
      const matchCourse =
        !selectedCourse ||
        selectedCourse === "All Courses" ||
        (s.course_title &&
          (s.course_title.toLowerCase().trim() === selectedCourse.toLowerCase().trim() ||
            selectedCourse.toLowerCase().includes(s.course_title.toLowerCase().trim()) ||
            s.course_title.toLowerCase().includes(selectedCourse.toLowerCase().trim())));

      const isOnlineFormat =
        !s.format ||
        s.format.toLowerCase().includes("online") ||
        s.format.toLowerCase().includes("virtual");

      const matchCountry =
        !selectedCountry ||
        selectedCountry === "All Countries" ||
        isOnlineFormat ||
        (s.country && s.country.toLowerCase().trim() === selectedCountry.toLowerCase().trim());

      const matchCity =
        !selectedCity ||
        selectedCity === "All Cities" ||
        isOnlineFormat ||
        (s.city && s.city.toLowerCase().includes(selectedCity.split(",")[0].toLowerCase().trim()));

      return matchCourse && matchCountry && matchCity;
    });
  }, [dbSchedules, selectedCourse, selectedCountry, selectedCity]);

  // Distinct Live Online classes (prioritizing PMP, CAPM, LSSGB, CISSP, PMI-ACP, etc. so variety is shown by default)
  const liveOnlineList = React.useMemo(() => {
    const rawOnline = filteredSchedules.filter((s) => {
      if (!s.format) return true;
      const fmt = s.format.toLowerCase();
      return fmt.includes("online") || fmt.includes("virtual");
    });

    if (selectedCourse !== "All Courses") {
      return rawOnline;
    }

    // Group distinct courses first so top rows match Reference Image 4 (PMP®, CAPM®, LSSGB®, etc.)
    const priorityKeywords = ["pmp certification", "capm", "green belt", "cissp", "pmi agile", "itil", "cisa", "devops", "salesforce", "pgmp", "cbap", "project+"];
    const picked = [];
    const usedIds = new Set();

    for (const kw of priorityKeywords) {
      const found = rawOnline.find(
        (s) => !usedIds.has(s.id) && (s.course_title || "").toLowerCase().includes(kw) && !(s.course_title || "").toLowerCase().includes("plus")
      );
      if (found) {
        usedIds.add(found.id);
        picked.push(found);
      }
    }

    for (const s of rawOnline) {
      if (picked.length >= 12) break;
      if (!usedIds.has(s.id)) {
        usedIds.add(s.id);
        picked.push(s);
      }
    }

    return picked;
  }, [filteredSchedules, selectedCourse]);

  // In-Person Classroom classes
  const inPersonList = React.useMemo(() => {
    const rawInPerson = filteredSchedules.filter((s) => {
      if (!s.format) return false;
      const fmt = s.format.toLowerCase();
      return fmt.includes("person") || (fmt.includes("classroom") && !fmt.includes("online"));
    });

    if (rawInPerson.length > 0) return rawInPerson;

    // Fallback curated In-Person batches matching Reference Image 4 if filter returns none
    return [
      {
        id: "ip-1",
        course_title: "PMP® Certification Training",
        subtitle: "Classroom Training – New York, NY",
        city: "New York, NY",
        venue: "Midtown Training Center",
        date_range: "Nov 03 – Nov 06, 2026",
        day: "Tue – Fri",
        time: "9:00 AM – 5:00 PM",
        duration: "4 Days",
        contact_hours: "35 Contact Hours",
        price: 1799,
        seats_left: 7,
        status: "Open"
      },
      {
        id: "ip-2",
        course_title: "Lean Six Sigma Black Belt",
        subtitle: "Classroom Training – Chicago, IL",
        city: "Chicago, IL",
        venue: "Downtown Training Center",
        date_range: "Nov 17 – Nov 20, 2026",
        day: "Tue – Fri",
        time: "9:00 AM – 5:00 PM",
        duration: "4 Days",
        contact_hours: "32 Contact Hours",
        price: 2749,
        seats_left: 3,
        status: "Filling Fast"
      }
    ];
  }, [filteredSchedules]);

  // 3 Self-Learning Featured Programs matching Reference Image 4
  const selfLearningCards = [
    {
      title: "PMP® Self-Paced Training",
      slug: "pmp-certification-training",
      price: 699,
      bullets: [
        "On-demand video lessons",
        "Practice exams & mock tests",
        "Downloadable study materials"
      ],
      screenType: "video"
    },
    {
      title: "CAPM® Self-Paced Training",
      slug: "capm-certification-training",
      price: 499,
      bullets: [
        "Self-paced learning modules",
        "Chapter quizzes & practice tests",
        "Certificate of completion"
      ],
      screenType: "chart"
    },
    {
      title: "ITIL® 4 Foundation Self-Paced",
      slug: "itil-4-foundation-certification-training",
      price: 599,
      bullets: [
        "Official ITIL® 4 aligned content",
        "Practice exams & study guides",
        "Lifetime access & updates"
      ],
      screenType: "itil"
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = (courseName, format, price, date, location = "Online Virtual Classroom") => {
    const cartItem = {
      course: courseName,
      title: courseName,
      format: format,
      price: price,
      date: date,
      location: location
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("cp_cart", JSON.stringify(cartItem));
      window.dispatchEvent(new Event("cartUpdated"));
      router.push("/checkout/");
    }
  };

  const handleResetFilters = () => {
    setSelectedCountry("United States");
    setSelectedCity("All Cities");
    setSelectedCourse("All Courses");
    setSelectedFormat("All Formats");
    setSelectedDateRange("All Dates");
  };

  const badgeThemes = [
    "bg-blue-50 text-[#0066FF] border-blue-200",
    "bg-emerald-50 text-emerald-700 border-emerald-200",
    "bg-purple-50 text-purple-700 border-purple-200",
    "bg-orange-50 text-[#FF6B00] border-orange-200"
  ];

  const displayedLiveOnline = showAllLive ? liveOnlineList.slice(0, 12) : liveOnlineList.slice(0, 3);
  const displayedInPerson = showAllInPerson ? inPersonList.slice(0, 8) : inPersonList.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans antialiased text-slate-800">
      <Navbar siteSettings={siteSettings} />

      {/* ====================================================================
          1. BREADCRUMB + CORPORATE HERO + 5-ITEM STATS STRIP (Image 4 Match)
          ==================================================================== */}
      <section className="relative bg-gradient-to-b from-[#EBF3FF] via-[#F5F9FF] to-[#F4F7FB] pt-3 pb-4 px-4 md:px-6 overflow-hidden">
        {/* Decorative right blue/orange angled accent */}
        <div className="hidden lg:block absolute top-0 right-0 w-[38%] h-full bg-gradient-to-bl from-[#0052CC]/15 via-[#FF6B00]/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 pb-2.5">
            <Link href="/" className="text-[#0066FF] hover:underline font-bold">Home</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-700 font-bold">Schedule &amp; Enroll</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (6 Cols) */}
            <div className="lg:col-span-6 space-y-4 text-left pb-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100/90 text-[#0066FF] text-[10px] font-black uppercase tracking-wider">
                TRAINING SCHEDULE
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0B1E33] tracking-tight leading-[1.1]">
                Schedule &amp; <span className="text-[#FF6B00]">Enroll</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
                Choose your preferred certification, training format, and date to take the next step toward your career goals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/certifications"
                  className="px-7 py-3.5 rounded-full bg-[#FF6B00] hover:bg-orange-600 font-bold text-white text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
                >
                  <span>Browse All Courses</span>
                  <ArrowRight size={15} />
                </Link>

                <button
                  type="button"
                  onClick={() => openModal("Talk to a Training Advisor")}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-blue-50/50 font-bold text-[#0066FF] text-xs sm:text-sm border border-[#0066FF]/40 shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Headphones size={15} className="text-[#0066FF]" />
                  <span>Talk to an Advisor</span>
                </button>
              </div>

              {/* Trustpilot Review Strip */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-semibold text-gray-700">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="flex h-5 w-5 items-center justify-center rounded-xs bg-[#00B67A] text-white text-[11px] font-bold">
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-bold text-gray-800">4.8/5</span>
                <span className="text-gray-300">|</span>
                <span className="text-[#0066FF] font-bold">1,500+ Reviews on</span>
                <span className="flex items-center gap-1 font-bold text-gray-900">
                  <span className="text-[#00B67A]">★</span> Trustpilot
                </span>
              </div>
            </div>

            {/* Right Column (6 Cols): Woman with Laptop + New Batches Every Week Floating Badge */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px]">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/contact_agent_clean.jpg?v=2"
                    alt="Schedule and Enroll Live Batches"
                    className="w-full h-[270px] sm:h-[310px] object-cover object-top"
                  />
                </div>

                {/* Top-Right Floating Blue Pill Badge: New Batches Every Week */}
                <div className="absolute -top-3 right-2 sm:right-4 bg-[#0066FF] text-white px-5 py-3 rounded-2xl shadow-xl shadow-blue-600/30 border border-white/30 flex items-center gap-3 z-20">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Calendar size={22} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-black leading-tight">New Batches<br />Every Week</p>
                    <p className="text-[10px] text-blue-100 font-semibold mt-0.5">Live Online • In-Person • Self Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Item Stats Strip Underneath Hero */}
          <div className="mt-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm py-3.5 px-4 sm:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-center lg:divide-x lg:divide-slate-100">
              <div className="flex items-center gap-3 lg:pr-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <GraduationCap size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">98.23%</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Average Pass Rate</p>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Globe size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">120+</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Cities Worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Users size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">50,000+</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Professionals Trained</p>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:px-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <Calendar size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">15+</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Years of Excellence</p>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:pl-4 col-span-2 sm:col-span-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                  <BarChart3 size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#0B1E33] text-sm sm:text-base leading-tight">200+</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Corporate Clients</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          MAIN CONTENT CONTAINER
          ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 py-4 md:px-6 space-y-5">
        
        {/* ====================================================================
            2. FIND A TRAINING SCHEDULE (5 FILTERS + SEARCH BUTTON + RESET)
            ==================================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                <Search size={20} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#0B1E33]">Find a Training Schedule</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Search by certification, location, and training format to find the right batch for you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RefreshCw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* 5 Dropdowns + 1 Orange Search Button Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 items-end">
            {/* 1. Country */}
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#0B1E33]">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#0066FF] outline-none cursor-pointer"
              >
                <option value="United States">🇺🇸 United States</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="All Countries">🌐 All Countries</option>
              </select>
            </div>

            {/* 2. City */}
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#0B1E33]">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#0066FF] outline-none cursor-pointer"
              >
                <option value="All Cities">📍 New York, NY (All)</option>
                <option value="New York, NY">📍 New York, NY</option>
                <option value="Chicago, IL">📍 Chicago, IL</option>
                <option value="Houston, TX">📍 Houston, TX</option>
                <option value="Los Angeles, CA">📍 Los Angeles, CA</option>
                <option value="Toronto, ON">📍 Toronto, ON</option>
              </select>
            </div>

            {/* 3. Certification / Course */}
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#0B1E33]">Certification / Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#0066FF] outline-none cursor-pointer"
              >
                <option value="All Courses">🎓 All Certifications</option>
                {coursesList.map((c, idx) => (
                  <option key={idx} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* 4. Training Format */}
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#0B1E33]">Training Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedFormat(val);
                  if (val === "Live Online") scrollToSection("live-online-section");
                  if (val === "Self Learning") scrollToSection("self-learning-section");
                  if (val === "In-Person") scrollToSection("in-person-section");
                }}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#0066FF] outline-none cursor-pointer"
              >
                <option value="All Formats">💻 All Formats</option>
                <option value="Live Online">💻 Live Online Classes</option>
                <option value="Self Learning">🎓 Self Learning</option>
                <option value="In-Person">🏢 In-Person Classroom</option>
              </select>
            </div>

            {/* 5. Date Range */}
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#0B1E33]">Date Range</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-[#0066FF] outline-none cursor-pointer"
              >
                <option value="All Dates">📅 Select Dates</option>
                <option value="Nov 2026">📅 November 2026</option>
                <option value="Dec 2026">📅 December 2026</option>
                <option value="Weekend">📅 Weekend Batches</option>
              </select>
            </div>

            {/* 6. Orange Search Classes Button */}
            <button
              type="button"
              onClick={() => scrollToSection("live-online-section")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer h-[38px]"
            >
              <span>Search Classes</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ====================================================================
            3. 3 LARGE CARD-STYLE FORMAT TABS (Image 4 Match)
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tab 1: Live Online Classes */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("live");
              scrollToSection("live-online-section");
            }}
            className={`p-4 rounded-2xl border flex items-center justify-center gap-3.5 transition-all cursor-pointer text-left ${
              activeTab === "live"
                ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/20"
                : "bg-white text-[#0B1E33] border-slate-200/90 hover:border-[#0066FF]"
            }`}
          >
            <Laptop size={22} className={activeTab === "live" ? "text-white" : "text-[#0066FF]"} />
            <div>
              <p className="text-sm font-black leading-tight">Live Online Classes ({liveOnlineList.length || 12})</p>
              <p className={`text-[11px] font-medium ${activeTab === "live" ? "text-blue-100" : "text-slate-500"}`}>
                Instructor-led, interactive training
              </p>
            </div>
          </button>

          {/* Tab 2: Self Learning */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("self");
              scrollToSection("self-learning-section");
            }}
            className={`p-4 rounded-2xl border flex items-center justify-center gap-3.5 transition-all cursor-pointer text-left ${
              activeTab === "self"
                ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/20"
                : "bg-white text-[#0B1E33] border-slate-200/90 hover:border-[#0066FF]"
            }`}
          >
            <GraduationCap size={22} className={activeTab === "self" ? "text-white" : "text-[#0066FF]"} />
            <div>
              <p className="text-sm font-black leading-tight">Self Learning (6)</p>
              <p className={`text-[11px] font-medium ${activeTab === "self" ? "text-blue-100" : "text-slate-500"}`}>
                Learn at your own pace
              </p>
            </div>
          </button>

          {/* Tab 3: In-Person Classroom */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("inperson");
              scrollToSection("in-person-section");
            }}
            className={`p-4 rounded-2xl border flex items-center justify-center gap-3.5 transition-all cursor-pointer text-left ${
              activeTab === "inperson"
                ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/20"
                : "bg-white text-[#0B1E33] border-slate-200/90 hover:border-[#0066FF]"
            }`}
          >
            <Building2 size={22} className={activeTab === "inperson" ? "text-white" : "text-[#0066FF]"} />
            <div>
              <p className="text-sm font-black leading-tight">In-Person Classroom ({inPersonList.length || 8})</p>
              <p className={`text-[11px] font-medium ${activeTab === "inperson" ? "text-blue-100" : "text-slate-500"}`}>
                Face-to-face training in 120+ cities
              </p>
            </div>
          </button>
        </div>

        {/* ====================================================================
            4. UPCOMING LIVE ONLINE CLASSES (Horizontal Row Cards - Image 4 Match)
            ==================================================================== */}
        <section id="live-online-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="flex items-start gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                <Laptop size={18} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#0B1E33]">Upcoming Live Online Classes</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Join instructor-led, interactive live online training from anywhere in the world.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAllLive(!showAllLive)}
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{showAllLive ? "Show Fewer Live Classes" : "View All Live Online Classes"}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {displayedLiveOnline.map((row, idx) => {
              const title = row.course_title || selectedCourse || "PMP® Certification Training";
              const acronym = getAcronym(title);
              const badgeTheme = badgeThemes[idx % badgeThemes.length];
              const priceVal = Number(row.price) || (idx === 0 ? 999 : 1799);
              const isFillingFast = idx === 1 || row.status === "Filling Fast";

              return (
                <div
                  key={row.id || idx}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors text-left"
                >
                  {/* Left: Acronym Box + Course Title & Subtitle */}
                  <div className="flex items-center gap-3.5 lg:w-[32%] shrink-0">
                    <div className={`w-16 h-11 rounded-xl border font-black text-xs flex items-center justify-center shrink-0 ${badgeTheme}`}>
                      {acronym}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-[#0B1E33] truncate">{title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        {acronym === "PMP®"
                          ? "PMBOK® 8th Edition | 2026 Exam Preparation"
                          : acronym === "CAPM®"
                          ? "Project Management Fundamentals"
                          : "Process Improvement & Operational Excellence"}
                      </p>
                    </div>
                  </div>

                  {/* Middle Columns: Dates, Time, Duration */}
                  <div className="grid grid-cols-3 gap-4 flex-1 text-xs">
                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Calendar size={11} className="text-[#0066FF]" /> Dates
                      </span>
                      <p className="font-black text-[#0B1E33] mt-0.5">{row.date_range || row.batch_date || "Nov 03 – Nov 06, 2026"}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">(Tue – Fri)</p>
                    </div>

                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Clock size={11} className="text-[#0066FF]" /> Time (EST)
                      </span>
                      <p className="font-black text-[#0B1E33] mt-0.5">9:00 AM – 5:00 PM</p>
                    </div>

                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Calendar size={11} className="text-[#0066FF]" /> Duration
                      </span>
                      <p className="font-black text-[#0B1E33] mt-0.5">{row.duration || "4 Days"}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">({row.contact_hours || "35"} Contact Hours)</p>
                    </div>
                  </div>

                  {/* Right: Price + Seats Badge + Orange Add to Cart Button */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    <div className="text-base sm:text-lg font-black text-[#0B1E33]">
                      ${priceVal.toLocaleString()} <span className="text-xs font-bold text-slate-500">USD</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                        isFillingFast
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {isFillingFast ? "Filling Fast" : `${row.seats_left || (idx === 0 ? 5 : 8)} Seats Left`}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(title, "Live Online Class", priceVal, row.date_range || row.batch_date || "Nov 03 – Nov 06, 2026")}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-sm shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Add to Cart</span>
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            5. SELF LEARNING PROGRAMS (3 Side-by-Side Visual Cards - Image 4 Match)
            ==================================================================== */}
        <section id="self-learning-section" className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="flex items-start gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#0B1E33]">Self Learning Programs</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Flexible, on-demand training with lifetime access to course materials, videos, and practice exams.
                </p>
              </div>
            </div>

            <Link
              href="/certifications"
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Self Learning Options</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selfLearningCards.map((card, cidx) => (
              <div
                key={cidx}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between text-left space-y-5"
              >
                <div className="space-y-3.5">
                  <h4 className="text-base font-black text-[#0B1E33]">{card.title}</h4>

                  <div className="grid grid-cols-12 gap-3 items-center">
                    {/* Left 7 Cols: 3 Green Checkmarks */}
                    <ul className="col-span-7 space-y-2 text-[11px] font-bold text-slate-600">
                      {card.bullets.map((b, bidx) => (
                        <li key={bidx} className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-[#16A34A] shrink-0 mt-0.5" />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Right 5 Cols: Laptop Mockup Graphic */}
                    <div className="col-span-5">
                      <div className="rounded-xl bg-slate-800 p-1.5 shadow-sm border border-slate-200">
                        {card.screenType === "video" && (
                          <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-[#0052CC] to-[#07192F] flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-white">
                              <Play size={13} className="fill-white ml-0.5" />
                            </div>
                          </div>
                        )}
                        {card.screenType === "chart" && (
                          <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 flex items-end justify-center gap-1.5 p-2">
                            <span className="w-2 h-4 bg-blue-300 rounded-t" />
                            <span className="w-2 h-6 bg-blue-500 rounded-t" />
                            <span className="w-2 h-8 bg-[#FF6B00] rounded-t" />
                            <span className="w-2 h-10 bg-emerald-500 rounded-t" />
                          </div>
                        )}
                        {card.screenType === "itil" && (
                          <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center text-white font-black text-xs tracking-wider">
                            ITIL®
                          </div>
                        )}
                      </div>
                      <div className="h-1.5 bg-slate-300 rounded-b-lg mx-auto w-4/5 mt-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Price on Left + View Details Button on Right */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xl font-black text-[#0B1E33]">
                    ${card.price} <span className="text-xs font-bold text-slate-500">USD</span>
                  </div>

                  <Link
                    href={`/courses/${card.slug}`}
                    className="px-4 py-2 rounded-full border border-[#0066FF]/40 bg-blue-50/40 hover:bg-[#0066FF] text-[#0066FF] hover:text-white font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            6. UPCOMING IN-PERSON CLASSROOM TRAINING (Image 4 Match)
            ==================================================================== */}
        <section id="in-person-section" className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="flex items-start gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#0B1E33]">Upcoming In-Person Classroom Training</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Instructor-led training in a classroom setting at convenient locations in 120+ cities.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAllInPerson(!showAllInPerson)}
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{showAllInPerson ? "Show Fewer In-Person Classes" : "View All In-Person Classes"}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {displayedInPerson.map((row, idx) => {
              const title = row.course_title || "PMP® Certification Training";
              const acronym = getAcronym(title);
              const cityStr = row.city || (idx === 0 ? "New York, NY" : "Chicago, IL");
              const priceVal = Number(row.price) || (idx === 0 ? 1799 : 2749);
              const isFillingFast = idx === 1 || row.status === "Filling Fast";

              return (
                <div
                  key={row.id || idx}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors text-left"
                >
                  {/* Left: Acronym Badge + Title */}
                  <div className="flex items-center gap-3.5 lg:w-[27%] shrink-0">
                    <div className={`w-16 h-11 rounded-xl border font-black text-xs flex items-center justify-center shrink-0 ${idx % 2 === 0 ? "bg-blue-50 text-[#0066FF] border-blue-200" : "bg-purple-50 text-purple-700 border-purple-200"}`}>
                      {acronym}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-[#0B1E33] truncate">{title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        Classroom Training – {cityStr}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Location, Dates, Time, Duration */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-xs">
                    <div>
                      <p className="font-black text-[#0B1E33] flex items-center gap-1">
                        <MapPin size={12} className="text-[#0066FF] shrink-0" />
                        <span>{cityStr}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold pl-4">
                        {row.venue || (idx === 0 ? "Midtown Training Center" : "Downtown Training Center")}
                      </p>
                    </div>

                    <div>
                      <p className="font-black text-[#0B1E33] flex items-center gap-1">
                        <Calendar size={12} className="text-[#0066FF] shrink-0" />
                        <span>{row.date_range || row.batch_date || "Nov 03 – Nov 06, 2026"}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold pl-4">(Tue – Fri)</p>
                    </div>

                    <div>
                      <p className="font-black text-[#0B1E33] flex items-center gap-1">
                        <Clock size={12} className="text-[#0066FF] shrink-0" />
                        <span>9:00 AM – 5:00 PM</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold pl-4">Local Time</p>
                    </div>

                    <div>
                      <p className="font-black text-[#0B1E33] flex items-center gap-1">
                        <Calendar size={12} className="text-[#0066FF] shrink-0" />
                        <span>{row.duration || "4 Days"}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold pl-4">({row.contact_hours || "35 Contact Hours"})</p>
                    </div>
                  </div>

                  {/* Right: Price + Seats Pill + Orange Add to Cart */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    <div className="text-base sm:text-lg font-black text-[#0B1E33]">
                      ${priceVal.toLocaleString()} <span className="text-xs font-bold text-slate-500">USD</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                        isFillingFast
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {isFillingFast ? "Filling Fast" : `${row.seats_left || 7} Seats Left`}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(title, `In-Person Classroom (${cityStr})`, priceVal, row.date_range || row.batch_date || "Nov 03 – Nov 06, 2026", cityStr)}
                      className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-sm shadow-orange-500/20 transition-all cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            7. CORPORATE TRAINING SOLUTIONS BANNER (Image 4 Match)
            ==================================================================== */}
        <section>
          <div className="bg-gradient-to-r from-white via-[#F4F8FF] to-[#EBF3FF] rounded-3xl border border-blue-100 shadow-xs overflow-hidden grid lg:grid-cols-12 gap-6 items-center p-5 sm:p-6">
            
            {/* Left Photo (4 Cols) */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden h-44 sm:h-48 bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about_us_professionals.jpg"
                alt="Corporate Team Training"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle Copy & 3 Checkmarks (5 Cols) */}
            <div className="lg:col-span-5 space-y-2.5 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00]">
                CORPORATE TRAINING SOLUTIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B1E33] leading-tight">
                Train Your Team. Drive Real Business Results.
              </h3>
              <ul className="space-y-1.5 pt-1 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#16A34A] shrink-0" />
                  <span>Customized training programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#16A34A] shrink-0" />
                  <span>Flexible delivery (Onsite, Online, or Blended)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#16A34A] shrink-0" />
                  <span>Group pricing and enterprise support</span>
                </li>
              </ul>
            </div>

            {/* Right 2 Stacked Buttons (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <Link
                href="/corporate-training"
                className="w-full py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 text-center"
              >
                <span>Request a Corporate Training Proposal</span>
                <ArrowRight size={13} className="shrink-0" />
              </Link>
              <button
                type="button"
                onClick={() => openModal("Schedule a Corporate Training Callback")}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-blue-50 text-[#0066FF] border border-[#0066FF]/40 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={13} />
                <span>Schedule a Callback</span>
              </button>
            </div>

          </div>
        </section>

        {/* ====================================================================
            8. 4-ITEM TRUST STRIP (30-Day Money Back, Secure Payment, etc.)
            ==================================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs py-5 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center lg:divide-x lg:divide-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-[#0B1E33]">30-Day Money Back</h4>
              <p className="text-[11px] text-slate-500 font-medium">100% satisfaction guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 lg:pl-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-[#0B1E33]">Secure Payment</h4>
              <p className="text-[11px] text-slate-500 font-medium">Safe &amp; encrypted checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 lg:pl-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <InfinityIcon size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-[#0B1E33]">Lifetime Access</h4>
              <p className="text-[11px] text-slate-500 font-medium">For self-learning courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 lg:pl-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <Headphones size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-[#0B1E33]">Need Help?</h4>
              <p className="text-[11px] text-slate-500 font-medium">Talk to our training advisors</p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            9. BOTTOM DARK NAVY CTA BANNER (Image 4 Match)
            ==================================================================== */}
        <section className="pb-2">
          <div className="rounded-3xl bg-gradient-to-r from-[#07192F] via-[#0D2E59] to-[#07192F] p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Award size={26} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Ready to Advance Your Career?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/85 font-medium">
                  Find the right training schedule and enroll today.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openModal("Get a Free Consultation")}
                className="px-6 py-3.5 rounded-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight size={14} />
              </button>

              <a
                href={`tel:${(siteSettings?.support_phone || "8887457575").replace(/[^0-9]/g, "")}`}
                className="px-6 py-3.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
              >
                <Phone size={14} />
                <span>Call Us: {siteSettings?.support_phone || "(888) 745-7575"}</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}

export default function Enroll() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="h-6 w-6 rounded-full border-2 border-[#0066FF] border-t-transparent animate-spin" />
        </div>
      }
    >
      <EnrollContent />
    </Suspense>
  );
}
