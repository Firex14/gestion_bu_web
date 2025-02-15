import { Routes } from '@angular/router';
import {AuthGuard} from "./core/guard/AuthGuard";


export const routes: Routes = [
  { path: 'users', loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent), canActivate: [AuthGuard], data:{roles:['admin']} },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'books', loadComponent: () => import('./components/books/books.component').then(m => m.BooksComponent) },
  { path: 'readers', loadComponent: () => import('./components/readers/readers.component').then(m => m.ReadersComponent) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
