import { Alert, Box, CircularProgress } from "@mui/material";
import InputOutput from "../../common/components/InputOutput";
import Layout from "../../common/components/Layout";
import PageDescription from "../../common/components/PageDescription";
import { Pages } from "../../common/constants/constants";
import { emojiEncryptDecrypt } from "../../common/functions/utils";
import useFetch from "../../common/hooks/useFetch";
import useInput from "../../common/hooks/useInput";

const EmojiCipher = () => {
  const { data, error, isLoading } = useFetch(
    "https://raw.githubusercontent.com/bbtools-ps/emoji-cipher/main/emoji-dict/dict.json"
  );
  const { value, translatedValue, handleChange, handleReset } = useInput({
    encryptDecrypt: (value) => emojiEncryptDecrypt(value, data),
  });

  return (
    <>
      {isLoading && !data && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && data && (
        <Layout>
          <PageDescription
            title={Pages.Ciphers[2].name}
            description="Encrypt/decrypt text using emojis."
            icon={Pages.Ciphers[2].icon}
          />
          <InputOutput
            inputValue={value}
            outputValue={translatedValue}
            onInputChange={handleChange}
            onReset={handleReset}
          />
        </Layout>
      )}
      {!isLoading && error && (
        <Alert severity="error">Error! Can't fetch data.</Alert>
      )}
    </>
  );
};

export default EmojiCipher;
