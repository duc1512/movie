"use client"
import { useTrendingMovies, useTopRatedMovies, useTrendingTv, useTopRatedTv } from "@/hooks/useMovies";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useEffect } from "react";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";

export default function Home() {
   const trendingMovies = useTrendingMovies();
  const topRatedMovies = useTopRatedMovies();
  const trendingTv = useTrendingTv();
  const topRatedTv = useTopRatedTv();
  const { setLoading } = useLoadingStore();
  
  const isLoading = trendingMovies.isLoading || topRatedMovies.isLoading || 
                   trendingTv.isLoading || topRatedTv.isLoading;

  useEffect(() => {
    if (isLoading) {
      setLoading(true, "Loading amazing movies...");
    } else {
      setLoading(false);
    }
  }, [isLoading, setLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black ">
      <div className="relative -mt-28">
        <Banner movies={trendingMovies.data?.results.slice(0, 5) || []} />
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20" />
      </div>

      <div className="relative z-10 bg-black "> 
        <div className="container mx-auto px-4 py-8 ">
          <MovieList 
            title="Trending Movies" 
            items={trendingMovies.data?.results || []} 
            mediaType="movie" 
          />
          
          <MovieList 
            title="Top Rate Movies" 
            items={topRatedMovies.data?.results || []} 
            mediaType="movie" 
          />
          
          <MovieList 
            title="Trending TV" 
            items={trendingTv.data?.results || []} 
            mediaType="tv" 
          />
          
          <MovieList 
            title="Top Rated TV" 
            items={topRatedTv.data?.results || []} 
            mediaType="tv" 
          />
        </div>
      </div>
    </div>
  );
}