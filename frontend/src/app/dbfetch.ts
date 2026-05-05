import { inject, Injectable } from '@angular/core';
import { Taskpostschema, Taskschema } from './taskschema';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class Dbfetch {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  getTaskByID(id: number): Observable<Taskschema> {
    return this.http.get<Taskschema>(`${this.url}/tasks/${id}`);
  }

  getAllTasks() {
    return this.http.get<Taskschema[]>(`${this.url}/`);
  }

  createTask(body: string, priority: number, assignee: string, status: string) {
    const headers = {
      "accept": "application/json",
      "Content-Type": "application/json"
    }
    const payload: Taskpostschema = {
      body: body,
      priority: priority,
      assignee: assignee,
      status: status,
    }
    this.http.post(`${this.url}/tasks`, payload, { headers }).subscribe();
  }

  updateTask(id: number, body: string, priority: number, assignee: string, status: string) {
    const headers = {
      "accept": "application/json",
      "Content-Type": "application/json"
    }
    const payload: Taskpostschema = {
      body: body,
      priority: priority,
      assignee: assignee,
      status: status,
    }
    this.http.put(`${this.url}/tasks/${id}`, payload, { headers }).subscribe();
  }

  deleteTask(id: number) {
    const headers = {
      "accept": "application/json"
    }
    this.http.delete(`${this.url}/tasks/${id}`, { headers }).subscribe()
  }
}
