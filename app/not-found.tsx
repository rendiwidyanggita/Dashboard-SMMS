"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#10b981]/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#3b82f6]/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-12 text-center animate-in zoom-in-95 fade-in duration-500">
        {/* 404 Gradient Text */}
        <h1 className="text-[120px] font-black leading-none tracking-tighter mb-4 bg-gradient-to-b from-[#10b981] to-[#122C28] bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl font-bold text-[#1e293b] mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-[15px] text-gray-500 font-medium leading-relaxed mb-10 max-w-[320px] mx-auto">
          It looks like you've taken a wrong turn. The page you're looking for
          may have been deleted, moved, or the URL may have been typed
          incorrectly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-gray-50 text-[#1e293b] rounded-2xl text-sm font-bold hover:bg-gray-100 active:scale-95 transition-all border border-gray-100"
          >
            Kembali
          </button>
          <Link
            href="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#122C28] text-white rounded-2xl text-sm font-bold hover:bg-[#1B3C37] hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-xl shadow-[#122C28]/20"
          >
            <Home className="w-5 h-5" />
            <span>Ke Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
