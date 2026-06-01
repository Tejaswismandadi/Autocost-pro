// AutoCost Pro — Shared Data Store
// All data persists in localStorage

var AC = {

  // ── SHOULD COST BASELINE (frozen at program start) ──────────────────────
  defaultBaseline: {
    program: "Center Console Assembly — Model Y",
    partNumber: "AC-CONSOLE-001",
    createdDate: "2024-01-15",
    region: "Mexico",
    annualVolume: 100000,
    programLife: 5,
    currency: "USD",
    locked: true,
    buckets: [
      { id:"mat",  name:"Direct Material",         cost:40.07, pct:38.2, color:"#00d4aa",
        items:[
          {name:"Main structure PP+GF30",      cost:9.13, basis:"4.10kg × $1.90/kg ÷ 85%",   source:"ICIS PP index"},
          {name:"Lid panel PC/ABS",            cost:2.05, basis:"0.85kg × $2.10/kg ÷ 87%",   source:"ICIS PC/ABS"},
          {name:"Storage bin PP",              cost:1.13, basis:"0.60kg × $1.65/kg ÷ 88%",   source:"ICIS PP"},
          {name:"Armrest foam PU",             cost:1.83, basis:"0.55kg × $2.80/kg ÷ 84%",   source:"ICIS MDI"},
          {name:"Armrest skin TPO",            cost:3.88, basis:"0.42m² × $7.20/m² ÷ 78%",   source:"3-quote benchmark"},
          {name:"Steel bracket stamped",       cost:0.58, basis:"0.38kg × 1.40 BTF × $0.85", source:"Fastmarkets HRC"},
          {name:"Zinc hinge die cast ×2",      cost:0.79, basis:"0.28kg × $2.40 ÷ 85%",      source:"LME Zinc"},
          {name:"USB module bought-out",       cost:8.20, basis:"1pc × $8.20 Tier2 benchmark",source:"Direct Tier2 quote"},
          {name:"Wireless charger bought-out", cost:6.80, basis:"1pc × $6.80",                source:"Component benchmark"},
          {name:"Wiring harness segment",      cost:2.28, basis:"1.2m × $1.90/m",             source:"LME Copper"},
          {name:"Fasteners and clips ×18",     cost:1.44, basis:"18pcs × $0.08",              source:"Catalogue pricing"},
          {name:"Material scrap 7%",           cost:2.05, basis:"7% on manufactured components",source:"Industry benchmark"},
        ]
  },
      { id:"proc", name:"Process Cost",             cost:12.97, pct:12.4, color:"#0099ff",
        items:[
          {name:"Main structure mold 800T",    cost:0.84, basis:"$55/hr ÷ 3600 × 47s ÷ 78%OEE",source:"Machine rate benchmark"},
          {name:"Lid panel mold 400T",         cost:0.34, basis:"$32/hr ÷ 3600 × 32s ÷ 78%",   source:"Machine rate benchmark"},
          {name:"Storage bin mold 200T",       cost:0.22, basis:"$22/hr ÷ 3600 × 28s ÷ 78%",   source:"Machine rate benchmark"},
          {name:"Foam pour operation",         cost:3.73, basis:"$42/hr ÷ 3600 × 240s ÷ 75%",  source:"Process benchmark"},
          {name:"Skin wrap armrest",           cost:5.07, basis:"6ops × $22/hr ÷ 3600 × 360s", source:"Process benchmark"},
          {name:"Ultrasonic welding",          cost:0.47, basis:"$28/hr ÷ 3600 × 60s",          source:"Machine rate"},
          {name:"Die cut trimming",            cost:0.24, basis:"$35/hr ÷ 3600 × 45s ÷ 80%",   source:"Machine rate"},
          {name:"Material drying PP+GF30",     cost:0.06, basis:"8kW × $0.08 × 3hr ÷ 33 parts",source:"CFE tariff"},
        ]
  },
      { id:"labor",name:"Direct Labor",             cost:4.45, pct:4.2,  color:"#a855f7",
        items:[
          {name:"Press operator 1 op",         cost:0.06, basis:"$4.32/hr × 47s ÷ 3600",       source:"INEGI/IMSS"},
          {name:"Quality inspector 1 op",      cost:0.07, basis:"$4.32/hr × 60s ÷ 3600",       source:"INEGI/IMSS"},
          {name:"Foam pour 2 operators",       cost:0.58, basis:"2ops × $4.32/hr × 240s ÷ 3600",source:"INEGI/IMSS"},
          {name:"Skin wrap 6 operators",       cost:2.59, basis:"6ops × $4.32/hr × 360s ÷ 3600",source:"INEGI/IMSS"},
          {name:"Sub-assembly 3 operators",    cost:0.65, basis:"3ops × $4.32/hr × 180s ÷ 3600",source:"INEGI/IMSS"},
          {name:"Pack and stage 1 op",         cost:0.05, basis:"$4.32/hr × 45s ÷ 3600",       source:"INEGI/IMSS"},
          {name:"Indirect labor allocation",   cost:0.34, basis:"4.2 indirect × $4.32 × 7.5hr ÷ 400 parts",source:"Industry benchmark"},
          {name:"Statutory burden 35%",        cost:0.11, basis:"Already in loaded rate above", source:"IMSS 2026 table"},
        ]
  },
      { id:"ovhd", name:"Manufacturing Overhead",   cost:9.55, pct:9.1,  color:"#f59e0b",
        items:[
          {name:"Equipment depreciation",      cost:1.85, basis:"$750K ÷ 10yr ÷ 4000hr × cycle",source:"Capex benchmark"},
          {name:"Facility cost",               cost:0.80, basis:"12m² × $5.50/m²/mo × 12 ÷ vol",source:"JLL Mexico report"},
          {name:"Energy facility wide",        cost:0.60, basis:"3% of direct mfg cost",         source:"CFE industrial tariff"},
          {name:"Equipment maintenance",       cost:0.72, basis:"$1.2M × 3% ÷ 100K units",      source:"Industry 2-4% benchmark"},
          {name:"Mold maintenance",            cost:0.35, basis:"$15K/yr ÷ 100K units",          source:"Tooling benchmark"},
          {name:"Quality systems CMM",         cost:0.42, basis:"$180K ÷ 10yr ÷ vol + $8K cal", source:"Zeiss/Hexagon pricing"},
          {name:"Production support staff",    cost:2.25, basis:"20 staff × $45K ÷ 100K units", source:"IBISWorld SIC 3714"},
          {name:"Plant management",            cost:0.80, basis:"6 mgrs × $65K ÷ 100K units",   source:"Plant-level only"},
          {name:"PPAP APQP launch burden",     cost:0.45, basis:"$45K ÷ 100K units",             source:"Program benchmark"},
          {name:"Scrap and rework provision",  cost:1.31, basis:"2.5% of material+process+labor",source:"Industry benchmark"},
        ]
  },
      { id:"sga",  name:"SG&A",                    cost:7.21, pct:6.9,  color:"#ef4444",
        items:[
          {name:"Sales and commercial",        cost:1.80, basis:"2% of mfg cost",               source:"IBISWorld SIC 3714"},
          {name:"Finance HR legal IT",         cost:2.20, basis:"2.5% of mfg cost",             source:"IBISWorld benchmark"},
          {name:"Engineering support DRE",     cost:1.60, basis:"2% of mfg cost",               source:"Program estimate"},
          {name:"R&D product development",     cost:0.70, basis:"0.8% of mfg cost",             source:"PwC auto benchmark"},
          {name:"Executive overhead plant",    cost:0.91, basis:"1% of mfg cost",               source:"Plant level only"},
        ]
  },
      { id:"logi", name:"Logistics & Packaging",    cost:6.15, pct:5.9,  color:"#06b6d4",
        items:[
          {name:"Outbound freight",            cost:2.20, basis:"Mexico to Fremont per unit",   source:"DAT freight index"},
          {name:"Expendable packaging",        cost:1.40, basis:"Box + foam inserts per unit",  source:"Supplier quote"},
          {name:"Returnable dunnage amort.",   cost:0.16, basis:"$380 ÷ 200 trips ÷ 12 units", source:"Rack cost benchmark"},
          {name:"Inbound raw material",        cost:0.85, basis:"Supplier absorbed DDP",        source:"Incoterm estimate"},
          {name:"Import duties USMCA",         cost:0.60, basis:"USMCA qualifying 0-2.5%",     source:"CBP tariff schedule"},
          {name:"Reverse logistics warranty",  cost:0.14, basis:"0.4% returns × $35 handling", source:"Industry benchmark"},
        ]
  },
      { id:"tool", name:"Tooling Amortization",     cost:5.32, pct:5.1,  color:"#84cc16",
        items:[
          {name:"Main housing mold complex",   cost:0.40, basis:"$200K ÷ 500K lifetime units", source:"Tooling should cost"},
          {name:"Lid panel mold medium",       cost:0.19, basis:"$95K ÷ 500K units",           source:"Tooling should cost"},
          {name:"Storage bin mold simple",     cost:0.09, basis:"$45K ÷ 500K units",           source:"Tooling should cost"},
          {name:"Foam pour tooling fixtures",  cost:0.18, basis:"$90K ÷ 500K units",           source:"Tooling should cost"},
          {name:"Assembly fixtures gauges",    cost:0.11, basis:"$55K ÷ 500K units",           source:"Tooling should cost"},
          {name:"ECN tooling reserve",         cost:0.25, basis:"$25K/yr ÷ 100K units",        source:"ECN history estimate"},
        ]
  },
      { id:"test", name:"Testing & Compliance",     cost:2.86, pct:2.7,  color:"#f97316",
        items:[
          {name:"FMVSS 302 flammability",      cost:0.05, basis:"$1800 × 3 subs ÷ 100K",      source:"Intertek fee schedule"},
          {name:"UV fade SAE J1885",           cost:0.02, basis:"$2200 ÷ 100K units",          source:"Lab fee schedule"},
          {name:"VOC odor VDA 270",            cost:0.01, basis:"$1400 ÷ 100K units",          source:"Lab fee schedule"},
          {name:"First Article CMM",           cost:0.04, basis:"$3500 ÷ 100K units",          source:"CMM report cost"},
          {name:"PPAP Level 3 docs",           cost:0.05, basis:"80hrs × $65/hr ÷ 100K",       source:"Engineering rate"},
          {name:"Durability hinge latch",      cost:0.04, basis:"$3800 ÷ 100K units",          source:"Test lab quote"},
          {name:"EMC USB charger FCC",         cost:0.05, basis:"$4500 ÷ 100K units",          source:"FCC lab fee"},
          {name:"REACH RoHS compliance",       cost:0.01, basis:"$800 ÷ 100K units",           source:"Compliance cost"},
        ]
  },
      { id:"hidn", name:"Hidden Costs",             cost:5.10, pct:4.9,  color:"#ec4899",
        items:[
          {name:"Payment terms financing",     cost:0.85, basis:"Piece price × 10% × 60/365", source:"Working capital model"},
          {name:"FX hedge premium MXN",        cost:0.95, basis:"Piece price × 1.5%",          source:"FX forward estimate"},
          {name:"Expedite buffer",             cost:0.65, basis:"Historical pull-in provision", source:"Program history"},
          {name:"Capacity reservation",        cost:0.70, basis:"Dedicated press allocation",  source:"Capacity model"},
          {name:"Warranty reserve",            cost:0.55, basis:"0.5% of piece price",         source:"Quality estimate"},
          {name:"Program mgmt overhead",       cost:0.80, basis:"Launch team allocation",      source:"NRE estimate"},
          {name:"Inflation buffer",            cost:0.60, basis:"~1% forward pricing risk",    source:"Industry practice"},
        ]
  },
      { id:"mrgn", name:"Supplier Margin",          cost:5.24, pct:5.0,  color:"#6366f1",
        items:[
          {name:"Gross margin Tier1 trim",     cost:5.24, basis:"5% × pre-margin cost",        source:"Adient/Lear 10-K"},
        ]
  },
    ],
  },

  // ── MATERIAL INDICES ─────────────────────────────────────────────────────
  defaultIndices: [
    { id:"pp",     name:"PP+GF30 Resin",     unit:"$/kg",  baseValue:1.90, currentValue:1.90, source:"ICIS",        lastUpdate:"2024-01-15", bucketId:"mat", partialPct:0.34, color:"#00d4aa" },
    { id:"foam",   name:"PU Foam MDI/TDI",   unit:"$/kg",  baseValue:2.80, currentValue:2.80, source:"ICIS",        lastUpdate:"2024-01-15", bucketId:"mat", partialPct:0.08, color:"#f59e0b" },
    { id:"steel",  name:"HRC Steel",         unit:"$/kg",  baseValue:0.85, currentValue:0.85, source:"Fastmarkets", lastUpdate:"2024-01-15", bucketId:"mat", partialPct:0.02, color:"#6366f1" },
    { id:"zinc",   name:"LME Zinc",          unit:"$/kg",  baseValue:2.40, currentValue:2.40, source:"LME",         lastUpdate:"2024-01-15", bucketId:"mat", partialPct:0.03, color:"#84cc16" },
    { id:"copper", name:"LME Copper",        unit:"$/kg",  baseValue:8.50, currentValue:8.50, source:"LME",         lastUpdate:"2024-01-15", bucketId:"mat", partialPct:0.02, color:"#f97316" },
    { id:"labor",  name:"Mexico Labor Rate", unit:"$/hr",  baseValue:4.32, currentValue:4.32, source:"IMSS/INEGI",  lastUpdate:"2024-01-15", bucketId:"labor",partialPct:1.00,color:"#a855f7" },
    { id:"freight",name:"Freight Mexico-CA", unit:"$/unit",baseValue:2.20, currentValue:2.20, source:"DAT",         lastUpdate:"2024-01-15", bucketId:"logi", partialPct:0.36,color:"#06b6d4" },
  ],

  // ── SUPPLIERS ─────────────────────────────────────────────────────────────
  defaultSuppliers: [
    { id:"S1", name:"Supplier A — Yanfeng MX", region:"Mexico",    active:true,  color:"#00d4aa" },
    { id:"S2", name:"Supplier B — Magna US",   region:"US Midwest",active:true,  color:"#0099ff" },
    { id:"S3", name:"Supplier C — Inteva CN",  region:"China",     active:true,  color:"#f59e0b" },
  ],

  // ── SUPPLIER QUOTES ───────────────────────────────────────────────────────
  defaultQuotes: {
    S1: {
      submittedDate:"2024-02-01", incoterms:"DDP", paymentTerms:"Net60",
      totalPiecePrice: 112.40,
      buckets:[
        {id:"mat",  cost:43.20},{id:"proc", cost:14.10},{id:"labor",cost:5.80},
        {id:"ovhd", cost:11.20},{id:"sga",  cost:8.40},{id:"logi",  cost:6.90},
        {id:"tool", cost:6.10},{id:"test",  cost:3.20},{id:"hidn",  cost:7.80},
        {id:"mrgn", cost:5.70},
      ]
},
    S2: {
      submittedDate:"2024-02-03", incoterms:"DDP", paymentTerms:"Net45",
      totalPiecePrice: 138.50,
      buckets:[
        {id:"mat",  cost:41.80},{id:"proc", cost:18.40},{id:"labor",cost:22.10},
        {id:"ovhd", cost:16.80},{id:"sga",  cost:9.20},{id:"logi",  cost:4.20},
        {id:"tool", cost:5.80},{id:"test",  cost:3.10},{id:"hidn",  cost:11.40},
        {id:"mrgn", cost:5.70},
      ]
},
    S3: {
      submittedDate:"2024-02-02", incoterms:"FOB Shanghai", paymentTerms:"Net60",
      totalPiecePrice: 98.20,
      freightAdder: 5.80,
      dutyAdder: 2.40,
      normalizedTotal: 106.40,
      buckets:[
        {id:"mat",  cost:38.90},{id:"proc", cost:12.80},{id:"labor",cost:7.20},
        {id:"ovhd", cost:10.40},{id:"sga",  cost:7.80},{id:"logi",  cost:8.40},
        {id:"tool", cost:4.90},{id:"test",  cost:2.80},{id:"hidn",  cost:6.90},
        {id:"mrgn", cost:4.80},
      ]
}
  },

  // ── PRICE HISTORY ─────────────────────────────────────────────────────────
  defaultHistory: [
    { rev:0, date:"2024-01-15", label:"Should Cost Baseline",      price:104.85, type:"baseline",  note:"Program award baseline — frozen" },
    { rev:1, date:"2024-02-01", label:"RFQ Award — Supplier A",    price:112.40, type:"award",     note:"Awarded to Yanfeng MX at DDP Net60" },
    { rev:2, date:"2024-04-15", label:"ECN-001 Gate Redesign",     price:111.20, type:"ecn",       note:"DFM: eliminated 1 slider. Saving $1.20/part" },
    { rev:3, date:"2024-07-01", label:"APR Year 1 (3%)",           price:107.86, type:"apr",       note:"Annual price reduction 3% per LTA" },
    { rev:4, date:"2024-10-01", label:"PP Index Adjustment +8%",   price:109.14, type:"index",     note:"ICIS PP up 8%. Passthrough per LTA clause" },
    { rev:5, date:"2025-01-15", label:"ECN-004 USB Upgrade",       price:111.94, type:"ecn",       note:"USB module spec upgrade per engineering CR" },
    { rev:6, date:"2025-07-01", label:"APR Year 2 (3%)",           price:108.58, type:"apr",       note:"Annual price reduction 3% per LTA" },
    { rev:7, date:"2026-01-01", label:"APR Year 3 (3%)",           price:105.32, type:"apr",       note:"Annual price reduction 3% per LTA" },
  ],

  // ── CHECKLIST CRITERIA ────────────────────────────────────────────────────
  defaultChecklist: {
    dimensions: [
      {
        id:"commercial", name:"Commercial", weight:30, color:"#00d4aa",
        criteria:[
          {id:"c1",name:"Piece price vs should cost",          maxScore:10, helpText:"Within 3%=10, 3-8%=7, 8-15%=4, >15%=0"},
          {id:"c2",name:"Tooling cost competitiveness",        maxScore:10, helpText:"Within 10%=10, 10-20%=7, 20-35%=4, >35%=0"},
          {id:"c3",name:"APR commitment (% per year)",         maxScore:10, helpText:">3%=10, 2-3%=7, 1-2%=4, <1%=0"},
          {id:"c4",name:"Payment terms compliance (Net 60)",   maxScore:10, helpText:"Net60=10, Net45=7, Net30=3, worse=0"},
          {id:"c5",name:"Incoterms compliance (DDP)",          maxScore:10, helpText:"DDP=10, DAP=7, FOB=4, EXW=0"},
          {id:"c6",name:"Total program cost TCO",              maxScore:10, helpText:"Lowest TCO=10, ranked vs other suppliers"},
        ]
  },
      {
        id:"quality", name:"Quality", weight:25, color:"#a855f7",
        criteria:[
          {id:"q1",name:"IATF 16949 certification current",    maxScore:10, helpText:"Valid cert=10, In process=5, None=0 (disqualify)"},
          {id:"q2",name:"Current PPM performance",             maxScore:10, helpText:"<50=10, 50-200=7, 200-500=4, >500=0"},
          {id:"q3",name:"PPAP first-time pass rate",           maxScore:10, helpText:">90%=10, 75-90%=7, 60-75%=4, <60%=0"},
          {id:"q4",name:"Warranty return rate",                maxScore:10, helpText:"<0.3%=10, 0.3-0.8%=7, 0.8-2%=4, >2%=0"},
          {id:"q5",name:"Open corrective actions",             maxScore:10, helpText:"None=10, 1-2 minor=6, 3+ or major=0"},
          {id:"q6",name:"Quality systems maturity",            maxScore:10, helpText:"Assessed during site visit and audit"},
        ]
  },
      {
        id:"technical", name:"Technical", weight:20, color:"#0099ff",
        criteria:[
          {id:"t1",name:"Manufacturing process capability",    maxScore:10, helpText:"Full capability=10, Partial=6, Gaps=2"},
          {id:"t2",name:"Similar program experience",          maxScore:10, helpText:"Direct OEM experience=10, Adjacent=6, None=2"},
          {id:"t3",name:"DFM engineering capability",          maxScore:10, helpText:"Strong in-house DFM team=10, Basic=6, None=2"},
          {id:"t4",name:"Technology roadmap alignment",        maxScore:10, helpText:"EV/automation investment=10, Static=5, Behind=2"},
          {id:"t5",name:"Tooling design build capability",     maxScore:10, helpText:"In-house tool design=10, Qualified external=7, Unknown=3"},
          {id:"t6",name:"Geographic fit with supply strategy", maxScore:10, helpText:"Preferred region=10, Acceptable=6, Outside strategy=2"},
        ]
  },
      {
        id:"delivery", name:"Delivery & Execution", weight:15, color:"#f59e0b",
        criteria:[
          {id:"d1",name:"On-time delivery performance",        maxScore:10, helpText:">98.5%=10, 96-98.5%=7, 93-96%=4, <93%=0"},
          {id:"d2",name:"APQP PPAP on-time track record",      maxScore:10, helpText:">90% on time=10, 75-90%=7, <75%=3"},
          {id:"d3",name:"Recent launch experience",            maxScore:10, helpText:"5+ launches 3yrs=10, 2-4=7, 0-1=3"},
          {id:"d4",name:"Capacity availability confirmed",     maxScore:10, helpText:"Confirmed=10, Needs investment=6, Unclear=2"},
          {id:"d5",name:"Supply chain risk profile",           maxScore:10, helpText:"Low risk=10, Medium=6, High=2"},
          {id:"d6",name:"Program management capability",       maxScore:10, helpText:"Dedicated PM team=10, Basic=6, None=2"},
        ]
  },
      {
        id:"financial", name:"Financial & Strategic", weight:10, color:"#ec4899",
        criteria:[
          {id:"f1",name:"Financial stability D&B rating",      maxScore:10, helpText:"Strong=10, Stable=7, Concerns=3, Risk=0"},
          {id:"f2",name:"Customer concentration Tesla %",      maxScore:10, helpText:"5-20%=10, 20-40%=7, >40% or <5%=4"},
          {id:"f3",name:"Strategic alignment EV/sustain.",     maxScore:10, helpText:"Fully aligned=10, Neutral=6, Misaligned=2"},
          {id:"f4",name:"Tesla relationship history",          maxScore:10, helpText:"Strong existing=10, New qualified=6, Poor history=0"},
          {id:"f5",name:"Sub-supplier USMCA management",       maxScore:10, helpText:"Strong visibility=10, Adequate=6, Weak=2"},
        ]
  }
    ],
    disqualifiers:[
      {id:"dq1",name:"No valid IATF 16949 certification"},
      {id:"dq2",name:"Active major corrective action unresolved >90 days"},
      {id:"dq3",name:"Financial distress — D&B risk score red"},
      {id:"dq4",name:"Piece price >20% above should cost after negotiation"},
      {id:"dq5",name:"Refusal to accept Tesla GTC non-negotiable terms"},
      {id:"dq6",name:"PPAP on-time rate <60% historically"},
      {id:"dq7",name:"Cannot confirm capacity within program timing"},
    ]
  },

  // ── LOCAL STORAGE HELPERS ─────────────────────────────────────────────────
  save(key, data) {
    try { localStorage.setItem('ac_'+key, JSON.stringify(data)); } catch(e) {}
  },

  load(key, fallback) {
    try {
      const d = localStorage.getItem('ac_'+key);
      return d ? JSON.parse(d) : fallback;
} catch(e) { return fallback; }
  },

  getBaseline()   { return this.load('baseline',   this.defaultBaseline); },
  getIndices()    { return this.load('indices',    this.defaultIndices); },
  getSuppliers()  { return this.load('suppliers',  this.defaultSuppliers); },
  getQuotes()     { return this.load('quotes',     this.defaultQuotes); },
  getHistory()    { return this.load('history',    this.defaultHistory); },
  getChecklist()  { return this.load('checklist',  this.defaultChecklist); },
  getScores()     { return this.load('scores',     {}); },

  saveBaseline(d)  { this.save('baseline',  d); },
  saveIndices(d)   { this.save('indices',   d); },
  saveQuotes(d)    { this.save('quotes',    d); },
  saveHistory(d)   { this.save('history',   d); },
  saveScores(d)    { this.save('scores',    d); },

  // ── FORMATTING ────────────────────────────────────────────────────────────
  fmtDollar: (v, dec=2) => v==null?'—':'$'+Number(v).toFixed(dec),
  fmtPct: (v, dec=1) => v==null?'—':Number(v).toFixed(dec)+'%',
  fmtK: (v) => v==null?'—':'$'+Math.round(v/1000)+'K',
  fmtDate: (d) => d ? new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : '—',

  // ── CELL COLOR LOGIC ──────────────────────────────────────────────────────
  cellClass(supplierCost, baselineCost) {
    if(!baselineCost || baselineCost===0) return '';
    const pct = (supplierCost - baselineCost) / baselineCost * 100;
    if(pct <= 3)  return 'cell-good';
    if(pct <= 10) return 'cell-warn';
    return 'cell-bad';
  },

  pctDiff(supplierCost, baselineCost) {
    if(!baselineCost || baselineCost===0) return 0;
    return (supplierCost - baselineCost) / baselineCost * 100;
  },

  // ── SCORE INTERPRETATION ──────────────────────────────────────────────────
  scoreLabel(score) {
    if(score >= 85) return {label:'Preferred', cls:'badge-good'};
    if(score >= 70) return {label:'Acceptable', cls:'badge-blue'};
    if(score >= 55) return {label:'Marginal', cls:'badge-warn'};
    return {label:'Not Recommended', cls:'badge-bad'};
  },

  scoreColor(score) {
    if(score >= 85) return 'var(--green)';
    if(score >= 70) return 'var(--accent2)';
    if(score >= 55) return 'var(--amber)';
    return 'var(--red)';
  }
};
