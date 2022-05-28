import express from "express";
import cors from "cors";

import { Client, Pool } from "pg";

require("dotenv").config();

const pool = new Pool();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 5000;

app.get("/user", async (req, res) => {
  // const queryResult = await pool.query("SELECT $1::text as message", [
  //   "FOOBAR",
  // ]);
  // res.send(queryResult.rows[0].message);
  // prettier-ignore
  res.json({ "users": ["userONe", "userTwo"] });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
