import { GameResult, GameResultComputed } from '../models';

type Cache = {
  [game: string]: GameResultComputed[];
};

const cache: Cache = {};

export async function getGameResultsComputed(path: string): Promise<GameResultComputed[]> {
  if (cache[path] !== undefined) {
    return cache[path];
  }

  const res = await fetch(path);
  const gameResults: GameResult[] = await res.json();

  const gameResultsComputed: GameResultComputed[] = gameResults.map(gameResult => ({ ...gameResult, date: new Date(gameResult.date) }));

  gameResultsComputed.sort((a, b) => a.date.getTime() - b.date.getTime());

  cache[path] = gameResultsComputed;

  return gameResultsComputed;
}
