import { Container, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import TeamCard from '../components/TeamCard';

const teamMembers = [
  {
    name: "Farhan Dev",
    role: "Founder & Full-Stack Developer",
    avatar: "FD",
    skills: ["React", "Node.js", "Next.js", "AWS"],
    social: [
      { icon: "LinkedIn", url: "#" },
      { icon: "GitHub", url: "#" },
      { icon: "Twitter", url: "#" }
    ]
  },
  {
    name: "Aisha Khan",
    role: "UI/UX Designer",
    avatar: "AK",
    skills: ["Figma", "Prototyping", "Design Systems", "User Research"],
    social: [
      { icon: "LinkedIn", url: "#" },
      { icon: "Behance", url: "#" },
      { icon: "Dribbble", url: "#" }
    ]
  },
  {
    name: "Rahul Patel",
    role: "Mobile Developer",
    avatar: "RP",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    social: [
      { icon: "LinkedIn", url: "#" },
      { icon: "GitHub", url: "#" }
    ]
  },
  {
    name: "Priya Sharma",
    role: "Backend Engineer",
    avatar: "PS",
    skills: ["Node.js", "PostgreSQL", "MongoDB", "GraphQL"],
    social: [
      { icon: "LinkedIn", url: "#" },
      { icon: "GitHub", url: "#" },
      { icon: "Stack Overflow", url: "#" }
    ]
  }
];

export default function Team() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3 }}>
            Meet Our Team
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
            Talented professionals passionate about crafting exceptional digital experiences
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={member.name}>
              <TeamCard {...member} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
