from pydantic import BaseModel, Field, ConfigDict, FiniteFloat
from sqlalchemy.orm import DeclarativeBase
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Status(Enum):
    TODO = "TODO"
    IN_PROGRESS = "In progress"
    DONE = "Done"


class TaskCreate(BaseModel):
    body: str = Field(title="Description of the task", max_length=255)
    priority: int | None = 1
    assignee: str | None = None
    status: Status


class TaskRead(BaseModel):
    id: int
    body: str | None = "String"
    priority: int | None = 1
    assignee: str | None = None
    status: Status | None = None


class TaskUpdate(BaseModel):
    body: str | None = None
    priority: int | None = None
    assignee: str | None = None
    status: Status | None = None


# converting sqlalchemy DeclarativeBase model to pydantic BaseModel
class PydanticTask(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(alias="id")
    body: str = Field(alias="body")
    priority: int = Field(alias="priority")
    assignee: str = Field(alias="assignee")
    status: Status = Field(alias="status")


class Task(Base):
    __tablename__ = "task"
    id: Mapped[int] = mapped_column(primary_key=True)
    body: Mapped[str]
    priority: Mapped[int]
    assignee: Mapped[str]
    status: Mapped[Status]

    def __repr__(self) -> str:
        return (
            f"Id(id={self.id!r}, body={self.body!r},"
            f"priority={self.priority!r}, assignee={self.assignee!r}, status={
                self.status!r
            })"
        )
