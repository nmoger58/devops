import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

// ✅ Make sure in your .env file you have: VITE_API_BASE_URL=http://localhost:8000
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const App = () => {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  // Add a new todo
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_BASE_URL}/todo`, { task })
      console.log('Todo item added:', response.data)
      setTask('')
      fetchTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todo`)
      setTodos(response.data)
      console.log('Fetched todos:', response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Delete a todo
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todo/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  // Start editing a todo
  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.task)
  }

  // Save edited todo
  const submitEdit = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/todo/${id}`, { task: editingText }) // ✅ send as object
      setEditingId(null)
      setEditingText('')
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <p className="subtitle">Manage your tasks efficiently</p>
      
      {/* Add Form */}
      <form onSubmit={submitHandler} className="add-form">
        <input 
          type="text" 
          placeholder="Enter a todo item" 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="add-button">Add Todo</button>
      </form>

      {/* Todo List */}
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
                <button 
                  onClick={() => submitEdit(todo.id)}
                  className="save-button"
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditingId(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="todo-content">
                <span className="todo-text">{todo.task}</span>
                <div className="todo-actions">
                  <button 
                    onClick={() => startEditing(todo)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTask(todo.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
