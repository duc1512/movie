'use client';

import Link from "next/link";
import { Movie } from "../types/movie";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from 'framer-motion'; 
import { Play } from 'lucide-react';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

type Props = {
  item: Movie;
  mediaType?: "movie" | "tv";
};

export default function MovieCard({ 
  item, 
  mediaType = "movie",
}: Props) {
  const title = item.title || item.name || 'Untitled';

  return (
    <div className="w-full h-full">
      <Link 
        href={`/${mediaType}/${item.id}`}
        className="group block relative w-full h-full z-10 hover:z-30 transition-all duration-300"
      >
        <div className="relative h-72 2xl:h-80 w-full rounded-3xl overflow-hidden shadow-lg bg-gray-800 
                        group-hover:shadow-red-500/70 group-hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={item.poster_path 
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : '/placeholder-movie.jpg'}
            alt={title}
            fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          
          <motion.div
            className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-center backdrop-blur-[2px] 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex items-center justify-center "
            >
              <div className="absolute inset-0 bg-red-600 rounded-full opacity-75 "></div>
              <div className="relative w-22 h-13 bg-red-600 rounded-full flex items-center justify-center btn-primary shadow-2xl shadow-red-600/50 border-2 border-white/20">
                <Play className="w-8 h-4 text-white fill-current ml-1" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-red-500 transition-colors">
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
}