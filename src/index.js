import { header, gameGrid } from "./battleshiphtml.js";
import Player from "./classes/player.js";

const body = document.body;
const main = document.createElement("main");
body.appendChild(main);

const Header = header();
const computerGameGrid = gameGrid("computer");
const playerGameGrid = gameGrid("player1");
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
  let result = playRound(computer, [x, y]);
  target.classList.add(result);
});

computer.gameBoard.placeRandom();
player1.gameBoard.placeRandom();

function addShipsToGrid(player, gridList) {
  let cordList = player.gameBoard.shipCords;
  for (let cord in cordList) {
    let [x, y] = cord.split(",");
    let grid = gridList.querySelector(`[data-x='${x}'][data-y='${y}']`);
    grid.classList.add("ship");
    grid.classList.add(`ship${cordList[cord]}`);
  }
}
addShipsToGrid(player1, playerGameGrid);
// addShipsToGrid(computer, computerGameGrid);

function playRound(player, cords) {
  player.gameBoard.receiveAttack(cords);
  let hit = player.gameBoard.checkIfShipHit(cords);
  if (hit) {
    return "hit";
  } else {
    return "miss";
  }
}
