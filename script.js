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

const seasonSelect = document.getElementById("seasonSelect");
const playerSelect = document.getElementById("playerSelect");
const comparisonResult = document.getElementById("comparisonResult");

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
// PLAYER COMPARISON DROPDOWNS
// ===============================
function populateComparisonDropdowns() {
  if (!seasonSelect || !playerSelect) return;

  seasonSelect.innerHTML = "";

  seasonData.forEach(row => {
    const opt = document.createElement("option");
    opt.value = row.season;
    opt.textContent = row.season;
    seasonSelect.appendChild(opt);
  });

  seasonSelect.onchange = () => {
    const season = seasonSelect.value;
    const row = seasonData.find(r => r.season === season);
    if (!row) return;

    const starters = row.starters.split("|").map(s => s.trim());

    playerSelect.innerHTML = "";

    starters.forEach(p => {
      if (!p.includes("Jordan")) {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        playerSelect.appendChild(opt);
      }
    });
  };

  if (seasonSelect.options.length > 0) {
    seasonSelect.dispatchEvent(new Event("change"));
  }
}

// ===============================
// PLAYER COMPARISON LOGIC
// ===============================
function comparePlayers() {
  const season = seasonSelect.value;
  const player = playerSelect.value;

  const row = seasonData.find(r => r.season === season);
  if (!row) return;

  comparisonResult.innerHTML = `
    <h3>${season}</h3>
    <p><strong>Michael Jordan:</strong> ${row.ppg} PPG, ${row.rpg} RPG, ${row.apg} APG</p>
    <p><strong>Advanced:</strong> PER ${row.mj_per}, WS ${row.mj_ws}, BPM ${row.mj_bpm}</p>
    <p><strong>${player}:</strong> Starter-level impact (teammate stats can be added later)</p>
    <p><strong>Team Context:</strong> Coach ${row.coach}, SRS ${row.team_srs}, OffRtg ${row.team_off_rtg}, DefRtg ${row.team_def_rtg}</p>
  `;
}

// ===============================
// LOAD CSV + BUILD SEASON CARDS
// ===============================
fetch("data/mj_seasons.csv")
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.split("\n").slice(1);

    rows.forEach(row => {
      if (!row.trim()) return;

      const [
        season, team, gp, mpg, ppg, rpg, apg,
        fg_pct, fg3_pct, ft_pct,
        team_record, playoff_result, starters,
        coach, team_srs, team_off_rtg, team_def_rtg,
        mj_per, mj_ws, mj_bpm, awards
      ] = row.split(",");

      const dataRow = {
        season, team, gp, mpg, ppg, rpg, apg,
        fg_pct, fg3_pct, ft_pct,
        team_record, playoff_result, starters,
        coach, team_srs, team_off_rtg, team_def_rtg,
        mj_per, mj_ws, mj_bpm, awards
      };

      seasonData.push(dataRow);

      // Build season card
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
        <p><strong>Rebounds Per Game:</strong> ${rpg}</p>
        <p><strong>Assists Per Game:</strong> ${apg}</p>

        <p><strong>FG%:</strong> ${fg_pct}</p>
        <p><strong>3PT%:</strong> ${fg3_pct}</p>
        <p><strong>FT%:</strong> ${ft_pct}</p>

        <hr>

        <p><strong>Team Record:</strong> ${team_record}</p>
        <p><strong>Playoff Result:</strong> ${playoff_result}</p>

        <p><strong>Team Metrics:</strong> SRS ${team_srs}, OffRtg ${team_off_rtg}, DefRtg ${team_def_rtg}</p>
        <p><strong>MJ Impact:</strong> PER ${mj_per}, WS ${mj_ws}, BPM ${mj_bpm}</p>
        <p><strong>Awards:</strong> ${awards}</p>

        <button class="toggle-btn" onclick="this.nextElementSibling.classList.toggle('hidden')">
          Show Starters
        </button>
        <div class="hidden">
          <p><strong>Starters:</strong> ${starters.split("|").join(", ")}</p>
        </div>

        <button class="toggle-btn" onclick="this.nextElementSibling.classList.toggle('hidden')">
          Playoff Path
        </button>
        <div class="hidden">
          <p>${playoff_result}</p>
        </div>
      `;

      seasonsDiv.appendChild(card);

      // Add to timeline
      addToTimeline(season);
    });

    populateComparisonDropdowns();
  });
