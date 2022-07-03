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
    pool.query(query, values);
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
        const circleSocialData = [values[2], values[1], 0];
        const query =
          "INSERT INTO circlesocial(token, userid, online) VALUES ($1, $2, $3);";

        pool.query(query, circleSocialData);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Rota para entrar em um círculo de amizade existente
app.post("/entercircle", async (req: Request, res: Response) => {
  const values = [req.body.token, req.body.userid, req.body.online];
  const query = "SELECT * FROM circle where token = $1";

  try {
    await pool
      .query(query, [values[0]])
      .then((res) => {
        if (res.rowCount >= 1) {
          const circleSocialData = [values[0], values[1], values[3]];
          const query =
            "INSERT INTO circlesocial(token, userid, online) VALUES ($1, $2, $3);";
          pool.query(query, circleSocialData);
        } else {
          console.log("deu merda");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
});

// Rota para consultar os círculos existentes
app.post("/circles", async (req: Request, res: Response) => {
  const values = [req.body.userid];
  const getCircle = `SELECT c.name, c.token, cs.userid 
        FROM circlesocial cs 
        JOIN circle c 
        ON cs.token = c.token 
     WHERE userid = $1`;

  try {
    let result;
    await pool
      .query(getCircle, values)
      .then((res) => {
        if (res.rowCount >= 1) {
          result = res.rows;
        } else {
          result = "Você ainda não possui círculos";
        }
      })
      .catch((err) => {
        result = "Deu erro";
        console.log(err);
      });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// Rota para consultar os círculos existentes
app.post("/circlesuserlist", async (req: Request, res: Response) => {
  const values = [req.body.token];
  const getUsersCircle = `SELECT userid
	FROM circlesocial where token = $1`;

  try {
    let result;
    await pool
      .query(getUsersCircle, values)
      .then((res) => {
        if (res.rowCount >= 1) {
          result = res.rows;
        } else {
          result = "Não há usuários nesse círculo";
        }
      })
      .catch((err) => {
        result = "Deu erro";
        console.log(err);
      });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// Rota para consultar localizações do user
app.post("/locations", async (req: Request, res: Response) => {
  const values = [req.body.userid, req.body.token];
  const getLocations = `SELECT ld.userid, ld.lat, ld.long, cc.online 
  FROM locations ld
  join circlesocial cc
  on ld.userid::uuid = cc.userid::uuid
  WHERE 1=1
  and ld.userid = $1
  and cc.token = $2
  --and cc.online = '1'
  order by locationdate;`;

  try {
    let result;
    await pool
      .query(getLocations, values)
      .then((res) => {
        if (res.rowCount >= 1) {
          result = res.rows;
        } else {
          result = [];
        }
      })
      .catch((err) => {
        result = "Deu erro";
        console.log(err);
      });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// Define se o usuário está online ou não
app.post("/status", async (req: Request, res: Response) => {
  const values = [req.body.userid, req.body.token, req.body.status];
  const setOnline = `UPDATE circlesocial
	SET online = $3
    where userid = $1 and token = $2`;

  try {
    let result;
    result = await pool.query(setOnline, values);
    res.send(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

// // Define se o usuário está em perigo e exibe o alerta
app.post("/sos", async (req: Request, res: Response) => {
  const values = [req.body.token, req.body.message, req.body.userid];
  const setSOS = `INSERT INTO circletimeline(
	token, message, userid)
	VALUES ($1, $2, $3);`;

  try {
    let result;
    result = await pool.query(setSOS, values);
    res.send(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});
