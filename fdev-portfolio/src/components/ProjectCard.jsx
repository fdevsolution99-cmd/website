import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const projects = [
  "E-Commerce Platform",
  "HRMS System",
  "Learning Management System",
  "Payroll Application",
  "Enterprise Dashboard",
];

export default function Projects() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Projects
        </Typography>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {project}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
