// @ts-check
const { writeFileSync } = require('fs');
const { insert, readLines } = require('./_utils');

const data = [];

function run() {
  readLines('./data/euromillion/2014-02_2016-09.csv').forEach((line, index) => {
    if (index === 0) return;
    const [, , date, , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(';');
    insert(data, date, [boule1, boule2, boule3, boule4, boule5], [etoile1, etoile2]);
  });

  readLines('./data/euromillion/2016-09_2020-02.csv').forEach((line, index) => {
    if (index === 0) return;
    const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(';');
    insert(data, date, [boule1, boule2, boule3, boule4, boule5], [etoile1, etoile2]);
  });

  readLines('./data/euromillion/2020-02.csv').forEach((line, index) => {
    if (index === 0) return;
    const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(';');
    insert(data, date, [boule1, boule2, boule3, boule4, boule5], [etoile1, etoile2]);
  });

  writeFileSync('./src/components/app-loto-summary/assets/euromillion.json', JSON.stringify(data));
}

module.exports = { run };
