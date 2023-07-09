import { Box, Typography } from "@mui/material";

interface IPageDescriptionProps {
  title: string;
  description: string;
  icon: string;
}

const PageDescription: React.FC<IPageDescriptionProps> = ({
  title,
  description,
  icon,
}) => {
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
};

export default PageDescription;
