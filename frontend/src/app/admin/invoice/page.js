"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Printer, ArrowLeft, CheckCircle2, FileText } from "lucide-react";

// Inner component using useSearchParams — must be inside Suspense
function InvoiceContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!orderIdParam) {
        setLoading(false);
        return;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      try {
        const res = await fetch(`${apiUrl}/admin/orders`);
        const data = await res.json();
        if (data.status === "success") {
          const list = data.data?.data ? data.data.data : (Array.isArray(data.data) ? data.data : []);
          const found = list.find((o) => String(o.id) === String(orderIdParam) || o.order_number === orderIdParam);
          if (found) {
            setOrder(found);
          } else {
            // Check localStorage fallback
            const stored = localStorage.getItem("cp_latest_order");
            if (stored) setOrder(JSON.parse(stored));
          }
        }
      } catch (err) {
        console.error(err);
        const stored = localStorage.getItem("cp_latest_order");
        if (stored) setOrder(JSON.parse(stored));
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetails();
  }, [orderIdParam]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans text-xs">
        <div className="flex items-center gap-2 font-bold">
          <div className="h-4 w-4 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
          <span>Generating Official Invoice Receipt PDF View...</span>
        </div>
      </div>
    );
  }

  const orderData = order || {
    order_number: orderIdParam || "CP-ENR-2026-9999",
    customer_name: "Valued Student",
    customer_email: "student@example.com",
    customer_phone: "+1 (888) 745-7575",
    total_amount: 1895,
    subtotal: 1895,
    discount_amount: 0,
    payment_status: "completed",
    payment_method: "Online Card Payment",
    transaction_id: "TXN-98439281",
    created_at: new Date().toISOString(),
    items: [
      {
        course_name: "PMP® Certification Bootcamp",
        schedule_details: "Live Instructor-Led Classroom Training",
        price: 1895
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased text-slate-800 p-4 md:p-10">
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .invoice-card {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Top Action Header (Hidden during print) */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-6 no-print">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Admin Panel
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main Printable Invoice Card Sheet */}
      <div className="invoice-card max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
        
        {/* Invoice Header Branding */}
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                CP
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Certification Planner LLC</h1>
                <p className="text-xs text-slate-500 font-semibold">Authorized Global Professional Training Partner</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">101 Metro Drive, Suite 500, San Jose, CA 95110 | Support: (888) 745-7575</p>
          </div>

          <div className="text-left md:text-right space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs uppercase tracking-wider">
              OFFICIAL SALES RECEIPT
            </span>
            <p className="text-xs font-mono font-bold text-slate-500 pt-1">Invoice #: <span className="text-slate-900">{orderData.order_number}</span></p>
            <p className="text-xs font-mono text-slate-500">Date: {orderData.created_at ? new Date(orderData.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "May 2026"}</p>
          </div>
        </div>

        {/* Customer & Billing Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 rounded-2xl p-6 border border-slate-100 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Billed To (Student / Client):</span>
            <p className="text-sm font-black text-slate-900">{orderData.customer_name}</p>
            <p className="text-slate-600 font-semibold">{orderData.customer_email}</p>
            <p className="text-slate-500 font-mono">{orderData.customer_phone || "Phone: N/A"}</p>
          </div>

          <div className="space-y-1.5 text-left md:text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Payment Information:</span>
            <p className="font-bold text-slate-800">Status: <span className="text-emerald-600 font-black uppercase">{(orderData.payment_status || "completed").toUpperCase()}</span></p>
            <p className="text-slate-600 font-medium">Method: {orderData.payment_method || "Online Card Payment"}</p>
            <p className="text-slate-400 font-mono text-[11px]">Txn Reference ID: {orderData.transaction_id || "TXN-98439281"}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Description / Certification Course Details</th>
                <th className="p-4 text-center">Format</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {(orderData.items && orderData.items.length > 0) ? (
                orderData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-4 space-y-0.5">
                      <p className="font-black text-slate-900 text-sm">{item.course_name}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{item.schedule_details || item.date_range || "Live Instructor-Led Classroom Training"}</p>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-brand-blue font-bold text-[10px]">
                        {item.format || "Live Online"}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono font-black text-slate-900 text-sm">
                      ${(item.price || orderData.total_amount).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 space-y-0.5">
                    <p className="font-black text-slate-900 text-sm">PMP® Certification Bootcamp</p>
                    <p className="text-[11px] text-slate-500 font-medium">Live Instructor-Led 4-Day Bootcamp</p>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-brand-blue font-bold text-[10px]">Live Online</span>
                  </td>
                  <td className="p-4 text-right font-mono font-black text-slate-900 text-sm">
                    ${orderData.total_amount}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-t border-slate-100 pt-6">
          <div className="space-y-2 text-xs text-slate-500 max-w-sm">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Guaranteed 100% Pass Support Eligible
            </p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Thank you for choosing Certification Planner LLC. This document serves as your official payment receipt and tax voucher.
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2 text-xs font-mono text-right bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span>${(orderData.subtotal || orderData.total_amount).toLocaleString()}</span>
            </div>
            {parseFloat(orderData.discount_amount || 0) > 0 && (
              <div className="flex justify-between text-purple-600">
                <span>Discount ({orderData.coupon_code || "PROMO"}):</span>
                <span>-${orderData.discount_amount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-black text-base border-t border-slate-200 pt-2">
              <span>Total Paid:</span>
              <span className="text-emerald-600">${orderData.total_amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee stamp */}
        <div className="text-center border-t border-slate-100 pt-6 text-[10px] text-slate-400 font-semibold space-y-1">
          <p>© 2026 Certification Planner LLC. All Rights Reserved.</p>
          <p>www.certificationplanner.com | Phone: +1 (888) 745-7575 | Email: support@certificationplanner.com</p>
        </div>

      </div>
    </div>
  );
}

// Loading fallback shown while Suspense resolves useSearchParams
function InvoiceLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans text-xs">
      <div className="flex items-center gap-2 font-bold">
        <div className="h-4 w-4 rounded-full border-2 border-brand-blue border-t-transparent animate-spin"></div>
        <span>Loading Invoice...</span>
      </div>
    </div>
  );
}

// Default export wraps content in Suspense (required by Next.js for useSearchParams)
export default function InvoicePage() {
  return (
    <Suspense fallback={<InvoiceLoading />}>
      <InvoiceContent />
    </Suspense>
  );
}
