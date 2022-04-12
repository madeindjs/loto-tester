import { Component, ComponentInterface, h, State } from '@stencil/core';
import { GAME_CONFIGURATION } from '../../games.conf';
import { Games } from '../../models';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot implements ComponentInterface {
  @State() boules: number[] = [];
  @State() extras: number[] = [];
  @State() game: Games = Games.Loto;

  get nbBoules(): number {
    return GAME_CONFIGURATION[this.game].nbBoules;
  }

  get nbExtras(): number {
    return GAME_CONFIGURATION[this.game].nbExtras;
  }

  get nbMaxBoules(): number {
    return GAME_CONFIGURATION[this.game].nbMaxBoules;
  }

  get nbMaxExtras(): number {
    return GAME_CONFIGURATION[this.game].nbMaxExtras;
  }

  get price(): number {
    return GAME_CONFIGURATION[this.game].price;
  }

  componentWillLoad(): void | Promise<void> {
    this.loadStateFromHash(window.location.hash);
    window.addEventListener(
      'hashchange',
      _event => {
        this.loadStateFromHash(window.location.hash);
      },
      false,
    );

    this.updateUrl();
  }

  loadStateFromHash(hash: string) {
    if (hash.startsWith('#')) {
      hash = hash.slice(1);
    }

    const params = new URLSearchParams(hash);

    const game = params.get('game') as Games;
    this.game = [Games.Loto, Games.EuroMillion].includes(game) ? game : Games.Loto;

    const boules =
      params
        .get('boules')
        ?.split('-')
        .filter(Boolean)
        .map(Number)
        .sort((a, b) => a - b) ?? [];

    if (boules.join('-') !== this.boules.join('-')) {
      this.boules = boules;
    }

    const extras =
      params
        .get('extras')
        ?.split('-')
        .filter(Boolean)
        .map(Number)
        .sort((a, b) => a - b) ?? [];

    if (extras.join('-') !== this.extras.join('-')) {
      this.extras = extras;
    }
  }

  render() {
    return (
      <div>
        <header></header>

        <main class="container">
          <h1>
            Aurais-je gagné au <strong>{this.game.toLocaleUpperCase()}</strong> <i>(bordel)</i>?!
          </h1>
          <app-game-selector value={this.game} onUpdate={e => this.onGameChange(e)} />
          <div class="grid">
            <div class="form">
              <h2>Votre jeu</h2>
              <p>Cliquez sur les numéros pour les jouer</p>
              <app-loto-form
                boules={this.boules}
                extras={this.extras}
                onBoulesChange={event => this.onBoulesChange(event)}
                onExtrasChange={event => this.onExtrasChange(event)}
                nbBoules={this.nbBoules}
                nbMaxBoules={this.nbMaxBoules}
                nbExtras={this.nbExtras}
                nbMaxExtras={this.nbMaxExtras}
              />
            </div>
            <app-loto-summary
              boules={this.boules}
              extras={this.extras}
              game={this.game}
              price={this.price}
              onBouleDelete={event => this.onBouleDelete(event)}
              onExtraDelete={event => this.onExtraDelete(event)}
              onTryNumbers={event => this.onTryNumbers(event)}
              nbMaxBoules={this.nbMaxBoules}
              nbMaxExtras={this.nbMaxExtras}
            />
          </div>

          {/* TODO: add share */}
        </main>
        {/* TODO: add footer */}
      </div>
    );
  }

  onTryNumbers(event: CustomEvent<{ boules: number[]; extras: number[] }>) {
    this.boules = event.detail.boules;
    this.extras = event.detail.extras;
    this.updateUrl();
  }

  onGameChange(event: CustomEvent<Games>) {
    this.game = event.detail;

    this.updateUrl();
  }

  onBoulesChange(event: CustomEvent<number[]>) {
    this.boules = event.detail;
    this.updateUrl();
  }

  onExtrasChange(event: CustomEvent<number[]>) {
    this.extras = event.detail;
    this.updateUrl();
  }

  private updateUrl() {
    const query = new URLSearchParams({ boules: this.boules.join('-'), extras: this.extras.join('-'), game: this.game });

    // if (window.location.hash = query.toString())
    window.location.hash = query.toString();
  }

  onBouleDelete(event: CustomEvent<number>) {
    this.boules = this.boules.filter(n => n !== event.detail);
  }

  onExtraDelete(event: CustomEvent<number>) {
    this.extras = this.extras.filter(n => n !== event.detail);
  }
}
