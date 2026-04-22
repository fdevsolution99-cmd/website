import { Box, Typography, Link, Grid } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        minHeight: "40vh",
        py: 4,
        background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9), rgba(226, 232, 240, 0.9))',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'text.primary',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Get in Touch */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Get In Touch
          </Typography>

          <Typography variant="body2" mb={2}>
            📧 Email:{" "}
            <Link href="mailto:hr@fdevsol.com" color="inherit" underline="hover">
              hr@fdevsol.com
            </Link>
          </Typography>

          <Typography variant="body2" mb={2}>
            📞 Phone:{" "}
            <Link href="tel:+916309759843" color="inherit" underline="hover">
              +91 63097 59843
            </Link>
          </Typography>

          <Typography variant="body2">
            📍 501, 5th Floor, Veekay Prime, Madhapur, Hyderabad,
            Telangana – 500081
          </Typography>
        </Grid>

        {/* Follow Us */}
        <Grid item xs={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>

          <Typography variant="body2" mb={1}>
            🔗{" "}
            <Link
              href="https://www.linkedin.com/in/future-developer-07b29a3aa"
              target="_blank"
              rel="noopener"
              color="primary"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              LinkedIn
            </Link>
          </Typography>

          <Typography variant="body2" mb={1}>
            🐦{" "}
            <Link
              href="https://x.com/fdelsolution"
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="hover"
            >
              Twitter (X)
            </Link>
          </Typography>

          <Typography variant="body2" mb={1}>
            📘{" "}
            <Link
              href="https://www.facebook.com/share/1FnSrowQrd/"
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="hover"
            >
              Facebook
            </Link>
          </Typography>

          <Typography variant="body2">
            📷{" "}
            <Link
              href="https://www.instagram.com/fdevsolution99"
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="hover"
            >
              Instagram
            </Link>
          </Typography>
        </Grid>

        {/* Business Hours */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" gutterBottom>
            Business Hours
          </Typography>

          <Typography variant="body2" mb={1}>
            🕒 Mon – Fri: 10:00 AM – 6:00 PM
          </Typography>

          <Typography variant="body2">
            🕒 Sat & Sun: Closed
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
