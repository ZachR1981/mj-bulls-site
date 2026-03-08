async function loadCSV() {
  const res = await fetch("data/mj_seasons.csv");
  const text = await res.text();
  const rows = text.trim().split("\n").slice(1);

  const seasonsDiv = document.getElementById("seasons");

  rows.forEach(row => {
    const cols = row.split(",");

    const season = cols[0];
    const team = cols[1];
    const gp = cols[2];
    const mpg = cols[3];
    const ppg = cols[4];
    const rpg = cols[5];
    const apg = cols[6];
    const fg = cols[7];
    const fg3 = cols[8];
    const ft = cols[9];
    const record = cols[10];
    const playoffs = cols[11];

    const card = document.createElement("div");
    card.className = "season-card";

    card.innerHTML = `
      <h2 id="${season}">${season} ${playoffs.includes("NBA Champions") ? '<span class="badge">🏆 Champions</span>' : ''}</h2>
      <p><strong>Team:</strong> ${team}</p>
      <p><strong>Record:</strong> ${record}</p>
      <p><strong>Stats:</strong> ${ppg} PPG • ${rpg} RPG • ${apg} APG • ${mpg} MPG</p>
      <p><strong>Shooting:</strong> FG ${fg}, 3P ${fg3}, FT ${ft}</p>
      <p><strong>Playoffs:</strong> ${playoffs}</p>
    `;

    seasonsDiv.appendChild(card);
  });

  buildTimeline(rows.map(r => r.split(",")));
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function filterSeasons() {
  const value = document.getElementById("filter").value;
  const cards = document.querySelectorAll(".season-card");

  cards.forEach(card => {
    const isChamp = card.innerHTML.includes("🏆");

    if (value === "all") card.style.display = "block";
    else if (value === "championship" && isChamp) card.style.display = "block";
    else if (value === "nonchampionship" && !isChamp) card.style.display = "block";
    else card.style.display = "none";
  });
}

function buildTimeline(seasons) {
  const timeline = document.getElementById("timeline");
  seasons.forEach(s => {
    const div = document.createElement("div");
    div.textContent = s[0];
    div.onclick = () => location.hash = s[0];
    timeline.appendChild(div);
  });
}

function comparePlayer() {
  const name = document.getElementById("playerName").value;
  const div = document.getElementById("compareResult");

  if (!name) return;

  div.innerHTML = `
    <p><strong>Michael Jordan:</strong> 6× Champion, 5× MVP, 14× All-Star</p>
    <p><strong>${name}:</strong> Comparison data not included in this static site, but you can extend this section with an API or custom dataset.</p>
  `;
}

loadCSV();
