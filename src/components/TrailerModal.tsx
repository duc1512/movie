"use client";



import { useEffect, useState } from "react";



export default function TrailerModal({ videoKey, onClose }: any) {

  useEffect(() => {

    const handleEsc = (e: KeyboardEvent) => {

      if (e.key === "Escape") onClose();

    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);

  }, []);



  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-black p-4 rounded-lg relative w-[800px] max-w-full">

        <button

          onClick={onClose}

          className="absolute -top-3 -right-3 bg-red-600 w-8 h-8 rounded-full text-white"

        >

          X

        </button>



        <iframe

          src={`https://www.youtube.com/embed/${videoKey}`}

          className="w-full h-[450px] rounded-lg"

          allowFullScreen

        />

      </div>

    </div>

  );

}