const mongoose = require("mongoose");
const Todo = require("./models/todo");

mongoose
  .connect("mongodb://localhost:27017/todo-new", { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("mongo connection error");
    console.log(err);
  });

const seedData = [
  {
    name: "do homework",
    details: "complete chaper 4 reading",
  },
  {
    name: "work out",
    details: "ride bike 5km",
  },
];

Todo.insertMany(seedData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
