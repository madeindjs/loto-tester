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
}

boule1.onchange = compute;
boule2.onchange = compute;
boule3.onchange = compute;
boule4.onchange = compute;
boule5.onchange = compute;

compute();
