"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import React, { useState } from "react";
import { getMovieVideos } from "../api/Api";
import { Movie } from "../types/movie";
import { motion, AnimatePresence } from "framer-motion"; 

// ... (Interface Movie giữ nguyên)

export default function Banner({ movies }: { movies: Movie[] }) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const handleWatchTrailer = async (id: number) => {
    try {
      const data = await getMovieVideos(id);
      const trailer = data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer hiện chưa có cho phim này!");
      }
    } catch (error) {
      console.error("Lỗi khi lấy trailer:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 40000 }}
        loop
        className="w-full h-full"
      >
        {movies.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            {/* ... (Phần nội dung slide giữ nguyên như cũ) ... */}
            <div
              className="relative w-full h-full bg-cover bg-center "
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center px-10 md:px-20">
                <div className="flex flex-row items-center justify-between w-full max-w-7xl">
                  <div className="max-w-3xl text-white">
                    <motion.h1 
  initial={{ y: -100, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }} // Chạy khi slide xuất hiện
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="font-bold text-4xl md:text-6xl lg:text-7xl"
>
  {movie.title}
</motion.h1>
                   <motion.p 
  className="font-medium text-xs md:text-xl my-8 md:my-12"
  initial={{ y: -50, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ 
    duration: 0.8, 
    ease: "easeOut", 
    delay: 0.6 // Hiện sau tiêu đề (0.4s) một chút
  }}
>
  {movie.overview}
</motion.p>
                   <motion.div 
  className="flex"
  initial={{ y: -30, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ 
    duration: 0.8, 
    ease: "easeOut", 
    delay: 0.8 // Hiện cuối cùng trong cụm văn bản
  }}
>
  <a href={`/movie/${movie.id}`} className="btn-lg btn-primary mr-4">
    Watch Now
  </a>
  <button 
    onClick={() => handleWatchTrailer(movie.id)}
    className="btn-lg btn-default !cursor-pointer"
  >
    Watch Trailer
  </button>
</motion.div>
                  </div>
                  
                  <div className="hidden lg:block lg:w-1/3 shrink-0">
                    <motion.img
  initial={{ scale: 0.5, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }} // Hiện sau tiêu đề một chút
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  alt={movie.title}
  className="w-80 xl:w-96 rounded-3xl shadow-2xl"
/>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- ĐÂY LÀ PHẦN BẠN CÒN THIẾU --- */}
      {trailerKey && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setTrailerKey(null)} // Bấm ra ngoài để đóng
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl rounded-xl overflow-hidden" 
            onClick={(e) => e.stopPropagation()} // Ngăn đóng khi bấm vào trong video
          >
            {/* Nút đóng */}
            <button 
              onClick={() => setTrailerKey(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-red-500 transition !cursor-pointer"
            >
              ✕ Close
            </button>
            
            {/* Video YouTube */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}