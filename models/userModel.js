const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please Add a Username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a Email Address"],
      unique: [true, "Email ID already taken"],
    },
    password: {
      type: String,
      required: [true, "PLease enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
