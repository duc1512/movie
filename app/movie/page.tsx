"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getTrending, getTopRatedMovies, searchMovies } from "../../src/api/Api";
import MovieGrid from "@/src/components/MovieGrid";
import MovieCard from "../../src/components/MovieCard";
import MovieSearch from "../../src/components/MovieSearch";

export default function MoviePage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let moviesDisplay = [];

      if (keyword) {
        // Nếu có keyword -> Gọi API Search
        const searchData = await searchMovies(keyword);
        moviesDisplay = searchData.results || [];
      } else {
        // Nếu KHÔNG có keyword -> Gọi API Trending & Top Rated cũ
        const [trendingMoviesData, topRatedMoviesData] = await Promise.all([
          getTrending(),
          getTopRatedMovies(),
        ]);
        moviesDisplay = [...trendingMoviesData.results, ...topRatedMoviesData.results];
      }

      // Lọc trùng lặp
      const uniqueMovies = moviesDisplay.filter(
        (movie: any, index: number, self: any[]) =>
          index === self.findIndex((m) => m.id === movie.id)
      );

      setMovies(uniqueMovies);
      setLoading(false);
    };

    fetchMovies();
  }, [keyword]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/90 relative overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/90 relative overflow-x-hidden">
     
     {/* 1. LỚP NỀN TRẮNG MỜ DẦN */}
     <div className="absolute top-0 left-0 right-0 h-[80px] pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 via-white/10 to-transparent" />
     </div>

     {/* 2. NỘI DUNG CHÍNH */}
     <div className="relative z-10 pt-2 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
       
       {/* Tiêu đề thay đổi linh hoạt */}
       <h1 className="text-white text-4xl md:text-4xl font-bold text-center mb-16 tracking-tight drop-shadow-md">
        Movies
       </h1>

       {/* NHÚNG COMPONENT TÌM KIẾM VÀO ĐÂY */}
       <MovieSearch />

       {/* Grid Phim */}
       {movies.length > 0 ? (
         <MovieGrid initialMovies={movies} initialPage={2} keyword={keyword || undefined} />
       ) : (
        <div className="text-center text-gray-400 py-20 text-xl">
         {keyword ? `No movies found for "${keyword}"` : "No movies available"}
        </div>
       )}
      </div>
     </div>
    </div>
  );
}