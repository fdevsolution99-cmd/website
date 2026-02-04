import React from "react";
import {Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const ProductEngineeringServices = () => {
const services = [
  "We support product ideation and discovery by working closely with stakeholders to validate ideas, analyze market needs, define user personas, and create a clear product vision and roadmap.",

  "Our product design and prototyping services include UX research, wireframes, interactive prototypes, and design systems that help visualize product concepts and gather early user feedback.",

  "We handle complete product development across frontend and backend, building scalable, secure, and high-performance applications using modern technologies and best engineering practices.",

  "We specialize in MVP development, delivering core features quickly to validate ideas, test market fit, and enable faster time-to-market with a lean development approach.",

  "We modernize existing products by upgrading architectures, improving UI/UX, optimizing performance, and migrating legacy systems to modern, cloud-ready technologies.",

  "We provide comprehensive quality assurance and testing services, including manual testing, automated testing, performance testing, and security validation to ensure product stability and reliability.",

  "We manage product deployment and scaling, setting up production environments, CI/CD pipelines, monitoring systems, and infrastructure to support growing user bases.",

  "We offer ongoing product maintenance and support, including bug fixes, feature enhancements, performance optimization, and long-term technical support.",

  "We implement agile and iterative development methodologies to ensure continuous improvement, transparency, and faster delivery cycles throughout the product lifecycle.",

  "We integrate analytics, user tracking, and feedback systems to gain insights into user behavior and guide data-driven product decisions.",

  "We ensure product security and compliance by implementing authentication, authorization, data protection, and industry-standard security practices.",

  "We provide technical consulting and product strategy guidance to help businesses scale, optimize costs, and evolve their products effectively.",

  "We support product expansion through feature upgrades, integrations, and platform extensions to adapt to changing market demands.",

  "We focus on building future-ready products with modular architectures that support scalability, maintainability, and long-term growth."
];


  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
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
    </Box>
  </>
  );
};

export default ProductEngineeringServices;
