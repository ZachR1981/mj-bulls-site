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
// LOAD CSV USING PAPAPARSE
// ===============================
fetch("data/mj_seasons.csv?v=10")
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data;

    rows.forEach(dataRow => {
      if (!dataRow.season) return;

      const card = document.createElement("div");
      card.className = "season-card";
      card.id = `season-${dataRow.season}`;

      card.innerHTML = `
        <h2>${dataRow.season}</h2>
        <p><strong>Team:</strong> ${dataRow.team}</p>
        <p><strong>Coach:</strong> ${dataRow.coach}</p>

        <p><strong>Games Played:</strong> ${dataRow.gp}</p>
        <p><strong>Minutes Per Game:</strong> ${dataRow.mpg}</p>
        <p><strong>Points Per Game:</strong> ${dataRow.ppg}</p>
        <p><strong>Rebounds Per Game:</strong> ${dataRow.rpg}</p>
        <p><strong>Assists Per Game:</strong> ${dataRow.apg}</p>

        <p><strong>FG%:</strong> ${dataRow.fg_pct}</p>
        <p><strong>3PT%:</strong> ${dataRow.fg3_pct}</p>
        <p><strong>FT%:</strong> ${dataRow.ft_pct}</p>

        <hr>

        <p><strong>Team Record:</strong> ${dataRow.team_record}</p>
        <p><strong>Playoff Result:</strong> ${dataRow.playoff_result}</p>

        <p><strong>Team Metrics:</strong> SRS ${dataRow.team_srs}, OffRtg ${dataRow.team_off_rtg}, DefRtg ${dataRow.team_def_rtg}</p>
        <p><strong>MJ Impact:</strong> PER ${dataRow.mj_per}, WS ${dataRow.mj_ws}, BPM ${dataRow.mj_bpm}</p>
        <p><strong>Awards:</strong> ${dataRow.awards}</p>

        <!-- STARTERS TOGGLE -->
        <button class="toggle-btn starters-btn">Starters</button>
        <div class="toggle-content starters-content hidden">
          <p><strong>Starters:</strong> ${dataRow.starters.split("|").join(", ")}</p>
        </div>

        <!-- PLAYOFF PATH TOGGLE -->
        <button class="toggle-btn playoff-btn">Playoff Path</button>
        <div class="toggle-content playoff-content hidden">
          <p>${dataRow.playoff_result}</p>
        </div>
      `;

      seasonsDiv.appendChild(card);
      addToTimeline(dataRow.season);
    });

    // ===============================
    // ACTIVATE ALL TOGGLES
    // ===============================
    document.querySelectorAll(".toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.nextElementSibling.classList.toggle("hidden");
      });
    });
  });
