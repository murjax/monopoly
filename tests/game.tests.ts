import { } from "jasmine";

describe("Game", () => {
  it("is true", () => {
    expect(1).toEqual(1);
  });

  it("starts player on position 0", () => {
    const name = "Car";
    const player = new Player(name);
    expect(player.position).toEqual(0);
  });

  it("can roll player dice and update position", () => {
    const name = "Car";
    const player = new Player(name);
    expect(player.position).toEqual(0);
    player.rollAndSetPosition();
    expect(player.position).toBeGreaterThan(0);
  });

  it("rolls back position when max reached", () => {
    const name = "Car";
    const player = new Player(name);
    const maxPosition = player.numberOfPositions;
    player.position = maxPosition;
    player.rollAndSetPosition();
    expect(player.position).toBeLessThan(maxPosition);
  });

  it("Player on beginning location (numbered 0), rolls 7, ends up on location 7", () => {
    const name = "Car";
    const player = new Player(name);
    expect(player.position).toEqual(0);
    spyOn(player, "roll").and.returnValue(7);
    player.rollAndSetPosition();
    expect(player.position).toEqual(7);
  });

  it("Player on location numbered 39, rolls 6, ends up on location 5", () => {
    const name = "Car";
    const player = new Player(name);
    player.position = 39;
    spyOn(player, "roll").and.returnValue(6);
    player.rollAndSetPosition();
    expect(player.position).toEqual(5);
  });

  it("Create a game with two players named Horse and Car.", () => {
    const playerOne = new Player("Horse");
    const playerTwo = new Player("Car");

    const players = [playerOne, playerTwo];

    const board = new Board(players);
    expect(board.players.includes(playerOne)).toEqual(true);
    expect(board.players.includes(playerTwo)).toEqual(true);
  });

  it("Try to create a game with < 2 or > 8 players. When attempting to play the game, it will fail.", () => {
    const playerOne = new Player("Horse");
    const playerTwo = new Player("Car");
    const playerThree = new Player("Iron");
    const playerFour = new Player("Lantern");
    const playerFive = new Player("Thimble");
    const playerSix = new Player("Shoe");
    const playerSeven = new Player("Tophat");
    const playerEight = new Player("Battleship");
    const playerNine = new Player("Cannon");

    const players = [playerOne];

    expect(
      () => { new Board(players) }
    ).toThrow(new Error("Game must have between two and eight players."));
  });

  it("Create a game with two players named Horse and Car. Within creating 100 games, both orders [Horse, Car] and [car, horse] occur.", () => {
    const playerOne = new Player("Horse");
    const playerTwo = new Player("Car");

    const players = [playerOne, playerTwo];
    let firstOrder = false;
    let reverseOrder = false;

    const times = 100;
    for (let i = 0; i < times; i++) {
      const board = new Board(players);
      if (board.players[0] === playerOne) {
        firstOrder = true;
      } else {
        reverseOrder = true;
      }
    }

    expect(firstOrder).toEqual(true);
    expect(reverseOrder).toEqual(true);
  });

  it("Create a game and play, verify that the total rounds was 20 and that each player played 20 rounds.", () => {
    const playerOne = new Player("Horse");
    const playerTwo = new Player("Car");

    const players = [playerOne, playerTwo];
    const board = new Board(players);
    expect(playerOne.roundsPlayed).toEqual(0);
    expect(playerTwo.roundsPlayed).toEqual(0);
    expect(board.roundsPlayed).toEqual(0);

    const rounds = 20;
    for (let i = 0; i < rounds; i++) {
      board.playRound();
    }

    expect(playerOne.roundsPlayed).toEqual(20);
    expect(playerTwo.roundsPlayed).toEqual(20);
    expect(board.roundsPlayed).toEqual(20);
  });

  it("Create a game and play, verify that in every round the order of the players remained the same.", () => {
    const playerOne = new Player("Horse");
    const playerTwo = new Player("Car");

    const players = [playerOne, playerTwo];
    const board = new Board(players);

    const boardPlayerOne = board.players[0];
    const boardPlayerTwo = board.players[1];

    const rounds = 20;
    for (let i = 0; i < rounds; i++) {
      board.playRound();
      expect(board.players[0]).toEqual(boardPlayerOne);
      expect(board.players[1]).toEqual(boardPlayerTwo);
    }
  });
});
