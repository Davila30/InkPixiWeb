import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Inicio · InkPixi',
    loadComponent: () =>
      import('./features/home/home').then((module) => module.Home),
  },
  {
    path: 'dashboard',
    title: 'Panel · InkPixi',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(
        (module) => module.Dashboard,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'descubrir',
    title: 'Descubrir · InkPixi',
    loadComponent: () =>
      import('./features/discover/discover').then(
        (module) => module.Discover,
      ),
  },
  { path: 'discover', redirectTo: 'descubrir' },
  {
    path: 'obra/:id',
    title: 'Detalle de obra · InkPixi',
    loadComponent: () =>
      import('./features/artwork-detail/artwork-detail').then(
        (module) => module.ArtworkDetail,
      ),
  },
  {
    path: 'login',
    title: 'Iniciar sesión · InkPixi',
    loadComponent: () =>
      import('./features/auth/login/login').then((module) => module.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    title: 'Crear cuenta · InkPixi',
    loadComponent: () =>
      import('./features/auth/register/register').then(
        (module) => module.Register,
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'profile',
    title: 'Perfil · InkPixi',
    loadComponent: () =>
      import('./features/profile/profile').then((module) => module.Profile),
    canActivate: [authGuard],
  },
  {
    path: '**',
    title: '404 · Página no encontrada',
    loadComponent: () =>
      import('./features/notFound/notFound').then(
        (module) => module.NotFound,
      ),
  },
];