"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TVSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/tv?keyword=${encodeURIComponent(keyword)}`);
    } else {
      router.push("/tv");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-start mb-16">
      <div className="relative w-full max-w-[600px]">
        <div className="!flex !items-center !bg-black !rounded-full !p-1.5 !shadow-2xl !border !border-gray-800">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search TV series..."
            className="!flex-1 !bg-transparent !text-white !placeholder-gray-500 !outline-none !text-lg !font-light !border-none !px-6"
          />
          <button
            onClick={handleSearch}
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
        </div>
      </div>
    </div>
  );
}
