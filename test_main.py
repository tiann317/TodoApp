from starlette.testclient import TestClient
from backend.main import app

client = TestClient(app)


def create_sample_task():
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
    return response.json()


def test_read_tasks_empty_or_existing():
    response = client.get("/")
    assert response.status_code in [200, 404]

    if response.status_code == 200:
        assert isinstance(response.json(), list)
    else:
        assert response.json() == {"detail": "Task not found"}


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

    data = response.json()

    assert isinstance(data["id"], int)
    assert data["body"] == "test"
    assert data["priority"] == 0
    assert data["assignee"] == "test"
    assert data["status"] == "TODO"


def test_read_task():
    task = create_sample_task()

    response = client.get(f"/tasks/{task['id']}")

    assert response.status_code == 200
    assert response.json() == task


def test_read_nonexistent_task():
    response = client.get("/tasks/999999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}


def test_update_task():
    task = create_sample_task()

    response = client.put(
        f"/tasks/{task['id']}",
        json={
            "body": "test_updated",
            "priority": 1,
            "assignee": "test_updated",
            "status": "DONE",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == task["id"]
    assert data["body"] == "test_updated"
    assert data["priority"] == 1
    assert data["assignee"] == "test_updated"
    assert data["status"] == "DONE"


def test_update_nonexistent_task():
    response = client.put(
        "/tasks/999999",
        json={
            "body": "does_not_exist",
            "priority": 1,
            "assignee": "nobody",
            "status": "DONE",
        },
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}


def test_delete_nonexistent_task():
    response = client.delete("/tasks/999999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}


def test_delete_task():
    task = create_sample_task()

    response = client.delete(f"/tasks/{task['id']}")

    assert response.status_code == 200
    assert response.json() == {"Task is successfully deleted": "OK"}

    verify_response = client.get(f"/tasks/{task['id']}")
    assert verify_response.status_code == 404
