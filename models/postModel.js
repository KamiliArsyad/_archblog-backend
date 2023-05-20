const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      trim: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);