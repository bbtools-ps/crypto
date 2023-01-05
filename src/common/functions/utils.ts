import { LetterCombinationsAmount } from "../constants/constants";

export const emojiDecryptEncrypt = (
  str: string,
  data: { [key: string]: { code: string; emoji: string }[] }
) => {
  return Array.from(str)
    .map((letter) =>
      Array.isArray(data[letter])
        ? data[letter][Math.floor(Math.random() * LetterCombinationsAmount)]
            .code
        : data[letter] || letter
    )
    .join("");
};
