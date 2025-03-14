import { readFile, writeFile } from "fs/promises";
import { EXTENDED_ALPHABET, LETTER_COMBINATIONS_AMOUNT } from "./constants.js";

/**NodeJS app for generating new dictionary
 * Steps:
 * 1. Read "full-emoji-list.json" file.
 * 2. Generate two arrays: emojisHTML and emojisUTF.
 * 3. Randomize array and get random items amount based on the "alphabet" length.
 * 4. Generate new object that looks like this:
 * "A":[{"code":"&#x$1EC;","emoji":"🇬🇮"},{"code":"&#x$3BC;","emoji":"🎼"},{"code":"&#x$944;","emoji":"🥄"},{"code":"&#x$4E1;","emoji":"📡"},{"code":"&#x$332;","emoji":"🌲"}]
 * "🇬🇮":"A","🎼":"A","🥄":"A","📡":"A","🌲":"A"
 */
(async function () {
  const getRandomItems = <T>(arr: T[], amount: number) => {
    const randomList = [...arr];
    for (let i = randomList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomList[i], randomList[j]] = [randomList[j], randomList[i]];
    }
    return randomList.splice(0, amount);
  };

  const chunkMaxLength = <T>(arr: T[], chunkSize: number, maxLength: number) =>
    Array.from({ length: maxLength }, () => arr.splice(0, chunkSize));

  try {
    const response = await readFile("./full-emoji-list.json", "utf8");
    const newData = Object.entries(JSON.parse(response)).flat(
      99
    ) as unknown as {
      code: string;
      emoji: string;
    }[];

    const emojis = newData.reduce<{ code: string; emoji: string }[]>(
      (acc, item) => {
        if (item.code && item.code.split(" ").length === 1 && item.emoji) {
          const firstCodeItem = item.code.split(" ")[0];
          acc.push({
            code: `&#x${firstCodeItem.replace("U+", "")};`,
            emoji: item.emoji,
          });
        }
        return acc;
      },
      []
    );

    const randomEmojis = getRandomItems(
      emojis,
      EXTENDED_ALPHABET.length * LETTER_COMBINATIONS_AMOUNT
    );

    const emojisAlphabet = chunkMaxLength(
      [...randomEmojis],
      LETTER_COMBINATIONS_AMOUNT,
      EXTENDED_ALPHABET.length
    ).reduce<{ code: string; emoji: string; value: string }[][]>(
      (acc, item, index) => {
        if (item.length) {
          acc.push(
            item.map((emoji) => ({ ...emoji, value: EXTENDED_ALPHABET[index] }))
          );
        }
        return acc;
      },
      []
    );

    // Check if both arrays (emojis + alphabet) have the same length before continuing
    if (EXTENDED_ALPHABET.length !== emojisAlphabet.length) {
      console.log("Array lengths (emojis + alphabet) must be the same!");
      return;
    }

    const alphabetEmojisArr = Array.from(EXTENDED_ALPHABET).map(
      (item, index) => ({
        [item]: [
          ...[...randomEmojis].splice(
            index * LETTER_COMBINATIONS_AMOUNT,
            LETTER_COMBINATIONS_AMOUNT
          ),
        ],
      })
    );
    const emojisAlphabetArr = emojisAlphabet
      .map((item) => item.map(({ emoji, value }) => ({ [emoji]: value })))
      .flat(99);

    const newObj = Object.assign(
      {},
      ...alphabetEmojisArr,
      ...emojisAlphabetArr
    );

    await writeFile("../../public/dict.json", JSON.stringify(newObj));
  } catch (error) {
    console.error(error);
  }
})();
