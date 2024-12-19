import CryptoMode from "@/components/CryptoMode/CryptoMode";
import InputOutput from "@/components/InputOutput/InputOutput";
import PageDescription from "@/components/PageDescription/PageDescription";
import { CRYPTO_MODES, PAGES } from "@/constants";
import { useInput } from "@/hooks";
import { vigenereDecrypt, vigenereEncrypt } from "@/utils";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";

export default function VigenereCipher() {
  const [cryptoMode, setCryptoMode] = useState<"encrypt" | "decrypt">(
    CRYPTO_MODES[0].value
  );
  const [secretKey, setSecretKey] = useState("");
  const {
    value: inputValue,
    translatedValue,
    handleChange,
    handleSetTranslatedValue,
    handleReset,
  } = useInput({
    encryptDecrypt: (value) =>
      cryptoMode === "encrypt"
        ? vigenereEncrypt(secretKey, value)
        : vigenereDecrypt(secretKey, value),
  });
  const isDesktop = useMediaQuery("(min-width:37.5em)");

  return (
    <>
      <PageDescription
        title={PAGES.ciphers[1].label}
        description={PAGES.ciphers[1].description}
        icon={PAGES.ciphers[1].icon}
      />
      <Box sx={{ marginBottom: 2 }}>
        <CryptoMode
          value={cryptoMode}
          onChange={(value) => {
            handleSetTranslatedValue(
              value === "encrypt"
                ? vigenereEncrypt(secretKey, inputValue)
                : vigenereDecrypt(secretKey, inputValue)
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
                ? vigenereEncrypt(e.currentTarget.value, inputValue)
                : vigenereDecrypt(e.currentTarget.value, inputValue)
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
          setCryptoMode(CRYPTO_MODES[0].value);
          handleReset();
        }}
      />
    </>
  );
}
