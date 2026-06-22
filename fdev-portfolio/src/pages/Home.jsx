import { useState, useEffect, useRef } from "react";

import logo from "../asscets/logo.png";


// ─── Utility: clamp ───────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ─── Mouse-tracking 3D tilt hook ─────────────────────────────────
function useTilt(strength = 15) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = e.clientX - cx;
      const my = e.clientY - cy;
      setTilt({
        rx: clamp((-my / (rect.height / 2)) * strength, -strength, strength),
        ry: clamp((mx / (rect.width / 2)) * strength, -strength, strength),
      });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return { ref, tilt };
}

// ─── Floating particles background ───────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 120;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      // color split: green vs gold
      kind: Math.random() > 0.55 ? "gold" : "green",
    }));

    const GREEN = { r: 16, g: 185, b: 129 }; // #10b981
    const GOLD = { r: 245, g: 158, b: 11 }; // #f59e0b

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const c = p.kind === "gold" ? GOLD : GREEN;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const a = 0.15 * (1 - dist / 120);
            // blend based on first particle
            const c = particles[i].kind === "gold" ? GOLD : GREEN;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────
function TiltCard({ children, style = {}, className = "" }) {
  const { ref, tilt } = useTilt(12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        perspective: "800px",
        ...style,
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          setVal(Math.round(t * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Nav ──────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Services", "Work", "Stats", "Team", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: -10,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
          background: scrolled
          ? "rgba(1, 12, 9, 0.85)"
          : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(4, 35, 11, 0.25)" : "none",
          transition: "all 0.4s ease",
        }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: 74,
            width: 74,
            objectFit: "contain",
            flex: "0 0 auto",
            marginTop: "-10"
          }}
        />
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            background: "linear-gradient(90deg,#10b981,#f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
            color: "white",
          }}
        >
          FDEV Solutions Pvt Ltd<span style={{ WebkitTextFillColor: "#fff" }}>.</span>
        </div>
      </div>



      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="desktop-nav"
      >
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              style={{
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "0.9rem",
                letterSpacing: "0.05em",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#10b981")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.75)")}
            >
              {l}
            </a>

          </li>
        ))}
      </ul>

      <a
        href="#contact"
        style={{
          padding: "0.5rem 1.4rem",
          background: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
          color: "#fff",
          borderRadius: "50px",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: 600,
          boxShadow: "0 4px 20px rgba(2, 13, 7, 0.4)",
          transition: "transform 0.2s,box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 6px 28px rgba(139,92,246,0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 20px rgba(139,92,246,0.4)";
        }}
      >
        Hi
      </a>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    let id;
    const tick = () => {
      setAngle((a) => a + 0.3);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "6rem 2rem 4rem",
        overflow: "hidden",
      }}
    >
      {/* Rotating gradient orb */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: `conic-gradient(from ${angle}deg, #10b981, #f59e0b, #fbbf24, #10b981)`,
          filter: "blur(100px)",
          opacity: 0.16,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />


      {/* Floating 3D ring */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          border: "2px solid rgba(139,92,246,0.3)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) rotateX(70deg) rotateZ(${angle * 0.5}deg)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          border: "1px solid rgba(6,182,212,0.2)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) rotateX(70deg) rotateZ(${-angle * 0.8}deg)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            display: "inline-block",
            padding: "0.3rem 1rem",
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
            borderRadius: "50px",
            color: "#a78bfa",
            fontSize: "0.78rem",
            letterSpacing: "0.15em",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          ✦ FDEV Develop Your Future
        </div>


        <h1
          style={{
            fontSize: "clamp(3rem,8vw,6.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 1.5rem",
            letterSpacing: "-2px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg,#fff 0%,#fde68a 45%,#f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We Build
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#10b981,#f59e0b,#fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digital Futures
          </span>
        </h1>


        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1.15rem",
            maxWidth: "540px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Crafting immersive digital experiences that push boundaries,
          combining cutting-edge technology with extraordinary design.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#work"
            style={{
              padding: "0.85rem 2.2rem",
              background: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
              color: "#fff",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              boxShadow: "0 8px 32px rgba(139,92,246,0.5)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 12px 40px rgba(139,92,246,0.7)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 32px rgba(139,92,246,0.5)";
            }}
          >
            View Our Work →
          </a>
          <a
            href="#services"
            style={{
              padding: "0.85rem 2.2rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.05)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0.5,
        }}
      >
        <span style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: "0.15em" }}>SCROLL</span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background: "linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)",
          }}
        />
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────
const services = [
  {
    icon: "⬡",
    title: "3D Web Experiences",
    desc: "Interactive Three.js and WebGL environments that blur the line between web and reality.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    icon: "◈",
    title: "AI-Powered Products",
    desc: "Integrating cutting-edge LLMs and ML models into products that think alongside users.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
  },
  {
    icon: "✦",
    title: "Motion & Design",
    desc: "Bespoke animation systems and design languages that move with intention and precision.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    icon: "◉",
    title: "Web3 & Blockchain",
    desc: "Smart contracts, NFT platforms, and decentralized applications built for scale.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
  },
  {
    icon: "⧫",
    title: "Cloud Architecture",
    desc: "Resilient, auto-scaling infrastructure designed to handle millions of users.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    icon: "⊛",
    title: "Brand Identity",
    desc: "Visual identities that communicate personality and carry meaning across every touchpoint.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
  },
];

