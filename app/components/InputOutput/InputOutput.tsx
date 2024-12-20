import {
  Box,
  Button,
  Card,
  Grid2 as Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DOMPurify from "dompurify";
import { useRef } from "react";
import CopyButton from "../CopyButton/CopyButton";

interface IProps {
  inputValue: string;
  outputValue: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onReset: () => void;
}

export default function InputOutput({
  inputValue,
  outputValue,
  onInputChange,
  onReset,
}: IProps) {
  const isDesktop = useMediaQuery("(min-width:37.5em)");
  const ref = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    const value = ref.current?.textContent || "";
    await navigator.clipboard.writeText(value);
  };

  return (
    <>
      <Grid
        direction={isDesktop ? "row" : "column"}
        justifyContent="center"
        alignItems="stretch"
        rowGap={1}
        columnGap={1}
        container
      >
        <TextField
          label="Input"
          multiline
          minRows={6}
          value={inputValue}
          fullWidth={!isDesktop}
          onChange={(e) => onInputChange(e)}
          sx={isDesktop ? { flex: 1 } : undefined}
        />
        <Box sx={{ flex: 1, width: !isDesktop ? "100%" : undefined }}>
          <Card variant="outlined" sx={{ padding: "1rem", height: "100%" }}>
            <Box>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                id="outputValue"
              >
                Output
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(`<span
                aria-labelledby="outputValue"
                role="textbox"
                aria-readonly
              >${outputValue}</span>`),
                }}
                sx={{
                  minHeight: "3rem",
                  padding: ".5rem",
                  bgcolor: "action.hover",
                }}
                marginBottom={3}
                className="outputText"
                ref={ref}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CopyButton onClick={handleCopy} />
              </Box>
            </Box>
          </Card>
        </Box>
      </Grid>
      <Box justifyContent="center" display="flex">
        <Button variant="outlined" onClick={onReset}>
          Reset
        </Button>
      </Box>
    </>
  );
}
