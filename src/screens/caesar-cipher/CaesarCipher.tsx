import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "../../common/components/Layout";
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
  } = useNumericInput({ defaultValue: 13, maxValue: 26 });
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
    <Layout
      title={Pages.Ciphers[0].name}
      description="In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques."
      icon={Pages.Ciphers[0].icon}
      inputValue={inputValue}
      outputValue={translatedValue}
      onInputChange={inputValueChangeHandler}
      onReset={() => {
        inputValueResetHandler();
        shiftValueResetHandler(13);
      }}
    >
      <TextField
        value={shiftValue}
        type={"text"}
        onChange={(e) => {
          shiftValueChangeHandler(e);
          handleSetTranslatedValue(
            caesarEncryptDecrypt(shiftValue, inputValue)
          );
        }}
        onBlur={(e) => {
          shiftValueBlurHandler(e);
          handleSetTranslatedValue(
            caesarEncryptDecrypt(shiftValue, inputValue)
          );
        }}
        fullWidth={!isDesktop}
        inputMode="numeric"
        label="Shift value"
      />
    </Layout>
  );
};

export default CaesarCipher;
