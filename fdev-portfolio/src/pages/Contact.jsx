import { Container, TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import {Grid, Card, CardContent, Paper } from "@mui/material";

export default function Contact() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom className="fade-in-up">
          Get In Touch
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
          Ready to start your next project? We'd love to hear from you
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card className="glass" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  📧 hr@fdevsol.com
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  📞 +91 63097 59843
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  📍 501, 5th Floor, Veekay Prime, Madhapur, Hyderabad, Telangana – 500081
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="glass" sx={{ p: 4 }}>
              <TextField fullWidth label="Name" margin="normal" />
              <TextField fullWidth label="Email" margin="normal" />
              <TextField fullWidth label="Phone" margin="normal" />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                margin="normal"
              />
              <Button variant="contained" size="large" fullWidth sx={{ mt: 3, py: 1.5 }}>
                Send Message
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
