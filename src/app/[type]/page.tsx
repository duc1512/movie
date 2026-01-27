"use client";

import { useState, useEffect, Suspense, use } from "react";
import { useSearchParams, notFound } from "next/navigation";
import { getTrending, getTopRatedMovies, getTrendingTv, getTopRatedTv, search } from "../../api/Api";
import Grid from "../../components/Grid";
import Search from "../../components/Search";
import { useSearchMovies, useTopRatedMovies, useTopRatedTv, useTrendingMovies, useTrendingTv } from "@/hooks/useMovies";
import { useLoadingStore } from "@/store/useLoadingStore";

function CategoryPageContent({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  const { setLoading } = useLoadingStore();

  if (type !== "movie" && type !== "tv") {
    notFound();
  }

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const trendingMovies = useTrendingMovies();
  const topRatedMovies = useTopRatedMovies();
  const trendingTv = useTrendingTv();
  const topRatedTv = useTopRatedTv();
  const searchResult = useSearchMovies(keyword || '', type);

  const displayTitle = type === "movie" ? "Movies" : "TV Series";
  const isLoading = keyword 
    ? searchResult.isLoading 
    : type === 'movie' 
      ? trendingMovies.isLoading || topRatedMovies.isLoading
      : trendingTv.isLoading || topRatedTv.isLoading;
  
  useEffect(() => {
    if (isLoading) {
      if (keyword) {
        setLoading(true, `Searching for "${keyword}"...`);
      } else {
        setLoading(true, `Loading ${displayTitle}...`);
      }
    } else {
      setLoading(false);
    }
  }, [isLoading, setLoading, keyword, displayTitle]);
  const data = keyword 
    ? searchResult.data?.results || []
    : type === 'movie'
      ? [...(trendingMovies.data?.results || []), ...(topRatedMovies.data?.results || [])]
      : [...(trendingTv.data?.results || []), ...(topRatedTv.data?.results || [])];
  
  const uniqueItems = data.filter(
    (item: any, index: number, self: any[]) =>
      index === self.findIndex((m) => m.id === item.id)
  );
  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black/90 relative overflow-x-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-[80px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 pt-2 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          
          <h1 className="text-white text-4xl md:text-4xl font-bold text-center mb-16 tracking-tight drop-shadow-md">
            {displayTitle}
          </h1>

          <Search mediaType={type} />

          {uniqueItems.length > 0 ? (
            <Grid 
              initialMovies={uniqueItems} 
              initialPage={2} 
              keyword={keyword || undefined} 
              mediaType={type} 
            />
          ) : (
            <div className="text-center text-gray-400 py-20 text-xl">
              {keyword ? `No results found for "${keyword}"` : `No ${type} available`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ type: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black/90 relative overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}