import { header, gameGrid } from "./battleshiphtml.js";

const body = document.body;
const main = document.createElement("main");
body.appendChild(main);

main.appendChild(header());
main.appendChild(gameGrid("player1"));

//start button
const startBtn = document.createElement("button");
startBtn.textContent = "Start Game";
main.appendChild(startBtn);
