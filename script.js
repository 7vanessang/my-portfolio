/* vanessa ng — portfolio */
(() => {

/* Sections around the wheel. Index 0 is the name (intro). Add or remove entries freely: the wheel re-spaces itself. */
const S = [
  {slug:"", img:"images/intro.webp?v=2", name:true},
  {slug:"experience", img:"images/experience.webp?v=2", t:"experience", sub:"kraft heinz / google / {alan}"},
  {slug:"projects", img:"images/projects.webp?v=2", t:"projects", sub:"{polaris} / retain / immi"},
  {slug:"journal", img:"images/journal.webp?v=2", t:"journal", sub:"notes / lessons / {drafts}"},
  {slug:"awards", img:"images/awards.webp?v=2", t:"awards", sub:"{hackathons} / waterloo / skills ontario"},
  {slug:"toolkit", img:"images/toolkit.webp?v=2", t:"toolkit", sub:"sql / {python} / figma"},
  {slug:"education", img:"images/education.webp?v=2", t:"education", sub:"{rotman} / strategy / innovation"},
  {slug:"off-duty", img:"images/off-duty.webp?v=2", t:"off duty", sub:"{photography} / dumplings / live music"}
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const cap = t => `<i>${esc(t[0])}</i>${esc(t.slice(1))}`;
const num = i => String(i).padStart(2,"0");

/* ---------- section content ---------- */
const EXP = [
  ["May 2027 · incoming","Summer Intern","Kraft Heinz","A 16-week internship in consumer packaged goods at a $42B company."],
  ["Sep 2026 – present","Technology Consultant, pro bono","Google","Building commercialization and go-to-market recommendations for YouTube Canada: creator monetization trends, sponsorship budget allocation, and what holds advertisers back in the Canadian creator economy.",true],
  ["Sep 2026 – Dec 2026","Women's Advisory Program, Technology & Operations","RBC","Selected at a 5% acceptance rate for a 16-week professional development program in technology and financial services."],
  ["May 2026 – Aug 2026","Founding Revenue Operations Intern","Alan","Selected at a 0.2% acceptance rate at a $9B health-tech insurer. Stress-tested SMB and enterprise outreach as a BDR, opening about $5.4M in potential ARPU; built LLM-based client sourcing in Salesforce, sales automations and RFP procedures; wrote external communications for a 10-year Wealthsimple co-selling partnership; ran Canada brand campaigns with 1M+ impressions."],
  ["Oct 2025 – Apr 2026","Marketing & Communications Intern","Spaces & Experiences","Full production on 8 campaigns for university real estate, the bookstore and residences. Posts averaged 40K views, 4× the team benchmark."],
  ["Jun 2023 – Jul 2023","Intern","Kathryn Vogel Architect","Designed project cover pages, worked alongside the architects, and organized a clothing drive."],
  ["Sep 2022 – Jun 2025","Co-Founder & Team Captain","Westmount EV Race Team","Co-founded the city's first motorsport team and scaled it to 30+ members and 11 sponsors to deliver a competition electric vehicle. Owned every business function and was a core 3D technical contributor; one of the first students invited to speak at Siemens national town halls."]
];
const GH = "https://github.com/7vanessang?tab=repositories";
const PROJ = [
  ["polaris","Nov 2026","RBC WTAP 2026 hackathon","A first-line mentor for RBC early talent that turns what students ask into anonymized program insight.","typescript","https://github.com/7vanessang/rbc-wtap-2026-hackathon"],
  ["retain","Mar 2026","MedSprint 2026 · 1st in track, 3rd overall","A medium-fidelity, tongue-controlled knee brace design.","c++","https://github.com/7vanessang/retain"],
  ["battleship","Mar 2026","CSC108 assignment 2 · 98%","The game functions for Battleship, tracking ships through hit, miss and sink.","python","https://github.com/7vanessang/csc108_battleship"],
  ["wordlock","Mar 2026","CSC108 assignment 1 · 100%","The game functions for a word-lock puzzle, using string manipulation and conditional logics.","python","https://github.com/7vanessang/csc108_wordlock"],
  ["immi","Jan 2026","Best Use of ElevenLabs · MLH, DeltaHacks 12","Assistive technology, software and hardware, built at DeltaHacks 12.","html","https://github.com/7vanessang/immi"],
  ["the channel","2021 – 2023","YouTube Partner","An Animal Crossing channel grown to 1M+ views, 11K+ subscribers and 7K+ watch hours.","video / editing / community",""]
];
/* Journal entries live in journal.md. Each entry starts with "## YYYY-MM-DD · title". */
let JOUR = null;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function inlineMd(t){
  return esc(t)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
function blocksOf(body){
  return body.split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean).map(b=>{
    const h = b.match(/^#{2,4}\s+(.+)$/);
    if (h && !b.includes("\n")) return {t:"h", html:inlineMd(h[1])};
    const lines = b.split("\n");
    if (lines.every(l=>/^\s*[-*]\s+/.test(l))) return {t:"ul", html:lines.map(l=>`<li>${inlineMd(l.replace(/^\s*[-*]\s+/,""))}</li>`).join("")};
    return {t:"p", html:inlineMd(lines.join(" "))};
  });
}
function parseJournal(md){
  md = md.replace(/<!--[\s\S]*?-->/g, "");
  return md.split(/^## (?=\d{4}-\d{2}-\d{2})/m).slice(1).map(block=>{
    const nl = block.indexOf("\n");
    const head = (nl < 0 ? block : block.slice(0, nl)).trim();
    const body = nl < 0 ? "" : block.slice(nl + 1);
    const m = head.match(/^(\d{4})-(\d{2})-(\d{2})\s*[·|\-–—:]\s*(.+)$/);
    if (!m) return null;
    return {key:m[1]+m[2]+m[3], y:m[1], mo:MONTHS[+m[2]-1]||"", d:String(+m[3]), title:m[4].trim(), blocks:blocksOf(body)};
  }).filter(Boolean).sort((a,b)=>b.key.localeCompare(a.key));
}
function journalHTML(){
  if (!JOUR) return `<p class="note">loading…</p>`;
  if (!JOUR.length) return `<p class="note r" style="--i:2;margin:0">nothing here yet. first entry coming soon.</p>`;
  return `<div class="jour">${JOUR.map((j,k)=>`<article class="entry r" style="--i:${k+2}"><div class="dt"><b>${esc(j.d)}</b>${esc(j.mo)} ${esc(j.y)}</div><div><h3>${esc(j.title)}</h3>${j.blocks.map((b,n)=>{ const tag = b.t==="h" ? "h4" : b.t; return `<${tag}${n?' class="more" hidden':""}>${b.html}</${tag}>`; }).join("")}${j.blocks.length>1?`<button class="readmore" type="button" aria-expanded="false">read more</button>`:""}</div></article>`).join("")}</div>`;
}
function loadJournal(){
  if (JOUR) return;
  fetch("journal.md", {cache:"no-cache"})
    .then(r => r.ok ? r.text() : "")
    .catch(() => "")
    .then(t => { JOUR = parseJournal(t); const box = document.getElementById("jbox"); if (box){ box.innerHTML = journalHTML(); requestAnimationFrame(fitMask); } });
}
const AW = [
  ["MedSprint, McMaster","1st in track, 3rd overall · for retain","2026",""],
  ["DeltaHacks 12","Best Use of ElevenLabs, an MLH award · for immi","2026","https://devpost.com/software/immi-325jt0"],
  ["Dennis Weishar Engineering Design Award","University of Waterloo EV Challenge · top prize across all university and high school teams","2024","https://uwaterloo.ca/electric-vehicle-challenge/2024-race-results"],
  ["Guest speaker, Siemens national town halls","the first students invited","2024",""],
  ["Mechanical CAD, provincial top 15","Skills Ontario","2023","https://skillsontario.com/wp-content/uploads/1a2023_SOC_Results.pdf"]
];
const TK = [
  ["languages",["SQL","Python","JavaScript","HTML","CSS"]],
  ["design & cad",["Figma","AutoCAD","Autodesk Inventor","Fusion 360"]],
  ["go-to-market",["Salesforce","sales automation","RFP processes","brand campaigns"]],
  ["strengths",["cross-functional stakeholder management","digital transformation","technical-to-business translation"]]
];
const EDU = [
  ["2029","Rotman School of Management, University of Toronto","BCom, Management Specialist: Strategy & Innovation, and Science, Technology & Society",true],
  ["2025","Westmount Secondary School","Specialist High Skills Major in Environmental Studies · Wildcat Award"],
  ["2024","Mohawk College","Aircraft Maintenance dual credit, completed in grade 11: advanced composites and aircraft engines, with honours"]
];
const CAMPUS = ["UTFR Business Recruitment Lead","UTFR External Relations Associate","UTCA Associate Consultant","IPS Summer Product Member"];
const OFF = ["photography","dumpling folding","live music","motorsport","fitness & wellness"];

let ri = 0; const r = () => `class="r" style="--i:${ri++}"`;
function head(i){
  return `<button class="back r" style="--i:0" type="button" data-go="0">← back</button>
  <div class="sh r" style="--i:1"><span class="n">${num(i)}</span><h2>${cap(S[i].t)}</h2></div>`;
}
const BODY = {
  "": () => {
    const paras = [
      "welcome to my PORTFOLIO, a place that shows what I’ve done with a feel for who I am and how I think.",
      "i want to make a life that feels _interesting _and _meaningful.",
      "to me, it means being thoughtful and driven; and to build things that matter while staying open-hearted toward the people involved."
    ];
    let k = 0;
    return paras.map(t=>`<p class="intro">${t.split(" ").map(w=>{
      const it = w[0]==="_";
      return `<span${it?' class="it"':""} style="animation-delay:${1100+(k++)*22}ms">${esc(it?w.slice(1):w)}</span>`;
    }).join(" ")}</p>`).join("");
  },
  experience: i => head(i) + `<ol class="exp">${EXP.map(e=>`<li ${r()}${e[4]?' data-on':""}><div class="role">${cap(e[1])}</div><div class="meta"><span class="org">${esc(e[2])}</span><span class="d">${esc(e[0])}</span></div><p>${esc(e[3])}</p></li>`).join("")}</ol>`,
  projects: i => head(i) + `<a class="ghall r" style="--i:${ri++}" href="${GH}" target="_blank" rel="noreferrer">all repositories on github ↗</a><div class="proj">${PROJ.map(p=>`<article class="card r" style="--i:${ri++}"><div class="hd"><h3>${esc(p[0])}</h3><span class="y">${esc(p[1])}</span></div>${p[2]?`<span class="badge">${esc(p[2])}</span>`:""}<p>${esc(p[3])}</p><span class="tags">${esc(p[4])}</span>${p[5]?` · <a class="gh" href="${esc(p[5])}" target="_blank" rel="noreferrer">repo ↗</a>`:""}</article>`).join("")}</div>`,
  journal: i => { loadJournal(); return head(i) + `<div id="jbox">${journalHTML()}</div>`; },
  awards: i => head(i) + `<ol class="aw">${AW.map((a,k)=>`<li ${r()}><span class="n">${num(k+1)}</span><div><div class="t">${a[3]?`<a href="${esc(a[3])}" target="_blank" rel="noreferrer">${cap(a[0])}<span class="arr"> ↗</span></a>`:cap(a[0])}</div><div class="s">${esc(a[1])}</div></div><span class="yr">${esc(a[2])}</span></li>`).join("")}</ol>`,
  toolkit: i => head(i) + `<div class="tk">${TK.map(g=>`<div ${r()}><p class="lab">${esc(g[0])}</p><div class="chips">${g[1].map(c=>`<span class="chip">${esc(c)}</span>`).join("")}</div></div>`).join("")}</div>`,
  education: i => head(i) + `<div class="edu">${EDU.map(e=>`<div class="school r" style="--i:${ri++}"><span class="big">${esc(e[0])}</span><div><h3>${esc(e[1])}</h3><p>${esc(e[2])}</p>${e[3]?`<p class="lab" style="margin:12px 0 7px;color:var(--muted)">on campus</p><div class="chips">${CAMPUS.map(c=>`<span class="chip">${esc(c)}</span>`).join("")}</div>`:""}</div></div>`).join("")}</div>`,
  "off-duty": i => head(i) + `<p class="off r" style="--i:${ri++}">${OFF.map(o=>`<span>${esc(o)}</span>`).join('<span class="sep"> / </span>')}</p>`
};

/* ---------- build photos + wheel ---------- */
const photos = document.getElementById("photos");
photos.innerHTML = S.map((s,i)=>`<div class="ph ph-${s.slug||"intro"}${i?"":" on"}" style="background-image:url('${s.img}')"></div>`).join("");
const phs = [...photos.children];

const rot = document.getElementById("rot");
const fakeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=^~";
const subHTML = s => esc(s).replace(/\{([^}]+)\}/g,(m,w)=>`<span class="scr"><span class="real">${w}</span><span class="fake" data-n="${w.length}" data-w="${w}"></span></span>`);
const delays = [0,570,500,810,710,990,910,1110];
rot.innerHTML = S.map((s,i)=>{
  const d = delays[i] ?? 500 + i*90;
  if (s.name) return `<button class="item name act" data-i="${i}" type="button" aria-label="Vanessa Ng — intro" aria-current="true"><span class="in2 pop" style="--d:${d}ms"><span class="ti">vanessa<br>ng</span></span></button>`;
  return `<button class="item" data-i="${i}" type="button" aria-label="${esc(s.t)}"><span class="in2 pop" style="--d:${d}ms"><span class="lay"><span class="n">${num(i)}</span><span class="tx"><span class="ti">${cap(s.t)}</span><span class="su">${subHTML(s.sub)}</span></span></span></span></button>`;
}).join("");
const items = [...rot.children];
const step = 360 / S.length;
const mq = matchMedia("(max-width: 899px)");
const R = 34.9;

function place(){
  const phone = mq.matches;
  items.forEach((el,i)=>{
    const t = i*step, a = t*Math.PI/180;
    const x = phone ? 50 + R*Math.sin(a) : 50 - R*Math.cos(a);
    const y = phone ? 50 - R*Math.cos(a) : 50 - R*Math.sin(a);
    el.style.left = x + "%"; el.style.top = y + "%";
    el.style.transform = `translate(-50%,-50%) rotate(${t}deg)`;
  });
}
place();
mq.addEventListener("change", place);

/* scrambled words on inactive items */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fakes = [...rot.querySelectorAll(".fake")];
function scramble(){
  fakes.forEach(f=>{
    let s=""; const w=f.dataset.w;
    for (let k=0;k<w.length;k++) s += w[k]===" " ? " " : fakeChars[Math.random()*fakeChars.length|0];
    f.textContent = s;
  });
}
scramble();
if (!reduce) setInterval(scramble, 140);

/* ---------- state ---------- */
const panel = document.getElementById("panel");
let cur = -1, angle = 0, first = true;

function render(i){
  ri = 2;
  panel.innerHTML = BODY[S[i].slug](i);
  panel.scrollTop = 0;
  requestAnimationFrame(fitMask);
}
function fitMask(){ panel.classList.toggle("fadeb", panel.scrollHeight - panel.clientHeight - panel.scrollTop > 4); panel.classList.toggle("fadet", panel.scrollTop > 4); }
panel.addEventListener("scroll", fitMask, {passive:true});
addEventListener("resize", fitMask);

function go(i, push){
  i = ((i % S.length) + S.length) % S.length;
  if (i === cur) return;
  cur = i;
  const target = -i*step;
  let delta = ((target - angle) % 360 + 540) % 360 - 180;
  angle += delta;
  rot.style.transform = `rotate(${angle}deg)`;
  items.forEach((el,k)=>{ el.classList.toggle("act", k===i); el.toggleAttribute("aria-current", k===i); });
  phs.forEach((p,k)=>p.classList.toggle("on", k===i));
  document.body.classList.toggle("open", i>0);
  if (first){ render(i); first = false; }
  else {
    panel.classList.add("out");
    setTimeout(()=>{ render(i); panel.classList.remove("out"); }, 170);
  }
  if (push){
    if (S[i].slug) location.hash = S[i].slug;
    else { try { history.replaceState(null, "", location.pathname + location.search); } catch(e){ location.hash = ""; } }
  }
}

rot.addEventListener("click", e=>{
  const b = e.target.closest(".item"); if (!b) return;
  const i = +b.dataset.i;
  go(i === cur && i !== 0 ? 0 : i, true);
});
panel.addEventListener("click", e=>{
  const rm = e.target.closest(".readmore");
  if (rm){ const open = rm.getAttribute("aria-expanded") === "true"; rm.parentElement.querySelectorAll(".more").forEach(p=>p.hidden = open); rm.setAttribute("aria-expanded", String(!open)); rm.textContent = open ? "read more" : "show less"; requestAnimationFrame(fitMask); }
});
panel.addEventListener("click", e=>{ const b = e.target.closest("[data-go]"); if (b){ go(+b.dataset.go, true); items[0].focus({preventScroll:true}); }});
addEventListener("keydown", e=>{
  if (e.target.closest("input,textarea")) return;
  if (e.key==="ArrowRight"||e.key==="ArrowDown"){ go(cur+1,true); e.preventDefault(); }
  else if (e.key==="ArrowLeft"||e.key==="ArrowUp"){ go(cur-1,true); e.preventDefault(); }
  else if (e.key==="Escape"){ go(0,true); }
});
function fromHash(){ const s = location.hash.slice(1); const i = S.findIndex(x=>x.slug===s); go(i>0?i:0, false); }
addEventListener("hashchange", fromHash);
fromHash();

/* copy email */
const contact = document.getElementById("contact");
document.getElementById("copy").addEventListener("click", async ()=>{
  const addr = document.getElementById("mail").textContent;
  try { await navigator.clipboard.writeText(addr); }
  catch(e){ const rg = document.createRange(); rg.selectNodeContents(document.getElementById("mail")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(rg); }
  contact.classList.add("copied");
  setTimeout(()=>contact.classList.remove("copied"), 1800);
});
})();
