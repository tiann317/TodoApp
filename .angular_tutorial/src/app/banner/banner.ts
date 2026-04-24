import { Component, input } from '@angular/core';
import { BannerInterface } from '../banner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  template: `
  <section class="listing">
      <img
        class="listing-photo"
        [src]="task().photo"
        alt="Exterior photo of {{ task().name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ task().name }}</h2>
      <p class="listing-location">{{ task().city }}, {{ task().state }}</p>
      <a [routerLink]="['/details', task().id]">Learn more</a>
    </section>`,
  styleUrl: './banner.css',
})
export class Banner {
  task = input.required<BannerInterface>();
}
