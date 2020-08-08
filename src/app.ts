export {};
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const carRouter = require("./routes/cars_routes");

app.use(cors());
app.use("/", carRouter);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;
