import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card 
        sx={{
          position: 'relative',
          height: 280,
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-12px) scale(1.02)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            background: 'rgba(255, 255, 255, 0.35)',
            '& .shimmer': {
              opacity: 1,
              scale: 1.05,
            },
          },
          '&::before': {
            content: '\"\"',
            position: 'absolute',
            top: 0,
            left: -100,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        }}
        onClick={() => window.location.href = link}
      >
        {/* Shimmer overlay */}
        <Box 
          className="shimmer"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(99, 102, 241, 0.3) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s, transform 0.3s',
            pointerEvents: 'none',
          }}
        />

        <CardContent sx={{ p: 4, pt: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #6366F1, #F59E0B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 24,
              fontWeight: 700,
            }}>
              {icon}
            </Box>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              {title}
            </Typography>
          </Box>
          
          <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1, mb: 3, lineHeight: 1.6 }}>
            {description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip label="Learn More" color="primary" size="small" />
            <ArrowRight size={20} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;

