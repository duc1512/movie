"use client";

import { useState, useEffect, Suspense, use } from "react";
import { useSearchParams, notFound } from "next/navigation";
// Import các hàm API mới từ file Api.ts của bạn
import { getTrending, getTopRatedMovies, getTrendingTv, getTopRatedTv, search } from "../../api/Api";
import Grid from "../../components/Grid";
import Search from "../../components/Search";
import { useLoadingStore } from "../../store/useLoadingStore";

function CategoryPageContent({ params }: { params: Promise<{ type: string }> }) {
  // 1. Lấy type từ params (movie hoặc tv)
  const { type } = use(params);

  // Kiểm tra route hợp lệ
  if (type !== "movie" && type !== "tv") {
    notFound();
  }

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [items, setItems] = useState([]);
  const { isLoading, setIsLoading } = useLoadingStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let dataDisplay = [];

      try {
        if (keyword) {
          // Nếu có keyword -> Gọi API Search chung
          const searchData = await search(keyword, type);
          dataDisplay = searchData.results || [];
        } else {
          // Nếu KHÔNG có keyword -> Gọi API tương ứng với type
          const [trendingData, topRatedData] = await Promise.all([
            type === "movie" ? getTrending() : getTrendingTv(),
            type === "movie" ? getTopRatedMovies() : getTopRatedTv(),
          ]);
          dataDisplay = [...(trendingData.results || []), ...(topRatedData.results || [])];
        }

        // Lọc trùng lặp dựa trên id
        const uniqueItems = dataDisplay.filter(
          (item: any, index: number, self: any[]) =>
            index === self.findIndex((m) => m.id === item.id)
        );

        setItems(uniqueItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keyword, type, setIsLoading]);

  // Tiêu đề hiển thị linh hoạt
  const displayTitle = type === "movie" ? "Movies" : "TV Series";

  if (isLoading) {
    return null; // Không render gì khi đang loading
  }

  return (
    <div className="min-h-screen bg-black/90 relative overflow-x-hidden">
      
      {/* 1. LỚP NỀN TRẮNG MỜ DẦN - GIỮ NGUYÊN CSS CŨ */}
      <div className="absolute top-0 left-0 right-0 h-[80px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 via-white/10 to-transparent" />
      </div>

      {/* 2. NỘI DUNG CHÍNH - GIỮ NGUYÊN CSS CŨ */}
      <div className="relative z-10 pt-2 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Tiêu đề thay đổi linh hoạt */}
          <h1 className="text-white text-4xl md:text-4xl font-bold text-center mb-16 tracking-tight drop-shadow-md">
            {displayTitle}
          </h1>

          {/* NHÚNG COMPONENT TÌM KIẾM */}
          <Search mediaType={type} />

          {/* Grid Phim/TV */}
          {items.length > 0 ? (
            <Grid 
              initialMovies={items} 
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