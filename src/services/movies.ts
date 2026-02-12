const API_KEY = "674b2c4d";
import posterNotFound from "../images/poster-not-found.png";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`,
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      id: movie.imdbID,
      type: movie.Type,
      poster: movie?.Poster || posterNotFound,
    }));
  } catch (e) {
    throw new Error("Error searching movies");
  }
};
