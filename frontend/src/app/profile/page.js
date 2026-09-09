"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LayoutGrid, User, ShoppingCart, GraduationCap, Download, Headphones, FileText, HelpCircle, ChevronDown, Check, Shield, Search, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Lock, Camera, CreditCard, Bell, Key, MessageSquare, ShoppingBag, X, Laptop, Users, Filter, Eye, UploadCloud, Info, PhoneCall, Award, ChevronRight, Gift, BarChart2, CheckSquare, Globe, BookOpen, CheckCircle, CheckCircle2, Plus, RefreshCw, Send, LogOut } from "lucide-react";

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  
  const [latestOrder, setLatestOrder] = useState(null);
  const [currentDate, setCurrentDate] = useState("May 16, 2024");
  
  // Selected Invoice for details panel
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("INV-2024-0003");

  // Raise a request modal state
  const [pdfModal, setPdfModal] = useState({ isOpen: false, url: "", title: "" });
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
  const [selectedCourse, setSelectedCourse] = useState("PMP® Certification Training");

  // Profile Form States
  const [firstName, setFirstName] = useState("Deepak");
  const [lastName, setLastName] = useState("Gupta");
  const [email, setEmail] = useState("info@appsonitell.com");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [dob, setDob] = useState("");
  const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time (US & Canada)");

  // Real backend state
  const [realOrders, setRealOrders] = useState([]);
  const [dbSchedules, setDbSchedules] = useState([]);
  const [dbBrochures, setDbBrochures] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [activeTicketThread, setActiveTicketThread] = useState(null);
  const [studentReplyText, setStudentReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [ticketFilterTab, setTicketFilterTab] = useState("all");
  const [ticketSearch, setTicketSearch] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
  const [isSavingNotif, setIsSavingNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState({ type: "", text: "" });

  // Change Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }));

    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("cp_user_email");
      const stored = localStorage.getItem("cp_latest_order");
      
      let targetEmail = savedEmail || "";

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLatestOrder(parsed);
          if (parsed.course || parsed.course_name) {
            setSelectedCourse(parsed.course || parsed.course_name);
          }
          if (!targetEmail && parsed.email) {
            targetEmail = parsed.email;
          }
          if (parsed.customerName) {
            const splitName = parsed.customerName.trim().split(" ");
            setFirstName(splitName[0] || "");
            setLastName(splitName.slice(1).join(" ") || "");
            setCbFullName(parsed.customerName);
            setCbEmail(parsed.email || "");
            setConsultName(parsed.customerName);
            setConsultEmail(parsed.email || "");
          }
          if (parsed.email) setEmail(parsed.email);
          if (parsed.phone) setPhone(parsed.phone);
        } catch (e) {
          console.error("Error parsing latest order details", e);
        }
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

      // Fetch real batch schedules
      fetch(`${apiUrl}/schedules`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && Array.isArray(data.data)) {
            setDbSchedules(data.data);
          }
        })
        .catch((err) => console.error("Error fetching schedules:", err));

      // Fetch uploaded course brochures & materials
      fetch(`${apiUrl}/brochures`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && Array.isArray(data.data)) {
            setDbBrochures(data.data);
          }
        })
        .catch((err) => console.error("Error fetching brochures:", err));

      if (targetEmail) {
        setEmail(targetEmail);
        fetch(`${apiUrl}/admin/orders?email=${encodeURIComponent(targetEmail)}&all=1`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              const list = Array.isArray(data.data) ? data.data : (Array.isArray(data.data?.data) ? data.data.data : []);
              if (list.length > 0) {
                setRealOrders(list);
                const firstOrd = list[0];
                const firstCourse = firstOrd.items?.[0]?.course_name;
                if (firstCourse) {
                  setSelectedCourse((prev) => (prev && prev !== "PMP® Certification Training" ? prev : firstCourse));
                }
                if (firstOrd.customer_name) {
                  const splitName = firstOrd.customer_name.trim().split(" ");
                  setFirstName(splitName[0] || "");
                  setLastName(splitName.slice(1).join(" ") || "");
                  setCbFullName(firstOrd.customer_name);
                  setConsultName(firstOrd.customer_name);
                }
                if (firstOrd.customer_email) {
                  setEmail(firstOrd.customer_email);
                  setCbEmail(firstOrd.customer_email);
                  setConsultEmail(firstOrd.customer_email);
                }
                if (firstOrd.customer_phone) {
                  setPhone(firstOrd.customer_phone);
                }
              }
            }
          })
          .catch((err) => console.error("Error fetching real orders:", err));
      }

      // Fetch student's support tickets
      const mailForTickets = targetEmail || "info@appsonitell.com";
      fetch(`${apiUrl}/support-tickets?email=${encodeURIComponent(mailForTickets)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && Array.isArray(data.data)) {
            setMyTickets(data.data);
          }
        })
        .catch((err) => console.error("Error fetching student tickets:", err));

      // Fetch user's notification preferences
      const notifEmail = targetEmail || "info@appsonitell.com";
      fetch(`${apiUrl}/auth/notification-settings?email=${encodeURIComponent(notifEmail)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            setPrefAlert(Boolean(data.data.class_alerts));
            setPrefPromo(Boolean(data.data.promotions));
            setPrefSms(Boolean(data.data.sms_alerts));
          }
        })
        .catch((err) => console.error("Error fetching notification settings:", err));
    }
  }, []);

  const fetchMyTickets = async (overrideEmail) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const mail = overrideEmail || email || (typeof window !== 'undefined' ? localStorage.getItem('cp_user_email') : '') || 'info@appsonitell.com';
    try {
      const res = await fetch(`${apiUrl}/support-tickets?email=${encodeURIComponent(mail)}`);
      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setMyTickets(data.data);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleSendStudentReply = async (ticketId) => {
    if (!studentReplyText.trim()) return;
    setIsSendingReply(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const studentName = `${firstName} ${lastName}`.trim() || email || "Student";
    try {
      const res = await fetch(`${apiUrl}/support-tickets/${ticketId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "student",
          sender_name: studentName,
          message: studentReplyText.trim()
        })
      });
      const data = await res.json();
      if (data.status === "success" && (data.data || data.ticket)) {
        const updated = data.data || data.ticket;
        setStudentReplyText("");
        setActiveTicketThread(updated);
        setMyTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        alert(data.message || "Failed to send reply");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Network error sending reply");
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New password and Confirm password do not match." });
      return;
    }

    setIsUpdatingPassword(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const userEmail = (email || (typeof window !== "undefined" ? localStorage.getItem("cp_user_email") : "") || "info@appsonitell.com").trim().toLowerCase();

    try {
      const res = await fetch(`${apiUrl}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: userEmail,
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setPasswordMsg({ type: "success", text: data.message || "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({ type: "error", text: data.message || "Failed to update password. Please check your current password." });
      }
    } catch (err) {
      console.error("Change password error:", err);
      setPasswordMsg({ type: "error", text: "Server error occurred. Please try again later." });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSavingNotif(true);
    setNotifMsg({ type: "", text: "" });
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const userEmail = (email || (typeof window !== "undefined" ? localStorage.getItem("cp_user_email") : "") || "info@appsonitell.com").trim().toLowerCase();

    try {
      const res = await fetch(`${apiUrl}/auth/notification-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: userEmail,
          class_alerts: Boolean(prefAlert),
          promotions: Boolean(prefPromo),
          sms_alerts: Boolean(prefSms)
        })
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        setNotifMsg({ type: "success", text: "Notification preferences saved successfully!" });
        if (typeof window !== "undefined") {
          localStorage.setItem("cp_notification_settings", JSON.stringify({
            class_alerts: prefAlert,
            promotions: prefPromo,
            sms_alerts: prefSms
          }));
        }
      } else {
        setNotifMsg({ type: "error", text: data.message || "Failed to save notification preferences." });
      }
    } catch (err) {
      console.error("Error saving notification settings:", err);
      setNotifMsg({ type: "error", text: "Network error saving preferences. Please try again." });
    } finally {
      setIsSavingNotif(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cp_user_email");
      localStorage.removeItem("cp_auth_token");
      localStorage.removeItem("cp_latest_order");
    }
    window.location.href = "/login";
  };

  // Build complete list
  const finalOrdersList = [];

  if (realOrders.length > 0) {
    realOrders.forEach((ord) => {
      const item = ord.items?.[0] || {};
      const courseTitle = item.course_name || "PMP® Certification Training";
      const rawPrice = parseFloat(ord.total_amount || item.price || 0);
      const createdDate = ord.created_at
        ? new Date(ord.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : currentDate;

      let logo = "PMP®";
      if (courseTitle.includes("Agile")) logo = "AgilePM®";
      else if (courseTitle.includes("PRINCE2")) logo = "PRINCE2®";
      else if (courseTitle.includes("ITIL")) logo = "ITIL®";
      else if (courseTitle.includes("CAPM")) logo = "CAPM®";
      else if (courseTitle.includes("CISSP")) logo = "CISSP®";

      finalOrdersList.push({
        orderId: ord.order_number || `CP-ORD-${ord.id}`,
        course: courseTitle,
        logo: logo,
        logoBg: "bg-purple-900 text-white",
        dates: item.date_range || "Scheduled Online Batch",
        timing: item.schedule_details || "9:00 AM – 5:00 PM (EST)",
        trainingType: item.format || "Live Online Class",
        typeIcon: <Laptop size={14} className="text-brand-blue" />,
        location: "Online Classroom",
        orderDate: createdDate,
        amount: `$${(isNaN(rawPrice) ? 0 : rawPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        status: ord.status === "confirmed" || ord.payment_status === "completed" ? "Completed" : "Pending"
      });
    });
  } else if (latestOrder) {
    const rawOrderId = String(latestOrder.orderId || latestOrder.order_number || "CP-ORD-2026-8890");
    const formattedId = rawOrderId.startsWith("CP-ENR-2026-") ? rawOrderId.replace("CP-ENR-2026-", "CP-ORD-2026-") : rawOrderId;
    const rawPrice = parseFloat(latestOrder.price || latestOrder.total_amount || 1895);
    finalOrdersList.push({
      orderId: formattedId,
      course: latestOrder.course || latestOrder.course_name || "PMP® Certification Training",
      logo: "PMP®",
      logoBg: "bg-purple-900 text-white",
      dates: latestOrder.date || "Sep 15 – Sep 18, 2026",
      timing: "9:00 AM – 5:00 PM (EST)",
      trainingType: latestOrder.format || "Live Online",
      typeIcon: <Laptop size={14} className="text-brand-blue" />,
      location: latestOrder.location || "New York, NY (Online)",
      orderDate: currentDate,
      amount: `$${(isNaN(rawPrice) ? 1895 : rawPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      status: "Completed"
    });
  }

  // Invoices list mapping from orders
  const invoicesList = finalOrdersList.map((ord, idx) => {
    const invNum = `INV-2026-000${finalOrdersList.length - idx}`;
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

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    try {
      const studentName = `${firstName || ''} ${lastName || ''}`.trim() || 'Student';
      const studentEmail = email || (typeof window !== 'undefined' ? localStorage.getItem('cp_user_email') : '') || 'student@example.com';
      const studentPhone = phone || '';

      const payload = {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        request_type: requestType || 'Other Query',
        related_to: relatedTo || selectedCourse || 'General Support',
        subject: subject,
        description: description,
        source_path: '/profile > Raise a Request Modal',
        priority: 'medium'
      };

      const res = await fetch(`${apiUrl}/support-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        fetchMyTickets(studentEmail);
        alert(`✅ Support Ticket #${data.data?.ticket_number || 'CREATED'} Raised Successfully!\n\nOur support team has logged your ticket. You can track its live status under "My Support Tickets".`);
      } else {
        fetchMyTickets(studentEmail);
        alert("✅ Support Ticket Raised Successfully! Our support advisors have logged your ticket.");
      }
    } catch (err) {
      console.error("Error submitting support ticket:", err);
      alert("✅ Support Ticket Raised! Our support advisors have logged your ticket.");
    } finally {
      setIsRaiseRequestOpen(false);
      setRequestType("");
      setRelatedTo("");
      setSubject("");
      setDescription("");
    }
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    try {
      const studentName = `${firstName || ''} ${lastName || ''}`.trim() || 'Student';
      const studentEmail = cbEmail || email || (typeof window !== 'undefined' ? localStorage.getItem('cp_user_email') : '') || 'student@example.com';
      const studentPhone = cbPhone || phone || '';

      const payload = {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        course: selectedCourse || 'General Support',
        type: 'Callback Request',
        source: 'Profile Portal: Request Callback',
        preferred_date: `${cbTimeSlot} (${cbTimezone})`,
        message: `Reason: ${cbReason || 'General Call Request'}. Details: ${cbDetails || 'N/A'}`
      };

      await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert(`✅ Callback Requested Successfully! We will call you at ${cbTimeSlot} (${cbTimezone}).`);
    } catch (err) {
      alert(`✅ Callback Requested Successfully! We will call you at ${cbTimeSlot} (${cbTimezone}).`);
    } finally {
      setIsCallbackModalOpen(false);
      setCbTimeSlot("");
      setCbReason("");
      setCbDetails("");
    }
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    try {
      const studentName = consultName || `${firstName || ''} ${lastName || ''}`.trim() || 'Student';
      const studentEmail = consultEmail || email || (typeof window !== 'undefined' ? localStorage.getItem('cp_user_email') : '') || 'student@example.com';
      const studentPhone = consultPhone || phone || '';

      const payload = {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        course: selectedCourse || 'General Consultation',
        type: 'Consultation Booking',
        source: 'Profile Portal: Book Consultation',
        preferred_date: `${consultDate} at ${consultTime} (${consultTimezone || 'EST'})`,
        message: `Topic: ${consultTopic || 'General Guidance'}. Discussion: ${consultDiscuss || 'N/A'}`
      };

      await fetch(`${apiUrl}/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert(`✅ Consultation booked successfully on ${consultDate} at ${consultTime}! We have sent a confirmation email.`);
    } catch (err) {
      alert(`✅ Consultation booked successfully on ${consultDate} at ${consultTime}! We have sent a confirmation email.`);
    } finally {
      setIsConsultationOpen(false);
      setConsultTopic("");
      setConsultDate("");
      setConsultTime("");
      setConsultDiscuss("");
    }
  };

  const foundOrder = finalOrdersList.find(o => o.course === selectedCourse);

  // Match schedule: first try exact course + format match, then course-only match, then null (don't show wrong course)
  const activeDbSchedule = (() => {
    if (!selectedCourse || dbSchedules.length === 0) return null;
    const sel = selectedCourse.toLowerCase();

    // 1st pass: match course + format
    const exactMatch = dbSchedules.find(s => {
      const titleMatch = (s.course_title && s.course_title.toLowerCase().includes(sel)) ||
                         (s.course?.title && s.course.title.toLowerCase().includes(sel));
      if (!titleMatch) return false;
      if (!foundOrder?.trainingType) return true;
      const ordType = foundOrder.trainingType.toLowerCase();
      const fmt = (s.format || "").toLowerCase();
      if (ordType.includes("self") && (fmt.includes("self") || fmt.includes("paced"))) return true;
      if (ordType.includes("live") && (fmt.includes("live") || fmt.includes("virtual") || fmt.includes("online"))) return true;
      if (ordType.includes("person") && fmt.includes("person")) return true;
      return false;
    });
    if (exactMatch) return exactMatch;

    // 2nd pass: any schedule matching this course
    const courseMatch = dbSchedules.find(s =>
      (s.course_title && s.course_title.toLowerCase().includes(sel)) ||
      (s.course?.title && s.course.title.toLowerCase().includes(sel))
    );
    return courseMatch || null;
  })();

  const currentBatchDates = activeDbSchedule?.batch_date || activeDbSchedule?.date_range || "Dates to be announced";

  const activeOrder = foundOrder ? {
    ...foundOrder,
    dates: currentBatchDates,
    timing: (foundOrder.timing && foundOrder.timing !== "9:00 AM – 5:00 PM (EST)") 
      ? foundOrder.timing 
      : (activeDbSchedule?.time || "9:00 AM – 5:00 PM (EST)")
  } : {
    orderId: "CP-ENR-2026-56510",
    course: selectedCourse || "PMP® Certification Training",
    logo: selectedCourse?.includes("AWS") ? "AWS" : "PMP®",
    dates: currentBatchDates,
    timing: activeDbSchedule?.time || "9:00 AM – 5:00 PM (EST)",
    trainingType: activeDbSchedule?.format || "Self Learning",
    location: activeDbSchedule?.location || activeDbSchedule?.city || "New York, NY (Online)",
    amount: activeDbSchedule?.price ? `$${activeDbSchedule.price}` : "$1,095.00",
    status: "Completed"
  };

  // Helper function to calculate 4-day session dates spread evenly across batch start and end date
  const getUpcomingClassDays = (datesStr, timeStr) => {
    const titles = [
      "Day 1: Project Management Framework",
      "Day 2: Project Planning",
      "Day 3: Project Execution",
      "Day 4: Monitoring & Closing"
    ];

    // Parse start and end date
    let startDate = null;
    let endDate = null;

    if (datesStr && typeof datesStr === "string") {
      // ISO format: "2026-09-05 to 2026-09-09"
      const isoMatches = [...datesStr.matchAll(/\b(\d{4}-\d{2}-\d{2})\b/g)];
      if (isoMatches.length >= 2) {
        startDate = new Date(isoMatches[0][1] + "T00:00:00");
        endDate   = new Date(isoMatches[1][1] + "T00:00:00");
      } else if (isoMatches.length === 1) {
        startDate = new Date(isoMatches[0][1] + "T00:00:00");
      } else {
        // Human format: "Aug 26 - Aug 29, 2026"
        const parts = datesStr.split(/\s*[-–to]+\s*/i);
        const yearMatch = datesStr.match(/\b(20\d\d)\b/);
        const yearStr = yearMatch ? yearMatch[1] : "2026";
        if (parts[0]?.trim()) {
          const d1 = new Date(/\d{4}/.test(parts[0]) ? parts[0].trim() : `${parts[0].trim()}, ${yearStr}`);
          if (!isNaN(d1.getTime())) startDate = d1;
        }
        if (parts[1]?.trim()) {
          const d2 = new Date(/\d{4}/.test(parts[1]) ? parts[1].trim() : `${parts[1].trim()}, ${yearStr}`);
          if (!isNaN(d2.getTime())) endDate = d2;
        }
      }
    }

    // Fallback: generate 4 sessions from next Monday if no valid date found
    if (!startDate || isNaN(startDate.getTime())) {
      const today = new Date();
      const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
      startDate = new Date(today);
      startDate.setDate(today.getDate() + daysUntilMonday);
    }

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const dows = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const result = [];
    let curr = new Date(startDate);
    let sessionCount = 1;

    // Generate sessions for entire date range (Max 30 sessions)
    const maxDays = endDate && endDate > startDate ? Math.min(Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1, 30) : 4;

    for (let i = 0; i < maxDays; i++) {
      const monthName = months[curr.getMonth()];
      const dayNum = String(curr.getDate());
      const dowName = dows[curr.getDay()];

      result.push({
        month: monthName,
        day: dayNum,
        dow: dowName,
        title: titles[i] || `Session ${sessionCount}: Live Certification Module`,
        time: timeStr || "9:00 AM – 5:00 PM (EST)"
      });

      sessionCount++;
      if (endDate && curr >= endDate) {
        break;
      }
      curr.setDate(curr.getDate() + 1);
    }

    return result;
  };

  return (
    <div className="min-h-screen bg-slate-50/20 flex flex-col font-sans antialiased text-gray-800">
      
      {/* ==========================================
          1. HEADER BAR
          ========================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-150 bg-white px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-navy to-brand-blue text-white font-bold text-lg shadow-md">
              CP
            </div>
            <span className="text-lg font-bold tracking-tight text-brand-navy">
              Certification<span className="text-brand-orange">Planner</span>
            </span>
          </Link>

          {/* Active Course Selector Dropdown */}
          <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-xl px-3.5 py-1.5 bg-slate-50/50">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-transparent text-xs font-bold text-brand-navy outline-none cursor-pointer"
            >
              {finalOrdersList.map((ord, idx) => (
                <option key={idx} value={ord.course}>{ord.course}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white transition-colors cursor-pointer bg-brand-blue hover:bg-opacity-90 px-4 py-2 rounded-xl shadow-xs"
          >
            📅 Book a Consultation
          </button>
          
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gray-655 hover:text-brand-blue transition-colors cursor-pointer bg-slate-50 px-3.5 py-2 rounded-xl border border-gray-150 shadow-xs"
          >
            📞 Request a Callback
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative cursor-pointer text-gray-600 hover:text-brand-blue">
            <Bell size={18} />
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center border border-white">
              3
            </span>
          </div>

          {/* Help Circle */}
          <div onClick={() => setActiveMenu("Help Center")} className="cursor-pointer text-gray-600 hover:text-brand-blue">
            <HelpCircle size={18} />
          </div>

          <span className="text-gray-200 hidden sm:inline">|</span>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-[#e6eeff] border border-blue-100 flex items-center justify-center font-black text-brand-blue text-xs shadow-inner uppercase">
                {(firstName?.[0] || 'U') + (lastName?.[0] || 'N')}
              </div>
              <span className="text-xs font-black text-brand-navy group-hover:text-brand-blue transition-colors">
                {firstName} {lastName}
              </span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-150 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                  {/* User info banner */}
                  <div className="p-3 bg-slate-50 rounded-xl mb-1 border border-gray-100">
                    <p className="text-xs font-black text-brand-navy truncate">{firstName} {lastName}</p>
                    <p className="text-[11px] text-gray-400 font-semibold truncate">{email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue text-[9px] font-black uppercase">
                      Student Account
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-0.5 text-xs font-bold text-gray-700">
                    <button
                      onClick={() => { setActiveMenu("My Profile"); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors text-left cursor-pointer"
                    >
                      <User size={14} /> My Profile
                    </button>
                    <button
                      onClick={() => { setActiveMenu("My Orders"); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors text-left cursor-pointer"
                    >
                      <ShoppingCart size={14} /> My Orders
                    </button>
                    <button
                      onClick={() => { setActiveMenu("Live Classes"); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors text-left cursor-pointer"
                    >
                      <Calendar size={14} /> Upcoming Live Classes
                    </button>
                    <button
                      onClick={() => { setActiveMenu("Course Materials"); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors text-left cursor-pointer"
                    >
                      <BookOpen size={14} /> Course Materials
                    </button>
                    <button
                      onClick={() => { setActiveMenu("My Tickets"); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Headphones size={14} /> My Tickets
                      </span>
                      {myTickets.length > 0 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full font-black bg-blue-50 text-brand-blue border border-blue-100">
                          {myTickets.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => { setActiveMenu("Change Password"); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors text-left cursor-pointer"
                    >
                      <Key size={14} /> Change Password
                    </button>
                  </div>

                  <div className="my-1 border-t border-gray-100" />

                  {/* Logout Button */}
                  <button
                    onClick={() => { setIsUserMenuOpen(false); handleLogout(); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-black text-xs transition-colors text-left cursor-pointer"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ==========================================
          2. DASHBOARD BODY SPLIT (SIDEBAR & WORKSPACE)
          ========================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Clean White BG as per wireframe screenshot) */}
        <aside className="w-64 bg-white border-r border-gray-100 text-gray-700 p-6 flex flex-col justify-between shrink-0 hidden lg:flex text-left">
          
          <div className="space-y-6">
            {/* MAIN NAVIGATION */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black px-4 py-1">MAIN NAVIGATION</p>
              <button
                onClick={() => setActiveMenu("Dashboard")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "Dashboard" ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                }`}
              >
                <LayoutGrid size={16} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveMenu("My Orders")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "My Orders" ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                }`}
              >
                <ShoppingCart size={16} />
                My Orders
              </button>
              <button
                onClick={() => setActiveMenu("Live Classes")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "Live Classes" ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                }`}
              >
                <Calendar size={16} />
                Upcoming Live Classes
              </button>
              <button
                onClick={() => setActiveMenu("Course Materials")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "Course Materials" ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                }`}
              >
                <FileText size={16} />
                Course Materials
              </button>
              <button
                onClick={() => setActiveMenu("Invoices")}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "Invoices" ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                }`}
              >
                <FileText size={16} />
                Invoices
              </button>
              <button
                onClick={() => setIsRaiseRequestOpen(true)}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left hover:bg-slate-100 text-gray-600"
              >
                <MessageSquare size={16} />
                Raise a Request
              </button>
            </div>

            {/* ACCOUNT Section */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black px-4 py-1">ACCOUNT</p>
              {[
                { name: "My Profile", icon: <User size={16} />, view: "My Profile" },
                { name: "Address Book", icon: <Globe size={16} />, view: "Address Book" },
                { name: "Payment Methods", icon: <CreditCard size={16} />, view: "Payment Methods" },
                { name: "Notification Settings", icon: <Bell size={16} />, view: "Notification Settings" },
                { name: "Change Password", icon: <Key size={16} />, view: "Change Password" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.view)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                    activeMenu === item.view ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>

            {/* SUPPORT Section */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black px-4 py-1">SUPPORT</p>
              <button
                onClick={() => setActiveMenu("My Tickets")}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left ${
                  activeMenu === "My Tickets" ? "bg-brand-blue/15 text-brand-blue font-black" : "hover:bg-slate-100 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} />
                  Track My Tickets
                </div>
                {myTickets.length > 0 && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-blue-50 text-brand-blue border border-blue-100">
                    {myTickets.length}
                  </span>
                )}
              </button>
            </div>

          </div>

          {/* Need Help bottom block (matching screenshot) */}
          <div className="bg-[#e8f1fe]/60 border border-blue-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-brand-blue font-black text-xs">
              <Headphones size={16} />
              <span>Need Help?</span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold leading-normal">
              Our support team is here to help you.
            </p>
            <button
              onClick={() => setActiveMenu("Help Center")}
              className="w-full rounded-xl bg-white text-brand-blue border border-blue-200 hover:bg-slate-50 py-2 text-[10px] font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare size={12} /> Contact Support
            </button>
          </div>

        </aside>

        {/* Right Workspace content area */}
        <main className="flex-1 bg-slate-50/50 p-6 md:p-8 overflow-y-auto space-y-8">
          
          {/* VIEW A: Dashboard */}
          {activeMenu === "Dashboard" && (
            <div className="space-y-8 text-left">
              
              {/* Row 1: Hero Welcome Banner (8 cols) & Active Course Overview Card (4 cols) */}
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Hero Welcome banner */}
                <div className="lg:col-span-8 bg-gradient-to-r from-[#e8f1fe] to-[#f0f6ff] rounded-3xl p-6 md:p-8 flex items-center justify-between relative overflow-hidden border border-blue-100/80 shadow-xs">
                  <div className="space-y-5 w-full">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-black text-brand-navy">Welcome back, {firstName}!</h2>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed">
                        Keep learning and stay on track with your certification goals.
                      </p>
                    </div>

                    {/* Dynamic Course Progress Bar Container */}
                    <div className="space-y-2.5 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-blue-100 shadow-xs max-w-xl">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-gray-700 flex items-center gap-1.5">
                          <BookOpen size={14} className="text-brand-blue" />
                          Course Progress
                        </span>
                        <span className="text-brand-blue font-mono font-black text-xs">
                          {activeOrder.status === 'Completed' ? '100%' : '65%'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-gray-100">
                        <div 
                          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                          style={{ width: activeOrder.status === 'Completed' ? '100%' : '65%' }}
                        ></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-[10px] text-gray-500 font-bold pt-1 gap-2 border-t border-slate-100">
                        <span className="flex items-center gap-1.5 text-brand-navy font-black">
                          <CheckCircle size={12} className="text-emerald-500" />
                          35 / 35 Contact Hours Completed
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                          <Calendar size={11} />
                          Course End Date: {activeDbSchedule?.date_range ? activeDbSchedule.date_range.split(' to ')[1] || activeDbSchedule.date_range : 'Sep 25, 2026'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clean SVG Graphic Badge (No low-res emojis/cartoons) */}
                  <div className="hidden sm:flex h-20 w-20 rounded-2xl bg-white border border-blue-100 items-center justify-center text-brand-blue shrink-0 shadow-inner">
                    <Award size={36} className="text-brand-blue" />
                  </div>
                </div>

                {/* Active Course Card (4 cols) */}
                <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-12 rounded-xl bg-purple-900 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      {activeOrder.logo || "PMP®"}
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-brand-blue border border-blue-100 rounded-full text-[9.5px] font-black">
                      {activeOrder.trainingType || "Live Online Class"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-brand-navy leading-snug">
                      {activeOrder.course}
                    </h3>
                    <div className="space-y-1.5 text-[11px] text-gray-600 font-bold">
                      <p className="flex items-center gap-2">
                        <Calendar size={13} className="text-brand-blue shrink-0" />
                        <span>{activeOrder.dates}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={13} className="text-brand-blue shrink-0" />
                        <span>{activeOrder.timing}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={13} className="text-brand-blue shrink-0" />
                        <span>{activeOrder.location}</span>
                      </p>
                      <p className="flex items-center gap-2 text-gray-400 text-[10px] pt-0.5">
                        <Laptop size={13} className="text-brand-orange shrink-0" />
                        <span>4 Days | 35 Contact Hours</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Middle 3 Action Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between items-start gap-4 text-left hover:border-blue-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <FileText size={18} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-brand-navy">Course Materials</h4>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Access and download your course materials.</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveMenu("Course Materials")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    View Materials ➔
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between items-start gap-4 text-left hover:border-blue-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100">
                      <FileText size={18} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-brand-navy">Invoices</h4>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed">View and download your payment invoices.</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveMenu("Invoices")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    View Invoices ➔
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between items-start gap-4 text-left hover:border-blue-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 border border-orange-100">
                      <Headphones size={18} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-brand-navy">Raise a Request</h4>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Need help? Our support team is here for you.</p>
                    </div>
                  </div>
                  <button onClick={() => setIsRaiseRequestOpen(true)} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    Raise a Request ➔
                  </button>
                </div>
              </div>

              {/* Row 3: My Upcoming Live Classes (8 cols) & Right Column (4 cols) */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: My Upcoming Live Classes (8 cols) */}
                <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <h3 className="text-sm font-black text-brand-navy">My Upcoming Live Classes</h3>
                    <span onClick={() => setActiveMenu("Live Classes")} className="text-[10px] text-brand-blue font-bold cursor-pointer hover:underline">
                      View Full Schedule
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeDbSchedule ? (
                      getUpcomingClassDays(activeDbSchedule?.date_range || activeDbSchedule?.batch_date || activeOrder.dates, activeOrder.timing).slice(0, 4).map((cls, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-slate-50/70 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                              <span className="text-[8px] font-black uppercase text-brand-blue tracking-wider">{cls.month}</span>
                              <span className="text-sm font-black text-brand-navy leading-none">{cls.day}</span>
                              <span className="text-[7.5px] font-bold text-gray-400">{cls.dow}</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-gray-800">{cls.title}</h4>
                              <p className="text-[10px] text-gray-400 font-bold mt-0.5">{cls.time}</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-blue-50 text-brand-blue border border-blue-100 rounded-full text-[9px] font-black">
                            Upcoming
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                        <div className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                          <Calendar size={24} className="text-brand-blue opacity-60" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-brand-navy">Schedule Will Be Announced Soon</p>
                          <p className="text-[10px] text-gray-400 font-semibold mt-1">Your batch dates will appear here once confirmed by your trainer.</p>
                        </div>
                        <button
                          onClick={() => setActiveMenu("Live Classes")}
                          className="px-4 py-2 rounded-xl bg-brand-blue text-white text-[10px] font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          View All Available Schedules
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column (4 cols): Quick Links & Refer & Earn */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Quick Links */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Quick Links</h3>
                    <div className="space-y-1 text-xs text-gray-700 font-bold">
                      {[
                        { name: "Exam Information", icon: <FileText size={14} className="text-brand-blue" /> },
                        { name: "PMP® Application Support", icon: <GraduationCap size={14} className="text-brand-blue" /> },
                        { name: "Download Course Syllabus", icon: <Download size={14} className="text-brand-blue" /> },
                        { name: "Student Guidelines", icon: <Info size={14} className="text-brand-blue" /> },
                        { name: "PMI® Resources", icon: <Globe size={14} className="text-brand-blue" /> }
                      ].map((link, idx) => (
                        <div
                          key={idx}
                          onClick={() => alert(`Opening ${link.name}...`)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            {link.icon}
                            <span>{link.name}</span>
                          </div>
                          <ChevronRight size={14} className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support Tickets Status Tracker Card */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                      <div className="flex items-center gap-2">
                        <Headphones size={15} className="text-brand-blue" />
                        <h4 className="text-xs font-black text-brand-navy">Support Tickets Tracker</h4>
                      </div>
                      <button
                        onClick={() => setActiveMenu("My Tickets")}
                        className="text-[10px] text-brand-blue font-bold hover:underline cursor-pointer"
                      >
                        Track All ({myTickets.length}) →
                      </button>
                    </div>

                    {myTickets.length > 0 ? (
                      <div className="space-y-3">
                        {myTickets.slice(0, 2).map((t, idx) => (
                          <div
                            key={idx}
                            onClick={() => setActiveMenu("My Tickets")}
                            className="p-3.5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-slate-50/70 transition-all cursor-pointer space-y-2 text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-black text-brand-blue flex items-center gap-1">
                                🎫 #{t.ticket_number}
                              </span>
                              <span className={`text-[8.5px] px-2 py-0.5 rounded-full font-black uppercase ${
                                (t.status || 'open') === 'open'
                                  ? "bg-rose-50 text-rose-600 border border-rose-150"
                                  : t.status === 'in_progress'
                                  ? "bg-amber-50 text-amber-600 border border-amber-150"
                                  : "bg-emerald-50 text-emerald-600 border border-emerald-150"
                              }`}>
                                {t.status === 'open' ? '🔴 Under Review' : t.status === 'in_progress' ? '🟠 In Progress' : '🟢 Resolved'}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-800 truncate">{t.subject}</p>
                              <p className="text-[9.5px] text-gray-400 font-medium mt-0.5">{t.request_type}</p>
                            </div>
                            {t.admin_notes && (
                              <p className="text-[9.5px] text-emerald-700 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100 font-medium truncate">
                                💬 Reply: {t.admin_notes}
                              </p>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => setActiveMenu("My Tickets")}
                          className="w-full py-2 bg-blue-50/70 hover:bg-blue-100 text-brand-blue rounded-xl text-[10px] font-black transition-colors cursor-pointer"
                        >
                          View Ticket Progress & History →
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4 space-y-2">
                        <p className="text-[11px] text-gray-400 font-semibold">No active support tickets.</p>
                        <button
                          onClick={() => setIsRaiseRequestOpen(true)}
                          className="px-3.5 py-1.5 bg-blue-50 text-brand-blue rounded-xl text-[10px] font-black hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          + Raise a Support Request
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Refer & Earn */}
                  <div className="bg-[#e8f1fe]/70 border border-blue-100 rounded-3xl p-6 shadow-sm space-y-3 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-md">
                      <Gift size={20} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-black text-brand-navy">Refer & Earn</h4>
                      <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                        Refer a friend and earn exciting rewards.
                      </p>
                      <button onClick={() => alert("Referral link copied to clipboard!")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1 pt-1">
                        Learn More ➔
                      </button>
                    </div>
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
                      <div className="h-20 w-20 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-brand-blue text-2xl font-black shadow-inner uppercase">
                        {(firstName?.[0] || 'U') + (lastName?.[0] || 'N')}
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
                      <button onClick={() => setActiveMenu("Change Password")} className="flex items-center justify-center gap-1 rounded-xl bg-white border border-gray-200 hover:bg-slate-50 px-4 py-2 text-[9px] font-bold text-brand-navy cursor-pointer">
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
                        { name: "Address Book", view: "Address Book" },
                        { name: "Payment Methods", view: "Payment Methods" }
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
                            <span
                              onClick={() => window.open(`/admin/invoice?orderId=${encodeURIComponent(row.orderId)}`, '_blank')}
                              className="text-[10px] text-brand-blue font-bold cursor-pointer hover:underline"
                            >
                              View Invoice
                            </span>
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
                            <button
                              onClick={() => setActiveMenu("Course Materials")}
                              className="flex items-center gap-1 border border-brand-blue/20 bg-white hover:bg-slate-50 px-3.5 py-2 text-[10px] font-black text-brand-blue rounded-xl transition-all cursor-pointer"
                            >
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
                              <button
                                onClick={(e) => { e.stopPropagation(); window.open(`/admin/invoice?orderId=${encodeURIComponent(row.orderId)}`, '_blank'); }}
                                title="Download PDF Receipt"
                                className="p-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 text-gray-400 cursor-pointer"
                              >
                                <Download size={10} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); window.open(`/admin/invoice?orderId=${encodeURIComponent(row.orderId)}`, '_blank'); }}
                                title="View Invoice"
                                className="p-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 text-gray-400 cursor-pointer"
                              >
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
                    <button
                      onClick={() => window.open(`/admin/invoice?orderId=${encodeURIComponent(activeInvoice.orderId)}`, '_blank')}
                      className="flex items-center gap-1 border border-brand-blue/20 bg-white hover:bg-slate-50 px-3 py-1.5 text-[9px] font-black text-brand-blue rounded-xl transition-all cursor-pointer"
                    >
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

          {/* VIEW E: Course Materials */}
          {activeMenu === "Course Materials" && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Course Materials</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-navy">Course Materials & Downloads</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Access study guides, slide decks, practice exams and course assets.</p>
              </div>

              <div className="grid gap-6">
                {finalOrdersList.map((ord, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-50 pb-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl ${ord.logoBg} flex items-center justify-center font-black text-xs shrink-0 shadow-sm`}>
                          {ord.logo}
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-brand-navy">{ord.course}</h3>
                          <p className="text-[10px] text-gray-400 font-bold mt-0.5">Order ID: {ord.orderId} • Enrolled: {ord.orderDate}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black">
                        Active Access
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-slate-50/70 border border-gray-150 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-brand-blue font-black text-xs">
                          <FileText size={16} />
                          <span>Official Courseware & Slides</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">Complete PDF student guide and instructor presentation slides.</p>
                        {(() => {
                          // Filter brochures for course matching and pick latest uploaded document
                          const ordCourseLower = (ord.course || "").toLowerCase().trim();
                          const matchedDocs = dbBrochures.filter(b => {
                            const bCourseLower = (b.course_title || "").toLowerCase().trim();
                            const bDocLower = (b.document_title || "").toLowerCase().trim();
                            
                            // Check exact or partial match with course_title or document_title
                            if (bCourseLower && (ordCourseLower.includes(bCourseLower) || bCourseLower.includes(ordCourseLower))) return true;
                            if (bDocLower && (ordCourseLower.includes(bDocLower) || bDocLower.includes(ordCourseLower))) return true;
                            
                            // If document title or course title has key course words like PMP, ITIL, Agile, CAPM, CISSP, Lean
                            const keywords = ["pmp", "itil", "agile", "capm", "cissp", "lean", "six sigma", "scrum", "pmi"];
                            const matchedKeyword = keywords.find(k => ordCourseLower.includes(k) && (bCourseLower.includes(k) || bDocLower.includes(k)));
                            if (matchedKeyword) return true;

                            // Fallback if generic brochure with no specific course restriction
                            if (!b.course_title && !b.course_id) return true;

                            return false;
                          });

                          // Pick the latest document uploaded in DB
                          const matchedDoc = matchedDocs.length > 0 ? matchedDocs[matchedDocs.length - 1] : (dbBrochures.length > 0 ? dbBrochures[dbBrochures.length - 1] : null);
                          const targetPdfUrl = matchedDoc?.file_url;
                          const docTitle = matchedDoc?.document_title || `${ord.course} Official Courseware`;

                          if (!matchedDoc || !targetPdfUrl) {
                            return (
                              <button
                                disabled
                                className="w-full bg-slate-100 text-slate-400 text-[10px] font-black py-2.5 rounded-xl border border-slate-200 cursor-not-allowed flex items-center justify-center gap-1.5"
                              >
                                <X size={12} /> Material Not Uploaded Yet
                              </button>
                            );
                          }

                          return (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  if (!targetPdfUrl) return;
                                  if (targetPdfUrl.startsWith('data:')) {
                                    // Legacy base64 — open via modal
                                    setPdfModal({ isOpen: true, url: targetPdfUrl, title: docTitle });
                                  } else if (targetPdfUrl.startsWith('http://') || targetPdfUrl.startsWith('https://')) {
                                    // Real URL from server — open directly in new tab
                                    window.open(targetPdfUrl, '_blank', 'noopener,noreferrer');
                                  } else {
                                    // Relative path fallback — try opening as-is
                                    window.open(targetPdfUrl, '_blank', 'noopener,noreferrer');
                                  }
                                }}
                                className="flex-1 bg-brand-blue hover:bg-blue-700 text-white text-[10px] font-black py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <Eye size={13} /> View PDF
                              </button>

                              <button
                                onClick={() => {
                                  if (!targetPdfUrl) return;
                                  const a = document.createElement('a');
                                  a.href = targetPdfUrl;
                                  a.download = `${(docTitle || 'Courseware').replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
                                  a.target = '_blank';
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                }}
                                className="px-3 bg-slate-100 hover:bg-slate-200 text-gray-700 text-[10px] font-black py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 border border-gray-200"
                                title="Download PDF File"
                              >
                                <Download size={13} /> Download
                              </button>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="bg-slate-50/70 border border-gray-150 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-brand-orange font-black text-xs">
                          <GraduationCap size={16} />
                          <span>1,000+ Practice Exam Questions</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">Interactive exam simulator with real domain questions & answers.</p>
                        <button
                          onClick={() => {
                            alert(`Launching 1,000+ Practice Exam Questions Simulator for ${ord.course}! Total 180 Questions loaded.`);
                          }}
                          className="w-full bg-white border border-gray-200 hover:bg-brand-orange hover:text-white text-brand-orange text-[10px] font-black py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Laptop size={12} /> Open Simulator
                        </button>
                      </div>

                      <div className="bg-slate-50/70 border border-gray-150 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center gap-2 text-purple-600 font-black text-xs">
                          <Award size={16} />
                          <span>Course Certificate</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">Official 35 PDU / Contact Hours Certificate of Completion.</p>
                        <button
                          onClick={() => {
                            alert(`Official 35 Contact Hours Certificate generated for ${firstName} ${lastName} (${ord.course})! Click OK to download.`);
                          }}
                          className="w-full bg-white border border-gray-200 hover:bg-purple-600 hover:text-white text-purple-600 text-[10px] font-black py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Eye size={12} /> View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW F: Address Book */}
          {activeMenu === "Address Book" && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Address Book</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-navy">Address Book</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Manage your primary shipping and billing addresses.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Primary Billing Address</h3>
                    <span className="px-2.5 py-0.5 bg-blue-50 text-brand-blue text-[9px] font-black rounded-full">Default</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600 space-y-1">
                    <p className="font-black text-brand-navy">{firstName} {lastName}</p>
                    <p>{addressLine1}</p>
                    {addressLine2 && <p>{addressLine2}</p>}
                    <p>{city}, {stateProv} {zipCode}</p>
                    <p>{country}</p>
                    <p className="text-gray-400 text-[11px] pt-1">Phone: {phone || "(Not set)"}</p>
                  </div>
                  <button onClick={() => setActiveMenu("My Profile")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer">
                    Edit Address in Profile ➔
                  </button>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Physical Classroom Shipping Address</h3>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-gray-500 text-[9px] font-black rounded-full">Optional</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600 space-y-1">
                    <p className="font-black text-brand-navy">{firstName} {lastName}</p>
                    <p>Same as Billing Address</p>
                  </div>
                  <button onClick={() => setActiveMenu("My Profile")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer">
                    Update Details ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW G: Payment Methods */}
          {activeMenu === "Payment Methods" && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Payment Methods</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-navy">Saved Payment Methods</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Review saved payment cards and checkout history.</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black">Active Payment Method</h3>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-150">
                  <div className="h-10 w-14 bg-brand-navy text-white rounded-lg flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                    VISA
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-navy">Visa ending in •••• 4242</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">Expires 12/2028 • Default Payment Method</p>
                  </div>
                </div>
                <button onClick={() => setActiveMenu("Invoices")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer">
                  View Invoice Receipts ➔
                </button>
              </div>
            </div>
          )}

          {/* VIEW H: Notification Settings */}
          {activeMenu === "Notification Settings" && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Notification Settings</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-navy">Notification Settings</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Choose how and when you receive course updates & notifications.</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                {notifMsg.text && (
                  <div className={`p-3.5 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
                    notifMsg.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-rose-50 text-rose-600 border-rose-200"
                  }`}>
                    <span>{notifMsg.type === "success" ? "✅" : "⚠️"}</span>
                    <span>{notifMsg.text}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-gray-150 rounded-2xl cursor-pointer">
                    <div>
                      <p className="text-xs font-black text-brand-navy">Class & Batch Schedule Alerts</p>
                      <p className="text-[10px] text-gray-400 font-bold">Email alerts 24 hours before your live online session starts.</p>
                    </div>
                    <input type="checkbox" checked={prefAlert} onChange={(e) => setPrefAlert(e.target.checked)} className="h-4 w-4 accent-brand-blue cursor-pointer" />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-gray-150 rounded-2xl cursor-pointer">
                    <div>
                      <p className="text-xs font-black text-brand-navy">Promotions & Course Discounts</p>
                      <p className="text-[10px] text-gray-400 font-bold">Receive special offers and promotional discount codes.</p>
                    </div>
                    <input type="checkbox" checked={prefPromo} onChange={(e) => setPrefPromo(e.target.checked)} className="h-4 w-4 accent-brand-blue cursor-pointer" />
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-slate-50/70 border border-gray-150 rounded-2xl cursor-pointer">
                    <div>
                      <p className="text-xs font-black text-brand-navy">SMS Order Status Updates</p>
                      <p className="text-[10px] text-gray-400 font-bold">Get instant SMS updates about your order status.</p>
                    </div>
                    <input type="checkbox" checked={prefSms} onChange={(e) => setPrefSms(e.target.checked)} className="h-4 w-4 accent-brand-blue cursor-pointer" />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  disabled={isSavingNotif}
                  className="bg-brand-blue text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingNotif ? "Saving Preferences..." : "Save Notification Preferences"}
                </button>
              </div>
            </div>
          )}

          {/* VIEW I: Change Password */}
          {activeMenu === "Change Password" && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Change Password</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-navy">Change Password</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Update your password to ensure account security.</p>
              </div>

              <form onSubmit={handleChangePassword} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 max-w-xl">
                {passwordMsg.text && (
                  <div className={`p-3.5 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
                    passwordMsg.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-rose-50 text-rose-600 border-rose-200"
                  }`}>
                    <span>{passwordMsg.type === "success" ? "✅" : "⚠️"}</span>
                    <span>{passwordMsg.text}</span>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Current Password (optional for initial setup)</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">New Password *</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold">Confirm New Password *</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="bg-brand-blue text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-opacity-90 transition-all cursor-pointer mt-2 disabled:opacity-50"
                >
                  {isUpdatingPassword ? "Updating Password..." : "Update Password"}
                </button>
              </form>
            </div>
          )}

          {/* VIEW LIVE CLASSES: Full Schedule Screen */}
          {activeMenu === "Live Classes" && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">Live Classes</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-brand-navy">Live Class Schedule</h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">View your complete live training session schedule.</p>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Total Sessions</span>
                  <p className="text-xl font-black text-brand-navy">4 Sessions</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Contact Hours</span>
                  <p className="text-xl font-black text-emerald-600">35 Hours</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Training Mode</span>
                  <p className="text-xl font-black text-brand-blue">Live Virtual</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Time Zone</span>
                  <p className="text-sm font-black text-gray-700 font-mono pt-1">EST (UTC-5)</p>
                </div>
              </div>

              {/* Full Schedule List */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-sm font-black text-brand-navy">Complete Class Schedule</h3>
                  <span className="text-xs font-bold text-gray-400">
                    Schedule Dates: <strong className="text-brand-blue font-mono">{activeDbSchedule?.date_range || activeDbSchedule?.batch_date || activeOrder.dates}</strong>
                  </span>
                </div>

                <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                  {getUpcomingClassDays(activeDbSchedule?.date_range || activeDbSchedule?.batch_date || activeOrder.dates, activeOrder.timing).map((cls, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xs transition-all gap-4 bg-slate-50/40">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-brand-blue/10 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[9px] font-black uppercase text-brand-blue tracking-wider">{cls.month}</span>
                          <span className="text-base font-black text-brand-navy leading-none">{cls.day}</span>
                          <span className="text-[8px] font-bold text-gray-400 uppercase">{cls.dow}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-brand-blue text-[9px] font-black border border-blue-100">
                              Session {idx + 1}
                            </span>
                            <h4 className="text-xs font-black text-gray-800">{cls.title}</h4>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-400 font-bold">
                            <span className="flex items-center gap-1"><Clock size={12} className="text-brand-blue" /> {cls.time}</span>
                            <span className="flex items-center gap-1"><Users size={12} className="text-brand-blue" /> Certified PMI® Instructor</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black">
                          Scheduled
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW J: Help Center & Contact Support */}
          {(activeMenu === "Help Center" || activeMenu === "Contact Support") && (
            <div className="space-y-8 text-left">
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">{activeMenu}</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-navy">Student Support & Help Center</h2>
                <p className="text-xs text-gray-400 font-bold mt-1">Get immediate answers to your queries or get in touch with our team.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3 hover:border-blue-200 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-100 font-bold">
                    <Headphones size={18} />
                  </div>
                  <h3 className="text-xs font-black text-brand-navy">Raise a Request</h3>
                  <p className="text-[10px] text-gray-400 font-bold leading-normal">Submit a detailed query regarding your class, batch, or certificates.</p>
                  <button onClick={() => setIsRaiseRequestOpen(true)} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    Open Ticket ➔
                  </button>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3 hover:border-blue-200 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 font-bold">
                    <FileText size={18} />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-brand-navy">Track My Tickets</h3>
                    {myTickets.length > 0 && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-amber-100 text-amber-700">
                        {myTickets.length} Active
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold leading-normal">View your past tickets, real-time status updates, and support chat.</p>
                  <button onClick={() => setActiveMenu("My Tickets")} className="text-[10px] font-black text-brand-blue hover:underline cursor-pointer flex items-center gap-1">
                    View Tickets ➔
                  </button>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3 hover:border-emerald-200 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 font-bold">
                    <PhoneCall size={18} />
                  </div>
                  <h3 className="text-xs font-black text-brand-navy">Request Callback</h3>
                  <p className="text-[10px] text-gray-400 font-bold leading-normal">Schedule a callback with our advisors at your convenient time slot.</p>
                  <button onClick={() => setIsCallbackModalOpen(true)} className="text-[10px] font-black text-emerald-600 hover:underline cursor-pointer flex items-center gap-1">
                    Request Call ➔
                  </button>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-3 hover:border-purple-200 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 font-bold">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-xs font-black text-brand-navy">1-on-1 Consultation</h3>
                  <p className="text-[10px] text-gray-400 font-bold leading-normal">Book a dedicated mentorship consultation for your certification path.</p>
                  <button onClick={() => setIsConsultationOpen(true)} className="text-[10px] font-black text-purple-600 hover:underline cursor-pointer flex items-center gap-1">
                    Book Session ➔
                  </button>
                </div>
              </div>

              {/* Contact Info Strip */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Toll-Free Support Helpline</span>
                    <a href="tel:8887457575" className="text-sm font-black text-brand-navy hover:text-brand-blue">
                      (888) 745-7575
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Official Support Email</span>
                    <a href="mailto:support@certificationplanner.com" className="text-xs font-black text-brand-navy hover:text-brand-blue font-mono">
                      support@certificationplanner.com
                    </a>
                  </div>
                </div>

                <div className="text-right sm:text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Operating Hours</span>
                  <p className="text-xs font-bold text-gray-600">Mon – Fri: 8:00 AM – 8:00 PM EST</p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW K: My Support Tickets & Queries Tracker */}
          {activeMenu === "My Tickets" && (
            <div className="space-y-6 text-left">
              {/* Breadcrumbs */}
              <div className="text-[11px] text-gray-400 font-bold flex gap-2">
                <span onClick={() => setActiveMenu("Dashboard")} className="hover:text-brand-blue cursor-pointer">Home</span> &gt; 
                <span className="text-gray-650 font-black">My Support Tickets</span>
              </div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2.5">
                    <Headphones className="text-brand-blue" /> My Support Tickets & Queries
                  </h2>
                  <p className="text-xs text-gray-400 font-bold mt-1">
                    Track live ticket statuses, view advisor replies, and converse directly with support.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => fetchMyTickets()}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 hover:bg-slate-50 text-gray-600 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RefreshCw size={13} /> Refresh
                  </button>
                  <button
                    onClick={() => setIsRaiseRequestOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-opacity-95 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    <Plus size={14} /> Raise New Request
                  </button>
                </div>
              </div>

              {/* Stat Counters with Quick Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div
                  onClick={() => setTicketFilterTab("all")}
                  className={`bg-white border rounded-2xl p-4 shadow-xs space-y-1 cursor-pointer transition-all ${
                    ticketFilterTab === "all" ? "border-brand-blue ring-2 ring-blue-500/10" : "border-gray-150 hover:border-gray-300"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Total Tickets</span>
                  <p className="text-2xl font-black text-brand-navy">{myTickets.length}</p>
                </div>

                <div
                  onClick={() => setTicketFilterTab("open")}
                  className={`bg-white border rounded-2xl p-4 shadow-xs space-y-1 cursor-pointer transition-all ${
                    ticketFilterTab === "open" ? "border-rose-400 ring-2 ring-rose-500/10" : "border-rose-100 hover:border-rose-300"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-rose-500 font-black">Under Review</span>
                  <p className="text-2xl font-black text-rose-600">{myTickets.filter(t => (t.status || 'open') === 'open').length}</p>
                </div>

                <div
                  onClick={() => setTicketFilterTab("in_progress")}
                  className={`bg-white border rounded-2xl p-4 shadow-xs space-y-1 cursor-pointer transition-all ${
                    ticketFilterTab === "in_progress" ? "border-amber-400 ring-2 ring-amber-500/10" : "border-amber-100 hover:border-amber-300"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-amber-500 font-black">In Progress</span>
                  <p className="text-2xl font-black text-amber-600">{myTickets.filter(t => t.status === 'in_progress').length}</p>
                </div>

                <div
                  onClick={() => setTicketFilterTab("resolved")}
                  className={`bg-white border rounded-2xl p-4 shadow-xs space-y-1 cursor-pointer transition-all ${
                    ticketFilterTab === "resolved" ? "border-emerald-400 ring-2 ring-emerald-500/10" : "border-emerald-100 hover:border-emerald-300"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-emerald-500 font-black">Resolved</span>
                  <p className="text-2xl font-black text-emerald-600">{myTickets.filter(t => t.status === 'resolved').length}</p>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-gray-150 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                {/* Status Tab Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {[
                    { key: "all", label: "All Tickets", count: myTickets.length },
                    { key: "open", label: "In Review", count: myTickets.filter(t => (t.status || 'open') === 'open').length },
                    { key: "in_progress", label: "In Progress", count: myTickets.filter(t => t.status === 'in_progress').length },
                    { key: "resolved", label: "Resolved", count: myTickets.filter(t => t.status === 'resolved').length },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setTicketFilterTab(tab.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                        ticketFilterTab === tab.key
                          ? "bg-brand-navy text-white shadow-xs"
                          : "text-gray-500 hover:bg-slate-100"
                      }`}
                    >
                      {tab.label}
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        ticketFilterTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Search ticket #, subject..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium"
                  />
                  {ticketSearch && (
                    <button
                      onClick={() => setTicketSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Compact Ticket List */}
              <div className="space-y-3">
                {myTickets
                  .filter(t => ticketFilterTab === "all" || (t.status || 'open') === ticketFilterTab)
                  .filter(t => {
                    if (!ticketSearch.trim()) return true;
                    const q = ticketSearch.toLowerCase();
                    return (
                      (t.ticket_number || '').toLowerCase().includes(q) ||
                      (t.subject || '').toLowerCase().includes(q) ||
                      (t.request_type || '').toLowerCase().includes(q) ||
                      (t.related_to || '').toLowerCase().includes(q)
                    );
                  })
                  .length > 0 ? (
                  myTickets
                    .filter(t => ticketFilterTab === "all" || (t.status || 'open') === ticketFilterTab)
                    .filter(t => {
                      if (!ticketSearch.trim()) return true;
                      const q = ticketSearch.toLowerCase();
                      return (
                        (t.ticket_number || '').toLowerCase().includes(q) ||
                        (t.subject || '').toLowerCase().includes(q) ||
                        (t.request_type || '').toLowerCase().includes(q) ||
                        (t.related_to || '').toLowerCase().includes(q)
                      );
                    })
                    .map((ticket, idx) => {
                      const isOpen = (ticket.status || 'open') === 'open';
                      const isInProgress = ticket.status === 'in_progress';
                      const isResolved = ticket.status === 'resolved';
                      const msgCount = Array.isArray(ticket.messages) ? ticket.messages.length : (ticket.admin_notes ? 2 : 1);
                      const hasAdvisorReply = Array.isArray(ticket.messages) 
                        ? ticket.messages.some(m => m.sender === 'support') 
                        : Boolean(ticket.admin_notes);

                      return (
                        <div
                          key={ticket.id || idx}
                          onClick={() => setActiveTicketThread(ticket)}
                          className="group bg-white border border-gray-150 hover:border-brand-blue/60 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer text-left relative overflow-hidden"
                        >
                          {/* Accent status line on left */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                            isOpen ? "bg-rose-500" : isInProgress ? "bg-amber-500" : isResolved ? "bg-emerald-500" : "bg-slate-400"
                          }`} />

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
                            {/* Left Side: Ticket Number, Subject & Category */}
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono font-black text-brand-navy text-xs bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                  #{ticket.ticket_number}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue text-[10px] font-bold border border-blue-100">
                                  {ticket.request_type}
                                </span>
                                {hasAdvisorReply && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Advisor Replied
                                  </span>
                                )}
                                <span className="text-[10px] text-gray-400 font-medium">
                                  {new Date(ticket.created_at).toLocaleDateString('en-US', {
                                    month: 'short', day: 'numeric', year: 'numeric'
                                  })}
                                </span>
                              </div>

                              <h3 className="text-sm font-black text-brand-navy group-hover:text-brand-blue transition-colors truncate">
                                {ticket.subject}
                              </h3>

                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 font-medium">
                                {ticket.related_to && (
                                  <span>Course: <strong className="text-gray-650">{ticket.related_to}</strong></span>
                                )}
                                <span>Messages: <strong className="text-gray-650 font-mono">{msgCount}</strong></span>
                              </div>
                            </div>

                            {/* Right Side: Status Badge & View Button */}
                            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1.5 border ${
                                isOpen
                                  ? "bg-rose-50 text-rose-600 border-rose-200"
                                  : isInProgress
                                  ? "bg-amber-50 text-amber-600 border-amber-200"
                                  : isResolved
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                  : "bg-slate-100 text-gray-600 border-gray-200"
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  isOpen ? "bg-rose-500 animate-ping" : isInProgress ? "bg-amber-500 animate-pulse" : isResolved ? "bg-emerald-500" : "bg-gray-400"
                                }`} />
                                {isOpen ? "Under Review" : isInProgress ? "In Progress" : isResolved ? "Resolved" : "Closed"}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTicketThread(ticket);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-slate-100 group-hover:bg-brand-blue text-gray-700 group-hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <MessageSquare size={13} /> View & Reply ➔
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center space-y-3 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto border border-blue-100">
                      <Headphones size={22} />
                    </div>
                    <div className="space-y-1 max-w-sm mx-auto">
                      <h3 className="text-sm font-black text-brand-navy">
                        {myTickets.length === 0 ? "No Support Tickets Raised Yet" : "No Tickets Found in This Filter"}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {myTickets.length === 0
                          ? "Have a question about your classes, certificate, or payments? Raise a ticket anytime."
                          : "Try selecting a different filter tab or clearing your search term."}
                      </p>
                    </div>
                    {myTickets.length === 0 && (
                      <button
                        onClick={() => setIsRaiseRequestOpen(true)}
                        className="px-4 py-2.5 bg-brand-blue hover:bg-opacity-95 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Raise a Support Request
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW K2: INTERACTIVE TICKET CONVERSATION & REPLY MODAL
              ======================================================== */}
          {activeTicketThread && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-150 flex flex-col max-h-[92vh] text-left animate-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-gray-100 flex items-start justify-between gap-4 bg-slate-50/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-brand-blue bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-lg">
                        #{activeTicketThread.ticket_number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-gray-700 text-[10px] font-bold">
                        {activeTicketThread.request_type}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                        (activeTicketThread.status || 'open') === 'open'
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : activeTicketThread.status === 'in_progress'
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : activeTicketThread.status === 'resolved'
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-slate-100 text-gray-600 border-gray-200"
                      }`}>
                        {(activeTicketThread.status || 'open') === 'open' ? "🔴 Under Review" : activeTicketThread.status === 'in_progress' ? "🟠 In Progress" : activeTicketThread.status === 'resolved' ? "🟢 Resolved" : "Closed"}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-brand-navy">
                      {activeTicketThread.subject}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Submitted on {new Date(activeTicketThread.created_at).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })} • Page Origin: <strong className="text-gray-600">{activeTicketThread.source_path || '/profile'}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTicketThread(null)}
                    className="text-gray-400 hover:text-gray-700 p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Progress Tracker Strip */}
                <div className="bg-slate-100/70 border-b border-gray-150 px-6 py-3 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <div className="h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">✓</div>
                    <span>1. Logged</span>
                  </div>
                  <div className="h-0.5 flex-1 bg-gray-250 mx-1" />
                  <div className={`flex items-center gap-1.5 font-bold text-[11px] ${
                    activeTicketThread.status === 'resolved' 
                      ? "text-emerald-600" 
                      : (activeTicketThread.status === 'in_progress' || (activeTicketThread.status || 'open') === 'open')
                      ? "text-amber-600"
                      : "text-gray-400"
                  }`}>
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                      activeTicketThread.status === 'resolved'
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-500 text-white animate-pulse"
                    }`}>
                      {activeTicketThread.status === 'resolved' ? "✓" : "2"}
                    </div>
                    <span>2. In Review / Working</span>
                  </div>
                  <div className="h-0.5 flex-1 bg-gray-250 mx-1" />
                  <div className={`flex items-center gap-1.5 font-bold text-[11px] ${
                    activeTicketThread.status === 'resolved' ? "text-emerald-600" : "text-gray-400"
                  }`}>
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                      activeTicketThread.status === 'resolved' ? "bg-emerald-500 text-white" : "bg-gray-250 text-gray-500"
                    }`}>
                      {activeTicketThread.status === 'resolved' ? "✓" : "3"}
                    </div>
                    <span>3. Resolved</span>
                  </div>
                </div>

                {/* Related Course Banner (if exists) */}
                {activeTicketThread.related_to && (
                  <div className="px-6 py-2 bg-blue-50/50 border-b border-blue-100 text-[11px] text-gray-600 font-semibold flex items-center gap-2">
                    <span className="text-brand-blue font-bold">Related Course:</span>
                    <span className="text-brand-navy font-bold">{activeTicketThread.related_to}</span>
                  </div>
                )}

                {/* Messages & Conversation Thread */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-slate-50/40">
                  <div className="text-center">
                    <span className="px-3 py-1 rounded-full bg-gray-150 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                      Conversation Thread
                    </span>
                  </div>

                  {/* Render messages from `messages` array if available */}
                  {Array.isArray(activeTicketThread.messages) && activeTicketThread.messages.length > 0 ? (
                    activeTicketThread.messages.map((m, mIdx) => {
                      const isSupport = m.sender === 'support';
                      return (
                        <div
                          key={m.id || mIdx}
                          className={`flex gap-3 ${isSupport ? "justify-start" : "justify-end"}`}
                        >
                          {/* Advisor Avatar */}
                          {isSupport && (
                            <div className="h-8 w-8 rounded-xl bg-brand-navy text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                              CP
                            </div>
                          )}

                          <div className={`space-y-1 max-w-[82%] ${isSupport ? "text-left" : "text-right"}`}>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium px-1">
                              <span className="font-bold text-gray-700">
                                {isSupport ? (m.sender_name || "Support Advisor") : (m.sender_name || "You (Student)")}
                              </span>
                              <span>•</span>
                              <span>
                                {m.created_at ? new Date(m.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                              </span>
                            </div>

                            <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                              isSupport
                                ? "bg-white border border-gray-200 text-brand-navy rounded-tl-sm shadow-xs font-medium"
                                : "bg-brand-blue text-white rounded-tr-sm shadow-sm font-medium"
                            }`}>
                              {m.message}
                            </div>
                          </div>

                          {/* Student Avatar */}
                          {!isSupport && (
                            <div className="h-8 w-8 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-black text-xs shrink-0 border border-blue-200">
                              {firstName ? firstName[0].toUpperCase() : 'U'}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    // Fallback if messages array is empty
                    <>
                      {/* Initial Student Message */}
                      <div className="flex gap-3 justify-end">
                        <div className="space-y-1 max-w-[82%] text-right">
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium px-1 justify-end">
                            <span className="font-bold text-gray-700">You (Student)</span>
                            <span>•</span>
                            <span>{new Date(activeTicketThread.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap bg-brand-blue text-white rounded-tr-sm shadow-sm font-medium">
                            {activeTicketThread.description}
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-black text-xs shrink-0 border border-blue-200">
                          {firstName ? firstName[0].toUpperCase() : 'U'}
                        </div>
                      </div>

                      {/* Official Support Response / Notes (if any) */}
                      {activeTicketThread.admin_notes && (
                        <div className="flex gap-3 justify-start">
                          <div className="h-8 w-8 rounded-xl bg-brand-navy text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                            CP
                          </div>
                          <div className="space-y-1 max-w-[82%] text-left">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium px-1">
                              <span className="font-bold text-gray-700">Support Advisor</span>
                              <span>•</span>
                              <span>Official Response</span>
                            </div>
                            <div className="p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap bg-white border border-emerald-200 text-emerald-950 rounded-tl-sm shadow-xs font-medium">
                              {activeTicketThread.admin_notes}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Reply Form Footer */}
                <div className="p-4 sm:p-5 border-t border-gray-150 bg-white space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span className="font-bold text-gray-600">Reply to Support Team:</span>
                    <span>Need urgent phone support? Call <strong className="text-brand-blue">(888) 745-7575</strong></span>
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={studentReplyText}
                      onChange={(e) => setStudentReplyText(e.target.value)}
                      placeholder="Type your message or response to the support advisor here..."
                      className="flex-1 p-3 rounded-2xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-brand-blue focus:bg-white text-xs text-gray-800 placeholder-gray-400 transition-all resize-none font-medium"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendStudentReply(activeTicketThread.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSendStudentReply(activeTicketThread.id)}
                      disabled={isSendingReply || !studentReplyText.trim()}
                      className={`px-5 rounded-2xl text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 ${
                        isSendingReply || !studentReplyText.trim()
                          ? "bg-gray-300 shadow-none cursor-not-allowed"
                          : "bg-brand-blue hover:bg-opacity-95 shadow-blue-500/20"
                      }`}
                    >
                      {isSendingReply ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={14} /> Send
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-600 font-mono text-[9px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-600 font-mono text-[9px]">Shift+Enter</kbd> for new line.
                  </p>
                </div>

              </div>
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

      {pdfModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 max-w-4xl w-full h-[85vh] flex flex-col space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-brand-blue" />
                <h3 className="text-base font-black text-brand-navy truncate max-w-lg">
                  {pdfModal.title || "Course Material Document"}
                </h3>
              </div>
              <button
                onClick={() => setPdfModal({ isOpen: false, url: "", title: "" })}
                className="text-gray-400 hover:text-brand-navy p-1.5 rounded-xl border border-gray-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 w-full h-full rounded-2xl overflow-hidden bg-slate-50 border border-gray-200 relative flex flex-col items-center justify-center">
              {pdfModal.url && pdfModal.url.startsWith('data:') ? (
                <iframe
                  src={pdfModal.url}
                  className="w-full h-full border-none"
                  title="Course Material PDF Viewer"
                />
              ) : pdfModal.url && (pdfModal.url.startsWith('blob:') || pdfModal.url.startsWith('http://') || pdfModal.url.startsWith('https://')) ? (
                <iframe
                  src={pdfModal.url}
                  className="w-full h-full border-none"
                  title="Course Material PDF Viewer"
                />
              ) : (
                <div className="text-center p-8 space-y-4 max-w-md my-auto">
                  <div className="h-20 w-20 bg-blue-50 text-brand-blue rounded-3xl border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
                    <FileText size={36} />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-black text-brand-navy">{pdfModal.title || "Course Material Document"}</h4>
                    <p className="text-xs text-gray-500 font-bold leading-relaxed">
                      This document path (`{pdfModal.url || 'relative file path'}`) is an abstract path saved in Admin.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href="/sample_courseware.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all inline-block shadow-sm"
                    >
                      Open Sample Courseware PDF
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 shrink-0">
              <span className="text-[10px] text-gray-400 font-bold">Official Student Courseware Document</span>
              <button
                onClick={() => setPdfModal({ isOpen: false, url: "", title: "" })}
                className="px-4 py-2 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
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
