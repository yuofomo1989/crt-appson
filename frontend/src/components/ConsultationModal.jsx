"use client";

import React, { useState } from "react";
import { X, Calendar, Phone, Mail, User, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, ChevronDown, BookOpen, Layers } from "lucide-react";

export default function ConsultationModal({ isOpen, onClose, title = "Book a Free Consultation" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "PMP® Certification",
    format: "Live Online Classroom",
    date: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "PMP® Certification",
      format: "Live Online Classroom",
      date: "",
      message: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 transition-all duration-300">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-xl rounded-[28px] bg-white p-6 sm:p-8 md:p-9 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-brand-blue via-brand-orange to-emerald-400 rounded-b-full"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all hover:scale-105 cursor-pointer z-10"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner border border-emerald-100">
              <CheckCircle2 size={44} className="animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                <Sparkles size={12} /> Success
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                Consultation Requested!
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
              Thank you, <span className="text-brand-blue font-bold">{formData.name}</span>. Our senior certification advisor will call you at <span className="text-slate-900 font-bold">{formData.phone || formData.email}</span> within 15 minutes.
            </p>

            <div className="bg-slate-50/80 rounded-2xl p-5 text-xs text-slate-600 border border-slate-200/70 max-w-md mx-auto space-y-2 text-left font-medium">
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Selected Track</span>
                <span className="font-bold text-slate-800">{formData.course}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">Training Format</span>
                <span className="font-bold text-slate-800">{formData.format}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto rounded-xl bg-brand-blue px-9 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Done & Return
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            
            {/* Modal Header */}
            <div className="space-y-2.5 pr-8">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/90 border border-blue-100 px-3 py-1 text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                <Phone size={13} className="text-brand-blue" />
                <span>Free 1-on-1 Session</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight leading-snug">
                {title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Connect with our certified education experts to map your exam strategy and schedule.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Grid Row 1: Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15"
                    />
                  </div>
                </div>

              </div>

              {/* Grid Row 2: Phone & Interested Course */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15"
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Interested Course
                  </label>
                  <div className="relative">
                    <BookOpen size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-9 py-2.5 text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15 cursor-pointer"
                    >
                      <option value="PMP® Certification">PMP® Certification Training</option>
                      <option value="CAPM® Certification">CAPM® Certification</option>
                      <option value="PMI-ACP® Certification">PMI-ACP® Agile Practitioner</option>
                      <option value="CSM® Certified ScrumMaster">CSM® Certified ScrumMaster</option>
                      <option value="SAFe® 6.0 Agilist">SAFe® 6.0 Agilist</option>
                      <option value="CISSP® Cybersecurity">CISSP® Cybersecurity</option>
                      <option value="AWS Solutions Architect">AWS Solutions Architect</option>
                      <option value="ITIL® 4 Foundation">ITIL® 4 Foundation</option>
                      <option value="Six Sigma Green Belt">Six Sigma Green Belt</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Grid Row 3: Format & Date */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Format */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Training Format
                  </label>
                  <div className="relative">
                    <Layers size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-9 py-2.5 text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15 cursor-pointer"
                    >
                      <option value="Live Online Classroom">Live Online Classroom</option>
                      <option value="In-Person Classroom">In-Person Classroom</option>
                      <option value="Self-Paced E-Learning">Self-Paced E-Learning</option>
                      <option value="Corporate Group Training">Corporate Group Training</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Preferred Date/Time */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Preferred Date / Time
                  </label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15 cursor-pointer"
                    />
                  </div>
                </div>

              </div>

              {/* Message / Questions */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Message / Questions <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us about your learning goals or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-brand-blue focus:ring-3 focus:ring-brand-blue/15 resize-none"
                ></textarea>
              </div>

              {/* Trust Guarantee */}
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
                <span>100% Confidential · No Spam Guarantee · PMI Authorized Partner</span>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Schedule Free Consultation Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
