const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
var cookieParser = require('cookie-parser');

const apiRouter = require("./routes/api/index.router");

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use("/api", apiRouter);

module.exports = app;
