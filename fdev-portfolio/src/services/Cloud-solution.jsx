import React from "react";
import {Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const CloudSolutionsServices = () => {
const services = [
  "We provide cloud consulting and strategy services to help organizations choose the right cloud model, architecture, and roadmap based on their business goals, performance needs, and budget considerations.",

  "Our cloud application development services focus on building scalable, resilient, and cloud-native applications using modern architectures that maximize flexibility and performance.",

  "We deliver secure and seamless cloud migration services, including assessment, planning, data migration, and application re-architecture, ensuring minimal downtime and business continuity.",

  "We manage cloud infrastructure end-to-end, including provisioning, configuration, monitoring, scaling, and optimization to ensure high availability and cost efficiency.",

  "Our DevOps and CI/CD services automate build, test, and deployment pipelines, enabling faster releases, improved collaboration, and consistent delivery across environments.",

  "We implement robust cloud security solutions, including identity and access management, encryption, network security, compliance monitoring, and threat protection.",

  "We work across leading cloud platforms such as AWS, Microsoft Azure, and Google Cloud Platform to deliver flexible, vendor-agnostic solutions tailored to enterprise needs.",

  "We provide continuous cloud support and maintenance services, including performance monitoring, incident management, backups, and regular system updates.",

  "We design cloud architectures with high availability, fault tolerance, and disaster recovery strategies to ensure business-critical systems remain operational.",

  "We optimize cloud costs through resource monitoring, usage analysis, and cost-control strategies to maximize ROI and reduce unnecessary spending.",

  "We support hybrid and multi-cloud environments, enabling seamless integration between on-premise systems and multiple cloud providers.",

  "We modernize legacy applications by refactoring and re-platforming them into cloud-native solutions for improved scalability and performance.",

  "We provide cloud monitoring, logging, and analytics solutions that offer real-time visibility into system health and application performance.",

  "We offer ongoing cloud consulting and optimization services to continuously improve security, performance, and scalability as business needs evolve."
];


  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
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
    </Box>
    </>
  );
};

export default CloudSolutionsServices;
