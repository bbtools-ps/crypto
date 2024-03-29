import HeaderNav from "@/components/HeaderNav/HeaderNav";
import Footer from "@/components/Layout/Footer/Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import classes from "./RootLayot.module.css";

export default function RootLayout() {
  return (
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
      <HeaderNav />
      <main className={classes["main-content"]}>
        <Outlet />
      </main>
      <footer className={classes.footer}>
        <Footer copyrightLabel="Bogdan Bogdanovic" />
      </footer>
    </Box>
  );
}
