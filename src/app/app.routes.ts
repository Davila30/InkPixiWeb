import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'profile', component: Profile },
];
