import { ObjectId } from "mongodb";
import ToDo from "../models/todoModel.js";



export const addTodo = async (req, res) => {
  const todo = req.body;
  try {
   const newTodo =  await ToDo.insertOne(todo);
   res.redirect('todos')
    res.status(201).json(newTodo)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.render("index", { todos })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todos = await req.db
      .collection("todos")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  try {
    const result = await ToDo.findByIdAndUpdate(id, updatedTodo)
    // if (result.modifiedCount === 0) {
    //   return res.status(404).json({ error: "Not updated" });
    // }
    console.log(result);
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ToDo.findByIdAndDelete(id);
    // if (result.deletedCount === 0) {
    //   return res.status(404).json({ error: "Todo not found" });
    // }
    console.log(result);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
