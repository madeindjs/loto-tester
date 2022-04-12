export enum Games {
  Loto = 'loto',
  EuroMillion = 'euromillion',
}

export type GameComputeMoney = (nbBoulesMatch: number, nbExtrasMatches: number) => number;

export interface GameConfiguration {
  nbBoules: number;
  nbExtras: number;
  nbMaxBoules: number;
  nbMaxExtras: number;
  computeWin: GameComputeMoney;
  price: number;
}

export interface GameResult {
  date: string;
  boules: number[];
  extras: number[];
}

export interface GameResultComputed {
  date: Date;
  boules: number[];
  extras: number[];
}

export interface GameGraphData {
  x: Date;
  y: number;
}

export interface GameWin {
  result: GameResultComputed;
  missingBoules: number[];
  missingExtras: number[];
  money: number;
}
