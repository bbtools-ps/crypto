import { CryptoModes } from "@/constants";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface ICryptoModeProps {
  value: (typeof CryptoModes)[number]["value"];
  onChange: (payload: (typeof CryptoModes)[number]["value"]) => void;
}

const CryptoMode: React.FC<ICryptoModeProps> = ({ value, onChange }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Mode</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={(e) =>
          onChange(
            e.currentTarget.value as (typeof CryptoModes)[number]["value"]
          )
        }
        name="radio-buttons-group"
      >
        {CryptoModes.map((item, index) => (
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
};

export default CryptoMode;
