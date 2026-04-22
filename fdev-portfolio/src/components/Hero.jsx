import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
  return (
    <Box className="hero-section hero-bg" sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated background particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
        }}
      />
      
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 800, lineHeight: 1.1 }}>
            Transform Your <span style={{ background: 'linear-gradient(135deg, #6366F1, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Business</span>
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary', fontSize: { xs: '1.2rem', md: '1.5rem' }, lineHeight: 1.6 }}>
            Innovative software solutions that drive growth and digital transformation
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/services"
              size="large"
              sx={{ minWidth: 180 }}
            >
              Explore Services
            </Button>
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/contact"
              size="large"
              sx={{ minWidth: 180 }}
            >
              Get Free Quote
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
