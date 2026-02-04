import React from "react";
import {Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const UiUxDesignServices = () => {
const services = [
  "We conduct in-depth user research and analysis to understand target audiences, user behavior, and business goals. This process helps us design data-driven interfaces that solve real user problems and improve overall product effectiveness.",

  "We create detailed wireframes and interactive prototypes to visualize user flows, layout structures, and functionality before development begins. This ensures clarity, faster feedback, and reduced development risk.",

  "Our modern and responsive UI design focuses on clean layouts, consistent design systems, and visually engaging components that adapt seamlessly across devices and screen sizes.",

  "We continuously optimize user experience by improving usability, accessibility, navigation flow, and interaction design to increase engagement, satisfaction, and conversion rates.",

  "We design intuitive and scalable mobile and web interfaces that provide consistent experiences across platforms while following platform-specific design guidelines and best practices.",

  "We use industry-leading design tools such as Figma and Adobe XD to create high-fidelity designs and provide clean design handoffs with reusable components, styles, and developer-ready assets.",

  "We perform usability testing with real users to identify pain points, validate design decisions, and refine interfaces for better performance and user satisfaction.",

  "We build strong branding and visual identity systems including color palettes, typography, iconography, and design guidelines that ensure brand consistency across all digital touchpoints.",

  "We design design systems and UI component libraries to maintain consistency, scalability, and faster design-to-development workflows across large applications.",

  "We focus on accessibility-first design, ensuring compliance with usability standards and inclusive design principles for users of all abilities.",

  "We optimize designs for performance and clarity, reducing cognitive load and creating frictionless user journeys across complex workflows.",

  "We collaborate closely with development teams to ensure design feasibility, smooth implementation, and pixel-perfect execution during development.",

  "We support product redesigns and UI/UX revamps to modernize existing applications and improve usability, engagement, and visual appeal.",

  "We provide continuous design support, iteration, and improvement based on user feedback, analytics, and evolving business needs."
];


  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
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
    </Box>
    </>
  );
};

export default UiUxDesignServices;
