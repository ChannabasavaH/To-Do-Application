import express from "express";
import mongoose from "mongoose";
import Todo from './model/TodoSchema.js'

const app = express()
app.use(express.json());

app.get("/", (req,res) => {
    res.send("hello world");
})

app.post("/api/todos", async (req,res) => {
   try {
    const { task, category } = req.body;
    const newTodo = new Todo({ task, category })
    await newTodo.save();
    res.status(200).json( newTodo );
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
   }
})

app.get("/api/todos", async (req,res) => {
    try {
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.get('/api/todos/:id', async(req,res) => {
    try {
        const { id } = req.params
        const singleTodo = await Todo.findById(id);
        res.status(200).json(singleTodo);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

app.put("/api/todos/:id/edit", async(req,res) => {
    try {
        const { id } = req.params;
        const { task, category } = req.body
        const editedTodo = await Todo.findByIdAndUpdate(id,{task, category}, { new: true })
        res.status(200).json(editedTodo);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

app.delete("/api/todos/:id/delete", async(req,res) => {
    try {
        const { id } = req.params
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.status(200).json(deletedTodo);
    } catch (error) {
        console.log(error)
        res.status(500).json(deletedTodo);
    }
})

mongoose.connect("mongodb://localhost:27017/todos")
    .then(() => {
        console.log("connected to database");
        app.listen('8080', () => {
            console.log("app is listening to 8080");
        })
    })
    .catch((error) => {
        console.log(error);
    })