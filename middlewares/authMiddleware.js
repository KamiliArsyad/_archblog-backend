const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// TODO: Implement this middleware
const protect = asyncHandler(async (req, res, next) => {});

module.exports = { protect };
