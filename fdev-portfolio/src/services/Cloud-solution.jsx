import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";

const CloudSolutionsServices = () => {
  const services = [
    "Cloud consulting and strategy",
    "Cloud application development",
    "Cloud migration services",
    "Cloud infrastructure management",
    "DevOps & CI/CD",
    "Cloud security solutions",
    "Cloud platforms: AWS, Azure, Google Cloud",
    "Cloud support & maintenance"
  ];

  return (
    <>
    <Navbar/>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cloud Solutions Services
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

export default CloudSolutionsServices;
