import { GAME_CONFIGURATION } from '../games.conf';
import { GameGraphData, GameResultComputed, Games, GameSummary, GameWin } from '../models';

export async function computeGameSummary(gameResults: GameResultComputed[], boules: number[], extras: number[], game: Games): Promise<GameSummary> {
  const { computeWin, price } = GAME_CONFIGURATION[game];

  this.gameResults = gameResults;

  const results: GameWin[] = [];
  const points: GameGraphData[] = [];
  let money = 0;

  let previousClosestScore = 0;
  let previousClosestWin: GameWin;

  for (const gameResult of gameResults) {
    const boulesMatch = gameResult.boules.filter(b => boules.includes(b));
    const missingBoules = gameResult.boules.filter(b => !boulesMatch.includes(b));

    const extrasMatch = gameResult.extras.filter(b => extras.includes(b));
    const missingExtras = gameResult.extras.filter(b => !extrasMatch.includes(b));

    const moneyWin = computeWin(boulesMatch.length, extrasMatch.length);

    const score = boulesMatch.length + extrasMatch.length;

    const isBingo = missingExtras.length + missingBoules.length === 0;

    if (score > previousClosestScore && !isBingo) {
      console.log(gameResult.boules.length, gameResult.extras.length, computeWin(gameResult.boules.length, gameResult.extras.length));
      previousClosestWin = { result: gameResult, missingBoules, missingExtras, money: computeWin(gameResult.boules.length, gameResult.extras.length) };
      previousClosestScore = score;
    }

    if (moneyWin > 100) {
      results.push({ result: gameResult, missingBoules, missingExtras, money: moneyWin });
    }

    money -= price;
    money += moneyWin;

    points.push({ x: new Date(gameResult.date), y: money });
  }

  results.sort((a, b) => new Date(b.result.date).getTime() - new Date(a.result.date).getTime());

  const firstDate = new Date(gameResults[0]?.date);
  const lastDate = new Date(gameResults[gameResults.length - 1]?.date);

  return {
    results,
    points,
    money,
    firstDate: !isNaN(firstDate.valueOf()) ? firstDate : undefined,
    lastDate: !isNaN(lastDate.valueOf()) ? firstDate : undefined,
    nbTries: gameResults.length,
    closestResult: previousClosestWin,
  };
}
