import { ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ICopyButtonProps {
  isCopied: boolean;
  onClick: () => void;
}

const CopyButton: React.FC<ICopyButtonProps> = ({ isCopied, onClick }) => {
  return (
    <Button onClick={onClick} disabled={isCopied}>
      {!isCopied && <ContentCopy sx={{ marginRight: 1 }} />}
      {!isCopied ? "Copy to clipboard" : "Copied!"}
    </Button>
  );
};

export default CopyButton;
