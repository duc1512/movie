import { getTrending, getTopRatedMovies, searchMovies } from "../../src/api/Api";
import MovieSearch from "../../src/components/MovieSearch";
import MovieCard from "../../src/components/MovieCard";

// Định nghĩa Props để nhận searchParams từ URL
interface MoviePageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function MoviePage({ searchParams }: MoviePageProps) {
  // Await searchParams vì nó là Promise trong Next.js 13+
  const resolvedSearchParams = await searchParams;
  const keyword = resolvedSearchParams?.keyword;
  
  let moviesDisplay = [];

  // 2. LOGIC TÌM KIẾM
  if (keyword) {
    // Nếu có keyword -> Gọi API Search
    const searchData = await searchMovies(keyword);
    moviesDisplay = searchData.results;
  } else {
    // Nếu KHÔNG có keyword -> Gọi API Trending & Top Rated cũ
    const [trendingMoviesData, topRatedMoviesData] = await Promise.all([
      getTrending(),
      getTopRatedMovies(),
    ]);
    moviesDisplay = [...trendingMoviesData.results, ...topRatedMoviesData.results];
  }

  // 3. Lọc trùng lặp (giữ nguyên logic của bạn)
  const uniqueMovies = moviesDisplay.filter(
    (movie: any, index: number, self: any[]) =>
      index === self.findIndex((m) => m.id === movie.id)
  );

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
          {uniqueMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              {uniqueMovies.map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  item={movie}
                  mediaType="movie"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-20 text-xl">
              No movies found based on your keyword.
            </div>
          )}

          {/* Nút Watch More (Chỉ hiện khi không search hoặc tuỳ logic bạn muốn) */}
          {!keyword && (
            <div className="relative py-20 flex justify-center">
              <button className="!px-12 !py-3 !bg-transparent !border-2 !border-red-600 !text-white !rounded-full !font-bold !text-lg hover:!bg-red-600 !transition-all !duration-300 !cursor-pointer">
                Watch more
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}