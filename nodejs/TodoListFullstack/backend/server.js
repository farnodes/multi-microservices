const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./models/todoList")

require('dotenv').config();
const PORT = process.env.PORT; // Default to 3001 if PORT is not defined
const MONGO_URI = process.env.MONGO_URI;

var app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:3000', // This is the frontend container's name and port
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    credentials: true // If you're using cookies or authentication headers
};

app.use(cors());
app.use(express.json());

// Connect to your MongoDB database (replace with your database URL)
//mongoose.connect("mongodb://127.0.0.1/todo");
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check for database connection errors
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Get saved tasks from the database
app.get("/getTodoList", (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.json(err))
});

// Add new task to the database
app.post("/addTodoList", (req, res) => {
    TodoModel.create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline, 
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

// Update task fields (including deadline)
app.post("/updateTodoList/:id", (req, res) => {
    const id = req.params.id;
    const updateData = {
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline, 
    };
    TodoModel.findByIdAndUpdate(id, updateData)
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

// Delete task from the database
app.delete("/deleteTodoList/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
