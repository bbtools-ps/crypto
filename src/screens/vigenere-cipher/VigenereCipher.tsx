import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CryptoMode from "../../common/components/CryptoMode";
import Layout from "../../common/components/Layout";
import { CryptoModes, Pages } from "../../common/constants/constants";
import { vigenereDecrypt, vigenereEncrypt } from "../../common/functions/utils";
import useInput from "../../common/hooks/useInput";

const VigenereCipher = () => {
  const [cryptoMode, setCryptoMode] = useState<string>(CryptoModes[0].value);
  const [secretKey, setSecretKey] = useState<string>("");
  const {
    value,
    translatedValue,
    handleChange,
    handleSetTranslatedValue,
    handleReset,
  } = useInput({
    encryptDecrypt: (value) =>
      cryptoMode === "encrypt"
        ? vigenereEncrypt({ key: secretKey, str: value })
        : vigenereDecrypt({ key: secretKey, str: value }),
  });
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Layout
      title={Pages.Ciphers[1].name}
      description="The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword."
      icon={Pages.Ciphers[1].icon}
      inputValue={value}
      outputValue={translatedValue}
      onInputChange={handleChange}
      onReset={() => {
        setSecretKey("");
        setCryptoMode(CryptoModes[0].value);
        handleReset();
      }}
    >
      <CryptoMode value={cryptoMode} onChange={setCryptoMode} />
      <TextField
        label="Secret key"
        variant="outlined"
        sx={{ display: "block", marginTop: 1 }}
        fullWidth={!isDesktop}
        value={secretKey}
        onChange={(e) => {
          handleSetTranslatedValue(
            cryptoMode === "encrypt"
              ? vigenereEncrypt({ key: e.currentTarget.value, str: value })
              : vigenereDecrypt({ key: e.currentTarget.value, str: value })
          );
          setSecretKey(e.currentTarget.value);
        }}
      />
    </Layout>
  );
};

export default VigenereCipher;
