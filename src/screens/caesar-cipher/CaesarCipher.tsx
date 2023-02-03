import { Box, TextField, useMediaQuery } from "@mui/material";
import InputOutput from "../../common/components/InputOutput";
import Layout from "../../common/components/Layout";
import PageDescription from "../../common/components/PageDescription";
import { Pages } from "../../common/constants/constants";
import { caesarEncryptDecrypt } from "../../common/functions/utils";
import useInput from "../../common/hooks/useInput";
import useNumericInput from "../../common/hooks/useNumericInput";

const CaesarCipher = () => {
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
    encryptDecrypt: (value) => caesarEncryptDecrypt(shiftValue, value),
  });
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Layout>
      <PageDescription
        title={Pages.Ciphers[0].name}
        description="In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques."
        icon={Pages.Ciphers[0].icon}
      />
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          value={shiftValue}
          type={"text"}
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
    </Layout>
  );
};

export default CaesarCipher;
