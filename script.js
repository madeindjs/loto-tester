// @ts-check
const result = document.getElementById("result");
const form = document.getElementById("form");
/** @type {HTMLInputElement} */
// @ts-ignore
const boule1 = document.getElementById("boule1");
/** @type {HTMLInputElement} */
// @ts-ignore
const boule2 = document.getElementById("boule2");
/** @type {HTMLInputElement} */
// @ts-ignore
const boule3 = document.getElementById("boule3");
/** @type {HTMLInputElement} */
// @ts-ignore
const boule4 = document.getElementById("boule4");
/** @type {HTMLInputElement} */
// @ts-ignore
const boule5 = document.getElementById("boule5");

/** @type {{date: string, boules: number[]}[]} */
// @ts-ignore
const data = window.data;

function compute() {
  console.log("compute");

  result.innerHTML = "";

  const boules = [
    Number(boule1.value),
    Number(boule2.value),
    Number(boule3.value),
    Number(boule4.value),
    Number(boule5.value),
  ];

  const description = document.createElement("p");
  description.innerHTML = "Avec ce tirage vous auriez:";
  result.append(description);

  const list = document.createElement("ul");

  const appendItem = (text) => {
    const li = document.createElement("li");
    li.innerHTML = text;
    list.append(li);
  };

  const result5 = data.filter((tirage) => tirage.boules.every((boule) => boules.includes(boule)));

  result5.forEach(({ date }) => appendItem(`Gagné le Loto le ${date}!!!`));

  const result4 = data
    .filter((tirage) => tirage.boules.filter((boule) => boules.includes(boule)).length === 4)
    .filter((tirage) => !result5.map(({ date }) => date).includes(tirage.date));

  result4.forEach(({ date }) => appendItem(`Auriez eu 4 numéro gagants le ${date}`));

  result.append(list);

  const cost = document.createElement("p");

  cost.innerHTML = `Au prix de 2€ la grille, vous auriez dépensé ${data.length * 2} €`;
  result.append(cost);
}

boule1.onchange = compute;
boule2.onchange = compute;
boule3.onchange = compute;
boule4.onchange = compute;
boule5.onchange = compute;

compute();
