import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Banner } from '../banner/banner';
import { Storage } from '../storage';
import { BannerInterface } from '../banner';

@Component({
  selector: 'app-header',
  imports: [Banner],
  styleUrl: './header.css',
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (task_elem of filetered_array; track $index) {
        <app-banner [task]="task_elem" />
      }
    </section>`
})

export class Header {

  private readonly detector = inject(ChangeDetectorRef);
  taskarray: BannerInterface[] = [];
  filetered_array: BannerInterface[] = [];
  storage_instance: Storage = inject(Storage);

  constructor() {
    this.storage_instance
      .getAllTasks()
      .then((taskarray: BannerInterface[]) => {
        this.taskarray = taskarray;
        this.filetered_array = taskarray;
        this.detector.markForCheck();
      });
  }

  filterResults(text: string) {

    if (!text) {
      this.filetered_array = this.taskarray;
      return;
    }

    this.filetered_array = this.taskarray.filter((task) =>
      task?.city.toLowerCase().includes(text.toLowerCase()),
    );

  }
}
