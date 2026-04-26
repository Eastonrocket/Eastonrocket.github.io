const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function safe(text) {
  return String(text ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

function link(label, url, className = "") {
  if (!url) return `<span class="${className}">${safe(label)}</span>`;
  return `<a class="${className}" href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(label)}</a>`;
}

function applySettings() {
  document.body.dataset.theme = SITE_SETTINGS.theme || "slate";
  $("#siteTitle").textContent = SITE_SETTINGS.title;
  $("#subtitle").textContent = SITE_SETTINGS.subtitle;
  $("#siteDescription").textContent = SITE_SETTINGS.description;
  $("#discordLink").href = SITE_SETTINGS.discord;
  $("#footerText").textContent = SITE_SETTINGS.footer;

  $("#normalRules").innerHTML = SITE_SETTINGS.normalRules.map(([title, text]) => `<li><strong>${safe(title)}</strong><p>${safe(text)}</p></li>`).join("");
  $("#submissionRules").innerHTML = SITE_SETTINGS.submissionRules.map(([title, text]) => `<li><strong>${safe(title)}</strong><p>${safe(text)}</p></li>`).join("");
  $("#submitFormat").innerHTML = SITE_SETTINGS.submitFormat.map(item => `<li>${safe(item)}</li>`).join("");
}

function filteredLevels() {
  const q = $("#searchBox").value.toLowerCase().trim();
  const status = $("#statusFilter").value;
  return LEVELS
    .slice()
    .sort((a, b) => Number(a.rank) - Number(b.rank))
    .filter(level => {
      const blob = `${level.rank} ${level.level} ${level.id} ${level.creator} ${level.player} ${level.wr} ${level.notes}`.toLowerCase();
      return (!q || blob.includes(q)) && (status === "all" || level.status === status);
    });
}

function renderLevels() {
  const compact = SITE_SETTINGS.compactCards;
  $("#levelList").innerHTML = filteredLevels().map(level => `
    <article class="level-card ${compact ? "compact" : ""} ${level.status === "verified" ? "verified-card" : ""}">
      <div class="rank-box">#${safe(level.rank)}</div>
      <div class="level-main">
        <h3>${link(level.level, level.showcaseLink, "level-link")}</h3>
        <div class="meta-line">
          ${SITE_SETTINGS.showIDs ? `<span>ID: <b>${safe(level.id)}</b></span>` : ""}
          <span>Creator: ${link(level.creator, level.creatorLink)}</span>
          <span>WR: ${link(level.wr, level.wrLink, "wr-link")}</span>
          ${SITE_SETTINGS.showPoints ? `<span>${safe(level.points)} pts</span>` : ""}
        </div>
        ${SITE_SETTINGS.showNotes ? `<p class="notes">${safe(level.notes)}</p>` : ""}
      </div>
      <span class="status ${level.status}">${safe(level.status)}</span>
    </article>
  `).join("");
}

function renderRecords() {
  $("#recordsList").innerHTML = LEVELS.slice().sort((a,b)=>a.rank-b.rank).map(level => `
    <div class="table-row">
      <span>${link(level.level, level.showcaseLink)}</span>
      <span>${link(level.player, level.playerLink)}</span>
      <span>${link(level.wr, level.wrLink)}</span>
      <span>${safe(level.notes)}</span>
    </div>
  `).join("");
}

function pointTotals(key) {
  const map = new Map();
  for (const level of LEVELS) {
    const name = level[key] || "Unknown";
    const linkKey = key + "Link";
    const current = map.get(name) || { name, points: 0, best: [], link: level[linkKey] };
    current.points += Number(level.points || 0);
    current.best.push(`#${level.rank} ${level.level}`);
    if (!current.link && level[linkKey]) current.link = level[linkKey];
    map.set(name, current);
  }
  return [...map.values()].sort((a,b)=>b.points-a.points);
}

function renderPointList(selector, key) {
  const rows = pointTotals(key).map((item, index) => `
    <div class="table-row ranked-row">
      <span>#${index + 1}</span>
      <span>${link(item.name, item.link)}</span>
      <span><b>${item.points}</b> pts</span>
      <span>${safe(item.best.slice(0, 3).join(", "))}</span>
    </div>
  `).join("");
  $(selector).innerHTML = rows;
}

function setupTabs() {
  $$(".tab").forEach(button => {
    button.addEventListener("click", () => {
      $$(".tab").forEach(b => b.classList.remove("active"));
      $$(".panel").forEach(p => p.classList.remove("active-panel"));
      button.classList.add("active");
      $(`#${button.dataset.tab}`).classList.add("active-panel");
    });
  });
}

function init() {
  applySettings();
  setupTabs();
  renderLevels();
  renderRecords();
  renderPointList("#playerList", "player");
  renderPointList("#creatorList", "creator");
  $("#searchBox").addEventListener("input", renderLevels);
  $("#statusFilter").addEventListener("change", renderLevels);
}

init();
