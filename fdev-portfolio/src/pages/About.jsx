import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import {Grid, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom className="fade-in-up">
          About FDEV Solution
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 900, mx: 'auto', lineHeight: 1.8 }}>
          FDEV Solution Pvt Ltd is a leading software development company delivering modern, scalable, and secure applications. 
          We specialize in web development, mobile applications, cloud solutions, and enterprise software, helping businesses transform ideas into high-quality digital products.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="glass">
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Our Mission
                </Typography>
                <Typography variant="body1">
                  Empower businesses through innovative technology solutions that drive growth and digital transformation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="glass">
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Our Vision
                </Typography>
                <Typography variant="body1">
                  To be the preferred technology partner for businesses seeking reliable and cutting-edge digital solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
