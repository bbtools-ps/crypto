import MenuIcon from "@mui/icons-material/Menu";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pages } from "../constants/constants";
import ThemeSwither from "./ThemeSwitcher";

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
              aria-label="account of current user"
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
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Pages.Ciphers.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
              {Object.keys(Pages)
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
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleOpenDropdownMenu}
              color="inherit"
            >
              {Object.keys(Pages)[0]}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseDropdownMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {Pages.Ciphers.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    handleCloseDropdownMenu();
                  }}
                  sx={{ display: "block" }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
            <Button onClick={() => navigate("/about")} color="inherit">
              {Object.keys(Pages)[1]}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwither />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainMenu;
