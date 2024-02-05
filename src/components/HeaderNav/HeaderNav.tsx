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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwither from "../ThemeSwitcher/ThemeSwitcher";

export default function HeaderNav() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  key={item.title}
                  onClick={() => {
                    navigate(item.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
              {Object.keys(PAGES)
                .filter((item) => item.toLowerCase() !== "ciphers")
                .map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      navigate("/about");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          {/* Logo */}
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "flex" },
            }}
          >
            <Button
              color="inherit"
              sx={{ display: "flex", gap: 1 }}
              onClick={() => navigate("/")}
              aria-label="Logo"
              data-cy="home-btn"
            >
              <VpnKeyIcon />
              <Typography variant="h6">
                <strong>Crypto</strong>
              </Typography>
            </Button>
          </Box>
          {/* Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              id="basic-button"
              aria-controls={!!anchorEl ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={!!anchorEl ? "true" : undefined}
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
                  key={item.title}
                  onClick={() => {
                    navigate(item.path);
                    handleCloseDropdownMenu();
                  }}
                  sx={{ display: "block" }}
                  data-cy={`${item.title.toLowerCase()}-btn`}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
            <Button
              onClick={() => navigate("/about")}
              color="inherit"
              data-cy="about-btn"
            >
              {Object.keys(PAGES)[1]}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwither />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
