import { Component, ComponentInterface, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-loto-form',
  styleUrl: 'app-loto-form.css',
  shadow: true,
})
export class AppLotoForm implements ComponentInterface {
  @Prop() nbBoules: number = 50;
  @Prop() nbExtras: number = 7;

  @Prop() nbMaxBoules: number = 5;
  @Prop() nbMaxExtras: number = 1;

  @Prop({ reflect: true }) boules: number[] = [];
  @Prop({ reflect: true }) extras: number[] = [];

  @Event() boulesChange: EventEmitter<number[]>;
  @Event() extrasChange: EventEmitter<number[]>;

  render() {
    const boules = new Array(this.nbBoules).fill(undefined).map((_, i) => i + 1);
    const extras = new Array(this.nbExtras).fill(undefined).map((_, i) => i + 1);

    return (
      <div class="loto-form">
        <h2>Votre jeu</h2>
        <p>Nombres</p>
        <div class="boules">
          {boules.map(boule => (
            <app-boule boule number={boule} checked={this.boules.includes(boule)} onToggle={() => this.onNumberClick('boules', boule)}></app-boule>
          ))}
        </div>

        <p>Extra</p>

        <div class="boules">
          {extras.map(extra => (
            <app-boule extra number={extra} checked={this.extras.includes(extra)} onToggle={() => this.onNumberClick('extras', extra)}></app-boule>
          ))}
        </div>
      </div>
    );
  }

  onNumberClick(type: 'boules' | 'extras', number: number) {
    let array = this[type];
    const max = type === 'boules' ? this.nbMaxBoules : this.nbMaxExtras;

    if (array.includes(number)) {
      array = array.filter(n => n !== number);
    } else {
      if (array.length >= max) array.splice(0, array.length + 1 - max);

      array = [...array, number];
    }

    if (type === 'boules') {
      this.boulesChange.emit(array);
    } else {
      this.extrasChange.emit(array);
    }
  }
}
