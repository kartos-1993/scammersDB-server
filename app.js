const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// Create Express app
const app = express();

// Apply middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

mongoose.connection.on("error", (err) => {
  console.log(`DB CONNECTION ERROR: ${err.message}`);
});

// Setup routes
readdirSync("./src/routes").map((routeFile) =>
  app.use("/api", require(`.src/routes/${routeFile}`))
);

module.exports = app;
