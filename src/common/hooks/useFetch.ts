import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [result, setResult] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setResult(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [url]);

  return result;
};

export default useFetch;
