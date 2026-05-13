import { useState } from "react";

/**
 * Configuration options for the useInput hook.
 */
interface IUseInput {
  encryptDecrypt: (payload: string) => string;
}

/**
 * A custom hook to manage input state with an automatic translation/transformation step.
 * Useful for scenarios like real-time encryption, decryption, or formatting.
 *
 * @param {IUseInput} params - The hook parameters.
 * @param {Function} params.encryptDecrypt - Transformation function applied on input change.
 *
 * @returns {Object} An object containing input state and handlers.
 * @property {string} value - The current raw input value.
 * @property {string} translatedValue - The transformed value based on the `encryptDecrypt` function.
 * @property {Function} handleChange - Event handler for input change events.
 * @property {Function} handleSetTranslatedValue - Manual setter for the translated value.
 * @property {Function} handleReset - Resets both the raw value and the translated value to empty strings.
 *
 * @example
 * const { value, translatedValue, handleChange, handleReset } = useInput({
 *   encryptDecrypt: (val) => val.toUpperCase()
 * });
 */
export const useInput = ({ encryptDecrypt }: IUseInput) => {
  const [value, setValue] = useState("");
  const [translatedValue, setTranslatedValue] = useState("");

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
