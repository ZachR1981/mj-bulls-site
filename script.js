// ===============================
// DARK MODE TOGGLE
// ===============================
const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// ===============================
// GLOBAL ELEMENTS
// ===============================
const timelineDiv = document.getElementById("timeline");
const seasonsDiv = document.getElementById("seasons");

let seasonData = [];

// ===============================
// TIMELINE BUILDER
// ===============================
function addToTimeline(season) {
  if (!timelineDiv) return;

  const div = document.createElement("div");
  div.textContent = season;
  div.className = "timeline-item";

  div.onclick = () => {
    const card = document.getElementById(`season-${season}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  timelineDiv.appendChild(div);
}

// ===============================
// GOAT COMPARISON DATA
// ===============================
const goatStats = {
  "Michael Jordan": { ppg: 30.1, rings: 6, mvps: 5, dpoy: 1 },
  "LeBron James": { ppg: 27.1, rings: 4, mvps: 4, dpoy: 0 },
  "Kobe Bryant": { ppg: 25.0, rings: 5, mvps: 1, dpoy: 0 },
  "Kareem Abdul-Jabbar": { ppg: 24.6, rings: 6, mvps: 6, dpoy: 0 },
  "Bill Russell": { ppg: 15.1, rings: 11, mvps: 5, dpoy: 0 }
};

// ===============================
// GOAT COMPARISON LOGIC
// ===============================
function compareGOAT() {
  const player = document.getElementById("goatSelect").value;

  const mj = goatStats["Michael Jordan"];
  const other = goatStats[player];

  document.getElementById("goatResult").innerHTML = `
    <h3>Michael Jordan vs ${player}</h3>

    <p><strong>Scoring Average:</strong> MJ ${mj.ppg} PPG — ${player} ${other.ppg} PPG</p>
    <p><strong>Championships:</strong> MJ ${mj.rings} — ${player} ${other.rings}</p>
    <p><strong>MVP Awards:</strong> MJ ${mj.mvps} — ${player} ${other.mvps}</p>
    <p><strong>Defensive Player of the Year:</strong> MJ ${mj.dpoy} — ${player} ${other.dpoy}</p>

    <p class="goat-bold">The numbers speak for themselves.</p>
  `;
}

// ===============================
// LOAD CSV + BUILD SEASON CARDS
// ===============================
fetch("data/mj_seasons.csv?v=6")
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split("\n").slice(1);

    rows.forEach(row => {
      if (!row.trim()) return;

      const parts = row.split(",");
      if (parts.length < 21) return; // expecting 21 columns

      const [
        season, team, gp, mpg, ppg, rpg, apg,
        fg_pct, fg3_pct, ft_pct,
        team_record, playoff_result, starters,
        coach, team_srs, team_off_rtg, team_def_rtg,
        mj_per, mj_ws, mj_bpm, awards
      ] = parts;

      const card = document.createElement("div");
      card.className = "season-card";
      card.id = `season-${season}`;

      card.innerHTML = `
        <h2>${season}</h2>
        <p><strong>Team:</strong> ${team}</p>
        <p><strong>Coach:</strong> ${coach}</p>

        <p><strong>Games Played:</strong> ${gp}</p>
        <p><strong>Minutes Per Game:</strong> ${mpg}</p>
        <p><strong>Points Per Game:</strong> ${ppg}</p>
        <p><strong>Rebounds Per Game:</strong>
