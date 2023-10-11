import { StyledEngineProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StyledEngineProvider injectFirst>
    <HashRouter>
      <App />
    </HashRouter>
  </StyledEngineProvider>
);
