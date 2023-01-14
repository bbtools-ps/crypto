import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import MainMenu from "./common/components/MainMenu";
import About from "./screens/about/About";
import CaesarCipher from "./screens/caesar-cipher/CaesarCipher";
import EmojiCipher from "./screens/emoji-cipher/EmojiCipher";
import VigenereCipher from "./screens/vigenere-cipher/VigenereCipher";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <MainMenu />
          <Routes>
            <Route path="/" element={<EmojiCipher />} />
            <Route path="/caesar-cipher" element={<CaesarCipher />} />
            <Route path="/vigenere-cipher" element={<VigenereCipher />} />
            <Route path="/emoji-cipher" element={<EmojiCipher />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
