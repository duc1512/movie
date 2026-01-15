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

// Tận dụng hàm fetchFromTMDB cho Search để code ngắn gọn hơn
export const searchMovies = async (keyword: string) => {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(keyword)}&language=en-US&page=1`);
};

export const searchTvShows = async (keyword: string) => {
  return fetchFromTMDB(`/search/tv?query=${encodeURIComponent(keyword)}&language=en-US&page=1`);
};

export async function getTrending() {
  return fetchFromTMDB("/trending/movie/day");
}

export async function getTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function getTrendingTv() {
  return fetchFromTMDB("/trending/tv/week");
}

export async function getTopRatedTv() {
  return fetchFromTMDB("/tv/top_rated");
}

export async function getTvShowDetails(id: string | number) {
  return fetchFromTMDB(`/tv/${id}`);
}

export async function getMovieDetails(id: string | number) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieVideos(id: string | number) {
  return fetchFromTMDB(`/movie/${id}/videos`);
}

export async function getMovieCredits(id: string | number) {
  return fetchFromTMDB(`/movie/${id}/credits`);
}
export async function getSimilarMovies(id: string | number){
  return fetchFromTMDB(`/movie/${id}/similar`); 
}

export async function getTVVideos(id: string | number) {
  return fetchFromTMDB(`/tv/${id}/videos`);
}

export async function getTVCredits(id: string | number) {
  return fetchFromTMDB(`/tv/${id}/credits`);
}
export async function getTVSimilar(id: string | number){
  return fetchFromTMDB(`/tv/${id}/similar`); 
}