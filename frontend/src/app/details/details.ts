import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dbfetch } from '../dbfetch';
import { Taskschema } from '../taskschema';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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

      <section class="listing-update">
        <h2 class="section-heading">Update task</h2>

        <form [formGroup]="form" (ngSubmit)="updateTask()">

          <label for="task-body">Description:</label>
          <input id="task-body" type="text" formControlName="body" />

          <label for="task-priority">Priority:</label>
          <input id="task-priority" type="number" formControlName="priority" />

          <label for="task-assignee">Assignee:</label>
          <input id="task-assignee" type="text" formControlName="assignee" />

          <label for="task-status">Status:</label>
          <select formControlName="status">
            <option value="TODO">Todo</option>
            <option value="Done">Done</option>
            <option value="In progress">In progress</option>
          </select>

          <button type="submit" class="primary" [disabled]="form.invalid || form.pristine">Update</button>
        </form>
      </section>
      <button type=button class="btn btn-primary"  (click)="deleteTask()">Delete</button>
    </article>
  `
})

export class Details {
  private readonly detector = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  db: Dbfetch = inject(Dbfetch);
  taskID: number = 1;
  task$!: Observable<Taskschema>;
  task: Taskschema | undefined;

  constructor() {
    const taskID = parseInt(this.route.snapshot.params['id'], 10);
    this.task$ = this.db.getTaskByID(taskID)

    this.task$.subscribe((task: Taskschema) => {

      this.task = task;

      this.form.patchValue({
        body: task.body,
        priority: task.priority,
        assignee: task.assignee,
        status: task.status,
      })

    });

    this.detector.markForCheck();
  }


  form = new FormGroup(
    {
      body: new FormControl(''),
      priority: new FormControl(0),
      assignee: new FormControl(''),
      status: new FormControl(''),
    }
  )

  updateTask() {
    if (!this.task) return;

    this.db.updateTask(
      this.task?.id ?? 0,
      this.form.value.body ?? '',
      this.form.value.priority ?? 0,
      this.form.value.assignee ?? '',
      this.form.value.status ?? ''
    )
  }

  deleteTask() {
    if (confirm("Delete #" + this.task?.id + "?"))
      this.db.deleteTask(this.task?.id ?? 0)
  }
}
