import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          About FDEV Solution Pvt Ltd
        </Typography>
        <Typography>
          FDEV Solution Pvt Ltd is a software development company delivering
          modern, scalable, and secure applications. We help businesses
          transform ideas into high-quality digital products.
        </Typography>
      </Container>
    </>
  );
}
