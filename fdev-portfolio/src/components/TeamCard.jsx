import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const TeamCard = ({ name, role, avatar, skills, social }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card 
        sx={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          height: 380,
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            background: 'rgba(255, 255, 255, 0.35)',
          },
        }}
      >
        <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${name === 'John Doe' ? '#6366F1' : '#F59E0B'} 0%, ${name === 'John Doe' ? '#F59E0B' : '#10B981'} 100%)`,
            }}
          />
          <Avatar 
            src={avatar}
            sx={{
              position: 'absolute',
              bottom: -50,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 100,
              border: '5px solid white',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
            }}
          />
        </Box>
        
        <CardContent sx={{ p: 4, pt: 8, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom align="center">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }} align="center">
            {role}
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
            {skills.map((skill, index) => (
              <Chip 
                key={skill}
                label={skill}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {social.map(({ icon: Icon, url }) => (
              <motion.div
                key={Icon.name}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  component="a"
                  href={url}
                  target="_blank"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'white',
                      color: '#6366F1',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Icon size={18} />
                </Box>
              </motion.div>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamCard;

