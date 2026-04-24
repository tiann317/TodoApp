import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '../storage';
import { BannerInterface } from '../banner';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  styleUrl: './details.css',
  template: `
      <article>
      <img
        class="listing-photo"
        [src]="task?.photo"
        alt="Exterior photo of {{ task?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ task?.name }}</h2>
        <p class="listing-location">{{ task?.city }}, {{ task?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ task?.availableUnits }}</li>
          <li>Does this location have wifi: {{ task?.wifi }}</li>
          <li>Does this location have laundry: {{ task?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="form" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstname" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastname" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>`
})
export class Details {
  private readonly detector = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  injected_storage = inject(Storage);
  taskID = -1;

  form = new FormGroup(
    {
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
    }
  )
  task: BannerInterface | undefined;
  constructor() {
    const taskID = parseInt(this.route.snapshot.params['id'], 10);
    this.injected_storage.getTaskByID(taskID).then((task) => {
      this.task = task;
      this.detector.markForCheck();
    })
  }
  submitApplication() {
    this.injected_storage.submitApplication(
      this.form.value.firstname ?? '',
      this.form.value.lastname ?? '',
      this.form.value.email ?? '',
    );
  }
}
