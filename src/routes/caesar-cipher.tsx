import InputOutput from "@/components/InputOutput/InputOutput";
import PageDescription from "@/components/PageDescription/PageDescription";
import { PAGES } from "@/constants";
import { useInput, useNumericInput } from "@/hooks";
import { caesarEncryptDecrypt } from "@/utils";
import { Box, TextField, useMediaQuery } from "@mui/material";

export default function CaesarCipher() {
  const {
    value: shiftValue,
    handleChange: shiftValueChangeHandler,
    handleBlur: shiftValueBlurHandler,
    handleReset: shiftValueResetHandler,
    handleKeyDown: shiftValueKeyDownHandler,
    handleWheel: shiftValueWheelHandler,
  } = useNumericInput({ value: 13, maxValue: 26, minValue: 0 });
  const {
    value: inputValue,
    translatedValue,
    handleChange: inputValueChangeHandler,
    handleSetTranslatedValue,
    handleReset: inputValueResetHandler,
  } = useInput({
    encryptDecrypt: (value) => caesarEncryptDecrypt(Number(shiftValue), value),
  });
  const isDesktop = useMediaQuery("(min-width:37.5em)");

  return (
    <>
      <PageDescription
        title={PAGES.ciphers[0].label}
        description={PAGES.ciphers[0].description}
        icon={PAGES.ciphers[0].icon}
      />
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          value={shiftValue}
          type="text"
          onChange={shiftValueChangeHandler}
          onBlur={(e) => {
            const value = shiftValueBlurHandler(e);
            handleSetTranslatedValue(caesarEncryptDecrypt(value, inputValue));
          }}
          inputProps={{
            onKeyDown: (e) => shiftValueKeyDownHandler(e),
            onWheel: (e) => shiftValueWheelHandler(e),
            inputMode: "numeric",
          }}
          fullWidth={!isDesktop}
          label="Shift value"
        />
      </Box>
      <InputOutput
        inputValue={inputValue}
        outputValue={translatedValue}
        onInputChange={inputValueChangeHandler}
        onReset={() => {
          inputValueResetHandler();
          shiftValueResetHandler();
        }}
      />
    </>
  );
}
