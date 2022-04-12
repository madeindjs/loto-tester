import { Component, ComponentInterface, Event, EventEmitter, getAssetPath, h, Prop, State, Watch } from '@stencil/core';
import { GameGraphData, Games, GameWin } from '../../models';
import { getGameResultsComputed } from '../../services/game-fetch.service';
import { formatDate, formatMoney } from '../../utils';
import { computeGameSummary } from '../game-summary.worker';

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
  @Prop() price: number;

  @Event() bouleDelete: EventEmitter<number>;
  @Event() extraDelete: EventEmitter<number>;
  @Event() tryNumbers: EventEmitter<{ boules: number[]; extras: number[] }>;

  @State() loading = true;

  @State() minResultDisplay = 100;

  @State() money: number;
  @State() gameWins: GameWin[];
  @State() closestWin: GameWin;
  @State() points: GameGraphData[];
  @State() firstDate: Date;
  @State() lastDate: Date;
  @State() nbTries: number;

  componentWillLoad(): void | Promise<void> {
    this.loadDate().catch(console.error);
  }

  @Watch('boules')
  @Watch('extras')
  @Watch('game')
  async loadDate(): Promise<void> {
    this.loading = true;

    const gameResults = await getGameResultsComputed(getAssetPath(`assets/${this.game}.json`));

    const data = await computeGameSummary(gameResults, this.boules, this.extras, this.game);

    this.money = data.money;
    this.gameWins = data.results;
    this.points = data.points;
    this.firstDate = data.firstDate;
    this.lastDate = data.lastDate;
    this.nbTries = data.nbTries;
    this.closestWin = data.closestResult;

    this.loading = false;
  }

  render() {
    if (!this.game || this.gameWins === undefined) {
      return <p>Sélectionnez un type de jeu</p>;
    }

    return (
      <div class="loto-summary" aria-busy={this.loading}>
        <hgroup>
          <h2>Résultat {this.money > 0 ? '💸' : '😭'}</h2>
          <div class="boules">
            {this.boules.map(boule => (
              <app-boule boule number={boule} onToggle={() => this.bouleDelete.emit(boule)} checked compact />
            ))}
            {this.extras.map(extra => (
              <app-boule extra number={extra} onToggle={() => this.extraDelete.emit(extra)} checked compact />
            ))}
          </div>
        </hgroup>

        <p>
          En ayant joué {formatMoney(this.price)} de {formatDate(this.firstDate)} à {formatDate(this.lastDate)} <small>({this.nbTries} fois)</small>,
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
                        <app-boule boule number={boule} disabled checked={!gameWin.missingBoules.includes(boule)} compact />
                      ))}
                      {gameWin.result.extras.map(extra => (
                        <app-boule extra number={extra} disabled checked={!gameWin.missingExtras.includes(extra)} compact />
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

        {this.closestWin !== undefined && (
          <div class="closest-result">
            <p>
              Sans rancune, vous n'êtes pas passé pas loin le {formatDate(this.closestWin.result.date)} ou vous auriez gagné {formatMoney(this.closestWin.money)}
            </p>
            <div class="boules">
              {this.closestWin.result.boules.map(boule => (
                <app-boule boule number={boule} checked={!this.closestWin.missingBoules.includes(boule)} disabled compact />
              ))}
              {this.extras.map(extra => (
                <app-boule extra number={extra} checked={!this.closestWin.missingExtras.includes(extra)} disabled compact />
              ))}
            </div>
            <button class="secondary outline" onClick={() => this.tryNumbers.emit({ boules: this.closestWin.result.boules, extras: this.closestWin.result.extras })}>
              Tester cette 🤬 de combinaison
            </button>
          </div>
        )}
      </div>
    );
  }
}
