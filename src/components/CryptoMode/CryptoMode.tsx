import { CRYPTO_MODES } from "@/constants";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface IProps {
  value: (typeof CRYPTO_MODES)[number]["value"];
  onChange: (payload: (typeof CRYPTO_MODES)[number]["value"]) => void;
}

export default function CryptoMode({ value, onChange }: IProps) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Mode</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={(e) =>
          onChange(
            e.currentTarget.value as (typeof CRYPTO_MODES)[number]["value"]
          )
        }
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
