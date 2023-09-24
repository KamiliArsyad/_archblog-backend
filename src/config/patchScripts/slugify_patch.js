const connectDB = require("../db");
const mongoose = require("mongoose");
const { generateSlugFromTitle } = require("../../auxiliaries/functions");
const Post = require("../../models/postModel");
const dotenv = require("dotenv").config();
const colors = require("colors");

connectDB();

const updatePosts = async () => {
  try {
    const posts = await Post.find({});

    for (let post of posts) {
      post.slug = generateSlugFromTitle(post.title);
      await post.save();
    }

    console.log("Posts updated successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  updatePosts();
});

// Exit with a success message
console.log("Script executed successfully".green.underline.bold);
