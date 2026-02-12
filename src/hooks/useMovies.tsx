import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";
import type { ErrorType, MovieType } from "@/types";

export function useMovies({ search, sort }: { search: string; sort: boolean }) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({message: ""});
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({search}: {search: string}) => {
        if(search === previousSearch.current) return;
        try {
          setLoading(true);
          setError({message: null});
          previousSearch.current = search
          const newMovies = await searchMovies({search})
          setMovies(newMovies);
        } catch (e) {
          setError(e as ErrorType);
        } finally {
          setLoading(false);
        }
  }, []);

  const sortedMovies = useMemo(() => { 
    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies;
  }, [movies, sort]);

  return {
   movies: sortedMovies,
   getMovies,
   loading,
   error
  };
}