const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  picture_url: {
    type: String,
    default: "https://placekitten.com/250/250"
  }
});

module.exports = mongoose.model("User", userSchema);
