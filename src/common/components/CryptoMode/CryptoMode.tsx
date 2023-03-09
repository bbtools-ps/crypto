import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CryptoModes } from "../../constants/constants";

interface CryptoModeProps {
  value: string;
  onChange: (payload: string) => void;
}

const CryptoMode: React.FC<CryptoModeProps> = ({ value, onChange }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Mode</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        name="radio-buttons-group"
      >
        {CryptoModes.map((item) => (
          <FormControlLabel
            key={item.name}
            value={item.value}
            control={<Radio />}
            label={item.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CryptoMode;
