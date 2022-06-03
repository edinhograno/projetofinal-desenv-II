import express, { Request, Response } from "express";
import cors from "cors";
import { Client, Pool, QueryResult } from "pg";

require("dotenv").config();

export const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

app.post("/register", (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  // const date = Date.now();
  try {
    const query =
      "INSERT INTO users(name, email, creationdate) VALUES ($1,$2,NOW());";

    pool.query(query, [name, email], (err: Error, res: QueryResult) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", (req: Request, res: Response) => {
  pool.query("SELECT * FROM public.users", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
});
