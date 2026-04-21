// ==================== v2 — Chat CTA + Footer + App ====================

/* ---------------- CHAT CTA ---------------- */
function ChatCTA() {
  const [log, setLog] = useState([
    { who: "bot", text: "Hi — I'm Rohan. What's the AI question keeping you up at night?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef(null);

  const flow = [
    { prompt: "Got it. Roughly how large is the team this would touch — under 50, 50–500, or 500+?", chips: ["Under 50", "50–500", "500+"] },
    { prompt: "And where are you today — exploring, piloting, or already in production?", chips: ["Exploring", "Piloting", "In production"] },
    { prompt: "Perfect. Drop your work email and I'll send three time slots this week.", chips: [] },
  ];

  const send = (text) => {
    if (!text.trim()) return;
    setLog(l => [...l, { who: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      if (step < flow.length) {
        setLog(l => [...l, { who: "bot", text: flow[step].prompt }]);
        setStep(s => s+1);
      } else {
        setLog(l => [...l, { who: "bot", text: "Brilliant. Check your inbox in the next few minutes — talk soon." }]);
      }
    }, 900);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [log, typing]);

  const currentChips = step > 0 && step <= flow.length ? flow[step-1].chips : [];

  return (
    <section className="section chat" id="start">
      <Starfield density={50}/>
      <div className="section-inner">
        <div className="chat-layout">
          <div className="chat-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/>Start small, go fast</div>
            <h2 className="chat-title">Ready to <em>get started?</em></h2>
            <p className="chat-sub">
              Chat with a senior practitioner, not a salesperson. You'll leave with three concrete
              AI opportunities scoped to your business — no deck, no pitch, no obligation.
            </p>
            <div className="chat-meta">
              <div className="chat-meta-item">
                <div className="chat-meta-icon">
                  <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
                45 min · senior person
              </div>
              <div className="chat-meta-item">
                <div className="chat-meta-icon">
                  <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
                3 scoped opportunities
              </div>
              <div className="chat-meta-item">
                <div className="chat-meta-icon">
                  <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </div>
                No pitch deck
              </div>
            </div>
          </div>

          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-avatar">R</div>
              <div className="chat-header-info">
                <div className="chat-header-name">Rohan Mehta · Principal</div>
                <div className="chat-header-sub">Online · typically replies in 3 min</div>
              </div>
            </div>

            <div className="chat-log" ref={scrollRef}>
              {log.map((m, i) => (
                <div key={i} className={`chat-msg chat-msg-${m.who}`}>{m.text}</div>
              ))}
              {typing && (
                <div className="chat-msg chat-msg-bot">
                  <div className="chat-typing"><span/><span/><span/></div>
                </div>
              )}
            </div>

            {currentChips.length > 0 && (
              <div className="chat-suggestions">
                {currentChips.map(c => (
                  <button key={c} className="chat-chip" onClick={()=>send(c)}>{c}</button>
                ))}
              </div>
            )}

            <div className="chat-input-row">
              <input className="chat-input"
                     placeholder={step===0 ? "e.g. 'our call centre handle time is killing us'" : "Type your reply…"}
                     value={input}
                     onChange={e=>setInput(e.target.value)}
                     onKeyDown={e=>{if (e.key==="Enter") send(input);}}/>
              <button className="chat-send" onClick={()=>send(input)} disabled={!input.trim()}>
                <svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h12M10 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const cols = [
    { t: "Services", items: ["AI strategy", "Readiness audit", "Engineering", "Enablement"] },
    { t: "Sectors", items: ["Travel", "Financial services", "Professional services", "Retail", "Public sector"] },
    { t: "Company", items: ["About", "Careers", "Case studies", "Insights"] },
    { t: "Contact", items: ["hello@dolphinai.co", "Sydney · Australia", "+61 2 0000 0000"] },
  ];
  return (
    <footer className="footer">
      <div className="section-inner">
        <div className="footer-xl">
          Enabling AI. <span>Empowering business.</span>
        </div>
        <div className="footer-top">
          <div>
            <Logo size={1.15}/>
            <p className="footer-brand-p">
              An AI consultancy built by senior practitioners. We ship outcomes
              you can point at on a P&amp;L.
            </p>
          </div>
          <div className="footer-cols">
            {cols.map(c => (
              <div key={c.t} className="footer-col">
                <div className="footer-col-t">{c.t}</div>
                {c.items.map(i => <a key={i} href="#">{i}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 DOLPHIN AI PTY LTD</div>
          <div className="footer-legal">
            <a href="#">PRIVACY</a><a href="#">TERMS</a><a href="#">RESPONSIBLE AI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- CURSOR + LOADER + RAIL ---------------- */
function CustomCursor() {
  const dotRef = useRef(null), ringRef = useRef(null);
  useEffect(() => {
    let dx=0,dy=0,rx=0,ry=0,tx=0,ty=0;
    let magnet = false;
    let target = null;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      const el = e.target.closest("[data-magnet]");
      magnet = !!el;
      target = el;
      if (ringRef.current) ringRef.current.classList.toggle("cursor-magnet", magnet);
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      dx += (tx - dx) * 0.6;
      dy += (ty - dy) * 0.6;
      let rtx = tx, rty = ty;
      if (magnet && target) {
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width/2, cy = r.top + r.height/2;
        rtx = tx + (cx - tx) * 0.35;
        rty = ty + (cy - ty) * 0.35;
      }
      rx += (rtx - rx) * 0.2;
      ry += (rty - ry) * 0.2;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return <>
    <div className="cursor-dot" ref={dotRef}/>
    <div className="cursor-ring" ref={ringRef}/>
  </>;
}

function Loader({ done }) {
  return (
    <div className={`loader ${done?"loader-hidden":""}`}>
      <div className="loader-arc"><NeuralArc animated opacity={0.9}/></div>
      <div className="loader-text">Dolphin<span className="dim">A I</span></div>
      <div className="loader-bar"><div className="loader-bar-fill"/></div>
    </div>
  );
}

function Rail({ active, setActive }) {
  const items = [
    {id:"top",l:"Hero"},{id:"approach",l:"Approach"},{id:"services",l:"Services"},
    {id:"sectors",l:"Sectors"},{id:"proof",l:"Proof"},{id:"team",l:"Team"},
    {id:"start",l:"Start"}
  ];
  return (
    <div className="rail">
      {items.map(i => (
        <div key={i.id} className={`rail-item ${active===i.id?"rail-active":""}`}>
          <span className="rail-dot"/>
          <span className="rail-label">{i.l}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- TWEAKS ---------------- */
const V2_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cyan",
  "displayWeight": 300,
  "cursor": "on",
  "glow": "full"
}/*EDITMODE-END*/;

function Tweaks({ tokens, setTokens, visible }) {
  if (!visible) return null;
  const palettes = [
    { k: "cyan",   n: "Cyan",   s: "oklch(0.78 0.18 195)" },
    { k: "ocean",  n: "Ocean",  s: "oklch(0.72 0.18 215)" },
    { k: "teal",   n: "Teal",   s: "oklch(0.75 0.16 180)" },
    { k: "violet", n: "Violet", s: "oklch(0.72 0.18 265)" },
    { k: "peach",  n: "Peach",  s: "oklch(0.78 0.14 30)" },
  ];
  return (
    <div className="tweaks">
      <div className="tweaks-title">Tweaks</div>
      <div className="tweak-group">
        <div className="tweak-label">Accent palette</div>
        <div className="tweak-swatches">
          {palettes.map(p => (
            <button key={p.k} title={p.n}
              className={`swatch ${tokens.palette===p.k?"swatch-on":""}`}
              style={{background: p.s}}
              onClick={()=>setTokens(t=>({...t, palette: p.k}))}/>
          ))}
        </div>
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Display weight</div>
        <div className="tweak-segment">
          {[{k:200,l:"Thin"},{k:300,l:"Light"},{k:500,l:"Medium"}].map(o => (
            <button key={o.k} className={`seg ${tokens.displayWeight===o.k?"seg-on":""}`}
              onClick={()=>setTokens(t=>({...t, displayWeight: o.k}))}>{o.l}</button>
          ))}
        </div>
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Custom cursor</div>
        <div className="tweak-segment">
          {[{k:"on",l:"On"},{k:"off",l:"Off"}].map(o => (
            <button key={o.k} className={`seg ${tokens.cursor===o.k?"seg-on":""}`}
              onClick={()=>setTokens(t=>({...t, cursor: o.k}))}>{o.l}</button>
          ))}
        </div>
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Neural arc glow</div>
        <div className="tweak-segment">
          {[{k:"off",l:"Off"},{k:"subtle",l:"Subtle"},{k:"full",l:"Full"}].map(o => (
            <button key={o.k} className={`seg ${tokens.glow===o.k?"seg-on":""}`}
              onClick={()=>setTokens(t=>({...t, glow: o.k}))}>{o.l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- APP ---------------- */
function App() {
  const [tokens, setTokens] = useState(V2_DEFAULTS);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setEditMode(true);
      if (d.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({type: "__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    window.parent.postMessage({type: "__edit_mode_set_keys", edits: tokens}, "*");
    const r = document.documentElement;
    r.setAttribute("data-palette", tokens.palette);
    r.style.setProperty("--display-weight", tokens.displayWeight);
  }, [tokens]);

  useEffect(() => {
    const ids = ["top","approach","services","sectors","proof","team","start"];
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { threshold: 0.4, rootMargin: "-20% 0px -40% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <Loader done={!loading}/>
      {tokens.cursor === "on" && <CustomCursor/>}
      <Nav activeSection={active}/>
      <Hero/>
      <Marquee/>
      <EngagementTape/>
      <ServicesOrbit/>
      <SectorCockpit/>
      <Proof/>
      <TeamReel/>
      <ChatCTA/>
      <Footer/>
      <Rail active={active} setActive={setActive}/>
      <Tweaks tokens={tokens} setTokens={setTokens} visible={editMode}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
