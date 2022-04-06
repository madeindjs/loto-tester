// @ts-check
const { writeFileSync } = require("fs");
const { insert, readLines } = require("./_utils");

const data = [];

function main() {
  ["2008-10_2017-03", "2017-03_2019-02", "2019-02_2019-11", "2019-11"].forEach((filename) =>
    readLines(`./data/loto/${filename}.csv`).forEach((line, index) => {
      if (index === 0) return;
      const [, , date, , boule1, boule2, boule3, boule4, boule5, numeroChance] = line.split(";");
      insert(data, date, [boule1, boule2, boule3, boule4, boule5], [numeroChance]);
    })
  );

  writeFileSync("./src/data/loto.js", `export const tirages = ${JSON.stringify(data)};`);
}

main();

console.log(data);
