"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { images } from "@/data/gallery";

import "swiper/css";
import "swiper/css/pagination";

export default function PhotoGallery() {

  return (
    <section className="py-12 ">
      <div className="max-w-5xl mx-auto px-3">

        <Swiper
          slidesPerView={1}
        
          autoplay={{ delay: 2500 }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="border rounded-xl shadow-lg overflow-hidden"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-80 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
