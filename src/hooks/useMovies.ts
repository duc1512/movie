import { useQuery } from '@tanstack/react-query';
import { getTrending, getTopRatedMovies, getTrendingTv, getTopRatedTv, search, getDetails, getCredits, getVideos, getSimilar } from '../api/Api';

export function useTrendingMovies() {
  return useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => getTrending(),
  });
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: () => getTopRatedMovies(),
  });
}
export function useTopRatedTv() {
  return useQuery({
    queryKey: ['top-rated-Tv'],
    queryFn: () => getTopRatedTv(),
  });
}
export function useTrendingTv() {
  return useQuery({
    queryKey: ['trending-tv'],
    queryFn: () => getTrendingTv(),
  });
}

export function useSearchMovies(keyword: string, type: "movie" | "tv") {
  return useQuery({
    queryKey: ['search', keyword, type],
    queryFn: () => search(keyword, type),
    enabled: !!keyword,
  });
}
export function useDetails(type: string, id: string) {
  return useQuery({
    queryKey: ['details', type , id],
    queryFn: () => getDetails(type as "movie" | "tv", id),
    enabled: !!type && !!id,
  });
}
export function useCredits(type: string, id: string) {
  return useQuery({
    queryKey: ['credits', type, id],
    queryFn: () => getCredits(type as "movie" | "tv", id),
    enabled: !!type && !!id,
  });
}
export function useVideos(type: string, id: string) {
  return useQuery({
    queryKey: ['videos', type, id],
    queryFn: () => getVideos(type as "movie" | "tv", id),
    enabled: !!type && !!id,
  });
}
export function useSimilar(type: string, id: string) {
  return useQuery({
    queryKey: ['similar', type, id],
    queryFn: () => getSimilar(type as "movie" | "tv", id),
    enabled: !!type && !!id,
  });
}