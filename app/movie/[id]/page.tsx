import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies } from "../../../src/api/Api";
import { notFound } from "next/navigation";
import Image from "next/image";
import MovieList from "@/src/components/MovieList";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  [key: string]: any;
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let movie: MovieDetails;
  let credits: any;
  let videos: any;
  let similar: any;
  
  try {
    // Fetch movie details, credits and videos in parallel
    const [movieData, creditsData, videosData, similarMoviesData] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id),
      getSimilarMovies(id)
    ]);
    movie = movieData;
    credits = creditsData;
    videos = videosData;
    similar=similarMoviesData;
  } catch (error) {
    notFound();
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg';



  return (
    <div className="min-h-screen bg-black relative">
      
      <div className="absolute top-[-120px] left-0 w-full h-[700px] z-0">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            // Tăng độ rõ của ảnh nền
            priority
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black" />
      </div>

      {/* 2. NỘI DUNG CHI TIẾT PHIM */}
      <div className="relative z-10 pt-48 px-6 md:px-12 pb-20">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Căn items-start để tiêu đề cao bằng đỉnh Poster */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Poster Phim */}
            <div className="flex-shrink-0">
              <div className="relative w-85 h-[540px] mt-[-150px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Thông tin chữ - Đẩy lên cao bằng Poster và xóa shadow chữ */}
            <div className="text-white mt-[-150px] pt-4 flex-1">
              {/* Xóa sạch drop-shadow ở h1 để Header trông thanh thoát nhất */}
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                {movie.title}
              </h1>
              {movie.genres && (
                <div className="flex flex-wrap gap-2 mb-12">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id}
                      className="!px-4 py-1 !border-2 !border-white !bg-gradient-to-r !from-black to-gray-800 text-white rounded-2xl text-sm font-medium shadow-lg hover:shadow-red-600/25 transition-all duration-300 hover:scale-105"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              

              

              {/* Nội dung Overview */}
              <div className="w-full">
                <p className="leading-relaxed text-xl text-white">
                  {movie.overview || 'No overview available.'}
                </p>
                
                {/* Casts Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
                    Casts
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {/* Real cast data from TMDB API */}
                    {credits?.cast?.slice(0, 8).map((actor: any) => (
                      <div key={actor.id} className="flex flex-col items-center">
                        {actor.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            width={96}
                            height={96}
                            className="w-24 h-29 rounded-lg mb-3 border-2 border-white/30 object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-700 rounded-lg mb-3 border-2 border-white/30 flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">?</span>
                          </div>
                        )}
                        <span className="text-white text-sm text-center font-medium break-words max-w-[100px]">{actor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🎬 Official Trailers Section - Full Width Mode */}
<div className="relative z-10 px-6 md:px-12 pb-20">
  <div className="max-w-[1440px] mx-auto"> {/* Giới hạn độ rộng tối đa để không bị quá loãng trên màn hình cực lớn */}
    <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
      <span className="w-2 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
       Trailers
    </h2>

    {/* Lọc và hiển thị danh sách trailer dọc */}
    {videos?.results?.filter((v: any) => v.type === "Trailer" && v.site === "YouTube").length > 0 ? (
      <div className="flex flex-col gap-16"> {/* Khoảng cách gap lớn để phân tách rõ các trailer */}
        {videos.results
          .filter((v: any) => v.type === "Trailer" && v.site === "YouTube")
          .map((trailer: any) => (
            <div key={trailer.id} className="w-full group">
              {/* Container Video chiếm hết trang */}
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5 transition-transform duration-500 ">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0`}
                  title={trailer.name}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Tên của từng Trailer bên dưới */}
              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-xl text-gray-200 font-semibold tracking-wide">
                  {trailer.name}
                </h3>
                <span className="text-red-500 text-sm font-mono uppercase tracking-widest">
                  4K Ultra HD
                </span>
              </div>
            </div>
          ))}
      </div>
    ) : (
      <div className="bg-gray-900/50 rounded-2xl p-12 text-center border border-dashed border-white/10">
        <p className="text-gray-500 text-lg italic">Coming soon: Official trailers are being updated...</p>
      </div>
    )}
  </div>
</div>
<div className="relative z-10 px-6 md:px-12 pb-20">
  <div className="max-w-[1440px] mx-auto">
    <MovieList 
    key={id}
      title="Similar " 
      items={similar.results} 
      mediaType="movie" 
    />
  </div>
</div>
    </div>
  );
}