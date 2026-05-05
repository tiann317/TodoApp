import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  styleUrl: './app.css',
  template: `
    <main class="container page">
      <p class="my-4 text-lg text-body">Small taskapp to try FastAPI and Angular. Made by Ivan Titov.</p>
      <a [routerLink]="['/']">
        <section>
          <form>
            <button class="primary" type="button">Home</button>
          </form>
        </section>
      </a>
      <section class="content">
        <router-outlet />
      </section>
    </main>
  `
})
export class App {
  protected readonly title = signal('frontend');
}
