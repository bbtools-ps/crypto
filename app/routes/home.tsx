import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Link from "~/components/Links/Link";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Typography variant="h1" sx={{ mb: 4 }}>
        Welcome to <strong>Crypto</strong>
      </Typography>
      <Typography>
        A simple cryptography web app built with React, TypeScript, and
        Material-UI.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h2">Ciphers</Typography>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link
                  href="/caesar-cipher"
                  className="underline underline-offset-2"
                >
                  Caesar Cipher
                </Link>
              </li>
              <li>
                <Link
                  href="/emoji-cipher"
                  className="underline underline-offset-2"
                >
                  Emoji Cipher
                </Link>
              </li>
              <li>
                <Link
                  href="/vigenere-cipher"
                  className="underline underline-offset-2"
                >
                  Vigenère Cipher
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
