import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import Layout from "../../common/components/Layout";
import { emojiEncryptDecrypt } from "../../common/functions/utils";
import useFetch from "../../common/hooks/useFetch";

const EmojiCipher = () => {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    setTranslatedValue(emojiEncryptDecrypt(e.target.value, data));
  };

  const { data, error, isLoading } = useFetch(
    "https://raw.githubusercontent.com/bbtools-ps/emoji-cipher/main/emoji-dict/dict.json"
  );

  return (
    <div className="app">
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
        <Layout
          title="Emoji"
          description="Encrypt/decrypt text using emojis."
          inputValue={value}
          onInputChange={handleInputChange}
          outputValue={translatedValue}
        />
      )}
      {!isLoading && error && (
        <Alert severity="error">Error! Can't fetch data.</Alert>
      )}
    </div>
  );
};

export default EmojiCipher;
