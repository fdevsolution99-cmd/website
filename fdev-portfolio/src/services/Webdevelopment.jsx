import React from "react";
import {Typography, List, ListItem, ListItemText, Divider,Box } from "@mui/material";
import Navbar from "../components/Navbar"

const WebAppServices = () => {
const services = [
  "We provide custom web application development with a strong focus on security, scalability, and performance. Our solutions are tailored to meet specific business requirements, ensuring long-term reliability and seamless user experiences across all devices.",

  "Our team specializes in modern frontend development using React.js along with Material UI (MUI) and Tailwind CSS. We design responsive, intuitive, and visually appealing interfaces that enhance usability and deliver a smooth user journey.",

  "On the backend, we build robust and scalable server-side solutions using Node.js and Express.js. We develop secure RESTful APIs and business logic that power high-performance applications and support future growth.",

  "We offer database design and optimization services using PostgreSQL and Sequelize ORM to create well-structured, efficient, and scalable data models, ensuring data integrity and fast query performance.",

  "We develop admin panels and dashboards with role-based access control, enabling secure management, real-time analytics, and effective monitoring of business operations.",

  "We integrate third-party services such as payment gateways, AWS S3 storage, email and SMS services, and social authentication to enhance functionality and streamline user interactions.",

  "Our cloud-based solutions leverage AWS for hosting, storage, CI/CD pipelines, and environment management, ensuring high availability, scalability, and reliability.",

  "We prioritize application security and performance optimization by implementing authentication, authorization, encryption, and best practices to protect applications from vulnerabilities.",

  "We perform comprehensive testing and quality assurance, including unit testing, integration testing, and bug fixing, to deliver stable and reliable software.",

  "We manage deployment and hosting with production-ready configurations and provide ongoing maintenance, feature enhancements, and technical support.",

  "We also offer Progressive Web App (PWA) development, API and microservices architecture, and legacy system modernization to help businesses stay competitive with modern technologies."
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
