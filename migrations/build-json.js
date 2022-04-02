// @ts-check
const lineReader = require("line-reader");
const { readFileSync, writeFileSync } = require("fs");

const data = [];

function insert(date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2) {
  if (date === undefined) return;
  const [day, month, year] = date.split("/");

  data.push({
    date: `${year}-${month}-${day}`,
    boules: [Number(boule1), Number(boule2), Number(boule3), Number(boule4), Number(boule5)],
    etoiles: [Number(etoile1), Number(etoile2)],
  });
}

function main() {
  readFileSync("./data/euromillion/2014-02_2016-09.csv")
    .toString("utf-8")
    .split("\n")
    .forEach((line, index) => {
      if (index === 0) return;
      const [, , date, , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
      insert(date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2);
    });

  readFileSync("./data/euromillion/2016-09_2020-02.csv")
    .toString("utf-8")
    .split("\n")
    .forEach((line, index) => {
      if (index === 0) return;
      const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
      insert(date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2);
    });

  readFileSync("./data/euromillion/2020-02.csv")
    .toString("utf-8")
    .split("\n")
    .forEach((line, index) => {
      if (index === 0) return;
      const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
      insert(date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2);
    });

  writeFileSync("./data.json", JSON.stringify(data));
}

main();

console.log(data);
