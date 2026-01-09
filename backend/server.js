const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Get todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// Add todo
app.post('/todos', async (req, res) => {
  const todo = await Todo.create({ text: req.body.text });
  res.status(201).json(todo);
});

// Toggle todo
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, "0.0.0.0" ,() => {
  console.log(`Backend running on port ${PORT}`);
});
