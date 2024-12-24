import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { PAGES } from "~/constants";
import Link from "../Links/Link";
import NavLink from "../Links/NavLink";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import classes from "./HeaderNav.module.css";

export default function HeaderNav() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenDropdownMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters>
          {/* MOBILE VERSION */}
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="Main menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {PAGES.ciphers.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={handleCloseNavMenu}
                  sx={{ p: 0, minHeight: "unset" }}
                >
                  <NavLink href={item.path} className={classes.link}>
                    {({ isPending }) => (
                      <>
                        {isPending && (
                          <CircularProgress size="1rem" sx={{ mr: 1 }} />
                        )}
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
              <MenuItem
                key={PAGES.about.path}
                onClick={handleCloseNavMenu}
                sx={{ p: 0, minHeight: "unset" }}
              >
                <NavLink href={PAGES.about.path} className={classes.link}>
                  {PAGES.about.label}
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { md: "start", xs: "center" },
              flexGrow: 1,
            }}
          >
            <Button
              color="inherit"
              href="/"
              aria-label="Logo"
              data-cy="home-btn"
              LinkComponent={Link}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                className="mr-2 fill-current"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
              <strong className={classes["logo-text"]}>Crypto</strong>
            </Button>
          </Box>
          {/* DESKTOP VERSION */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              id="basic-button"
              aria-controls={anchorEl ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
              onClick={handleOpenDropdownMenu}
              color="inherit"
              data-cy="ciphers-dropdown-menu"
            >
              {Object.keys(PAGES)[0]}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleCloseDropdownMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {PAGES.ciphers.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={handleCloseDropdownMenu}
                  sx={{ display: "block", p: 0, minHeight: "unset" }}
                  data-cy={`${item.label.toLowerCase()}-btn`}
                >
                  <NavLink href={item.path} className={classes.link}>
                    {({ isPending }) => (
                      <>
                        {isPending && (
                          <CircularProgress size="1rem" sx={{ mr: 1 }} />
                        )}
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
            <Button
              LinkComponent={NavLink}
              href="/about"
              data-cy="about-btn"
              color="inherit"
            >
              {PAGES.about.label.toUpperCase()}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
