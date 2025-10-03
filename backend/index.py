from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
class TaskModel(BaseModel):
    task: str
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
todo_list = {1:"Learn FastAPI",
              2:"Build a REST API",
                3:"Deploy the API",
                4:"Celebrate Success!"
              }

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/todo/{task_id}")
async def read_task(task_id: int):
    return {"task": todo_list.get(task_id, "Task not found")}

@app.get("/todo")
async def read_all_tasks():
    return [{"id": k, "task": v} for k, v in todo_list.items()]

@app.post("/todo")
async def create_task(task : TaskModel):
    new_id = max(todo_list.keys()) + 1 if todo_list else 1
    todo_list[new_id] = task.task
    return {"id": new_id, "task": task.task}


@app.put("/todo/{task_id}")
async def update_task(task_id: int, task: str):
    if task_id in todo_list:
        todo_list[task_id] = task
        return {"id": task_id, "task": task}
    return {"error": "Task not found"}


@app.delete("/todo/{task_id}")
async def delete_task(task_id: int):
    if task_id in todo_list:
        deleted_task = todo_list.pop(task_id)
        return {"id": task_id, "task": deleted_task}
    return {"error": "Task not found"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

