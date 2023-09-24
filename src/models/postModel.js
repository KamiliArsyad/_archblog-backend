const mongoose = require("mongoose");
const { generateSlugFromTitle } = require("../auxiliaries/functions");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate slugs
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    type: String,
    enum: ["Course Review", "Blog", "Project", "Academics"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  courseReview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseReview",
  },
});

// Create a slug from the title
PostSchema.pre("validate", async function (next) {
  if (!this.isModified("title")) {
    return next();
  }

  this.slug = generateSlugFromTitle(this.title);

  try {
    const slugExists = await mongoose.models.Post.findOne({ slug: this.slug });
    if (slugExists) {
      this.slug = `${this.slug}-${this._id}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Post", PostSchema);
