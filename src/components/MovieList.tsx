"use client";

import React from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface MovieListProps {
  title: string;
  items: Movie[];
  mediaType?: "movie" | "tv";
}

export default function MovieList({ 
  title, 
  items, 
  mediaType = "movie",
}: MovieListProps) {

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 px-4 md:px-8"> 
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl md:text-2xl font-bold text-white flex items-baseline">
            {title}
          </h2>
          
          <Link 
            href={`/${mediaType}`} 
            className="btn-sm btn-default"
          >
            View more 
          </Link>
        </div>
        
        <div className="relative"> 
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            loop={true}
            spaceBetween={16} 
            breakpoints={{
              320: { slidesPerView: 2.5, spaceBetween: 10 }, 
              640: { slidesPerView: 3.5, spaceBetween: 16 }, 
              768: { slidesPerView: 4.5, spaceBetween: 16 }, 
              1024: { slidesPerView: 5.5, spaceBetween: 16 }, 
              1280: { slidesPerView: 6, spaceBetween: 16 },
            }}
            className="w-full h-full"
          >
            {items.map((item) => (
              <SwiperSlide 
                key={item.id} 
                className="transform transition-transform duration-300" 
              >
                <MovieCard 
                  item={item} 
                  mediaType={mediaType}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}