"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/slices/uiSlice";

export default function RouteLoader() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());

    const timer = setTimeout(() => {
      dispatch(stopLoading());
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
