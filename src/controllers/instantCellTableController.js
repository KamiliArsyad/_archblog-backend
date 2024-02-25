const asyncHandler = require("express-async-handler");
const TableRow = require("../models/instantCellTableRowModel");

// @desc    Get all rows
// @route   GET /api/rows
// @access  Public (for POC purposes)
const getRows = asyncHandler(async (req, res) => {
  const rows = await TableRow.find({}); // Find all rows without any filter
  res.json(rows);
});

// @desc    Get a row by ID
// @route   GET /api/rows/:rowId
// @access  Public (for POC purposes)
const getRowById = asyncHandler(async (req, res) => {
  const { rowId } = req.params;
  const row = await TableRow.findOne({ rowId: rowId });

  if (row) {
    res.json(row);
  } else {
    res.status(404).send("Row not found");
  }
});

// @desc    Update a cell in a row by IDs
// @route   PUT /api/rows/:rowId/cells/:columnName
// @access  Public (for POC purposes)
const updateCell = asyncHandler(async (req, res) => {
  const { value } = req.body; // New value for the cell
  const { rowId, columnName } = req.params;

  const row = await TableRow.findOne({ rowId: rowId });

  if (row) {
    const cell = row.cells.find((cell) => cell.columnName === columnName);
    if (cell) {
      cell.value = value;
      cell.isDirty = false; // Assuming the cell is no longer 'dirty' after being updated
    } else {
      // If the cell doesn't exist, optionally handle this case (e.g., add a new cell)
    }

    const updatedRow = await row.save();
    res.json(updatedRow);
  } else {
    res.status(404);
    throw new Error("Row not found");
  }
});

// @desc    Add a new row
// @route   POST /api/rows
// @access  Public (for POC purposes)
const addRow = asyncHandler(async (req, res) => {
  const { cells } = req.body; // Expecting an array of cells from the request

  const newRow = new TableRow({
    cells: cells,
    // Optionally set a static tableId if managing multiple tables in the future
  });

  const savedRow = await newRow.save();

  res.status(201).json(savedRow);
});

// @desc    Delete a row by ID
// @route   DELETE /api/rows/:rowId
// @access  Public (for POC purposes)
const deleteRow = asyncHandler(async (req, res) => {
  const { rowId } = req.params;

  const deletionResult = await TableRow.deleteOne({ rowId: rowId });

  if (deletionResult.deletedCount === 0) {
    res.status(404).send("Row not found");
  } else {
    res.status(200).send("Row deleted successfully");
  }
});

module.exports = { getRows, getRowById, updateCell, addRow, deleteRow };
