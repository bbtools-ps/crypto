import { readFile, writeFile } from "fs/promises";
import { ExtendedAlphabet, LetterCombinationsAmount } from "./constants";

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

    const emojis = newData
      .filter((item) => {
        return item.code && item.code.split(" ").length === 1 && item.emoji;
      })
      .map(({ code, emoji }) => {
        const firstCodeItem = code.split(" ")[0];
        return {
          code: `&#x${firstCodeItem.replace("U+", "")};`,
          emoji,
        };
      });

    const randomEmojis = getRandomItems(
      emojis,
      ExtendedAlphabet.length * LetterCombinationsAmount
    );

    const emojisAlphabet = chunkMaxLength(
      [...randomEmojis],
      LetterCombinationsAmount,
      ExtendedAlphabet.length
    )
      .filter((item) => item.length)
      .map((item, index) =>
        item.map((item) => ({ ...item, value: ExtendedAlphabet[index] }))
      );

    // Check if both arrays (emojis + alphabet) have the same length before continuing
    if (ExtendedAlphabet.length !== emojisAlphabet.length) {
      console.log("Array lengths (emojis + alphabet) must be the same!");
      return;
    }

    const alphabetEmojisArr = Array.from(ExtendedAlphabet).map(
      (item, index) => ({
        [item]: [
          ...[...randomEmojis].splice(
            index * LetterCombinationsAmount,
            LetterCombinationsAmount
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

    await writeFile("./dict.json", JSON.stringify(newObj));
  } catch (error) {
    console.error(error);
  }
})();
