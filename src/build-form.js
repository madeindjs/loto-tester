// @ts-check

import { tirages } from "./data/euromilion";

/**
 * @param {number[]} boules
 */
function computeResults(boules) {
  const container = document.createElement("div");

  const description = document.createElement("p");
  description.innerHTML = "Avec ce tirage vous auriez:";
  container.append(description);

  const list = document.createElement("ul");

  const appendItem = (text) => {
    const li = document.createElement("li");
    li.innerHTML = text;
    list.append(li);
  };

  const result5 = tirages.filter((tirage) => tirage.boules.every((boule) => boules.includes(boule)));

  result5.forEach(({ date }) => appendItem(`Gagné le Loto le ${date}!!!`));

  const result4 = tirages
    .filter((tirage) => tirage.boules.filter((boule) => boules.includes(boule)).length === 4)
    .filter((tirage) => !result5.map(({ date }) => date).includes(tirage.date));

  result4.forEach(({ date }) => appendItem(`Auriez eu 4 numéro gagants le ${date}`));

  container.append(list);

  return container;
}

export function useApp(options = { defaultValues: [] }) {
  const app = document.createElement("div");

  const form = document.createElement("div");
  const result = document.createElement("div");

  app.append(result);

  form.classList.add("boules");

  let selected = new Set(options.defaultValues);

  const compute = () => {
    result.innerHTML = "";
    result.append(computeResults(Array.from(selected.values())));
  };

  //  insert boules
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
      };

      if (selected.has(boule)) button.classList.add("checked");

      form.append(button);
    });

  app.append(form);

  compute();

  return { app, selected };
}
