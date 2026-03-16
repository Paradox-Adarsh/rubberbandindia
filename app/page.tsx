"use client";
import Image from "next/image";
import Hero from "../sections/Hero";
import HighLightpPage from "../sections/HighLightPage";
import PhotoGallery from "@/sections/PhotoGallery";


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans ">
      <Hero/>
      {/* <PhotoGallery/> */}
      {/* <HighLightpPage/> */}
    </div>
  );
}
