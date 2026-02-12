import type { ErrorType } from "@/types";
import { useEffect, useRef, useState } from "react";

function useSearch() {
  const [search, setUpdateSearch] = useState("");
  const [error, setError] = useState<ErrorType | null>(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError({ message: "La búsqueda no puede estar vacia" });
      return;
    }

    setError(null);
  }, [search]);

  return { search, setUpdateSearch, error };
}

export default useSearch;