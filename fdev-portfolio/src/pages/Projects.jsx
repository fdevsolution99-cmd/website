import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  Button
} from "@mui/material";
import { useState } from "react";
import Navbar from "../components/Navbar";

const projects = [
  {
    name: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, cart management, secure payments, and admin dashboard.",
    tech: "React.js, Node.js, PostgreSQL, Stripe, AWS",
    link: "https://example.com/ecommerce",
    image: "../asscets/ecommerce.jpg"
  },
  {
    name: "HRMS System",
    description:
      "Human Resource Management System for employee management, attendance tracking, payroll processing, and reporting.",
    tech: "React.js, Node.js, PostgreSQL",
    link: "https://example.com/hrms"
  },
  {
    name: "Learning Management System",
    description:
      "LMS for managing trainers, students, courses, assignments, and video-based learning modules.",
    tech: "React.js, Express.js, AWS S3",
    link: "https://example.com/lms"
  },
  {
    name: "Payroll Application",
    description:
      "Payroll system for salary calculation, payslip generation, tax deductions, and employee self-service.",
    tech: "React.js, Node.js, PostgreSQL",
    link: "https://example.com/payroll"
  },
  {
    name: "Enterprise Dashboard",
    description:
      "Enterprise analytics dashboard with role-based access, real-time KPIs, and data visualization.",
    tech: "React.js, MUI, APIs",
    link: "https://example.com/dashboard"
  }
];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ py: 6, background: "linear-gradient(135deg, #092311, #000)", color: "#fff" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Projects
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.name}>
              <Card elevation={4}>
                <CardActionArea onClick={() => handleOpen(project)}>
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {project.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Project Details Popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.name}</DialogTitle>

            <DialogContent>
              {selectedProject.image && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Box>
              )}

              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedProject.description}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                <strong>Technologies:</strong> {selectedProject.tech}
              </Typography>

              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={selectedProject.link}
                  target="_blank"
                >
                  View Project
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
