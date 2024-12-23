import InputOutput from "~/components/InputOutput/InputOutput";
import PageDescription from "~/components/PageDescription/PageDescription";
import { PAGES } from "~/constants";
import { useInput } from "~/hooks";
import { emojiEncryptDecrypt } from "~/utils";
import type { Route } from "../routes/+types/emoji-cipher";

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const data = await fetch("/dict.json");
  const dictionary = await data.json();
  return dictionary as Record<string, { code: string; emoji: string }[]>;
}

export default function EmojiCipher({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  const { value, translatedValue, handleChange, handleReset } = useInput({
    encryptDecrypt: (value) => emojiEncryptDecrypt(value, data),
  });

  return (
    <>
      <PageDescription
        title={PAGES.ciphers[2].label}
        description={PAGES.ciphers[2].description}
        icon={PAGES.ciphers[2].icon}
      />
      <InputOutput
        inputValue={value}
        outputValue={translatedValue}
        onInputChange={handleChange}
        onReset={handleReset}
      />
    </>
  );
}
