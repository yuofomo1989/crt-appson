"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid, BookOpen, Calendar, Users, ShoppingCart, Headphones, Plus, Search, Edit3, Trash2, CheckCircle2, Clock, Filter, DollarSign, TrendingUp, ChevronDown, Eye, X, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  // API Metrics state
  const [metrics, setMetrics] = useState({
    total_courses: 3,
    total_schedules: 2,
    total_leads: 5,
    new_leads: 2,
    total_orders: 4,
    total_revenue: 4380,
    total_students: 12
  });

  // Data List States
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Course Modal State
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category_name: "Project Management",
    level: "Intermediate",
    price: "",
    original_price: "",
    duration: "4 Days (35 Contact Hours)",
    badge: "Best Seller"
  });

  // Fetch Admin Metrics and Data from Local Laravel API
  const fetchAdminData = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    try {
      // 1. Metrics
      const mRes = await fetch(`${apiUrl}/admin/dashboard`);
      const mData = await mRes.json();
      if (mData.status === 'success') setMetrics(mData.data);

      // 2. Courses
      const cRes = await fetch(`${apiUrl}/courses`);
      const cData = await cRes.json();
      if (cData.status === 'success') setCourses(cData.data);

      // 3. Schedules
      const sRes = await fetch(`${apiUrl}/schedules`);
      const sData = await sRes.json();
      if (sData.status === 'success') setSchedules(sData.data);

      // 4. Leads
      const lRes = await fetch(`${apiUrl}/admin/leads`);
      const lData = await lRes.json();
      if (lData.status === 'success') setLeads(lData.data.data || []);

      // 5. Orders
      const oRes = await fetch(`${apiUrl}/admin/orders`);
      const oData = await oRes.json();
      if (oData.status === 'success') setOrders(oData.data.data || []);

    } catch (err) {
      console.log('Local Admin API fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Add Course Submit
  const handleAddCourse = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    try {
      const res = await fetch(`${apiUrl}/admin/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(newCourse)
      });
      if (res.ok) {
        alert("Course added successfully!");
        setIsAddCourseOpen(false);
        setNewCourse({
          title: "",
          category_name: "Project Management",
          level: "Intermediate",
          price: "",
          original_price: "",
          duration: "4 Days (35 Contact Hours)",
          badge: "Best Seller"
        });
        fetchAdminData();
      }
    } catch (err) {
      alert("Error adding course");
    }
  };

  // Handle Lead Status Update
  const handleUpdateLead = async (leadId, newStatus) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    try {
      await fetch(`${apiUrl}/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased">
      
      {/* ==========================================
          1. ADMIN HEADER BAR
          ========================================== */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-blue to-indigo-600 font-black text-white text-lg shadow-md">
            CP
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              Certification Planner <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30">ADMIN PORTAL</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Manage Courses, Batches, Student Leads & Revenue</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchAdminData} 
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Data
          </button>
          
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-brand-blue hover:bg-blue-600 px-4 py-2 rounded-xl transition-colors shadow-md shadow-blue-500/20"
          >
            🌐 View Frontend Website
          </Link>
        </div>
      </header>

      {/* ==========================================
          2. DASHBOARD BODY (SIDEBAR & WORKSPACE)
          ========================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 text-left">
          <div className="space-y-6">
            
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black px-3 pb-1">Main Management</p>
              {[
                { name: "Dashboard", icon: <LayoutGrid size={16} /> },
                { name: "Courses Catalog", icon: <BookOpen size={16} />, badge: metrics.total_courses },
                { name: "Batches & Schedules", icon: <Calendar size={16} />, badge: metrics.total_schedules },
                { name: "Leads & Inquiries", icon: <Headphones size={16} />, badge: metrics.new_leads, badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
                { name: "Orders & Sales", icon: <ShoppingCart size={16} />, badge: metrics.total_orders },
                { name: "Registered Students", icon: <Users size={16} /> }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all text-left ${
                    activeTab === item.name ? "bg-brand-blue text-white shadow-md shadow-blue-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border ${item.badgeColor || "bg-slate-800 text-slate-300 border-slate-700"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-left">
            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400">Connected Environment</p>
              <p className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Laravel Local REST API
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 bg-slate-950 p-6 md:p-8 overflow-y-auto space-y-8 text-left">
          
          {/* ==========================================
              TAB 1: DASHBOARD METRICS & OVERVIEW
              ========================================== */}
          {activeTab === "Dashboard" && (
            <div className="space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">System Overview & Analytics</h2>
                  <p className="text-xs text-slate-400 font-medium">Real-time status of your courses, enrollment leads and student orders.</p>
                </div>
                <button
                  onClick={() => setIsAddCourseOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-brand-orange hover:bg-orange-600 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  <Plus size={16} /> Add New Course
                </button>
              </div>

              {/* Top Stats Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Total Revenue</span>
                    <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <DollarSign size={18} />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white">${metrics.total_revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <ArrowUpRight size={12} /> Live from Checkout API
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Total Courses</span>
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      <BookOpen size={18} />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white">{metrics.total_courses}</p>
                  <p className="text-[10px] text-blue-400 font-bold">Active in Catalog</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">New Leads</span>
                    <div className="h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                      <Headphones size={18} />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white">{metrics.new_leads}</p>
                  <p className="text-[10px] text-orange-400 font-bold">Requires Advisor Follow-up</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Total Orders</span>
                    <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                      <ShoppingCart size={18} />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-black text-white">{metrics.total_orders}</p>
                  <p className="text-[10px] text-purple-400 font-bold">Student Enrollments</p>
                </div>
              </div>

              {/* Recent Inquiries & Recent Orders Dual Table */}
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Consultation Inquiries */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Headphones size={16} className="text-brand-orange" /> Recent Inquiries & Leads
                    </h3>
                    <button onClick={() => setActiveTab("Leads & Inquiries")} className="text-xs text-brand-blue hover:underline font-bold">
                      View All Leads ➔
                    </button>
                  </div>

                  <div className="space-y-3">
                    {leads.length > 0 ? (
                      leads.slice(0, 4).map((lead, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-white">{lead.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{lead.email} | {lead.phone || 'No phone'}</p>
                            <p className="text-[10px] text-brand-blue font-semibold">Interested in: {lead.course || 'General Consultation'}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded text-[9px] font-black border ${lead.status === 'new' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                            {lead.status.toUpperCase()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-slate-500 font-medium">No leads submitted yet. Submit a consultation form on the website to test live submission!</div>
                    )}
                  </div>
                </div>

                {/* Recent Student Orders */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShoppingCart size={16} className="text-emerald-400" /> Recent Enrollments & Orders
                    </h3>
                    <button onClick={() => setActiveTab("Orders & Sales")} className="text-xs text-brand-blue hover:underline font-bold">
                      View All Orders ➔
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.length > 0 ? (
                      orders.slice(0, 4).map((ord, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-mono font-bold text-brand-blue">{ord.order_number}</p>
                            <p className="text-xs font-bold text-white">{ord.customer_name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{ord.customer_email}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-sm font-black text-white">${ord.total_amount}</p>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {ord.payment_status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-slate-500 font-medium">No order enrollments yet. Complete a checkout on the website to test live order processing!</div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================
              TAB 2: COURSES CATALOG MANAGEMENT
              ========================================== */}
          {activeTab === "Courses Catalog" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Course Management</h2>
                  <p className="text-xs text-slate-400 font-medium">View and add training certifications available to students.</p>
                </div>
                <button
                  onClick={() => setIsAddCourseOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-brand-blue hover:bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  <Plus size={16} /> Create New Course
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                <table className="w-full text-left text-xs font-medium text-slate-300">
                  <thead className="bg-slate-850 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4 pl-6">Title & Slug</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Badge</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {courses.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                        <td className="p-4 pl-6">
                          <p className="font-bold text-white text-sm">{c.title}</p>
                          <p className="text-[10px] text-slate-500 font-mono">/{c.slug}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {c.category_name}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-slate-300">{c.level}</td>
                        <td className="p-4 font-black text-white">${c.price}</td>
                        <td className="p-4 font-bold text-amber-400">⭐ {c.rating} ({c.reviews_count})</td>
                        <td className="p-4">
                          {c.badge && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                              {c.badge}
                            </span>
                          )}
                        </td>
                        <td className="p-4 pr-6 text-right space-x-2">
                          <button className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700">
                            <Edit3 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 3: LEADS & INQUIRIES MANAGEMENT
              ========================================== */}
          {activeTab === "Leads & Inquiries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Leads & Inquiries</h2>
                  <p className="text-xs text-slate-400 font-medium">Inquiries submitted through Free Consultation & Callback forms.</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                <table className="w-full text-left text-xs font-medium text-slate-300">
                  <thead className="bg-slate-850 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4 pl-6">Student Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Interested Course</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 pr-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.length > 0 ? (
                      leads.map((l, idx) => (
                        <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                          <td className="p-4 pl-6 font-bold text-white">{l.name}</td>
                          <td className="p-4 text-slate-300">{l.email}</td>
                          <td className="p-4 text-slate-300">{l.phone || 'N/A'}</td>
                          <td className="p-4 font-bold text-brand-blue">{l.course || 'General Inquiry'}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded text-[9px] font-black border ${l.status === 'new' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                              {l.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            {l.status === 'new' && (
                              <button
                                onClick={() => handleUpdateLead(l.id, 'contacted')}
                                className="px-3 py-1 rounded.xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] cursor-pointer"
                              >
                                Mark Contacted
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">No leads submitted yet. Open the consultation modal on the main website to post a live lead!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 4: ORDERS & SALES
              ========================================== */}
          {activeTab === "Orders & Sales" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Student Orders & Sales</h2>
                <p className="text-xs text-slate-400 font-medium">Recorded course enrollments and checkout transactions.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                <table className="w-full text-left text-xs font-medium text-slate-300">
                  <thead className="bg-slate-850 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4 pl-6">Order Number</th>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Purchased Course</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orders.length > 0 ? (
                      orders.map((o, idx) => (
                        <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                          <td className="p-4 pl-6 font-mono font-bold text-brand-blue">{o.order_number}</td>
                          <td className="p-4 font-bold text-white">{o.customer_name}</td>
                          <td className="p-4 text-slate-400">{o.customer_email}</td>
                          <td className="p-4 font-bold text-slate-200">
                            {o.items && o.items.length > 0 ? o.items[0].course_name : 'Course Enrollment'}
                          </td>
                          <td className="p-4 font-black text-white">${o.total_amount}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {o.payment_status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">No orders recorded yet. Place an order on the checkout page to test live order processing!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================
          MODAL: ADD NEW COURSE
          ========================================== */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white">Create New Course</h3>
              <button onClick={() => setIsAddCourseOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-4 text-xs font-semibold text-slate-300">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scrum Master Certification"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Category</label>
                  <select
                    value={newCourse.category_name}
                    onChange={(e) => setNewCourse({ ...newCourse, category_name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white outline-none"
                  >
                    <option>Project Management</option>
                    <option>Cybersecurity</option>
                    <option>Cloud & IT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-white outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Price ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1095"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Original Price ($)</label>
                  <input
                    type="number"
                    placeholder="1495"
                    value={newCourse.original_price}
                    onChange={(e) => setNewCourse({ ...newCourse, original_price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
              >
                Save & Publish Course
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
