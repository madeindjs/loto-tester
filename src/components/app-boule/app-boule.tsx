import { Component, ComponentInterface, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-boule',
  styleUrl: 'app-boule.css',
  shadow: true,
})
export class AppBoule implements ComponentInterface {
  @Prop() number: number;
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;

  @Prop() boule: boolean;
  @Prop() extra: boolean;

  @Event() toggle: EventEmitter<void>;

  render() {
    return (
      <button class={{ 'app-boule': true, 'checked': this.checked, 'boule': this.boule, 'extra': this.extra, 'disabled': this.disabled }} onClick={() => this.toggle.emit()}>
        {this.number}
      </button>
    );
  }
}
