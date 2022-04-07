import { Component, ComponentInterface, h, State } from '@stencil/core';
import { GAME_CONFIGURATION } from '../../games.conf';
import { GameComputeWin, Games } from '../../models';
// TODO: add pico css

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot implements ComponentInterface {
  @State() boules: number[] = [27, 38, 42, 44, 46];
  @State() extras: number[] = [1];
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

  get gameComputeWin(): GameComputeWin {
    return GAME_CONFIGURATION[this.game].computeWin;
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main class="container-fluid">
          <app-game-selector value={this.game} onUpdate={e => this.onGameChange(e)} />
          <div class="grid">
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
            <app-loto-summary
              boules={this.boules}
              extras={this.extras}
              game={this.game}
              gameComputeWin={this.gameComputeWin}
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
    // TODO: handle hydration on loading
    const query = new URLSearchParams({ boules: this.boules.join('-'), extras: this.extras.join('-'), game: this.game });
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + query.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  onBouleDelete(event: CustomEvent<number>) {
    this.boules = this.boules.filter(n => n !== event.detail);
  }

  onExtraDelete(event: CustomEvent<number>) {
    this.extras = this.extras.filter(n => n !== event.detail);
  }
}
