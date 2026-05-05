import { Component, input } from '@angular/core';
import { Taskschema } from '../taskschema';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-taskbanner',
  imports: [RouterLink],
  styleUrl: './taskbanner.css',
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ task().body }}</h2>
      <p class="listing-id">#{{ task().id }}</p>
      <a [routerLink]="['/tasks', task().id]">Open</a>
    </section>
  `,
})
export class Taskbanner {
  task = input.required<Taskschema>();
}
