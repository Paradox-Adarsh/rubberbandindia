"use client";
import Image from "next/image";
import Hero from "../sections/Hero";
import HighLightpPage from "../sections/HighLightPage";
import PhotoGallery from "@/sections/PhotoGallery";
import Display from "@/sections/Display";
import ProductPreview from "@/sections/ProductPreview";
import WhyChooseUs from "@/sections/WhyChooseUs";
import CTABanner from "@/sections/CTABanner";
import GalleryPreview from "@/sections/GalleryPreview";



export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans ">
      <Hero/>
      <ProductPreview/>
      <GalleryPreview/>
      <WhyChooseUs/>
     <CTABanner/>
      {/* <Display/> */}
      {/* <PhotoGallery/> */}
      {/* <HighLightpPage/> */}
    </div>
  );
}
