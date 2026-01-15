import { getTrendingTv, getTopRatedTv, getTopRatedMovies, getTrending, searchMovies, searchTvShows } from "../../src/api/Api";
import MovieCard from "../../src/components/MovieCard";
import TVGrid from "../../src/components/TVGrid";
import { Movie } from "../../src/types/movie";

interface MoviePageProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function MoviePage({ searchParams }: MoviePageProps) {
  // Await searchParams vì nó là Promise trong Next.js 13+
  const resolvedSearchParams = await searchParams;
  const keyword = resolvedSearchParams?.keyword;
  
  let tvShowsDisplay: Movie[] = [];

  // 2. LOGIC TÌM KIẾM
  if (keyword) {
    // Nếu có keyword -> Gọi API Search TV Shows
    const searchData = await searchTvShows(keyword);
    tvShowsDisplay = searchData.results;
  } else {
    // Nếu KHÔNG có keyword -> Gọi API Trending TV & Top Rated TV
    const [trendingTvData, topRatedTvData] = await Promise.all([
      getTrendingTv(),
      getTopRatedTv(),
    ]);
    tvShowsDisplay = [...trendingTvData.results, ...topRatedTvData.results];
  }

  // 3. Lọc trùng lặp (giữ nguyên logic của bạn)
  const uniqueTvShows = tvShowsDisplay.filter(
    (tvShow: Movie, index: number, self: Movie[]) =>
      index === self.findIndex((t) => t.id === tvShow.id)
  );


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

          {/* Search Bar */}
          <div className="flex justify-start mb-16">
  <div className="relative w-full max-w-[600px]">
    
    {/* KHỐI CHA: Nền đen, bo tròn, chứa cả input và button */}
    <form className="!flex !items-center !bg-black !rounded-full !p-1.5 !shadow-2xl !border !border-gray-800">
      
      {/* INPUT: Nền trong suốt (!bg-transparent) để hòa vào khối cha */}
      <input
        type="text"
        name="keyword"
        placeholder="Enter keyword"
        defaultValue={keyword || ""}
        className="!flex-1 !bg-transparent !text-white !placeholder-gray-500 !outline-none !text-lg !font-light !border-none !px-6"
      />
      
      {/* BUTTON: Nằm gọn bên trong, có glow đỏ */}
      <button 
        type="submit"
        className="
          !shrink-0 
          !bg-[#ff0000] 
          !text-white 
          !px-8 !py-2 
          !rounded-full 
          !font-bold 
          !transition-all 
          !shadow-[0_0_20px_rgba(255,0,0,0.6)] 
          hover:!shadow-[0_0_30px_rgba(255,0,0,0.8)] 
          hover:!bg-red-600 
          active:!scale-95 
          !border-none 
          !cursor-pointer
          !m-0
        "
      >
        Search
      </button>
      
    </form>
  </div>
</div>

          {/* Grid TV Shows */}
          <TVGrid initialMovies={uniqueTvShows} initialPage={2} keyword={keyword} />

        </div>
      </div>
    </div>
  );
}