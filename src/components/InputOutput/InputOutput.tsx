import { useCopyText } from "@/hooks";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef } from "react";
import CopyButton from "../CopyButton/CopyButton";

interface IInputOutputProps {
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
}: IInputOutputProps) {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const ref = useRef<HTMLInputElement>(null);
  const { handleCopy, isCopied } = useCopyText({ elementRef: ref });

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
            <Grid direction="column" container>
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
                  __html: `<span
                aria-labelledby="outputValue"
                role="textbox"
                aria-readonly
              >${outputValue}</span>`,
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
              <Grid item alignSelf="center">
                <CopyButton onClick={handleCopy} isCopied={isCopied} />
              </Grid>
            </Grid>
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
