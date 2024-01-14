import * as express from "express";
const app = express();

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Respuesta a POST en /analysis");
});

export default app;
