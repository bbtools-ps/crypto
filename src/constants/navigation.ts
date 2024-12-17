export const PAGES = {
  ciphers: [
    {
      label: "Caesar",
      path: "/caesar-cipher",
      icon: "🤴",
      description:
        "In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques.",
    },
    {
      label: "Vigenère",
      path: "/vigenere-cipher",
      icon: "🔐",
      description: `The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a "secret key".`,
    },
    {
      label: "Emoji",
      path: "/emoji-cipher",
      icon: "🦄",
      description: "Encrypt/decrypt text using emojis.",
    },
  ],
  about: { label: "About", path: "/about" },
} as const;
