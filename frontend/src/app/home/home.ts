import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Taskbanner } from '../taskbanner/taskbanner';
import { Taskschema } from '../taskschema';
import { Dbfetch } from '../dbfetch';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Taskbanner, RouterLink],
  styleUrl: './home.css',
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by description" #filter />
        <a [routerLink]="['/tasks']"><button class="primary" type="button">New task</button></a>
      </form>
    </section>
      <section class="results">
        @for (task of tasks; track $index) {
          <app-taskbanner [task]="task"/>
        }
      </section>
    `
})
export class Home {
  db: Dbfetch = inject(Dbfetch);
  private readonly detector: ChangeDetectorRef = inject(ChangeDetectorRef);
  tasks$!: Observable<Taskschema[]>;
  tasks: Taskschema[] = [];

  constructor() {
    this.tasks$ = this.db.getAllTasks();
    this.tasks$.subscribe((tasksO: Taskschema[]) => {
      this.tasks = tasksO;
      console.log(this.tasks)
      this.detector.markForCheck();
    });
  }
}
