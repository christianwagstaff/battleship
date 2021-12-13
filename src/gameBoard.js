import createShip from "./ships";
const shipGuide = {
  0: createShip(2, "Patrol Boat"),
  1: createShip(3, "Submarine"),
  2: createShip(3, "Destroyer"),
  3: createShip(4, "Battleship"),
  4: createShip(5, "Carrier"),
};

function _willFitOnBoard(cords, isVertical, shipSize) {
  let [x, y] = cords;
  let finalLocation = isVertical ? x + shipSize : y + shipSize;
  if (finalLocation > 10) {
    return false;
  }
  return true;
}

function _init() {
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

function _isSpaceAvailable(cords, isVertical, shipSize, board) {
  let [x, y] = cords;
  let finalLocation = isVertical ? x + shipSize : y + shipSize;
  if (isVertical) {
    for (let i = x; i < finalLocation; i++) {
      if (board[i][y].ship !== null) {
        return false;
      }
    }
  } else {
    for (let i = y; i < finalLocation; i++) {
      if (board[x][i].ship !== null) {
        return false;
      }
    }
  }
  return true;
}

export class GameBoard {
  constructor() {
    this.gameBoard = _init();
    this.currentShips = [];
  }

  placeShip(shipNumber, cords, isVertical) {
    if (this.currentShips.includes(shipNumber)) {
      return;
    } else {
      this.currentShips.push(shipNumber);
    }
    let [x, y] = cords;
    let ship = shipGuide[shipNumber];
    let shipSize = ship.size;
    let finalLocation = isVertical ? x + shipSize : y + shipSize;
    if (!_willFitOnBoard(cords, isVertical, shipSize)) {
      return;
    }
    if (!_isSpaceAvailable(cords, isVertical, shipSize, this.gameBoard)) {
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
  receiveAttack(cords) {
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
  checkIfAllShipsSunk() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (!this.gameBoard[x][y].hit && this.gameBoard[x][y].ship !== null) {
          return false;
        }
      }
    }
    return true;
  }
}
