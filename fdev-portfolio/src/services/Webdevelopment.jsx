import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider,Box } from "@mui/material";
import Navbar from "../components/Navbar"

const WebAppServices = () => {
  const services = [
    "Custom web application development with secure and scalable architecture",
    "Frontend development using React.js, MUI, Tailwind",
    "Backend development with Node.js, Express.js, PostgreSQL, APIs",
    "Database design and optimization",
    "Admin panels and dashboards with role-based access",
    "Third-party integrations (Payment gateways, AWS S3, social login)",
    "Security & performance optimization",
    "Testing & QA",
    "Deployment & hosting",
    "Maintenance & support"
  ];

  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
      <Typography variant="h4" gutterBottom>
        Web Application Development Services
      </Typography>
      <List dense>
        {services.map((point, i) => (
          <ListItem key={i}>
            <ListItemText primary={`• ${point}`} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 2, mb: 2 }} />
    </Box>
    </>
  );
};

export default WebAppServices;
