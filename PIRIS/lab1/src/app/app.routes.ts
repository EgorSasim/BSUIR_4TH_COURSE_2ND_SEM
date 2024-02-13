import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserEditPageComponent } from './components/user/user-edit-page/user-edit-page.component';
import { UserPageComponent } from './components/user/user-page/user-page.component';
import { BankAccountPageComponent } from './components/bank-account/bank-account-page/bank-account-page.component';
import { DepositPageComponent } from './components/bank-account/deposit/deposit-page/deposit-page.component';
import { BankEmuPageComponent } from './components/bank-emu/bank-emu-page/bank-emu-page.component';

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
    path: 'user-page',
    component: UserPageComponent,
    loadChildren: () =>
      import('./components/user/user-page/user-page.module').then(
        (m) => m.UserPageModule
      ),
  },
  {
    path: 'user',
    children: [
      {
        path: ':id',
        component: UserEditPageComponent,
        loadChildren: () =>
          import('./components/user/user-edit-page/user-edit-page.module').then(
            (m) => m.UserEditPageModule
          ),
      },
    ],
  },

  {
    path: 'deposit',
    children: [
      {
        path: ':id',
        component: DepositPageComponent,
        loadChildren: () =>
          import(
            './components/bank-account/deposit/deposit-page/deposit-page.module'
          ).then((m) => m.DepositPageModule),
      },
    ],
  },
  {
    path: 'bank-account-page',
    component: BankAccountPageComponent,
    loadChildren: () =>
      import(
        './components/bank-account/bank-account-page/bank-account-page.module'
      ).then((m) => m.BankAccountPageModule),
  },
  {
    path: 'bank-emu',
    component: BankEmuPageComponent,
    loadChildren: () =>
      import('./components/bank-emu/bank-emu-page/bank-emu-page.module').then(
        (m) => m.BankEmuPageModule
      ),
  },
];
