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

// Rota para registrar o user
app.post("/register", (req: Request, res: Response) => {
  const values = [req.body.name, req.body.email, req.body.password];
  const query =
    "INSERT INTO users(name, email, password, creationdate) VALUES ($1,$2, $3,NOW());";
  try {
    pool.query(query, values, (err: Error, res: QueryResult) => {
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

// Rota para o user fazer o login
app.post("/credentials", async (req: Request, res: Response) => {
  const values = [req.body.email, req.body.password];
  const query = "SELECT * FROM public.users where email = $1 and password = $2";

  try {
    let result = {};
    await pool
      .query(query, values)
      .then((res) => {
        if (res.rowCount >= 1) {
          result = res.rows;
        } else {
          result = "False";
        }
      })
      .catch((error) => {
        console.log(error);
        result = "False";
      });
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// Rota para a criação de um círculo de amizade
app.post("/newcircle", (req: Request, res: Response) => {
  const values = [req.body.circlename, req.body.owneruserid, req.body.token];
  const query =
    "INSERT INTO circle(name, owneruserid, token) VALUES ($1, $2, $3);";
  try {
    pool.query(query, values, (err: Error, res: QueryResult) => {
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

// Rota para consultar os círculos existentes
app.get("/circles", (req: Request, res: Response) => {
  const values = [req.body.owneruserid];
  const queryOwnerCircle =
    "SELECT name, token FROM circle where owneruserid = $1;";
  try {
    pool.query(queryOwnerCircle, values, (err: Error, res: QueryResult) => {
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
