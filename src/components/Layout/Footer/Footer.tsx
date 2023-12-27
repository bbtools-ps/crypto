import { getCurrentYear } from "@/utils";
import { Link, Typography } from "@mui/material";

interface IFooterProps {
  copyrightLabel: string;
}

export default function Footer({ copyrightLabel }: IFooterProps) {
  return (
    <Typography>
      © {getCurrentYear()}.
      <Link href="https://bogdan-bogdanovic.com/" sx={{ ml: 1 }}>
        {copyrightLabel}
      </Link>
    </Typography>
  );
}
