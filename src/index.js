import { header, gameGrid } from "./battleshiphtml.js";
import Player from "./classes/player.js";

const body = document.body;
const main = document.createElement("main");
body.appendChild(main);

const Header = header();
const computerGameGrid = gameGrid('computer');
const playerGameGrid = gameGrid('player1');
const computer = new Player("computer");
const player1 = new Player("Player 1");

main.appendChild(Header);
main.appendChild(computerGameGrid);
main.appendChild(playerGameGrid);

//start button
const startBtn = document.createElement("button");
startBtn.textContent = "Start Game";
// main.appendChild(startBtn);

// add event listeners for game
computerGameGrid.addEventListener("click", (e) => {
  let target = e.target;
  let x = parseInt(target.dataset.x);
  let y = parseInt(target.dataset.y);
  computer.gameBoard.receiveAttack([x, y]);
  let hit = computer.gameBoard.checkIfShipHit([x, y]);
  if (hit) {
    target.classList.add("hit");
    if (computer.gameBoard.checkIfAllShipsSunk()) {
      alert("gameover");
    }
  } else {
    target.classList.add("miss");
  }
});
computer.gameBoard.placeRandom();
player1.gameBoard.placeRandom();

function addShipsToGrid(player, gridList) {
  let grid = player.gameBoard.shipCords;
  for (let cords of grid) {
    let x = gridList.querySelector(
      `[data-x='${cords[0]}'][data-y='${cords[1]}']`
    );
    x.classList.add("ship");
  }
}
addShipsToGrid(player1, playerGameGrid);
// addShipsToGrid(computer, computerGameGrid);

