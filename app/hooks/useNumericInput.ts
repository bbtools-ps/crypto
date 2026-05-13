import { useState } from "react";

/**
 * Configuration options for the useNumericInput hook.
 */
interface IUseNumericInput {
  minValue?: number;
  maxValue?: number;
  value: number;
  step?: number;
}

/**
 * A custom hook to manage a numeric input with range validation and multiple interaction methods.
 * Supports keyboard arrows, mouse wheel, and manual entry with range enforcement.
 *
 * @param {IUseNumericInput} options - The configuration options for the numeric input.
 *
 * @returns {Object} Interaction handlers and current state.
 * @property {string|number} value - The current value of the input.
 * @property {Function} handleChange - Validates and updates the value on manual text entry.
 * @property {Function} handleWheel - Increments/decrements the value on mouse wheel events.
 * @property {Function} handleKeyDown - Increments/decrements the value on ArrowUp/ArrowDown key presses.
 * @property {Function} handleBlur - Finalizes the value, ensuring it stays within range when focus is lost.
 * @property {Function} handleReset - Resets the input value to its initial state.
 *
 * @example
 * const numericInput = useNumericInput({ value: 10, minValue: 0, maxValue: 100, step: 1 });
 * <input {...numericInput} />
 */
export const useNumericInput = ({
  minValue = 0,
  maxValue = 100,
  value: initialValue,
  step = 1,
}: IUseNumericInput) => {
  const [value, setValue] = useState<string | number>(initialValue);

  /**
   * Helper function to ensure a value stays within the defined min/max range.
   * Also handles incrementing/decrementing based on a step and direction.
   *
   * @param {string} value - The current string representation of the value.
   * @param {number} [step] - Optional step size for adjustments.
   * @param {"UP" | "DOWN"} [direction] - The adjustment direction.
   * @returns {string|number} The validated value within range.
   */
  const keepInRange = (
    value: string,
    step?: number,
    direction?: "UP" | "DOWN"
  ) => {
    let currentValue = Number(value) || value;

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
