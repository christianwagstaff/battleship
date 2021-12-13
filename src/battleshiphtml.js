export function header() {
  const h1 = document.createElement("h1");
  h1.textContent = "Battleship";
  return h1;
}

export function gameGrid(player) {
  const container = document.createElement("div");
  container.classList.add("gameGrid");
  container.classList.add(player);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let grid = document.createElement("div");
      grid.dataset.x = i;
      grid.dataset.y = j;
      container.appendChild(grid);
    }
  }
  return container;
}
