import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../asscets/logo.png";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: "Home", path: "/" },
        { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Blog", path: "/Blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: 'blur(20px)',
        background: 'rgba(48, 93, 48, 0.95)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
        {/* Logo + Brand */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
          
            
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: { xs: 60,},
              // width: "auto",
              // marginRight: { xs: 0, md: 0 },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              // marginLeft: 0,
              fontSize: { xs: "1rem", md: "1.2rem" },
              // fontWeight: 700,
              // whiteSpace: "nowrap",
            }}
          >
            FDEV Solution Pvt Ltd
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.2 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              color="inherit"
              component={Link}
              to={item.path}
              sx={{
                fontWeight: 400,
                  color: "#f6f6f8",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleMenu}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {navItems.map((item) => (
              <MenuItem key={item.label} onClick={handleClose}>
                <Link
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  {item.label}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
