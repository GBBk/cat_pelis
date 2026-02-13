import { useState } from "react";
import type { MovieType } from "@/types";
import { MovieContext } from "./movie.context";
import { useEffect } from "react";
import { AuthState } from "./context";

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState<MovieType[]>([]);
  const { user } = AuthState();

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setWatched([]);
      return;
    }

    const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
    const storedWatched = localStorage.getItem(`watched_${user.id}`);

    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    setWatched(storedWatched ? JSON.parse(storedWatched) : []);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
  }, [favorites, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`watched_${user.id}`, JSON.stringify(watched));
  }, [watched, user]);

  const toggleFavorite = (movie: MovieType) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie],
    );
  };

  const toggleWatched = (movie: MovieType) => {
    setWatched((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie],
    );
  };

  const isFavorite = (id: string) => favorites.some((m) => m.id === id);

  const isWatched = (id: string) => watched.some((m) => m.id === id);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        watched,
        toggleFavorite,
        toggleWatched,
        isFavorite,
        isWatched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
