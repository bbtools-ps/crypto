import { useEffect, useState } from "react";

interface FetchResult<T> {
  isFetching: boolean;
  data: T | null;
  error: string | null;
}

export const useFetch = <T>(url: string) => {
  const [result, setResult] = useState<FetchResult<T>>({
    isFetching: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isCurrent = true;

    (async () => {
      try {
        setResult({ isFetching: true, data: null, error: null });

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Can't fetch data! (${response.status})`);
        }

        const data = (await response.json()) as T;

        if (isCurrent) {
          setResult((prevState) => ({ ...prevState, isFetching: false, data }));
        }
      } catch (error) {
        if (isCurrent) {
          setResult((prevState) => ({
            ...prevState,
            isFetching: false,
            error: error instanceof Error ? error.message : String(error),
          }));
        }
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [url]);

  return result;
};
