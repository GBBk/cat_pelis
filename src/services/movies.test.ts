import { describe, expect, it } from "vitest";
import { mapOmdbMovie, parseSearchResponse } from "./movies";

const matrix = {
  Title: "The Matrix",
  Year: "1999",
  imdbID: "tt0133093",
  Type: "movie",
  Poster: "https://example.com/matrix.jpg",
};

describe("mapOmdbMovie", () => {
  it("convierte el formato de OMDb al de la app", () => {
    expect(mapOmdbMovie(matrix)).toEqual({
      title: "The Matrix",
      year: "1999",
      id: "tt0133093",
      type: "movie",
      poster: "https://example.com/matrix.jpg",
    });
  });

  it("usa el póster por defecto cuando OMDb devuelve N/A", () => {
    expect(mapOmdbMovie({ ...matrix, Poster: "N/A" }).poster).not.toBe("N/A");
  });
});

describe("parseSearchResponse", () => {
  it("devuelve las películas encontradas", () => {
    const movies = parseSearchResponse({ Response: "True", Search: [matrix] });
    expect(movies).toHaveLength(1);
    expect(movies[0].id).toBe("tt0133093");
  });

  it("devuelve una lista vacía si no hay resultados", () => {
    expect(parseSearchResponse({ Response: "False", Error: "Movie not found!" })).toEqual([]);
  });

  it("lanza un error claro si hay demasiados resultados", () => {
    expect(() => parseSearchResponse({ Response: "False", Error: "Too many results." })).toThrow(
      /más específica/,
    );
  });

  it("lanza el error de la API en otros casos", () => {
    expect(() => parseSearchResponse({ Response: "False", Error: "Invalid API key!" })).toThrow(
      "Invalid API key!",
    );
  });
});
