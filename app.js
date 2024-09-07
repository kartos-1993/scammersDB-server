const { readdirSync } = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Create Express app
const app = express();

// Apply middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

mongoose.connection.on("error", (err) => {
  console.log(`DB CONNECTION ERROR: ${err.message}`);
});

// Setup routes

const routesPath = path.resolve(__dirname, "routes");
console.log("routesPath", routesPath);

readdirSync("./routes").map((routePath) =>
  app.use("/api", require("./routes/" + routePath))
);

module.exports = app;
