import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/components/Layout/Footer/Footer";
import MainMenu from "../common/components/MainMenu/MainMenu";

const RootLayout = () => {
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
      <MainMenu />
      <Outlet />
      <Footer copyrightLabel="Bogdan Bogdanovic" />
    </Box>
  );
};

export default RootLayout;