function Services() {
  return (
    <section
      id="services"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#10b981", fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.8rem" }}>
            WHAT WE DO
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Services that{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#10b981,#f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              scale
            </span>
          </h2>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map((s) => (
            <TiltCard key={s.title}>
              <div
                style={{
                  padding: "2rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  cursor: "default",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.color + "55";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${s.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Glow corner */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100px",
                    height: "100px",
                    background: s.color,
                    opacity: 0.06,
                    filter: "blur(40px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    fontSize: "2rem",
                    color: s.color,
                    marginBottom: "1.2rem",
                    display: "block",
                    textShadow: `0 0 20px ${s.color}`,
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    margin: "0 0 0.8rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio / Work ─────────────────────────────────────────────
const projects = [
  {
    title: "Nebula OS",
    cat: "3D Interface",
    color: "#8b5cf6",
    bg: "linear-gradient(135deg,#1e1b4b,#312e81)",
    emoji: "🌌",
  },
  {
    title: "ArcLight",
    cat: "Motion Design",
    color: "#06b6d4",
    bg: "linear-gradient(135deg,#0c4a6e,#0e7490)",
    emoji: "⚡",
  },
  {
    title: "Prisma AI",
    cat: "AI Product",
    color: "#ec4899",
    bg: "linear-gradient(135deg,#500724,#9d174d)",
    emoji: "🧠",
  },
  {
    title: "Vertex",
    cat: "Web3 Platform",
    color: "#f59e0b",
    bg: "linear-gradient(135deg,#451a03,#92400e)",
    emoji: "◆",
  },
];

function Work() {
  return (
    <section
      id="work"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#8b5cf6", fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.8rem" }}>
            SELECTED WORK
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Projects that{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#ec4899,#8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              inspire
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((p) => (
            <TiltCard key={p.title} strength={10}>
              <div
                style={{
                  background: p.bg,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "24px",
                  padding: "2.5rem 2rem",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5)`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    fontSize: "3rem",
                    opacity: 0.3,
                  }}
                >
                  {p.emoji}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.8rem",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "50px",
                    color: "#fff",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    marginBottom: "0.8rem",
                    width: "fit-content",
                  }}
                >
                  {p.cat}
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {p.title}
                </h3>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────
const stats = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Team Members" },
];

function Stats() {
  return (
    <section
      id="stats"
      style={{
        padding: "6rem 2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(6,182,212,0.1))",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: "32px",
          padding: "4rem 2rem",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG glow */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle,rgba(139,92,246,0.2),transparent)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "3rem",
            position: "relative",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(2.5rem,5vw,4rem)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg,#fff,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────
const team = [
  { name: "Shiva", role: "Creative Director", avatar: "S", color: "#8b5cf6" },
  { name: "Mahesh", role: "Lead Engineer", avatar: "M", color: "#06b6d4" },
  { name: "Kamal", role: "Manager", avatar: "K", color: "#ec4899" },
  { name: "Soni", role: "HR manager", avatar: "S", color: "#f59e0b" },
];

function Team() {
  return (
    <section
      id="team"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Company images above team */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "2.8rem",
            opacity: 0.95,
          }}
        >
          <div
            style={{
              width: 260,
              height: 195,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={require("../asscets/ecommerce.jpg")}
              alt="Company"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 260,
              height: 195,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={require("../asscets/arcimage.jpg")}
              alt="Company"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 260,
              height: 195,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={require("../asscets/image1.jpeg")}
              alt="Company"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 260,
              height: 195,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={require("../asscets/image2.jpeg")}
              alt="Company"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#8b5cf6", fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.8rem" }}>
            THE TEAM
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Minds behind the{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#06b6d4,#8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              magic
            </span>
          </h2>
        </div>


        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: "1.5rem",
          }}
        >
          {team.map((m) => (
            <TiltCard key={m.name}>
              <div
                style={{
                  padding: "2rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  textAlign: "center",
                  transition: "border-color 0.3s,box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = m.color + "55";
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg,${m.color},${m.color}88)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.2rem",
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#fff",
                    boxShadow: `0 8px 24px ${m.color}55`,
                  }}
                >
                  {m.avatar}
                </div>
                <h3 style={{ color: "#fff", fontWeight: 700, margin: "0 0 0.3rem", fontSize: "1.05rem" }}>
                  {m.name}
                </h3>
                <p style={{ color: m.color, fontSize: "0.82rem", fontWeight: 600, margin: 0, letterSpacing: "0.05em" }}>
                  {m.role}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
  };

  return (
    <section
      id="contact"
      style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ color: "#8b5cf6", fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "0.8rem" }}>
            GET IN TOUCH
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Start your{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#8b5cf6,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              project
            </span>
          </h2>
        </div>

        {sent ? (
          <div
            style={{
              padding: "3rem",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.4)",
              borderRadius: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem", margin: "0 0 0.5rem" }}>Message Sent!</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
              We'll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <div
            style={{
              padding: "2.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {[
              { key: "name", label: "Your Name", type: "text", placeholder: "Jane Smith" },
              { key: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
            ].map((f) => (
              <div key={f.key}>
                <label
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.2rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            ))}
            <div>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                Your Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your project…"
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.2rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <button
              onClick={submit}
              style={{
                padding: "1rem",
                background: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(139,92,246,0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(139,92,246,0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(139,92,246,0.4)";
              }}
            >
              Send Message →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "2.5rem 2rem",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: "1.2rem",
          background: "",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "#e5dd3d",
          marginBottom: "0.8rem",
        }}
      >
        FDEV Solutions PVT LTD.
      </div>

      <p style={{ color: "#c1b928", fontSize: "0.82rem", margin: 0, fontWeight: 500}}>
        Gmail: hr@fdevsol.com  || Contact : 6309759843
      </p>

      {/* Social media link */}
      <div style={{ marginTop: "0.8rem" }} >
        <a
          href="https://www.instagram.com/fdevsolution99?igsh=MzRlODBiNWFlZA=="
          target="_blank"
          rel="noreferrer"
          style={{
            color: "rgba(255,255,255,0.75)",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "0.4rem 0.9rem",
            borderRadius: 999,
            display: "inline-block",
            backgroundColor: "#ed6969"
          }}
        >
          Follow us on Instagram
        </a>
                <a
          href="https://www.linkedin.com/in/future-developer-07b29a3aa?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "rgba(255,255,255,0.75)",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "0.4rem 0.9rem",
            borderRadius: 999,
            display: "inline-block",
            backgroundColor: "#34c7ca"
          }}
        >
          Follow us on LinkedIn
        </a>
                <a
          href="https://www.facebook.com/share/1EF7rawbmi/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "rgba(255,255,255,0.75)",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "1px solid rgba(8, 170, 228, 0.12)",
            padding: "0.4rem 0.9rem",
            borderRadius: 999,
            display: "inline-block",
            backgroundColor: "blue",
          }}
        >
          Follow us on Facebook
        </a>
      </div>

      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", margin: 0, marginTop: "0.9rem" }}>
        © 2026 Fdev Solutions, Platform to Develop your career.
      </p>
    </footer>
  );
}


// ─── Root ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      style={{
        background: "#04110c",
        minHeight: "100vh",
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <ParticleField />
      <Nav />
      <Hero />
      <Services />
      <Work />
      <Stats />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
