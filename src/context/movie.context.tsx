import { createContext } from "react";
import type { MovieType } from "@/types";

export interface MovieContextType {
  favorites: MovieType[];
  watched: MovieType[];
  toggleFavorite: (movie: MovieType) => void;
  toggleWatched: (movie: MovieType) => void;
  isFavorite: (id: string) => boolean;
  isWatched: (id: string) => boolean;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined,
);
