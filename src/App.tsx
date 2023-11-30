import { ThemeProvider } from "@mui/material";
import { RouterProvider, createHashRouter } from "react-router-dom";
import useColorTheme, { ColorModeContext } from "./common/hooks/useColorTheme";
import RootLayout from "./screens/RootLayout";
import PageNotFound from "./screens/error-page";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        lazy: () => import("./screens/emoji-cipher/EmojiCipher"),
      },
      {
        path: "caesar-cipher",
        lazy: () => import("./screens/caesar-cipher/CaesarCipher"),
      },
      {
        path: "emoji-cipher",
        lazy: () => import("./screens/emoji-cipher/EmojiCipher"),
      },
      {
        path: "vigenere-cipher",
        lazy: () => import("./screens/vigenere-cipher/VigenereCipher"),
      },
      {
        path: "about",
        lazy: () => import("./screens/about/About"),
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
