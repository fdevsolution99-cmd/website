import React from "react";
import {Typography, List, ListItem, ListItemText, Divider, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const MobileAppServices = () => {
const services = [
  "We develop native and cross-platform mobile applications for both Android and iOS platforms, delivering high-performance, scalable, and user-friendly apps tailored to meet specific business objectives and industry standards.",

  "Our mobile-first UI/UX design approach focuses on intuitive navigation, modern aesthetics, accessibility, and seamless user experiences across all screen sizes, ensuring higher user engagement and retention.",

  "We handle complete API and backend integration to ensure smooth communication between mobile applications and server-side systems, enabling real-time data synchronization, secure transactions, and reliable functionality.",

  "Our team emphasizes performance optimization and secure data handling by implementing best practices such as encryption, authentication, secure storage, caching strategies, and efficient resource utilization.",

  "We integrate essential mobile features including push notifications, location services, camera and media access, biometric authentication, payment gateways, and third-party SDKs to enhance app functionality.",

  "We build offline-capable mobile applications with local data storage and background synchronization to ensure uninterrupted usage even in low or no network conditions.",

  "We manage end-to-end app deployment on the Google Play Store and Apple App Store, including build configuration, compliance with store guidelines, testing, versioning, and release management.",

  "Our services include continuous monitoring, crash analytics, performance tracking, and error reporting to ensure stable app behavior and quick issue resolution.",

  "We implement app security best practices such as secure API communication, token-based authentication, and protection against common mobile vulnerabilities.",

  "We provide ongoing maintenance and long-term support, including OS upgrades, security updates, bug fixes, performance improvements, and feature enhancements to support application growth.",

  "We offer app modernization services, feature enhancements, and migration of existing mobile applications to modern frameworks and latest platform standards.",

  "We also assist with app store optimization (ASO), improving app visibility, ratings, and download performance through best practices and analytics.",

  "We develop enterprise-grade mobile solutions with role-based access, multi-user support, and scalable architecture to support growing organizations.",

  "We integrate analytics and reporting tools to track user behavior, engagement, and performance metrics for data-driven decision-making.",

  "We support multi-language and localization features to help applications reach global audiences effectively.",

  "We implement CI/CD pipelines for automated builds, testing, and faster release cycles, ensuring consistent and reliable app delivery.",

  "We provide consultation and technical guidance throughout the product lifecycle, from idea validation and MVP development to full-scale production deployment."
];


  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
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
    </Box>
    </>
  );
};

export default MobileAppServices;
