import { clsx } from "clsx";
import React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";
import classes from "./Link.module.css";

const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(function Link({ href, className, children, ...rest }, ref) {
  return (
    <RouterLink
      ref={ref}
      className={clsx(classes.inherit, className)}
      to={href}
      {...rest}
    >
      {children}
    </RouterLink>
  );
});

export default Link;
