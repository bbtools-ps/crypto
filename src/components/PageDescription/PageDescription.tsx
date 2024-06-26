import { Box, Typography } from "@mui/material";

interface IProps {
  title: string;
  description: string;
  icon: string;
}

export default function PageDescription({ title, description, icon }: IProps) {
  return (
    <Box marginBottom={3} alignSelf="center">
      <Typography variant="h4" textAlign="center">
        <strong>{title}</strong> Cipher {icon}
      </Typography>
      <Typography variant="body1" marginTop={2}>
        {description}
      </Typography>
    </Box>
  );
}
