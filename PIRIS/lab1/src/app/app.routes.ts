import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserEditPageComponent } from './components/user/user-edit-page/user-edit-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: ':id',
    component: UserEditPageComponent,
    loadChildren: () =>
      import('./components/user/user-edit-page/user-edit-page.module').then(
        (m) => m.UserEditPageModule
      ),
  },
];
