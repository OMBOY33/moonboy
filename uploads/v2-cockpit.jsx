// ==================== v2 — Cockpit + Proof + Reel ====================

/* ---------------- SECTOR COCKPIT ---------------- */
function SectorCockpit() {
  const sectors = [
    { name: "Travel & hospitality", kpi: "+20%", kpiLabel: "direct-channel conversion",
      desc: "Recommendation, pricing, and guest-experience AI that moves measurable topline at hotel groups and OLTA platforms.",
      chart: "travel", status: "5 live engagements" },
    { name: "Financial services", kpi: "43%", kpiLabel: "faster decisioning",
      desc: "Risk, collections, fraud and underwriting — inside the compliance envelope, with the model governance your regulators expect.",
      chart: "fs", status: "11 live engagements" },
    { name: "Professional services", kpi: "6.2×", kpiLabel: "analyst throughput",
      desc: "Retrieval, drafting and QA systems for law, accounting and consulting firms that amplify — not replace — senior judgement.",
      chart: "prof", status: "4 live engagements" },
    { name: "Retail & consumer", kpi: "28%", kpiLabel: "margin lift on SKU mix",
      desc: "Demand forecasting, assortment planning and personalisation built on your real operational data, not a demo dataset.",
      chart: "retail", status: "6 live engagements" },
    { name: "Public sector", kpi: "0", kpiLabel: "incidents since go-live",
      desc: "Responsible AI for government and NFP — privacy, fairness and auditability designed in from day one.",
      chart: "pub", status: "2 live engagements" },
  ];
  const [active, setActive] = useState(0);
  const s = sectors[active];

  return (
    <section className="section cockpit" id="sectors">
      <div className="cockpit-grid"/>
      <div className="section-inner section-wide">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-dot"/>Sectors</div>
          <h2 className="section-title">Sector-deep <em>expertise.</em></h2>
          <p className="section-lead">Pick a vertical and we'll tell you exactly how AI is being deployed there today — and where the real edges are.</p>
        </div>

        <div className="cockpit-layout">
          <div className="cockpit-list">
            {sectors.map((x, i) => (
              <button key={x.name}
                className={`cockpit-row ${i===active?"cockpit-row-active":""}`}
                onClick={()=>setActive(i)}>
                <span className="cockpit-num">0{i+1}</span>
                <span className="cockpit-name">{x.name}</span>
                <span className="cockpit-chev">
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                </span>
              </button>
            ))}
          </div>

          <div className="cockpit-panel">
            <div className="cockpit-panel-head">
              <div>
                <div className="cockpit-panel-title">{s.name}</div>
                <div className="cockpit-panel-desc">{s.desc}</div>
              </div>
              <div className="cockpit-status">{s.status}</div>
            </div>

            <div className="cockpit-dash">
              <div className="cockpit-chart">
                <div className="cockpit-chart-title">PERFORMANCE · 12-WEEK</div>
                <SectorChart kind={s.chart}/>
              </div>
              <div className="cockpit-side">
                <div className="cockpit-kpi">
                  <div className="cockpit-kpi-label">Headline outcome</div>
                  <div className="cockpit-kpi-val">{s.kpi}</div>
                  <div className="cockpit-kpi-delta">{s.kpiLabel}</div>
                </div>
                <div className="cockpit-kpi">
                  <div className="cockpit-kpi-label">Delivery confidence</div>
                  <div className="cockpit-kpi-val">A+</div>
                  <div className="cockpit-kpi-delta">n = {(active+1)*4} engagements</div>
                </div>
              </div>
            </div>

            <div className="cockpit-foot">
              <div className="cockpit-foot-note">DOLPHIN.AI · sector brief v3.2 · updated {new Date().toLocaleDateString()}</div>
              <button className="btn btn-outline btn-sm" data-magnet>
                View case studies
                <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectorChart({ kind }) {
  // stable-per-kind random data
  const data = useMemo(() => {
    const seed = kind.charCodeAt(0);
    const pts = [];
    for (let i = 0; i < 12; i++) {
      const base = 30 + ((seed + i*7) % 20);
      const trend = i * 3.2;
      const noise = Math.sin(i*1.3 + seed) * 8;
      pts.push(Math.max(10, Math.min(90, base + trend + noise)));
    }
    return pts;
  }, [kind]);
  const w = 600, h = 200;
  const maxV = 100;
  const stepX = w / (data.length - 1);
  const path = data.map((v, i) => `${i===0?"M":"L"} ${i*stepX} ${h - (v/maxV)*h}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg className="cockpit-chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`cc-${kind}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* grid */}
      {[0.25,0.5,0.75].map(g => (
        <line key={g} x1="0" x2={w} y1={h*g} y2={h*g} stroke="rgba(245,233,220,0.06)" strokeWidth="1"/>
      ))}
      <path d={area} fill={`url(#cc-${kind})`}/>
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
            style={{filter:"drop-shadow(0 0 6px var(--accent))"}}/>
      {data.map((v,i) => (
        <circle key={i} cx={i*stepX} cy={h - (v/maxV)*h} r={i === data.length-1 ? 5 : 2.5}
          fill="var(--accent)"
          style={i === data.length-1 ? {filter:"drop-shadow(0 0 8px var(--accent))"} : {}}/>
      ))}
    </svg>
  );
}

/* ---------------- KINETIC PROOF ---------------- */
function Proof() {
  const items = [
    { v: 43, suf: "%", label: "Avg. decision-cycle time saved", detail: "Across 11 FS engagements, measured 6 months post-launch." },
    { v: 28, suf: "%", label: "Margin lift on targeted SKU mix", detail: "Retail personalisation + dynamic assortment, measured vs. holdout." },
    { v: 6.2, suf: "×", label: "Analyst throughput at a Top-8 firm", detail: "Retrieval + drafting co-pilot used daily by 400+ professionals." },
    { v: 100, suf: "%", label: "Engagements transferred to client teams", detail: "We are paid to leave — and we always do, with full runbooks." },
  ];
  return (
    <section className="section proof" id="proof">
      <div className="section-inner">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-dot"/>Measured</div>
          <h2 className="section-title">Proof in <em>numbers.</em></h2>
          <p className="section-lead">Every number here is from a real engagement, measured after go-live. Ask us for the case study.</p>
        </div>

        <div className="proof-stage">
          {items.map((it, i) => <ProofRow key={i} index={i} {...it}/>)}
        </div>
      </div>
    </section>
  );
}

function ProofRow({ v, suf, label, detail, index }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = t => {
            const p = Math.min((t-start)/dur, 1);
            const eased = 1 - Math.pow(1-p, 3);
            setN(v * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [v]);
  const shown = v < 10 ? n.toFixed(1) : Math.round(n);
  return (
    <div className="proof-row" ref={ref}>
      <div className="proof-row-index">0{index+1}</div>
      <div className="proof-row-value">{shown}<span className="suf">{suf}</span></div>
      <div className="proof-row-sparkwrap">
        <svg viewBox="0 0 180 40" style={{width:"100%",height:"100%"}}>
          <path d={`M 0 ${30 + Math.sin(index)*4} Q 45 ${12 + index*3} 90 ${18 + (index%2)*6} T 180 ${6 + index*2}`}
            fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/>
          {[0,45,90,135,180].map((x,i)=>(
            <circle key={i} cx={x} cy={20 + Math.sin((i+index)*1.2)*8} r={i===4?3:1.6} fill="var(--accent)"/>
          ))}
        </svg>
      </div>
      <div className="proof-row-body" style={{gridColumn: 2, gridRow: 2}}>
        <div className="proof-row-label">{label}</div>
        <div className="proof-row-detail">{detail}</div>
      </div>
    </div>
  );
}

/* ---------------- TEAM REEL ---------------- */
function TeamReel() {
  const people = [
    { name: "Rohan Mehta", role: "Principal · ex-Palantir, ex-Atlassian", year: "FOUNDING", stat: "11y", statLabel: "shipping ML in prod" },
    { name: "Léa Bernard", role: "Head of ML · ex-DeepMind research", year: "2024", stat: "40+", statLabel: "papers & patents" },
    { name: "Kenji Tanaka", role: "Eng lead · platforms & MLOps", year: "2024", stat: "12y", statLabel: "production engineer" },
    { name: "Aisha Okafor", role: "Strategy · ex-McKinsey Digital", year: "2024", stat: "$2.1B", statLabel: "in client decisions shaped" },
    { name: "Marcus Hale", role: "Applied scientist · evaluation & safety", year: "2025", stat: "0", statLabel: "incidents in 2 years" },
    { name: "Priya Venkat", role: "Design lead · AI product surfaces", year: "2025", stat: "14", statLabel: "AI products to GA" },
  ];
  const [idx, setIdx] = useState(0);
  const max = people.length - 3;
  const canPrev = idx > 0;
  const canNext = idx < max;

  return (
    <section className="section reel" id="team">
      <div className="section-inner">
        <div className="reel-head">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"/>The team</div>
            <h2 className="section-title" style={{marginTop:16}}>Built by practitioners, <em>for practitioners.</em></h2>
            <p className="section-lead" style={{marginTop:16}}>
              No layers, no juniors-on-juniors, no hand-offs. You work directly with the
              senior people whose names are on the engagement.
            </p>
          </div>
          <div className="reel-controls">
            <button className="reel-btn" onClick={()=>setIdx(i=>Math.max(0,i-1))} disabled={!canPrev}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M11 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
            <button className="reel-btn" onClick={()=>setIdx(i=>Math.min(max,i+1))} disabled={!canNext}>
              <svg viewBox="0 0 16 16" width="16" height="16"><path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        <div className="reel-track-wrap">
          <div className="reel-track" style={{transform: `translateX(calc(${-idx} * (360px + 20px)))`}}>
            {people.map((p, i) => (
              <div key={p.name} className="reel-card">
                <div className="reel-card-arc"><NeuralArc animated={false} opacity={0.8}/></div>
                <div className="reel-card-tag">{p.year}</div>
                <div className="reel-card-year" style={{right:24,top:24,left:"auto"}}>0{i+1}</div>
                <div className="reel-card-name">{p.name}</div>
                <div className="reel-card-role">{p.role}</div>
                <div className="reel-card-stat">
                  <div className="reel-card-stat-v">{p.stat}</div>
                  <div className="reel-card-stat-l">{p.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectorCockpit, Proof, TeamReel });
