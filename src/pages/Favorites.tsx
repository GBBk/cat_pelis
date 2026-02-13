import { useMovieContext } from "@/context/useMovieContext";
import { Movies } from "@/components/Movies";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center">Películas Favoritas</h1>

      {favorites.length > 0 ? (
        <Movies movies={favorites} />
      ) : (
        <p>No tienes películas favoritas aún.</p>
      )}
    </div>
  );
};

export default Favorites;
