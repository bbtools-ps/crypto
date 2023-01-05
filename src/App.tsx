import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { emojiDecryptEncrypt } from "./common/functions/utils";
import useFetch from "./common/hooks/useFetch";

export default function App() {
  const [value, setValue] = useState<string>("");
  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const outputRef = useRef<HTMLElement>();
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && data && (
        <Grid
          direction="column"
          rowSpacing={3}
          container
          sx={{ height: "100%" }}
        >
          <Grid item marginBottom={3} alignSelf="center">
            <Typography variant="h4">
              <strong>Emoji</strong> Cipher 🐸
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
                setValue(e.target.value);
                setTranslatedValue(emojiDecryptEncrypt(e.target.value, data));
              }}
            />
            <Box sx={{ minWidth: 275, width: "100%" }}>
              <Card variant="outlined" style={{ padding: "1rem" }}>
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
                    dangerouslySetInnerHTML={{ __html: translatedValue }}
                    style={{
                      minHeight: "3rem",
                      backgroundColor: grey[100],
                      padding: ".5rem",
                    }}
                    marginBottom={3}
                    ref={outputRef}
                  />
                  <Grid item alignSelf={"center"} justifyContent="center">
                    <Button
                      onClick={() => {
                        setCopyToClipboard(true);
                        navigator.clipboard.writeText(
                          outputRef.current.innerText
                        );
                      }}
                    >
                      {!copyToClipboard && <ContentCopyIcon />}
                      {!copyToClipboard ? "Copy to clipboard" : "Copied!"}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
