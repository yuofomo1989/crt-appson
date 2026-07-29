"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LayoutGrid, User, ShoppingCart, GraduationCap, Download, Headphones, FileText, HelpCircle, ChevronDown, Check, Shield, Search, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Lock, Camera, CreditCard, Bell, Key, MessageSquare, ShoppingBag, X, Laptop, Users, Filter, Eye, UploadCloud, Info, PhoneCall } from "lucide-react";

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  
  const [latestOrder, setLatestOrder] = useState(null);
  const [currentDate, setCurrentDate] = useState("May 16, 2024");
  
  // Selected Invoice for details panel
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("INV-2024-0003");

  // Raise a request modal state
  const [isRaiseRequestOpen, setIsRaiseRequestOpen] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [relatedTo, setRelatedTo] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // Request a Callback modal state
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [cbFullName, setCbFullName] = useState("");
  const [cbEmail, setCbEmail] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbTimeSlot, setCbTimeSlot] = useState("");
  const [cbTimezone, setCbTimezone] = useState("(GMT-05:00) Eastern Time (US & Canada)");
  const [cbReason, setCbReason] = useState("");
  const [cbDetails, setCbDetails] = useState("");

  // Book a Consultation modal state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultTimezone, setConsultTimezone] = useState("(GMT-05:00) Eastern Time (US & Canada)");
  const [consultTopic, setConsultTopic] = useState("");
  const [consultDate, setConsultDate] = useState("");
  const [consultTime, setConsultTime] = useState("");
  const [consultDiscuss, setConsultDiscuss] = useState("");

  // Profile Form States
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("(201) 555-0123");
  const [altPhone, setAltPhone] = useState("(201) 555-0456");
  const [dob, setDob] = useState("");
  const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time (US & Canada)");

  // Address Form States
  const [country, setCountry] = useState("United States");
  const [addressLine1, setAddressLine1] = useState("123 Main Street");
  const [addressLine2, setAddressLine2] = useState("Suite 400");
  const [city, setCity] = useState("New York");
  const [stateProv, setStateProv] = useState("New York");
  const [zipCode, setZipCode] = useState("10001");
  const [isBilling, setIsBilling] = useState(true);

  // Preferences
  const [prefPromo, setPrefPromo] = useState(true);
  const [prefAlert, setPrefAlert] = useState(true);
  const [prefSms, setPrefSms] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }));

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cp_latest_order");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLatestOrder(parsed);
          if (parsed.customerName) {
            const splitName = parsed.customerName.split(" ");
            setFirstName(splitName[0] || "John");
            setLastName(splitName[1] || "Doe");
            setCbFullName(parsed.customerName);
            setCbEmail(parsed.email || "john.doe@email.com");
            setConsultName(parsed.customerName);
            setConsultEmail(parsed.email || "john.doe@email.com");
          }
        } catch (e) {
          console.error("Error parsing latest order details", e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Static orders data
  const staticOrdersList = [
    {
      orderId: "CP-ORD-2024-56123",
      course: "AgilePM® Foundation Training",
      logo: "AgilePM®",
      logoBg: "bg-cyan-900 text-white",
      dates: "Jun 17 - Jun 18, 2024",
      timing: "9:00 AM – 5:00 PM (EST)",
      trainingType: "Classroom",
      typeIcon: <Users size={14} className="text-brand-blue" />,
      location: "Austin, TX (In-Person)",
      orderDate: "Apr 22, 2024",
      amount: "$695.00",
      status: "Completed"
    },
    {
      orderId: "CP-ORD-2024-55901",
      course: "PRINCE2® Foundation Training",
      logo: "PRINCE2®",
      logoBg: "bg-purple-950 text-white",
      dates: "Jul 8 - Jul 10, 2024",
      timing: "9:00 AM – 5:00 PM (EST)",
      trainingType: "Live Virtual Classroom",
      typeIcon: <Laptop size={14} className="text-brand-orange" />,
      location: "Chicago, IL (Live Virtual)",
      orderDate: "Apr 05, 2024",
      amount: "$695.00",
      status: "Upcoming"
    }
  ];

  // Build complete list
  const finalOrdersList = [];
  if (latestOrder) {
    finalOrdersList.push({
      orderId: latestOrder.orderId.replace("CP-ENR-2026-", "CP-ORD-2024-"),
      course: latestOrder.course,
      logo: "PMP®",
      logoBg: "bg-purple-900 text-white",
      dates: "May 27 – May 30, 2024",
      timing: "9:00 AM – 5:00 PM (EST)",
      trainingType: "Live Online",
      typeIcon: <Laptop size={14} className="text-brand-blue" />,
      location: "New York, NY (Online)",
      orderDate: currentDate,
      amount: `$${parseFloat(latestOrder.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: "Completed"
    });
  } else {
    finalOrdersList.push({
      orderId: "CP-ORD-2024-56890",
      course: "PMP® Certification Training",
      logo: "PMP®",
      logoBg: "bg-purple-900 text-white",
      dates: "May 27 – May 30, 2024",
      timing: "9:00 AM – 5:00 PM (EST)",
      trainingType: "Live Online",
      typeIcon: <Laptop size={14} className="text-brand-blue" />,
      location: "New York, NY (Online)",
      orderDate: "May 16, 2024",
      amount: "$1,095.00",
      status: "Completed"
    });
  }
  finalOrdersList.push(...staticOrdersList);

  // Invoices list mapping from orders
  const invoicesList = finalOrdersList.map((ord, idx) => {
    const invNum = `INV-2024-000${finalOrdersList.length - idx}`;
    return {
      invoiceId: invNum,
      orderId: ord.orderId,
      course: ord.course,
      invoiceDate: ord.orderDate,
      dueDate: ord.orderDate,
      amount: ord.amount,
      status: ord.status === "Completed" ? "Paid" : "Pending"
    };
  });

  const activeInvoice = invoicesList.find(i => i.invoiceId === selectedInvoiceId) || invoicesList[0];

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    alert("Request Submitted Successfully! Our support advisors will email you details shortly.");
    setIsRaiseRequestOpen(false);
    setRequestType("");
    setRelatedTo("");
    setSubject("");
    setDescription("");
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    alert(`Callback Requested Successfully! We will call you at ${cbTimeSlot} (${cbTimezone}).`);
    setIsCallbackModalOpen(false);
    setCbTimeSlot("");
    setCbReason("");
    setCbDetails("");
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    alert(`Consultation booked successfully on ${consultDate} at ${consultTime}! We have sent a confirmation email.`);
    setIsConsultationOpen(false);
    setConsultTopic("");
    setConsultDate("");
    setConsultTime("");
    setCbDetails("");
  };

  return (
    <div className="min-h-screen bg-slate-50/20 flex flex-col font-sans antialiased text-gray-800">
      
      {/* ==========================================
          1. HEADER BAR
          ========================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-150 bg-white px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-lg shadow-md">
              CP
            </div>
            <span className="text-lg font-bold tracking-tight text-brand-navy">
              Certification<span className="text-brand-orange">Planner</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-white transition-colors cursor-pointer bg-brand-blue hover:bg-opacity-90 px-4 py-2 rounded-xl shadow-xs"
          >
            📅 Book a Consultation
          </button>
          
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-655 hover:text-brand-blue transition-colors cursor-pointer bg-slate-50 px-3.5 py-2 rounded-xl border border-gray-150 shadow-xs"
          >
            📞 Request a Callback
          </button>

          <span className="text-gray-200 hidden sm:inline">|</span>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="h-8 w-8 rounded-full bg-[#e6eeff] border border-blue-100 flex items-center justify-center font-black text-brand-blue text-xs shadow-inner">
              JD
            </div>
            <span className="text-xs font-black text-brand-navy group-hover:text-brand-blue transition-colors">
              {firstName} {lastName}
            </span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* ==========================================
          2. DASHBOARD BODY SPLIT (SIDEBAR & WORKSPACE)
          ========================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Dark Navy BG) */}
        <aside className="w-64 bg-[#0a1e3b] text-slate-300 p-6 flex flex-col justify-between shrink-0 hidden lg:flex text-left">
          
          <div className="space-y-6">
            <button
              onClick={() => setActiveMenu("Dashboard")}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all text-left ${
                activeMenu === "Dashboard" ? "bg-[#163057] text-white" : "hover:bg-[#163057]/50"
              }`}
            >
              <LayoutGrid size={16} />
              Dashboard
            </button>

            {/* MY ACCOUNT / MY LEARNING Section */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveMenu("My Orders")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "My Orders" ? "bg-[#163057] text-white" : "hover:bg-[#163057]/50"
                }`}
              >
                <ShoppingCart size={16} />
                My Orders
              </button>
              <button
                onClick={() => setActiveMenu("Course Materials")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "Course Materials" ? "bg-[#163057] text-white" : "hover:bg-[#163057]/50"
                }`}
              >
                <GraduationCap size={16} />
                Course Materials
              </button>
              <button
                onClick={() => setActiveMenu("Invoices")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "Invoices" ? "bg-[#163057] text-white" : "hover:bg-[#163057]/50"
                }`}
              >
                <FileText size={16} />
                Invoices
              </button>
              <button
                onClick={() => setIsRaiseRequestOpen(true)}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left text-slate-300 hover:bg-[#163057]/50 cursor-pointer"
              >
                <Headphones size={16} />
                Raise a Request
              </button>
            </div>

            {/* ACCOUNT SETTINGS Section */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black px-4">Account Settings</p>
              <div className="space-y-1">
                {[
                  { name: "My Profile", icon: <User size={16} /> },
                  { name: "Address Book", icon: <MapPin size={16} /> },
                  { name: "Payment Methods", icon: <CreditCard size={16} /> },
                  { name: "Notification Settings", icon: <Bell size={16} /> },
                  { name: "Change Password", icon: <Key size={16} /> }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                      activeMenu === item.name ? "bg-[#163057] text-white" : "hover:bg-[#163057]/50"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SUPPORT Section */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black px-4">Support</p>
              <div className="space-y-1">
                {[
                  { name: "Help Center", icon: <HelpCircle size={16} /> },
                  { name: "Contact Support", icon: <MessageSquare size={16} /> }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                      activeMenu === item.name ? "bg-[#163057] text-white" : "hover:bg-[#163057]/50"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Need Help bottom block */}
          <div className="space-y-4 border-t border-slate-800 pt-6">
            <div className="space-y-1 px-2 text-left">
              <p className="text-[11px] font-black text-white">Need Help?</p>
              <p className="text-[9px] text-slate-500 font-bold leading-normal">Our support team is here to help you.</p>
            </div>
            <button onClick={() => setIsRaiseRequestOpen(true)} className="w-full rounded-xl bg-white text-brand-blue border border-blue-200 hover:bg-slate-50 py-2.5 text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
              💬 Contact Support
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-rose-400 hover:text-rose-500 text-[10px] font-bold py-1.5"
            >
              Log Out
            </button>
          </div>

        </aside>

        {/* Right Workspace content area */}
        <main className="flex-1 bg-slate-50/50 p-6 md:p-8 overflow-y-auto space-y-8">
          
          {/* VIEW A: Dashboard */}
          {activeMenu === "Dashboard" && (
            <div className="space-y-8">
              {/* Welcome Banner & Account Overview Grid */}
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Welcome banner */}
                <div className="lg:col-span-8 bg-[#e8f1fe] rounded-3xl p-6 md:p-8 flex items-center justify-between relative overflow-hidden border border-blue-100 shadow-sm text-left">
                  <div className="space-y-4">
                    <h2 className="text-xl font-black text-brand-navy">Welcome back, {firstName}!</h2>
                    <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-sm">
                      Manage your orders, download materials, view invoices and get support.
                    </p>
                  </div>
                  <div className="h-32 w-32 bg-[#d0e2ff] rounded-2xl hidden md:flex items-center justify-center shrink-0 text-3xl">
                    📥
                  </div>
                </div>

                {/* Account Overview */}
                <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between text-left space-y-4">
                  <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Account Overview</h3>
                  <div className="space-y-2 text-xs font-bold text-gray-600">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span>Total Orders</span>
                      <span className="text-brand-navy font-black">3</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                      <span>Completed Orders</span>
                      <span className="text-emerald-500 font-black">2</span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                      <span>Open Requests</span>
                      <span className="text-orange-500 font-black">1</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveMenu("My Orders")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    View My Orders ➔
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between items-start gap-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Download size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-brand-navy">Course Materials</h4>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Access and download your purchased course materials.</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveMenu("Course Materials")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    Access Materials ➔
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between items-start gap-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <FileText size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-brand-navy">Invoices</h4>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed">View and download your payment invoices.</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveMenu("Invoices")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    View Invoices ➔
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between items-start gap-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 border border-orange-100">
                      <Headphones size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-brand-navy">Raise a Request</h4>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Need help? Our support team is here for you.</p>
                    </div>
                  </div>
                  <button onClick={() => setIsRaiseRequestOpen(true)} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    Raise a Request ➔
                  </button>
                </div>
              </div>

              {/* Recent Orders table */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-black text-brand-navy">Recent Orders</h3>
                  <span onClick={() => setActiveMenu("My Orders")} className="text-[10px] text-brand-blue font-bold cursor-pointer hover:underline">View All Orders</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-xs text-left font-semibold text-gray-700">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-155 text-gray-500">
                        <th className="p-4 pl-6">Order ID</th>
                        <th className="p-4">Course</th>
                        <th className="p-4">Order Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalOrdersList.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 pl-6 font-bold text-brand-navy font-mono">{row.orderId}</td>
                          <td className="p-4 font-black text-gray-800">{row.course}</td>
                          <td className="p-4 text-gray-500 font-bold">{row.date}</td>
                          <td className="p-4 font-black text-brand-navy">{row.price}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded text-[9px] font-black ${
                              row.status === "Completed"
                                ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                                : "bg-orange-50 text-orange-500 border border-orange-100"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6">
                            <button onClick={() => setActiveMenu("My Orders")} className="text-brand-blue hover:underline cursor-pointer text-[10px] font-bold">
                              View Details ➔
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50 text-[10px] text-gray-400 font-bold">
                  <span>Showing 1 to {finalOrdersList.length} of {finalOrdersList.length} orders</span>
                  <div className="flex gap-1.5 items-center">
                    <button className="h-6 w-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50" disabled>
                      <ArrowLeft size={10} />
                    </button>
                    <button className="h-6 w-6 rounded-md bg-brand-blue text-white flex items-center justify-center">1</button>
                    <button className="h-6 w-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50" disabled>
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: My Profile */}
          {activeMenu === "My Profile" && (
            <div className="space-y-8">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2 text-left">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-600 font-black">My Profile</span>
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-black text-brand-navy">My Profile</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">View and update your personal information and account preferences.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-5 text-left">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Personal Information</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-6 items-center border-b border-gray-50 pb-5">
                      <div className="h-20 w-20 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-brand-blue text-2xl font-black shadow-inner">
                        JD
                      </div>
                      <div className="space-y-2">
                        <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 hover:bg-slate-50 px-4 py-2 text-[10px] font-bold text-gray-700 transition-colors">
                          <Camera size={12} />
                          Change Photo
                        </button>
                        <p className="text-[9px] text-gray-400 font-bold">JPG, PNG up to 2MB</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">First Name *</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Last Name *</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-bold">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Phone Number *</label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs">🇺🇸</span>
                            <select className="rounded-xl border border-gray-200 pl-8 pr-3 py-3.5 text-xs font-bold text-gray-700 bg-white">
                              <option>+1</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Alternate Phone (Optional)</label>
                        <input
                          type="text"
                          value={altPhone}
                          onChange={(e) => setAltPhone(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Date of Birth (Optional)</label>
                        <input
                          type="text"
                          placeholder="MM/DD/YYYY"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Time Zone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 bg-white outline-none"
                        >
                          <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                          <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                          <option>(GMT+00:00) Greenwich Mean Time</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4 text-left">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Address Information</h3>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Country *</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 bg-white outline-none"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                        </select>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] text-gray-500 font-bold">Address Line 1 *</label>
                        <input
                          type="text"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">City *</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 bg-white outline-none"
                        >
                          <option>New York</option>
                          <option>Los Angeles</option>
                          <option>Houston</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">State / Province *</label>
                        <select
                          value={stateProv}
                          onChange={(e) => setStateProv(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 bg-white outline-none"
                        >
                          <option>New York</option>
                          <option>California</option>
                          <option>Texas</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 font-bold">ZIP / Postal Code *</label>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="is_billing"
                        checked={isBilling}
                        onChange={(e) => setIsBilling(e.target.checked)}
                        className="shrink-0"
                      />
                      <label htmlFor="is_billing" className="text-[10px] text-gray-400 font-bold cursor-pointer select-none">
                        This is my billing address
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-4 text-left">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Communication Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-start gap-2.5 cursor-pointer text-[10px] font-bold text-gray-500">
                        <input type="checkbox" checked={prefPromo} onChange={(e) => setPrefPromo(e.target.checked)} className="mt-0.5" />
                        <span>I would like to receive emails about course updates, promotions and special offers.</span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer text-[10px] font-bold text-gray-500">
                        <input type="checkbox" checked={prefAlert} onChange={(e) => setPrefAlert(e.target.checked)} className="mt-0.5" />
                        <span>I agree to receive important notifications related to my orders and account.</span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer text-[10px] font-bold text-gray-500">
                        <input type="checkbox" checked={prefSms} onChange={(e) => setPrefSms(e.target.checked)} className="mt-0.5" />
                        <span>I would like to receive SMS notifications about my orders and account.</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm text-left space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Account Summary</h3>
                    
                    <div className="space-y-3.5 text-xs font-semibold text-gray-500">
                      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-brand-blue shrink-0" />
                          <span>Member Since</span>
                        </span>
                        <span className="text-brand-navy font-bold">May 16, 2024</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                        <span className="flex items-center gap-2">
                          <Lock size={14} className="text-brand-blue shrink-0" />
                          <span>Total Orders</span>
                        </span>
                        <span className="text-brand-navy font-bold">3</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                        <span className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-500 shrink-0" />
                          <span>Completed Orders</span>
                        </span>
                        <span className="text-brand-navy font-bold">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Headphones size={14} className="text-brand-orange shrink-0" />
                          <span>Open Requests</span>
                        </span>
                        <span className="text-brand-navy font-bold text-orange-500">1</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f0f4fc]/40 rounded-3xl border border-[#dce3f2]/60 p-6 text-left space-y-3 flex items-start gap-3">
                    <Shield size={24} className="text-brand-blue shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-xs font-black text-brand-navy">Your Account Security</h4>
                        <p className="text-[9px] text-gray-400 font-bold mt-0.5">Keep your account secure.</p>
                      </div>
                      <button className="flex items-center justify-center gap-1 rounded-xl bg-white border border-gray-200 hover:bg-slate-50 px-4 py-2 text-[9px] font-bold text-brand-navy cursor-pointer">
                        Change Password ➔
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm text-left space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Quick Links</h3>
                    <div className="space-y-3 text-xs text-gray-650 font-bold">
                      {[
                        { name: "My Orders", view: "My Orders" },
                        { name: "Course Materials", view: "Course Materials" },
                        { name: "Invoices", view: "Invoices" },
                        { name: "Raise a Request", view: "Raise a Request" },
                        { name: "Address Book", view: "My Profile" },
                        { name: "Payment Methods", view: "My Profile" }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveMenu(item.view)}
                          className="flex items-center justify-between cursor-pointer hover:text-brand-blue transition-colors py-1.5 border-b border-gray-50 last:border-b-0"
                        >
                          <span>{item.name}</span>
                          <span className="text-gray-400 font-medium">➔</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW C: My Orders */}
          {activeMenu === "My Orders" && (
            <div className="space-y-8">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2 text-left">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">My Orders</span>
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-black text-brand-navy">My Orders</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">View your training orders and access your course information.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-brand-blue border border-blue-100 flex items-center justify-center shrink-0">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Orders</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">3</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Completed Orders</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">2</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-orange-50 text-brand-orange border border-orange-100 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Upcoming Orders</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">1</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-650 border border-purple-100 flex items-center justify-center shrink-0">
                    <X size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Cancelled Orders</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-black text-brand-navy">All Orders (3)</h3>
                  <select className="rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs font-bold text-gray-650 bg-white outline-none">
                    <option>All Status</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-xs text-left font-semibold text-gray-700">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-155 text-gray-500">
                        <th className="p-4 pl-6">Order ID</th>
                        <th className="p-4">Course</th>
                        <th className="p-4">Training Type</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Order Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalOrdersList.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/55 transition-colors align-middle">
                          <td className="p-4 pl-6 space-y-1">
                            <span className="font-black text-brand-navy font-mono block">{row.orderId}</span>
                            <span className="text-[10px] text-brand-blue font-bold cursor-pointer hover:underline">View Invoice</span>
                          </td>
                          
                          <td className="p-4">
                            <div className="flex gap-3">
                              <div className={`h-9 w-9 rounded-lg ${row.logoBg} flex items-center justify-center font-black text-[9px] shrink-0 border border-black/5`}>
                                {row.logo}
                              </div>
                              <div className="space-y-1">
                                <span className="font-black text-gray-800 block leading-tight">{row.course}</span>
                                <div className="flex items-center gap-3 text-[9px] text-gray-400 font-bold">
                                  <span className="flex items-center gap-1"><Calendar size={10} /> {row.dates}</span>
                                  <span className="flex items-center gap-1"><Clock size={10} /> {row.timing}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-1.5 text-gray-600 font-bold">
                              {row.typeIcon}
                              <span>{row.trainingType}</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-1.5 text-gray-505 font-bold">
                              <MapPin size={14} className="text-brand-blue shrink-0" />
                              <span>{row.location}</span>
                            </div>
                          </td>

                          <td className="p-4 text-gray-550 font-bold">
                            {row.orderDate}
                          </td>

                          <td className="p-4 font-black text-brand-navy">
                            {row.amount}
                          </td>

                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded text-[9px] font-black ${
                              row.status === "Completed"
                                ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                                : "bg-orange-50 text-orange-500 border border-orange-100"
                            }`}>
                              {row.status}
                            </span>
                          </td>

                          <td className="p-4 pr-6">
                            <button className="flex items-center gap-1 border border-brand-blue/20 bg-white hover:bg-slate-50 px-3.5 py-2 text-[10px] font-black text-brand-blue rounded-xl transition-all cursor-pointer">
                              <span>View Course Information</span>
                              <ArrowRight size={10} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50 text-[10px] text-gray-450 font-bold">
                  <span>Showing 1 to {finalOrdersList.length} of {finalOrdersList.length} orders</span>
                  <div className="flex gap-1.5 items-center">
                    <button className="h-6 w-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50" disabled>
                      <ArrowLeft size={10} />
                    </button>
                    <button className="h-6 w-6 rounded-md bg-brand-blue text-white flex items-center justify-center">1</button>
                    <button className="h-6 w-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50" disabled>
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW D: Invoices */}
          {activeMenu === "Invoices" && (
            <div className="space-y-8">
              <div className="text-[11px] text-gray-450 font-bold flex gap-2 text-left">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Invoices</span>
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-black text-brand-navy">Invoices</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">View and download your payment invoices.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-brand-blue border border-blue-100 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Invoices</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">3</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Paid</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">2</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-orange-50 text-brand-orange border border-orange-100 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Pending</p>
                    <p className="text-lg font-black text-brand-navy leading-tight">1</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-155 rounded-3xl p-5 shadow-xs flex items-center gap-4 text-left">
                  <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-650 border border-purple-100 flex items-center justify-center shrink-0">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Amount</p>
                    <p className="text-base font-black text-brand-navy leading-tight">$2,485.00</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="text-xs uppercase tracking-wider text-brand-navy font-black">All Invoices (3)</h3>
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search invoice number..."
                          className="rounded-xl border border-gray-200 bg-white pl-8 pr-3 py-1.5 text-[10px] outline-none w-48 focus:border-brand-blue"
                        />
                      </div>
                      <button className="flex items-center gap-1 border border-gray-200 hover:bg-slate-50 px-3 py-1.5 text-[10px] font-bold rounded-xl text-gray-650 cursor-pointer">
                        <Filter size={10} /> Filters
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-[11px] text-left font-semibold text-gray-700">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-155 text-gray-500">
                          <th className="p-3 pl-4">Invoice #</th>
                          <th className="p-3">Order ID</th>
                          <th className="p-3">Course</th>
                          <th className="p-3">Invoice Date</th>
                          <th className="p-3">Due Date</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 pr-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoicesList.map((row, idx) => (
                          <tr
                            key={idx}
                            onClick={() => setSelectedInvoiceId(row.invoiceId)}
                            className={`border-b border-gray-50 hover:bg-blue-50/20 cursor-pointer transition-colors ${
                              selectedInvoiceId === row.invoiceId ? "bg-blue-50/50" : ""
                            }`}
                          >
                            <td className="p-3 pl-4 font-black text-brand-blue hover:underline font-mono">{row.invoiceId}</td>
                            <td className="p-3 font-bold text-gray-500 font-mono">{row.orderId}</td>
                            <td className="p-3 font-black text-gray-800 max-w-[150px] truncate">{row.course}</td>
                            <td className="p-3 text-gray-400">{row.invoiceDate}</td>
                            <td className="p-3 text-gray-400">{row.dueDate}</td>
                            <td className="p-3 font-black text-brand-navy">{row.amount}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black ${
                                row.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                                  : "bg-orange-50 text-orange-500 border border-orange-100"
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="p-3 pr-4 flex gap-1.5 items-center">
                              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 text-gray-400">
                                <Download size={10} />
                              </button>
                              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 text-gray-400">
                                <Eye size={10} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-[10px] text-gray-400 font-bold">
                    Showing 1 to {invoicesList.length} of {invoicesList.length} invoices
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="text-xs font-black text-brand-navy">Invoice Details</h3>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-black ${
                      activeInvoice.status === "Paid"
                        ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                        : "bg-orange-50 text-orange-500 border border-orange-100"
                    }`}>
                      {activeInvoice.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Invoice #</p>
                      <p className="text-sm font-black text-brand-navy font-mono mt-0.5">{activeInvoice.invoiceId}</p>
                    </div>
                    <button className="flex items-center gap-1 border border-brand-blue/20 bg-white hover:bg-slate-50 px-3 py-1.5 text-[9px] font-black text-brand-blue rounded-xl transition-all cursor-pointer">
                      <Download size={10} />
                      Download PDF
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-505 font-bold bg-slate-50/55 p-4 rounded-2xl border border-gray-50">
                    <div>
                      <span className="text-gray-450 uppercase">Order ID</span>
                      <p className="text-brand-navy font-mono mt-0.5">{activeInvoice.orderId}</p>
                    </div>
                    <div>
                      <span className="text-gray-450 uppercase">Invoice Date</span>
                      <p className="text-brand-navy mt-0.5">{activeInvoice.invoiceDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-455 uppercase">Due Date</span>
                      <p className="text-brand-navy mt-0.5">{activeInvoice.dueDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-455 uppercase">Payment Date</span>
                      <p className="text-brand-navy mt-0.5">{activeInvoice.status === "Paid" ? activeInvoice.invoiceDate : "Pending"}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] text-gray-450 uppercase font-black tracking-wider">Bill To</h4>
                    <div className="text-[10px] text-gray-500 font-bold leading-normal">
                      <p className="text-brand-navy font-black text-xs">{firstName} {lastName}</p>
                      <p>{addressLine1}, {addressLine2}</p>
                      <p>{city}, {stateProv} {zipCode}</p>
                      <p>{country}</p>
                      <p className="text-brand-blue mt-1 font-semibold">{email}</p>
                      <p>{phone}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-150 pt-4 space-y-3">
                    <div className="flex justify-between text-[11px] font-bold text-gray-550">
                      <span>Course</span>
                      <span>Amount</span>
                    </div>
                    
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-[10px] text-brand-navy font-black max-w-[200px] leading-tight">{activeInvoice.course}</span>
                      <span className="text-xs font-black text-brand-navy">{activeInvoice.amount}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-50 space-y-1 text-[10px] text-gray-550 font-bold">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{activeInvoice.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (0%)</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-50 text-xs font-black">
                        <span>Total</span>
                        <span className="text-brand-blue font-mono">{activeInvoice.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback View for Other Menus */}
          {activeMenu !== "Dashboard" && activeMenu !== "My Profile" && activeMenu !== "My Orders" && activeMenu !== "Invoices" && (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center space-y-4 text-left">
              <h3 className="text-lg font-black text-brand-navy">{activeMenu}</h3>
              <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-md mx-auto">
                This dashboard component is fully styled and connected in the frontend router. Once backend schema API integration starts, this block will display direct database sync.
              </p>
              <button
                onClick={() => setActiveMenu("Dashboard")}
                className="rounded-xl bg-brand-navy text-white px-6 py-3.5 text-xs font-bold transition-all hover:scale-[1.01]"
              >
                Back to Dashboard Home
              </button>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================
          3. DYNAMIC RAISE A REQUEST MODAL POPUP
          ========================================== */}
      {isRaiseRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-150 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsRaiseRequestOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-655 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSubmitRequest} className="p-8 space-y-6 text-left">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-brand-navy">Raise a Request</h3>
                <p className="text-xs text-gray-450 font-semibold">
                  Please provide the details below and our support team will get back to you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Request Type *</label>
                  <select
                    required
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  >
                    <option value="">Select a request type</option>
                    <option value="Billing / Payment">Billing / Payment Support</option>
                    <option value="Course Access">Course Access Issues</option>
                    <option value="Material Download">Materials Download Issue</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-505 font-bold">Related To (Optional)</label>
                  <select
                    value={relatedTo}
                    onChange={(e) => setRelatedTo(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  >
                    <option value="">Select an order or course</option>
                    {finalOrdersList.map((ord) => (
                      <option key={ord.orderId} value={ord.course}>{ord.course} ({ord.orderId})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Briefly describe your request"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please provide as much detail as possible..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue resize-none"
                ></textarea>
                <div className="flex justify-between text-[9px] text-gray-400 font-bold pt-1">
                  <span>Minimum 10 characters</span>
                  <span>{description.length}/1000</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-bold">Add Attachment (Optional)</label>
                <div className="border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <UploadCloud size={28} className="text-brand-blue" />
                  <p className="text-[10px] font-bold text-gray-655">
                    Drag and drop files here or <span className="text-brand-blue hover:underline">click to browse</span>
                  </p>
                  <p className="text-[8px] text-gray-450 font-bold">PDF, JPG, PNG up to 10MB each</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 max-w-sm">
                  <Info size={14} className="text-brand-blue shrink-0" />
                  <div className="text-[9px] text-gray-455 font-bold leading-normal">
                    <p className="text-brand-navy font-black">What happens next?</p>
                    <p className="mt-0.5">Our support team will review your request and get back to you via email within 1 business day.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto justify-end shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsRaiseRequestOpen(false)}
                    className="rounded-xl border border-gray-200 hover:bg-slate-50 px-5 py-3 text-xs font-bold text-gray-500 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-brand-blue hover:bg-opacity-95 px-5 py-3 text-xs font-bold text-white transition-colors cursor-pointer shadow-md shadow-blue-500/10"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          4. DYNAMIC REQUEST A CALLBACK MODAL POPUP
          ========================================== */}
      {isCallbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-150 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close trigger */}
            <button
              onClick={() => setIsCallbackModalOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-655 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleCallbackSubmit} className="p-8 space-y-6 text-left">
              
              {/* Header Box aligned side-by-side cleanly */}
              <div className="flex items-center gap-4 border-b border-gray-50 pb-5">
                <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-navy">Request a Callback</h3>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5">Leave your details and our support team will call you back.</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={cbFullName}
                  onChange={(e) => setCbFullName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none focus:border-brand-blue"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={cbEmail}
                    onChange={(e) => setCbEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none focus:border-brand-blue"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Phone Number *</label>
                  <div className="flex rounded-xl border border-gray-200 focus-within:border-brand-blue overflow-hidden bg-white">
                    <select className="bg-slate-50 border-r border-gray-200 px-3 flex items-center text-xs font-bold text-gray-650 outline-none cursor-pointer">
                      <option>US +1</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="(201) 555-0123"
                      value={cbPhone}
                      onChange={(e) => setCbPhone(e.target.value)}
                      className="flex-1 px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Best Time & Time Zone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-505 font-bold">Best Time to Call *</label>
                  <select
                    required
                    value={cbTimeSlot}
                    onChange={(e) => setCbTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none focus:border-brand-blue"
                  >
                    <option value="">Select a time slot</option>
                    <option value="9:00 AM - 12:00 PM">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="12:00 PM - 3:00 PM">Afternoon (12:00 PM - 3:00 PM)</option>
                    <option value="3:00 PM - 6:00 PM">Late Afternoon (3:00 PM - 6:00 PM)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Time Zone *</label>
                  <select
                    value={cbTimezone}
                    onChange={(e) => setCbTimezone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none focus:border-brand-blue"
                  >
                    <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                    <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Reason for Callback (Optional)</label>
                <select
                  value={cbReason}
                  onChange={(e) => setCbReason(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none focus:border-brand-blue"
                >
                  <option value="">Select a reason</option>
                  <option value="Course Inquiry">Inquiring about a Course</option>
                  <option value="Corporate Training">Corporate B2B training enquiry</option>
                  <option value="Corporate Discount">Group booking discounts</option>
                </select>
              </div>

              {/* Details */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-505 font-bold">Additional Details (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Please provide any additional details that will help us assist you better..."
                  value={cbDetails}
                  onChange={(e) => setCbDetails(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-705 outline-none focus:border-brand-blue resize-none"
                ></textarea>
                <div className="text-right text-[9px] text-gray-400 font-bold pt-1">
                  {cbDetails.length}/500 characters
                </div>
              </div>

              {/* Notice & Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 max-w-sm">
                  <Clock size={14} className="text-brand-blue shrink-0 mt-0.5" />
                  <div className="text-[9px] text-gray-455 font-bold leading-normal">
                    <p className="text-brand-navy font-black">What happens next?</p>
                    <p className="mt-0.5">Our support team will call you at the selected time. If we miss you, we'll try again or you can contact us.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto justify-end items-center">
                  <button
                    type="button"
                    onClick={() => setIsCallbackModalOpen(false)}
                    className="rounded-xl border border-gray-200 hover:bg-slate-50 px-5 py-3 text-xs font-bold text-gray-500 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-brand-blue hover:bg-opacity-95 px-5 py-3 text-xs font-bold text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    <PhoneCall size={12} />
                    Request Callback
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          5. DYNAMIC BOOK A CONSULTATION MODAL POPUP
          ========================================== */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-150 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close trigger */}
            <button
              onClick={() => setIsConsultationOpen(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-650 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleConsultationSubmit} className="p-8 space-y-5 text-left">
              
              {/* Header section with conversation user icon */}
              <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-navy">Book a Consultation</h3>
                  <p className="text-[10px] text-gray-450 font-bold mt-0.5">Schedule a one-on-one session with our expert.</p>
                </div>
              </div>

              {/* Banner notification bar */}
              <div className="bg-blue-50/70 border border-blue-100/60 rounded-2xl p-4 flex items-start gap-3">
                <Info size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <p className="text-[10.5px] text-gray-600 font-bold leading-relaxed">
                  Our experts are here to help you choose the right certification path, understand the exam process, and answer your questions.
                </p>
              </div>

              {/* Full Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={consultEmail}
                    onChange={(e) => setConsultEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              {/* Phone & Preferred Time Zone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Phone Number *</label>
                  <div className="flex rounded-xl border border-gray-200 focus-within:border-brand-blue overflow-hidden bg-white">
                    <select className="bg-slate-50 border-r border-gray-200 px-3 flex items-center text-xs font-bold text-gray-650 outline-none cursor-pointer">
                      <option>🇺🇸 +1</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="(201) 555-0123"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="flex-1 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Preferred Time Zone *</label>
                  <select
                    value={consultTimezone}
                    onChange={(e) => setConsultTimezone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  >
                    <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                    <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                  </select>
                </div>
              </div>

              {/* Consultation Topic */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Consultation Topic *</label>
                <select
                  required
                  value={consultTopic}
                  onChange={(e) => setConsultTopic(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                >
                  <option value="">Select a topic</option>
                  <option value="Certification Path Guidance">Certification Path Guidance</option>
                  <option value="Exam Preparation Strategy">Exam Preparation Strategy</option>
                  <option value="Corporate Training Discount">Corporate Training Discounts</option>
                </select>
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Preferred Date *</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={consultDate}
                      onChange={(e) => setConsultDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 bg-white outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Preferred Time *</label>
                  <div className="relative">
                    <Clock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      required
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                    >
                      <option value="">Select a time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Discuss detail box */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">What would you like to discuss? (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you'd like help with so we can prepare for your consultation."
                  value={consultDiscuss}
                  onChange={(e) => setConsultDiscuss(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue resize-none"
                ></textarea>
                <div className="text-right text-[9px] text-gray-400 font-bold pt-1">
                  {consultDiscuss.length}/500 characters
                </div>
              </div>

              {/* How it works info footer bar */}
              <div className="bg-slate-50 border border-gray-150 rounded-2xl p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-100/60 flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
                  <Calendar size={16} />
                </div>
                <div className="text-[10px] text-gray-500 font-bold leading-normal">
                  <p className="text-brand-navy font-black">How it works</p>
                  <p className="mt-0.5">After you submit your request, our team will review your availability and confirm your consultation via email.</p>
                </div>
              </div>

              {/* Modal controls */}
              <div className="flex gap-2.5 justify-end pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(false)}
                  className="rounded-xl border border-gray-200 hover:bg-slate-50 px-5 py-3 text-xs font-bold text-gray-500 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-blue hover:bg-opacity-95 px-5 py-3 text-xs font-bold text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <Calendar size={12} />
                  Request Consultation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Secure protection footer */}
      <div className="bg-white border-t border-gray-100 py-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold">
        <Shield size={14} className="text-brand-blue shrink-0" />
        <span>Your data is secure with us. We use 256-bit SSL encryption to protect your information.</span>
      </div>

      <Footer />
    </div>
  );
}
