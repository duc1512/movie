"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import MovieList from "@/components/MovieList";
import { useDetails,useCredits, useVideos, useSimilar  } from "@/hooks/useMovies";
import { use } from "react";

export default function DetailPage({ params }: { params: Promise<{ type: string, id: string }> }) {
  const { type, id } = use(params);

  if (type !== "movie" && type !== "tv") notFound();

  const { data: details, isLoading: detailsLoading, error: detailsError } = useDetails(type, id);
  const { data: credits, isLoading: creditsLoading } = useCredits(type, id);
  const { data: videos, isLoading: videosLoading } = useVideos(type, id);
  const { data: similar, isLoading: similarLoading } = useSimilar(type, id);
    
  const isLoading = detailsLoading || creditsLoading || videosLoading || similarLoading;

  if (isLoading) return null;
  if (detailsError || !details) notFound();

  const title = details.title || details.name;
  const backdropUrl = details.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : null;
  const posterUrl = details.poster_path 
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : '/placeholder-poster.jpg';

  return (
    <div className="min-h-screen bg-black relative">
      
      <div className="absolute top-[-120px] left-0 w-full h-[700px] z-0">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black" />
      </div>

      <div className="relative z-10 pt-48 px-6 md:px-12 pb-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            <div className="flex-shrink-0">
              <div className="relative w-85 h-[540px] mt-[-150px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-white mt-[-150px] pt-4 flex-1">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                {title}
              </h1>

              {details.genres && (
                <div className="flex flex-wrap gap-2 mb-12">
                  {details.genres.map((genre: any) => (
                    <span 
                      key={genre.id}
                      className="!px-4 py-1 !border-2 !border-white !bg-gradient-to-r !from-black to-gray-800 text-white rounded-2xl text-sm font-medium shadow-lg hover:shadow-red-600/25 transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="w-full">
                <p className="leading-relaxed text-xl text-white">
                  {details.overview || 'No overview available.'}
                </p>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-red-600 rounded-full"></span>
                    Casts
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {credits?.cast?.slice(0, 8).map((actor: any) => (
                      <div key={actor.id} className="flex flex-col items-center">
                        {actor.profile_path ? (
                          <div className="relative w-24 h-29 mb-3">
                            <Image
                              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                              alt={actor.name}
                              fill
                              className="rounded-lg border-2 border-white/30 object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-gray-700 rounded-lg mb-3 border-2 border-white/30 flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">?</span>
                          </div>
                        )}
                        <span className="text-white text-sm text-center font-medium break-words max-w-[100px]">
                          {actor.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
            <span className="w-2 h-10 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
            Trailers
          </h2>

          {videos?.results?.filter((v: any) => v.type === "Trailer" && v.site === "YouTube").length > 0 ? (
            <div className="flex flex-col gap-16">
              {videos.results
                .filter((v: any) => v.type === "Trailer" && v.site === "YouTube")
                .slice(0, 2)
                .map((trailer: any) => (
                  <div key={trailer.id} className="w-full group">
                    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                        title={trailer.name}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <h3 className="text-xl text-gray-200 font-semibold tracking-wide">
                        {trailer.name}
                      </h3>
                      <span className="text-red-500 text-sm font-mono uppercase tracking-widest">
                        Official Trailer
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
            title={type === "movie" ? "Similar Movies" : "Similar TV Shows"} 
            items={similar?.results || []} 
            mediaType={type as "movie" | "tv"} 
          />
        </div>
      </div>
    </div>
  );
}