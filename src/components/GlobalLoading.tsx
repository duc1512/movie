"use client";
import { useLoadingStore } from "../store/useLoadingStore";

export default function GlobalLoading() {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black backdrop-blur-md">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-4 font-semibold tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}