import express from "express";

import { Client, Pool } from "pg";

require("dotenv").config();

const pool = new Pool();

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const queryResult = await pool.query("SELECT $1::text as message", [
    "FOOBAR",
  ]);

  res.send(queryResult.rows[0].message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
