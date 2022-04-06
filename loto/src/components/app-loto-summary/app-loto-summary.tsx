import { Component, ComponentInterface, Event, EventEmitter, h, Prop } from '@stencil/core';
import { Games } from '../../models';

@Component({
  tag: 'app-loto-summary',
  styleUrl: 'app-loto-summary.css',
  shadow: true,
})
export class AppLotoSummary implements ComponentInterface {
  @Prop() boules: number[] = [];
  @Prop() extras: number[] = [];
  @Prop() game: Games;

  @Event() bouleDelete: EventEmitter<number>;
  @Event() extraDelete: EventEmitter<number>;

  render() {
    if (!this.game) {
      return <p>Sélectionnez un type de jeu</p>;
    }

    return (
      <div class="loto-summary">
        <h2>Résultat</h2>
        <p>Vous avez joué ces nombres:</p>
        <div class="boules">
          {this.boules.map(boule => (
            <app-boule boule number={boule} checked={this.boules.includes(boule)} onToggle={() => this.bouleDelete.emit(boule)} />
          ))}
          {this.extras.map(extra => (
            <app-boule extra number={extra} checked={this.extras.includes(extra)} onToggle={() => this.extraDelete.emit(extra)} />
          ))}
        </div>
      </div>
    );
  }
}
