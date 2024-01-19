const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const port = 3333;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API");
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
