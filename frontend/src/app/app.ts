import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

/*TODO: change css for home button*/
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  styleUrl: './app.css',
  template: `
    <main>
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
