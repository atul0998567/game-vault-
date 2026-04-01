const API_KEY = "9f02e15843794ae6a287f2eb003e84ae";
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const gamesContainer = document.getElementById("games");

async function getGames() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    data.results.forEach((game) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p>Rating: ${game.rating}</p>
      `;

      gamesContainer.appendChild(card);
    });
  } catch (error) {
    gamesContainer.innerHTML = "<p>Failed to load games.</p>";
  }
}

getGames();
