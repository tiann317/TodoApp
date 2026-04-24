import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dbfetch } from '../dbfetch';
import { Taskschema } from '../taskschema';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

/*TODO: Add separate Component for task create,
 *      leave details Component for update/delete
 *      instead*/
@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  styleUrl: './details.css',
  template: `
    <article>
      <section class="listing-description">
        <h2 class="section-heading">About this task: {{ task?.id }} </h2>
        <ul>
          <li>Description: {{ task?.body }}</li>
          <li>Priority: {{ task?.priority }}</li>
          <li>Assignee: {{ task?.assignee }}</li>
          <li>Status: {{ task?.status }}</li>
        </ul>
      </section>
      <section class="listing-create">
        <h2 class="section-heading">Create new task</h2>
        <form [formGroup]="form" (submit)="createTask()">

          <label for="task-body">Description:</label>
          <input id="task-body" type="text" formControlName="body" />

          <label for="task-priority">Priority:</label>
          <input id="task-priority" type="text" formControlName="priority" />

          <label for="task-assignee">Assignee:</label>
          <input id="task-assignee" type="text" formControlName="assignee" />

          <label for="task-status">Status:</label>
          <input id="task-status" type="text" formControlName="status" />


          <button type="submit" class="primary">Create</button>
        </form>
      </section>
    </article>
  `
})

export class Details {
  private readonly detector = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  db: Dbfetch = inject(Dbfetch);
  taskID: number = 1;

  form = new FormGroup(
    {
      body: new FormControl(''),
      priority: new FormControl(''),
      assignee: new FormControl(''),
      status: new FormControl(''),
    }
  )

  task: Taskschema | undefined;
  constructor() {
    const taskID = parseInt(this.route.snapshot.params['id'], 10);
    this.db.getTaskByID(taskID).then((task) => {
      this.task = task;
      this.detector.markForCheck();
    })
  }
  createTask() {
    this.db.createTask(
      this.form.value.body ?? '',
      this.form.value.priority ?? '',
      this.form.value.assignee ?? '',
      this.form.value.status ?? '')
  }
}
