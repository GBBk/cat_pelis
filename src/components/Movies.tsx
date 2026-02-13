import type { MovieType } from "@/types";
import MovieFooter from "./MovieFooter";
import { AuthState } from "@/context/context";

export const ListOfMovies = ({ movies }: { movies: MovieType[] }) => {
  const { isAuthenticated } = AuthState();

  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3 className="text-2xl">{movie.title}</h3>
          <p className="">{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
          {isAuthenticated && <MovieFooter movie={movie} />}
        </li>
      ))}
    </ul>
  );
};

export const NoMoviesFound = () => {
  return (
    <h3 className="text-4xl" style={{ textAlign: "center" }}>
      No se encontraron peliculas
    </h3>
  );
};

export const Movies = ({ movies }: { movies: MovieType[] }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesFound />;
};
