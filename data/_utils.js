// @ts-check
const { readFileSync } = require("fs");

function insert(data, date, boules, extra) {
  if (date === undefined) return;
  let [day, month, year] = date.split("/");

  if (year.length === 2) {
    year = `20${year}`;
  }

  data.push({
    date: `${year}-${month}-${day}`,
    boules: boules.map(Number).sort((a, b) => a - b),
    extra: extra.map(Number).sort((a, b) => a - b),
  });
}

function readLines(path) {
  return readFileSync(path).toString("utf-8").split("\n");
}

module.exports = { insert, readLines };
