import posterNotFound from "../images/poster-not-found.png";
import type { MovieType } from "@/types";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "https://www.omdbapi.com/";

/** Forma de cada resultado en la respuesta de búsqueda de OMDb. */
export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbSearchResponse {
  Response: "True" | "False";
  Search?: OmdbMovie[];
  Error?: string;
}

/** Convierte un resultado de OMDb al modelo de la app. OMDb usa "N/A" cuando no hay póster. */
export function mapOmdbMovie(movie: OmdbMovie): MovieType {
  return {
    title: movie.Title,
    year: movie.Year,
    id: movie.imdbID,
    type: movie.Type,
    poster: movie.Poster && movie.Poster !== "N/A" ? movie.Poster : posterNotFound,
  };
}

/** Interpreta la respuesta de OMDb: "no encontrado" es una lista vacía, cualquier otro error se lanza. */
export function parseSearchResponse(json: OmdbSearchResponse): MovieType[] {
  if (json.Response === "False") {
    if (json.Error === "Movie not found!") return [];
    if (json.Error === "Too many results.") {
      throw new Error("Hay demasiados resultados, probá con una búsqueda más específica");
    }
    throw new Error(json.Error ?? "Error al buscar películas");
  }
  return (json.Search ?? []).map(mapOmdbMovie);
}

export const searchMovies = async ({ search }: { search: string }): Promise<MovieType[]> => {
  const query = search.trim();
  if (query === "") return [];

  if (!API_KEY) {
    throw new Error("Falta configurar VITE_OMDB_API_KEY en el archivo .env");
  }

  const params = new URLSearchParams({ apikey: API_KEY, s: query });

  let response: Response;
  try {
    response = await fetch(`${API_URL}?${params}`);
  } catch {
    throw new Error("No se pudo conectar con el servicio de películas");
  }

  if (!response.ok) {
    throw new Error("Error al buscar películas");
  }

  return parseSearchResponse((await response.json()) as OmdbSearchResponse);
};
