import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0B1C2D", color: "#fff", py: 2, textAlign: "center" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} FDEV Solution Pvt Ltd. All Rights Reserved.
      </Typography>
    </Box>
  );
}
