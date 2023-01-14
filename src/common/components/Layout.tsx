import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  title: string;
  description: string;
  icon: string;
  inputValue: string;
  outputValue: string;
  children?: React.ReactNode;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onReset: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  icon,
  inputValue,
  outputValue,
  children,
  onInputChange,
  onReset,
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
    <Grid
      direction="column"
      rowSpacing={3}
      container
      sx={{ marginTop: 5, p: 3 }}
    >
      <Grid item marginBottom={3} alignSelf="center">
        <Typography variant="h4" textAlign="center">
          <strong>{title}</strong> Cipher {icon}
        </Typography>
        <Typography variant="body1" marginTop={2}>
          {description}
        </Typography>
      </Grid>
      <Box sx={{ marginBottom: 2 }}>{children}</Box>
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
      <Box justifyContent={"center"} display={"flex"} marginTop={2}>
        <Button variant="outlined" onClick={onReset}>
          Reset
        </Button>
      </Box>
    </Grid>
  );
};

export default Layout;
