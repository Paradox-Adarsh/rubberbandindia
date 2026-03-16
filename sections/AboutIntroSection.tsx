"use client";
import { images } from '@/data/about';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


const AboutIntroSection = () => {
  return (
        <div className="relative h-[80vh]  text-white">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="absolute inset-0 h-full w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  )
}

export default AboutIntroSection
