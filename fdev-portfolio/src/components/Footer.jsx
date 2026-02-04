import { Box, Typography, Link } from "@mui/material";
import { Grid,} from "@mui/material";


export default function Footer() {
  return (
          <Box sx={{          
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #000100, #000)",
          color: "#fff",
          alignContent:"center",
          }}>
            <Grid container spacing={12} sx={{ml:"14%"}} >
              
              {/* Get in Touch */}
              <Grid item xs={12} md={4} >
                <Typography variant="h6" gutterBottom >
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
                <Typography variant="body2" sx={{ mt: 1 }} >
                  📍 501, 5th Floor, Veekay Prime,  
                  Madhapur, Hyderabad, Telangana – 500081
                </Typography>
              </Grid>

              {/* Social Links */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>

                <Typography variant="body2" mb={2}>
                  🔗{" "}
                  <Link
                    href="https://www.linkedin.com/in/future-developer-07b29a3aa"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    underline="hover"
                  >
                    LinkedIn
                  </Link>
                </Typography>

                <Typography variant="body2" mb={2}>
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

                <Typography variant="body2" mb={2}>
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

                <Typography variant="body2" >
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
              <Grid item xs={12} md={2}>
                <Typography variant="h6" gutterBottom>
                  Business Hours
                </Typography>
                <Typography variant="body2" mb={2}>
                  🕒 Mon – Fri: 10:00 AM – 6:00 PM
                </Typography>

                <Typography variant="body2" mb={2}>
                  🕒 Saturday & Sunday: Closed
                </Typography>
              </Grid>

            </Grid>

          </Box>
  );
}
