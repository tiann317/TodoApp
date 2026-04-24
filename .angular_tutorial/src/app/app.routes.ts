import { Routes } from '@angular/router';
import { Header } from './header/header';
import { Details } from './details/details';

export const routes: Routes = [
  {
    path: '',
    component: Header,
    title: 'Header page',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Task details',
  },
];

