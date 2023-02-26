import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

interface InputOutputProps {
  inputValue: string;
  outputValue: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onReset: () => void;
}

const InputOutput: React.FC<InputOutputProps> = ({
  inputValue,
  outputValue,
  onInputChange,
  onReset,
}) => {
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copyToClipboard) {
        setCopyToClipboard(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [copyToClipboard]);

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
              >
                Output
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: outputValue }}
                sx={{
                  minHeight: "3rem",
                  padding: ".5rem",
                  bgcolor: "action.hover",
                }}
                marginBottom={3}
                className="outputText"
              />
              <Grid item alignSelf="center">
                <Button
                  onClick={() => {
                    const outputText =
                      document.querySelector(".outputText")?.textContent;
                    if (!outputText) return;
                    setCopyToClipboard(true);
                    navigator.clipboard.writeText(outputText);
                  }}
                >
                  {!copyToClipboard && (
                    <ContentCopyIcon sx={{ marginRight: 1 }} />
                  )}
                  {!copyToClipboard ? "Copy to clipboard" : "Copied!"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
      <Box justifyContent={"center"} display={"flex"} marginTop={2}>
        <Button variant="outlined" onClick={onReset}>
          Reset
        </Button>
      </Box>
    </>
  );
};

export default InputOutput;
