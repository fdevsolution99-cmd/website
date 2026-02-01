import { Container, TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>

        <TextField fullWidth label="Name" margin="normal" />
        <TextField fullWidth label="Email" margin="normal" />
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          margin="normal"
        />

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Container>
    </>
  );
}
