import { Component, ComponentInterface, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-loto-form',
  styleUrl: 'app-loto-form.css',
  shadow: true,
})
export class AppLotoForm implements ComponentInterface {
  @Prop() nbBoules: number = 50;
  @Prop() nbExtras: number = 7;

  @Prop({ reflect: true }) boules: number[] = [];
  @Prop({ reflect: true }) extras: number[] = [];

  @Event() update: EventEmitter<{ boules: number[]; extras: number[] }>;

  render() {
    const boules = new Array(this.nbBoules).fill(undefined).map((_, i) => i + 1);
    const extras = new Array(this.nbExtras).fill(undefined).map((_, i) => i + 1);

    return (
      <div class="loto-form">
        <h2>Votre jeu</h2>
        <p>Nombres</p>
        <div class="boules">
          {boules.map(boule => (
            <app-boule boule number={boule} checked={this.boules.includes(boule)} onToggle={() => this.onBouleClick('boules', boule)}></app-boule>
          ))}
        </div>

        <p>Extra</p>

        <div class="boules">
          {extras.map(extra => (
            <app-boule extra number={extra} checked={this.extras.includes(extra)} onToggle={() => this.onBouleClick('extras', extra)}></app-boule>
          ))}
        </div>
      </div>
    );
  }

  onBouleClick(type: 'boules' | 'extras', number: number) {
    const state = {
      boules: [...this.boules],
      extras: [...this.extras],
    };

    const array = state[type];
    const max = type === 'boules' ? this.nbBoules : this.nbExtras;

    if (array.includes(number)) {
      state[type] = array.filter(n => n !== number);
    } else {
      if (array.length === max) array.splice(0);

      state[type] = [...array, number];
    }

    this.update.emit(state);
  }
}
