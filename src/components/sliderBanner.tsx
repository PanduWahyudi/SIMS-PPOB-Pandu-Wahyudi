import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface SliderBannerProps {
  banners: Banner[];
}

const SliderBanner: React.FC<SliderBannerProps> = ({ banners }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
      scrollbar={{ hide: true }}
      breakpoints={{
        0: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="bg-blue-100 w-full max-w-[300px] h-auto rounded-md">
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              className="w-full h-full object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { SliderBanner };
