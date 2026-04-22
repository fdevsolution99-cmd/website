import { useState, useEffect, useRef } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card,
  CardContent, Avatar, Chip, TextField, IconButton, Drawer, List,
  ListItem, ListItemText, Divider, Rating, Fab, LinearProgress
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import StorageIcon from "@mui/icons-material/Storage";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import Logo from './asscets/logo.png';

// ─── THEME ────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: "#D4A017", light: "#F0C040", dark: "#A07810" },
    secondary:  { main: "#FFFFFF" },
    background: { default: "#0A0A0A", paper: "#111111" },
    text:       { primary: "#F5F0E8", secondary: "#9A8F7A" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h2: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    h4: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    h5: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    h6: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    body1: { fontFamily: "'Inter', sans-serif", lineHeight: 1.85 },
    body2: { fontFamily: "'Inter', sans-serif" },
    button: { fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "0.06em" },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, borderRadius: 3, letterSpacing: "0.06em" } } },
    MuiCard: { styleOverrides: { root: { background: "#111111", border: "1px solid #1E1E1E" } } },
  },
});

// ─── DATA ──────────────────────────────────────────────────────────────────
const NAV = ["Home","About","Services","Portfolio","Team","Testimonials","Contact"];

const SERVICES = [
  { icon: <CodeIcon sx={{ fontSize: 36 }} />, title: "Web Development", desc: "Custom web applications built with React, Next.js, and Node.js. From landing pages to enterprise platforms — fast, accessible, and conversion-optimised.", tags: ["React","Next.js","Node.js","TypeScript"], accent: "#D4A017" },
  { icon: <PhoneIphoneIcon sx={{ fontSize: 36 }} />, title: "Mobile App Development", desc: "Cross-platform iOS and Android apps using React Native. Pixel-perfect interfaces with native performance that users come back to, again and again.", tags: ["React Native","iOS","Android","Expo"], accent: "#C0A080" },
  { icon: <DesignServicesIcon sx={{ fontSize: 36 }} />, title: "UI/UX Design", desc: "Human-centred design that converts. Research-backed wireframes, interactive prototypes, and polished design systems bridging beauty and usability.", tags: ["Figma","Prototyping","Design Systems","Research"], accent: "#D4A017" },
  { icon: <StorageIcon sx={{ fontSize: 36 }} />, title: "Backend & APIs", desc: "Robust, scalable backend architectures with RESTful and GraphQL APIs. Secure databases, auth systems, and cloud-ready microservices.", tags: ["Node.js","PostgreSQL","GraphQL","AWS"], accent: "#C0A080" },
  { icon: <SpeedIcon sx={{ fontSize: 36 }} />, title: "Performance Optimisation", desc: "Audit, optimise, and supercharge your existing web and mobile apps. We identify bottlenecks and deliver measurable speed improvements.", tags: ["Core Web Vitals","Lighthouse","Caching","CDN"], accent: "#D4A017" },
  { icon: <IntegrationInstructionsIcon sx={{ fontSize: 36 }} />, title: "Third-Party Integrations", desc: "Seamlessly connect your platforms — payment gateways, CRMs, ERPs, analytics, and more. Fragmented toolchains become unified workflows.", tags: ["Stripe","Salesforce","REST APIs","Webhooks"], accent: "#C0A080" },
];

const PROJECTS = [
  { title: "NestPay — FinTech Web App",     category: "Web Development", desc: "Real-time payments dashboard with live transaction feeds, fraud alerts, and multi-currency support. Processes ₹50Cr+ monthly for 15,000 users.", tech: ["React","Node.js","Redis","PostgreSQL"], accent: "#D4A017" },
  { title: "DeliverNow — Logistics App",    category: "Mobile Apps",     desc: "Fleet management and last-mile delivery app with real-time GPS, route optimisation, and in-app driver comms. Serving 8,000+ drivers across AP & TS.", tech: ["React Native","Maps API","Firebase","AWS"], accent: "#C0A080" },
  { title: "StudyLoop — EdTech Platform",   category: "Web Development", desc: "Award-winning e-learning platform with live classes, gamified progress tracking, and adaptive quizzes. 200+ courses and 25,000 active learners.", tech: ["Next.js","WebRTC","GraphQL","S3"], accent: "#D4A017" },
  { title: "MedBook — Healthcare App",      category: "Mobile Apps",     desc: "Doctor appointment and teleconsultation app with secure video calls, prescription management, and health record storage. Live in 30+ clinics.", tech: ["React Native","WebRTC","Node.js","MongoDB"], accent: "#C0A080" },
  { title: "ShopSphere — E-Commerce",       category: "Web Development", desc: "Multi-vendor marketplace with dynamic storefronts, AI-powered recommendations, and one-click checkout. Handles Black Friday spikes with zero downtime.", tech: ["Next.js","Stripe","Elasticsearch","Redis"], accent: "#D4A017" },
  { title: "EventPulse — Events App",       category: "Mobile Apps",     desc: "Discover, book, and manage local events with QR check-in, social sharing, and organiser dashboards. 50,000+ downloads in the first six months.", tech: ["React Native","Node.js","Stripe","Mapbox"], accent: "#C0A080" },
];

