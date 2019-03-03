class Player {
  public name: string;
  public position: number = 0;
  public numberOfPositions: number = 40;
  public roundsPlayed = 0;

  constructor(name: string) {
    this.name = name;
  }

  public roll() {
    return Math.floor(Math.random() * (11) + 2);
  }

  public rollAndSetPosition() {
    const result = this.roll();
    if (this.position + result > this.numberOfPositions) {
      const remainder = this.numberOfPositions - this.position;
      this.position = result - remainder;
    } else {
      this.position += result;
    }
  }
}
