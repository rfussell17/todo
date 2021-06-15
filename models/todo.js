const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
