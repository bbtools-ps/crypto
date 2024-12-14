import { useEffect, useState } from "react";

interface FetchResult<T> {
  isLoading: boolean;
  data: T | null;
  error: string | null;
}

export const useFetch = <T>(url: string) => {
  const [result, setResult] = useState<FetchResult<T>>({
    isLoading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isCurrent = true;

    (async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Can't fetch data! (${response.status})`);
        }

        const data = (await response.json()) as T;

        if (isCurrent) {
          setResult({ isLoading: false, data, error: null });
        }
      } catch (error) {
        if (isCurrent) {
          setResult({
            isLoading: false,
            data: null,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [url]);

  return result;
};
