import { GameBoard } from "../gameBoard.js";
function init() {
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

describe("Battleship GameBoard", () => {
  let testBoard;
  let testArr;
  beforeEach(() => {
    testBoard = new GameBoard();
    testArr = init();
  });
  it("creates an empty gameBoard", () => {
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("places a full size ship on the board horizontally", () => {
    testArr[0][0] = { ship: 0 };
    testArr[0][1] = { ship: 0 };
    testBoard.placeShip(0, [0, 0], false);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("places a full size ship on the board vertically", () => {
    testArr[0][0] = { ship: 0 };
    testArr[1][0] = { ship: 0 };
    testBoard.placeShip(0, [0, 0], true);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("doesn't allow ships to be placed where they will go past the board", () => {
    testBoard.placeShip(2, [9, 0], true);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("doesn't allow ships to be placed on another ship", () => {
    testArr[0][0] = { ship: 0 };
    testArr[1][0] = { ship: 0 };
    testBoard.placeShip(0, [0, 0], true);
    testBoard.placeShip(3, [0, 0], true);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("updates a cell when shot", () => {
    testBoard.receiveAttack([0, 0]);
    expect(testBoard.gameBoard[0][0].hit).toBe(true);
  });
  it("doesn't allow the same cell to be hit twice", () => {
    testBoard.receiveAttack([0, 0]);
    expect(() => testBoard.receiveAttack([0, 0])).toThrow();
  });
  it("responds to missing a ship", () => {
    testBoard.receiveAttack([0, 0]);
    expect(testBoard.checkIfShipHit([0,0])).toBe(false);
  })
  it("responds to hitting a ship", () => {
    testBoard.placeShip(0, [0,0], true)
    testBoard.receiveAttack([0,0]);
    expect(testBoard.checkIfShipHit([0,0])).toBe(true);
  })
  it("reports if there is all ships are sunk", () => {
    testBoard.placeShip(0, [0,0],true)
    testBoard.receiveAttack([0,0]);
    expect(testBoard.checkIfAllShipsSunk()).toBe(false)
    testBoard.receiveAttack([1,0]);
    expect(testBoard.checkIfAllShipsSunk()).toBe(true)
  })
});
