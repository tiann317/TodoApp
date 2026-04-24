const url = "http://localhost:8000/tasks/";

async function getTasks() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    parced = result;
    let text = "<table border='1'>";
    for (let x in parced) {
      text += "<tr><td>" +
        parced[x].body +
        "</td><td>" +
        parced[x].priority +
        "</td><td>" +
        parced[x].assignee +
        "</td><td>" +
        parced[x].status +
        "</td></tr>";
    }
    text += "</table>";
    document.getElementById("tasklist").innerHTML = text;
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function createTask() {

  body = document.getElementById("body").value
  priority = document.getElementById("priority").value
  assignee = document.getElementById("assignee").value
  status = document.getElementById("status").value

  var obj = {
    body: body,
    priority: priority,
    assignee: assignee,
    status: status
  }
  const request = new Request(url, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const response = await fetch(request);
  console.log(response.status);
}


async function getTask() {
  task_id = document.getElementById("id").value
  try {
    const response = await fetch(url + task_id);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    parced = result;
    let text = "<table border='1'>";
    text += "<tr>"
    for (let x in parced) {
      text += "<td>" + parced[x] + "</td>";
    }
    text += "</tr>";
    text += "</table>";
    document.getElementById("task").innerHTML = text;
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteTask() {
  hidden = true;
  task_id = document.getElementById("delete").value
  const response = await fetch(url + task_id);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  parced = result;
  let text = "<table border='1'>";
  text += "<tr>"
  for (let x in parced) {
    text += "<td>" + parced[x] + "</td>";
  }
  text += "</tr>";
  text += "</table>";
  document.getElementById("taskdeleted").innerHTML = text;

  const request = new Request(url + task_id, {
    method: "DELETE",
    headers: { "accept": "application/json" },
  });
  hidden = !hidden
  const resp = await fetch(request);
  console.log(resp.status)
}

async function updateTask() {

  task_id = document.getElementById("id_upd").value
  body = document.getElementById("body_upd").value
  priority = document.getElementById("priority_upd").value
  assignee = document.getElementById("assignee_upd").value
  status = document.getElementById("status_upd").value

  var obj = {
    body: body,
    priority: priority,
    assignee: assignee,
    status: status
  }
  const request = new Request(url + task_id, {
    method: "PUT",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const resp = await fetch(request);
  console.log(resp.status);
}

