import { Alert as AlertBox, Box } from "@mui/material";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
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
      <AlertBox severity="error">{message}</AlertBox>
    </Box>
  );
};

export default Alert;
