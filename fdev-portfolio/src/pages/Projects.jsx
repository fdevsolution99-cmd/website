import { Container, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import ProjectCard from '../components/ProjectCard';

const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "Complete shopping solution with Stripe payments, inventory & admin dashboard",
    image: "/api/placeholder/400/250",
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/demo/ecommerce',
    live: 'https://ecommerce-demo.com'
  },
  {
    title: "HRMS System",
    description: "Employee management with payroll, attendance & performance tracking",
    image: "/api/placeholder/400/250",
    tags: ['React', 'Express', 'PostgreSQL', 'Redux'],
    github: 'https://github.com/demo/hrms',
    live: 'https://hrms-demo.com'
  },
  {
    title: "LMS Platform",
    description: "Online learning with video courses, quizzes & progress tracking",
    image: "/api/placeholder/400/250", 
    tags: ['Next.js', 'Prisma', 'Tailwind', 'Vimeo'],
    github: 'https://github.com/demo/lms',
    live: 'https://lms-demo.com'
  },
  {
    title: "Payroll App", 
    description: "Automated salary processing with tax compliance & reports",
    image: "/api/placeholder/400/250",
    tags: ['Vue.js', 'Firebase', 'Chart.js'],
    github: 'https://github.com/demo/payroll',
    live: 'https://payroll-demo.com'
  },
  {
    title: "Enterprise Dashboard",
    description: "Real-time analytics with 50+ KPIs & custom reporting",
    image: "/api/placeholder/400/250",
    tags: ['React', 'D3.js', 'Socket.io', 'Elasticsearch'],
    github: 'https://github.com/demo/dashboard',
    live: 'https://dashboard-demo.com'
  },
  {
    title: "CRM System",
    description: "Customer relationship management with automation workflows",
    image: "/api/placeholder/400/250",
    tags: ['Angular', 'NestJS', 'TypeORM', 'RabbitMQ'],
    github: 'https://github.com/demo/crm',
    live: 'https://crm-demo.com'
  },
];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Navbar />

      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 12 }}>
          Featured Projects
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
          Real-world applications that power businesses worldwide
        </Typography>

        <Grid container spacing={4}>
          {projectsData.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={project.title}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Project Details Popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.name}</DialogTitle>

            <DialogContent>
              {selectedProject.image && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Box>
              )}

              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedProject.description}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                <strong>Technologies:</strong> {selectedProject.tech}
              </Typography>

              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={selectedProject.link}
                  target="_blank"
                >
                  View Project
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
