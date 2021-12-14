import { GameBoard } from "./gameBoard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
  }
  attack(enemy, cords) {
    let findNewLocation = true;
    if (!cords) {
      cords = _randomCords();
    }
    while (findNewLocation) {
      let attacked = enemy.gameBoard.receiveAttack(cords);
      if (attacked) {
        findNewLocation = false;
      }
    }
  }
}
function _randomCords() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return [x, y];
}
