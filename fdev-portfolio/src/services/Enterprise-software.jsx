import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";


const EnterpriseSoftwareServices = () => {
  const services = [
    "Custom enterprise software development",
    "Enterprise web & portal development",
    "System integration services",
    "Enterprise mobility solutions",
    "Data management & analytics",
    "Enterprise security & compliance",
    "Enterprise cloud solutions",
    "Maintenance & support services"
  ];

  return (
    <>
    <Navbar/>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Enterprise Software Development Services
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

export default EnterpriseSoftwareServices;
