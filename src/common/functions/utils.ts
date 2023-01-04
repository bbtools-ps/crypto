export const emojiDecodeEncode = (
  str: string,
  data: { [key: string]: { code: string; emoji: string }[] | string }
) => {
  console.log(
    str.split("").map((letter) =>
      Array.isArray(data[letter])
        ? // @ts-ignore
          data[letter][Math.floor(Math.random() * 5)].code
        : data[letter] || letter
    )
  );
  return str
    .split("")
    .map((letter) =>
      Array.isArray(data[letter])
        ? // @ts-ignore
          data[letter][Math.floor(Math.random() * 5)].code
        : data[letter] || letter
    )
    .join("");
};
