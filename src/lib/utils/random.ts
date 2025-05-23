export class SeededRandom {
  private seed: number;

  constructor(seed: number = 123456) {
    this.seed = seed;
  }

  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  nextBetween(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}

export const random = new SeededRandom(12345);