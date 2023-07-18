// Helper functions
const jwt = require("jsonwebtoken");

/**
 * @description: Generate token for user
 * @param {string} id
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };