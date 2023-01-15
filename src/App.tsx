import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import MainMenu from "./common/components/MainMenu";
import useBrowserTheme from "./common/hooks/useBrowserTheme";
import About from "./screens/about/About";
import CaesarCipher from "./screens/caesar-cipher/CaesarCipher";
import EmojiCipher from "./screens/emoji-cipher/EmojiCipher";
import VigenereCipher from "./screens/vigenere-cipher/VigenereCipher";

type ColorMode = "light" | "dark";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState<ColorMode>(
    (localStorage.getItem("theme") as ColorMode) || "light"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("theme", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
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
  const isDarkTheme = useBrowserTheme();

  // Set the default color theme based on browser's color theme
  useEffect(() => {
    // If the user has already picked the color theme return
    if (localStorage.getItem("theme")) return;

    if (isDarkTheme) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [isDarkTheme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: "100%",
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
