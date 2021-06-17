const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
});

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo;
