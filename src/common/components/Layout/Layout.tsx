import { Box } from "@mui/material";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        marginTop: 10,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        flex: 1,
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
