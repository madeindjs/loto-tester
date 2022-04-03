// @ts-check
// @ts-ignore
import("./loto-form.component.css");

export class LotoFormComponent extends HTMLElement {
  connectedCallback() {
    let selected = new Set();

    new Array(50)
      .fill()
      .map((_, i) => i + 1)
      .map((boule) => {
        const button = document.createElement("button");
        button.innerText = String(boule);

        button.onclick = () => {
          const checked = selected.has(boule);

          if (checked) {
            selected.delete(boule);
            button.classList.remove("checked");
          } else if (selected.size !== 5) {
            selected.add(boule);
            button.classList.add("checked");
          }

          this.dispatchEvent(
            new CustomEvent("change", {
              detail: Array.from(selected.values()),
              bubbles: true,
              composed: false,
            })
          );
        };

        if (selected.has(boule)) button.classList.add("checked");

        this.append(button);
      });
  }
}
