import { useState, useEffect, useRef } from "react";

// ── Global Styles ─────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --saffron: #F4831F; --deep: #1A0A00; --cream: #FFF8F0;
      --card: #FFFFFF;    --muted: #7A6050; --green: #2E7D32;
      --red: #C62828;     --amber: #F9A825; --border: #EAD9C8;
      --shadow: 0 4px 20px rgba(244,131,31,0.10);
    }
    body { font-family:'Noto Sans',sans-serif; background:var(--cream); color:var(--deep); min-height:100vh; }
    h1,h2,h3,h4 { font-family:'Baloo 2',cursive; }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-thumb { background:var(--saffron); border-radius:3px; }

    .badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:.4px; }
    .badge-open    { background:#E8F5E9; color:var(--green); }
    .badge-closed  { background:#FFEBEE; color:var(--red); }
    .badge-moved   { background:#FFF8E1; color:#E65100; }
    .badge-unknown { background:#F5F5F5; color:#757575; }
    .dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
    .dot-open    { background:var(--green); animation:pulse-green 1.5s infinite; }
    .dot-closed  { background:var(--red); }
    .dot-moved   { background:var(--amber); }
    .dot-unknown { background:#BDBDBD; }
    @keyframes pulse-green {
      0%,100% { box-shadow:0 0 0 0 rgba(46,125,50,.4); }
      50%      { box-shadow:0 0 0 5px rgba(46,125,50,0); }
    }

    .card { background:var(--card); border-radius:16px; border:1px solid var(--border); box-shadow:var(--shadow); overflow:hidden; }
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:10px 20px; border-radius:10px; font-weight:600; font-size:14px; cursor:pointer; border:none; transition:all .18s; font-family:'Noto Sans',sans-serif; }
    .btn-primary { background:var(--saffron); color:#fff; }
    .btn-primary:hover { background:#d9710f; transform:translateY(-1px); }
    .btn-green { background:var(--green); color:#fff; }
    .btn-green:hover { background:#1b5e20; }
    .btn-red { background:var(--red); color:#fff; }
    .btn-red:hover { background:#8e0000; }

    .inp { width:100%; padding:11px 16px; border-radius:10px; border:1.5px solid var(--border); font-size:14px; font-family:'Noto Sans',sans-serif; background:var(--cream); outline:none; transition:border .15s; }
    .inp:focus { border-color:var(--saffron); background:#fff; }

    .tab-bar { display:flex; background:#fff; border-top:1px solid var(--border); position:fixed; bottom:0; left:0; right:0; z-index:100; max-width:480px; margin:0 auto; left:50%; transform:translateX(-50%); width:100%; }
    .tab-item { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:8px 4px; gap:3px; cursor:pointer; font-size:10px; font-weight:600; color:var(--muted); border:none; background:transparent; transition:color .15s; }
    .tab-item.active { color:var(--saffron); }
    .tab-icon { font-size:20px; }

    .topbar { background:var(--deep); padding:14px 16px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
    .topbar-logo { font-family:'Baloo 2',cursive; font-size:22px; color:var(--saffron); font-weight:800; }
    .topbar-sub  { font-size:10px; color:rgba(255,255,255,.5); letter-spacing:.5px; }

    .page { padding:16px; padding-bottom:88px; max-width:480px; margin:0 auto; }

    .vendor-card { display:flex; gap:14px; align-items:flex-start; padding:14px; border-radius:16px; border:1px solid var(--border); background:#fff; margin-bottom:12px; box-shadow:0 2px 10px rgba(0,0,0,.04); cursor:pointer; transition:box-shadow .15s, transform .15s; }
    .vendor-card:hover { box-shadow:0 6px 22px rgba(244,131,31,.12); transform:translateY(-2px); }
    .vendor-emoji { font-size:36px; line-height:1; }
    .vendor-name  { font-family:'Baloo 2',cursive; font-size:17px; font-weight:700; }
    .vendor-meta  { font-size:12px; color:var(--muted); margin-top:2px; }

    .sec-hd { font-family:'Baloo 2',cursive; font-size:20px; font-weight:800; margin-bottom:12px; }

    .stat-box { background:linear-gradient(135deg,var(--saffron),#e06b00); color:#fff; border-radius:14px; padding:16px; text-align:center; }
    .stat-num { font-family:'Baloo 2',cursive; font-size:36px; font-weight:800; }
    .stat-lbl { font-size:12px; opacity:.85; }

    .overlay { position:fixed; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:flex-end; justify-content:center; z-index:200; }
    .modal { background:#fff; border-radius:24px 24px 0 0; padding:24px; width:100%; max-width:480px; max-height:85vh; overflow-y:auto; animation:slideUp .25s ease; }
    @keyframes slideUp { from { transform:translateY(60px); opacity:0; } to { transform:translateY(0); opacity:1; } }

    .chip { display:inline-flex; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:600; cursor:pointer; border:1.5px solid var(--border); background:#fff; transition:all .15s; white-space:nowrap; }
    .chip.active { background:var(--saffron); color:#fff; border-color:var(--saffron); }

    .toggle-wrap { display:flex; background:#F0E8DF; border-radius:10px; padding:4px; gap:4px; }
    .toggle-btn  { flex:1; padding:8px; border-radius:8px; border:none; font-weight:600; font-size:13px; cursor:pointer; transition:all .15s; background:transparent; color:var(--muted); font-family:'Noto Sans',sans-serif; }
    .toggle-btn.active { background:#fff; color:var(--deep); box-shadow:0 2px 8px rgba(0,0,0,.1); }

    .divider { border:none; border-top:1px solid var(--border); margin:16px 0; }
    .search-wrap { position:relative; }
    .search-wrap .inp { padding-left:40px; }
    .search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:16px; }
    .empty-state { text-align:center; padding:40px 20px; color:var(--muted); }
    .empty-state .e-icon { font-size:48px; margin-bottom:12px; }
    .info-box { background:#FFF3E0; border:1px solid #FFB74D; border-radius:12px; padding:14px; margin-top:12px; }
    .admin-row { display:flex; align-items:center; gap:10px; padding:12px 0; border-bottom:1px solid var(--border); }
    .admin-row:last-child { border-bottom:none; }

    /* MAP STYLES */
    .map-container { position:relative; width:100%; height:420px; background:#e8ddd0; border-radius:16px; overflow:hidden; border:1px solid var(--border); }
    .map-svg { width:100%; height:100%; }
    .map-pin { cursor:pointer; transition:transform .15s; transform-origin:center bottom; }
    .map-pin:hover { transform:scale(1.2); }
    .map-pin-pulse { animation:pin-pulse 2s infinite; }
    @keyframes pin-pulse {
      0%,100% { opacity:1; } 50% { opacity:.6; }
    }
    .map-tooltip { position:absolute; background:#1A0A00; color:#fff; padding:8px 12px; border-radius:10px; font-size:12px; pointer-events:none; white-space:nowrap; z-index:10; transition:opacity .15s; box-shadow:0 4px 12px rgba(0,0,0,.3); }
    .map-tooltip::after { content:''; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); border:6px solid transparent; border-top-color:#1A0A00; border-bottom:none; }
    .map-legend { display:flex; gap:12px; flex-wrap:wrap; padding:10px 0; }
    .legend-item { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:600; color:var(--muted); }

    /* FIREBASE GUIDE STYLES */
    .code-block { background:#1A0A00; color:#FFD180; font-family:monospace; font-size:11px; padding:14px; border-radius:10px; overflow-x:auto; line-height:1.7; margin:8px 0; }
    .code-block .kw  { color:#FF8A65; }
    .code-block .str { color:#A5D6A7; }
    .code-block .cmt { color:#78909C; }
    .step-card { background:#fff; border:1px solid var(--border); border-radius:14px; padding:16px; margin-bottom:12px; }
    .step-num  { width:28px; height:28px; border-radius:50%; background:var(--saffron); color:#fff; font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .step-title { font-family:'Baloo 2',cursive; font-size:16px; font-weight:700; }
    .step-desc  { font-size:13px; color:var(--muted); margin-top:4px; line-height:1.6; }
  `}</style>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const AREAS = ["All","Hazratganj","Aminabad","Chowk","Gomti Nagar","Alambagh","Indira Nagar"];

// Lucknow map coords (approximate lat/lng mapped to SVG 0-400 x, 0-420 y)
// Real Lucknow center ~26.85°N, 80.95°E
const mapProject = (lat, lng) => ({
  x: (lng - 80.85) * 2200,
  y: (27.05 - lat) * 2200,
});

const INITIAL_VENDORS = [
  { id:1, name:"Sharma Ji ke Gol Gappe",  emoji:"🫧", food:"Gol Gappe",        area:"Hazratganj",  status:"open",    note:"Near Janpath crossing",          phone:"9876543210", since:"8:00 AM",  lat:26.8467, lng:80.9462, subscribers:34 },
  { id:2, name:"Tunday Kababi Thela",      emoji:"🍢", food:"Galouti Kebab",    area:"Chowk",       status:"open",    note:"Opposite Akbari Gate",           phone:"9812345678", since:"11:00 AM", lat:26.8689, lng:80.9120, subscribers:91 },
  { id:3, name:"Malai Makkhan Wale",       emoji:"🍥", food:"Nimish / Malai",   area:"Chowk",       status:"closed",  note:"Opens in winter season only",    phone:"9988776655", since:"-",        lat:26.8700, lng:80.9130, subscribers:58 },
  { id:4, name:"Lakhnawi Chaat Corner",    emoji:"🥗", food:"Dahi Papdi",       area:"Aminabad",    status:"moved",   note:"Now near Aminabad bus stand gate 2", phone:"9765432109", since:"10:00 AM", lat:26.8480, lng:80.9280, subscribers:22 },
  { id:5, name:"Idrees Bhai Biryani",      emoji:"🍚", food:"Dum Biryani",      area:"Aminabad",    status:"open",    note:"Corner of Kapoor Market",        phone:"9654321098", since:"12:00 PM", lat:26.8460, lng:80.9260, subscribers:47 },
  { id:6, name:"Prakash Kulfi Wale",       emoji:"🍦", food:"Kulfi / Falooda",  area:"Hazratganj",  status:"open",    note:"Beside State Bank branch",       phone:"9543210987", since:"2:00 PM",  lat:26.8450, lng:80.9480, subscribers:73 },
  { id:7, name:"Ram Lal Lassi",            emoji:"🥛", food:"Lassi / Shikanji", area:"Gomti Nagar", status:"open",    note:"Viraj Khand market",             phone:"9432109876", since:"7:00 AM",  lat:26.8500, lng:81.0050, subscribers:19 },
  { id:8, name:"Bade Bhai Samosa",         emoji:"🥟", food:"Samosa / Kachori", area:"Indira Nagar",status:"unknown", note:"Status not updated today",       phone:"9321098765", since:"-",        lat:26.8800, lng:81.0100, subscribers:12 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_COLOR = { open:"#2E7D32", closed:"#C62828", moved:"#E65100", unknown:"#9E9E9E" };
const STATUS_LABEL = { open:"Open Now", closed:"Closed", moved:"Moved", unknown:"Unknown" };

function StatusBadge({ status }) {
  return (
    <span className={`badge badge-${status}`}>
      <span className={`dot dot-${status}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}

function Row({ icon, label, value }) {
  return (
    <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
      <span style={{fontSize:16,minWidth:22}}>{icon}</span>
      <div>
        <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:".4px"}}>{label}</div>
        <div style={{fontSize:14,fontWeight:500,marginTop:1}}>{value}</div>
      </div>
    </div>
  );
}

// ── MAP VIEW ──────────────────────────────────────────────────────────────────
function MapView({ vendors, onSelect }) {
  const [tooltip, setTooltip] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const svgRef = useRef(null);

  // project all vendor coords into SVG space
  // We manually lay out Lucknow areas in a 400x380 SVG
  const PIN_COORDS = {
    1:  { x:230, y:220 },
    2:  { x:105, y:90  },
    3:  { x:110, y:80  },
    4:  { x:165, y:215 },
    5:  { x:158, y:225 },
    6:  { x:240, y:230 },
    7:  { x:330, y:200 },
    8:  { x:340, y:100 },
  };

  const filtered = vendors.filter(v => filterStatus === "all" || v.status === filterStatus);

  const pinColor = (status) => STATUS_COLOR[status];
  const pinEmoji = (status) => status === "open" ? "✅" : status === "closed" ? "❌" : status === "moved" ? "🚶" : "❓";

  return (
    <div className="page">
      {/* Filter */}
      <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {["all","open","closed","moved","unknown"].map(s => (
          <button key={s} className={`chip ${filterStatus===s?"active":""}`} onClick={()=>setFilterStatus(s)}>
            {s === "all" ? "🗺 All" : pinEmoji(s) + " " + STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="map-container" style={{marginBottom:14}}>
        <svg ref={svgRef} viewBox="0 0 400 380" className="map-svg">
          {/* Road network - simplified Lucknow */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d4c4b0" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="400" height="380" fill="#ede0cc"/>
          <rect width="400" height="380" fill="url(#grid)"/>

          {/* Gomti River */}
          <path d="M 0,130 Q 80,110 160,125 Q 240,140 320,120 Q 370,110 400,115"
                fill="none" stroke="#7BB3C8" strokeWidth="14" strokeLinecap="round" opacity="0.7"/>
          <path d="M 0,130 Q 80,110 160,125 Q 240,140 320,120 Q 370,110 400,115"
                fill="none" stroke="#A8D4E8" strokeWidth="8" strokeLinecap="round" opacity="0.5"/>
          <text x="60" y="118" fontSize="9" fill="#4A90B8" fontFamily="sans-serif" fontWeight="600">Gomti River</text>

          {/* Major roads */}
          <line x1="0" y1="200" x2="400" y2="200" stroke="#c8b89a" strokeWidth="5"/>
          <line x1="200" y1="0" x2="200" y2="380" stroke="#c8b89a" strokeWidth="5"/>
          <line x1="0" y1="150" x2="400" y2="280" stroke="#c8b89a" strokeWidth="3" opacity="0.6"/>
          <line x1="100" y1="0" x2="100" y2="380" stroke="#c8b89a" strokeWidth="3" opacity="0.6"/>
          <line x1="320" y1="0" x2="320" y2="380" stroke="#c8b89a" strokeWidth="3" opacity="0.6"/>

          {/* Area labels */}
          {[
            { name:"Hazratganj",  x:220, y:250 },
            { name:"Chowk",       x:95,  y:155 },
            { name:"Aminabad",    x:148, y:260 },
            { name:"Gomti Nagar", x:308, y:230 },
            { name:"Indira Nagar",x:318, y:130 },
            { name:"Alambagh",    x:165, y:320 },
          ].map(a => (
            <text key={a.name} x={a.x} y={a.y} fontSize="8.5" fill="#8a7060" fontFamily="sans-serif"
                  fontWeight="700" textAnchor="middle" letterSpacing="0.5">{a.name.toUpperCase()}</text>
          ))}

          {/* Pins */}
          {filtered.map(v => {
            const pos = PIN_COORDS[v.id];
            if (!pos) return null;
            const col = pinColor(v.status);
            return (
              <g key={v.id} className="map-pin"
                 onMouseEnter={() => setTooltip({...v, ...pos})}
                 onMouseLeave={() => setTooltip(null)}
                 onClick={() => onSelect(v)}>
                {/* Pulse ring for open */}
                {v.status === "open" && (
                  <circle cx={pos.x} cy={pos.y-18} r="14" fill={col} opacity="0.15" className="map-pin-pulse"/>
                )}
                {/* Pin body */}
                <circle cx={pos.x} cy={pos.y-18} r="10" fill={col} stroke="#fff" strokeWidth="2"/>
                <text x={pos.x} y={pos.y-14} textAnchor="middle" fontSize="10">{v.emoji}</text>
                {/* Pin tail */}
                <polygon points={`${pos.x-5},${pos.y-10} ${pos.x+5},${pos.y-10} ${pos.x},${pos.y}`}
                         fill={col}/>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div className="map-tooltip" style={{
            left: `${(tooltip.x / 400) * 100}%`,
            top:  `${((tooltip.y - 40) / 380) * 100}%`,
            transform: "translate(-50%, -100%)"
          }}>
            <strong>{tooltip.emoji} {tooltip.name}</strong><br/>
            <span style={{opacity:.8}}>{STATUS_LABEL[tooltip.status]}</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="map-legend" style={{marginBottom:14}}>
        {Object.entries(STATUS_COLOR).map(([s,c]) => (
          <div key={s} className="legend-item">
            <div style={{width:10,height:10,borderRadius:"50%",background:c}}/>
            {STATUS_LABEL[s]}
          </div>
        ))}
      </div>

      {/* Vendor list below map */}
      <div className="sec-hd">
        {filtered.length} Thela{filtered.length!==1?"s":""} on Map
      </div>
      {filtered.map(v => (
        <div key={v.id} className="vendor-card" onClick={() => onSelect(v)}>
          <div className="vendor-emoji">{v.emoji}</div>
          <div style={{flex:1}}>
            <div className="vendor-name">{v.name}</div>
            <div className="vendor-meta">{v.food} • 📍 {v.area}</div>
            <div style={{marginTop:6}}><StatusBadge status={v.status}/></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── CUSTOMER APP ──────────────────────────────────────────────────────────────
function CustomerApp({ vendors }) {
  const [area, setArea]     = useState("All");
  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView]     = useState("list"); // list | map
  const [selected, setSelected] = useState(null);

  const filtered = vendors.filter(v => {
    const matchArea  = area === "All" || v.area === area;
    const matchQuery = v.name.toLowerCase().includes(query.toLowerCase()) ||
                       v.food.toLowerCase().includes(query.toLowerCase());
    const matchOpen  = filter === "all" || v.status === "open";
    return matchArea && matchQuery && matchOpen;
  });

  return (
    <>
      <div className="page">
        {/* Search */}
        <div className="search-wrap" style={{marginBottom:12}}>
          <span className="search-icon">🔍</span>
          <input className="inp" placeholder="Search thela or food…" value={query} onChange={e=>setQuery(e.target.value)}/>
        </div>

        {/* View toggle */}
        <div className="toggle-wrap" style={{marginBottom:12}}>
          <button className={`toggle-btn ${view==="list"?"active":""}`} onClick={()=>setView("list")}>📋 List</button>
          <button className={`toggle-btn ${view==="map"?"active":""}`}  onClick={()=>setView("map")}>🗺 Map</button>
          <button className={`toggle-btn ${filter==="open"?"active":""}`} onClick={()=>setFilter(f=>f==="open"?"all":"open")}>🟢 Open Only</button>
        </div>

        {/* Area chips */}
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:6,marginBottom:14}}>
          {AREAS.map(a => (
            <button key={a} className={`chip ${area===a?"active":""}`} onClick={()=>setArea(a)}>{a}</button>
          ))}
        </div>

        {view === "map" ? (
          <MapView vendors={filtered} onSelect={setSelected}/>
        ) : (
          <>
            <div className="sec-hd">{filtered.length} Thela{filtered.length!==1?"s":""} Found</div>
            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="e-icon">🥺</div>
                <p>No thelas found.<br/>Try a different search or area.</p>
              </div>
            )}
            {filtered.map(v => (
              <div key={v.id} className="vendor-card" onClick={()=>setSelected(v)}>
                <div className="vendor-emoji">{v.emoji}</div>
                <div style={{flex:1}}>
                  <div className="vendor-name">{v.name}</div>
                  <div className="vendor-meta">{v.food}</div>
                  <div style={{fontSize:12,color:"var(--muted)",marginTop:2}}>📍 {v.area}</div>
                  <div style={{marginTop:8}}><StatusBadge status={v.status}/></div>
                </div>
                {v.since !== "-" && <div style={{fontSize:11,color:"var(--muted)"}}>Since {v.since}</div>}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="overlay" onClick={()=>setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:56}}>{selected.emoji}</div>
              <h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:22}}>{selected.name}</h2>
              <div style={{color:"var(--muted)",fontSize:13,marginTop:4}}>{selected.food}</div>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
              <StatusBadge status={selected.status}/>
            </div>
            <div className="card" style={{padding:14,marginBottom:12}}>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <Row icon="📍" label="Area"      value={selected.area}/>
                <Row icon="💬" label="Note"      value={selected.note}/>
                {selected.since !== "-" && <Row icon="🕐" label="Open Since" value={selected.since}/>}
                <Row icon="⭐" label="Followers" value={`${selected.subscribers} people tracking`}/>
              </div>
            </div>
            {selected.status === "moved" && (
              <div className="info-box"><p>🚶 This thela has moved! Check the note above for new location.</p></div>
            )}
            {selected.status === "unknown" && (
              <div className="info-box" style={{background:"#F5F5F5",borderColor:"#BDBDBD"}}>
                <p style={{color:"#555"}}>⚠️ Vendor hasn't updated status today.</p>
              </div>
            )}
            <button className="btn btn-primary" style={{width:"100%",marginTop:12}} onClick={()=>setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── VENDOR APP ────────────────────────────────────────────────────────────────
function VendorApp({ vendors, setVendors }) {
  const myId = 2;
  const me = vendors.find(v => v.id === myId);
  const [note, setNote] = useState(me.note);
  const [saved, setSaved] = useState(false);

  const update = (status) => {
    setVendors(prev => prev.map(v => v.id===myId ? {
      ...v, status,
      since: status==="open" ? new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) : "-"
    } : v));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };
  const saveNote = () => {
    setVendors(prev => prev.map(v => v.id===myId ? {...v,note} : v));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  return (
    <div className="page">
      <div className="card" style={{padding:20,marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>{me.emoji}</div>
        <h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:20}}>{me.name}</h2>
        <div style={{color:"var(--muted)",fontSize:13,marginBottom:12}}>{me.food} • {me.area}</div>
        <StatusBadge status={me.status}/>
      </div>

      <div className="sec-hd">Aaj Ka Status</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <button className="btn btn-green" style={{padding:"16px 8px",fontSize:15,borderRadius:14}} onClick={()=>update("open")}>✅ Main Open Hoon</button>
        <button className="btn btn-red"   style={{padding:"16px 8px",fontSize:15,borderRadius:14}} onClick={()=>update("closed")}>❌ Aaj Band Hai</button>
        <button className="btn" style={{gridColumn:"1/-1",background:"#FFF8E1",color:"#E65100",border:"1.5px solid #FFB74D",padding:"14px",borderRadius:14,fontSize:14}} onClick={()=>update("moved")}>🚶 Jagah Badal Li Hai</button>
      </div>

      <div className="sec-hd">Location / Note</div>
      <textarea className="inp" rows={3} value={note} onChange={e=>setNote(e.target.value)}
        style={{resize:"none",marginBottom:10}} placeholder="Apni location ya koi note likhein…"/>
      <button className="btn btn-primary" style={{width:"100%"}} onClick={saveNote}>💾 Save</button>

      {saved && <div style={{textAlign:"center",marginTop:12,color:"var(--green)",fontWeight:600,fontSize:14}}>✓ Update ho gaya!</div>}

      <hr className="divider"/>
      <div className="sec-hd">Smartphone Nahi? Missed Call Karein!</div>
      <div className="info-box">
        <p style={{color:"var(--deep)",fontWeight:700,fontSize:15,marginBottom:6}}>📞 Is number pe missed call dein:</p>
        <p style={{fontSize:24,fontWeight:800,color:"var(--saffron)",fontFamily:"'Baloo 2',cursive",letterSpacing:1}}>0522-BAZAAR</p>
        <p style={{marginTop:8,fontSize:12,color:"var(--muted)"}}>
          • 1st missed call = Open mark hoga<br/>
          • 2nd missed call = Closed mark hoga<br/>
          • Sirf registered number se kaam karega
        </p>
      </div>

      <hr className="divider"/>
      <div className="card" style={{padding:16,background:"linear-gradient(135deg,#1A0A00,#3d1a00)",color:"#fff"}}>
        <div style={{fontFamily:"'Baloo 2',cursive",fontSize:18,marginBottom:4}}>₹200 / Mahine Ka Plan</div>
        <div style={{fontSize:13,opacity:.8,marginBottom:12}}>Aapka subscription active hai ✓</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["Bazaar Bites pe listing","Missed call feature","₹0 commission","Free updates"].map(f=>(
            <span key={f} style={{background:"rgba(244,131,31,.2)",padding:"4px 10px",borderRadius:20,fontSize:11,color:"var(--saffron)"}}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ vendors, setVendors }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("vendors"); // vendors | firebase

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.area.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    open: vendors.filter(v=>v.status==="open").length,
    missedCalls: 14,
    paid: 6,
  };

  const forceStatus = (id, status) =>
    setVendors(prev => prev.map(v => v.id===id ? {...v,status} : v));

  return (
    <div className="page">
      <div className="sec-hd">Admin Dashboard</div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <div className="stat-box">
          <div className="stat-num">{vendors.length}</div>
          <div className="stat-lbl">Total Vendors</div>
        </div>
        <div style={{background:"linear-gradient(135deg,#2E7D32,#1b5e20)",color:"#fff",borderRadius:14,padding:16,textAlign:"center"}}>
          <div className="stat-num">{counts.open}</div>
          <div className="stat-lbl">Open Right Now</div>
        </div>
        <div style={{background:"linear-gradient(135deg,#1565C0,#0d47a1)",color:"#fff",borderRadius:14,padding:16,textAlign:"center"}}>
          <div className="stat-num">{counts.missedCalls}</div>
          <div className="stat-lbl">Missed Calls Today</div>
        </div>
        <div style={{background:"linear-gradient(135deg,#4A148C,#6a1b9a)",color:"#fff",borderRadius:14,padding:16,textAlign:"center"}}>
          <div className="stat-num">₹{counts.paid*200}</div>
          <div className="stat-lbl">Monthly Revenue</div>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="toggle-wrap" style={{marginBottom:16}}>
        <button className={`toggle-btn ${activeTab==="vendors"?"active":""}`}   onClick={()=>setActiveTab("vendors")}>🏪 Vendors</button>
        <button className={`toggle-btn ${activeTab==="firebase"?"active":""}`}  onClick={()=>setActiveTab("firebase")}>🔥 Firebase Setup</button>
      </div>

      {activeTab === "vendors" && (
        <>
          <div className="search-wrap" style={{marginBottom:14}}>
            <span className="search-icon">🔍</span>
            <input className="inp" placeholder="Search vendor…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>

          <div className="sec-hd">All Vendors</div>
          <div className="card" style={{padding:"0 14px",marginBottom:16}}>
            {filtered.map(v => (
              <div key={v.id} className="admin-row">
                <div style={{fontSize:28}}>{v.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.name}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{v.area}</div>
                  <div style={{marginTop:3}}><StatusBadge status={v.status}/></div>
                </div>
                <select style={{fontSize:11,padding:"4px 6px",borderRadius:6,border:"1px solid var(--border)",background:"#fff",cursor:"pointer"}}
                        value={v.status} onChange={e=>forceStatus(v.id, e.target.value)}>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="moved">Moved</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            ))}
          </div>

          <div className="sec-hd">Subscriptions</div>
          <div className="card" style={{padding:"0 14px"}}>
            {vendors.map((v,i) => (
              <div key={v.id} className="admin-row">
                <div style={{fontSize:22}}>{v.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13}}>{v.name}</div>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{v.phone}</div>
                </div>
                <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,
                  background: i<6?"#E8F5E9":"#FFEBEE", color: i<6?"var(--green)":"var(--red)"}}>
                  {i<6?"✓ Paid":"✗ Unpaid"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "firebase" && <FirebaseGuide/>}
    </div>
  );
}

// ── FIREBASE SETUP GUIDE ──────────────────────────────────────────────────────
function FirebaseGuide() {
  const [copiedStep, setCopiedStep] = useState(null);
  const copy = (text, step) => {
    navigator.clipboard?.writeText(text);
    setCopiedStep(step); setTimeout(()=>setCopiedStep(null), 1800);
  };

  const CopyBtn = ({text, step}) => (
    <button onClick={()=>copy(text,step)} style={{
      float:"right", fontSize:10, padding:"2px 8px", borderRadius:6,
      background: copiedStep===step?"var(--green)":"rgba(255,255,255,.1)",
      color:"#fff", border:"none", cursor:"pointer", transition:"background .2s"
    }}>
      {copiedStep===step?"✓ Copied!":"Copy"}
    </button>
  );

  const steps = [
    {
      title:"1. Create Firebase Project",
      desc:"Go to firebase.google.com → Add Project → Name it 'bazaar-bites' → Disable Analytics (optional) → Create.",
      code: null,
    },
    {
      title:"2. Install Firebase in your app",
      desc:"Run this in your React project terminal:",
      code:`npm install firebase`,
      lang:"bash"
    },
    {
      title:"3. Create firebase.js config file",
      desc:"In your src/ folder, create firebase.js and paste your Firebase config (from Project Settings → Your apps):",
      code:`// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore }   from "firebase/firestore";
import { getAuth }        from "firebase/auth";

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "bazaar-bites.firebaseapp.com",
  projectId:         "bazaar-bites",
  storageBucket:     "bazaar-bites.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);`,
    },
    {
      title:"4. Firestore Database Structure",
      desc:"In Firebase Console → Firestore → Create database. Your collections will look like this:",
      code:`vendors/
  {vendorId}/
    name:        "Sharma Ji ke Gol Gappe"
    emoji:       "🫧"
    food:        "Gol Gappe"
    area:        "Hazratganj"
    phone:       "9876543210"   ← registered number
    status:      "open"         ← open | closed | moved | unknown
    note:        "Near Janpath crossing"
    since:       "8:00 AM"
    lat:         26.8467
    lng:         80.9462
    subscribers: 34
    isPaid:      true
    lastUpdated: Timestamp

missedCalls/
  {logId}/
    phone:      "9876543210"
    timestamp:  Timestamp
    action:     "open"          ← toggled status

payments/
  {vendorId}/
    amount:     200
    paidDate:   Timestamp
    validTill:  Timestamp`,
      lang:"text"
    },
    {
      title:"5. Real-time vendor status listener",
      desc:"Replace mock data with this live Firestore listener in your app:",
      code:`// In your main App component
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

useEffect(() => {
  // Real-time listener — updates instantly when
  // vendor changes status (app or missed call)
  const unsub = onSnapshot(
    collection(db, "vendors"),
    (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVendors(data);
    }
  );
  return () => unsub(); // cleanup
}, []);`,
    },
    {
      title:"6. Vendor status update function",
      desc:"When vendor taps Open/Closed in their app:",
      code:`import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const updateVendorStatus = async (vendorId, status) => {
  await updateDoc(doc(db, "vendors", vendorId), {
    status,
    since:       status === "open"
                   ? new Date().toLocaleTimeString()
                   : "-",
    lastUpdated: serverTimestamp()
  });
};`,
    },
    {
      title:"7. Missed Call Integration (Exotel)",
      desc:"Set up an Exotel account at exotel.com. Create a webhook that Exotel calls when a missed call arrives. Deploy this as a Firebase Cloud Function:",
      code:`// functions/index.js (Firebase Cloud Function)
const functions = require("firebase-functions");
const admin     = require("firebase-admin");
admin.initializeApp();

exports.missedCallWebhook = functions.https.onRequest(
  async (req, res) => {
    const callerPhone = req.body.CallFrom; // from Exotel
    const db = admin.firestore();

    // Find vendor by registered phone
    const snap = await db.collection("vendors")
      .where("phone", "==", callerPhone)
      .get();

    if (snap.empty) return res.send("Unknown number");

    const vendorDoc = snap.docs[0];
    const current   = vendorDoc.data().status;

    // Toggle: open → closed → open
    const newStatus = current === "open" ? "closed" : "open";

    await vendorDoc.ref.update({
      status:      newStatus,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });

    // Log the missed call
    await db.collection("missedCalls").add({
      phone:     callerPhone,
      action:    newStatus,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.send("OK");
  }
);`,
    },
    {
      title:"8. Deploy Cloud Function",
      desc:"Run these commands to deploy your missed call webhook:",
      code:`npm install -g firebase-tools
firebase login
firebase init functions
firebase deploy --only functions

# Your webhook URL will be:
# https://us-central1-bazaar-bites.cloudfunctions.net/missedCallWebhook
# → Paste this in Exotel dashboard as your webhook`,
      lang:"bash"
    },
    {
      title:"9. OTP Login for Vendors",
      desc:"Use Firebase Phone Auth so vendors log in with their registered mobile number — no password needed:",
      code:`import { RecaptchaVerifier, signInWithPhoneNumber }
  from "firebase/auth";
import { auth } from "./firebase";

// Step 1: Send OTP
const sendOTP = async (phoneNumber) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth, "recaptcha-container", { size: "invisible" }
  );
  const result = await signInWithPhoneNumber(
    auth, "+91" + phoneNumber,
    window.recaptchaVerifier
  );
  return result; // confirmationResult
};

// Step 2: Verify OTP entered by vendor
const verifyOTP = async (confirmationResult, otp) => {
  const userCredential = await confirmationResult.confirm(otp);
  return userCredential.user;
};`,
    },
    {
      title:"10. Firestore Security Rules",
      desc:"Paste these rules in Firestore → Rules to protect your data:",
      code:`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Anyone can read vendors (customers)
    match /vendors/{vendorId} {
      allow read: if true;
      // Only the vendor (matched by phone) can write
      allow write: if request.auth != null &&
        request.auth.token.phone_number ==
        resource.data.phone;
    }

    // Only admin can read payments
    match /payments/{doc} {
      allow read, write: if request.auth.token.admin == true;
    }

    // Missed call logs — only Cloud Functions write these
    match /missedCalls/{doc} {
      allow read: if request.auth.token.admin == true;
    }
  }
}`,
    },
  ];

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#FF6F00,#E65100)",borderRadius:14,padding:16,marginBottom:16,color:"#fff"}}>
        <div style={{fontFamily:"'Baloo 2',cursive",fontSize:18,fontWeight:800,marginBottom:4}}>🔥 Firebase Integration Guide</div>
        <div style={{fontSize:13,opacity:.9}}>Complete step-by-step setup to make Bazaar Bites fully live with real-time data, missed call support & OTP login.</div>
      </div>

      {steps.map((step,i) => (
        <div key={i} className="step-card">
          <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:step.code?10:0}}>
            <div className="step-num">{i+1}</div>
            <div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          </div>
          {step.code && (
            <div className="code-block" style={{position:"relative"}}>
              <CopyBtn text={step.code} step={i}/>
              <pre style={{whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{step.code}</pre>
            </div>
          )}
        </div>
      ))}

      <div style={{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:12,padding:14,marginTop:4}}>
        <div style={{fontWeight:700,color:"var(--green)",marginBottom:6}}>✅ Total Cost to Go Live</div>
        <div style={{fontSize:13,color:"#2E7D32",lineHeight:1.8}}>
          • Firebase Free Tier — ₹0/month (up to 50k reads/day)<br/>
          • Exotel Missed Call — ~₹0.30 per call<br/>
          • Domain (bazaarbites.in) — ~₹800/year<br/>
          • Google Maps API — Free up to 28,000 loads/month<br/>
          <strong>Total upfront: ~₹2,000 to launch MVP 🚀</strong>
        </div>
      </div>
    </div>
  );
}

// ── SHELL ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"customer", icon:"🍽", label:"Discover" },
  { id:"vendor",   icon:"🏪", label:"My Shop"  },
  { id:"admin",    icon:"⚙️", label:"Admin"    },
];

export default function BazaarBites() {
  const [tab, setTab]         = useState("customer");
  const [vendors, setVendors] = useState(INITIAL_VENDORS);

  return (
    <>
      <GlobalStyle/>
      <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",position:"relative",background:"var(--cream)"}}>
        <div className="topbar">
          <div>
            <div className="topbar-logo">🍛 Bazaar Bites</div>
            <div className="topbar-sub">LUCKNOW'S STREET FOOD FINDER</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Live Updates</div>
            <div style={{fontSize:11,color:"#4CAF50",fontWeight:600}}>● Active</div>
          </div>
        </div>

        {tab === "customer" && <CustomerApp vendors={vendors}/>}
        {tab === "vendor"   && <VendorApp   vendors={vendors} setVendors={setVendors}/>}
        {tab === "admin"    && <AdminPanel  vendors={vendors} setVendors={setVendors}/>}

        <div className="tab-bar">
          {TABS.map(t => (
            <button key={t.id} className={`tab-item ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              <span className="tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
