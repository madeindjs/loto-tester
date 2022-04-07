import { Component, ComponentInterface, Event, EventEmitter, getAssetPath, h, Prop } from '@stencil/core';
import { Games } from '../../models';

@Component({
  tag: 'app-game-selector',
  styleUrl: 'app-game-selector.css',
  assetsDirs: ['assets'],
  // shadow: true,
})
export class AppLotoSelector implements ComponentInterface {
  @Prop() value: Games;
  @Event() update: EventEmitter<Games>;

  render() {
    return (
      <details>
        <summary>
          Type de jeu: <strong>{this.value.toLocaleUpperCase()}</strong>
        </summary>
        <div class="options">
          <label
            htmlFor="loto-input"
            class={{ checked: this.value === Games.Loto }}
            onClick={() => this.update.emit(Games.Loto)}
            onKeyDown={() => this.update.emit(Games.Loto)}
            tabIndex={0}
          >
            <input type="radio" id="loto-input" />
            <img src={getAssetPath('assets/loto.svg')} alt="Loto" />
          </label>
          <label
            htmlFor="euromilion-input"
            class={{ checked: this.value === Games.EuroMillion }}
            onClick={() => this.update.emit(Games.EuroMillion)}
            onKeyDown={() => this.update.emit(Games.EuroMillion)}
            tabIndex={0}
          >
            <input type="radio" id="euromilion-input" />
            <img src={getAssetPath('assets/euromilion.svg')} alt="Euromilion" />
          </label>
        </div>
      </details>
    );
  }
}
