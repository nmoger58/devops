import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/todo', {task: task})
      console.log('Todo item added:', response.data)
      setTask('')
      // Refresh the todo list after adding new item
      fetchTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }
  const fetchTodos = async() => {
    try {
      const response = await axios.get('http://localhost:8000/todo')
      setTodos(response.data)
      console.log('Fetched todos:', response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todo/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.task)
  }

  const submitEdit = async (id) => {
    try {
      await axios.put(`http://localhost:8000/todo/${id}`, editingText)
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
