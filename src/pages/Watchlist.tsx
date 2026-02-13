import { useMovieContext } from "@/context/useMovieContext";
import { Movies } from "@/components/Movies";

const Watchlist = () => {
  const { watched } = useMovieContext();

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center">Películas Vistas</h1>

      {watched.length > 0 ? (
        <Movies movies={watched} />
      ) : (
        <p>No tienes películas vistas aún.</p>
      )}
    </div>
  );
};

export default Watchlist;
