import { Component, ComponentInterface, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-boule',
  styleUrl: 'app-boule.css',
})
export class AppBoule implements ComponentInterface {
  @Prop() number: number;
  @Prop() checked: boolean = false;

  @Prop() boule: boolean;
  @Prop() extra: boolean;

  @Event() toggle: EventEmitter<void>;

  render() {
    return (
      <button class={{ checked: this.checked, boule: this.boule, extra: this.extra }} onClick={() => this.toggle.emit()}>
        {this.number}
      </button>
    );
  }
}
