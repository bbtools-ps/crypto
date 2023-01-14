import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [result, setResult] = useState<{
    isLoading: boolean;
    data: any;
    error: any;
  }>({ isLoading: true, data: null, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResult({ isLoading: false, data: json, error: null });
      } catch (error) {
        setResult({ isLoading: false, data: null, error });
      }
    };

    fetchData();
  }, [url]);

  return result;
};

export default useFetch;
