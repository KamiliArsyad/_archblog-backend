const mongoose = require("mongoose");

const CellSchema = new mongoose.Schema({
  columnName: {
    type: String,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  isDirty: {
    type: Boolean,
    default: false, // Indicates if the cell was edited and needs to be saved
  },
});

const TableRowSchema = new mongoose.Schema(
  {
    // tableId: {
    //   type: mongoose.Schema.Types.ObjectId, // Reference to the table this row belongs to, if applicable
    //   required: true,
    // },
    cells: [CellSchema], // Embedding CellSchema for flexible cell management within each row
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the date when row is created
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically update the date when document is modified
    },
  },
  { timestamps: true }
); // Mongoose automatically manages createdAt and updatedAt fields

// Ensure updatedAt is modified on every save
TableRowSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("TableRow", TableRowSchema);
