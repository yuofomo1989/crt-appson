"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, Mail, ArrowRight, Eye, EyeOff, Shield, Headphones, BookOpen, BarChart2, Award, MessageSquare } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Static site compatible navigation
      window.location.href = "/profile/index.html";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/20 font-sans antialiased text-gray-800">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 md:px-6">
        
        {/* Main 50/50 Dual Pane Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid lg:grid-cols-2 max-w-5xl mx-auto">
          
          {/* Left Column: Welcome back marketing info (Navy BG) */}
          <div className="bg-[#122c54] text-white p-8 md:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl"></div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight">Welcome Back!</h1>
                <p className="text-xs text-blue-200/80 font-bold leading-relaxed max-w-sm">
                  Log in to your account and continue your{" "}
                  <span className="text-brand-orange">learning journey</span>.
                </p>
              </div>

              {/* Orange separator bar */}
              <div className="h-[3px] w-12 bg-brand-orange rounded-full"></div>

              {/* Features list */}
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#1c3866] border border-white/5 flex items-center justify-center text-blue-300 shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-white">Access Your Courses</p>
                    <p className="text-[10px] text-blue-200/60 font-bold leading-relaxed">
                      View and continue your enrolled training programs.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#1c3866] border border-white/5 flex items-center justify-center text-blue-300 shrink-0">
                    <BarChart2 size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-white">Track Your Progress</p>
                    <p className="text-[10px] text-blue-200/60 font-bold leading-relaxed">
                      Monitor your learning progress and achievements.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#1c3866] border border-white/5 flex items-center justify-center text-blue-300 shrink-0">
                    <Award size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-white">Earn Certifications</p>
                    <p className="text-[10px] text-blue-200/60 font-bold leading-relaxed">
                      Complete courses and earn industry-recognized certifications.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#1c3866] border border-white/5 flex items-center justify-center text-blue-300 shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-white">Get Expert Support</p>
                    <p className="text-[10px] text-blue-200/60 font-bold leading-relaxed">
                      Connect with our training advisors whenever you need help.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Bottom rating card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">⭐⭐⭐⭐•</div>
                <span className="text-xs font-black text-white">4.8/5</span>
              </div>
              <p className="text-[10px] text-blue-100 font-bold leading-none">Trusted by 50,000+ professionals worldwide</p>
              
              <div className="flex items-center gap-6 pt-1 text-[10px] text-blue-200/80 font-black">
                <span>Google</span>
                <span>★ Trustpilot</span>
                <span>Sitejabber</span>
              </div>
            </div>

          </div>

          {/* Right Column: Secure login forms (White BG) */}
          <div className="p-8 md:p-12 space-y-6 text-left flex flex-col justify-center">
            
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-brand-navy">Log In</h2>
              <p className="text-xs text-gray-400 font-semibold">
                New to Certification Planner? <span className="text-brand-blue font-bold cursor-pointer hover:underline">Create an Account</span>
              </p>
            </div>

            {/* Secure login form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-bold">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-11 pr-10 py-3 text-xs font-semibold text-gray-700 outline-none focus:border-brand-blue"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Remember & forgot row */}
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="shrink-0"
                  />
                  <span>Remember me</span>
                </label>
                <span className="text-brand-blue hover:underline cursor-pointer">Forgot Password?</span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand-blue py-3.5 text-xs font-bold text-white transition-all hover:bg-opacity-95 cursor-pointer shadow-md"
              >
                Log In
              </button>
            </form>

            {/* Separator line */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-150"></div></div>
              <span className="relative bg-white px-3 text-[9px] uppercase font-bold text-gray-400">or continue with</span>
            </div>

            {/* Social Logins 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Google", logo: "G" },
                { name: "Microsoft", logo: "田" },
                { name: "LinkedIn", logo: "in" },
                { name: "Apple", logo: "" }
              ].map((prov) => (
                <button
                  key={prov.name}
                  type="button"
                  onClick={() => { window.location.href = "/profile/index.html"; }}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer bg-white"
                >
                  <span className="font-bold text-brand-blue text-sm">{prov.logo}</span>
                  <span className="text-[10px] font-black">Continue with {prov.name}</span>
                </button>
              ))}
            </div>

            {/* Security note */}
            <div className="flex items-start gap-2 pt-2 text-[10px] text-gray-400 font-bold leading-normal border-t border-gray-50">
              <Shield size={14} className="text-brand-blue shrink-0 mt-0.5" />
              <span>Your data is secure with us. We use 256-bit SSL encryption to protect your information.</span>
            </div>

          </div>

        </div>

        {/* 3. BOTTOM HELP LOG IN BAR */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-left max-w-5xl mx-auto mt-6">
          <div className="flex items-center gap-3">
            <Headphones size={24} className="text-brand-blue shrink-0" />
            <div>
              <h4 className="text-xs font-black text-brand-navy">Need help logging in?</h4>
              <p className="text-[9px] text-gray-400 font-bold mt-0.5">Our training advisors are here to help you.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-end">
            <div className="px-4 py-2 border border-gray-50 rounded-xl text-[10px] font-bold text-gray-600">📞 (888) 745-7575</div>
            <div className="px-4 py-2 border border-gray-50 rounded-xl text-[10px] font-bold text-gray-600">✉ info@certificationplanner.com</div>
            <div className="px-4 py-2 border border-gray-50 rounded-xl text-[10px] font-bold text-gray-600 cursor-pointer hover:bg-gray-50">💬 Live Chat</div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
