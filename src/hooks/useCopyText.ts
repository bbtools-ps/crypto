import { useState } from "react";

export const useCopyText = ({
  delay = 2000,
  elementRef,
}: {
  delay?: number;
  elementRef: React.RefObject<HTMLInputElement>;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const value = elementRef.current?.textContent || "";
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, delay);
    } catch (error) {
      setIsCopied(false);
    }
  };

  return { isCopied, handleCopy };
};
