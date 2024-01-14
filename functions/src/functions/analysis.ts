import * as express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Respuesta a GET en /analysis");
});

app.post("/", (req, res) => {
  res.send("Respuesta a POST en /analysis");
});

export default app;
