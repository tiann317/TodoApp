from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy.orm import DeclarativeBase
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column
# TODO: uuid ? cookie for id


class Status(Enum):
    TODO = "TODO"
    IN_PROGRESS = "In progress"
    DONE = "Done"


# SCHEMAS
class TaskBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    body: str = Field(min_length=1, max_length=255)
    priority: int = Field(default=1)
    assignee: str = Field(min_length=1, max_length=255)
    status: Status = Field(default=Status.TODO)


class TaskCreate(TaskBase):
    pass


class TaskPublic(TaskBase):
    id: int


class TaskUpdate(TaskBase):
    body: str | None = Field(min_length=1, max_length=255)
    priority: int | None = Field(default=0)
    assignee: str | None = Field(min_length=1, max_length=255)
    status: Status | None = Field()


# MODELS
class Base(DeclarativeBase):
    pass


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
