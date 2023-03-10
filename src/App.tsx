import { Box, ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import Footer from "./common/components/Footer/Footer";
import Loading from "./common/components/Loading/Loading";
import MainMenu from "./common/components/MainMenu/MainMenu";
import useColorTheme, { ColorModeContext } from "./common/hooks/useColorTheme";
import EmojiCipher from "./screens/emoji-cipher/EmojiCipher";

const About = lazy(() => import("./screens/about/About"));
const CaesarCipher = lazy(() => import("./screens/caesar-cipher/CaesarCipher"));
const VigenereCipher = lazy(
  () => import("./screens/vigenere-cipher/VigenereCipher")
);

const App = () => {
  const { colorMode, theme } = useColorTheme();

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
          <Footer copyrightLabel="Bogdan Bogdanovic" />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
