import React from "react";
import {
  NavLink as RouterNavLink,
  type NavLinkProps as RouterLinkProps,
} from "react-router";

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(function NavLink({ href, ...rest }, ref) {
  return <RouterNavLink ref={ref} to={href} {...rest} />;
});

export default NavLink;
