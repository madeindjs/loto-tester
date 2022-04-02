// @ts-check
const express = require("express");
const app = express();
const port = 3000;
const { db } = require("./db");
const { sortNumbers } = require("./utils");

/**
 *
 * @param {Number[]} boules
 * @returns
 */
const getExactTirages = (boules) =>
  new Promise((res, rej) => {
    db.all(`SELECT * FROM tirages WHERE boules = ?`, boules.sort(sortNumbers).join(","), (error, rows) => {
      if (error) {
        return rej(error);
      }

      return res(rows);
    });
  });

app.get("/", (req, res) => {
  if (req.query.boules === undefined) {
    return res.status(400).send("You must specify boules");
  }

  const boules = String(req.query.boules).split(",").map(Number);

  if (boules.length !== 5) {
    return res.status(400).send("You must specify 5 boules");
  }

  Promise.all([getExactTirages(boules)])
    .then(([exactTirages]) => res.json({ exactTirages }))
    .catch((error) => res.status(500).json(error));
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
