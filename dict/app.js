const { readFile, writeFile } = require("fs/promises");

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
  const getRandomItems = (arr, amount) => {
    const randomList = [...arr];
    for (let i = randomList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomList[i], randomList[j]] = [randomList[j], randomList[i]];
    }
    return randomList.splice(0, amount);
  };

  const chunkMaxLength = (arr, chunkSize, maxLength) => {
    return Array.from({ length: maxLength }, () => arr.splice(0, chunkSize));
  };

  const response = await readFile("./full-emoji-list.json", "utf8");
  const newData = Object.entries(JSON.parse(response)).flat(99);

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

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,.!? ()0123456789";
  const randomEmojis = getRandomItems(emojis, alphabet.length * 5);

  const emojisAlphabet = chunkMaxLength([...randomEmojis], 5, alphabet.length)
    .filter((item) => item.length)
    .map((item, index) =>
      item.map((item) => ({ ...item, value: alphabet[index] }))
    );

  // Check if both arrays (emojis + alphabet) have the same length before continuing
  if (alphabet.length !== emojisAlphabet.length) {
    console.log("Array lengths (emojis + alphabet) must be the same!");
    return;
  }

  const alphabetEmojisArr = [...alphabet].map((item, index) => ({
    [item]: [...[...randomEmojis].splice(index * 5, 5)],
  }));
  const emojisAlphabetArr = emojisAlphabet
    .flat(99)
    .map(({ emoji, value }) => ({ [emoji]: value }));

  const newObj = Object.assign({}, ...alphabetEmojisArr, ...emojisAlphabetArr);

  await writeFile("./dict.json", JSON.stringify(newObj));
})();
