// ==================== v2 — Mid sections ====================

/* ---------------- ENGAGEMENT TAPE ---------------- */
function EngagementTape() {
  const [step, setStep] = useState(1);
  const stages = [
    {
      tag: "Stage 01 · Discover",
      label: "Discover",
      title: "A 3-week diagnostic your board can defend.",
      desc: "We pressure-test your data, tooling, talent and ops — then rank every AI opportunity against expected value and ease of delivery.",
      meta: [["Duration", "3 weeks"], ["Cost", "Fixed fee"], ["Output", "Ranked roadmap"]],
    },
    {
      tag: "Stage 02 · Define",
      label: "Define",
      title: "Where AI creates durable advantage — and where it doesn't.",
      desc: "Executive-level sprints to commit on OKRs, governance and the 2-3 bets worth real capital. Written down. Publicly owned.",
      meta: [["Duration", "4–6 weeks"], ["Format", "Exec offsite"], ["Output", "Quarterly OKRs"]],
    },
    {
      tag: "Stage 03 · Deliver",
      label: "Deliver",
      title: "Senior engineers embedded, shipping to your stack.",
      desc: "Our pod works inside your codebase, your compliance envelope, your CI. We are paid to leave — and we always do, with full runbooks.",
      meta: [["Duration", "8–16 weeks"], ["Model", "Embedded pod"], ["Handover", "Fully transferred"]],
    },
  ];
  const active = stages[step - 1];

  return (
    <section className="section tape" id="approach">
      <div className="section-inner">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-dot"/>Our approach</div>
          <h2 className="section-title">Three stages. One outcome <em>that moves the needle.</em></h2>
          <p className="section-lead">Every engagement starts with a hypothesis tied to a specific P&amp;L line, and ends with a measured result your board can cite. Scrub through to see what happens at each stage.</p>
        </div>

        <div className="tape-rail">
          <div className="tape-track">
            <div className="tape-fill" style={{ width: `${((step-1)/2)*100}%` }}/>
          </div>
          <div className="tape-steps">
            {stages.map((s, i) => (
              <button key={i}
                className={`tape-step ${step === i+1 ? "tape-step-active" : ""} ${step > i+1 ? "tape-step-done" : ""}`}
                onClick={()=>setStep(i+1)}>
                <div className="tape-dot">{i+1}</div>
                <div className="tape-step-label">{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="tape-content">
          <div className="tape-copy">
            <div className="tape-stage">{active.tag}</div>
            <h3>{active.title}</h3>
            <p>{active.desc}</p>
            <div className="tape-meta">
              {active.meta.map(([k,v]) => (
                <div key={k} className="tape-meta-item">
                  <span className="tape-meta-key">{k}</span>
                  <span className="tape-meta-val">{v}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:12}}>
              {step > 1 && <button className="btn btn-ghost" onClick={()=>setStep(s=>s-1)}>← Back</button>}
              {step < 3 && <button className="btn btn-primary" onClick={()=>setStep(s=>s+1)} data-magnet>
                Next stage
                <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg>
              </button>}
            </div>
          </div>

          <TapeArtifact step={step}/>
        </div>
      </div>
    </section>
  );
}

function TapeArtifact({ step }) {
  if (step === 1) {
    const rows = [
      { tag: "HIGH", label: "Call-centre co-pilot · 312% ROI", w: 92 },
      { tag: "MED",  label: "SKU demand forecasting", w: 74 },
      { tag: "MED",  label: "Contract QA retrieval", w: 68 },
      { tag: "LOW",  label: "Generative marketing copy", w: 38 },
    ];
    return (
      <div className="tape-artifact">
        <div className="tape-artifact-grid"/>
        <div className="tape-artifact-label">ROADMAP.ranked</div>
        <div className="tape-artifact-content">
          {rows.map((r, i) => (
            <div key={i} className="tape-roadmap-row">
              <span className="tape-roadmap-tag">{r.tag}</span>
              <div>
                <div style={{fontSize:13, marginBottom:6}}>{r.label}</div>
                <div className="tape-bar-track"><div className="tape-bar-fill" style={{width:`${r.w}%`}}/></div>
              </div>
              <span className="tape-roadmap-score">{r.w}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="tape-artifact">
        <div className="tape-artifact-grid"/>
        <div className="tape-artifact-label">OKR · Q3 FY26</div>
        <div className="tape-artifact-content">
          <div className="tape-okr">
            <div className="tape-okr-head">Objective</div>
            <div className="tape-okr-objective">Cut average handle time in the call-centre by 25%.</div>
            {[
              "Ship co-pilot to 30% of agents",
              "Achieve 90% QA pass rate on drafts",
              "Reduce escalations by 400 tickets/wk",
            ].map(kr => (
              <div key={kr} className="tape-okr-kr">
                <span className="tape-okr-check">
                  <svg viewBox="0 0 16 16" width="10" height="10"><path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                {kr}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="tape-artifact">
      <div className="tape-artifact-grid"/>
      <div className="tape-artifact-label">DEPLOY · production</div>
      <div className="tape-artifact-content">
        <div className="tape-ship">
          <div className="tape-ship-badge">
            <svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 12l5 5 9-11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div className="tape-ship-title">co-pilot v1.0</div>
            <div className="tape-ship-sub">Shipped · 2 days ago · 412 active agents</div>
          </div>
        </div>
        <div className="tape-terminal">
          <div><span className="prompt">$</span> dolphin deploy copilot --env prod</div>
          <div><span className="ok">✓</span> build: 1.24s · 17 artifacts</div>
          <div><span className="ok">✓</span> eval: 92.1% pass rate (baseline 76%)</div>
          <div><span className="ok">✓</span> canary: 5% → 100% in 48h</div>
          <div><span className="ok">✓</span> handover: runbook + on-call rota</div>
          <div style={{color:"var(--peach)"}}>→ owning team: internal_platforms@client</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SERVICES ORBIT ---------------- */
function ServicesOrbit() {
  const services = [
    { key: "strategy", label: "AI strategy", angle: -70,
      title: "AI strategy",
      desc: "Executive clarity on where, when and how to invest in AI across the enterprise — defensible against your board, your regulator, and your CFO.",
      bullets: ["Opportunity portfolios", "Make vs. buy vs. partner", "Budget & capital allocation", "Org & talent design"],
    },
    { key: "audit", label: "Readiness", angle: 20,
      title: "Readiness audits",
      desc: "Honest, evidence-based evaluation of your data, tooling and organisational capacity — with a ranked backlog you can act on Monday.",
      bullets: ["Data & infra assessment", "Risk & governance baseline", "Capability gap analysis", "Vendor rationalisation"],
    },
    { key: "build", label: "Engineering", angle: 110,
      title: "Solution engineering",
      desc: "Senior practitioners building production AI — LLM apps, agents, classical ML, data platforms — inside your stack, under your governance.",
      bullets: ["LLM & agent systems", "Classical & deep ML", "Evaluation & observability", "Platform & MLOps"],
    },
    { key: "enable", label: "Enablement", angle: 200,
      title: "Enablement",
      desc: "We transfer capability as we go. Your team leaves owning the system, the runbooks, and the on-call rota — not renting them from us.",
      bullets: ["Pair-delivery from day one", "Runbook & training assets", "Hiring scorecards", "90-day transition plan"],
    },
  ];
  const [active, setActive] = useState(services[0].key);
  const current = services.find(s => s.key === active);

  return (
    <section className="section orbit" id="services">
      <div className="section-inner">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-dot"/>Services</div>
          <h2 className="section-title">Four practices, <em>one engagement.</em></h2>
          <p className="section-lead">We assemble the right mix for where you are — not a fixed menu. Click a node to see what it really means.</p>
        </div>

        <div className="orbit-layout">
          <div className="orbit-canvas">
            <div className="orbit-ring"/>
            <div className="orbit-ring-2"/>
            <div className="orbit-center">
              <div className="orbit-center-mark"/>
              <div className="orbit-center-label">Your<br/>engagement</div>
              <div className="orbit-center-sub">DOLPHIN · AI</div>
            </div>

            {/* lines from center to each node */}
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 400 400">
              {services.map((s) => {
                const rad = (s.angle * Math.PI) / 180;
                const r = 160;
                const x = 200 + Math.cos(rad) * r;
                const y = 200 + Math.sin(rad) * r;
                return <line key={s.key} x1="200" y1="200" x2={x} y2={y}
                  stroke="var(--accent)" strokeOpacity={active === s.key ? 0.7 : 0.15} strokeWidth="1"/>;
              })}
            </svg>

            {services.map((s) => {
              const rad = (s.angle * Math.PI) / 180;
              const r = 40;
              const x = 50 + Math.cos(rad) * r;
              const y = 50 + Math.sin(rad) * r;
              return (
                <button key={s.key}
                  className={`orbit-node ${active === s.key ? "orbit-node-active" : ""}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={()=>setActive(s.key)}
                  data-magnet>
                  <ServiceIcon kind={s.key}/>
                  <span className="orbit-node-label">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="orbit-detail">
            <div className="orbit-detail-tag">{current.label.toUpperCase()} · practice</div>
            <h3 className="orbit-detail-title">{current.title}</h3>
            <p className="orbit-detail-desc">{current.desc}</p>
            <ul className="orbit-detail-list">
              {current.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
            <button className="btn btn-outline" data-magnet>
              Explore this practice
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ kind }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "strategy") return <svg className="orbit-node-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" {...c}/><circle cx="12" cy="12" r="8" {...c} opacity="0.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" {...c}/></svg>;
  if (kind === "audit")    return <svg className="orbit-node-icon" viewBox="0 0 24 24"><path d="M4 20V8l6-4 6 4v7" {...c}/><path d="M4 14h10" {...c} opacity="0.5"/><path d="M16 18l2 2 4-4" {...c}/></svg>;
  if (kind === "build")    return <svg className="orbit-node-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" {...c}/><rect x="14" y="3" width="7" height="7" rx="1" {...c} opacity="0.55"/><rect x="3" y="14" width="7" height="7" rx="1" {...c} opacity="0.55"/><rect x="14" y="14" width="7" height="7" rx="1" {...c}/></svg>;
  return <svg className="orbit-node-icon" viewBox="0 0 24 24"><path d="M4 19c0-3 3-5 8-5s8 2 8 5" {...c}/><circle cx="12" cy="8" r="4" {...c}/></svg>;
}

Object.assign(window, { EngagementTape, ServicesOrbit });
