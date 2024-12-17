import React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";

const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(function Link({ href, ...rest }, ref) {
  return <RouterLink ref={ref} to={href} {...rest} />;
});

export default Link;
