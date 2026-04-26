const state = { themeIndex: 0, themes: ["neon", "clean", "terminal"], activeTab: "main" };

function safe(text) {
  return String(text ?? "").replace(/[&<>'"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" }[c]));
}
function link(url, text) {
  if (!url) return safe(text);
  return `<a href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(text)}</a>`;
}
function byRank(a,b){ return Number(a.rank || 9999) - Number(b.rank || 9999); }

function getFilteredLevels() {
  const q = document.getElementById("search").value.toLowerCase().trim();
  const sortMode = document.getElementById("sort-mode").value;
  let rows = [...HPL_DATA.levels];
  if (q) {
    rows = rows.filter(l => [l.rank,l.name,l.id,l.creator,l.wr,l.wrPlayer,l.notes].join(" ").toLowerCase().includes(q));
  }
  if (sortMode === "points") rows.sort((a,b) => Number(b.points||0)-Number(a.points||0));
  else if (sortMode === "wr") rows.sort((a,b) => String(a.wr).localeCompare(String(b.wr)));
  else rows.sort(byRank);
  return rows;
}

function renderMain() {
  const rows = getFilteredLevels();
  document.getElementById("main").innerHTML = rows.map(l => `
    <article class="level-card">
      <div class="level-top">
        <div><span class="rank">#${safe(l.rank)}</span><span class="level-title">${link(l.showcaseUrl, l.name)}</span></div>
        <div class="points">${safe(l.points)} pts</div>
      </div>
      <div class="meta">
        <span class="badge">ID: ${safe(l.id)}</span>
        <span class="badge">Creator: ${link(l.creatorUrl, l.creator)}</span>
        <span class="badge">WR: ${link(l.wrUrl, l.wr)} by ${safe(l.wrPlayer || "Unknown")}</span>
        <span class="badge ${String(l.wr).includes("100") ? "verified" : ""}">${safe(l.notes || "No notes")}</span>
      </div>
    </article>
  `).join("");
}

function renderRecords() {
  const rows = [...HPL_DATA.levels].sort(byRank);
  document.getElementById("records").innerHTML = rows.map(l => `
    <article class="level-card">
      <div><span class="rank">#${safe(l.rank)}</span> ${link(l.wrUrl, l.wr)} on ${link(l.showcaseUrl, l.name)}</div>
      <div class="meta"><span class="badge">Player: ${safe(l.wrPlayer)}</span><span class="badge">Creator: ${link(l.creatorUrl, l.creator)}</span></div>
    </article>
  `).join("");
}

function pointTotals(key) {
  const totals = new Map();
  HPL_DATA.levels.forEach(l => {
    const name = l[key] || "Unknown";
    if (!totals.has(name)) totals.set(name, { name, points: 0, best: [] });
    totals.get(name).points += Number(l.points || 0);
    totals.get(name).best.push(`#${l.rank} ${l.name}`);
  });
  return [...totals.values()].sort((a,b)=>b.points-a.points);
}
function renderScores(target, key, title) {
  const rows = pointTotals(key);
  document.getElementById(target).innerHTML = `<div class="grid">${rows.map((p,i)=>`
    <article class="score-card">
      <h3>#${i+1} ${safe(p.name)}</h3>
      <p class="points">${safe(p.points)} points</p>
      <p class="meta">${safe(p.best.join(", "))}</p>
    </article>
  `).join("")}</div>`;
}
function renderCreators() {
  const rows = [...(HPL_DATA.creators || [])].sort((a,b)=>Number(b.totalLevels||0)-Number(a.totalLevels||0));
  if (!rows.length) {
    document.getElementById("creators").innerHTML = `<article class="info-card"><h3>No creator rankings yet</h3><p>Add chosen creators in <b>data.js</b> under <b>creators</b>. The main list does not automatically count creators.</p></article>`;
    return;
  }
  document.getElementById("creators").innerHTML = `<div class="grid">${rows.map((c,i)=>`
    <article class="score-card">
      <h3>#${i+1} ${link(c.url, c.name)}</h3>
      <p class="points">${safe(c.totalLevels)} accepted levels</p>
      <p class="meta">${safe(c.notes || "")}</p>
    </article>
  `).join("")}</div>`;
}
function renderRules() {
  const normal = HPL_DATA.normalRules.map(r => `<article class="info-card"><h3>${safe(r[0])}</h3><p>${safe(r[1])}</p></article>`).join("");
  const sub = HPL_DATA.submissionRules.map(r => `<article class="info-card"><h3>${safe(r[0])}</h3><p>${safe(r[1])}</p></article>`).join("");
  document.getElementById("rules").innerHTML = `<h2>Normal List Rules</h2><div class="grid">${normal}</div><h2>Submission Rules</h2><div class="grid">${sub}</div>`;
}
function renderChanges() {
  document.getElementById("changes").innerHTML = HPL_DATA.changelog.map(c => `<article class="info-card">${safe(c)}</article>`).join("");
}
function renderAll() {
  document.title = HPL_DATA.site.title;
  document.getElementById("site-title").textContent = HPL_DATA.site.title;
  document.getElementById("site-subtitle").textContent = HPL_DATA.site.subtitle;
  document.getElementById("discord-link").href = HPL_DATA.site.discord;
  renderMain(); renderRecords(); renderScores("players","wrPlayer"); renderCreators(); renderRules(); renderChanges();
}

document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".tab,.panel").forEach(el => el.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(btn.dataset.tab).classList.add("active");
}));
document.getElementById("search").addEventListener("input", renderMain);
document.getElementById("sort-mode").addEventListener("change", renderMain);
document.getElementById("theme-toggle").addEventListener("click", () => {
  state.themeIndex = (state.themeIndex + 1) % state.themes.length;
  document.body.className = state.themes[state.themeIndex] === "neon" ? "" : state.themes[state.themeIndex];
});

renderAll();
