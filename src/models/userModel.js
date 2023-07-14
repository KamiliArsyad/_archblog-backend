const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profile_picture: {
    type: String,
    default: "https://placekitten.com/250/250",
  },
});

module.exports = mongoose.model("User", UserSchema);
