const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const Todo = require("../models/todo");

router.get('/', catchAsync(async (req, res) => {
    const todos = await Todo.find({});
    res.render('todos/index', { todos })
}));

router.get('/new', async (req, res) => {
    const todos = await Todo.find({});
    res.render("todos/new", { todos });
})

router.post("/todos", async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.redirect(`/todos`);
  });

module.exports = router;