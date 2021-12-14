import Player from "../classes/player";

describe("Player Class", () => {
  const testPlayer = new Player("Test");
  const testEnemy = new Player("Enemy");
  testEnemy.gameBoard.placeRandom();
  it("attacks with a random choice", () => {
      testPlayer.attack(testEnemy, [0,0]);
      expect(testEnemy.gameBoard.gameBoard[0][0].hit).toBe(true);
  });
});
