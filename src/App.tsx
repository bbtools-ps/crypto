import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./common/components/Logo";
import { emojiDecodeEncode } from "./common/functions/utils";
import useFetch from "./common/hooks/useFetch";

export default function App() {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const { data, error, isLoading } = useFetch(
    "https://raw.githubusercontent.com/bbtools-ps/emoji-cipher/main/dict/dict.json"
  );

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
    <div className="app">
      {isLoading && !data && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && data && (
        <Grid direction="column" rowSpacing={3} container>
          <Grid item>
            <Typography variant="h3">Morse code translate</Typography>
            <Logo size={50} />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              Letters are separated by a single space " " and words by 3 spaces
              " ".
            </Typography>
          </Grid>
          <Grid
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowGap={1}
            container
          >
            <TextField
              label="Input"
              multiline
              minRows={5}
              value={value}
              fullWidth
              onChange={(e) => {
                setValue(e.target.value.toUpperCase());
                setTranslatedValue(emojiDecodeEncode(e.target.value, data));
              }}
            />
            <p>{translatedValue}</p>
            <Button
              onClick={() => {
                setCopyToClipboard(true);
                navigator.clipboard.writeText(translatedValue);
              }}
            >
              {!copyToClipboard ? "Copy to clipboard" : "Copied!"}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
