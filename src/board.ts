class Board {
  public players: Player[] = [];
  public roundsPlayed = 0;

  constructor(players: Player[]) {
    if (players.length < 2 || players.length > 8) {
      throw new Error("Game must have between two and eight players.");
    } else {
      this.players = this.shuffle(players);
    }
  }

  public playRound() {
    this.players.forEach(player => {
      player.roundsPlayed += 1;
    });
    this.roundsPlayed += 1;
  }

  private shuffle(arrParam: any[]): any[] {
    const arr = arrParam.slice();
    let length = arr.length;
    let i = null;
    let temp = null;

    while (length) {
      i = Math.floor(Math.random() * length--);

      temp = arr[length];
      arr[length] = arr[i];
      arr[i] = temp;
    }

    return arr;
  }
}
