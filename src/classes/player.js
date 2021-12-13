import { GameBoard } from "./gameBoard";

export default class Player {
  constructor(name) {
    (this.name = name), (this.gameBoard = new GameBoard());
  }
}

export class Computer extends Player {
  constructor(name) {
    super(name);
  }
  
}