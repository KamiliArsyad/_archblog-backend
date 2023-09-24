// Helper functions

const jwt = require("jsonwebtoken");
const slugify = require("transliteration").slugify;

/**
 * @description: Generate token for user
 * @param {string} id
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * @description: Generate slug from title, removing all non-alphanumeric characters and replacing spaces with dashes
 * @param {string} title
 * @returns {string} slug
 */
const generateSlugFromTitle = (title) => {
  const slug = slugify(title, { lowercase: true, separator: "-" });
  return slug.replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

module.exports = { generateToken, generateSlugFromTitle };