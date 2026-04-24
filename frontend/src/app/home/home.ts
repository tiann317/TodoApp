import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Taskbanner } from '../taskbanner/taskbanner';
import { Taskschema } from '../taskschema';
import { Dbfetch } from '../dbfetch';

@Component({
  selector: 'app-home',
  imports: [Taskbanner],
  styleUrl: './home.css',
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by description" #filter />
        <button class="primary" type="button">Search</button>
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
  dbfetch = inject(Dbfetch);
  tasks: Taskschema[] = [];
  private readonly detector: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.dbfetch
      .getAllTasks()
      .then((tasks: Taskschema[]) => {
        this.tasks = tasks;
        this.detector.markForCheck();
      });
  }
}
