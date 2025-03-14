import { Link, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

interface IProps {
  copyrightLabel: string;
}

export default function Footer({ copyrightLabel }: IProps) {
  const [year] = useState(dayjs().year());

  return (
    <Typography>
      &copy; {year}.
      <Link href="https://bogdan-bogdanovic.com/" sx={{ ml: 1 }}>
        {copyrightLabel}
      </Link>
    </Typography>
  );
}
