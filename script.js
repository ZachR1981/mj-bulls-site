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

// ===============================
// TIMELINE BUILDER
// ===============================
function addToTimeline(season) {
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
fetch("data/mj_seasons.csv?v=11")
  .then(response => response.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data;

    rows.forEach(row => {
      if (!row.season) return;

      // SAFETY: Prevent undefined fields from breaking the page
      const safe = field => field ? field : "—";

      const card = document.createElement("div");
      card.className = "season-card";
      card.id = `season-${row.season}`;

      card.innerHTML = `
        <h2>${row.season}</h2>
        <p><strong>Team:</strong> ${safe(row.team)}</p>
        <p><strong>Coach:</strong> ${safe(row.coach)}</p>

        <p><strong>Games Played:</strong> ${safe(row.gp)}</p>
        <p><strong>Minutes Per Game:</strong> ${safe(row.mpg)}</p>
        <p><strong>Points Per Game:</strong> ${safe(row.ppg)}</p>
        <p><strong>Rebounds Per Game:</strong> ${safe(row.rpg)}</p>
        <p><strong>Assists Per Game:</strong> ${safe(row.apg)}</p>

        <p><strong>FG%:</strong> ${safe(row.fg_pct)}</p>
        <p><strong>3PT%:</strong> ${safe(row.fg3_pct)}</p>
        <p><strong>FT%:</strong> ${safe(row.ft_pct)}</p>

        <hr>

        <p><strong>Team Record:</strong> ${safe(row.team_record)}</p>
        <p><strong>Playoff Result:</strong> ${safe(row.playoff_result)}</p>

        <p><strong>Team Metrics:</strong> SRS ${safe(row.team_srs)}, OffRtg ${safe(row.team_off_rtg)}, DefRtg ${safe(row.team_def_rtg)}</p>
        <p><strong>MJ Impact:</strong> PER ${safe(row.mj_per)}, WS ${safe(row.mj_ws)}, BPM ${safe(row.mj_bpm)}</p>
        <p><strong>Awards:</strong> ${safe(row.awards)}</p>

        <button class="toggle-btn">Starters</button>
        <div class="toggle-content hidden">
          <p>${safe(row.starters).split("|").join(", ")}</p>
        </div>

        <button class="toggle-btn">Playoff Path</button>
        <div class="toggle-content hidden">
          <p>${safe(row.playoff_result)}</p>
        </div>
      `;

      seasonsDiv.appendChild(card);
      addToTimeline(row.season);
    });

    // ACTIVATE TOGGLES
    document.querySelectorAll(".toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.nextElementSibling.classList.toggle("hidden");
      });
    });
  });
