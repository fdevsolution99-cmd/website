import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";

const ProductEngineeringServices = () => {
  const services = [
    "Product ideation & discovery",
    "Product design & prototyping",
    "Product development (frontend & backend)",
    "MVP development",
    "Product modernization",
    "Quality assurance & testing",
    "Product deployment & scaling",
    "Product maintenance & support"
  ];

  return (
    <>
    <Navbar/>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Product Engineering Services
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

export default ProductEngineeringServices;
