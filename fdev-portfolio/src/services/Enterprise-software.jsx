import React from "react";
import {Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import Navbar from "../components/Navbar";


const EnterpriseSoftwareServices = () => {
const services = [
  "We provide custom enterprise software development tailored to complex business processes, large user bases, and high-performance requirements. Our solutions are scalable, secure, and designed to support long-term organizational growth.",

  "We develop enterprise web applications and portals that enable seamless collaboration, data management, and workflow automation across departments, partners, and customers.",

  "Our system integration services connect multiple enterprise systems, legacy applications, third-party platforms, and APIs to ensure smooth data flow and unified business operations.",

  "We deliver enterprise mobility solutions that empower organizations with secure mobile access to critical systems, enabling productivity and real-time decision-making across devices.",

  "We offer enterprise-grade data management and analytics solutions, including data modeling, reporting dashboards, and business intelligence tools to support data-driven strategies.",

  "We implement enterprise security and compliance frameworks, including authentication, authorization, encryption, audit logging, and adherence to industry standards and regulatory requirements.",

  "Our enterprise cloud solutions leverage platforms such as AWS to design scalable infrastructure, cloud-native applications, hybrid environments, and optimized deployment strategies.",

  "We provide continuous maintenance and support services, including performance monitoring, system upgrades, bug fixes, and proactive issue resolution to ensure operational stability.",

  "We design modular and microservices-based architectures that allow enterprises to scale individual components independently while maintaining system reliability.",

  "We support digital transformation initiatives by modernizing legacy systems and migrating enterprise applications to modern, cloud-based architectures.",

  "We develop enterprise dashboards and reporting systems that provide real-time insights, KPIs, and operational visibility for leadership and stakeholders.",

  "We ensure high availability and disaster recovery planning through backup strategies, redundancy, and failover mechanisms to minimize downtime.",

  "We integrate enterprise identity and access management solutions, including role-based access and single sign-on (SSO), for secure and efficient user management.",

  "We provide enterprise consulting, solution architecture planning, and technical guidance from project inception through deployment and long-term optimization."
];


  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
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
    </Box>
    </>
  );
};

export default EnterpriseSoftwareServices;
