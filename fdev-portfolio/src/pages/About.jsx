import { useEffect, useRef, useState } from "react";

// ─── Keyframe injection ───────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --forest:   #0a1f0a;
    --moss:     #1a3a1a;
    --neon:     #39ff85;
    --neon-dim: rgba(57,255,133,0.15);
    --glass:    rgba(255,255,255,0.06);
    --text:     #e8f5e9;
    --muted:    rgba(232,245,233,0.55);
  }

  body { background: var(--forest); }

  @keyframes floatY {
    0%,100% { transform: translateY(0px) rotateX(0deg); }
    50%      { transform: translateY(-18px) rotateX(4deg); }
  }
  @keyframes rotateOrb {
    from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.8); opacity: 0.9; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes gridPan {
    from { background-position: 0 0; }
    to   { background-position: 60px 60px; }
  }
  @keyframes scanline {
    0%   { top: -8%; }
    100% { top: 108%; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes borderGlow {
    0%,100% { box-shadow: 0 0 20px rgba(57,255,133,0.3), inset 0 0 20px rgba(57,255,133,0.05); }
    50%      { box-shadow: 0 0 50px rgba(57,255,133,0.6), inset 0 0 40px rgba(57,255,133,0.12); }
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated particle field */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = 80;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(57,255,133,0.5)";
        ctx.fill();
      });
      // connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(57,255,133,${0.12 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/** 3-D tilt card */
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(800px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.03)`;
  };
  const handleLeave = () => { ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)"; };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: "transform 0.2s ease",
        transformStyle: "preserve-3d",
        borderRadius: 20,
        background: "rgba(255,255,255,0.055)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(57,255,133,0.18)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        ...style,
      }}
    >
      {/* inner shine layer */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(57,255,133,0.08) 0%, transparent 60%)",
      }} />
      {children}
    </div>
  );
}

/** Animated stat counter */
function StatCounter({ value, label, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => {
        const target = parseInt(value, 10);
        const step = Math.ceil(target / 40);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          setCount(cur);
          if (cur >= target) clearInterval(t);
        }, 30);
      }, delay);
    }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} style={{ textAlign: "center", animation: `countUp 0.6s ease ${delay}ms both` }}>
      <div style={{
        fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800,
        fontFamily: "'Syne', sans-serif",
        background: "linear-gradient(135deg, #39ff85, #00c6a0)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        lineHeight: 1,
      }}>
        {count}{value.includes("+") ? "+" : value.includes("%") ? "%" : ""}
      </div>
      <div style={{ color: "rgba(232,245,233,0.55)", fontSize: "0.85rem", marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

/** Orbiting dot decoration */
function OrbRing({ size = 160, speed = "8s", neonOpacity = 0.5 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: `1px dashed rgba(57,255,133,${neonOpacity * 0.4})`,
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 10, height: 10, borderRadius: "50%",
        background: "#39ff85",
        boxShadow: "0 0 12px #39ff85",
        animation: `rotateOrb ${speed} linear infinite`,
        marginLeft: -5, marginTop: -5,
      }} />
      <div style={{
        position: "absolute", inset: "15%", borderRadius: "50%",
        border: `1px solid rgba(57,255,133,${neonOpacity * 0.25})`,
      }} />
      {/* Pulse rings */}
      {[0, 0.5, 1].map(d => (
        <div key={d} style={{
          position: "absolute", inset: "25%", borderRadius: "50%",
          border: "1px solid rgba(57,255,133,0.4)",
          animation: `pulseRing 3s ease-out ${d}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function About() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const pillars = [
    {
      icon: "⬡",
      title: "Web Development",
      body: "Next-gen React, Vue & Node architectures — built for millions of users and millisecond responses.",
    },
    {
      icon: "◈",
      title: "Mobile Apps",
      body: "Cross-platform iOS & Android experiences that feel native on every device.",
    },
    {
      icon: "⌬",
      title: "Cloud & DevOps",
      body: "Zero-downtime deployments, Kubernetes orchestration, and cost-optimised AWS/GCP pipelines.",
    },
    {
      icon: "◉",
      title: "Enterprise Software",
      body: "Modular, compliant systems that evolve with your business without accumulating technical debt.",
    },
  ];

  const values = [
    { heading: "Our Mission", text: "Empower businesses through innovative technology that drives measurable growth and meaningful digital transformation.", accent: "#39ff85" },
    { heading: "Our Vision", text: "To be the preferred technology partner for forward-thinking companies seeking reliable, cutting-edge digital solutions.", accent: "#00c6a0" },
  ];

  return (
    <>
      <style>{CSS}</style>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "linear-gradient(170deg, #061006 0%, #021202 40%, #0d1117 100%)",
        minHeight: "100vh",
        color: "#e8f5e9",
        overflowX: "hidden",
        position: "relative",
      }}>

        {/* ── Animated grid background ── */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `linear-gradient(rgba(57,255,133,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(57,255,133,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "gridPan 20s linear infinite",
        }} />

        {/* ── Scanline effect ── */}
        <div style={{
          position: "fixed", left: 0, right: 0, height: "8%", pointerEvents: "none", zIndex: 1,
          background: "linear-gradient(transparent, rgba(57,255,133,0.03), transparent)",
          animation: "scanline 8s linear infinite",
        }} />

        {/* ═══════════════════════════════════
            HERO
        ═══════════════════════════════════ */}
        <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", zIndex: 2 }}>
          <ParticleField />

          {/* large glowing orb bg */}
          <div style={{
            position: "absolute", top: "10%", right: "-15%", width: 560, height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(57,255,133,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }} />

          <div style={{
            position: "relative", maxWidth: 1200, margin: "0 auto",
            padding: "8rem 2rem 4rem",
            display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap",
          }}>
            {/* Text */}
            <div style={{ flex: "1 1 420px", opacity: visible ? 1 : 0, animation: "fadeSlideUp 0.9s ease 0.1s both" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(57,255,133,0.1)", border: "1px solid rgba(57,255,133,0.3)",
                borderRadius: 40, padding: "6px 18px", marginBottom: "1.4rem",
                fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#39ff85",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#39ff85", display: "inline-block", boxShadow: "0 0 8px #39ff85" }} />
                Software Excellence Since 2018
              </div>

              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                fontWeight: 800, lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}>
                About{" "}
                <span style={{
                  background: "linear-gradient(135deg, #39ff85 0%, #00c6a0 50%, #39ff85 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}>
                  FDEV Solution
                </span>
              </h1>

              <p style={{ color: "rgba(232,245,233,0.65)", fontSize: "clamp(1rem,1.5vw,1.15rem)", lineHeight: 1.85, maxWidth: 520 }}>
                A leading software development company delivering modern, scalable, and secure applications —
                transforming bold ideas into high-quality digital products that businesses actually love.
              </p>
            </div>

            {/* Orb visual */}
            <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", animation: "floatY 6s ease-in-out infinite" }}>
              <OrbRing size={220} speed="9s" neonOpacity={0.7} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            STATS BAR
        ═══════════════════════════════════ */}
        <section style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(57,255,133,0.12)",
          borderBottom: "1px solid rgba(57,255,133,0.12)",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(12px)",
          padding: "3rem 2rem",
        }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "2.5rem",
          }}>
            <StatCounter value="150+" label="Projects Delivered" delay={0} />
            <StatCounter value="40+"  label="Enterprise Clients"  delay={100} />
            <StatCounter value="98"   label="% Client Satisfaction" delay={200} />
            <StatCounter value="7"    label="Years of Excellence"  delay={300} />
          </div>
        </section>

        {/* ═══════════════════════════════════
            MISSION & VISION
        ═══════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "#39ff85", letterSpacing: "0.14em", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: 12 }}>
                Why We Exist
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800 }}>
                Purpose & Direction
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {values.map(({ heading, text, accent }) => (
                <TiltCard key={heading} style={{ animation: "borderGlow 4s ease-in-out infinite" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${accent}22`, border: `1px solid ${accent}55`, display: "grid", placeItems: "center" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 10px ${accent}` }} />
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", fontWeight: 700 }}>{heading}</h3>
                  </div>
                  <p style={{ color: "rgba(232,245,233,0.65)", lineHeight: 1.8 }}>{text}</p>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    borderRadius: "0 0 20px 20px",
                  }} />
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            PILLARS / SERVICES
        ═══════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 2, padding: "2rem 2rem 7rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "#39ff85", letterSpacing: "0.14em", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: 12 }}>
                Core Capabilities
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800 }}>
                What We Build
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.6rem" }}>
              {pillars.map(({ icon, title, body }, i) => (
                <TiltCard key={title} style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: "rgba(57,255,133,0.1)",
                    border: "1px solid rgba(57,255,133,0.25)",
                    display: "grid", placeItems: "center",
                    fontSize: "1.5rem", marginBottom: "1.1rem",
                    color: "#39ff85",
                  }}>
                    {icon}
                  </div>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.6rem" }}>{title}</h4>
                  <p style={{ color: "rgba(232,245,233,0.55)", lineHeight: 1.75, fontSize: "0.92rem" }}>{body}</p>
                  {/* corner accent */}
                  <div style={{
                    position: "absolute", top: 0, right: 0, width: 60, height: 60,
                    background: "radial-gradient(circle at top right, rgba(57,255,133,0.12), transparent 70%)",
                    borderRadius: "0 20px 0 0",
                    pointerEvents: "none",
                  }} />
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            CTA STRIP
        ═══════════════════════════════════ */}
        <section style={{
          position: "relative", zIndex: 2,
          padding: "5rem 2rem",
          borderTop: "1px solid rgba(57,255,133,0.1)",
          background: "rgba(0,0,0,0.3)",
        }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Ready to build something{" "}
              <span style={{
                background: "linear-gradient(135deg,#39ff85,#00c6a0)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>remarkable?</span>
            </h2>
            <p style={{ color: "rgba(232,245,233,0.55)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
              Partner with FDEV to turn your vision into production-grade software — on time, on budget, and built to last.
            </p>
            <button
              style={{
                padding: "1rem 2.8rem", borderRadius: 50, border: "none",
                background: "linear-gradient(135deg, #39ff85, #00c6a0)",
                color: "#021d02", fontWeight: 700, fontSize: "1rem",
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: "pointer", letterSpacing: "0.04em",
                boxShadow: "0 0 30px rgba(57,255,133,0.35), 0 4px 20px rgba(0,0,0,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.target.style.transform = "scale(1.06)"; e.target.style.boxShadow = "0 0 50px rgba(57,255,133,0.6), 0 4px 20px rgba(0,0,0,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 30px rgba(57,255,133,0.35), 0 4px 20px rgba(0,0,0,0.4)"; }}
            >
              Start a Project →
            </button>
          </div>
        </section>

      </div>
    </>
  );
}
