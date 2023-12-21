import { useState } from "react";

interface IUseNumericInput {
  minValue?: number;
  maxValue?: number;
  value: number;
  step?: number;
}

export const useNumericInput = ({
  minValue = 0,
  maxValue = 100,
  value: initialValue,
  step = 1,
}: IUseNumericInput) => {
  const [value, setValue] = useState<string | number>(initialValue);

  const keepInRange = (
    value: string,
    step?: number,
    direction?: "UP" | "DOWN"
  ) => {
    let currentValue = Number(value) ?? value;

    if (
      typeof currentValue !== "number" ||
      !Number.isFinite(currentValue) ||
      value === ""
    )
      return value;

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

    if (currentValue > maxValue) currentValue = maxValue;
    if (currentValue < minValue) currentValue = minValue;

    return currentValue;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^-?\d*$/.test(e.currentTarget.value))
      setValue(keepInRange(e.currentTarget.value));
  };

  const handleWheel = (
    e: React.WheelEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(
      keepInRange(e.currentTarget.value, step, e.deltaY < 0 ? "UP" : "DOWN")
    );
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
    const value =
      e.currentTarget.value === "" || e.currentTarget.value === "-"
        ? minValue
        : Number(e.currentTarget.value);
    setValue(value);
    return value;
  };

  const handleReset = (value?: number) => {
    setValue(initialValue ?? value);
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
