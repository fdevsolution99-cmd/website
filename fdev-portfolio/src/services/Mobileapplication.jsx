import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";

const MobileAppServices = () => {
  const services = [
    "Native and cross-platform mobile apps for Android & iOS",
    "Mobile-first UI/UX design",
    "API and backend integration",
    "Performance optimization & secure data handling",
    "App deployment on Play Store & App Store",
    "Ongoing maintenance & support"
  ];

  return (
    <>
    <Navbar/>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Mobile Application Development Services
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

export default MobileAppServices;
