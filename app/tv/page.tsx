"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getTrendingTv, getTopRatedTv, searchTvShows } from "../../src/api/Api";
import MovieCard from "../../src/components/MovieCard";
import TVGrid from "../../src/components/TVGrid";
import TVSearch from "../../src/components/TVSearch";
import { Movie } from "../../src/types/movie";

function TVPageContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      let tvShowsDisplay: Movie[] = [];

      if (keyword) {
        // Nếu có keyword -> Gọi API Search TV Shows
        const searchData = await searchTvShows(keyword);
        tvShowsDisplay = searchData.results || [];
      } else {
        // Nếu KHÔNG có keyword -> Gọi API Trending TV & Top Rated TV
        const [trendingTvData, topRatedTvData] = await Promise.all([
          getTrendingTv(),
          getTopRatedTv(),
        ]);
        tvShowsDisplay = [...trendingTvData.results, ...topRatedTvData.results];
      }

      // Lọc trùng lặp
      const uniqueTvShows = tvShowsDisplay.filter(
        (tvShow: Movie, index: number, self: Movie[]) =>
          index === self.findIndex((t) => t.id === tvShow.id)
      );

      setTvShows(uniqueTvShows);
      setLoading(false);
    };

    fetchTvShows();
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
      
      {/* 1. LỚP NỀN TRẮNG MỜ DẦN (PHỦ DƯỚI HEADER)
          - h-[250px]: Tăng chiều cao lên một chút để bao trùm chữ Movies
          - via-white/10: Làm dải màu mượt hơn, xóa vết cắt sắc nét
      */}
      <div className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 via-white/10 to-transparent" />
      </div>

      {/* 2. NỘI DUNG CHÍNH 
          - pt-32: Khoảng cách này giúp chữ Movies nằm đẹp mắt bên dưới Header
      */}
      <div className="relative z-10 pt-2 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Tiêu đề TV Series - Căn giữa và nằm trong vùng mờ */}
          <h1 className="text-white text-4xl md:text-4xl font-bold text-center mb-16 tracking-tight drop-shadow-md">
            TV Series
          </h1>

          {/* Search Bar - dùng TVSearch component */}
          <TVSearch />

          {/* Grid TV Shows */}
         {tvShows.length > 0 ? (
                 <TVGrid initialMovies={tvShows} initialPage={2} keyword={keyword || undefined} />
               ) : (
                <div className="text-center text-gray-400 py-20 text-xl">
                 {keyword ? `No TV found for "${keyword}"` : "No TV available"}
                </div>
               )}

        </div>
      </div>
    </div>
  );
}

export default function TVPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black/90 relative overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <TVPageContent />
    </Suspense>
  );
}