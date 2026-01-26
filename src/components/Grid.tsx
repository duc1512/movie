"use client";

import { useState,useEffect } from "react";
import { 
  getTrending, getTopRatedMovies, search,
  getTrendingTv, getTopRatedTv
} from "../api/Api";
import MovieCard from "./MovieCard";
import { GridProps } from "../types/movie";

export default function Grid({ initialMovies, initialPage, keyword, mediaType }: GridProps) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
useEffect(() => {
  // Nếu có ít hơn 8 phim hoặc không còn phim để load, set hasMore = false
  if (movies.length < 8) {
    setHasMore(false);
  }
}, [movies.length]);
  const loadMoreMovies = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = page + 1;
    
    try {
      let data;
if (keyword) {
  data = await search(keyword, mediaType, nextPage);
} else {
  data = mediaType === "movie"
    ? await getTrending(nextPage)
    : await getTrendingTv(nextPage);
}
      
      setMovies((prev) => {
        const newItems = data.results.filter((newItem: any) => 
          !prev.some(existingItem => existingItem.id === newItem.id)
        ); 
        if (newItems.length === 0) {
          setHasMore(false); // Không có phim mới
        }
        return [...prev, ...newItems];
      });
      setPage(nextPage);
      
      // Kiểm tra nếu đã hết trang (TMDB thường có tối đa 500 trang)
      if (nextPage >= (data.total_pages || 500)) {
        setHasMore(false);
      }
      
    } catch (error) {
      console.error("Lỗi khi tải thêm phim:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hiển thị thêm các phim đã load */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={movie} mediaType={mediaType} />
        ))}
      </div>

      {/* Nút bấm - chỉ hiển thị khi còn dữ liệu */}
      {hasMore  && movies.length >=20 && (
        <div className="relative py-20 flex justify-center">
          <button
            onClick={loadMoreMovies}
            disabled={loading}
            className="!px-5 !py-1 !text-sm !bg-transparent !border-2 !border-red-600 !text-white !rounded-full !font-bold !text-lg hover:!bg-red-600 !transition-all !duration-300 !cursor-pointer disabled:!opacity-50"
          >
            {loading ? "Loading..." : "Watch more"}
          </button>
        </div>
      )}
      
      {/* Thông báo khi đã hết dữ liệu */}
      { movies.length > 0 && (
        <div className="relative py-10 flex justify-center">
          <p className="text-gray-500 text-center">
           
          </p>
        </div>
      )}
    </>
  );
}
