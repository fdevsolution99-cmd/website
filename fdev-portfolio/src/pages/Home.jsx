import { Box, Container, Typography, Button, TextField,Paper  } from "@mui/material";
import { Grid, Card, CardContent} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import arcimage from "../asscets/logo.png";

const services = [
  {
    title: "Web Development",
    description:
      "We create responsive, scalable websites and web applications using modern technologies like React, Node.js, and more to meet your business needs.",
    link: "/services/webappservices",
  },
  {
    title: "Mobile Application",
    description:
      "Build native and cross-platform mobile apps for iOS and Android, ensuring seamless user experiences and high performance.",
    link: "/services/mobile-application",
  },
  {
    title: "UI / UX Design",
    description:
      "Design intuitive and visually appealing user interfaces and experiences that enhance usability and customer satisfaction.",
    link: "/services/ui-uxdesign",
  },
  {
    title: "Cloud Solutions",
    description:
      "Leverage cloud platforms like AWS, Azure, and Google Cloud for secure, scalable, and cost-effective infrastructure solutions.",
    link: "/services/cloudservices",
  },
  {
    title: "Enterprise Software",
    description:
      "Develop custom enterprise software tailored to streamline operations, improve efficiency, and support large-scale business processes.",
    link: "/services/enterprise-software",
  },
  {
    title: "Product Engineering",
    description:
      "End-to-end product development from ideation to deployment, focusing on innovation, quality, and rapid delivery.",
    link: "/services/product-engineering",
  },
  {
    title: "Internship & Training",
    description:
      "We provide internships to students to improve their talent and boost their skills.",
    link: "/services/training-intership",
  },
];


const projects = [
  {
    title: "E-Commerce Platform",
    description: "A comprehensive online shopping solution with secure payment integration, inventory management, and user-friendly interface for seamless shopping experiences."
  },
  {
    title: "HRMS System",
    description: "Human Resource Management System designed to streamline employee data, payroll, attendance, and performance tracking for efficient workforce management."
  },
  {
    title: "Learning Management System",
    description: "An interactive platform for online education, featuring course management, and progress tracking."
  },
  {
    title: "Payroll Application",
    description: "Automated payroll processing system ensuring accurate salary calculations, tax compliance, and timely disbursements for organizations."
  },
  {
    title: "Enterprise Dashboard",
    description: "Real-time analytics and reporting dashboard providing key business insights, KPIs, and data visualization for informed decision-making."
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "84vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #092311, #000)",
          color: "#fff",
        }}
      >
        <Container>         
              <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Box sx={{ mb: 3, mt: 10, order: { xs: 1, md: 1 } }}>          
                  <Typography variant="h3" fontWeight="bold" sx={{ textShadow: '2px 2px 4px #FFD700' }}>
                FDEV Solution Pvt Ltd
              </Typography>
              <Typography variant="h6" sx={{ my: 1, }}>
                Web • Mobile • Cloud • Enterprise Solutions
              </Typography>
                  <Typography variant="body1" sx={{ mb: 3, }}>
                FDEV Solutions is a technology-driven software company focused on delivering reliable, scalable, and innovative digital solutions. We specialize in custom software development, web and mobile applications, and enterprise solutions that help businesses grow in a competitive digital landscape.
                </Typography>
                </Box>
                <Box sx={{ mb: 3, order: { xs: 2, md: 2 } }}>
                  <img src={arcimage} alt="Company Logo" style={{ width: '100%', height: '100%' }} />
                </Box>
              </Box>

              <Container sx={{ mb: 3, ml:-3 }}>
              <Typography variant="body1" sx={{ mb: 3, }}>
                FDEV Solutions is a technology-driven software company focused on delivering reliable, scalable, and innovative digital solutions. We specialize in custom software development, web and mobile applications, and enterprise solutions that help businesses grow in a competitive digital landscape.
                </Typography>
              <Typography variant="body1" sx={{ mb: 3, }}>
                FDEV Solution Pvt Ltd is a leading provider of innovative technology solutions, specializing in web development, mobile applications, cloud services, and enterprise software. With a team of expert developers and designers, we deliver cutting-edge solutions that drive business growth and digital transformation. Our commitment to quality, innovation, and customer satisfaction sets us apart in the competitive tech landscape.
              </Typography>
                <Typography variant="body1" sx={{ mb: 3, }}>
                  Our mission is to empower businesses through technology by delivering reliable, cost-effective, and innovative software solutions. We aim to simplify complex problems and create digital products that enhance productivity, performance, and user experience.
                </Typography>
              <Box
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  backgroundColor: "000",
                  color: "#fff",
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline-block",
                    animation: "scroll 15s linear infinite",
                    "@keyframes scroll": {
                      "0%": { transform: "translateX(100%)" },
                      "100%": { transform: "translateX(-100%)" },
                    },
                  }}
                >
                  🚀 Transforming Ideas into Reality • 💡 Innovative Solutions for Modern Businesses • 🌐 Global Reach, Local Expertise • 📈 Driving Digital Success
                </Typography>
              </Box>
            </Container>


            <Container sx={{ py: 5 }}>
              <Typography variant="h4" align="center" gutterBottom sx={{ textShadow: '2px 2px 4px #FFD700' }}>
                Our Services
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.title}>
                    <RouterLink to={service.link} style={{ textDecoration: 'none' }}>
                      <Card elevation={4} sx={{ minHeight: 200, width: { xs: '100%', sm: 250 }, transition: 'all 0.3s ease', '&:hover': { elevation: 8, transform: 'scale(1.05)', backgroundColor: '#f5f5f5', cursor: 'pointer' } }}>
                        <CardContent>
                          <Typography variant="h6" align="center" gutterBottom>
                            {service.title}
                          </Typography>
                          <Typography variant="body2" align="center">
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </RouterLink>
                  </Grid>
                ))}
              </Grid>
            </Container>

            <Container sx={{ py: 5 }}>
              <Typography variant="h4" align="center" gutterBottom sx={{ textShadow: '2px 2px 4px #FFD700' }}>
                Our Projects
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                {projects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.title}>
                    <RouterLink to="/projects" style={{ textDecoration: 'none' }}>
                      <Card elevation={3} sx={{ minHeight: 200, width: { xs: '100%', sm: 250 }, transition: 'all 0.3s ease', '&:hover': { elevation: 8, transform: 'scale(1.05)', backgroundColor: '#f5f5f5', cursor: 'pointer' } }}>
                        <CardContent>
                          <Typography variant="h6" align="center" gutterBottom>
                            {project.title}
                          </Typography>
                          <Typography variant="body2" align="center">
                            {project.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </RouterLink>
                  </Grid>
                ))}
              </Grid>
            </Container>
              <Typography variant="h4" align="center" gutterBottom sx={{ textShadow: '2px 2px 4px #FFD700' }}>
                Contact Us
              </Typography>
                    <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your name"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="Enter your phone number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter your Mail"
              />
            </Grid>

            <Grid item xs={12} sx={{width:'100%'}}>
              <TextField
                fullWidth
                label="Message"
                placeholder="Write your message here..."
                multiline
                rows={4}
                sx={{width:'93%'}}
              />
            </Grid>


          </Grid>
                      <Grid item xs={12} textAlign="center" alignItems="center">
              <Button
                variant="contained"
                size="large"
                sx={{ px: 5, borderRadius: 2, mt: 2 }}
              >
                Send Message
              </Button>
            </Grid>
        </Paper>


      </Container>

        
      </Box>
    </>
  );
}
