const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    facebook_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
