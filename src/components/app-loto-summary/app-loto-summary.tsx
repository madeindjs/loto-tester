import { Component, ComponentInterface, Event, EventEmitter, getAssetPath, h, Prop, State, Watch } from '@stencil/core';
import { GameComputeWin, GameGraphData, GameResult, Games, GameWin } from '../../models';
import { formatDate, formatMoney } from '../../utils';

@Component({
  tag: 'app-loto-summary',
  styleUrl: 'app-loto-summary.css',
  assetsDirs: ['assets'],
})
export class AppLotoSummary implements ComponentInterface {
  @Prop() boules: number[] = [];
  @Prop() extras: number[] = [];
  @Prop() game: Games;
  @Prop() nbMaxBoules: number;
  @Prop() nbMaxExtras: number;
  @Prop() gameComputeWin: GameComputeWin;

  @Event() bouleDelete: EventEmitter<number>;
  @Event() extraDelete: EventEmitter<number>;
  @Event() tryNumbers: EventEmitter<{ boules: number[]; extras: number[] }>;

  @State() loading = true;

  @State() gameResults: GameResult[];

  componentWillLoad(): void | Promise<void> {
    this.loadData();
  }

  @Watch('game')
  onGameChange() {
    this.loadData();
  }

  async loadData() {
    if (!this.game) return;

    this.loading = true;

    const res = await fetch(getAssetPath(`assets/${this.game}.json`));
    const gameResults = await res.json();
    gameResults.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    this.gameResults = gameResults;

    this.loading = false;
  }

  computeGameWins(): { results: GameWin[]; points: GameGraphData[] } {
    const results: GameWin[] = [];
    const points: GameGraphData[] = [];
    let current = 0;

    for (const gameResult of this.gameResults) {
      const boulesMatch = gameResult.boules.filter(b => this.boules.includes(b));
      const missingBoules = gameResult.boules.filter(b => !boulesMatch.includes(b));

      const extrasMatch = gameResult.extras.filter(b => this.extras.includes(b));
      const missingExtras = gameResult.extras.filter(b => !extrasMatch.includes(b));

      const moneyWin = this.gameComputeWin(boulesMatch.length, extrasMatch.length);

      if (moneyWin > 100) {
        results.push({ result: gameResult, missingBoules, missingExtras: missingExtras, money: moneyWin });
      }

      current -= 2;
      current += moneyWin;

      points.push({ x: new Date(gameResult.date), y: current });
    }

    results.sort((a, b) => new Date(b.result.date).getTime() - new Date(a.result.date).getTime());

    return { results, points };
  }

  render() {
    if (!this.game) {
      return <p>Sélectionnez un type de jeu</p>;
    }

    if (this.loading) {
      return <p aria-busy="true">Chargement des données pour {this.game}</p>;
    }

    const { results: gameWins, points } = this.computeGameWins();

    return (
      <div class="loto-summary">
        <h2>Résultat</h2>
        <p>Vous avez joué ces nombres:</p>
        <div class="boules">
          {this.boules.map(boule => (
            <app-boule boule number={boule} onToggle={() => this.bouleDelete.emit(boule)} checked />
          ))}
          {this.extras.map(extra => (
            <app-boule extra number={extra} onToggle={() => this.extraDelete.emit(extra)} checked />
          ))}
        </div>

        {gameWins.length === 0 && <p>Vous n'auriez rien gagné avec cette sélection. essayez autre chose</p>}
        {gameWins.length !== 0 && (
          <div class="results">
            <p>Voici les gains générés par cette grille</p>
            <table>
              <thead>
                <th>date</th>
                <th>nombres</th>
                <th>montant</th>
                {/* <th></th> */}
              </thead>
              <tbody>
                {gameWins.map(gameWin => (
                  <tr class={{ 'game-win': true, 'full': !gameWin.missingBoules.length && !gameWin.missingExtras.length }}>
                    <td class="game-win__date">{formatDate(gameWin.result.date)}</td>
                    <td class="boules">
                      {gameWin.result.boules.map(boule => (
                        <app-boule boule number={boule} disabled checked={!gameWin.missingBoules.includes(boule)} />
                      ))}
                      {gameWin.result.extras.map(extra => (
                        <app-boule extra number={extra} disabled checked={!gameWin.missingExtras.includes(extra)} />
                      ))}
                    </td>
                    <td>{formatMoney(gameWin.money)}</td>
                    {/* <td>
                      <button onClick={() => this.tryNumbers.emit()}>Jouer cette grille</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p>
          Les données affichées sont calculés sur la période de {formatDate(this.gameResults[0].date)} à {formatDate(this.gameResults[this.gameResults.length - 1].date)}. Vous
          auriez donc dépensé {formatMoney(2 * this.gameResults.length)}.
        </p>
        <app-loto-summary-graph points={points} />
      </div>
    );
  }
}
