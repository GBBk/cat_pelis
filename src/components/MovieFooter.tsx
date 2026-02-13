import type { MovieType } from "@/types";
import { BookmarkIcon, StarIcon } from "lucide-react";
import { useMovieContext } from "@/context/useMovieContext";

const MovieFooter = ({ movie }: { movie: MovieType }) => {
  const { toggleFavorite, toggleWatched, isFavorite, isWatched } =
    useMovieContext();

  const favorite = isFavorite(movie.id);
  const watched = isWatched(movie.id);

  return (
    <div className="flex flex-row justify-between m-2 mt-4">
      <StarIcon
        onClick={() => toggleFavorite(movie)}
        className={`cursor-pointer transition-colors ${
          favorite
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-400 fill-none"
        }`}
      />

      <BookmarkIcon
        onClick={() => toggleWatched(movie)}
        className={`cursor-pointer transition-colors ${
          watched ? "text-blue-400 fill-blue-400" : "text-gray-400 fill-none"
        }`}
      />
    </div>
  );
};

export default MovieFooter;
