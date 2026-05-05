import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Dbfetch } from '../dbfetch';

@Component({
  selector: 'app-createview',
  imports: [ReactiveFormsModule],
  styleUrl: './createview.css',
  template: `

      <section class="listing-create">
        <h2 class="section-heading">Create new task</h2>

        <form [formGroup]="form" (submit)="createTask()">

          <label for="task-body">Description:</label>
          <input id="task-body" type="text" formControlName="body" />

          <label for="task-priority">Priority:</label>
          <input id="task-priority" type="number" formControlName="priority" />

          <label for="task-assignee">Assignee:</label>
          <input id="task-assignee" type="text" formControlName="assignee" />

          <label for="task-status">Status:</label>
          <input id="task-status" type="text" formControlName="status" />


          <button type="submit" class="primary">Create</button>
        </form>
      </section>
`
})
export class Createview {
  db: Dbfetch = inject(Dbfetch);
  form = new FormGroup(
    {
      body: new FormControl(''),
      priority: new FormControl(0),
      assignee: new FormControl(''),
      status: new FormControl(''),
    }
  )

  createTask() {
    this.db.createTask(
      this.form.value.body ?? '',
      this.form.value.priority ?? 0,
      this.form.value.assignee ?? '',
      this.form.value.status ?? '')
  }
}
