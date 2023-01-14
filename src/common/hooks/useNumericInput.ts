import { useState } from "react";

interface UseNumericInputProps {
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  step?: number;
}

const useNumericInput = ({
  minValue = 0,
  maxValue = 100,
  defaultValue = 1,
  step = 1,
}: UseNumericInputProps) => {
  const [value, setValue] = useState<string | number>(defaultValue);

  const keepInRange = (value: string, step?: number, direction?: string) => {
    let currentValue = Number(value.replace(/[^\d]+/g, "")) || "";

    if (typeof currentValue !== "number") return currentValue;

    if (step && direction) {
      switch (direction) {
        case "UP":
          currentValue += step;
          break;
        case "DOWN":
          currentValue -= step;
          break;
        default:
          break;
      }
    }

    if (currentValue > maxValue) {
      currentValue = maxValue;
    } else if (currentValue < minValue) {
      currentValue = minValue;
    }

    return currentValue;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(keepInRange(e.currentTarget.value));
  };

  const handleWheel = (
    e: React.WheelEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.deltaY < 0
      ? setValue(keepInRange(e.currentTarget.value, step, "UP"))
      : setValue(keepInRange(e.currentTarget.value, step, "DOWN"));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setValue(keepInRange(e.currentTarget.value, step, "UP"));
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setValue(keepInRange(e.currentTarget.value, step, "DOWN"));
    }
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(keepInRange(e.currentTarget.value));
  };

  const handleReset = (value?: number) => {
    setValue(value ?? "");
  };

  return {
    value,
    handleChange,
    handleWheel,
    handleKeyDown,
    handleBlur,
    handleReset,
  };
};

export default useNumericInput;
