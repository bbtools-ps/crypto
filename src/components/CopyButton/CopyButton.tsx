import { ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/material";

interface IProps {
  isCopied: boolean;
  onClick: () => void;
}

export default function CopyButton({ isCopied, onClick }: IProps) {
  return (
    <Button onClick={onClick} disabled={isCopied}>
      {!isCopied && <ContentCopy sx={{ marginRight: 1 }} />}
      {!isCopied ? "Copy to clipboard" : "Copied!"}
    </Button>
  );
}