const TEAM = [
  { name: "Farhan Dev",    role: "Founder & CEO",        avatar: "FD", color: "#D4A017", bio: "10+ years shipping web and mobile products. Former senior engineer at Infosys. Obsessed with clean architecture and client outcomes." },
  { name: "Sneha Kapoor", role: "Head of Mobile",        avatar: "SK", color: "#C0A080", bio: "React Native specialist who has shipped 20+ apps on the App Store and Play Store. Champion of 60fps UIs and offline-first architecture." },
  { name: "Arjun Mehta",  role: "Lead Web Engineer",     avatar: "AM", color: "#D4A017", bio: "Next.js and Node.js expert with a love for performance budgets and pixel-perfect frontends. Previously at a Series B startup in Bangalore." },
  { name: "Priya Nair",   role: "Lead UI/UX Designer",   avatar: "PN", color: "#C0A080", bio: "Design systems evangelist with 7 years shaping digital products. Bridges Figma and React with sharp attention to detail and user empathy." },
];

const TESTIMONIALS = [
  { name: "Rahul Gupta",   role: "CTO, NestPay",                rating: 5, text: "FDev rebuilt our entire payments dashboard from scratch in 10 weeks. The quality was exceptional — clean code, great performance, and a UI our team actually enjoys using.", avatar: "RG", color: "#D4A017" },
  { name: "Ananya Iyer",   role: "Product Manager, MedBook",    rating: 5, text: "They understood the healthcare context immediately and built us an app that is both technically solid and genuinely easy for patients to use. Highly professional team.", avatar: "AI", color: "#C0A080" },
  { name: "Vikram Reddy",  role: "Founder, DeliverNow",         rating: 5, text: "Our drivers love the app. FDev delivered on time, communicated clearly throughout, and caught edge cases we hadn't thought of. Would absolutely work with them again.", avatar: "VR", color: "#D4A017" },
];

const STATS = [
  { icon: <RocketLaunchIcon />, value: "120+", label: "Projects Delivered" },
  { icon: <GroupsIcon />,       value: "70+",  label: "Happy Clients"      },
  { icon: <EmojiEventsIcon />,  value: "10+",  label: "Industry Awards"    },
  { icon: <PublicIcon />,       value: "8+",   label: "Years of Excellence" },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────
function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = parseInt(target);
  const suffix = target.replace(/\d+/, "");
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0; const step = Math.ceil(num / 50);
        const t = setInterval(() => { v += step; if (v >= num) { setCount(num); clearInterval(t); } else setCount(v); }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function FDevLogo({ size =  40}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, userSelect: "none" }}>
      <Box sx={{
        width: size, height: size, flexShrink: 0,
        // background: "linear-gradient(135deg, #D4A017 0%, #A07810 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        // boxShadow: `0 0 ${size * 0.55}px rgba(212,160,23,0.4)`,
        clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        overflow: "hidden",
      }}>
        <img 
          src={Logo} 
          alt="FDev Logo" 
          style={{ 
            width: "150%", 
            height: "100%", 
            objectFit: "cover",
            display: "block"
          }} 
        />
      </Box>
      <Box>
        <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: size * 0.5, lineHeight: 1, color: "#F5F0E8", letterSpacing: "0.03em" }}>
          FDEV<Box component="span" sx={{ color: "#D4A017" }}> Solutions</Box>
        </Typography>
        <Typography sx={{ fontSize: size * 0.21, color: "#9A8F7A", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>
          Pvt Ltd · Hyderabad
        </Typography>
      </Box>
    </Box>
  );
}

