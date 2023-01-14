import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  title: string;
  description: string;
  inputValue: string;
  outputValue: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  inputValue,
  outputValue,
  onInputChange,
}) => {
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const outputRef = useRef<HTMLElement>();
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
    <Grid direction="column" rowSpacing={3} container sx={{ height: "100%" }}>
      <Grid item marginBottom={3} alignSelf="center">
        <Typography variant="h4">
          <strong>{title}</strong> Cipher 🐸
        </Typography>
        <Typography variant="body1" marginTop={2}>
          {description}
        </Typography>
      </Grid>
      <Grid
        direction={isDesktop ? "row" : "column"}
        justifyContent="center"
        alignItems="center"
        rowGap={1}
        columnGap={1}
        container
      >
        <TextField
          label="Input"
          multiline
          minRows={5}
          value={inputValue}
          fullWidth={!isDesktop}
          onChange={(e) => onInputChange(e)}
          sx={isDesktop ? { flex: 1 } : undefined}
        />
        <Box sx={{ flex: 1, width: !isDesktop ? "100%" : undefined }}>
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
                dangerouslySetInnerHTML={{ __html: outputValue }}
                style={{
                  minHeight: "3rem",
                  backgroundColor: grey[100],
                  padding: ".5rem",
                }}
                marginBottom={3}
                ref={outputRef}
              />
              <Grid item alignSelf="center">
                <Button
                  onClick={() => {
                    setCopyToClipboard(true);
                    navigator.clipboard.writeText(outputRef.current.innerText);
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
    </Grid>
  );
};

export default Layout;
