import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";

const InternshipTrainingServices = () => {
  const services = [
    "Software development internship with real-time projects",
    "Full-stack development training",
    "Frontend development training",
    "Backend development training",
    "UI/UX design training",
    "Cloud & DevOps training",
    "Live projects & certification",
    "Placement & career support"
  ];

  return (
    <>
    <Navbar/>
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Internship & Training Programs
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

export default InternshipTrainingServices;
