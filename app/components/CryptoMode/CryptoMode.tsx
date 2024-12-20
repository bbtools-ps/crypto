import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CRYPTO_MODES } from "~/constants";

type CryptoModeType = (typeof CRYPTO_MODES)[number]["value"];

interface IProps {
  value: CryptoModeType;
  onChange: (payload: CryptoModeType) => void;
}

export default function CryptoMode({ value, onChange }: IProps) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Mode</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value as CryptoModeType)}
        name="radio-buttons-group"
      >
        {CRYPTO_MODES.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
