const express = require("express");
const router = express.Router();
const catchAsync = require("../helpers/catchAsync");
const { isLoggedIn, validateTodo, isAuthor } = require("../middleware");
const Todo = require("../models/todo");

router.get("/", catchAsync(async (req, res) => {
    const todos = await Todo.find({});
    res.render("todos/index", { todos });
  })
);

router.post('/', isLoggedIn, validateTodo, catchAsync(async (req, res, next) => {
  const newTodo = new Todo(req.body.todo);
  newTodo.author = req.user._id;
  await newTodo.save();
  req.flash('success', 'Successfully added to-do');
  res.redirect(`/todos`);
}))

router.get('/:id', isLoggedIn, catchAsync(async (req, res,) => {
  const todo = await Todo.findById(req.params.id).populate({
      path: 'todos',
      populate: {
          path: 'author'
      }
  }).populate('author');
  if (!todo) {
      req.flash('error', 'Cannot find that todo!');
      return res.redirect('/todos');
  }
  res.render('todos/show', { todo });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
      req.flash('error', 'Cannot find that todo!');
      return res.redirect('/todoss');
  }
  res.render('todos/edit', { todo, name: todo.name });
}))

router.put('/:id', isLoggedIn, validateTodo, catchAsync(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  req.flash('success', 'Successfully updated todo!');
  res.redirect(`/todos/${todo._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted todo')
  res.redirect('/todos');
}));

module.exports = router;
