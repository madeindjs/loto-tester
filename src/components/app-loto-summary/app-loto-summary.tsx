import { Component, ComponentInterface, Event, EventEmitter, getAssetPath, h, Prop, State, Watch } from '@stencil/core';
import { GameResult, Games, GameWin } from '../../models';
import { formatDate, formatMoney } from '../../utils';

@Component({
  tag: 'app-loto-summary',
  styleUrl: 'app-loto-summary.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class AppLotoSummary implements ComponentInterface {
  @Prop() boules: number[] = [];
  @Prop() extras: number[] = [];
  @Prop() game: Games;
  @Prop() nbMaxBoules: number;
  @Prop() nbMaxExtras: number;

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

  computeGameWins(): GameWin[] {
    const results: GameWin[] = [];

    for (const gameResult of this.gameResults) {
      const boulesMatch = gameResult.boules.filter(b => this.boules.includes(b));
      const missingBoules = gameResult.boules.filter(b => !boulesMatch.includes(b));

      const extrasMatch = gameResult.extras.filter(b => this.extras.includes(b));
      const missingExtras = gameResult.extras.filter(b => !extrasMatch.includes(b));

      if (missingBoules.length + missingExtras.length < 3) {
        results.push({ result: gameResult, missingBoules, missingExtras: missingExtras });
      }
    }

    results.sort((a, b) => new Date(b.result.date).getTime() - new Date(a.result.date).getTime());

    return results;
  }

  render() {
    if (!this.game) {
      return <p>Sélectionnez un type de jeu</p>;
    }

    if (this.loading) {
      return <p aria-busy="true">Chargement des données pour {this.game}</p>;
    }

    const gameWins = this.computeGameWins();

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
            <ul>
              {gameWins.map(win => (
                <li>
                  <app-game-win gameWin={win} onTryIt={() => this.tryNumbers.emit({ boules: win.result.boules, extras: win.result.extras })} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <p>
          Les données affichées sont calculés sur la période de {formatDate(this.gameResults[0].date)} à {formatDate(this.gameResults[this.gameResults.length - 1].date)}. Vous
          auriez donc dépensé {formatMoney(2 * this.gameResults.length)}.
        </p>
      </div>
    );
  }
}
