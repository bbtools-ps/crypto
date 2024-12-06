import { ThemeProvider } from "@mui/material";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Fallback from "./components/Fallback";
import { ColorModeContext, useColorTheme } from "./hooks";
import RootLayout from "./screens/RootLayout";
import ErrorPage from "./screens/error-page";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      hydrateFallbackElement: <Fallback />,
      errorElement: <ErrorPage />,
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);

export default function App() {
  const { colorMode, theme } = useColorTheme();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
