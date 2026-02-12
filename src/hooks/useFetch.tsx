import { useState } from "react";

type FetchCallback<TData, TOptions, TArgs extends any[]> = (
  options: TOptions,
  ...args: TArgs
) => Promise<TData>;

interface ApiError {
  error: string;
  message?: string;
  status?: number;
}

function useFetch<TData, TOptions = undefined, TArgs extends any[] = []>(
  cb: FetchCallback<TData, TOptions, TArgs>,
  options?: TOptions,
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fn = async (...args: TArgs) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options as TOptions, ...args);
      setData(response);
      return response;
    } catch (error) {
      setError(error as ApiError);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
}

export default useFetch;
