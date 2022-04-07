export enum Games {
  Loto = 'loto',
  EuroMillion = 'euromillion',
}

export type GameComputeWin = (nbBoulesMatch: number, nbExtrasMatches: number) => number;

export interface GameConfiguration {
  nbBoules: number;
  nbExtras: number;
  nbMaxBoules: number;
  nbMaxExtras: number;
  computeWin: GameComputeWin;
}

export interface GameResult {
  date: string;
  boules: number[];
  extras: number[];
}

export interface GameGraphData {
  x: Date;
  y: number;
}

export interface GameWin {
  result: GameResult;
  missingBoules: number[];
  missingExtras: number[];
  money: number;
}
