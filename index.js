require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/", (req, res) => {
  res.send("Hello from Node.js and MongoDB Atlas!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
