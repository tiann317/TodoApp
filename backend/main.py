from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Any
from sqlalchemy import null
from sqlalchemy.orm import Session
from database.database import engine, SessionLocal
from database.models import Base
from database.models import TaskPublic, TaskUpdate, TaskCreate, Task
import uvicorn

from database.db_crud import (
    db_task_create,
    db_task_delete,
    db_task_get,
    db_task_update,
    db_tasks_get,
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", status_code=200)
async def read_root():
    return {"msg": "OK"}


@app.get("/tasks/{task_id}", response_model=TaskPublic, status_code=200)
async def read_task(task_id: int, db: Session = Depends(get_db)) -> Any:
    task = db_task_get(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.get("/tasks/", response_model=list[TaskPublic], status_code=200)
async def read_tasks(db: Session = Depends(get_db)) -> Any:
    tasks = db_tasks_get(db)
    if not tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks


@app.post("/tasks/", response_model=TaskPublic, status_code=201)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)) -> Any:
    t = db_task_create(db, task)
    return t


@app.put("/tasks/{task_id}")
async def update_task(
    task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db)
) -> Any:
    task_data = db_task_get(db, task_id)
    if not task_data:
        raise HTTPException(status_code=404, detail="Task not found")
    task = db_task_update(db, task_id, task_in)
    return task


@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db_task_get(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task_delete(db, task_id)
    return {"Task is successfully deleted": "OK"}


if __name__ == "__main__":
    # uvicorn.run("main:app", port=85, host="0.0.0.0",reload=True)
    uvicorn.run("main:app", reload=True, port=8000, host="0.0.0.0")
