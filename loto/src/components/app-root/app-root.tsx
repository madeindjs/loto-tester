import { Component, ComponentInterface, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot implements ComponentInterface {
  @State() boules: number[] = [];
  @State() extras: number[] = [];

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <app-loto-form boules={this.boules} extras={this.extras} onUpdate={event => this.onUpdate(event)} />
          <app-loto-summary boules={this.boules} extras={this.extras} onBouleDelete={event => this.onBouleDelete(event)} onExtraDelete={event => this.onExtraDelete(event)} />
        </main>
      </div>
    );
  }

  onUpdate(event: CustomEvent<{ boules: number[]; extras: number[] }>) {
    this.boules = event.detail.boules;
    this.extras = event.detail.extras;

    // update URL
    const query = new URLSearchParams({ boules: this.boules.join('-'), extras: this.extras.join('-') });
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + query.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);

    // TODO support back
  }

  onBouleDelete(event: CustomEvent<number>) {
    this.boules = this.boules.filter(n => n !== event.detail);
  }

  onExtraDelete(event: CustomEvent<number>) {
    this.extras = this.extras.filter(n => n !== event.detail);
  }
}
