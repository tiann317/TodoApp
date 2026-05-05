import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { Createview } from './createview/createview';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'tasks/:id',
    component: Details,
    title: "Task details",
  },
  {
    path: 'tasks',
    component: Createview,
    title: "Create Task",
  }
];
