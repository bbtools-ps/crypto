const OtherCharacters = ",.!? ()0123456789";
export const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const ExtendedAlphabet = Alphabet + OtherCharacters;
export const LetterCombinationsAmount = 5;
export const Pages = {
  Ciphers: [
    { name: "Caesar", path: "/caesar-cipher", icon: "🤴" },
    { name: "Vigenère", path: "/vigenere-cipher", icon: "🔐" },
    { name: "Emoji", path: "/emoji-cipher", icon: "🦄" },
  ],
  About: { path: "/about" },
};
export const CryptoModes = [
  { name: "Encrypt", value: "encrypt" },
  { name: "Decrypt", value: "decrypt" },
] as const;
