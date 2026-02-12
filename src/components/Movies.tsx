import type { MovieType } from "@/types";

export const ListOfMovies = ({ movies }: { movies: MovieType[] }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3 className="text-2xl">{movie.title}</h3>
          <p className="">{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
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
