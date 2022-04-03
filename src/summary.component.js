// @ts-check
export class SummaryComponent extends HTMLElement {
  _tirages;

  static get observedAttributes() {
    return ["boules"];
  }

  async connectedCallback() {
    this._tirages = await import("./data/euromilion").then((m) => m.tirages);
    this.render();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.render();
  }

  render() {
    this.innerHTML = "";

    if (!this.getAttribute("boules")) {
      const p = document.createElement("p");
      p.setAttribute("role", "alert");
      p.innerText = "Sélectionnez au moins 5 numéros pour voir un résultat";
      this.append(p);
      return;
    }

    const boules = this.getAttribute("boules").split(",").map(Number);

    const description = document.createElement("p");
    description.innerHTML = "Avec ce tirage vous auriez:";
    this.append(description);

    const list = document.createElement("ul");

    const appendItem = (text) => {
      const li = document.createElement("li");
      li.innerHTML = text;
      list.append(li);
    };

    const result5 = this._tirages.filter((tirage) => tirage.boules.every((boule) => boules.includes(boule)));

    result5.forEach(({ date }) => appendItem(`Gagné le Loto le ${date}!!!`));

    const result4 = this._tirages
      .filter((tirage) => tirage.boules.filter((boule) => boules.includes(boule)).length === 4)
      .filter((tirage) => !result5.map(({ date }) => date).includes(tirage.date));

    result4.forEach(({ date }) => appendItem(`Auriez eu 4 numéro gagants le ${date}`));

    this.append(list);

    const cost = document.createElement("p");

    cost.innerHTML = `Au prix de 2€ la grille, vous auriez dépensé ${this._tirages.length * 2} €`;
    this.append(cost);
  }
}
