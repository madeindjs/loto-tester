// @ts-check
// @ts-ignore
import("./loto-form.component.css");

export class LotoFormComponent extends HTMLElement {
  connectedCallback() {
    const state = {
      boules: new Set(),
      extra: new Set(),
    };

    const title = document.createElement("h2");
    title.innerText = "Sélectionnez vos numéros";

    this.append(title);

    const boules = document.createElement("div");
    boules.classList.add("boules");

    new Array(49)
      .fill()
      .map((_, i) => i + 1)
      .map((boule) => {
        const button = document.createElement("button");
        button.innerText = String(boule);

        button.onclick = () => {
          const checked = state.boules.has(boule);

          if (checked) {
            state.boules.delete(boule);
            button.classList.remove("checked");
          } else if (state.boules.size !== 5) {
            state.boules.add(boule);
            button.classList.add("checked");
          }

          this.dispatchEvent(
            new CustomEvent("change", {
              detail: state,
              bubbles: true,
              composed: false,
            })
          );
        };

        if (state.boules.has(boule)) button.classList.add("checked");

        boules.append(button);
      });

    this.append(boules);

    // extra

    const extraDescription = document.createElement("p");
    extraDescription.innerText = "Numéro chance";
    this.append(extraDescription);

    const extra = document.createElement("div");
    extra.classList.add("extra");

    // TODO refactor this
    new Array(10)
      .fill()
      .map((_, i) => i + 1)
      .map((boule) => {
        const button = document.createElement("button");
        button.innerText = String(boule);

        button.onclick = () => {
          const checked = state.extra.has(boule);

          if (checked) {
            state.extra.delete(boule);
            button.classList.remove("checked");
          } else if (state.extra.size !== 1) {
            // TODO set number from props
            state.extra.add(boule);
            button.classList.add("checked");
          }

          this.dispatchEvent(
            new CustomEvent("change", {
              detail: state,
              bubbles: true,
              composed: false,
            })
          );
        };

        if (state.extra.has(boule)) button.classList.add("checked");

        extra.append(button);
      });

    this.append(extra);
  }
}
