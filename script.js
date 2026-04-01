const API_KEY = "YOUR_API_KEY";
const BASE_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const gamesContainer = document.getElementById("gamesContainer");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function renderGames(games) {
  gamesContainer.innerHTML = "";

  if (games.length === 0) {
    gamesContainer.innerHTML = "<p>No games found.</p>";
    return;
  }

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${game.background_image || ''}" alt="${game.name}">
      <div class="game-card-content">
        <h3>${game.name}</h3>
        <p>Rating: ${game.rating || "N/A"}</p>
        <p>Released: ${game.released || "Unknown"}</p>
      </div>
    `;

    gamesContainer.appendChild(card);
  });
}

async function fetchGames(searchQuery = "") {
  try {
    showLoading();
    let url = BASE_URL;

    if (searchQuery.trim() !== "") {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    renderGames(data.results || []);
  } catch (error) {
    gamesContainer.innerHTML = "<p>Failed to load games.</p>";
  } finally {
    hideLoading();
  }
}

searchBtn.addEventListener("click", () => {
  fetchGames(searchInput.value);
});

window.addEventListener("DOMContentLoaded", () => {
  fetchGames();
});
