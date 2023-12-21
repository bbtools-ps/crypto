import { useState } from "react";

interface IUseInput {
  encryptDecrypt: (payload: string) => string;
}

export const useInput = ({ encryptDecrypt }: IUseInput) => {
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
