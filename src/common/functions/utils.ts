export const emojiDecodeEncode = (
  str: string,
  data: { [key: string]: { code: string; emoji: string }[] | string }
) => {
  return Array.from(str)
    .map((letter) =>
      Array.isArray(data[letter])
        ? // @ts-ignore
          data[letter][Math.floor(Math.random() * 5)].code
        : data[letter] || letter
    )
    .join("");
};
