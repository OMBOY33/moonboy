// ==================== Dolphin AI v2 — Primitives ====================
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------------- NEURAL ARC (signature mark) ---------------- */
function NeuralArc({ animated = true, opacity = 1, scale = 1 }) {
  const w = 900, h = 600;
  const paths = [
    "M 40 500 Q 200 280 380 340 T 820 100",
    "M 80 440 Q 260 460 420 300 T 820 180",
    "M 120 380 Q 300 200 500 260 T 780 380",
  ];
  const nodes = [
    { x: 40, y: 500, r: 4 }, { x: 200, y: 350, r: 8 }, { x: 400, y: 320, r: 11 },
    { x: 580, y: 220, r: 6 }, { x: 820, y: 100, r: 14 },
    { x: 80, y: 440, r: 5 }, { x: 280, y: 440, r: 7 }, { x: 440, y: 290, r: 6 },
    { x: 640, y: 240, r: 5 }, { x: 820, y: 180, r: 8 },
    { x: 320, y: 230, r: 4 }, { x: 520, y: 260, r: 9 }, { x: 660, y: 320, r: 5 },
    { x: 500, y: 160, r: 3 }, { x: 700, y: 450, r: 4 }, { x: 240, y: 260, r: 3 },
  ];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "100%", overflow: "visible", transform: `scale(${scale})` }}>
      <defs>
        <filter id="na-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="na-stroke" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25"/>
          <stop offset="0.6" stopColor="var(--accent)" stopOpacity="1"/>
          <stop offset="1" stopColor="#F5B896"/>
        </linearGradient>
      </defs>
      <g opacity={opacity} filter="url(#na-glow)">
        <path d={paths[2]} fill="none" stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="1.5"/>
        <path d={paths[1]} fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="2"/>
        <path d={paths[0]} fill="none" stroke="url(#na-stroke)" strokeWidth="3.6" strokeLinecap="round"
          style={animated ? { strokeDasharray: 2600, animation: "arc-draw 5s ease-out both" } : {}}/>
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="var(--accent)"
            style={animated ? {
              animation: `node-pulse ${3 + (i%4)*0.6}s ease-in-out ${i*0.1}s infinite`,
              transformOrigin: `${n.x}px ${n.y}px`,
            } : {}}/>
        ))}
      </g>
    </svg>
  );
}

/* ---------------- CURSOR-REACTIVE HERO ARC ---------------- */
function HeroArc() {
  const ref = useRef(null);
  const tx = useRef(0), ty = useRef(0), cx = useRef(0), cy = useRef(0);
  useEffect(() => {
    const onMove = (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 24;
      const dy = (e.clientY / window.innerHeight - 0.5) * 18;
      tx.current = dx; ty.current = dy;
    };
    window.addEventListener("mousemove", onMove);
    let rafId;
    const tick = () => {
      cx.current += (tx.current - cx.current) * 0.06;
      cy.current += (ty.current - cy.current) * 0.06;
      if (ref.current) ref.current.style.transform = `translate3d(${cx.current}px, ${cy.current}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);
  return <div ref={ref} className="hero-arc-svg"><NeuralArc animated opacity={0.95}/></div>;
}

/* ---------------- STARFIELD ---------------- */
function Starfield({ density = 80 }) {
  const stars = useMemo(() => Array.from({length: density}, () => ({
    x: Math.random()*100, y: Math.random()*100,
    r: Math.random()*1.4+0.3, o: Math.random()*0.5+0.15,
    d: Math.random()*4+2, dl: Math.random()*4,
  })), [density]);
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}} viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.map((s,i)=>(
        <circle key={i} cx={s.x} cy={s.y} r={s.r*0.12} fill="var(--accent)" opacity={s.o}
          style={{animation:`twinkle ${s.d}s ease-in-out ${s.dl}s infinite`}}/>
      ))}
    </svg>
  );
}

/* ---------------- LOGO ---------------- */
function Logo({ size = 1 }) {
  return (
    <div className="logo" style={{transform:`scale(${size})`,transformOrigin:"left center"}}>
      <svg viewBox="0 0 80 54" className="logo-mark">
        <defs>
          <filter id="lg2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g filter="url(#lg2)">
          <path d="M 4 42 Q 20 20 36 28 T 72 10" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M 8 38 Q 26 44 40 28 T 74 18" fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round"/>
          {[[4,42,1.5],[20,30,2.2],[36,28,2.8],[54,18,2],[72,10,3.2],[26,42,1.5],[50,32,1.6],[64,24,1.8]].map((p,i)=>(
            <circle key={i} cx={p[0]} cy={p[1]} r={p[2]} fill="var(--accent)"/>
          ))}
        </g>
      </svg>
      <div className="logo-div"/>
      <div className="logo-wrap">
        <span className="logo-name">Dolphin</span>
        <span className="logo-sub">A&nbsp;I</span>
      </div>
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    {id:"approach",l:"Approach"},{id:"services",l:"Services"},{id:"sectors",l:"Sectors"},
    {id:"proof",l:"Proof"},{id:"team",l:"Team"}
  ];
  return (
    <nav className={`nav ${scrolled?"nav-scrolled":""}`}>
      <div className="nav-inner">
        <Logo/>
        <div className="nav-links">
          {items.map(i => (
            <a key={i.id} href={`#${i.id}`}
               className={`nav-link ${activeSection === i.id ? "nav-link-active" : ""}`}>{i.l}</a>
          ))}
        </div>
        <div className="nav-cta">
          <a className="nav-sign" href="#">Sign in</a>
          <button className="btn btn-primary btn-sm" data-magnet>Book a call</button>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const lines = ["Enabling AI.", "Empowering"];
  return (
    <section className="hero" id="top">
      <div className="hero-grain"/>
      <Starfield density={120}/>
      <div className="hero-arc-wrap"><HeroArc/></div>

      <div className="hero-inner">
        <div className="hero-eye"><div className="eyebrow"><span className="eyebrow-dot"/>AI consultancy · Sydney · Global</div></div>
        <h1 className="hero-title">
          <span className="hero-title-line">Enabling AI.</span>
          <span className="hero-title-line">Empowering <em>business<span className="hero-cursor"/></em></span>
        </h1>
        <p className="hero-sub">
          Dolphin AI guides organisations through every stage of AI adoption — from strategy
          and evaluation to implementation and scale.
        </p>
        <div className="hero-row">
          <button className="btn btn-primary" data-magnet>
            Book a strategy call
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg>
          </button>
          <button className="btn btn-ghost" data-magnet>View case studies</button>
        </div>
      </div>

      <div className="hero-ticker">
        <div className="hero-ticker-item">LIVE · 28 projects shipped</div>
        <div className="hero-ticker-item">43% avg cycle time saved</div>
        <div className="hero-ticker-item">13 senior practitioners</div>
        <div className="hero-ticker-item">7 sectors served</div>
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="hero-scroll-line"/>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const words = ["AI strategy", "Readiness audits", "LLM applications", "ML platforms",
    "Production pipelines", "Board-ready roadmaps", "Embedded teams", "Responsible AI",
    "Senior practitioners"];
  const items = [...words, ...words];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((w, i) => <span key={i} className="marquee-item">{w}</span>)}
      </div>
    </div>
  );
}

Object.assign(window, { NeuralArc, HeroArc, Starfield, Logo, Nav, Hero, Marquee });
