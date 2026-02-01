import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const services = [
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "Cloud Solutions",
  "Enterprise Software",
  "Product Engineering",
];

export default function Services() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>

        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service}>
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" align="center">
                    {service}
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
