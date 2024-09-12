const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const router = express.Router();

// Create Express app
const app = express();

// Apply middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_KEY,
      callbackURL: "http://localhost:3001/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

// Ensure routes are properly set up
readdirSync("./routes").map((routeFile) =>
  app.use("/api", require(`./routes/${routeFile}`))
);
// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

// Define routes.

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

mongoose.connection.on("error", (err) => {
  console.log(`DB CONNECTION ERROR: ${err.message}`);
});

// Setup routes
readdirSync("./routes").map((routeFile) =>
  app.use("/api", require(`./routes/${routeFile}`))
);

module.exports = app;
