from fastapi import FastAPI, HTTPException, Depends
from typing import Any
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from .models import Base
from .models import TaskRead, TaskUpdate, TaskCreate
from .db_crud import db_task_create, db_task_delete, db_task_get, db_task_update

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", status_code=200)
async def read_root():
    return {"msg": "OK"}


@app.get("/tasks/{task_id}", response_model=TaskRead, status_code=200)
async def read_task(task_id: int, db: Session = Depends(get_db)) -> Any:
    task = db_task_get(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.post("/tasks/", response_model=TaskRead, status_code=201)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)) -> Any:
    task = db_task_create(db, task)
    return task


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
    return {"Task is successfully deleted"}
