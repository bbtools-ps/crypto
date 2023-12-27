import { Box, Link, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

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
        <Typography variant="h1">Error</Typography>
        {isRouteErrorResponse(error) && (
          <Typography>{`${error.status} - ${error.statusText}`}</Typography>
        )}
        <Link href="/" fontSize="1.2rem">
          Go back home
        </Link>
      </Box>
    </Box>
  );
}
