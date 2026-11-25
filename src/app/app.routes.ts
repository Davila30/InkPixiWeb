import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then((module) => module.Home),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(
        (module) => module.Dashboard,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'descubrir',
    loadComponent: () =>
      import('./features/discover/discover').then(
        (module) => module.Discover,
      ),
  },
  { path: 'discover', redirectTo: 'descubrir' },
  {
    path: 'obra/:id',
    loadComponent: () =>
      import('./features/artwork-detail/artwork-detail').then(
        (module) => module.ArtworkDetail,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((module) => module.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then(
        (module) => module.Register,
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile').then((module) => module.Profile),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'home' },
];
