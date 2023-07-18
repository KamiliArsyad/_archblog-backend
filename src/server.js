const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/admin", require("./routes/userRoutes"));

// Error handler
app.use(require("./middlewares/errorHandlerMiddleware").errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
