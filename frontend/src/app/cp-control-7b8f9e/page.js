"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function SafeEntrancePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cp_admin_entrance_verified", "cp_sec_8f9a2");
      localStorage.setItem("cp_admin_safe_entrance_token", "cp_sec_8f9a2");

      const timer = setTimeout(() => {
        router.push("/admin?entrance=cp_sec_8f9a2");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center font-sans antialiased text-white">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
          <ShieldCheck size={36} />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Safe Entrance Verified
          </span>
          <h1 className="text-2xl font-black text-white">aaPanel Security Gateway</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cryptographic entrance code validated. Unlocking secure administration tunnel...
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs font-mono space-y-1 text-slate-400">
          <div className="text-emerald-400 font-bold">✓ Security Token: cp_sec_8f9a2</div>
          <div>✓ Stealth Cloaking: Active</div>
          <div>✓ Gateway: Verified</div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
          <RefreshCw size={14} className="animate-spin text-brand-orange" />
          <span>Redirecting to Admin Portal...</span>
        </div>

        <button
          onClick={() => router.push("/admin?entrance=cp_sec_8f9a2")}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all border border-slate-700 cursor-pointer flex items-center justify-center gap-2"
        >
          Click if not redirected automatically <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
