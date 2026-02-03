import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";

const UiUxDesignServices = () => {
  const services = [
    "User research and analysis",
    "Wireframes and prototypes",
    "Modern and responsive UI design",
    "User experience optimization",
    "Mobile & web design",
    "Design tools & handoff (Figma / XD)",
    "Usability testing",
    "Branding and visual identity"
  ];

  return (
    <>
    <Navbar/>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        UI / UX Design Services
      </Typography>
      <List dense>
        {services.map((point, i) => (
          <ListItem key={i}>
            <ListItemText primary={`• ${point}`} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 2, mb: 2 }} />
    </Container>
    </>
  );
};

export default UiUxDesignServices;
