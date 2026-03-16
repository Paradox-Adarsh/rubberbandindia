"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";


export default function FluctuatingLogo() {
  const isLoading = useSelector(
    (state: RootState) => state.ui.isLoading
  );

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <img
        src="assets/Images/logo/rubberindia_logo.png"
        alt="Loading"
        className="w-28 h-28 flip-logo"
      />
    </div>
  );
}
