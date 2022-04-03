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

  const compute = () => {
    result.innerHTML = "";
    result.append(computeResults(Array.from(selected.values())));
  };

  //  insert boules

  app.append(form);

  compute();

  return { app, selected };
}
