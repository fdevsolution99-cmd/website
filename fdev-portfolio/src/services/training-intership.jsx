import React from "react";
import {Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import Navbar from "../components/Navbar";

const InternshipTrainingServices = () => {
const services = [
  "We offer software development internships with real-time industry projects, allowing students and freshers to gain hands-on experience by working on live applications under the guidance of experienced professionals.",

  "Our full-stack development training covers both frontend and backend technologies, enabling learners to build complete, production-ready applications using modern frameworks and tools.",

  "Our frontend development training focuses on HTML, CSS, JavaScript, React.js, UI libraries, and responsive design principles to help learners create modern, user-friendly interfaces.",

  "Our backend development training includes server-side programming, API development, database management, authentication, and performance optimization using industry-standard technologies.",

  "We provide UI/UX design training that covers user research, wireframing, prototyping, design systems, and usability testing using professional tools like Figma and Adobe XD.",

  "Our cloud and DevOps training introduces learners to cloud platforms, deployment strategies, CI/CD pipelines, containerization, monitoring, and infrastructure management.",

  "We offer live project exposure and recognized certifications upon successful completion, helping learners showcase practical skills and real-world experience.",

  "We provide placement and career support through resume building, interview preparation, mock interviews, and career guidance to help learners secure job opportunities.",

  "Our programs are designed with a practical, industry-aligned curriculum that bridges the gap between academic learning and real-world software development.",

  "We offer mentorship from experienced developers who provide continuous feedback, code reviews, and best practice guidance throughout the training journey.",

  "We support flexible learning modes, including online and in-person training, to accommodate students, freshers, and working professionals.",

  "We emphasize problem-solving, coding standards, version control, and collaborative development practices to prepare learners for professional environments.",

  "We regularly update our training content to match the latest industry trends, tools, and technologies.",

  "We aim to build job-ready professionals with strong technical foundations, confidence, and real-world project experience."
];


  return (
    <>
    <Navbar/>
    <Box sx={{ py: 5,background: "linear-gradient(135deg, #092311, #000)", color: "#fff"}}>
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
    </Box>
  </>

  );
};

export default InternshipTrainingServices;
