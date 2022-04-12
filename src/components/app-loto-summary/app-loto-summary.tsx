import { Component, ComponentInterface, Event, EventEmitter, getAssetPath, h, Prop, State, Watch } from '@stencil/core';
import { GameComputeMoney, GameGraphData, Games, GameWin } from '../../models';
import { getGameResultsComputed } from '../../services/game-fetch.service';
import { formatDate, formatMoney } from '../../utils';
import { computeGameWins } from '../game-summary.worker';

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
  @Prop() gameComputeWin: GameComputeMoney;

  @Event() bouleDelete: EventEmitter<number>;
  @Event() extraDelete: EventEmitter<number>;
  @Event() tryNumbers: EventEmitter<{ boules: number[]; extras: number[] }>;

  @State() loading = true;

  @State() minResultDisplay = 100;

  @State() money: number;
  @State() gameWins: GameWin[];
  @State() points: GameGraphData[];
  @State() firstDate: Date;
  @State() lastDate: Date;

  componentWillLoad(): void | Promise<void> {
    this.loadDate().catch(console.error);
  }

  @Watch('boules')
  @Watch('extras')
  @Watch('game')
  async loadDate(): Promise<void> {
    this.loading = true;

    const gameResults = await getGameResultsComputed(getAssetPath(`assets/${this.game}.json`));

    const data = await computeGameWins(gameResults, this.boules, this.extras, this.game);

    this.money = data.money;
    this.gameWins = data.results;
    this.points = data.points;
    this.firstDate = data.firstDate;
    this.lastDate = data.lastDate;

    this.loading = false;
  }

  render() {
    if (this.loading) {
      return <p aria-busy="true">Chargement des données pour {this.game}</p>;
    }
    if (!this.game) {
      return <p>Sélectionnez un type de jeu</p>;
    }

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
          En ayant joué {formatMoney(2)} de {formatDate(this.firstDate)} à {formatDate(this.lastDate)}, <br />
          <strong>votre solde final serait de {formatMoney(this.money)}</strong>.
        </p>

        {this.gameWins.length === 0 && <p>Vous n'auriez jamais rien gagné de plus de {formatMoney(this.minResultDisplay)}...</p>}
        {this.gameWins.length !== 0 && (
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
                {this.gameWins.map(gameWin => (
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

        <app-loto-summary-graph points={this.points} />
      </div>
    );
  }
}
