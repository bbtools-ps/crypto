import { Alert as AlertBox, Box } from "@mui/material";

interface IAlertProps {
  message: string;
}

export default function Alert({ message }: IAlertProps) {
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
}
