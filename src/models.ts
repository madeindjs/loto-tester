export enum Games {
  Loto = 'loto',
  EuroMillion = 'euromillion',
}

export interface GameConfiguration {
  nbBoules: number;
  nbExtras: number;
  nbMaxBoules: number;
  nbMaxExtras: number;
}

export interface GameResult {
  date: string;
  boules: number[];
  extras: number[];
}

export interface GameWin {
  result: GameResult;
  missingBoules: number[];
  missingExtras: number[];
}
