"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { products } from "@/data/product";

export default function ProductSwiper() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Product Range
        </h2>

        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              nextEl: ".glass-next",
              prevEl: ".glass-prev",
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="pb-12"
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* GLASS PREV ARROW */}
          <div
            className="glass-prev absolute left-0 top-1/2 -translate-y-1/2
                       backdrop-blur-md bg-white/30 border border-white/40 shadow-lg
                       w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                       transition-transform duration-200 ease-out z-10
                       hover:scale-x-125 hover:scale-y-90 hover:shadow-xl"
          >
            <div className="border-l-2 border-b-2 border-white rotate-45 w-3 h-3"></div>
          </div>

          {/* GLASS NEXT ARROW */}
          <div
            className="glass-next absolute right-0 top-1/2 -translate-y-1/2
                       backdrop-blur-md bg-white/30 border border-white/40 shadow-lg
                       w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                       transition-transform duration-200 ease-out z-10
                       hover:scale-x-125 hover:scale-y-90 hover:shadow-xl"
          >
            <div className="border-r-2 border-b-2 border-white -rotate-45 w-3 h-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
