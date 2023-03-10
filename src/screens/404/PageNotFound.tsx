import { Box, Link, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h1">Page not found</Typography>
        <Link href="/" fontSize="1.2rem">
          Go back home
        </Link>
      </Box>
    </Box>
  );
};

export default PageNotFound;
