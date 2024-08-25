import { Routes } from '@angular/router';
import { BiographyLayoutComponent } from './layouts/biography-layout/biography-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'biography',
    pathMatch: 'full'
  },
  {
    path: 'biography',
    component: BiographyLayoutComponent,
    loadChildren: () => import('./modules/biography/biography.module').then(mod => mod.BiographyModule)
  },
  {
    path: 'contribute/strict-authentication',
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  }
];
