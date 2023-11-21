import { ThemeProvider } from "@mui/material";
import { Suspense, lazy } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Loading from "./common/components/Loading/Loading";
import useColorTheme, { ColorModeContext } from "./common/hooks/useColorTheme";
import PageNotFound from "./screens/404/PageNotFound";
import RootLayout from "./screens/RootLayout";
import EmojiCipher from "./screens/emoji-cipher/EmojiCipher";

const About = lazy(() => import("./screens/about/About"));
const CaesarCipher = lazy(() => import("./screens/caesar-cipher/CaesarCipher"));
const VigenereCipher = lazy(
  () => import("./screens/vigenere-cipher/VigenereCipher")
);

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <EmojiCipher />
          </Suspense>
        ),
      },
      {
        path: "caesar-cipher",
        element: (
          <Suspense fallback={<Loading />}>
            <CaesarCipher />
          </Suspense>
        ),
      },
      {
        path: "emoji-cipher",
        element: (
          <Suspense fallback={<Loading />}>
            <EmojiCipher />
          </Suspense>
        ),
      },
      {
        path: "vigenere-cipher",
        element: (
          <Suspense fallback={<Loading />}>
            <VigenereCipher />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  const { colorMode, theme } = useColorTheme();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
