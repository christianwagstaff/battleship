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
  it("places a ship of size 1 on the board", () => {
    testArr[0][0] = { ship: 1 };
    testBoard.placeShip(1, [0, 0], true);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("places a full size ship on the board horizontally", () => {
    testArr[0][0] = { ship: 2 };
    testArr[0][1] = { ship: 2 };
    testBoard.placeShip(2, [0, 0], false);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
  it("places a full size ship on the board vertically", () => {
    testArr[0][0] = { ship: 2 };
    testArr[1][0] = { ship: 2 };
    testBoard.placeShip(2, [0, 0], true);
    expect(testBoard.gameBoard).toMatchObject(testArr);
  });
});
