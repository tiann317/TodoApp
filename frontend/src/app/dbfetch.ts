import { inject, Injectable } from '@angular/core';
import { Taskpostschema, Taskschema } from './taskschema';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Dbfetch {
  private http = inject(HttpClient);
  /*TODO: get URL via env variab with localhost as default*/
  url = "http://localhost:8000/tasks"
  /*TODO: rewrite with HttpClient*/
  async getTaskByID(id: number): Promise<Taskschema | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const taskJSON = await data.json();
    return taskJSON ?? {};
  }

  /*TODO: rewrite with HttpClient*/
  async getAllTasks(): Promise<Taskschema[]> {
    const data = fetch(this.url);
    return ((await data).json()) ?? [];
  }
  createTask(body: string, priority: string, assignee: string, status: string) {
    const headers = {
      "accept": "application/json",
      "Content-Type": "application/json"
    }
    const payload: Taskpostschema = {
      body: body,
      priority: 67,
      assignee: assignee,
      status: status,
    }
    /*TODO: add error handling*/
    this.http.post(this.url, payload, { headers }).subscribe();
  }
}
