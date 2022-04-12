import { GameConfiguration, Games } from './models';

export const GAME_CONFIGURATION: Record<Games, GameConfiguration> = {
  [Games.Loto]: {
    price: 2.2,
    nbBoules: 5,
    nbExtras: 1,
    nbMaxBoules: 49,
    nbMaxExtras: 9,
    // from https://tirage-gagnant.com/euromillions/calculateur-de-gains-euromillions/
    computeWin: (nbBoulesMatch: number, nbExtrasMatches: number) => {
      if (nbBoulesMatch === 5 && nbExtrasMatches === 2) {
        return 17_000_000;
      } else if (nbBoulesMatch === 5 && nbExtrasMatches === 1) {
        return 200_000;
      } else if (nbBoulesMatch === 5 && nbExtrasMatches === 0) {
        return 21_000;
      } else if (nbBoulesMatch === 4 && nbExtrasMatches === 2) {
        return 1_300;
      } else if (nbBoulesMatch === 4 && nbExtrasMatches === 1) {
        return 120;
      } else if (nbBoulesMatch === 4 && nbExtrasMatches === 0) {
        return 57;
      } else if (nbBoulesMatch === 3 && nbExtrasMatches === 2) {
        return 39;
      } else if (nbBoulesMatch === 3 && nbExtrasMatches === 1) {
        return 14;
      } else if (nbBoulesMatch === 3 && nbExtrasMatches === 0) {
        return 11.26;
      } else if (nbBoulesMatch === 2 && nbExtrasMatches === 2) {
        return 9.32;
      } else if (nbBoulesMatch === 1 && nbExtrasMatches === 2) {
        return 6.75;
      } else if (nbBoulesMatch === 2 && nbExtrasMatches === 1) {
        return 5.58;
      } else if (nbBoulesMatch === 2 && nbExtrasMatches === 0) {
        return 4;
      }

      return 0;
    },
  },
  [Games.EuroMillion]: {
    price: 2.5,
    nbBoules: 5,
    nbExtras: 2,
    nbMaxBoules: 49,
    nbMaxExtras: 9,
    // https://tirage-gagnant.com/loto/calculateur-de-gains-loto/
    computeWin: (nbBoulesMatch: number, nbExtrasMatches: number) => {
      if (nbBoulesMatch === 5 && nbExtrasMatches === 2) {
        return 17_000_000;
      } else if (nbBoulesMatch === 5 && nbExtrasMatches === 1) {
        return 200_000;
      } else if (nbBoulesMatch === 5 && nbExtrasMatches === 0) {
        return 100_000;
      } else if (nbBoulesMatch === 4 && nbExtrasMatches === 1) {
        return 1_000;
      } else if (nbBoulesMatch === 4 && nbExtrasMatches === 0) {
        return 400;
      } else if (nbBoulesMatch === 3 && nbExtrasMatches === 1) {
        return 50;
      } else if (nbBoulesMatch === 3 && nbExtrasMatches === 0) {
        return 20;
      } else if (nbBoulesMatch === 2 && nbExtrasMatches === 1) {
        return 10;
      } else if (nbBoulesMatch === 2 && nbExtrasMatches === 0) {
        return 4.4;
      } else if (nbExtrasMatches === 1) {
        return 2.2;
      }

      return 0;
    },
  },
};
