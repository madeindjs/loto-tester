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
  @State() minResultDisplay = 100;

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

  computeGameWins(): { results: GameWin[]; points: GameGraphData[]; money: number } {
    const results: GameWin[] = [];
    const points: GameGraphData[] = [];
    let money = 0;

    for (const gameResult of this.gameResults) {
      const boulesMatch = gameResult.boules.filter(b => this.boules.includes(b));
      const missingBoules = gameResult.boules.filter(b => !boulesMatch.includes(b));

      const extrasMatch = gameResult.extras.filter(b => this.extras.includes(b));
      const missingExtras = gameResult.extras.filter(b => !extrasMatch.includes(b));

      const moneyWin = this.gameComputeWin(boulesMatch.length, extrasMatch.length);

      if (moneyWin > this.minResultDisplay) {
        results.push({ result: gameResult, missingBoules, missingExtras: missingExtras, money: moneyWin });
      }

      money -= 2;
      money += moneyWin;

      points.push({ x: new Date(gameResult.date), y: money });
    }

    results.sort((a, b) => new Date(b.result.date).getTime() - new Date(a.result.date).getTime());

    return { results, points, money };
  }

  render() {
    if (!this.game) {
      return <p>Sélectionnez un type de jeu</p>;
    }

    if (this.loading) {
      return <p aria-busy="true">Chargement des données pour {this.game}</p>;
    }

    const { results: gameWins, points, money } = this.computeGameWins();

    return (
      <div class="loto-summary">
        <div class="loto-summary__title grid">
          <h2>Résultat</h2>

          <div class="boules">
            {this.boules.map(boule => (
              <app-boule boule number={boule} onToggle={() => this.bouleDelete.emit(boule)} checked />
            ))}
            {this.extras.map(extra => (
              <app-boule extra number={extra} onToggle={() => this.extraDelete.emit(extra)} checked />
            ))}
          </div>
        </div>

        <p>
          En ayant joué {formatMoney(2)} de {formatDate(this.gameResults[0].date)} à {formatDate(this.gameResults[this.gameResults.length - 1].date)}, <br />
          <strong>votre solde final serait de {formatMoney(money)}</strong>.
        </p>

        {gameWins.length === 0 && <p>Vous n'auriez jamais rien gagné de plus de {formatMoney(this.minResultDisplay)}...</p>}
        {gameWins.length !== 0 && (
          <div class="results">
            <p>Voici les gains supérieur à {formatMoney(this.minResultDisplay)}:</p>
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

        <p>Et un joli graphique plus parlant:</p>

        <app-loto-summary-graph points={points} />
      </div>
    );
  }
}