function SectionEyebrow({ children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <Box sx={{ width: 28, height: 1.5, background: "#D4A017" }} />
      <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.26em", color: "#D4A017", textTransform: "uppercase" }}>{children}</Typography>
    </Box>
  );
}

function GoldRule() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3.5 }}>
      <Box sx={{ width: 52, height: 2, background: "linear-gradient(90deg, #D4A017, transparent)" }} />
      <Box sx={{ width: 5, height: 5, background: "#D4A017", transform: "rotate(45deg)", flexShrink: 0 }} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function FDevWebsite() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [filter, setFilter]         = useState("All");
  const [form, setForm]             = useState({ name: "", email: "", message: "" });
  const [sent, setSent]             = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
    setDrawerOpen(false);
  };

  const categories = ["All", "Web Development", "Mobile Apps"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  const goldBtn = {
    background: "linear-gradient(135deg, #D4A017, #A07810)",
    color: "#0A0A0A", fontWeight: 700, boxShadow: "0 4px 24px rgba(212,160,23,0.28)",
    "&:hover": { background: "linear-gradient(135deg, #F0C040, #D4A017)", transform: "translateY(-2px)", boxShadow: "0 8px 36px rgba(212,160,23,0.42)" },
    transition: "all 0.25s",
  };

  const outlineBtn = {
    borderColor: "rgba(212,160,23,0.35)", color: "#D4A017",
    "&:hover": { borderColor: "#D4A017", background: "rgba(212,160,23,0.07)", transform: "translateY(-2px)" },
    transition: "all 0.25s",
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(212,160,23,0.2)" },
      "&:hover fieldset": { borderColor: "rgba(212,160,23,0.4)" },
      "&.Mui-focused fieldset": { borderColor: "#D4A017" },
      color: "#F5F0E8",
    },
    "& .MuiInputLabel-root": { color: "#9A8F7A" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#D4A017" },
  };

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #0A0A0A; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: rgba(212,160,23,0.45); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4A017; }
      `}</style>

      <Box sx={{ background: "#061d0b", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
        <AppBar position="fixed" elevation={0} sx={{
          background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,160,23,0.18)" : "none",
          transition: "all 0.4s ease",
        }}>
          <Toolbar sx={{ px: { xs: 2, md: 7 }, minHeight: "70px !important" }}>
            <FDevLogo size={33} />
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
              {NAV.map(n => (
                <Button key={n} onClick={() => goto(n)} sx={{ color: "#9A8F7A", fontSize: "0.82rem", px: 1.8, "&:hover": { color: "#D4A017", background: "rgba(212,160,23,0.05)" } }}>{n}</Button>
              ))}
              <Button variant="outlined" onClick={() => goto("Contact")} sx={{ ml: 2, ...outlineBtn, px: 3, fontSize: "0.82rem" }}>Hire Us</Button>
            </Box>
            <IconButton sx={{ display: { md: "none" }, color: "#D4A017" }} onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { background: "#0D0D0D", width: 270, borderLeft: "1px solid rgba(212,160,23,0.13)" } }}>
          <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <FDevLogo size={27} />
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#D4A017" }}><CloseIcon /></IconButton>
          </Box>
          <Divider sx={{ borderColor: "rgba(212,160,23,0.1)" }} />
          <List sx={{ pt: 2 }}>
            {NAV.map(n => (
              <ListItem key={n} onClick={() => goto(n)} sx={{ cursor: "pointer", borderLeft: "3px solid transparent", "&:hover": { borderLeftColor: "#D4A017", background: "rgba(212,160,23,0.05)" }, transition: "all 0.2s" }}>
                <ListItemText primary={n} primaryTypographyProps={{ color: "#F5F0E8", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* ══ HERO ════════════════════════════════════════════════════════════ */}
        <Box id="home" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", pt: { xs: 10, md: 0 } }}>
          <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 65% 55% at 68% 30%, rgba(212,160,23,0.08) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 20% 75%, rgba(212,160,23,0.04) 0%, transparent 55%)" }} />
          <Box sx={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,160,23,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.035) 1px, transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 65% 65% at 65% 40%, black 25%, transparent 100%)" }} />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <SectionEyebrow>Web & Mobile Specialists · Hyderabad, India</SectionEyebrow>
                <Typography variant="h1" sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "5.2rem", lg: "6rem" }, lineHeight: 1.03, mb: 3, color: "#F5F0E8" }}>
                  We Craft{" "}
                  <Box component="span" sx={{ background: "linear-gradient(135deg, #D4A017 0%, #F0C040 45%, #C8952A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Digital
                  </Box>
                  <br />Experiences
                </Typography>
                <Typography sx={{ color: "#9A8F7A", mb: 5, fontSize: "1.08rem", maxWidth: 510, lineHeight: 1.95 }}>
                  FDev Solutions Pvt Ltd builds premium web applications and mobile apps that look exceptional, perform flawlessly, and drive real results for ambitious companies across India.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => goto("Portfolio")} sx={{ ...goldBtn, px: 4, py: 1.6, fontSize: "0.88rem" }}>View Our Work</Button>
                  <Button variant="outlined" size="large" onClick={() => goto("Contact")} sx={{ ...outlineBtn, px: 4, py: 1.6, fontSize: "0.88rem" }}>Start a Project</Button>
                </Box>
                <Box sx={{ display: "flex", gap: 4, mt: 6, flexWrap: "wrap" }}>
                  {[["120+","Projects"], ["70+","Clients"], ["8+","Years"]].map(([n, l]) => (
                    <Box key={l}>
                      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "2.1rem", fontWeight: 700, color: "#D4A017", lineHeight: 1 }}>{n}</Typography>
                      <Typography sx={{ color: "#9A8F7A", fontSize: "0.72rem", letterSpacing: "0.13em", textTransform: "uppercase", mt: 0.4 }}>{l}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Right panel */}
              <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
                <Box sx={{ width: 350, p: 4, border: "1px solid rgba(212,160,23,0.18)", background: "linear-gradient(155deg, rgba(22,18,10,0.92), rgba(10,10,10,0.97))", position: "relative", "&::before": { content: '""', position: "absolute", top: -1, left: 36, right: 36, height: 2, background: "linear-gradient(90deg, transparent, #D4A017, transparent)" } }}>
                  <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#F5F0E8", mb: 3.5 }}>Our Core Stack</Typography>
                  {[["React / Next.js",95],["React Native",92],["Node.js / APIs",90],["UI/UX Design",87]].map(([label, val]) => (
                    <Box key={label} sx={{ mb: 2.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                        <Typography sx={{ color: "#9A8F7A", fontSize: "0.8rem" }}>{label}</Typography>
                        <Typography sx={{ color: "#D4A017", fontSize: "0.8rem" }}>{val}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={val} sx={{ height: 3, borderRadius: 2, background: "rgba(212,160,23,0.09)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #D4A017, #F0C040)", borderRadius: 2 } }} />
                    </Box>
                  ))}
                  <Divider sx={{ borderColor: "rgba(212,160,23,0.1)", my: 3 }} />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["TypeScript","PostgreSQL","AWS","Firebase","GraphQL","Figma","Docker","Stripe"].map(t => (
                      <Chip key={t} label={t} size="small" sx={{ background: "rgba(212,160,23,0.07)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.2)", fontSize: "0.7rem" }} />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ══ STATS BAR ═══════════════════════════════════════════════════════ */}
        <Box sx={{ borderTop: "1px solid rgba(212,160,23,0.1)", borderBottom: "1px solid rgba(212,160,23,0.1)", py: 6, background: "rgba(212,160,23,0.018)" }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
              {STATS.map(s => (
                <Grid item xs={6} md={3} key={s.label}>
                  <Box sx={{ textAlign: "center", py: 1 }}>
                    <Box sx={{ color: "#D4A017", mb: 1.5, opacity: 0.65, "& svg": { fontSize: 26 } }}>{s.icon}</Box>
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "2.3rem", fontWeight: 700, color: "#D4A017", lineHeight: 1 }}>
                      <AnimatedNumber target={s.value} />
                    </Typography>
                    <Typography sx={{ color: "#9A8F7A", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", mt: 0.5 }}>{s.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ ABOUT ═══════════════════════════════════════════════════════════ */}
        <Box id="about" sx={{ py: { xs: 10, md: 15 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
              <Grid item xs={12} md={5}>
                <Box sx={{ border: "1px solid rgba(212,160,23,0.18)", background: "linear-gradient(155deg, rgba(22,18,10,0.8), rgba(10,10,10,0.95))", p: { xs: 4, md: 5 }, position: "relative", "&::after": { content: '""', position: "absolute", bottom: -1, left: 36, right: 36, height: 2, background: "linear-gradient(90deg, transparent, #D4A017, transparent)" } }}>
                  <FDevLogo size={42} />
                  <Divider sx={{ my: 3, borderColor: "rgba(212,160,23,0.12)" }} />
                  <Typography sx={{ color: "#9A8F7A", fontStyle: "italic", lineHeight: 1.95, fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>
                    "We don't just write code. We engineer outcomes — products that your customers love and your business can rely on."
                  </Typography>
                  <Divider sx={{ my: 3, borderColor: "rgba(212,160,23,0.12)" }} />
                  <Grid container spacing={1}>
                    {[["Hyderabad","Headquarters"], ["Pan-India","Service Reach"], ["24 / 7","Client Support"]].map(([v, l]) => (
                      <Grid item xs={4} key={l} sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "#D4A017", fontWeight: 700, fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", lineHeight: 1.3 }}>{v}</Typography>
                        <Typography sx={{ color: "#9A8F7A", fontSize: "0.67rem", letterSpacing: "0.06em", textTransform: "uppercase", mt: 0.4 }}>{l}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <SectionEyebrow>Who We Are</SectionEyebrow>
                <GoldRule />
                <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F5F0E8", mb: 3, lineHeight: 1.15 }}>
                  A Boutique Studio Built on{" "}
                  <Box component="span" sx={{ color: "#D4A017" }}>Craft & Precision</Box>
                </Typography>
                <Typography sx={{ color: "#9A8F7A", mb: 3, fontSize: "0.97rem", lineHeight: 1.95 }}>
                  Founded in Hyderabad, FDev Solutions Pvt Ltd is a specialised web and mobile development studio. We keep our team lean and our standards high — every project receives senior-level attention from discovery through deployment.
                </Typography>
                <Typography sx={{ color: "#9A8F7A", mb: 4.5, fontSize: "0.97rem", lineHeight: 1.95 }}>
                  We work closely with startups, scale-ups, and established businesses who want more than a vendor — they want a technical partner who understands their goals and takes full ownership of the outcome.
                </Typography>
                {["Senior engineers on every engagement — no juniors on live projects", "Transparent weekly progress updates and open Slack access", "Agile sprints with client demos every two weeks", "Full source code handover and documentation on delivery"].map(item => (
                  <Box key={item} sx={{ display: "flex", gap: 2, mb: 2, alignItems: "flex-start" }}>
                    <CheckCircleIcon sx={{ color: "#D4A017", fontSize: 17, mt: 0.4, flexShrink: 0 }} />
                    <Typography sx={{ color: "#9A8F7A", fontSize: "0.9rem", lineHeight: 1.75 }}>{item}</Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ══ SERVICES ════════════════════════════════════════════════════════ */}
        <Box id="services" sx={{ py: { xs: 10, md: 15 }, background: "rgba(212,160,23,0.015)", borderTop: "1px solid rgba(212,160,23,0.07)" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 8 }}>
              <SectionEyebrow>What We Do</SectionEyebrow>
              <GoldRule />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F5F0E8", maxWidth: 520 }}>
                Services Built Around <Box component="span" sx={{ color: "#D4A017" }}>Your Goals</Box>
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {SERVICES.map((s, i) => (
                <Grid item xs={12} sm={6} md={4} key={s.title}>
                  <Card sx={{ height: "100%", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", "&:hover": { border: `1px solid ${alpha(s.accent, 0.38)}`, transform: "translateY(-6px)", background: "linear-gradient(160deg, rgba(22,18,10,0.95), #111111)", boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 36px ${alpha(s.accent, 0.07)}` } }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: "0.68rem", color: alpha(s.accent, 0.35), letterSpacing: "0.2em", mb: 2 }}>0{i + 1}</Typography>
                      <Box sx={{ color: s.accent, mb: 2.5, opacity: 0.82 }}>{s.icon}</Box>
                      <Typography variant="h5" sx={{ color: "#F5F0E8", mb: 1.5, fontSize: "1.1rem" }}>{s.title}</Typography>
                      <Typography sx={{ color: "#9A8F7A", fontSize: "0.86rem", lineHeight: 1.88, mb: 3 }}>{s.desc}</Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                        {s.tags.map(t => (
                          <Chip key={t} label={t} size="small" sx={{ background: alpha(s.accent, 0.07), color: s.accent, border: `1px solid ${alpha(s.accent, 0.2)}`, fontSize: "0.68rem" }} />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ PORTFOLIO ═══════════════════════════════════════════════════════ */}
        <Box id="portfolio" sx={{ py: { xs: 10, md: 15 } }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 7 }}>
              <SectionEyebrow>Our Work</SectionEyebrow>
              <GoldRule />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F5F0E8", mb: 1.5 }}>
                Featured <Box component="span" sx={{ color: "#D4A017" }}>Projects</Box>
              </Typography>
              <Typography sx={{ color: "#9A8F7A", fontSize: "0.93rem", maxWidth: 460 }}>Selected case studies — real products, real results.</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, mb: 6, flexWrap: "wrap" }}>
              {categories.map(c => (
                <Button key={c} onClick={() => setFilter(c)} variant={filter === c ? "contained" : "outlined"}
                  sx={filter === c ? { ...goldBtn, fontSize: "0.8rem", py: 0.8 } : { ...outlineBtn, fontSize: "0.8rem", py: 0.8 }}>
                  {c}
                </Button>
              ))}
            </Box>
            <Grid container spacing={3}>
              {filtered.map(p => (
                <Grid item xs={12} sm={6} md={4} key={p.title}>
                  <Card sx={{ height: "100%", transition: "all 0.35s ease", "&:hover": { transform: "translateY(-6px)", border: `1px solid ${alpha(p.accent, 0.38)}`, boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 28px ${alpha(p.accent, 0.08)}` } }}>
                    <Box sx={{ height: 3, background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
                    <CardContent sx={{ p: 3.5 }}>
                      <Chip label={p.category} size="small" sx={{ mb: 2.5, background: alpha(p.accent, 0.09), color: p.accent, border: `1px solid ${alpha(p.accent, 0.22)}`, fontSize: "0.68rem" }} />
                      <Typography variant="h5" sx={{ color: "#F5F0E8", mb: 1.5, fontSize: "1.05rem" }}>{p.title}</Typography>
                      <Typography sx={{ color: "#9A8F7A", fontSize: "0.85rem", lineHeight: 1.85, mb: 3 }}>{p.desc}</Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                        {p.tech.map(t => (
                          <Chip key={t} label={t} size="small" sx={{ background: "rgba(255,255,255,0.035)", color: "#9A8F7A", border: "1px solid rgba(255,255,255,0.07)", fontSize: "0.67rem" }} />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ TEAM ════════════════════════════════════════════════════════════ */}
        <Box id="team" sx={{ py: {}, background: "rgba(212,160,23,0.015)", borderTop: "1px solid rgba(212,160,23,0.07)" }}>
          <Container>
            <Box sx={{ mb: 8 }}>
              <SectionEyebrow>The People</SectionEyebrow>
              <GoldRule />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F5F0E8" }}>
                Meet the <Box component="span" sx={{ color: "#D4A017" }}>Team</Box>
              </Typography>
            </Box>
            <Grid container spacing={12} display={'flex'} flexDirection={'row'}>
              {TEAM.map(m => (
                <Grid item xs={12} sm={6} md={3} key={m.name} display={'flex'} flexDirection={'column'}>
                  <Card sx={{ textAlign: "center",width: '100%', transition: "all 0.35s ease", "&:hover": { transform: "translateY(-8px)", border: `1px solid ${alpha(m.color, 0.35)}`, boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 36px ${alpha(m.color, 0.09)}`  } }}>
                    <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                      <Avatar sx={{ width: 74, height: 74, mx: "auto", mb: 2.5, background: `linear-gradient(135deg, ${m.color}, ${alpha(m.color, 0.38)})`, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.35rem", color: "#0A0A0A", boxShadow: `0 0 28px ${alpha(m.color, 0.35)}` }}>
                        {m.avatar}
                      </Avatar>
                      <Typography variant="h6" sx={{ color: "#F5F0E8", mb: 0.5, fontSize: "1.02rem" }}>{m.name}</Typography>
                      <Typography sx={{ color: m.color, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", mb: 2 }}>{m.role}</Typography>
                      <Divider sx={{ borderColor: "rgba(212,160,23,0.09)", mb: 2 }} />
                      <Typography sx={{ color: "#9A8F7A", fontSize: "0.83rem", lineHeight: 1.78 }}>{m.bio}</Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2.5 }}>
                        {[LinkedInIcon, TwitterIcon, GitHubIcon].map((Icon, idx) => (
                          <IconButton key={idx} size="small" sx={{ color: "#9A8F7A", "&:hover": { color: m.color, background: alpha(m.color, 0.08) }, transition: "all 0.2s" }}>
                            <Icon sx={{ fontSize: 17 }} />
                          </IconButton>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ TESTIMONIALS ════════════════════════════════════════════════════ */}
        <Box id="testimonials" sx={{ py: { xs: 10, md: 15 } }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 8 }}>
              <SectionEyebrow>Client Voices</SectionEyebrow>
              <GoldRule />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F5F0E8" }}>
                What Our <Box component="span" sx={{ color: "#D4A017" }}>Clients Say</Box>
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {TESTIMONIALS.map(t => (
                <Grid item xs={12} md={4} key={t.name}>
                  <Card sx={{ height: "100%", transition: "all 0.35s ease", "&:hover": { transform: "translateY(-6px)", border: `1px solid ${alpha(t.color, 0.32)}` } }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Rating value={t.rating} readOnly size="small" sx={{ mb: 2.5, "& .MuiRating-iconFilled": { color: "#D4A017" }, "& .MuiRating-iconEmpty": { color: "rgba(212,160,23,0.18)" } }} />
                      <Typography sx={{ color: "#9A8F7A", fontSize: "0.92rem", lineHeight: 1.88, mb: 3.5, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>
                        "{t.text}"
                      </Typography>
                      <Divider sx={{ borderColor: "rgba(212,160,23,0.09)", mb: 2.5 }} />
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ background: `linear-gradient(135deg, ${t.color}, ${alpha(t.color, 0.38)})`, color: "#0A0A0A", fontWeight: 700, fontFamily: "'Playfair Display', serif", width: 42, height: 42, fontSize: "0.9rem" }}>{t.avatar}</Avatar>
                        <Box>
                          <Typography sx={{ color: "#F5F0E8", fontWeight: 600, fontSize: "0.87rem" }}>{t.name}</Typography>
                          <Typography sx={{ color: t.color, fontSize: "0.74rem" }}>{t.role}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ══ CTA BAND ════════════════════════════════════════════════════════ */}
        <Box sx={{ py: 12, background: "linear-gradient(135deg, rgba(212,160,23,0.07) 0%, rgba(20,16,8,0.4) 100%)", borderTop: "1px solid rgba(212,160,23,0.13)", borderBottom: "1px solid rgba(212,160,23,0.13)", textAlign: "center" }}>
          <Container maxWidth="md">
            <SectionEyebrow>Ready to Build?</SectionEyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3.2rem" }, color: "#F5F0E8", mb: 2.5 }}>
              Let's Turn Your Idea into a <Box component="span" sx={{ color: "#D4A017" }}>Product</Box>
            </Typography>
            <Typography sx={{ color: "#9A8F7A", mb: 5, fontSize: "0.98rem", maxWidth: 500, mx: "auto", lineHeight: 1.9 }}>
              Whether you need a new web app, a mobile product, or a ground-up redesign — we're ready to scope your project at no cost.
            </Typography>
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => goto("Contact")} sx={{ ...goldBtn, px: 6, py: 2, fontSize: "0.9rem", letterSpacing: "0.1em" }}>
              Get a Free Consultation
            </Button>
          </Container>
        </Box>

        {/* ══ CONTACT ═════════════════════════════════════════════════════════ */}
        <Box id="contact" sx={{ py: { xs: 10, md: 15 } }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 8 }}>
              <SectionEyebrow>Get In Touch</SectionEyebrow>
              <GoldRule />
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F5F0E8" }}>
                Start a <Box component="span" sx={{ color: "#D4A017" }}>Conversation</Box>
              </Typography>
            </Box>
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { icon: <EmailIcon />,      label: "Email",    value: "hr@fdevsol.com" },
                    { icon: <PhoneIcon />,      label: "Phone",    value: "+91 63097 59843"        },
                    { icon: <LocationOnIcon />, label: "Location", value: "Hyderabad, Telangana"   },
                  ].map(({ icon, label, value }) => (
                    <Box key={label} sx={{ display: "flex", gap: 2.5, alignItems: "flex-start" }}>
                      <Box sx={{ width: 46, height: 46, borderRadius: 2, flexShrink: 0, border: "1px solid rgba(212,160,23,0.22)", background: "rgba(212,160,23,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A017" }}>{icon}</Box>
                      <Box>
                        <Typography sx={{ color: "#9A8F7A", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.13em", mb: 0.3 }}>{label}</Typography>
                        <Typography sx={{ color: "#F5F0E8", fontSize: "0.88rem" }}>{value}</Typography>
                      </Box>
                    </Box>
                  ))}
                  <Box sx={{ pt: 0.5 }}>
                    <Typography sx={{ color: "#9A8F7A", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.13em", mb: 2 }}>Follow Us</Typography>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      {[LinkedInIcon, TwitterIcon, GitHubIcon].map((Icon, i) => (
                        <IconButton key={i} sx={{ border: "1px solid rgba(212,160,23,0.18)", color: "#9A8F7A", "&:hover": { color: "#D4A017", border: "1px solid rgba(212,160,23,0.5)", background: "rgba(212,160,23,0.06)", transform: "translateY(-2px)" }, transition: "all 0.2s" }}>
                          <Icon sx={{ fontSize: 17 }} />
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card sx={{ border: "1px solid rgba(212,160,23,0.14)" }}>
                  <Box sx={{ height: 2, background: "linear-gradient(90deg, #D4A017, transparent)" }} />
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    {sent ? (
                      <Box sx={{ textAlign: "center", py: 8 }}>
                        <CheckCircleIcon sx={{ color: "#D4A017", fontSize: 60, mb: 2 }} />
                        <Typography variant="h4" sx={{ color: "#F5F0E8", mb: 1.5 }}>Message Received</Typography>
                        <Typography sx={{ color: "#9A8F7A", fontSize: "0.93rem" }}>Thank you for reaching out. We will respond within one business day.</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} sx={inputSx} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} sx={inputSx} />
                          </Grid>
                        </Grid>
                        <TextField fullWidth label="Tell us about your project" multiline rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} sx={inputSx} />
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                            onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                            sx={{ ...goldBtn, px: 5, py: 1.6, letterSpacing: "0.08em" }}>
                            Send Message
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
        <Box sx={{ background: "#0C0C0C", borderTop: "1px solid rgba(212,160,23,0.1)", py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <FDevLogo size={36} />
                <Typography sx={{ color: "#9A8F7A", mt: 2.5, mb: 3, fontSize: "0.86rem", lineHeight: 1.95, maxWidth: 290 }}>
                  Premium web and mobile development from Hyderabad. We build products you're proud to ship.
                </Typography>
                <Typography sx={{ color: "#5A504A", fontSize: "0.76rem" }}>© {new Date().getFullYear()} FDev Solutions Pvt Ltd. All rights reserved.</Typography>
              </Grid>
              {[
                { title: "Services", items: ["Web Development","Mobile Apps","UI/UX Design","Backend & APIs","Performance Optimisation"] },
                { title: "Company",  items: ["About Us","Our Team","Portfolio","Careers","Contact"] },
              ].map(col => (
                <Grid item xs={6} md={2} key={col.title}>
                  <Typography sx={{ color: "#D4A017", fontWeight: 600, mb: 2.5, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{col.title}</Typography>
                  {col.items.map(item => (
                    <Typography key={item} sx={{ color: "#9A8F7A", fontSize: "0.83rem", mb: 1.5, cursor: "pointer", "&:hover": { color: "#D4A017" }, transition: "color 0.2s" }}>{item}</Typography>
                  ))}
                </Grid>
              ))}
              <Grid item xs={12} md={3}>
                <Typography sx={{ color: "#D4A017", fontWeight: 600, mb: 2.5, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Newsletter</Typography>
                <Typography sx={{ color: "#9A8F7A", fontSize: "0.83rem", mb: 2.5 }}>Monthly insights on web & mobile development.</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField size="small" placeholder="your@email.com" fullWidth sx={{ ...inputSx, "& input": { fontSize: "0.82rem" } }} />
                  <Button variant="contained" size="small" sx={{ ...goldBtn, flexShrink: 0, px: 2.2, boxShadow: "none" }}>Join</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Scroll to top */}
        <Fab size="small" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{ position: "fixed", bottom: 28, right: 28, background: "rgba(212,160,23,0.1)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.28)", backdropFilter: "blur(12px)", "&:hover": { background: "rgba(212,160,23,0.2)", transform: "translateY(-2px)" }, transition: "all 0.2s" }}>
          <KeyboardArrowUpIcon />
        </Fab>

      </Box>
    </ThemeProvider>
  );
}
