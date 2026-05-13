"use client";

import React from "react";
import { LogOut, X, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  subDescription?: string;
  cancelText?: string;
  confirmText?: string;
  confirmColor?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  description,
  subDescription,
  cancelText = "Batal",
  confirmText = "Ya, Keluar",
  confirmColor,
  variant = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return {
          iconBg: "bg-[#fffbeb]",
          iconColor: "text-[#f59e0b]",
          confirmBtn: "bg-[#f59e0b] hover:bg-[#d97706] shadow-[#f59e0b]/20",
          icon: <AlertCircle className="w-7 h-7 text-[#f59e0b]" />,
        };
      case "info":
        return {
          iconBg: "bg-[#f0f9ff]",
          iconColor: "text-[#0ea5e9]",
          confirmBtn: "bg-[#0ea5e9] hover:bg-[#0284c7] shadow-[#0ea5e9]/20",
          icon: <AlertCircle className="w-7 h-7 text-[#0ea5e9]" />,
        };
      case "danger":
      default:
        return {
          iconBg: "bg-[#fff1f2]",
          iconColor: "text-[#e11d48]",
          confirmBtn: "bg-[#e11d48] hover:bg-[#be123c] shadow-[#e11d48]/20",
          icon: <LogOut className="w-7 h-7 text-[#e11d48]" />,
        };
    }
  };

  const styles = getVariantStyles();

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

        <div
          className={clsx(
            "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8",
            styles.iconBg,
          )}
        >
          {icon || styles.icon}
        </div>

        <h3 className="text-2xl font-bold text-[#1e293b] mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-[15px] font-semibold text-gray-600 mb-2 leading-relaxed">
          {description}
        </p>
        {subDescription && (
          <p className="text-sm text-gray-400 mb-8 leading-relaxed px-4">
            {subDescription}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 border border-gray-100 text-[#1e293b] rounded-2xl text-sm font-bold hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={clsx(
              "flex-1 px-6 py-4 text-white rounded-2xl text-sm font-bold active:scale-[0.98] transition-all duration-200 shadow-lg",
              confirmColor || styles.confirmBtn,
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

