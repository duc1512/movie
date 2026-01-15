import { getTrending, getTopRatedTv, getTrendingTv, getTopRatedMovies } from "../src/api/Api";
import Banner from "../src/components/Banner";
import MovieList from "../src/components/MovieList";

export default async function Home() {
  const [
    trendingMoviesData,
    trendingTvData,
    topRatedTvData,
    topRatedMoviesData
  ] = await Promise.all([
    getTrending(),
    getTrendingTv(),
    getTopRatedTv(),
    getTopRatedMovies()
  ]);

  return (
    <div className="min-h-screen bg-black ">
      <div className="relative -mt-28">
        <Banner movies={trendingMoviesData.results.slice(0, 5)} />
        
        {/* Hiệu ứng mờ chuyển từ Banner xuống MovieList */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20" />
      </div>

      <div className="relative z-10 bg-black "> 
        <div className="container mx-auto px-4 py-8 ">
          <MovieList 
            title="Trending Movies" 
            items={trendingMoviesData.results} 
            mediaType="movie" 
          />
          
          <MovieList 
            title="Top Rate Movies" 
            items={topRatedMoviesData.results} 
            mediaType="movie" 
          />
          
          <MovieList 
            title="Trending TV" 
            items={trendingTvData.results} 
            mediaType="tv" 
          />
          
          <MovieList 
            title="Top Rated TV" 
            items={topRatedTvData.results} 
            mediaType="tv" 
          />
        </div>
      </div>
    </div>
  );
}