import { useState } from "react";

type FetchCallback<TData, TOptions, TArgs extends unknown[]> = (
  options: TOptions,
  ...args: TArgs
) => Promise<TData>;

function useFetch<TData, TOptions = undefined, TArgs extends unknown[] = []>(
  cb: FetchCallback<TData, TOptions, TArgs>,
  options?: TOptions,
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: TArgs) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options as TOptions, ...args);
      setData(response);
      return response;
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocurrió un error"));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
}

export default useFetch;
