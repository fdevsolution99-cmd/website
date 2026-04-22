// import { Card, CardContent, Typography, Box, Chip, AvatarGroup } from '@mui/material';
// import { motion } from 'framer-motion';
// import { Github, ExternalLink, Star } from 'lucide-react';

// const ProjectCard = ({ title, description, image, tags, github, live }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       whileHover={{ y: -8 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//     >
//       <Card 
//         sx={{
//           height: 400,
//           borderRadius: 3,
//           overflow: 'hidden',
//           position: 'relative',
//           background: 'rgba(255, 255, 255, 0.1)',
//           backdropFilter: 'blur(20px)',
//           border: '1px solid rgba(255, 255, 255, 0.2)',
//           '&::before': {
//             content: '\"\"',
//             position: 'absolute',
//             inset: 0,
//             backgroundImage: `linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(245, 158, 11, 0.8)), url(${image})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             opacity: 0,
//             transition: 'opacity 0.4s ease',
//             zIndex: 0,
//           },
//           '&:hover::before': {
//             opacity: 1,
//           },
//           '& .overlay': {
//             opacity: 1,
//             transform: 'translateY(0)',
//           },
//         }}
//       >
//         <Box sx={{ position: 'relative', height: '60%', overflow: 'hidden' }}>
//           <Box 
//             className="overlay"
//             sx={{
//               position: 'absolute',
//               inset: 0,
//               background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 70%)',
//               opacity: 0,
//               transform: 'translateY(20px)',
//               transition: 'all 0.4s ease',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'flex-end',
//               p: 3,
//             }}
//           >
//             <Typography variant="h5" fontWeight={700} color="white" sx={{ mb: 1 }}>
//               {title}
//             </Typography>
//             <Typography variant="body2" color="white" sx={{ opacity: 0.9, mb: 2 }}>
//               {description}
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               {live && (
//                 <Chip 
//                   icon={<ExternalLink size={16} />}
//                   label="Live Demo" 
//                   color="primary" 
//                   size="small" 
//                   clickable 
//                   component="a"
//                   href={live}
//                   target="_blank"
//                 />
//               )}
//               {github && (
//                 <Chip 
//                   icon={<Github size={16} />}
//                   label="Source" 
//                   color="secondary" 
//                   size="small"
//                   clickable 
//                   component="a"
//                   href={github}
//                   target="_blank"
//                 />
//               )}
//             </Box>
//           </Box>
//         </Box>

//         <CardContent sx={{ p: 3, pt: 2, zIndex: 1, position: 'relative' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6" fontWeight={600}>
//               {title}
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 0.5 }}>
//               <Star size={18} color="#FFD700" />
//               <Typography variant="caption" color="primary">4.8</Typography>
//             </Box>
//           </Box>

//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
//             {description}
//           </Typography>

//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//             {tags?.map((tag, index) => (
//               <Chip key={index} label={tag} size="small" variant="outlined" color="primary" />
//             ))}
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default ProjectCard;

