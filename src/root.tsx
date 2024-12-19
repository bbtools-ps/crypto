import { StyledEngineProvider } from "@mui/material/styles";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import ThemeProvider from "./components/ThemeProvider";
import "./index.css";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-container">
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <a href="/">Home</a>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <p>
          <pre>{error.stack}</pre>
        </p>
        <a href="/">Home</a>
      </div>
    );
  } else {
    return (
      <div className="error-container">
        <h1>Unknown Error</h1>
        <a href="/">Home</a>
      </div>
    );
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔑</text></svg>"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="'Crypto' is a collection of ciphers. 'Emoji cipher' is a personal invention for encrypting text. Rest of the ciphers were already invented so they are just implemented using modern JavaScript syntax."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>Crypto</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
