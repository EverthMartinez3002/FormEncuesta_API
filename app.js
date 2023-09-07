const express = require('express');
const app = express();
const port = 3000;
var cookieParser = require('cookie-parser');

const apiRouter = require("./routes/api/index.router");

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use(express.json());
app.use(cookieParser())
app.use("/api", apiRouter);

module.exports = app;
