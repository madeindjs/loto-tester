import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { GameWin } from '../../models';
import { formattedDate } from '../../utils';

@Component({
  tag: 'app-game-win',
  styleUrl: 'app-game-win.css',
})
export class AppGameWin implements ComponentInterface {
  @Prop() gameWin: GameWin;

  render() {
    return (
      <div class={{ 'game-win': true, 'full': !this.gameWin.missingBoules.length && !this.gameWin.missingExtras.length }}>
        <p class="game-win__date">{formattedDate(this.gameWin.result.date)}</p>
        <div class="boules">
          {this.gameWin.result.boules.map(boule => (
            <app-boule boule number={boule} disabled checked={!this.gameWin.missingBoules.includes(boule)} />
          ))}
          {this.gameWin.result.extras.map(extra => (
            <app-boule extra number={extra} disabled checked={!this.gameWin.missingExtras.includes(extra)} />
          ))}
        </div>
      </div>
    );
  }
}
