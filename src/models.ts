export enum Games {
  Loto = 'loto',
  EuroMillion = 'euroMillion',
}

export interface GameConfiguration {
  nbBoules: number;
  nbExtras: number;
  nbMaxBoules: number;
  nbMaxExtras: number;
}
