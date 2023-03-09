import { Box, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CryptoMode from "../../common/components/CryptoMode/CryptoMode";
import InputOutput from "../../common/components/InputOutput/InputOutput";
import Layout from "../../common/components/Layout/Layout";
import PageDescription from "../../common/components/PageDescription/PageDescription";
import { CryptoModes, Pages } from "../../common/constants/constants";
import { vigenereDecrypt, vigenereEncrypt } from "../../common/functions/utils";
import useInput from "../../common/hooks/useInput";

const VigenereCipher = () => {
  const [cryptoMode, setCryptoMode] = useState<string>(CryptoModes[0].value);
  const [secretKey, setSecretKey] = useState<string>("");
  const {
    value: inputValue,
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
    <Layout>
      <PageDescription
        title={Pages.Ciphers[1].name}
        description="The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword."
        icon={Pages.Ciphers[1].icon}
      />
      <Box sx={{ marginBottom: 2 }}>
        <CryptoMode
          value={cryptoMode}
          onChange={(value) => {
            handleSetTranslatedValue(
              value === "encrypt"
                ? vigenereEncrypt({ key: secretKey, str: inputValue })
                : vigenereDecrypt({ key: secretKey, str: inputValue })
            );
            setCryptoMode(value);
          }}
        />
        <TextField
          label="Secret key"
          variant="outlined"
          sx={{ display: "block", marginTop: 1 }}
          fullWidth={!isDesktop}
          value={secretKey}
          onChange={(e) => {
            handleSetTranslatedValue(
              cryptoMode === "encrypt"
                ? vigenereEncrypt({
                    key: e.currentTarget.value,
                    str: inputValue,
                  })
                : vigenereDecrypt({
                    key: e.currentTarget.value,
                    str: inputValue,
                  })
            );
            setSecretKey(e.currentTarget.value);
          }}
        />
      </Box>
      <InputOutput
        inputValue={inputValue}
        outputValue={translatedValue}
        onInputChange={handleChange}
        onReset={() => {
          setSecretKey("");
          setCryptoMode(CryptoModes[0].value);
          handleReset();
        }}
      />
    </Layout>
  );
};

export default VigenereCipher;
