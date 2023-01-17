import { Grid } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Grid
      direction="column"
      rowSpacing={3}
      container
      sx={{ marginTop: 10, p: 3 }}
    >
      {children}
    </Grid>
  );
};

export default Layout;
