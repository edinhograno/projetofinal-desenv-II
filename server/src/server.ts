import { app } from "./app";

// const port = process.env.PORT || 5432;
const port = 5000;

const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("Server has died!");
});
