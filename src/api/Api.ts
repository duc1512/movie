const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY; 
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function fetchFromTMDB(path: string) {
  // Kiểm tra nếu path đã có dấu '?' thì dùng '&', nếu chưa có thì dùng '?'
  const connector = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${connector}api_key=${API_KEY}`;
  
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status} - Failed to fetch data`);
  }

  return res.json();
}

// Unified search function for both movies and TV shows
export const search = async (keyword: string, mediaType: "movie" | "tv", page: number = 1) => {
  return fetchFromTMDB(`/search/${mediaType}?query=${encodeURIComponent(keyword)}&language=en-US&page=${page}`);
};

export async function getTrending(page: number = 1) {
  return fetchFromTMDB(`/trending/movie/day?page=${page}`);
}

export async function getTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function getTrendingTv(page: number = 1) {
  return fetchFromTMDB(`/trending/tv/week?page=${page}`);
}

export async function getTopRatedTv() {
  return fetchFromTMDB("/tv/top_rated");
}

export async function getDetails(type: "movie" | "tv", id: string | number) {
  return fetchFromTMDB(`/${type}/${id}`);
}

export async function getCredits(type: "movie" | "tv", id: string | number) {
  return fetchFromTMDB(`/${type}/${id}/credits`);
}

export async function getSimilar(type: "movie" | "tv", id: string | number){
  return fetchFromTMDB(`/${type}/${id}/similar`); 
}

export async function getVideos(type: "movie" | "tv", id: string | number) {
  return fetchFromTMDB(`/${type}/${id}/videos`);
}


