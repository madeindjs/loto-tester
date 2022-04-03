// @ts-check
const { readFileSync, writeFileSync } = require("fs");
const { insert, readLines } = require("./_utils");

const data = [];

function main() {
  readLines("./data/euromillion/2014-02_2016-09.csv").forEach((line, index) => {
    if (index === 0) return;
    const [, , date, , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
    insert(data, date, [boule1, boule2, boule3, boule4, boule5], [etoile1, etoile2]);
  });

  readLines("./data/euromillion/2016-09_2020-02.csv").forEach((line, index) => {
    if (index === 0) return;
    const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
    insert(data, date, [boule1, boule2, boule3, boule4, boule5], [etoile1, etoile2]);
  });

  readLines("./data/euromillion/2020-02.csv").forEach((line, index) => {
    if (index === 0) return;
    const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
    insert(data, date, [boule1, boule2, boule3, boule4, boule5], [etoile1, etoile2]);
  });

  writeFileSync("./src/data/euromilion.js", `export const tirages = ${JSON.stringify(data)};`);
}

main();

console.log(data);
