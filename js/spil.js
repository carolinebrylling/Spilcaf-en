"use strict";

let allGames = [];
let gameList;
let genreSelect;
let searchInput;
let sortSelect;
let gameCount;

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  gameList = document.querySelector("#game-list");
  genreSelect = document.querySelector("#genre-select");
  searchInput = document.querySelector("#search-input");
  sortSelect = document.querySelector("#sort-select");
  gameCount = document.querySelector("#game-count");

  genreSelect.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);


}
fetchGames();
async function fetchGames() {
  const res = await fetch("json/games.json");
  const data = await res.json();
  allGames = data;

  populateGenreSelect();
  showGames(allGames);
}

function showGames(games) {
  gameList.innerHTML = "";
  gameCount.textContent = `Viser ${games.length} ud af ${allGames.length} spil`;

  if (games.length === 0) {
    gameList.innerHTML =
      '<p class="empty">Ingen spil matcher din søgning eller genre.</p>';
    return;
  }

  for (const game of games) {
    showGame(game);
  }
}

function showGame(game) {
  const gameCard = `
    <article class="game-card" tabindex="0">
      <img src="${game.image}" alt="${game.title}" class="game-image" />
      <h2>${game.title}</h2>
      <div class="game-info">
        <div class="title-row">
          <span class="year-badge">(${game.year})</span>
        </div>
        <p class="genre">${game.genre.join(", ")}</p>
        <p class="game-rating">⭐ ${game.rating}</p>
        <p class="players"><strong>Antal spillere:</strong> ${game.players}</p>
      </div>
    </article>
  `;

  gameList.insertAdjacentHTML("beforeend", gameCard);

  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", function () {
    showGameDialog(game);
  });
}