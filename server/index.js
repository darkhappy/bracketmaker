const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const conn = result.parsed.CONNECTION_STRING;

mongoose.set("strictQuery", false);
mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const router = require("./routes");

app.use(express.json());
app.use(router);
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;