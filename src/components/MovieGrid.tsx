"use client";

import { useState } from "react";
import { getTrending, searchMovies } from "../api/Api";
import MovieCard from "./MovieCard";

export default function MovieGrid({ initialMovies, initialPage, keyword }: { initialMovies: any[], initialPage: number, keyword?: string }) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const loadMoreMovies = async () => {
    if (loading) return;
    
    setLoading(true);
    const nextPage = page + 1;
    
    try {
      let data;
      if (keyword) {
        // Search more results
        data = await searchMovies(keyword, nextPage);
      } else {
        // Load more trending
        data = await getTrending(nextPage);
      }
      
      if (!data || !data.results) {
        throw new Error('Invalid API response');
      }
      
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (error) {
      console.error("Lỗi khi tải thêm phim:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hiển thị thêm các phim đã load */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={movie} mediaType="movie" />
        ))}
      </div>

      {/* Nút bấm */}
      <div className="relative py-20 flex justify-center">
        <button
          onClick={loadMoreMovies}
          disabled={loading}
          className="!px-12 !py-3 !bg-transparent !border-2 !border-red-600 !text-white !rounded-full !font-bold !text-lg hover:!bg-red-600 !transition-all !duration-300 !cursor-pointer disabled:!opacity-50"
        >
          {loading ? "Loading..." : "Watch more"}
        </button>
      </div>
    </>
  );
}
