# TODO: Update and Delete DONE
# TODO: Explore the json capabilities in a new file, implement persistense

from enum import Enum
from typing import List


class Status(Enum):
    TODO = "TODO"
    IN_PROGRESS = "In progress"
    DONE = "Done"


class Task:
    _id_cnt = 1

    def __init__(self, body: str, priority: int, assignee: str):
        self.id = Task._id_cnt
        Task._id_cnt += 1
        self.body = body
        self.priority = priority
        self.assignee = assignee
        self.status = Status.TODO.value

    def __str__(self):
        return (
            f"[{self.id}] {self.body}\n"
            f"Priority: {self.priority}\n"
            f"Assignee: {self.assignee}\n"
            f"Status: {self.status}"
        )


class TaskManager:
    tasks: List[Task] = []

    def __init__(self):
        pass

    def createTask(self, body: str, priority: int, assignee: str):
        task = Task(body, priority, assignee)
        TaskManager.tasks.append(task)
        return task

    def readTasks(self):
        if not TaskManager.tasks:
            print("No tasks yet")
        else:
            t = TaskManager.tasks
            for i in t:
                print(i)

    def getTask(self, id):
        id -= 1
        for task in TaskManager.tasks:
            if task.id == id:
                return task
        return None

    def updateTask(self, id):
        try:
            task = TaskManager.tasks[id - 1]
        except IndexError:
            print(f"Task at idx {id} does not exist")
            return
        updateHelp = (
            "What to update? (b-body, p-priority, a-assignee, s-status, q-quit) "
        )
        while True:
            choice = input(updateHelp).strip()
            match choice:
                case "b":
                    task.body = input("Body: ").strip()
                    continue
                case "p":
                    try:
                        task.priority = int(input("Priority: ").strip())
                    except ValueError:
                        print("Priority must be int")
                    continue
                case "a":
                    task.assignee = input("Assignee: ").strip()
                    continue
                case "s":
                    print("Available status: ")
                    for s in Status:
                        print(s.value)
                    task.status = input("Status: ").strip()
                case "q":
                    break
                case _:
                    print("Available options p, b, a, s, q " + updateHelp)
            print(f"Task {id} have been updated")
            TaskManager.tasks[id - 1] = task

    def deleteTask(self, id):
        try:
            task = TaskManager.tasks[id - 1]
            print("Task " + task.body + " deleted")
            TaskManager.tasks.pop(id - 1)
        except IndexError:
            print(f"Task at idx {id} does not exist")


class Operation(Enum):
    CREATE = "c"
    READ = "r"
    UPDATE = "u"
    DELETE = "d"
    QUIT = "q"


def printHelp():
    print("Press c to create")
    print("Press r to read")
    print("Press u to update")
    print("Press d to delete")
    print("Press q to quit")


def main():
    printHelp()
    while True:
        key = input("Enter key(c,r,u,d,q): ").strip()
        mgr = TaskManager()

        if key == Operation.QUIT.value:
            break

        elif key == Operation.CREATE.value:
            task = input("Task: ").strip()
            while True:
                try:
                    priority = int(input("Priority: ").strip())
                    break
                except ValueError:
                    print("Priority must be int")
                    continue
            assignee = input("Assignee: ").strip()
            mgr.createTask(task, priority, assignee)

        elif key == Operation.READ.value:
            mgr.readTasks()

        elif key == Operation.DELETE.value:
            dlt = "Delete task at idx: "
            mgr.deleteTask(int(input(dlt).strip()))

        elif key == Operation.UPDATE.value:
            upd = "Update task at idx: "
            mgr.updateTask(int(input(upd).strip()))

        else:
            continue


if __name__ == "__main__":
    main()
