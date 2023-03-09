import { Typography } from "@mui/material";
import Layout from "../../common/components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <Typography variant="h4" textAlign="center">
        <strong>About</strong>
      </Typography>
      <Typography variant="body1" marginTop={2} alignSelf="center">
        "Crypto" is a collection of ciphers. "Emoji cipher" is a personal
        invention and I'm so proud of it :) <br /> Rest of the ciphers were
        already invented so they are just implemented using modern JavaScript
        syntax.
      </Typography>
    </Layout>
  );
};

export default About;
