import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createContext,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Footer from "./common/components/Footer/Footer";
import Loading from "./common/components/Loading/Loading";
import MainMenu from "./common/components/MainMenu/MainMenu";
import useBrowserTheme from "./common/hooks/useBrowserTheme";
import EmojiCipher from "./screens/emoji-cipher/EmojiCipher";

const About = lazy(() => import("./screens/about/About"));
const CaesarCipher = lazy(() => import("./screens/caesar-cipher/CaesarCipher"));
const VigenereCipher = lazy(
  () => import("./screens/vigenere-cipher/VigenereCipher")
);

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            bgcolor: "background.default",
            color: "text.primary",
            flex: 1,
          }}
        >
          <MainMenu />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <EmojiCipher />
                </Suspense>
              }
            />
            <Route
              path="/caesar-cipher"
              element={
                <Suspense fallback={<Loading />}>
                  <CaesarCipher />
                </Suspense>
              }
            />
            <Route
              path="/vigenere-cipher"
              element={
                <Suspense fallback={<Loading />}>
                  <VigenereCipher />
                </Suspense>
              }
            />
            <Route
              path="/emoji-cipher"
              element={
                <Suspense fallback={<Loading />}>
                  <EmojiCipher />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loading />}>
                  <About />
                </Suspense>
              }
            />
          </Routes>
        </Box>
        <Footer copyrightLabel="Bogdan Bogdanovic" />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
