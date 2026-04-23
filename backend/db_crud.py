from sqlalchemy import select, update
from backend.models import TaskCreate, Task, TaskUpdate

# from sqlalchemy.sql.expression import cast
from sqlalchemy.orm import Session

id_gen: int = 1


def override_id(db: Session):
    result = db.execute(select(Task.id))
    max: int = 1
    for row in result:
        if row.id > max:
            max = row.id

    return max + 1


def db_task_create(db: Session, task: TaskCreate):
    global id_gen
    t = db_task_get(db, id_gen)
    if t:
        id_gen = override_id(db)
    task = Task(
        id=id_gen,
        body=task.body,
        priority=task.priority,
        assignee=task.assignee,
        status=task.status,
    )
    id_gen += 1
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def db_task_get(db: Session, id: int):
    task = db.get(Task, id)
    return task


def db_tasks_get(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Task).offset(skip).limit(limit).all()


def db_task_update(db: Session, id: int, upd: TaskUpdate):
    stmt = (
        update(Task)
        .where(Task.id == id)
        .values(
            body=upd.body,
            priority=upd.priority,
            assignee=upd.assignee,
            status=upd.status,
        )
    )
    db.execute(stmt)
    db.commit()
    return upd


def db_task_delete(db: Session, id: int):
    db.query(Task).filter(Task.id == id).delete()
    db.commit()
