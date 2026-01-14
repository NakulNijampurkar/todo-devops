import { useEffect, useState } from 'react';
import './index.css';



function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;
    await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    setText('');
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, { method: 'PUT' });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>Todo DevOps App</h1>

      <div className="input-group">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo._id)}>
              {todo.text}
            </span>
            <button
              className="delete"
              onClick={() => deleteTodo(todo._id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
