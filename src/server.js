const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const swaggerDocument = YAML.parse(fs.readFileSync("./docs/schema/index.yaml", "utf8"));

connectDB();

const app = express();

// DOCS
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/rows", require("./routes/ictRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/admin", require("./routes/userRoutes"));

// Error handler
app.use(require("./middlewares/errorHandlerMiddleware").errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
