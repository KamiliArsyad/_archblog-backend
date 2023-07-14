// Administrative things.
// =============================================================
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../auxiliaries/functions");

/**
 * @desc register a new user
 * @route POST /api/admin
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture_url } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const same_user = await User.findOne({ email });

  if (same_user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  const new_user = await User.create({
    name,
    email,
    password: hashed_password,
    picture_url,
  });

  if (new_user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc Authenticate user & get token
 * @route POST /api/admin/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

module.exports = { registerUser, authUser };