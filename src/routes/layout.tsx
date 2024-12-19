import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/HeaderNav/HeaderNav";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import classes from "./layout.module.css";

export default function Layout() {
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
        height: "100%",
        overflow: "auto",
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
