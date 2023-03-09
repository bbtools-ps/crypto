import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CopyButton from "../CopyButton/CopyButton";

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
  const isDesktop = useMediaQuery("(min-width:600px)");

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
                <CopyButton
                  onClick={() => {
                    const outputText =
                      document.querySelector(".outputText")?.textContent;
                    if (!outputText) return;
                    navigator.clipboard.writeText(outputText);
                  }}
                />
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
};

export default InputOutput;
