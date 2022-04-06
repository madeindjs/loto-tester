import { GameConfiguration, Games } from './models';

export const GAME_CONFIGURATION: Record<Games, GameConfiguration> = {
  [Games.Loto]: {
    nbBoules: 5,
    nbExtras: 1,
    nbMaxBoules: 49,
    nbMaxExtras: 9,
  },
  [Games.EuroMillion]: {
    nbBoules: 5,
    nbExtras: 2,
    nbMaxBoules: 49,
    nbMaxExtras: 9,
  },
};
