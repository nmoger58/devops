"""FastAPI Todo Application

A simple REST API for managing todo items with basic CRUD operations.
Built with FastAPI and uses in-memory storage for demonstration purposes.
"""

from os import environ as env

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class TaskModel(BaseModel):
    """Model representing a todo task.

    Attributes:
        task (str): The description of the task to be done
    """
    task: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
PORT = env.get("PORT", 8000)
HOST = env.get("HOST", "localhost")

todo_list = {
    1: "Learn FastAPI",
    2: "Build a REST API",
    3: "Deploy the API",
    4: "Celebrate Success!"
}


@app.get("/")
async def read_root():
    """Root endpoint that returns a welcome message.

    Returns:
        dict: A simple welcome message
    """
    return {"Hello": "World"}


@app.get("/todo/{task_id}")
async def read_task(task_id: int):
    """Retrieve a specific task by its ID.

    Args:
        task_id (int): The ID of the task to retrieve

    Returns:
        dict: Task details or error message if not found
    """
    return {
        "task": todo_list.get(task_id, "Task not found")
        }


@app.get("/todo")
async def read_all_tasks():
    """Retrieve all tasks in the todo list.

    Returns:
        list: List of all tasks with their IDs
    """
    return [{"id": k, "task": v} for k, v in todo_list.items()]


@app.post("/todo")
async def create_task(task: TaskModel):
    """Create a new task.

    Args:
        task (TaskModel): The task details to be created

    Returns:
        dict: The created task with its assigned ID
    """
    new_id = max(todo_list.keys()) + 1 if todo_list else 1
    todo_list[new_id] = task.task
    return {
        "id": new_id, 
        "task": task.task
        


@app.put("/todo/{task_id}")
async def update_task(task_id: int, task: str):
    """Update an existing task.

    Args:
        task_id (int): The ID of the task to update
        task (str): The new task description

    Returns:
        dict: Updated task details or error message if not found
    """
    if task_id in todo_list:
        todo_list[task_id] = task
        return {
            "id": task_id, 
            "task": task}
    return {"error": "Task not found"}


@app.delete("/todo/{task_id}")
async def delete_task(task_id: int):
    """Delete a task.

    Args:
        task_id (int): The ID of the task to delete

    Returns:
        dict: Deleted task details or error message if not found
    """
    if task_id in todo_list:
        deleted_task = todo_list.pop(task_id)
        return {"id": task_id, "task": deleted_task}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)
