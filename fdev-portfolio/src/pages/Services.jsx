import { Container, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import ServiceCard from '../components/ServiceCard';

const servicesData = [
  {
    title: "Web Development",
    description: "Scalable, responsive web apps with React, Next.js, Node.js & modern stacks",
    icon: "🌐",
    link: "/services/webappservices"
  },
  {
    title: "Mobile Apps", 
    description: "Native & cross-platform iOS/Android apps with React Native & Flutter",
    icon: "📱",
    link: "/services/mobile-application"
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that convert visitors to customers", 
    icon: "🎨",
    link: "/services/ui-uxdesign"
  },
  {
    title: "Cloud Solutions",
    description: "AWS, Azure, GCP - scalable infrastructure as code deployment",
    icon: "☁️",
    link: "/services/cloudservices"
  },
  {
    title: "Enterprise Software",
    description: "Custom ERP/CRM solutions for complex business workflows",
    icon: "🏢",
    link: "/services/enterprise-software"
  },
  {
    title: "Product Engineering",
    description: "Full-cycle MVP to scale-up product development & launch",
    icon: "🚀",
    link: "/services/product-engineering"
  },
];

export default function Services() {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom className="fade-in-up">
          Our Services
        </Typography>
        <Typography variant="h4" align="center" color="text.secondary" sx={{ mb: 12, maxWidth: 800, mx: 'auto', fontSize: {xs: '1.2rem', md: '1.4rem'} }}>
          Cutting-edge technology solutions that power your digital transformation
        </Typography>

        <Grid container spacing={4}>
          {servicesData.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={service.title}>
              <ServiceCard {...service} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
