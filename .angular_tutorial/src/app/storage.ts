import { Injectable } from '@angular/core';
import { BannerInterface } from './banner';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  url = 'http://localhost:3000/locations'

  async getTaskByID(id: number): Promise<BannerInterface | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const taskJSON = await data.json();
    return taskJSON ?? {};
  }

  async getAllTasks(): Promise<BannerInterface[]> {
    const data = fetch(this.url);
    return ((await data).json()) ?? [];
  }
  submitApplication(firstname: string, lastname: string, email: string) {
    console.log(`
      Tasks application received: firstname: ${firstname}, lastname ${lastname}, email ${email}
    `);
  }
}
