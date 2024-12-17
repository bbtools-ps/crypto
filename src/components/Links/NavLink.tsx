import { clsx } from "clsx";
import React from "react";
import {
  NavLink as RouterNavLink,
  type NavLinkProps as RouterLinkProps,
} from "react-router";
import classes from "./NavLink.module.css";

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(function NavLink({ href, className, ...rest }, ref) {
  return (
    <RouterNavLink
      ref={ref}
      to={href}
      className={({ isActive }) => clsx(className, isActive && classes.active)}
      {...rest}
    />
  );
});

export default NavLink;
