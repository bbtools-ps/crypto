import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { CryptoModes } from "../constants/constants";

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
