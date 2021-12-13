import createShip from "./ships";
const shipGuide = {
  1: createShip(1, "Test"),
  2: createShip(2, "Patrol Boat")
};

export class GameBoard {
  constructor() {
    this.gameBoard = this.init();
  }
  init() {
    // creates a gameBoard with size 10 x 10
    let board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j] = { ship: null, hit: false };
      }
    }
    return board;
  }
  placeShip(shipNumber, cords, isVertical) {
    let [x, y] = cords;
    let ship = shipGuide[shipNumber];
    let shipSize = ship.size;
    this.gameBoard[x][y].ship = ship.name;;
    if (isVertical) {
      for (let i = x; i < x + shipSize; i++) {
          this.gameBoard[i][y].ship = shipNumber;
      }
    } else {
        for (let i = y; i < y + shipSize; i++) {
            this.gameBoard[x][i].ship = shipNumber;
        }
    }
  }
}
