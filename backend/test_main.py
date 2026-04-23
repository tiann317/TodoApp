from starlette.testclient import TestClient
from .main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "OK"}


def test_create_task():
    response = client.post(
        "/tasks/",
        json={
            "body": "test",
            "priority": 0,
            "assignee": "test",
            "status": "TODO",
        },
    )
    assert response.status_code == 201
    assert type(response.json()["id"]) is int


def test_read_tesk():
    response = client.get("/tasks/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "body": "test",
        "priority": 0,
        "assignee": "test",
        "status": "TODO",
    }


def test_read_nonexistent_task():
    response = client.get("/tasks/67")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}


def test_update_test():
    response = client.put(
        "/tasks/1",
        json={
            "body": "test_updated",
            "priority": 1,
            "assignee": "test_updated",
            "status": "Done",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "body": "test_updated",
        "priority": 1,
        "assignee": "test_updated",
        "status": "Done",
    }


def test_update_nonexistent_task():
    response = client.put("/tasks/67")
    assert response.status_code == 422
    # assert response.json() == {"detail": "Task not found"}


def test_delete_nonexistent_task():
    response = client.delete("/tasks/67")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}


def test_delete_task():
    response = client.delete("/tasks/1")
    assert response.status_code == 200
    assert response.json() == {"Task is successfully deleted": "OK"}
