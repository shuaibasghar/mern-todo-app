const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const dotenv = require("dotenv");

//config
dotenv.config({ path: "backend/config/config.env" });

//Route imports
const todo = require("./routes/todoRoutes");
app.use("/", todo);

module.exports = app;
