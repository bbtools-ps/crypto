import { LETTER_COMBINATIONS_AMOUNT } from "../../emoji-dict/constants";

export const vigenereEncrypt = (key: string, str: string) => {
  if (!key) return str;

  return str.replace(/[A-Za-z]/g, (char, index) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65; // 'a' or 'A'
    const keyChar = key[index % key.length];
    const keyShift = keyChar.toLowerCase().charCodeAt(0) - 97;
    return String.fromCharCode(((code - base + keyShift) % 26) + base);
  });
};

export const vigenereDecrypt = (key: string, str: string) => {
  if (!key) return str;

  return str.replace(/[A-Za-z]/g, (char, index) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65; // 'a' or 'A'
    const keyChar = key[index % key.length];
    const keyShift = keyChar.toLowerCase().charCodeAt(0) - 97;
    return String.fromCharCode(((code - base - keyShift + 26) % 26) + base);
  });
};

export const caesarEncryptDecrypt = (shiftValue: number, str: string) => {
  return str.replace(/[A-Za-z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65; // 'a' or 'A'
    return String.fromCharCode(((code - base + shiftValue) % 26) + base);
  });
};

export const emojiEncryptDecrypt = (
  str: string,
  data: Record<string, { code: string; emoji: string }[]> | null
) => {
  if (!data) return str;

  return Array.from(str)
    .map((letter) =>
      Array.isArray(data[letter])
        ? data[letter][Math.floor(Math.random() * LETTER_COMBINATIONS_AMOUNT)]
            .code
        : data[letter] || letter
    )
    .join("");
};
