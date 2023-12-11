import Alert from "@/common/components/Alert/Alert";
import InputOutput from "@/common/components/InputOutput/InputOutput";
import Loading from "@/common/components/Loading/Loading";
import PageDescription from "@/common/components/PageDescription/PageDescription";
import { Pages } from "@/common/constants/constants";
import { emojiEncryptDecrypt } from "@/common/functions/utils";
import useFetch from "@/common/hooks/useFetch";
import useInput from "@/common/hooks/useInput";

export function Component() {
  const { data, error, isLoading } = useFetch(
    "https://raw.githubusercontent.com/bbtools-ps/emoji-cipher/main/emoji-dict/dict.json"
  );
  const { value, translatedValue, handleChange, handleReset } = useInput({
    encryptDecrypt: (value) => emojiEncryptDecrypt(value, data),
  });

  return (
    <>
      {/* Status: Pending */}
      {isLoading && !data && <Loading />}
      {/* Status: Fulfilled */}
      {!isLoading && data && (
        <>
          <PageDescription
            title={Pages.Ciphers[2].title}
            description={Pages.Ciphers[2].description}
            icon={Pages.Ciphers[2].icon}
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
      {!isLoading && error && <Alert message={error} />}
    </>
  );
}

Component.displayName = "EmojiCipherPage";
