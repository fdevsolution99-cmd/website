import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../asscets/logo.png";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Services', path: '/services' },
    { text: 'Projects', path: '/projects' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(135deg, #092311, #000)" }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: '60px', marginTop:'1%'}} />
          <Typography variant="h6" sx={{ textShadow: '2px 2px 4px #FFD700' }}>
            FDEV Solution Pvt Ltd
          </Typography>
        </Box>

        {/* {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/services">Services</Button>
            <Button color="inherit" component={Link} to="/projects">Projects</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
          </>
        )} */}

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <List sx={{ width: 250 }}>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
