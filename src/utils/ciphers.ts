import {
  ALPHABET,
  LETTER_COMBINATIONS_AMOUNT,
} from "../../emoji-dict/constants";

const generateVigenereDictionary = (key: string, str: string) => {
  if (!key) return ALPHABET;
  const wholeKey = key
    .repeat(Math.ceil(str.length / key.length))
    .slice(0, str.length);
  let dictionary = [];
  for (const letter of Array.from(wholeKey)) {
    dictionary.push(
      ALPHABET.slice(ALPHABET.indexOf(letter), ALPHABET.length) +
        ALPHABET.slice(0, ALPHABET.indexOf(letter))
    );
  }
  return dictionary;
};

export const vigenereEncrypt = (key: string, str: string) => {
  const dictionary = generateVigenereDictionary(key, str);
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(dictionary[i][ALPHABET.indexOf(str[i])] || str[i]);
  }
  return result.join("");
};

export const vigenereDecrypt = (key: string, str: string) => {
  const dictionary = generateVigenereDictionary(key, str);
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(ALPHABET[dictionary[i].indexOf(str[i])] || str[i]);
  }
  return result.join("");
};

export const caesarEncryptDecrypt = (shiftValue: number, str: string) => {
  const input = ALPHABET;
  const output =
    ALPHABET.slice(shiftValue, 26) +
    ALPHABET.slice(0, shiftValue) +
    ALPHABET.slice(26 + shiftValue, 52) +
    ALPHABET.slice(26, 52 - shiftValue);

  return Array.from(str)
    .map((letter) => output[input.indexOf(letter)] || letter)
    .join("");
};

export const emojiEncryptDecrypt = (
  str: string,
  data: { [key: string]: { code: string; emoji: string }[] }
) => {
  return Array.from(str)
    .map((letter) =>
      Array.isArray(data[letter])
        ? data[letter][Math.floor(Math.random() * LETTER_COMBINATIONS_AMOUNT)]
            .code
        : data[letter] || letter
    )
    .join("");
};
