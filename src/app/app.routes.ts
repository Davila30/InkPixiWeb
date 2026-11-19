import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Profile } from './features/profile/profile';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Discover } from './features/discover/discover';
import { ArtworkDetail } from './features/artwork-detail/artwork-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'descubrir', component: Discover },
  { path: 'discover', redirectTo: 'descubrir' },
  { path: 'obra/:id', component: ArtworkDetail },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: '' },
];
