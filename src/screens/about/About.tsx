import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const About = () => {
  return (
    <Box marginTop={8} padding={3}>
      <Typography variant="h4" textAlign="center">
        <strong>About</strong>
      </Typography>
      <Typography variant="body1" marginTop={2}>
        "Crypto" is a collection of ciphers. "Emoji cipher" is a personal
        invention and I'm so proud of it :) <br /> Rest of the ciphers were
        already invented so they are just implemented using modern JavaScript
        syntax.
      </Typography>
    </Box>
  );
};

export default About;
