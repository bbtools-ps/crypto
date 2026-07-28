import { clsx } from "clsx";
import React from "react";
import {
  NavLink as RouterNavLink,
  type NavLinkProps as RouterLinkProps,
} from "react-router";

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(function NavLink({ href, className, children, ...rest }, ref) {
  return (
    <RouterNavLink
      ref={ref}
      to={href}
      className={({ isActive }) =>
        clsx(className, isActive && "font-bold! text-blue-500!")
      }
      {...rest}
    >
      {children}
    </RouterNavLink>
  );
});

export default NavLink;
