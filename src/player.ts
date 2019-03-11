class Player {
  public name: string;
  public position = 0;
  public numberOfPositions = 39;
  public roundsPlayed = 0;
  public balance = 0;

  private incomeTaxPosition = 4;
  private luxuryTaxPosition = 38;
  private goToJailPosition = 30;
  private justVisitingPosition = 10;

  constructor(name: string) {
    this.name = name;
  }

  public roll() {
    return Math.floor(Math.random() * (11) + 2);
  }

  public rollAndSetPosition() {
    const result = this.roll();
    this.setPosition(result);

    if (this.position === this.goToJailPosition) {
      this.goToJail();
    } else if (this.position === this.incomeTaxPosition) {
      this.deductIncomeTax();
    } else if (this.position === this.luxuryTaxPosition) {
      this.deductLuxuryTax();
    }
  }

  private setPosition(result: number) {
    if (this.position + result > this.numberOfPositions) {
      this.passGo(result);
    } else {
      this.position += result;
    }
  }

  private passGo(result: number) {
    const remainder = this.numberOfPositions - this.position;
    this.position = result - remainder - 1;
    this.balance += 200;
  }

  private deductIncomeTax() {
    if (this.balance > 0 && this.balance <= 1000) {
      this.balance = this.balance - this.balance * 0.2;
    } else if (this.balance > 1000) {
      this.balance = this.balance - 200;
    }
  }

  private deductLuxuryTax() {
    if (this.balance > 0 && this.balance <= 75) {
      this.balance = 0;
    } else if (this.balance > 75) {
      this.balance = this.balance - 75;
    }
  }

  private goToJail() {
    this.position = this.justVisitingPosition;
  }
}
