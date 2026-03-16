// app/client-layout.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteLoader from "@/components/RouteLoader";
import LogoLoader from "@/components/FluctuatingLogo";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <RouteLoader />
      <LogoLoader />
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
}
