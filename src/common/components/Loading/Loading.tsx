import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
