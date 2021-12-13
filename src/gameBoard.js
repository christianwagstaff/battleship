import createShip from "./ships";
const shipGuide = {
  0: createShip(2, "Patrol Boat"),
  1: createShip(3, "Submarine"),
  2: createShip(3, "Destroyer"),
  3: createShip(4, "Battleship"),
  4: createShip(5, "Carrier"),
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
  _willFitOnBoard(cords, isVertical, shipSize) {
    let [x, y] = cords;
    let finalLocation = isVertical ? x + shipSize : y + shipSize;
    if (finalLocation > 10) {
      return false;
    }
    return true;
  }

  _isSpaceAvailable(cords, isVertical, shipSize) {
    let [x, y] = cords;
    let finalLocation = isVertical ? x + shipSize : y + shipSize;
    if (isVertical) {
      for (let i = x; i < finalLocation; i++) {
        if (this.gameBoard[i][y].ship !== null) {
          console.log("No Space Available");
          return false;
        }
      }
    } else {
      for (let i = y; i < finalLocation; i++) {
        if (this.gameBoard[x][i].ship !== null) {
          console.log("No Space Available");
          return false;
        }
      }
    }
    return true;
  }
  placeShip(shipNumber, cords, isVertical) {
    let [x, y] = cords;
    let ship = shipGuide[shipNumber];
    let shipSize = ship.size;
    let finalLocation = isVertical ? x + shipSize : y + shipSize;
    if (!this._willFitOnBoard(cords, isVertical, shipSize)) {
      return;
    }
    if (!this._isSpaceAvailable(cords, isVertical, shipSize)) {
      return;
    }
    if (isVertical) {
      //   finalLocation = x + shipSize;
      for (let i = x; i < finalLocation; i++) {
        this.gameBoard[i][y].ship = shipNumber;
      }
    } else {
      //   finalLocation = y + shipSize;
      for (let i = y; i < finalLocation; i++) {
        this.gameBoard[x][i].ship = shipNumber;
      }
    }
  }
  recieveShot(cords) {
    let [x, y] = cords;
    let currentSpot = this.gameBoard[x][y];
    if (currentSpot.hit) {
      throw "Spot already Hit!";
    }
    currentSpot.hit = true;
  }
  checkIfShipHit(cords) {
    let [x, y] = cords;
    let currentSpot = this.gameBoard[x][y];
    if (currentSpot.ship !== null) {
      return true;
    }
    return false;
  }
}
