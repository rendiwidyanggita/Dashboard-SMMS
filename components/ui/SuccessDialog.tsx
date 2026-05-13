"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export function SuccessDialog({
  isOpen,
  onClose,
  title = "Berhasil!",
  message,
}: SuccessDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[400px] p-10 text-center animate-in zoom-in-95 fade-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-[#10b981]" />
        </div>

        <h3 className="text-2xl font-bold text-[#1e293b] mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-[15px] font-semibold text-gray-500 leading-relaxed">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full mt-8 px-6 py-4 bg-[#10b981] text-white rounded-2xl text-sm font-bold hover:bg-[#059669] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#10b981]/20"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

