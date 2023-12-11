import { getCurrentYear } from "@/common/functions/utils";
import { Link, Typography } from "@mui/material";

interface IFooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<IFooterProps> = ({ copyrightLabel }) => {
  return (
    <Typography>
      © {getCurrentYear()}.
      <Link href="https://bogdan-bogdanovic.com/" sx={{ ml: 1 }}>
        {copyrightLabel}
      </Link>
    </Typography>
  );
};

export default Footer;
