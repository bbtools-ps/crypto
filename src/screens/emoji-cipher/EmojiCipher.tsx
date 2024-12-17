import Alert from "@/components/Alert/Alert";
import InputOutput from "@/components/InputOutput/InputOutput";
import Loading from "@/components/Loading/Loading";
import PageDescription from "@/components/PageDescription/PageDescription";
import { PAGES } from "@/constants";
import { useFetch, useInput } from "@/hooks";
import { emojiEncryptDecrypt } from "@/utils";

export function Component() {
  const { data, error, isFetching } = useFetch<
    Record<string, { code: string; emoji: string }[]>
  >(
    "https://raw.githubusercontent.com/bbtools-ps/emoji-cipher/main/emoji-dict/dict.json"
  );

  const { value, translatedValue, handleChange, handleReset } = useInput({
    encryptDecrypt: (value) => emojiEncryptDecrypt(value, data),
  });

  return (
    <>
      {/* Status: Pending */}
      {isFetching && <Loading />}
      {/* Status: Fulfilled */}
      {data && (
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
      )}
      {/* Status: Rejected */}
      {error && <Alert message={error} />}
    </>
  );
}

Component.displayName = "EmojiCipherPage";
