import "@/App.css";
import { Movies } from "@/components/Movies";
import { useMovies } from "@/hooks/useMovies";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import useSearch from "@/hooks/useSearch";
import { BarLoader } from "react-spinners";

function LandingPage() {
  const { search, setUpdateSearch, error } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies({ search, sort });
  const debounceGetMovies = useDebouncedCallback((search) => {
    getMovies({ search });
  }, 300);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setUpdateSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div>
      <main className="main">
        <header className="main-header">
          <h1 className="text-5xl text-white mb-3">Buscador de películas</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input-color p-2 m-1 text-2xl border-2 border-gray-300 rounded-md"
              style={{
                border: "1px solid transparent",
                borderColor: error ? "red" : "transparent",
              }}
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Avengers, Star Wars, The Matrix..."
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <Button type="submit" className="p-6 text">
              Buscar
            </Button>
          </form>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </header>
        {loading ? (
          <BarLoader width={"100%"} color="#36d7b7" />
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  );
}

export default LandingPage;
