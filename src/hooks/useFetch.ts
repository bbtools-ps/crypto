import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [result, setResult] = useState<{
    isLoading: boolean;
    data: any;
    error: any;
  }>({ isLoading: true, data: null, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Can't with fetch data! (${response.status})`);
        const json = await response.json();
        setResult({ isLoading: false, data: json, error: null });
      } catch (error: any) {
        setResult({ isLoading: false, data: null, error: error.message });
      }
    };

    fetchData();
  }, [url]);

  return result;
};
