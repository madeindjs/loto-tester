// @ts-check
const { db } = require("../db");
const lineReader = require("line-reader");
const { sortNumbers } = require("../utils");

function insert(db, date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2) {
  db.run(
    "INSERT INTO tirages (date, boules, etoiles) VALUES (?, ?, ?)",
    date,
    [Number(boule1), Number(boule2), Number(boule3), Number(boule4), Number(boule5)].sort(sortNumbers),
    [Number(etoile1), Number(etoile2)].sort(sortNumbers)
  );
}

db.serialize(() => {
  let first1 = true;
  lineReader.eachLine("./data/euromillion/2014-02_2016-09.csv", (line, last) => {
    if (first1) {
      first1 = false;
      return;
    }
    const [, , date, , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
    insert(db, date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2);
    // console.log("2014-02_2016-09.csv", { date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2 });
  });

  let first2 = true;

  lineReader.eachLine("./data/euromillion/2016-09_2020-02.csv", (line, last) => {
    if (first2) {
      first2 = false;
      return;
    }
    const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
    // console.log("2016-09_2020-02.csv", { date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2 });
    insert(db, date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2);
  });

  let first3 = true;

  lineReader.eachLine("./data/euromillion/2020-02.csv", (line, last) => {
    if (first3) {
      first3 = false;
      return;
    }
    const [, , date, , , boule1, boule2, boule3, boule4, boule5, etoile1, etoile2] = line.split(";");
    // console.log("2020-02.csv", { date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2 });
    insert(db, date, boule1, boule2, boule3, boule4, boule5, etoile1, etoile2);
  });
});
