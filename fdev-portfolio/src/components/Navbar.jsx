import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
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

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(135deg, #092311, #000)" }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: '60px', marginTop:'1%'}} />
          <Typography variant="h6" sx={{ textShadow: '2px 2px 4px #FFD700' }}>
            FDEV Solution Pvt Ltd
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/projects">Projects</Button>
          <Button color="inherit" component={Link} to="/Blog">Blog</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>Projects</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/Blog" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
