const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// TODO: Implement this middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith("Bearer")) {
    // Bearer <token>
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await User.findById(decoded.id).select("-password");

      // For now, only the admin can be authenticated 
      const email = req.user.email;

      if (email !== process.env.ADMIN_EMAIL) {
        res.status(401);
        throw new Error("-");
      }
      // --------------------------------------------------

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
});

module.exports = { protect };