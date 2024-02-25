const express = require("express");
const router = express.Router();

const { addRow, deleteRow, updateCell, getRows, getRowById } = require("../controllers/instantCellTableController");

// Route for fetching all rows and adding a new row
router
  .route("/")
  .get(getRows) // Fetch all rows
  .post(addRow); // Add a new row

// Routes for specific row operations: fetch, delete
router
  .route("/:rowId")
  .get(getRowById) // Fetch a specific row by ID
  .delete(deleteRow);

// Route for updating a specific cell in a row
router
  .route("/:rowId/cells/:columnName")
  .put(updateCell);

module.exports = router;
