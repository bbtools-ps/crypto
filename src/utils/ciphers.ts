import { Alphabet, LetterCombinationsAmount } from "../constants";

const generateVigenereDictionary = (key: string, str: string) => {
  if (!key) return Alphabet;
  const wholeKey = key
    .repeat(Math.ceil(str.length / key.length))
    .slice(0, str.length);
  let dictionary = [];
  for (const letter of Array.from(wholeKey)) {
    dictionary.push(
      Alphabet.slice(Alphabet.indexOf(letter), Alphabet.length) +
        Alphabet.slice(0, Alphabet.indexOf(letter))
    );
  }
  return dictionary;
};

export const vigenereEncrypt = (key: string, str: string) => {
  const dictionary = generateVigenereDictionary(key, str);
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(dictionary[i][Alphabet.indexOf(str[i])] || str[i]);
  }
  return result.join("");
};

export const vigenereDecrypt = (key: string, str: string) => {
  const dictionary = generateVigenereDictionary(key, str);
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(Alphabet[dictionary[i].indexOf(str[i])] || str[i]);
  }
  return result.join("");
};

export const caesarEncryptDecrypt = (shiftValue: number, str: string) => {
  const input = Alphabet;
  const output =
    Alphabet.slice(shiftValue, 26) +
    Alphabet.slice(0, shiftValue) +
    Alphabet.slice(26 + shiftValue, 52) +
    Alphabet.slice(26, 52 - shiftValue);

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
        ? data[letter][Math.floor(Math.random() * LetterCombinationsAmount)]
            .code
        : data[letter] || letter
    )
    .join("");
};
