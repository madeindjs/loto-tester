import { GAME_CONFIGURATION } from '../games.conf';
import { GameGraphData, GameResult, Games, GameWin } from '../models';

export async function computeGameWins(
  gamePath: string,
  boules: number[],
  extras: number[],
  game: Games,
): Promise<{ results: GameWin[]; points: GameGraphData[]; money: number; firstDate: Date; lastDate: Date }> {
  const res = await fetch(gamePath);
  const gameResults: GameResult[] = await res.json();
  gameResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const computeMoney = GAME_CONFIGURATION[game].computeWin;

  this.gameResults = gameResults;

  const results: GameWin[] = [];
  const points: GameGraphData[] = [];
  let money = 0;

  for (const gameResult of gameResults) {
    const boulesMatch = gameResult.boules.filter(b => boules.includes(b));
    const missingBoules = gameResult.boules.filter(b => !boulesMatch.includes(b));

    const extrasMatch = gameResult.extras.filter(b => extras.includes(b));
    const missingExtras = gameResult.extras.filter(b => !extrasMatch.includes(b));

    const moneyWin = computeMoney(boulesMatch.length, extrasMatch.length);

    if (moneyWin > 100) {
      results.push({ result: gameResult, missingBoules, missingExtras, money: moneyWin });
    }

    money -= 2;
    money += moneyWin;

    points.push({ x: new Date(gameResult.date), y: money });
  }

  results.sort((a, b) => new Date(b.result.date).getTime() - new Date(a.result.date).getTime());

  const firstDate = new Date(gameResults[0]?.date);
  const lastDate = new Date(gameResults[0]?.date);

  return { results, points, money, firstDate: !isNaN(firstDate.valueOf()) ? firstDate : undefined, lastDate: !isNaN(lastDate.valueOf()) ? firstDate : undefined };
}
