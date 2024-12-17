import { PAGES } from "@/constants";
import { Menu as MenuIcon, VpnKey as VpnKeyIcon } from "@mui/icons-material/";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
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
                <MenuItem key={item.path} onClick={handleCloseNavMenu}>
                  <NavLink href={item.path} className={classes.link}>
                    {item.label}
                  </NavLink>
                </MenuItem>
              ))}
              <MenuItem key={PAGES.about.path} onClick={handleCloseNavMenu}>
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
              LinkComponent={NavLink}
            >
              <VpnKeyIcon sx={{ mr: 1 }} />
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
                  sx={{ display: "block" }}
                  data-cy={`${item.label.toLowerCase()}-btn`}
                >
                  <NavLink href={item.path} className={classes.link}>
                    {item.label}
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
