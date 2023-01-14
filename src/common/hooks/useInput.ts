import { useState } from "react";

interface UseInputProps {
  encryptDecrypt: (payload: string) => string;
}

const useInput = ({ encryptDecrypt }: UseInputProps) => {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    setTranslatedValue(encryptDecrypt(e.target.value));
  };

  const handleSetTranslatedValue = (value: string) => {
    setTranslatedValue(value);
  };

  const handleReset = () => {
    setValue("");
    setTranslatedValue("");
  };

  return {
    value,
    translatedValue,
    handleChange,
    handleSetTranslatedValue,
    handleReset,
  };
};

export default useInput;
